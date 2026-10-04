#!/bin/bash
# Concatenate src parts (in name order) into the single self-contained EllasArk.html, inlining the fonts.
set -e
cd "$(dirname "$0")"
python3 - <<'PY'
import glob, os
parts = sorted(glob.glob('src/*'))
head = open('src/00_head.html').read().replace('/*FONTS*/', open('build_assets/fonts.css').read())
body = ''.join(open(p).read() + '\n' for p in parts if p.endswith('.js'))
tail = open('src/99_tail.html').read()
open('EllasArk.html', 'w').write(head + body + tail)
PY
echo "built EllasArk.html ($(wc -c < EllasArk.html) bytes)"
