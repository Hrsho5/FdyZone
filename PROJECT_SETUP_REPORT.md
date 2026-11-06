# Project setup report

## Status before the changes

- The React/Vite frontend was in `app/` and the Express/TypeScript API was in `server/`.
- Each application had its own `package.json` and installed dependencies, but the project root had no `package.json`, so there was no root command to start both applications.
- The frontend API URL was tied to a specific LAN IP address.
- The backend had no build script for compiling TypeScript on demand.

## Changes made

- Added a root `package.json`. From the project root, run `npm run dev` to start the backend and frontend together.
- Added a root `npm run build` command that installs the frontend from its lockfile and builds it into root `dist/`, matching Hostinger's configured output directory. Added `npm run build:backend` for separately building the backend on a Node.js-capable host.
- Added root ignore rules for dependency folders, generated build output, and environment files.
- Added a root `npm run lint` command for the frontend.
- Added a backend `build` script and configured the full-stack launcher to stop the other process if either application exits.
- Made the full-stack launcher compile the backend before starting, so it does not depend on generated files already being present.
- Changed the frontend to call `/api/` and configured the Vite development proxy to forward those requests to the local backend at `http://localhost:9000`.
- Made the frontend API base URL configurable with the `VITE_API_URL` environment variable. In production, set it to the deployed backend URL (including trailing slash); `/api/` is only the local development fallback.
- Fixed a backend TypeScript return-path error that blocked the new build command.
- Updated the backend to use the hosting platform's `PORT` environment variable, with port `9000` as the local fallback.
- Kept the existing `app/` and `server/` directories; no source files were moved.

## Files changed

- Added `package.json` at the project root.
- Added `.gitignore` at the project root.
- Updated `server/package.json`.
- Updated `server/src/index.ts`.
- Updated `app/src/constants.js`.
- Updated `app/vite.config.js`.
- Added this report as `PROJECT_SETUP_REPORT.md`.

## Files removed

- None.

## Validation

- `npm run build` was verified locally: it installs the frontend dependencies and writes deployable assets to root `dist/`.
- The root `npm run dev` smoke test served the frontend successfully and returned HTTP 200 from the proxied `/api/` endpoint.
- `npm run lint` still fails on existing frontend issues: missing prop validation in `app/src/components/searchResult.jsx` and a Fast Refresh warning in `app/src/main.jsx`.
- Hostinger's earlier build compiled successfully but failed to find the configured `dist` because Vite emitted `app/dist`. The Vite output directory now matches the configured root `dist`.

## Hostinger deployment note

- Upload source files and lockfiles, but exclude all `node_modules` and generated `dist` folders from the ZIP. The root `.gitignore` excludes these for Git-based archives.
- Configure Hostinger's build command as `npm run build` and output directory as `dist`. The root `prebuild` script installs the frontend dependencies on the Linux host before building.
- A static PHP/HTML plan can publish the frontend only. The Express backend still needs a Node.js-capable hosting plan. Set the build environment variable `VITE_API_URL` to the public backend URL, for example `https://api.example.com/`, so the frontend can load food data and images.

## Running the project

Install dependencies once if they are not already installed:

```sh
npm install --prefix app
npm install --prefix server
```

Then run from the project root:

```sh
npm run dev
```

The frontend is served by Vite on port `5173`; the API listens on port `9000`. The backend also requires a working MongoDB connection configured through `server/.env` (`MONGO_URL`).
