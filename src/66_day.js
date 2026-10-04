/* ===================== DAY SCREEN: HUD, tabs, ark view, stalls, care tray, quick calls, arrivals ===================== */
const NEED_KEYS = [['hunger', 'feed'], ['clean', 'wash'], ['health', 'vet'], ['happy', 'play']];
const resById = id => GS.residents.find(r => r.id === id) || null;
const selRes = () => resById(RT.sel);
function clockStr() {
  if (RT.phase === 'care') { const m = 8 * 60 + Math.floor(clamp(RT.shiftT / RT.shiftLen, 0, 1) * 480); const h = Math.floor(m / 60), mm = Math.floor(m % 60 / 15) * 15; return `${h > 12 ? h - 12 : h}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; }
  return { morning: '7:30 AM', open: '4:00 PM', report: '7:45 PM' }[RT.phase] || '';
}
function todNow() { if (RT.ev && RT.ev.type === 'rain') return 'storm'; if (RT.phase === 'report' || RT.romance) return RT.romance ? 'night' : 'sunset'; if (RT.phase === 'open') return 'sunset'; if (RT.phase === 'morning') return 'dawn'; return 'day'; }
/* ---------- HUD ---------- */
function drawHUD() {
  const [x, y, w, h] = LY.hud; seed = 77; plank(x - 4, y - 6, w + 8, h + 6, 0, '#7d4a2a', { rows: 1, nails: false });
  const py = y + 8, ph = h - 16;
  // money
  const mw = L.portrait ? 112 : 136; const pop = 1 + (RT.cashPop || 0) * .08;
  g.save(); g.translate(x + 8 + mw / 2, py + ph / 2); g.scale(pop, pop); g.translate(-(x + 8 + mw / 2), -(py + ph / 2)); pill(x + 8, py, mw, ph, '#3a2416'); icon('coin', x + 8 + ph / 2, py + ph / 2, ph * .36); ftxt(fmt$(GS.money), x + 8 + ph + (mw - ph) / 2 - 2, py + ph / 2 + 1, mw - ph - 8, 17, FONT.lucky, '#fff4e0', null); g.restore();
  LY.money = [x + 8 + ph / 2, py + ph / 2];
  hit('hud_money', x + 8, py, mw, ph, () => { if (RT.scene === 'day') setTab('build'); });
  // day + clock
  const dx = x + 16 + mw, dw = L.portrait ? 134 : 196; pill(dx, py, dw, ph, '#3a2416');
  icon(RT.phase === 'care' ? 'sun' : RT.phase === 'report' ? 'moon' : 'clock', dx + ph / 2, py + ph / 2, ph * .32);
  ftxt(`DAY ${GS.day} · ${clockStr()}`, dx + ph + (dw - ph) / 2 - 4, py + ph / 2 - (RT.phase === 'care' ? 4 : 0), dw - ph - 8, 13, FONT.lil, '#fff4e0', null);
  if (RT.phase === 'care') { const bw = dw - ph - 10, bx = dx + ph, by = py + ph - 9; pill(bx, by, bw, 6, '#5a3a20', 'rgba(0,0,0,0)'); pill(bx, by, Math.max(6, bw * clamp(RT.shiftT / RT.shiftLen, 0, 1)), 6, '#ffb24a', 'rgba(0,0,0,0)'); }
  // streak or rep
  const sx = dx + dw + 8, right = x + w - (L.portrait ? 52 : 100), sw = right - sx;
  if (sw > 40) {
    if (RT.streak > 0 && RT.phase === 'care') { const hot = RT.mult > 1; paint(() => RR(sx, py, sw, ph, ph / 2), hot ? '#e9503f' : '#8a5a3a', null, { lw: 1.4 }); ftxt(hot ? `HOOAH x${RT.mult}` : `STREAK ${RT.streak}`, sx + sw / 2, py + ph / 2 + 1, sw - 10, 14, FONT.lucky, '#fff4e0', null); }
    else { pill(sx, py, sw, ph, '#3a2416'); const st = Math.min(5, 1 + Math.floor(GS.rep / 20)); const n = sw > 110 ? 5 : 3; for (let i = 0; i < n; i++) icon('star', sx + sw / 2 + (i - (n - 1) / 2) * Math.min(18, (sw - 10) / n), py + ph / 2, Math.min(8, (sw - 10) / n / 2.2), { col: i < st * n / 5 ? '#ffd24a' : '#7a5a3a' }); hit('hud_rep', sx, py, sw, ph, () => toast(`Reputation ${Math.round(GS.rep)}/100: ${repRank()}`, '#ffe9a8', 2)); }
  }
  // mute + menu
  if (!L.portrait) { const bx = x + w - 92; paint(() => RR(bx, py, 40, ph, 10), '#3a2416', null, { lw: 1.2 }); icon(SETTINGS.muted ? 'mute' : 'sound', bx + 20, py + ph / 2, 8); hit('mute', bx, py - 4, 40, ph + 8, toggleMute); }
  const bx = x + w - 48; paint(() => RR(bx, py, 40, ph, 10), '#3a2416', null, { lw: 1.2 }); icon('menu', bx + 20, py + ph / 2, 8); hit('menu', bx - 2, py - 4, 46, ph + 8, () => { sfx('tap'); openSettings(); });
}
function repRank() { return ['Cardboard Box', 'Doghouse', 'Barn', 'Rescue Ranch', 'Ark', 'Super Ark', 'Legendary Sanctuary'][Math.min(6, Math.floor(GS.rep / 15))]; }
function toggleMute() { SETTINGS.muted = !SETTINGS.muted; saveSettings(); audioInit(); applyVol(); if (!SETTINGS.muted) { sfx('tap'); musicPlay(MUS.want >= 0 ? MUS.want : 0); } }
/* ---------- tabs ---------- */
const TABS = [['ark', 'ARK', 'ark'], ['ads', 'ADS', 'ads'], ['adopt', 'ADOPT', 'adopt'], ['build', 'BUILD', 'build'], ['dex', 'DEX', 'dex']];
const tabLocked = id => id === 'ads' && GS.ch < 3 && !GS.sanctuary;
function setTab(id) {
  if (tabLocked(id)) { sfx('boop'); toast('Dakota starts the Adopt-a-Gram in Chapter 3.', '#ffd0a0', 2); return; }
  if (RT.tab !== id) sfx('swish'); RT.tab = id; RT.modalAd = null;
  musicMuffle(id === 'build' || id === 'dex');
}
function drawTabs() {
  const [x, y, w, h] = LY.tabs; seed = 78; plank(x, y, w, h + 8, L.portrait ? 0 : 10, '#5a3a20', { rows: 1, nails: false });
  const n = TABS.length;
  TABS.forEach(([id, label, ic], i) => {
    const tx2 = L.portrait ? x + i * w / n : x + 4, ty = L.portrait ? y + 4 : y + 6 + i * (h - 12) / n, tw = L.portrait ? w / n : w - 8, th = L.portrait ? h - 10 : (h - 12) / n - 4;
    const on = RT.tab === id || (id === 'adopt' && RT.tab === 'ark' && RT.phase === 'open'), lock = tabLocked(id);
    if (on) paint(() => RR(tx2 + 3, ty, tw - 6, th, 10), '#e9503f', null, { lw: 1.4 });
    g.save(); if (lock) g.globalAlpha = .45; icon(ic, tx2 + tw / 2, ty + th * .4, Math.min(12, th * .24)); txt(label, tx2 + tw / 2, ty + th * .8, `${Math.min(12, th * .2)}px ${FONT.lil}`, '#fff4e0', null); g.restore();
    let badge = 0; if (id === 'build') badge = UPG.filter(canBuy).length; if (id === 'adopt' && RT.phase === 'open') badge = Math.max(0, RT.adopters.length - RT.ai);
    if (badge && !on) { paint(() => C(tx2 + tw * .72, ty + th * .2, 8), '#ffd24a', '#e0a020', { lw: 1, sx: 0, sy: -1 }); txt(String(Math.min(badge, 9)), tx2 + tw * .72, ty + th * .2 + .5, `10px ${FONT.lil}`, INK, null); }
    hit('tab_' + id, tx2, ty - 2, tw, th + 4, () => setTab(id));
  });
}
/* ---------- ark view geometry ---------- */
function gridGeom() {
  const [vx, vy, vw, vh] = LY.view; const top = vy + 28, bot = vy + vh - 30, gh = bot - top;
  const cols = L.portrait ? 2 : clamp(Math.floor((vw - 20) / 160), 3, 4), maxR = clamp(Math.floor(gh / (L.portrait ? 128 : 130)), 1, 3), n = stallList().length, rows = clamp(Math.min(maxR, Math.ceil(n / cols)), 1, 3);
  const per = cols * rows, pages = Math.max(1, Math.ceil(n / per));
  RT.page = clamp(RT.page || 0, 0, pages - 1);
  const gx = vx + 12, gw = vw - 24, cw = gw / cols, ch = Math.min(gh / rows, L.portrait ? 215 : 200), gy = top + (gh - ch * rows) / 2;
  return { cols, rows, per, pages, n, gx, gy, cw, ch, top, bot };
}
function stallRect(st, G = gridGeom()) { const p = Math.floor(st / G.per); if (p !== RT.page) return null; const j = st % G.per, c = j % G.cols, r = Math.floor(j / G.cols); return [G.gx + c * G.cw + 3, G.gy + r * G.ch + 3, G.cw - 6, G.ch - 8]; }
function stallCenter(st, p) { const R0 = st >= 0 ? stallRect(st) : null; if (!R0) { const v = LY.view || [0, 0, L.W, L.H]; return [v[0] + v[2] / 2, v[1] + v[3] / 2]; } return p ? [R0[0] + p[0] * R0[2], R0[1] + p[1] * R0[3]] : [R0[0] + R0[2] / 2, R0[1] + R0[3] * .55]; }
function pageOf(st) { return Math.floor(st / gridGeom().per); }
function select(r) { if (!r) { RT.sel = null; return; } RT.sel = r.id; if (r.st >= 0) RT.page = pageOf(r.st); }
/* ---------- ark view ---------- */
function drawArkFrame(G) {
  const [vx, vy, vw, vh] = LY.view, list = stallList(); const tod = todNow();
  desert(vw + 2, vh, vh * .35, tod, { flora: false, starX: vw * .5 });
  // hull
  const hx = vx + 4, hw = vw - 8, ht = vy + 22;
  paint(() => { g.moveTo(hx + 6, ht + 6); g.lineTo(hx + 30, ht - 10); g.lineTo(hx + hw - 30, ht - 10); g.lineTo(hx + hw - 6, ht + 6); g.closePath(); }, '#7d4a2a', '#5a301a', { lw: 2, sx: 0, sy: -3 });
  paint(() => { g.moveTo(hx, ht + 4); g.lineTo(hx + hw, ht + 4); g.lineTo(hx + hw, vy + vh - 18); g.quadraticCurveTo(hx + hw - 8, vy + vh - 2, hx + hw - 40, vy + vh - 2); g.lineTo(hx + 40, vy + vh - 2); g.quadraticCurveTo(hx + 8, vy + vh - 2, hx, vy + vh - 18); g.closePath(); }, '#a86d3a', '#6e4220', { lw: 2.4, sx: 0, sy: -5 });
  // interior wall
  g.save(); g.beginPath(); g.rect(hx + 8, G.top - 2, hw - 16, G.bot - G.top + 2); g.clip(); const gr = g.createLinearGradient(0, G.top, 0, G.bot); gr.addColorStop(0, '#8a5a32'); gr.addColorStop(1, '#b88050'); g.fillStyle = gr; g.fillRect(hx, G.top - 2, hw, G.bot - G.top + 4); g.strokeStyle = 'rgba(50,25,8,.3)'; g.lineWidth = 1; for (let x = hx + 8; x < hx + hw; x += 14) { g.beginPath(); g.moveTo(x, G.top); g.lineTo(x, G.bot); g.stroke(); } g.restore();
  // string lights upgrade
  if (has('g_lights')) for (let r = 0; r < G.rows; r++) { const y0 = G.gy + r * G.ch + 2, n = Math.round(hw / 26); g.strokeStyle = 'rgba(40,20,10,.6)'; g.lineWidth = 1; g.beginPath(); g.moveTo(hx + 10, y0); for (let i = 0; i <= n; i++) g.quadraticCurveTo(hx + 10 + (i - .5) * (hw - 20) / n, y0 + 6, hx + 10 + i * (hw - 20) / n, y0); g.stroke(); }
  // stalls of this page
  for (let j = 0; j < G.per; j++) { const st = RT.page * G.per + j; if (st >= list.length) break; const r = stallRect(st, G); habitatBg(list[st], r[0], r[1], r[2], r[3], st); }
  // floor beams
  for (let r = 1; r <= G.rows; r++) { const y0 = G.gy + r * G.ch - 5; paint(() => RR(hx + 4, y0, hw - 8, 6, 2), '#8a5530', '#6a3e20', { lw: 1.4, sx: 0, sy: -2 }); }
  // deck label
  const lbl = deckLabel(G); const ly = vy + vh - 16; seed = 80; plank(vx + vw / 2 - 78, ly - 10, 156, 20, 5, '#3a2416', { rows: 1, nails: false }); ftxt(lbl, vx + vw / 2, ly + .5, 146, 13, FONT.lil, '#ffd27a', null);
  if (has('g_neon')) { g.save(); g.shadowColor = '#ff5ad0'; g.shadowBlur = 10; txt("ELLA'S ARK", hx + 52, ht - 2, `12px ${FONT.lucky}`, '#ff9ae8', null); g.restore(); }
}
function deckLabel(G) { const list = stallList(), s = RT.page * G.per, kinds = [...new Set(list.slice(s, s + G.per))]; return (G.pages > 1 ? `DECK ${RT.page + 1}: ` : '') + kinds.map(k => HAB_NAME[k].toUpperCase()).slice(0, 2).join(' + ') + (kinds.length > 2 ? ' + MORE' : ''); }
function drawView() {
  const G = gridGeom(), [vx, vy, vw, vh] = LY.view, list = stallList();
  const key = 'view:' + RT.page + ':' + G.per + ':' + list.join(',') + ':' + todNow() + ':' + (has('g_lights') ? 1 : 0) + (has('g_neon') ? 1 : 0);
  cached(key, vx, vy, vw, vh, () => drawArkFrame(G));
  // goals strip
  drawGoalsStrip(vx + 6, vy + 2, vw - 12, 22);
  // residents
  const bySt = {}; for (const r of GS.residents) bySt[r.st] = r;
  hit('view_bg', vx, G.top, vw, G.bot - G.top, () => { RT.sel = null; });
  for (let j = 0; j < G.per; j++) { const st = RT.page * G.per + j; if (st >= list.length) break; drawStall(st, stallRect(st, G), bySt[st], list[st]); }
  // deck nav + queue + Sarge on patrol
  const ny = G.bot + 2, nh = vy + vh - ny - 4;
  if (G.pages > 1) {
    const bwN = 52, lx = vx + vw / 2;
    button('deck_prev', lx - 82 - bwN, ny, bwN, nh, '', () => { RT.page = (RT.page - 1 + G.pages) % G.pages; sfx('swish'); }, { col: '#5a3a20', icon: 'left' });
    button('deck_next', lx + 82, ny, bwN, nh, '', () => { RT.page = (RT.page + 1) % G.pages; sfx('swish'); }, { col: '#5a3a20', icon: 'right' });
    const dyB = G.gy + G.rows * G.ch - 2; for (let p = 0; p < G.pages; p++) { const dx = vx + vw / 2 + (p - (G.pages - 1) / 2) * 16; paint(() => C(dx, dyB, p === RT.page ? 5 : 3.5), p === RT.page ? '#ffd24a' : '#e8d2a6', null, { lw: 1 }); }
    // which other decks need attention
    for (let p = 0; p < G.pages; p++) if (p !== RT.page && GS.residents.some(r => r.st >= p * G.per && r.st < (p + 1) * G.per && (Math.min(r.hunger, r.clean, r.health, r.happy) < .3 || r.poops.length > 1))) { const dx = vx + vw / 2 + (p - (G.pages - 1) / 2) * 16; txt('!', dx, dyB - 10, `11px ${FONT.lucky}`, '#ff5a4a', INK, 2); }
  }
  if (GS.queue.length) chip(`${GS.queue.length} waiting at the gangplank (build more space)`, vx + vw / 2, ny - 10 + (G.pages > 1 ? 0 : nh / 2 + 6), '#a8302a', '#fff4e0', 10, 'center');
  const ss = sargeSpr(); drawSpr(ss, vx + (G.pages > 1 ? Math.max(30, (vw / 2 - 82 - 52) / 2) : 40), vy + vh - 3, 60, Math.min(46, nh + 20), { blink: (RT.t % 5) < .15, flip: true });
  // events
  drawEventFx();
}
function drawGoalsStrip(x, y, w, h) {
  const c = CH[GS.ch]; if (!c) return; seed = 81; plank(x, y, w, h, 6, '#3a2416', { rows: 1, nails: false });
  const goals = GS.sanctuary ? [] : c.goals.map(goalProg);
  let s = GS.sanctuary ? 'SANCTUARY MODE · every animal deserves a home' : `CH ${GS.ch}: ${c.title.toUpperCase()}`;
  const gs = goals.map(p => `${p.cur >= p.need ? '✓ ' : ''}${p.label}${p.need > 1 ? ' ' + (p.money ? fmt$(p.cur) + '/' + fmt$(p.need) : p.cur + '/' + p.need) : ''}`).join('  ·  ');
  const all = gs ? s + '  ·  ' + gs : s;
  ftxt(all, x + w / 2, y + h / 2 + 1, w - 12, 12, FONT.lil, goals.length && goals.every(p => p.cur >= p.need) ? '#9cff9c' : '#ffe9a8', null);
  hit('goals', x, y, w, h, () => toast(GS.sanctuary ? 'Sanctuary Mode: no goals, just vibes.' : `Chapter ${GS.ch} goals: ` + goals.map(p => `${p.label} ${p.money ? fmt$(p.cur) + '/' + fmt$(p.need) : p.cur + '/' + p.need}`).join(' · '), '#ffe9a8', 3));
}
function drawNeedRings(r, cx, y, sp) {
  NEED_KEYS.forEach(([k, ic], i) => { const v = r[k], x = cx + (i - 1.5) * sp; g.beginPath(); C(x, y, 7.5); g.fillStyle = 'rgba(30,15,8,.78)'; g.fill(); g.strokeStyle = v > .6 ? '#5fd36a' : v > .3 ? '#ffc23a' : '#ff5a4a'; g.lineWidth = 2.6; g.beginPath(); g.arc(x, y, 7.5, -PI / 2, -PI / 2 + Math.max(.02, v) * TAU); g.stroke(); icon(ic, x, y, 4.2); });
}
function drawStall(st, rect, r, hab) {
  const [x, y, w, h] = rect;
  if (!r) { txt('EMPTY', x + w / 2, y + h * .55, `13px ${FONT.lil}`, 'rgba(60,30,10,.35)', null); return; }
  const sel = RT.sel === r.id, k = kitOf(r), s = getSprite(k), t = RT.t + r.id * 1.37;
  if (sel) { g.save(); g.strokeStyle = '#ffd24a'; g.lineWidth = 4; g.shadowColor = '#ffd24a'; g.shadowBlur = 12; g.beginPath(); RR(x - 1, y - 1, w + 2, h + 2, 9); g.stroke(); g.restore(); }
  const blink = (t % 3.7) < .13, br = Math.sin(t * 2.2) * .018; r.bounce = Math.max(0, (r.bounce || 0) - DT * 1.8);
  const hop = r.bounce > 0 ? Math.sin((1 - r.bounce) * PI * 2) * 10 * r.bounce : 0;
  const grumpy = Math.min(r.hunger, r.clean, r.health, r.happy) < .25, sz = sizeOf(r), mul = [0, .7, .8, .88, .94, 1, 1][clamp(sz, 1, 6)];
  const shiver = grumpy ? Math.sin(RT.t * 40) * 1.2 : 0, ellaHere = sel && RT.phase === 'care';
  const ax = x + w * (ellaHere ? .6 : .5) + shiver, by = y + h - 20 - Math.abs(hop);
  shadow(ax, by, w * .3, 4, .2);
  const sc = drawSpr(s, ax, by, w * (ellaHere ? .66 : .84), (h - 40) * 1, { blink, sqx: 1 - br, sqy: 1 + br, mul, flip: r.id % 2 === 1 });
  const sw = s.a.w * sc, sh = s.a.h * sc;
  // mood
  if (grumpy) { const cy = by - sh - 6; cloud(ax, cy, 34, 9, '#9aa4b8', '#6a7488', .95); g.strokeStyle = 'rgba(120,170,255,.8)'; g.lineWidth = 1.2; for (let i = 0; i < 4; i++) { const dx = ax - 12 + i * 8, dy = cy + 4 + ((RT.t * 30 + i * 7) % 12); g.beginPath(); g.moveTo(dx, dy); g.lineTo(dx - 1, dy + 3); g.stroke(); } }
  else if (r.happy > .9 && needAvg(r) > .8 && (t % 2.5) < 1.2) icon('heart', ax + sw * .3, by - sh - 4 - (t % 2.5) * 8, 5, { col: '#ff6a8a' });
  if (r.sp === 'mash') { g.save(); g.globalAlpha = .25 + Math.sin(RT.t * 3) * .1; g.fillStyle = '#2be3c8'; g.beginPath(); E(ax, by, sw * .45, 5); g.fill(); g.restore(); }
  // boo-boos (vet)
  r.boo.forEach((b, i) => { const bx = ax + b[0] * sw, byy = by + b[1] * sh; g.save(); g.translate(bx, byy); g.rotate(.5); paint(() => RR(-7, -3, 14, 6, 3), '#f4c89a', '#d8a878', { lw: .9 }); g.restore(); txt('+', bx, byy - 9, `11px ${FONT.lucky}`, '#ff4a4a', '#fff', 2.5); hit(`boo_${r.id}_${i}`, bx - 14, byy - 16, 28, 28, () => { select(r); if (RT.phase === 'care') careAction(r, 'vet'); }); });
  // tap animal = select (tap again = pet)
  hit('res_' + r.id, x, y, w, h, () => { if (RT.sel === r.id && RT.phase === 'care') { r.happy = clamp(r.happy + .04, 0, 1); r.bounce = 1; voice(voiceOf(r), sz); spawn('heart', [ax, by - sh * .7], 3); } else { RT.sel = r.id; sfx('tap'); voice(voiceOf(r), sz); } }, { res: r.id });
  // Ella (in the selected stall during the shift)
  if (ellaHere) { const pose = RT.ellaPose && RT.ellaPose[1] > 0 ? RT.ellaPose[0] : 'hips'; drawElla(x + w * .16, y + h - 6, Math.min(h * .86, 110), { pose, outfit: GS.day % 3 === 0 ? 'shorts' : 'jeans', flip: pose === 'hose' ? false : false }); if (pose === 'hose') { const hx = x + w * .16 + 26 * Math.min(h * .86, 110) / 292, hy = y + h - 6 - 160 * Math.min(h * .86, 110) / 292; g.save(); g.strokeStyle = 'rgba(120,200,255,.9)'; g.lineWidth = 3; g.beginPath(); g.moveTo(hx, hy); g.quadraticCurveTo((hx + ax) / 2, hy - 20, ax - sw * .1, by - sh * .5); g.stroke(); g.restore(); } }
  // poops (tap to scoop)
  r.poops.forEach((p, i) => { const px = x + p[0] * w, py = y + p[1] * h; poopShape(px, py, .55 + p[2] * .1); g.save(); g.strokeStyle = 'rgba(120,140,60,.6)'; g.lineWidth = 1; for (let k2 = 0; k2 < 2; k2++) { const sx = px - 3 + k2 * 6, o = (RT.t * 1.5 + k2) % 1; g.globalAlpha = 1 - o; g.beginPath(); g.moveTo(sx, py - 10 - o * 10); g.quadraticCurveTo(sx + 3, py - 14 - o * 10, sx, py - 18 - o * 10); g.stroke(); } g.restore(); hit(`poop_${r.id}_${i}`, px - 18, py - 20, 36, 32, () => { if (RT.phase !== 'care') return; scoop(r, i); if (grnd() < .3) ellaSay(tx(pick(ELLA_CARE.poop))); }); });
  // nameplate + flags
  g.font = `11px ${FONT.lil}`; const nm = r.name.length > 16 ? r.name.slice(0, 15) + '…' : r.name; const nw = Math.min(w - 8, g.measureText(nm).width + 14);
  paint(() => RR(x + 4, y + 4, nw, 16, 5), r.sp === 'mash' ? (r.mash.rarity === 'Legendary' ? '#ffd24a' : '#6be3c8') : '#e8d2a6', null, { lw: 1 }); ftxt(nm, x + 4 + nw / 2, y + 12.5, nw - 6, 11, FONT.lil, '#5a2a14', null);
  if (wrongHab(r)) { const tg = 'needs ' + HAB_NAME[habOf(r)]; if (w > 200) ftxt('⚠ ' + tg, x + w - 4, y + 12, w * .42, 9.5, FONT.lil, '#ffe9a8', '#a8302a', 3, 'right'); else { const bx = x + w - 12, byy = y + 12 + Math.sin(RT.t * 4) * 1.5; paint(() => C(bx, byy, 8), '#e9503f', null, { lw: 1.4 }); txt('!', bx, byy + .5, `12px ${FONT.lucky}`, '#fff', null); g.font = `9px ${FONT.lil}`; const tw2 = g.measureText(tg).width + 12; chip(tg, x + w / 2 - tw2 / 2, y + h - 30, '#a8302a', '#fff4e0', 9); } }
  if (isPerm(r)) ftxt('STORY', x + w - 6, y + 26, 50, 9, FONT.lil, '#6be3c8', INK, 2.5, 'right');
  drawNeedRings(r, x + w / 2, y + h - 8, Math.min(20, w / 5));
  if (RT.say && sel) speech(RT.say.s, x + w * .2, y + h - Math.min(h * .86, 110) - 2, Math.min(200, LY.view[2] - 20));
}
function speech(s, x, y, maxW) {
  const ls = lines(s, maxW - 16, `600 12px ${FONT.fre}`), w = Math.min(maxW, Math.max(...ls.map(l => { g.font = `600 12px ${FONT.fre}`; return g.measureText(l).width; })) + 16), h = ls.length * 15 + 10;
  const [vx, , vw] = LY.view; let bx = clamp(x - 20, vx + 4, vx + vw - w - 4), byy = Math.max(LY.view[1] + 26, y - h - 8);
  g.save(); g.fillStyle = '#fff'; g.strokeStyle = INK; g.lineWidth = 1.8; g.beginPath(); RR(bx, byy, w, h, 9); g.moveTo(clamp(x, bx + 10, bx + w - 10) - 5, byy + h); g.lineTo(clamp(x, bx + 10, bx + w - 10), byy + h + 8); g.lineTo(clamp(x, bx + 10, bx + w - 10) + 6, byy + h); g.fill(); g.stroke(); g.restore();
  ls.forEach((l, i) => txt(l, bx + w / 2, byy + 12 + i * 15, `600 12px ${FONT.fre}`, '#2b1a12', null));
}
function drawEventFx() {
  const e = RT.ev, [vx, vy, vw, vh] = LY.view; if (!e) return;
  if (e.type === 'dust' && e.on) { g.save(); g.fillStyle = `rgba(190,140,80,${.32 + Math.sin(RT.t * 2) * .05})`; g.fillRect(vx, vy, vw, vh); seed = 3; for (let i = 0; i < 5; i++) tumbleweed(vx + ((RT.t * 140 + i * 160) % (vw + 60)) - 30, vy + vh * (.3 + i * .14), 9 + i, { shadow: false }); g.restore(); }
  if (e.type === 'rain') { g.save(); g.strokeStyle = 'rgba(190,220,255,.6)'; g.lineWidth = 1.2; for (let i = 0; i < 60; i++) { const rx = vx + ((i * 53 + RT.t * 60) % vw), ry = vy + ((i * 97 + RT.t * 520) % vh); g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx - 3, ry + 10); g.stroke(); } g.restore(); }
  if (e.type === 'rhino' && e.on) { const s = getSprite(SP.rhino.kit), ry = vy + vh - 40; drawSpr(s, vx + e.x, ry, 150, 100, { flip: false, rot: Math.sin(RT.t * 18) * .04 }); for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(200,170,120,.5)'; g.beginPath(); C(vx + e.x - 60 - i * 14, ry - 6, 8 + i * 3); g.fill(); }
    txt(`TAP RHONDA! ${e.hits}/5`, vx + vw / 2, vy + 44, `20px ${FONT.lucky}`, '#ffd24a', INK, 4); hit('rhino', vx + e.x - 80, ry - 100, 160, 110, () => { e.hits++; sfx('thud'); voice('grunt', 5); shake(4); spawn('star', [vx + e.x, ry - 50], 6); }); }
}
/* ---------- care tray (portrait) / side panel (landscape) ---------- */
const TOOLS = [['feed', 'FEED'], ['wash', 'WASH'], ['vet', 'VET'], ['play', 'PLAY'], ['clean', 'SCOOP'], ['sig', 'SPECIAL']];
function needsIt(kind, r) { if (kind === 'feed') return r.hunger < .95; if (kind === 'wash') return r.clean < .99; if (kind === 'vet') return r.boo.length > 0 || r.health < .95; if (kind === 'play') return r.happy < .99; if (kind === 'clean') return r.poops.length > 0; if (kind === 'sig') return hasSig(r) && r.sigDay !== GS.day; return false; }
function urgency(kind, r) { if (kind === 'feed') return 1 - r.hunger; if (kind === 'wash') return 1 - r.clean; if (kind === 'vet') return r.boo.length + 1 - r.health; if (kind === 'play') return 1 - r.happy; if (kind === 'clean') return r.poops.length; if (kind === 'sig') return 1 - needAvg(r); return 0; }
function neediest(kind) { let best = null, bs = -1; const pg = gridGeom(); for (const r of GS.residents) { if (!needsIt(kind, r)) continue; const u = urgency(kind, r) + (pageOf(r.st) === RT.page ? .15 : 0); if (u > bs) { bs = u; best = r; } } return best; }
function doCare(kind) {
  if (RT.phase !== 'care') { sfx('boop'); toast('Care happens during the shift (8 AM to 4 PM).', '#ffd0a0', 1.8); return false; }
  let r = selRes(); if (!r || !needsIt(kind, r)) { const n = neediest(kind); if (n) { r = n; select(r); } }
  if (!r) { sfx('boop'); toast(kind === 'clean' ? 'Not a single turd on deck. Proud of you.' : 'Everybody\'s good on that one!', '#cfe8ff', 1.5); return false; }
  if (kind === 'clean') { scoop(r, r.poops.length - 1); if (grnd() < .35) ellaSay(tx(pick(ELLA_CARE.poop))); return true; }
  if (kind === 'wash') { RT.ellaPose = ['hose', 1.3]; const ok = careAction(r, 'wash', has('c_wash') ? 1 : .5); if (!ok) { sfx('scrub'); spawn('bubble', stallCenter(r.st), 8); } return true; }
  if (kind === 'play') { RT.ellaPose = ['wave', 1]; const ok = careAction(r, 'play', .55); if (!ok) { sfx('pop'); spawn('star', stallCenter(r.st), 3); } return true; }
  if (kind === 'sig') { RT.ellaPose = ['wave', 1.2]; const ok = careAction(r, 'sig'); if (ok) toast(`${sigName(r)}! ${r.name} is living their best life.`, '#ffd24a', 1.8); return ok; }
  const ok = careAction(r, kind); if (!ok) toast(`${r.name} doesn't need that right now.`, '#cfe8ff', 1.2); return ok;
}
function drawCarePanel() {
  const P = L.portrait ? LY.tray : LY.side, [x, y, w, h] = P;
  seed = 82; plank(x, y, w, h + (L.portrait ? 0 : 6), L.portrait ? 0 : 10, '#6a4024', { rows: 1, nails: false });
  const r = selRes(), pad = 8;
  // info row
  const ih = L.portrait ? (h >= 200 ? 40 : 34) : 58; const iy = y + pad;
  panel(x + pad, iy, w - pad * 2, ih, '#3a2416', { lw: 1.2, sy: -2, dark: '#2a180c' });
  if (r) {
    const s = getSprite(kitOf(r)); drawSpr(s, x + pad + 22, iy + ih - 3, 36, ih - 6, {});
    ftxt(r.name, x + pad + 46, iy + (L.portrait ? 12 : 13), w - 120, 14, FONT.lil, '#ffe9a8', null, 0, 'left');
    ftxt(spName(r), x + pad + 46, iy + (L.portrait ? 27 : 28), w - 120, 10.5, FONT.fre, '#e8d2a6', null, 0, 'left', '600 ');
    if (!L.portrait) boxTxt(bioOf(r), x + pad + 46, iy + 35, w - pad * 2 - 52, ih - 37, 10, FONT.fre, '#cfe8ff', 'left', '600 ', 8);
    const a = Math.round(adoptScore(r)); chip(`${a}%`, x + w - pad - 6, iy + 13, a >= 70 ? '#3a8a3a' : a >= 45 ? '#a87a20' : '#a8302a', '#fff', 11, 'right'); txt('adoptable', x + w - pad - 22, iy + 28, `9px ${FONT.lil}`, '#e8d2a6', null);
  } else ftxt(GS.residents.length ? 'Tap an animal, or tap a tool to help whoever needs it most.' : 'No residents right now. Post ads and wait for intake!', x + w / 2, iy + ih / 2, w - 30, 13, FONT.fre, '#ffe9a8', null, 0, 'center', '600 ');
  // tools
  const ty = iy + ih + 6, cols = L.portrait ? 6 : 3, rows = L.portrait ? 1 : 2, th = L.portrait ? (h >= 200 ? 58 : 52) : 46, tw = (w - pad * 2) / cols;
  TOOLS.forEach(([k, lab], i) => {
    const c = i % cols, rr = Math.floor(i / cols), bx = x + pad + c * tw + 2, by = ty + rr * (th + 4);
    const n = RT.phase === 'care' ? GS.residents.filter(q => needsIt(k, q) && (k === 'clean' || k === 'sig' || urgency(k, q) > .45)).length : 0;
    const want = r && needsIt(k, r);
    button('tool_' + k, bx, by, tw - 4, th, lab, () => doCare(k), { icon: k, stack: true, col: k === 'sig' ? '#d08a20' : want ? '#3f86b8' : '#8a5a3a', badge: n || 0, size: 11 });
  });
  // quick call / open-house info
  const cy = ty + rows * (th + 4) + 4, chh = y + h - cy - pad; LY.call = [x + pad, cy, w - pad * 2, chh];
  if (RT.call) drawCall(x + pad, cy, w - pad * 2, chh); else drawShiftInfo(x + pad, cy, w - pad * 2, chh);
}
function adoptScore(r) { return clamp(needAvg(r) * 100 * .85 + (r.sigDay === GS.day ? 10 : 0) + (RT.featured === r.id ? 10 : 0) + (has('g_lights') ? 5 : 0) - (wrongHab(r) ? 10 : 0), 0, 100); }
function drawShiftInfo(x, y, w, h) {
  panel(x, y, w, h, '#3a2416', { lw: 1.2, sy: -2, dark: '#2a180c' });
  const n = clamp(2 + Math.floor(GS.rep / 30) + Math.min(5, Math.floor(RT.buzz)) + (has('g_neon') ? 1 : 0), 2, 7) + (has('o_carpet') && GS.act >= 4 ? 1 : 0);
  ftxt(`OPEN HOUSE AT 4 PM · ~${n} ADOPTERS`, x + w / 2, y + 13, w - 16, 12, FONT.lil, '#ffd27a', null);
  const left = Math.max(0, RT.shiftLen - RT.shiftT); ftxt(RT.buzz > 0 ? `Buzz ${RT.buzz.toFixed(1)} · ${Math.ceil(left)}s left in the shift` : `${Math.ceil(left)}s left in the shift · ads bring more adopters`, x + w / 2, y + 29, w - 16, 10.5, FONT.fre, '#e8d2a6', null, 0, 'center', '600 ');
  const room = h - 44 - 46;
  if (room > 60) {
    const k = Math.min(n, Math.floor((w - 20) / 52)), sp = (w - 20) / k, by0 = y + 44 + Math.min(70, room - 20);
    for (let i = 0; i < k; i++) { const cx = x + 10 + sp * (i + .5); g.save(); g.globalAlpha = .9; paint(() => { g.arc(cx, by0, 18, Math.PI, 0); g.closePath(); }, '#5a3e2c', '#4a2e1c', { lw: 1.2 }); paint(() => C(cx, by0 - 26, 11), '#6a4a36', '#5a3a26', { lw: 1.2 }); txt('?', cx, by0 - 25, `13px ${FONT.lucky}`, '#ffd27a', null); g.restore(); }
    if (room > 120) { const tips = [T('Tip: matching WANTS tags means the adoption sticks. Bad matches come back. With a story.', 'Tip: matching WANTS tags means the adoption sticks.'), 'Tip: keep a streak of full-service care for the HOOAH multiplier.', 'Tip: swipe a Quick Call card left or right, or press Q / E.', T('Tip: scoop the poop before the inspector steps in it. Or after. Your call.', 'Tip: scoop the mess before the inspector arrives.'), 'Tip: Sarge sniffs out fakes at Open House. Good boy.']; boxTxt(tips[Math.floor(RT.t / 8) % tips.length], x + 12, by0 + 12, w - 24, Math.min(60, y + h - 50 - by0 - 12), 11, FONT.fre, '#e8d2a6', 'center', '600 ', 9); }
  }
  const bh = Math.min(38, h - 44); if (bh >= 24) button('ring_bell', x + 10, y + h - bh - 6, w - 20, bh, 'RING THE BELL EARLY (OPEN HOUSE)', () => { sfx('ding'); endCare(); }, { col: '#5f9654', size: 13 });
}
/* ---------- quick calls ---------- */
function drawCall(x, y, w, h) {
  const c = RT.call, dx = PTR.drag === 'call' ? clamp(PTR.x - PTR.sx, -80, 80) : 0;
  g.save(); g.translate(dx, 0); g.rotate(dx * .0012);
  panel(x, y, w, h, '#fff4e0', { lw: 1.6 }); paint(() => RR(x, y, w, 22, 10), '#e9503f', null, { lw: 1.4 }); g.fillStyle = '#e9503f'; g.fillRect(x + 2, y + 12, w - 4, 10);
  txt('⚡ QUICK CALL', x + 10, y + 11.5, `13px ${FONT.lucky}`, '#fff4e0', null, 0, 'left');
  const rem = 1 - RT.callAge / 14; g.strokeStyle = '#fff4e0'; g.lineWidth = 3; g.beginPath(); g.arc(x + w - 14, y + 11, 6, -PI / 2, -PI / 2 + rem * TAU); g.stroke();
  // who
  const pr = 22, px = x + 8 + pr, py = y + 26 + pr; const res = GS.residents.find(r => r.sp === c.who), bustp = speakerBust(c.who);
  g.save(); g.beginPath(); C(px, py, pr); g.fillStyle = '#f2d9b0'; g.fill(); g.clip(); if (res) drawSpr(getSprite(kitOf(res)), px, py + pr - 2, pr * 2, pr * 1.9); else if (c.who === 'ella' || !bustp) drawEllaBust(px, py + pr + 4, pr * 2.3); else drawBust(c.who, bustp, px, py + pr + 6, pr * 2.2); g.restore(); g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); C(px, py, pr); g.stroke();
  const bh = Math.min(34, h * .3);
  boxTxt(tx(c.t), x + pr * 2 + 16, y + 27, w - pr * 2 - 24, h - 27 - bh - 10, 13, FONT.fre, '#3a2416', 'left', '600 ', 9);
  g.restore();
  const bw = (w - 24) / 2;
  button('call_L', x + 8, y + h - bh - 6, bw, bh, '◀ ' + c.L[0], () => answerCall(0), { col: '#5f9654', size: 12 });
  button('call_R', x + 16 + bw, y + h - bh - 6, bw, bh, c.R[0] + ' ▶', () => answerCall(1), { col: '#3f86b8', size: 12 });
  hit('call_card', x, y, w, h - bh - 8, () => {}, { drag: 'call' });
}
/* ---------- arrivals (morning intake) ---------- */
function drawArrivals() {
  const r = RT.arrivals[RT.arrivalI]; if (!r) return; const M = LY.main; blocker('arr_block');
  g.save(); g.fillStyle = 'rgba(20,10,30,.62)'; g.fillRect(M[0], M[1], M[2], M[3]); g.restore();
  const w = Math.min(M[2] - 24, L.portrait ? 360 : 560), h = Math.min(M[3] - 20, L.portrait ? 520 : 330), x = M[0] + (M[2] - w) / 2, y = M[1] + (M[3] - h) / 2;
  panel(x, y, w, h, '#fff4e0', { lw: 2 });
  const isMash = r.sp === 'mash', opened = !isMash || RT.crateOpen;
  const head = r.returned ? 'RETURNED!' : isMash ? (opened ? (r.mash.rarity === 'Legendary' ? '★ LEGENDARY MASHUP! ★' : r.mash.rarity === 'Rare' ? 'RARE MASHUP!' : 'MASHUP DELIVERY!') : 'STORKDASH DELIVERY') : SP[r.sp] && SP[r.sp].cls !== 'pet' ? 'EXOTIC ARRIVAL!' : 'NEW ARRIVAL!';
  paint(() => RR(x, y, w, 34, 12), isMash ? '#2fb8b0' : r.returned ? '#a8302a' : '#e9503f', null, { lw: 1.6 }); g.fillStyle = isMash ? '#2fb8b0' : r.returned ? '#a8302a' : '#e9503f'; g.fillRect(x + 2, y + 18, w - 4, 16);
  ftxt(head, x + w / 2, y + 18, w - 20, 20, FONT.lucky, '#fff4e0', INK, 3);
  ftxt(`${RT.arrivalI + 1} of ${RT.arrivals.length}`, x + w - 10, y + 46, 80, 10, FONT.lil, '#8a6a4a', null, 0, 'right');
  // stage
  const land = !L.portrait, sx = x + 12, sy = y + 40, sw = land ? w * .5 - 18 : w - 24, sh = land ? h - 52 : h * .46;
  g.save(); g.beginPath(); RR(sx, sy, sw, sh, 10); g.clip(); const gr = g.createLinearGradient(0, sy, 0, sy + sh); gr.addColorStop(0, isMash ? '#3a2a6a' : '#8fd0e8'); gr.addColorStop(1, isMash ? '#2be3c8' : '#ffd29a'); g.fillStyle = gr; g.fillRect(sx, sy, sw, sh); g.fillStyle = isMash ? 'rgba(0,0,0,.2)' : '#e8b682'; g.fillRect(sx, sy + sh * .78, sw, sh); g.restore(); g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); RR(sx, sy, sw, sh, 10); g.stroke();
  RT.crateT = (RT.crateT || 0) + DT;
  if (!opened) {
    const wob = Math.sin(RT.crateT * 18) * .08 * (1 + Math.sin(RT.crateT * 2)); g.save(); g.translate(sx + sw / 2, sy + sh * .82); g.rotate(wob);
    paint(() => RR(-48, -78, 96, 78, 4), '#c08a50', '#9a6a38', { lw: 2, tex: () => { g.strokeStyle = 'rgba(80,40,10,.5)'; g.lineWidth = 2; for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(-48, -26 * (i + 2)); g.lineTo(48, -26 * (i + 2)); g.stroke(); } g.beginPath(); g.moveTo(-48, -78); g.lineTo(48, 0); g.stroke(); } });
    txt('FRAGILE-ISH', 0, -40, `11px ${FONT.lil}`, '#7a3a10', null); g.restore();
    stork(sx + sw * .2, sy + sh * .5, .7);
    if (Math.floor(RT.crateT * 2) % 2) ftxt('TAP TO PRY IT OPEN', sx + sw / 2, sy + 18, sw - 20, 16, FONT.lucky, '#fff4e0', INK, 3);
    hit('crate', sx, sy, sw, sh, openCrate);
  } else {
    const k = kitOf(r), s = getSprite(k), rev = isMash ? clamp((RT.crateT - (RT.openT || 0)) * 2.5, 0, 1) : 1;
    if (isMash && rev < 1) { g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(sx + sw / 2, sy + sh / 2, 4, sx + sw / 2, sy + sh / 2, sw * .6); gl.addColorStop(0, `rgba(255,240,200,${1 - rev})`); gl.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = gl; g.fillRect(sx, sy, sw, sh); g.restore(); }
    const by = sy + sh * .9, bounce = Math.abs(Math.sin(RT.t * 3)) * 3; shadow(sx + sw / 2, by, sw * .32, 6, .25);
    drawSpr(s, sx + sw / 2, by - bounce, sw * .86, sh * .8, { blink: (RT.t % 3) < .12, mul: .4 + rev * .6, sqy: 1 + Math.sin(RT.t * 2.4) * .02 });
    if (isMash && r.mash.rarity !== 'Common') for (let i = 0; i < 5; i++) sparkle(sx + sw / 2 + Math.cos(RT.t * 2 + i * 1.3) * sw * .38, sy + sh * .45 + Math.sin(RT.t * 3 + i) * sh * .3, 3 + i % 2 * 2, '#fff', .9);
  }
  // text
  const tx0 = land ? x + w * .5 : x + 14, ty0 = land ? y + 54 : sy + sh + 10, tw = land ? w * .5 - 14 : w - 28, bh = 44, th = y + h - ty0 - bh - 34;
  if (opened) {
    ftxt(r.name, tx0 + tw / 2, ty0 + 12, tw, 24, FONT.lucky, '#a8302a', null);
    ftxt(spName(r).replace(/^★ Legendary |^Rare /, ''), tx0 + tw / 2, ty0 + 34, tw, 12, FONT.lil, '#6a4a2a', null);
    const note = r.returned ? r.returned : bioOf(r); boxTxt(note, tx0, ty0 + 48, tw, th - 72, 14, FONT.fre, '#3a2416', 'center', '600 ', 10);
    const tags = tagsOf(r).slice(0, 4); let cx = tx0 + tw / 2 - tags.length * 40; g.font = `10px ${FONT.lil}`; const tws = tags.map(t => g.measureText(t).width + 18); let tot = tws.reduce((a, b) => a + b, 0); cx = tx0 + (tw - tot) / 2; tags.forEach((t, i) => { chip(t, cx, ty0 + th - 14, '#3f86b8', '#fff', 10); cx += tws[i]; });
    const hb = habOf(r); if (hb && hb !== 'kennel') ftxt(stallList().includes(hb) ? `Moves into the ${HAB_NAME[hb]}.` : `Needs ${/^[AEIOU]/i.test(HAB_NAME[hb]) ? 'an' : 'a'} ${HAB_NAME[hb]} (BUILD tab) to be happy.`, tx0 + tw / 2, ty0 + th + 7, tw, 11, FONT.lil, stallList().includes(hb) ? '#3a8a3a' : '#c0402a', null);
  } else boxTxt('Gerald the stork drops a crate on the gangplank, demands five stars and flies off. Something inside is making a noise like a kazoo in a blender.', tx0, ty0 + 6, tw, th, 14, FONT.fre, '#3a2416', 'center', '600 ', 10);
  const bw = (tw - 10) / 2;
  if (opened) { button('arr_next', tx0 + tw - bw, y + h - bh - 12, bw, bh, RT.arrivalI + 1 < RT.arrivals.length ? 'NEXT ▶' : 'START SHIFT ▶', () => { RT.crateOpen = false; nextArrival(); }, { col: '#5f9654', size: 16 }); if (RT.arrivals.length - RT.arrivalI > 1) button('arr_skip', tx0, y + h - bh - 12, bw, bh, 'SKIP ALL', () => { RT.crateOpen = false; RT.arrivals = []; startCare(); }, { col: '#8a5a3a', size: 14 }); }
  else button('arr_open', tx0 + tw / 4, y + h - bh - 12, tw / 2, bh, 'OPEN CRATE', openCrate, { col: '#2fb8b0', size: 16 });
}
function openCrate() { if (RT.crateOpen) return; RT.crateOpen = true; RT.openT = RT.crateT; sfx('crate'); setTimeout(() => sfx('drumroll'), 100); setTimeout(() => { sfx('fwoomp'); const r = RT.arrivals[RT.arrivalI]; if (r) voice(voiceOf(r), sizeOf(r)); }, 700); spawn('sparkle', [L.W / 2, L.H / 2], 20); }
/* ---------- inspection modal ---------- */
function drawInspect() {
  const m = RT.modal; m.t += DT; const M = LY.main; blocker();
  g.save(); g.fillStyle = 'rgba(20,10,30,.6)'; g.fillRect(M[0], M[1], M[2], M[3]); g.restore();
  const w = Math.min(M[2] - 30, 380), h = Math.min(M[3] - 30, 380), x = M[0] + (M[2] - w) / 2, y = M[1] + (M[3] - h) / 2;
  panel(x, y, w, h, '#fbfbf6', { lw: 2 }); ftxt('COUNTY INSPECTION', x + w / 2, y + 22, w - 20, 22, FONT.lucky, '#2a3a5a', null);
  drawBust('plinth', CAST.plinth, x + 52, y + 140, 92);
  m.checks.forEach(([l, ok], i) => { const yy = y + 56 + i * 32; if (m.t > .3 + i * .35) { ftxt(l, x + 112, yy + 10, 120, 16, FONT.lil, '#2a3a5a', null, 0, 'left'); txt(ok ? '✓' : '✗', x + w - 40, yy + 10, `22px ${FONT.lucky}`, ok ? '#3a9a3a' : '#c0302a', null); if (Math.abs(m.t - (.3 + i * .35)) < DT * 1.5) sfx(ok ? 'ding' : 'boop'); } });
  if (m.t > 1.9) { g.save(); g.translate(x + w / 2, y + h - 104); g.rotate(-.15); const s = 1 + Math.max(0, 2.2 - m.t) * 3; g.scale(s, s); g.strokeStyle = m.pass ? '#3a9a3a' : '#c0302a'; g.lineWidth = 4; g.beginPath(); RR(-80, -22, 160, 44, 6); g.stroke(); txt(m.pass ? 'PASSED' : 'FAILED', 0, 1, `30px ${FONT.lucky}`, m.pass ? '#3a9a3a' : '#c0302a', null); g.restore(); if (!m.stamped) { m.stamped = 1; sfx('stamp'); shake(5); } }
  if (m.t > 2.2) { boxTxt(m.pass ? T('"...Adequate." Plinth looked like he swallowed a lemon. Sideways.', '"...Adequate." Plinth looked like he swallowed a lemon.') : 'Plinth smirks. "Same time tomorrow, Miss Ella." Keep everyone fed, clean, healthy and happy.', x + 14, y + h - 76, w - 28, 30, 12, FONT.fre, '#3a2416', 'center', '600 ');
    button('insp_ok', x + w / 2 - 80, y + h - 44, 160, 36, 'CONTINUE', () => { RT.modal = null; startOpen(); }, { col: '#5f9654' }); }
}
