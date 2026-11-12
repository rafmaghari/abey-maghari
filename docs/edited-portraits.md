# Approved edited-source portraits

The approved replacement is `abey-edited.png`, SHA-256 recorded in `tests/fixtures/portrait-source.json`. The old restaurant/cropped photograph is no longer an identity or pose source.

## Normal

Native Apple Vision selects only the instance at the face, then a continuous boundary-only alpha refinement attenuates red-backdrop spill. Original RGB is never recolored, regenerated, inpainted, reshaped or resampled. No union of disconnected people or limbs is permitted.

The 864×1184 source is framed to rows 100…1099, then translated by (+68, −100) into a 1000×1300 transparent asset. This excludes the empty top margin and bottom strip containing the background sparkle; it is a bust crop, not painted mark removal. The visible stage is square so it meets the bust baseline at asset y=1000.

Published Normal is **lossless WebP**. Five independent source-derived RGB digests cover face, braces, hair, gold earring and black top. The retained source RGB remains exact, including in the published lossless asset. Source-derived test values must never be updated from the output.

Reproduce the matte intermediate using the approved source and native extractor (macOS Vision; Python refinement requires Pillow and NumPy):

```sh
swift tools/cutout.swift SOURCE.png native.png
python3 tools/prepare-edited-portrait.py SOURCE.png native.png normal.png
```

Use Sharp lossless WebP, quality 100, effort 6; metadata is stripped. Keep the 500 KB limit. The source itself is deliberately not committed.

## Cartoon

Three GPT Image 2 candidates were generated with the edited photo as the only input reference. The faithful prompt retains face shape, natural smile/braces, dark side-parted hair, earrings, head tilt and black high-neck top; it explicitly excludes beautification, slimming/lightening, invented limbs, the red backdrop and background sparkle.

Candidate 2 was selected for the closer fuller cheek/jaw shape and smile, not for attractiveness. The illustration is a style translation, not an exact RGB copy. Uniform 0.75 scaling and translation (+68,+33) align its head with Normal; white background gaps outside the protected face are transparent. The image is framed at y=1000. No foot is present.

## Anchors and checks

Head/face anchors are in `src/components/PortraitExtras.tsx`. Read them in the shared 1000×1300 canvas, not screenshot coordinates. Headwear sits above the face; heart sunglasses rest on hair. The portrait flow samples the bow centre against the real alpha, tests every item in both styles and rejects any face intersection.

`tests/portrait-proof.ts`, invoked by the retained portrait flow, checks source RGB digests, transparent lower-left and background-mark regions, soft alpha, dimensions, asset size and stripped metadata. `npm run check:assets` remains the standalone asset audit. Career content is unchanged and its source/navigation/disclosure flow remains a scoped neighbor.

Keep source/candidate comparisons, light/dark edge reviews and recordings private rather than committing the original red-backdrop photo or generation outputs.
