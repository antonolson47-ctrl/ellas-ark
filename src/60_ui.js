/* ===================== UI KIT: hit regions, buttons, icons, layout regions, caches, fx ===================== */
let HITS = [], CLIP = null; // CLIP: active scroll clip rect for hits
function hit(id, x, y, w, h, fn, o = {}) {
  if (CLIP) { const x0 = Math.max(x, CLIP[0]), y0 = Math.max(y, CLIP[1]), x1 = Math.min(x + w, CLIP[0] + CLIP[2]), y1 = Math.min(y + h, CLIP[1] + CLIP[3]); if (x1 - x0 < 6 || y1 - y0 < 6) return; x = x0; y = y0; w = x1 - x0; h = y1 - y0; }
  HITS.push({ id, x, y, w, h, fn, o });
}
function hitAt(vx, vy) { for (let i = HITS.length - 1; i >= 0; i--) { const h = HITS[i]; if (vx >= h.x && vx <= h.x + h.w && vy >= h.y && vy <= h.y + h.h) return h; } return null; }
const blocker = (id = 'block') => hit(id, -50, -50, L.W + 100, L.H + 100, () => {});
const inR = (r, x, y) => x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3];

/* ---------- text fitting ---------- */
function fitFont(s, maxW, size, fam, weight = '') { g.font = `${weight}${size}px ${fam}`; let w = g.measureText(s).width; if (w > maxW) { size = Math.max(7, size * maxW / w); } return `${weight}${size.toFixed(1)}px ${fam}`; }
function ftxt(s, x, y, maxW, size, fam, fill, stroke, lw = 3, align = 'center', weight = '') { if (s && typeof s === 'object') s = tx(s); txt(s, x, y, fitFont(s, maxW, size, fam, weight), fill, stroke, lw, align); }
function lines(s, maxW, font) { if (s && typeof s === 'object') s = tx(s); g.save(); g.font = font; const out = []; for (const para of String(s).split('\n')) { let l = ''; for (const w of para.split(' ')) { const t = l ? l + ' ' + w : w; if (g.measureText(t).width > maxW && l) { out.push(l); l = w; } else l = t; } out.push(l); } g.restore(); return out; }
// wrapped text that shrinks to fit a box; returns used height
function boxTxt(s, x, y, w, h, size, fam, col, align = 'left', weight = '', minSize = 9) {
  let sz = size, ls; for (; sz >= minSize; sz -= .5) { ls = lines(s, w, `${weight}${sz}px ${fam}`); if (ls.length * sz * 1.25 <= h) break; }
  sz = Math.max(sz, minSize); ls = lines(s, w, `${weight}${sz}px ${fam}`); const lh = sz * 1.25;
  g.save(); g.font = `${weight}${sz}px ${fam}`; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'top';
  const ax = align === 'center' ? x + w / 2 : align === 'right' ? x + w : x;
  ls.forEach((l, i) => { if ((i + 1) * lh <= h + lh * .3) g.fillText(l, ax, y + i * lh); }); g.restore(); return ls.length * lh;
}

/* ---------- buttons ---------- */
const PTR = { down: false, id: null, x: 0, y: 0, sx: 0, sy: 0, moved: false, t0: 0, drag: null };
function panel(x, y, w, h, fill = '#fff4e0', o = {}) { paint(() => RR(x, y, w, h, o.r ?? 12), fill, o.dark || dk(fill, .1), { lw: o.lw ?? 1.6, sx: 0, sy: o.sy ?? -4 }); }
function button(id, x, y, w, h, label, fn, o = {}) {
  const dis = !!o.disabled, col = dis ? '#9c8b7a' : (o.col || '#e9503f'), pressed = PTR.down && PTR.id === id, yy = y + (pressed ? 2 : 0);
  if (o.glow) { g.save(); g.shadowColor = o.glow; g.shadowBlur = 14 + Math.sin(RT.t * 6) * 6; g.fillStyle = o.glow; g.beginPath(); RR(x, yy, w, h, o.r ?? Math.min(14, h / 2)); g.fill(); g.restore(); }
  paint(() => RR(x, yy, w, h, o.r ?? Math.min(14, h / 2)), col, dk(col, .2), { lw: 1.5, sx: 0, sy: pressed ? -1 : -3 });
  g.save(); g.globalAlpha = .22; g.fillStyle = '#fff'; g.beginPath(); RR(x + 4, yy + 3, w - 8, Math.min(8, h * .25), 4); g.fill(); g.restore();
  const fc = o.fc || '#fff8ec', sz = o.size || Math.min(18, h * .42);
  if (o.icon) {
    if (o.stack) { icon(o.icon, x + w / 2, yy + h * .4, Math.min(w, h) * .26); ftxt(label, x + w / 2, yy + h * .8, w - 6, Math.min(sz, h * .2), FONT.lil, fc, INK, 2.5); }
    else { const iw = h * .3; icon(o.icon, x + 10 + iw, yy + h / 2, iw * .9); ftxt(label, x + 14 + iw * 2 + (w - 14 - iw * 2) / 2, yy + h / 2 + 1, w - 20 - iw * 2, sz, FONT.lil, fc, INK, 3); }
  } else ftxt(label, x + w / 2, yy + h / 2 + 1, w - 12, sz, o.font || FONT.lil, fc, INK, 3);
  if (o.badge) { paint(() => C(x + w - 4, yy + 4, 9), '#ffd24a', '#e0a020', { lw: 1.2, sx: 0, sy: -1 }); txt(String(o.badge), x + w - 4, yy + 4.5, `11px ${FONT.lil}`, INK, null); }
  hit(id, x, y, w, h, dis ? (o.onDisabled || (() => sfx('boop'))) : () => { sfx(o.sfx || 'tap'); fn(); }, { label });
}
function chip(s, x, y, col = '#3a2416', fc = '#fff4e0', size = 11, align = 'left') { g.font = `${size}px ${FONT.lil}`; const w = g.measureText(s).width + 14; const xx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; pill(xx, y - size * .8, w, size * 1.6, col, 'rgba(43,26,18,.7)'); txt(s, xx + w / 2, y + .5, `${size}px ${FONT.lil}`, fc, null); return w; }
function toggleRow(id, x, y, w, label, opts, cur, fn) {
  txt(label, x, y + 18, `16px ${FONT.lil}`, '#3a2416', null, 0, 'left');
  const bw = Math.min(110, (w * .58) / opts.length), bx = x + w - bw * opts.length;
  opts.forEach(([v, l], i) => button(id + '_' + v, bx + i * bw + 2, y + 2, bw - 4, 34, l, () => fn(v), { col: cur === v ? '#e9503f' : '#b89a78', size: 14 }));
}

/* ---------- vector icons ---------- */
function icon(k, x, y, s, o = {}) {
  g.save(); g.translate(x, y); const q = s / 10; g.scale(q, q); g.lineJoin = 'round'; g.lineCap = 'round';
  const ol = { lw: .9, sx: 0, sy: -1 };
  switch (k) {
    case 'feed': paint(() => { g.moveTo(-9, -1); g.lineTo(9, -1); g.quadraticCurveTo(8, 8, 0, 8); g.quadraticCurveTo(-8, 8, -9, -1); g.closePath(); }, '#e9503f', '#b8302a', ol); for (const [a, b] of [[-5, -3], [-1, -4.5], [3, -3.5], [6, -2], [-3, -6], [1.5, -7]]) paint(() => C(a, b, 2), '#b8742e', '#8a5020', { lw: .6, sx: 0, sy: -.6 }); paint(() => RR(-10, -2, 20, 3, 1.5), '#ff7a6a', null, { lw: .7 }); break;
    case 'wash': for (const [a, b, r] of [[-3, 2, 6], [4, -3, 4.5], [5, 5, 3], [-5, -6, 2.6]]) { paint(() => C(a, b, r), 'rgba(170,225,255,.85)', null, { lw: .8 }); hiBlob(a - r * .35, b - r * .35, r * .32, r * .2, .9); } break;
    case 'vet': paint(() => C(0, 0, 9), '#fff', '#e8e0d8', ol); paint(() => { g.rect(-2.6, -6.5, 5.2, 13); g.rect(-6.5, -2.6, 13, 5.2); }, '#e9403a', '#b8282a', { lw: .5, sx: 0, sy: -.6 }); break;
    case 'play': paint(() => C(0, 0, 8.5), '#d8ec3a', '#a8c020', ol); g.strokeStyle = '#fff'; g.lineWidth = 1.4; g.beginPath(); g.arc(-9, 0, 7, -1, 1); g.stroke(); g.beginPath(); g.arc(9, 0, 7, PI - 1, PI + 1); g.stroke(); break;
    case 'clean': paint(() => { g.moveTo(-3, -9); g.lineTo(1, -9); g.lineTo(1, 0); g.lineTo(-3, 0); g.closePath(); }, '#9a6a3a', null, { lw: .6 }); paint(() => { g.moveTo(-8, 0); g.lineTo(6, 0); g.lineTo(8, 9); g.lineTo(-9, 9); g.closePath(); }, '#c0c8d0', '#8a949e', ol); poopShape(4, -4, .38); break;
    case 'sig': paint(() => star5(0, 0, 9.5, 4.2), '#ffd24a', '#e09a20', ol); break;
    case 'star': paint(() => star5(0, 0, 9.5, 4.2), o.col || '#ffd24a', null, ol); break;
    case 'heart': paint(() => { g.moveTo(0, 8); g.bezierCurveTo(-12, 0, -8, -10, 0, -4); g.bezierCurveTo(8, -10, 12, 0, 0, 8); g.closePath(); }, o.col || '#ff5a7a', dk(o.col || '#ff5a7a', .2), ol); break;
    case 'ark': paint(() => { g.moveTo(-10, 0); g.lineTo(10, 0); g.quadraticCurveTo(8, 7, 0, 7); g.quadraticCurveTo(-8, 7, -10, 0); g.closePath(); }, '#c08040', '#8a5530', ol); paint(() => RR(-5, -6, 10, 6, 1), '#e0b070', '#b08040', { lw: .7, sx: 0, sy: -.6 }); paint(() => { g.moveTo(-6, -6); g.lineTo(0, -10); g.lineTo(6, -6); g.closePath(); }, '#e9503f', null, { lw: .7 }); break;
    case 'ads': paint(() => { g.moveTo(-8, -3); g.lineTo(2, -8); g.lineTo(2, 8); g.lineTo(-8, 3); g.closePath(); }, '#ffd24a', '#e0a020', ol); paint(() => RR(-10, -3.5, 4, 7, 1), '#e9503f', null, { lw: .7 }); for (const a of [-.6, 0, .6]) line([[5 + Math.cos(a) * 2, Math.sin(a) * 2], [5 + Math.cos(a) * 6, Math.sin(a) * 6]], '#fff4e0', 1.2); break;
    case 'adopt': icon('heart', 0, 0, 10); paw(0, 0.5, 4.2, '#fff4e0'); break;
    case 'build': paint(() => { g.save(); g.rotate(-.7); g.rect(-1.5, -2, 3, 12); g.restore(); }, '#9a6a3a', null, { lw: .7 }); paint(() => { g.save(); g.rotate(-.7); RR(-6, -7, 12, 5, 1); g.restore(); }, '#9aa4ae', '#6a747e', ol); break;
    case 'dex': paint(() => RR(-8, -9, 16, 18, 2), '#3f86b8', '#2a5a88', ol); paint(() => RR(-5, -6, 10, 5, 1), '#fff4e0', null, { lw: .5 }); paw(0, 3.5, 3.5, '#fff4e0'); break;
    case 'menu': for (const yy of [-5, 0, 5]) line([[-7, yy], [7, yy]], '#fff4e0', 2.2); break;
    case 'sound': case 'mute': paint(() => { g.moveTo(-8, -3); g.lineTo(-4, -3); g.lineTo(1, -8); g.lineTo(1, 8); g.lineTo(-4, 3); g.lineTo(-8, 3); g.closePath(); }, '#fff4e0', null, { lw: .7 }); if (k === 'sound') { g.strokeStyle = '#fff4e0'; g.lineWidth = 1.6; g.beginPath(); g.arc(2, 0, 4, -.9, .9); g.stroke(); g.beginPath(); g.arc(2, 0, 7.5, -.9, .9); g.stroke(); } else line([[4, -4], [10, 4]], '#ff6a5a', 2), line([[10, -4], [4, 4]], '#ff6a5a', 2); break;
    case 'coin': paint(() => C(0, 0, 9), '#ffd24a', '#e0a020', ol); txt('$', 0, .8, `13px ${FONT.lucky}`, '#9a6a10', null); break;
    case 'clock': paint(() => C(0, 0, 9), '#fff4e0', null, ol); line([[0, 0], [0, -6]], INK, 1.4); line([[0, 0], [4, 2]], INK, 1.4); break;
    case 'sun': paint(() => C(0, 0, 5.5), '#ffd24a', '#ffb020', ol); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; line([[Math.cos(a) * 7.5, Math.sin(a) * 7.5], [Math.cos(a) * 10, Math.sin(a) * 10]], '#ffd24a', 1.5); } break;
    case 'moon': paint(() => { g.arc(0, 0, 8, .6, TAU - .6); g.quadraticCurveTo(0, 0, 8 * Math.cos(.6), 8 * Math.sin(.6)); }, '#fff0b0', null, ol); break;
    case 'poop': poopShape(0, 3, 1); break;
    case 'flag': line([[-5, 9], [-5, -9]], '#5a3a20', 1.6); paint(() => { g.moveTo(-5, -9); g.lineTo(8, -5); g.lineTo(-5, 0); g.closePath(); }, '#e9403a', null, { lw: .7 }); break;
    case 'left': case 'right': { const d = k === 'left' ? -1 : 1; paint(() => { g.moveTo(-4 * d, -7); g.lineTo(5 * d, 0); g.lineTo(-4 * d, 7); g.closePath(); }, '#fff4e0', null, { lw: .8 }); break; }
    case 'chill': paint(() => { E(0, 2, 8, 5); }, '#7ad0ff', '#4aa0d0', ol); break;
  }
  g.restore();
}
function poopShape(x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); paint(() => { E(0, 0, 8, 3.6); E(0, -3.6, 6, 3); E(.5, -6.6, 3.8, 2.4); g.moveTo(1.5, -8.4); g.quadraticCurveTo(3, -11, 1, -12); g.quadraticCurveTo(2.4, -10, .5, -8.6); }, '#8a5428', '#5e3416', { lw: .8, sx: 1, sy: -1 }); hiBlob(-2.4, -4.4, 1.8, .9, .45); g.restore(); }

/* ---------- layout regions (virtual coords) ---------- */
const LY = {};
function onLayout() {
  const W = L.W, H = L.H;
  if (L.portrait) {
    const hud = 52, tabs = 64, tray = H >= 720 ? 204 : H >= 660 ? 186 : 176;
    Object.assign(LY, { hud: [0, 0, W, hud], tabs: [0, H - tabs, W, tabs], tray: [0, H - tabs - tray, W, tray], view: [0, hud, W, H - hud - tabs - tray], main: [0, hud, W, H - hud - tabs], side: null });
  } else {
    const hud = 46, rail = 66, side = clamp(Math.round(W * .3), 230, 270);
    Object.assign(LY, { hud: [0, 0, W, hud], tabs: [W - rail, hud, rail, H - hud], side: [W - rail - side, hud, side, H - hud], view: [0, hud, W - rail - side, H - hud], main: [0, hud, W - rail, H - hud], tray: null });
  }
  CACHE.clear();
}
/* ---------- offscreen caches at device resolution ---------- */
const CACHE = new Map();
function cached(key, x, y, w, h, fn) {
  const k = L.sc * L.dpr, full = key + '|' + [x, y, w, h, k.toFixed(3)].join(',');
  let c = CACHE.get(full);
  if (!c) {
    if (CACHE.size > 40) CACHE.clear();
    c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w * k)); c.height = Math.max(1, Math.ceil(h * k));
    const cx = c.getContext('2d'), old = g; g = cx; g.setTransform(k, 0, 0, k, -x * k, -y * k); g.lineJoin = 'round'; g.lineCap = 'round';
    try { fn(); } catch (e) { console.warn('cache draw', key, e); } finally { g = old; }
    CACHE.set(full, c);
  }
  g.drawImage(c, x, y, w, h);
}
// sprite of a fixed drawing at a reference box (used for Ella, Sarge, busts)
const ART = new Map();
function artSprite(key, bw, bh, ox, oy, res, fn) {
  let a = ART.get(key);
  if (!a) { const c = document.createElement('canvas'); c.width = Math.ceil(bw * res); c.height = Math.ceil(bh * res); const old = g; g = c.getContext('2d'); g.setTransform(res, 0, 0, res, ox * res, oy * res); g.lineJoin = 'round'; g.lineCap = 'round'; try { fn(); } catch (e) { console.warn('art', key, e); } finally { g = old; } a = { c, bw, bh, ox, oy }; ART.set(key, a); }
  return a;
}
// Ella full body: reference feet at (0,0), ~300 tall
function ellaArt(o = {}) { const key = 'ella:' + (o.pose || 'hips') + ':' + (o.outfit || 'jeans') + ':' + (o.flip ? 1 : 0); return artSprite(key, 150, 300, 75, 292, 2.4, () => ella(0, 0, 1, o)); }
function drawElla(x, y, h, o = {}) { const a = ellaArt(o), s = h / 292; const bob = o.bob || 0; g.drawImage(a.c, x - a.ox * s, y - a.oy * s + bob, a.bw * s, a.bh * s); }
function drawEllaBust(x, y, h, o = {}) { // shows head + shoulders; y = bottom of frame
  const a = ellaArt(o), s = h / 128, sy = 0, shh = 128; // source top band of the figure
  g.drawImage(a.c, 0, 0, a.c.width, shh * 2.4, x - a.ox * s, y - h, a.bw * s, h);
}
function sargeSpr() { return getSprite(SP.sarge.kit); }
function bustArt(id, p) { return artSprite('bust:' + id, 170, 160, 85, 152, 2.2, () => bust(0, 0, 1, p)); }
function drawBust(id, p, x, y, h, flip) { const a = bustArt(id, p), s = h / 140; g.save(); g.translate(x, y); if (flip) g.scale(-1, 1); g.drawImage(a.c, -a.ox * s, -a.oy * s, a.bw * s, a.bh * s); g.restore(); }

/* ---------- toasts, Ella speech, particles, shake ---------- */
function toast(msg, col = '#ffe9a8', dur = 2) { RT.toasts.push({ msg: String(msg), col, t: 0, dur }); if (RT.toasts.length > 4) RT.toasts.shift(); }
function ellaSay(s) { RT.say = { s, t: 0 }; }
function shake(n) { if (SETTINGS.shake) RT.shake = Math.max(RT.shake, n); }
const PCOL = { confetti: ['#ff5a7a', '#ffd24a', '#6be3c8', '#7ad0ff', '#c070ff', '#ff9a3a'] };
function spawn(kind, at, n = 8) {
  if (!at) return; const [x, y] = at;
  for (let i = 0; i < n && RT.parts.length < 420; i++) {
    const p = { k: kind, x, y, vx: gR(-60, 60), vy: gR(-90, -20), life: 0, max: gR(.6, 1.2), rot: gR(0, TAU), vr: gR(-6, 6), sz: gR(3, 6), col: '#fff' };
    if (kind === 'coin') { p.x += gR(-14, 14); p.y += gR(-10, 10); p.max = gR(.7, 1.05); p.delay = i * .035; p.sx = p.x; p.sy = p.y; }
    if (kind === 'money') { p.x = gR(0, L.W); p.y = gR(-40, 0); p.vy = gR(60, 140); p.vx = gR(-20, 20); p.max = gR(2, 3.5); p.sz = gR(8, 12); }
    if (kind === 'confetti') { p.vx = gR(-160, 160); p.vy = gR(-260, -60); p.max = gR(1.2, 2.2); p.col = pick(PCOL.confetti); }
    if (kind === 'bubble') { p.vy = gR(-60, -20); p.vx = gR(-30, 30); p.sz = gR(3, 8); p.max = gR(.8, 1.5); }
    if (kind === 'heart') { p.vy = gR(-70, -35); p.vx = gR(-25, 25); p.sz = gR(5, 9); }
    if (kind === 'kibble') { p.vy = gR(-120, -40); p.sz = gR(2, 3.5); p.col = pick(['#b8742e', '#8a5020', '#d09050']); }
    if (kind === 'poof') { p.vx = gR(-40, 40); p.vy = gR(-40, 10); p.sz = gR(5, 9); p.max = gR(.5, .8); p.col = pick(['#c8b090', '#a89070', '#e0d0b8']); }
    if (kind === 'star' || kind === 'sparkle') { const a = gR(0, TAU), v = gR(40, 140); p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v; p.col = kind === 'star' ? '#ffd24a' : '#fff'; }
    if (kind === 'glitter') { const a = gR(0, TAU), v = gR(10, 120); p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v - 20; p.max = gR(1.4, 2.6); p.col = pick(['#ff9ad8', '#ffd24a', '#fff', '#6be3c8', '#ff5a9a']); }
    RT.parts.push(p);
  }
}
function moneyPos() { return LY.money || [60, 24]; }
function updateParts(dt) {
  for (const p of RT.parts) {
    if (p.delay > 0) { p.delay -= dt; continue; }
    p.life += dt; p.rot += p.vr * dt;
    if (p.k === 'coin') { const t = clamp(p.life / p.max, 0, 1), [tx2, ty2] = moneyPos(), e = t * t * (3 - 2 * t); p.x = lerp(p.sx, tx2, e) + Math.sin(t * PI) * -30; p.y = lerp(p.sy, ty2, e) - Math.sin(t * PI) * 60; if (t >= 1 && !p.done) { p.done = 1; p.life = p.max + 1; if (grnd() < .5) sfx('coin'); RT.cashPop = 1; } continue; }
    const grav = p.k === 'confetti' ? 260 : p.k === 'kibble' ? 380 : p.k === 'money' ? 0 : (p.k === 'bubble' || p.k === 'heart' || p.k === 'glitter') ? -10 : 60;
    p.vy += grav * dt; if (p.k === 'confetti' || p.k === 'money') p.vx *= (1 - dt * 1.5);
    p.x += p.vx * dt; p.y += p.vy * dt; if (p.k === 'money') p.x += Math.sin(p.life * 3 + p.rot) * 30 * dt;
  }
  RT.parts = RT.parts.filter(p => p.life <= p.max);
  for (const t of RT.toasts) t.t += dt; RT.toasts = RT.toasts.filter(t => t.t < t.dur);
  if (RT.say) { RT.say.t += dt; if (RT.say.t > 3.2) RT.say = null; }
  RT.shake = Math.max(0, RT.shake - dt * 30); RT.cashPop = Math.max(0, (RT.cashPop || 0) - dt * 4);
}
function drawParts() {
  for (const p of RT.parts) {
    if (p.delay > 0) continue; const a = clamp(1 - p.life / p.max, 0, 1);
    g.save(); g.globalAlpha = p.k === 'coin' ? 1 : Math.min(1, a * 1.6); g.translate(p.x, p.y); g.rotate(p.rot);
    switch (p.k) {
      case 'coin': g.rotate(-p.rot); icon('coin', 0, 0, 6.5); break;
      case 'money': g.fillStyle = '#7ac070'; g.strokeStyle = '#2f6a2a'; g.lineWidth = 1; g.fillRect(-p.sz, -p.sz * .5, p.sz * 2, p.sz); g.strokeRect(-p.sz, -p.sz * .5, p.sz * 2, p.sz); txt('$', 0, .5, `${p.sz * .9}px ${FONT.lucky}`, '#2f6a2a', null); break;
      case 'confetti': g.fillStyle = p.col; g.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2); break;
      case 'bubble': g.strokeStyle = 'rgba(255,255,255,.95)'; g.lineWidth = 1.1; g.fillStyle = 'rgba(190,235,255,.35)'; g.beginPath(); C(0, 0, p.sz); g.fill(); g.stroke(); hiBlob(-p.sz * .3, -p.sz * .3, p.sz * .3, p.sz * .2, .9); break;
      case 'heart': g.rotate(-p.rot * .9); icon('heart', 0, 0, p.sz); break;
      case 'kibble': g.fillStyle = p.col; g.beginPath(); C(0, 0, p.sz); g.fill(); break;
      case 'poof': g.fillStyle = p.col; g.globalAlpha *= .7; g.beginPath(); C(0, 0, p.sz * (1 + p.life * 3)); g.fill(); break;
      case 'star': icon('star', 0, 0, p.sz); break;
      case 'sparkle': case 'glitter': sparkle(0, 0, p.sz * .9, p.col, 1); break;
    }
    g.restore();
  }
}
function drawToasts() {
  const m = LY.main || [0, 0, L.W, L.H]; let y = m[1] + 34;
  for (const t of RT.toasts) {
    const a = clamp(Math.min(t.t * 6, (t.dur - t.t) * 4), 0, 1), w = Math.min(L.W - 30, 360); const ls = lines(t.msg, w - 24, `15px ${FONT.lil}`); const h = ls.length * 18 + 12;
    g.save(); g.globalAlpha = a; const x = m[0] + m[2] / 2 - w / 2, yy = y - (1 - a) * 12;
    g.fillStyle = 'rgba(30,14,8,.86)'; g.beginPath(); RR(x, yy, w, h, 10); g.fill(); g.strokeStyle = t.col; g.lineWidth = 2; g.stroke();
    ls.forEach((l, i) => txt(l, x + w / 2, yy + 15 + i * 18, `15px ${FONT.lil}`, t.col, null));
    g.restore(); y += h + 6;
  }
}
