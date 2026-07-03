# foundry-kiln

![License: MIT](https://img.shields.io/badge/License-MIT-111111?style=for-the-badge&labelColor=111111&color=ff4b12)
![TypeScript](https://img.shields.io/badge/TypeScript-80.6%25-111111?style=for-the-badge&labelColor=111111&color=2f74c0)
![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-111111?style=for-the-badge&labelColor=111111&color=3ecf8e)
![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-111111?style=for-the-badge&labelColor=111111&color=000000)

A meticulously crafted multi-tenant operations platform for Foundry Collective Limited — designed to unify customer-facing commerce, internal workflows, and financial control across the organization’s business units in a single, scalable monorepo.

Foundry Kiln combines a modern Next.js frontend, a Supabase-backed data layer, and a strongly governed PostgreSQL schema to support an organization that needs to operate across distinct service lines while preserving a single source of truth for identity, permissions, and the ledger.

---

## Table of Contents

- [What Foundry Kiln Is](#what-foundry-kiln-is)
- [Why This Project Exists](#why-this-project-exists)
- [Core Product Philosophy](#core-product-philosophy)
- [Key Capabilities](#key-capabilities)
- [Architecture Overview](#architecture-overview)
- [Repository Structure](#repository-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Workflow](#database-workflow)
- [Module Overview](#module-overview)
- [Design System Notes](#design-system-notes)
- [Development Scripts](#development-scripts)
- [Deployment Notes](#deployment-notes)
- [Security and Access Control](#security-and-access-control)
- [Contributing](#contributing)
- [License](#license)

---

## What Foundry Kiln Is

Foundry Kiln is a monorepo for an operational platform built around a single organization and multiple business units. The system is designed to support:

- a public-facing experience for customers and leads,
- an internal operations experience for staff and administrators,
- a shared permissions and identity model,
- a unified financial ledger,
- and a data architecture that can grow without collapsing into siloed implementations.

At a practical level, the repository currently centers on:

- a **web application** in `apps/web`,
- a **database package** in `packages/database`,
- shared configuration in `packages/config`,
- and a Turborepo-based workspace structure that keeps build, lint, type-check, and database tasks coordinated.

---

## Why This Project Exists

Many business systems begin with a single UI and gradually accrete hidden complexity: roles become inconsistent, permissions drift, accounting data gets split across features, and public content becomes tightly coupled to admin workflows.

Foundry Kiln takes a different approach.

It is built to ensure that:

- every business unit can operate with its own identity and workflows,
- all operational activity still rolls up to one organization,
- access control is explicit and policy-driven,
- and every important write path can be traced and governed at the database layer.

This makes the platform suitable for a real-world operation that needs both brand flexibility and centralized control.

---

## Core Product Philosophy

### 1. One organization, many business units
The data model is centered on an organization that owns multiple business units. This allows distinct operational surfaces without fragmenting the system into unrelated apps.

### 2. Database-first governance
Security, access, and business rules are enforced where they matter most: in PostgreSQL, through constraints, functions, row-level security, and triggers.

### 3. Unified ledger
Instead of scattering revenue data across modules, the platform posts activity into a shared `transactions` layer so reporting stays coherent.

### 4. Monorepo discipline
Shared tooling, shared config, and a coordinated build pipeline reduce drift and make the codebase easier to maintain at scale.

### 5. Product surfaces can evolve independently
The architecture supports multiple operational areas with different workflows, while still preserving common identity, navigation, and data governance primitives.

---

## Key Capabilities

- **Next.js application architecture** with App Router and TypeScript.
- **Supabase integration** for Auth, Postgres, and session-aware server/client access.
- **Turborepo orchestration** for efficient workspace-level commands.
- **PostgreSQL migrations** for core entities, policies, triggers, and business logic.
- **Role and permission modeling** with support for organization-wide and business-unit-scoped access.
- **Row Level Security (RLS)** for controlled public and authenticated access.
- **Automated ledger posting** via database triggers and functions.
- **Phase-ready mobile app structure** reserved under `apps/mobile`.

---

## Architecture Overview

Foundry Kiln uses a layered architecture:

### Presentation layer
The web application lives in `apps/web` and uses modern Next.js patterns, including server/client Supabase helpers.

### Domain and platform layer
The database package holds schema migrations and the logic that defines the operating model of the system.

### Shared configuration layer
Reusable configuration is centralized in `packages/config` to keep TypeScript, ESLint, Tailwind, and formatting aligned.

### Orchestration layer
The root `package.json` and `turbo.json` coordinate workspace tasks across the repository.

This separation is intentional: UI can move quickly, but the underlying rules remain stable and auditable.

---

## Repository Structure

```text
foundry-kiln/
├── apps/
│   ├── web/                # Next.js web application
│   └── mobile/             # Reserved for future Expo app
├── packages/
│   ├── database/           # PostgreSQL migrations, seeds, types
│   └── config/             # Shared lint/TS/tailwind/prettier config
├── turbo.json              # Turbo task pipeline
├── package.json            # Root workspace scripts
└── README.md               # Project overview
```

### Current repository shape
- **TypeScript** is the dominant language.
- **PLpgSQL** powers the database business logic.
- **CSS** supports the styling layer.
- **JavaScript** appears minimally.

---

## Technology Stack

### Frontend
- Next.js
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query
- Recharts
- Lucide React
- class-variance-authority
- clsx
- tailwind-merge
- date-fns

### Backend and data
- Supabase
- PostgreSQL
- Row Level Security
- PL/pgSQL migrations and functions
- Supabase SSR helpers for browser and server sessions

### Tooling
- Turborepo
- ESLint
- Prettier
- npm workspaces

---

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm 10 or newer
- A Supabase project with URL and anon key configured

### Install dependencies
```bash
npm install
```

### Run the development environment
```bash
npm run dev
```

### Build the workspace
```bash
npm run build
```

### Lint the codebase
```bash
npm run lint
```

### Type-check the codebase
```bash
npm run type-check
```

### Format the repository
```bash
npm run format
```

---

## Environment Variables

The web application expects the following Supabase variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

These are used by:
- `apps/web/src/lib/supabase/client.ts`
- `apps/web/src/lib/supabase/server.ts`

You should configure them in the appropriate `.env.local` file for your environment.

---

## Database Workflow

The repository includes database-oriented workspace scripts:

```bash
npm run db:migrate
npm run db:seed
```

These commands are routed through Turborepo and filtered to the database package.

### Database design highlights
The migrations define a strong operational backbone, including:

- organizations
- business units
- user profiles
- roles
- permissions
- role permissions
- user roles
- categories and subcategories
- access policies and helper functions
- trigger-based accounting behavior

### Notable database patterns
- **`user_has_permission(...)`** checks role-based permissions.
- **`user_can_access_unit(...)`** verifies business-unit access.
- **`user_org_id()`** resolves the authenticated user’s organization.
- **RLS policies** control access to public content and authenticated management paths.
- **Triggers** convert operational events into ledger entries.

This makes the database not just a storage layer, but an enforceable part of the product’s behavior.

---

## Module Overview

### `apps/web`
The main application surface. It currently includes:
- Supabase browser and server clients,
- route-grouped Next.js page structure,
- business-unit-specific views such as The Booth,
- and a layout approach that supports public and internal experiences.

### `packages/database`
Contains the schema migrations and PL/pgSQL functions that define the platform’s core business rules.

### `packages/config`
Centralized configuration package for shared project standards.

### `apps/mobile`
Reserved for a future Expo-based mobile app, currently documented as Phase 2.

---

## Design System Notes

The existing UI direction suggests a strong brand system with a distinctive, high-contrast visual identity.

Observed cues include:
- a premium, editorial aesthetic,
- explicit business-unit branding,
- utility-first structure,
- and clearly differentiated public vs. operational experiences.

If you expand the README with screenshots later, this is a strong candidate for a **hero image, architecture diagram, and module overview grid**.

---

## Development Scripts

### Root scripts
| Script | Description |
| --- | --- |
| `npm run dev` | Start the Turbo-powered development workflow |
| `npm run build` | Build all workspace projects |
| `npm run lint` | Run workspace linting |
| `npm run type-check` | Run TypeScript validation |
| `npm run clean` | Remove generated outputs |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed the database |
| `npm run format` | Format supported source files |

### App scripts
- `apps/web`: `dev`, `build`, `start`, `lint`

---

## Deployment Notes

A typical deployment model for this repository would be:

- **Web app** deployed separately from the database layer,
- **Supabase** hosting the PostgreSQL/auth stack,
- **Environment variables** injected in the hosting platform,
- and **database migrations** applied through a controlled workflow.

Because this is a monorepo, you can scale deployment responsibilities independently without rewriting the repository structure.

---

## Security and Access Control

Security is one of the strongest design points in this project.

### Access control model
- Users belong to an organization.
- Roles are assigned to users.
- Roles are connected to permissions.
- Permissions can be scoped to business units.

### Public data policy
The database includes policies that allow anonymous users to read only active public content.

### Authenticated management policy
Authenticated users manage data only when the records belong to their organization.

### Why this matters
This structure reduces the risk of accidental data exposure and makes the platform better suited to a multi-role team environment.

---

## Contributing

Contributions should preserve the repository’s architectural intent:

1. Keep domain rules in the database when they are security- or integrity-sensitive.
2. Prefer shared configuration over duplication.
3. Keep business-unit distinctions explicit.
4. Preserve the separation between public and internal surfaces.
5. Write changes that are easy to test, migrate, and reason about.

If you introduce new modules, document them clearly and align them with the existing monorepo structure.

---

## License

This project is licensed under the MIT License.
