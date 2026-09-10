# SIH Government Interoperability Department Services

This project is the Member 5 module for a Smart India Hackathon (SIH) business-licence interoperability platform. It provides three small simulated government systems and an in-memory Connector Framework.

The services deliberately do **not** resolve citizen identities. Each department owns its own identifier and returns only its own data. The Interoperability Hub, built by Member 1, can later connect:

```text
Identity citizen_id 101
        ↕
Property owner_ref P458
        ↕
Revenue taxpayer_id T782
```

## What is included

| Service | Default port | Responsibility |
| --- | ---: | --- |
| Identity Service | 3001 | Looks up citizens by numeric `citizen_id` |
| Property Service | 3002 | Looks up property ownership by `owner_ref` |
| Revenue Service | 3003 | Looks up tax status by `taxpayer_id` |
| Connector Framework | 3004 | Stores configuration for future department APIs |

The preview workflow also supports running all four service routes together on port 8080. That is convenient for demonstrating the whole module without opening four terminals.

## Folder structure

```text
artifacts/api-server/
├── package.json
├── scripts/
│   └── run-service.mjs                Cross-platform service launcher
└── src/
    ├── app.ts                         Express middleware and legacy /api routes
    ├── index.ts                       Reads SERVICE and PORT, then starts a server
    ├── lib/logger.ts                  Structured server logging
    ├── routes/
    │   ├── health.ts                  Existing /api/healthz endpoint
    │   └── index.ts                   /api compatibility routes
    ├── shared/
    │   ├── errors.ts                  HTTP errors and final error handler
    │   └── validation.ts              Small reusable input checks
    └── services/
        ├── index.ts                   Mounts one service or all services
        ├── identity/
        │   ├── data/citizens.ts       Mock citizen records
        │   ├── controllers.ts         Citizen lookup logic
        │   └── routes.ts              Identity HTTP routes
        ├── property/
        │   ├── data/properties.ts     Mock property records
        │   ├── controllers.ts         Property lookup logic
        │   └── routes.ts              Property HTTP routes
        ├── revenue/
        │   ├── data/taxpayers.ts      Mock tax records
        │   ├── controllers.ts         Taxpayer lookup logic
        │   └── routes.ts              Revenue HTTP routes
        └── connector/
            ├── data/connectors.ts     In-memory connector records
            ├── controllers.ts         Connector CRUD logic
            └── routes.ts              Connector CRUD routes
```

## Architecture

Each department is a separate Express router with its own mock data and business responsibility:

1. A request reaches a route such as `GET /identity/citizen/101`.
2. The router sends it to the matching controller.
3. The controller validates the identifier.
4. The controller searches only that department's in-memory data.
5. It returns JSON with a success or error HTTP status.

The department services do not know that `101`, `P458`, and `T782` may be the same person. This separation is intentional: the department systems remain independent, and the Interoperability Hub owns cross-system identity resolution.

## GitHub and VS Code setup on Windows

This module uses only Node.js, TypeScript, Express, and the dependencies listed in `artifacts/api-server/package.json`. The actual APIs do not require Replit, a database, Docker, Linux shell commands, or environment secrets.

### Option A: Clone the complete team repository

Install Node.js 20 or newer and Git on the Windows computer. In PowerShell or the VS Code terminal:

```powershell
git clone <YOUR_TEAM_GITHUB_REPOSITORY_URL>
cd <YOUR_TEAM_REPOSITORY_FOLDER>
corepack enable
pnpm install
```

Run the complete Member 5 module together:

```powershell
pnpm --filter @workspace/api-server run dev:all
```

Run one service independently:

```powershell
pnpm --filter @workspace/api-server run dev:identity
pnpm --filter @workspace/api-server run dev:property
pnpm --filter @workspace/api-server run dev:revenue
pnpm --filter @workspace/api-server run dev:connector
```

The scripts are cross-platform because they use a small Node.js launcher instead of Unix-only commands such as `export PORT=3001`.

### Option B: Share only the Member 5 module

If the team wants this module in its own folder inside the larger repository:

1. Copy `artifacts/api-server/` into the team repository, for example as `member-5-services/`.
2. Open that folder in VS Code.
3. Install its dependencies.
4. Run the required service scripts.

```powershell
cd member-5-services
npm install
npm run dev:all
```

The same folder also supports:

```powershell
npm run dev:identity
npm run dev:property
npm run dev:revenue
npm run dev:connector
npm run typecheck
npm run build
```

No `.env` file is required for this MVP. If a future local configuration file is added, keep secrets in `.env`; the repository `.gitignore` excludes `.env` and `.env.*` files while allowing a safe `.env.example`.

## Running the services

### Run all services together

This is the easiest way to demonstrate the complete module:

```bash
# From the complete team repository:
pnpm --filter @workspace/api-server run dev:all

# From the artifacts/api-server or member-5-services folder:
npm run dev:all
```

It starts the combined server on port 8080. When called directly from a local computer, use the unprefixed routes:

```bash
curl http://localhost:8080/identity/health
curl http://localhost:8080/identity/citizen/101
curl http://localhost:8080/property/owner/P458
curl http://localhost:8080/revenue/taxpayer/T782
curl http://localhost:8080/connectors
```

When using the Replit preview proxy, use the `/api` prefix:

```bash
curl http://localhost:80/api/identity/health
curl http://localhost:80/api/identity/citizen/101
curl http://localhost:80/api/property/owner/P458
curl http://localhost:80/api/revenue/taxpayer/T782
curl http://localhost:80/api/connectors
```

### Run each service independently

Open one PowerShell or VS Code terminal per service. From the complete team repository:

```bash
pnpm --filter @workspace/api-server run dev:identity
pnpm --filter @workspace/api-server run dev:property
pnpm --filter @workspace/api-server run dev:revenue
pnpm --filter @workspace/api-server run dev:connector
```

From the standalone module folder, use `npm` instead:

```bash
npm run dev:identity
npm run dev:property
npm run dev:revenue
npm run dev:connector
```

These use ports 3001, 3002, 3003, and 3004 respectively. The exact department routes are available directly on each port:

```bash
curl http://localhost:3001/identity/citizen/101
curl http://localhost:3002/property/owner/P458
curl http://localhost:3003/revenue/taxpayer/T782
curl http://localhost:3004/connectors
```

## API documentation

All successful responses are JSON. All services include CORS and a health endpoint.

### Identity Service

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/identity/health` | Check whether the service is up |
| GET | `/identity/citizen/:id` | Find a citizen by numeric ID |

Example:

```bash
curl http://localhost:3001/identity/citizen/101
```

```json
{
  "citizen_id": 101,
  "name": "Ananya",
  "address": "Bangalore"
}
```

Mock records: `101 Ananya/Bangalore`, `102 Rahul/Bangalore`, and `103 Priya/Mysore`.

### Property Service

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/property/health` | Check whether the service is up |
| GET | `/property/owner/:ownerRef` | Find ownership information by reference |

Example:

```bash
curl http://localhost:3002/property/owner/P458
```

```json
{
  "owner_ref": "P458",
  "property_location": "Bangalore",
  "ownership": "VALID"
}
```

Mock records: `P458 Bangalore/VALID`, `P621 Bangalore/INVALID`, and `P735 Mysore/VALID`.

### Revenue Service

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/revenue/health` | Check whether the service is up |
| GET | `/revenue/taxpayer/:taxpayerId` | Find a taxpayer's status |

Example:

```bash
curl http://localhost:3003/revenue/taxpayer/T782
```

```json
{
  "taxpayer_id": "T782",
  "tax_status": "CLEAR"
}
```

Mock records: `T782 CLEAR`, `T910 DUES_PENDING`, and `T441 CLEAR`.

### Connector Framework

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/connectors/health` | Check whether the framework is up |
| GET | `/connectors` | List configured departments |
| POST | `/connectors` | Add a department connector |
| GET | `/connectors/:id` | Read one connector |
| PUT | `/connectors/:id` | Update one or more connector fields |
| DELETE | `/connectors/:id` | Remove a connector |

Example create request:

```bash
curl -X POST http://localhost:3004/connectors \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Transport Department",
    "api_type": "REST",
    "data_format": "JSON",
    "authentication": "API_KEY",
    "endpoint": "https://transport.example.gov/api",
    "enabled": true
  }'
```

Example response:

```json
{
  "id": 2,
  "department": "Transport Department",
  "api_type": "REST",
  "data_format": "JSON",
  "authentication": "API_KEY",
  "endpoint": "https://transport.example.gov/api",
  "enabled": true
}
```

The connector framework stores metadata only. It does not yet proxy requests or call an external department API. That is a deliberate MVP boundary.

## HTTP status codes

| Status | Meaning | Example |
| ---: | --- | --- |
| 200 | Successful read or update | Existing citizen returned |
| 201 | Connector created | New connector returned |
| 204 | Connector deleted | No response body |
| 400 | Invalid ID, URL, JSON, or request field | `/citizen/abc` |
| 404 | Requested record does not exist | `/citizen/999` |
| 500 | Unexpected server error | Unhandled application failure |

Errors are clear JSON objects, for example:

```json
{
  "error": "Citizen not found",
  "citizen_id": 999
}
```

## How the Interoperability Hub will communicate

When a user submits a business-licence application, Member 1's Interoperability Hub can:

1. Resolve or map the submitted person to department identifiers.
2. Call `GET /identity/citizen/101` for identity information.
3. Call `GET /property/owner/P458` for property validation.
4. Call `GET /revenue/taxpayer/T782` for tax status.
5. Combine the responses into the licence decision flow.

The Hub should handle timeouts and partial failures. If one department is down, the Hub should report that department as unavailable, avoid pretending that missing data is valid, and apply the team's chosen retry or manual-review policy. The individual department services remain simple and focused.

## Why separate department services?

- Each government department owns its own data and identifier format.
- A problem in one service does not require rewriting the others.
- The Hub can call them independently and combine their responses.
- A future department can be added through a new connector configuration.
- The boundaries are easy to explain, test, and replace with real government APIs later.

## How TypeScript and Express are used

- TypeScript types describe citizens, properties, taxpayers, and connectors.
- Express creates HTTP servers and maps HTTP methods and paths to controllers.
- Controllers contain the readable request/validation/lookup/response flow.
- Routers group related endpoints for each department.
- JSON middleware reads request bodies for connector POST and PUT requests.
- CORS middleware allows a future React frontend or the Hub to call these APIs.

## SIH presentation notes

### One-minute explanation

> I built four independently runnable Express services for the government interoperability layer. Identity, Property, and Revenue each expose a small REST API over their own mock data. They intentionally keep different identifiers because real government systems often have different records and reference formats. I did not resolve those identifiers inside the department services; Member 1's Interoperability Hub owns that cross-system mapping. I also built a Connector Framework with CRUD APIs so a future department can be configured without changing the core Hub.

### Questions judges may ask

**Why are the identifiers different?**  
Each department created its own identifier system. The identity department uses numeric citizen IDs, property uses `P` references, and revenue uses `T` taxpayer IDs. The Hub maps them when it knows they belong to the same person.

**Why does Member 5 not perform identity resolution?**  
Identity resolution is an interoperability concern, not a department-system concern. Keeping it in the Hub avoids duplicating mapping logic across every department and preserves each system's independence.

**What happens if a service is down?**  
The Hub can detect the failed health check or request, mark that department unavailable, and follow a retry or manual-review policy. It must not silently treat unavailable information as a successful validation.

**Why use Express routers?**  
Routers keep each department's endpoints together and make it possible to run one service or all services without mixing their controller logic.

**How can another department be added?**  
The Connector Framework stores its department name, API type, data format, authentication style, endpoint, and enabled state. The current MVP stops at configuration; a later version can use that metadata to create a safe API adapter or proxy.

**Why is the data in memory?**  
This MVP is for demonstrating service boundaries and communication. In-memory data keeps the demo understandable and avoids introducing a database before the architecture is validated. A real implementation would replace the data modules with repositories backed by department-owned databases.

## Code checks

Run the TypeScript check for this module:

```bash
pnpm --filter @workspace/api-server run typecheck
```

Build the runnable bundle:

```bash
# Complete team repository:
pnpm --filter @workspace/api-server run build

# Standalone module folder:
npm run build
```

## Integrating with Member 1 and Member 4

Member 1's Interoperability Hub should run these services separately and call them over HTTP:

| Service | Local base URL |
| --- | --- |
| Identity | `http://localhost:3001` |
| Property | `http://localhost:3002` |
| Revenue | `http://localhost:3003` |
| Connector Framework | `http://localhost:3004` |

For the business-licence flow, Member 1 can:

1. Resolve the user's department identifiers in the Hub.
2. Call `GET http://localhost:3001/identity/citizen/101`.
3. Call `GET http://localhost:3002/property/owner/P458`.
4. Call `GET http://localhost:3003/revenue/taxpayer/T782`.
5. Combine the three JSON responses into the licence decision.

Member 4's frontend should call Member 1's Hub, not the department services directly, unless the team explicitly wants a diagnostics screen. The department services are backend-to-backend APIs and already allow CORS for that future use.

The identifiers are intentionally not converted inside this module:

```text
101 ↔ P458 ↔ T782
```

That mapping belongs to Member 1's Interoperability Hub. The Hub should also handle timeouts, unavailable services, retries, and manual-review decisions. It must not treat a failed department request as a valid result.

If the team combines this module into a larger Node.js repository, keep the `artifacts/api-server` source folders together and preserve the four ports. Member 1 only needs the HTTP contract; Member 4 only needs the Hub endpoint or response shape. No department-service source changes are required for normal integration.