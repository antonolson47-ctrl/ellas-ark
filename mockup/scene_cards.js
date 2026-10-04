function fitTxt(s, x, y, maxW, size, family, fill, stroke, lw) { g.save(); let sz = size; g.font = `${sz}px ${family}`; while (g.measureText(s).width > maxW && sz > 8) { sz -= 1; g.font = `${sz}px ${family}`; } g.restore(); txt(s, x, y, `${sz}px ${family}`, fill, stroke, lw); }
function miniScene(x, y, w, h, variant) {
  g.save(); g.beginPath(); RR(x, y, w, h, 14); g.clip();
  const skies = [[[0, '#3a2a78'], [.5, '#d0507e'], [1, '#ffb35e']], [[0, '#6ab8e0'], [.7, '#ffe0b0'], [1, '#ffc890']], [[0, '#2a3a8a'], [.55, '#8a58b0'], [1, '#ff9a6a']]][variant];
  const gr = g.createLinearGradient(0, y, 0, y + h * .62); skies.forEach(([t, c]) => gr.addColorStop(t, c)); g.fillStyle = gr; g.fillRect(x, y, w, h);
  if (variant !== 1) { g.globalAlpha = .7; for (let i = 0; i < 25; i++) { g.fillStyle = '#fff'; g.beginPath(); C(x + R(0, w), y + R(0, h * .35), R(.4, 1.1)); g.fill(); } g.globalAlpha = 1; }
  if (variant === 1) sunGlow(x + w * .78, y + h * .2, 16); else sunGlow(x + w * .3, y + h * .56, 18);
  const HZ = y + h * .62;
  g.save(); g.translate(x, 0);
  ridge(w, HZ, [[-5, HZ - 30], [w * .2, HZ - 62], [w * .4, HZ - 48], [w * .62, HZ - 80], [w * .8, HZ - 60], [w + 5, HZ - 70]], 4, variant === 1 ? '#a88ab8' : '#8a4a8a', variant === 1 ? '#c8a8b8' : '#b06a8a', 40 + variant);
  ridge(w, HZ, [[-5, HZ - 14], [w * .25, HZ - 36], [w * .45, HZ - 24], [w * .7, HZ - 44], [w + 5, HZ - 26]], 4, variant === 1 ? '#7a6a8a' : '#4a2a5a', variant === 1 ? '#a08a98' : '#6a3a68', 50 + variant);
  if (variant !== 1) starOnMountain(w * .62, HZ - 34, 5);
  g.restore();
  ground(x + w, HZ - 2, y + h, variant === 1 ? ['#f0c890', '#d8a070'] : ['#e8a274', '#b86a48']); g.fillStyle = variant === 1 ? '#f0c890' : '#e8a274'; g.fillRect(x, HZ - 2, w, h);
  const gg = g.createLinearGradient(0, HZ, 0, y + h); gg.addColorStop(0, variant === 1 ? '#f0c890' : '#e8a274'); gg.addColorStop(1, variant === 1 ? '#c88a5c' : '#9c5440'); g.fillStyle = gg; g.fillRect(x, HZ - 2, w, y + h - HZ + 2);
  // puddle glow
  const pg = g.createRadialGradient(x + w / 2, y + h - 18, 4, x + w / 2, y + h - 18, w * .55); pg.addColorStop(0, 'rgba(43,227,200,.55)'); pg.addColorStop(1, 'rgba(43,227,200,0)'); g.fillStyle = pg; g.fillRect(x, y, w, h);
  seed = 70 + variant; for (let i = 0; i < 4; i++) creosote(x + R(10, w - 10), HZ + R(4, 20), R(.25, .4), '#7a8a4a');
  g.restore();
}
function card(x, y, o) {
  const w = 352, h = 616;
  g.save(); g.shadowColor = 'rgba(20,0,30,.55)'; g.shadowBlur = 24; g.shadowOffsetY = 10; g.beginPath(); RR(x, y, w, h, 24); g.fillStyle = '#000'; g.fill(); g.restore();
  const fr = g.createLinearGradient(x, y, x + w, y + h); fr.addColorStop(0, '#ffe08a'); fr.addColorStop(.35, '#2be3c8'); fr.addColorStop(.7, '#e0457b'); fr.addColorStop(1, '#ffd24a');
  g.beginPath(); RR(x, y, w, h, 24); g.fillStyle = fr; g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke();
  g.beginPath(); RR(x + 10, y + 10, w - 20, h - 20, 16); g.fillStyle = '#fff6e6'; g.fill(); g.strokeStyle = INK; g.lineWidth = 2; g.stroke();
  // rarity ribbon
  paint(() => RR(x + 70, y + 2, w - 140, 30, 15), '#1a8a7a', '#127060', { lw: 2, sx: 0, sy: -3 }); txt('★ LEGENDARY MASHUP ★', x + w / 2, y + 17.5, '15px "Lilita One", sans-serif', '#eafffb', null);
  txt('#' + o.num, x + 30, y + 22, '13px "Lilita One"', '#7a5a3a', null);
  // art
  miniScene(x + 18, y + 40, w - 36, 300, o.v); g.strokeStyle = INK; g.lineWidth = 2.2; g.beginPath(); RR(x + 18, y + 40, w - 36, 300, 14); g.stroke();
  g.save(); g.beginPath(); RR(x + 18, y + 40, w - 36, 300, 14); g.clip(); o.draw(x + w / 2, y + 40 + 300); g.restore();
  // name
  paint(() => RR(x + 18, y + 348, w - 36, 46, 12), '#3a2416', null, { lw: 2 });
  fitTxt(o.name, x + w / 2, y + 372, w - 56, 30, '"Luckiest Guy", sans-serif', '#ffd27a', INK, 0);
  // parents
  const py = y + 416; txt(o.pa, x + w / 2 - 80, py, '13px "Lilita One"', '#3a2416', null); txt('×', x + w / 2, py, '22px "Luckiest Guy"', '#e0457b', null); txt(o.pb, x + w / 2 + 80, py, '13px "Lilita One"', '#3a2416', null);
  txt(o.pas, x + w / 2 - 80, py + 15, '600 10.5px "Fredoka"', '#8a6a4a', null); txt(o.pbs, x + w / 2 + 80, py + 15, '600 10.5px "Fredoka"', '#8a6a4a', null);
  // stats
  o.stats.forEach(([l, v], i) => { const sy = y + 446 + i * 18; txt(l, x + 34, sy, '11px "Lilita One"', '#5a3a20', null, 0, 'left'); pill(x + 110, sy - 5, 200, 10, '#ead8b8'); pill(x + 110, sy - 5, 200 * v, 10, ['#e0457b', '#ffb24a', '#2bb3a0'][i]); });
  // gag
  wrapTxt('"' + o.gag + '"', x + w / 2, y + 504, w - 56, 16, 'italic 600 13.5px "Fredoka", sans-serif', '#3a2416', 'center');
  // adopted by
  g.strokeStyle = 'rgba(90,58,32,.35)'; g.lineWidth = 1; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(x + 30, y + 552); g.lineTo(x + w - 30, y + 552); g.stroke(); g.setLineDash([]);
  txt('ADOPTED BY', x + 34, y + 566, '10px "Lilita One"', '#8a6a4a', null, 0, 'left'); const [bn, bd] = o.by.split(', '); txt(bn, x + 34, y + 584, '15px "Lilita One"', '#3a2416', null, 0, 'left'); txt(bd, x + 34, y + 600, '600 11px "Fredoka"', '#8a6a4a', null, 0, 'left');
  // stamp
  g.save(); g.translate(x + w - 84, y + 580); g.rotate(-.12); g.strokeStyle = '#d23b3b'; g.lineWidth = 3; g.beginPath(); RR(-58, -20, 116, 40, 6); g.stroke(); g.lineWidth = 1.2; g.beginPath(); RR(-54, -16, 108, 32, 4); g.stroke(); txt(o.don, 0, -3, '16px "Luckiest Guy"', '#d23b3b', null); txt('DONATION', 0, 11, '8px "Lilita One"', '#d23b3b', null); g.restore();
}
function sceneCards(W, H) {
  seed = 1;
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#22184e'); bg.addColorStop(.55, '#5a2a6e'); bg.addColorStop(1, '#0e4a52'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const pg = g.createRadialGradient(W / 2, H + 80, 20, W / 2, H + 80, 700); pg.addColorStop(0, 'rgba(43,227,200,.6)'); pg.addColorStop(1, 'rgba(43,227,200,0)'); g.fillStyle = pg; g.fillRect(0, 0, W, H);
  g.save(); g.globalAlpha = .06; for (let i = 0; i < 40; i++) paw(R(0, W), R(0, H), R(10, 22), '#fff'); g.restore();
  for (let i = 0; i < 60; i++) sparkle(R(0, W), R(0, H), R(.6, 1.8), i % 3 ? '#fff' : '#6be3c8', R(.3, .9));
  // hearts from the puddle
  g.save(); for (let i = 0; i < 14; i++) { const hx = R(40, W - 40), hy = R(H - 150, H - 10), hs = R(4, 9); g.globalAlpha = R(.25, .6); g.fillStyle = i % 2 ? '#ff7ab0' : '#6be3c8'; g.beginPath(); g.moveTo(hx, hy + hs); g.bezierCurveTo(hx - hs * 2, hy - hs * .4, hx - hs * .6, hy - hs * 1.6, hx, hy - hs * .5); g.bezierCurveTo(hx + hs * .6, hy - hs * 1.6, hx + hs * 2, hy - hs * .4, hx, hy + hs); g.fill(); } g.restore();
  // header
  g.save(); g.font = '54px "Luckiest Guy", sans-serif'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillStyle = INK; g.fillText('THE MASHDEX', 39, 77); g.lineWidth = 9; g.strokeStyle = INK; g.strokeText('THE MASHDEX', 36, 72); const tg = g.createLinearGradient(0, 30, 0, 72); tg.addColorStop(0, '#eafffb'); tg.addColorStop(1, '#2be3c8'); g.fillStyle = tg; g.fillText('THE MASHDEX', 36, 72); g.restore();
  txt("Legendary finds from the Puddle  ·  Ella's Ark concept mockup (not final art)", 40, 98, '600 16px "Fredoka", sans-serif', '#ffe0b0', null, 0, 'left');
  // Gerald cameo with crate
  stork(1060, 116, .98);
  paint(() => RR(1088, 82, 46, 34, 3), '#c08a52', '#9a6838', { lw: 1.8, tex: () => { g.strokeStyle = 'rgba(60,30,10,.5)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(1088, 99); g.lineTo(1134, 99); g.moveTo(1088, 82); g.lineTo(1134, 116); g.stroke(); } });
  txt('FRAGILE-ISH', 1111, 92, '7px "Lilita One"', '#5a2a10', null);
  paint(() => { RR(930, 36, 104, 34, 14); g.moveTo(1010, 68); g.lineTo(1040, 84); g.lineTo(1022, 66); }, '#fff', null, { lw: 1.8 }); txt('Sign here.', 982, 53.5, '600 15px "Fredoka"', '#3a2416', null);
  card(36, 124, { num: '001', v: 0, name: 'CHIHUAHUASAURUS REX', pa: 'CHANCLA', pas: 'chihuahua, 4 lbs of fury', pb: 'TINY', pbs: 'baby T-rex', stats: [['CUTENESS', .95], ['CHAOS', .9], ['SIZE', .12]], gag: 'Its terrifying ROAR sounds exactly like a squeaky toy.', by: 'Glitterina, pop megastar', don: '$3,000,000', draw: (cx, by) => chihuahuasaurus(cx + 4, by - 26, .8) });
  card(424, 124, { num: '002', v: 1, name: 'HOT DOGCONDA', pa: 'TAMALE', pas: 'dachshund in a blanket', pb: 'NOODLE', pbs: '20-ft python, hugger', stats: [['CUTENESS', .85], ['CHAOS', .6], ['LENGTH', 1]], gag: 'Takes four full minutes to finish wagging.', by: 'Stretch Limo Larry, limo mogul', don: '$2,500,000', draw: (cx, by) => { hotDogconda(cx - 4, by - 40, .8); txt('30 FT!', cx - 112, by - 262, '20px "Luckiest Guy"', '#fff', INK, 4); } });
  card(812, 124, { num: '003', v: 2, name: 'BALD RHIN-EAGLE', pa: 'RHONDA', pas: 'nearsighted rhino', pb: 'FREEDOM', pbs: 'bald eagle, screams', stats: [['CUTENESS', .55], ['CHAOS', .85], ['PATRIOTISM', 1]], gag: 'Can\'t fly. Glides downhill screaming the feeling of the anthem.', by: 'Dex Orbitz, rocket billionaire', don: '$8,000,000', draw: (cx, by) => rhinEagle(cx - 34, by - 30, 1.32) });
}
