# Ticket Ladder — 34 days

One ticket a day, ~1 hour, from ticket 7 to ticket 30. Tickets too big for an hour
are split across two days (`a` / `b`).

**Run `/day` to get today's brief. Run `/day review` when you think you're done.**

Rules:

- Tick a row only when its **Done when** is proven by hand, not when the code compiles.
- Branch and commit per row: `tkt-07a`, `tkt-07a: added AppError and error middleware`.
- One `notes.md` entry per row, about the **decision**, not the syntax.
- Miss a day? Shift every later date by one. Never skip a ticket — each phase assumes the last.
- A minimum day (no time to code) = read the concept, write the notes entry.

Status: **not started** · next up: Day 1, T-07a

---

## Phase A — Make failure a first-class path

- [ ] **Day 1 · Fri 28 Aug · T-07a** — `AppError` class; 404 catch-all + `(err, req, res, next)` handler registered last
  - Files: `src/errors/AppError.js` (new), `src/middleware/error.middleware.js` (new), `src/app.js`
  - Done when: an unmatched route returns a clean JSON 404 with no stack trace
- [ ] **Day 2 · Sat 29 Aug · T-07b** — services `throw` instead of returning error objects; delete `createErrorMessage`
  - Files: `src/services/user/user.service.js`, `src/controllers/user/user.controller.js`
  - Also fixes: empty catch in `findUserByEmail`, phantom `res` in `authenticateUser`, `== 23505` → `=== "23505"`
  - Done when: Postgres stopped → clean JSON 500, and the process is still alive
- [ ] **Day 3 · Sun 30 Aug · T-08** — Zod-validated `config.js`; await a real DB check before `listen`; SIGINT/SIGTERM drain
  - Files: `src/config.js` (new), `src/db.js`, `src/server.js`, `.env.example` (fix `DATBASE_HOST`)
  - Done when: renaming an env key gives a one-line startup failure naming that key
- [ ] **Day 4 · Mon 31 Aug · T-09** — `validate(schema, source)` middleware factory replaces both hand-written validators
  - Files: `src/middleware/validate.middleware.js` (new), `src/validators/user.validation.js` (rewrite), `src/routes/user/user.routes.js`
  - Done when: both field errors come back in one response, and `"role":"admin"` never reaches SQL
- [ ] **Day 5 · Tue 1 Sep · T-10** — `pino` + request id in `AsyncLocalStorage`; redact password · **PHASE A CHECKPOINT**
  - Files: `src/logger.js` (new), `src/middleware/request-context.middleware.js` (new), `src/app.js`
  - Done when: one request's log lines from middleware, controller and service all share an id

## Phase B — Auth that survives the next request

- [ ] **Day 6 · Wed 2 Sep · T-11a** — sign one HS256 JWT by hand with `node:crypto` (throwaway script)
  - Done when: your hand-signed token verifies, and you can name each of the three parts
- [ ] **Day 7 · Thu 3 Sep · T-11b** — `jsonwebtoken`; `requireAuth` sets `req.user`; `GET /user/me`
  - Done when: `/user/me` 200s with a token, 401s without, 401s on a hand-edited payload
- [ ] **Day 8 · Fri 4 Sep · T-12a** — `refresh_tokens` table storing a **hash**; httpOnly cookie; `POST /user/refresh`
  - Done when: a refresh call returns a new access token from the cookie alone
- [ ] **Day 9 · Sat 5 Sep · T-12b** — rotation; reuse of a revoked token revokes the family; `POST /user/logout`
  - Done when: replaying an old refresh token kills the session, and you can explain why
- [ ] **Day 10 · Sun 6 Sep · T-13** — verification token; `acc_status` → `ACTIVE`; login rejects `PENDING`/`BLOCKED`
  - Done when: a fresh registration can't log in until the printed link is visited; second visit fails
- [ ] **Day 11 · Mon 7 Sep · T-14** — `role` enum; `requireRole("ADMIN")` composed after `requireAuth` · **PHASE B CHECKPOINT**
  - Done when: a MEMBER token gets 403 (not 401), and you can say why they differ

## Phase C — The product it's named after

- [ ] **Day 12 · Tue 8 Sep · T-15** — `projects` + `tasks` migrations; index the FKs; companion `.md`
  - Done when: deleting a project removes its tasks, and CASCADE-vs-RESTRICT reasoning is in notes
- [ ] **Day 13 · Wed 9 Sep · T-16a** — `POST /tasks`, `GET /tasks/:id` with `owner_id` in the `WHERE`
  - Done when: create + fetch your own task works; 201 carries a `Location` header
- [ ] **Day 14 · Thu 10 Sep · T-16b** — `PATCH` / `DELETE`; 404 not 403 for someone else's row
  - Done when: two tokens, two users, neither sees the other's task by UUID
- [ ] **Day 15 · Fri 11 Sep · T-17a** — dynamic parameterised filters; sort column allow-list
  - Done when: `?sort=id;DROP TABLE tasks` is rejected by the allow-list
- [ ] **Day 16 · Sat 12 Sep · T-17b** — keyset pagination; `EXPLAIN ANALYZE` before and after the index
  - Done when: the seq scan becomes an index scan and you watched it happen
- [ ] **Day 17 · Sun 13 Sep · T-18** — reorder-tasks transaction on a dedicated `pool.connect()` client
  - Done when: a forced mid-transaction error writes nothing; 50 hits don't exhaust the pool
- [ ] **Day 18 · Mon 14 Sep · T-19** — soft delete; partial unique index; `updated_at` trigger · **PHASE C CHECKPOINT**
  - Done when: `notes.md` states the email-reuse decision *and* the reason, and the index enforces it

## Phase D — Proof, and repeatable setup

- [ ] **Day 19 · Tue 15 Sep · T-20a** — `node --test` + `supertest` against the exported `app`; test DB + truncate helper
  - Done when: one real integration test passes with no port bound
- [ ] **Day 20 · Wed 16 Sep · T-20b** — full register → verify → login → create-task path; replace `"test": "exit 1"`
  - Done when: `npm test` catches a bug you deliberately reintroduce
- [ ] **Day 21 · Thu 17 Sep · T-21** — own migration runner: `schema_migrations`, sorted `001_*.sql`, each in a transaction
  - Done when: `npm run migrate` builds an empty DB, and running it twice is a no-op
- [ ] **Day 22 · Fri 18 Sep · T-22** — `seed.js` + `npm run db:reset`; `process.argv` flags · **PHASE D CHECKPOINT**
  - Done when: a fresh clone goes to a populated, loggable-in API in one command

## Phase E — The parts that are actually about Node

- [ ] **Day 23 · Sat 19 Sep · T-23a** — pipe the upload to disk with `pipeline()` from `node:stream/promises`
  - Done when: a large upload lands on disk with flat process memory
- [ ] **Day 24 · Sun 20 Sep · T-23b** — size limit enforced mid-flight via `destroy()`; read back with `createReadStream`
  - Done when: an over-limit upload is cut off mid-transfer, not after
- [ ] **Day 25 · Mon 21 Sep · T-24** — `GET /tasks/export`: `pg-cursor` → `Transform` → `res`
  - Done when: 100k seeded rows start downloading immediately and memory stays flat
- [ ] **Day 26 · Tue 22 Sep · T-25a** — `jobs` table + `npm run worker` claiming with `FOR UPDATE SKIP LOCKED`
  - Done when: two workers run side by side and no job is processed twice
- [ ] **Day 27 · Wed 23 Sep · T-25b** — exponential backoff, max attempts, dead-letter state
  - Done when: a throwing job retries with a growing delay, then dead-letters
- [ ] **Day 28 · Thu 24 Sep · T-26a** — in-memory login rate limit, per IP and per email; 429 + `Retry-After`
  - Done when: six bad logins in a minute return 429
- [ ] **Day 29 · Fri 25 Sep · T-26b** — move the limiter to Redis; cache the task list with a TTL, invalidate on write
  - Done when: the limit holds across two `node` processes on different ports
- [ ] **Day 30 · Sat 26 Sep · T-27** — SSE push on task change; heartbeats; `req.on("close")` cleanup · **PHASE E CHECKPOINT**
  - Done when: a task created in one terminal appears in a `curl`-attached stream in another

## Phase F — Make it someone else's problem to run

- [ ] **Day 31 · Sun 27 Sep · T-28** — multi-stage Dockerfile (non-root) + compose: api / postgres / redis
  - Done when: `docker compose up` serves a working API on a machine with no Node
- [ ] **Day 32 · Mon 28 Sep · T-29a** — `/healthz` vs `/readyz`
  - Done when: you can state why an orchestrator needs both
- [ ] **Day 33 · Tue 29 Sep · T-29b** — `node:cluster`; a CPU-blocking route; then a `worker_threads` pool
  - Done when: you can demo one slow route freezing every request — then not doing that
- [ ] **Day 34 · Wed 30 Sep · T-30** — GitHub Actions CI; rewrite README · **PHASE F CHECKPOINT**
  - Done when: a green check on every push, and a stranger can run the project from the README alone
