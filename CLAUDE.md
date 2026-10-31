# CLAUDE.md: HireTrack AI

Persistent project rules. Read this at the start of every session.
Items marked **[PROPOSED]** are defaults I (the owner) have not finalized. Do not treat them as approved until the marker is removed.

## 1. What this project is

HireTrack AI is a multi-tenant recruitment management platform (ATS). Companies publish jobs, candidates apply through a public careers site, recruiters move applications through a hiring pipeline, interviewers submit feedback, and AI assists (never replaces) human screening.

## 2. Current state vs target state

Never confuse these. Inspect the repo before claiming anything is implemented.

**Current (reported, verify before relying on it)**
- Next.js 16 App Router, React, TypeScript, Tailwind, shadcn/ui, Lucide
- Auth.js / NextAuth, bcryptjs, Zod
- Prisma 7.x on Neon PostgreSQL
- Jobs, Candidates, Applications foundations; resume metadata fields on Candidate

**Target**
- Frontend: keep Next.js + React + TypeScript + Tailwind + shadcn/ui; add React Hook Form + Zod
- Backend: Java 21 + Spring Boot (modular monolith), Spring Security, Spring Data JPA/Hibernate, Maven, Flyway, OpenAPI
- Database: Neon PostgreSQL (kept)
- Storage: Cloudflare R2 behind a storage interface
- Background work: PostgreSQL-backed job table with `FOR UPDATE SKIP LOCKED`
- AI: OpenAI behind a provider interface
- Version numbers for Java and Spring Boot: **[PROPOSED]** pin the latest stable LTS-compatible release during Phase 1 and record it here.

## 3. Hard rules

1. Inspect existing code before making assumptions. A Prisma model is not a feature.
2. Never overwrite working features without a migration plan. The app must stay usable throughout.
3. Never let two backends write to the same table. Ownership of each domain's writes switches once, after verification.
4. No microservices. One deployable Spring Boot app with domain modules.
5. No `any` in TypeScript. No `ddl-auto=update` in Java. Use `validate`.
6. Never run destructive database commands, drop tables, or rename columns without explicit approval and a verified backup or Neon branch.
7. Never hardcode secrets, commit `.env` files, or log signed URLs, tokens, passwords, or resume content.
8. Controllers are thin, services hold business rules, repositories only persist. Never expose JPA entities through the API; use DTOs.
9. Do not add dependencies unless necessary, and say why.
10. Never claim tests pass without running them. Never fabricate results.
11. Do not redesign the existing UI during backend migration.
12. Do not start a phase or implement anything until I approve the proposal.

## 4. Security requirements (always apply)

- Authorization is enforced on the backend for every protected operation. Frontend role checks are cosmetic only.
- Tenant isolation: derive the organization from the authenticated membership, never from a client-supplied `organization_id`. Every ID-based lookup must also check organization ownership (IDOR protection).
- Roles are per organization membership, not a single global role on the user.
- No auth tokens in localStorage.
- Resumes are private. Serve them only through short-lived signed URLs after an authorization check.
- Validate file size, type, and name; generate safe object keys.
- Rate-limit and de-duplicate the public apply endpoint.
- AI output is advisory. A human makes every hiring decision. Store the evidence behind every AI assessment.

## 5. Decisions

**Authentication across Next.js and Spring Boot [PROPOSED]**
Spring Boot issues the session (JWT or opaque token) in an httpOnly, Secure, SameSite cookie. Next.js proxies `/api/v1/*` to Spring via rewrites so the browser sees one origin (no CORS or cross-site cookie problems). Existing bcryptjs hashes (`$2a`/`$2b`) are verified by Spring's `BCryptPasswordEncoder`, so users do not need to re-register. Confirm hash format in the audit before relying on this.

**Permission matrix [PROPOSED], edit before Phase 2**

| Action | Admin | Recruiter | Hiring Manager | Interviewer |
|---|---|---|---|---|
| Manage organization and members | Yes | No | No | No |
| Create / edit / publish jobs | Yes | Yes | No (can request) | No |
| Manage candidates | Yes | Yes | View only, for own jobs | No |
| View applications | Yes | Yes | Own jobs only | Assigned interviews only |
| Move application stages | Yes | Yes | Own jobs only | No |
| Schedule interviews | Yes | Yes | Own jobs only | No |
| Submit interview feedback | Yes | No | Own jobs only | Assigned only |

**Hosting [PROPOSED]**: decide before Phase 1 where the Spring Boot app runs (Render, Railway, or Fly.io). Note JVM cold starts on free tiers.

**Neon**: Flyway uses the direct connection; the app uses the pooled connection. Test the Flyway baseline on a Neon branch of real data before touching the main branch. Decide what happens to Prisma's `_prisma_migrations` table.

## 6. Scope

**MVP (release 1)**: organizations and roles, jobs, public apply with resume upload, pipeline with immutable status history, dashboard.

**Release 2**: interviews and scorecards, notifications, background workers, AI analysis, analytics.

**Later**: billing, integrations, custom stages, ATS import.

**Phase order [PROPOSED]**
0. Codebase audit (no code)
1. Spring Boot foundation (health check, config, Flyway baseline plan, error handling, tests)
2. First vertical slice: Spring login against existing users + Jobs list served from Java in the existing UI
3. Organizations, membership, RBAC, tenant isolation
4. Jobs (full CRUD, publish/close, public listing API)
5. Candidates and applications with status history (metadata-only resume until Phase 6)
6. Resume storage (R2, signed URLs, validation)
7. Public careers site and apply flow
8. Dashboard API integration
9. Interviews and scorecards
10. Background jobs and notifications
11. AI analysis
12. Cleanup: remove Prisma access, old Auth.js, obsolete Next.js APIs; production hardening

## 7. Workflow for each phase

Lightweight phases: Understand, Propose (files, DB changes, API, security notes), wait for my approval, implement, verify, report.

Full gates (use for Phases 3, 6, and 10): add detailed database design, API design, frontend plan, and edge cases (concurrency, failures, invalid input) to the proposal.

Report format after implementing: files created / modified / removed, DB changes, API changes, security changes, tests executed (with real results), known issues, suggested git commit message.

Stop after each approved step and wait for the next instruction.

## 8. API conventions

- Base path `/api/v1`; REST conventions; request and response DTOs; Bean Validation
- Pagination, filtering, sorting on list endpoints
- Centralized exception handler with a consistent error shape and no internal details leaked
- OpenAPI documentation
- Test with JUnit 5, Mockito, Spring Boot Test, and Testcontainers (real PostgreSQL); frontend with Playwright and TypeScript type checks