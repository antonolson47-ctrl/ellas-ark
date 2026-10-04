/* ===================== MUSIC: funk engine + 10 original tracks ===================== */
const QUAL = { m7: [0, 3, 7, 10], '7': [0, 4, 7, 10], maj7: [0, 4, 7, 11], '9': [0, 4, 7, 10, 14], m9: [0, 3, 7, 10, 14], M: [0, 4, 7], m: [0, 3, 7], sus: [0, 5, 7, 10] };
// --- instruments (all on musicBus unless a bus is passed) ---
const MB = () => musicBus;
function kick(t, v) { tone(t, 150, .26, { f2: 42, gl: .11, g: .85 * v, bus: MB() }); noiz(t, .012, { f: 4000, g: .12 * v, bus: MB() }); }
function snare(t, v) { noiz(t, .16, { type: 'highpass', f: 1500, g: .32 * v, bus: MB() }); tone(t, 210, .07, { type: 'triangle', f2: 160, g: .28 * v, bus: MB() }); }
function hat(t, v, open) { noiz(t, open ? .22 : .032, { type: 'highpass', f: 8000, g: .11 * v, bus: MB() }); }
function clap(t, v) { for (let i = 0; i < 3; i++) noiz(t + i * .011, .018, { f: 1400, q: 1.5, g: .2 * v, bus: MB() }); noiz(t + .033, .12, { f: 1300, q: 1.5, g: .22 * v, bus: MB() }); }
function tamb(t, v) { noiz(t, .06, { f: 9000, q: 3, g: .14 * v, bus: MB() }); noiz(t + .025, .05, { f: 10000, q: 3, g: .1 * v, bus: MB() }); }
function conga(t, v, hi) { tone(t, hi ? 330 : 220, .17, { f2: hi ? 290 : 190, g: .3 * v, bus: MB() }); }
function cowbell(t, v) { tone(t, 562, .1, { type: 'square', g: .05 * v, filt: 'bandpass', ff: 800, q: 2, bus: MB() }); tone(t, 845, .1, { type: 'square', g: .05 * v, filt: 'bandpass', ff: 900, q: 2, bus: MB() }); }
function shutterP(t, v) { noiz(t, .025, { f: 4500, g: .16 * v, bus: MB() }); noiz(t + .05, .04, { f: 2600, g: .12 * v, bus: MB() }); }
function bassN(t, m, dur, v, tuba) {
  const f = mtof(m);
  if (tuba) { tone(t, f, dur, { type: 'square', g: .12 * v, filt: 'lowpass', ff: 520, q: 2, sus: 1, a: .02, rel: .05, bus: MB() }); tone(t, f, dur, { g: .3 * v, sus: 1, a: .02, rel: .05, bus: MB() }); return; }
  tone(t, f, dur, { type: 'sawtooth', g: .2 * v, filt: 'lowpass', ff: 900 + 900 * v, ff2: 240, ffT: .14, q: 7, sus: 1, rel: .03, bus: MB() });
  tone(t, f, dur, { g: .28 * v, sus: 1, rel: .03, bus: MB() });
}
let WAHP = 0;
function chop(t, notes, v) { WAHP += .9; const w = 900 + 1300 * (.5 + .5 * Math.sin(WAHP)); for (const m of notes) tone(t, mtof(m), .06, { type: 'sawtooth', g: .03 * v, filt: 'bandpass', ff: w, q: 5, bus: MB() }); }
function scratch(t, v) { noiz(t, .03, { f: 2200, q: 3, g: .07 * v, bus: MB() }); }
function clav(t, m, v) { const f = mtof(m); tone(t, f, .15, { type: 'square', g: .05 * v, filt: 'bandpass', ff: f * 3, q: 2.5, bus: MB() }); tone(t, f * 2, .07, { type: 'sawtooth', g: .015 * v, filt: 'highpass', ff: 1500, bus: MB() }); }
function organ(t, notes, dur, v, bus) { for (const m of notes) { const f = mtof(m); tone(t, f, dur, { g: .04 * v, sus: 1, a: .015, rel: .06, vib: [6.3, 9], bus: bus || MB() }); tone(t, f * 2, dur, { g: .022 * v, sus: 1, a: .015, rel: .06, bus: bus || MB() }); tone(t, f * 3, dur, { g: .01 * v, sus: 1, a: .015, rel: .06, bus: bus || MB() }); } }
function choir(t, notes, dur, v) { for (const m of notes) for (const d of [-11, 11]) tone(t, mtof(m), dur, { type: 'sawtooth', det: d, g: .014 * v, filt: 'lowpass', ff: 1500, a: .35, sus: 1, rel: .3, vib: [4.5, 6], bus: MB() }); }
function horn(t, notes, dur, v, bus) { for (const m of notes) { const f = mtof(m); for (const d of [-8, 8]) tone(t, f * .97, dur, { type: 'sawtooth', f2: f, gl: .04, det: d, g: .035 * v, filt: 'lowpass', ff: 700, ff2: 2800, ffT: .05, a: .02, sus: 1, rel: .07, bus: bus || MB() }); } }
function sax(t, m, dur, v, bus) { const f = mtof(m), b = bus || MB(); tone(t, f * .98, dur, { type: 'sawtooth', f2: f, gl: .06, g: .1 * v, filt: 'bandpass', ff: 1300, q: 1.2, vib: [5.5, 18, .18], sus: 1, a: .04, rel: .12, bus: b }); tone(t, f, dur, { type: 'square', g: .03 * v, filt: 'lowpass', ff: 2200, sus: 1, a: .04, rel: .12, bus: b }); noiz(t, dur * .6, { f: 2500, q: 1, g: .015 * v, a: .03, bus: b }); }
function mtrump(t, m, dur, v) { tone(t, mtof(m), dur, { type: 'sawtooth', g: .08 * v, filt: 'bandpass', ff: 1500, q: 4, vib: [5, 20, .12], sus: 1, a: .03, rel: .08, bus: MB() }); }
function kazoo(t, m, dur, v) { tone(t, mtof(m), dur, { type: 'square', g: .06 * v, filt: 'bandpass', ff: 950, q: 3, vib: [13, 45], sus: 1, a: .02, rel: .05, bus: MB() }); }
function siren(t, m, dur, v) { const f = mtof(m); tone(t, f, dur, { type: 'triangle', f2: f * 1.06, gl: dur, g: .07 * v, vib: [7, 40], sus: 1, a: .05, rel: .1, bus: MB() }); tone(t, f * 2, dur, { g: .03 * v, vib: [7, 40], sus: 1, a: .05, rel: .1, bus: MB() }); }
function vox(t, kind, bus) {
  const b = bus || MB(), F = { hah: [230, 180, 800, 1150], huh: [170, 150, 600, 1000], ow: [300, 480, 700, 1100], yeah: [260, 200, 650, 1700] }[kind] || [230, 180, 800, 1150];
  for (const ff of [F[2], F[3]]) tone(t, F[0], .22, { type: 'sawtooth', f2: F[1], gl: .2, g: .09, filt: 'bandpass', ff, q: 6, a: .01, bus: b });
  noiz(t, .05, { f: 1800, g: .08, bus: b });
}
const LEADF = { sax, mtrump, kazoo, siren, horn: (t, m, d, v) => horn(t, [m], d, v * 1.6) };
// --- the 10 tracks (all original) ---
const TRACKS = [
  { name: "Ark Funk (Ella's Theme)", bpm: 112, sw: .08, key: 40, prog: [[0, 'm9'], [0, 'm9'], [5, '9'], [5, '9'], [0, 'm9'], [0, 'm9'], [10, 'M'], [5, '9']],
    k: 'X..x..x...x..x..', s: '....X..g.g..X..g', h: 'xxxxxxxxxxxxxxxx', o: '..............x.', t: '....x.......x...',
    bass: ['1-..x81.5.7.8-5b', '1-..x81.5.7.8.53'], gtr: '.c.cxc.c.c.cxc.c', org: 'pad', horn: ['X...............', '..........x..X..'],
    riff: { bars: [3, 7], n: [[0, 7, 2], [3, 10, 1], [4, 12, 3], [8, 10, 2], [10, 7, 2], [12, 5, 1], [14, 7, 2]] }, vox: [[0, 0, 'hah'], [4, 14, 'huh']] },
  { name: 'Kibble Strut', bpm: 104, sw: .1, key: 45, prog: [[0, '7'], [0, '7'], [10, 'M'], [5, 'M'], [0, '7'], [0, '7'], [5, '9'], [10, 'M']],
    k: 'X...x..x..X....x', s: '....X...g...X.g.', h: 'x.xxx.xxx.xxx.xx', t: '..x...x...x...x.', perc0: 1,
    bass: ['1..5.8..1.b.5.3.', '1..5.8..1.b.8.5.'], clav: '.8.5.83..8.5-87.', gtr: '...c.......c..x.', horn: ['.......X.......x'],
    riff: { bars: [1, 5], n: [[8, 12, 1], [9, 10, 1], [10, 7, 2], [12, 4, 1], [14, 7, 2]] } },
  { name: 'Nine-One-Five Shuffle', bpm: 108, sw: .28, key: 38, prog: [[0, 'm7'], [5, '7'], [0, 'm7'], [5, '7'], [3, 'M'], [5, '7'], [0, 'm7'], [7, 'm7']],
    k: 'X..x...xX.....x.', s: '....X..g..g.X...', h: 'xxxxxxxxxxxxxxxx', c: '....x.......x...', perc0: 1,
    bass: ['1..18..5.7.8.5.3', '1-.18..5b.1..5.7'], gtr: 'c.cxc.cxc.cxc.cx', org: 'pad', horn: ['............X...'],
    lead: { inst: 'sax', bars: [3, 7], n: [[8, 7, 2], [10, 10, 2], [12, 12, 1], [13, 10, 1], [14, 7, 3]] } },
  { name: 'Two by Two Breakdown', bpm: 116, sw: .05, key: 43, prog: [[0, '7'], [5, '7'], [0, '7'], [7, '7'], [0, '7'], [5, '7'], [10, 'M'], [7, '7']],
    k: 'X.x...x..xX.....', s: '....X..g.g..X..g', h: 'x.x.x.x.x.x.x.x.', g: 'x.xx..x.x.xx..x.', b: 'x...x...x...x.x.',
    bass: ['1.18.x5.1.b1.5.8', '1.18.x5.8.71.5.3'], gtr: '.c.c.c.c.c.c.c.c', org: 'x..x..x.........', horn: ['X.....x.X.....x.'],
    riff: { bars: [1, 3, 5, 7], n: [[0, 12, 1], [1, 12, 1], [2, 10, 1], [3, 7, 1], [4, 10, 2], [6, 12, 2], [10, 15, 1], [11, 14, 2]] } },
  { name: 'Puddle Love', bpm: 76, sw: .15, key: 39, prog: [[0, 'maj7'], [0, 'maj7'], [9, 'm7'], [9, 'm7'], [2, 'm7'], [7, '7'], [0, 'maj7'], [7, 'sus']],
    k: 'X.........x.....', s: '........X.......', h: 'x...x...x...x...', hv: .6,
    bass: ['1-----..5---8-7-', '1-----..5---3-5-'], gtr: '..c...c...c...c.', org: 'pad', leadAlways: 1,
    lead: { inst: 'sax', loop: 1, n: [[0, 7, 6], [6, 9, 2], [8, 11, 8], [32, 12, 4], [36, 14, 4], [40, 12, 8], [64, 7, 4], [68, 5, 4], [72, 3, 8], [96, 10, 6], [102, 7, 2], [104, 19, 14]] } },
  { name: 'Mashup Mayhem', bpm: 120, sw: .04, key: 47, prog: [[0, 'm7'], [3, 'M'], [5, '7'], [0, 'm7'], [0, 'm7'], [3, 'M'], [5, '7'], [7, '7']],
    k: 'X..x.xx...X..x..', s: '....X.g.g...X.gX', h: 'xxxxxxxxxxxxxxxx', t: '....x.......x...',
    bass: ['1.8b1.x51.8b5.7.'], clav: '8.85.8.3.8.85..7', org: 'x.......x..x....', horn: ['X...........x...'],
    riff: { bars: [3, 7], n: [[10, 12, 1], [11, 11, 1], [12, 10, 1], [13, 9, 1], [14, 8, 2]] }, vox: [[0, 0, 'ow']] },
  { name: 'Red Carpet Rumble', bpm: 118, sw: .06, key: 41, prog: [[0, 'M'], [10, 'M'], [5, 'M'], [0, '7'], [0, 'M'], [10, 'M'], [3, 'M'], [5, '9']],
    k: 'X...x...X...x...', s: '....X.......X...', h: '..x...x...x...x.', o: '..x...x...x...x.', sh: 'x.....x...x..x..',
    bass: ['1.8.1.8.1.8.1.8b'], gtr: 'c.c.c.c.c.c.c.c.', org: 'pad', choir: 1, horn: ['X.......x.x.....'],
    riff: { bars: [0, 4], n: [[0, 0, 2], [2, 7, 2], [4, 12, 4], [8, 10, 2], [10, 12, 2], [12, 14, 4]] }, vox: [[0, 0, 'yeah']] },
  { name: 'Haboob Hustle', bpm: 128, sw: 0, key: 36, prog: [[0, 'm'], [0, 'm'], [8, 'M'], [10, 'M'], [0, 'm'], [0, 'm'], [8, 'M'], [7, '7']],
    k: 'X..xX..xX..xX.x.', s: '....X...g...X..g', h: 'xxxxxxxxxxxxxxxx', b: 'x.x.x.x.x.x.x.x.',
    bass: ['18x81818b8x87858'], gtr: 'x.c.x.c.x.c.x.cc', horn: ['X..X..X.........'],
    lead: { inst: 'siren', bars: [1, 5], n: [[0, 12, 8], [8, 11, 8]] } },
  { name: 'Bottomline Blues', bpm: 96, sw: .22, key: 43, tuba: 1, prog: [[0, 'm7'], [5, 'm7'], [0, 'm7'], [0, 'm7'], [5, 'm7'], [5, 'm7'], [0, 'm7'], [7, '7']],
    k: 'X.....x.X.....x.', s: '....X......gX...', h: 'x.x.x.x.x.x.x.x.',
    bass: ['1...5...1...b.5.'], gtr: '....c.......c...', org: 'pad',
    lead: { inst: 'mtrump', bars: [0, 4], n: [[0, 7, 3], [4, 10, 2], [6, 7, 2], [8, 5, 4], [12, 3, 2], [14, 0, 2]] },
    lead2: { inst: 'kazoo', bars: [7], n: [[12, 12, 1], [13, 11, 1], [14, 10, 2]] } },
  { name: 'Star on the Mountain (Finale Funk)', bpm: 122, sw: .06, key: 40, shift: 2, prog: [[0, 'm9'], [5, '9'], [0, 'm9'], [5, '9'], [3, 'maj7'], [5, '9'], [10, 'M'], [7, '7']],
    k: 'X..x..x.X.x..x..', s: '....X..g.g..X..g', h: 'xxxxxxxxxxxxxxxx', o: '..............x.', t: '....x.......x...', g: 'x..x..x.x..x.x..',
    bass: ['1-.8.x1.5.7.8.1b'], gtr: '.c.cxc.c.c.cxc.c', clav: '..8...5...8.7...', org: 'pad', choir: 1, horn: ['X...........x...'],
    riff: { bars: [1, 3, 5, 7], n: [[0, 7, 2], [3, 10, 1], [4, 12, 3], [8, 14, 2], [10, 12, 2], [12, 10, 1], [14, 12, 2]] }, vox: [[0, 0, 'hah'], [4, 12, 'yeah']] },
];
const MUS = { cur: -1, next: -1, step: 0, bar: 0, loop: 0, t: 0, timer: null, lvl: 2, playing: false, want: -1 };
const pat = (p, bar) => p == null ? null : Array.isArray(p) ? p[bar % p.length] : p;
function voicing(tr, deg, q, sh) { let base = tr.key + 24 + deg + sh; while (base > 58) base -= 12; while (base < 48) base += 12; return QUAL[q].map(i => base + i); }
function semi(ch, q) { const Q = QUAL[q]; return { '1': 0, '2': 2, '3': Q.includes(3) ? 3 : 4, '4': 5, '5': 7, '6': 9, '7': Q.includes(11) ? 11 : 10, '8': 12, '9': 14, b: -2, v: -5, x: 0 }[ch]; }
function musicPlay(i) {
  MUS.want = i; if (!AC || SETTINGS.music <= 0) return;
  if (MUS.playing && MUS.cur === i) { MUS.next = -1; return; }
  if (!MUS.playing) { MUS.cur = i; MUS.step = 0; MUS.bar = 0; MUS.loop = 0; MUS.t = AC.currentTime + .06; MUS.playing = true; if (!MUS.timer) MUS.timer = setInterval(musicTick, 25); }
  else MUS.next = i;
}
function musicStop() { MUS.playing = false; MUS.cur = -1; }
function musicTick() {
  if (!AC || !MUS.playing) return; if (AC.state !== 'running') return;
  if (MUS.t < AC.currentTime - .1) MUS.t = AC.currentTime + .05;
  while (MUS.t < AC.currentTime + .14) {
    const tr = TRACKS[MUS.cur], sd = 60 / tr.bpm / 4;
    if (MUS.step === 0 && MUS.next >= 0) { MUS.cur = MUS.next; MUS.next = -1; MUS.bar = 0; MUS.loop = 0; continue; }
    try { schedStep(tr, MUS.step, MUS.bar, MUS.t + (MUS.step % 2 ? tr.sw * sd : 0), sd); } catch (e) {}
    MUS.t += sd; MUS.step++; if (MUS.step >= 16) { MUS.step = 0; MUS.bar++; if (MUS.bar >= 8) { MUS.bar = 0; MUS.loop++; } }
  }
}
function schedStep(tr, st, bar, t, sd) {
  const lv = MUS.lvl, sh = tr.shift && MUS.loop % 2 ? tr.shift : 0, [deg, q] = tr.prog[bar], ch = (s) => { const p = pat(s, bar); return p ? p[st] : '.'; };
  // drums
  let c = ch(tr.k); if (c !== '.') kick(t, c === 'X' ? 1 : .8);
  c = ch(tr.s); if (c !== '.') snare(t, c === 'X' ? 1 : c === 'g' ? .22 : .7);
  if (bar === 7 && st >= 12 && lv >= 1 && tr.bpm > 90) snare(t, .35 + .15 * (st - 12));
  c = ch(tr.h); if (c !== '.') hat(t, (st % 4 === 2 ? 1 : st % 2 ? .45 : .7) * (tr.hv || 1));
  if (lv >= 1 || tr.perc0) {
    c = ch(tr.o); if (c !== '.') hat(t, .6, 1); c = ch(tr.t); if (c !== '.') tamb(t, .8); c = ch(tr.c); if (c !== '.') clap(t, .8);
  }
  if (lv >= 1) { c = ch(tr.g); if (c !== '.') conga(t, .8, st % 3 === 0); c = ch(tr.b); if (c !== '.') cowbell(t, .8); c = ch(tr.sh); if (c !== '.' && Math.random() < .7) shutterP(t, .8); }
  // bass
  let broot = tr.key + ((deg + sh) % 12); if (deg > 7) broot -= 12;
  const bs = pat(tr.bass, bar); c = bs[st];
  if (c !== '.' && c !== '-') { let len = 1; while (bs[st + len] === '-') len++; const gh = c === 'x'; bassN(t, broot + semi(c, q), gh ? sd * .4 : sd * len * .92, gh ? .35 : (st === 0 || st === 8 ? 1.1 : .85), tr.tuba); }
  const vo = voicing(tr, deg, q, sh);
  // guitar
  c = ch(tr.gtr); if (c === 'c') chop(t, vo.slice(-3).map(m => m + 12), 1); else if (c === 'x') scratch(t, 1);
  if (lv >= 1) {
    c = ch(tr.clav); if (c !== '.' && c !== '-') clav(t, broot + 24 + semi(c, q), 1);
    if (tr.org === 'pad') { if (st === 0) organ(t, vo, sd * 16, .9); }
    else { c = ch(tr.org); if (c !== '.') organ(t, vo, sd * 2, 1.1); }
    if (tr.choir && st === 0 && lv >= 2) choir(t, vo.map(m => m + 12), sd * 16, 1);
  }
  if (lv >= 2) { c = ch(tr.horn); if (c !== '.') horn(t, vo.slice(-3).map(m => m + 12), sd * (c === 'X' ? 2 : 1.4), c === 'X' ? 1.2 : .9); }
  const base = tr.key + 24 + sh;
  if (lv >= 2 && tr.riff && tr.riff.bars.includes(bar)) for (const [s0, n, l] of tr.riff.n) if (s0 === st) horn(t, [base + n], sd * l * .9, 1.4);
  for (const ld of [tr.lead, tr.lead2]) {
    if (!ld || (lv < 2 && !tr.leadAlways)) continue; const f = LEADF[ld.inst];
    if (ld.loop) { const ab = bar * 16 + st; for (const [s0, n, l] of ld.n) if (s0 === ab) f(t, base + n, sd * l * .95, 1.3); }
    else if (ld.bars.includes(bar)) for (const [s0, n, l] of ld.n) if (s0 === st) f(t, base + n, sd * l * .92, 1.3);
  }
  if (tr.vox && (lv >= 3 || MUS.loop === 0)) for (const [b, s0, k] of tr.vox) if (b === bar && s0 === st) vox(t, k);
}
document.addEventListener('visibilitychange', () => { if (!AC) return; if (document.hidden) AC.suspend(); else AC.resume(); });
