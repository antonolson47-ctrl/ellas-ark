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
  if (!o.flip) txt("ELLA'S ARK", 0, -140, '700 5.5px "Lilita One", sans-serif', '#fff', null);
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
// ---- dogs ----
function biscuit(x, y, s, o = {}) {
  seed = 77; g.save(); g.translate(x, y); g.scale(s * (o.flip ? -1 : 1), s);
  const T = '#c9955c', TD = '#94673a', WH = '#f4ead6', WHD = '#d6c4a4';
  shadow(0, 0, 30, 5, .32);
  limb([[-20, -20], [-31, -32], [-30, -46]], 6, T);
  paint(() => S([[-22, 0], [-27, -18], [-19, -38], [-4, -45], [10, -40], [17, -24], [19, 0]], .9), T, TD, { sx: -3, sy: -2, tex: () => fur(-30, -48, 50, 50, '#6e4826', 90, 6, 1.5, 1, .45) });
  paint(() => E(8, -24, 8, 13), WH, WHD, { lw: 0, sx: -2, sy: -1, tex: () => fur(0, -36, 16, 26, '#b9a684', 30, 4, 1.6, .8, .5) });
  paint(() => { RR(-1, -30, 9, 30, 4); RR(10, -30, 9, 30, 4); }, T, TD, { sx: -2, sy: 0 }); paint(() => { E(3.5, -2, 6.5, 4); E(15, -2, 6.5, 4); }, WH, WHD, { lw: 1.4, sx: -1, sy: -1 });
  // ears
  paint(() => { g.moveTo(-9, -66); g.lineTo(-13, -90); g.lineTo(2, -72); g.closePath(); }, T, TD, { lw: 1.6, sx: -2, sy: 0, tex: () => { g.fillStyle = '#e9a3a0'; g.beginPath(); g.moveTo(-8, -70); g.lineTo(-11, -84); g.lineTo(-2, -73); g.fill(); } });
  paint(() => { g.moveTo(14, -73); g.quadraticCurveTo(28, -78, 30, -64); g.quadraticCurveTo(24, -66, 18, -63); g.closePath(); }, TD, '#7a5230', { lw: 1.6 });
  paint(() => tuft(6, -60, 18, 15.5, 11, .14, .3), T, TD, { sx: -3, sy: -2, tex: () => fur(-14, -78, 40, 34, '#7a5230', 70, 5, 1.6, 1, .4) });
  paint(() => tuft(12, -50, 11, 7.5, 8, .2, 1.2), WH, WHD, { sx: -2, sy: -1, lw: 1.5 });
  paint(() => { for (let i = 0; i < 4; i++) { g.moveTo(5 + i * 4, -46); g.lineTo(6 + i * 4, -39 + (i % 2) * 2); g.lineTo(9 + i * 4, -46); } }, WH, null, { lw: 1 });
  paint(() => E(17, -55, 4, 3), '#2a1a12', null, { lw: 1, hi: () => hiBlob(16, -56.5, 1.6, .9, .7) });
  eye(0, -63, 4.4, '#5a3418', { lx: .25 }); eye(13, -64, 4.4, '#5a3418', { lx: .25 });
  line([[-6, -70], [-1, -73], [4, -71]], '#5a3a22', 3.2); line([[9, -72], [14, -71.5], [18, -69]], '#5a3a22', 3.2);
  line([[10, -47], [14, -45], [18, -47]], INK, 1.4);
  if (o.collar) { paint(() => RR(-6, -42, 26, 5, 2), '#e9503f', '#b8352a', { lw: 1.3 }); paint(() => C(8, -36, 3), '#f4c542', '#c9962e', { lw: 1 }); }
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
function chancla(x, y, s) {
  seed = 31; g.save(); g.translate(x, y); g.scale(s, s); const F = '#e3b27b', FD = '#b98450';
  shadow(0, 0, 18, 4);
  paint(() => S([[-12, 0], [-14, -12], [-8, -24], [4, -26], [11, -16], [12, 0]], .9), F, FD, { sx: -2, sy: -2 });
  paint(() => { RR(-4, -18, 6, 18, 3); RR(4, -18, 6, 18, 3); }, F, FD, { lw: 1.4, sx: -1, sy: 0 });
  limb([[-12, -8], [-20, -14], [-22, -22]], 3, F);
  chihuahuaHead(1, -36, .75, { brows: true });
  g.strokeStyle = 'rgba(80,40,20,.6)'; g.lineWidth = 1.2; for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(k * (26 + i * 3), -40 + i * 7); g.lineTo(k * (30 + i * 3), -38 + i * 7); g.stroke(); }
  g.restore();
}
function corgi(x, y, s) {
  seed = 52; g.save(); g.translate(x, y); g.scale(s, s); const O = '#e08a3c', OD = '#b0601f', WH = '#fbf1e0', WHD = '#dccbb0';
  shadow(0, 0, 34, 5);
  paint(() => { RR(-28, -14, 9, 14, 4); RR(14, -14, 9, 14, 4); }, O, OD, { lw: 1.4, sx: -1, sy: 0 });
  paint(() => S([[-34, -18], [-30, -34], [0, -38], [26, -34], [32, -18], [20, -10], [-24, -10]], .9), O, OD, { sx: -2, sy: -3, tex: () => fur(-36, -40, 70, 30, '#a05a20', 60, 5, 0, 1, .4) });
  paint(() => S([[10, -12], [28, -16], [30, -30], [18, -24]], .8), WH, WHD, { lw: 0 });
  paint(() => { RR(-22, -14, 8, 14, 4); RR(20, -14, 8, 14, 4); }, O, OD, { lw: 1.4, sx: -1, sy: 0 }); paint(() => { E(-18, -2, 5, 3); E(24, -2, 5, 3); }, WH, WHD, { lw: 1.2 });
  paint(() => C(-35, -28, 5), WH, WHD, { lw: 1.4 });
  // head
  for (const k of [-1, 1]) paint(() => { g.moveTo(28 + k * 6, -52); g.lineTo(28 + k * 13, -74); g.lineTo(28 + k * 15 - k * 12, -56); g.closePath(); }, O, OD, { lw: 1.6, tex: () => { g.fillStyle = '#f2b0a0'; g.beginPath(); g.moveTo(28 + k * 8, -55); g.lineTo(28 + k * 12.5, -69); g.lineTo(28 + k * 5, -57); g.fill(); } });
  paint(() => S([[28, -66], [42, -58], [44, -44], [34, -36], [22, -36], [13, -44], [15, -58]], .9), O, OD, { sx: -2, sy: -2 });
  paint(() => S([[28, -56], [36, -44], [40, -38], [28, -34], [17, -38], [21, -46]], .9), WH, WHD, { lw: 1.3 });
  paint(() => E(29, -42, 3, 2.2), '#2a1a12', null, { lw: 1 }); eye(22, -51, 3.6, '#4a2810'); eye(35, -51, 3.6, '#4a2810');
  paint(() => { g.moveTo(25, -38); g.quadraticCurveTo(29, -35, 33, -38); g.quadraticCurveTo(31, -30, 29, -30); g.quadraticCurveTo(27, -30, 25, -38); }, '#f07a8a', null, { lw: 1.2 });
  g.restore();
}
function cat(x, y, s, o = {}) { // orange tabby (Kevin) sitting
  seed = 66; g.save(); g.translate(x, y); g.scale(s, s); const O = o.fur || '#ee9a43', OD = o.dark || '#c06a22';
  shadow(0, 0, 22, 4);
  limb([[12, -4], [26, -6], [30, -22]], 6, O);
  paint(() => S([[-15, 0], [-17, -16], [-10, -32], [0, -36], [10, -32], [16, -16], [15, 0]], .9), O, OD, { sx: -2, sy: -2, tex: () => { g.strokeStyle = OD; g.lineWidth = 2.5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-18, -26 + i * 7); g.quadraticCurveTo(-10, -24 + i * 7, -8, -28 + i * 7); g.stroke(); g.beginPath(); g.moveTo(18, -26 + i * 7); g.quadraticCurveTo(10, -24 + i * 7, 8, -28 + i * 7); g.stroke(); } } });
  paint(() => E(0, -14, 7, 11), '#fbe6c8', null, { lw: 0 });
  paint(() => { RR(-8, -14, 7, 14, 3.5); RR(1, -14, 7, 14, 3.5); }, O, OD, { lw: 1.3, sx: -1, sy: 0 });
  for (const k of [-1, 1]) paint(() => { g.moveTo(k * 6, -52); g.lineTo(k * 15, -64); g.lineTo(k * 16, -47); g.closePath(); }, O, OD, { lw: 1.5, tex: () => { g.fillStyle = '#f2a8a0'; g.beginPath(); g.moveTo(k * 8, -52); g.lineTo(k * 14, -60); g.lineTo(k * 14.5, -50); g.fill(); } });
  paint(() => S([[0, -58], [14, -53], [18, -42], [12, -33], [0, -31], [-12, -33], [-18, -42], [-14, -53]], .9), O, OD, { sx: -2, sy: -2, tex: () => { g.strokeStyle = OD; g.lineWidth = 2; for (const dx of [-4, 0, 4]) { g.beginPath(); g.moveTo(dx, -58); g.lineTo(dx * .7, -50); g.stroke(); } } });
  // blank stare
  eye(-7, -45, 5, '#9ab84a', { ir: .3, lx: 0, ly: 0 }); eye(7, -45, 5, '#9ab84a', { ir: .3, lx: 0, ly: 0 });
  paint(() => { g.moveTo(-2, -39); g.lineTo(2, -39); g.lineTo(0, -37); g.closePath(); }, '#f08a9a', null, { lw: .9 }); line([[-3, -35], [0, -36], [3, -35]], INK, 1.1);
  g.strokeStyle = 'rgba(40,20,10,.6)'; g.lineWidth = .8; for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(k * 8, -37 + i); g.lineTo(k * 20, -39 + i * 3); g.stroke(); }
  if (o.cloud) { cloud(0, -78, 34, 10, '#9aa4b8', '#6e7890'); g.strokeStyle = '#6aa8e8'; g.lineWidth = 1.4; for (let i = -12; i <= 12; i += 6) { g.beginPath(); g.moveTo(i, -72); g.lineTo(i - 2, -66); g.stroke(); } }
  g.restore();
}
function persian(x, y, s) {
  seed = 90; g.save(); g.translate(x, y); g.scale(s, s); const W = '#fbf7f2', WD = '#d9d0c6';
  shadow(0, 0, 26, 4);
  paint(() => tuft(0, -16, 26, 16, 12, .12), W, WD, { sx: -3, sy: -3, tex: () => fur(-28, -34, 56, 34, '#c8bdb0', 80, 6, 1.4, 1, .45) });
  paint(() => tuft(4, -36, 17, 14, 12, .14, .4), W, WD, { sx: -3, sy: -2, tex: () => fur(-14, -50, 36, 28, '#c8bdb0', 50, 5, 1.5, 1, .4) });
  for (const k of [-1, 1]) paint(() => { g.moveTo(4 + k * 8, -46); g.lineTo(4 + k * 14, -54); g.lineTo(4 + k * 15, -42); g.closePath(); }, W, WD, { lw: 1.3 });
  eye(-2, -37, 4.5, '#d8a12e', { ir: .55, lid: .45, lidCol: W, lidTilt: 1 }); eye(10, -37, 4.5, '#d8a12e', { ir: .55, lid: .45, lidCol: W, lidTilt: -1 });
  paint(() => E(4, -31, 2, 1.4), '#e9909a', null, { lw: .8 }); line([[1, -27.5], [4, -28.5], [7, -27.5]], INK, 1.1);
  // tiara
  paint(() => { g.moveTo(-6, -48); g.lineTo(-4, -56); g.lineTo(0, -51); g.lineTo(4, -58); g.lineTo(8, -51); g.lineTo(12, -56); g.lineTo(14, -48); g.closePath(); }, '#f4c542', '#c9962e', { lw: 1.1 }); paint(() => C(4, -54, 1.5), '#e0457b', null, { lw: .6 });
  g.restore();
}
// ---- rhino (body reused by Rhin-Eagle) ----
function rhinoBody(o = {}) {
  const G = o.col || '#a3a6ab', GD = '#73767c';
  paint(() => { RR(-48, -40, 18, 40, 6); RR(22, -40, 18, 40, 6); }, darken('#a3a6ab', .15), GD, { sx: -2, sy: 0 }); // far legs
  limb([[-58, -62], [-70, -56], [-72, -46]], 4, G);
  paint(() => S([[-62, -50], [-58, -78], [-30, -94], [10, -96], [44, -84], [58, -60], [50, -36], [10, -30], [-40, -32]], .9), G, GD, { sx: -4, sy: -5, tex: () => { wrinkles([[[-40, -82], [-34, -60], [-38, -38]], [[30, -86], [36, -62], [32, -40]], [[-20, -40], [0, -36], [20, -40]], [[-10, -88], [6, -90]], [[-52, -70], [-46, -54]], [[0, -60], [12, -56]], [[-24, -72], [-14, -70]]], 'rgba(40,40,50,.35)', 1.6); g.fillStyle = 'rgba(255,255,255,.12)'; g.beginPath(); E(-6, -84, 40, 8, -.05); g.fill(); g.fillStyle = 'rgba(40,40,60,.10)'; for (let i = 0; i < 40; i++) { g.beginPath(); C(R(-58, 52), R(-90, -34), R(.8, 2)); g.fill(); } if (o.mud) { g.fillStyle = 'rgba(110,70,40,.75)'; for (const [mx, my, mr] of [[-30, -48, 9], [-10, -40, 7], [20, -50, 10], [-46, -60, 6], [40, -44, 6]]) { g.beginPath(); tuft(mx, my, mr, mr * .7, 6, .3); g.fill(); } } } });
  paint(() => { RR(-40, -42, 20, 42, 7); RR(28, -42, 20, 42, 7); }, G, GD, { sx: -2, sy: 0, tex: () => wrinkles([[[-38, -16], [-30, -14], [-22, -16]], [[30, -16], [38, -14], [46, -16]]], 'rgba(40,40,50,.35)') });
  g.fillStyle = '#e8e2d6'; for (const lx of [-36, -30, -24, 32, 38, 44]) { g.beginPath(); E(lx, -2, 3, 2.2); g.fill(); g.strokeStyle = INK; g.lineWidth = 1; g.stroke(); }
}
function rhonda(x, y, s) {
  seed = 12; g.save(); g.translate(x, y); g.scale(s, s); const G = '#a3a6ab', GD = '#73767c';
  shadow(0, 0, 70, 8); rhinoBody({ mud: true });
  // head
  paint(() => S([[44, -86], [62, -88], [82, -72], [96, -52], [90, -40], [70, -40], [52, -50]], .9), G, GD, { sx: -3, sy: -3, tex: () => wrinkles([[[60, -60], [66, -50]], [[74, -48], [80, -44]]], 'rgba(40,40,50,.35)') });
  paint(() => { g.moveTo(84, -62); g.quadraticCurveTo(92, -86, 88, -102); g.quadraticCurveTo(100, -84, 96, -58); g.closePath(); }, '#e4dccb', '#b9ae98', { lw: 1.6, sx: -1, sy: 0 });
  paint(() => { g.moveTo(72, -76); g.quadraticCurveTo(75, -88, 74, -94); g.quadraticCurveTo(82, -86, 80, -74); g.closePath(); }, '#e4dccb', '#b9ae98', { lw: 1.4 });
  paint(() => { g.moveTo(52, -86); g.lineTo(46, -104); g.lineTo(60, -92); g.closePath(); }, G, GD, { lw: 1.5, tex: () => { g.fillStyle = '#e9a3a0'; g.beginPath(); g.moveTo(52, -89); g.lineTo(49, -99); g.lineTo(57, -92); g.fill(); } });
  eye(66, -68, 4.6, '#5a3a20', { ir: .6 });
  // tiny glasses
  g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); C(66, -68, 7.5); g.stroke(); g.beginPath(); g.moveTo(58.5, -69); g.lineTo(50, -74); g.stroke(); g.fillStyle = 'rgba(180,220,255,.25)'; g.beginPath(); C(66, -68, 7.5); g.fill(); hiBlob(63, -71, 2.5, 1.2, .6);
  line([[84, -46], [90, -44]], INK, 1.4);
  g.restore();
}
function gator(x, y, s, o = {}) { // in pool, head + back
  g.save(); g.translate(x, y); g.scale(s, s); const Gc = '#5e8a46', GcD = '#3c5e2e';
  paint(() => S([[-60, -2], [-40, -10], [-10, -12], [16, -10], [16, 0], [-50, 2]], .9), Gc, GcD, { sx: -2, sy: -2, tex: () => { g.fillStyle = '#2e4a24'; for (let i = -54; i < 10; i += 7) { g.beginPath(); g.moveTo(i, -9); g.lineTo(i + 3, -15); g.lineTo(i + 6, -9); g.fill(); } } });
  paint(() => S([[12, -10], [30, -16], [64, -12], [74, -6], [70, 0], [14, 0]], .9), Gc, GcD, { sx: -2, sy: -2, tex: () => scales(12, -18, 64, 18, '#2e4a24', 5, .5) });
  for (const ex of [28, 40]) { paint(() => E(ex, -17, 6, 5), Gc, GcD, { lw: 1.5 }); eye(ex, -18, 4, '#d8b82e', { ir: .5, lid: .35, lidCol: Gc }); }
  g.fillStyle = '#fff'; for (let i = 20; i < 70; i += 6) { g.beginPath(); g.moveTo(i, -2); g.lineTo(i + 2, 2); g.lineTo(i + 4, -2); g.fill(); }
  // lady bow
  if (o.bow) { for (const k of [-1, 1]) paint(() => { g.moveTo(34, -24); g.quadraticCurveTo(34 + k * 12, -34, 34 + k * 13, -22); g.closePath(); }, '#ff6fae', '#d84a8a', { lw: 1.2 }); paint(() => C(34, -24, 2.6), '#ff6fae', null, { lw: 1 }); }
  g.restore();
}
// ---- MASHUPS ----
function chihuahuasaurus(x, y, s) {
  seed = 501; g.save(); g.translate(x, y); g.scale(s, s);
  const Gc = '#7fae5a', GcD = '#4f7d3c', BL = '#efe2b6', BLD = '#cdbb88';
  shadow(-10, 0, 90, 9, .35);
  // far leg
  paint(() => S([[0, -92], [22, -96], [30, -64], [24, -30], [30, -6], [6, -4], [4, -34], [-6, -66]], .9), darken('#7fae5a', .22), GcD, { sx: -2, sy: 0 });
  paint(() => { for (const tx of [8, 18, 28]) { g.moveTo(tx - 4, -3); g.lineTo(tx + 2, 2); g.lineTo(tx + 5, -6); } }, '#f4ecd2', null, { lw: 1 });
  limb([[48, -112], [60, -104], [66, -96]], 4.5, darken('#7fae5a', .15));
  // body + tail + neck (one silhouette)
  const body = () => S([[-168, -134], [-120, -146], [-64, -150], [-20, -152], [20, -160], [48, -170], [64, -186], [84, -170], [80, -140], [66, -112], [44, -88], [6, -78], [-34, -90], [-84, -112], [-132, -126]], .9);
  paint(body, Gc, GcD, { sx: -4, sy: -6, tex: () => { scales(-170, -195, 260, 120, '#3c6a2c', 9, .4); g.fillStyle = 'rgba(60,100,40,.55)'; for (let i = 0; i < 8; i++) { const px = -130 + i * 22, py = -140 - (i > 4 ? (i - 4) * 5 : 0); g.beginPath(); E(px, py, 7, 3.2, -.1 - i * .03); g.fill(); } } });
  paint(() => S([[70, -150], [72, -126], [56, -100], [24, -84], [-4, -86], [20, -104], [46, -124], [58, -146]], .9), BL, BLD, { lw: 0, sx: -2, sy: -2, tex: () => { g.strokeStyle = 'rgba(140,120,70,.45)'; g.lineWidth = 1.2; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(8 + i * 10, -84 - i * 6); g.lineTo(26 + i * 8, -104 - i * 7); g.stroke(); } } });
  // back spikes
  paint(() => { for (let i = 0; i < 8; i++) { const px = -136 + i * 22, py = -142 - (i > 4 ? (i - 4) * 5 : 0) - Math.sin(i / 7 * Math.PI) * 6; g.moveTo(px - 6, py + 3); g.lineTo(px - 1, py - 10); g.lineTo(px + 6, py + 3); g.closePath(); } }, '#e9a33a', '#c07a20', { lw: 1.4 });
  // near thigh + shin + foot
  paint(() => { E(-12, -104, 34, 40, .35); S([[-30, -90], [8, -84], [12, -50], [10, -26], [22, -8], [-6, -4], [-14, -30], [-20, -60]], .9); }, Gc, GcD, { sx: -3, sy: -4, tex: () => scales(-50, -150, 80, 150, '#3c6a2c', 8, .35) });
  paint(() => { for (const tx of [-2, 9, 20]) { g.moveTo(tx - 4, -3); g.lineTo(tx + 2, 3); g.lineTo(tx + 5, -6); } }, '#f4ecd2', null, { lw: 1 });
  // tiny arms (near)
  limb([[54, -120], [68, -114], [72, -104]], 4.5, Gc); g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath(); g.moveTo(72, -103); g.lineTo(76, -100); g.moveTo(70, -102); g.lineTo(72, -98); g.stroke();
  // rhinestone collar
  paint(() => S([[56, -170], [78, -180], [86, -168], [64, -158]], .6), '#ff5fae', '#d43c8a', { lw: 1.4 });
  for (let i = 0; i < 4; i++) sparkle(62 + i * 6, -169 - i * 2.5, 1.3, '#fff');
  chihuahuaHead(90, -200, 1.22, { mouth: 'roar', eyeR: 7.8, brows: true });
  g.strokeStyle = 'rgba(60,30,20,.55)'; g.lineWidth = 2; for (const [sx, sy] of [[-178, -146], [-182, -132], [120, -230], [126, -216], [40, -12], [46, -2]]) { g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + 6, sy - 3); g.stroke(); }
  paint(() => { RR(110, -278, 74, 30, 14); g.moveTo(118, -252); g.lineTo(110, -238); g.lineTo(130, -252); }, '#fff', null, { lw: 1.6 }); txt('squeak!', 147, -263, 'italic 15px "Luckiest Guy", sans-serif', '#e0457b', null);
  g.restore();
}
function hotDogconda(x, y, s) {
  seed = 602; g.save(); g.translate(x, y); g.scale(s, s);
  const B = '#a8612e', BD = '#6e3a18', PAT = '#5a2c10', PATL = '#d8a060';
  const pts = [[-150, -40], [-120, -70], [-70, -60], [-50, -20], [-10, -10], [30, -40], [10, -90], [-40, -110], [-60, -150], [-10, -175], [60, -160], [100, -120], [130, -150]];
  shadow(-20, 0, 130, 10, .3);
  // sample spline
  const samp = []; { const n = pts.length; for (let i = 0; i < n - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)]; for (let t = 0; t < 1; t += .05) { const t2 = t * t, t3 = t2 * t; samp.push([.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3), .5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } } samp.push(pts[n - 1]); }
  const legs = () => { for (const k of [22, 50, 80, 112, 150, 196]) { const [lx, ly] = samp[k]; paint(() => { RR(lx - 6, ly + 10, 9, 18, 4); RR(lx + 4, ly + 10, 9, 18, 4); }, B, BD, { lw: 1.5, sx: -1, sy: 0 }); paint(() => { E(lx - 1, ly + 28, 6, 3.5); E(lx + 9, ly + 28, 6, 3.5); }, BD, null, { lw: 1.2 }); } };
  // tail wag
  const [tx, ty] = samp[0]; limb([[tx, ty], [tx - 14, ty - 14], [tx - 18, ty - 30]], 6, B); g.strokeStyle = 'rgba(60,30,10,.6)'; g.lineWidth = 2; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(tx - 14, ty - 22, 20 + i * 5, -2.6, -1.9); g.stroke(); }
  const tube = (w, col) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(samp[0][0], samp[0][1]); for (const p of samp) g.lineTo(p[0], p[1]); g.stroke(); };
  g.save(); tube(40, INK); tube(35, BD); g.translate(-1.5, -3.5); tube(27, B); g.translate(-1, -3); tube(9, lighten('#a8612e', .25)); g.restore();
  // python saddle pattern
  for (let i = 8; i < samp.length - 14; i += 7) { const [px, py] = samp[i], [qx, qy] = samp[i + 1]; const an = Math.atan2(qy - py, qx - px); g.save(); g.translate(px, py); g.rotate(an); paint(() => { g.moveTo(-6, -9); g.quadraticCurveTo(0, -4, 6, -9); g.quadraticCurveTo(9, 0, 6, 8); g.quadraticCurveTo(0, 4, -6, 8); g.quadraticCurveTo(-9, 0, -6, -9); g.closePath(); }, PAT, null, { lw: 0 }); g.strokeStyle = PATL; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-6, -9); g.quadraticCurveTo(0, -4, 6, -9); g.stroke(); g.restore(); }
  legs();
  // head at end
  const [hx, hy] = samp[samp.length - 1];
  g.save(); g.translate(hx, hy); g.scale(1.45, 1.45);
  paint(() => { g.moveTo(-8, -10); g.quadraticCurveTo(-16, 10, -6, 30); g.quadraticCurveTo(2, 34, 6, 20); g.quadraticCurveTo(6, 4, 4, -8); g.closePath(); }, BD, '#4a2410', { lw: 1.8 });
  paint(() => S([[-14, -22], [4, -26], [20, -18], [40, -12], [50, -4], [46, 4], [24, 6], [2, 6], [-14, -4]], .9), B, BD, { sx: -2, sy: -3, hi: () => hiBlob(0, -18, 8, 3, .25) });
  paint(() => E(50, -5, 5, 4), '#2a1a12', null, { lw: 1, hi: () => hiBlob(48.5, -6.5, 1.8, 1, .7) });
  eye(10, -14, 5.5, '#4a2410', { lx: .25 });
  line([[4, -22], [10, -24], [16, -22]], '#4a2410', 2.4);
  paint(() => { g.moveTo(30, 4); g.quadraticCurveTo(36, 16, 30, 22); g.quadraticCurveTo(24, 18, 26, 4); g.closePath(); }, '#f07a8a', '#d0566a', { lw: 1.3 });
  paint(() => { g.moveTo(-18, -8); g.quadraticCurveTo(-28, 16, -18, 34); g.quadraticCurveTo(-8, 36, -6, 22); g.quadraticCurveTo(-6, 4, -10, -10); g.closePath(); }, BD, '#4a2410', { lw: 1.8 });
  g.restore();
  // "30 FT" measuring tape gag
  g.restore();
}
function rhinEagle(x, y, s) {
  seed = 703; g.save(); g.translate(x, y); g.scale(s, s);
  shadow(0, 0, 76, 9, .35);
  // tiny wings (way too small), feathered
  for (const [wx, wy, k, col] of [[-6, -92, -1, '#6a3e1c'], [10, -94, 1, '#8a5428']]) {
    const wing = () => { g.moveTo(wx, wy); g.quadraticCurveTo(wx + k * 6 - 10, wy - 30, wx - 16 + k * 10, wy - 46); for (let i = 0; i < 5; i++) { const t = i / 4, fx = wx - 16 + k * 10 + t * 40, fy = wy - 46 + t * 22; g.quadraticCurveTo(fx + 6, fy - 4, fx + 8, fy + 6); } g.quadraticCurveTo(wx + 20, wy - 6, wx, wy); g.closePath(); };
    paint(wing, col, '#4a2a12', { lw: 1.8, sx: -2, sy: -3, tex: () => { g.strokeStyle = 'rgba(255,220,170,.35)'; g.lineWidth = 1.2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(wx + 2, wy - 4); g.lineTo(wx - 10 + k * 8 + i * 9, wy - 38 + i * 6); g.stroke(); } } });
  }
  rhinoBody({});
  // feathered neck ruff + eagle head
  paint(() => tuft(62, -86, 26, 22, 10, .22, .2), '#fbf8f0', '#d8d0c0', { sx: -3, sy: -3, tex: () => { g.strokeStyle = 'rgba(150,140,120,.6)'; g.lineWidth = 1.2; for (let i = 0; i < 18; i++) { const px = 40 + rnd() * 44, py = -104 + rnd() * 40; g.beginPath(); g.arc(px, py, 4, .2, 2.9); g.stroke(); } } });
  paint(() => S([[56, -118], [76, -122], [92, -110], [96, -94], [84, -84], [62, -88], [50, -100]], .9), '#fbf8f0', '#d8d0c0', { sx: -3, sy: -3 });
  // beak
  paint(() => { g.moveTo(90, -104); g.quadraticCurveTo(114, -106, 118, -88); g.quadraticCurveTo(116, -80, 110, -82); g.quadraticCurveTo(108, -90, 92, -88); g.closePath(); }, '#f4c13a', '#c98c1c', { lw: 1.8, sx: -1, sy: -2 });
  // horns on top of beak
  paint(() => { g.moveTo(96, -106); g.quadraticCurveTo(100, -128, 96, -144); g.quadraticCurveTo(110, -126, 106, -104); g.closePath(); }, '#e4dccb', '#b9ae98', { lw: 1.6, sx: -1, sy: 0 });
  paint(() => { g.moveTo(84, -114); g.quadraticCurveTo(86, -124, 85, -130); g.quadraticCurveTo(93, -122, 91, -112); g.closePath(); }, '#e4dccb', '#b9ae98', { lw: 1.4 });
  eye(78, -104, 5.6, '#e3a21a', { ir: .55, lid: .32, lidCol: '#fbf8f0', lidTilt: 1.8 });
  line([[68, -114], [78, -112], [88, -115]], INK, 3);
  // stars-and-stripes bandana
  paint(() => S([[46, -78], [80, -78], [70, -60], [56, -56]], .5), '#d23b3b', '#a82828', { lw: 1.6, tex: () => { g.strokeStyle = '#fff'; g.lineWidth = 2.2; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(44, -74 + i * 6); g.lineTo(82, -74 + i * 6); g.stroke(); } g.fillStyle = '#2f4f9a'; g.fillRect(44, -80, 14, 10); g.fillStyle = '#fff'; for (let i = 0; i < 3; i++) { g.beginPath(); star5(48 + i * 4, -75, 1.6, .7); g.fill(); } } });
  // scream lines
  g.strokeStyle = 'rgba(60,30,20,.6)'; g.lineWidth = 2; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(124, -100 + i * 9); g.lineTo(138 + i * 2, -104 + i * 11); g.stroke(); }
  g.restore();
}
function stork(x, y, s) { // Gerald, small cameo
  g.save(); g.translate(x, y); g.scale(s, s);
  limb([[0, -40], [-2, -20], [0, 0]], 2, '#e8743a'); limb([[6, -40], [8, -20], [10, 0]], 2, '#e8743a');
  paint(() => S([[-16, -46], [0, -62], [20, -56], [22, -40], [4, -36]], .9), '#fbfbf6', '#d8d8d0', { sx: -2, sy: -2 });
  paint(() => S([[-16, -48], [-6, -58], [-14, -40]], .8), '#2a2a2a', null, { lw: 1 });
  paint(() => RR(-4, -58, 22, 16, 3), '#e0457b', '#b8306a', { lw: 1.3 }); txt('SD', 7, -50, '700 7px "Lilita One"', '#fff', null);
  limb([[18, -58], [22, -78], [20, -92]], 4, '#fbfbf6');
  paint(() => C(20, -96, 7), '#fbfbf6', '#d8d8d0', { lw: 1.5 }); eye(22, -97, 2.4, '#222', { lid: .45, lidCol: '#fbfbf6' });
  paint(() => { g.moveTo(25, -98); g.lineTo(46, -92); g.lineTo(25, -93); g.closePath(); }, '#e8743a', '#c05a24', { lw: 1.3 });
  g.restore();
}
