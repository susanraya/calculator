# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
39 tests · Passed 27 · Failed 0 · Skipped 0 · Not run 12

Acceptance criteria covered: 14/31 · passing: 3/31
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

## Sprint 2

### US-006: Operate the calculator with on-screen buttons

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-013 | Calculator screen > [AC-013] AC resets the display back to 0 | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-013 | Calculator screen > [AC-013] C clears only the current entry | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-013 | Calculator screen > [AC-013] decimal point key appends a decimal to the entry | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-013 | Calculator screen > [AC-013] dividing by zero shows the error message and locks digit entry | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-013 | Calculator screen > [AC-013] percentage key computes a percentage of the current entry | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-013 | Calculator screen > [AC-013] tapping on-screen digit, operator and equals buttons performs the calculation and updates the display | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-014 | Calculator screen > [AC-014] an activated button shows a visible pressed state | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-015 | Calculator screen > [AC-015] Escape clears the current entry and Delete performs an all clear | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-015 | Calculator screen > [AC-015] keyboard input for digits, operators and Enter produces the same result as on-screen buttons | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-016 | Calculator screen > [AC-016] mixing keyboard and on-screen input within one calculation updates the same shared state | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-020 | Calculator screen > [AC-020] no fetch is issued by any calculator interaction | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-025 | Calculator screen > [AC-025] completing a calculation with = adds the expression and result to the client-side history list | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-026 | Calculator screen > [AC-026] no fetch is issued while calculations are added to history | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-027 | Calculator screen > [AC-027] Escape cancels the clear-history confirmation and keeps entries | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-027 | Calculator screen > [AC-027] choosing clear history removes all entries and shows the empty state | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| — | Calculator screen > history starts empty on first load with no seeded sample data | Unit | Passed | `frontend/src/screens/Calculator.test.tsx` |
| AC-016 | [AC-016] mixing on-screen clicks and keyboard keys within one calculation produces a single consistent result | E2E | Not run yet | `frontend/e2e/calculator-keypad.spec.ts` |
| AC-017 | [AC-017] at a 375px mobile viewport the display is visible, there is no horizontal scroll and tap targets are at least 44px | E2E | Not run yet | `frontend/e2e/calculator-keypad.spec.ts` |
| AC-018 | [AC-018] at a 1280px desktop viewport the layout adapts and all controls remain usable | E2E | Not run yet | `frontend/e2e/calculator-keypad.spec.ts` |
| AC-020 | [AC-020] no network requests are issued while performing calculations after the page has loaded | E2E | Not run yet | `frontend/e2e/calculator-keypad.spec.ts` |

### US-012: View recent calculations in the browser

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_repeated_sequential_requests_stay_ok | Unit | Passed | `backend/tests/test_availability.py` |
| — | test_health_serves_many_concurrent_requests_successfully | Unit | Passed | `backend/tests/test_availability.py` |
| AC-025 | [AC-025] completing calculations lists them in the history panel in order | E2E | Not run yet | `frontend/e2e/calculator-history.spec.ts` |
| AC-026 | [AC-026] no request carrying calculation or history data is sent to the server, and nothing is persisted server-side | E2E | Not run yet | `frontend/e2e/calculator-history.spec.ts` |
| AC-027 | [AC-027] clearing history removes all entries and shows the empty state | E2E | Not run yet | `frontend/e2e/calculator-history.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | test_the_openapi_document_builds | Unit | Passed | `backend/tests/test_health.py` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/App.test.tsx` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
