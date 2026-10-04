/* ===================== CAST BUSTS (parody archetypes, original) ===================== */
// bust(x, y, s, spec): y = bottom of shoulders; ~120 units tall
function bust(x, y, s, p, o = {}) {
  seed = p.seed || 5; g.save(); g.translate(x, y); g.scale(s * (o.flip ? -1 : 1), s);
  const SK = p.skin || '#f0c8a0', SKD = dk(SK, .18), HC = p.hairCol || '#4a3020', HD = dk(HC, .3), SH = p.shirt || '#4a7ab0';
  const hy = -78; // head center
  // back hair
  if (p.hair === 'long' || p.hair === 'bob' || p.hair === 'bigHair') paint(() => { if (p.hair === 'bigHair') tuft(0, hy - 2, 44, 42, 12, .14); else RR(-32, hy - 30, 64, p.hair === 'long' ? 82 : 54, 24); }, HC, HD, { sx: -3, sy: -3, tex: () => { g.strokeStyle = HD; g.lineWidth = 1.2; g.globalAlpha = .5; for (let i = -26; i < 28; i += 6) { g.beginPath(); g.moveTo(i, hy - 20); g.quadraticCurveTo(i + 3, hy + 10, i - 2, hy + 40); g.stroke(); } } });
  if (p.cape) paint(() => S([[-56, 0], [-50, -40], [0, -50], [50, -40], [56, 0]], .8), p.cape, dk(p.cape, .3), { sx: 0, sy: -3 });
  // shoulders / shirt
  paint(() => S([[-52, 2], [-48, -26], [-26, -42], [0, -46], [26, -42], [48, -26], [52, 2]], .8), SH, dk(SH, .25), { sx: -3, sy: -3, tex: () => {
    if (p.coat) { g.fillStyle = p.coat; g.fillRect(-60, -50, 30, 60); g.fillRect(30, -50, 30, 60); g.strokeStyle = dk(p.coat, .3); g.lineWidth = 1.4; g.beginPath(); g.moveTo(-30, -44); g.lineTo(-14, 2); g.moveTo(30, -44); g.lineTo(14, 2); g.stroke(); }
    if (p.vest) { g.fillStyle = p.vest; g.beginPath(); g.moveTo(-50, 4); g.lineTo(-40, -36); g.lineTo(-12, -40); g.lineTo(-8, 4); g.fill(); g.beginPath(); g.moveTo(50, 4); g.lineTo(40, -36); g.lineTo(12, -40); g.lineTo(8, 4); g.fill(); }
    if (p.stripes) { g.fillStyle = p.stripes; for (let i = -40; i < 40; i += 12) g.fillRect(-60, -44 + (i + 40) * .6, 120, 4); }
    if (p.sparkly) for (let i = 0; i < 18; i++) sparkle(R(-46, 46), R(-40, 0), R(.8, 1.8), '#fff', .9);
    if (p.jersey) { txt(p.jersey, 0, -20, `22px ${FONT.lucky}`, '#fff', dk(SH, .5), 3); }
    if (p.fur) { g.fillStyle = p.fur; g.beginPath(); tuft(0, -40, 40, 10, 14, .3); g.fill(); }
  } });
  // neck + head
  paint(() => RR(-9, hy + 14, 18, 20, 6), SK, SKD, { lw: 1.6, sx: 2, sy: 0 });
  if (p.collar) paint(() => { g.moveTo(-14, -44); g.lineTo(0, -32); g.lineTo(14, -44); g.lineTo(8, -46); g.lineTo(0, -40); g.lineTo(-8, -46); g.closePath(); }, p.collar, dk(p.collar, .2), { lw: 1.2 });
  if (p.acc === 'tie') paint(() => { g.moveTo(-4, -40); g.lineTo(4, -40); g.lineTo(6, -10); g.lineTo(0, -4); g.lineTo(-6, -10); g.closePath(); }, p.tie || '#c03030', dk(p.tie || '#c03030', .3), { lw: 1.3 });
  if (p.acc === 'bowtie') paint(() => { g.moveTo(0, -40); g.lineTo(-10, -46); g.lineTo(-10, -34); g.closePath(); g.moveTo(0, -40); g.lineTo(10, -46); g.lineTo(10, -34); g.closePath(); }, p.tie || '#c03030', null, { lw: 1.3 });
  if (p.acc === 'necklace' || p.acc === 'pearls') { g.save(); for (let i = 0; i < 9; i++) { const a = PI * .15 + i * PI * .7 / 8; paint(() => C(Math.cos(a) * 16, -44 + Math.sin(a) * 10, p.acc === 'pearls' ? 2.2 : 1.8), p.acc === 'pearls' ? '#fbf6ec' : '#f4c542', null, { lw: .8 }); } g.restore(); }
  if (p.acc === 'chain') { g.save(); g.strokeStyle = '#f4c542'; g.lineWidth = 3; g.beginPath(); g.arc(0, -46, 20, .3, PI - .3); g.stroke(); paint(() => RR(-6, -30, 12, 12, 2), '#f4c542', '#c9962e', { lw: 1 }); g.restore(); }
  if (p.acc === 'scarf') paint(() => S([[-18, -44], [18, -44], [14, -34], [8, -10], [0, -12], [-2, -34]], .7), p.scarf || '#e04a7a', null, { lw: 1.3 });
  if (p.acc === 'stetho') { g.save(); g.strokeStyle = '#3a3a44'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(-14, -44); g.quadraticCurveTo(-18, -20, -4, -14); g.moveTo(14, -44); g.quadraticCurveTo(18, -24, 6, -16); g.stroke(); paint(() => C(0, -14, 4), '#c8ccd4', null, { lw: 1.2 }); g.restore(); }
  if (p.acc === 'lanyard') { g.save(); g.strokeStyle = '#e04a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(-12, -44); g.lineTo(0, -16); g.lineTo(12, -44); g.stroke(); paint(() => RR(-7, -18, 14, 12, 2), '#fff', null, { lw: 1, tex: () => { g.fillStyle = '#3a6ad0'; g.fillRect(-7, -18, 14, 4); } }); g.restore(); }
  if (p.acc === 'bolo') { g.save(); g.strokeStyle = '#2a1a10'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(-6, -44); g.lineTo(-3, -14); g.moveTo(6, -44); g.lineTo(3, -14); g.stroke(); paint(() => C(0, -34, 4), '#3fb0a0', '#c0c0c0', { lw: 1.2 }); g.restore(); }
  // ears
  paint(() => { E(-24, hy + 2, 5, 7); E(24, hy + 2, 5, 7); }, SK, SKD, { lw: 1.5 });
  if (p.earrings) { paint(() => { C(-25, hy + 12, 2.6); C(25, hy + 12, 2.6); }, p.earrings, null, { lw: .8 }); }
  // face
  paint(() => S([[0, hy - 28], [19, hy - 22], [24, hy - 4], [19, hy + 14], [0, hy + 24], [-19, hy + 14], [-24, hy - 4], [-19, hy - 22]], .9), SK, SKD, { sx: 3, sy: -1, hi: () => { if (p.blush !== false) { hiBlob(-13, hy + 6, 6, 3.5, .3, 0, '#ff8a8a'); hiBlob(13, hy + 6, 6, 3.5, .3, 0, '#ff8a8a'); } if (p.age) wrinkles([[[-20, hy - 6], [-16, hy - 4]], [[20, hy - 6], [16, hy - 4]], [[-8, hy - 16], [8, hy - 16]], [[-12, hy + 10], [-9, hy + 14]], [[12, hy + 10], [9, hy + 14]]], 'rgba(120,70,50,.45)', 1.2); if (p.stubble) { g.fillStyle = 'rgba(60,40,30,.25)'; g.beginPath(); E(0, hy + 14, 18, 10); g.fill(); } if (p.mask) { g.fillStyle = p.mask; g.beginPath(); S([[0, hy - 30], [22, hy - 22], [26, hy - 2], [20, hy + 8], [0, hy + 6], [-20, hy + 8], [-26, hy - 2], [-22, hy - 22]], .9); g.fill(); g.fillStyle = '#ffd24a'; g.beginPath(); E(-9, hy - 3, 8, 6, -.3); E(9, hy - 3, 8, 6, .3); g.fill(); } } });
  // eyes
  const ec = p.eye || '#4a3020', lid = p.lid || 0;
  eye(-9, hy - 3, 5, ec, { lidCol: SK, lid, ir: .6 }); eye(9, hy - 3, 5, ec, { lidCol: SK, lid, ir: .6 });
  const bc = p.browCol || dk(HC === '#f4f4f4' ? '#9a9a9a' : HC, .1); const bu = p.browUp || 0;
  line([[-15, hy - 11 - (p.angry ? -2 : bu)], [-9, hy - 13 - bu], [-4, hy - 11 + (p.angry ? 2 : 0)]], bc, 2.6); line([[4, hy - 11 + (p.angry ? 2 : 0)], [9, hy - 13 - bu], [15, hy - 11 - (p.angry ? -2 : bu)]], bc, 2.6);
  line([[-1, hy + 2], [2, hy + 7], [-2, hy + 8]], SKD, 1.6);
  // mouth
  const m = p.mouth || 'smile';
  if (m === 'grin' || m === 'shout') { const mo = () => { g.moveTo(-10, hy + 12); g.quadraticCurveTo(0, hy + 14, 10, hy + 12); g.quadraticCurveTo(7, hy + (m === 'shout' ? 26 : 21), 0, hy + (m === 'shout' ? 27 : 21)); g.quadraticCurveTo(-7, hy + (m === 'shout' ? 26 : 21), -10, hy + 12); g.closePath(); }; paint(mo, '#8a2a35', null, { lw: 1.2 }); g.save(); g.beginPath(); mo(); g.clip(); g.fillStyle = '#fff'; g.fillRect(-11, hy + 11, 22, 4); if (m === 'shout') { g.fillStyle = '#ef7d8c'; g.beginPath(); E(0, hy + 24, 5, 3); g.fill(); } g.restore(); if (p.sparkleTeeth) sparkle(8, hy + 13, 2, '#fff'); }
  else if (m === 'o') paint(() => E(0, hy + 15, 4, 5), '#8a2a35', null, { lw: 1.2 });
  else if (m === 'flat') line([[-7, hy + 14], [7, hy + 14]], INK, 1.8);
  else if (m === 'smirk') line([[-7, hy + 15], [3, hy + 15], [9, hy + 11]], INK, 1.8);
  else line([[-8, hy + 12], [0, hy + 16], [8, hy + 12]], p.lips || INK, p.lips ? 3 : 1.8);
  // facial hair
  if (p.beard === 'full') paint(() => S([[-22, hy], [-18, hy + 20], [0, hy + 32], [18, hy + 20], [22, hy], [12, hy + 12], [0, hy + 18], [-12, hy + 12]], .8), HC, HD, { lw: 1.5, tex: () => fur(-24, hy, 48, 34, HD, 30, 4, 1.6, 1, .4) });
  if (p.beard === 'stache' || p.beard === 'full' || p.beard === 'curly') paint(() => { g.moveTo(0, hy + 9); g.quadraticCurveTo(-10, hy + 6, -14, hy + (p.beard === 'curly' ? 6 : 13)); g.quadraticCurveTo(-6, hy + 13, 0, hy + 11); g.quadraticCurveTo(6, hy + 13, 14, hy + (p.beard === 'curly' ? 6 : 13)); g.quadraticCurveTo(10, hy + 6, 0, hy + 9); g.closePath(); }, HC, HD, { lw: 1.3 });
  if (p.beard === 'goatee') paint(() => E(0, hy + 21, 5, 5), HC, HD, { lw: 1.2 });
  // hair front
  const hr = p.hair || 'short';
  const hp2 = { sx: -2, sy: -3, tex: () => { g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 2; g.beginPath(); g.arc(-4, hy - 18, 14, 3.6, 4.6); g.stroke(); } };
  if (hr === 'short' || hr === 'bob' || hr === 'long' || hr === 'ponytail' || hr === 'bun') paint(() => { g.moveTo(-25, hy - 2); g.quadraticCurveTo(-28, hy - 34, 0, hy - 34); g.quadraticCurveTo(28, hy - 34, 25, hy - 2); g.quadraticCurveTo(18, hy - 22, 4, hy - 20); g.quadraticCurveTo(-10, hy - 24, -25, hy - 2); g.closePath(); }, HC, HD, hp2);
  if (hr === 'bun') paint(() => C(0, hy - 38, 11), HC, HD, { lw: 1.6 });
  if (hr === 'ponytail') paint(() => S([[18, hy - 26], [34, hy - 20], [40, hy + 4], [32, hy + 20], [28, hy], [20, hy - 14]], .8), HC, HD, { lw: 1.6 });
  if (hr === 'slick') paint(() => { g.moveTo(-25, hy - 4); g.quadraticCurveTo(-26, hy - 36, 4, hy - 33); g.quadraticCurveTo(28, hy - 30, 25, hy - 6); g.quadraticCurveTo(14, hy - 26, -25, hy - 4); g.closePath(); }, HC, HD, Object.assign({}, hp2, { hi: () => hiBlob(-6, hy - 28, 12, 3, .4, -.2) }));
  if (hr === 'comb') { g.save(); g.strokeStyle = HC; g.lineWidth = 2; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-20, hy - 16 - i * 2); g.quadraticCurveTo(0, hy - 30 - i, 20, hy - 18 - i * 2); g.stroke(); } g.restore(); }
  if (hr === 'spiky' || hr === 'wild') paint(() => { const n = hr === 'wild' ? 9 : 7; g.moveTo(-25, hy - 4); for (let i = 0; i <= n; i++) { const a = PI + i / n * PI, r1 = 30, r2 = hr === 'wild' ? 46 : 40; g.lineTo(Math.cos(a - .12) * r1, hy - 6 + Math.sin(a - .12) * r1); g.lineTo(Math.cos(a) * r2, hy - 6 + Math.sin(a) * r2 * (hr === 'wild' ? 1 : .9)); } g.lineTo(25, hy - 4); g.quadraticCurveTo(0, hy - 24, -25, hy - 4); g.closePath(); }, HC, HD, hp2);
  if (hr === 'curly' || hr === 'afro') paint(() => { const rr = hr === 'afro' ? 1.35 : 1; for (let i = 0; i < 11; i++) { const a = PI * .95 + i / 10 * PI * 1.1; C(Math.cos(a) * 24 * rr, hy - 8 + Math.sin(a) * 26 * rr, 9 * rr); } }, HC, HD, { sx: -2, sy: -2 });
  if (hr === 'mohawk') paint(() => { g.moveTo(-6, hy - 26); for (let i = 0; i < 5; i++) { g.lineTo(-6 + i * 3, hy - 48 + (i % 2) * 6); } g.lineTo(8, hy - 26); g.closePath(); }, HC, HD, { lw: 1.5 });
  if (hr === 'bigHair') paint(() => tuft(0, hy - 24, 32, 16, 10, .2), HC, HD, hp2);
  if (hr === 'buzz') paint(() => { g.moveTo(-24, hy - 8); g.quadraticCurveTo(-24, hy - 32, 0, hy - 31); g.quadraticCurveTo(24, hy - 32, 24, hy - 8); g.quadraticCurveTo(0, hy - 22, -24, hy - 8); g.closePath(); }, HC, HD, { lw: 1.4, tex: () => fur(-24, hy - 32, 48, 24, HD, 40, 2, 1.5, 1, .5) });
  // glasses
  const gl = p.glasses;
  if (gl === 'round' || gl === 'square' || gl === 'goggles') { g.save(); g.strokeStyle = gl === 'goggles' ? '#6a4a2a' : INK; g.lineWidth = gl === 'goggles' ? 3.5 : 1.8; for (const k of [-1, 1]) { g.beginPath(); if (gl === 'square') RR(k * 9 - 8, hy - 9, 16, 12, 2); else C(k * 9, hy - 3, gl === 'goggles' ? 8.5 : 7.5); g.stroke(); g.fillStyle = 'rgba(180,220,255,.25)'; g.fill(); } g.beginPath(); g.moveTo(-2, hy - 4); g.lineTo(2, hy - 4); g.stroke(); if (gl === 'goggles') { g.beginPath(); g.moveTo(-17, hy - 3); g.lineTo(-25, hy - 6); g.moveTo(17, hy - 3); g.lineTo(25, hy - 6); g.stroke(); } g.restore(); }
  if (gl === 'shades' || gl === 'aviator' || gl === 'star') { for (const k of [-1, 1]) paint(() => { if (gl === 'star') star5(k * 10, hy - 3, 10, 5); else if (gl === 'aviator') { g.moveTo(k * 2, hy - 8); g.lineTo(k * 19, hy - 8); g.quadraticCurveTo(k * 19, hy + 4, k * 11, hy + 4); g.quadraticCurveTo(k * 3, hy + 3, k * 2, hy - 8); g.closePath(); } else RR(k * 10 - 9, hy - 9, 18, 11, 4); }, gl === 'star' ? (p.starCol || '#ff5fae') : '#1e2430', null, { lw: 1.6, hi: () => hiBlob(k * 10 - 3, hy - 5, 4, 2, .5) }); line([[-2, hy - 5], [2, hy - 5]], INK, 1.6); }
  // hats
  const ht = p.hat;
  if (ht === 'cowboy' || ht === 'bigCowboy') { const b = ht === 'bigCowboy' ? 1.5 : 1, hc = p.hatCol || '#8a5a32'; paint(() => { E(0, hy - 28, 42 * b, 8 * b); }, hc, dk(hc, .3), { lw: 1.8, sx: 0, sy: -2 }); paint(() => { g.moveTo(-18 * b, hy - 28); g.quadraticCurveTo(-20 * b, hy - 58 * b, -6, hy - 52 * b); g.quadraticCurveTo(0, hy - 46 * b, 6, hy - 52 * b); g.quadraticCurveTo(20 * b, hy - 58 * b, 18 * b, hy - 28); g.closePath(); }, hc, dk(hc, .3), { lw: 1.8, tex: () => { g.fillStyle = dk(hc, .4); g.fillRect(-30 * b, hy - 36, 60 * b, 5); } }); }
  if (ht === 'cap' || ht === 'capBack') { const hc = p.hatCol || '#e04a3a'; paint(() => { g.moveTo(-24, hy - 14); g.quadraticCurveTo(-24, hy - 40, 0, hy - 40); g.quadraticCurveTo(24, hy - 40, 24, hy - 14); g.closePath(); }, hc, dk(hc, .3), { lw: 1.7 }); paint(() => ht === 'cap' ? E(16, hy - 15, 20, 5, .1) : E(-20, hy - 15, 16, 4, -.1), dk(hc, .1), dk(hc, .4), { lw: 1.5 }); }
  if (ht === 'top') { const hc = p.hatCol || '#24242c'; paint(() => { E(0, hy - 28, 32, 6); RR(-19, hy - 74, 38, 46, 3); }, hc, dk(hc, .4), { lw: 1.8, tex: () => { g.fillStyle = '#c03040'; g.fillRect(-20, hy - 40, 40, 6); } }); }
  if (ht === 'crown' || ht === 'tiara') { const sc = ht === 'tiara' ? .6 : 1; paint(() => { g.moveTo(-16 * sc, hy - 28); g.lineTo(-18 * sc, hy - 28 - 22 * sc); g.lineTo(-8 * sc, hy - 28 - 12 * sc); g.lineTo(0, hy - 28 - 26 * sc); g.lineTo(8 * sc, hy - 28 - 12 * sc); g.lineTo(18 * sc, hy - 28 - 22 * sc); g.lineTo(16 * sc, hy - 28); g.closePath(); }, '#f4c542', '#c9962e', { lw: 1.5 }); paint(() => C(0, hy - 28 - 12 * sc, 2.6 * sc), '#e0457b', null, { lw: .8 }); }
  if (ht === 'beret') paint(() => E(-4, hy - 30, 26, 9, -.15), p.hatCol || '#c03040', dk(p.hatCol || '#c03040', .3), { lw: 1.6 });
  if (ht === 'chef') paint(() => { tuft(0, hy - 52, 22, 16, 6, .25); RR(-18, hy - 42, 36, 16, 3); }, '#fbfbf6', '#d8d8d0', { lw: 1.6 });
  if (ht === 'captain') { paint(() => { RR(-24, hy - 46, 48, 18, 6); }, '#fbfbf6', '#d8d8d0', { lw: 1.6 }); paint(() => E(4, hy - 28, 26, 5), '#24304a', null, { lw: 1.4 }); paint(() => C(0, hy - 38, 4), '#f4c542', null, { lw: 1 }); }
  if (ht === 'helmet') paint(() => { g.moveTo(-28, hy + 4); g.quadraticCurveTo(-32, hy - 44, 0, hy - 44); g.quadraticCurveTo(32, hy - 44, 28, hy + 4); g.lineTo(18, hy + 4); g.quadraticCurveTo(18, hy - 18, 0, hy - 18); g.quadraticCurveTo(-18, hy - 18, -18, hy + 4); g.closePath(); }, p.hatCol || '#e04a3a', dk(p.hatCol || '#e04a3a', .3), { lw: 1.8, tex: () => { g.fillStyle = '#fff'; g.fillRect(-3, hy - 46, 6, 30); } });
  if (ht === 'beanie') paint(() => { g.moveTo(-25, hy - 12); g.quadraticCurveTo(-26, hy - 42, 0, hy - 42); g.quadraticCurveTo(26, hy - 42, 25, hy - 12); g.closePath(); }, p.hatCol || '#3a7a5a', dk(p.hatCol || '#3a7a5a', .3), { lw: 1.6, tex: () => { g.fillStyle = dk(p.hatCol || '#3a7a5a', .2); g.fillRect(-30, hy - 18, 60, 7); } });
  if (ht === 'headband') paint(() => RR(-25, hy - 24, 50, 7, 3), p.hatCol || '#e04a3a', null, { lw: 1.3 });
  if (ht === 'chauffeur') { paint(() => { RR(-23, hy - 44, 46, 16, 5); }, '#24242c', null, { lw: 1.6 }); paint(() => E(6, hy - 28, 24, 4), '#111', null, { lw: 1.2 }); }
  if (p.headphones) { g.save(); g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(0, hy - 4, 28, PI * 1.05, PI * 1.95); g.stroke(); g.strokeStyle = p.headphones; g.lineWidth = 3; g.stroke(); g.restore(); paint(() => { RR(-31, hy - 10, 9, 18, 4); RR(22, hy - 10, 9, 18, 4); }, p.headphones, dk(p.headphones, .3), { lw: 1.5 }); }
  if (p.flower) paint(() => { for (let i = 0; i < 5; i++) C(-18 + Math.cos(i * 1.26) * 4, hy - 26 + Math.sin(i * 1.26) * 4, 3.4); }, p.flower, null, { lw: 1 });
  if (p.prop === 'phone') { paint(() => RR(30, -40, 16, 28, 3), '#2a2a34', null, { lw: 1.4, tex: () => { g.fillStyle = '#6ad0ff'; g.fillRect(32, -37, 12, 20); } }); paint(() => C(38, -14, 7), SK, SKD, { lw: 1.4 }); }
  if (p.prop === 'clipboard') { paint(() => RR(26, -50, 26, 34, 3), '#b07a45', null, { lw: 1.4, tex: () => { g.fillStyle = '#fff'; g.fillRect(29, -45, 20, 26); g.strokeStyle = '#888'; g.lineWidth = 1; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(31, -40 + i * 6); g.lineTo(46, -40 + i * 6); g.stroke(); } } }); }
  if (p.prop === 'mug') paint(() => RR(30, -36, 16, 18, 3), '#e04a3a', null, { lw: 1.4, tex: () => { paw(38, -27, 4, '#fff'); } });
  if (p.prop === 'mic') { limb([[34, -10], [36, -34]], 3, '#3a3a44'); paint(() => C(36, -38, 6), '#5a5a64', null, { lw: 1.4 }); }
  g.restore();
}
const CAST = {
  lupe: { name: 'Doc Lupe', skin: '#c68a64', hair: 'bun', hairCol: '#d0d0d4', glasses: 'round', shirt: '#7ac0b0', coat: '#f8f8f4', acc: 'stetho', age: 1, mouth: 'smirk', prop: 'mug', seed: 3 },
  dakota: { name: 'Dakota', skin: '#e8b896', hair: 'ponytail', hairCol: '#3fc0c0', shirt: '#a050d0', mouth: 'grin', prop: 'phone', earrings: '#ffd24a', seed: 4 },
  dusty: { name: 'Uncle Dusty', skin: '#d09a78', hair: 'short', hairCol: '#f4f4f4', beard: 'full', hat: 'cowboy', shirt: '#c84a2a', stripes: '#f4c542', age: 1, seed: 5 },
  plinth: { name: 'Inspector Plinth', skin: '#f0d0b0', hair: 'comb', hairCol: '#7a6a5a', glasses: 'square', shirt: '#fbfbf6', coat: '#7a8a9a', acc: 'tie', tie: '#a03030', mouth: 'flat', prop: 'clipboard', lid: .3, seed: 6 },
  splice: { name: 'Dr. Splice', skin: '#f4dcc8', hair: 'wild', hairCol: '#f4f4f4', glasses: 'goggles', shirt: '#5a8a5a', coat: '#f8f8f4', mouth: 'grin', age: 1, seed: 7 },
  bottomline: { name: 'Chase Bottomline', skin: '#f0c8a0', hair: 'slick', hairCol: '#1e1a1a', shirt: '#ffffff', vest: '#3a4a6a', mouth: 'grin', sparkleTeeth: 1, angry: 1, seed: 8 },
  trent: { name: 'Trent Dazzleton', skin: '#e0b090', hair: 'slick', hairCol: '#6a4a2a', shirt: '#ffffff', coat: '#2a3a5a', acc: 'tie', tie: '#c03030', mouth: 'grin', prop: 'mic', seed: 9 },
};
