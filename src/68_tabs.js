/* ===================== TABS: ads, open house, report + romance, build, dex ===================== */
let SCROLLS = [];
function scrollArea(key, rect, contentH, fn) {
  const [x, y, w, h] = rect, max = Math.max(0, contentH - h); RT.scroll[key] = clamp(RT.scroll[key] || 0, 0, max);
  SCROLLS.push({ key, rect, max }); const off = RT.scroll[key];
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); const oc = CLIP; CLIP = rect; g.translate(0, -off);
  // hits registered inside fn are in content coords: shift them
  const n0 = HITS.length; fn(y); for (let i = n0; i < HITS.length; i++) { const hh = HITS[i]; hh.y -= off; const y0 = Math.max(hh.y, y), y1 = Math.min(hh.y + hh.h, y + h); if (y1 - y0 < 6) { hh.dead = 1; } else { hh.h = y1 - y0; hh.y = y0; } }
  HITS = HITS.filter(hh => !hh.dead); CLIP = oc; g.restore();
  if (max > 0) { const bh = Math.max(24, h * h / contentH), by = y + (h - bh) * off / max; g.fillStyle = 'rgba(255,240,220,.45)'; g.beginPath(); RR(x + w - 5, by, 4, bh, 2); g.fill(); }
}
function mainPanel(title, col = '#3a2416') { const [x, y, w, h] = LY.main; seed = 90; plank(x, y, w, h, 0, '#6a4024', { rows: 1, nails: false }); if (title) { ftxt(title, x + w / 2, y + 18, w - 20, 20, FONT.lucky, '#ffe9a8', INK, 4); } return [x + 8, y + (title ? 36 : 8), w - 16, h - (title ? 44 : 16)]; }
/* ---------- ADS ---------- */
function drawAds() {
  const [x, y, w, h] = mainPanel("DAKOTA'S ADOPT-A-GRAM");
  const list = adoptables(); if (!list.length) { ftxt('No adoptable animals right now.', x + w / 2, y + 60, w - 20, 16, FONT.lil, '#ffe9a8', null); return; }
  RT.adI = clamp(RT.adI || 0, 0, list.length - 1); const r = list[RT.adI]; RT.capI = RT.capI || 0;
  const land = !L.portrait, pw = land ? Math.min(250, w * .42) : Math.min(w - 20, 300), ph = land ? h - 6 : Math.min(h * .56, 360), px = land ? x + 6 : x + (w - pw) / 2, py = y;
  // phone
  paint(() => RR(px, py, pw, ph, 20), '#24242c', '#14141a', { lw: 2, sx: 0, sy: -3 }); const sx = px + 8, sy = py + 20, sw = pw - 16, sh = ph - 30;
  g.save(); g.beginPath(); RR(sx, sy, sw, sh, 10); g.clip(); g.fillStyle = '#fff'; g.fillRect(sx, sy, sw, sh);
  txt('Adopt-a-Gram', sx + 10, sy + 12, `13px ${FONT.lucky}`, '#e0457b', null, 0, 'left'); txt('@ellasark915', sx + sw - 8, sy + 12, `600 10px ${FONT.fre}`, '#888', null, 0, 'right');
  const fh = Math.min(sh * .55, sw * .8); miniScene(sx, sy + 22, sw, fh, 'day', 0, { flora: true, hz: .6 });
  drawSpr(getSprite(kitOf(r)), sx + sw / 2, sy + 22 + fh - 6, sw * .8, fh * .82, { blink: (RT.t % 3) < .1 });
  const posted = RT.adPost && RT.adPost.r === r.id && RT.adPost.t < 3.5;
  if (posted) { RT.adPost.t += DT; const lk = Math.round(RT.adPost.likes * clamp(RT.adPost.t / 1.5, 0, 1)); g.fillStyle = 'rgba(224,69,123,.85)'; g.beginPath(); RR(sx + sw / 2 - 70, sy + 22 + fh / 2 - 20, 140, 40, 20); g.fill(); icon('heart', sx + sw / 2 - 46, sy + 22 + fh / 2, 9, { col: '#fff' }); txt(lk.toLocaleString('en-US'), sx + sw / 2 + 12, sy + 22 + fh / 2 + 1, `20px ${FONT.lucky}`, '#fff', null); }
  const caps = adCaptions(r); const cy = sy + 28 + fh; txt(r.name, sx + 8, cy + 6, `13px ${FONT.lil}`, '#222', null, 0, 'left');
  boxTxt(tx(caps[RT.capI % 3]), sx + 8, cy + 16, sw - 16, sh - (cy + 16 - sy) - 22, 12, FONT.fre, '#333', 'left', '600 ', 9);
  ftxt(tagsOf(r).slice(0, 3).map(t => '#' + t.replace(/[^A-Za-z]/g, '')).join(' '), sx + 8, sy + sh - 10, sw - 16, 11, FONT.fre, '#3f86b8', null, 0, 'left', '700 ');
  g.restore();
  button('ad_prev', px - (land ? 0 : 4), py + ph / 2 - 22, 36, 44, '', () => { RT.adI = (RT.adI - 1 + list.length) % list.length; }, { col: '#5a3a20', icon: 'left' });
  button('ad_next', px + pw - 36 + (land ? 0 : 4), py + ph / 2 - 22, 36, 44, '', () => { RT.adI = (RT.adI + 1) % list.length; }, { col: '#5a3a20', icon: 'right' });
  // controls
  const cx = land ? px + pw + 12 : x, cw = land ? x + w - cx : w, cyy = land ? y : py + ph + 8;
  ftxt('CAPTION', cx + 4, cyy + 10, 80, 12, FONT.lil, '#ffd27a', null, 0, 'left');
  for (let i = 0; i < 3; i++) button('cap_' + i, cx + 70 + i * ((cw - 74) / 3), cyy, (cw - 74) / 3 - 4, 30, ['Spicy', 'Sweet', 'Honest'][i], () => { RT.capI = i; }, { col: RT.capI === i ? '#e0457b' : '#8a5a3a', size: 12 });
  const care = RT.phase === 'care', chY = cyy + 38, chH = land ? Math.min(46, (h - 44) / CHANNELS.length - 4) : Math.min(44, (y + h - chY) / CHANNELS.length - 4);
  CHANNELS.forEach((c, i) => {
    const lock = c.req && !has(c.req), used = RT.adsToday[c.id] || 0, cost = c.cost * (GS.act >= 3 ? 10 : 1), out = used >= c.per, by = chY + i * (chH + 4);
    const lab = lock ? `${c.name}: build ${UPG_BY[c.req].name}` : `${c.name} · ${cost ? fmt$(cost) : 'FREE'} · buzz +${c.buzz}${c.adopters ? ' · +' + c.adopters + ' adopter' : ''} (${c.per - used} left)`;
    button('ch_' + c.id, cx, by, cw, chH, lab, () => { if (!care) { toast('Post during the care shift so the Buzz counts for today\'s Open House.', '#ffd0a0', 2.2); return; } postAd(r, c.id, RT.capI % 3); }, { col: lock || out ? '#9c8b7a' : ['#e0457b', '#5f9654', '#e08a3a', '#3f86b8', '#a060c0'][i], size: 12, disabled: lock || out || GS.money < cost, onDisabled: () => { sfx('boop'); toast(lock ? `Build ${UPG_BY[c.req].name} in the BUILD tab first.` : out ? 'That channel is tapped out today.' : 'Not enough cash.', '#ffd0a0', 1.8); } });
  });
  if (!care) ftxt('Ads post during the care shift (8 AM to 4 PM).', cx + cw / 2, Math.min(y + h - 8, chY + CHANNELS.length * (chH + 4) + 10), cw, 11, FONT.fre, '#ffe9a8', null, 0, 'center', '600 ');
}
/* ---------- ADOPT (open house / red carpet) ---------- */
const QTXT = { home: 'Where will they live?', day: "What's your day like?", past: 'Had pets before?' };
function drawAdoptPre() {
  const [x, y, w, h] = mainPanel('OPEN HOUSE AT 4 PM');
  const list = adoptables(); boxTxt(`Adopters come at the end of every shift. More Buzz (ads), reputation and upgrades bring more of them. Animals with full needs rings are more adoptable and bring bigger donations.`, x + 10, y, w - 20, 70, 13, FONT.fre, '#ffe9a8', 'center', '600 ');
  const rows = list.slice(0, 12); scrollArea('pre', [x, y + 72, w, h - 130], rows.length * 52, (y0) => { rows.forEach((r, i) => { const yy = y0 + i * 52; panel(x + 4, yy, w - 8, 46, '#fff4e0', { lw: 1.2, sy: -2 }); drawSpr(getSprite(kitOf(r)), x + 30, yy + 43, 44, 40); ftxt(r.name, x + 60, yy + 15, w - 160, 14, FONT.lil, '#5a2a14', null, 0, 'left'); ftxt(tagsOf(r).slice(0, 3).join(' · '), x + 60, yy + 32, w - 160, 11, FONT.fre, '#6a4a2a', null, 0, 'left', '600 '); const a = Math.round(adoptScore(r)); chip(a + '%', x + w - 16, yy + 23, a >= 70 ? '#3a8a3a' : a >= 45 ? '#a87a20' : '#a8302a', '#fff', 12, 'right'); }); });
  if (RT.phase === 'care') button('pre_bell', x + w / 2 - 130, y + h - 50, 260, 44, 'RING THE BELL NOW', () => { sfx('ding'); setTab('ark'); endCare(); }, { col: '#5f9654' });
}
function drawOpenHouse() {
  const a = curAdopter(); const list = adoptables();
  const [x, y, w, h] = mainPanel(a && a.celeb ? '★ RED CARPET ★' : 'OPEN HOUSE');
  if (!a || !list.length) {
    cached('oh:dusk:' + w + 'x' + h, x, y, w, h, () => { g.save(); g.translate(x, y); g.beginPath(); RR(0, 0, w, h, 14); g.clip(); desert(w, h, h * .62, 'sunset', { flora: true, starX: w * .78 }); g.restore(); g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); RR(x, y, w, h, 14); g.stroke(); });
    const eh = Math.min(h * .55, 300), ex = x + w * (L.portrait ? .38 : .3); drawElla(ex, y + h - 12, eh, { pose: Math.floor(RT.t * 1.5) % 2 ? 'wave' : 'hips' }); drawSpr(sargeSpr(), ex + eh * .36, y + h - 12, eh * .5, eh * .36, { blink: (RT.t % 4) < .15 });
    ftxt(list.length ? 'That\'s everybody! Closing the gangplank...' : 'Nobody left to adopt! Ark\'s empty, hearts are full.', x + w / 2, y + 40, w - 30, 18, FONT.lucky, '#fff4e0', INK, 4);
    ftxt(T('Ella: "Sarge, sniff the tip jar. Is that... a used scratch-off?"', 'Ella: "Good work today, Sarge."'), x + w / 2, y + 66, w - 30, 13, FONT.fre, '#ffe9a8', '#3a1a2a', 3, 'center', '600 ');
    return;
  }
  RT.ci = clamp(RT.ci, 0, list.length - 1); const r = list[RT.ci], mi = matchInfo(a, r);
  ftxt(`Adopter ${RT.ai + 1} of ${RT.adopters.length}`, x + 4, y - 21, 110, 11, FONT.lil, '#e8d2a6', null, 0, 'left');
  const land = !L.portrait, aw = land ? w * .52 - 4 : w, ah = land ? h - 58 : Math.min(h * .5, 310);
  // adopter card
  const ax = x, ay = y; panel(ax, ay, aw, ah, a.celeb ? '#fff0f6' : '#fff4e0', { lw: 1.6 });
  if (a.celeb) { g.save(); g.globalAlpha = .5; for (let i = 0; i < 10; i++) sparkle(ax + 10 + (i * 37) % (aw - 20), ay + 10 + (i * 53) % (ah - 20), 2.5, '#ffd24a', .8); g.restore(); }
  g.save(); g.beginPath(); RR(ax + 8, ay + 8, 92, 96, 10); g.fillStyle = a.celeb ? '#3a2a6a' : '#cfe8f0'; g.fill(); g.clip(); drawBust(a.id, a.bust, ax + 54, ay + 108, 92); g.restore(); g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); RR(ax + 8, ay + 8, 92, 96, 10); g.stroke();
  ftxt(a.name, ax + 108, ay + 20, aw - 116, 18, FONT.lucky, a.celeb ? '#c0306a' : '#a8302a', null, 0, 'left');
  ftxt(a.who, ax + 108, ay + 38, aw - 116, 12, FONT.lil, '#6a4a2a', null, 0, 'left');
  boxTxt(a.line ? '"' + tx(a.line) + '"' : a.extra ? tx(a.extra) : 'Looking for a new best friend.', ax + 108, ay + 48, aw - 116, 56, 12, FONT.fre, '#3a2416', 'left', 'italic 600 ', 9);
  // wants
  let wx = ax + 10; txt('WANTS:', wx, ay + 118, `11px ${FONT.lil}`, '#6a4a2a', null, 0, 'left'); wx += 50; const tg = tagsOf(r);
  for (const wnt of a.wants) { const ok = tg.includes(wnt); wx += chip((ok ? '✓ ' : '') + wnt, wx, ay + 118, ok ? '#3a8a3a' : '#8a6a4a', '#fff', 11) + 4; }
  // sniff test
  if (a.sniff) ftxt(a.sniff === 'sneeze' ? 'Sarge sneezed at them. Probably the cologne.' : 'Sarge is growling at them. Hmm.', ax + aw / 2, ay + 138, aw - 16, 11, FONT.fre, a.sniff === 'sneeze' ? '#6a4a2a' : '#c0402a', null, 0, 'center', '700 ');
  // questions
  const qy = ay + 150, maxQ = SETTINGS.chill ? 3 : 2, qh = Math.min(30, (ah - 158) / 3 - 4);
  ['home', 'day', 'past'].forEach((q, i) => {
    const asked = RT.asked.includes(q), by = qy + i * (qh + 4);
    if (asked) { const flag = flagVisible(a) && a.flag.q === q; panel(ax + 8, by, aw - 16, qh, flag ? '#ffe0dc' : '#eef6ff', { lw: 1, sy: -1 }); boxTxt((flag ? '🚩 ' : '') + (flag ? tx(a.flag.text) : a.ans[q]), ax + 14, by + 3, aw - 28, qh - 4, 11.5, FONT.fre, flag ? '#a8202a' : '#2a3a5a', 'left', '600 ', 8); }
    else button('q_' + q, ax + 8, by, aw - 16, qh, QTXT[q], () => ask(q), { col: '#3f86b8', size: 12, disabled: RT.asked.length >= maxQ, onDisabled: () => { sfx('boop'); toast(`Only ${maxQ} questions per adopter.`, '#ffd0a0', 1.4); } });
  });
  // animal picker
  const px = land ? x + aw + 8 : x, py = land ? y : ay + ah + 8, pw = land ? w - aw - 8 : w, ph = land ? h - 58 : y + h - py - 58;
  panel(px, py, pw, ph, '#f2d9b0', { lw: 1.6 });
  const sh = ph - 66; miniScene(px + 6, py + 6, pw - 12, sh - 2, a.celeb ? 'sunset' : 'day', 9, { flora: true, hz: .62 }); const s = getSprite(kitOf(r)); shadow(px + pw / 2, py + 8 + sh, pw * .25, 5, .2); drawSpr(s, px + pw / 2, py + 8 + sh, pw * .62, sh - 6, { blink: (RT.t % 3.3) < .12, sqy: 1 + Math.sin(RT.t * 2.2) * .02 });
  ftxt(r.name, px + pw / 2, py + ph - 48, pw - 90, 16, FONT.lucky, '#5a2a14', null);
  ftxt(spName(r), px + pw / 2, py + ph - 32, pw - 20, 10.5, FONT.lil, '#6a4a2a', null);
  const hearts = a.wants.length; for (let i = 0; i < hearts; i++) icon('heart', px + pw / 2 + (i - (hearts - 1) / 2) * 20, py + ph - 14, 7.5, { col: i < mi.hearts ? '#ff4a6a' : '#c8b09a' });
  if (mi.big) ftxt("TOO BIG FOR THEIR PLACE", px + pw / 2, py + 16, pw - 20, 13, FONT.lucky, '#c0302a', '#fff', 3);
  if (list.length > 1) { button('pick_prev', px + 6, py + sh / 2 - 20, 40, 48, '', () => { RT.ci = (RT.ci - 1 + list.length) % list.length; sfx('swish'); }, { col: '#5a3a20', icon: 'left' }); button('pick_next', px + pw - 46, py + sh / 2 - 20, 40, 48, '', () => { RT.ci = (RT.ci + 1) % list.length; sfx('swish'); }, { col: '#5a3a20', icon: 'right' }); ftxt(`${RT.ci + 1}/${list.length}`, px + pw / 2, py + 12, 60, 10, FONT.lil, '#8a6a4a', null); }
  // approve / deny
  const by = y + h - 50, bw = (w - 16) / 2;
  button('approve', x, by, bw, 46, 'APPROVE ✓', approve, { col: '#3a9a4a', size: 18, sfx: 'tap' });
  button('deny', x + bw + 16, by, bw, 46, 'DENY ✗', deny, { col: '#c0302a', size: 18 });
  hit('skip_open', x + w - 80, y - 34, 80, 26, () => { sfx('tap'); RT.ai = RT.adopters.length; endOpen(); });
  paint(() => RR(x + w - 74, y - 32, 72, 22, 11), '#5a3a26', '#3a2416', { lw: 1.2, sy: -1 }); ftxt('END DAY ▸', x + w - 38, y - 21, 64, 10, FONT.lil, '#ffe9a8', null);
  // stamp + donation pop
  if (RT.stamp) { RT.stamp.t += DT; const t = RT.stamp.t; if (t > 1.1) RT.stamp = null; else { g.save(); g.translate(x + w / 2, y + h * .4); g.rotate(-.18); const sc = 1 + Math.max(0, .25 - t) * 6; g.scale(sc, sc); g.globalAlpha = Math.min(1, (1.1 - t) * 4); const col = RT.stamp.ok ? '#2a8a3a' : '#c0302a'; g.strokeStyle = col; g.lineWidth = 6; g.beginPath(); RR(-130, -32, 260, 64, 8); g.stroke(); txt(RT.stamp.ok ? 'ADOPTED!' : 'DENIED BY ELLA', 0, 2, `${RT.stamp.ok ? 40 : 30}px ${FONT.lucky}`, col, null); g.restore(); } }
}
function drawDonationPop() { if (!RT.lastDon) return; RT.lastDon.t += DT; const t = RT.lastDon.t; if (t > 2.2) { RT.lastDon = null; return; } const M = LY.main; g.save(); g.globalAlpha = Math.min(1, (2.2 - t) * 3); const s = 1 + Math.max(0, .3 - t) * 3; g.translate(M[0] + M[2] / 2, M[1] + M[3] * .28 - t * 20); g.scale(s, s); txt('+' + fmtFull$(RT.lastDon.v), 0, 0, `${RT.lastDon.v >= 1e6 ? 40 : 32}px ${FONT.lucky}`, '#9cff6a', INK, 6); if (RT.lastDon.v >= 1e6) txt('MONEY RAIN!', 0, 34, `18px ${FONT.lucky}`, '#ffd24a', INK, 4); g.restore(); }
/* ---------- REPORT + ROMANCE ---------- */
function drawReport() {
  const M = LY.main, [x, y, w, h] = M; const rp = RT.report; rp.t += DT;
  if (RT.romance) { drawRomance(); return; }
  cached('rep:sunset', x, y, w, h, () => { g.save(); g.translate(x, y); storyBg('sunset', w, h); g.restore(); });
  const land = !L.portrait, ex = land ? x + w * .16 : x + w * .2, eh = land ? h * .72 : Math.min(h * .34, 220);
  drawElla(ex, y + h - 6, eh, { pose: rp.t > 1 ? 'wave' : 'hips' }); drawSpr(sargeSpr(), ex + eh * .32, y + h - 6, eh * .5, eh * .36, { blink: (RT.t % 4) < .15 });
  if (rp.t > 1 && rp.t < 3.5) speech(T('Another day, another dollar. And a metric shit-ton of poop.', 'Another day, another dollar. And a LOT of poop.'), ex, y + h - eh - 4, 220);
  const cw = land ? Math.min(380, w * .56) : w - 24, ch = land ? h - 20 : h - eh - 30, cx = land ? x + w - cw - 12 : x + 12, cy = y + 10;
  panel(cx, cy, cw, ch, 'rgba(255,244,224,.96)', { lw: 1.8 });
  ftxt(`DAY ${GS.day} · SUNSET REPORT`, cx + cw / 2, cy + 20, cw - 20, 20, FONT.lucky, '#a8302a', null);
  for (let i = 0; i < 3; i++) { const on = i < rp.stars && rp.t > .5 + i * .3, sc = on ? 1 + Math.max(0, .5 + i * .3 + .25 - rp.t) * 2 : 1; icon('star', cx + cw / 2 + (i - 1) * 40, cy + 54, 15 * sc, { col: on ? '#ffd24a' : '#d8c8b0' }); }
  const rows = [['Adoptions', String(rp.adopt)], ['Donations', fmtFull$(rp.earn)], ['Kibble & hay bill', '-' + fmtFull$(rp.bill)]];
  if (rp.ac) rows.push(['Poop-powered A/C', '+' + fmtFull$(rp.ac)]); if (rp.lupe) rows.push(['Doc Lupe "found money in her truck"', '+' + fmtFull$(rp.lupe)]);
  rows.push(['Ark average care', Math.round(rp.avg * 100) + '%']);
  const rh = Math.min(22, (ch - 210) / (rows.length + 3));
  rows.forEach(([a, b], i) => { const yy = cy + 82 + i * rh; ftxt(a, cx + 16, yy, cw * .62, 13, FONT.fre, '#3a2416', null, 0, 'left', '600 '); ftxt(b, cx + cw - 16, yy, cw * .34, 14, FONT.lil, b[0] === '-' ? '#c0302a' : '#2a6a2a', null, 0, 'right'); });
  // goals
  const gy = cy + 86 + rows.length * rh; if (!GS.sanctuary) { const c = CH[GS.ch]; ftxt(`CH ${GS.ch}: ${c.title}`, cx + cw / 2, gy + 4, cw - 20, 12, FONT.lil, '#6a4a2a', null); c.goals.map(goalProg).forEach((p, i) => { const yy = gy + 22 + i * 18, done = p.cur >= p.need; ftxt(`${done ? '✓' : '○'} ${p.label}: ${p.money ? fmt$(p.cur) + ' / ' + fmt$(p.need) : p.cur + ' / ' + p.need}`, cx + cw / 2, yy, cw - 24, 12, FONT.fre, done ? '#2a8a3a' : '#3a2416', null, 0, 'center', '700 '); }); }
  // buttons
  const bh = 44, by = cy + ch - bh - 10, done = !GS.sanctuary && goalsDone();
  if (rp.romance && !rp.romDone) {
    const bench = has('p_bench');
    button('romance', cx + 10, by - bh - 8, cw - 20, bh, bench ? 'LOVE BENCH: PICK A COUPLE ♥' : 'ROMANCE HOUR AT THE PUDDLE ♥', () => { if (bench) RT.lovePick = RT.lovePick && RT.lovePick.length ? RT.lovePick : [], RT.bench = true; else doRomance(romancePairs()); }, { col: '#e0457b', glow: '#ff9ad8' });
    button('next_day', cx + 10, by, cw - 20, bh, 'SKIP ROMANCE · NEXT DAY ▶', nextDay, { col: '#8a5a3a', size: 14 });
  } else button('next_day', cx + 10, by, cw - 20, bh, done ? 'CHAPTER COMPLETE! CONTINUE ▶' : 'NEXT DAY ▶', nextDay, { col: done ? '#e9a020' : '#5f9654', glow: done ? '#ffd24a' : null });
  if (RT.bench) drawBench();
}
function benchCands() { return [...new Set(GS.residents.filter(r => SP[r.sp] && r.sp !== 'sarge' && !r.stray).map(r => r.sp))]; }
function drawBench() {
  const M = LY.main; blocker(); g.save(); g.fillStyle = 'rgba(30,10,40,.7)'; g.fillRect(M[0], M[1], M[2], M[3]); g.restore();
  const w = Math.min(M[2] - 20, 520), h = Math.min(M[3] - 20, 520), x = M[0] + (M[2] - w) / 2, y = M[1] + (M[3] - h) / 2; panel(x, y, w, h, '#fff0f6', { lw: 2 });
  ftxt('THE LOVE BENCH', x + w / 2, y + 20, w - 20, 22, FONT.lucky, '#c0306a', null); ftxt('Pick two residents for Romance Hour.', x + w / 2, y + 40, w - 20, 12, FONT.fre, '#6a3a4a', null, 0, 'center', '600 ');
  const C2 = benchCands(), cols = L.portrait ? 4 : 6, cw = (w - 20) / cols, chh = 78, pk = RT.lovePick;
  scrollArea('bench', [x + 10, y + 52, w - 20, h - 52 - 120], Math.ceil(C2.length / cols) * chh, (y0) => { C2.forEach((id, i) => { const bx = x + 10 + (i % cols) * cw, by = y0 + Math.floor(i / cols) * chh, on = pk.includes(id); panel(bx + 2, by + 2, cw - 4, chh - 4, on ? '#ffd0e8' : '#fff', { lw: on ? 2.5 : 1, sy: -2 }); drawSpr(getSprite(SP[id].kit), bx + cw / 2, by + chh - 18, cw - 12, chh - 26); ftxt(SP[id].name, bx + cw / 2, by + chh - 10, cw - 8, 10, FONT.lil, '#5a2a3a', null); hit('bench_' + id, bx, by, cw, chh, () => { sfx('tap'); const k = pk.indexOf(id); if (k >= 0) pk.splice(k, 1); else { pk.push(id); if (pk.length > 2) pk.shift(); } }); }); });
  const py = y + h - 112;
  if (pk.length === 2) { const leg = LEG_BY_PAIR[pairKey(pk[0], pk[1])], o = orient(pk[0], pk[1]); if (has('p_scope')) { ftxt(leg ? `★ LEGENDARY: ${leg.name} ★` : `Mash-o-Scope: ${mashName(SP[o.face], SP[o.body])} (${o.fs.s >= 14 ? 'Rare' : 'Common'})`, x + w / 2, py + 10, w - 20, 15, FONT.lucky, leg ? '#e09a20' : '#3a6a8a', null); } else ftxt(`${SP[pk[0]].name} + ${SP[pk[1]].name} = ???`, x + w / 2, py + 10, w - 20, 15, FONT.lucky, '#6a3a4a', null); if (!has('p_scope')) ftxt('Build the Mash-o-Scope to preview the result.', x + w / 2, py + 28, w - 20, 11, FONT.fre, '#8a5a6a', null, 0, 'center', '600 '); }
  button('bench_go', x + 10, y + h - 56, w * .6 - 14, 46, 'TO THE PUDDLE ♥', () => { const pairs = [[pk[0], pk[1]]]; if (has('p_disco')) pairs.push(romancePairs()[0]); RT.bench = false; doRomance(pairs); }, { col: '#e0457b', disabled: pk.length < 2 });
  button('bench_rand', x + w * .6, y + h - 56, w * .4 - 10, 46, 'SURPRISE ME', () => { RT.bench = false; doRomance(romancePairs()); }, { col: '#8a5a7a', size: 14 });
}
function drawRomance() {
  const M = LY.main, [x, y, w, h] = M, R0 = RT.romance; R0.t += DT; const t = R0.t;
  cached('rom:night', x, y, w, h, () => { g.save(); g.translate(x, y); desert(w, h, h * .55, 'night', { flora: false }); g.restore(); });
  const px = x + w / 2, py = y + h * .74; g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(px, py, 4, px, py, w * .4); gl.addColorStop(0, 'rgba(43,227,200,.75)'); gl.addColorStop(1, 'rgba(43,227,200,0)'); g.fillStyle = gl; g.fillRect(x, y, w, h); g.restore();
  paint(() => E(px, py, Math.min(w * .3, 160), 22), '#2be3c8', '#18a898', { lw: 1.8, sx: 0, sy: -3 }); hiBlob(px - 30, py - 6, 30, 5, .5);
  // speakers
  for (const k of [-1, 1]) { const sx = px + k * Math.min(w * .42, 220); paint(() => RR(sx - 14, py - 70, 28, 40, 4), '#4a3a3a', null, { lw: 1.6 }); paint(() => C(sx, py - 56, 8), '#2a2020', null, { lw: 1 }); line([[sx, py - 30], [sx, py]], '#4a3a3a', 3); }
  const [a, b] = R0.pairs[0], ap = clamp(t / 2, 0, 1), sa = getSprite(SP[a].kit), sb = getSprite(SP[b].kit), dist = Math.min(w * .3, 150) * (1 - ap * .75);
  if (t < 3.6) { drawSpr(sa, px - dist, py + 6, 110, 90, { flip: false }); drawSpr(sb, px + dist, py + 6, 110, 90, { flip: true }); if (t > 1.4) icon('heart', px, py - 80 - (t - 1.4) * 10, 10 + (t - 1.4) * 4); }
  if (t > 2.2 && !R0.cloud) { R0.cloud = 1; spawn('glitter', [px, py - 30], 120); sfx('fwoomp'); }
  if (t > 2.2) { const k = clamp((t - 2.2) * 1.5, 0, 1) * clamp((7 - t) / 1.5, 0, 1); g.save(); g.globalAlpha = k; g.translate(px, py - 40); g.scale(1 + Math.sin(t * 3) * .03, 1 + Math.sin(t * 3) * .03); icon('heart', 0, 0, Math.min(w, h) * .26, { col: '#ff8ad0' }); g.restore(); g.save(); g.globalAlpha = k; ftxt(T('*Somebody dimmed the lights. Nobody knows who.*', '*FWOOMP.*'), px, py + 44, w * .5, 16, FONT.lucky, '#fff', '#a0306a', 4); g.restore(); }
  const lyr = 'Mmm, the water\'s glowin\' blue tonight, / the speakers crackle, the stars are right...';
  ftxt(t < 4.5 ? lyr : `At dawn, Gerald the stork delivers ${R0.pairs.length} crate${R0.pairs.length > 1 ? 's' : ''}.`, x + w / 2, y + 30, w - 30, 15, FONT.lil, '#ffe9f8', '#3a1a4a', 4);
  ftxt('ROMANCE HOUR', x + w / 2, y + 54, w - 30, 22, FONT.lucky, '#ff9ad8', INK, 4);
  if (t > 4.5) button('next_day', x + w / 2 - 120, y + h - 60, 240, 48, 'GOOD MORNING ▶', nextDay, { col: '#5f9654', glow: '#9cff9c' });
  else hit('rom_skip', x, y, w, h, () => { R0.t = Math.max(R0.t, 4.5); });
}
/* ---------- BUILD ---------- */
function drawBuild() {
  const [x, y, w, h] = mainPanel('BUILD THE ARK'); RT.br = RT.br || 'hab';
  const bw = w / BRANCHES.length; BRANCHES.forEach(([id, name, col], i) => { const n = UPG.filter(u => u.br === id && canBuy(u)).length; button('br_' + id, x + i * bw + 2, y, bw - 4, 34, name, () => { RT.br = id; }, { col: RT.br === id ? col : '#8a6a4a', size: 12, badge: n }); });
  const items = UPG.filter(u => u.br === RT.br), ih = L.portrait ? 76 : 70, cols = L.portrait ? 1 : 2, cw = w / cols;
  scrollArea('build_' + RT.br, [x, y + 42, w, h - 42], Math.ceil(items.length / cols) * ih, (y0) => {
    items.forEach((u, i) => { const ix = x + (i % cols) * cw, iy = y0 + Math.floor(i / cols) * ih, own = has(u.id), lockA = u.act > GS.act, lockR = u.req && !has(u.req);
      panel(ix + 3, iy + 3, cw - 6, ih - 8, own ? '#e2f4dc' : lockA || lockR ? '#e4dccf' : '#fff4e0', { lw: 1.2, sy: -2 });
      const col = BRANCHES.find(b => b[0] === u.br)[2]; paint(() => RR(ix + 10, iy + 10, 6, ih - 22, 3), col, null, { lw: 0 });
      ftxt(u.name, ix + 22, iy + 18, cw - 150, 15, FONT.lil, '#5a2a14', null, 0, 'left');
      boxTxt(tx(u.desc), ix + 22, iy + 28, cw - 150, ih - 38, 11.5, FONT.fre, '#5a4a3a', 'left', '600 ', 8.5);
      const st = own ? 'BUILT ✓' : lockA ? `ACT ${u.act}` : lockR ? 'NEEDS ' + UPG_BY[u.req].name.toUpperCase() : fmt$(u.cost);
      button('buy_' + u.id, ix + cw - 124, iy + 14, 112, ih - 30, st, () => { buy(u.id); }, { col: own ? '#5f9654' : '#e08a3a', disabled: own || lockA || lockR || GS.money < u.cost, size: own || lockA || lockR ? 11 : 16, onDisabled: () => { sfx('boop'); if (!own) toast(lockA ? `Unlocks in Act ${u.act}.` : lockR ? `Build ${UPG_BY[u.req].name} first.` : `Need ${fmt$(u.cost - GS.money)} more. Adopt some critters!`, '#ffd0a0', 1.8); } });
    });
  });
}
/* ---------- DEX ---------- */
function drawDex() {
  const [x, y, w, h] = mainPanel('THE MASHDEX'); RT.dexT = RT.dexT || 'animals';
  const subs = [['animals', 'ANIMALS'], ['mash', 'MASHUPS'], ['tails', 'HAPPY TAILS']], sw = w / 3;
  subs.forEach(([id, l], i) => button('dex_' + id, x + i * sw + 2, y, sw - 4, 32, l, () => { RT.dexT = id; }, { col: RT.dexT === id ? '#3f86b8' : '#8a6a4a', size: 13 }));
  const area = [x, y + 40, w, h - 40];
  if (RT.dexT === 'animals') { const ids = Object.keys(SP), cols = L.portrait ? 4 : 7, cw = w / cols, ch = 86, got = ids.filter(k => GS.dex[k]).length; ftxt(`${got} / ${ids.length} species met`, x + w / 2, y + 48, w, 12, FONT.lil, '#ffe9a8', null);
    scrollArea('dexA', [x, y + 58, w, h - 58], Math.ceil(ids.length / cols) * ch, y0 => ids.forEach((k, i) => { const bx = x + (i % cols) * cw, by = y0 + Math.floor(i / cols) * ch, seen = GS.dex[k] || k === 'sarge'; panel(bx + 2, by + 2, cw - 4, ch - 4, seen ? '#fff4e0' : '#5a4a3a', { lw: 1, sy: -2 }); const s = getSprite(SP[k].kit); if (seen) drawSpr(s, bx + cw / 2, by + ch - 20, cw - 12, ch - 28); else drawSil(s, bx + cw / 2, by + ch - 20, cw - 12, ch - 28); ftxt(seen ? SP[k].name : '???', bx + cw / 2, by + ch - 11, cw - 8, 10, FONT.lil, seen ? '#5a2a14' : '#c8b8a8', null); if (seen) hit('dexa_' + k, bx, by, cw, ch, () => toast(`${SP[k].name} (${SP[k].sp}): ${tx(BIO[k] || '')}`, '#ffe9a8', 3.2)); })); }
  if (RT.dexT === 'mash') { const ms = Object.entries(GS.dex).filter(([k]) => k.startsWith('m:')), legs = ms.filter(([, v]) => v.l >= 0).length, cols = L.portrait ? 3 : 6, cw = w / cols, ch = 128;
    ftxt(`${ms.length} mashups discovered · ${legs} / ${LEGENDS_MASH.length} Legendary`, x + w / 2, y + 48, w, 12, FONT.lil, '#ffe9a8', null);
    if (!ms.length) boxTxt(GS.act >= 3 ? 'Romance Hour at the Puddle makes mashups. Check the Sunset Report.' : 'Something about the flood water... Keep playing. Act 3 gets weird.', x + 20, y + 80, w - 40, 80, 15, FONT.fre, '#ffe9a8', 'center', '600 ');
    scrollArea('dexM', [x, y + 58, w, h - 58], Math.ceil(ms.length / cols) * ch, y0 => ms.forEach((e, i) => { const bx = x + (i % cols) * cw, by = y0 + Math.floor(i / cols) * ch; mashTile(mashData(e), bx + 3, by + 3, cw - 6, ch - 6); hit('dexm_' + i, bx, by, cw, ch, () => { sfx('page'); RT.dexCard = e[0]; }); })); }
  if (RT.dexT === 'tails') { const T2 = GS.tails; if (!T2.length) boxTxt('Every adoption sends a Happy Tails postcard here.', x + 20, y + 70, w - 40, 60, 15, FONT.fre, '#ffe9a8', 'center', '600 ');
    scrollArea('dexT', [x, y + 44, w, h - 44], T2.length * 50, y0 => T2.forEach((t2, i) => { const by = y0 + i * 50; panel(x + 4, by + 2, w - 8, 44, '#fff4e0', { lw: 1, sy: -2 }); ftxt(`${t2.n} → ${t2.a}`, x + 14, by + 16, w - 140, 14, FONT.lil, '#5a2a14', null, 0, 'left'); ftxt(`Day ${t2.d} · ${pick2(POSTCARDS, i)}`, x + 14, by + 33, w - 140, 11, FONT.fre, '#6a4a2a', null, 0, 'left', '600 '); ftxt(fmtFull$(t2.$), x + w - 14, by + 24, 120, 14, FONT.lil, '#2a6a2a', null, 0, 'right'); })); }
  if (RT.dexCard) drawCardModal();
}
const POSTCARDS = ['"Sleeps on my head. 10/10."', '"Ate the couch. Worth it."', '"STILL ON EARTH."', '"Best decision of my life."', '"Grandma is in love."', '"He has his own Adopt-a-Gram now."', '"We moved to a bigger house. For him."'];
const pick2 = (a, i) => a[i % a.length];
function drawSil(s, cx, by, mw, mh) { if (!s.sil) { const f = s.a, c = document.createElement('canvas'); c.width = f.w; c.height = f.h; const x = c.getContext('2d'); x.drawImage(f.c, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#2a1e18'; x.fillRect(0, 0, f.w, f.h); s.sil = { c, w: f.w, h: f.h }; } const f = s.sil, sc = Math.min(mw / f.w, mh / f.h); g.drawImage(f.c, cx - f.w * sc / 2, by - f.h * sc, f.w * sc, f.h * sc); }
