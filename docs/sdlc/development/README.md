# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-DEV-V0 · draft · source: plan:v0

A preview-stage (version 0) development plan organizes the calculator's 14 user stories and 7 epics into 3 sprints of 20-point capacity each.

Sprint 1 (capacity 20): goal = core arithmetic engine (entry, four operations, running result, clear/all-clear, percentage) plus anonymous-access baseline and privacy documentation; covers EPIC-001 (US-001 entry incl. decimals, 3pt; US-002 four operations, 5pt; US-003 running result, 3pt; US-004 clear/all-clear, 2pt), EPIC-002 (US-005 percentage, 3pt), and EPIC-005 (US-010 no-login access, 1pt; US-011 no personal data, 2pt, role=security-agent). Sprint 2 (capacity 20): goal = on-screen/keyboard input wired to engine, responsive layout, low-bandwidth load performance; covers EPIC-003 (US-006 on-screen buttons, 5pt; US-007 keyboard input, 3pt) and EPIC-004 (US-008 responsive mobile/desktop, 5pt; US-009 low-bandwidth, 3pt). Sprint 3 (capacity 20): goal = optional client-side history and WCAG 2.1 AA conformance as release gate; covers EPIC-006 (US-012 view recent calculations, 5pt) and EPIC-007 (US-013 full keyboard/assistive-tech operability, 8pt, with subtasks US-013-T1 ARIA labels/roles, US-013-T2 keyboard focus order/visible indicators, US-013-T3 live-region result announcements, US-013-T4 automated accessibility test suite role=qa-agent; and US-014 accessibility conformance as release gate, 3pt, role=qa-agent). All stories except US-011, US-013-T4, and US-014 are assigned to frontend-agent.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-013-T1, US-013-T2, US-013-T3, US-013-T4, US-014

- ⚠ Plan is explicitly marked 'preview, version 0' — not confirmed as finalized or approved.
- ⚠ No dates are given for any sprint, so the plan's timeline cannot be documented.

### US-006 · approved · source: dev:US-006

On-screen button operation of the calculator was implemented and delivered.

Ticket US-006 ('Operate the calculator with on-screen buttons', 5 points, role=frontend-agent, part of EPIC-003 and Sprint 2's goal of wiring on-screen/keyboard input to the engine) is marked delivered under commit 105779b364a3f162be76d98ee257851cf01802f1.

**Related:** US-006, EPIC-003

### US-007 · approved · source: dev:US-007

Keyboard operation of the calculator was implemented and delivered.

Ticket US-007 ('Operate the calculator with the keyboard', 3 points, role=frontend-agent, part of EPIC-003 and Sprint 2's goal) is marked delivered under commit 105779b364a3f162be76d98ee257851cf01802f1.

**Related:** US-007, EPIC-003

### US-008 · approved · source: dev:US-008

Responsive layout for mobile and desktop screens was implemented and delivered.

Ticket US-008 ('Use the calculator on mobile and desktop screens', 5 points, role=frontend-agent, part of EPIC-004 and Sprint 2's goal of responsive layout) is marked delivered under commit 105779b364a3f162be76d98ee257851cf01802f1.

**Related:** US-008, EPIC-004

### US-009 · approved · source: dev:US-009

Low-bandwidth load performance support was implemented and delivered.

Ticket US-009 ('Work on low-bandwidth connections', 3 points, role=frontend-agent, part of EPIC-004 and Sprint 2's low-bandwidth performance goal) is marked delivered under commit 105779b364a3f162be76d98ee257851cf01802f1.

**Related:** US-009, EPIC-004

### US-012 · approved · source: dev:US-012

Client-side calculation history view was implemented and delivered.

Ticket US-012 ('View recent calculations in the browser', 5 points, role=frontend-agent, part of EPIC-006 and Sprint 3's goal of optional client-side history) is marked delivered under commit 105779b364a3f162be76d98ee257851cf01802f1.

**Related:** US-012, EPIC-006

### DEV-RUN-STATUS · draft · source: dev:run-status

The development run is reported as overall status 'completed', but only 5 of the 14 planned stories have ticket-level evidence of delivery, all sharing a single commit.

Reported delivered tickets: US-006, US-007, US-008, US-009, US-012, all under commit 105779b364a3f162be76d98ee257851cf01802f1. No ticket records were provided for Sprint 1's entire scope (US-001 decimal entry, US-002 four operations, US-003 running result, US-004 clear/all-clear, US-005 percentage, US-010 no-login access, US-011 no personal data collected) or for Sprint 3's accessibility release gate (US-013 and its subtasks US-013-T1 through US-013-T4, and US-014 accessibility conformance gate).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-013-T1, US-013-T2, US-013-T3, US-013-T4, US-014

- ⚠ Discrepancy: run status says 'completed' but ticket evidence covers only 5 of 14 stories — unclear whether the remaining 9 stories were actually completed and simply not reported, or are genuinely outstanding.
- ⚠ No ticket record for US-001 (decimal entry) — core arithmetic input status unconfirmed.
- ⚠ No ticket record for US-002 (four operations) — core arithmetic operations status unconfirmed.
- ⚠ No ticket record for US-003 (running result) — status unconfirmed.
- ⚠ No ticket record for US-004 (clear/all-clear) — status unconfirmed.
- ⚠ No ticket record for US-005 (percentage) — status unconfirmed.
- ⚠ No ticket record for US-010 (anonymous access) — status unconfirmed.
- ⚠ No ticket record for US-011 (no personal data collected, security-agent) — status unconfirmed, notable since this is a privacy-relevant requirement.
- ⚠ No ticket record for US-013 or subtasks US-013-T1..T4 (WCAG 2.1 AA accessibility work) — status unconfirmed.
- ⚠ No ticket record for US-014 (accessibility conformance release gate) — status unconfirmed; if this story is in fact the release gate, its absence from delivered tickets raises a question about whether the release gate has been met.
<!-- sdlc:auto:end narrative -->
