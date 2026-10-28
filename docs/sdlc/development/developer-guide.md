# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `4489702` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Calculator is a generated two-part application: a Vite + React 19 single-page app (the approved, reviewed UI, currently running on seeded sample data) and a FastAPI backend that, per the approved architecture, exposes only a health check and a catch-all route that serves the built frontend. The backend uses SQLAlchemy with SQLite by default (swappable to Postgres via DATABASE_URL) and ships no data model yet. In production the backend's Docker image bundles the frontend's built static assets and serves both the API and the SPA from a single container.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js 20+ (matches the Dockerfile's node:20-slim build stage)
- npm
- Python 3.12 (matches the Dockerfile's python:3.12-slim runtime)
- pip
- Docker (optional, for the backend image and docker-compose Postgres)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (optional) docker compose up -d to start the Postgres 16 service defined in docker-compose.yml, then set DATABASE_URL to point the backend at it instead of its default SQLite file
5. Start the backend: cd backend && uvicorn app.main:app --reload
6. Start the frontend: cd frontend && npm run dev
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the React SPA (run from frontend/) |
| frontend build | `npm run build` | Bundles the SPA for production (does not typecheck); run from frontend/ |
| frontend preview | `npm run preview` | Serves the production build locally; run from frontend/ |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI app with autoreload (run from backend/); defaults to SQLite at ./app.db |
| docker build (full app) | `docker build -f backend/Dockerfile .` | Builds the frontend, then packages it with the backend into a single container image; must be run from the repo root |
| docker compose db | `docker-compose up -d` | Starts a local Postgres 16 database (user/pass/db all 'app') on port 5432 |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend` | FastAPI service: entrypoint, DB setup, models/schemas, routers, tests, Dockerfile |
| `backend/app` | Application code: main.py (routes), database.py (engine/session), models.py (SQLAlchemy), schemas.py (Pydantic), routers/ (per-component routers, empty so far) |
| `backend/tests` | Pytest suite (health check and SPA/scope tests) |
| `backend/scripts` | Operational scripts, e.g. check_connections.py |
| `frontend` | Vite + React 19 SPA: approved screens, build/test config |
| `frontend/src` | App source: App.tsx (shell/routes), main.tsx (entry), screens/, lib/ |
| `frontend/src/screens` | One module per approved screen (Calculator, PrivacyAndAccessibility) |
| `frontend/src/lib` | Shared UI (ui.tsx, icons.tsx), brand tokens (brand.ts), API client (api.ts), calc logic (calc.ts), navigation helper |
| `frontend/e2e` | Playwright end-to-end specs |
| `.quorq` | Platform metadata (handoff.json, prepared.json) used by the Quorq SDLC platform |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Frontend screens live one-per-file under src/screens/, routed from App.tsx's AppShellLayout
- Shared UI primitives and icons live in src/lib/ui.tsx and src/lib/icons.tsx; brand tokens in src/lib/brand.ts and index.css
- Frontend component tests sit beside the component they cover (e.g. App.test.tsx); Playwright specs live separately in e2e/
- API access is centralized in src/lib/api.ts (apiFetch), reading VITE_API_BASE_URL/VITE_API_SECRET_KEY; screens do not yet call it and render seeded data instead
- Backend routers are generated one per architecture component into app/routers/; none exist yet since no architecture beyond health/SPA was approved
- Unimplemented backend routes return a typed StubResponse (schemas.py) rather than a bare 404
- SQLAlchemy models all inherit backend/app/database.py's Base; models.py is imported in main.py before create_all so new tables register automatically
- Backend defaults to SQLite (DATABASE_URL env var overrides it, e.g. to Postgres) so the project runs without a database server
- Backend linting/formatting via ruff (ruff.toml); frontend via ESLint (eslint.config.js) and Prettier (.prettierrc)
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm test` | Runs Vitest component tests under frontend/src (run from frontend/) |
| frontend e2e tests | `npm run test:e2e` | Runs Playwright specs in frontend/e2e; builds/serves the app and starts the backend automatically unless E2E_BASE_URL is set (run frontend/npm run test:e2e:install first to fetch Chromium) |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app; used as a gate during development |
| backend tests | `pytest` | Runs the backend pytest suite in backend/tests (run from backend/) |
| backend lint | `ruff check .` | Lints the backend Python code (run from backend/) |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend calls to the backend fail with a CORS error | Set ALLOWED_ORIGINS on the backend to a comma-separated list including the frontend's origin; without it only http://localhost:5173 and http://127.0.0.1:5173 are allowed |
| Visiting the backend root returns a 'not_implemented' status instead of the app | No frontend build exists at STATIC_DIR; run npm run build in frontend/ and ensure its dist/ output is available at STATIC_DIR (default backend/static) |
| `npm run build` succeeds but the app breaks in ways tsc would have caught | Run npm run typecheck (tsc --noEmit) separately; build does not typecheck |
| `pytest` fails with `ModuleNotFoundError: app` | Run pytest from the backend/ directory so pytest.ini's `pythonpath = .` applies, or ensure your working directory is backend/ |
| Playwright e2e run fails to start the backend | The webServer config expects a backend virtualenv at backend/.venv with dependencies installed; create it and install backend/requirements.txt there before running npm run test:e2e locally |
<!-- sdlc:auto:end troubleshooting -->
