# Ella's Ark

A phone-first HTML5 shelter-management comedy game. Ella runs a Noah's Ark animal shelter in the El Paso desert, under the Franklin Mountains and the Star on the Mountain. Sarge, a retired military working dog, is her sidekick the whole way.

**Play:** https://antonolson47-ctrl.github.io/ellas-ark/ (on iPhone, use Safari → Share → Add to Home Screen to play fullscreen)

Made for adults (19+). The humor is **Raunchy** by default. Switch to **Cleaner** any time in Settings.

## The story
1. **Act 1: Grand Opening.** Ella buys a beached ark at a county auction for a dollar and opens with dogs and cats.
2. **Act 2: Two by Two.** The Forty-Minute Flood washes in exotics: gators, penguins, a lion, a baby T-rex, a woolly mammoth and a rhino with opinions.
3. **Act 3: Love Is in the Air (and the Water).** The glowing Puddle starts turning Romance Hour couples into mashups (Hot Doghuahua, Chihuahuasaurus Rex...).
4. **Act 4: Lifestyles of the Rich & Furry.** Parody celebrity and billionaire adopters land by helicopter. Their donations fund the big upgrades. The finale is Furever Inc. and the Re-Floodening.

## How to play
- **Care shift:** tap an animal, then FEED / WASH / VET / PLAY / SCOOP / SPECIAL. You can also tap a tool and it goes to whoever needs it most. Tap poops to scoop them and boo-boos to patch them. Chaining full-service care builds a HOOAH streak.
- **Quick Calls:** swipe the card left or right, or tap a side.
- **Ads (from Ch. 3):** post Adopt-a-Grams and other ads during the shift to raise Buzz, which brings more adopters.
- **Open House:** read what each adopter WANTS, ask up to two questions, pick an animal, then APPROVE or DENY. Good matches pay donations (cha-ching!). Bad matches come back with a story. Watch for red flags and fakes.
- **Sunset report:** Romance Hour at the Puddle. From Act 3, the Love Bench lets you choose the couple.
- **Build:** six upgrade branches: Habitats, Care Tech, Outreach, Staff, Puddle Lab, Ark Glam.
- **Dex:** animals, mashups and happy tails.

### Controls
Touch or mouse: tap buttons and swipe. Keyboard: arrows select animals, 1-6 use tools, Q/E answer Quick Calls, A/D approve or deny, 1-3 ask questions, Tab cycles tabs, Space/Enter continues, P or Esc pauses (Settings), M mutes.

## Tech
- A single self-contained HTML file (`EllasArk.html`, built by `./build.sh` from `src/`). All art is drawn procedurally on canvas. All audio is procedural WebAudio: 10 original funk tracks plus SFX.
- Portrait and landscape layouts re-fit live on rotation, with safe-area insets and no cropping.
- Progress auto-saves in localStorage.
- PWA: `make_pages.sh` builds the GitHub Pages site (`index.html`, `manifest.webmanifest` with orientation `any`, an apple-touch-icon and icons).
- Tests: `cd test && npm install && node mobile.js webkit` (iPhone 13 profile in WebKit) or `node mobile.js chromium`. Pass a URL as a third argument to test the live site.

Fonts: Luckiest Guy, Lilita One and Fredoka (SIL Open Font License), embedded.
