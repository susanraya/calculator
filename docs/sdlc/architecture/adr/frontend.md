<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Svelte
- Vue

## Decision Outcome

Chosen option: React 19, because The entire product runs in the browser; React 19 gives a single responsive SPA and a mature accessibility ecosystem (ARIA, focus management, screen-reader labels) to meet the WCAG 2.1 AA / RPwD release gate. Keeps the payload light for low-bandwidth mobile.

## Consequences

A SPA needs disciplined bundle budgeting to stay lightweight on constrained networks; addressed with code-splitting and CDN caching.
<!-- sdlc:auto:end adr -->