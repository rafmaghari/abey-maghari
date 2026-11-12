<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project pointers

- Confirmed product constraints and approved reference geometry: `PRODUCT.md` and `DESIGN.md`.
- All personal text and TODO placeholders: `src/content/abey.ts`; never invent biography or social links.
- Portrait coordinates and face-safe accessory placements: `src/components/PortraitExtras.tsx`. Normal portrait is original pixels with a derived alpha matte, never a generated face.
- Use Bun for dependencies; `npm run build`, `npm run lint`, `npx tsc --noEmit`, and `npm run check:assets` are static checks. Preview: `npm run dev` (3098).
- Focused browser regression: `tests/e2e/profile.spec.ts`, six projects in `playwright.config.ts`. Run with a capped `--workers` budget. Images are local and stripped; no runtime API keys or services are needed.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
