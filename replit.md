# SIH Government Interoperability Department Services

An educational MVP of three independent government department APIs and an extensible in-memory Connector Framework for a Smart India Hackathon business-licence interoperability platform.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run all services together for the preview (port 8080)
- `pnpm --filter @workspace/api-server run dev:identity` — run Identity Service independently (port 3001)
- `pnpm --filter @workspace/api-server run dev:property` — run Property Service independently (port 3002)
- `pnpm --filter @workspace/api-server run dev:revenue` — run Revenue Service independently (port 3003)
- `pnpm --filter @workspace/api-server run dev:connector` — run Connector Framework independently (port 3004)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-server run typecheck` — typecheck the department-services module

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Data: in-memory TypeScript arrays for the educational MVP
- Validation: small explicit TypeScript validation helpers
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/api-server/src/services/identity` — citizen lookup service
- `artifacts/api-server/src/services/property` — property ownership service
- `artifacts/api-server/src/services/revenue` — taxpayer status service
- `artifacts/api-server/src/services/connector` — connector CRUD framework
- `README.md` — complete API reference and SIH presentation notes

## Architecture decisions

- Department services never perform identity resolution; that belongs in the Interoperability Hub.
- `SERVICE=all` exposes all routes together for the preview, while service-specific scripts run ports 3001–3004 independently.
- Mock data is in-memory so the service boundaries are easy to understand before adding department-owned databases.
- The Connector Framework stores configuration metadata only; it does not proxy external APIs yet.

## Product

- Look up citizen, property, and revenue records over REST.
- Check service health.
- Create, list, update, and delete future department connector configurations.

## User preferences

- Keep this module beginner-friendly and technically correct for a third-year CSE student presenting at SIH.
- Do not add React, Python, Docker, a database, or a dynamic proxy unless explicitly requested.

## Gotchas

- Connector changes are lost when the process restarts because storage is intentionally in memory.
- Use `/api/...` when calling the combined service through the Replit preview proxy; use `/identity/...`, `/property/...`, `/revenue/...`, and `/connectors/...` on direct service ports.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
