/* ===================== SCENE ART: desert backdrops, story backgrounds, habitats ===================== */
const SKIES = {
  day: [[0, '#5fb6e0'], [.55, '#a8dcef'], [.85, '#ffe2b0'], [1, '#ffd29a']],
  sunset: [[0, '#231b55'], [.22, '#4b2a78'], [.46, '#a6427f'], [.66, '#ec6f55'], [.84, '#ffad5c'], [1, '#ffd88a']],
  night: [[0, '#0c0a2a'], [.5, '#1c1a50'], [.85, '#3a2a6a'], [1, '#5a3a72']],
  storm: [[0, '#2a3040'], [.5, '#4a5468'], [1, '#7a8090']],
  dawn: [[0, '#3a4a8a'], [.4, '#8a7ab0'], [.75, '#f0a8a0'], [1, '#ffd8a8']],
};
const RIDGE_COLS = { day: [['#b0a0c8', '#d8c0c8'], ['#8a6a90', '#b08a9a'], ['#6a4a6a', '#8a6070']], sunset: [['#b25a8a', '#e08aa0'], ['#7a3a7c', '#b0608a'], ['#40235a', '#6a3668']], night: [['#2a2450', '#3a3060'], ['#1e1a40', '#2a2450'], ['#141030', '#1e1838']], storm: [['#5a6070', '#6a7080'], ['#4a5060', '#5a6070'], ['#3a4050', '#4a5060']], dawn: [['#9a8ab8', '#c8a8c0'], ['#7a6a98', '#a088a8'], ['#5a4a78', '#7a6088']] };
const GROUND_COLS = { day: ['#efc690', '#e2ae78', '#d09a68', '#bc865a'], sunset: ['#e8a274', '#d98c60', '#c27050', '#9c5440', '#6e3a34'], night: ['#6a4a5a', '#5a3a4a', '#4a2e3e', '#3a2232'], storm: ['#a89a88', '#988a78', '#887a68'], dawn: ['#e0b090', '#d09a80', '#b88070'] };
function peaksFor(W, hz, amp, seedv, n = 10) { seed = seedv; const pts = [[-5, hz - amp * R(.3, .6)]]; for (let i = 1; i <= n; i++) pts.push([W * i / n + R(-W / n / 3, W / n / 3), hz - amp * R(.35, 1)]); pts.push([W + 5, hz - amp * R(.3, .7)]); return pts; }
// generic Franklin Mountains desert backdrop
function desert(W, H, hz, tod = 'day', o = {}) {
  seed = 3; sky(W, H, SKIES[tod] || SKIES.day, hz);
  if (tod === 'night' || tod === 'sunset' || tod === 'dawn') { g.save(); for (let i = 0; i < W * .2; i++) { g.globalAlpha = R(.2, .8) * (tod === 'night' ? 1 : .5); g.fillStyle = '#fff'; g.beginPath(); C(R(0, W), R(0, hz * .55), R(.4, 1.2)); g.fill(); } g.restore(); }
  if (tod === 'day') { sunGlow(W * .78, hz * .25, 16); seed = 6; cloud(W * .2, hz * .3, 110, 18, '#ffffff', '#e8eef4', .9); cloud(W * .62, hz * .42, 90, 14, '#ffffff', '#dfe8f0', .8); }
  if (tod === 'sunset') { streak(W * .25, hz * .55, W * .5, 12, '#ff9aa0', .5); streak(W * .7, hz * .62, W * .55, 10, '#ffb38a', .45); seed = 7; cloud(W * .78, hz * .5, 110, 20, '#ffc6a0', '#c05a80', .85); cloud(W * .18, hz * .66, 100, 16, '#ffcf9a', '#d0607a', .8); sunGlow(W * .6, hz * .86, 22); rays(W * .6, hz * .86, 12, Math.max(W, H), .035); }
  if (tod === 'night') { g.save(); g.fillStyle = '#fff6d0'; g.beginPath(); C(W * .82, hz * .22, 12); g.fill(); g.fillStyle = SKIES.night[1][1]; g.beginPath(); C(W * .82 + 5, hz * .22 - 3, 11); g.fill(); g.restore(); }
  if (tod === 'storm') { seed = 8; for (let i = 0; i < 6; i++) cloud(R(0, W), R(hz * .1, hz * .6), R(120, 220), R(22, 34), '#6a7488', '#3a4050', .95); }
  const rc = RIDGE_COLS[tod] || RIDGE_COLS.day, amp = Math.min(hz * .55, 140);
  ridge(W, hz, peaksFor(W, hz, amp, 21, 8), 5, rc[0][0], rc[0][1], 21);
  ridge(W, hz, peaksFor(W, hz, amp * .75, 22, 10), 6, rc[1][0], rc[1][1], 22);
  const near = ridge(W, hz, peaksFor(W, hz, amp * .5, 23, 12), 5, rc[2][0], rc[2][1], 23);
  seed = 9; ridgeDetail(near, hz, 'rgba(255,170,150,.12)', 'rgba(20,8,35,.22)');
  if (tod !== 'day' && tod !== 'storm') starOnMountain(o.starX ?? W * .22, hz - amp * .32, 9); else if (tod === 'day') { g.save(); g.globalAlpha = .5; starOnMountain(o.starX ?? W * .22, hz - amp * .32, 7); g.restore(); }
  if (tod === 'sunset' || tod === 'night') { seed = 5; for (let i = 0; i < 4; i++) cityLights(0, W, hz - 6 + i * 3, Math.round(W / 14) + i * 6, .45 + i * .1); }
  ground(W, hz - 2, H, GROUND_COLS[tod] || GROUND_COLS.day);
  seed = 8; for (let i = 0; i < W / 28; i++) creosote(R(0, W), R(hz + 6, hz + 40), R(.2, .4), tod === 'night' ? '#3a4a3a' : '#7a7a4a');
  seed = 12; sandRipples(0, W, hz + 30, H, W / 10, tod === 'night' ? 'rgba(20,10,30,.4)' : 'rgba(120,50,30,.35)'); pebbles(0, W, hz + 40, H, W / 3, tod === 'night' ? '#2a1a2a' : '#7a4a30');
  if (o.flora !== false) { seed = 41; pricklyPear(W * .06, H - 8, .9); yucca(W * .93, H - 6, .75); barrel(W * .8, H - 4, .7); ocotillo(W * .98, hz + (H - hz) * .5, .5); }
}
// Story backgrounds (cached by caller)
function storyBg(bg, W, H) {
  const hz = H * (L.portrait ? .5 : .62);
  const tod = { auction: 'day', ark: 'day', flood: 'storm', news: 'day', sunset: 'sunset', townhall: 'day', dome: 'night', redcarpet: 'sunset', gala: 'night' }[bg] || 'day';
  if (bg === 'townhall') { // interior
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#8a5a3a'); gr.addColorStop(1, '#5a3420'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    seed = 2; for (let x = 0; x < W; x += 26) { g.fillStyle = 'rgba(40,20,8,.25)'; g.fillRect(x, 0, 2, H * .7); }
    paint(() => RR(W * .3, H * .08, W * .4, H * .1, 6), '#2f5a3a', null, { lw: 2 }); txt('TOWN HALL', W / 2, H * .13, `${Math.min(26, W * .06)}px ${FONT.lucky}`, '#ffe9a8', INK, 4);
    for (let i = 0; i < 3; i++) { const x = W * (.18 + i * .32); paint(() => RR(x - 30, H * .25, 60, 90, 30), '#7fc8e0', null, { lw: 2.5 }); g.fillStyle = '#9a7aa8'; g.beginPath(); g.moveTo(x - 30, H * .25 + 80); g.lineTo(x - 10, H * .25 + 60); g.lineTo(x + 8, H * .25 + 70); g.lineTo(x + 30, H * .25 + 58); g.lineTo(x + 30, H * .25 + 90); g.lineTo(x - 30, H * .25 + 90); g.fill(); }
    g.fillStyle = '#4a2a16'; g.fillRect(0, H * .7, W, H * .3); for (let i = 0; i < 4; i++) { g.fillStyle = 'rgba(255,220,160,.08)'; g.fillRect(0, H * .72 + i * 30, W, 4); }
    return;
  }
  desert(W, H, hz, tod, { flora: bg !== 'gala' });
  const s = Math.min(W / 390, H / 600) * (L.portrait ? 1 : .9);
  if (bg === 'auction') { // tent + chairs + tumbleweed
    const x = W * .5, y = hz + 70 * s; paint(() => { g.moveTo(x - 110 * s, y); g.lineTo(x - 90 * s, y - 70 * s); g.lineTo(x + 90 * s, y - 70 * s); g.lineTo(x + 110 * s, y); g.closePath(); }, '#f4f0e6', '#d8d0c0', { lw: 2 });
    for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#e9503f' : '#fff4e0'; g.fillRect(x - 90 * s + i * 30 * s, y - 70 * s, 30 * s, 12 * s); }
    txt('COUNTY AUCTION', x, y - 40 * s, `${16 * s}px ${FONT.lil}`, '#a8302a', null);
    seed = 4; for (let i = 0; i < 5; i++) paint(() => RR(x - 80 * s + i * 34 * s, y + 6 * s, 20 * s, 18 * s, 3), '#9aa0a8', null, { lw: 1.2 });
    tumbleweed(x + 54 * s, y + 4 * s, 12 * s); seed = 30; ark(W * .2, hz + 20 * s, 150 * s, { hullName: '', sign: 'LOT 44' });
  }
  if (bg === 'ark' || bg === 'news' || bg === 'redcarpet' || bg === 'sunset' || bg === 'flood') { seed = 30; ark(W * .52, hz + (bg === 'flood' ? 40 : 90) * s, Math.min(W * .78, 330 * s), { sign: 'ANIMAL SHELTER', hullName: "ELLA'S ARK", rim: bg === 'sunset' || bg === 'redcarpet' }); }
  if (bg === 'news') { const x = W * .16, y = hz + 110 * s; paint(() => RR(x - 40 * s, y - 40 * s, 80 * s, 36 * s, 6), '#e8dcc0', '#c8bca0', { lw: 2 }); txt('KFUN 6', x, y - 24 * s, `${12 * s}px ${FONT.lucky}`, '#c03040', null); paint(() => { C(x - 24 * s, y - 2 * s, 7 * s); C(x + 24 * s, y - 2 * s, 7 * s); }, '#2a2a30', null, { lw: 1 }); line([[x + 20 * s, y - 40 * s], [x + 26 * s, y - 64 * s]], '#666', 2); paint(() => E(x + 27 * s, y - 66 * s, 9 * s, 4 * s, -.4), '#ddd', null, { lw: 1 }); }
  if (bg === 'redcarpet') { paint(() => { g.moveTo(W * .5 - 30 * s, H); g.lineTo(W * .5 + 30 * s, H); g.lineTo(W * .5 + 8 * s, hz + 100 * s); g.lineTo(W * .5 - 8 * s, hz + 100 * s); g.closePath(); }, '#d0303a', '#a02030', { lw: 1.5 }); for (const [hx, hy, sc2] of [[.15, .18, 1], [.82, .12, .8], [.6, .3, .6]]) heli(W * hx, H * hy, 30 * s * sc2); }
  if (bg === 'flood') { g.save(); g.fillStyle = 'rgba(60,110,150,.55)'; g.fillRect(0, hz + 50 * s, W, H); g.strokeStyle = 'rgba(220,240,255,.5)'; g.lineWidth = 2; for (let i = 0; i < 14; i++) { const wx = (i * 61) % W, wy = hz + 60 * s + (i * 37) % (H - hz); g.beginPath(); g.moveTo(wx, wy); g.quadraticCurveTo(wx + 12, wy - 5, wx + 24, wy); g.stroke(); } g.restore(); }
  if (bg === 'dome') { const x = W * .55, y = hz - 20 * s; const gr = g.createLinearGradient(x - 70 * s, y - 70 * s, x + 70 * s, y); gr.addColorStop(0, '#e0f0ff'); gr.addColorStop(.5, '#8aa0c0'); gr.addColorStop(1, '#d0e0f0'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, 70 * s, PI, TAU); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); txt('BLACK SANDS LAB', x, y + 14 * s, `${12 * s}px ${FONT.lil}`, '#c8f0ff', INK, 3); g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(x, y + 40 * s, 2, x, y + 40 * s, 90 * s); gl.addColorStop(0, 'rgba(43,227,200,.5)'); gl.addColorStop(1, 'rgba(43,227,200,0)'); g.fillStyle = gl; g.fillRect(0, 0, W, H); g.restore(); }
  if (bg === 'gala') { g.save(); for (let i = 0; i < 24; i++) { const x = (i + .5) * W / 24, y = H * .1 + Math.sin(i * .9) * 8; g.fillStyle = ['#ffd24a', '#ff6b4a', '#6be3c8', '#ff9ad0'][i % 4]; g.beginPath(); C(x, y, 3); g.fill(); } g.restore(); seed = 30; ark(W * .5, hz + 80 * s, Math.min(W * .8, 330 * s), { sign: 'BILLION-DOLLAR BARK GALA', hullName: "ELLA'S ARK", rim: true }); for (const cx of [W * .3, W * .7]) { line([[cx, 0], [cx, H * .2]], '#c8a050', 1.5); paint(() => { g.moveTo(cx - 20 * s, H * .2); g.lineTo(cx + 20 * s, H * .2); g.lineTo(cx, H * .2 + 24 * s); g.closePath(); }, '#ffe9a8', '#e0c070', { lw: 1.2 }); } }
}
function heli(x, y, s) { g.save(); g.translate(x, y); paint(() => { E(0, 0, s, s * .5); g.moveTo(s * .6, -s * .1); g.lineTo(s * 2, -s * .2); g.lineTo(s * 2, s * .1); g.lineTo(s * .6, s * .2); }, '#2a2a34', '#14141a', { lw: 1.4, sx: 0, sy: -2 }); paint(() => E(-s * .3, -s * .1, s * .4, s * .25), '#8ad0ff', null, { lw: 1 }); line([[-s * 1.4, -s * .7], [s * 1.4, -s * .7]], '#444', 2); line([[0, -s * .5], [0, -s * .7]], '#444', 2); g.restore(); }

/* ---------- habitat backdrops for stalls ---------- */
const HAB_NAME = { kennel: 'Kennel', desert: 'Desert Run', swamp: 'Swamp Pool', reptile: 'Reptile Sauna', bigcat: 'Big Cat Deck', sky: 'Aviary', jungle: 'Jungle Deck', ice: 'Ice Room', salt: 'Salt Tank', mud: 'Mud Wallow', pachy: 'Pachyderm Hold', jurassic: 'Jurassic Paddock' };
const KENNEL_WALL = ['#f2d9b0', '#e6eef0', '#f6e4ee', '#e8f0dc', '#f4e6c8', '#e4e8f6'];
// arched stall window with a little view of the Franklin Mountains and the Star on the Mountain
function stallWindow(cx, y, w, h, tod = 'day') {
  const x = cx - w / 2, path = () => { g.moveTo(x, y + h); g.lineTo(x, y + w * .32); g.quadraticCurveTo(x, y, cx, y); g.quadraticCurveTo(x + w, y, x + w, y + w * .32); g.lineTo(x + w, y + h); g.closePath(); };
  paint(() => { const p = 3.5; g.moveTo(x - p, y + h + p); g.lineTo(x - p, y + w * .32); g.quadraticCurveTo(x - p, y - p, cx, y - p); g.quadraticCurveTo(x + w + p, y - p, x + w + p, y + w * .32); g.lineTo(x + w + p, y + h + p); g.closePath(); }, '#9a6438', '#6e4220', { lw: 1.4, sy: -1.5 });
  g.save(); g.beginPath(); path(); g.clip(); g.drawImage(sceneImg(tod === 'night' ? 'night' : tod === 'sunset' ? 'sunset' : 'day', w * 2.2, h * 1.6, { hz: .62 }), x - w * .6, y - h * .2, w * 2.2, h * 1.6); g.restore();
  g.save(); g.strokeStyle = '#7a4a24'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(cx, y + 1); g.lineTo(cx, y + h); g.moveTo(x, y + h * .58); g.lineTo(x + w, y + h * .58); g.stroke(); g.fillStyle = 'rgba(255,255,255,.28)'; g.beginPath(); g.moveTo(x + w * .14, y + h * .5); g.lineTo(x + w * .3, y + h * .18); g.lineTo(x + w * .38, y + h * .18); g.lineTo(x + w * .22, y + h * .5); g.fill(); g.restore();
  g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); path(); g.stroke();
  paint(() => RR(x - 6, y + h + 1, w + 12, 6, 2), '#b07a45', '#7a4a24', { lw: 1.2, sy: -1 });
}
function habitatBg(hab, x, y, w, h, i) {
  g.save(); g.beginPath(); RR(x, y, w, h, 8); g.clip();
  const fl = y + h * .78; let wall = '#f2d9b0', floor = '#c89058';
  const grad = (a, b) => { const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(x, y, w, h); };
  seed = 50 + i * 7;
  switch (hab) {
    case 'kennel': grad(KENNEL_WALL[i % 6], dk(KENNEL_WALL[i % 6], .06)); { // window to the desert
        stallWindow(x + w / 2, y + 24, Math.min(w * .42, 74), Math.min(h * .26, 44), todNow());
        { const wy0 = y + h * .52; g.fillStyle = 'rgba(120,70,30,.10)'; g.fillRect(x, wy0, w, fl - wy0); g.strokeStyle = 'rgba(90,50,20,.18)'; g.lineWidth = 1; for (let xx = x + 9; xx < x + w; xx += 13) { g.beginPath(); g.moveTo(xx, wy0); g.lineTo(xx, fl); g.stroke(); } g.fillStyle = 'rgba(120,70,30,.35)'; g.fillRect(x, wy0 - 3, w, 4); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x, wy0 - 3, w, 1.2); } }
      g.fillStyle = '#c89058'; g.fillRect(x, fl, w, h); g.strokeStyle = 'rgba(60,30,10,.3)'; for (let xx = x; xx < x + w; xx += 18) { g.beginPath(); g.moveTo(xx, fl); g.lineTo(xx - 6, y + h); g.stroke(); }
      paint(() => E(x + w * .5, fl + h * .1, w * .32, h * .06), ['#e9503f', '#3f86b8', '#e0457b', '#5f9654'][i % 4], null, { lw: 1.2 }); break;
    case 'desert': grad('#ffe0b0', '#f0c890'); g.fillStyle = '#e8b682'; g.fillRect(x, fl - 4, w, h); pricklyPear(x + w * .12, fl + 2, .35); paint(() => E(x + w * .86, fl, 14, 8), '#b88a6a', '#987050', { lw: 1.2 }); break;
    case 'swamp': grad('#cfe8c8', '#a8d0a0'); for (let k = 0; k < 4; k++) paint(() => E(x + R(0, w), y + R(10, h * .5), R(10, 18), R(4, 7)), '#7ab070', null, { lw: 0 }); { const wy = y + h * .62; const gr = g.createLinearGradient(0, wy, 0, y + h); gr.addColorStop(0, '#5ac0b0'); gr.addColorStop(1, '#2a7a78'); g.fillStyle = gr; g.fillRect(x, wy, w, h); g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 1.2; for (let k = 0; k < 4; k++) { const wx = x + 10 + k * w / 4; g.beginPath(); g.moveTo(wx, wy + 4); g.quadraticCurveTo(wx + 8, wy, wx + 16, wy + 4); g.stroke(); } paint(() => E(x + w * .15, wy + 8, 8, 3), '#5f9654', null, { lw: .8 }); } break;
    case 'reptile': grad('#ffd0a0', '#f0a070'); { const lx = x + w * .5; g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(lx, y, 2, lx, y, h * .8); gl.addColorStop(0, 'rgba(255,160,60,.5)'); gl.addColorStop(1, 'rgba(255,160,60,0)'); g.fillStyle = gl; g.fillRect(x, y, w, h); g.restore(); paint(() => RR(lx - 10, y - 2, 20, 10, 3), '#5a5a60', null, { lw: 1 }); } g.fillStyle = '#e8c08a'; g.fillRect(x, fl, w, h); paint(() => E(x + w * .8, fl + 2, 18, 8), '#a08070', '#806050', { lw: 1.2 }); break;
    case 'bigcat': grad('#f0d8b0', '#d8b888'); g.save(); g.globalAlpha = .35; g.fillStyle = '#fff6c0'; g.beginPath(); g.moveTo(x + w * .45, y); g.lineTo(x + w * .55, y); g.lineTo(x + w * .85, y + h); g.lineTo(x + w * .15, y + h); g.fill(); g.restore(); paint(() => RR(x + 6, fl - 8, w * .5, 14, 6), '#a89070', '#887050', { lw: 1.2 }); paint(() => RR(x + w - 18, y + 12, 8, fl - y - 12, 2), '#b88a5a', null, { lw: 1 }); g.fillStyle = '#c8a070'; g.fillRect(x, fl, w, h); break;
    case 'sky': grad('#8fd0f0', '#d8f0ff'); cloud(x + w * .3, y + 24, 50, 9, '#fff', '#e8f0f8', .9); line([[x + w * .1, fl - 10], [x + w * .9, fl - 18]], '#7a5030', 4); g.fillStyle = '#b8e0f0'; g.fillRect(x, fl, w, h); break;
    case 'jungle': grad('#7ab870', '#4a8a50'); for (let k = 0; k < 9; k++) { const lx = x + R(0, w), ly = y + R(0, h * .7); paint(() => E(lx, ly, R(8, 16), R(4, 7), R(-1, 1)), R(0, 1) > .5 ? '#3a7a40' : '#5aa058', null, { lw: .6 }); } line([[x + w * .2, y], [x + w * .25, y + h * .4]], '#3a6a30', 2); g.fillStyle = '#6a5030'; g.fillRect(x, fl, w, h); break;
    case 'ice': grad('#e0f4ff', '#b8e0f4'); for (let k = 0; k < 3; k++) paint(() => RR(x + 8 + k * 26, fl - 16 - (k % 2) * 8, 22, 18 + (k % 2) * 8, 3), 'rgba(200,240,255,.95)', '#a8d8f0', { lw: 1 }); for (let k = 0; k < 8; k++) sparkle(x + R(0, w), y + R(0, h * .7), R(1.5, 3), '#fff', .9); g.fillStyle = '#f0faff'; g.fillRect(x, fl, w, h); break;
    case 'salt': { const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#5ab8e8'); gr.addColorStop(1, '#1a5a8a'); g.fillStyle = gr; g.fillRect(x, y, w, h); g.fillStyle = '#e8d8a8'; g.beginPath(); g.moveTo(x, fl + 6); g.quadraticCurveTo(x + w / 2, fl - 4, x + w, fl + 6); g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.fill(); for (let k = 0; k < 7; k++) { g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1; g.beginPath(); C(x + R(0, w), y + R(0, h * .7), R(1.5, 4)); g.stroke(); } paint(() => { g.moveTo(x + w * .85, fl); g.quadraticCurveTo(x + w * .8, fl - 20, x + w * .86, fl - 34); }, '#e05a70', null, { lw: 1.4 }); } break;
    case 'mud': grad('#e8c8a0', '#c8a078'); paint(() => E(x + w * .5, fl + 6, w * .48, h * .14), '#7a4a2a', '#5a3018', { lw: 1.4, sx: 0, sy: -2 }); g.fillStyle = 'rgba(160,110,70,.6)'; for (let k = 0; k < 5; k++) { g.beginPath(); E(x + R(w * .1, w * .9), fl + R(0, 10), R(4, 9), 2); g.fill(); } break;
    case 'pachy': grad('#e8d0a8', '#d0b080'); for (let k = 0; k < 2; k++) paint(() => RR(x + 6 + k * (w - 44), fl - 22, 38, 24, 5), '#e8c860', '#c8a840', { lw: 1.2, tex: () => { g.strokeStyle = 'rgba(140,100,30,.6)'; for (let j = 0; j < 6; j++) { g.beginPath(); g.moveTo(x + 8 + k * (w - 44) + j * 6, fl - 20); g.lineTo(x + 10 + k * (w - 44) + j * 6, fl); g.stroke(); } } }); g.fillStyle = '#b89060'; g.fillRect(x, fl, w, h); break;
    case 'jurassic': grad('#c8e0a0', '#90b870'); paint(() => { g.moveTo(x + w * .7, fl); g.lineTo(x + w * .82, y + h * .25); g.lineTo(x + w * .9, y + h * .25); g.lineTo(x + w, fl); g.closePath(); }, '#8a6a5a', '#6a4a3a', { lw: 1.2 }); for (let k = 0; k < 5; k++) { const fx = x + R(0, w * .6); for (let j = -2; j <= 2; j++) line([[fx, fl], [fx + j * 7, fl - 18 - Math.abs(j) * -3]], '#4a8a3a', 2); } g.fillStyle = '#7a6a40'; g.fillRect(x, fl, w, h); break;
    default: grad(wall, floor);
  }
  // food + water bowls (every stall gets dinner service)
  if (w > 90 && hab !== 'swamp' && hab !== 'ice') { const bx = x + w - 26, byy = y + h - 12; for (let k = 0; k < 2; k++) { const cx = bx - k * 22; paint(() => { g.moveTo(cx - 9, byy - 7); g.lineTo(cx + 9, byy - 7); g.lineTo(cx + 6, byy); g.lineTo(cx - 6, byy); g.closePath(); }, k ? '#8ac0e8' : '#c0c8d0', k ? '#5a90b8' : '#8a96a2', { lw: 1.2, sy: -1 }); g.fillStyle = k ? '#6ad0ff' : '#a8683a'; g.beginPath(); g.ellipse(cx, byy - 7, 8, 2.2, 0, 0, 7); g.fill(); } }
  g.restore();
  g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); RR(x, y, w, h, 8); g.stroke();
}
