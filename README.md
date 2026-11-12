# Abey Maghari

A light personal profile with approved professional experience, native expandable role details, two portrait styles and an eight-item dress-up inventory. Built with Next.js App Router, TypeScript, Tailwind and Framer Motion.

## Run

```sh
bun install
npm run dev
```

Open http://localhost:3098. For a production preview, run `npm run build && npm start`.

## Personalize

Edit **`src/content/abey.ts`**. Every unconfirmed personal detail is explicitly marked TODO; the decorative reference edition also needs confirmation. There are no invented jobs, dates or social links. Search indexing is disabled until the placeholders are replaced.

The approved visual direction and reference measurements are in `DESIGN.md`; durable product constraints are in `PRODUCT.md`. The career source fixture is `tests/fixtures/abey-experience.md`; preserve its wording and truncation/hidden-skill notes. The extension's design is recorded in `docs/experience-extension.md`.

## Check

```sh
npm run build
npm run lint
npx tsc --noEmit
npm run check:assets
npx playwright test tests/e2e/experience.spec.ts tests/e2e/profile.spec.ts --workers=2
```

Use the available worker budget (maximum four) rather than an uncapped run. The scoped flow runs Chromium and WebKit at three viewports and keeps screenshots, video, trace and caption timestamps. Browser binaries must already be installed.

## Deploy

Import this repository into Vercel. Next.js is auto-detected; no environment variables, external image service or custom Vercel configuration is required.

## Portraits and assets

The real portrait uses the approved edited photo, not the old cropped restaurant image. It retains original RGB with a native foreground alpha matte and boundary-only spill attenuation; no Normal retouching, inpainting, reshaping or resampling. Bust framing excludes the bottom strip containing the background sparkle. Normal is lossless WebP, with exact source-derived face, braces, hair, earring and black-top RGB proofs. No source photo or location metadata is served. See `docs/edited-portraits.md`, `tools/cutout.swift` and `tools/prepare-edited-portrait.py`.

Three new GPT Image 2 cartoons used the edited photo as their only reference. Candidate 2 was selected for fuller face shape, natural smile/braces, hair, earrings and black-top fidelity. No foot or background sparkle remains. It is an illustration, not a retouched Normal portrait. Normal is the default.

Both portraits use a 1000×1300 coordinate system with a square visible bust stage. Face-safe landmarks and individual accessory anchors live in `src/components/PortraitExtras.tsx`. Heart sunglasses sit on her hair so the face stays unobscured. No backdrop dims the portrait when inventory is open.

Self-hosted Lilita One, DM Sans and the recording-only Inter subset are under the SIL Open Font License; license notices are in `public/fonts/`. SVG accessories and card graphics are original project geometry.
