# Approved visual direction

Mode: Experience. Reference: supplied 736 × 1104 portfolio screenshot, direction only; no reference pixels or text ship.

Cream ground (#fffcf5, inferred), black ink (#090909), tan display accent (#c8ad89, inferred). Five rectangular card grounds: sand, warm beige, pale peach, olive, dusty blue. Equal content edges. No generic navbar, social links or resume claims.

Reference geometry at 736 px: content x≈77–658, wordmark x≈64–657/y≈48–214, portrait x≈234–502/y≈112–440, name x≈77/y≈237, intro y≈470, info y≈603, content heading y≈808, cards y≈875. These are visual measurements, not exact font identification. Use proportional container bounds and a full-width desktop composition; reflow info and cards on phones.

Substitutions: reference chunky unknown lettering → OFL Lilita One, separately rotated letters; body unknown sans → OFL DM Sans. Abey's own photo/cartoon replaces reference person. Reference resume/social/tools → clearly marked TODO personal info. Five content cards retain the reference's numbered colored rhythm but contain only editable TODO prompts.

Hero: huge PORTFOLIO with tan ’25 reference ornament; centered isolated portrait overlaps letters. Name in tan caps at left. Small Normal/Cartoon segmented control and one inventory bag live beside portrait, not over the face. No dark backdrop. Portrait switch crossfades in 200 ms, accessories in 180 ms; reduced motion removes travel, keeps a short fade. No scroll-jacking or continuous motion unless the corresponding inventory effect is equipped.

Inventory uses Headless UI Popover for focus/Escape/outside-click behavior, not a modal. Eight flat SVG/CSS accessories, measured separately for both portraits in a shared asset coordinate system. Heart sunglasses rest on hair above the eyes to satisfy the no-face-covering constraint. All decorations avoid the protected face rectangle.

Mobile: 20 px equal gutters, wordmark scales to width, complete face visible, controls below figure, info grid reflows, colored cards wrap rather than overflow. Controls ≥44 px; visible focus, semantic headings and buttons, pressed state exposed, reduced-motion support.

## Implementation / verification plan
1. Create stripped cutout from original pixels using Apple Vision foreground instance mask; inspect edges on light/dark grounds and verify strangers are absent.
2. Generate three GPT Image 2 cartoon candidates using the real source; choose likeness over prettiness; preserve source/candidate comparisons privately.
3. Add scoped Playwright flow before application code; prove red against absent page, then green. Also mutation-check key behavior by temporarily removing implementation and restoring.
4. Build page with content, stage, inventory and overlay components; all personal copy in one content module.
5. Production build, lint, tsc; asset size/metadata assertions. Run only the new responsive flow with capped parallel workers on Chromium + WebKit at 390×844, 360×740, 1440×900. Capture each portrait/accessory state, keyboard/reduced-motion/long-copy checks, and captioned recording.
6. Commit implementation and evidence instructions; keep preview at port 3098. No PR until approval.
