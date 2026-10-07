# Hackathon Backend API (NestJS)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A high-performance, secure, and modular backend API built with NestJS, featuring advanced runtime security, robust authentication, and type-safe database modeling.</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

---

## Overview

This repository houses a production-grade backend API engineered to support a comprehensive hackathon management platform. Built following strict software architecture principles (Dependency Injection, modular design, and robust separation of concerns), the project demonstrates modern backend development standards including automated security guardrails, granular Role-Based Access Control (RBAC), and transactional data integrity.

---

## Tech Stack & Architecture

- **Framework:** NestJS (Node.js/TypeScript) leveraging modular architecture and constructor-based dependency injection.
- **Database & ORM:** PostgreSQL managed via Prisma ORM with multi-file schema configuration and automated migrations.
- **Authentication & Authorization:** Better-Auth providing secure session-based cookie handling and custom RBAC (`ADMIN` vs. `PARTICIPANT`).
- **Security & Threat Mitigation:** Arcjet integration providing global security shielding (SQL injection, XSS prevention), sliding-window rate limiting, and adaptive protection layers.
- **Data Validation & Transformation:** Global validation pipes using `class-validator` and `class-transformer`, paired with custom response formatting interceptors.

---

## Key Features

- **Advanced Application Security:** Global threat monitoring and automated mitigation against common web vulnerabilities via Arcjet. Configurable rate limiting to protect endpoints from abuse and denial-of-service vectors.
- **Secure Session-Based Auth & RBAC:** Complete credential management (sign-up/sign-in) with server-side sessions. Privileged administrative actions are locked behind custom decorators and guards.
- **Core Hackathon Management Flow:**
  - Admins can create, update, schedule, and lifecycle-manage hackathons.
  - Participants can securely browse active events and register with concurrency controls preventing duplicate entries.
- **Consistent API Interceptors:** Standardized response structure (`statusCode`, `message`, `data`) across all endpoints with support for route-specific custom messaging decorators.

---

## Project Setup & Installation

### 1. Clone & Install Dependencies

```bash
git clone [https://github.com/your-username/nestjs-hackathon-api.git](https://github.com/your-username/nestjs-hackathon-api.git)
cd nestjs-hackathon-api
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hackathon_db?schema=public"
BETTER_AUTH_SECRET="your-generated-secure-secret"
ARCJET_KEY="your-arcjet-api-key"
ARCJET_ENV="development"
ARCJET_MODE="live"
```

### 3. Database Setup & Migration

```bash
# Generate Prisma Client
npm run db:generate

# Apply database migrations
npm run db:migrate

# development watch mode
npm run start:dev

# production build and start
npm run build
npm run start:prod
```

### 4. Security

To prevent privilege escalation, public sign-ups are strictly constrained to the PARTICIPANT role. To initialize the primary system administrator, execute a secure database transaction directly:

```bash
UPDATE "user"
SET "role" = 'ADMIN'
WHERE "email" = 'admin@yourdomain.com';
```

## License

This project is open-source under the [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
