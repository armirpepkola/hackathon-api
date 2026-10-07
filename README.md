# Enterprise Hackathon Backend API (NestJS)

>>>>>>> b6e187826e18d58ae92e5cb69c2057a4039f3df4
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<<<<<<< HEAD
[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
npm install
```

Create `.env` from `.env.example`, then fill in `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `ARCJET_KEY`. `FRONTEND_URL` controls credentialed browser CORS. The API defaults to port 8080.

Generate Prisma Client from the multi-file schema before building:

```bash
npm run db:generate
npm run build
```

Apply migrations only after confirming that `DATABASE_URL` points to the intended database:

```bash
npm run db:migrate -- --name <migration-name>
```

Public sign-up always assigns the `PARTICIPANT` role. To provision the first administrator, use a trusted database administration session after verifying the target database and the user's email:

```sql
UPDATE "user"
SET "role" = 'ADMIN'
WHERE "email" = '<verified-admin-email>';
```

Never expose an endpoint that lets a user promote themselves.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Auto-instrument your application with [NestJS Observer](https://observer.nestjs.com). Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======
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

* **Framework:** NestJS (Node.js/TypeScript) leveraging modular architecture and constructor-based dependency injection.
* **Database & ORM:** PostgreSQL managed via Prisma ORM with multi-file schema configuration and automated migrations.
* **Authentication & Authorization:** Better-Auth providing secure session-based cookie handling and custom RBAC (`ADMIN` vs. `PARTICIPANT`).
* **Security & Threat Mitigation:** Arcjet integration providing global security shielding (SQL injection, XSS prevention), sliding-window rate limiting, and adaptive protection layers.
* **Data Validation & Transformation:** Global validation pipes using `class-validator` and `class-transformer`, paired with custom response formatting interceptors.

---

## Key Features

* **Advanced Application Security:** Global threat monitoring and automated mitigation against common web vulnerabilities via Arcjet. Configurable rate limiting to protect endpoints from abuse and denial-of-service vectors.
* **Secure Session-Based Auth & RBAC:** Complete credential management (sign-up/sign-in) with server-side sessions. Privileged administrative actions are locked behind custom decorators and guards.
* **Core Hackathon Management Flow:** 
  * Admins can create, update, schedule, and lifecycle-manage hackathons.
  * Participants can securely browse active events and register with concurrency controls preventing duplicate entries.
* **Consistent API Interceptors:** Standardized response structure (`statusCode`, `message`, `data`) across all endpoints with support for route-specific custom messaging decorators.

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
This project is open-source under the MIT License.
