/* ===================== GAME LOGIC ===================== */
const RT = { scene: 'title', phase: null, tab: 'ark', sel: null, t: 0, shiftT: 0, shiftLen: 100, streak: 0, streakT: 0, mult: 1, callT: 18, call: null, callAge: 0,
  buzz: 0, adopters: [], ai: 0, ci: 0, asked: [], arrivals: [], story: null, parts: [], toasts: [], shake: 0, ev: null, modal: null, featured: null, adsToday: {},
  dayEarn: 0, dayAdopt: 0, dayDeny: 0, report: null, lovePick: [], scroll: {}, care: null, staffT: 0, roboT: 0, crewT: 0, flash: 0, paused: false, celebLines: 0 };
const PET_TAGS = ['Cuddly', 'Playful', 'Kid-friendly', 'Loyal', 'Active', 'Lazy', 'Gentle', 'Funny', 'Hungry', 'Big yard', 'Porch', 'Hiker'], CAT_TAGS = ['Indoor', 'Quiet', 'Cuddly', 'Apartment', 'Lazy', 'Sneaky', 'Cozy', 'Diva'];
const isPerm = r => r.sp !== 'mash' && SP[r.sp] && SP[r.sp].story;
function infoOf(r) { return r.sp === 'mash' ? null : SP[r.sp] || null; }
function nameOf(r) { return r.name; }
function spName(r) { if (r.sp === 'mash') return (r.mash.rarity === 'Legendary' ? '★ Legendary ' : r.mash.rarity === 'Rare' ? 'Rare ' : '') + 'Mashup: ' + SP[r.mash.parents[0]].sp + ' + ' + SP[r.mash.parents[1]].sp; if (r.stray) return r.sp === 'straycat' ? 'Shelter cat' : 'Shelter dog'; return SP[r.sp].sp; }
function sizeOf(r) { return r.sp === 'mash' ? r.mash.size : r.stray ? (r.sp === 'straycat' ? 1 : 2) : SP[r.sp].size; }
function habOf(r) { return r.sp === 'mash' ? null : r.stray ? 'kennel' : SP[r.sp].hab; }
function voiceOf(r) { return r.sp === 'mash' ? r.mash.voice : r.stray ? (r.sp === 'straycat' ? 'meow' : 'bark') : SP[r.sp].voice; }
function tagsOf(r) {
  let t;
  if (r.sp === 'mash') t = r.mash.tags.slice(); else if (r.stray) { const pool = r.sp === 'straycat' ? CAT_TAGS : PET_TAGS; t = [0, 1, 2].map(i => pool[(r.stray * (i + 3) * 7 + i * 5) % pool.length]); } else t = SP[r.sp].tags.slice();
  const sz = sizeOf(r), sc = r.sp === 'mash' ? SP[r.mash.body].scary : r.stray ? 1 : SP[r.sp].scary;
  if (sc >= 4) t.push('Scary-looking'); if (t.some(x => ['Calm', 'Slow', 'Lazy'].includes(x))) t.push('Zen'); if (t.some(x => ['Dancer', 'Fancy'].includes(x))) t.push('Graceful');
  if (sz <= 1) t.push('Tiny'); if (sz >= 5) t.push('Needs acreage');
  return [...new Set(t)];
}
function needAvg(r) { return (r.hunger + r.clean + r.health + r.happy) / 4; }
function newResident(spid, o = {}) {
  const r = Object.assign({ id: GS.nextId++, sp: spid, name: '', hunger: .7, clean: .7, health: .85, happy: .7, poops: [], boo: [], st: -1, arrived: GS.day, sigDay: 0 }, o);
  if (spid === 'straydog' || spid === 'straycat') { r.stray = r.stray || (gi(9000) + 11); r.name = r.name || pick(STRAY_NAMES); }
  else if (spid !== 'mash') r.name = SP[spid].name;
  return r;
}
function stallTaken() { const s = new Set(); for (const r of GS.residents) if (r.st >= 0) s.add(r.st); return s; }
function assignStall(r) {
  const L = stallList(), used = stallTaken(), h = habOf(r); let best = -1;
  for (let i = 0; i < L.length; i++) if (!used.has(i)) { if (h && L[i] === h) { best = i; break; } if (best < 0 && (!h || L[i] === 'kennel' || !h)) best = i; }
  if (best < 0) for (let i = 0; i < L.length; i++) if (!used.has(i)) { best = i; break; }
  r.st = best; return best >= 0;
}
function wrongHab(r) { const h = habOf(r); if (!h || r.st < 0) return false; return stallList()[r.st] !== h; }
function addResident(r) { if (assignStall(r)) GS.residents.push(r); else GS.queue.push(r); dexAdd(r); return r; }
function placeQueue() { while (GS.queue.length) { const r = GS.queue[0]; if (!assignStall(r)) break; GS.queue.shift(); GS.residents.push(r); } }
function rehome() { // after buying a habitat: move wrong-habitat residents into matching free stalls
  const L = stallList(); let moved = 0;
  for (const r of GS.residents) if (wrongHab(r)) { const used = stallTaken(); for (let i = 0; i < L.length; i++) if (!used.has(i) && L[i] === habOf(r)) { r.st = i; moved++; break; } }
  placeQueue(); return moved;
}
function dexKey(r) { return r.sp === 'mash' ? 'm:' + r.mash.parents.join('+') : r.stray ? null : r.sp; }
function dexAdd(r) { const k = dexKey(r); if (!k || GS.dex[k]) return; GS.dex[k] = r.sp === 'mash' ? { n: r.name, p: r.mash.parents, l: r.mash.legend, d: GS.day, g: r.mash.gag, rr: r.mash.rarity } : { n: r.name, d: GS.day }; RT.newDex = (RT.newDex || 0) + 1; }
function mashResident(a, b) {
  const m = makeMash(a, b); const mash = Object.assign({}, m); delete mash.kit;
  if (has('p_filter')) { mash.fee = Math.round(mash.fee * 1.2); }
  const r = newResident('mash', { mash, name: m.name, happy: has('p_filter') ? 1 : .8 });
  GS.stats.mash++; GS.mashCount++; if (m.rarity === 'Legendary') GS.stats.legend++;
  return r;
}
/* ---------- chapters + goals ---------- */
function snapStats() { return { s: Object.assign({}, GS.stats), life: GS.lifetime, day: GS.day }; }
const HAB_IDS = ['h_desert', 'h_swamp', 'h_reptile', 'h_bigcat', 'h_sky', 'h_jungle', 'h_ice', 'h_salt', 'h_mud', 'h_pachy', 'h_jurassic'];
const GOAL_LABEL = { adopt: 'Adoptions', poops: 'Poops scooped', ads: 'Ads posted', vets: 'Vet checks', inspection: 'Pass the inspection', habitats: 'Habitats built', adoptExotic: 'Exotics adopted', sig: 'Signature cares', earned: 'Donations this chapter', mash: 'Mashups born', adoptMash: 'Mashups adopted', legend: 'Legendary mashup', adoptCeleb: 'Celebrity adoptions', denyRed: 'Red-flag denials', fakes: 'Fake celebrity caught', finale: 'Stop the Re-Floodening' };
function goalProg(gl) {
  const [type, n] = gl, s0 = (GS.chStart && GS.chStart.s) || GS.stats;
  if (type === 'buy') return { cur: has(n) ? 1 : 0, need: 1, label: 'Buy ' + UPG_BY[n].name, money: 0 };
  if (type === 'habitats') { const c = HAB_IDS.filter(has).length; return { cur: Math.min(c, n), need: n, label: GOAL_LABEL.habitats }; }
  if (type === 'earned') { const c = GS.lifetime - ((GS.chStart && GS.chStart.life) || 0); return { cur: Math.min(c, n), need: n, label: GOAL_LABEL.earned, money: 1 }; }
  if (type === 'finale') return { cur: GS.flags.finale ? 1 : 0, need: 1, label: GOAL_LABEL.finale };
  const c = (GS.stats[type] || 0) - (s0[type] || 0); return { cur: Math.min(c, n), need: n, label: GOAL_LABEL[type] || type };
}
const goalsDone = () => CH[GS.ch].goals.every(gl => { const p = goalProg(gl); return p.cur >= p.need; });
function trackFor(kind) { const a = GS.act; if (kind === 'care') return [1, 1, 3, 5, 6][a] ?? 1; if (kind === 'open') return a >= 4 ? 6 : 2; if (kind === 'report') return 0; return 0; }
function newGame() { GS = freshState(); GS.started = true; save(); startChapter(1); }
function startChapter(n) {
  GS.ch = n; GS.act = CH[n].act; GS.chStart = snapStats(); GS.flags['intake' + n] = 0; GS.phase = 'morning'; save();
  RT.nextTitle = [(ACT_NAMES[CH[n].act] || 'FINALE') + ' · CHAPTER ' + n, CH[n].title]; RT.scene = RT.scene === 'title' ? 'day' : RT.scene;
  playStory(CH[n].intro, CH[n].music, CH[n].bg, () => CH[n].event === 'finale' ? startFinale() : startDay());
}
function chapterComplete() {
  const c = CH[GS.ch]; toast('CHAPTER ' + GS.ch + ' COMPLETE!', '#ffd24a', 3); sfx('star', 3);
  playStory(c.outro || [], c.music, c.bg, () => { if (GS.ch >= 20) { endGame(); return; } startChapter(GS.ch + 1); });
}
/* ---------- day cycle ---------- */
function startDay() {
  RT.scene = 'day'; RT.phase = 'morning'; RT.tab = 'ark'; RT.sel = null; RT.arrivals = []; GS.phase = 'morning';
  const c = CH[GS.ch];
  // returned animals
  for (const ret of GS.returns || []) { const r = ret.r; r.st = -1; r.returned = ret.note; RT.arrivals.push(addResident(r)); }
  GS.returns = [];
  // chapter intake (first morning of the chapter)
  if (!GS.flags['intake' + GS.ch]) { GS.flags['intake' + GS.ch] = 1; for (const id of c.intake) if (!GS.residents.concat(GS.queue).some(r => r.sp === id && SP[id].story)) RT.arrivals.push(addResident(newResident(id, { fresh: 1 }))); }
  // mashup crates from last night's Romance Hour
  for (const cr of GS.crates || []) RT.arrivals.push(addResident(mashResident(cr[0], cr[1])));
  GS.crates = [];
  // keep the shelter a shelter: strays, plus exotic arrivals from Act 3 on
  const pets = GS.residents.filter(r => r.stray || (SP[r.sp] && SP[r.sp].cls === 'pet')).length;
  if (GS.act <= 2 && pets < 3 && GS.day > 1) for (let i = 0; i < 1 + gi(2); i++) RT.arrivals.push(addResident(newResident(grnd() < .5 ? 'straydog' : 'straycat')));
  if (GS.act >= 3 && GS.day > 1) {
    const pure = GS.residents.filter(r => SP[r.sp] && r.sp !== 'mash').length; const want = Math.max(0, 4 - pure) + (grnd() < .5 ? 1 : 0);
    const pool = BREEDABLE.filter(k => SP[k].cls !== 'pet' && !SP[k].story); for (let i = 0; i < want; i++) RT.arrivals.push(addResident(newResident(pick(pool), { fresh: 1 })));
    if (grnd() < .4) RT.arrivals.push(addResident(newResident(grnd() < .5 ? 'straydog' : 'straycat')));
  }
  if (GS.act === 2 && GS.day > 1 && grnd() < .35) { const pool = BREEDABLE.filter(k => SP[k].act === 2 && !SP[k].story && SP[k].cls === 'exotic'); RT.arrivals.push(addResident(newResident(pick(pool), { fresh: 1 }))); }
  placeQueue(); save();
  musicPlay(trackFor('report'));
  if (!RT.arrivals.length) startCare(); else { RT.arrivalI = 0; RT.crateT = 0; sfx('honk'); }
}
function nextArrival() { RT.arrivalI++; RT.crateT = 0; if (RT.arrivalI >= RT.arrivals.length) { RT.arrivals = []; startCare(); } }
function startCare() {
  RT.phase = 'care'; GS.phase = 'care'; RT.shiftLen = SETTINGS.chill ? 150 : 100; RT.shiftT = 0; RT.streak = 0; RT.mult = 1; RT.callT = 14 + gR(0, 8); RT.call = null; RT.buzz = 0; RT.adsToday = {}; RT.featured = null; RT.dayEarn = 0; RT.dayAdopt = 0; RT.dayDeny = 0; RT.ev = null; RT.inspDone = 0; RT.care = null;
  if (!GS.residents.find(r => r.id === RT.sel && r.st >= 0)) { const f = GS.residents.find(r => r.st >= 0); RT.sel = f ? f.id : null; }
  const ev = CH[GS.ch].event;
  if (ev === 'dust' && !GS.flags.dustDone) RT.ev = { type: 'dust', at: 25, t: 0, on: 0 };
  if (ev === 'flood' && !GS.flags.floodRain) { GS.flags.floodRain = 1; RT.ev = { type: 'rain', t: 0, on: 1 }; sfx('thunder'); }
  if (ev === 'rhino' && !GS.flags.rhinoDone) RT.ev = { type: 'rhino', at: 30, t: 0, on: 0, hits: 0 };
  if (ev === 'inspection') toast(T('INSPECTION TODAY! Plinth checks at the end of the shift.', 'INSPECTION TODAY! Plinth checks at the end of the shift.'), '#ff8a5a', 4);
  for (const r of GS.residents) if (r.health < .6 && !r.boo.length) addBoo(r);
  musicPlay(trackFor('care')); MUS.lvl = 1; save();
}
function addBoo(r) { const n = 1 + gi(2); for (let i = 0; i < n; i++) r.boo.push([gR(-.35, .35), gR(-.75, -.25)]); }
const NEED_RATE = { hunger: .0062, clean: .0042, health: .0022, happy: .0052 };
function updateCare(dt) {
  if (RT.tab !== 'ark' && RT.tab !== 'ads') return; // shift pauses in BUILD / DEX / settings
  if (RT.modal || RT.ev && RT.ev.type === 'rhino' && RT.ev.on) { if (RT.ev && RT.ev.on) updateEvent(dt); if (RT.modal) return; }
  RT.shiftT += dt;
  const n = GS.residents.length, crowd = clamp(8 / Math.max(1, n), .35, 1), chill = SETTINGS.chill ? .6 : 1;
  const k = { hunger: (has('c_feeder') ? .75 : 1), clean: 1, health: (has('c_vet') ? .6 : 1) * (has('s_lupe') ? .7 : 1), happy: (has('s_abuelas') ? .7 : 1) * (has('g_speakers') ? .8 : 1) };
  const dust = RT.ev && RT.ev.type === 'dust' && RT.ev.on;
  for (const r of GS.residents) {
    for (const nd in NEED_RATE) r[nd] = clamp(r[nd] - NEED_RATE[nd] * k[nd] * crowd * chill * dt * (nd === 'happy' && wrongHab(r) ? 1.8 : 1) * (nd === 'clean' && dust ? 5 : 1), 0, 1);
    // poop
    const pr = .006 * (.6 + sizeOf(r) * .25) * (has('c_vac') ? .7 : 1) * crowd * chill * (r.hunger > .5 ? 1.2 : .8);
    if (r.poops.length < 3 && grnd() < pr * dt * 6) { r.poops.push([gR(.12, .88), gR(.72, .9), sizeOf(r)]); }
    if (r.poops.length) r.clean = clamp(r.clean - .002 * r.poops.length * dt, 0, 1);
    if (r.health < .45 && !r.boo.length && grnd() < .01 * dt * 10) addBoo(r);
  }
  // helpers
  RT.staffT += dt; if (has('s_dusty') && RT.staffT > 12) { RT.staffT = 0; autoScoop('Uncle Dusty'); }
  RT.roboT += dt; if (has('c_robo') && RT.roboT > 4) { RT.roboT = 0; autoScoop(null); }
  RT.crewT += dt; if (has('s_crew') && RT.crewT > 8 && n) { RT.crewT = 0; const r = GS.residents.reduce((a, b) => a.happy < b.happy ? a : b); r.happy = clamp(r.happy + .3, 0, 1); }
  // streak decay
  if (RT.streak > 0) { RT.streakT += dt; if (RT.streakT > 6) { RT.streak = 0; RT.mult = 1; MUS.lvl = 1; } }
  // quick calls
  if (RT.call) { RT.callAge += dt; if (RT.callAge > 14) { RT.call = null; } }
  else { RT.callT -= dt; if (RT.callT <= 0) { RT.callT = 22 + gR(0, 12); spawnCall(); } }
  // music intensity from need levels
  if (RT.streak < 5) { const low = GS.residents.filter(r => Math.min(r.hunger, r.clean, r.health, r.happy) < .3).length; MUS.lvl = low >= 3 ? 2 : 1; }
  updateEvent(dt);
  if (RT.shiftT >= RT.shiftLen) endCare();
}
function autoScoop(who) { for (const r of GS.residents) if (r.poops.length) { const p = r.poops.pop(); GS.stats.poops++; spawn('poof', stallCenter(r.st, p), 6); if (who && grnd() < .3) toast(who + ' scooped a pile', '#cfe8ff', 1.4); return; } }
function updateEvent(dt) {
  const e = RT.ev; if (!e) return; e.t += dt;
  if (e.type === 'dust') { if (!e.on && RT.shiftT >= e.at) { e.on = 1; e.t = 0; musicPlay(7); sfx('thunder'); toast(T('HABOOB! Dust storm! Everyone needs a bath. Again.', 'HABOOB! Dust storm! Everyone needs a bath.'), '#e0a050', 3); } if (e.on && e.t > 16) { e.on = 0; RT.ev = null; GS.flags.dustDone = 1; musicPlay(trackFor('care')); toast('The dust settles. Ella spits out a tumbleweed.', '#ffe0a0', 2.5); } }
  if (e.type === 'rain' && e.t > 40) RT.ev = null;
  if (e.type === 'rhino') { if (!e.on && RT.shiftT >= e.at) { e.on = 1; e.t = 0; e.x = -60; musicPlay(7); sfx('incident'); voice('grunt', 5); toast('RHONDA ESCAPED! Tap her 5 times!', '#ff6a5a', 3); }
    if (e.on) { e.x += dt * (90 + e.hits * 10); if (e.x > L.W + 80) e.x = -80; if (e.t > 16 || e.hits >= 5) { e.on = 0; GS.flags.rhinoDone = 1; const won = e.hits >= 5; RT.ev = null; musicPlay(trackFor('care')); if (won) { earn(5000, null); RT.buzz += 2; toast('Caught! KFUN paid $5,000 for the exclusive.', '#9cff9c', 3); } else { RT.buzz += 1; toast(T('Rhonda got away... then came back for snacks. Trent got it all on camera.', 'Rhonda came back for snacks. Trent got it on camera.'), '#ffd24a', 3); } } } }
}
function spawnCall() {
  const pool = CALLS.filter(c => c.act <= GS.act && c.act >= GS.act - 1 && (!SP[c.who] || GS.residents.some(r => r.sp === c.who)));
  if (!pool.length) return; RT.call = pick(pool); RT.callAge = 0; sfx('incident');
}
function answerCall(side) {
  const c = RT.call; if (!c) return; const eff = (side ? c.R : c.L)[1]; RT.call = null; sfx('tap');
  if (eff.m) { if (eff.m > 0) earn(eff.m * (GS.act >= 3 ? 10 : 1), null); else spend(-eff.m * (GS.act >= 3 ? 10 : 1)); }
  if (eff.r) GS.rep = clamp(GS.rep + eff.r * 2, 0, 100);
  if (eff.buzz) RT.buzz += eff.buzz;
  for (const nd of ['happy', 'clean']) if (eff[nd]) for (const r of GS.residents) r[nd] = clamp(r[nd] + eff[nd], 0, 1);
  if (eff.care) for (const r of GS.residents) r.health = clamp(r.health + eff.care, 0, 1);
  toast((side ? c.R : c.L)[0] + '!', '#ffe9a8', 1.6);
}
function bumpStreak() {
  RT.streak++; RT.streakT = 0; const old = RT.mult; RT.mult = RT.streak >= 10 ? 2 : RT.streak >= 5 ? 1.5 : 1;
  if (RT.mult > old) { sfx('riser'); (RT.hudPulse = 1); MUS.lvl = RT.mult >= 2 ? 3 : 2; }
  else sfx('streak', Math.min(RT.streak, 12));
}
// care actions: return true if something useful happened
function careAction(r, kind, amt = 1) {
  if (!r) return false; let ok = false; const c = stallCenter(r.st);
  if (kind === 'feed') { if (r.hunger < .95) { r.hunger = clamp(r.hunger + .55, 0, 1); r.happy = clamp(r.happy + .05, 0, 1); ok = true; sfx('nom'); spawn('kibble', c, 8); } }
  if (kind === 'wash') { r.clean = clamp(r.clean + amt, 0, 1); if (r.clean >= .999) { ok = true; sfx('splash'); spawn('bubble', c, 12); r.poops = []; } }
  if (kind === 'vet') { if (r.boo.length) { r.boo.pop(); r.health = clamp(r.health + (has('c_vet') ? .6 : .4), 0, 1); if (!r.boo.length) { r.health = has('c_vet') ? 1 : Math.max(r.health, .9); GS.stats.vets++; ok = true; sfx('ding'); spawn('heart', c, 6); } else sfx('pop'); } else if (r.health < .95) { r.health = clamp(r.health + .4, 0, 1); GS.stats.vets++; ok = true; sfx('ding'); spawn('heart', c, 5); } }
  if (kind === 'play') { r.happy = clamp(r.happy + amt, 0, 1); ok = amt >= .3 || r.happy >= .999; if (ok) { sfx('pop'); spawn('star', c, 6); } }
  if (kind === 'sig') { if (r.sigDay !== GS.day) { r.sigDay = GS.day; for (const nd of ['hunger', 'clean', 'health']) r[nd] = clamp(r[nd] + .3, 0, 1); r.happy = 1; GS.stats.sig++; ok = true; sfx('fwoomp'); spawn('heart', c, 14); spawn('sparkle', c, 14); } }
  if (ok) { tagRes(r, needAvg(r) > .97 ? '+FULL SERVICE!' : { feed: 'NOM NOM!', wash: 'SQUEAKY CLEAN!', vet: 'PATCHED UP!', play: 'ZOOMIES!', sig: sigName(r).toUpperCase() + '! ♥' }[kind] || '♥', needAvg(r) > .97 ? '#ffd24a' : '#fff4e0'); GS.stats.care++; bumpStreak(); voice(voiceOf(r), sizeOf(r)); r.bounce = 1; if (grnd() < .45) ellaSay(tx(pick(ELLA_CARE[kind === 'sig' ? 'special' : kind] || ELLA_CARE.feed))); }
  return ok;
}
function scoop(r, i) { const p = r.poops.splice(i, 1)[0]; if (!p) return; GS.stats.poops++; sfx('squish', p[2]); if (grnd() < .18) setTimeout(() => sfx('fart', .35 + p[2] * .1), 150); spawn('poof', stallCenter(r.st, p), 8); r.clean = clamp(r.clean + .08, 0, 1); bumpStreak(); }
function endCare() {
  RT.call = null; RT.sel = null; RT.care = null; RT.ev = null;
  if (CH[GS.ch].event === 'inspection' && !RT.inspDone && goalProg(['inspection', 1]).cur < 1) { RT.inspDone = 1; runInspection(); return; }
  startOpen();
}
function runInspection() {
  const rs = GS.residents, av = k => rs.length ? rs.reduce((a, r) => a + r[k], 0) / rs.length : 1, poops = rs.reduce((a, r) => a + r.poops.length, 0);
  const checks = [['Fed', av('hunger') > .45], ['Clean', av('clean') > .45 && poops <= 4], ['Healthy', av('health') > .5], ['Happy', av('happy') > .4]];
  const pass = checks.filter(c => c[1]).length >= 3; if (pass) GS.stats.inspection++;
  RT.modal = { type: 'inspect', checks, pass, t: 0 }; sfx(pass ? 'stamp' : 'denied'); musicPlay(8);
}
/* ---------- Open House ---------- */
const CELEB_ANS = { home: ['A mansion in the hills. Several, actually. One is shaped like me.', 'A penthouse, a ranch and a private island named after my abs.', 'Eleven homes. The animal can pick.'], day: ['My assistants handle my days. I handle my nights.', 'Meetings, cameras, more cameras. The animal gets its own staff.', 'I wake up at 4 AM to be seen waking up at 4 AM.'], past: ['I had a horse once. It had its own perfume line.', 'My last pet has a podcast now.', 'I was raised by wolves. Rich wolves. In Aspen.'] };
function adopterPool() {
  const act = GS.act, out = [];
  for (const a of LOCALS) if (a.act <= act && (act < 3 || a.act >= 2)) out.push({ src: a, w: a.act === act ? 3 : 1 });
  if (act >= 4) for (const c of CELEBS) out.push({ src: Object.assign({ act: 4, celeb: 1, cap: 6 }, c), w: 3 });
  return out;
}
function makeAdopter(src, fake) {
  const a = { id: src.id + '_' + GS.nextId++, name: src.name, who: src.who, wants: src.wants.slice(), cap: src.cap || 6, pay: src.pay, bust: Object.assign({ seed: hashStr(src.id) % 999 }, src.bust || localBust(hashStr(src.id))), celeb: !!src.celeb, line: src.line, extra: src.extra, green: src.green, srcId: src.id };
  const h = hashStr(a.id); a.ans = src.ans || { home: CELEB_ANS.home[h % 3], day: CELEB_ANS.day[(h >> 3) % 3], past: CELEB_ANS.past[(h >> 5) % 3] };
  let flagged = false;
  if (src.flag) { if (src.flagIf === 'big') flagged = 'big'; else flagged = grnd() < (src.flagChance ?? .5); }
  if (flagged) a.flag = { q: src.flag.q || pick(['home', 'day', 'past']), text: src.flag.text, tell: src.flag.tell, big: flagged === 'big' };
  if (fake) { a.fake = 1; a.name = src.name; a.flag = { q: pick(['home', 'day', 'past']), text: pick(FAKE_TELLS), tell: 'FAKE' }; a.who = src.who + '?'; a.pay = [src.pay[0], src.pay[1]]; }
  a.sniff = a.flag ? grnd() < .6 : grnd() < .06 ? 'sneeze' : false;
  return a;
}
function matchInfo(a, r) {
  const t = tagsOf(r), hit = a.wants.filter(w => t.includes(w)); const big = sizeOf(r) > a.cap;
  return { hearts: big ? 0 : hit.length, hit, big, fit: big ? 0 : hit.length / a.wants.length };
}
function startOpen() {
  RT.phase = 'open'; GS.phase = 'open'; RT.tab = 'ark'; RT.sel = null; save();
  const pool = adopterPool(), adoptable = GS.residents.filter(r => !isPerm(r));
  let n = 2 + Math.floor(GS.rep / 30) + Math.min(5, Math.floor(RT.buzz)) + (has('g_neon') ? 1 : 0); n = clamp(n, 2, 7);
  const list = [], used = new Set();
  for (let i = 0; i < n && pool.length; i++) {
    // weight candidates by how well they match current residents (and the featured ad animal)
    let best = null, bs = -1;
    for (let k = 0; k < 6; k++) { const c = pool[gi(pool.length)]; if (used.has(c.src.id)) continue; const tmp = { wants: c.src.wants, cap: c.src.cap || 6 }; let m = 0; for (const r of adoptable) { const mi = matchInfo(tmp, r); m = Math.max(m, mi.hearts + (RT.featured === r.id ? 1 : 0)); } const sc = m * 2 + c.w + grnd() * 2; if (sc > bs) { bs = sc; best = c; } }
    if (!best) continue; used.add(best.src.id); list.push(makeAdopter(best.src));
  }
  if (has('o_carpet') && GS.act >= 4) { const c = CELEBS.find(c => !used.has(c.id)); if (c) list.push(makeAdopter(Object.assign({ act: 4, celeb: 1, cap: 6 }, c))); }
  if (CH[GS.ch].event === 'fakes' && GS.act >= 4) { const c = pick(CELEBS); list.splice(gi(list.length + 1), 0, makeAdopter(Object.assign({ act: 4, celeb: 1, cap: 6 }, c), true)); }
  RT.adopters = list; RT.ai = 0; RT.asked = []; RT.ci = bestMatchIdx(list[0]);
  musicPlay(trackFor('open')); MUS.lvl = 2;
  if (!list.length || !adoptable.length) { toast(adoptable.length ? 'Nobody showed up. Post some ads!' : 'No animals to adopt today!', '#ffd24a', 2.5); endOpen(); }
}
function adoptables() { return GS.residents.filter(r => !isPerm(r)); }
function bestMatchIdx(a) { const L = adoptables(); if (!a || !L.length) return 0; let b = 0, bs = -1; L.forEach((r, i) => { const m = matchInfo(a, r).hearts; if (m > bs) { bs = m; b = i; } }); return b; }
function curAdopter() { return RT.adopters[RT.ai]; }
function ask(q) { if (RT.asked.includes(q) || RT.asked.length >= (SETTINGS.chill ? 3 : 2)) return; RT.asked.push(q); sfx('page'); const a = curAdopter(); if (a.flag && a.flag.q === q && !(a.flag.big && !bigSelected())) { sfx('incident'); } }
const bigSelected = () => { const r = adoptables()[RT.ci]; return r && sizeOf(r) > 1; };
function flagVisible(a) { return a.flag && RT.asked.includes(a.flag.q) && (!a.flag.big || bigSelected()); }
function flagActive(a, r) { return a.flag && (!a.flag.big || sizeOf(r) > 1); }
function approve() {
  const a = curAdopter(), r = adoptables()[RT.ci]; if (!a || !r) return;
  const mi = matchInfo(a, r), bad = flagActive(a, r) || mi.hearts === 0 || a.fake;
  sfx('stamp'); RT.stamp = { ok: 1, t: 0 };
  if (bad) {
    // the adoption goes sideways: animal comes back tomorrow
    const note = a.fake ? tx(V(`"${a.name}" was a Furever Inc. intern in a wig. ${r.name} bit him on the ass and walked home.`, `"${a.name}" was a Furever Inc. intern in a wig. ${r.name} walked home.`)) : mi.hearts === 0 ? (mi.big ? `${r.name} didn't fit in their place. Like, physically. The door is gone.` : `${r.name} and ${a.name} were not a match. Mutual decision. Lots of crying.`) : tx(V(`${a.name}: "${tx(a.flag.text)}" Yeah. ${r.name} is back. Shit.`, `${a.name}: "${tx(a.flag.text)}" ${r.name} is back.`));
    removeResident(r); GS.returns.push({ r, note }); GS.rep = clamp(GS.rep - 4, 0, 100); RT.dayDeny++;
    setTimeout(() => sfx('denied'), 350); toast('Uh oh... that one\'s coming back.', '#ff8a7a', 2.2);
    nextAdopter(); return;
  }
  let don = gR(a.pay[0], a.pay[1]) * (.55 + .45 * mi.fit) * (.8 + .4 * needAvg(r));
  if (r.sp === 'mash' && GS.act >= 3) don *= r.mash.rarity === 'Legendary' ? 2.5 : r.mash.rarity === 'Rare' ? 1.5 : 1;
  if (r.sp === 'mash' && r.mash.legend >= 0 && LEGENDS_MASH[r.mash.legend].adopter === a.srcId) don *= 1.5;
  don *= RT.mult * (1 + GS.rep / 200) * (1 + (has('g_lights') ? .05 : 0) + (has('o_carpet') ? .1 : 0) + (has('g_gold') ? .15 : 0));
  don = Math.round(don / (don > 1e5 ? 1000 : don > 1e3 ? 10 : 1)) * (don > 1e5 ? 1000 : don > 1e3 ? 10 : 1);
  GS.stats.adopt++; const info = infoOf(r);
  if (r.sp === 'mash') GS.stats.adoptMash++; else if (info && info.cls === 'exotic' || info && info.cls === 'legend') GS.stats.adoptExotic++;
  if (a.celeb) GS.stats.adoptCeleb++;
  GS.rep = clamp(GS.rep + 1 + mi.hearts * .5, 0, 100);
  GS.tails.unshift({ n: r.name, a: a.name, w: a.who || '', d: GS.day, $: don, k: r.sp === 'mash' ? 'm:' + r.mash.parents.join('+') : r.sp, stray: r.stray || 0 }); GS.tails = GS.tails.slice(0, 60);
  removeResident(r); RT.dayAdopt++; earn(don, [L.W / 2, L.H * .5]); setTimeout(() => sfx('chaching', don >= 1e6 ? 1 : 0), 120);
  ellaSay(tx(pick(APPROVE_LINES))); spawn('confetti', [L.W / 2, L.H * .45], 40); if (don >= 1e6) spawn('money', [L.W / 2, 0], 60);
  RT.lastDon = { v: don, t: 0 };
  nextAdopter();
}
function deny() {
  const a = curAdopter(); if (!a) return; const r = adoptables()[RT.ci]; sfx('denied'); RT.stamp = { ok: 0, t: 0 }; shake(6);
  if (a.flag && (r ? flagActive(a, r) : true)) { GS.stats.denyRed++; GS.rep = clamp(GS.rep + 2, 0, 100); if (a.fake) { GS.stats.fakes++; toast('FAKE CELEBRITY BUSTED! Wig confiscated.', '#9cff9c', 2.5); } else toast('Good call! Red flag denied. +Rep', '#9cff9c', 2); }
  else { GS.stats.deny++; toast(`${a.name} leaves sad. They seemed fine...`, '#ffd0a0', 2); }
  RT.dayDeny++; ellaSay(tx(pick(DENY_LINES))); nextAdopter();
}
function nextAdopter() { RT.ai++; RT.asked = []; if (RT.ai >= RT.adopters.length || !adoptables().length) { setTimeout(() => { if (RT.phase === 'open') endOpen(); }, 900); return; } RT.ci = bestMatchIdx(curAdopter()); save(); }
function removeResident(r) { const i = GS.residents.indexOf(r); if (i >= 0) GS.residents.splice(i, 1); r.st = -1; r.poops = []; if (RT.sel === r.id) RT.sel = null; placeQueue(); }
function earn(v, from) { v = Math.round(v); GS.money += v; GS.lifetime += v; RT.dayEarn += v; if (from) spawn('coin', from, Math.min(24, 6 + Math.round(Math.log10(Math.max(10, v)) * 3))); }
function spend(v) { GS.money = Math.max(0, GS.money - Math.round(v)); }
function endOpen() {
  if (RT.phase !== 'open') return; RT.phase = 'report'; GS.phase = 'report';
  const rs = GS.residents, n = rs.length, bill = Math.round(n * [0, 4, 40, 300, 1500][GS.act]);
  const ac = has('c_ac') ? 2000 : 0, avg = n ? rs.reduce((a, r) => a + needAvg(r), 0) / n : 1, poops = rs.reduce((a, r) => a + r.poops.length, 0);
  let lupe = 0; spend(bill); if (ac) earn(ac, null); if (GS.money < 20 * GS.act) { lupe = 50 * Math.pow(10, GS.act - 1); earn(lupe, null); }
  const stars = 1 + (avg > .6 ? 1 : 0) + (RT.dayAdopt >= 2 ? 1 : 0); if (poops > 6) GS.rep = clamp(GS.rep - 2, 0, 100);
  GS.stats.days++;
  RT.report = { earn: RT.dayEarn, adopt: RT.dayAdopt, bill, ac, lupe, avg, stars, poops, t: 0, romance: GS.act >= 3 && GS.ch >= 11, romDone: 0 };
  musicPlay(trackFor('report')); MUS.lvl = 2; setTimeout(() => sfx('star', stars), 600); save();
}
function romancePairs() {
  const pure = [...new Set(GS.residents.filter(r => SP[r.sp] && r.sp !== 'sarge').map(r => r.sp))];
  while (pure.length < 2) { const x = pick(BREEDABLE); if (!pure.includes(x)) pure.push(x); }
  const pairs = []; const tries = has('s_splice') ? 3 : 1;
  for (let c = 0; c < (has('p_disco') ? 2 : 1); c++) { let best = null, bs = -1; for (let t = 0; t < tries; t++) { const a = pick(pure); let b = pick(pure); let guard = 0; while (b === a && guard++ < 10) b = pick(pure); if (a === b) b = pick(BREEDABLE.filter(x => x !== a)); const o = orient(a, b); const sc = o.fs.s + (LEG_BY_PAIR[pairKey(a, b)] ? 20 : 0); if (sc > bs) { bs = sc; best = [a, b]; } } pairs.push(best); }
  return pairs;
}
function doRomance(pairs) { GS.crates = (GS.crates || []).concat(pairs); RT.report.romDone = 1; RT.romance = { t: 0, pairs }; musicPlay(4); MUS.lvl = 2; setTimeout(() => sfx('fwoomp'), 1600); save(); }
function nextDay() {
  RT.romance = null; RT.report = null; RT.lovePick = [];
  GS.day++; for (const r of GS.residents) { r.hunger = Math.max(r.hunger, .45); r.happy = Math.max(r.happy, .45); }
  if (!GS.sanctuary && goalsDone()) { save(); chapterComplete(); return; }
  save(); startDay();
}
function buy(id) {
  const u = UPG_BY[id]; if (!u || has(id) || GS.money < u.cost || u.act > GS.act || (u.req && !has(u.req))) { sfx('boop'); return false; }
  GS.money -= u.cost; GS.upgrades[id] = GS.day; sfx('buy'); spawn('sparkle', [L.W / 2, L.H / 2], 20);
  if (id === 'g_paint') GS.rep = clamp(GS.rep + 3, 0, 100);
  if (u.stalls) { const m = rehome(); if (m) toast(`${m} resident${m > 1 ? 's' : ''} moved into the new ${HABS[u.stalls[0]]}!`, '#9cff9c', 2.5); }
  toast(u.name + ' built!', '#ffd24a', 1.8); save();
  for (const gl of CH[GS.ch].goals) if (gl[0] === 'buy' && gl[1] === id) toast('GOAL COMPLETE: ' + u.name, '#9cff9c', 2.5);
  return true;
}
const canBuy = u => !has(u.id) && u.act <= GS.act && (!u.req || has(u.req)) && GS.money >= u.cost;
/* ---------- ads ---------- */
function adCaptions(r) {
  const n = r.name, t = tagsOf(r)[0] || 'Good', s = spName(r);
  return [V(`${n} is ${t.toLowerCase()} and single. Swipe right, cowards.`, `${n} is ${t.toLowerCase()} and looking for love!`), `Meet ${n}! ${t}. Adorable. Slightly unhinged.`, V(`${n}: will love you, will shit on your rug. Worth it.`, `${n}: will love you, will chew your shoes. Worth it.`)];
}
function postAd(r, ch, ci) {
  const c = CHANNELS.find(x => x.id === ch); if (!c || (c.req && !has(c.req))) return false;
  const used = RT.adsToday[ch] || 0; if (used >= c.per) { toast('That channel is tapped out today', '#ffd0a0', 1.8); sfx('boop'); return false; }
  const cost = c.cost * (GS.act >= 3 ? 10 : 1); if (GS.money < cost) { sfx('boop'); toast('Not enough cash', '#ffd0a0', 1.5); return false; }
  spend(cost); RT.adsToday[ch] = used + 1; RT.buzz += c.buzz + c.adopters * .5; RT.featured = r.id; GS.stats.ads++; r.happy = clamp(r.happy + .1, 0, 1);
  sfx('shutter'); setTimeout(() => sfx('ding'), 250); RT.adPost = { r: r.id, cap: adCaptions(r)[ci], t: 0, likes: Math.round((20 + gi(80)) * c.buzz * Math.pow(6, GS.act - 1)) };
  for (const gl of CH[GS.ch].goals) if (gl[0] === 'ads') { const p = goalProg(gl); if (p.cur === p.need) toast('GOAL COMPLETE: Ads posted', '#9cff9c', 2); }
  save(); return true;
}
/* ---------- finale ---------- */
const POWERS = [['WINGS!', 'Flyer', '#7ad0ff'], ['TENTACLES!', 'Many arms', '#d070ff'], ['MUSCLE!', 'Tough', '#ff9a5a'], ['SPLASH!', 'Pool', '#4ac0e0'], ['ZOOMIES!', 'Fast', '#ffe05a'], ['SARGE!', 'Sarge', '#c8a070']];
function startFinale() {
  RT.scene = 'finale'; RT.fin = { step: 0, t: 0, water: .55, seq: shuffle(POWERS.slice(0, 5)).concat([POWERS[5]]), ok: 0, flash: 0, done: 0 }; musicPlay(9); MUS.lvl = 3; sfx('thunder');
}
function finalePress(i) {
  const F = RT.fin; if (!F || F.done) return; const want = F.seq[F.step];
  if (POWERS[i][0] === want[0]) { F.step++; F.t = 0; F.water = Math.max(.08, F.water - .085); F.flash = 1; sfx('star', F.step); voice(i === 5 ? 'woof' : pick(['roar', 'trumpet', 'screech', 'howl']), 3); spawn('sparkle', [L.W / 2, L.H * .5], 24); shake(5);
    if (F.step >= F.seq.length) { F.done = 1; GS.flags.finale = 1; sfx('chaching', 1); spawn('confetti', [L.W / 2, L.H * .3], 80); setTimeout(() => playStory(FINALE_END, 9, 'sunset', () => { endGame(); }), 2200); } }
  else { F.water = Math.min(.8, F.water + .04); sfx('boop'); shake(3); }
}
function endGame() { GS.ended = true; GS.sanctuary = true; GS.flags.finale = 1; save(); RT.scene = 'credits'; RT.credT = 0; musicPlay(0); MUS.lvl = 3; }
function enterSanctuary() { RT.scene = 'day'; GS.ch = 20; GS.act = 4; startDay(); }
