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
| [Architecture](architecture/README.md) | 1 entry |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 14 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture-phase documentation exists yet translating this approved stack into an actual design (e.g., health endpoint contract, CDN/caching configuration, deployment topology) -- design against exactly this stack is still pending.
- AC-006 requires 'a consistent, defined precision' for decimal results but does not state what that precision actually is -- needs to be defined in design/development.
- AC-011 gives two alternative behaviors ('50 becomes 0.5 or is applied against the current operand per the defined percentage behaviour') without settling on one -- the exact percentage semantics are not yet finalized.
- The no-personal-data/no-consent-duties position is explicitly called out in AC-024 as an assumption needing confirmation by a human reviewer -- not yet signed off.
- Education domain skill flags age-appropriate design codes and verifiable parental consent for minors; since the calculator may be used by school-age students, the project should explicitly confirm no age-gating or parental consent is needed given the no-data-collection design.
- No mention of analytics, crash reporting, or third-party scripts (e.g., CDN telemetry) that could inadvertently collect data -- not addressed by any requirement.
- History is described as 'optional' but no requirement specifies how a user enables/disables it or whether it is on by default.
- No testing-phase evidence yet exists that WCAG 2.1 AA conformance has actually been evaluated or passed -- the release gate defined here cannot currently be confirmed as met.
- No architecture or capacity-planning detail (e.g., autoscaling rules, CDN caching strategy, expected concurrent-user targets) has been provided to show how this requirement will actually be met.

### Architecture

- Architecture phase has not started -- no design documentation exists to verify how the approved stack will be assembled (e.g., FastAPI health endpoint contract, AWS region/CDN topology, React app structure).

### Development

- Development phase has not started -- no code, tickets, or implementation evidence exists for any of the 14 user stories in the requirements phase.

### Testing

- Testing phase has not started -- none of the 31 acceptance criteria have recorded test results, and the WCAG 2.1 AA accessibility release gate (NFR-006) has not been evaluated.

### Deployment

- No deployment recorded yet -- cannot confirm the app is live, which region/CDN configuration is in use, or that the health/status endpoint is operational.

### Maintenance

- No post-deployment/maintenance activity recorded -- nothing to document because the application has not been deployed.
<!-- sdlc:auto:end open-gaps -->
