"""NFR-003 coverage: the service must stay available under repeated,
concurrent traffic (registration/exam-week peaks) via a simple health
endpoint that carries no database dependency.

This complements backend/tests/test_spa_and_scope.py, which already checks
the health payload shape and the absence of a DB-session parameter on the
route. Here we exercise it under concurrency.
"""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_serves_many_concurrent_requests_successfully() -> None:
    """A load balancer or monitor polling /health under exam-week/term-start
    traffic must get a consistent ok from every single request, even when
    many arrive at once."""

    def _get(_: int) -> int:
        return client.get("/health").status_code

    with ThreadPoolExecutor(max_workers=20) as pool:
        statuses = list(pool.map(_get, range(100)))

    assert len(statuses) == 100
    assert all(status == 200 for status in statuses)


def test_health_repeated_sequential_requests_stay_ok() -> None:
    """Repeated polling (as a monitor would do) keeps returning the same
    ok payload, not just on the first call."""
    for _ in range(25):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}
