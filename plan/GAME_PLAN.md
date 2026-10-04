# Ella's Ark: Game Design Plan (v0.1, for approval)

> Status: **PLAN ONLY. Nothing gets built until Anton approves the story structure, storyboard and animal lists.**
> Companion files: `STORY.md` (acts, chapters, cast, sample scenes), `STORYBOARD.md` (14 panels), `ANIMALS.md` (rosters, mashups, generator, adopters), `SUMMARY_FOR_ANTON.md`.
> Concept mockups (canvas-drawn, not final art): `mockup_keyart_portrait.png`, `mockup_gameplay_landscape.png`, `mockup_mashup_cards.png` (source: `../mockup/mockup.html`).

---

## 1. One-line pitch
Run Ella's animal shelter, a giant wooden ark parked in the El Paso desert. You feed, wash, vet, play with and clean up after a growing zoo of dogs, cats, exotics, dinosaurs and ridiculous Puddle-made mashups, advertise them, match them to the right adopters (from local families to parody billionaires), and turn every donation into a bigger, weirder, fancier Ark.

## 2. Design pillars
1. **Fast, funny decisions.** Every few seconds there's something to tap, scrub, swipe or decide. Quick Call cards keep the comedy flowing between care tasks.
2. **The animals are the stars.** Each one has a personality, a signature care task and a joke, so caring for them feels like getting to know them.
3. **Matchmaking, not just selling.** Good matches pay more and send back Happy Tails postcards. Bad adopters get **Denied by Ella**, which is a reward too.
4. **Every dollar shows up on the Ark.** Donations buy visible upgrades: new decks, pools, aviaries, a helipad, a disco ball over the Puddle.
5. **Escalating absurdity.** Each act multiplies the scale: dogs → rhinos → Hot Dogconda → billionaires in helicopters.
6. **Ella is awesome.** She's competent, kind and funny, and the game always lets her win with style.
7. **Fair and friendly.** No ads, no real-money purchases, no loot boxes, no permanent failure. An animal is never harmed or lost. If care slips, animals get grumpy (and funnier), never sick for real.

## 3. Core loop
```
 META LOOP (chapters/acts):  Story beat → Shelter Days → Inspection/Set piece → Act unlock
                                         ↑                                     │
                                         └────── Upgrades (Spend donations) ◄──┘

 SHELTER DAY (~4 min):  Morning Intake → CARE SHIFT (3:00) → OPEN HOUSE (adoptions) → Sunset Report → Spend
                         new arrivals,    feed/wash/vet/play/   match animals to         donations, ⭐,   upgrade
                         Quick Calls      clean, incidents,     adopters, interviews,    Romance Hour     tree
                                          Ad Builder posts      Deny with a one-liner    (Act 3+)
```

### 3.1 A Shelter Day
| Phase | Length | What happens |
|---|---|---|
| **Morning Intake** | untimed, ~30 s | A van, the gangplank line, or Gerald's crates bring new arrivals. A Quick Call or two ("A javelina is in the break room"). Pick today's **Ad posts** (or let Dakota auto-post). |
| **Care Shift** | **3:00 real time** = 8 AM to 4 PM | Needs meters drain, incidents pop up and Quick Calls slide in. The player juggles care across decks. Weather events (dust storm, heat wave, monsoon) every few days. |
| **Open House** | 60 to 120 s | Adopters arrive (more with better ads and reputation). Drag animal → adopter, ask interview questions, approve or deny. Act 4 swaps this for the **Red Carpet**. |
| **Sunset Report** | ~20 s, skippable | The sun drops behind the Franklins, the Star on the Mountain lights up, and Ella salutes it (a signature moment). Tally: adoptions, donations, ⭐ Ark Stars (0 to 3), new Happy Tails postcards. **Act 3+: Romance Hour** (choose Love Bench pairs). |
| **Spend** | untimed | The upgrade tree, decorating the Ark, the Mashdex, Happy Tails. |

### 3.2 Needs and Adoptability
- Every resident has 5 needs rings: **🍖 Hunger, 🛁 Clean, 🩺 Health, 🎾 Happy, 🧹 Kennel.** Each drains at a species-specific rate (cats: Kennel drains slowly, Happy drains fast if ignored; rhinos: Clean drains fast in heat).
- **Adoptability (0 to 100)** = the average of the rings + a **signature care bonus** (done today: +10) + **ad exposure** (+5 to +25) + **Glam** (Ark decor, up to +10).
- Low rings never hurt the animal. They make it **grumpy** (a funny visual: rain cloud over Kevin, Chancla vibrating, Rhonda's glasses fogging), and grumpy animals adopt for less and may "incident."

### 3.3 Streaks and juice
- **Hooah Streak:** consecutive care actions without letting any ring hit red build a multiplier (x1.1 → x2.0) on the day's donations. At x1.5 the music adds horns; at x2.0 Ella's curls glow gold and the "HOOAH!" banner fires.
- **Combo care:** feed → wash → play the same animal within 5 seconds = "Full Service" +bonus and a little happy dance from the animal.

## 4. Care activities (touch-first mini-tasks, 1 to 4 seconds each)
| Activity | Normal version (Act 1) | Exotic version (Act 2+) | Gesture |
|---|---|---|---|
| 🍖 **Feed** | Drag the bowl to the kennel; the right food icon glows | Tongs-toss fish to the gator (time it with her jaws), hay bale fork for the rhino, ice blocks for the mammoth, "do not feed" for the sloth (he'll get there) | drag / timed tap |
| 🛁 **Wash** | Scrub to make bubbles, then the animal shakes dry (splashes Ella) | **Animal Car Wash** for elephants and rhinos (hold the hose, sweep), mud *painting* for Rhonda, trunk-shower aim-off with Peanut (she always wins) | scrub (circle drag) / hold-sweep |
| 🩺 **Vet** | Doc Lupe check: tap the glowing boo-boo, thermometer timing, x-ray "find what Churro ate" | Toothbrush a hippo, give Gilbert his heat-rock reading, check Tiny's tiny arms, glasses fitting for Rhonda | tap / hold / drag |
| 🎾 **Play** | Toss the ball (flick), laser for Kevin (drag), tug-of-war (hold and pull) | Spotlight for Sequins, rhythm jam with Maracas, ball pit for Peanut, mane blowout for King Darryl, boxing pads for Joey | flick / drag / rhythm tap |
| 🧹 **Kennel clean** | Swipe poop into the bucket (it squishes), refill water, new blanket | Shovel sizes escalate with the animal: scoop → shovel → **front-loader** for the elephant. The **Dung-o-Meter** fills; full = "Dung-to-Power" energy (an upgrade turns poop into AC power) | swipe / hold |
| ⭐ **Signature care** | Per species (ANIMALS §1 & §2): Chancla's calm-down cuddle, Tamale's re-wrap, Boots' roll call | Per species: Rhonda's mud spa, Frosty's AC, Big Dave's dad-joke rating | varies |
| 🚨 **Incidents** | Boots ("AWOL") escaped, Churro ate a remote, a tumbleweed in the cattery | Octavia stole the cash box, Peanut is stuck in the vet room, King Darryl is hiding in the porta-potty | tap to resolve (short chase or hidden-object) |

### 4.1 Quick Calls (fast decisions, "Reigns-style")
About 6 per day: a card slides up with an image + a situation; **swipe left or right** (or tap the buttons). Consequences nudge needs, money, reputation or set up later gags. Examples:
- *"Chancla is growling at the mail carrier."* ← Time-out / Hire her as security →
- *"Kevin is stuck in a cabinet. Again."* ← Free him / Leave him; he's thinking →
- *"A food truck offers free elote for every adoption today."* ← Accept (adopters +2) / Decline (why would you) →
- *"Uncle Dusty wants to 'improve' the plumbing."* ← Let him (random outcome) / Absolutely not →
- *"Rhonda is staring at a beige Corolla in the parking lot."* ← Move the car / Prepare for impact →
- *"Dr. Splice sent a fruit basket. It's glowing."* ← Eat it / Give it to Plinth →
Chill Mode stretches Quick Call timers to infinite (they wait for you).

## 5. Advertising and adoption matching

### 5.1 The Ad Builder (Dakota's phone)
- **Photo:** the game auto-snaps 3 photos of each animal during care (the funniest one is the moment it splashed Ella). Pick one.
- **Tags:** drag 2 tag stickers from the animal's real tags (Cuddly, Couch Potato, Good With Kids, Escape Artist, Needs Acreage, Flyer, Party Animal...). Accurate tags bring matching adopters. **Lying** (tagging Hot Dogconda "Apartment-Friendly") brings more adopters but more bad matches and returns. A teachable moment, played for laughs.
- **Channel** (unlocked by upgrades): Adopt-a-Gram (free, small reach), farmers-market flyer (locals, families), **I-10 billboard** (big reach, random adopters), **KFNK radio jingle** (generates a short procedural jingle with the animal's name, which is hilarious), **KFUN TV segment** (with Trent), parade float, and later the helipad + red carpet (celebs only) and a global livestream.
- Posts generate **Buzz** for that animal (+adopters who want its tags) for 1 to 3 days. Viral posts (random, boosted by the funniest photo) give 3x Buzz and trigger a "going viral" counter animation.

### 5.2 Adopters
- Each adopter is generated (or story-authored) with: **Home** (apartment / house / yard / ranch / mansion / yacht / "compound"), **Lifestyle tags** (active, homebody, kids, other pets, travels a lot), **Wants** (2 to 3 animal tags), **Budget/generosity** and **one hidden flag** (red or green).
- **Match Score (0 to 5 hearts)** = tag overlap (wants vs animal tags) + home fit (size class vs home) + lifestyle fit (energy vs activity), shown live as you drag an animal over an adopter.
- **Interview:** the player taps 1 question (Act 1) up to 2 of 4 questions (Act 4) to reveal the hidden flag before deciding. Example questions: "Where will they sleep?" · "Who walks them when you travel?" · "What's your plan for poop?" · "Why *this* animal?"
- **Approve:** donation = base × match multiplier (0.5 to 1.5) × adoptability (0.7 to 1.2) × reputation (+5% per ⭐ level). A coin shower and a stamped certificate follow, and the adopter walks away with the animal (a custom pairing animation for legends).
- **Deny:** choose one of 3 one-liners (the "Denied by Ella" stamp). Denying a red-flag adopter = +Reputation and a gag. Denying a green-flag adopter = a small rep dip and a sad trombone.
- **Returns:** bad matches may return the animal 1 to 3 days later with a funny note ("He ate my electric car. Not the battery. The whole car."). No money is lost; the animal comes back slightly grumpy.
- **Happy Tails:** good matches send postcards over the following days (photo gags, e.g. Dex Orbitz: "STILL ON EARTH"). They're collected in a scrapbook, give a small rep bonus, and feed the ending montage.

## 6. The Puddle and mashups (Act 3+)
- **Romance Hour** happens at sunset during the Sunset Report. Animals with high Happy (≥70) may wander to the Puddle. By default 1 random pair per night, rising with upgrades. Cut to the glitter-heart cloud. At dawn, Gerald brings crates.
- **Love Bench** (upgrade): the player picks the pair (drag two portraits onto the bench). **Mash-o-Scope** (upgrade): preview a blurry silhouette + rarity of the result before committing. **Puddle Filter** (upgrade): skip Romance Hour on nights you're full (an important pressure valve).
- **Capacity pressure** is Act 3's challenge: mashups arrive faster than locals can adopt them, which pushes the player to upgrade housing and advertising and sets up Act 4's celebrity wave.
- **The Mashdex** collection book: silhouettes for every possible combo grouped by parent, the 25 Legendaries highlighted, and completion rewards (Glam items, music tracks, a golden Puddle).
- Original parents stay at the Ark until adopted (mashing never "uses up" an animal). Story-locked parents (Tiny, Woolly Willie) are always available.

## 7. Donations and economy
| Act | Typical donation per adoption | Adoptions/day | Daily income (good play) | Upgrade price range |
|---|---|---|---|---|
| 1 | $50 to $150 | 3 to 5 | $300 to $700 | $100 to $3K |
| 2 | $800 to $25K | 2 to 4 (+ dogs/cats) | $10K to $50K | $5K to $250K |
| 3 | $10K to $80K (locals) · $100K to $500K (rare mashups) | 3 to 6 | $80K to $1M | $50K to $2M |
| 4 | $250K to $10M (celebs) | 3 to 5 | $2M to $25M | $1M to $50M |
| Finale | The Gala pot (sum of all donations × a reputation bonus) | n/a | "Ark Endowment" | Sanctuary Mode luxuries |

- **Costs are light and never punishing:** a small daily "Kibble & Hay Bill" scales with residents and is auto-deducted. AC costs rise in heat waves. Money can't go negative (if you're broke, Doc Lupe "found some money in her truck").
- **Payback meter** on every upgrade card: "Pays for itself in ~3 days."
- Big donations get **big juice:** coins arc from the adopter to the cash pill, the donation thermometer on the Ark's mast fills and bursts, horn stabs play, and the Act 4 million-dollar donations trigger a "MONEY RAIN" over the deck.
- **Ark Stars (⭐ 0 to 3 per day)** and **Paws (reputation rank)**: Cardboard Box → Doghouse → Barn → Rescue Ranch → Ark → Super Ark → Legendary Sanctuary. Rank raises adopter counts and donation multipliers and gates chapters.

## 8. Upgrade tree
Six branches, all visible from the start (locked items show their unlock act). Prices roughly double per tier within a branch. Every upgrade is **visible on the Ark**.

```
HABITATS ─┬─ Kennel Deck II ─ Cattery Loft ─ Play Yard ─────────────────────────┐ (Act 1)
          ├─ Swamp Pool ─ Reptile Sauna ─ Big Cat Deck ─ Aviary Mast ─ Mud Wallow │ (Act 2)
          │   ─ Ice Room ─ Jungle Deck ─ Saltwater Tank ─ Pachyderm Hold          │
          │   ─ Jurassic Paddock                                                  │
          ├─ Mashup Wing ─ Puddle Promenade                                       │ (Act 3)
          └─ Luxury Suites ─ ARK II: THE SEQUEL (second ark docked alongside)     │ (Act 4)
CARE TECH ── Better Bowls ─ Hose+ ─ Poop Scoop Pro ─ Auto-Feeder ─ Misting Fans ─ Vet Lab
             ─ Animal Car Wash ─ Dung-to-Power Biogas ─ Robo-Scooper ─ Hydro-Massage Spa
OUTREACH ─── Adopt-a-Gram ─ Market Flyers ─ I-10 Billboard ─ "Paws & Tacos" Food Truck
             ─ KFNK Radio Jingle ─ KFUN TV Spot ─ Parade Float ─ Helipad ─ Red Carpet
             ─ Gala Ballroom ─ Global Livestream
STAFF ────── Volunteers ─ Abuela Knitting Brigade ─ Weekend Squad (Ella's Army buddies)
             ─ Uncle Dusty Handyman+ ─ StorkDash Premium (Gerald, faster crates) ─ Dr. Splice (Act 4)
PUDDLE LAB ─ Puddle Filter ─ Love Bench ─ Mash-o-Scope ─ Mood Lighting ─ Disco Ball
             ─ Gene Jukebox ─ Blue Moon Machine (Act 3+)
ARK GLAM ─── Fresh Paint ─ String Lights ─ Chile Ristras on the Bow ─ Neon "ELLA'S ARK" Sign
             ─ Funk Bandstand (Maracas on drums) ─ Water Slide off the Stern ─ Giant Paw Flag
             ─ Inflatable T-Rex ─ Gold Gangplank ─ "Star on the Ark" Lights
```

| Branch | Sample upgrades (price) | Effect |
|---|---|---|
| **Habitats** | Kennel Deck II ($300), Cattery Loft ($800), Swamp Pool ($8K), Big Cat Deck ($15K), Pachyderm Hold ($40K), Jurassic Paddock ($75K), Mashup Wing ($250K), Luxury Suites ($2M), Ark II ($10M) | Capacity + unlocks species intake. Some story chapters need a habitat. |
| **Care Tech** | Better Bowls ($150, Hunger drains 15% slower), Hose+ ($400, wash 2x faster), Auto-Feeder ($2K, auto-feeds one deck), Misting Fans ($8K, heat waves halved), Vet Lab ($25K, vet tasks one-tap), Animal Car Wash ($15K, big-animal washing becomes drive-through), Dung-to-Power ($60K, poop pays the AC bill), Robo-Scooper ($200K, auto kennel clean on 2 decks) | Speed and automation, so the player is never overwhelmed |
| **Outreach** | Market Flyers ($200), I-10 Billboard ($1.2K), Food Truck ($5K, +2 adopters per Open House), Radio Jingle ($10K), TV Spot ($40K), Parade Float ($100K), **Helipad ($500K, needed for Act 4 top-tier adopters)**, Red Carpet ($1M, +1 interview question), Gala Ballroom ($5M, unlocks the Chapter 19 gala), Global Livestream ($15M, Buzz x2 everywhere) | More, better-matched adopters |
| **Staff** | Volunteers ($500/each, auto-play), Abuela Knitting Brigade ($3K, cold-animal happiness), Weekend Squad ($20K, Ella's Army buddies auto-run a deck on weekends with PT-style efficiency), StorkDash Premium ($100K, crates arrive at Morning Intake instead of mid-day), Dr. Splice ($1M, Mash-o-Scope shows the exact result) | Automation + story flavor |
| **Puddle Lab** | Puddle Filter ($50K), Love Bench ($100K), Mash-o-Scope ($250K), Mood Lighting ($500K, +Rare chance), Disco Ball ($1M, 2 pairs per night), Gene Jukebox ($3M, lock one parent's part), Blue Moon Machine ($8M, a triple mashup once per chapter) | Control over mashups |
| **Ark Glam** | $100 to $5M, with dozens of cosmetic options per slot (hull paint, sails, signs, lights, deck props, flags, music box) | +Glam: adopters, adoptability, donation multiplier. Pure fun and self-expression. |

## 9. Progression
- **20 chapters** (STORY.md). Each chapter has 2 or 3 clear goals (e.g. "Adopt out 5 animals," "Build the Swamp Pool," "Pass Plinth's inspection"), a story scene at start and end, and 3 to 5 Shelter Days. Goals show progress bars and never time out.
- **Act gates:** Act 1 ends with **Inspection Day**, Act 2 with **The Rhino Incident**, Act 3 with **Overcapacity**, and Act 4 with the **Gala** into the Finale.
- **Pacing target:** Act 1 ~1 hour, Act 2 ~2 hours, Act 3 ~2.5 hours, Act 4 ~2.5 hours, Finale ~20 min, about **8 to 10 hours** total. After that comes **Sanctuary Mode** (endless, all systems, random mashups, seasonal events like *Chile Roasting Season*, *Tarantula Trek*, *Monsoon Week* and *Haboob Season*).
- **Collections:** the Mashdex, Happy Tails scrapbook, Denied-by-Ella highlight reel, Ark Glam sets.
- **No failure states:** a failed inspection repeats the next day with Plinth smugger. Chill Mode slows needs drain by 50% and pauses Quick Calls.

## 10. Controls and layouts

### 10.1 Touch (primary): one finger, 48 px+ targets
| Action | Gesture | Accessibility alt |
|---|---|---|
| Select animal / open care wheel | tap | ... |
| Pick a care action | tap a wedge on the care wheel (or drag from the tool tray) | ... |
| Feed, place items, drag to adopter | drag & drop (snaps) | tap item → tap target |
| Wash / scrub / mud paint | circle-scrub | hold = auto |
| Clean kennel | swipe | tap = auto |
| Hold tasks (hose, dryer, heat rock) | press & hold, release in the green band | tap-tap |
| Rhythm play (Maracas jam, Morning PT) | tap on the beat | auto-hit toggle |
| Quick Calls | swipe card left/right | buttons |
| Scroll the Ark decks | two-finger drag or the deck mini-map | deck buttons |
| Pause / mute | top-bar buttons | ... |

**Keyboard (desktop):** arrows / WASD move the selection between kennels · 1 to 5 care actions · Space confirm · Q/E Quick Call left/right · Tab cycles decks · P/Esc pause · M mute.

### 10.2 Portrait (primary, 390×844 reference)
```
┌──────────────────────────────┐
│ $ cash │ day/clock │ ⭐ │ ☰  │  HUD (48 px + safe area)
├──────────────────────────────┤
│                              │
│  ARK VIEW (~58%)             │  cutaway decks with animals and kennels,
│  scrolls deck by deck        │  needs rings, incidents, Ella walking
│  care wheel pops on tap      │
├──────────────────────────────┤
│  ACTION TRAY (~24%)          │  tool tray (bowl, hose, scoop, stethoscope,
│  Quick Call card slot        │  ball), Quick Call card, mini deck map
├──────────────────────────────┤
│ ARK  ADS  ADOPT  UPGRADE  📖 │  tab bar (thumb zone, 72 px)
└──────────────────────────────┘
```
### 10.3 Landscape (844×390 reference; see `mockup_gameplay_landscape.png`)
```
┌──────────────────────────────────────────────────────────┐
│ $ cash │ day/clock │ streak │ ⭐ │                    ☰  │
├────────────────────────────────────────┬────────────┬────┤
│ ARK VIEW (~66% width)                  │ SIDE PANEL │TAB │
│ wider cutaway: 2 decks visible at once │ tools +    │RAIL│
│ desert + mountains parallax behind     │ Quick Call │    │
└────────────────────────────────────────┴────────────┴────┘
```
- Open House / Red Carpet: portrait puts adopters on top and animals in a bottom carousel; landscape puts adopters right and animals left.
- Live re-layout on rotate, safe-area insets, no scroll/zoom, fonts scale from the short side (like Pappa Kennedy).

## 11. Art plan ("the animals must look really good")
**Style: "Storybook cartoon with cut-out comedy."** People use a simple cut-out comedy look (flat shapes, big round heads, oval eyes with dot pupils, a nod to the South Park-*like* humor without copying any show). **Animals get the richest rendering in the game**, so they're always the most beautiful things on screen.

### 11.1 How the animals are drawn (procedural canvas, no image files)
- **Part rig:** every species is built from bezier part shapes (head, snout, ears, eyes, body, legs, tail, signature parts) on named sockets. The same rig drives normal animals, exotics and every mashup, which is what makes the generator possible.
- **Three-tone cel shading:** base color, a shadow shape (offset clip, multiply), a highlight shape (screen), then a warm **rim light** from the sunset side and a cool bounce light from the sand. A crisp 2 to 3 px warm-dark outline (`#2b1a12`, never pure black) with variable width (thicker on the bottom = weight).
- **Surface textures** drawn into clipped regions: **fur** = hundreds of short tapered strokes following a flow direction (cached to an offscreen sprite once per animal); **scales** = clipped hex/bead pattern (Gila beads, gator scutes); **feathers** = layered scallops; **wrinkly skin** (rhino, elephant) = soft crease curves with highlight edges; **wool/floof** = overlapping circles with soft noise.
- **Eyes sell the character:** large glossy eyes with two specular highlights, iris gradients, eyelids that blink and squint with mood, and eyebrows (yes, even the rhino) for comedy acting.
- **Animation:** procedural **squash-and-stretch** breathing idle, blinks, ear flicks, tail wag (sine with lag along the chain), head bob, and a happy bounce. Each species has 4 to 6 reaction poses (happy, grumpy, scared, eating, sleeping, "splashing Ella"). Mashups inherit animations by part (the tail wags with the tail donor's motion).
- **Mood visuals:** grumpy = rain cloud / vibrating; happy = hearts / sparkles; Puddle-made = a faint teal shimmer in the eyes.
- **Performance:** each animal is rendered once into a sprite atlas per pose at device DPR (capped at 2.5), then animated with transforms (with per-part layers for wag/blink). Hundreds of animals stay at 60 fps.
- **Art review:** a `gallery.js` Playwright tool renders sheets of every species and 100 random mashups for review before shipping, so mashups get checked for readability and charm.

### 11.2 Ella (flattering, fun, recognizable)
- **Blond curly hair is her signature:** big, voluminous ringlets drawn as layered spiral curls with a gold highlight; they bounce with secondary motion on every step, *boing* on wins and puff up in dust storms. Usually tied back with a red bandana. Blue eyes and light freckles.
- **Outfit (per Anton):** civilian clothes only, with **no Army-colored clothing (no olive/tan/camo) and no name tape or insignia.** The default is a **bright blue Ella's Ark shelter-logo tee** (a white paw over a little ark), **blue jeans** with orange stitching and rolled cuffs, a brown belt, **combat-style boots**, aviators on her head and the red bandana. Variants are **denim shorts** (used in the gameplay mockup for hot days) and other non-Army shirt colors (red, coral, white, sunset orange) as unlockable shelter tees. Her Army side shows only in her attitude and lines. Gala outfit: a sparkly gown + her combat boots.
- **Personality in poses:** confident stance, a salute at sunset, a two-finger "let's go" point, a fist-bump with Sarge, a "soaked but unbothered" face, a "really, Kevin?" look.
- Placeholder details (eye color, freckles, glasses, tattoos, etc.) get finalized with Anton.

### 11.3 World: El Paso, accurate and gorgeous
- **Sky:** a time-of-day gradient system (dawn peach → noon blue-white → **sunset orange-magenta-violet** → night indigo with stars). The sunset happens every day in the Sunset Report.
- **Franklin Mountains:** a layered parallax silhouette (3 layers with atmospheric haze, a recognizable ridgeline) with the **Star on the Mountain** lit at night/sunset. Distant city lights at night.
- **Desert flora (accurate):** prickly pear, cholla, ocotillo, yucca, lechuguilla, barrel cactus and creosote. **No saguaros** (it's a running joke).
- **Local props:** tumbleweeds (physics-y bounce), roadrunners crossing, javelinas visiting, chile ristras, a food truck, a Loop 375 sign (generic), dust devils, monsoon clouds, heat shimmer.
- **The Ark:** big plank-built hull with wood grain, nails, patches, portholes and a cabin. Upgrades add pools, decks, masts, lights and signs visibly over time. A cutaway "dollhouse" view for gameplay.
- **UI style:** sun-bleached wood plaques, rope, brass rivets, desert-sunset color accents, chunky friendly type, and stickers.

### 11.4 Palette
Sunset orange `#FF8A3D`, magenta `#E0457B`, violet `#6B3FA0`, sand `#E9C48A`, mesa red `#B5532E`, sage `#8FA876`, cactus green `#4F8A4B`, wood `#A0673A` / dark `#5C3A1E`, sky teal `#6EC6CA`, **Puddle teal `#2BE3C8`** (glow), ink `#2B1A12`, cream `#FFF4E0`.

## 12. Audio plan

### 12.1 Music: original funk, procedural WebAudio (Pappa Kennedy's engine, expanded)
**Style reference (genre cues only):** the tight, horn-driven late-60s/70s funk associated with James Brown: emphasis "on the one," interlocking 16th-note guitar scratches, syncopated bass with ghost notes, tight horn-section stabs, organ comps, crisp drums and shouted call-and-response. **Every melody, riff, groove, lyric and title is newly written for this game.** We don't use or approximate any real song's melody, riff, horn line, lyric, title or signature catch-phrase, and every track gets an originality review (contour/rhythm vs. well-known hooks) before shipping.

**Instruments (all synthesized):** slap/finger bass (square/saw → low-pass + pluck envelope, a short noise "slap"), chicken-scratch guitar (muted bandpassed noise bursts at 9th-chord pitches + wah sweep), 3-voice horn section (trumpet/sax/trombone: detuned saws with pitch scoops and fast attacks, voiced in 4ths/5ths), drawbar organ (additive sines + tremolo "rotary"), clavinet (pulse + comb filter), drums (synth kick, snare with ghost notes, 16th hats, tambourine, congas, cowbell), and **synthesized vocal shouts** (formant-filtered "Hah!", "Uh!", "Yeah!", "Hit it!") on generic interjections only.

| # | Track | Plays during | BPM / key / feel | Signature |
|---|---|---|---|---|
| 1 | **"Ark Funk (Ella's Theme)"** | Title, map, Sunset Report | 112 · E dorian · strut | Big horn hit on the one, organ swell, call-and-response hook |
| 2 | **"Kibble Strut"** | Act 1 Care Shift | 104 · A mixolydian · light & bouncy | Clav riff, tambourine, finger bass |
| 3 | **"Nine-One-Five Shuffle"** | Open House | 108 · D dorian · swung 16ths | Wah guitar, hand claps, sax fills |
| 4 | **"Two by Two Breakdown"** | Act 2 Care Shift | 116 · G mixolydian · busy | Congas, cowbell, double-time horns |
| 5 | **"Puddle Love"** | Romance Hour | 76 · E♭ major 7ths · slow jam | Breathy sax lead, wah, strings; the glitter-cloud high note |
| 6 | **"Mashup Mayhem"** | Act 3 Care Shift | 120 · B dorian · chaotic-fun | Clavinet + organ duel, horn "laughs" |
| 7 | **"Red Carpet Rumble"** | Act 4 Red Carpet | 118 · F mixolydian · glam funk | Brass fanfares, strings, camera-shutter percussion |
| 8 | **"Haboob Hustle"** | Dust storms, incidents, chases | 128 · C minor · frantic | Driving 16th bass, siren-like organ |
| 9 | **"Bottomline Blues"** | Villain scenes | 96 · G minor · sleazy swamp-funk | Tuba-ish bass, muted trumpet, kazoo sting |
| 10 | **"Star on the Mountain (Finale Funk)"** | Finale + credits | 122 · E dorian → F♯ dorian key change · full band | Everything at once, a choir pad, the big ending stab |
| Stingers | "Adopted!" horn stab, crate-reveal drumroll, Denied buzzer + horn fall, Inspection Pass fanfare, Hooah Streak riser, million-dollar "MONEY RAIN" | ... | 1 to 6 s | ... |

**Original hook samples** (displayed karaoke-style at key moments, "sung" by a formant vox synth):
- *"Ark Funk":* "Two by two and one by one, / Ella's Ark is open, son! / (Hah!) Feed 'em, wash 'em, love 'em true, / Every critter's got a home with you!"
- *"Puddle Love":* "Mmm, the water's glowin' blue tonight, / the speakers crackle, the stars are right..."
- *"Red Carpet Rumble":* "Helicopters landin' in the sand, / Billionaires beggin' for a hand, / You want the rhino? Fill the form! / Ella says NO, so bring the storm!"
- *"Star on the Mountain":* "Shine on, shine on, star on the hill, / every last critter got a home, and still... / one more grey-muzzled face to keep, / Sarge, buddy, let's go to sleep." (slow, then the band kicks back in)

**Adaptive music:** the Care Shift layers intensify as rings drop (extra percussion), the Hooah Streak adds horns (x1.5) then the vocal hook (x2.0), Open House swaps the mix toward a call-and-response bridge, and pause applies a low-pass "through the wall" filter. Tracks rotate every ~2 minutes. Music Box in Ark Glam lets the player set the deck's default track.

### 12.2 SFX: every action has a sound (procedural)
| Group | Sounds |
|---|---|
| UI | wood "tok" tap, rope "swish" tab change, brass "clink" buy, can't-afford "polite boop", card swipe "fwip" |
| Care | kibble rattle + crunch per species (squeak-crunch for Chancla, CHOMP for Lady Chompington), water hose hiss, bubble pops (rising pitch), shake-dry "brrrrap" + splash, poop squish (escalating with animal size; elephant = "FLORMP"), shovel scrape, front-loader beep-beep, stethoscope "ba-dum," x-ray zap, ball bounce, laser "pew" |
| Animals | per-species procedural voices (barks, meows, roars, hisses, honks, the eagle screech, Maracas' rattle in time with the music) pitched by size; mashups blend the parents' voices (an elephant trumpet through a chihuahua yip filter) |
| World | wind gusts + tumbleweed rolls, dust-storm roar, monsoon thunder + rain bed, Ark wood creaks, Star on the Mountain "shimmer" at sunset, roadrunner footsteps, cicadas at night |
| Story | Gerald's delivery van horn, crate rattle + pry "kr-rack," the glitter-cloud FWOOMP + sax note, the KFUN news sting, helicopter rotor beds, the gala crowd |
| **Money** | coin "tink" ladder, adoption **cha-ching + horn stab**, donation thermometer fill (rising whistle) + burst, million-dollar **MONEY RAIN** cascade, Hooah Streak riser, Ark Star slams (1/2/3) |

## 13. Humor and content guardrails (adult audience, South Park level)
- **Audience:** adults (19-20+). **Raunchy is the default:** crude jokes, innuendo, profanity and gross-out gags (poop, farts, hairballs, butt-licking during interviews), satire of billionaires, influencers, bureaucracy and "wellness," and slapstick where nobody is hurt.
- **Settings toggle: Humor = Raunchy (default) / Cleaner.** Every line that needs it is written twice; Cleaner removes profanity and tones down innuendo and gross-out without changing the story or gameplay. Saved in settings (`ellas_ark_settings_v1`).
- **The mashup mechanic stays cartoonish:** Romance Hour is off-screen (slow jam, glitter-heart cloud, stork delivery). Innuendo is fine; **no explicit sex and no nudity, ever.**
- **Never:** anything hateful; real people or lookalikes (all celebrities and billionaires are original parodies); real brands (all businesses are fictional); politics or border jokes; mean jokes about El Paso, Juárez, Mexico, any ethnicity or religion; animal harm; jokes at Ella's or the military's expense.
- **Army references are light:** attitude and catchphrases only. Never Fort Bliss, and never any real rank, job or personal info.
- **Ella stays the hero** and always wins the scene with competence and wit.

## 14. Tech plan (same proven approach as Carey's Punchout / Pappa Kennedy)
- **Single self-contained HTML file**, HTML5 canvas 2D + procedural WebAudio, no external assets, playable offline once loaded. **GitHub Pages** + PWA manifest/icons. Repo: `antonolson47-ctrl/ellas-ark` (approved and published).
- **Source layout** (`/workspace/ellas-ark/src`, joined by `build.sh`; `make_pages.sh` assembles Pages):
  `00_head.html` · `10_core.js` (utils, seeded RNG, save, DPR, layout) · `15_audio.js` (SFX + animal voices) · `18_music.js` (funk engine + 10 tracks + adaptive layers) · `20_art_world.js` (sky, mountains, desert, Ark + upgrades) · `22_art_people.js` (Ella, cast, adopters) · `24_art_animals.js` (part rig, shading, textures, poses, sprite cache) · `26_mashup.js` (generator, Funny Score, names, gags) · `30_data.js` (species, adopters, Quick Calls, upgrades, chapters) · `40_economy.js` · `45_day.js` (needs, incidents, Quick Calls) · `50_care_*.js` (mini-tasks) · `55_adopt.js` (Ad Builder, Open House, Red Carpet, interviews) · `60_puddle.js` · `65_story.js` (scene player, narrator) · `70_scenes.js` (title, map, report, spend, Mashdex, Happy Tails) · `80_fx.js` · `85_touch.js` · `90_main.js` · `99_tail.html`.
- **Save:** `localStorage` key `ellas_ark_v1`, versioned, autosaves each phase, with an export/import save code.
- **Tests (Playwright):** `desktop.js` (keyboard play-through of Chapter 1 to 3), `mobile.js iphone|pixel` (real touch, rotation mid-shift, safe areas), `balance.js` (headless bot sim of the economy per act), `gallery.js` (species + 100 random mashups sheets for art review), `story.js` (every chapter's scenes render without errors), and a README screenshot set.

### 14.1 Build milestones (after approval)
| Milestone | Scope |
|---|---|
| **M1 Vertical slice** | Act 1 Chapters 1 to 3: Ark exterior + kennel deck, 6 dogs/cats, all 5 care actions + Quick Calls, Ad Builder (Adopt-a-Gram), Open House matching, Sunset Report, 2 music tracks, core SFX, portrait + landscape, save. *Anton playtests here.* |
| **M2 Act 1 complete** | All 12 dogs/cats, Doc Lupe + Dakota, dust storm, Inspection Day, upgrade tree (Act 1 tier), 4 tracks. |
| **M3 Act 2** | The Flood set piece, 22 exotics + legends, habitats, exotic care tasks, niche adopters, the Rhino Incident. |
| **M4 Act 3** | The Puddle, Romance Hour, mashup generator + 25 legendaries, Mashdex, Puddle Lab, Plinth/Splice/Bottomline arcs. |
| **M5 Act 4 + Finale** | Red Carpet interviews, celebrity roster, fake celebrities, Gala, Re-Floodening boss, the ending, Sanctuary Mode, all 10 tracks, balance pass, Pages release. |

## 15. Risks and mitigations
| Risk | Mitigation |
|---|---|
| Animal art quality across ~1,400 mashups | Part rig + readability rules + Funny Score + the `gallery.js` review sheets; 25 legendaries and ~55 rares hand-tuned |
| Too much going on for a phone | Deck-by-deck view, the care wheel, Chill Mode, auto-helpers via Staff/Care Tech upgrades |
| Humor crossing a line | Guardrails in §13 (raunchy but never hateful/explicit); Cleaner toggle; Romance Hour is always off-screen |
| Music sounding like real songs | All motifs composed fresh; originality check per track; generic interjections only (no famous catch-phrases) |
| Portraying a real person (Ella) | Flattering by design; look approved by Anton; Army references light only (no base, rank, job or personal info) |
| Scope (20 chapters) | Data-driven chapters/scenes; milestones ship playable acts in order |
