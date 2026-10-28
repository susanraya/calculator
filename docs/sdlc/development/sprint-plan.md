# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Core arithmetic engine: number entry, four operations, running result, clear/all-clear, percentage, plus no-login and no-personal-data baseline

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

Input methods (on-screen buttons, keyboard), responsive/low-bandwidth delivery, and optional client-side history

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-006 | Story | Operate the calculator with on-screen buttons | 5 | frontend-agent | US-001, US-002, US-003, US-004, US-005 |
| US-007 | Story | Operate the calculator with the keyboard | 3 | frontend-agent | US-006 |
| US-008 | Story | Use the calculator on mobile and desktop screens | 3 | frontend-agent | US-006 |
| US-009 | Story | Work on low-bandwidth connections | 2 | frontend-agent | US-008 |
| US-012 | Story | View recent calculations in the browser | 5 | frontend-agent | US-002, US-003 |

## Sprint 3: Sprint 3

WCAG 2.1 AA accessibility implementation and release-gate audit

Capacity: 20 points · Committed: 11

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-013 | Story | Fully operable by keyboard and assistive technology | 8 | frontend-agent | US-006, US-007 |
| ↳ US-013-T1 | Task | Add ARIA labels and roles to all calculator buttons and the display | — | frontend-agent | — |
| ↳ US-013-T2 | Task | Implement keyboard focus management and visible focus indicators | — | frontend-agent | — |
| ↳ US-013-T3 | Task | Add aria-live region to announce result changes | — | frontend-agent | — |
| ↳ US-013-T4 | Task | Write automated accessibility and keyboard-navigation test suite | — | qa-agent | — |
| US-014 | Story | Accessibility conformance as a release gate | 3 | qa-agent | US-013 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
