# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /health | health | `backend/app/main.py:49` | Liveness probe used by the load balancer and monitoring (NFR-003). |
| GET | /{path:path} | spa_not_built | `backend/app/main.py:88` | Answers the approved GET /{path:path} route before a frontend |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
_Code matches the designed API._
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `01a6886`
<!-- sdlc:auto:end source -->
