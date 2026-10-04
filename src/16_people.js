/* ===================== PEOPLE ART ===================== */
// Characters & animals (procedural part rigs with cel shading)
const HAIR = '#f2cd68', HAIRD = '#c08f2c', HAIRL = '#fff1b8';
function curl(x, y, r, rot = 0, dark = false) {
  paint(() => C(x, y, r), dark ? '#e0b44e' : HAIR, HAIRD, { lw: 1.3, sx: -r * .25, sy: -r * .3 });
  g.save(); g.strokeStyle = dark ? '#a8761e' : '#c4922e'; g.lineWidth = Math.max(1, r * .16); g.beginPath();
  for (let t = 0; t < 1; t += .04) { const a = rot + t * TAU * 1.35, rr = r * (.15 + t * .7); const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr; t ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
  g.strokeStyle = HAIRL; g.globalAlpha = .8; g.lineWidth = Math.max(1, r * .2); g.beginPath(); g.arc(x - r * .1, y - r * .1, r * .62, 3.6, 4.6); g.stroke(); g.restore();
}

function hairMass(curls, o = {}) {
  const base = o.base || HAIR, dark = o.dark || HAIRD;
  paint(() => { for (const [x, y, r] of curls) C(x, y, r); }, base, dark, { lw: o.lw ?? 1.5, sx: -2.5, sy: -3, ink: '#7a5418', tex: () => {
    for (const [x, y, r] of curls) {
      g.save(); g.globalAlpha = .55; g.strokeStyle = o.shade || '#b88324'; g.lineWidth = r * .32; g.beginPath(); g.arc(x, y, r * .72, .15 * Math.PI, .95 * Math.PI); g.stroke();
      g.globalAlpha = .5; g.lineWidth = Math.max(.8, r * .12); g.strokeStyle = '#9a6a18'; g.beginPath(); g.arc(x + r * .1, y + r * .05, r * .38, 1.1 * Math.PI, 2.3 * Math.PI); g.stroke();
      g.globalAlpha = .85; g.strokeStyle = HAIRL; g.lineWidth = Math.max(1, r * .2); g.beginPath(); g.arc(x - r * .12, y - r * .15, r * .55, 1.05 * Math.PI, 1.55 * Math.PI); g.stroke(); g.restore(); } } });
}
function limb(pts, w, col) { g.save(); g.strokeStyle = INK; g.lineWidth = w + 4; g.beginPath(); SO(pts); g.stroke(); g.strokeStyle = col; g.lineWidth = w; g.beginPath(); SO(pts); g.stroke(); g.restore(); }
// ELLA: feet at origin, ~265 units tall. pose: 'hips' | 'hose' | 'wave'
function ella(x, y, s, o = {}) {
  seed = 4242; g.save(); g.translate(x, y); g.scale(s * (o.flip ? -1 : 1), s);
  const SK = '#f6d0b3', SKD = '#e0a888', OL = o.shirt || '#2f9be0', OLD = o.shirtD || '#1f6fb0', PT = '#4f7fbf', PTD = '#34598f', BT = '#80593a', BTD = '#563a22'; // blue tee + denim, combat boots
  shadow(0, 0, 52, 9, .38);
  // back hair mass (one silhouette, ringlet shading)
  const back = []; for (let i = 0; i <= 16; i++) { const t = i / 16, an = Math.PI * (1.05 + t * .9); back.push([Math.cos(an) * 34, -232 + Math.sin(an) * 38, 12 + (i % 3) * 1.2]); }
  for (const k of [-1, 1]) for (let j = 0; j < 6; j++) back.push([k * (40 - j * 1.5 + (j % 2) * 4), -222 + j * 9, 11 - j * .4 + (j % 2)]);
  back.push([-20, -176, 9], [20, -176, 9], [-30, -180, 9], [30, -180, 9]);
  hairMass(back, { base: '#e6bb52', dark: '#b8862a', shade: '#a87720' });
  // legs
  const shorts = o.outfit === 'shorts';
  if (shorts) paint(() => { RR(-26, -86, 18, 58, 8); RR(8, -86, 18, 58, 8); }, SK, SKD, { sx: -2, sy: 0 });
  const legPts = shorts ? [[[-28, -122], [-1, -122], [-3, -84], [-30, -82]], [[1, -122], [28, -122], [30, -82], [3, -84]]] : [[[-27, -122], [-1, -122], [-4, -78], [-9, -30], [-31, -30], [-29, -78]], [[1, -122], [27, -122], [29, -78], [31, -30], [9, -30], [4, -78]]];
  paint(() => { S(legPts[0], .8); S(legPts[1], .8); }, PT, PTD, { sx: -3, sy: 0, tex: () => { g.save(); g.strokeStyle = '#e8a640'; g.lineWidth = .9; g.setLineDash([2, 2]); g.beginPath(); g.moveTo(-15, -121); g.lineTo(-17, shorts ? -86 : -32); g.moveTo(15, -121); g.lineTo(17, shorts ? -86 : -32); g.moveTo(-26, -110); g.quadraticCurveTo(-18, -110, -15, -120); g.moveTo(26, -110); g.quadraticCurveTo(18, -110, 15, -120); g.stroke(); g.restore(); if (!shorts) wrinkles([[[-24, -60], [-14, -56], [-8, -60]], [[24, -60], [14, -56], [8, -60]], [[-22, -100], [-12, -97]], [[22, -100], [12, -97]]], 'rgba(20,40,80,.45)'); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(-24, -116, 6, 80); g.fillRect(6, -116, 6, 80); } });
  if (shorts) { g.save(); g.strokeStyle = '#dfe8f4'; g.lineWidth = 1.2; for (let i = -28; i <= 30; i += 3) { if (Math.abs(i) < 2) continue; g.beginPath(); g.moveTo(i, -84); g.lineTo(i + .5, -80); g.stroke(); } g.restore(); }
  if (!shorts) paint(() => { RR(-31, -36, 26, 6, 3); RR(5, -36, 26, 6, 3); }, '#6a96d0', PTD, { lw: 1.3, sx: 0, sy: -1 }); // rolled cuffs over boots
  // boots
  paint(() => { S([[-32, -34], [-9, -34], [-8, -10], [-4, -4], [-6, 0], [-44, 0], [-44, -6], [-33, -12]], .6); S([[9, -34], [32, -34], [33, -12], [44, -6], [44, 0], [6, 0], [4, -4], [8, -10]], .6); }, BT, BTD, { sx: -2, sy: -3, tex: () => { g.fillStyle = '#3a2616'; g.fillRect(-50, -4, 100, 6); g.strokeStyle = '#e8d6b0'; g.lineWidth = 1.2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-26, -30 + i * 5); g.lineTo(-15, -28 + i * 5); g.moveTo(15, -30 + i * 5); g.lineTo(26, -28 + i * 5); g.stroke(); } } });
  // torso (tee)
  const pose = o.pose || 'hips';
  paint(() => S([[-25, -120], [25, -120], [28, -150], [34, -183], [20, -194], [-20, -194], [-34, -183], [-28, -150]], .8), OL, OLD, { sx: -4, sy: -2, tex: () => { wrinkles([[[-16, -132], [-6, -138], [4, -134]], [[10, -132], [18, -128]]], 'rgba(10,40,90,.4)'); } });
  // belt
  paint(() => RR(-27, -127, 54, 9, 2), '#3d3124', '#2a2118', { lw: 1.5, sx: 0, sy: -1 }); paint(() => RR(-6, -127, 12, 9, 2), '#d9d4c4', '#9e9888', { lw: 1.2, sx: 0, sy: -1 });
  // shelter-logo tee: white paw over a little ark
  paint(() => RR(-7, -164, 14, 7, 1), '#fff4e0', '#e2cfae', { lw: 1 }); paint(() => { g.moveTo(-15, -158); g.lineTo(15, -158); g.quadraticCurveTo(12, -148, 0, -147); g.quadraticCurveTo(-12, -148, -15, -158); g.closePath(); }, '#c48a50', '#9a6638', { lw: 1.2, sx: 0, sy: -1 }); paw(0, -173, 6, '#fff');
  if (!o.flip) txt("ELLA'S ARK", 0, -140, "700 5.5px 'EA Lilita', sans-serif", '#fff', null);
  // arms
  const armL = pose === 'wave' ? [[-30, -182], [-50, -205], [-52, -238]] : [[-30, -182], [-52, -150], [-30, -124]];
  const armR = pose === 'hose' ? [[30, -182], [50, -160], [72, -164]] : [[30, -182], [52, -150], [30, -124]];
  limb(armL, 11, SK); limb(armR, 11, SK);
  // short sleeves
  paint(() => { S([[-36, -186], [-22, -194], [-25, -170], [-44, -166]], .7); S([[36, -186], [22, -194], [25, -170], [44, -166]], .7); }, OL, OLD, { sx: -2, sy: -2 });
  paint(() => { RR(-46, -172, 22, 6, 3); RR(24, -172, 22, 6, 3); }, lighten(OL.startsWith('#') ? OL : '#2f9be0', .25), OLD, { lw: 1.2, sx: 0, sy: -1 });
  const hand = (p) => paint(() => C(p[0], p[1], 6.5), SK, SKD, { lw: 1.5, sx: -1.5, sy: -1.5 });
  hand(armL[2]); hand(armR[2]);
  if (pose === 'hose') { const [hx, hy] = armR[2]; paint(() => { g.moveTo(hx - 3, hy - 4); g.lineTo(hx + 16, hy - 8); g.lineTo(hx + 17, hy - 2); g.lineTo(hx - 2, hy + 4); g.closePath(); }, '#e04a3a', '#a8302a', { lw: 1.4 }); line([[hx - 4, hy + 6], [hx - 20, hy + 40], [hx - 10, hy + 120]], '#2f8a4a', 4); }
  // neck + face
  paint(() => RR(-7, -204, 14, 14, 4), SK, SKD, { lw: 1.5, sx: 2, sy: 0 });
  g.strokeStyle = OLD; g.lineWidth = 2.5; g.beginPath(); g.moveTo(-11, -193); g.quadraticCurveTo(0, -186, 11, -193); g.stroke();
  paint(() => S([[0, -250], [20, -243], [25, -224], [20, -206], [0, -196], [-20, -206], [-25, -224], [-20, -243]], .9), SK, SKD, { sx: 3, sy: -1, hi: () => { hiBlob(-12, -214, 6, 3.5, .35, 0, '#ff9a8a'); hiBlob(12, -214, 6, 3.5, .35, 0, '#ff9a8a'); } });
  // freckles
  g.fillStyle = 'rgba(190,120,80,.55)'; for (const [fx, fy] of [[-15, -217], [-12, -219], [-16, -213], [12, -219], [15, -217], [14, -213], [-2, -219], [2, -220]]) { g.beginPath(); C(fx, fy, .8); g.fill(); }
  eye(-9.5, -226, 6, '#3f86b8', { ir: .62, lx: .12, ly: .12, lid: .12, lidCol: SK }); eye(9.5, -226, 6, '#3f86b8', { ir: .62, lx: .12, ly: .12, lid: .12, lidCol: SK });
  for (const k of [-1, 1]) { g.strokeStyle = INK; g.lineWidth = 2.2; g.beginPath(); g.arc(k * 9.5, -225, 6.2, 1.12 * Math.PI, 1.88 * Math.PI); g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 1.6; for (const k of [-1, 1]) { const ex = k * 9.5; g.beginPath(); g.moveTo(ex + k * 5.5, -230); g.lineTo(ex + k * 8.5, -233); g.moveTo(ex + k * 6.2, -227); g.lineTo(ex + k * 9.5, -228.5); g.stroke(); }
  line([[-15, -236], [-9, -239.5], [-4, -237]], '#a87a32', 2.4); line([[4, -238], [9, -241.5], [15, -238.5]], '#a87a32', 2.4);
  line([[-1, -219], [1.5, -214], [-1.5, -213]], SKD, 1.6);
  const mouth = () => { g.moveTo(-9, -209); g.quadraticCurveTo(0, -206, 9, -209); g.quadraticCurveTo(6, -200.5, 0, -200); g.quadraticCurveTo(-6, -200.5, -9, -209); g.closePath(); };
  paint(mouth, '#9a2b35', null, { lw: 1.2 });
  g.save(); g.beginPath(); mouth(); g.clip(); g.fillStyle = '#fff'; g.fillRect(-10, -210, 20, 4.2); g.fillStyle = '#ef7d8c'; g.beginPath(); E(0, -200.5, 4, 2.2); g.fill(); g.restore();
  line([[-10.5, -210], [-9, -208.5]], INK, 1.2); line([[10.5, -210], [9, -208.5]], INK, 1.2);
  // side curls framing face + to shoulders
  hairMass([[-27, -240, 8.5], [-30, -227, 8.5], [-30, -213, 8.5], [-28, -200, 8], [-25, -188, 7.5], [27, -240, 8.5], [30, -227, 8.5], [30, -213, 8.5], [28, -200, 8], [25, -188, 7.5]]);
  // bandana
  paint(() => { g.moveTo(-26, -238); g.quadraticCurveTo(0, -254, 26, -238); g.lineTo(25, -247); g.quadraticCurveTo(0, -263, -25, -247); g.closePath(); }, '#d94b3c', '#a8332a', { lw: 1.6, sx: 0, sy: -2, tex: () => { g.fillStyle = 'rgba(255,240,220,.85)'; for (let i = -22; i <= 22; i += 6) { g.beginPath(); C(i, -248 - (1 - (i / 26) ** 2) * 6, 1.1); g.fill(); } } });
  paint(() => { S([[-27, -244], [-37, -252], [-42, -244], [-35, -238]], .6); S([[-30, -240], [-40, -232], [-44, -222], [-36, -228]], .6); }, '#d94b3c', '#a8332a', { lw: 1.4, sx: 0, sy: -1 });
  // bangs + top curls
  hairMass([[-22, -268, 9.5], [-8, -274, 10], [8, -274, 10], [22, -268, 9.5], [-15, -255, 8], [-4, -258, 8.5], [6, -258, 8.5], [16, -255, 8], [-24, -249, 7], [24, -249, 7]]);
  for (const k of [-1, 1]) { const lx = k * 10; paint(() => { g.moveTo(lx - 8, -270); g.quadraticCurveTo(lx, -273, lx + 8, -270); g.quadraticCurveTo(lx + 8, -260, lx, -259); g.quadraticCurveTo(lx - 8, -260, lx - 8, -270); g.closePath(); }, '#3a5a78', '#24364e', { lw: 1.3, ink: '#b08a2a', sx: 0, sy: 2, hi: () => { hiBlob(lx - 3, -267, 3, 1.6, .7); hiBlob(lx + 3, -262, 1.4, .8, .5); } }); }
  g.strokeStyle = '#b08a2a'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(-2, -270); g.quadraticCurveTo(0, -272, 2, -270); g.stroke();
  g.restore();
}
function stork(x, y, s) { // Gerald, small cameo
  g.save(); g.translate(x, y); g.scale(s, s);
  limb([[0, -40], [-2, -20], [0, 0]], 2, '#e8743a'); limb([[6, -40], [8, -20], [10, 0]], 2, '#e8743a');
  paint(() => S([[-16, -46], [0, -62], [20, -56], [22, -40], [4, -36]], .9), '#fbfbf6', '#d8d8d0', { sx: -2, sy: -2 });
  paint(() => S([[-16, -48], [-6, -58], [-14, -40]], .8), '#2a2a2a', null, { lw: 1 });
  paint(() => RR(-4, -58, 22, 16, 3), '#e0457b', '#b8306a', { lw: 1.3 }); txt('SD', 7, -50, "700 7px 'EA Lilita'", '#fff', null);
  limb([[18, -58], [22, -78], [20, -92]], 4, '#fbfbf6');
  paint(() => C(20, -96, 7), '#fbfbf6', '#d8d8d0', { lw: 1.5 }); eye(22, -97, 2.4, '#222', { lid: .45, lidCol: '#fbfbf6' });
  paint(() => { g.moveTo(25, -98); g.lineTo(46, -92); g.lineTo(25, -93); g.closePath(); }, '#e8743a', '#c05a24', { lw: 1.3 });
  g.restore();
}

function chihuahuaHead(cx, cy, s, o = {}) { // used by Chancla + Chihuahuasaurus
  g.save(); g.translate(cx, cy); g.scale(s, s);
  const F = o.fur || '#e3b27b', FD = '#b98450', IN = '#f4a6a6';
  for (const k of [-1, 1]) paint(() => { g.moveTo(k * 8, -10); g.quadraticCurveTo(k * 30, -36, k * 36, -42); g.quadraticCurveTo(k * 30, -14, k * 15, 2); g.closePath(); }, F, FD, { lw: 1.8, sx: k * 2, sy: 1, tex: () => { g.fillStyle = IN; g.beginPath(); g.moveTo(k * 11, -9); g.quadraticCurveTo(k * 27, -30, k * 32, -36); g.quadraticCurveTo(k * 27, -15, k * 15, -1); g.fill(); } });
  paint(() => S([[0, -22], [16, -16], [20, 0], [12, 14], [0, 17], [-12, 14], [-20, 0], [-16, -16]], .9), F, FD, { sx: -3, sy: -3, hi: () => hiBlob(-7, -13, 6, 3, .3) });
  paint(() => E(0, 8, 9, 7), '#f1d2a8', '#d6b080', { lw: 1.4, sx: -1, sy: -2 });
  paint(() => E(0, 4, 3.4, 2.4), '#2a1a12', null, { lw: 1, hi: () => hiBlob(-1, 3, 1.3, .7, .7) });
  const er = o.eyeR || 7.2; eye(-9, -4, er, '#3b2412', { ir: .7, sx: 1.05, lx: .05, ly: .12 }); eye(9, -4, er, '#3b2412', { ir: .7, sx: 1.05, lx: -.05, ly: .12 });
  if (o.mouth === 'roar') { paint(() => { g.moveTo(-7, 9); g.quadraticCurveTo(0, 7, 7, 9); g.quadraticCurveTo(5, 19, 0, 20); g.quadraticCurveTo(-5, 19, -7, 9); g.closePath(); }, '#7a1f2a', null, { lw: 1.3 }); g.fillStyle = '#fff'; for (const k of [-1, 1]) { g.beginPath(); g.moveTo(k * 5.5, 9.5); g.lineTo(k * 4, 13); g.lineTo(k * 3, 9.5); g.fill(); } g.fillStyle = '#f07a8a'; g.beginPath(); E(0, 17, 3, 2); g.fill(); }
  else line([[-4, 10], [0, 12], [4, 10]], INK, 1.3);
  if (o.brows) { line([[-15, -13], [-10, -15], [-5, -13]], '#8a5a30', 2.2); line([[5, -13], [10, -15], [15, -13]], '#8a5a30', 2.2); }
  g.restore();
}
