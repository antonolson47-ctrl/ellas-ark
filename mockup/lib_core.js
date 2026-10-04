// Ella's Ark concept mockup: core drawing helpers (mockup only, not game code)
const INK = '#2b1a12';
let g; // context set by setup
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const R = (a, b) => a + rnd() * (b - a);
const TAU = Math.PI * 2;
function setup(W, H, DPR) {
  const cv = document.getElementById('cv'); cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px';
  g = cv.getContext('2d'); g.scale(DPR, DPR); g.lineJoin = 'round'; g.lineCap = 'round';
}
// ---- subpath builders (no beginPath) ----
function E(x, y, rx, ry, rot = 0) { g.moveTo(x + rx * Math.cos(rot), y + rx * Math.sin(rot)); g.ellipse(x, y, rx, ry, rot, 0, TAU); }
function C(x, y, r) { E(x, y, r, r); }
function RR(x, y, w, h, r) { g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
// closed smooth curve through points (Catmull-Rom → bezier)
function S(pts, t = 1) {
  const n = pts.length; g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    g.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6 * t, p1[1] + (p2[1] - p0[1]) / 6 * t, p2[0] - (p3[0] - p1[0]) / 6 * t, p2[1] - (p3[1] - p1[1]) / 6 * t, p2[0], p2[1]);
  }
  g.closePath();
}
// open smooth curve
function SO(pts, t = 1) {
  const n = pts.length; g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
    g.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6 * t, p1[1] + (p2[1] - p0[1]) / 6 * t, p2[0] - (p3[0] - p1[0]) / 6 * t, p2[1] - (p3[1] - p1[1]) / 6 * t, p2[0], p2[1]);
  }
}
function poly(pts) { g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); }
// scruffy/tufted blob around a center
function tuft(cx, cy, rx, ry, n, amp, phase = 0) {
  const pts = []; for (let i = 0; i < n * 2; i++) { const a = phase + i / (n * 2) * TAU, k = i % 2 ? 1 : 1 + amp; pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  S(pts, .7);
}
// ---- material painter: outlined union with cel shading ----
// shapes(): adds subpaths. opts: sx,sy shadow offset (base fill shifted), hi: fn inside clip, tex: fn inside clip, lw outline
function paint(shapes, base, dark, o = {}) {
  const lw = o.lw ?? 2.2, sx = o.sx ?? -3, sy = o.sy ?? -4;
  g.save();
  if (lw > 0) { g.beginPath(); shapes(); g.strokeStyle = o.ink || INK; g.lineWidth = lw * 2; g.stroke(); }
  g.beginPath(); shapes(); g.fillStyle = dark || base; g.fill();
  g.save(); g.beginPath(); shapes(); g.clip();
  if (dark) { g.save(); g.translate(sx, sy); g.beginPath(); shapes(); g.fillStyle = base; g.fill(); g.restore(); }
  if (o.tex) o.tex();
  if (o.hi) o.hi();
  if (o.rim) { g.save(); g.translate(o.rim[1] || 3, o.rim[2] || 0); g.beginPath(); shapes(); g.globalCompositeOperation = 'source-atop'; g.lineWidth = o.rim[3] || 4; g.strokeStyle = o.rim[0]; g.globalAlpha = .55; g.stroke(); g.restore(); }
  g.restore(); g.restore();
}
function hiBlob(x, y, rx, ry, a = .45, rot = -.5, col = '#fff') { g.save(); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); E(x, y, rx, ry, rot); g.fill(); g.restore(); }
// fur strokes inside current clip
function fur(x, y, w, h, col, n, len, ang = 1.4, lw = 1, a = .5) {
  g.save(); g.strokeStyle = col; g.lineWidth = lw; g.globalAlpha = a;
  for (let i = 0; i < n; i++) { const px = x + rnd() * w, py = y + rnd() * h, an = ang + R(-.35, .35), l = len * R(.6, 1.2); g.beginPath(); g.moveTo(px, py); g.quadraticCurveTo(px + Math.cos(an) * l * .5 + R(-1, 1), py + Math.sin(an) * l * .5, px + Math.cos(an) * l, py + Math.sin(an) * l); g.stroke(); }
  g.restore();
}
function scales(x, y, w, h, col, s, a = .35) {
  g.save(); g.strokeStyle = col; g.lineWidth = 1; g.globalAlpha = a;
  for (let j = 0, row = 0; j < h + s; j += s * .7, row++) for (let i = -s; i < w + s; i += s) { g.beginPath(); g.arc(x + i + (row % 2) * s / 2, y + j, s / 2, .15 * Math.PI, .85 * Math.PI); g.stroke(); }
  g.restore();
}
function wrinkles(pts, col = 'rgba(40,30,30,.35)', lw = 1.2) { g.save(); g.strokeStyle = col; g.lineWidth = lw; for (const p of pts) { g.beginPath(); SO(p); g.stroke(); } g.restore(); }
// glossy cartoon eye
function eye(x, y, r, iris = '#4a3020', o = {}) {
  const lx = o.lx ?? .15, ly = o.ly ?? .1, ir = r * (o.ir ?? .62);
  g.save();
  g.beginPath(); E(x, y, r * (o.sx || 1), r); g.fillStyle = '#fff'; g.fill(); g.strokeStyle = INK; g.lineWidth = o.lw ?? Math.max(1.2, r * .14); g.stroke();
  g.save(); g.beginPath(); E(x, y, r * (o.sx || 1), r); g.clip();
  const ix = x + lx * r, iy = y + ly * r; const gr = g.createRadialGradient(ix - ir * .3, iy - ir * .3, ir * .1, ix, iy, ir); gr.addColorStop(0, o.iris2 || lighten(iris, .35)); gr.addColorStop(1, iris);
  g.beginPath(); C(ix, iy, ir); g.fillStyle = gr; g.fill();
  g.beginPath(); C(ix, iy, ir * .52); g.fillStyle = '#120a06'; g.fill();
  g.fillStyle = '#fff'; g.beginPath(); C(ix - ir * .35, iy - ir * .4, ir * .32); g.fill(); g.beginPath(); C(ix + ir * .35, iy + ir * .32, ir * .14); g.fill();
  if (o.lid) { const ly2 = y - r + 2 * r * o.lid; g.fillStyle = o.lidCol || '#c98'; g.fillRect(x - r * 2, y - r * 2, r * 4, ly2 - (y - r * 2)); g.strokeStyle = INK; g.lineWidth = Math.max(1.2, r * .18); g.beginPath(); g.moveTo(x - r * 1.3, ly2 + (o.lidTilt || 0)); g.lineTo(x + r * 1.3, ly2 - (o.lidTilt || 0)); g.stroke(); }
  g.restore(); g.restore();
}
function lighten(hex, k) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, gg = n >> 8 & 255, b = n & 255; r = Math.round(r + (255 - r) * k); gg = Math.round(gg + (255 - gg) * k); b = Math.round(b + (255 - b) * k); return `rgb(${r},${gg},${b})`; }
function darken(hex, k) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, gg = n >> 8 & 255, b = n & 255; return `rgb(${Math.round(r * (1 - k))},${Math.round(gg * (1 - k))},${Math.round(b * (1 - k))})`; }
function line(pts, col = INK, lw = 2) { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); SO(pts); g.stroke(); g.restore(); }
function shadow(x, y, rx, ry, a = .28) { g.save(); const gr = g.createRadialGradient(x, y, 1, x, y, rx); gr.addColorStop(0, `rgba(60,25,10,${a})`); gr.addColorStop(1, 'rgba(60,25,10,0)'); g.fillStyle = gr; g.beginPath(); E(x, y, rx, ry); g.fill(); g.restore(); }
function star5(x, y, r1, r2, rot = -Math.PI / 2) { const pts = []; for (let i = 0; i < 10; i++) { const a = rot + i * Math.PI / 5, r = i % 2 ? r2 : r1; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } poly(pts); }
function sparkle(x, y, r, col = '#fff', a = 1) { g.save(); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); g.moveTo(x, y - r * 2); g.quadraticCurveTo(x, y, x + r * 2, y); g.quadraticCurveTo(x, y, x, y + r * 2); g.quadraticCurveTo(x, y, x - r * 2, y); g.quadraticCurveTo(x, y, x, y - r * 2); g.fill(); g.restore(); }
// text with outline
function txt(s, x, y, font, fill, stroke, lw = 4, align = 'center') { g.save(); g.font = font; g.textAlign = align; g.textBaseline = 'middle'; if (stroke) { g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(s, x, y); } g.fillStyle = fill; g.fillText(s, x, y); g.restore(); }
function wrapTxt(s, x, y, maxW, lh, font, col, align = 'left') { g.save(); g.font = font; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'top'; const words = s.split(' '); let l = '', yy = y; for (const w of words) { const t = l ? l + ' ' + w : w; if (g.measureText(t).width > maxW && l) { g.fillText(l, x, yy); l = w; yy += lh; } else l = t; } if (l) g.fillText(l, x, yy); g.restore(); return yy + lh; }
// wood plank panel
function plank(x, y, w, h, r = 8, base = '#b07a45', o = {}) {
  g.save(); g.beginPath(); RR(x, y, w, h, r); g.fillStyle = INK; g.save(); g.translate(0, 3); g.fill(); g.restore();
  const gr = g.createLinearGradient(x, y, x, y + h); gr.addColorStop(0, lighten(base, .18)); gr.addColorStop(1, darken(base, .12)); g.fillStyle = gr; g.fill();
  g.clip(); g.strokeStyle = 'rgba(70,35,10,.28)'; g.lineWidth = 1;
  const rows = o.rows || Math.max(1, Math.round(h / 22));
  for (let i = 1; i < rows; i++) { g.beginPath(); g.moveTo(x, y + i * h / rows); g.lineTo(x + w, y + i * h / rows); g.stroke(); }
  for (let i = 0; i < w * h / 500; i++) { const px = x + rnd() * w, py = y + rnd() * h; g.beginPath(); g.moveTo(px, py); g.bezierCurveTo(px + 8, py + R(-1.5, 1.5), px + 16, py + R(-1.5, 1.5), px + 26, py); g.stroke(); }
  g.restore(); g.save(); g.beginPath(); RR(x, y, w, h, r); g.strokeStyle = INK; g.lineWidth = 2; g.stroke(); g.restore();
  if (o.nails !== false) { g.fillStyle = '#5a3a20'; for (const [nx, ny] of [[x + 7, y + 7], [x + w - 7, y + 7], [x + 7, y + h - 7], [x + w - 7, y + h - 7]]) { g.beginPath(); C(nx, ny, 1.8); g.fill(); } }
}
function pill(x, y, w, h, fill, stroke = INK) { g.save(); g.beginPath(); RR(x, y, w, h, h / 2); g.fillStyle = fill; g.fill(); g.strokeStyle = stroke; g.lineWidth = 2; g.stroke(); g.restore(); }
