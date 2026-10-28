"""Application entrypoint.

Generated from the approved architecture, which gives this backend exactly two
routes: `GET /health` (liveness/readiness for the load balancer and
monitoring) and `GET /{path:path}` (the app host serving the built React SPA).
The architecture names no other endpoint -- the calculator itself runs
entirely client-side -- so there is no router package to generate here; both
routes live in this one module.
"""

import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.types import Scope

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.database import Base, engine

app = FastAPI(
    title="calculator",
    description="simple calculator application",
    version="0.1.0",
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The architecture holds no data model (AC-023: no personal data, calculation and
# history are client-side only), so this creates no tables -- `models` declares
# none. It is kept so a future model needs nothing else to start persisting.
Base.metadata.create_all(bind=engine)


@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe used by the load balancer and monitoring (NFR-003)."""
    return {"status": "ok"}


# --- App host: serve the built React SPA -----------------------------------
#
# This backend is deployed as the single container that answers both the API
# and the frontend's origin requests, so the production image bundles the
# frontend's `npm run build` output (frontend/dist) into this directory --
# see backend/Dockerfile. STATIC_DIR is overridable for any deployment layout
# that places the build elsewhere; its default matches where the Dockerfile
# puts it relative to this file (backend/app/main.py -> backend/static).
_STATIC_DIR = Path(os.getenv("STATIC_DIR", str(Path(__file__).resolve().parent.parent / "static")))


class SinglePageApp(StaticFiles):
    """Serves the built SPA; any path that is not a real static file falls
    back to index.html so client-side routes (e.g. /calculator) resolve on a
    hard navigation or a browser refresh, per the approved GET /{path:path}
    contract."""

    async def get_response(self, path: str, scope: Scope):
        try:
            return await super().get_response(path, scope)
        except StarletteHTTPException as exc:
            if exc.status_code != 404:
                raise
            return await super().get_response("index.html", scope)


if (_STATIC_DIR / "index.html").is_file():
    # Mounted last: FastAPI matches routes in registration order, so /health
    # (and /docs, /openapi.json, added when `FastAPI()` was constructed above)
    # are matched before any request reaches this catch-all mount at "/".
    app.mount("/", SinglePageApp(directory=_STATIC_DIR, html=True), name="spa")
else:

    @app.get("/{path:path}")
    async def spa_not_built(path: str) -> dict[str, str]:
        """Answers the approved GET /{path:path} route before a frontend
        build exists at STATIC_DIR -- e.g. a bare `uvicorn app.main:app` in
        development -- so the endpoint the API spec names is always present
        rather than Starlette's default 404 for an unknown route."""
        return {
            "status": "not_implemented",
            "detail": "No frontend build found at STATIC_DIR. Run `npm run build` in "
            "frontend/ and make its dist/ output available at STATIC_DIR "
            f"(currently {_STATIC_DIR}).",
        }
