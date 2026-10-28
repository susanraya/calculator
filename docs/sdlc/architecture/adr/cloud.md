<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because AWS has the Mumbai region for low latency to Indian users and CloudFront for fast low-bandwidth delivery, and scales cheaply for a very light read-only app during registration and exam peaks.

## Consequences

Multi-service AWS setup (CloudFront, S3, Fargate, RDS) is slightly heavier than a single static host, but delivers the availability and latency the regions require.
<!-- sdlc:auto:end adr -->