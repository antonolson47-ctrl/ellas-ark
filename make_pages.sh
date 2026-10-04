#!/bin/bash
# Assemble the GitHub Pages site into ../ellas-ark-pages (index.html + PWA manifest + icons + sources)
set -e
cd "$(dirname "$0")"; ./build.sh
OUT=../ellas-ark-pages; mkdir -p $OUT
sed 's#<!--PWA-LINKS-->#<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png"><link rel="manifest" href="manifest.webmanifest">#' EllasArk.html > $OUT/index.html
grep -q 'manifest.webmanifest' $OUT/index.html
(cd test && node icons.js ../$OUT)
cat > $OUT/manifest.webmanifest <<'MAN'
{
  "name": "Ella's Ark",
  "short_name": "Ella's Ark",
  "description": "Run a Noah's Ark animal shelter in the El Paso desert with Ella and Sarge: dogs, cats, flood exotics, Puddle mashups and celebrity adopters. Adults 18+ (Raunchy humor by default, Cleaner toggle in Settings).",
  "start_url": "./",
  "scope": "./",
  "display": "fullscreen",
  "orientation": "any",
  "background_color": "#231b55",
  "theme_color": "#231b55",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
MAN
touch $OUT/.nojekyll
rm -rf $OUT/src $OUT/test $OUT/screenshots $OUT/plan $OUT/mockup $OUT/build_assets; mkdir -p $OUT/src $OUT/test $OUT/screenshots $OUT/plan $OUT/mockup $OUT/build_assets
cp src/* $OUT/src/; cp build.sh make_pages.sh $OUT/; cp test/*.js test/package.json $OUT/test/; [ -f test/package-lock.json ] && cp test/package-lock.json $OUT/test/
cp screenshots/*.png $OUT/screenshots/; cp plan/*.md plan/*.png $OUT/plan/ 2>/dev/null || true; cp mockup/* $OUT/mockup/ 2>/dev/null || true; cp build_assets/* $OUT/build_assets/
cp EllasArk.html $OUT/EllasArk.html; cp README.md PROGRESS.md $OUT/
printf 'node_modules/\ntest/tmp/\n' > $OUT/.gitignore
echo "pages assembled in $OUT"
