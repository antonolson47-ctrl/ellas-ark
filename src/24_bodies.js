/* ===================== BODY PLANS + ASSEMBLY + SPRITE CACHE ===================== */
function torsoTex(k, x, y, w, h) {
  skinTex(k, x, y, w, h);
  if (k.belly) { g.fillStyle = k.belly; g.beginPath(); E(x + w * .55, y + h * .98, w * .42, h * .38); g.fill(); }
  if (k.sweater) { const sc = k.sweater; g.fillStyle = sc[0]; g.fillRect(x + w * .18, y - 10, w * .72, h + 20); g.fillStyle = sc[1]; for (let yy = y + 6; yy < y + h; yy += 12) { g.fillRect(x + w * .18, yy, w * .72, 4); for (let xx = x + w * .2; xx < x + w * .88; xx += 8) { g.beginPath(); g.moveTo(xx, yy + 6); g.lineTo(xx + 4, yy + 10); g.lineTo(xx + 8, yy + 6); g.fill(); } } }
  if (k.puddleGlow) { g.save(); g.globalAlpha = .16; g.fillStyle = '#3fe0d0'; g.beginPath(); E(x + w * .4, y + h * .3, w * .3, h * .25); g.fill(); g.restore(); }
}
function wing(x, y, s, col, far) {
  const c = far ? dk(col, .2) : col;
  paint(() => { g.moveTo(x, y); g.quadraticCurveTo(x - 10 * s, y - 30 * s, x - 28 * s, y - 44 * s); for (let i = 0; i < 5; i++) { const t = i / 4, fx = x - 28 * s + t * 40 * s, fy = y - 44 * s + t * 26 * s; g.quadraticCurveTo(fx + 6 * s, fy - 4 * s, fx + 8 * s, fy + 6 * s); } g.quadraticCurveTo(x + 16 * s, y - 4 * s, x, y); g.closePath(); }, c, dk(c, .3), { lw: 1.8, sx: -2, sy: -3, tex: () => { g.strokeStyle = 'rgba(255,240,210,.35)'; g.lineWidth = 1.2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(x + 2, y - 4); g.lineTo(x - 22 * s + i * 10 * s, y - 38 * s + i * 7 * s); g.stroke(); } } });
}
function bodyGrafts(k, B, phase) {
  const gr = k.bodyGrafts || [], s = B.s;
  for (const id of gr) {
    if (phase === 'back') {
      if (id === 'wings' || id === 'bigwings') { const ws = id === 'bigwings' ? 1.3 : (B.big ? .7 : .9); wing(B.back[0] + 6 * s, B.back[1] + 4 * s, s * ws, k.wingCol || '#6a3e1c', true); }
      continue;
    }
    switch (id) {
      case 'wings': case 'bigwings': wing(B.back[0] - 4 * s, B.back[1] + 6 * s, s * (id === 'bigwings' ? 1.4 : (B.big ? .8 : 1)), k.wingCol || '#8a5428', false); break;
      case 'spikes': { const pts = B.topLine; paint(() => { for (let i = 0; i < pts.length; i++) { const [px, py] = pts[i], sz = (6 + Math.sin(i / (pts.length - 1) * PI) * 4) * s; g.moveTo(px - sz * .6, py + 2); g.lineTo(px, py - sz * 1.2); g.lineTo(px + sz * .6, py + 2); g.closePath(); } }, k.spikeCol || '#e9a33a', '#b07020', { lw: 1.3 }); break; }
      case 'bristles': { g.save(); g.strokeStyle = INK; g.lineWidth = 2; for (const [px, py] of B.topLine) for (let j = -2; j <= 2; j++) { g.beginPath(); g.moveTo(px + j * 2, py + 2); g.lineTo(px + j * 3, py - 9 * s); g.stroke(); } g.restore(); break; }
      case 'pouch': { const [px, py] = B.belly; paint(() => { g.moveTo(px - 14 * s, py - 6 * s); g.quadraticCurveTo(px, py + 18 * s, px + 14 * s, py - 6 * s); g.quadraticCurveTo(px, py + 2 * s, px - 14 * s, py - 6 * s); g.closePath(); }, lt(k.col, .2), dk(k.col, .1), { lw: 1.6 }); paint(() => RR(px - 4 * s, py - 14 * s, 8 * s, 12 * s, 2 * s), '#2a2a34', null, { lw: 1.2, tex: () => { g.fillStyle = '#6ad0ff'; g.fillRect(px - 3 * s, py - 13 * s, 6 * s, 8 * s); } }); break; }
      case 'flippers': { const [px, py] = B.chest; paint(() => E(px - 4 * s, py + 10 * s, 6 * s, 16 * s, -.5), '#24242e', '#101018', { lw: 1.6 }); break; }
      case 'tinyarms': { const [px, py] = B.chest; limb([[px, py], [px + 9 * s, py + 5 * s], [px + 12 * s, py + 13 * s]], 4 * s, k.col); break; }
      case 'blanket': { const tl = B.topLine, a = tl[0], b = tl[tl.length - 1]; paint(() => { g.moveTo(a[0] - 6 * s, a[1] + 16 * s); for (const p of tl) g.lineTo(p[0], p[1] - 4 * s); g.lineTo(b[0] + 8 * s, b[1] + 18 * s); g.quadraticCurveTo((a[0] + b[0]) / 2, b[1] + 26 * s, a[0] - 6 * s, a[1] + 16 * s); g.closePath(); }, '#e86a4a', '#b84a30', { lw: 1.6, tex: () => { g.strokeStyle = '#ffd24a'; g.lineWidth = 3 * s; for (let i = -2; i < 6; i++) { g.beginPath(); g.moveTo(a[0] + i * 12 * s, a[1] - 20 * s); g.lineTo(a[0] + i * 12 * s - 8 * s, a[1] + 40 * s); g.stroke(); } g.strokeStyle = '#3fb0a0'; g.lineWidth = 2 * s; for (let i = -2; i < 6; i++) { g.beginPath(); g.moveTo(a[0] + i * 12 * s + 5 * s, a[1] - 20 * s); g.lineTo(a[0] + i * 12 * s - 3 * s, a[1] + 40 * s); g.stroke(); } } }); break; }
      case 'collar': case 'dogtags': { const [px, py] = B.neck; paint(() => RR(px - 12 * s, py - 3 * s, 24 * s, 6 * s, 3 * s), id === 'dogtags' ? '#3a5a8a' : '#e9503f', id === 'dogtags' ? '#24406a' : '#b8352a', { lw: 1.3 }); if (id === 'dogtags') { for (const dx of [-1, 2]) paint(() => RR(px + dx * 3 * s - 2 * s, py + 3 * s, 5 * s, 8 * s, 2 * s), '#d8dde4', '#9aa2ac', { lw: 1, hi: () => hiBlob(px + dx * 3 * s, py + 5 * s, 1.2 * s, 2 * s, .6) }); } else paint(() => C(px, py + 6 * s, 3 * s), '#f4c542', '#c9962e', { lw: 1 }); break; }
      case 'shiver': { g.save(); g.strokeStyle = 'rgba(80,40,20,.6)'; g.lineWidth = 1.4; const [px, py] = B.chest; for (const kk of [-1, 1]) for (let i = 0; i < 3; i++) { const xx = px + kk * (28 + i * 4) * s - 6 * s; g.beginPath(); g.moveTo(xx, py - 10 * s + i * 8 * s); g.lineTo(xx + kk * 5 * s, py - 8 * s + i * 8 * s); g.stroke(); } g.restore(); break; }
      case 'wool': { const tl = B.topLine; paint(() => { for (const [px, py] of tl) tuft(px, py + 4 * s, 9 * s, 7 * s, 6, .3); }, k.col, dk(k.col, .25), { lw: 1.4, tex: () => fur(B.box[0], B.box[1] - 20, B.box[2], 40, dk(k.col, .35), 30, 6, 1.6, 1.2, .5) }); break; }
      case 'sparkle': { for (let i = 0; i < 4; i++) sparkle(B.box[0] + rnd() * B.box[2], B.box[1] + rnd() * B.box[3] * .6, 1.8 + rnd() * 1.6, '#bffff6', .9); break; }
    }
  }
}
const PLANS = {
  sit(k) {
    const W = k.W || 44, H = k.H || 56, c = k.col, d = dk(c, .25), s = W / 44;
    shadow(0, 0, W * .8, 5 * s);
    const B = { s, back: [-W * .25, -H * .82], belly: [W * .14, -H * .4], chest: [W * .2, -H * .6], neck: [W * .08, -H * .9], topLine: [[-W * .4, -H * .55], [-W * .25, -H * .78], [-W * .05, -H * .93], [W * .15, -H * .92]], box: [-W * .5, -H, W, H] };
    bodyGrafts(k, B, 'back');
    rTail(k.tail || 'whip', -W * .4, -8 * s, s, k.tailCol || c, { tip: k.tailTip });
    const body = () => S([[-W * .46, 0], [-W * .52, -H * .3], [-W * .36, -H * .72], [-W * .05, -H * .96], [W * .3, -H * .88], [W * .42, -H * .45], [W * .38, 0]], .9);
    paint(body, c, d, { sx: -3, sy: -3, tex: () => { torsoTex(Object.assign({}, k, { belly: null }), -W * .55, -H, W * 1.1, H); if (k.belly) { g.fillStyle = k.belly; g.beginPath(); E(W * .14, -H * .5, W * .2, H * .32); g.fill(); } } });
    paint(() => E(-W * .2, -H * .24, W * .3, H * .23, -.2), c, d, { sx: -2, sy: -2, tex: () => skinTex(k, -W * .5, -H * .5, W * .6, H * .5) });
    paint(() => E(-W * .1, -3 * s, W * .2, W * .1), c, d, { lw: 1.6, sx: -1, sy: -1 });
    rLeg(W * .04, -H * .55, W * .2, k.legCol2 || c, k.foot || 'paw', false, { tex: () => skinTex(k, -W, -H, W * 2, H) }); rLeg(W * .27, -H * .55, W * .2, k.legCol2 || c, k.foot || 'paw', false, {});
    bodyGrafts(k, B, 'front');
    return { head: [W * .06, -H * .98 - 12 * s, s * (k.hs || 1)], B };
  },
  quad(k) {
    const L = k.L || 110, H = k.H || 48, lg = k.leg || 36, lw = k.lw || 15, top = -lg - H, c = k.col, d = dk(c, .25), s = H / 48;
    shadow(0, 0, L * .62, 6 * s);
    const hx = -L / 2 + lw * .9, fx = L / 2 - lw * 1.2, y0 = top + H * .62;
    const B = { s, big: H > 70, back: [-L * .05, top + 6 * s], belly: [L * .05, top + H * .9], chest: [L * .42, top + H * .55], neck: [L * .44, top + H * .2], topLine: [], box: [-L / 2, top, L, H] };
    for (let i = 0; i <= 6; i++) B.topLine.push([-L * .42 + i * L * .13, top + H * .04 + Math.pow((i - 3) / 3, 2) * H * .1 - (k.hump || 0) * Math.sin(i / 6 * PI)]);
    const legO = { tentacle: k.legsAs === 'tentacles', legCol: k.legCol, taper: k.taper };
    rLeg(hx + lw * .7, y0, lw * .92, c, k.foot || 'paw', true, Object.assign({ ph: 1 }, legO)); rLeg(fx + lw * .7, y0, lw * .92, c, k.foot || 'paw', true, Object.assign({ ph: 2 }, legO));
    bodyGrafts(k, B, 'back');
    rTail(k.tail || 'whip', -L / 2 + 4, top + H * .3, s * (k.tailS || 1), k.tailCol || c, { tip: k.tailTip, len: k.tailLen, tuft: k.tuftCol });
    const pts = [[-L / 2, top + H * .35], [-L / 2 + L * .08, top + H * .02 - (k.hump || 0) * .3], [-L * .1, top - (k.hump || 0)], [L * .3, top - (k.shoulder || 0)], [L / 2, top + H * .12], [L / 2 + L * .05, top + H * .55], [L / 2 - L * .06, top + H * .95], [L * .1, top + H * 1.02 + (k.belly2 || 0)], [-L * .3, top + H * .98], [-L / 2 - L * .02, top + H * .75]];
    paint(() => S(pts, .9), c, d, { sx: -4, sy: -5, tex: () => torsoTex(k, -L / 2 - 8, top - 8, L + 16, H + 16) });
    if (k.spiderlegs) for (let i = 0; i < 2; i++) rLeg(-L * .1 + i * L * .25, y0, lw * .6, dk(c, .1), 'paw', false, {});
    rLeg(hx, y0, lw, c, k.foot || 'paw', false, Object.assign({ ph: 3, tex: () => skinTex(k, hx - 30, top, 60, H + lg) }, legO)); rLeg(fx, y0, lw, c, k.foot || 'paw', false, Object.assign({ ph: 4 }, legO));
    bodyGrafts(k, B, 'front');
    return { head: [L / 2 + 2, top - H * .12 - (k.neck || 0) * H, s * (k.hs || 1)], B };
  },
  low(k) {
    const L = k.L || 150, H = k.H || 26, c = k.col, d = dk(c, .25), s = H / 26, lift = 6;
    shadow(0, 0, L * .55, 5);
    const B = { s, back: [0, -H - lift], belly: [0, -lift], chest: [L * .32, -H * .5 - lift], neck: [L * .4, -H * .6 - lift], topLine: [], box: [-L * .4, -H - lift, L * .8, H] };
    for (let i = 0; i <= 7; i++) B.topLine.push([-L * .5 + i * L * .12, -H * (.55 + .45 * Math.sin(Math.min(1, (i + 1) / 5) * PI / 2)) - lift + (i < 2 ? (2 - i) * 4 : 0)]);
    for (const x of [-L * .2 + 8, L * .26 + 8]) rLeg(x, -H * .4 - lift, 10 * s, c, 'claw', true, { bend: 6 });
    bodyGrafts(k, B, 'back');
    rTail(k.tail || 'taper', -L * .3, -H * .45 - lift, s, c, { len: (k.tailLen || 1.4), tex: () => skinTex(k, -L, -H * 2, L, H * 3) });
    paint(() => S([[-L * .34, -H * .9 - lift], [0, -H * 1.05 - lift], [L * .3, -H * .95 - lift], [L * .44, -H * .6 - lift], [L * .4, -H * .12 - lift], [0, -lift + 2], [-L * .34, -H * .1 - lift]], .9), c, d, { sx: -3, sy: -4, tex: () => torsoTex(k, -L * .4, -H * 1.1 - lift, L * .9, H + 4) });
    for (const x of [-L * .2, L * .26]) rLeg(x, -H * .4 - lift, 11 * s, c, 'claw', false, { bend: 6 });
    bodyGrafts(k, B, 'front');
    return { head: [L * .44 + 4, -H * .6 - lift, s * (k.hs || 1)], B };
  },
  dino(k) {
    const c = k.col, d = dk(c, .25), s = 1;
    shadow(-10, 0, 80, 7);
    const B = { s, back: [-10, -92], belly: [0, -54], chest: [34, -84], neck: [36, -100], topLine: [[-80, -68], [-56, -78], [-30, -86], [-6, -92], [16, -102]], box: [-110, -110, 160, 100] };
    paint(() => S([[0, -82], [18, -86], [24, -58], [20, -26], [26, -6], [6, -4], [4, -30], [-6, -58]], .9), dk(c, .2), d, { sx: -2, sy: 0 });
    bodyGrafts(k, B, 'back');
    if (k.tail === 'rattle') rattleTip(-112, -64, 1);
    paint(() => S([[-112, -64], [-70, -76], [-30, -88], [10, -98], [30, -116], [46, -106], [44, -80], [26, -56], [-8, -46], [-50, -54], [-92, -60]], .9), c, d, { sx: -4, sy: -6, tex: () => torsoTex(k, -115, -120, 165, 80) });
    paint(() => { E(-8, -66, 26, 30, .35); S([[-26, -54], [6, -50], [10, -30], [10, -18], [20, -6], [-6, -4], [-12, -24], [-18, -44]], .9); }, c, d, { sx: -3, sy: -4, tex: () => skinTex(k, -40, -100, 70, 100) });
    paint(() => { for (const tx of [-2, 8, 18]) { g.moveTo(tx - 4, -3); g.lineTo(tx + 2, 2); g.lineTo(tx + 5, -6); } }, '#f4ecd2', null, { lw: 1 });
    if (!(k.bodyGrafts || []).includes('tinyarms')) limb([[34, -86], [44, -80], [47, -72]], 4.5, c);
    bodyGrafts(k, B, 'front');
    return { head: [44, -122, 1.25 * (k.hs || 1)], B };
  },
  roo(k) {
    const c = k.col, d = dk(c, .25), s = 1;
    shadow(0, 0, 44, 5);
    const B = { s, back: [-14, -84], belly: [8, -48], chest: [12, -74], neck: [6, -96], topLine: [[-20, -60], [-16, -80], [-4, -96]], box: [-30, -100, 50, 100] };
    bodyGrafts(k, B, 'back');
    rTail(k.tail === 'rattle' ? 'rattle' : (k.tail || 'roo'), -16, -18, 1, c, { len: .9 });
    paint(() => S([[-20, -8], [-28, -40], [-16, -82], [0, -100], [14, -92], [18, -60], [14, -24], [4, -8]], .9), c, d, { sx: -3, sy: -4, tex: () => torsoTex(k, -30, -104, 50, 100) });
    paint(() => E(-10, -26, 20, 24, -.2), c, d, { sx: -2, sy: -3, tex: () => skinTex(k, -32, -52, 44, 50) });
    rLeg(-4, -14, 10, c, k.foot === 'bird' ? 'bird' : 'roo', false, {});
    limb([[12, -78], [24, -70], [28, -60]], 5, c); limb([[4, -76], [18, -66], [22, -58]], 5, dk(c, .15));
    bodyGrafts(k, B, 'front');
    return { head: [6, -112, 1 * (k.hs || 1)], B };
  },
  ape(k) {
    const c = k.col, d = dk(c, .25), s = 1, sl = !!k.slouch;
    shadow(0, 0, 50, 6);
    const B = { s, back: [-10, -90], belly: [6, -40], chest: [16, -70], neck: [8, -96], topLine: [[-30, -60], [-22, -84], [-4, -98], [16, -96]], box: [-40, -104, 80, 100] };
    limb([[-18, -82], [-32, -50], [-30, sl ? -40 : -6]], 13, dk(c, .2));
    bodyGrafts(k, B, 'back');
    paint(() => S([[-34, -20], [-40, -60], [-24, -96], [10, -104], [34, -90], [38, -60], [24, -24], [0, -14]], .9), c, d, { sx: -4, sy: -5, tex: () => { torsoTex(k, -44, -110, 90, 100); if (k.silver) { g.fillStyle = 'rgba(220,220,225,.55)'; g.beginPath(); E(-14, -60, 22, 16, -.3); g.fill(); } if (k.chestCol) { g.fillStyle = k.chestCol; g.beginPath(); E(14, -60, 16, 18); g.fill(); } } });
    rLeg(-14, -24, 17, c, k.foot || 'paw', true, {}); rLeg(10, -24, 17, c, k.foot || 'paw', false, {});
    limb([[24, -84], [40, -50], [38, sl ? -46 : -6]], 14, c);
    if (k.foot === 'sloth') { g.fillStyle = '#f2ead6'; g.strokeStyle = INK; g.lineWidth = 1.1; for (let i = 0; i < 3; i++) { const cx = 34 + i * 4; g.beginPath(); g.moveTo(cx, sl ? -46 : -8); g.quadraticCurveTo(cx + 8, (sl ? -46 : -8) + 6, cx + 6, (sl ? -46 : -8) + 14); g.lineTo(cx + 2, (sl ? -46 : -8) + 2); g.closePath(); g.fill(); g.stroke(); } }
    else paint(() => E(38, -6, 9, 6), c, d, { lw: 1.6 });
    bodyGrafts(k, B, 'front');
    return { head: [10, -106, 1.1 * (k.hs || 1)], B };
  },
  peng(k) {
    const c = k.col, d = dk(c, .3), s = 1;
    shadow(0, 0, 34, 5);
    const B = { s, back: [-14, -70], belly: [6, -34], chest: [14, -56], neck: [4, -80], topLine: [[-20, -60], [-12, -78], [4, -88]], box: [-30, -90, 60, 90] };
    paint(() => { E(-10, -3, 10, 4); E(10, -3, 10, 4); }, '#f08a3a', '#c06020', { lw: 1.4 });
    bodyGrafts(k, B, 'back');
    paint(() => S([[0, -90], [22, -76], [30, -40], [24, -6], [0, 0], [-24, -6], [-30, -40], [-22, -76]], .9), c, d, { sx: -4, sy: -4, tex: () => { skinTex(k, -32, -92, 64, 92); g.fillStyle = k.belly || '#f6f4ee'; g.beginPath(); E(6, -38, 18, 32); g.fill(); } });
    if (!(k.bodyGrafts || []).includes('flippers')) { paint(() => E(-26, -46, 7, 22, .35), c, d, { lw: 1.6 }); paint(() => E(26, -46, 7, 22, -.35), c, d, { lw: 1.6 }); }
    bodyGrafts(k, B, 'front');
    return { head: [2, -96, 1 * (k.hs || 1)], B };
  },
  perch(k) {
    const c = k.col, d = dk(c, .25), s = .9;
    shadow(0, 0, 30, 4);
    const B = { s, back: [-8, -70], belly: [4, -36], chest: [12, -60], neck: [6, -82], topLine: [[-18, -50], [-10, -72], [6, -84]], box: [-26, -88, 50, 70] };
    for (const x of [-4, 8]) rLeg(x, -24, 9, c, 'bird', x < 0, { legCol: '#f4c13a' });
    rTail('fan', -16, -28, 1, k.tailCol || c);
    paint(() => S([[-20, -30], [-24, -60], [-8, -86], [12, -84], [22, -60], [16, -30], [0, -20]], .9), c, d, { sx: -3, sy: -4, tex: () => torsoTex(k, -26, -90, 50, 72) });
    if (!(k.bodyGrafts || []).includes('wings')) paint(() => S([[-18, -34], [-22, -66], [-4, -80], [8, -62], [2, -36]], .8), dk(c, .12), dk(c, .35), { lw: 1.6, tex: () => { g.strokeStyle = 'rgba(255,230,190,.3)'; g.lineWidth = 1.1; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-16 + i * 3, -38); g.lineTo(-10 + i * 4, -70); g.stroke(); } } });
    bodyGrafts(k, B, 'front');
    return { head: [8, -96, .95 * (k.hs || 1)], B };
  },
  runner(k) {
    const c = k.col, d = dk(c, .25), s = .8;
    shadow(0, 0, 34, 4);
    const B = { s, back: [-4, -60], belly: [0, -38], chest: [20, -48], neck: [22, -60], topLine: [[-20, -52], [-4, -62], [14, -62]], box: [-28, -64, 56, 30] };
    for (const x of [-2, 10]) rLeg(x, -40, 9, c, 'bird', x < 0, { legCol: '#5a7a9a' });
    rTail(k.tail === 'rattle' ? 'rattle' : 'long', -22, -48, 1, k.tailCol || dk(c, .1));
    paint(() => S([[-26, -50], [-6, -62], [18, -60], [28, -50], [20, -38], [-4, -36], [-24, -40]], .9), c, d, { sx: -3, sy: -3, tex: () => { torsoTex(k, -28, -64, 58, 30); g.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 8; i++) { g.beginPath(); E(-18 + i * 5, -46 + (i % 2) * 4, 2, 1); g.fill(); } } });
    bodyGrafts(k, B, 'front');
    limb([[20, -54], [26, -64], [28, -72]], 9, c);
    return { head: [28, -78, .85 * (k.hs || 1)], B };
  },
  flamingo(k) {
    const c = k.col, d = dk(c, .22), s = .8;
    shadow(0, 0, 26, 4);
    const B = { s, back: [-8, -108], belly: [0, -84], chest: [14, -96], neck: [16, -104], topLine: [[-24, -100], [-8, -110], [10, -108]], box: [-30, -112, 56, 30] };
    limb([[0, -84], [-2, -40], [0, -2]], 3.4, k.legCol || '#e8708a'); limb([[4, -84], [18, -60], [2, -56]], 3.4, dk(k.legCol || '#e8708a', .15));
    g.save(); g.strokeStyle = INK; g.lineWidth = 3.4 + 2; g.beginPath(); g.moveTo(-6, -1); g.lineTo(6, -1); g.stroke(); g.restore();
    bodyGrafts(k, B, 'back');
    paint(() => S([[-30, -96], [-10, -110], [16, -106], [24, -96], [10, -84], [-14, -84]], .9), c, d, { sx: -3, sy: -3, tex: () => torsoTex(k, -32, -112, 58, 30) });
    paint(() => { g.moveTo(-30, -96); g.lineTo(-40, -100); g.lineTo(-34, -92); g.lineTo(-40, -88); g.lineTo(-26, -90); g.closePath(); }, '#2a2a2a', null, { lw: 1 });
    limb([[16, -102], [28, -120], [14, -140], [16, -152]], 7, c);
    bodyGrafts(k, B, 'front');
    return { head: [18, -160, .8 * (k.hs || 1)], B };
  },
  serpent(k) {
    const c = k.col, d = dk(c, .3), s = 1;
    const pts = k.coil || [[-90, -16], [-60, -34], [-20, -24], [10, -10], [40, -20], [30, -50], [-6, -62], [-14, -86], [10, -104], [38, -100]];
    shadow(-10, 0, 90, 8, .3);
    const samp = []; { const n = pts.length; for (let i = 0; i < n - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)]; for (let t = 0; t < 1; t += .05) { const t2 = t * t, t3 = t2 * t; samp.push([.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3), .5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } } samp.push(pts[n - 1]); }
    const B = { s, back: samp[Math.floor(samp.length * .55)], belly: samp[Math.floor(samp.length * .4)], chest: samp[samp.length - 12], neck: samp[samp.length - 4], topLine: [], box: [-100, -110, 150, 110] };
    for (let i = 6; i < samp.length - 8; i += 14) B.topLine.push([samp[i][0], samp[i][1] - 10]);
    if (k.serpLegs) for (const i of [20, 60, 100, 140]) { const [lx, ly] = samp[Math.min(i, samp.length - 1)]; rLeg(lx, ly + 8, 9, c, k.foot || 'paw', false, {}); }
    bodyGrafts(k, B, 'back');
    const [tx, ty] = samp[0];
    if (k.tail === 'rattle') rattleTip(tx - 2, ty, 1);
    const W = k.thick || 24;
    const tube = (w, col) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(samp[0][0], samp[0][1]); for (const p of samp) g.lineTo(p[0], p[1]); g.stroke(); };
    g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; tube(W + 5, INK); tube(W, d); g.translate(-1.5, -3); tube(W - 8, c); g.translate(-1, -2.5); tube(W * .3, lt(c, .3)); g.restore();
    for (let i = 6; i < samp.length - 8; i += 7) { const [px, py] = samp[i], [qx, qy] = samp[i + 1]; const an = Math.atan2(qy - py, qx - px); g.save(); g.translate(px, py); g.rotate(an); g.fillStyle = k.patCol || dk(c, .45); g.beginPath(); if (k.pat === 'diamond') { g.moveTo(-6, 0); g.lineTo(0, -W * .4); g.lineTo(6, 0); g.lineTo(0, W * .4); } else { g.moveTo(-6, -W * .35); g.quadraticCurveTo(0, -W * .15, 6, -W * .35); g.quadraticCurveTo(8, 0, 6, W * .33); g.quadraticCurveTo(0, W * .15, -6, W * .33); g.quadraticCurveTo(-8, 0, -6, -W * .35); } g.closePath(); g.fill(); g.strokeStyle = lt(c, .45); g.lineWidth = 1; g.stroke(); g.restore(); }
    bodyGrafts(k, B, 'front');
    const [hx, hy] = samp[samp.length - 1];
    return { head: [hx + 4, hy, 1.05 * (k.hs || 1)], B };
  },
  octo(k) {
    const c = k.col, d = dk(c, .25), s = 1;
    shadow(0, 0, 50, 6);
    const B = { s, back: [-8, -44], belly: [0, -22], chest: [10, -30], neck: [0, -34], topLine: [[-14, -40], [0, -46], [14, -40]], box: [-40, -50, 80, 50] };
    bodyGrafts(k, B, 'back');
    for (let i = 0; i < 8; i++) { const far = i % 2 === 0, x = -30 + i * 8.5, ph = i * 1.3; const pts = [[x * .4, -26], [x * .9 + Math.sin(ph) * 6, -14], [x * 1.3 + Math.cos(ph) * 8, -4], [x * 1.5 + (x > 0 ? 10 : -10), -6 - Math.abs(Math.sin(ph)) * 8]]; limb(pts, far ? 7 : 9, far ? dk(c, .2) : c); g.save(); g.fillStyle = '#f6c8c8'; for (let j = 1; j < 4; j++) { g.beginPath(); C(pts[j][0], pts[j][1] + 3, 1.6); g.fill(); } g.restore(); }
    if (k.headType !== 'octo') paint(() => E(0, -26, 24, 16), c, d, { sx: -2, sy: -3, tex: () => torsoTex(k, -26, -44, 52, 36) });
    bodyGrafts(k, B, 'front');
    return { head: [0, k.headType === 'octo' ? -30 : -46, 1.05 * (k.hs || 1)], B };
  },
  spider(k) {
    const c = k.col, d = dk(c, .25), s = 1;
    shadow(0, 0, 50, 5);
    const B = { s, back: [-20, -50], belly: [-20, -16], chest: [10, -24], neck: [8, -30], topLine: [[-40, -40], [-24, -54], [-6, -46]], box: [-50, -56, 70, 50] };
    const legs = (far) => { for (let i = 0; i < 4; i++) { const bx = 2 + i * 2, a = -.9 + i * .6; const kx = bx + Math.cos(a) * 26 + (far ? -6 : 6), ky = -46 + i * 3; limb([[bx, -26], [kx, ky], [kx + (i < 2 ? 14 : -14) * (far ? .8 : 1), -2]], far ? 4.5 : 5.5, far ? dk(c, .25) : c); if (k.socks && !far) paint(() => RR(kx + (i < 2 ? 10 : -16), -10, 8, 8, 2), ['#e04a3a', '#3fb0e0', '#f4c542', '#7ad04a'][i], null, { lw: 1 }); } };
    legs(true);
    paint(() => tuft(-24, -30, 26, 22, 16, .14), c, d, { sx: -3, sy: -3, tex: () => { torsoTex(k, -52, -54, 56, 50); fur(-50, -54, 54, 50, lt(c, .3), 50, 6, -1.5, 1, .5); } });
    legs(false);
    bodyGrafts(k, B, 'front');
    return { head: [10, -28, .9 * (k.hs || 1)], B };
  }
};
function drawCreature(kit, blink) {
  seed = kit.seed || 7; BLINK = !!blink;
  const r = PLANS[kit.plan](kit);
  const [hx, hy, hs] = r.head;
  drawHead(kit, hx + (kit.hdx || 0) * hs, hy + (kit.hdy || 0) * hs, hs * (kit.hrel || 1));
  if (kit.isMash) for (let i = 0; i < 5; i++) sparkle(r.B.box[0] + rnd() * r.B.box[2], r.B.box[1] - 10 + rnd() * r.B.box[3], 1.6 + rnd() * 1.4, '#c8fff6', .85);
  BLINK = false;
}
/* ---------- sprite cache ---------- */
const SPR = new Map();
const tmpCv = document.createElement('canvas'); tmpCv.width = 1000; tmpCv.height = 820; const tmpG = tmpCv.getContext('2d', { willReadFrequently: true });
function renderSprite(kit, blink) {
  const rs = kit.rs || 1.7, OX = 500, OY = 760;
  const old = g; g = tmpG; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 1000, 820);
  g.translate(OX, OY); g.scale(rs, rs); g.lineJoin = 'round'; g.lineCap = 'round';
  try { drawCreature(kit, blink); } catch (e) { console.warn('sprite fail', kit.id, e); }
  g = old;
  const id = tmpG.getImageData(0, 0, 1000, 820).data; let x0 = 1000, y0 = 820, x1 = 0, y1 = 0;
  for (let y = 0; y < 820; y += 2) { const row = y * 4000; for (let x = 0; x < 1000; x += 2) if (id[row + x * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
  if (x1 < x0) { x0 = 0; y0 = 0; x1 = 10; y1 = 10; }
  x0 = Math.max(0, x0 - 4); y0 = Math.max(0, y0 - 4); x1 = Math.min(999, x1 + 4); y1 = Math.min(819, y1 + 4);
  const w = x1 - x0, h = y1 - y0, c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(tmpCv, x0, y0, w, h, 0, 0, w, h);
  return { c, w, h, ax: OX - x0, ay: OY - y0, rs };
}
function getSprite(kit) {
  const key = kit.key || kit.id; let s = SPR.get(key);
  if (!s) { s = { a: renderSprite(kit, false), b: null, kit }; SPR.set(key, s); }
  return s;
}
function getBlink(s) { if (!s.b) s.b = renderSprite(s.kit, true); return s.b; }
// draw sprite fit into a box: center x, bottom y, max w/h, extra transforms
function drawSpr(s, cx, by, mw, mh, o = {}) {
  const f = (o.blink ? getBlink(s) : s.a); const sc = Math.min(mw / f.w, mh / f.h) * (o.mul || 1);
  g.save(); g.translate(cx, by); if (o.rot) g.rotate(o.rot); g.scale(sc * (o.flip ? -1 : 1) * (o.sqx || 1), sc * (o.sqy || 1));
  if (o.alpha !== undefined) g.globalAlpha = o.alpha;
  g.drawImage(f.c, -f.w / 2, -f.h); g.restore();
  return sc;
}
