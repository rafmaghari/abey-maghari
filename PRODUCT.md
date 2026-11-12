# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
User-selected Next.js App Router, TypeScript, Tailwind and Framer Motion. Bun for dependencies; npm scripts remain supported. Vercel, zero custom configuration.

## Purpose
A light, fun personal profile for Abey Maghari, now also showcasing her supplied professional experience and skills. Keep the family-profile personality rather than replacing it with a generic resume template. The approved career source is retained in `tests/fixtures/abey-experience.md`; do not infer facts beyond it.

## Constraints
User-approved cream portfolio reference and her supplied photo. Preserve her actual appearance. Normal portrait uses original pixels and a derived alpha matte only. Cartoon is explicitly approved; use GPT Image 2 with the photo as input reference. No invented facts, employment, dates or social links. All personal/career copy lives in `src/content/abey.ts`. The confirmed source fills the intro and career sections only; unrelated personal placeholders remain TODO. Preserve source truncation/hidden-skill notes and both Books To Go titles. No company logos. Portrait repairs are a separately pending decision; the experience extension must leave both portrait assets unchanged.

## Interaction
Normal/Cartoon toggle. One inventory bag opens an undimmed popover with eight individually toggled accessories. Face remains unobscured; glasses sit above her eyes rather than masking them.

## Approval
Reference-led layout and interactions approved explicitly before implementation. The same-page experience extension and its navigation/native disclosures were separately approved; see `docs/experience-extension.md`.
