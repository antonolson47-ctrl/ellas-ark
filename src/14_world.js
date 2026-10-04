/* ===================== WORLD ART ===================== */
// World: sky, Franklin Mountains + Star, desert, flora, the Ark
function sky(W, H, stops, horizon) {
  const gr = g.createLinearGradient(0, 0, 0, horizon); for (const [t, c] of stops) gr.addColorStop(t, c); g.fillStyle = gr; g.fillRect(0, 0, W, horizon + 4);
}
function sunGlow(x, y, r) {
  let gr = g.createRadialGradient(x, y, r * .2, x, y, r * 5); gr.addColorStop(0, 'rgba(255,236,170,.95)'); gr.addColorStop(.25, 'rgba(255,170,90,.45)'); gr.addColorStop(1, 'rgba(255,120,90,0)');
  g.fillStyle = gr; g.beginPath(); C(x, y, r * 5); g.fill();
  gr = g.createRadialGradient(x, y - r * .3, 1, x, y, r); gr.addColorStop(0, '#fffbe6'); gr.addColorStop(.7, '#ffe08a'); gr.addColorStop(1, '#ffb050'); g.fillStyle = gr; g.beginPath(); C(x, y, r); g.fill();
}
function rays(x, y, n, len, a = .12) { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const an = Math.PI + (i + .5) / n * Math.PI; g.fillStyle = `rgba(255,200,140,${a * R(.4, 1)})`; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an - .03) * len, y + Math.sin(an - .03) * len); g.lineTo(x + Math.cos(an + .03) * len, y + Math.sin(an + .03) * len); g.fill(); } g.restore(); }
function cloud(x, y, w, h, top, bot, a = 1) {
  g.save(); g.globalAlpha = a; const gr = g.createLinearGradient(0, y - h, 0, y + h * .4); gr.addColorStop(0, top); gr.addColorStop(1, bot); g.fillStyle = gr;
  g.beginPath(); const n = Math.max(4, Math.round(w / (h * .9)));
  for (let i = 0; i < n; i++) { const t = i / (n - 1), cx = x - w / 2 + t * w, rr = h * (.45 + Math.sin(t * Math.PI) * .55) * R(.8, 1.1); C(cx, y - rr * .4, rr); }
  RR(x - w / 2 - h * .2, y - h * .3, w + h * .4, h * .5, h * .25); g.fill(); g.restore();
}
function streak(x, y, w, h, col, a = .7) { g.save(); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); E(x, y, w / 2, h / 2); g.fill(); g.restore(); }
// ridge from control peaks + jitter
function ridge(W, base, peaks, rough, col1, col2, seedv) {
  seed = seedv; const pts = [];
  for (let i = 0; i < peaks.length - 1; i++) { const [x1, y1] = peaks[i], [x2, y2] = peaks[i + 1]; const steps = Math.max(2, Math.round((x2 - x1) / 6)); for (let s = 0; s < steps; s++) { const t = s / steps; pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + (s ? R(-rough, rough) * Math.sin(t * Math.PI) + R(-rough * .3, rough * .3) : 0)]); } }
  pts.push(peaks[peaks.length - 1]);
  g.beginPath(); g.moveTo(-5, base); for (const p of pts) g.lineTo(p[0], p[1]); g.lineTo(W + 5, base); g.closePath();
  const top = Math.min(...peaks.map(p => p[1])); const gr = g.createLinearGradient(0, top, 0, base); gr.addColorStop(0, col1); gr.addColorStop(1, col2); g.fillStyle = gr; g.fill();
  return pts;
}
// gullies / sunlit faces on a ridge
function ridgeDetail(pts, base, light, dark) {
  g.save();
  for (let i = 3; i < pts.length - 3; i += 2) { const [x, y] = pts[i]; if (pts[i - 1][1] > y && pts[i + 1][1] >= y - 1) { // local high
      g.fillStyle = dark; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 6, y + (base - y) * .5, x + R(10, 22), base); g.lineTo(x + R(28, 40), base); g.quadraticCurveTo(x + 14, y + (base - y) * .4, x + 2, y + 2); g.fill();
      g.fillStyle = light; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x - 5, y + (base - y) * .45, x - R(12, 24), base); g.lineTo(x - 4, base); g.quadraticCurveTo(x - 1, y + (base - y) * .5, x, y + 1); g.fill(); } }
  g.restore();
}
function starOnMountain(x, y, s) { // the Star: a lit star outline of bulbs
  g.save(); g.globalCompositeOperation = 'lighter';
  const gl = g.createRadialGradient(x, y, 1, x, y, s * 3.2); gl.addColorStop(0, 'rgba(255,250,220,.55)'); gl.addColorStop(1, 'rgba(255,250,220,0)'); g.fillStyle = gl; g.beginPath(); C(x, y, s * 3.2); g.fill();
  const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? s * .42 : s; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * .8]); }
  for (let i = 0; i < 10; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % 10]; for (let t = 0; t < 1; t += .25) { g.fillStyle = '#fffbe8'; g.beginPath(); C(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, s * .085); g.fill(); } }
  g.restore();
}
function cityLights(x1, x2, y, n, a = .9) { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const x = R(x1, x2), yy = y + R(-3, 4); g.fillStyle = rnd() < .7 ? `rgba(255,214,140,${a})` : `rgba(255,255,230,${a})`; g.beginPath(); C(x, yy, R(.5, 1.2)); g.fill(); } g.restore(); }
function ground(W, y0, H, cols) { const gr = g.createLinearGradient(0, y0, 0, H); cols.forEach((c, i) => gr.addColorStop(i / (cols.length - 1), c)); g.fillStyle = gr; g.fillRect(0, y0, W, H - y0); }
function pebbles(x1, x2, y1, y2, n, col) { g.save(); for (let i = 0; i < n; i++) { const y = R(y1, y2), s = (y - y1) / (y2 - y1 + 1) * 2 + .6; g.fillStyle = col; g.globalAlpha = R(.25, .6); g.beginPath(); E(R(x1, x2), y, s * R(.8, 1.6), s * .6); g.fill(); } g.restore(); }
function sandRipples(x1, x2, y1, y2, n, col) { g.save(); g.strokeStyle = col; g.lineWidth = 1; for (let i = 0; i < n; i++) { const y = R(y1, y2), x = R(x1, x2), w = R(20, 60) * (1 + (y - y1) / (y2 - y1)); g.globalAlpha = R(.2, .45); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + w / 2, y - 3, x + w, y); g.stroke(); } g.restore(); }
// ---- flora ----
function pricklyPear(x, y, s, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  const pads = o.pads || [[0, -14, 13, 16, 0], [-14, -34, 10, 13, -.5], [12, -36, 11, 14, .4], [0, -54, 8, 11, .1], [24, -56, 7, 9, .7]];
  for (const [px, py, rx, ry, rot] of pads) {
    paint(() => E(px, py, rx, ry, rot), '#6fa15a', '#3f6e3b', { lw: 1.6, sx: -2.5, sy: -2, hi: () => hiBlob(px - rx * .3, py - ry * .35, rx * .35, ry * .25, .25) });
    g.fillStyle = '#e8e0b8'; for (let i = 0; i < 7; i++) { const a = R(0, TAU), rr = R(.2, .8); g.beginPath(); C(px + Math.cos(a) * rx * rr, py + Math.sin(a) * ry * rr, .9); g.fill(); }
  }
  if (o.fruit !== false) for (const [fx, fy] of [[-8, -48], [-20, -44], [6, -68], [28, -64]]) paint(() => E(fx, fy, 3.2, 4), '#e0457b', '#a82a5a', { lw: 1.2, sx: -1, sy: -1 });
  g.restore();
}
function ocotillo(x, y, s, flame = true) {
  g.save(); g.translate(x, y); g.scale(s, s);
  const stems = [[-22, -95], [-12, -110], [-3, -118], [6, -112], [16, -104], [26, -90], [-30, -78], [34, -74]];
  for (const [tx, ty] of stems) {
    g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(tx * .25, ty * .5, tx, ty); g.stroke();
    g.strokeStyle = '#6e7a43'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(tx * .25, ty * .5, tx, ty); g.stroke();
    g.fillStyle = '#7c9a48'; for (let t = .25; t < .95; t += .09) { const px = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * tx * .25 + t * t * tx, py = 2 * (1 - t) * t * ty * .5 + t * t * ty; g.beginPath(); E(px + 2.5, py, 2.2, 1, .4); E(px - 2.5, py + 1, 2.2, 1, -.4); g.fill(); }
    if (flame) { g.fillStyle = '#ff4b2b'; g.beginPath(); g.moveTo(tx - 2, ty + 2); g.quadraticCurveTo(tx - 3, ty - 6, tx, ty - 10); g.quadraticCurveTo(tx + 3, ty - 6, tx + 2, ty + 2); g.fill(); g.fillStyle = '#ffb03a'; g.beginPath(); E(tx, ty - 3, 1, 3); g.fill(); }
  }
  g.restore();
}
function yucca(x, y, s, stalk = true) {
  g.save(); g.translate(x, y); g.scale(s, s);
  // trunk
  paint(() => RR(-4, -30, 8, 30, 3), '#8a6a44', '#5e4428', { lw: 1.5 });
  if (stalk) { g.strokeStyle = INK; g.lineWidth = 3.5; g.beginPath(); g.moveTo(0, -40); g.quadraticCurveTo(3, -80, 1, -112); g.stroke(); g.strokeStyle = '#9b8a52'; g.lineWidth = 2; g.stroke();
    for (let i = 0; i < 16; i++) { const t = i / 16, py = -82 - t * 34, px = 1 + Math.sin(i * 1.7) * (6 - t * 4); paint(() => E(px, py, 3.4, 2.6), '#fff8e6', '#e6d3a8', { lw: 1, sx: -1, sy: -1 }); } }
  for (let i = 0; i < 22; i++) { const a = -Math.PI / 2 + (i / 21 - .5) * 3.3, l = 26 + 10 * Math.cos((i / 21 - .5) * 3); const ex = Math.cos(a) * l, ey = -34 + Math.sin(a) * l;
    g.fillStyle = i % 2 ? '#5f8f55' : '#77a463'; g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-2, -34); g.lineTo(ex, ey); g.lineTo(2, -34); g.closePath(); g.fill(); g.stroke(); }
  g.restore();
}
function barrel(x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  paint(() => S([[-14, 0], [-16, -14], [-11, -26], [0, -30], [11, -26], [16, -14], [14, 0]]), '#5f9654', '#3b6a3a', { lw: 1.6, sx: -3, sy: -1, tex: () => { g.strokeStyle = 'rgba(30,60,30,.5)'; g.lineWidth = 1; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(i * 4.2, 0); g.quadraticCurveTo(i * 5.2, -18, i * 1.5, -30); g.stroke(); } } });
  for (const [fx, fy] of [[-6, -29], [0, -32], [6, -29]]) paint(() => E(fx, fy, 3, 2.4), '#ffcf3a', '#e08a20', { lw: 1, sx: -1, sy: -1 });
  g.restore();
}
function creosote(x, y, s, col = '#6f8f4a') { g.save(); g.translate(x, y); g.scale(s, s); paint(() => { for (let i = 0; i < 9; i++) C(R(-16, 16), R(-18, -4), R(6, 9)); }, col, darken(col, .3), { lw: 1.3, sx: -2, sy: -2 }); g.restore(); }
function tumbleweed(x, y, r, o = {}) {
  g.save(); g.translate(x, y);
  if (o.shadow !== false) shadow(0, r * .95, r * 1.1, r * .25, .25);
  g.lineWidth = 1.1; for (let i = 0; i < 70; i++) { const a = R(0, TAU), a2 = a + R(1, 2.6); g.strokeStyle = i % 3 ? '#a8824e' : '#6e4f2a'; g.beginPath(); g.arc(R(-r * .2, r * .2), R(-r * .2, r * .2), r * R(.55, 1), a, a2); g.stroke(); }
  g.strokeStyle = INK; g.globalAlpha = .4; g.lineWidth = 1; for (let i = 0; i < 10; i++) { const a = R(0, TAU); g.beginPath(); g.arc(0, 0, r, a, a + R(.4, 1)); g.stroke(); }
  g.globalAlpha = 1; if (o.motion) { g.strokeStyle = 'rgba(255,240,210,.7)'; g.lineWidth = 2; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-r - 6 - i * 3, -r * .4 + i * r * .4); g.lineTo(-r - 22 - i * 6, -r * .4 + i * r * .4); g.stroke(); } }
  g.restore();
}
function ristra(x, y, n, s = 1) { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = '#7a5a2a'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, n * 5); g.stroke(); for (let i = 0; i < n; i++) for (const k of [-1, 1]) { const py = 3 + i * 5, px = k * 2.5; paint(() => { g.moveTo(px, py - 2); g.quadraticCurveTo(px + k * 6, py, px + k * 2, py + 6); g.quadraticCurveTo(px - k * 1, py + 1, px, py - 2); }, '#d8322a', '#9a1c18', { lw: .9, sx: -.6, sy: -.6 }); } g.restore(); }
// ---- The Ark (exterior) ----
function ark(x, y, w, o = {}) { // x,y = keel center bottom
  const h = w * .42; g.save(); g.translate(x, y);
  const L = -w / 2, Rr = w / 2, deck = -h * .62;
  const hull = () => { g.moveTo(L + w * .02, deck - h * .06); g.quadraticCurveTo(0, deck + h * .05, Rr - w * .04, deck - h * .1); g.quadraticCurveTo(Rr + w * .03, deck - h * .2, Rr + w * .05, deck - h * .32); // bow tip
    g.quadraticCurveTo(Rr - w * .02, deck + h * .25, Rr - w * .14, -h * .08); g.quadraticCurveTo(0, h * .03, L + w * .12, -h * .06); g.quadraticCurveTo(L - w * .02, deck + h * .3, L + w * .02, deck - h * .06); g.closePath(); };
  // supports + sand drift
  for (const sx of [-.3, -.05, .2]) { paint(() => RR(sx * w - 10, -h * .1, 20, h * .12, 2), '#7b5532', '#5a3b20', { lw: 1.5 }); }
  shadow(0, 0, w * .5, h * .07, .4);
  // cabin behind deck line
  const cw = w * .62, cx0 = -w * .28, ch = h * .5;
  paint(() => RR(cx0, deck - ch, cw, ch + 6, 3), '#b47a43', '#8a5530', { lw: 2, sx: -4, sy: 0, tex: () => { g.strokeStyle = 'rgba(60,30,10,.35)'; g.lineWidth = 1; for (let i = cx0; i < cx0 + cw; i += 9) { g.beginPath(); g.moveTo(i, deck - ch); g.lineTo(i, deck + 6); g.stroke(); } } });
  // windows w/ warm light + animals
  const winY = deck - ch * .62, wins = 5;
  for (let i = 0; i < wins; i++) { const wx = cx0 + cw * (i + .5) / wins; paint(() => RR(wx - 11, winY - 10, 22, 22, 4), '#ffd27a', '#ffb24a', { lw: 1.8, sx: 0, sy: 3 }); g.fillStyle = 'rgba(255,240,180,.35)'; g.beginPath(); C(wx, winY, 20); g.fill();
    if (o.peek && o.peek[i]) o.peek[i](wx, winY + 10); else { g.strokeStyle = '#6b4220'; g.lineWidth = 2; g.beginPath(); g.moveTo(wx, winY - 10); g.lineTo(wx, winY + 12); g.moveTo(wx - 11, winY + 1); g.lineTo(wx + 11, winY + 1); g.stroke(); } }
  // roof
  paint(() => { g.moveTo(cx0 - 14, deck - ch + 2); g.lineTo(cx0 + cw * .08, deck - ch - h * .28); g.lineTo(cx0 + cw * .92, deck - ch - h * .28); g.lineTo(cx0 + cw + 14, deck - ch + 2); g.closePath(); }, '#7d4a2a', '#5a301a', { lw: 2.2, sx: 0, sy: -4, tex: () => { g.strokeStyle = 'rgba(30,10,0,.35)'; g.lineWidth = 1; for (let r = 1; r < 4; r++) { const yy = deck - ch - h * .28 * r / 4 + 2; g.beginPath(); g.moveTo(cx0 - 20, yy); g.lineTo(cx0 + cw + 20, yy); g.stroke(); for (let i = cx0 - 10; i < cx0 + cw + 10; i += 12) { g.beginPath(); g.moveTo(i + r * 5, yy); g.lineTo(i + r * 5, yy + h * .07); g.stroke(); } } } });
  // painted sign on cabin
  if (o.sign) { plank(cx0 + cw * .2, deck - ch + 4, cw * .6, 16, 4, '#e8d2a6', { rows: 1, nails: false }); txt(o.sign, cx0 + cw * .5, deck - ch + 12, `900 ${10 * w / 340}px 'EA Lilita', sans-serif`, '#7a2e1b', null); }
  // mast + flag
  const mx = cx0 + cw * .62, my = deck - ch - h * .28;
  g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(mx, my + 2); g.lineTo(mx, my - h * .55); g.stroke(); g.strokeStyle = '#8a5a32'; g.lineWidth = 3; g.stroke();
  paint(() => { g.moveTo(mx + 1, my - h * .55); g.quadraticCurveTo(mx + 22, my - h * .6, mx + 40, my - h * .52); g.quadraticCurveTo(mx + 22, my - h * .46, mx + 1, my - h * .38); g.closePath(); }, '#e9503f', '#b8352a', { lw: 1.6, sx: 0, sy: -2 });
  paw(mx + 19, my - h * .47, 5, '#fff4e0');
  if (o.eagle) o.eagle(mx, my - h * .55);
  // string lights from mast to bow + stern
  const bulbs = (x1, y1, x2, y2, sag, n) => { g.strokeStyle = 'rgba(40,20,10,.7)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + sag, x2, y2); g.stroke(); for (let i = 1; i < n; i++) { const t = i / n, bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * (x1 + x2) / 2 + t * t * x2, by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * ((y1 + y2) / 2 + sag) + t * t * y2; const cols = ['#ffd24a', '#ff6b4a', '#6be3c8', '#ff9ad0']; g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(bx, by + 2, .5, bx, by + 2, 7); gl.addColorStop(0, 'rgba(255,230,160,.8)'); gl.addColorStop(1, 'rgba(255,230,160,0)'); g.fillStyle = gl; g.beginPath(); C(bx, by + 2, 7); g.fill(); g.restore(); g.fillStyle = cols[i % 4]; g.beginPath(); E(bx, by + 2.5, 1.8, 2.4); g.fill(); } };
  bulbs(mx, my - h * .5, Rr + w * .04, deck - h * .3, 18, 9); bulbs(mx, my - h * .5, L + w * .03, deck - h * .08, 26, 12);
  // hull
  paint(hull, '#a86d3a', '#6e4220', { lw: 2.6, sx: 0, sy: -h * .08, tex: () => {
      for (let i = 0; i < 9; i++) { const yy = deck - h * .1 + i * h * .085; g.fillStyle = i % 2 ? 'rgba(255,220,170,.06)' : 'rgba(60,25,5,.07)'; g.fillRect(L - 20, yy, w + 60, h * .085); g.strokeStyle = 'rgba(50,25,8,.5)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(L - 20, yy + i * .6); g.quadraticCurveTo(0, yy + h * .05 + i * .4, Rr + 30, yy - h * .02 - i * 1.5); g.stroke();
        for (let k = 0; k < 6; k++) { const px = L + R(0, w), py = yy + R(2, h * .07); g.strokeStyle = 'rgba(60,30,10,.2)'; g.lineWidth = .8; g.beginPath(); g.moveTo(px, py); g.bezierCurveTo(px + 10, py + 1, px + 20, py - 1, px + 34, py); g.stroke(); }
        for (let k = 0; k < 9; k++) { g.fillStyle = 'rgba(40,20,5,.55)'; g.beginPath(); C(L + (k + .5) * w / 9 + (i % 2) * 14, yy + 3, 1); g.fill(); } }
      // patches
      paint(() => RR(-w * .22, deck + h * .12, w * .09, h * .08, 1), '#c08a52', '#9a6838', { lw: 1.2 });
      paint(() => RR(w * .18, deck + h * .25, w * .07, h * .06, 1), '#946038', '#6e4424', { lw: 1.2 });
      const gr = g.createLinearGradient(0, deck, 0, 0); gr.addColorStop(0, 'rgba(255,190,120,.0)'); gr.addColorStop(1, 'rgba(40,10,10,.35)'); g.fillStyle = gr; g.fillRect(L - 20, deck - h * .3, w + 60, h * .8);
    }, rim: o.rim ? ['#ffb36b', -3, 0, 5] : null });
  // deck rail
  g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(L + w * .02, deck - h * .06); g.quadraticCurveTo(0, deck + h * .05, Rr - w * .04, deck - h * .1); g.stroke(); g.strokeStyle = '#d29a5c'; g.lineWidth = 2; g.stroke();
  // portholes
  const ph = o.portholes || []; ph.forEach((p, i) => { const px = p.x * w, py = deck + h * p.y; paint(() => C(px, py, w * .03), '#ffd98a', '#ffb24a', { lw: 1.6, sx: 0, sy: 2 }); g.strokeStyle = '#c9a050'; g.lineWidth = 2.5; g.beginPath(); C(px, py, w * .03 + 1.6); g.stroke(); g.strokeStyle = INK; g.lineWidth = 1; g.beginPath(); C(px, py, w * .03 + 3); g.stroke(); if (p.f) p.f(px, py, w * .03); });
  // name on hull
  if (o.hullName) { txt(o.hullName, w * .22, deck + h * .14, `${w * .045}px 'EA Lilita', sans-serif`, '#f6e2b8', 'rgba(50,20,5,.8)', 3); }
  g.restore();
  return { deck: y + deck, h };
}
function paw(x, y, r, col) { g.save(); g.fillStyle = col; g.beginPath(); E(x, y + r * .25, r * .62, r * .5); g.fill(); for (const [dx, dy] of [[-.62, -.38], [-.22, -.72], [.22, -.72], [.62, -.38]]) { g.beginPath(); E(x + dx * r, y + dy * r, r * .2, r * .25); g.fill(); } g.restore(); }
