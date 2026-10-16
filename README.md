# Child Care Immunization Information System (2018)

An archived final-year project by **Francis O. Babatunde** (Information and Communication Science, University of Ilorin, August 2018). The case study was the University of Ilorin Teaching Hospital (UITH) immunization unit in Nigeria.

This repository shows what a small health-records web application looked like in 2018. It is published for historical and educational study. It is **not** a clinical system. Never put real patient data into either the local app or the public demo. The original Express/MongoDB server is for localhost study only.

## Live 2018 comparison demo

**[Open the public demo](https://child-care-immunization-2018.vercel.app/)**. The login fields are prefilled with the fictional account `demo@example.test` / `DemoPass2018!`.

This Vercel deployment preserves the 2018 Vue interface while replacing its API with a browser-only fixture adapter. It starts with one fictional parent, child, and immunization. You can explore the screens and try record actions; changes exist only in the current browser tab and reset on refresh. No MongoDB server, real authentication, or patient data is deployed. A banner on every page identifies it as a demonstration.

The Vercel project serves a prebuilt static bundle. To redeploy it, build `frontend/` with Node 8 (`node build/build.js`), copy `frontend/vercel.json` into `frontend/dist/`, then run `vercel deploy --prod` from `frontend/dist/` while linked to the Vercel project. The historical backend is never part of this deployment.

## Why it was built

The project investigated a paper-based process: parents carried vaccination booklets, while staff needed to record doses, find a child's history, and prepare periodic reports. A lost booklet could mean a lost accessible record. The proposed application put parent, child, and immunization information in a searchable database.

The 2018 thesis describes the requirements and design; this repository contains the application source from the accompanying frontend and server archives. It does not include the thesis document, original RAR files, database contents, or third-party dependencies.

## What the application contains

| Area | 2018 implementation |
| --- | --- |
| Administrator | Login, profile, password update |
| Records | Create parents and children; list and manage records |
| Immunization | Create immunization definitions, link them to children, view counts |
| Dashboard | Totals for parents, children, and active immunizations |
| API | Express endpoints backed by MongoDB |

```
Browser (Vue 2 / Bootstrap)
        |
        | HTTP on localhost:3001
        v
Node 8 / Express API ---- MongoDB (local `immu` database)
```

The frontend is a Vue 2 application built with Webpack 3. The backend uses Express 4, Mongoose 4, MongoDB, bcrypt, and JSON Web Tokens. The original code and package manifests are largely preserved so the design choices and limitations remain visible.

## Repository layout

- `frontend/` — Vue components, pages, API client, assets, and Webpack configuration.
- `server/` — Express routes, controllers, models, and database configuration.
- `server/scripts/seed-local-admin.js` — one-time local bootstrap helper added for this publication.

## Run the historical backend locally

These instructions reproduce the archived app; they do not make it safe for deployment. Use an isolated development machine or VM and **fictional data only**. The bundled Windows `bcrypt` binary from 2018 required Node 8.17.0 during restoration. Current Node releases do not load that binary. Node 8 and MongoDB 4.4 are both end-of-life, so keep every service bound to localhost.

1. Obtain Node.js 8.17.0 and MongoDB Community Server 4.4.x from their official archives. Start MongoDB on `127.0.0.1:27017` with a new, empty data directory.
2. In `server/`, install dependencies with the npm version bundled with Node 8 (`npm install`). In `frontend/`, do the same. The old dependency tree may require archived packages or a compatible build environment; the original `package-lock.json` files are included.
3. In a terminal in `server/`, set a unique local JWT signing secret and start the API:

   ```powershell
   $env:JWT_SECRET = 'replace-with-a-long-random-local-value'
   node .\bin\www
   ```

4. Bootstrap an administrator in the empty **local** database. In another terminal in `server/`:

   ```powershell
   $env:SEED_ADMIN_EMAIL = 'demo@example.test'
   $env:SEED_ADMIN_PASSWORD = 'choose-a-unique-demo-password'
   node .\scripts\seed-local-admin.js
   ```

5. In `frontend/`, run the Vue development server with Node 8 (`npm run dev`). Open `http://127.0.0.1:8080/` and sign in with the account seeded above. This development build calls the local API.

The API health route is `http://127.0.0.1:3001/api`. The frontend's original API client points to `http://localhost:3001/api/`. The public Vercel demo has a history-route rewrite so direct links work. Start MongoDB before the API, because the legacy server does not recover cleanly from an initial connection failure.

To use a different local database, set `MONGODB_URI` before starting the API and the seed script. The seed script refuses non-localhost URIs.

## Publication changes

To make a responsible public archive, this copy excludes the original production database credentials, the original JWT secret, an old scratch file containing a token, the local demo database, downloaded runtimes, built assets, unused images with unclear reuse rights, and `node_modules`. The API now reads its JWT secret from `JWT_SECRET` and its database URL from `MONGODB_URI` (defaulting to the original localhost development URL). The bootstrap script above was added because the original registration endpoint requires an existing administrator token.

The Vercel demo adds a fictional in-memory API adapter and a visible archive banner. These are publication and reproducibility changes, not a claim that the application has been modernized.

## Known limitations and study questions

- The parent and child list routes are registered before the JWT middleware. They can return records without authentication.
- The server prints a JWT during login. Other authentication and authorization paths need review before any real use.
- There is no self-service first-admin setup in the original app.
- The original data model and UI do not demonstrate the validation, audit trails, privacy controls, backup procedures, or clinical decision support expected of a health information system.
- The original dependencies are obsolete, and a fresh install on current Node is unlikely to work without migration.
- The thesis discussed reminders, but mobile alerts were proposed as future work rather than a verified working feature in this archive.

A future version could use modern runtime dependencies, explicit roles and consent, careful record access and audit logging, interoperable vaccine data, and narrowly scoped AI assistance. An AI agent should never make clinical decisions or modify immunization records without a human-reviewed workflow.

## Authorship and contribution history

This repository is being published as a single archival commit under the project owner's GitHub account. GitHub's contributor count will reflect that commit history; it does not establish who authored every original source file. Original metadata in the 2018 files is retained where present.

No license is granted by this README. Third-party package licenses remain with their respective authors.
