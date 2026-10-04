# Ella's Ark — build progress

- [x] Approved plan, mockups, partial source imported (git repo initialised)
- [x] Core, art, people, species, mashups, text, story, upgrades, audio, music, game logic (existing src kept)
- [x] Bios + speakers (36), UI kit/layout/particles (60), scene art + habitats (62), title/story/settings/finale/credits (64), day HUD/ark view/care/calls/arrivals (66), tabs: ads/open house/report/bench/romance/build/dex (68)
- [x] Input: pointer/touch/mouse, swipe, wheel, keyboard, rotation re-fit, save on hide (85)
- [x] Main loop, app icon, PWA head links, debug fast-forward + test hooks `window.__EA` (90)
- [x] build.sh → EllasArk.html; make_pages.sh → ../ellas-ark-pages
- [x] Playwright suite test/mobile.js: WebKit + Chromium, iPhone 13 portrait/landscape/rotation — all passing
- [x] Screenshots in screenshots/
- [x] Published: https://github.com/antonolson47-ctrl/ellas-ark → https://antonolson47-ctrl.github.io/ellas-ark/ (live URL passes test/mobile.js in WebKit + Chromium, 31/31)

Debug: in the console, `__EA.jump(n)` fast-forwards to chapter n (1-20) with act-appropriate money, upgrades and residents. `__EA.endShift()` ends the care shift.

## Republish
`./make_pages.sh && cd ../ellas-ark-pages && git add -A && git commit -m update && git push`
