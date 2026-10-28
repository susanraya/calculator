# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Core arithmetic engine (entry, four operations, running result, clear/all-clear, percentage) plus anonymous-access baseline and privacy documentation.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Enter numbers including decimals | 3 | frontend-agent | — |
| US-002 | Story | Perform addition, subtraction, multiplication and division | 5 | frontend-agent | US-001 |
| US-003 | Story | View a running result | 3 | frontend-agent | US-002 |
| US-004 | Story | Clear and all-clear controls | 2 | frontend-agent | US-001, US-002 |
| US-005 | Story | Calculate a percentage | 3 | frontend-agent | US-002 |
| US-010 | Story | Use the calculator without login or accounts | 1 | frontend-agent | — |
| US-011 | Story | No personal data collected or stored | 2 | security-agent | — |

## Sprint 2: Sprint 2

On-screen and keyboard input wired to the engine, responsive layout, and low-bandwidth load performance.

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-006 | Story | Operate the calculator with on-screen buttons | 5 | frontend-agent | US-001, US-002, US-004 |
| US-007 | Story | Operate the calculator with the keyboard | 3 | frontend-agent | US-006 |
| US-008 | Story | Use the calculator on mobile and desktop screens | 5 | frontend-agent | US-006 |
| US-009 | Story | Work on low-bandwidth connections | 3 | frontend-agent | US-008 |

## Sprint 3: Sprint 3

Optional client-side history and WCAG 2.1 AA accessibility conformance as the release gate.

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | View recent calculations in the browser | 5 | frontend-agent | US-002, US-003 |
| US-013 | Story | Fully operable by keyboard and assistive technology | 8 | frontend-agent | US-006, US-007 |
| ↳ US-013-T1 | Task | Add ARIA labels and roles to all calculator controls and the result display | — | frontend-agent | — |
| ↳ US-013-T2 | Task | Implement keyboard focus order and visible focus indicators | — | frontend-agent | — |
| ↳ US-013-T3 | Task | Add live-region announcements for result updates | — | frontend-agent | — |
| ↳ US-013-T4 | Task | Write automated keyboard and screen-reader accessibility test suite | — | qa-agent | — |
| US-014 | Story | Accessibility conformance as a release gate | 3 | qa-agent | US-013, US-008 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
