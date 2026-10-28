# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · approved · source: requirements:delivery-scope

Defines the lightweight delivery scope for requirements v1 and explicitly excludes native/installable apps.

Delivery scope is 'lightweight', requirements version 1. In-scope capabilities: four basic operations, percentage, decimal input, running result, clear/all-clear, on-screen buttons, keyboard entry, responsive low-bandwidth layout, anonymous public use with no login, and optional client-side-only history. Out of scope: native mobile or desktop installable calculator app.

### REQ-STACK · approved · source: requirements:technology-stack

Product owner approved an exact technology stack: FastAPI backend, AWS cloud, PostgreSQL database (unused by design), and React frontend.

Backend: FastAPI 0.115, chosen to reliably serve the static-like app and expose a health/status endpoint during peak traffic. Cloud: AWS, chosen for Mumbai-region low latency to Indian users plus a global CDN for low-bandwidth mobile performance, scaling cheaply for a read-only app. Database: PostgreSQL 16, included as the platform standard but intentionally holds no data because the tool stores nothing server-side; this is explicitly used to keep DPDP/parental-consent/CERT-In duties out of scope. Frontend: React 19, chosen so all arithmetic runs client-side, supports low-bandwidth mobile, and eases WCAG 2.1 AA conformance (keyboard operability, ARIA labels, focus handling).

**Related:** NFR-001, NFR-002, NFR-003, NFR-008

- ⚠ No architecture-phase documentation exists yet translating this approved stack into an actual design (e.g., health endpoint contract, CDN/caching configuration, deployment topology) -- design against exactly this stack is still pending.

### EPIC-001 · approved · source: requirements:EPIC-001

Core arithmetic: number entry including decimals, the four basic operations, a chainable running result, and clear/all-clear controls.

US-001 (critical): digit entry builds a displayed number; a single decimal point per number is allowed, a second attempted decimal point is ignored (AC-001..AC-003). US-002 (critical): add/subtract/multiply/divide two operands with correct results; divide-by-zero shows a non-crashing error such as 'Cannot divide by zero'; decimal results use a consistent, defined precision (AC-004..AC-006). US-003 (high): selecting a new operator after a result applies it to the running result and next operand; re-requesting the result without new input keeps showing the current result (AC-007, AC-008). US-004 (high): clear (C) clears current entry while preserving running operation state; all-clear (AC) resets display and discards all stored operands/operators/results (AC-009, AC-010).

**Related:** US-001, US-002, US-003, US-004, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010

- ⚠ AC-006 requires 'a consistent, defined precision' for decimal results but does not state what that precision actually is -- needs to be defined in design/development.

### EPIC-002 · approved · source: requirements:EPIC-002

Percentage operation applied either to a single number or relative to a first operand mid-calculation.

US-005 (high): activating percentage on an entered number converts it to a percentage value; when a first operand and operator are already set, percentage is calculated relative to that first operand and the running result updates (AC-011, AC-012).

**Related:** US-005, AC-011, AC-012

- ⚠ AC-011 gives two alternative behaviors ('50 becomes 0.5 or is applied against the current operand per the defined percentage behaviour') without settling on one -- the exact percentage semantics are not yet finalized.

### EPIC-003 · approved · source: requirements:EPIC-003

Calculator is operable via on-screen touch/pointer buttons and via physical/virtual keyboard, producing identical results.

US-006 (critical): tapping/clicking on-screen digit, operator, decimal, percentage, clear and all-clear buttons performs the action and updates the display; each button shows a visible pressed/active state (AC-013, AC-014). US-007 (high): keyboard number keys, operator keys (+, -, *, /), decimal key, Enter/= and Escape/Delete for clear each match their on-screen equivalents; keyboard and on-screen input can be mixed within one calculation against shared state (AC-015, AC-016).

**Related:** US-006, US-007, AC-013, AC-014, AC-015, AC-016

### EPIC-004 · approved · source: requirements:EPIC-004

Responsive web delivery that works on mobile, tablet and desktop, and remains usable on low-bandwidth connections; no native app.

US-008 (high): on small mobile viewports all buttons/display are visible, legible and tappable without horizontal scroll or overlap (AC-017); on desktop viewports layout adapts while staying usable (AC-018). US-009 (medium): loads within a reasonable time with a lightweight payload on constrained connections and becomes fully usable (AC-019); once loaded, all calculation functions work client-side without further network requests (AC-020). Supported by NFR-001 (fast load on low bandwidth), NFR-002 (fully client-side computation), NFR-007 (responsive layout), NFR-008 (web-only, no native/installable app).

**Related:** US-008, US-009, AC-017, AC-018, AC-019, AC-020, NFR-001, NFR-002, NFR-007, NFR-008

### EPIC-005 · approved · source: requirements:EPIC-005

Free, anonymous, no-login public utility that collects and stores no personal data on any server.

US-010 (critical): calculator is immediately usable on page load with no login/registration/account prompt, and no payment/subscription/billing is ever requested (AC-021, AC-022). US-011 (high): no personal data is collected, transmitted or stored on a server during any interaction (AC-023); this no-personal-data position is to be documented so that India's DPDP Act, parental-consent and CERT-In obligations remain out of material scope -- explicitly flagged in the requirement itself as 'an assumption to be confirmed' (AC-024). Compliance: DPDP Act 2023 (India) -- notice/consent, data-principal rights, breach notification, and verifiable parental consent for under-18 users are assumed not to apply because no personal data is processed; CERT-In's 6-hour incident reporting and 180-day log retention are likewise assumed out of scope on the same basis.

**Related:** US-010, US-011, AC-021, AC-022, AC-023, AC-024, NFR-004, NFR-009

- ⚠ The no-personal-data/no-consent-duties position is explicitly called out in AC-024 as an assumption needing confirmation by a human reviewer -- not yet signed off.
- ⚠ Education domain skill flags age-appropriate design codes and verifiable parental consent for minors; since the calculator may be used by school-age students, the project should explicitly confirm no age-gating or parental consent is needed given the no-data-collection design.
- ⚠ No mention of analytics, crash reporting, or third-party scripts (e.g., CDN telemetry) that could inadvertently collect data -- not addressed by any requirement.

### EPIC-006 · approved · source: requirements:EPIC-006

Optional calculation history, kept only in the browser for the current session and clearable by the user.

US-012 (low): when history is enabled, completed calculations appear in a client-side list (AC-025); history is kept client-side only and never transmitted/persisted on a server (AC-026); user can clear the history list, removing entries from the browser (AC-027). Compliance: aligns with NFR-005 (history kept only in the browser) and reinforces the no-personal-data position used to keep DPDP/CERT-In duties out of scope.

**Related:** US-012, AC-025, AC-026, AC-027, NFR-005

- ⚠ History is described as 'optional' but no requirement specifies how a user enables/disables it or whether it is on by default.

### EPIC-007 · approved · source: requirements:EPIC-007

WCAG 2.1 AA accessibility, aligned with India's RPwD Act 2016 and GIGW guidance, treated as a mandatory release gate.

US-013 (critical): every control is keyboard-reachable with a visible focus indicator and keyboard-activatable (AC-028); screen readers get an accessible name/label for every control and the result display, and results are announced (AC-029). US-014 (high): release candidates are evaluated against WCAG 2.1 AA (contrast, focus order, labels, keyboard operability) and release is blocked until failures are resolved (AC-030); colour contrast meets WCAG 2.1 AA minimums and state is never conveyed by colour alone (AC-031). Compliance: Rights of Persons with Disabilities Act 2016 (India) and GIGW guidelines, aligned with WCAG 2.1 AA -- accessibility release gate; NFR-006 makes this a hard gate rather than a best-effort goal.

**Related:** US-013, US-014, AC-028, AC-029, AC-030, AC-031, NFR-006

- ⚠ No testing-phase evidence yet exists that WCAG 2.1 AA conformance has actually been evaluated or passed -- the release gate defined here cannot currently be confirmed as met.

### REQ-NFR-003 · approved · source: requirements:NFR-003

System-wide requirement to stay available and responsive during term-start registration and exam-week traffic peaks.

NFR-003 (scalability, applies to whole system): the service must stay up and serve the app reliably during registration and exam-week peaks, supported by a simple health/status endpoint on the FastAPI server. Compliance: Higher-Education typical non-functional requirement -- 'scaling for term-start and exam peaks' / 'load peaks at registration, results day and exam windows'.

**Related:** REQ-STACK

- ⚠ No architecture or capacity-planning detail (e.g., autoscaling rules, CDN caching strategy, expected concurrent-user targets) has been provided to show how this requirement will actually be met.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-28

**Capabilities in scope:** Addition, subtraction, multiplication and division, Percentage calculation, Decimal number input, Running result display, Clear and all-clear controls, On-screen calculator buttons, Keyboard number and operator entry, Responsive layout for mobile and low-bandwidth browsers, Anonymous public use with no login or accounts, Optional calculation history kept only in the browser, never saved to a server

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | This calculator does all its work in the browser and stores nothing, so the server's only real job is to reliably serve the app and stay healthy during term-start and exam-week traffic peaks. FastAPI is a light, dependable way to host it and add a simple health or status endpoint, and it matches the platform's default stack so nothing exotic has to be maintained. |
| cloud | AWS | A free, public utility for Indian higher education needs to stay up during registration and exam peaks and load quickly on mobile across India. AWS has infrastructure in the Mumbai region for low latency to your users and a global CDN to keep the app fast on low bandwidth, and it scales cheaply for what is a very light, read-only app. |
| database | PostgreSQL | You confirmed the tool is fully anonymous, collects and stores no personal data, and that any calculation history stays on the user's own device. So there is nothing to persist. PostgreSQL is included as the platform's standard database should you ever add something that must be saved server-side, but by design it holds no user data here, which is exactly what keeps DPDP, parental-consent and CERT-In data duties out of scope. |
| frontend | React | The whole product lives in the browser: entering numbers, running the arithmetic, and showing the display all happen on the user's device. React gives you a single responsive interface that works on low-bandwidth mobile browsers for students and staff, and its ecosystem makes hitting your WCAG 2.1 AA / RPwD release gate (keyboard operability, screen-reader labels, focus handling on the buttons) straightforward and well-documented. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Core Arithmetic Calculation

The calculator lets a user enter numbers (including decimals), perform the four basic operations and view a running result, with clear and all-clear controls. Assumption: supported operations are addition, subtraction, multiplication, division, percentage, clear/all-clear and decimal input (percentage and detailed input methods are covered in separate epics).

### US-001: Enter numbers including decimals

**Priority:** critical

> As a calculator user, I want to enter whole and decimal numbers, so that I can set up the values I need to calculate.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | the calculator display is empty | I enter the digits 1, 2 and 3 in sequence | the display shows 123 |
| AC-002 | I have entered a number with no decimal point | I enter a decimal point followed by digits | the display shows the number with a single decimal point and the entered fractional digits |
| AC-003 | I have already entered a decimal point in the current number | I attempt to enter a second decimal point | the second decimal point is ignored and the number keeps a single decimal point |

### US-002: Perform addition, subtraction, multiplication and division

**Priority:** critical

> As a calculator user, I want to add, subtract, multiply and divide two numbers, so that I can carry out basic arithmetic.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have entered a first operand | I select an operator and a second operand and request the result | the display shows the correct arithmetic result of applying that operator to the two operands |
| AC-005 | I have entered a first operand and selected the divide operator | I enter zero as the second operand and request the result | the calculator shows a clear, non-crashing error indication (for example 'Cannot divide by zero') instead of a numeric result |
| AC-006 | the calculator supports decimal operands | I perform an operation on decimal numbers | the result is displayed to a consistent, defined precision without unexpected rounding errors in the display |

### US-003: View a running result

**Priority:** high

> As a calculator user, I want to chain operations and see the running result update, so that I can perform multi-step calculations without re-entering intermediate values.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I have computed a result from one operation | I select another operator and enter a new operand | the new operator is applied to the running result and the next operand |
| AC-008 | I have a running result displayed | I request the result again without entering a new operand | the display continues to show the current running result without error |

### US-004: Clear and all-clear controls

**Priority:** high

> As a calculator user, I want to clear the current entry or reset the whole calculation, so that I can correct mistakes or start a new calculation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I have entered a number or partial calculation | I activate the clear (C) control | the current entry is cleared while any stored running operation state is preserved per the defined clear behaviour |
| AC-010 | I have a running calculation in progress | I activate the all-clear (AC) control | the display resets to its initial state and all stored operands, operators and running results are discarded |

## EPIC-002: Percentage Calculation

The calculator supports a percentage operation. Assumption: percentage is included as a supported operation alongside the four basic operators.

### US-005: Calculate a percentage

**Priority:** high

> As a calculator user, I want to apply a percentage operation to a number, so that I can quickly work out percentages for everyday calculations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I have entered a number | I activate the percentage control | the display shows that number converted to its percentage value (for example 50 becomes 0.5 or is applied against the current operand per the defined percentage behaviour) |
| AC-012 | I have entered a first operand and an operator | I enter a second value and activate the percentage control | the percentage is calculated relative to the first operand and the running result updates accordingly |

## EPIC-003: Input Methods: On-screen Buttons and Keyboard

Users can operate the calculator both with on-screen buttons and with a physical/virtual keyboard. Assumption: both input methods are supported and produce identical results.

### US-006: Operate the calculator with on-screen buttons

**Priority:** critical

> As a calculator user on a touch or pointer device, I want to tap on-screen buttons for digits, operators and controls, so that I can use the calculator without a keyboard.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | the calculator is displayed | I tap or click an on-screen digit, operator, decimal, percentage, clear or all-clear button | the corresponding action is performed and the display updates accordingly |
| AC-014 | I tap an on-screen button | the button is activated | the button gives a visible pressed/active state so I can confirm the input registered |

### US-007: Operate the calculator with the keyboard

**Priority:** high

> As a calculator user with a keyboard, I want to enter numbers and operators using keyboard keys, so that I can calculate faster without using the pointer.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | the calculator has keyboard focus | I press number keys, operator keys (+, -, *, /), the decimal key, Enter/= and Escape/Delete for clear | each key produces the same result as its equivalent on-screen button |
| AC-016 | I use keyboard entry and on-screen buttons in the same session | I mix the two input methods within one calculation | both methods update the same shared calculation state consistently |

## EPIC-004: Responsive, Low-Bandwidth Web Delivery

The calculator is delivered as a responsive web application that works on mobile and low-bandwidth browsers. Assumption: responsive web app only; no native mobile or desktop app is built (native/installable apps are explicitly out of scope).

### US-008: Use the calculator on mobile and desktop screens

**Priority:** high

> As a student or staff member using varied devices, I want the calculator layout to adapt to my screen size, so that I can use it comfortably on a phone, tablet or desktop.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | I open the calculator on a small mobile viewport | the page renders | all buttons and the display are visible, legible and tappable without horizontal scrolling or overlapping controls |
| AC-018 | I open the calculator on a desktop viewport | the page renders | the layout adapts to the larger screen while keeping controls usable |

### US-009: Work on low-bandwidth connections

**Priority:** medium

> As a user on a slow or constrained network, I want the calculator to load and function with minimal data, so that I can use it reliably on low-bandwidth mobile connections.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | I access the calculator on a constrained/low-bandwidth connection | the page loads | it loads within a reasonable time with a lightweight payload and becomes fully usable |
| AC-020 | the calculator has loaded | I perform calculations | all calculation functions work client-side without requiring further network requests |

## EPIC-005: Anonymous Public Access and Privacy

The calculator is a free, public, anonymous utility with no login, no user accounts and no personal data collected or stored. Assumption: because no personal data is held, DPDP consent-manager, parental-consent and CERT-In data obligations do not materially apply; the tool is free with no payments or billing.

### US-010: Use the calculator without login or accounts

**Priority:** critical

> As a member of the public, I want to use the calculator immediately without signing in or registering, so that I can calculate without any barriers or account setup.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | I navigate to the calculator | the page loads | the calculator is immediately usable with no login, registration or account prompt |
| AC-022 | I use the calculator | I complete any calculation | no payment, subscription or billing is requested at any point as the tool is free to use |

### US-011: No personal data collected or stored

**Priority:** high

> As a privacy-conscious user, I want the calculator to collect and store no personal data, so that my privacy is preserved and India's DPDP, parental-consent and CERT-In data obligations remain out of material scope.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I use the calculator for any calculation | I interact with the application | no personal data is collected, transmitted to or stored on a server |
| AC-024 | the privacy approach assumes no personal data is held | the product is assessed against India's DPDP Act, parental-consent and CERT-In requirements | the absence of personal-data processing is documented so these obligations remain out of material scope (assumption to be confirmed) |

## EPIC-006: Optional Client-Side Calculation History

If calculation history is included, it is kept only in the browser and never saved to a server. Assumption: history is optional and client-side only; it must not be persisted server-side, consistent with the no-personal-data model.

### US-012: View recent calculations in the browser

**Priority:** low

> As a calculator user, I want to see a list of my recent calculations within the current browser session, so that I can refer back to earlier results without re-typing them.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | calculation history is enabled | I complete one or more calculations | those calculations are shown in a client-side history list in the browser |
| AC-026 | history is maintained in the browser | the history is stored | it is kept client-side only and is never transmitted to or persisted on a server |
| AC-027 | I have a history list displayed | I choose to clear the history | the client-side history entries are removed from the browser |

## EPIC-007: Accessibility (WCAG 2.1 AA Release Gate)

The calculator meets WCAG 2.1 AA, aligned with India's RPwD Act 2016 and GIGW guidance, treated as a release gate. Assumption: WCAG 2.1 AA conformance including keyboard operability and screen-reader labels is a mandatory release gate.

### US-013: Fully operable by keyboard and assistive technology

**Priority:** critical

> As a user who relies on a keyboard or screen reader, I want to operate every calculator function without a pointer and have controls properly labelled, so that I can use the calculator with assistive technology.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I navigate the calculator using only the keyboard | I tab through and activate controls | every button and control is reachable, has a visible focus indicator and can be activated by keyboard |
| AC-029 | I use a screen reader | I move focus to any button or to the result display | each control has an accessible name/label and the current result is announced |

### US-014: Accessibility conformance as a release gate

**Priority:** high

> As a product owner, I want WCAG 2.1 AA conformance verified before release, so that the calculator does not exclude learners and aligns with the RPwD Act and GIGW.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | a release candidate is prepared | accessibility is evaluated against WCAG 2.1 AA (including colour contrast, focus order, labels and keyboard operability) | the release is blocked until all identified WCAG 2.1 AA failures are resolved |
| AC-031 | the interface uses colour to convey state | a user views active, error or focus states | colour contrast meets WCAG 2.1 AA minimums and state is not conveyed by colour alone |
<!-- sdlc:auto:end epics -->
