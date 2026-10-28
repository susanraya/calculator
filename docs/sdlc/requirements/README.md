# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-STACK · approved · source: requirements:technology-stack

Product owner approved an exact technology stack to design against: FastAPI 0.115 (backend), AWS (cloud), PostgreSQL 16 (database), React 19 (frontend). No substitutions permitted.

- Backend FastAPI 0.115: server only needs to reliably host the browser app and expose a health/status endpoint during term-start/exam peaks.
- Cloud AWS: Mumbai region for low latency to Indian users plus global CDN for low-bandwidth mobile; scales cheaply for a light, read-only app.
- Database PostgreSQL 16: included as platform standard for any future server-side persistence; by design the app stores no user data, which is stated as keeping DPDP, parental-consent and CERT-In data duties out of scope.
- Frontend React 19: entire product runs client-side; chosen for a single responsive SPA and a mature accessibility ecosystem to meet the WCAG 2.1 AA / RPwD release gate on low-bandwidth mobile.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007

### REQ-SCOPE · draft · source: requirements:scope

Delivery scope is 'lightweight', requirements version 1. In-scope capabilities cover the full basic calculator feature set; native/installable mobile or desktop apps are explicitly out of scope.

In scope: addition/subtraction/multiplication/division, percentage, decimal input, running result, clear/all-clear, on-screen buttons, keyboard entry, responsive low-bandwidth layout, anonymous public use with no login/accounts, optional client-side-only calculation history.
Out of scope: native mobile or desktop app (installable iOS/Android/Windows calculator).

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007

### EPIC-001 · draft · source: requirements:EPIC-001

Core arithmetic: entering whole/decimal numbers, the four basic operations, a running result, and clear/all-clear controls.

- US-001 (critical): digits entered in sequence build the display value (AC-001); a decimal point can be added once per number (AC-002); a second decimal-point attempt is ignored (AC-003).
- US-002 (critical): operator + second operand produces the correct arithmetic result (AC-004); dividing by zero shows a clear, non-crashing error such as 'Cannot divide by zero' instead of a number (AC-005); decimal results are shown to a consistent, defined precision without unexpected rounding artifacts (AC-006).
- US-003 (high): a new operator+operand applies to the prior result for chained calculations (AC-007); requesting the result again with no new operand keeps showing the current running result (AC-008).
- US-004 (high): Clear (C) erases only the current entry, preserving running operation state (AC-009); All-Clear (AC) resets the display and discards all stored operands/operators/results (AC-010).
Epic assumption: supported operations are +, -, *, /, %, clear/all-clear and decimal input; percentage and input methods are covered in separate epics.

**Related:** US-001, US-002, US-003, US-004, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010

### EPIC-002 · draft · source: requirements:EPIC-002

Calculator supports a percentage operation, both standalone and relative to a prior operand.

- US-005 (high): activating percentage on a single entered number converts it to its percentage value (e.g. 50 -> 0.5) (AC-011); with a first operand and operator already set, percentage is calculated relative to the first operand and the running result updates (AC-012).

**Related:** US-005, AC-011, AC-012

- ⚠ Exact percentage algorithm is described only as 'per the defined percentage behaviour' — the precise rule for the relative case (AC-012) is not fully pinned down in the requirements text.

### EPIC-003 · draft · source: requirements:EPIC-003

Both on-screen buttons and keyboard entry are supported and must produce identical results, usable interchangeably.

- US-006 (critical): tapping/clicking digit, operator, decimal, percentage, clear or all-clear buttons performs the action and updates the display (AC-013); each tapped button shows a visible pressed/active state (AC-014).
- US-007 (high): number keys, operator keys (+,-,*,/), decimal key, Enter/= and Escape/Delete produce the same result as the equivalent on-screen button (AC-015); mixing keyboard and on-screen input within one calculation updates the same shared state consistently (AC-016).

**Related:** US-006, US-007, AC-013, AC-014, AC-015, AC-016

### EPIC-004 · draft · source: requirements:EPIC-004

Responsive web delivery for mobile and low-bandwidth use; no native/installable app is built.

- US-008 (high): small mobile viewports show all buttons/display legibly and tappably with no horizontal scrolling or overlap (AC-017); desktop viewports adapt the layout while keeping controls usable (AC-018).
- US-009 (medium): the app loads within a reasonable time as a lightweight payload on constrained connections and becomes fully usable (AC-019); once loaded, all calculation functions run client-side with no further network requests (AC-020).
Epic assumption: responsive web app only; native/installable mobile or desktop apps are explicitly out of scope.

**Related:** US-008, US-009, AC-017, AC-018, AC-019, AC-020, NFR-001, NFR-002, NFR-007, NFR-008

### EPIC-005 · draft · source: requirements:EPIC-005

Free, public, anonymous utility: no login/accounts/payment, and no personal data is collected or stored, intended to keep India's DPDP, parental-consent and CERT-In data duties out of material scope.

- US-010 (critical): the calculator is immediately usable with no login, registration or account prompt (AC-021); no payment, subscription or billing is ever requested since it is free (AC-022).
- US-011 (critical): no personal data is collected, transmitted to, or stored on a server during any interaction (AC-023).
- Compliance trace — DPDP Act 2023 (India): AC-024 documents the assumption that, because no personal data is processed, DPDP data-principal/consent-manager duties, verifiable parental consent for minors, and CERT-In breach-notification duties remain out of material scope. This is explicitly labelled 'an assumption to be confirmed', not a verified legal determination.
- Compliance trace — Consumer Protection Act 2019 / IT (Intermediary) Rules 2021 (India): not triggered, since AC-022 confirms no payments, accounts, or user-generated content hosting occur.

**Related:** US-010, US-011, AC-021, AC-022, AC-023, AC-024, NFR-004, NFR-009

- ⚠ The no-personal-data / DPDP-out-of-scope position (AC-024) is explicitly flagged in the requirements as an assumption still to be confirmed — not yet signed off by a human or legal reviewer.
- ⚠ No information is given on user ages (e.g., whether under-18 learners could access this public tool), which the Education domain skill calls out as needed to assess DPDP verifiable-parental-consent applicability.

### EPIC-006 · draft · source: requirements:EPIC-006

Optional calculation history, kept entirely client-side and never persisted server-side.

- US-012 (low): completed calculations appear in a client-side, in-session history list (AC-025); history is kept client-side only and never transmitted to or persisted on a server (AC-026); the user can clear the history, removing entries from the browser (AC-027).

**Related:** US-012, AC-025, AC-026, AC-027, NFR-005

### EPIC-007 · draft · source: requirements:EPIC-007

WCAG 2.1 AA conformance, aligned with India's RPwD Act 2016 and GIGW guidance, is treated as a mandatory pre-release gate.

- US-013 (critical): every control is reachable and activatable by keyboard alone with a visible focus indicator (AC-028); every control and the result display has an accessible name/label and the current result is announced to screen readers (AC-029).
- US-014 (high): a release candidate is evaluated against WCAG 2.1 AA (colour contrast, focus order, labels, keyboard operability) and release is blocked until failures are resolved (AC-030); colour-conveyed state (active/error/focus) must also meet AA contrast minimums and not rely on colour alone (AC-031).
- Compliance trace — RPwD Act 2016 (India) and GIGW guidelines: WCAG 2.1 AA conformance is explicitly adopted as the release gate to align with these per the epic's stated assumption.

**Related:** US-013, US-014, AC-028, AC-029, AC-030, AC-031, NFR-006

### REQ-NFR-SET · draft · source: requirements:non-functional-requirements

Nine cross-cutting non-functional requirements span performance, scalability, privacy, accessibility, usability and compatibility.

- NFR-001 (performance): fast load on low-bandwidth connections (applies US-009).
- NFR-002 (performance): all calculations run client-side after load, no further network requests (US-009, US-010).
- NFR-003 (scalability): stay available through term-start/exam peaks, supported by a health/status endpoint (whole system).
- NFR-004 (privacy): no personal data collected/transmitted/stored (US-011).
- NFR-005 (privacy): history kept client-side only, never persisted server-side (US-012).
- NFR-006 (accessibility): WCAG 2.1 AA as a release gate, incl. keyboard operability, focus indicators, screen-reader labels/announcements, colour contrast (US-013, US-014).
- NFR-007 (usability): responsive layout across mobile/desktop screen sizes (US-008).
- NFR-008 (compatibility): runs in mobile/desktop/low-bandwidth web browsers; no native/installable app (US-008, US-009).
- NFR-009 (compliance, accepted risk): no-personal-data position documented so DPDP/parental-consent/CERT-In data duties remain out of material scope, assumption to be confirmed (US-011).

**Related:** NFR-001, NFR-002, NFR-003, NFR-004, NFR-005, NFR-006, NFR-007, NFR-008, NFR-009, US-008, US-009, US-010, US-011, US-012, US-013, US-014

- ⚠ NFR-003 (availability during peaks) has no load-testing evidence in the testing phase input.
- ⚠ NFR-009 is explicitly labelled an accepted-risk assumption pending confirmation against the DPDP Act.
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
