/* ===================== CORE: utils, rng, state, save, settings, layout ===================== */
const TAU = Math.PI * 2, PI = Math.PI;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v, lerp = (a, b, t) => a + (b - a) * t;
const now = () => performance.now() / 1000;
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const R = (a, b) => a + rnd() * (b - a);
// game RNG (separate from art seed)
let gseed = (Date.now() % 2147483646) + 1; const grnd = () => (gseed = (gseed * 48271) % 2147483647) / 2147483647;
const gi = n => Math.floor(grnd() * n), pick = a => a[gi(a.length)], gR = (a, b) => a + grnd() * (b - a);
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = gi(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) % 2147483646 + 1; }
const fmt$ = n => { n = Math.round(n); if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M'; return '$' + n.toLocaleString('en-US'); };
const fmtFull$ = n => '$' + Math.round(n).toLocaleString('en-US');
const FONT = { lucky: "'EA Lucky', 'Arial Black', sans-serif", lil: "'EA Lilita', 'Arial Black', sans-serif", fre: "'EA Fredoka', 'Trebuchet MS', sans-serif" };

/* ---------- settings + save ---------- */
const SAVE_KEY = 'ellas_ark_v1', SET_KEY = 'ellas_ark_settings_v1';
const SETTINGS = Object.assign({ humor: 'raunchy', music: 0.7, sfx: 0.85, chill: false, shake: true, muted: false }, (() => { try { return JSON.parse(localStorage.getItem(SET_KEY)) || {}; } catch (e) { return {}; } })());
function saveSettings() { try { localStorage.setItem(SET_KEY, JSON.stringify(SETTINGS)); } catch (e) {} }
// T(raunchy, cleaner): pick text by humor setting
const T = (r, c) => (SETTINGS.humor === 'clean' && c !== undefined) ? c : r;
// V(raunchy, cleaner): stored both ways, resolved at display time with tx()
const V = (r, c) => ({ r, c: c === undefined ? r : c });
const tx = v => v == null ? '' : typeof v === 'string' ? v : (SETTINGS.humor === 'clean' ? v.c : v.r);

/* ---------- canvas + layout ---------- */
const cv = document.getElementById('cv');
let g = cv.getContext('2d');
const L = { W: 390, H: 844, sc: 1, ox: 0, oy: 0, portrait: true, dpr: 1, safe: { t: 0, r: 0, b: 0, l: 0 }, cssW: 390, cssH: 844 };
function readSafe() { const s = getComputedStyle(document.getElementById('safe')); L.safe = { t: parseFloat(s.paddingTop) || 0, r: parseFloat(s.paddingRight) || 0, b: parseFloat(s.paddingBottom) || 0, l: parseFloat(s.paddingLeft) || 0 }; }
function layout() {
  readSafe();
  const cw = window.innerWidth, ch = window.innerHeight; L.cssW = cw; L.cssH = ch;
  L.dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  cv.width = Math.round(cw * L.dpr); cv.height = Math.round(ch * L.dpr);
  const uw = cw - L.safe.l - L.safe.r, uh = ch - L.safe.t - L.safe.b; // usable
  L.portrait = uh >= uw;
  if (L.portrait) { L.W = 390; L.H = clamp(390 * uh / uw, 620, 900); } else { L.H = 390; L.W = clamp(390 * uw / uh, 620, 960); }
  L.sc = Math.min(uw / L.W, uh / L.H);
  L.ox = L.safe.l + (uw - L.W * L.sc) / 2; L.oy = L.safe.t + (uh - L.H * L.sc) / 2;
  if (typeof onLayout === 'function') onLayout();
}
const toV = (cx, cy) => [(cx - L.ox) / L.sc, (cy - L.oy) / L.sc];

/* ---------- persistent game state ---------- */
function freshState() {
  return { v: 1, started: false, act: 1, ch: 1, day: 1, money: 0, lifetime: 0, rep: 10, residents: [], queue: [], upgrades: {}, dex: {}, mashCount: 0,
    stats: { mash: 0, adopt: 0, adoptExotic: 0, adoptMash: 0, adoptCeleb: 0, deny: 0, denyRed: 0, fakes: 0, ads: 0, poops: 0, vets: 0, sig: 0, care: 0, legend: 0, inspection: 0, days: 0 },
    chStart: null, seenIntro: 0, phase: 'morning', returns: [], crates: [], rep0: 0, flags: {}, tails: [], nextId: 1, ended: false, sanctuary: false, dayLog: null };
}
let GS = freshState();
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(GS, (k, v) => k[0] === '_' ? undefined : v)); } catch (e) {} }
function load() { try { const d = JSON.parse(localStorage.getItem(SAVE_KEY)); if (d && d.v === 1) { GS = Object.assign(freshState(), d); GS.stats = Object.assign(freshState().stats, d.stats || {}); return true; } } catch (e) {} return false; }
