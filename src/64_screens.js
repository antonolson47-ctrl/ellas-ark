/* ===================== SCREENS: title, story player, settings, finale, credits ===================== */
function heroArk(X, Y, k) { g.save(); g.translate(X - 196 * k, Y - 650 * k); g.scale(k, k); arkHero(); g.restore(); }
function titleArt(W, H) {
  const P = L.portrait, hz = P ? H * .56 : H * .64;
  desert(W, H, hz, 'sunset', { flora: false, starX: P ? W * .2 : W * .12 });
  silhouettes(P ? 10 : W * .04, hz + 22, P ? .8 : .9, 'rgba(80,35,60,.7)');
  seed = 8; for (let i = 0; i < 10; i++) creosote(R(0, W), R(hz + 10, hz + 50), R(.25, .45), '#7a7a4a');
  if (P) { const k = clamp(H / 844, .78, 1.05); heroArk(W / 2, H - 194 * k, k); seed = 41; pricklyPear(30, H - 102 * k, 1.25 * k); yucca(W - 34, H - 99 * k, .95 * k); barrel(W - 90, H - 84 * k, .9 * k); creosote(W * .38, H - 168 * k, .7 * k, '#6f8f4a');
    const fg = g.createLinearGradient(0, H - 150, 0, H); fg.addColorStop(0, 'rgba(60,20,40,0)'); fg.addColorStop(1, 'rgba(60,20,40,.35)'); g.fillStyle = fg; g.fillRect(0, H - 150, W, 150);
    drawElla(112, H - 22, 280 * k, { pose: 'hips' }); drawSpr(sargeSpr(), 196, H - 22, 130 * k, 120 * k, {}); }
  else { const k = .74; heroArk(W * .33, H - 46, k); seed = 41; pricklyPear(W * .03, H - 20, .9); yucca(W * .56, H - 18, .7); barrel(W * .52, H - 10, .6);
    drawElla(W * .1, H - 12, H * .66, { pose: 'hips' }); drawSpr(sargeSpr(), W * .1 + H * .2, H - 12, H * .3, H * .28, {}); }
}
function drawTitle() {
  const W = L.W, H = L.H, P = L.portrait;
  cached('title', 0, 0, W, H, () => titleArt(W, H));
  seed = 33; tumbleweed(((RT.t * 70) % (W + 80)) - 40, P ? H - 60 : H - 30, 12, { motion: true });
  for (let i = 0; i < 6; i++) sparkle(W * (.1 + i * .16), H * .08 + Math.sin(RT.t + i) * 10, 1.4 + (Math.sin(RT.t * 3 + i) + 1), '#fff', .8);
  if (P) logo(W / 2, 92 * clamp(H / 844, .8, 1), clamp(H / 844, .8, 1)); else logo(W * .74, 74, .66);
  const cont = GS.started && !GS.ended || GS.sanctuary;
  const bx = P ? W - 168 : W * .74 - 110, bw = P ? 156 : 220, by = P ? H - (cont ? 180 : 134) : (cont ? 170 : 196);
  button('play', bx, by, bw, 54, cont ? '▶ CONTINUE' : '▶ PLAY', () => { audioInit(); startPlay(); }, { col: '#e9503f', font: FONT.lucky, size: 24, glow: 'rgba(255,200,120,.6)' });
  if (cont) button('newgame', bx, by + 62, bw, 38, 'NEW GAME', () => { RT.confirmNew = true; }, { col: '#8a5a3a', size: 15 });
  button('title_settings', bx, by + (cont ? 108 : 62), bw, 38, 'SETTINGS', openSettings, { col: '#5a3a20', size: 15 });
  const hz = SETTINGS.humor === 'clean' ? 'CLEANER' : 'RAUNCHY';
  ftxt(`Humor: ${hz} (18+ by default) · Settings to change`, P ? W / 2 : W * .74, P ? H - 10 : H - 14, W * .6, 10.5, FONT.fre, 'rgba(255,240,220,.85)', 'rgba(40,10,30,.6)', 3, 'center', '600 ');
  if (RT.confirmNew) confirmBox('Start over? Your current Ark will be lost.', 'START OVER', () => { RT.confirmNew = false; try { localStorage.removeItem(SAVE_KEY); } catch (e) {} newGame(); RT.scene = 'day'; }, () => { RT.confirmNew = false; });
}
function startPlay() { if (GS.started && !GS.ended) { RT.scene = 'day'; resumeGame(); } else if (GS.sanctuary) { enterSanctuary(); } else { newGame(); } }
function resumeGame() { // restore a saved game into a sensible phase
  placeQueue();
  if (GS.phase === 'report' || GS.phase === 'open') { startOpenOrReport(); return; }
  startDay();
}
function startOpenOrReport() { RT.scene = 'day'; RT.phase = 'care'; RT.shiftT = RT.shiftLen; endCare(); }
function confirmBox(msg, yes, onYes, onNo) {
  blocker('confirm_block'); g.save(); g.fillStyle = 'rgba(20,10,30,.6)'; g.fillRect(0, 0, L.W, L.H); g.restore();
  const w = Math.min(L.W - 40, 340), h = 170, x = (L.W - w) / 2, y = (L.H - h) / 2; panel(x, y, w, h, '#fff4e0', { lw: 2 });
  boxTxt(msg, x + 16, y + 18, w - 32, 70, 16, FONT.fre, '#3a2416', 'center', '700 ');
  button('confirm_yes', x + 14, y + h - 58, (w - 42) / 2, 44, yes, onYes, { col: '#c0302a', size: 15 }); button('confirm_no', x + 28 + (w - 42) / 2, y + h - 58, (w - 42) / 2, 44, 'CANCEL', onNo, { col: '#5f9654', size: 15 });
}
/* ---------- story player ---------- */
function playStory(lines, music, bg, cb) {
  const ls = (lines || []).filter(Boolean);
  if (!ls.length) { RT.story = null; cb && cb(); return; }
  RT.story = { lines: ls, i: 0, t: 0, bg: bg || 'ark', cb, title: RT.nextTitle || null }; RT.nextTitle = null;
  if (music != null) musicPlay(music); MUS.lvl = 2;
}
function storyAdvance() {
  const S = RT.story; if (!S) return; const full = tx(S.lines[S.i][1]);
  if (S.t * 55 < full.length) { S.t = 999; return; }
  S.i++; S.t = 0; sfx('page');
  if (S.i >= S.lines.length) { const cb = S.cb; RT.story = null; cb && cb(); }
}
function storySkip() { const S = RT.story; if (!S) return; const cb = S.cb; RT.story = null; sfx('swish'); cb && cb(); }
function drawStory() {
  const S = RT.story, W = L.W, H = L.H, P = L.portrait; S.t += DT;
  cached('story:' + S.bg, 0, 0, W, H, () => storyBg(S.bg, W, H));
  const [who, raw] = S.lines[S.i], text = tx(raw), shown = text.slice(0, Math.floor(S.t * 55)), sp = SPEAKER[who] || [who, '#fff'];
  if (Math.floor(S.t * 55) < text.length && Math.floor(S.t * 55) % 3 === 0 && who !== 'narr' && S.lastBeep !== Math.floor(S.t * 55)) { S.lastBeep = Math.floor(S.t * 55); sfx('blip'); }
  const bh = P ? Math.min(190, H * .26) : Math.min(150, H * .4), bx = 10, bw = W - 20, by = H - bh - 12;
  // portrait
  const ph = P ? Math.min(250, H - bh - 140) : H - bh - 50, px = P ? W * .28 : W * .16, pb = by + 8;
  if (who !== 'narr') {
    g.save(); g.globalAlpha = clamp(S.t * 5, 0, 1);
    if (who === 'ella') drawElla(px, pb + ph * .62, ph * 1.55, { pose: S.i % 2 ? 'wave' : 'hips' });
    else if (who === 'sarge') drawSpr(sargeSpr(), px, pb, ph * .9, ph * .8, { blink: (RT.t % 3) < .15 });
    else if (who === 'gerald') stork(px, pb, ph / 70);
    else { const b = speakerBust(who); if (b) drawBust(who, b, px, pb + 4, ph * .85, false); }
    g.restore();
  }
  // box
  const narr = who === 'narr'; panel(bx, by, bw, bh, narr ? 'rgba(40,20,50,.92)' : '#fff4e0', { lw: 2, dark: narr ? 'rgba(30,14,40,.95)' : '#ead8b8' });
  if (!narr) { g.font = `15px ${FONT.lucky}`; const nw = g.measureText(sp[0]).width + 24; paint(() => RR(bx + 14, by - 14, nw, 26, 8), '#3a2416', null, { lw: 1.4 }); txt(sp[0], bx + 14 + nw / 2, by - 0.5, `15px ${FONT.lucky}`, sp[1], null); }
  boxTxt(shown, bx + 18, by + 18, bw - 36, bh - 40, P ? 17 : 16, FONT.fre, narr ? '#ffe9a8' : '#2b1a12', narr ? 'center' : 'left', narr ? 'italic 600 ' : '600 ', 11);
  if (shown.length >= text.length && Math.floor(RT.t * 2) % 2) txt('▼ tap', bx + bw - 34, by + bh - 14, `11px ${FONT.lil}`, narr ? '#ffe9a8' : '#8a6a4a', null);
  ftxt(`${S.i + 1}/${S.lines.length}`, bx + 30, by + bh - 13, 60, 10, FONT.lil, narr ? '#b8a0c8' : '#a89070', null);
  // chapter card
  if (S.title && S.i === 0) { const a = clamp(Math.min(S.t * 3, 1), 0, 1); g.save(); g.globalAlpha = a; const tw = Math.min(W - 30, 420); panel((W - tw) / 2, 40 + L.safe.t * 0, tw, 74, 'rgba(40,20,10,.88)', { lw: 2, dark: 'rgba(30,14,8,.9)' }); ftxt(S.title[0], W / 2, 62, tw - 20, 13, FONT.lil, '#ffd27a', null); ftxt(S.title[1], W / 2, 90, tw - 20, 24, FONT.lucky, '#fff4e0', INK, 4); g.restore(); }
  hit('story_next', 0, 0, W, H, storyAdvance);
  button('story_skip', W - 84, 8, 76, 34, 'SKIP ▸▸', storySkip, { col: 'rgba(58,36,22,.85)', size: 13 });
}
const ACT_NAMES = ['', 'ACT 1 · GRAND OPENING', 'ACT 2 · TWO BY TWO', 'ACT 3 · LOVE IS IN THE AIR (AND THE WATER)', 'ACT 4 · LIFESTYLES OF THE RICH & FURRY'];
/* ---------- settings / pause ---------- */
function openSettings() { RT.settings = true; RT.paused = true; musicMuffle(true); }
function closeSettings() { RT.settings = false; RT.paused = false; RT.confirmNew = false; musicMuffle(RT.tab === 'build' || RT.tab === 'dex'); }
function drawSettings() {
  blocker('set_block'); g.save(); g.fillStyle = 'rgba(20,10,30,.66)'; g.fillRect(-10, -10, L.W + 20, L.H + 20); g.restore();
  const w = Math.min(L.W - 24, 420), h = Math.min(L.H - 24, L.portrait ? 560 : 370), x = (L.W - w) / 2, y = (L.H - h) / 2; panel(x, y, w, h, '#fff4e0', { lw: 2 });
  ftxt(RT.scene === 'day' ? 'PAUSED · SETTINGS' : 'SETTINGS', x + w / 2, y + 22, w - 20, 22, FONT.lucky, '#a8302a', null);
  const rows = [['humor', 'Humor', [['raunchy', 'Raunchy'], ['clean', 'Cleaner']], SETTINGS.humor, v => { SETTINGS.humor = v; CACHE.clear(); }],
    ['music', 'Music', [[0, 'Off'], [.4, 'Low'], [.7, 'Med'], [1, 'High']], SETTINGS.music, v => { SETTINGS.music = v; audioInit(); applyVol(); if (v > 0) musicPlay(MUS.want >= 0 ? MUS.want : 0); else musicStop(); }],
    ['sfx', 'Sound FX', [[0, 'Off'], [.5, 'Low'], [.85, 'Med'], [1, 'High']], SETTINGS.sfx, v => { SETTINGS.sfx = v; audioInit(); applyVol(); sfx('coin'); }],
    ['chill', 'Chill mode', [[false, 'Off'], [true, 'On']], SETTINGS.chill, v => { SETTINGS.chill = v; }],
    ['shake', 'Screen shake', [[true, 'On'], [false, 'Off']], SETTINGS.shake, v => { SETTINGS.shake = v; }],
    ['muted', 'All sound', [[false, 'On'], [true, 'Muted']], SETTINGS.muted, v => { SETTINGS.muted = v; audioInit(); applyVol(); }]];
  const land = !L.portrait, cols = land ? 2 : 1, cw = (w - 28) / cols, rh = land ? 44 : Math.min(48, (h - 190) / rows.length);
  rows.forEach(([id, label, opts, cur, fn], i) => { const cx = x + 14 + (i % cols) * cw, cy = y + 46 + Math.floor(i / cols) * rh; toggleRow('set_' + id, cx, cy, cw - 8, label, opts, cur, v => { fn(v); saveSettings(); }); });
  ftxt(SETTINGS.humor === 'clean' ? 'Cleaner: no profanity, softer innuendo. Same story and gameplay.' : 'Raunchy: crude jokes, innuendo and profanity (adults). Cleaner tones it down.', x + w / 2, y + 46 + Math.ceil(rows.length / cols) * rh + 6, w - 28, 11, FONT.fre, '#6a4a2a', null, 0, 'center', '600 ');
  const by = y + h - 56, n = RT.scene === 'day' ? 3 : 1, bw = (w - 28 - (n - 1) * 8) / n;
  button('set_resume', x + 14, by, bw, 44, RT.scene === 'day' ? 'RESUME' : 'DONE', closeSettings, { col: '#5f9654', size: 16 });
  if (RT.scene === 'day') { button('set_title', x + 14 + bw + 8, by, bw, 44, 'TITLE SCREEN', () => { closeSettings(); save(); RT.scene = 'title'; RT.story = null; musicPlay(0); }, { col: '#8a5a3a', size: 14 }); button('set_help', x + 14 + (bw + 8) * 2, by, bw, 44, 'HOW TO PLAY', () => { RT.help = true; }, { col: '#3f86b8', size: 14 }); }
  if (RT.help) helpBox();
}
function helpBox() {
  blocker('help_block'); const w = Math.min(L.W - 20, 460), h = Math.min(L.H - 20, 520), x = (L.W - w) / 2, y = (L.H - h) / 2; panel(x, y, w, h, '#fff4e0', { lw: 2 });
  ftxt('HOW TO RUN THE ARK', x + w / 2, y + 20, w - 20, 20, FONT.lucky, '#a8302a', null);
  boxTxt('SHIFT (8 AM to 4 PM): tap an animal, then FEED, WASH, VET, PLAY, SCOOP or SPECIAL. Or just tap a tool and Ella helps whoever needs it most. Tap poop piles and bandages directly. Keep the rings green and chain actions for a HOOAH streak.\nQUICK CALLS: swipe the card left or right (or tap a button).\nADS: post animals on Adopt-a-Gram for Buzz, which brings more adopters.\nOPEN HOUSE: pick the animal that matches the adopter\'s wants (hearts), ask up to 2 questions to catch red flags, then APPROVE or DENY.\nBUILD: spend donations on 6 branches of upgrades.\nKEYS: arrows select · 1-6 tools · Q/E quick call · A/D approve/deny · Tab switches tabs · Space/Enter continue · P/Esc pause · M mute.', x + 16, y + 40, w - 32, h - 100, 14, FONT.fre, '#3a2416', 'left', '600 ', 9);
  button('help_ok', x + w / 2 - 70, y + h - 52, 140, 42, 'GOT IT', () => { RT.help = false; }, { col: '#5f9654' });
}
/* ---------- finale ---------- */
function drawFinale() {
  const F = RT.fin, W = L.W, H = L.H, P = L.portrait; F.t += DT; F.flash = Math.max(0, F.flash - DT * 2);
  cached('fin:bg', 0, 0, W, H, () => desert(W, H, H * .5, 'storm', { flora: false }));
  g.save(); g.strokeStyle = 'rgba(190,220,255,.55)'; g.lineWidth = 1.3; for (let i = 0; i < 90; i++) { const rx = (i * 53 + RT.t * 80) % W, ry = (i * 97 + RT.t * 600) % H; g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx - 4, ry + 12); g.stroke(); } g.restore();
  if ((RT.t % 5) < .08) { g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(0, 0, W, H); }
  const wl = H * (1 - F.water * .55) - 40, bob = Math.sin(RT.t * 1.6) * 6;
  g.save(); g.translate(0, bob); g.rotate(Math.sin(RT.t * 1.1) * .02); heroArk(W / 2, wl + 30, P ? .9 : .7); g.restore();
  const gr = g.createLinearGradient(0, wl, 0, H); gr.addColorStop(0, 'rgba(43,227,200,.75)'); gr.addColorStop(1, 'rgba(20,90,110,.95)'); g.fillStyle = gr; g.beginPath(); g.moveTo(0, wl + 20); for (let x = 0; x <= W; x += 20) g.lineTo(x, wl + 20 + Math.sin(x * .05 + RT.t * 3) * 6); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
  { // gala guests still bobbing in the flood + Ella and Sarge on a rescue raft
    const rowsB = Math.ceil(POWERS.length / (P ? 3 : 6)), byB = H - rowsB * ((P ? 58 : 50) + 8) - 10, left = F.done ? 0 : 6 - Math.min(F.step, 6), skins = ['#f2c8a0', '#c88a5a', '#8a5a3a', '#f8d8c0', '#a86a48'];
    for (let i = 0; i < left * 2; i++) { const gx = 30 + ((i * 113 + Math.sin(RT.t * .6 + i) * 18) % (W - 60)), gy = wl + 50 + (i % 3) * ((byB - wl - 90) / 3) + Math.sin(RT.t * 2.2 + i) * 3, sk = skins[i % 5];
      if (gy > byB - 30) continue; line([[gx + 8, gy], [gx + 14 + Math.sin(RT.t * 8 + i) * 3, gy - 18]], sk, 3); paint(() => C(gx, gy - 4, 8), sk, darken(sk, .15), { lw: 1.4 });
      if (i % 2) paint(() => RR(gx - 6, gy - 22, 12, 10, 1), '#222', null, { lw: 1 }); else paint(() => star5(gx, gy - 13, 5, 2.2), '#ffd24a', null, { lw: 1 });
      g.fillStyle = INK; g.fillRect(gx - 3, gy - 6, 1.6, 1.6); g.fillRect(gx + 2, gy - 6, 1.6, 1.6); if (i < 4 && (RT.t + i) % 3 < 1.4) ftxt(['HELP!', 'MY SHOES!', 'NOT THE SILK!', 'I CAN\'T SWIM, I\'M RICH!'][i], gx, gy - 30, 120, 10, FONT.lil, '#fff4e0', INK, 3); }
    const rx = W * (P ? .04 : .03), ry = byB - 16 + Math.sin(RT.t * 2) * 3, eh = P ? 150 : 112; seed = 5; plank(rx, ry - 6, eh * .9, 14, 4, '#a86d3a', { rows: 1 });
    drawElla(rx + eh * .28, ry - 4, eh, { pose: 'hose' }); drawSpr(sargeSpr(), rx + eh * .66, ry - 4, eh * .42, eh * .32, { blink: (RT.t % 4) < .15 });
  }
  if (F.flash > 0 && F.step > 0) { const pw = POWERS.find(p => p[0] === F.seq[F.step - 1][0]); g.save(); g.globalAlpha = F.flash; ftxt(pw[0], W / 2, H * .3, W - 40, 44, FONT.lucky, pw[2], INK, 6); g.restore(); }
  panel(10, 10, W - 20, 54, 'rgba(40,20,10,.85)', { lw: 1.6, dark: 'rgba(30,14,8,.9)' });
  ftxt(F.done ? 'EVERYONE IS SAFE!' : 'THE RE-FLOODENING: tap the mashup power that lights up!', W / 2, 28, W - 40, 15, FONT.lucky, '#ffe9a8', null);
  ftxt(`Guests saved: ${Math.min(F.step, 6) * 34} / 204`, W / 2, 50, W - 40, 12, FONT.lil, '#9cff9c', null);
  if (F.done) return;
  const want = F.seq[F.step]; const cols = P ? 3 : 6, bw = (W - 20) / cols - 6, bh = P ? 58 : 50, rows = Math.ceil(POWERS.length / cols), by0 = H - rows * (bh + 8) - 10;
  POWERS.forEach((pw, i) => { const bx = 13 + (i % cols) * (bw + 6), by = by0 + Math.floor(i / cols) * (bh + 8), on = pw[0] === want[0]; button('pow_' + i, bx, by, bw, bh, pw[0], () => finalePress(i), { col: on ? pw[2] : '#5a4a5a', glow: on ? pw[2] : null, size: 15, font: FONT.lucky, sfx: 'blip' }); });
}
/* ---------- credits ---------- */
const CREDITS = ["ELLA'S ARK", '', 'Starring ELLA', 'as the toughest, kindest shelter boss in the 915', '', 'SARGE as Head of Security (and family)', '', 'Doc Lupe · Dakota · Uncle Dusty', 'Inspector Plinth (and his beard)', 'Dr. Splice · Gerald the Stork · Trent Dazzleton', '', 'And introducing every critter who found a home', '', 'Filmed on location in El Paso, Texas', 'Under the Star on the Mountain', '', 'Adapt. Overcome. Adopt.', '', 'Thanks for playing!'];
function drawCredits() {
  const W = L.W, H = L.H; RT.credT = (RT.credT || 0) + DT;
  cached('cred:bg', 0, 0, W, H, () => { desert(W, H, H * .62, 'sunset', { flora: false, starX: W * .7 }); heroArk(W * .5, H * .62 - 4, L.portrait ? .55 : .45); });
  starOnMountain(W * .7, H * .62 - 80, 14 + Math.sin(RT.t * 3) * 2);
  drawElla(W * .18, H - 10, Math.min(H * .38, 240), { pose: 'wave' }); drawSpr(sargeSpr(), W * .18 + Math.min(H * .38, 240) * .36, H - 10, 120, Math.min(H * .2, 110), {});
  const y0 = H * .9 - RT.credT * 28; CREDITS.forEach((l, i) => { const yy = y0 + i * 30; if (yy > 10 && yy < H - 76) { g.save(); g.globalAlpha = clamp(Math.min((yy - 10) / 40, (H - 76 - yy) / 40), 0, 1); ftxt(l, W * .62, yy, W * .7, i === 0 ? 30 : 16, i === 0 ? FONT.lucky : FONT.lil, '#fff4e0', 'rgba(40,10,30,.7)', 4); g.restore(); } });
  button('sanctuary', W / 2 - 150, H - 60, 145, 46, 'SANCTUARY ▶', () => { enterSanctuary(); }, { col: '#5f9654', size: 15 });
  button('cred_title', W / 2 + 5, H - 60, 145, 46, 'TITLE', () => { RT.scene = 'title'; }, { col: '#8a5a3a', size: 15 });
}
