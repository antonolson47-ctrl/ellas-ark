/* ===================== MASHUP GENERATOR ===================== */
const HEAD_ACC = { tiara: 1, bow: 1, sock: 1, glasses: 1, beret: 1 };
const LEGENDS_MASH = [
  { a: 'chancla', b: 'trex', face: 'chancla', body: 'trex', name: 'Chihuahuasaurus Rex', gag: V('Its terrifying ROAR sounds exactly like a squeaky toy. It has peed on every celebrity it has met.', 'Its terrifying ROAR sounds exactly like a squeaky toy.'), adopter: 'glitterina' },
  { a: 'tamale', b: 'python', face: 'tamale', body: 'python', name: 'Hot Dogconda', gag: V('Takes four full minutes to finish wagging. Thirty feet of wiener. Yes, we hear it.', 'Takes four full minutes to finish wagging.'), adopter: 'larry', mods: { serpLegs: 1 } },
  { a: 'rhino', b: 'eagle', face: 'eagle', body: 'rhino', name: 'Bald Rhin-Eagle', gag: "Can't fly. Has never been told. Glides downhill screaming.", adopter: 'dex', add: { body: ['wings'] } },
  { a: 'penguin', b: 'gator', face: 'gator', body: 'penguin', name: 'Pengator', gag: 'Needs a swamp AND air conditioning. Bites in a tuxedo.', adopter: 'chet' },
  { a: 'tiger', b: 'kangaroo', face: 'tiger', body: 'kangaroo', name: 'Tigeroo', gag: 'Bounces 30 feet. Lands in a different ZIP code. Pouch full of stolen car keys.', adopter: 'dez' },
  { a: 'elephant', b: 'sloth', face: 'sloth', body: 'elephant', name: 'Elesloth', gag: "Started walking toward the food bowl on Tuesday. It's now Friday.", adopter: 'yogi' },
  { a: 'hippo', b: 'roadrunner', face: 'hippo', body: 'hippo', name: 'Hippo-Beep-Beep', gag: 'Hits 60 mph and leaves a dust cloud shaped like itself.', adopter: 'rev', add: { head: ['crest'] }, mods: { foot: 'bird', legCol: '#5a7a9a' } },
  { a: 'elephant', b: 'skunk', face: 'elephant', body: 'elephant', name: 'Pew-phant', gag: V('Trunk sprays "cologne" from 50 feet. Notes of hay, regret, and hot garbage.', 'Trunk sprays "cologne" from 50 feet. Notes of hay and regret.'), adopter: 'odeur', mods: { pat: 'skunk', tail: 'skunk', col: '#3a3a42', hp: { col: '#3a3a42' } } },
  { a: 'lion', b: 'octopus', face: 'lion', body: 'lion', name: 'Lioctopus', gag: 'Can hold eight steaks and eight grudges at once.', adopter: 'blaze', mods: { headGrafts: ['tentamane'], legsAs: 'tentacles', col: '#d86a5a' } },
  { a: 'gila', b: 'penguin', face: 'gila', body: 'penguin', name: 'Gilaguin', gag: 'Holds a heat rock and an ice pack at the same time, forever confused.', adopter: 'ductworth' },
  { a: 'kevin', b: 'roadrunner', face: 'kevin', body: 'roadrunner', name: 'Purr-Runner', gag: 'Finally fast enough to catch the laser dot. Has no idea what to do with it.', adopter: 'noob' },
  { a: 'chancla', b: 'elephant', face: 'chancla', body: 'elephant', name: 'Chihuahuephant', gag: 'Its shivering registers 3.1 on the Richter scale.', adopter: 'tex', mods: { headGrafts: ['trunk'], col: '#e3b27b' } },
  { a: 'javelina', b: 'tri', face: 'javelina', body: 'javelina', name: 'Javelitops', gag: V('Smells like a gym bag with ambition. And a jockstrap with dreams.', 'Smells like a gym bag with ambition.'), adopter: 'tornado', add: { head: ['frill', 'horn3'] } },
  { a: 'flamingo', b: 'gorilla', face: 'gorilla', body: 'gorilla', name: 'Flamingorilla', gag: 'Beats its chest in flamenco rhythm. Gives dad advice between twirls.', adopter: 'sequina', mods: { col: '#f490b0', skin: 'feather', hp: { col: '#e070a0', face: '#f8c0d0' } } },
  { a: 'churro', b: 'rattler', face: 'churro', body: 'churro', name: 'Rattleriever', gag: 'Rattles when happy, which is always. A maraca with fur.', adopter: 'vaqueros', mods: { tail: 'rattle' } },
  { a: 'duchess', b: 'mammoth', face: 'duchess', body: 'mammoth', name: 'Woolly Meowmoth', gag: 'Sheds 300 lbs of fur a day and judges you from 12 feet up.', adopter: 'coco', mods: { col: '#fbf7f2', headGrafts: ['tiara', 'tusks'] } },
  { a: 'eagle', b: 'octopus', face: 'eagle', body: 'octopus', name: 'Octeagle', gag: 'Can carry eight bags of groceries. Eats four of them.', adopter: 'bryce', add: { body: ['wings'] } },
  { a: 'gorilla', b: 'sloth', face: 'gorilla', body: 'sloth', name: 'Slorilla', gag: 'The strongest animal on Earth. Refuses to get up.', adopter: 'plinth', mods: { col: '#3a3434' } },
  { a: 'hippo', b: 'flamingo', face: 'hippo', body: 'flamingo', name: 'Flamippo', gag: 'Falls over every 6 seconds. Gets back up with total dignity.', adopter: 'anastasia', mods: { hp: { col: '#f0a0b8' } } },
  { a: 'rhino', b: 'lowrider', face: 'lowrider', body: 'rhino', name: 'Rhinorgi', gag: 'An ankle-height battering ram. Unstoppable, adorable, always hungry.', adopter: 'penelope', mods: { leg: 22 } },
  { a: 'pelon', b: 'mammoth', face: 'pelon', body: 'mammoth', name: 'The Bald Mammoth', gag: "Needs a sweater the size of a circus tent. It's 104°F.", adopter: 'abuelas', mods: { skin: 'wrinkle', col: '#eec0b0', bodyGrafts: [], headGrafts: ['tusks', 'trunk'], sweater: ['#e04a7a', '#ffd24a'] } },
  { a: 'chancla', b: 'tarantula', face: 'chancla', body: 'tarantula', name: 'Chihuarantula', gag: 'Can bark in eight directions at once.', adopter: 'graveheart', mods: { col: '#e3b27b' } },
  { a: 'chupi', b: 'pelon', face: 'pelon', body: 'chupi', name: 'Chupacatbra', gag: "Legend confirmed: it's real. It's also a lap cat.", adopter: 'cryptid' },
  { a: 'jackalope', b: 'elephant', face: 'jackalope', body: 'elephant', name: 'Jackalephant', gag: 'Every hop is a 2.5-magnitude event. Sings tenor at sunrise.', adopter: 'prestidigio' },
  { a: 'kevin', b: 'gator', face: 'kevin', body: 'gator', name: 'Allicat', gag: 'Knocks entire shelves off counters with one tail swipe. Purrs like an outboard motor.', adopter: 'kayleigh', mods: { col: '#ee9a43', pat: 'tabby', patCol: '#c06a22' } }
];
const pairKey = (a, b) => a < b ? a + '|' + b : b + '|' + a;
const LEG_BY_PAIR = {}; LEGENDS_MASH.forEach((l, i) => { l.idx = i; LEG_BY_PAIR[pairKey(l.a, l.b)] = l; });
const CONTRA = [['slow', 'speedy'], ['lazy', 'speedy'], ['shy', 'diva'], ['gentle', 'bitey'], ['zen', 'chaotic'], ['polite', 'loud'], ['sleepy', 'chatty'], ['cozy', 'speedy'], ['shy', 'showy'], ['snooty', 'stinky'], ['majestic', 'dumb'], ['stoic', 'dramatic']];
const HAB_CLASH = { ice: ['desert', 'reptile', 'bigcat'], swamp: ['sky', 'desert'], salt: ['desert', 'sky'], sky: ['swamp', 'salt', 'mud'] };
function funnyScore(F, B) {
  let s = 0; const why = [];
  const d = Math.abs(F.size - B.size); s += 3 * d; if (d >= 3) why.push('size');
  if ((F.cute >= 4 && B.scary >= 4) || (F.scary >= 4 && B.cute >= 4)) { s += 6; why.push('flip'); }
  if (F.bodySig.includes('wings') && B.size >= 4) { s += 5; why.push('wings'); }
  if (F.bodySig.includes('flippers') && (B.hab === 'desert' || B.hab === 'reptile')) { s += 5; why.push('flippers'); }
  if ((HAB_CLASH[F.hab] || []).includes(B.hab) || (HAB_CLASH[B.hab] || []).includes(F.hab)) { s += 4; why.push('hab'); }
  if ((B.size >= 4 && ['yap', 'squeak', 'meow', 'coo'].includes(F.voice)) || (B.size <= 1 && ['roar', 'trumpet'].includes(F.voice))) { s += 4; why.push('voice'); }
  for (const [x, y] of CONTRA) if ((F.traits.includes(x) && B.traits.includes(y)) || (F.traits.includes(y) && B.traits.includes(x))) { s += 3; why.push('traits'); break; }
  if (F.cls === 'pet') s += 2; // expressive faces read best
  return { s, why };
}
function joinName(a, b) {
  b = b.toLowerCase(); if (a.endsWith(' ')) return a + b;
  if (a[a.length - 1].toLowerCase() === b[0]) b = b.slice(1);
  const v = c => 'aeiouy'.includes(c.toLowerCase());
  if (!v(a[a.length - 1]) && !v(b[0]) && !v(b[1] || 'a') && b.length > 3) b = b.slice(1);
  return a + b;
}
function mashName(F, B) {
  const c = [joinName(F.pre, B.suf), joinName(B.pre, F.suf)];
  const sc = n => -Math.abs(n.length - 10) + (/[^aeiouy ]{3}/i.test(n) ? -3 : 0);
  return sc(c[0]) >= sc(c[1]) ? c[0] : c[1];
}
function orient(a, b) { const A = SP[a], Bb = SP[b]; const s1 = funnyScore(A, Bb), s2 = funnyScore(Bb, A); return (s1.s >= s2.s) ? { face: a, body: b, fs: s1 } : { face: b, body: a, fs: s2 }; }
function mashKit(fid, bid, seedv, leg) {
  const F = SP[fid], B = SP[bid], fk = F.kit, bk = B.kit;
  const k = JSON.parse(JSON.stringify(bk));
  k.id = 'm_' + fid + '_' + bid + (leg ? '_L' : ''); k.key = k.id; k.seed = seedv || hashStr(k.id) % 9999 + 1; k.isMash = true;
  k.headType = fk.headType; k.hp = JSON.parse(JSON.stringify(fk.hp));
  k.hp.puddle = mix((fk.hp.eye && fk.hp.eye[0] === '#') ? fk.hp.eye : '#4a2a14', '#1fd8c8', .55);
  k.headGrafts = (fk.headGrafts || []).slice();
  k.bodyGrafts = (bk.bodyGrafts || []).filter(x => !B.ident.includes(x));
  if (B.ident.includes('sweater') || bid === 'pelon') delete k.sweater;
  if (fid !== bid) for (const h of B.headSig) if (!k.headGrafts.includes(h)) k.headGrafts.push(h);
  for (const id of F.ident) { if (HEAD_ACC[id]) { if (!k.headGrafts.includes(id)) k.headGrafts.push(id); } else if (!k.bodyGrafts.includes(id)) k.bodyGrafts.push(id); }
  if (fid === 'pelon') k.sweater = fk.sweater;
  if (fid !== bid) for (const s of F.bodySig) {
    if (['wings', 'pouch', 'spikes', 'bristles', 'flippers', 'tinyarms'].includes(s)) { if (!k.bodyGrafts.includes(s)) k.bodyGrafts.push(s); }
    else if (s === 'wool') { k.bodyGrafts.push('wool'); k.skin = 'wool'; }
    else if (s === 'stripes') { k.pat = 'stripes'; k.patCol = '#2a1a14'; }
    else if (s === 'beads') { k.pat = 'beads'; }
    else if (s === 'saddle') { k.pat = 'saddle'; k.patCol = '#5a3a1a'; }
    else if (s === 'skunk') { k.pat = 'skunk'; k.tail = 'skunk'; }
    else if (s === 'rattle') k.tail = 'rattle';
    else if (s === 'bushytail') k.tail = 'bushy';
    else if (s === 'birdlegs') { k.foot = 'bird'; k.legCol = '#e8a33a'; }
    else if (s === 'claws') k.foot = 'sloth';
    else if (s === 'tentacles') { if (k.plan === 'quad') k.legsAs = 'tentacles'; else k.headGrafts.push('tentamane'); }
    else if (s === 'spiderlegs') { if (k.plan === 'quad') k.spiderlegs = 1; }
  }
  if (fid !== bid && k.col && fk.hp.col && F.cls !== 'exotic') k.col = mix(k.col, fk.hp.col, .3);
  k.hrel = clamp(1.12 + (F.size - B.size) * .05, .92, 1.35);
  if (k.plan === 'sit' && F.size > 2) k.hrel = 1;
  if (leg) { if (leg.add) { for (const h of leg.add.head || []) if (!k.headGrafts.includes(h)) k.headGrafts.push(h); for (const h of leg.add.body || []) if (!k.bodyGrafts.includes(h)) k.bodyGrafts.push(h); } if (leg.mods) { const m = JSON.parse(JSON.stringify(leg.mods)); if (m.hp) { Object.assign(k.hp, m.hp); delete m.hp; } Object.assign(k, m); } }
  k.bodyGrafts.push('sparkle');
  if (k.headGrafts.length > 4) k.headGrafts = k.headGrafts.slice(0, 4);
  return k;
}
// create mashup resident data (not the instance needs)
function makeMash(a, b, forceLegend) {
  const leg = LEG_BY_PAIR[pairKey(a, b)];
  let o = orient(a, b); if (leg) o = { face: leg.face, body: leg.body, fs: funnyScore(SP[leg.face], SP[leg.body === leg.face ? (leg.a === leg.face ? leg.b : leg.a) : leg.body]) };
  const F = SP[o.face], B = SP[leg ? (leg.a === o.face ? leg.b : leg.a) : o.body];
  const kit = mashKit(o.face, o.body, hashStr(a + b) % 9999 + 1, leg);
  const name = leg ? leg.name : mashName(F, B);
  const why = o.fs.why.slice(); const quirk = gi(QUIRKS.length);
  const gag = leg ? leg.gag : mashGag(F, B, kit, why, quirk);
  const size = Math.max(SP[o.body].size, Math.round((F.size + B.size) / 2));
  const tags = mashTags(F, B, kit, size);
  const rarity = leg ? 'Legendary' : (o.fs.s >= 14 ? 'Rare' : 'Common');
  const fee = Math.round((9000 + size * 5000 + o.fs.s * 700) * (rarity === 'Legendary' ? 3 : rarity === 'Rare' ? 1.6 : 1) / 100) * 100;
  return { kit, name, gag, quirk, tags, rarity, fee, size, face: o.face, body: o.body, parents: [a, b], legend: leg ? leg.idx : -1, why, score: o.fs.s, voice: F.voice, hab: SP[o.body].hab };
}
function mashTags(F, B, kit, size) {
  const t = new Set();
  const gr = kit.headGrafts.concat(kit.bodyGrafts);
  if (gr.includes('wings')) t.add('Flyer'); if (gr.includes('horn') || gr.includes('horn3') || gr.includes('spikes')) t.add('Tough');
  if (gr.includes('mane') || gr.includes('wool') || kit.tail === 'bushy' || kit.skin === 'wool' || kit.hp.flat) t.add('Fluffy');
  if (size >= 5) t.add('Needs acreage'); if (size <= 1) t.add('Tiny');
  if (['swamp', 'salt', 'ice'].includes(F.hab) || ['swamp', 'salt', 'ice'].includes(B.hab)) t.add('Pool');
  if (kit.legsAs || gr.includes('tentamane') || kit.plan === 'octo' || kit.spiderlegs || kit.plan === 'spider') t.add('Many arms');
  if (kit.foot === 'bird' || kit.plan === 'runner' || kit.plan === 'roo') t.add('Fast');
  if (['roar', 'trumpet', 'screech', 'howl', 'yap'].includes(F.voice)) t.add('Loud');
  if (F.cute >= 4) t.add('Cuddly'); if (B.scary >= 4) t.add('Scary-looking');
  t.add(pick(F.tags)); t.add(pick(B.tags));
  return [...t].slice(0, 4);
}
const QUIRKS = ['thinks it\'s a houseplant', 'only communicates in sneezes', 'is afraid of its own tail', 'does its own taxes', 'loves Mondays', 'believes it\'s a famous DJ', 'is "on a cleanse"', 'collects bottle caps', 'insists on being called Doctor', 'hums the Ark Funk constantly', 'sleeps upside down', 'is training for a marathon', 'is allergic to itself', 'refuses stairs on principle', 'eats only beige food', 'thinks Sarge is its dad', 'files formal complaints', 'is a natural blonde (claims)', 'hoards remote controls', 'watches telenovelas', 'sneezes glitter', 'won\'t stop doing lunges', 'is pretty sure it can fly', 'speaks fluent sarcasm', 'is scared of tumbleweeds', 'only drinks from the hose', 'thinks it\'s a lowrider', 'wants to be an influencer', 'gives unsolicited life advice', 'is writing a memoir',
  V('farts on cue', 'toots on cue'), V('humps the vet\'s leg (out of respect)', 'hugs the vet\'s leg (out of respect)'), V('eats its own poop as a "power move"', 'buries snacks in Ella\'s boots'), V('licks its own butt during adopter interviews', 'grooms itself loudly during interviews'), 'has a crippling online-shopping problem', V('was definitely conceived in a hot tub', 'was definitely born at a pool party')];
function mashGag(F, B, kit, why, qi) {
  const fn = F.sp.toLowerCase(), w = why[0] || 'quirk', h = hashStr(F.id + B.id), q = QUIRKS[qi % QUIRKS.length];
  const lbs = Math.round(Math.max(F.lbs, B.lbs) * .8 + Math.min(F.lbs, B.lbs)).toLocaleString('en-US');
  const G = {
    size: [`Weighs ${lbs} lbs. Still thinks it's a lap ${fn}.`, V(`${lbs} lbs of pure ${fn} energy. Its poops have their own ZIP code.`, `${lbs} lbs of pure ${fn} energy. Needs its own ZIP code.`)],
    flip: ['Looks like it could eat a car. Cries at commercials.', V('Terrifying from the front. From the back, honestly also terrifying. Loves belly rubs.', 'Terrifying on paper. Loves belly rubs.')],
    wings: ['Has wings. Has never once used them correctly.', V("Tried to fly once. We don't talk about where it landed. (Plinth's car. Butt-first.)", 'Tried to fly once. Landed on Plinth\'s car.')],
    flippers: ['Built for Antarctica. Lives in El Paso. Is NOT okay.'],
    hab: [`Needs a ${HABS[F.hab]} AND a ${HABS[B.hab]}. Currently lives in your bathtub.`],
    voice: [`${Math.max(F.size, B.size) * 2} feet of muscle. Sounds like a ${F.voice === 'yap' ? 'squeaky toy' : F.voice}.`, V(`Opens its mouth to roar. A tiny "${F.voice}" comes out. Then a fart. Everybody laughs.`, `Opens its mouth to roar. A tiny "${F.voice}" comes out.`)],
    traits: [`Wants to be ${F.traits[0]}. Also wants to be ${B.traits[0]}. Mostly just yells.`],
    quirk: ['It {q}. Nobody taught it that.']
  };
  const arr = G[w] || G.quirk, base = arr[h % arr.length];
  const make = md => { const t = v => typeof v === 'string' ? v : v[md]; return t(base).replace('{q}', t(q)) + (w !== 'quirk' ? ` Also, it ${t(q)}.` : ''); };
  return { r: make('r'), c: make('c') };
}
// kit for any resident
function kitOf(r) {
  if (r.mash) { if (!r._kit) { const L = r.mash.legend >= 0 ? LEGENDS_MASH[r.mash.legend] : null; const o = L ? { face: L.face, body: L.body } : { face: r.mash.face, body: r.mash.body }; r._kit = mashKit(o.face, o.body, hashStr(r.mash.parents.join('')) % 9999 + 1, L); } return r._kit; }
  if (r.stray) { if (!r._kit) { const k = strayKit(r.stray, r.sp === 'straycat'); k.id = 'stray' + r.stray; k.key = k.id; k.seed = r.stray; k.headType = k.headType || 'dog'; r._kit = k; } return r._kit; }
  return SP[r.sp].kit;
}
