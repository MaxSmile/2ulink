# Release Notes - 2026-01-02

## Changes

- Migrated the frontend build from CRA to Vite and updated scripts accordingly.
- Moved the HTML entry to `index.html` at the project root for Vite.
- Switched Tailwind v4 PostCSS integration to `@tailwindcss/postcss`.
- Updated environment variable access to Vite `import.meta.env` keys.
- Updated Firebase hosting output directory to `dist`.
- Added Vitest + React Testing Library setup with initial unit tests.
- Tightened URL validation and redirect countdown logic in the shortener flows.
