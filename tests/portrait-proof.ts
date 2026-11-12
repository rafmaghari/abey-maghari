import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import contract from './fixtures/portrait-source.json';

/** Golden RGB values come from the approved edited source, not the output assets. */
export async function verifyPortraitAssets() {
  const result: Record<string, unknown> = {};
  for (const mode of ['normal', 'cartoon']) {
    const file = path.join(process.cwd(), 'public/profile', `${mode}.webp`);
    const bytes = (await stat(file)).size;
    const metadata = await sharp(file).metadata();
    assert(bytes < 500_000, `${mode}: asset exceeds 500 KB`);
    assert(!metadata.exif && !metadata.xmp && !metadata.icc && !metadata.iptc, `${mode}: metadata must be stripped`);
    assert.deepEqual([metadata.width, metadata.height], contract.outputSize);
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const region of contract.emptyRegions) {
      const [x, y, width, height] = region.box;
      for (let row = y; row < y + height; row++) {
        for (let col = x; col < x + width; col++) {
          assert.equal(data[(row * info.width + col) * 4 + 3], 0, `${mode}: ${region.name} survives at ${col},${row}`);
        }
      }
    }
    let softPixels = 0;
    for (let offset = 3; offset < data.length; offset += 4) if (data[offset] > 0 && data[offset] < 255) softPixels++;
    assert(softPixels > 500, `${mode}: matte has lost soft edges`);
    const features: Record<string, string> = {};
    if (mode === 'normal') {
      for (const feature of contract.features) {
        const [x, y, width, height] = feature.output;
        const rgb = Buffer.alloc(width * height * 3);
        let target = 0;
        for (let row = y; row < y + height; row++) {
          for (let col = x; col < x + width; col++) {
            const offset = (row * info.width + col) * 4;
            assert.equal(data[offset + 3], 255, `${feature.name}: protected subject pixels must remain opaque`);
            rgb[target++] = data[offset];
            rgb[target++] = data[offset + 1];
            rgb[target++] = data[offset + 2];
          }
        }
        const digest = createHash('sha256').update(rgb).digest('hex');
        assert.equal(digest, feature.rgbSha256, `${mode}: ${feature.name} differs from approved edited source`);
        features[feature.name] = digest;
      }
    }
    result[mode] = { bytes, softPixels, emptyRegions: contract.emptyRegions.map(region => region.name), features };
  }
  return { source: contract.source, sourceSha256: contract.sourceSha256, assets: result };
}
