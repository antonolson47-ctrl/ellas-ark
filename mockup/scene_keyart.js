function peekLion(x, y) { paint(() => tuft(x, y - 9, 10, 9, 9, .25), '#b8662a', '#8a4818', { lw: 1.2, sx: -1, sy: -1 }); paint(() => C(x, y - 8, 6), '#e8b060', '#c08a40', { lw: 1 }); eye(x - 2.4, y - 9.5, 1.8, '#5a3a10'); eye(x + 2.4, y - 9.5, 1.8, '#5a3a10'); paint(() => E(x, y - 6, 1.6, 1.1), '#3a2010', null, { lw: .5 }); }
function peekEle(x, y) { paint(() => { E(x - 8, y - 10, 5, 7); E(x + 8, y - 10, 5, 7); }, '#9aa0aa', '#707680', { lw: 1 }); paint(() => C(x, y - 10, 7), '#a8aeb8', '#808690', { lw: 1.2 }); eye(x - 2.5, y - 12, 1.6, '#333'); eye(x + 2.5, y - 12, 1.6, '#333'); limb([[x, y - 7], [x + 2, y + 4], [x + 9, y + 12], [x + 14, y + 10]], 3.5, '#a8aeb8'); }
function peekCat(x, y) { for (const k of [-1, 1]) paint(() => { g.moveTo(x + k * 3, y - 14); g.lineTo(x + k * 7, y - 20); g.lineTo(x + k * 8, y - 11); g.closePath(); }, '#ee9a43', '#c06a22', { lw: .9 }); paint(() => E(x, y - 9, 7, 6), '#ee9a43', '#c06a22', { lw: 1 }); eye(x - 2.6, y - 10, 2, '#9ab84a', { ir: .3 }); eye(x + 2.6, y - 10, 2, '#9ab84a', { ir: .3 }); }
function peekDino(x, y) { paint(() => S([[x - 8, y], [x - 6, y - 12], [x + 4, y - 16], [x + 13, y - 12], [x + 12, y - 6], [x + 2, y - 4]], .8), '#7fae5a', '#4f7d3c', { lw: 1.1, sx: -1, sy: -1 }); eye(x + 1, y - 11, 2.2, '#c08a20'); g.fillStyle = '#fff'; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(x + 4 + i * 2.2, y - 6); g.lineTo(x + 5 + i * 2.2, y - 4); g.lineTo(x + 6 + i * 2.2, y - 6); g.fill(); } }
function eagleSmall(x, y) { paint(() => S([[x - 7, y], [x - 6, y - 10], [x + 2, y - 12], [x + 6, y - 4], [x + 3, y + 2]], .8), '#6e4220', '#4a2a12', { lw: 1.1 }); paint(() => C(x + 2, y - 14, 4.5), '#fbf8f0', '#d8d0c0', { lw: 1 }); paint(() => { g.moveTo(x + 5, y - 15); g.lineTo(x + 11, y - 13); g.lineTo(x + 5, y - 11.5); g.closePath(); }, '#f4c13a', null, { lw: .8 }); eye(x + 3, y - 15, 1.2, '#c08a20'); }
function silhouettes(x, y, s, col) { g.save(); g.fillStyle = col; g.translate(x, y); g.scale(s, s);
  const ele = (ex) => { g.beginPath(); E(ex, -7, 7, 5); E(ex + 7, -9, 3.5, 3.5); g.fill(); g.fillRect(ex - 6, -4, 2.2, 5); g.fillRect(ex + 3, -4, 2.2, 5); g.lineWidth = 1.6; g.strokeStyle = col; g.beginPath(); g.moveTo(ex + 10, -9); g.quadraticCurveTo(12, -4, 11, -1); g.stroke(); };
  const dino = (ex) => { g.beginPath(); E(ex, -6, 6, 3.5); g.fill(); g.lineWidth = 2; g.strokeStyle = col; g.beginPath(); g.moveTo(ex + 4, -7); g.quadraticCurveTo(ex + 9, -16, ex + 12, -20); g.stroke(); g.beginPath(); g.moveTo(ex - 5, -6); g.lineTo(ex - 13, -4); g.stroke(); g.fillRect(ex - 4, -4, 1.8, 4); g.fillRect(ex + 2, -4, 1.8, 4); };
  const rh = (ex) => { g.beginPath(); E(ex, -5, 6, 3.5); E(ex + 6, -5, 3, 2.4); g.fill(); g.beginPath(); g.moveTo(ex + 8, -6); g.lineTo(ex + 9, -10); g.lineTo(ex + 10, -6); g.fill(); g.fillRect(ex - 4, -3, 1.8, 3); g.fillRect(ex + 2, -3, 1.8, 3); };
  ele(0); ele(16); dino(38); dino(54); rh(72); rh(84); ele(102); g.restore(); }
function sceneKeyart(W, H) {
  seed = 3; const HZ = 472;
  sky(W, H, [[0, '#231b55'], [.22, '#4b2a78'], [.46, '#a6427f'], [.66, '#ec6f55'], [.84, '#ffad5c'], [1, '#ffd88a']], HZ);
  g.save(); for (let i = 0; i < 70; i++) { g.globalAlpha = R(.2, .8) * (1 - i / 90); g.fillStyle = '#fff'; g.beginPath(); C(R(0, W), R(0, 230), R(.4, 1.2)); g.fill(); } g.restore();
  sparkle(60, 40, 1.6, '#fff', .8); sparkle(330, 70, 1.3, '#fff', .7);
  // clouds
  streak(90, 268, 220, 14, '#ff9aa0', .55); streak(300, 300, 240, 12, '#ffb38a', .5); streak(200, 236, 160, 9, '#e07aa8', .45);
  cloud(320, 252, 120, 22, '#ffc6a0', '#c05a80', .9); cloud(70, 318, 110, 18, '#ffcf9a', '#d0607a', .85); cloud(190, 338, 80, 12, '#ffe0a8', '#e07a70', .7);
  sunGlow(244, 392, 26); rays(244, 392, 12, 420, .04);
  // mountains (Franklins from the NE)
  ridge(W, HZ, [[-5, 410], [50, 372], [96, 352], [140, 366], [196, 328], [250, 340], [300, 306], [350, 330], [395, 318]], 5, '#b25a8a', '#e08aa0', 21);
  ridge(W, HZ, [[-5, 432], [40, 404], [80, 384], [120, 398], [170, 370], [215, 386], [265, 360], [305, 372], [350, 344], [395, 366]], 6, '#7a3a7c', '#b0608a', 22);
  const near = ridge(W, HZ, [[-5, 446], [30, 428], [72, 398], [104, 410], [146, 392], [186, 410], [228, 384], [270, 396], [318, 372], [358, 392], [395, 386]], 5, '#40235a', '#6a3668', 23);
  seed = 9; ridgeDetail(near, HZ, 'rgba(255,150,140,.12)', 'rgba(20,8,35,.25)');
  starOnMountain(84, 418, 10);
  seed = 5; for (let i = 0; i < 5; i++) cityLights(0, W, 458 + i * 3.5, 26 + i * 6, .45 + i * .08);
  // desert
  ground(W, HZ - 2, H, ['#e8a274', '#d98c60', '#c27050', '#9c5440', '#6e3a34']);
  g.fillStyle = 'rgba(255,200,150,.35)'; g.fillRect(0, HZ - 2, W, 3);
  silhouettes(10, 494, .8, 'rgba(80,35,60,.7)');
  seed = 8; for (let i = 0; i < 14; i++) creosote(R(0, W), R(480, 520), R(.25, .45), '#7a7a4a');
  seed = 12; sandRipples(0, W, 520, H, 40, 'rgba(120,50,30,.6)'); pebbles(0, W, 540, H, 160, '#5a2a20');
  // ark
  seed = 30;
  const peeks = [peekLion, peekEle, peekCat, peekDino, null];
  ark(196, 650, 340, { peek: peeks, sign: 'ANIMAL SHELTER', hullName: "ELLA'S ARK", rim: true, eagle: (x, y) => eagleSmall(x + 1, y + 1),
    portholes: [{ x: -.36, y: .14, f: (px, py, r) => pricklyPear(px + 2, py - r * .3, .32, { pads: [[0, -8, 7, 9, 0], [-7, -18, 5, 7, -.5], [7, -19, 5, 7, .5]], fruit: false }) }, { x: -.04, y: .2 }, { x: .3, y: .12, f: (px, py, r) => { limb([[px + 2, py + 2], [px + 14, py + 10], [px + 18, py + 24], [px + 12, py + 30]], 4.5, '#e0607a'); g.fillStyle = '#ffd0d8'; for (let i = 0; i < 4; i++) { g.beginPath(); C(px + 10 + i * 2.5, py + 9 + i * 5, 1.2); g.fill(); } } }] });
  // ristras on cabin corners
  ristra(196 - 340 * .28 - 6, 650 - 143 * .62 - 70, 7, 1); ristra(196 - 340 * .28 + 340 * .62 + 6, 650 - 143 * .62 - 70, 7, 1);
  // gangplank
  paint(() => { g.moveTo(304, 562); g.lineTo(322, 560); g.lineTo(374, 662); g.lineTo(350, 664); g.closePath(); }, '#b47a43', '#8a5530', { lw: 2, sx: -3, sy: 0, tex: () => { g.strokeStyle = 'rgba(60,30,10,.5)'; g.lineWidth = 1.2; for (let i = 0; i < 9; i++) { const t = i / 9; g.beginPath(); g.moveTo(304 + t * 46, 562 + t * 102); g.lineTo(322 + t * 52, 560 + t * 102); g.stroke(); } } });
  line([[322, 546], [376, 650]], INK, 3); line([[322, 546], [376, 650]], '#d29a5c', 1.5);
  for (let i = 0; i < 4; i++) line([[322 + i * 17, 546 + i * 33], [322 + i * 17, 560 + i * 33]], '#8a5530', 2);
  // foreground flora
  seed = 41; pricklyPear(30, 742, 1.25); yucca(356, 745, .95); barrel(300, 760, .9); ocotillo(384, 640, .6); creosote(150, 676, .7, '#6f8f4a'); creosote(388, 690, .8, '#6f8f4a'); creosote(12, 676, .6, '#6f8f4a');
  tumbleweed(334, 668, 13, { motion: true });
  // long sunset shadow wash on foreground
  const fg = g.createLinearGradient(0, 700, 0, H); fg.addColorStop(0, 'rgba(60,20,40,0)'); fg.addColorStop(1, 'rgba(60,20,40,.35)'); g.fillStyle = fg; g.fillRect(0, 700, W, H - 700);
  // Ella + Biscuit
  ella(118, 818, .96, { pose: 'hips' });
  biscuit(196, 818, 1.05, { collar: true });
  // logo
  logo(W / 2, 92, 1);
  // play button
  plank(232, 770, 140, 44, 12, '#e9503f', { rows: 1, nails: false }); txt('▶  PLAY', 302, 793, '26px "Luckiest Guy", sans-serif', '#fff4e0', INK, 4);
  txt('CONCEPT MOCKUP · not final art', W - 8, H - 10, '600 9px "Fredoka", sans-serif', 'rgba(255,240,220,.75)', null, 0, 'right');
}
function logo(cx, cy, s) {
  g.save(); g.translate(cx, cy); g.scale(s, s);
  const wood = (y0, y1) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, '#ffd27a'); gr.addColorStop(.5, '#e9a24a'); gr.addColorStop(1, '#b8682c'); return gr; };
  g.font = '50px "Luckiest Guy", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  for (const [t, y, sz] of [["ELLA'S", -6, 52], ['ARK', 74, 100]]) {
    g.font = `${sz}px "Luckiest Guy", sans-serif`;
    g.fillStyle = INK; g.fillText(t, 3, y + 6); g.lineWidth = sz * .16; g.strokeStyle = INK; g.strokeText(t, 0, y);
    g.fillStyle = wood(y - sz * .8, y); g.fillText(t, 0, y);
    g.save(); g.globalAlpha = .35; g.lineWidth = 1.2; g.strokeStyle = '#7a3e12'; g.beginPath(); for (let i = 0; i < 3; i++) { const yy = y - sz * (.2 + i * .22); g.moveTo(-140, yy); g.bezierCurveTo(-60, yy - 3, 40, yy + 3, 140, yy); } g.restore();
  }
  paw(86, -40, 11, '#fff4e0');
  // ribbon
  const rw = 260, ry = 104;
  paint(() => { g.moveTo(-rw / 2 - 16, ry - 2); g.lineTo(-rw / 2 + 4, ry - 2); g.lineTo(-rw / 2 + 4, ry + 22); g.lineTo(-rw / 2 - 16, ry + 22); g.lineTo(-rw / 2 - 8, ry + 10); g.closePath(); g.moveTo(rw / 2 + 16, ry - 2); g.lineTo(rw / 2 - 4, ry - 2); g.lineTo(rw / 2 - 4, ry + 22); g.lineTo(rw / 2 + 16, ry + 22); g.lineTo(rw / 2 + 8, ry + 10); g.closePath(); }, '#a8302a', null, { lw: 1.6 });
  paint(() => RR(-rw / 2, ry - 6, rw, 24, 3), '#e9503f', '#c43a2e', { lw: 1.8, sx: 0, sy: -3 });
  txt('ANIMAL SHELTER  ·  EL PASO, TX', 0, ry + 6.5, '16px "Lilita One", sans-serif', '#fff4e0', null);
  txt('All creatures welcome. (Seriously. All.)', 0, ry + 38, 'italic 600 14px "Fredoka", sans-serif', '#fff4e0', 'rgba(40,10,30,.6)', 3);
  g.restore();
}
