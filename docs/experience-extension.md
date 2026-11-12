# Approved experience extension

Preserve the existing cream / tan / black PORTFOLIO ’25 composition, portrait toggle, inventory and coloured favourite cards. The user approved the following same-page extension before implementation. Portrait changes are explicitly deferred; do not modify either portrait asset as part of this change.

## Content authority

The approved career source is retained verbatim in `tests/fixtures/abey-experience.md`. All editable site copy remains in `src/content/abey.ts`. Use exactly the supplied headline, five highlight statements, eight pipe-separated specialties, five employer groups, their dates, employment types, locations, details and explicitly named skills. Books To Go has both Reporting Specialist and Data Specialist titles within one employer group. Preserve the two source/truncation notes visibly behind a source-notes disclosure. Do not complete truncated lists or infer hidden skills, logos, links or claims.

Only the introduction placeholder is filled by this data. Personal-interest TODOs remain unchanged.

## Surface

- Quiet, non-sticky anchor navigation above the unchanged hero: About, Highlights, Skills, Experience, Favourites.
- The supplied headline becomes the prominent intro heading.
- Five-item editorial highlights strip: a single ruled group, not another family of generic cards.
- Typographic specialties list, using only the source's eight items.
- Five native `<details>` employer entries, initially collapsed. Titles, dates and employment context are visible in the summaries; Books To Go shows both title lines. One employer opens at a time to keep the long content light. The source notes use their own disclosure.
- Existing personal TODO grid and favourite cards remain after the career content.

## Mechanics and quality

Use the browser's maintained HTML details/summary primitives, not a custom accordion or a new dependency (MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details). No animated height or delayed disclosure. Existing focus rings, 44px targets, hover gating and reduced-motion behavior remain. Source-long employer names and dates wrap on small screens. Preserve equal edges and tan section headings; do not add company logos or unrelated illustrations.

## Verification

Write a new focused Playwright flow before implementing the surface. It must fail on the old page and pass on the extension. Assert source-copy exactness/completeness, all five disclosures, both Books To Go titles, source notes, nav anchors, keyboard behavior, mobile overflow, source-long labels, portrait toggle/inventory neighbors, and unchanged personal TODOs. Update the existing portrait flow only where the intentionally replaced intro changes its assertions. Run those two scoped specs together with a fresh capped worker budget across the existing Chromium/WebKit and three-viewport matrix. Keep captioned review recordings and raw originals outside the repository. Require build, lint, TypeScript and asset-check exit zero, and compare both portrait hashes before/after.
