function needs(x, y, vals) { // 5 mini rings
  const icons = ['🍖', '🛁', '🩺', '🎾', '🧹'];
  vals.forEach((v, i) => { const cx = x + (i - 2) * 15; g.save(); g.beginPath(); C(cx, y, 6.5); g.fillStyle = 'rgba(30,15,8,.75)'; g.fill(); const col = v > .6 ? '#5fd36a' : v > .3 ? '#ffc23a' : '#ff5a4a'; g.strokeStyle = col; g.lineWidth = 2.4; g.beginPath(); g.arc(cx, y, 6.5, -Math.PI / 2, -Math.PI / 2 + v * TAU); g.stroke(); g.font = '6.5px "Noto Color Emoji"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(icons[i], cx, y + .5); g.restore(); });
}
function nameplate(x, y, t) { plank(x - 30, y - 7, 60, 14, 4, '#e8d2a6', { rows: 1, nails: false }); txt(t, x, y + .5, '10px "Lilita One", sans-serif', '#6b2e18', null); }
function personHead(x, y, r, skin, hair, hat, o = {}) { // cut-out comedy style
  paint(() => C(x, y, r), skin, darken(skin, .12), { lw: 1.4, sx: 1.5, sy: -1 });
  if (hair) paint(() => { g.moveTo(x - r, y - r * .1); g.quadraticCurveTo(x - r * 1.05, y - r * 1.1, x, y - r * 1.05); g.quadraticCurveTo(x + r * 1.05, y - r * 1.1, x + r, y - r * .1); g.quadraticCurveTo(x, y - r * .62, x - r, y - r * .1); g.closePath(); }, hair, darken(hair.startsWith('#') ? hair : '#555555', .2), { lw: 1.2 });
  if (hat) hat(x, y, r);
  eye(x - r * .32, y + r * .02, r * .3, '#222', { ir: .3, lx: 0, ly: .1, lw: 1 }); eye(x + r * .32, y + r * .02, r * .3, '#222', { ir: .3, lx: 0, ly: .1, lw: 1 });
  line([[x - r * .25, y + r * .5], [x, y + r * .6], [x + r * .25, y + r * .5]], INK, 1.1);
}
function sceneGameplay(W, H) {
  seed = 4; const HZ = 150;
  sky(W, H, [[0, '#7fc8e0'], [.6, '#ffd7a0'], [1, '#ffc27a']], HZ);
  ridge(W, HZ, [[-5, 110], [80, 78], [160, 92], [240, 62], [330, 84], [420, 56], [520, 80], [610, 60], [700, 86], [850, 70]], 4, '#9a7aa8', '#c8a0a8', 31);
  ridge(W, HZ, [[-5, 128], [90, 104], [170, 116], [260, 92], [350, 110], [440, 88], [540, 108], [640, 92], [740, 112], [850, 100]], 4, '#7a5a7a', '#a87a88', 32);
  starOnMountain(150, 112, 6);
  ground(W, HZ - 2, H, ['#e8b682', '#d9a06c', '#c88a58']);
  // ---- Ark cutaway ----
  const AX = 6, AW = 552, TOP = 60;
  // roof
  paint(() => { g.moveTo(AX + 8, TOP + 8); g.lineTo(AX + 40, TOP - 12); g.lineTo(AX + AW - 40, TOP - 12); g.lineTo(AX + AW - 8, TOP + 8); g.closePath(); }, '#7d4a2a', '#5a301a', { lw: 2, sx: 0, sy: -3 });
  // hull shell
  const hull = () => { g.moveTo(AX, TOP + 6); g.lineTo(AX + AW, TOP + 6); g.lineTo(AX + AW, 330); g.quadraticCurveTo(AX + AW - 10, 386, AX + AW - 70, 392); g.lineTo(AX + 60, 392); g.quadraticCurveTo(AX + 6, 386, AX, 330); g.closePath(); };
  paint(hull, '#a86d3a', '#6e4220', { lw: 2.4, sx: 0, sy: -6 });
  // interior walls
  const deck = (y0, y1, base) => { g.save(); g.beginPath(); g.rect(AX + 12, y0, AW - 24, y1 - y0); g.clip(); const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, darken(base, .25)); gr.addColorStop(1, base); g.fillStyle = gr; g.fillRect(AX, y0, AW, y1 - y0); g.strokeStyle = 'rgba(50,25,8,.35)'; g.lineWidth = 1; for (let x = AX + 12; x < AX + AW; x += 14) { g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); } for (let i = 0; i < 40; i++) { const px = R(AX, AX + AW), py = R(y0, y1); g.beginPath(); g.moveTo(px, py); g.lineTo(px, py + R(8, 20)); g.stroke(); } g.restore(); g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(AX + 12, y0, AW - 24, y1 - y0); };
  deck(TOP + 12, 210, '#c89058'); deck(222, 352, '#b88050');
  // beams/floors
  paint(() => RR(AX + 4, 208, AW - 8, 14, 2), '#8a5530', '#6a3e20', { lw: 2, sx: 0, sy: -3 });
  paint(() => RR(AX + 4, 350, AW - 8, 12, 2), '#8a5530', '#6a3e20', { lw: 2, sx: 0, sy: -3 });
  // deck labels
  plank(AX + 210, TOP - 13, 140, 18, 4, '#3a2416', { rows: 1, nails: false }); txt('KENNEL DECK', AX + 280, TOP - 3.5, '13px "Lilita One", sans-serif', '#ffd27a', null);
  plank(AX + 200, 225, 160, 18, 4, '#3a2416', { rows: 1, nails: false }); txt('BIG CRITTER HOLD', AX + 280, 234.5, '13px "Lilita One", sans-serif', '#6be3c8', null);
  // string lights in decks
  for (const [y0, n] of [[TOP + 40, 18], [252, 18]]) { g.strokeStyle = 'rgba(40,20,10,.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(AX + 14, y0); for (let i = 0; i <= n; i++) g.quadraticCurveTo(AX + 14 + (i - .5) * (AW - 28) / n, y0 + 8, AX + 14 + i * (AW - 28) / n, y0); g.stroke(); for (let i = 0; i < n; i++) { const bx = AX + 14 + (i + .5) * (AW - 28) / n, by = y0 + 5; g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(bx, by, .5, bx, by, 9); gl.addColorStop(0, 'rgba(255,220,150,.6)'); gl.addColorStop(1, 'rgba(255,220,150,0)'); g.fillStyle = gl; g.beginPath(); C(bx, by, 9); g.fill(); g.restore(); g.fillStyle = ['#ffd24a', '#ff6b4a', '#6be3c8', '#ff9ad0'][i % 4]; g.beginPath(); E(bx, by, 1.8, 2.3); g.fill(); } }
  // stalls (upper deck)
  const stalls = [100, 225, 350, 475], SW = 118;
  stalls.forEach((cx, i) => {
    paint(() => RR(cx - SW / 2 + 4, 98, SW - 8, 108, 6), ['#f2d9b0', '#e6eef0', '#f6e4ee', '#e8f0dc'][i], null, { lw: 1.6 });
    // little window to desert
    g.save(); g.beginPath(); RR(cx - 18, 106, 36, 24, 10); g.clip(); const gr = g.createLinearGradient(0, 106, 0, 130); gr.addColorStop(0, '#8fd0e8'); gr.addColorStop(1, '#ffd29a'); g.fillStyle = gr; g.fillRect(cx - 20, 104, 40, 30); g.fillStyle = '#9a7aa8'; g.beginPath(); g.moveTo(cx - 20, 126); g.lineTo(cx - 8, 118); g.lineTo(cx + 2, 123); g.lineTo(cx + 12, 116); g.lineTo(cx + 20, 124); g.lineTo(cx + 20, 132); g.lineTo(cx - 20, 132); g.fill(); g.restore(); g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); RR(cx - 18, 106, 36, 24, 10); g.stroke();
    // bed + bowl
    paint(() => E(cx + 2, 202, 40, 7), ['#e9503f', '#3f86b8', '#e0457b', '#5f9654'][i], null, { lw: 1.4 });
    paint(() => { g.moveTo(cx + 34, 196); g.lineTo(cx + 50, 196); g.lineTo(cx + 47, 204); g.lineTo(cx + 37, 204); g.closePath(); }, '#c9ced6', '#9aa0aa', { lw: 1.2 });
  });
  // animals upper
  chancla(100, 200, 1.18); cat(225, 201, 1.02, { cloud: true }); persian(350, 202, 1.08); corgi(470, 202, .92);
  // bottled water for Duchess
  paint(() => RR(386, 178, 8, 22, 2), 'rgba(170,220,255,.9)', 'rgba(120,180,230,.9)', { lw: 1.2 }); paint(() => RR(387.5, 174, 5, 5, 1), '#3f86b8', null, { lw: 1 });
  [['CHANCLA', [.8, .3, .9, .5, .7]], ['KEVIN', [.6, .7, .9, .2, .8]], ['DUCHESS', [.9, .95, .9, .5, .6]], ['LOWRIDER', [.4, .6, .9, .9, .3]]].forEach(([n, v], i) => { nameplate(stalls[i], 86, n); });
  // care wheel on Chancla
  { const cx = 100, cy = 166, r = 58; g.save(); g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 2; g.setLineDash([4, 4]); g.beginPath(); C(cx, cy, r - 16); g.stroke(); g.setLineDash([]); g.restore();
    const ic = [['🍖', 'FEED'], ['🛁', 'WASH'], ['🩺', 'VET'], ['🎾', 'PLAY'], ['⭐', 'CUDDLE']];
    ic.forEach(([e, l], i) => { const a = -Math.PI / 2 + (i - 2) * .62, bx = cx + Math.cos(a) * r, by = cy + Math.sin(a) * r; paint(() => C(bx, by, 13), i === 4 ? '#ffd24a' : '#fff4e0', i === 4 ? '#e9a33a' : '#e2cfae', { lw: 1.6, sx: 0, sy: -2 }); g.font = '13px "Noto Color Emoji"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, bx, by + 1); txt(l, bx, by + 18, '7.5px "Lilita One", sans-serif', '#fff', INK, 2.5); });
  }
  // lower deck: mud wallow + pool
  paint(() => E(170, 346, 98, 10), '#7a4a2a', '#5a3018', { lw: 1.6, sx: 0, sy: -2, tex: () => { g.fillStyle = 'rgba(160,110,70,.6)'; for (let i = 0; i < 8; i++) { g.beginPath(); E(R(90, 250), R(340, 352), R(4, 10), 2); g.fill(); } } });
  rhonda(160, 344, .82);
  // pool
  g.save(); g.beginPath(); RR(368, 292, 176, 58, 6); g.clip(); const wg = g.createLinearGradient(0, 292, 0, 350); wg.addColorStop(0, '#5ad0d8'); wg.addColorStop(1, '#2a8aa8'); g.fillStyle = wg; g.fillRect(368, 292, 176, 58); g.restore();
  gator(414, 322, 1.3, { bow: true });
  g.save(); g.beginPath(); RR(368, 292, 176, 58, 6); g.clip(); g.fillStyle = 'rgba(42,138,168,.55)'; g.fillRect(368, 318, 176, 32); g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1.4; for (let i = 0; i < 6; i++) { const wx = 378 + i * 28; g.beginPath(); g.moveTo(wx, 318); g.quadraticCurveTo(wx + 7, 314, wx + 14, 318); g.stroke(); } g.restore();
  g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); RR(368, 292, 176, 58, 6); g.stroke();
  paint(() => RR(364, 286, 184, 8, 3), '#d8c8a8', '#b8a888', { lw: 1.6 });
  nameplate(160, 248, 'RHONDA'); nameplate(456, 276, 'LADY CHOMPINGTON'.slice(0, 0) || 'LADY C.');
  // Ella with hose + water arc
  ella(300, 349, .36, { pose: 'hose', flip: true, outfit: 'shorts' });
  const nx = 300 - 88 * .36, ny = 349 - 172 * .36;
  g.save(); g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 5; g.beginPath(); g.moveTo(nx, ny); g.quadraticCurveTo(nx - 30, ny - 34, 196, 276); g.stroke(); g.strokeStyle = 'rgba(110,200,255,.9)'; g.lineWidth = 3; g.stroke(); g.restore();
  for (let i = 0; i < 16; i++) { g.fillStyle = 'rgba(160,220,255,.85)'; g.beginPath(); C(196 + R(-22, 22), 276 + R(-10, 22), R(1, 2.6)); g.fill(); }
  for (let i = 0; i < 9; i++) { const bx = R(110, 230), by = R(262, 300), br = R(2.5, 6); g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 1.1; g.fillStyle = 'rgba(200,240,255,.35)'; g.beginPath(); C(bx, by, br); g.fill(); g.stroke(); hiBlob(bx - br * .3, by - br * .3, br * .3, br * .2, .9); }
  biscuit(334, 349, .5, { flip: true, collar: true });
  // floating juice
  txt('MUD SPA! +♥', 236, 262, '11px "Luckiest Guy", sans-serif', '#6be3c8', INK, 3.5);
  txt('+15 FULL SERVICE!', 290, 126, '11px "Luckiest Guy", sans-serif', '#ffd24a', INK, 3.5);
  txt('Rhonda: "Ahhh."', 108, 268, 'italic 600 10px "Fredoka", sans-serif', '#fff', INK, 3);
  // bow porthole outside hull bottom
  for (const px of [80, 200, 320, 440]) { paint(() => C(px, 372, 7), '#ffd98a', '#ffb24a', { lw: 1.6, sx: 0, sy: 2 }); }
  // ---- HUD ----
  plank(0, 0, W, 40, 0, '#7d4a2a', { rows: 1, nails: false });
  pill(8, 7, 120, 26, '#3a2416'); paint(() => C(22, 20, 9), '#ffd24a', '#e0a020', { lw: 1.3 }); txt('$', 22, 20.5, '12px "Luckiest Guy"', '#9a6a10', null); txt('$1,248', 76, 21, '17px "Luckiest Guy", sans-serif', '#fff4e0', null);
  pill(138, 7, 250, 26, '#3a2416'); g.font = '13px "Noto Color Emoji"'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('☀️', 146, 21); txt('DAY 4 · 2:15 PM', 210, 21, '14px "Lilita One", sans-serif', '#fff4e0', null);
  pill(268, 14, 112, 12, '#5a3a20'); pill(268, 14, 112 * .62, 12, '#ffb24a'); txt('OPEN HOUSE AT 4 PM', 324, 20.5, '8px "Lilita One"', '#fff', INK, 2.5);
  paint(() => RR(398, 6, 128, 28, 14), '#e9503f', '#c43a2e', { lw: 1.6, sx: 0, sy: -2 }); g.font = '13px "Noto Color Emoji"'; g.textAlign = 'center'; g.fillText('🔥', 414, 21); txt('HOOAH x1.4', 466, 21, '14px "Luckiest Guy", sans-serif', '#fff4e0', null);
  txt('★★', 556, 21, '22px "Lilita One"', '#ffd24a', INK, 3); txt('★', 583, 21, '22px "Lilita One"', '#8a6a4a', INK, 3);
  pill(W - 46, 7, 38, 26, '#3a2416'); txt('☰', W - 27, 20, '16px "Lilita One"', '#fff4e0', null);
  txt('CONCEPT MOCKUP · not final art', 600, 20, '600 8px "Fredoka"', 'rgba(255,240,220,.7)', null, 0, 'left');
  // ---- side panel ----
  const PX = 566, PW = 222;
  // quick call card
  paint(() => RR(PX, 48, PW, 182, 12), '#fff4e0', '#ead8b8', { lw: 2, sx: 0, sy: -4 });
  paint(() => RR(PX, 48, PW, 26, 12), '#e9503f', null, { lw: 2 }); g.fillStyle = '#e9503f'; g.fillRect(PX + 2, 62, PW - 4, 12);
  txt('⚡ QUICK CALL', PX + 12, 61.5, '14px "Luckiest Guy", sans-serif', '#fff4e0', null, 0, 'left');
  g.save(); g.strokeStyle = '#fff4e0'; g.lineWidth = 3; g.beginPath(); g.arc(PX + PW - 18, 61, 8, -Math.PI / 2, Math.PI * .9); g.stroke(); g.restore();
  // illustration: cabinet with tail
  g.save(); g.beginPath(); RR(PX + 10, 80, PW - 20, 74, 8); g.clip(); g.fillStyle = '#f2d9b0'; g.fillRect(PX, 80, PW, 74); g.restore(); g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); RR(PX + 10, 80, PW - 20, 74, 8); g.stroke();
  paint(() => RR(PX + 66, 88, 90, 62, 4), '#a86d3a', '#7a4a24', { lw: 1.8, sx: 0, sy: -3 }); g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.moveTo(PX + 111, 88); g.lineTo(PX + 111, 150); g.stroke(); paint(() => { C(PX + 104, 118, 2.4); C(PX + 118, 118, 2.4); }, '#e0c060', null, { lw: 1 });
  limb([[PX + 111, 132], [PX + 128, 140], [PX + 146, 134], [PX + 152, 122]], 6, '#ee9a43'); g.strokeStyle = '#c06a22'; g.lineWidth = 2; for (const t of [[PX + 124, 139], [PX + 136, 139], [PX + 147, 131]]) { g.beginPath(); g.moveTo(t[0], t[1] - 3); g.lineTo(t[0] + 1, t[1] + 3); g.stroke(); }
  txt('?', PX + 170, 100, '22px "Luckiest Guy"', '#e9503f', INK, 3);
  wrapTxt('Kevin is stuck in a cabinet. Again.', PX + PW / 2, 160, PW - 24, 15, '600 13px "Fredoka", sans-serif', '#3a2416', 'center');
  paint(() => RR(PX + 10, 196, 98, 26, 13), '#5f9654', '#4a7a40', { lw: 1.6, sx: 0, sy: -2 }); txt('◀ Free him', PX + 59, 209.5, '12px "Lilita One"', '#fff', null);
  paint(() => RR(PX + 114, 196, 98, 26, 13), '#3f86b8', '#2f6a98', { lw: 1.6, sx: 0, sy: -2 }); txt("He's thinking ▶", PX + 163, 209.5, '11px "Lilita One"', '#fff', null);
  // tools
  plank(PX, 238, PW, 66, 10, '#8a5530', { rows: 1, nails: false });
  [['🍖', 'FEED'], ['🛁', 'WASH'], ['🩺', 'VET'], ['🎾', 'PLAY'], ['🧹', 'CLEAN']].forEach(([e, l], i) => { const bx = PX + 24 + i * 43.5, by = 262; paint(() => C(bx, by, 16), i === 1 ? '#6be3c8' : '#fff4e0', i === 1 ? '#3ab8a0' : '#e2cfae', { lw: 1.8, sx: 0, sy: -2 }); g.font = '16px "Noto Color Emoji"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, bx, by + 1); txt(l, bx, by + 27, '9px "Lilita One"', '#fff4e0', INK, 2.5); });
  // open house queue
  paint(() => RR(PX, 312, PW, 72, 12), '#3a2416', null, { lw: 2 });
  txt('OPEN HOUSE · 3 ADOPTERS WAITING', PX + PW / 2, 324, '10px "Lilita One"', '#ffd27a', null);
  const ppl = [['#f2c6a0', '#3a2a1a', 'kids · yard', null], ['#e8b890', '#d0d0d0', 'quiet · porch', null], ['#f6d0b3', '#c8862a', '#gains', (x, y, r) => paint(() => RR(x - r, y - r * .9, r * 2, r * .35, 2), '#e9503f', null, { lw: 1 })]];
  ppl.forEach(([sk, hr, tag, hat], i) => { const hx = PX + 38 + i * 74, hy = 350; paint(() => RR(hx - 13, hy + 8, 26, 22, 8), ['#5f9654', '#8a6ab8', '#e9503f'][i], null, { lw: 1.4 }); personHead(hx, hy, 12, sk, hr, hat); pill(hx - 30, hy + 17, 60, 14, 'rgba(255,244,224,.95)'); txt(tag, hx, hy + 24.5, '8px "Lilita One"', '#3a2416', null); });
  // ---- tab rail ----
  plank(794, 44, 46, 342, 10, '#5a3a20', { rows: 1, nails: false });
  [['🚢', 'ARK'], ['📣', 'ADS'], ['❤️', 'ADOPT'], ['🔨', 'BUILD'], ['📖', 'DEX']].forEach(([e, l], i) => { const ty = 78 + i * 66; if (!i) paint(() => RR(798, ty - 28, 38, 58, 9), '#e9503f', null, { lw: 1.4 }); g.font = '18px "Noto Color Emoji"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, 817, ty - 6); txt(l, 817, ty + 17, '8.5px "Lilita One"', '#fff4e0', null); });
  // need rings (after everything in ark)
  needs(100, 222 - 8, [.8, .3, .9, .5, .7]); needs(225, 214, [.6, .7, .9, .15, .8]); needs(350, 214, [.9, .95, .9, .5, .6]); needs(475, 214, [.4, .6, .9, .9, .3]);
  needs(160, 362, [.7, .9, .8, .6, .5]); needs(456, 362, [.5, .8, .9, .7, .8]);
}
