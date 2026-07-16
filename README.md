# Conduit Full-Stack App

A greenfield RealWorld-style social blogging application with an Express/PostgreSQL API and React/Vite SPA.

## Setup

```sh
npm install
cp .env.example .env
docker compose up -d postgres
npm run migrate
npm run dev
```

The frontend runs at `http://localhost:3000`; the API defaults to `http://localhost:3001`.

## Environment

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: secret used to sign JWTs; tokens are not stored in the database.
- `PORT`: backend port.
- `CLIENT_ORIGIN`: CORS origin for the SPA.
- `VITE_API_BASE_URL`: frontend API base URL.

## Scripts

- `npm run build` compiles backend TypeScript and builds the Vite SPA.
- `npm test` runs backend API tests against `pg-mem` and frontend page/component tests.
- `npm run migrate` applies SQL migrations to the configured PostgreSQL database.
- `npm run dev` starts backend and frontend development servers.

## Feature coverage

The app implements Conduit registration, login/session persistence, protected editor/settings routes, global and personal feeds, article CRUD, tags, comments, favorites, profiles, follows, owner-gated UI actions, and backend authorization checks for user-owned mutations.

## API docs

OpenAPI documentation is in [`docs/openapi.yaml`](docs/openapi.yaml).
