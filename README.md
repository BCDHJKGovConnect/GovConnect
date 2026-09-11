# SIH Department Services MVP

## Overview

This project implements the **Department Services MVP** for the Smart India Hackathon (SIH) interoperability platform.

The MVP provides REST APIs for three government departments:

* **Identity Department**
* **Property Department**
* **Revenue/Tax Department**

It also provides a **Connector Service** that can call department APIs through a common interface.

The services use mock/in-memory data for the SIH demonstration.

---

## SIH Scenario

A citizen named **Ananya** wants to apply for a business license.

The government needs information from multiple independent departments:

```text
                    CITIZEN
                       |
                Business License
                       |
              Interoperability Hub
                 /      |      \
                /       |       \
               ↓        ↓        ↓
          Identity   Property   Revenue
          Service    Service    Service
```

Example identifiers used in the MVP:

| Department | Identifier           |
| ---------- | -------------------- |
| Identity   | `citizen_id = 101`   |
| Property   | `owner_ref = P458`   |
| Revenue    | `taxpayer_id = T782` |

**Note:** Identity resolution and cross-department identifier mapping are handled by the Interoperability Hub (Member 1). This MVP provides the individual department services and connector functionality.

---

## Technology Stack

* Node.js
* TypeScript
* Express.js
* CORS
* REST APIs
* In-memory mock data

---

## Project Structure

```text
sih-services/
│
├── src/
│   ├── server.ts
│   │
│   ├── services/
│   │   ├── identityService.ts
│   │   ├── propertyService.ts
│   │   ├── revenueService.ts
│   │   └── connectorService.ts
│   │
│   └── types/
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── .gitignore
```

`node_modules` and generated build files should not be committed to GitHub.

---

# Installation

## 1. Install dependencies

From the project directory:

```cmd
npm install
```

---

## 2. Start the development server

```cmd
npx tsx src/server.ts
```

The server runs on:

```text
http://localhost:3000
```

You should see:

```text
Department Services running on port 3000
```

---

# Health Check

To check whether the service is running:

```text
GET /health
```

Example:

```text
http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "Department Services"
}
```

---

# Department APIs

## 1. Identity Service

### Get Citizen

```text
GET /api/identity/citizen/:citizenId
```

Example:

```text
http://localhost:3000/api/identity/citizen/101
```

Expected response:

```json
{
  "success": true,
  "data": {
    "citizen_id": 101,
    "name": "Ananya",
    "date_of_birth": "2002-05-14",
    "address": "Bengaluru, Karnataka",
    "status": "active"
  }
}
```

### Invalid Citizen

Example:

```text
GET /api/identity/citizen/999
```

Response:

```json
{
  "success": false,
  "message": "Citizen not found"
}
```

---

# 2. Property Service

### Get Property by Owner Reference

```text
GET /api/property/owner/:ownerRef
```

Example:

```text
http://localhost:3000/api/property/owner/P458
```

Expected response:

```json
{
  "success": true,
  "data": {
    "owner_ref": "P458",
    "property_id": "PROP-458",
    "owner_name": "Ananya",
    "property_type": "Commercial",
    "address": "Bengaluru, Karnataka",
    "ownership_status": "verified",
    "property_status": "active"
  }
}
```

### Invalid Owner Reference

Example:

```text
GET /api/property/owner/INVALID
```

Response:

```json
{
  "success": false,
  "message": "Property not found"
}
```

---

# 3. Revenue/Tax Service

### Get Taxpayer

```text
GET /api/revenue/taxpayer/:taxpayerId
```

Example:

```text
http://localhost:3000/api/revenue/taxpayer/T782
```

Expected response:

```json
{
  "success": true,
  "data": {
    "taxpayer_id": "T782",
    "taxpayer_name": "Ananya",
    "tax_status": "compliant",
    "outstanding_amount": 0,
    "last_payment_date": "2026-08-15"
  }
}
```

### Invalid Taxpayer

Example:

```text
GET /api/revenue/taxpayer/INVALID
```

Response:

```json
{
  "success": false,
  "message": "Taxpayer not found"
}
```

---

# 4. Connector Service

The Connector Service provides a common mechanism for communicating with department APIs.

### Endpoint

```text
POST /api/connector/call
```

### Request Body

```json
{
  "endpoint": "http://localhost:3000/api/identity/citizen/101",
  "method": "GET"
}
```

### Example using cURL

```cmd
curl -X POST http://localhost:3000/api/connector/call -H "Content-Type: application/json" -d "{\"endpoint\":\"http://localhost:3000/api/identity/citizen/101\",\"method\":\"GET\"}"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "success": true,
    "data": {
      "citizen_id": 101,
      "name": "Ananya",
      "date_of_birth": "2002-05-14",
      "address": "Bengaluru, Karnataka",
      "status": "active"
    }
  }
}
```

The connector can similarly call the Property and Revenue services.

---

# API Summary

| Service   | Method | Endpoint                            | Example                      |
| --------- | ------ | ----------------------------------- | ---------------------------- |
| Health    | GET    | `/health`                           | `/health`                    |
| Identity  | GET    | `/api/identity/citizen/:citizenId`  | `/api/identity/citizen/101`  |
| Property  | GET    | `/api/property/owner/:ownerRef`     | `/api/property/owner/P458`   |
| Revenue   | GET    | `/api/revenue/taxpayer/:taxpayerId` | `/api/revenue/taxpayer/T782` |
| Connector | POST   | `/api/connector/call`               | `/api/connector/call`        |

---

# Integration with Interoperability Hub

The Department Services MVP is designed to be consumed by the **Interoperability Hub**.

The expected flow is:

```text
Citizen Portal
      |
      ↓
Interoperability Hub
      |
      ├──→ Identity Service
      |
      ├──→ Property Service
      |
      └──→ Revenue Service
                |
                ↓
       Common Data Model
                |
                ↓
       Business License Service
```

The Hub is responsible for:

1. Receiving the citizen's request.
2. Resolving the required department identifiers.
3. Calling the appropriate department services.
4. Collecting responses.
5. Converting the information into the common data model.
6. Passing the consolidated information to the final business-license workflow.

This Department Services MVP does **not** perform identity resolution.

---

# Sample SIH Data Flow

For the demonstration citizen **Ananya**:

### Identity

```text
citizen_id = 101
```

returns:

```text
Name: Ananya
Status: active
```

### Property

The Hub can use the mapped property reference:

```text
owner_ref = P458
```

returns:

```text
Property Type: Commercial
Ownership: verified
Property Status: active
```

### Revenue

The Hub can use the mapped taxpayer identifier:

```text
taxpayer_id = T782
```

returns:

```text
Tax Status: compliant
Outstanding Amount: 0
```

The Interoperability Hub can then combine these results for the business-license workflow.

---

# Error Handling

The services return JSON responses for common errors.

### Resource Not Found

HTTP status:

```text
404
```

Example:

```json
{
  "success": false,
  "message": "Citizen not found"
}
```

### Missing Connector Endpoint

HTTP status:

```text
400
```

Example:

```json
{
  "success": false,
  "message": "Endpoint is required"
}
```

### Department Connection Failure

HTTP status:

```text
500
```

Example:

```json
{
  "success": false,
  "message": "Unable to connect to department service"
}
```

---

# Current MVP Limitations

This is an SIH demonstration MVP.

Currently:

* Department data is stored in memory.
* No production database is connected.
* Authentication is not implemented.
* Authorization is not implemented.
* Department identifiers are mock values.
* Identity resolution is handled by the future Interoperability Hub.
* Connector requests currently support the basic HTTP method/endpoint flow.

These can be replaced or extended during later integration.

---

# Team Integration Notes

The Department Services MVP is intended to run as a standalone Node.js/TypeScript service.

The Interoperability Hub can communicate with it through:

```text
http://localhost:3000
```

When the team integrates the components, the department service endpoints are:

```text
Identity:
GET /api/identity/citizen/:citizenId

Property:
GET /api/property/owner/:ownerRef

Revenue:
GET /api/revenue/taxpayer/:taxpayerId

Connector:
POST /api/connector/call
```

The service can later be moved to another port or deployed to a server without changing the department API structure.

---

# Development

Compile the TypeScript project using:

```cmd
npx tsc
```

The compiled JavaScript files will be generated inside:

```text
dist/
```

For development, use:

```cmd
npx tsx src/server.ts
```

---

# SIH Member 5 Deliverable

This repository contains the **Department Services MVP** assigned to Member 5:

* Identity Department API
* Property Department API
* Revenue/Tax Department API
* Connector Service
* Health endpoint
* Error handling
* CORS support
* Mock data for SIH demonstration
* Integration-ready REST endpoints
