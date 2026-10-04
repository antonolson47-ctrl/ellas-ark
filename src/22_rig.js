/* ===================== CREATURE RIG: part-based animals + mashups ===================== */
// All creatures: feet at (0,0), facing right. Heads drawn in a ~22-radius unit box at an anchor.
const FEET = { paw: 1, hoof: 1, pad: 1, claw: 1, bird: 1, sloth: 1, roo: 1 };
function toes(x, y, w, c) { g.save(); g.strokeStyle = dk(c, .45); g.lineWidth = Math.max(.8, w * .07); for (let i = 1; i < 3; i++) { const tx = x - w * .35 + i * w * .3; g.beginPath(); g.moveTo(tx, y - w * .1); g.lineTo(tx, y + w * .12); g.stroke(); } g.restore(); }
function rLeg(x, y0, w, col, foot, far, o = {}) {
  const c = far ? dk(col, .2) : col, d = dk(c, .25), tw = w * (o.taper ?? .82);
  if (foot === 'bird') {
    const lc = far ? dk(o.legCol || '#e8a33a', .2) : (o.legCol || '#e8a33a');
    limb([[x, y0], [x - 3, y0 * .5], [x + 2, -3]], Math.max(3, w * .26), lc);
    g.save(); g.strokeStyle = INK; g.lineWidth = Math.max(2.2, w * .2) + 2; g.beginPath(); for (const dx of [-7, 3, 9]) { g.moveTo(x + 2, -2); g.lineTo(x + 2 + dx * w / 14, 0); } g.stroke(); g.strokeStyle = lc; g.lineWidth = Math.max(2.2, w * .2) - 1; g.stroke(); g.restore();
    return;
  }
  if (o.tentacle) { const ph = o.ph || 0; const pts = [[x, y0], [x + Math.sin(ph) * w * .6, y0 * .55], [x - w * .3 + Math.cos(ph) * w * .5, y0 * .2], [x + w * .8, -w * .25]]; limb(pts, w * .8, c); g.save(); g.fillStyle = lt(o.sucker || '#f2b8c6', .2); for (let i = 1; i < 4; i++) { const p = pts[i]; g.beginPath(); C(p[0] + 2, p[1] - 1, w * .13); g.fill(); } g.restore(); return; }
  paint(() => S([[x - w / 2, y0], [x + w / 2, y0], [x + tw / 2 + (o.bend || 0), y0 * .5], [x + tw / 2, -2], [x - tw / 2, -2], [x - tw / 2 + (o.bend || 0) * .5, y0 * .5]], .55), c, d, { sx: -2, sy: 0, tex: o.tex });
  if (foot === 'hoof') paint(() => RR(x - tw / 2 - 1, -w * .36, tw + 2, w * .38, 3), far ? '#3a2c24' : '#55443a', '#2e241e', { lw: 1.6, sx: 0, sy: -1 });
  else if (foot === 'pad') { g.fillStyle = '#ece4d4'; g.strokeStyle = INK; g.lineWidth = 1; for (let i = 0; i < 3; i++) { g.beginPath(); E(x - tw * .3 + i * tw * .3, -3, tw * .12, tw * .09); g.fill(); g.stroke(); } }
  else if (foot === 'claw' || foot === 'sloth') { const L = foot === 'sloth' ? w * .7 : w * .35; g.fillStyle = '#f2ead6'; g.strokeStyle = INK; g.lineWidth = 1.1; for (let i = 0; i < 3; i++) { const cx = x - tw * .25 + i * tw * .3; g.beginPath(); g.moveTo(cx, -3); g.quadraticCurveTo(cx + L * .8, -L * .3, cx + L, 1); g.lineTo(cx + 2, 0); g.closePath(); g.fill(); g.stroke(); } }
  else if (foot === 'roo') { paint(() => S([[x - tw / 2, -10], [x + tw * 1.9, -7], [x + tw * 2, 0], [x - tw / 2 - 2, 0]], .5), c, d, { lw: 2, sx: -1, sy: -2 }); }
  else { paint(() => E(x + w * .14, -w * .2, w * .58, w * .26), c, d, { lw: 1.8, sx: -1, sy: -1 }); toes(x + w * .14, -w * .2, w, c); }
}
// ---------- tails ----------
function rTail(type, x, y, s, col, o = {}) {
  const d = dk(col, .25); const W = o.wag || 0;
  if (type === 'none') return;
  if (type === 'whip') limb([[x, y], [x - 16 * s, y - 10 * s + W], [x - 22 * s, y - 28 * s + W * 1.4]], 6 * s, col);
  else if (type === 'thin') limb([[x, y], [x - 18 * s, y + 4 * s], [x - 26 * s, y - 14 * s], [x - 20 * s, y - 30 * s + W]], 5 * s, col);
  else if (type === 'stub') paint(() => C(x - 3 * s, y, 6 * s), col, d, { lw: 1.6 });
  else if (type === 'curl') { paint(() => { g.moveTo(x, y); g.arc(x - 6 * s, y - 8 * s, 7 * s, .6, 5.4, true); }, col, d, { lw: 1.6 }); g.save(); g.strokeStyle = INK; g.lineWidth = 6 * s + 3; g.beginPath(); g.arc(x - 5 * s, y - 8 * s, 6 * s, .4, 5.6); g.stroke(); g.strokeStyle = col; g.lineWidth = 6 * s - 1; g.stroke(); g.restore(); }
  else if (type === 'bushy' || type === 'skunk') {
    const big = type === 'skunk' ? 1.5 : 1;
    paint(() => S([[x + 2, y + 2], [x - 18 * s * big, y + 4 * s], [x - 34 * s * big, y - 14 * s * big + W], [x - 30 * s * big, y - 40 * s * big + W], [x - 14 * s * big, y - 34 * s * big + W], [x - 10 * s, y - 12 * s], [x + 2, y - 6 * s]], .8), col, d, { sx: -2, sy: -2, tex: () => { if (type === 'skunk') { g.strokeStyle = '#f6f2ea'; g.lineWidth = 8 * s; g.beginPath(); g.moveTo(x, y - 2); g.quadraticCurveTo(x - 30 * s * big, y - 6 * s, x - 26 * s * big, y - 40 * s * big + W); g.stroke(); } else fur(x - 40 * s, y - 44 * s, 44 * s, 48 * s, d, 30, 6 * s, -1.2, 1, .5); } });
    if (o.tip) paint(() => C(x - 28 * s, y - 34 * s + W, 7 * s), o.tip, null, { lw: 1.4 });
  }
  else if (type === 'tuft') { limb([[x, y], [x - 18 * s, y + 6 * s], [x - 30 * s, y - 8 * s + W]], 4.5 * s, col); paint(() => tuft(x - 32 * s, y - 12 * s + W, 6 * s, 7 * s, 6, .35), o.tuft || '#8a5020', null, { lw: 1.4 }); }
  else if (type === 'taper' || type === 'rattle') {
    const len = (o.len || 1) * 60 * s;
    paint(() => S([[x + 4, y - 10 * s], [x - len * .5, y - 4 * s], [x - len, y + 6 * s - (o.lift || 0)], [x - len * .55, y + 6 * s], [x + 4, y + 10 * s]], .7), col, d, { sx: -2, sy: -3, tex: o.tex });
    if (type === 'rattle') rattleTip(x - len, y + 6 * s - (o.lift || 0), s);
  }
  else if (type === 'roo') paint(() => S([[x + 4, y - 14 * s], [x - 30 * s, y + 10 * s], [x - 64 * s, -4], [x - 66 * s, 0], [x - 20 * s, 0], [x + 6, y + 8 * s]], .7), col, d, { sx: -2, sy: -3 });
  else if (type === 'fan') { for (let i = 0; i < 5; i++) { const a = PI + .25 + i * .16; paint(() => E(x + Math.cos(a) * 18 * s, y + Math.sin(a) * 18 * s, 16 * s, 4.5 * s, a), i % 2 ? col : dk(col, .12), d, { lw: 1.4, sx: 0, sy: -1 }); } }
  else if (type === 'long') { paint(() => S([[x + 2, y - 4 * s], [x - 30 * s, y - 34 * s + W], [x - 50 * s, y - 64 * s + W], [x - 44 * s, y - 66 * s + W], [x - 22 * s, y - 30 * s], [x + 2, y + 6 * s]], .7), col, d, { sx: -1, sy: -2, tex: () => { g.strokeStyle = dk(col, .35); g.lineWidth = 1.2; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(x - i * 9 * s, y - i * 12 * s); g.lineTo(x - i * 9 * s - 6, y - i * 12 * s + 4); g.stroke(); } } }); }
}
function rattleTip(x, y, s) { for (let i = 0; i < 4; i++) paint(() => E(x - i * 5 * s, y - i * 2 * s, 4.5 * s, 3.8 * s, -.3), i % 2 ? '#d8c08a' : '#b89a62', '#8a7040', { lw: 1.3, sx: 0, sy: -1 }); g.save(); g.strokeStyle = 'rgba(60,30,20,.55)'; g.lineWidth = 1.4; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(x - 18 * s, y - 6 * s, (10 + i * 5) * s, -2.6, -1.6); g.stroke(); } g.restore(); }
// ---------- skin + pattern textures (called inside a clip) ----------
function skinTex(k, x, y, w, h) {
  const d = dk(k.col, .32);
  if (k.skin === 'fur') fur(x, y, w, h, d, Math.round(w * h / 60), 5 + w / 40, 1.4, 1, .38);
  else if (k.skin === 'wool') { g.save(); g.strokeStyle = d; g.lineWidth = 1.6; g.globalAlpha = .5; for (let i = 0; i < w * h / 70; i++) { const px = x + rnd() * w, py = y + rnd() * h; g.beginPath(); g.moveTo(px, py); g.quadraticCurveTo(px + R(-4, 4), py + 8, px + R(-3, 3), py + 16); g.stroke(); } g.restore(); }
  else if (k.skin === 'scales') scales(x, y, w, h, d, 8, .4);
  else if (k.skin === 'feather') { g.save(); g.strokeStyle = d; g.lineWidth = 1.1; g.globalAlpha = .4; for (let j = 0, r = 0; j < h; j += 7, r++) for (let i = 0; i < w; i += 10) { g.beginPath(); g.arc(x + i + (r % 2) * 5, y + j, 5, .2, PI - .2); g.stroke(); } g.restore(); }
  else if (k.skin === 'wrinkle') { g.save(); g.strokeStyle = d; g.lineWidth = 1.4; g.globalAlpha = .4; for (let i = 0; i < w * h / 300; i++) { const px = x + rnd() * w, py = y + rnd() * h; g.beginPath(); g.moveTo(px, py); g.quadraticCurveTo(px + 6, py + R(-3, 3), px + 12, py + R(-2, 2)); g.stroke(); } g.restore(); g.fillStyle = 'rgba(40,40,60,.10)'; for (let i = 0; i < w * h / 120; i++) { g.beginPath(); C(x + rnd() * w, y + rnd() * h, R(.8, 2)); g.fill(); } }
  else if (k.skin === 'bristle') fur(x, y, w, h, '#2a2420', Math.round(w * h / 50), 7, -1.9, 1.2, .5);
  const pc = k.patCol || dk(k.col, .45);
  switch (k.pat) {
    case 'stripes': g.save(); g.fillStyle = pc; for (let i = x + 6; i < x + w; i += 14) { g.beginPath(); g.moveTo(i, y - 2); g.quadraticCurveTo(i + 8, y + h * .3, i + 2, y + h * .55); g.lineTo(i - 3, y + h * .55); g.quadraticCurveTo(i + 2, y + h * .3, i - 4, y - 2); g.fill(); } g.restore(); break;
    case 'tabby': g.save(); g.strokeStyle = pc; g.lineWidth = 3; g.globalAlpha = .7; for (let i = x + 4; i < x + w; i += 11) { g.beginPath(); g.moveTo(i, y); g.quadraticCurveTo(i + 5, y + h * .25, i, y + h * .45); g.stroke(); } g.restore(); break;
    case 'spots': g.save(); g.fillStyle = pc; for (let i = 0; i < w * h / 260; i++) { g.beginPath(); tuft(x + rnd() * w, y + rnd() * h * .8, R(3, 7), R(2.5, 5), 5, .25, rnd() * 6); g.fill(); } g.restore(); break;
    case 'brindle': g.save(); g.strokeStyle = pc; g.lineWidth = 1.6; g.globalAlpha = .55; for (let i = 0; i < w / 3; i++) { const px = x + rnd() * w; g.beginPath(); g.moveTo(px, y); g.quadraticCurveTo(px + R(-6, 6), y + h * .4, px + R(-4, 4), y + h); g.stroke(); } g.restore(); break;
    case 'beads': for (let j = 0; j < h; j += 9) for (let i = 0; i < w; i += 9) { g.fillStyle = (Math.sin(i * .07 + j * .11) + Math.sin(i * .031 - j * .05)) > .3 ? '#f08a3a' : '#2a1d18'; g.beginPath(); C(x + i + (j / 9 % 2) * 4.5, y + j, 3.6); g.fill(); } break;
    case 'saddle': case 'diamond': g.save(); for (let i = x; i < x + w; i += 20) { g.fillStyle = pc; g.beginPath(); tuft(i, y + h * .35, 8, 10, 4, .2); g.fill(); g.strokeStyle = lt(k.col, .4); g.lineWidth = 1.2; g.stroke(); } g.restore(); break;
    case 'skunk': g.save(); g.fillStyle = '#f6f2ea'; g.fillRect(x, y, w, h * .22); g.restore(); break;
    case 'shepherd': g.save(); g.fillStyle = '#2b2420'; g.beginPath(); E(x + w * .45, y + h * .02, w * .42, h * .32); g.fill(); g.restore(); break;
    case 'tux': break;
    case 'mud': g.fillStyle = 'rgba(110,70,40,.7)'; for (let i = 0; i < 5; i++) { g.beginPath(); tuft(x + rnd() * w, y + h * R(.4, .9), R(5, 9), R(4, 6), 6, .3); g.fill(); } break;
  }
}
