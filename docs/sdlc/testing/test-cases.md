# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
14 tests · Passed 9 · Failed 0 · Skipped 0 · Not run 5

Acceptance criteria covered: 4/31 · passing: 0/31
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-010: Use the calculator without login or accounts

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_returns_ok_status_payload | Unit | Passed | `backend/tests/test_spa_and_scope.py` |
| — | test_health_route_has_no_db_dependency | Unit | Passed | `backend/tests/test_spa_and_scope.py` |
| — | test_openapi_document_builds | Unit | Passed | `backend/tests/test_spa_and_scope.py` |
| — | test_openapi_exposes_no_data_collection_endpoint | Unit | Passed | `backend/tests/test_spa_and_scope.py` |
| — | test_root_path_returns_200 | Unit | Passed | `backend/tests/test_spa_and_scope.py` |
| — | test_unknown_client_route_returns_the_spa_entrypoint_not_a_404 | Unit | Passed | `backend/tests/test_spa_and_scope.py` |
| AC-021 | [AC-021] loading the calculator shows a usable keypad with no login, registration or account prompt | E2E | Not run yet | `frontend/e2e/calculator-privacy.spec.ts` |
| AC-022 | [AC-022] completing a full calculation surfaces no payment, subscription or billing prompt | E2E | Not run yet | `frontend/e2e/calculator-privacy.spec.ts` |
| AC-023 | [AC-023][NFR-002][NFR-004] after load, entry/arithmetic/percentage/clear raise no outbound requests beyond static assets and leave storage empty | E2E | Not run yet | `frontend/e2e/calculator-privacy.spec.ts` |
| AC-024 | [AC-024] the privacy statement records no personal data processed and DPDP/CERT-In scope position, cross-referenced to this e2e evidence | E2E | Not run yet | `frontend/e2e/calculator-privacy.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | test_the_openapi_document_builds | Unit | Passed | `backend/tests/test_health.py` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/App.test.tsx` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
