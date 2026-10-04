/* ===================== MINI DESERT SCENES + MASHDEX CARDS ===================== */
// Position-independent scene images (safe inside scroll areas): sky + Franklin Mountains + Star on the Mountain + desert floor
const SCN = new Map();
function sceneImg(tod, w, h, o = {}) {
  const k = L.sc * L.dpr, key = [tod, Math.round(w), Math.round(h), k.toFixed(2), o.flora ? 1 : 0, o.hz || .68].join(':'); let c = SCN.get(key);
  if (!c) { if (SCN.size > 60) SCN.clear(); c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w * k)); c.height = Math.max(1, Math.ceil(h * k));
    const old = g; g = c.getContext('2d'); g.setTransform(k, 0, 0, k, 0, 0); g.lineJoin = 'round'; g.lineCap = 'round';
    try { desert(w, h, h * (o.hz || .68), tod, { flora: false, starX: w * .2 });
      if (o.flora) { seed = 31; const gy = h * (o.hz || .68); pricklyPear(w * .1, gy + (h - gy) * .55, .32); yucca(w * .9, gy + (h - gy) * .6, .3); creosote(w * .72, gy + (h - gy) * .3, .3); }
    } catch (e) { console.warn('scene', e); } finally { g = old; }
    SCN.set(key, c); }
  return c;
}
function miniScene(x, y, w, h, tod = 'day', r = 10, o = {}) {
  const c = sceneImg(tod, w, h, o); g.save(); g.beginPath(); RR(x, y, w, h, r); g.clip(); g.drawImage(c, x, y, w, h);
  const vg = g.createRadialGradient(x + w / 2, y + h * .55, Math.min(w, h) * .3, x + w / 2, y + h * .55, Math.max(w, h) * .75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(30,10,40,.22)'); g.fillStyle = vg; g.fillRect(x, y, w, h);
  g.restore(); g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); RR(x, y, w, h, r); g.stroke();
}
/* ---------- Mashdex card data ---------- */
const VOICE_WORD = { yap: 'YAP!', bark: 'WOOF!', woof: 'WOOF!', meow: 'MROW?', hiss: 'HSSSS!', roar: 'SQUEAK!', trumpet: 'PHWOOO!', screech: 'CAW!!', grunt: 'HRMPH.', snort: 'SNRK!', howl: 'AWOOO!', squeak: 'SQUEAK!', honk: 'HONK!', chitter: 'CHK-CHK!' };
const MCARD = new Map();
function mashData(src) { // src: resident (sp 'mash') or dex entry [key, value]
  let parents, name, legend, gag, rarity, num = 0, adoptedBy = null, who = '', donation = 0, day = 0;
  if (Array.isArray(src)) { const [k, v] = src; parents = v.p; name = v.n; legend = v.l; gag = v.g; rarity = v.rr; day = v.d; num = Object.keys(GS.dex).filter(q => q.startsWith('m:')).indexOf(k) + 1; }
  else { const m = src.mash; parents = m.parents; name = src.name; legend = m.legend; gag = m.gag; rarity = m.rarity; day = GS.day; const k = 'm:' + parents.join('+'); num = Object.keys(GS.dex).filter(q => q.startsWith('m:')).indexOf(k) + 1; }
  const key = 'm:' + parents.join('+'); let base = MCARD.get(key);
  if (!base) { const save = SEED_STATE(); base = makeMash(parents[0], parents[1]); SEED_RESTORE(save); MCARD.set(key, base); }
  const tail = (GS.tails || []).find(t => t.k === key); if (tail) { adoptedBy = tail.a; who = tail.w || ''; donation = tail.$; }
  const F = SP[parents[0]], B = SP[parents[1]], cute = clamp(((F.cute || 3) + (B.cute || 3)) / 10 + .08, .1, 1), chaos = clamp((base.score || 8) / 22 + ((F.scary || 2) + (B.scary || 2)) / 30, .12, 1), size = clamp((base.size || 2) / 6, .1, 1);
  const longs = ['python', 'rattler', 'tamale', 'lowrider', 'gator'], third = parents.includes('eagle') ? ['PATRIOTISM', .94] : parents.some(p => longs.includes(p)) ? ['LENGTH', clamp(size + .35, .3, 1)] : parents.includes('skunk') || parents.includes('javelina') ? ['SMELL', .97] : ['SIZE', size];
  return { key, name, parents, legend, gag: gag || base.gag, rarity: rarity || base.rarity, kit: kitOf({ mash: { legend, face: base.face, body: base.body, parents } }), num: Math.max(1, num), adoptedBy, who, donation, day, voice: base.voice, stats: [['CUTENESS', cute, '#e0457b'], ['CHAOS', chaos, '#f0a030'], [third[0], third[1], '#2fb8b0']] };
}
const SEED_STATE = () => [gseed, seed], SEED_RESTORE = s => { gseed = s[0]; seed = s[1]; };
/* ---------- the card ---------- */
function mashCard(m, x, y, w, h, o = {}) {
  const leg = m.rarity === 'Legendary', rare = m.rarity === 'Rare', wide = w / h > 1.25, t = RT.t;
  g.save(); g.shadowColor = 'rgba(20,6,30,.45)'; g.shadowBlur = 14; g.shadowOffsetY = 5; g.fillStyle = '#000'; g.beginPath(); RR(x, y, w, h, 18); g.fill(); g.restore();
  const gr = g.createLinearGradient(x, y, x + w * .4, y + h); gr.addColorStop(0, leg ? '#ffe27a' : '#3fe0d0'); gr.addColorStop(.55, leg ? '#ff9a3a' : '#ffb24a'); gr.addColorStop(1, '#ff5a9a'); g.fillStyle = gr; g.beginPath(); RR(x, y, w, h, 18); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.4; g.stroke();
  if (leg) { g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = .35 + Math.sin(t * 3) * .15; const sh = g.createLinearGradient(x + ((t * 120) % (w * 2)) - w, y, x + ((t * 120) % (w * 2)) - w + 80, y + h); sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(.5, 'rgba(255,255,230,.9)'); sh.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = sh; g.beginPath(); RR(x, y, w, h, 18); g.fill(); g.restore(); }
  const ix = x + 7, iy = y + 7, iw = w - 14, ih = h - 14; paint(() => RR(ix, iy, iw, ih, 13), '#fff4e0', '#ead8b8', { lw: 1.6, sy: -2 });
  // ribbon + number
  const rl = leg ? '★ LEGENDARY MASHUP ★' : rare ? '★ RARE MASHUP ★' : 'PUDDLE MASHUP', rw = Math.min(iw * .66, 230);
  paint(() => RR(x + w / 2 - rw / 2, y - 4, rw, 24, 12), leg ? '#b8741a' : '#1f8a7a', null, { lw: 1.8 }); ftxt(rl, x + w / 2, y + 8.5, rw - 16, 12, FONT.lil, '#fff4e0', null);
  ftxt('#' + String(m.num).padStart(3, '0'), ix + 10, iy + 12, 50, 10, FONT.lil, '#8a6a4a', null, 0, 'left');
  // art window
  const pad = 10, ax = ix + pad, ay = iy + 22, aw = wide ? iw * .47 : iw - pad * 2, ah = wide ? ih - 32 : Math.max(110, ih * (o.compact ? .36 : .42));
  miniScene(ax, ay, aw, ah, leg ? 'sunset' : rare ? 'dawn' : 'day', 10, { flora: true });
  const s = getSprite(m.kit), by = ay + ah - 12, bob = Math.abs(Math.sin(t * 2.6)) * 2; shadow(ax + aw / 2, by, aw * .3, 5, .28);
  const rev = o.rev === undefined ? 1 : o.rev; drawSpr(s, ax + aw / 2, by - bob, aw * .84, ah * .8, { blink: (t % 3.2) < .12, sqy: 1 + Math.sin(t * 2.4) * .02, mul: .5 + rev * .5 });
  if (rev < 1) { g.save(); g.globalCompositeOperation = 'lighter'; const gl = g.createRadialGradient(ax + aw / 2, ay + ah / 2, 4, ax + aw / 2, ay + ah / 2, aw * .6); gl.addColorStop(0, `rgba(255,240,200,${1 - rev})`); gl.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = gl; g.fillRect(ax, ay, aw, ah); g.restore(); }
  if (leg || rare) for (let i = 0; i < 5; i++) sparkle(ax + aw / 2 + Math.cos(t * 1.6 + i * 1.3) * aw * .38, ay + ah * .45 + Math.sin(t * 2.2 + i) * ah * .3, 2.5 + i % 2 * 2, '#fff', .9);
  const vw = VOICE_WORD[m.voice]; if (vw && (t % 4) < 2.6) { g.font = `11px ${FONT.lucky}`; const bw2 = g.measureText(vw).width + 16, bx = ax + aw - bw2 - 8, byy = ay + 10; paint(() => { RR(bx, byy, bw2, 22, 11); g.moveTo(bx + 14, byy + 21); g.lineTo(bx + 8, byy + 30); g.lineTo(bx + 22, byy + 21); }, '#fff', null, { lw: 1.6 }); ftxt(vw, bx + bw2 / 2, byy + 11.5, bw2 - 8, 11, FONT.lucky, '#e0457b', null); }
  if (o.tag) { g.font = `11px ${FONT.lucky}`; const tw = g.measureText(o.tag).width + 14; paint(() => RR(ax + 8, ay + 8, tw, 20, 6), '#3a2416', null, { lw: 1 }); ftxt(o.tag, ax + 8 + tw / 2, ay + 18.5, tw - 6, 11, FONT.lucky, '#fff4e0', null); }
  // info column
  const cx0 = wide ? ax + aw + 12 : ix + pad, cw = wide ? ix + iw - pad - cx0 : iw - pad * 2; let cy = wide ? ay : ay + ah + 8;
  const bottom = iy + ih - 6, rest = bottom - cy, nh = clamp(rest * .15, 26, 36);
  paint(() => RR(cx0, cy, cw, nh, 10), '#3a2416', '#2a180c', { lw: 1.6, sy: -2 }); ftxt(m.name.toUpperCase(), cx0 + cw / 2, cy + nh / 2 + 1, cw - 16, Math.min(22, nh * .66), FONT.lucky, '#ffd27a', null); cy += nh + 6;
  const [pa, pb] = m.parents.map(p => SP[p]), ph = clamp(rest * .12, 22, 30);
  ftxt(pa.name.toUpperCase(), cx0 + cw * .27, cy + 7, cw * .44, 12, FONT.lil, '#3a2416', null); ftxt(pb.name.toUpperCase(), cx0 + cw * .73, cy + 7, cw * .44, 12, FONT.lil, '#3a2416', null); ftxt('✖', cx0 + cw / 2, cy + 7, 20, 11, FONT.lil, '#e0457b', null);
  ftxt(pa.sp, cx0 + cw * .27, cy + 19, cw * .44, 9, FONT.fre, '#8a6a4a', null, 0, 'center', '600 '); ftxt(pb.sp, cx0 + cw * .73, cy + 19, cw * .44, 9, FONT.fre, '#8a6a4a', null, 0, 'center', '600 '); cy += ph + 2;
  const bh2 = clamp(rest * .075, 13, 17); m.stats.forEach(([lab, v, col], i) => { const yy = cy + i * bh2; ftxt(lab, cx0, yy + bh2 / 2, cw * .3, 9.5, FONT.lil, '#3a2416', null, 0, 'left'); const bx = cx0 + cw * .32, bw2 = cw * .68; pill(bx, yy + 3, bw2, bh2 - 6, '#e8d8c0', INK); pill(bx, yy + 3, Math.max(bh2 - 6, bw2 * v), bh2 - 6, col, INK); }); cy += bh2 * 3 + 6;
  const fh = clamp(rest * .17, 34, 46), qh = bottom - fh - cy - 4;
  if (qh > 14) boxTxt('"' + tx(m.gag) + '"', cx0 + 4, cy, cw - 8, qh, 12, FONT.fre, '#3a2416', 'center', 'italic 600 ', 8.5);
  const fy = bottom - fh; line([[cx0, fy], [cx0 + cw, fy]], 'rgba(90,50,20,.25)', 1);
  if (m.adoptedBy) { ftxt('ADOPTED BY', cx0 + 2, fy + 10, cw * .5, 8.5, FONT.lil, '#8a6a4a', null, 0, 'left'); ftxt(m.adoptedBy, cx0 + 2, fy + 24, cw * .52, 13, FONT.lil, '#3a2416', null, 0, 'left'); if (m.who) ftxt(m.who, cx0 + 2, fy + 36, cw * .52, 8.5, FONT.fre, '#8a6a4a', null, 0, 'left', '600 ');
    g.save(); g.translate(cx0 + cw * .78, fy + fh * .52); g.rotate(-.08); g.strokeStyle = '#d0303a'; g.lineWidth = 2.4; g.beginPath(); RR(-cw * .2, -15, cw * .4, 30, 5); g.stroke(); g.lineWidth = 1; g.beginPath(); RR(-cw * .2 + 3, -12, cw * .4 - 6, 24, 3); g.stroke(); ftxt(fmtFull$(m.donation || 0), 0, -3, cw * .36, 14, FONT.lucky, '#d0303a', null); ftxt('DONATION', 0, 9, cw * .3, 7, FONT.lil, '#d0303a', null); g.restore(); }
  else { ftxt(o.fresh ? 'FRESH FROM THE PUDDLE' : 'LIVES AT ELLA\'S ARK', cx0 + 2, fy + 12, cw * .6, 9, FONT.lil, '#8a6a4a', null, 0, 'left'); ftxt(o.fresh ? 'Delivered by Gerald the stork' : `Since Day ${m.day || GS.day}`, cx0 + 2, fy + 26, cw * .6, 11, FONT.lil, '#3a2416', null, 0, 'left'); paw(cx0 + cw - 18, fy + fh / 2, 9, 'rgba(224,69,123,.55)'); }
}
// small Mashdex grid tile in the same style
function mashTile(m, x, y, w, h) {
  const leg = m.rarity === 'Legendary'; const gr = g.createLinearGradient(x, y, x, y + h); gr.addColorStop(0, leg ? '#ffe27a' : '#3fe0d0'); gr.addColorStop(1, '#ff6aa8'); g.fillStyle = gr; g.beginPath(); RR(x, y, w, h, 10); g.fill(); g.strokeStyle = INK; g.lineWidth = 1.6; g.stroke();
  const ix = x + 4, iy = y + 4, iw = w - 8, ih = h - 8; g.fillStyle = '#fff4e0'; g.beginPath(); RR(ix, iy, iw, ih, 7); g.fill();
  const sh2 = ih - 28; miniScene(ix + 3, iy + 3, iw - 6, sh2, leg ? 'sunset' : m.rarity === 'Rare' ? 'dawn' : 'day', 6);
  drawSpr(getSprite(m.kit), ix + iw / 2, iy + 3 + sh2 - 5, iw - 14, sh2 - 8);
  ftxt(m.name, ix + iw / 2, iy + ih - 16, iw - 6, 10.5, FONT.lil, '#3a2416', null); ftxt('#' + String(m.num).padStart(3, '0') + (leg ? ' ★' : m.rarity === 'Rare' ? ' ◆' : ''), ix + iw / 2, iy + ih - 5.5, iw - 6, 8, FONT.lil, leg ? '#b8741a' : '#1f8a7a', null);
}
function drawCardModal() { // Mashdex card viewer
  const e = Object.entries(GS.dex).find(([k]) => k === RT.dexCard); if (!e) { RT.dexCard = null; return; }
  const M = LY.main; blocker('card_block'); g.save(); g.fillStyle = 'rgba(20,8,30,.72)'; g.fillRect(M[0], M[1], M[2], M[3]); g.restore();
  const land = !L.portrait, w = land ? Math.min(M[2] - 30, 600) : Math.min(M[2] - 24, 360), h = land ? Math.min(M[3] - 30, 340) : Math.min(M[3] - 70, 540), x = M[0] + (M[2] - w) / 2, y = M[1] + (M[3] - h - (land ? 0 : 44)) / 2 + 8;
  mashCard(mashData(e), x, y, w, h);
  if (land) button('card_close', x + w - 36, y - 6, 40, 34, '✕', () => { RT.dexCard = null; }, { col: '#8a5a3a', size: 15 });
  else button('card_close', x + w / 2 - 70, y + h + 8, 140, 38, 'CLOSE', () => { RT.dexCard = null; }, { col: '#8a5a3a', size: 15 });
}
