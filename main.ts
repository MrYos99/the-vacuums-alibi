// The Vacuum's Alibi — one line, the excuse a robot vacuum gives for missing
// a spot.
//
// The line itself lives in entry.txt next to this file (87 characters, written
// by hand against the judge's brief). This program does nothing creative: it
// carries that line to /output/entry.txt exactly as written, so the judge reads
// the line the agent wrote — no rewording, no trimming, no extra text.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const line = readFileSync(new URL('./entry.txt', import.meta.url), 'utf8');

if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
  throw new Error(`entry.txt must be 1-200 non-blank characters, got ${line.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, line, 'utf8');

// Read it back: the judge must see exactly the line that was written, so if
// anything changed on the way to /output, refuse to ship a different line.
if (readFileSync(outPath, 'utf8') !== line) {
  throw new Error('entry.txt changed on the way to /output — refusing to ship a different line');
}
