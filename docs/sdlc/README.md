# calculator — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
simple calculator application

**Documentation version:** v3
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 11 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 14 requirements |
| [Changelog](CHANGELOG.md) | 3 versions |
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

- No explicit mapping given from this architecture to any of the known requirement ids (US-001..US-014); traceability cannot be confirmed without that linkage.
- Claim that 'no user data stored' keeps DPDP/CERT-In obligations out of scope is an architectural design intent, not a confirmed legal/compliance determination -- flagged for human legal review, not asserted as fact here.
- Not linked to a specific requirement id in the input.
- Decision to leave the database unused is a design choice recorded here, not independently verified against any data-retention requirement.
- Decimal precision rules are referenced as 'defined' but the specific precision value/behavior is not given in this input.
- Architecture references 'NFR-003' but this id is not present in the known requirement key list (US-001..US-014); cannot confirm traceability.
- References 'NFR-003' which is not in the known requirement key list supplied for this project.
- References 'NFR-009' which is not in the known requirement key list supplied for this project.
- The compliance-scope claim (DPDP/CERT-In out of scope) is a design rationale stated in the architecture, not a verified legal conclusion.

### Development

- Backlog items are not explicitly mapped to individual sprints in the input -- only sprint-level goals and item-level epic groupings are given; which specific stories/tasks landed in which sprint is not confirmed.
- No actual development progress (commits, PRs, build status) or ticket completion state was provided for this phase -- only planned backlog content exists.
- No confirmation of which backlog items were actually completed within this sprint.
- No audit results or release-gate decision provided yet.
- No implementation or completion status reported for any of these stories.
- No implementation or completion status reported for this story.
- No implementation or completion status reported for these stories.
- No performance/bandwidth test data provided to confirm the low-bandwidth requirement is met.
- No security-agent verification/report provided confirming no personal data is collected or stored.
- Not stated whether history persists across sessions or is purely in-memory/client-side only.
- No implementation or completion status reported for the story or its subtasks.
- No audit/test results provided yet to confirm WCAG 2.1 AA conformance or to support the release-gate decision for US-014.

### Testing

- Testing phase has not started -- none of the 31 acceptance criteria have recorded test results, and the WCAG 2.1 AA accessibility release gate (NFR-006) has not been evaluated.

### Deployment

- No deployment recorded yet -- cannot confirm the app is live, which region/CDN configuration is in use, or that the health/status endpoint is operational.

### Maintenance

- No post-deployment/maintenance activity recorded -- nothing to document because the application has not been deployed.
<!-- sdlc:auto:end open-gaps -->
