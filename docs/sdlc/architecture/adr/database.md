<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- None needed for this product

## Decision Outcome

Chosen option: PostgreSQL 16, because Provisioned as the platform standard for any future server-side persistence. No user data is written here, which is precisely what keeps DPDP, parental-consent and CERT-In data duties out of material scope (NFR-009).

## Consequences

Running a database that holds no data adds minor fixed cost; kept to a single small instance and justified as a forward-compatibility hook.
<!-- sdlc:auto:end adr -->