/* ===================== HEADS + HEAD GRAFTS ===================== */
function ear(type, x, y, k, c, inner, s = 1) {
  const d = dk(c, .25);
  if (type === 'up' || type === 'bat' || type === 'cat' || type === 'small' || type === 'roo' || type === 'rabbit') {
    const L = { up: 17, bat: 30, cat: 14, small: 8, roo: 22, rabbit: 40 }[type] * s, wd = { up: 8, bat: 11, cat: 9, small: 7, roo: 7, rabbit: 8 }[type] * s, out = { up: .25, bat: .9, cat: .35, small: .4, roo: .3, rabbit: .12 }[type];
    const tx = x + k * L * out, ty = y - L;
    paint(() => { g.moveTo(x - wd, y + 3); g.quadraticCurveTo(tx - k * wd * .4 - wd * .2, (y + ty) / 2, tx, ty); g.quadraticCurveTo(tx + wd * .4, (y + ty) / 2 + 2, x + wd, y + 3); g.closePath(); }, c, d, { lw: 1.8, sx: k * 1.5, sy: 1, tex: () => { if (inner) { g.fillStyle = inner; g.beginPath(); g.moveTo(x - wd * .5, y + 2); g.quadraticCurveTo(tx - k * wd * .2, (y + ty) / 2 + 2, tx + (x - tx) * .12, ty + L * .16); g.quadraticCurveTo(tx + wd * .2, (y + ty) / 2 + 4, x + wd * .5, y + 2); g.fill(); } } });
  } else if (type === 'flop' || type === 'long') {
    const L = (type === 'long' ? 40 : 18) * s, wd = (type === 'long' ? 9 : 8) * s;
    paint(() => S([[x - wd * .3, y - 4], [x + wd * .7, y - 2], [x + k * 2 + wd * .6, y + L * .6], [x + k * 4, y + L], [x + k * 4 - wd, y + L * .9], [x - wd * .9, y + L * .4]], .8), d, dk(c, .45), { lw: 1.8, sx: 1, sy: -1, tex: () => fur(x - 10, y - 4, 20, L + 6, dk(c, .55), 14, 5, 1.5, 1, .35) });
  } else if (type === 'fold') {
    paint(() => { g.moveTo(x - 7 * s, y + 2); g.quadraticCurveTo(x + k * 4, y - 9 * s, x + k * 11 * s, y - 2); g.quadraticCurveTo(x + k * 9 * s, y + 6 * s, x + k * 2, y + 6 * s); g.closePath(); }, dk(c, .45), dk(c, .6), { lw: 1.6 });
  } else if (type === 'round') { paint(() => C(x, y - 3 * s, 6 * s), c, d, { lw: 1.6, tex: () => { if (inner) { g.fillStyle = inner; g.beginPath(); C(x, y - 3 * s, 3 * s); g.fill(); } } }); }
}
const HEADS = {
  dog: {
    an: p => ({ top: [-2, -21], nose: [22 + (p.snout ?? .5) * 12, 3], mouth: [16 + (p.snout ?? .5) * 8, 12], back: [-18, -8], chin: [6, 17] }),
    draw(p) {
      const c = p.col, d = dk(c, .25), m = p.muz || lt(c, .5), sn = p.snout ?? .5, et = p.ears || 'up', inner = '#eaa4a0';
      const up = et === 'up' || et === 'bat';
      if (up) { ear(et, -12, -14, -1, c, inner, p.earS || 1); ear(et, 10, -17, 1, c, inner, p.earS || 1); }
      paint(() => S([[0, -21], [15, -17], [21, -4], [17, 12], [2, 18], [-14, 14], [-21, -2], [-15, -16]], .9), c, d, { sx: -3, sy: -3, tex: () => { if (p.mask) { g.fillStyle = p.mask; g.beginPath(); E(-4, -16, 17, 9, -.15); g.fill(); } if (p.spot) { g.fillStyle = p.spot; g.beginPath(); E(-10, -4, 8, 10, .3); g.fill(); } if (p.blaze) { g.fillStyle = m; g.beginPath(); E(4, -12, 4, 10, .2); g.fill(); } if (!p.bald) fur(-22, -22, 44, 40, dk(c, .35), 40, 4, 1.4, 1, .3); if (p.wrinkle) wrinkles([[[-8, -14], [0, -17], [8, -14]], [[-6, -10], [2, -12], [10, -9]], [[2, -6], [8, -3]]], 'rgba(40,20,10,.5)', 1.6); if (p.grey) { g.fillStyle = 'rgba(230,230,225,.55)'; g.beginPath(); E(14, 8, 12, 9); g.fill(); } }, hi: () => hiBlob(-6, -12, 7, 4, .22) });
      const mx = 11 + sn * 9, mrx = 8 + sn * 8, mry = 8 - sn;
      paint(() => E(mx, 7, mrx, mry, .08), m, dk(m, .15), { sx: -1, sy: -2, lw: 1.8, tex: () => { if (p.grey) { g.fillStyle = 'rgba(235,235,230,.6)'; g.beginPath(); E(mx, 9, mrx, mry * .8); g.fill(); } } });
      const nx = mx + mrx - 3;
      paint(() => E(nx, 2.5 + sn, 4.4, 3.3), '#2a1a12', null, { lw: 1, hi: () => hiBlob(nx - 1.3, 1.4 + sn, 1.6, .9, .7) });
      if (p.grin) { const mouth = () => { g.moveTo(mx - mrx * .6, 9); g.quadraticCurveTo(mx + 2, 10, nx + 2, 8); g.quadraticCurveTo(nx, 20, mx + 2, 21); g.quadraticCurveTo(mx - mrx * .5, 18, mx - mrx * .6, 9); g.closePath(); }; paint(mouth, '#7a1f2a', null, { lw: 1.3 }); g.save(); g.beginPath(); mouth(); g.clip(); g.fillStyle = '#fff'; g.fillRect(mx - 12, 8, 30, 3.4); g.fillStyle = '#f07a8a'; g.beginPath(); E(mx + 2, 21, 6, 4); g.fill(); g.restore(); }
      else { line([[mx - 3, 12], [mx + 2, 14], [nx, 11]], INK, 1.4); }
      if (p.tongue) paint(() => { g.moveTo(mx, 13); g.quadraticCurveTo(mx + 6, 13, mx + 6, 19); g.quadraticCurveTo(mx + 3, 24, mx, 19); g.closePath(); }, '#f07a8a', '#d0566a', { lw: 1.2 });
      const er = p.er || 5;
      eye(-4, -5, er, p.eye || '#4a2a14', { lx: .25, ly: .1, lidCol: c, ir: p.ir || .62, puddle: p.puddle, lid: p.lid, }); eye(11, -6, er * .92, p.eye || '#4a2a14', { lx: .25, ly: .1, lidCol: c, ir: p.ir || .62, puddle: p.puddle, lid: p.lid });
      if (p.brows !== false) { line([[-10, -12], [-5, -14.5 - (p.browUp || 0)], [0, -12.5]], dk(c, .5), 2.6); line([[6, -13.5], [11, -15.5 - (p.browUp || 0)], [15, -13]], dk(c, .5), 2.6); }
      if (!up) { ear(et, -14, -12, -1, c, inner, p.earS || 1); if (et !== 'long') ear(et, 13, -14, 1, c, inner, p.earS || 1); else ear(et, 10, -12, 1, c, inner, p.earS || 1); }
      if (p.bugEyes) { g.save(); g.strokeStyle = 'rgba(80,140,60,.7)'; g.lineWidth = 1.2; g.beginPath(); C(-4, -5, er + 2); C(11, -6, er + 2); g.stroke(); g.restore(); }
    }
  },
  cat: {
    an: p => ({ top: [0, -18], nose: [2, 3], mouth: [2, 9], back: [-20, -4], chin: [2, 16] }),
    draw(p) {
      const c = p.col, d = dk(c, .25), m = p.muz || '#fbeedd', es = p.ears || 'cat';
      ear(es, -12, -12, -1, c, p.sphynx ? '#e9a9a0' : '#f2a8a0', p.earS || 1); ear(es, 12, -12, 1, c, p.sphynx ? '#e9a9a0' : '#f2a8a0', p.earS || 1);
      const shape = () => p.flat ? tuft(0, -1, 23, 18, 12, .1, .2) : S([[0, -18], [15, -15], [22, -2], [18, 11], [0, 16], [-18, 11], [-22, -2], [-15, -15]], .9);
      paint(shape, c, d, { sx: -3, sy: -3, tex: () => {
        if (p.stripes) { g.fillStyle = p.stripes; for (const dx of [-6, 0, 6]) { g.beginPath(); g.moveTo(dx - 2, -19); g.lineTo(dx * .7, -9); g.lineTo(dx + 2, -19); g.fill(); } for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(k * 23, -6 + i * 6); g.lineTo(k * 14, -4 + i * 6); g.lineTo(k * 23, -2 + i * 6); g.fill(); } }
        if (p.tux) { g.fillStyle = '#f8f4ec'; g.beginPath(); g.moveTo(-10, 16); g.quadraticCurveTo(-8, 0, 0, -6); g.quadraticCurveTo(8, 0, 10, 16); g.fill(); }
        if (p.cheeks) { g.fillStyle = p.cheeks; g.beginPath(); E(-12, 7, 9, 7); E(12, 7, 9, 7); g.fill(); }
        if (p.skunk) { g.fillStyle = '#f6f2ea'; g.beginPath(); E(0, -14, 3.5, 10); g.fill(); }
        if (p.sphynx) wrinkles([[[-8, -14], [0, -16], [8, -14]], [[-6, -10], [0, -11], [6, -10]]], 'rgba(120,60,50,.45)', 1.4);
        else if (p.flat) fur(-24, -20, 48, 38, d, 50, 5, 1.4, 1, .35);
        else fur(-22, -20, 44, 36, d, 20, 3, 1.4, 1, .25);
      }, hi: () => hiBlob(-7, -10, 7, 4, .22) });
      paint(() => { E(-4, 6, 6, 4.6); E(4, 6, 6, 4.6); }, m, dk(m, .12), { lw: 1.2, sx: 0, sy: -1 });
      paint(() => { g.moveTo(-3, 2); g.lineTo(3, 2); g.lineTo(0, 5); g.closePath(); }, '#f08a9a', null, { lw: 1 });
      if (p.fangs) { g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = .9; for (const k of [-1, 1]) { g.beginPath(); g.moveTo(k * 3.5, 9); g.lineTo(k * 2.5, 14); g.lineTo(k * 1.5, 9); g.fill(); g.stroke(); } }
      line([[-5, 10], [0, 9], [5, 10]], INK, 1.2);
      const er = p.er || 5.5, eo = { ir: p.ir || .5, lx: 0, ly: .05, slit: p.slit, lidCol: c, lid: p.lid, lidTilt: p.lidTilt, puddle: p.puddle };
      eye(-8, -4, er, p.eye || '#9ab84a', eo); eye(8, -4, er, p.eye || '#9ab84a', Object.assign({}, eo, { lidTilt: -(p.lidTilt || 0) }));
      g.save(); g.strokeStyle = 'rgba(40,20,10,.55)'; g.lineWidth = .8; for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(k * 8, 6 + i * 1.5); g.lineTo(k * 24, 3 + i * 4); g.stroke(); } g.restore();
      if (p.brows) { line([[-13, -11], [-8, -13], [-4, -11]], dk(c, .5), 2); line([[4, -11], [8, -13], [13, -11]], dk(c, .5), 2); }
    }
  },
  rhino: {
    an: p => ({ top: [0, -17], nose: [30, -2], mouth: [26, 13], back: [-14, -6], chin: [12, 15] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      ear('up', -8, -13, -1, c, '#e9a3a0', .8);
      paint(() => S([[-14, -14], [4, -17], [20, -10], [34, 0], [37, 11], [24, 16], [4, 14], [-14, 8]], .9), c, d, { sx: -3, sy: -3, tex: () => { wrinkles([[[2, 2], [8, 10]], [[14, 4], [20, 10]], [[-6, -4], [-2, 6]]], 'rgba(40,40,50,.35)', 1.4); } });
      eye(8, -4, 4.4, p.eye || '#5a3a20', { ir: .6, lidCol: c, puddle: p.puddle });
      line([[30, 8], [35, 8]], INK, 1.4); line([[22, 13], [30, 14]], INK, 1.3);
      line([[2, -11], [8, -12], [13, -10]], dk(c, .5), 2.2);
    }
  },
  ele: {
    an: p => ({ top: [0, -24], nose: [0, 10], mouth: [0, 15], back: [-20, -2], chin: [0, 18] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      paint(() => S([[0, -25], [17, -20], [22, -2], [14, 14], [0, 18], [-14, 14], [-22, -2], [-17, -20]], .9), c, d, { sx: -3, sy: -3, tex: () => { if (p.wool) fur(-24, -26, 48, 44, dk(c, .3), 60, 7, 1.6, 1.4, .5); else wrinkles([[[-10, -16], [0, -18], [10, -16]], [[-8, -12], [0, -13], [8, -12]]], 'rgba(40,40,50,.3)', 1.3); if (p.wool) { g.fillStyle = dk(c, .15); g.beginPath(); tuft(0, -22, 12, 6, 7, .4); g.fill(); } }, hi: () => hiBlob(-7, -14, 7, 4, .2) });
      eye(-9, -4, 4.6, p.eye || '#3a2a20', { lidCol: c, puddle: p.puddle, lid: p.lid }); eye(9, -4, 4.6, p.eye || '#3a2a20', { lidCol: c, puddle: p.puddle, lid: p.lid });
      line([[-13, -11], [-9, -12.5], [-5, -11]], dk(c, .5), 2); line([[5, -11], [9, -12.5], [13, -11]], dk(c, .5), 2);
      if (p.pink) { hiBlob(-13, 4, 4, 2.5, .4, 0, '#ff8a9a'); hiBlob(13, 4, 4, 2.5, .4, 0, '#ff8a9a'); }
    }
  },
  hippo: {
    an: p => ({ top: [-6, -20], nose: [24, -6], mouth: [20, 14], back: [-18, -6], chin: [12, 18] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      ear('round', -14, -16, -1, c, '#e98a9a', 1); ear('round', 0, -19, 1, c, '#e98a9a', 1);
      paint(() => S([[-6, -20], [8, -18], [14, -10], [-2, 4], [-18, 2], [-20, -10]], .9), c, d, { sx: -2, sy: -3 });
      paint(() => S([[-4, -8], [16, -14], [32, -8], [36, 6], [28, 18], [6, 20], [-10, 12], [-12, 0]], .9), c, d, { sx: -3, sy: -3, tex: () => { g.fillStyle = 'rgba(255,170,190,.45)'; g.beginPath(); E(14, 12, 16, 7); g.fill(); g.fillStyle = 'rgba(40,30,50,.15)'; for (let i = 0; i < 12; i++) { g.beginPath(); C(R(4, 30), R(-6, 10), 1); g.fill(); } } });
      for (const nx of [20, 29]) { g.fillStyle = '#3a2a30'; g.beginPath(); E(nx, -9, 2.4, 1.6, .3); g.fill(); }
      line([[2, 12], [16, 16], [32, 10]], INK, 1.4);
      g.fillStyle = '#fffaf0'; g.strokeStyle = INK; g.lineWidth = 1; for (const tx of [8, 26]) { g.beginPath(); RR(tx, 12, 4, 6, 1.5); g.fill(); g.stroke(); }
      eye(-6, -11, 4.6, p.eye || '#5a3020', { lidCol: c, lid: .3, puddle: p.puddle }); eye(5, -12, 4.3, p.eye || '#5a3020', { lidCol: c, lid: .3, puddle: p.puddle });
      if (p.lashes) { line([[-10, -15], [-12, -18]], INK, 1.2); line([[2, -16], [1, -19]], INK, 1.2); }
    }
  },
  gator: {
    an: p => ({ top: [-2, -12], nose: [52, -4], mouth: [30, 6], back: [-16, -4], chin: [10, 8] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      paint(() => S([[-16, -8], [-4, -12], [20, -9], [48, -8], [58, -3], [56, 4], [20, 8], [-12, 8]], .9), c, d, { sx: -2, sy: -3, tex: () => { scales(-18, -14, 76, 24, dk(c, .4), 6, .5); g.fillStyle = lt(c, .4); g.fillRect(-18, 4, 80, 8); } });
      for (const ex of [2]) { paint(() => E(ex, -13, 8.5, 7.5), c, d, { lw: 1.6 }); eye(ex, -14, 5.8, p.eye || '#d8b82e', { ir: .45, slit: true, lid: .3, lidCol: c, puddle: p.puddle }); }
      g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = .8; for (let i = 10; i < 54; i += 6) { g.beginPath(); g.moveTo(i, 3); g.lineTo(i + 2, 7.5); g.lineTo(i + 4, 3); g.fill(); g.stroke(); }
      line([[-6, 4], [56, 2]], INK, 1.4); g.fillStyle = '#2a2a1a'; g.beginPath(); C(54, -5, 1.4); g.fill();
      if (p.lashes) { line([[-2, -18], [-4, -22]], INK, 1.2); line([[3, -19], [3, -23]], INK, 1.2); line([[7, -18], [9, -22]], INK, 1.2); }
    }
  },
  lizard: {
    an: p => ({ top: [0, -14], nose: [30, 0], mouth: [24, 8], back: [-14, -4], chin: [10, 10] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      paint(() => S([[-14, -6], [0, -14], [20, -12], [32, -4], [32, 4], [18, 10], [-12, 8]], .9), c, d, { sx: -2, sy: -3, tex: () => skinTex({ col: c, pat: p.pat, skin: 'scales' }, -16, -16, 50, 28) });
      eye(10, -6, 4.2, p.eye || '#1a1a1a', { ir: .7, lid: .5, lidCol: c, lidTilt: 1.5, puddle: p.puddle });
      line([[4, 6], [30, 3]], INK, 1.4); line([[4, -11], [10, -12], [16, -10]], INK, 2.2);
      if (p.tongue) paint(() => { g.moveTo(30, 3); g.lineTo(42, 4); g.lineTo(46, 1); g.lineTo(43, 5); g.lineTo(46, 9); g.lineTo(41, 6); g.lineTo(30, 5); g.closePath(); }, '#e0457b', null, { lw: .9 });
    }
  },
  trex: {
    an: p => ({ top: [0, -20], nose: [40, -8], mouth: [30, 10], back: [-16, -8], chin: [14, 16] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      paint(() => S([[-16, -12], [0, -21], [26, -18], [42, -10], [44, 2], [38, 10], [14, 16], [-12, 10]], .9), c, d, { sx: -3, sy: -3, tex: () => { scales(-18, -24, 64, 42, dk(c, .4), 7, .4); g.fillStyle = lt(c, .35); g.beginPath(); E(16, 14, 22, 5, .05); g.fill(); } });
      g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = .9; for (let i = 12; i < 42; i += 5) { g.beginPath(); g.moveTo(i, 5); g.lineTo(i + 2, 10); g.lineTo(i + 4, 5); g.fill(); g.stroke(); }
      line([[4, 5], [40, 3]], INK, 1.6);
      eye(10, -9, 5, p.eye || '#e8a020', { ir: .55, lidCol: c, puddle: p.puddle }); line([[2, -16], [10, -17], [18, -13]], dk(c, .55), 3);
      g.fillStyle = dk(c, .5); g.beginPath(); C(38, -8, 1.6); g.fill();
    }
  },
  tri: {
    an: p => ({ top: [-2, -18], nose: [34, -6], mouth: [28, 8], back: [-14, -6], chin: [12, 12], brow: [8, -14] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      paint(() => S([[-14, -10], [2, -16], [22, -12], [34, -4], [38, 4], [28, 10], [6, 12], [-12, 6]], .9), c, d, { sx: -3, sy: -3, tex: () => scales(-16, -18, 56, 30, dk(c, .4), 7, .35) });
      paint(() => { g.moveTo(30, -2); g.quadraticCurveTo(44, 0, 42, 10); g.quadraticCurveTo(36, 8, 28, 9); g.closePath(); }, '#d8c49a', '#a8946a', { lw: 1.5 });
      eye(8, -5, 4.4, p.eye || '#4a3020', { lidCol: c, puddle: p.puddle }); line([[4, 4], [28, 6]], INK, 1.3);
    }
  },
  snake: {
    an: p => ({ top: [0, -10], nose: [30, -2], mouth: [26, 5], back: [-12, -2], chin: [8, 8] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      if (p.tongue !== false) paint(() => { g.moveTo(28, 4); g.lineTo(40, 6); g.lineTo(45, 2); g.lineTo(42, 7); g.lineTo(45, 11); g.lineTo(39, 8); g.lineTo(28, 6); g.closePath(); }, '#e0457b', null, { lw: .9 });
      paint(() => S([[-12, -4], [0, -11], [18, -10], [32, -4], [32, 3], [16, 8], [-10, 6]], .9), c, d, { sx: -2, sy: -3, tex: () => { scales(-14, -14, 50, 26, dk(c, .4), 6, .4); if (p.cap) { g.fillStyle = p.cap; g.beginPath(); E(8, -8, 16, 4); g.fill(); } } });
      eye(12, -4, 4.4, p.eye || '#d8a020', { ir: .5, slit: true, lidCol: c, puddle: p.puddle }); line([[6, -9], [12, -10], [17, -8]], INK, 2);
      line([[8, 4], [30, 2]], INK, 1.2);
    }
  },
  bird: {
    an: p => ({ top: [-2, -18], nose: [30, 0], mouth: [26, 4], back: [-16, -4], chin: [6, 14] }),
    draw(p) {
      const c = p.col, d = dk(c, .22), bk = p.beakCol || '#f4c13a', b = p.beak || 'hook';
      paint(() => S([[-4, -18], [12, -16], [20, -6], [18, 8], [4, 15], [-12, 10], [-17, -4]], .9), c, d, { sx: -3, sy: -3, tex: () => { skinTex({ col: c, skin: 'feather' }, -18, -18, 40, 34); if (p.patch) { g.fillStyle = p.patch; g.beginPath(); E(14, -4, 7, 4, -.2); g.fill(); } } });
      if (b === 'hook') paint(() => { g.moveTo(16, -8); g.quadraticCurveTo(36, -10, 40, 6); g.quadraticCurveTo(38, 14, 32, 12); g.quadraticCurveTo(32, 4, 18, 6); g.closePath(); }, bk, dk(bk, .25), { lw: 1.8, sx: -1, sy: -2 });
      else if (b === 'long') paint(() => { g.moveTo(16, -6); g.lineTo(46, -1); g.lineTo(46, 2); g.lineTo(17, 5); g.closePath(); }, bk, dk(bk, .25), { lw: 1.6 });
      else if (b === 'bent') { paint(() => { g.moveTo(15, -6); g.quadraticCurveTo(30, -8, 34, 0); g.quadraticCurveTo(38, 10, 32, 18); g.quadraticCurveTo(28, 10, 16, 6); g.closePath(); }, bk, dk(bk, .25), { lw: 1.6, tex: () => { g.fillStyle = '#222'; g.beginPath(); g.moveTo(31, 4); g.lineTo(40, 6); g.lineTo(33, 20); g.closePath(); g.fill(); } }); }
      else paint(() => { g.moveTo(16, -4); g.lineTo(30, 1); g.lineTo(16, 5); g.closePath(); }, bk, dk(bk, .25), { lw: 1.5 });
      eye(8, -5, 4.8, p.eye || '#e3a21a', { ir: .55, lid: p.lid ?? .25, lidCol: c, lidTilt: 1.4, puddle: p.puddle });
      if (p.fierce) line([[0, -12], [8, -11], [16, -14]], INK, 3);
    }
  },
  ape: {
    an: p => ({ top: [0, -24], nose: [0, 2], mouth: [0, 10], back: [-20, -4], chin: [0, 16] }),
    draw(p) {
      const c = p.col, d = dk(c, .25), f = p.face || '#5a4a48';
      ear('round', -19, -2, -1, f, null, 1); ear('round', 19, -2, 1, f, null, 1);
      paint(() => p.sloth ? tuft(0, -2, 22, 19, 12, .08) : S([[0, -27], [14, -20], [21, -4], [17, 12], [0, 18], [-17, 12], [-21, -4], [-14, -20]], .9), c, d, { sx: -3, sy: -3, tex: () => fur(-22, -28, 44, 46, dk(c, .4), 40, 4, 1.5, 1, .35) });
      paint(() => p.sloth ? E(0, 2, 15, 12) : S([[0, -10], [12, -12], [15, 0], [10, 13], [0, 16], [-10, 13], [-15, 0], [-12, -12]], .9), f, dk(f, .2), { lw: 1.6, sx: -1, sy: -2, tex: () => { if (p.sloth) { g.fillStyle = '#4a3828'; g.beginPath(); E(-7, -1, 7, 4, -.4); E(7, -1, 7, 4, .4); g.fill(); } } });
      if (!p.sloth) paint(() => E(0, -8, 13, 4), dk(f, .2), null, { lw: 1.4 });
      eye(-6, -2, 3.6, p.eye || '#3a2010', { lidCol: f, lid: p.sloth ? .45 : .1, puddle: p.puddle }); eye(6, -2, 3.6, p.eye || '#3a2010', { lidCol: f, lid: p.sloth ? .45 : .1, puddle: p.puddle });
      g.fillStyle = '#1e1414'; g.beginPath(); E(-2.5, 6, 1.6, 1.2); E(2.5, 6, 1.6, 1.2); g.fill();
      line(p.sloth ? [[-6, 9], [0, 12], [6, 9]] : [[-6, 11], [0, 10], [6, 11]], INK, 1.5);
    }
  },
  rabbit: {
    an: p => ({ top: [0, -18], nose: [2, 4], mouth: [2, 9], back: [-18, -2], chin: [2, 15] }),
    draw(p) {
      const c = p.col, d = dk(c, .25), es = p.ears || 'rabbit';
      ear(es, -8, -12, -1, c, '#f2b0b0', p.earS || 1); ear(es, 8, -13, 1, c, '#f2b0b0', p.earS || 1);
      paint(() => S([[0, -17], [13, -13], [17, 0], [12, 12], [0, 16], [-12, 12], [-17, 0], [-13, -13]], .9), c, d, { sx: -3, sy: -3, tex: () => fur(-18, -18, 36, 34, dk(c, .35), 24, 4, 1.4, 1, .3) });
      paint(() => { E(-4, 6, 6, 5); E(4, 6, 6, 5); }, p.muz || lt(c, .55), null, { lw: 1.2 });
      paint(() => E(0, 2.5, 2.8, 2), '#e0707a', null, { lw: 1 });
      if (p.teeth !== false) paint(() => RR(-3, 10, 6, 5, 1), '#fff', null, { lw: 1 });
      eye(-6, -4, 4.6, p.eye || '#3a2010', { lidCol: c, puddle: p.puddle }); eye(6, -4, 4.6, p.eye || '#3a2010', { lidCol: c, puddle: p.puddle });
    }
  },
  pig: {
    an: p => ({ top: [-2, -18], nose: [30, 2], mouth: [22, 10], back: [-16, -6], chin: [10, 14] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      ear('up', -10, -14, -1, c, '#c08080', .6); ear('up', 2, -16, 1, c, '#c08080', .6);
      paint(() => S([[-16, -10], [0, -18], [18, -10], [30, -4], [32, 8], [20, 13], [0, 14], [-15, 6]], .9), c, d, { sx: -3, sy: -3, tex: () => { skinTex({ col: c, skin: 'bristle' }, -18, -20, 52, 36); g.fillStyle = 'rgba(240,235,220,.55)'; g.beginPath(); E(4, 8, 14, 4, -.2); g.fill(); } });
      paint(() => E(31, 2, 4.5, 7), '#c88a7a', '#9a6050', { lw: 1.6, tex: () => { g.fillStyle = '#4a2a20'; g.beginPath(); E(31, -1, 1.2, 1.6); E(31, 5, 1.2, 1.6); g.fill(); } });
      g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = .9; g.beginPath(); g.moveTo(22, 10); g.lineTo(24, 3); g.lineTo(25, 10); g.fill(); g.stroke();
      eye(8, -6, 4, p.eye || '#2a1810', { lidCol: c, lid: .2, puddle: p.puddle }); line([[2, -12], [8, -13], [14, -11]], INK, 2.2);
    }
  },
  octo: {
    an: p => ({ top: [0, -34], nose: [10, 4], mouth: [8, 10], back: [-20, -12], chin: [0, 16] }),
    draw(p) {
      const c = p.col, d = dk(c, .22);
      paint(() => S([[0, -38], [17, -30], [22, -10], [16, 8], [0, 14], [-16, 8], [-22, -10], [-17, -30]], .9), c, d, { sx: -3, sy: -4, tex: () => { g.fillStyle = lt(c, .25); for (let i = 0; i < 14; i++) { g.beginPath(); C(R(-18, 18), R(-34, 6), R(1, 2.6)); g.fill(); } }, hi: () => hiBlob(-7, -26, 8, 5, .3) });
      eye(-8, -2, 6, p.eye || '#e8b02e', { ir: .45, slit: true, lidCol: c, lid: .15, puddle: p.puddle }); eye(8, -2, 6, p.eye || '#e8b02e', { ir: .45, slit: true, lidCol: c, lid: .15, puddle: p.puddle });
      paint(() => E(14, 8, 3.5, 2.6, .5), d, null, { lw: 1.1 });
      line([[-4, 9], [0, 10], [4, 9]], INK, 1.2);
    }
  },
  spider: {
    an: p => ({ top: [0, -18], nose: [12, 6], mouth: [4, 12], back: [-18, -4], chin: [2, 14] }),
    draw(p) {
      const c = p.col, d = dk(c, .25);
      paint(() => tuft(0, -2, 17, 15, 14, .18), c, d, { sx: -2, sy: -3, tex: () => fur(-20, -20, 40, 36, lt(c, .3), 40, 5, -1.5, 1, .5) });
      const eyes = [[-6, -6, 4.2], [6, -6, 4.2], [-12, -10, 2.4], [12, -10, 2.4], [-3, -12, 2.2], [3, -12, 2.2], [-9, -1, 2], [9, -1, 2]];
      for (const [x, y, r] of eyes) eye(x, y, r, '#2a1a1a', { ir: .75, lidCol: c, puddle: p.puddle });
      for (const k of [-1, 1]) paint(() => { g.moveTo(k * 3, 6); g.quadraticCurveTo(k * 6, 12, k * 3, 16); g.lineTo(k * 1.5, 8); g.closePath(); }, '#3a2a28', null, { lw: 1 });
      line([[-4, 4], [0, 6], [4, 4]], '#f4b0b0', 1.4);
    }
  },
  penguin: {
    an: p => ({ top: [0, -20], nose: [24, 2], mouth: [22, 4], back: [-18, -4], chin: [4, 16] }),
    draw(p) {
      const c = p.col || '#24242e', d = dk(c, .3);
      paint(() => S([[0, -20], [14, -16], [20, -4], [16, 10], [2, 16], [-14, 12], [-19, -4], [-14, -16]], .9), c, d, { sx: -3, sy: -3, tex: () => { g.fillStyle = '#f6f4ee'; g.beginPath(); E(6, 6, 11, 9, -.2); g.fill(); g.fillStyle = '#f7b23a'; g.beginPath(); E(-11, 4, 4, 8, .4); g.fill(); } , hi: () => hiBlob(-6, -12, 7, 4, .25) });
      paint(() => { g.moveTo(15, -2); g.quadraticCurveTo(28, 0, 30, 3); g.quadraticCurveTo(26, 6, 15, 5); g.closePath(); }, '#2a2a2a', null, { lw: 1.4, tex: () => { g.fillStyle = '#f08a3a'; g.fillRect(16, 2, 14, 3); } });
      eye(3, -6, 4.6, p.eye || '#3a2a20', { lidCol: c, puddle: p.puddle }); eye(13, -6, 4.2, p.eye || '#3a2a20', { lidCol: c, puddle: p.puddle });
      line([[-1, -12], [3, -13], [7, -12]], '#ddd', 1.6);
    }
  }
};
/* ---------- head grafts (drawn in head-local coords) ---------- */
const GRAFT_BEHIND = { mane: 1, frill: 1, bigears: 1, antlers: 1, crest: 1, tentamane: 1, horn3: 0 };
function headGraft(id, a, hp, kit) {
  const c = hp.col;
  switch (id) {
    case 'mane': { const mc = hp.maneCol || '#a8641e'; paint(() => tuft(2, 0, 32, 30, 14, .22, .3), mc, dk(mc, .25), { sx: -3, sy: -3, tex: () => fur(-34, -32, 68, 64, dk(mc, .35), 90, 9, 1.2, 1.4, .45) }); break; }
    case 'tentamane': { for (let i = 0; i < 8; i++) { const an = -PI * .95 + i * PI * 1.9 / 7; const x1 = Math.cos(an) * 18, y1 = Math.sin(an) * 18; limb([[x1, y1], [Math.cos(an) * 30, Math.sin(an) * 30 + 4], [Math.cos(an + .4) * 38, Math.sin(an + .4) * 38]], 7, '#d86a5a'); } break; }
    case 'frill': { const [x, y] = a.back; paint(() => { g.moveTo(x + 10, y + 16); g.quadraticCurveTo(x - 26, y + 10, x - 20, y - 26); g.quadraticCurveTo(x - 4, y - 44, x + 18, y - 30); g.closePath(); }, kit.frillCol || '#c8a060', '#9a7038', { lw: 2, sx: -2, sy: -2, tex: () => { g.fillStyle = 'rgba(255,240,200,.6)'; for (let i = 0; i < 6; i++) { g.beginPath(); C(x - 20 + i * 4, y - 22 - Math.sin(i / 5 * PI) * 12, 2.4); g.fill(); } } }); break; }
    case 'bigears': { const ec = hp.col; for (const k of [-1, 1]) paint(() => S([[k * 14, -16], [k * 34, -26], [k * 44, -6], [k * 40, 16], [k * 26, 22], [k * 16, 8]], .8), ec, dk(ec, .25), { sx: k * 2, sy: -2, tex: () => { g.fillStyle = 'rgba(255,170,180,.35)'; g.beginPath(); E(k * 30, 0, 9, 14); g.fill(); } }); break; }
    case 'antlers': { for (const k of [-1, 1]) { const bx = k * 6, by = a.top[1] + 4; const br = [[bx, by], [bx + k * 4, by - 18], [bx + k * 10, by - 34]]; limb(br, 4, '#c8a070'); limb([[bx + k * 4, by - 16], [bx + k * 14, by - 22], [bx + k * 18, by - 30]], 3, '#c8a070'); limb([[bx + k * 8, by - 28], [bx + k * 2, by - 38]], 3, '#c8a070'); } break; }
    case 'crest': { const [x, y] = a.top; for (let i = 0; i < 5; i++) paint(() => E(x - 6 - i * 4, y - 4 + i * 2, 10, 3, -.9 + i * .18), i % 2 ? '#3a4a6a' : '#5a6a8a', null, { lw: 1.2 }); break; }
    case 'horn': { const [x, y] = a.nose; paint(() => { g.moveTo(x - 6, y + 2); g.quadraticCurveTo(x - 2, y - 22, x - 6, y - 36); g.quadraticCurveTo(x + 10, y - 20, x + 6, y + 2); g.closePath(); }, '#e4dccb', '#b9ae98', { lw: 1.7, sx: -1, sy: 0 }); paint(() => { g.moveTo(x - 16, y - 6); g.quadraticCurveTo(x - 14, y - 16, x - 15, y - 20); g.quadraticCurveTo(x - 6, y - 14, x - 8, y - 5); g.closePath(); }, '#e4dccb', '#b9ae98', { lw: 1.4 }); break; }
    case 'horn3': { const [x, y] = a.brow || [a.top[0] + 8, a.top[1] + 4]; for (const dx of [-4, 6]) paint(() => { g.moveTo(x + dx - 3, y); g.quadraticCurveTo(x + dx + 8, y - 18, x + dx + 18, y - 30); g.quadraticCurveTo(x + dx + 8, y - 12, x + dx + 4, y + 1); g.closePath(); }, '#efe6d0', '#c4b898', { lw: 1.5 }); const [nx, ny] = a.nose; paint(() => { g.moveTo(nx - 6, ny); g.lineTo(nx - 2, ny - 12); g.lineTo(nx + 3, ny); g.closePath(); }, '#efe6d0', '#c4b898', { lw: 1.3 }); break; }
    case 'trunk': { const [x, y] = a.nose; const c2 = hp.trunkCol || c; const tp = [[x, y - 2], [x + 6, y + 14], [x + 4, y + 30], [x + 14, y + 38]]; g.save(); g.strokeStyle = INK; g.lineCap = 'round'; for (let i = 0; i < 3; i++) { g.lineWidth = 15 - i * 3.5; g.beginPath(); g.moveTo(...tp[i]); g.lineTo(...tp[i + 1]); g.stroke(); } g.strokeStyle = c2; for (let i = 0; i < 3; i++) { g.lineWidth = 11 - i * 3.5; g.beginPath(); g.moveTo(...tp[i]); g.lineTo(...tp[i + 1]); g.stroke(); } g.strokeStyle = dk(c2, .3); g.lineWidth = 1; for (let i = 1; i < 7; i++) { const t = i / 7, px = x + 6 * t * 2, py = y + t * 30; g.beginPath(); g.moveTo(px - 4, py); g.lineTo(px + 3, py + 1); g.stroke(); } g.restore(); paint(() => E(x + 14, y + 38, 3.5, 3), dk(c2, .2), null, { lw: 1.2 }); break; }
    case 'tusks': { const [x, y] = a.mouth; for (const k of [-1, 1]) paint(() => { g.moveTo(x + k * 6, y - 2); g.quadraticCurveTo(x + k * 14, y + 18, x + k * 2 + 12, y + 26); g.quadraticCurveTo(x + k * 6 + 2, y + 14, x + k * 3, y); g.closePath(); }, '#fbf3e0', '#d6c8a8', { lw: 1.5 }); break; }
    case 'tiara': { const [x, y] = a.top; paint(() => { g.moveTo(x - 10, y + 4); g.lineTo(x - 7, y - 6); g.lineTo(x - 3, y); g.lineTo(x, y - 9); g.lineTo(x + 3, y); g.lineTo(x + 7, y - 6); g.lineTo(x + 10, y + 4); g.closePath(); }, '#f4c542', '#c9962e', { lw: 1.2 }); paint(() => C(x, y - 3, 1.8), '#e0457b', null, { lw: .7 }); break; }
    case 'glasses': { g.save(); g.strokeStyle = INK; g.lineWidth = 1.6; for (const ex of (kit.headType === 'rhino' ? [8] : [-4, 11])) { g.beginPath(); C(ex, -5, 7); g.stroke(); g.fillStyle = 'rgba(180,220,255,.25)'; g.fill(); } g.restore(); break; }
    case 'bow': { const [x, y] = a.top; for (const k of [-1, 1]) paint(() => { g.moveTo(x, y + 2); g.quadraticCurveTo(x + k * 12, y - 8, x + k * 13, y + 4); g.closePath(); }, '#ff6fae', '#d84a8a', { lw: 1.2 }); paint(() => C(x, y + 2, 2.6), '#ff6fae', null, { lw: 1 }); break; }
    case 'sock': { const [x, y] = a.mouth; paint(() => { g.moveTo(x - 4, y - 2); g.lineTo(x + 10, y + 2); g.lineTo(x + 12, y + 14); g.lineTo(x + 18, y + 16); g.lineTo(x + 16, y + 21); g.lineTo(x + 6, y + 18); g.lineTo(x + 4, y + 4); g.closePath(); }, '#f4f0e6', '#d8d0c0', { lw: 1.3, tex: () => { g.fillStyle = '#e04a3a'; g.fillRect(x - 6, y - 2, 20, 3); } }); break; }
    case 'beret': { const [x, y] = a.top; paint(() => { E(x - 2, y + 2, 16, 6, -.15); }, '#2f6fb0', '#1f4f80', { lw: 1.4 }); break; }
  }
}
function drawHead(kit, x, y, s) {
  const H = HEADS[kit.headType], hp = kit.hp, a = H.an(hp);
  g.save(); g.translate(x, y); g.scale(s * (kit.flipHead ? -1 : 1), s);
  const gr = kit.headGrafts || [];
  for (const id of gr) if (GRAFT_BEHIND[id]) headGraft(id, a, hp, kit);
  H.draw(hp);
  for (const id of gr) if (!GRAFT_BEHIND[id]) headGraft(id, a, hp, kit);
  g.restore();
}
