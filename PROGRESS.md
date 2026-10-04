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

## Art polish pass (Oct 2026)
- [x] Sprites: per-pixel volume lighting (rim highlight, core shadow, warm top/cool bottom) on every animal, mashup, Ella and Sarge render; bigger gator kit + eye
- [x] Ark decks: hanging wooden name plaques, arched stall windows looking out on the desert + Franklin Mountains, wainscot panels, brass beam studs, lanterns with warm glow
- [x] Desert mini-scenes (`63_cards.js` `miniScene`) with the Franklins and the Star on the Mountain: arrival stages (day / storm / sunset / night crate), open-house stage, Adopt-a-Gram phone photo
- [x] Mashdex cards (`mashCard`) styled like plan/mockup_mashup_cards.png: rarity border + ribbon, #number, scene art, voice bubble, parents, CUTENESS/CHAOS/+1 stat bars, quoted gag, ADOPTED BY + donation stamp. Used for mashup arrivals and the Dex (tap a tile → full card)
- [x] Pop-ups: toasts are queued (dedupe, max 3, one at a time, auto-fade) in a dedicated HUD message bar between the money pill and mute/menu; care results are small per-stall tags; HOOAH streak pulses the HUD streak pill instead of a banner; wrong-habitat warning is a badge + chip; toasts pause during story scenes; finale flood guests stay clear of Ella's raft
- [x] Published screenshots are downscaled + palette-quantized by make_pages.sh (source PNGs stay full-res)
- [x] Before/after captures: screenshots/polish/
