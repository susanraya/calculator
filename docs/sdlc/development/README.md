# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-001 · approved · source: plan:v1

Development plan version 1 is approved and organizes work into 3 sprints covering core arithmetic, input methods/delivery, and accessibility.

Plan status: approved, version 1. Sprint 1 goal: core arithmetic engine (number entry, four operations, running result, clear/all-clear, percentage) plus no-login/no-personal-data baseline, capacity 20. Sprint 2 goal: input methods (on-screen buttons, keyboard), responsive/low-bandwidth delivery, optional client-side history, capacity 20. Sprint 3 goal: WCAG 2.1 AA accessibility implementation and release-gate audit, capacity 20.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014

- ⚠ Backlog items are not explicitly mapped to individual sprints in the input -- only sprint-level goals and item-level epic groupings are given; which specific stories/tasks landed in which sprint is not confirmed.
- ⚠ No actual development progress (commits, PRs, build status) or ticket completion state was provided for this phase -- only planned backlog content exists.

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 targets the core arithmetic engine and the anonymous/no-data baseline.

Goal: Core arithmetic engine: number entry, four operations, running result, clear/all-clear, percentage, plus no-login and no-personal-data baseline. Capacity: 20 points.

**Related:** US-001, US-002, US-003, US-004, US-005, US-010, US-011

- ⚠ No confirmation of which backlog items were actually completed within this sprint.

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 targets input methods, responsive/low-bandwidth delivery, and optional history.

Goal: Input methods (on-screen buttons, keyboard), responsive/low-bandwidth delivery, and optional client-side history. Capacity: 20 points.

**Related:** US-006, US-007, US-008, US-009, US-012

- ⚠ No confirmation of which backlog items were actually completed within this sprint.

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 targets WCAG 2.1 AA accessibility implementation and the release-gate audit.

Goal: WCAG 2.1 AA accessibility implementation and release-gate audit. Capacity: 20 points.

**Related:** US-013, US-014

- ⚠ No confirmation of which backlog items were actually completed within this sprint.
- ⚠ No audit results or release-gate decision provided yet.

### EPIC-001 · draft · source: plan:EPIC-001

Core Arithmetic Calculation epic covers number entry, the four basic operations, running result display, and clear/all-clear controls.

Epic EPIC-001 (role unassigned at epic level) groups: US-001 Enter numbers including decimals (3 pts, frontend-agent); US-002 Perform addition, subtraction, multiplication and division (5 pts, frontend-agent); US-003 View a running result (3 pts, frontend-agent); US-004 Clear and all-clear controls (2 pts, frontend-agent).

**Related:** US-001, US-002, US-003, US-004

- ⚠ No implementation or completion status reported for any of these stories.

### EPIC-002 · draft · source: plan:EPIC-002

Percentage Calculation epic covers computing a percentage value.

Epic EPIC-002 (role unassigned at epic level) groups: US-005 Calculate a percentage (3 pts, frontend-agent).

**Related:** US-005

- ⚠ No implementation or completion status reported for this story.

### EPIC-003 · draft · source: plan:EPIC-003

Input Methods epic covers operating the calculator via on-screen buttons and via keyboard.

Epic EPIC-003 (role unassigned at epic level) groups: US-006 Operate the calculator with on-screen buttons (5 pts, frontend-agent); US-007 Operate the calculator with the keyboard (3 pts, frontend-agent).

**Related:** US-006, US-007

- ⚠ No implementation or completion status reported for these stories.

### EPIC-004 · draft · source: plan:EPIC-004

Responsive, Low-Bandwidth Web Delivery epic covers cross-device layout and performance on constrained connections.

Epic EPIC-004 (role unassigned at epic level) groups: US-008 Use the calculator on mobile and desktop screens (3 pts, frontend-agent); US-009 Work on low-bandwidth connections (2 pts, frontend-agent).

**Related:** US-008, US-009

- ⚠ No implementation or completion status reported for these stories.
- ⚠ No performance/bandwidth test data provided to confirm the low-bandwidth requirement is met.

### EPIC-005 · draft · source: plan:EPIC-005

Anonymous Public Access and Privacy epic covers login-free use and avoidance of personal data collection.

Epic EPIC-005 (role unassigned at epic level) groups: US-010 Use the calculator without login or accounts (1 pt, frontend-agent); US-011 No personal data collected or stored (2 pts, security-agent).

**Related:** US-010, US-011

- ⚠ No implementation or completion status reported for these stories.
- ⚠ No security-agent verification/report provided confirming no personal data is collected or stored.

### EPIC-006 · draft · source: plan:EPIC-006

Optional Client-Side Calculation History epic covers viewing recent calculations in the browser.

Epic EPIC-006 (role unassigned at epic level) groups: US-012 View recent calculations in the browser (5 pts, frontend-agent).

**Related:** US-012

- ⚠ No implementation or completion status reported for this story.
- ⚠ Not stated whether history persists across sessions or is purely in-memory/client-side only.

### EPIC-007 · draft · source: plan:EPIC-007

Accessibility epic establishes WCAG 2.1 AA conformance as a release gate, covering keyboard/assistive-technology operability.

Epic EPIC-007 (role unassigned at epic level) groups: US-013 Fully operable by keyboard and assistive technology (8 pts, frontend-agent), broken into US-013-T1 Add ARIA labels and roles to all calculator buttons and the display (frontend-agent), US-013-T2 Implement keyboard focus management and visible focus indicators (frontend-agent), US-013-T3 Add aria-live region to announce result changes (frontend-agent), US-013-T4 Write automated accessibility and keyboard-navigation test suite (qa-agent); and US-014 Accessibility conformance as a release gate (3 pts, qa-agent).

**Related:** US-013, US-013-T1, US-013-T2, US-013-T3, US-013-T4, US-014

- ⚠ No implementation or completion status reported for the story or its subtasks.
- ⚠ No audit/test results provided yet to confirm WCAG 2.1 AA conformance or to support the release-gate decision for US-014.
<!-- sdlc:auto:end narrative -->
