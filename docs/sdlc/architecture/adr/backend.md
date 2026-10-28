<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Starlette

## Decision Outcome

Chosen option: FastAPI 0.115, because The server's only job is to reliably serve the app and expose a health endpoint; FastAPI 0.115 is a light, dependable host that matches the platform default and stays healthy during peaks (NFR-003).

## Consequences

FastAPI is more than a static server strictly needs, but it keeps the stack uniform and adds the health endpoint with no exotic maintenance.
<!-- sdlc:auto:end adr -->