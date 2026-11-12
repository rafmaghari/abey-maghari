"""Alpha-only preparation for the approved edited source. Requires Pillow + NumPy.
Usage: python3 tools/prepare-edited-portrait.py SOURCE NATIVE_MATTE OUTPUT.png
The source digest and protected RGB samples are verified against the reviewed
contract, never regenerated from the output.
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("source", type=Path)
parser.add_argument("matte", type=Path)
parser.add_argument("output", type=Path)
args = parser.parse_args()
contract_path = Path(__file__).resolve().parents[1] / "tests/fixtures/portrait-source.json"
contract = json.loads(contract_path.read_text())
assert args.source.resolve() != args.output.resolve(), "Never overwrite the source"
assert args.output.suffix.lower() == ".png", "Write an intermediate PNG"
assert hashlib.sha256(args.source.read_bytes()).hexdigest() == contract["sourceSha256"], "Unapproved source"
source = Image.open(args.source).convert("RGBA")
assert list(source.size) == contract["sourceSize"]
rgba = np.array(source)
alpha = np.array(Image.open(args.matte).getchannel("A"))
assert alpha.shape == rgba.shape[:2]

# Native semantic contour plus continuous red-spill attenuation in the thin
# boundary only. No replacement RGB, hard polygon, inpainting or body reshaping.
eroded = np.array(Image.fromarray(alpha).filter(ImageFilter.MinFilter(17))).astype(float)
rgb = rgba[:, :, :3].astype(float)
edge_weight = (255 - eroded) / 255
spill = np.clip((rgb[:, :, 0] - np.maximum(rgb[:, :, 1], rgb[:, :, 2]) - 12) / 35, 0, 1)
refined = alpha.astype(float) * (1 - spill * edge_weight)
soft = np.array(Image.fromarray(refined.astype("uint8")).filter(ImageFilter.GaussianBlur(.65)))
rgba[:, :, 3] = np.minimum(alpha, soft)

# Source top margin and the background-mark-bearing bottom strip are excluded
# by bust framing. Retained subject pixels map 1:1, without resampling.
canvas = np.zeros((1300, 1000, 4), dtype=np.uint8)
canvas[:1000, 68:932] = rgba[100:1100]
for feature in contract["features"]:
    x, y, width, height = feature["output"]
    block = canvas[y:y + height, x:x + width]
    assert np.all(block[:, :, 3] == 255), feature["name"]
    actual = hashlib.sha256(block[:, :, :3].tobytes()).hexdigest()
    assert actual == feature["rgbSha256"], feature["name"]
args.output.parent.mkdir(parents=True, exist_ok=True)
Image.fromarray(canvas).save(args.output)
print("PASS approved source and five unchanged RGB feature regions; wrote alpha-only PNG")
