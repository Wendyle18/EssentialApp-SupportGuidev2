# AGENTS.md — Codex Development Guide

Instructions for AI agents (Codex, Claude, etc.) contributing to this project.

## Platform Scope

- **Shopify only.** Do not add support for WooCommerce, Magento, BigCommerce, or any other ecommerce platform.
- All terminology, access rules, and workflows are Shopify-specific.

## Architecture Rules

- **No backend.** This is a local HTML/CSS/JS tool. Do not add a server, database, API endpoint, or build pipeline unless explicitly requested by the team.
- **No secrets in code.** Do not add API keys, tokens, passwords, or credentials anywhere in the repository.
- **No npm, no bundler.** Keep the project dependency-free. Use plain vanilla JavaScript only.
- **No React, Vue, Angular, Svelte, Tailwind, or Bootstrap.** Use plain HTML and CSS.
- **Must run by opening index.html directly in a browser.** No `localhost`, no `npm start`.

## Data Layer Rules

- All support content lives in `/data/*.js` files as plain JS global variables (`window.ESSENTIAL_*`).
- Do not convert data files to JSON (comments would be lost).
- Do not move data inline into `app.js` or `index.html`.
- Each data file should have clear comments explaining the data structure and how to add entries.
- Use descriptive `id` slugs (lowercase, hyphens, no spaces) for all apps, issues, snippets, and macros.

## Code Style

- Use plain functions, not classes.
- Use `var` or `const`/`let` — be consistent within a function scope.
- Wrap `app.js` in an IIFE to avoid global scope pollution.
- Use defensive patterns: always check that elements exist before manipulating them.
- Keep functions small and single-purpose with descriptive names.
- Add comments for non-obvious logic.
- Use `data-*` attributes for UI bindings, not inline `onclick` where avoidable.

## Feature Development

- Add features **incrementally**. One feature per PR/change.
- Do not refactor unrelated code while adding a feature.
- New features must not break the existing workflow: app select → issue select → investigate → copy.
- If a feature would require a backend, note this clearly in a comment and do not implement it.
- All new UI should be usable on a standard laptop screen (1280px+).

## Automation and Destructive Actions

- **Do not add any feature that writes to, edits, or deletes Shopify store data.**
- Do not add Shopify Admin API write operations.
- Do not add automatic theme editing, script injection, or any feature that modifies a merchant's store.
- If a future feature requires write access to Shopify, it must: (1) be explicitly approved by the team, (2) require manual confirmation before executing, (3) never be implemented in the browser frontend without a secure backend.
- Read-only Shopify API calls (e.g. fetching store info for display) may be considered but must be approved first.

## Support Priorities

When making UI or workflow decisions, prioritize in this order:
1. **Speed** — support agents should reach the answer in as few clicks as possible.
2. **Clarity** — labels, chips, and copy should be immediately understandable without developer knowledge.
3. **One-touch resolution** — wherever possible, the dashboard should let the agent copy a complete, ready-to-send reply or troubleshooting package in one action.
4. **Expandability** — data files should be easy to edit by non-developers.

## Adding Content vs Adding Features

- Adding a new app, issue, snippet, or reply template = **edit a `/data/` file only**. Do not touch `app.js` or `index.html`.
- Adding a new UI feature (new tab, new filter, new action) = **edit `app.js` and `styles.css`**, and update `README.md`.
- Adding a new data structure (new field on apps, new data type) = **edit both the relevant `/data/` file and `app.js`**, and document the structure in `README.md`.

## Testing

- Before completing a change, manually verify:
  - `index.html` opens in a browser without errors in the console.
  - App list renders correctly.
  - Selecting an app and issue loads the correct content.
  - All copy buttons work.
  - Snippet library search and filters work.
  - "Copy Full Package" produces a complete, readable output.

## Do Not

- Do not add authentication or login screens.
- Do not add browser storage (localStorage, sessionStorage, IndexedDB) without team approval.
- Do not make external HTTP requests from the frontend.
- Do not add analytics or tracking.
- Do not add third-party scripts or CDN dependencies.
- Do not promise unreleased features to merchants in reply templates.
