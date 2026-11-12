import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.join(process.cwd(), "public/profile");
for (const name of await readdir(directory)) {
  const file = path.join(directory, name);
  const size = (await stat(file)).size;
  assert(size < 500_000, `${name}: ${size} bytes exceeds 500 KB`);
  const metadata = await sharp(file).metadata();
  assert(metadata.hasAlpha, `${name}: missing isolated alpha matte`);
  assert.equal(metadata.width, 1000);
  assert.equal(metadata.height, 1300);
  assert(!metadata.exif && !metadata.xmp && !metadata.icc && !metadata.iptc, `${name}: metadata (including possible GPS) must be stripped`);
  console.log(`PASS ${name}: ${size} bytes; alpha; 1000×1300; no EXIF/XMP/ICC/IPTC, therefore no GPS`);
}
for (const name of await readdir("public/fonts")) {
  assert((await stat(path.join("public/fonts", name))).size < 500_000, `${name}: font exceeds 500 KB`);
}
console.log("PASS every public asset < 500 KB");
