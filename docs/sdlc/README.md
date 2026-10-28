# calculator — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
simple calculator application

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 7 entries |
| [Development](development/README.md) | 10 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 2 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 14 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 14 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- Exact percentage algorithm is described only as 'per the defined percentage behaviour' — the precise rule for the relative case (AC-012) is not fully pinned down in the requirements text.
- The no-personal-data / DPDP-out-of-scope position (AC-024) is explicitly flagged in the requirements as an assumption still to be confirmed — not yet signed off by a human or legal reviewer.
- No information is given on user ages (e.g., whether under-18 learners could access this public tool), which the Education domain skill calls out as needed to assess DPDP verifiable-parental-consent applicability.
- NFR-003 (availability during peaks) has no load-testing evidence in the testing phase input.
- NFR-009 is explicitly labelled an accepted-risk assumption pending confirmation against the DPDP Act.

### Architecture

- Database is provisioned but intentionally idle; confirm there is no cost/governance objection to running a managed PostgreSQL instance that stores nothing.
- No logging/retention configuration is described for the Fargate/CloudFront/RDS nodes; CERT-In directions (India) require 180-day ICT log retention and 6-hour cyber-incident reporting, independent of whether personal data is processed — not addressed in the architecture input.

### Development

- No delivery ticket or commit for US-006, US-007, US-008 or US-009 appears in the development run status, even though the overall development run is marked 'completed' — confirm whether Sprint 2 work actually shipped.
- No delivery ticket or commit for US-012, US-013 (or tasks T1–T4), or US-014 appears in the development run status, despite the run being marked 'completed' — confirm whether the history feature and the WCAG 2.1 AA release-gate work actually shipped before relying on it.

### Testing

- The specific checks are not named, so it cannot be confirmed whether they cover arithmetic correctness, divide-by-zero handling, keyboard/on-screen input parity, responsive/low-bandwidth behaviour, client-side history, or the WCAG 2.1 AA release-gate criteria (AC-028–AC-031) and the automated accessibility suite planned under US-013-T4.
- No test records exist specifically for Sprint 2/3 scope (US-006–US-009, US-012, US-013, US-014).
<!-- sdlc:auto:end open-gaps -->
