/* ===================== AUDIO: context, synth helpers, SFX ===================== */
let AC = null, master, musicBus, sfxBus, musicLP, noiseBuf;
function audioInit() {
  if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
  const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return;
  AC = new Ctx(); master = AC.createGain(); const comp = AC.createDynamicsCompressor(); comp.threshold.value = -12; comp.knee.value = 8; comp.ratio.value = 4; comp.attack.value = .004; comp.release.value = .18;
  master.connect(comp); comp.connect(AC.destination);
  musicLP = AC.createBiquadFilter(); musicLP.type = 'lowpass'; musicLP.frequency.value = 20000; musicBus = AC.createGain(); musicBus.connect(musicLP); musicLP.connect(master);
  sfxBus = AC.createGain(); sfxBus.connect(master);
  const n = AC.sampleRate * 2; noiseBuf = AC.createBuffer(1, n, AC.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  applyVol();
}
function applyVol() { if (!AC) return; master.gain.value = SETTINGS.muted ? 0 : 1; musicBus.gain.value = SETTINGS.music * .5; sfxBus.gain.value = SETTINGS.sfx * .9; }
function musicMuffle(on) { if (!AC) return; musicLP.frequency.setTargetAtTime(on ? 700 : 20000, AC.currentTime, .08); }
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
// generic oscillator voice
function tone(t, f, dur, o = {}) {
  if (!AC) return; const bus = o.bus || sfxBus, gv = o.g ?? .25, a = o.a ?? .005, rel = o.rel ?? Math.min(.08, dur * .5);
  const os = AC.createOscillator(); os.type = o.type || 'sine'; os.frequency.setValueAtTime(f, t); if (o.f2) os.frequency.exponentialRampToValueAtTime(Math.max(20, o.f2), t + (o.gl || dur)); if (o.det) os.detune.value = o.det;
  let node = os;
  if (o.vib) { const l = AC.createOscillator(), lg = AC.createGain(); l.frequency.value = o.vib[0]; lg.gain.value = o.vib[1]; l.connect(lg); lg.connect(os.detune); l.start(t + (o.vib[2] || 0)); l.stop(t + dur + rel + .05); }
  if (o.filt) { const fl = AC.createBiquadFilter(); fl.type = o.filt; fl.frequency.setValueAtTime(o.ff || 1000, t); if (o.ff2) fl.frequency.exponentialRampToValueAtTime(o.ff2, t + (o.ffT || dur)); fl.Q.value = o.q || 1; node.connect(fl); node = fl; }
  const gn = AC.createGain(); gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(gv, t + a);
  if (o.sus) { gn.gain.setValueAtTime(gv, t + dur); gn.gain.linearRampToValueAtTime(0, t + dur + rel); } else gn.gain.exponentialRampToValueAtTime(.0008, t + dur + rel);
  node.connect(gn); gn.connect(bus); os.start(t); os.stop(t + dur + rel + .05);
  return os;
}
function noiz(t, dur, o = {}) {
  if (!AC) return; const bus = o.bus || sfxBus, gv = o.g ?? .2, a = o.a ?? .002;
  const s = AC.createBufferSource(); s.buffer = noiseBuf; s.loop = true; const fl = AC.createBiquadFilter(); fl.type = o.type || 'bandpass'; fl.frequency.setValueAtTime(o.f || 2000, t); if (o.f2) fl.frequency.exponentialRampToValueAtTime(o.f2, t + dur); fl.Q.value = o.q || 1;
  const gn = AC.createGain(); gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(gv, t + a); if (o.sus) { gn.gain.setValueAtTime(gv, t + dur * .7); gn.gain.linearRampToValueAtTime(0, t + dur); } else gn.gain.exponentialRampToValueAtTime(.0008, t + dur);
  s.connect(fl); fl.connect(gn); gn.connect(bus); s.start(t, Math.random()); s.stop(t + dur + .05);
}
const SFX = {
  tap() { const t = AC.currentTime; tone(t, 900, .04, { type: 'triangle', f2: 420, g: .22 }); noiz(t, .02, { f: 3000, g: .08 }); },
  swish() { const t = AC.currentTime; noiz(t, .18, { f: 600, f2: 4000, q: 2, g: .12, a: .03 }); },
  boop() { const t = AC.currentTime; tone(t, 330, .1, { type: 'square', f2: 220, g: .07, filt: 'lowpass', ff: 1200 }); tone(t + .11, 220, .14, { type: 'square', f2: 180, g: .07, filt: 'lowpass', ff: 1000 }); },
  buy() { const t = AC.currentTime; tone(t, 1320, .08, { type: 'square', g: .07, filt: 'lowpass', ff: 4000 }); tone(t + .06, 1980, .2, { type: 'triangle', g: .12 }); SFX.coin(4, t + .1); horn(t + .02, [60, 64, 67, 72], .18, .14, sfxBus); },
  coin(i = 0, t0) { const t = t0 || AC.currentTime, f = 1568 * Math.pow(2, (i % 12) / 12); tone(t, f, .09, { type: 'square', g: .045, filt: 'lowpass', ff: 6000 }); tone(t + .045, f * 1.5, .22, { type: 'sine', g: .1 }); },
  chaching(big = 0) {
    const t = AC.currentTime;
    // register bell
    for (const [f, gg] of [[2093, .16], [2637, .12], [3136, .07], [4186, .04]]) tone(t, f, 1.1, { g: gg, rel: .3 });
    tone(t, 1046, .6, { type: 'triangle', g: .1 });
    // drawer slam + slide
    noiz(t + .02, .25, { type: 'lowpass', f: 900, f2: 300, g: .22 }); tone(t + .18, 90, .14, { f2: 50, g: .35 });
    noiz(t + .2, .08, { f: 2500, g: .12 });
    // coin cascade
    const n = 8 + big * 14; for (let i = 0; i < n; i++) SFX.coin(Math.floor(Math.random() * 12), t + .25 + i * (.045 + Math.random() * .03));
    // funk horn stab
    horn(t + .22, [64, 68, 71, 76], .16, .2, sfxBus); horn(t + .48, [66, 70, 73, 78], .32, .24, sfxBus);
    if (big) { noiz(t + .48, 1.4, { type: 'highpass', f: 6000, g: .12 }); tone(t + .48, 55, .5, { f2: 40, g: .4 }); horn(t + .9, [64, 68, 71, 76, 83], .7, .22, sfxBus); vox(t + .3, 'hah', sfxBus); }
  },
  stamp() { const t = AC.currentTime; tone(t, 140, .16, { f2: 45, g: .5 }); noiz(t, .08, { type: 'lowpass', f: 1500, g: .3 }); },
  denied() { const t = AC.currentTime; tone(t, 110, .38, { type: 'square', g: .12, filt: 'lowpass', ff: 1400, sus: 1 }); tone(t, 117, .38, { type: 'square', g: .1, filt: 'lowpass', ff: 1400, sus: 1 }); tone(t + .42, 233, .7, { type: 'sawtooth', f2: 104, gl: .7, g: .14, filt: 'lowpass', ff: 1200, vib: [7, 30, .2] }); },
  bubble(i = 0) { const t = AC.currentTime, f = 380 + i * 60 + Math.random() * 80; tone(t, f, .07, { f2: f * 2.4, g: .14 }); },
  splash() { const t = AC.currentTime; noiz(t, .5, { type: 'lowpass', f: 3000, f2: 400, g: .25 }); for (let i = 0; i < 5; i++) SFX.bubble(i); },
  nom() { const t = AC.currentTime; for (let i = 0; i < 3; i++) noiz(t + i * .09, .05, { f: 1800 + Math.random() * 900, q: 3, g: .2 }); tone(t, 200, .06, { type: 'triangle', g: .1 }); },
  squish(sz = 1) { const t = AC.currentTime; noiz(t, .22 + sz * .05, { type: 'lowpass', f: 700 / Math.sqrt(sz), f2: 200, g: .3 }); tone(t, 110 / Math.sqrt(sz), .2, { type: 'sine', f2: 60, g: .25 }); },
  fart(len = .5) { const t = AC.currentTime; if (SETTINGS.humor === 'clean') { tone(t, 330, .25, { type: 'square', g: .07, filt: 'bandpass', ff: 900, q: 2, vib: [14, 60] }); return; }
    const o = tone(t, 85, len, { type: 'sawtooth', g: .25, filt: 'lowpass', ff: 420, q: 4, sus: 1, rel: .06 }); if (o) { for (let i = 0; i < 12; i++) o.frequency.setValueAtTime(70 + Math.random() * 60, t + i * len / 12); } noiz(t, len, { type: 'lowpass', f: 300, g: .12, sus: 1 }); },
  scrub() { const t = AC.currentTime; noiz(t, .09, { f: 3500, q: 1.5, g: .07 }); },
  ding() { const t = AC.currentTime; tone(t, 1760, .3, { g: .12 }); tone(t + .07, 2349, .35, { g: .1 }); },
  pop() { const t = AC.currentTime; tone(t, 600, .05, { f2: 1400, g: .18 }); },
  thud() { const t = AC.currentTime; tone(t, 90, .2, { f2: 40, g: .4 }); },
  crate() { const t = AC.currentTime; for (let i = 0; i < 4; i++) noiz(t + i * .07, .06, { f: 900 + i * 200, q: 4, g: .25 }); tone(t + .3, 70, .3, { f2: 40, g: .35 }); noiz(t + .3, .3, { type: 'lowpass', f: 2000, g: .2 }); },
  drumroll(d = 1.2) { const t = AC.currentTime; for (let i = 0; i < d * 24; i++) noiz(t + i / 24, .05, { type: 'highpass', f: 1500, g: .05 + i / (d * 24) * .12 }); tone(t + d, 80, .4, { f2: 40, g: .4 }); noiz(t + d, .8, { type: 'highpass', f: 5000, g: .15 }); },
  fwoomp() { const t = AC.currentTime; noiz(t, 1.1, { type: 'lowpass', f: 200, f2: 5000, g: .25, a: .5, sus: 1 }); sax(t + .7, 87, 1.4, .22, sfxBus); for (let i = 0; i < 12; i++) tone(t + .8 + i * .07, 2000 + Math.random() * 3000, .2, { g: .04 }); },
  thunder() { const t = AC.currentTime; noiz(t, 2.2, { type: 'lowpass', f: 300, f2: 60, g: .5, a: .05 }); tone(t, 50, 1.5, { f2: 30, g: .3 }); },
  heli() { const t = AC.currentTime; for (let i = 0; i < 30; i++) noiz(t + i / 12, .05, { type: 'lowpass', f: 400, g: .25 * (1 - Math.abs(i - 15) / 16) }); },
  star(n = 1) { const t = AC.currentTime; tone(t, 60, .3, { f2: 40, g: .4 }); noiz(t, .2, { type: 'lowpass', f: 2000, g: .2 }); for (let i = 0; i < 3; i++) tone(t + .05 + i * .06, 880 * Math.pow(2, (n * 2 + i * 4) / 12), .5, { g: .1, type: 'triangle' }); },
  riser() { const t = AC.currentTime; noiz(t, .9, { type: 'bandpass', f: 400, f2: 6000, q: 3, g: .14, a: .6, sus: 1 }); tone(t, 220, .9, { type: 'sawtooth', f2: 880, g: .05, filt: 'lowpass', ff: 3000 }); },
  streak(n) { const t = AC.currentTime; [0, 4, 7, 12].forEach((s, i) => tone(t + i * .06, mtof(72 + s + n), .15, { type: 'square', g: .05, filt: 'lowpass', ff: 3500 })); },
  shutter() { const t = AC.currentTime; noiz(t, .03, { f: 4000, g: .25 }); noiz(t + .06, .05, { f: 2500, g: .2 }); },
  whistle() { const t = AC.currentTime; tone(t, 900, .6, { f2: 2400, g: .07, vib: [9, 25] }); },
  blip(p = 600) { const t = AC.currentTime; tone(t, p, .035, { type: 'square', g: .03, filt: 'lowpass', ff: 2500 }); },
  error() { SFX.boop(); },
  incident() { const t = AC.currentTime; for (let i = 0; i < 3; i++) tone(t + i * .18, i % 2 ? 660 : 880, .14, { type: 'square', g: .06, filt: 'lowpass', ff: 3000 }); },
  page() { const t = AC.currentTime; noiz(t, .12, { f: 1500, f2: 3500, q: 1, g: .08 }); },
};
// animal voices (pitch scaled by size)
function voice(kind, size = 2) {
  if (!AC) return; const t = AC.currentTime, k = Math.pow(.8, size - 2);
  switch (kind) {
    case 'bark': case 'woof': { const f = (kind === 'woof' ? 260 : 360) * k; tone(t, f, .12, { type: 'sawtooth', f2: f * .6, g: .18, filt: 'bandpass', ff: 900 * k, q: 2 }); noiz(t, .1, { f: 1200 * k, g: .1 }); if (kind === 'bark') { tone(t + .18, f * 1.05, .1, { type: 'sawtooth', f2: f * .6, g: .15, filt: 'bandpass', ff: 900 * k, q: 2 }); } break; }
    case 'yap': case 'yip': for (let i = 0; i < 3; i++) tone(t + i * .11, 900, .06, { type: 'sawtooth', f2: 600, g: .12, filt: 'bandpass', ff: 1800, q: 2 }); break;
    case 'meow': tone(t, 550 * k, .45, { type: 'sawtooth', f2: 420 * k, g: .12, filt: 'bandpass', ff: 1400, q: 3, vib: [5, 40, .1] }); break;
    case 'roar': tone(t, 110 * k, .9, { type: 'sawtooth', f2: 70 * k, g: .3, filt: 'lowpass', ff: 900, ff2: 300, q: 3 }); noiz(t, .9, { type: 'lowpass', f: 800, f2: 200, g: .2 }); break;
    case 'hiss': noiz(t, .6, { type: 'highpass', f: 4000, g: .12, a: .1, sus: 1 }); break;
    case 'honk': tone(t, 330 * k, .22, { type: 'square', g: .1, filt: 'bandpass', ff: 900, q: 3 }); tone(t + .28, 300 * k, .3, { type: 'square', g: .1, filt: 'bandpass', ff: 900, q: 3 }); break;
    case 'trumpet': tone(t, 420 * k, .8, { type: 'sawtooth', f2: 620 * k, gl: .4, g: .18, filt: 'bandpass', ff: 1400, q: 2, vib: [6, 60, .2] }); break;
    case 'screech': tone(t, 1500, .7, { type: 'sawtooth', f2: 1100, g: .1, filt: 'bandpass', ff: 2500, q: 3, vib: [12, 80] }); break;
    case 'grunt': tone(t, 95 * k, .22, { type: 'sawtooth', f2: 70 * k, g: .25, filt: 'lowpass', ff: 600, q: 4 }); break;
    case 'snort': noiz(t, .1, { type: 'lowpass', f: 700, g: .3 }); noiz(t + .15, .1, { type: 'lowpass', f: 600, g: .3 }); break;
    case 'howl': tone(t, 420, 1.1, { type: 'sine', f2: 700, gl: .5, g: .14, vib: [5, 30, .3] }); break;
    case 'squeak': tone(t, 1800, .1, { f2: 2600, g: .12 }); tone(t + .14, 2000, .08, { f2: 2800, g: .1 }); break;
    case 'coo': case 'tenor': tone(t, kind === 'tenor' ? 392 : 600, .5, { type: 'triangle', g: .15, vib: [6, 30] }); break;
    case 'rattle': for (let i = 0; i < 16; i++) noiz(t + i * .04, .03, { type: 'highpass', f: 5000, g: .12 }); break;
    case 'blub': for (let i = 0; i < 4; i++) tone(t + i * .1, 300 + i * 80, .06, { f2: 800, g: .12 }); break;
    case 'sigh': noiz(t, .9, { f: 1200, f2: 500, q: 2, g: .08, a: .3 }); break;
    default: tone(t, 500 * k, .2, { type: 'triangle', g: .12 });
  }
}
function sfx(name, ...a) { if (!AC || SETTINGS.muted) return; try { SFX[name](...a); } catch (e) {} }
