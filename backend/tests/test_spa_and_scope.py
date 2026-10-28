"""Health/static contract coverage for US-010-2.

Covers AC-023 (no personal data, no data-collection endpoint) and NFR-003
(health endpoint for load-balancer/monitoring during traffic peaks), plus the
GET /{path:path} SPA-serving contract.
"""

import inspect

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_ok_status_payload() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_route_has_no_db_dependency() -> None:
    """NFR-003: the liveness probe must answer even when the database is
    unavailable, so its route must declare no DB dependency at all."""
    route = next(r for r in app.routes if getattr(r, "path", None) == "/health")

    assert route.dependencies == []
    sig = inspect.signature(route.endpoint)
    assert "db" not in sig.parameters
    assert "session" not in sig.parameters


def test_root_path_returns_200() -> None:
    """GET / must answer with the SPA shell. In this sandbox no frontend
    build is committed to backend/static, so the app falls back to the
    documented stub response for an unbuilt SPA -- still 200, never a 404."""
    response = client.get("/")

    assert response.status_code == 200


def test_unknown_client_route_returns_the_spa_entrypoint_not_a_404() -> None:
    """An unknown client-side route (e.g. a deep link or a refresh on
    /some/client/route) must resolve the same way / does, not 404, so
    client-side routing survives a hard navigation."""
    root = client.get("/")
    unknown = client.get("/some/client/route")

    assert unknown.status_code == 200
    # Whatever root answers (built index.html or the documented stub when no
    # build is present), the catch-all route must answer identically.
    assert unknown.text == root.text
    assert unknown.headers.get("content-type") == root.headers.get("content-type")


def test_openapi_document_builds() -> None:
    response = client.get("/openapi.json")

    assert response.status_code == 200
    assert "/health" in response.json()["paths"]


def test_openapi_exposes_no_data_collection_endpoint() -> None:
    """AC-023/NFR-002: the architecture names exactly two routes -- /health
    and the SPA catch-all -- so the schema must list nothing else. Any extra
    path is, by definition, somewhere personal data could be submitted."""
    response = client.get("/openapi.json")
    paths = set(response.json()["paths"].keys())

    assert paths == {"/health", "/{path}"}
