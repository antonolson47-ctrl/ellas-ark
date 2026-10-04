/* ===================== MAIN LOOP, ICONS, PWA, TEST HOOKS ===================== */
let DT = 0, LAST = performance.now(), FRAMES = 0, ERRS = [];
function drawDay() {
  const tab = RT.tab, ph = RT.phase;
  if (ph === 'report' && (tab === 'ark' || tab === 'adopt' || tab === 'ads')) drawReport();
  else if (tab === 'ark' && ph !== 'open') { drawView(); drawCarePanel(); }
  else if (tab === 'adopt' || tab === 'ark') { if (ph === 'open') drawOpenHouse(); else drawAdoptPre(); }
  else if (tab === 'ads') drawAds(); else if (tab === 'build') drawBuild(); else if (tab === 'dex') drawDex();
  drawHUD(); drawTabs();
  if (RT.arrivals.length && ph === 'morning') drawArrivals();
  if (RT.modal) drawInspect();
  drawDonationPop();
}
function draw() {
  HITS = []; SCROLLS = []; CLIP = null;
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.fillStyle = '#231b55'; g.fillRect(0, 0, cv.width, cv.height);
  const k = L.sc * L.dpr, sh = RT.shake > 0 ? RT.shake : 0, sx = sh ? (Math.random() * 2 - 1) * sh : 0, sy = sh ? (Math.random() * 2 - 1) * sh : 0;
  g.setTransform(k, 0, 0, k, (L.ox + sx) * L.dpr, (L.oy + sy) * L.dpr); g.lineJoin = 'round'; g.lineCap = 'round';
  if (RT.story) drawStory();
  else if (RT.scene === 'title') drawTitle();
  else if (RT.scene === 'day') drawDay();
  else if (RT.scene === 'finale') drawFinale();
  else if (RT.scene === 'credits') drawCredits();
  drawParts(); drawToasts();
  if (RT.settings) drawSettings();
}
function update(dt) {
  RT.t += dt; if (RT.ellaPose) RT.ellaPose[1] -= dt;
  if (RT.scene === 'day' && !RT.paused && !RT.story && RT.phase === 'care' && !RT.arrivals.length) updateCare(dt);
  if (RT.romance) {} // timed in draw
  updateParts(dt);
}
function frame(t) {
  DT = Math.min(.05, Math.max(0, (t - LAST) / 1000)); LAST = t; FRAMES++;
  try { update(DT); draw(); } catch (e) { if (ERRS.length < 20) { ERRS.push(String(e && e.stack || e)); console.error(e); } }
  requestAnimationFrame(frame);
}
/* ---------- app icon (drawn in code) ---------- */
function drawAppIcon(ctx, n) {
  const old = g; g = ctx; const k = n / 100; g.setTransform(k, 0, 0, k, 0, 0); g.lineJoin = 'round'; g.lineCap = 'round';
  try {
    const gr = g.createLinearGradient(0, 0, 0, 100); gr.addColorStop(0, '#3a2470'); gr.addColorStop(.45, '#c04a7a'); gr.addColorStop(.75, '#ff9a5a'); gr.addColorStop(1, '#ffd88a'); g.fillStyle = gr; g.fillRect(0, 0, 100, 100);
    g.fillStyle = '#6a3668'; g.beginPath(); g.moveTo(0, 70); g.lineTo(18, 56); g.lineTo(32, 62); g.lineTo(50, 46); g.lineTo(66, 58); g.lineTo(82, 50); g.lineTo(100, 60); g.lineTo(100, 100); g.lineTo(0, 100); g.fill();
    starOnMountain(24, 56, 6);
    g.fillStyle = '#d98c60'; g.fillRect(0, 84, 100, 16);
    drawEllaBust(50, 104, 92);
    paint(() => C(82, 18, 12), '#fff4e0', '#e8d2a6', { lw: 1.6, sx: 0, sy: -2 }); paw(82, 19, 8, '#e9503f');
  } finally { g = old; }
}
function iconURL(n) { const c = document.createElement('canvas'); c.width = c.height = n; drawAppIcon(c.getContext('2d'), n); return c.toDataURL('image/png'); }
(function headIcons() {
  try {
    const add = (rel, href, sizes) => { const l = document.createElement('link'); l.rel = rel; l.href = href; if (sizes) l.sizes = sizes; document.head.appendChild(l); };
    if (!document.querySelector('link[rel=icon]')) add('icon', iconURL(64));
    if (!document.querySelector('link[rel=apple-touch-icon]')) add('apple-touch-icon', iconURL(180), '180x180');
    if (!document.querySelector('link[rel=manifest]') && /^https?:$/.test(location.protocol)) {
      const man = { name: "Ella's Ark", short_name: "Ella's Ark", start_url: location.href.split('#')[0], scope: location.href.replace(/[^/]*$/, ''), display: 'fullscreen', orientation: 'any', background_color: '#231b55', theme_color: '#231b55', icons: [{ src: iconURL(192), sizes: '192x192', type: 'image/png' }, { src: iconURL(512), sizes: '512x512', type: 'image/png' }] };
      add('manifest', URL.createObjectURL(new Blob([JSON.stringify(man)], { type: 'application/manifest+json' })));
    }
  } catch (e) {}
})();
/* ---------- debug fast-forward + test hooks ---------- */
function debugJump(ch) {
  ch = clamp(ch | 0, 1, 20); const act = CH[ch].act; RT.story = null; RT.arrivals = []; RT.modal = null; RT.romance = null; RT.bench = false; RT.report = null; RT.parts = []; RT.toasts = [];
  GS = freshState(); GS.started = true; GS.day = 1 + (ch - 1) * 3; GS.act = act; GS.ch = ch;
  GS.money = [0, 1500, 40000, 2500000, 40000000][act]; GS.rep = clamp(15 + act * 15, 0, 90);
  for (const u of UPG) if (u.act < act) GS.upgrades[u.id] = 1;
  if (ch >= 15) GS.upgrades.o_heli = 1;
  for (let c = 1; c < ch; c++) { GS.flags['intake' + c] = 1; for (const id of CH[c].intake) if (SP[id] && !SP[id].stray) GS.dex[id] = { n: SP[id].name, d: 1 }; }
  if (ch > 4) GS.flags.dustDone = 1; if (ch > 6) GS.flags.floodRain = 1; if (ch > 9) GS.flags.rhinoDone = 1;
  const keep = act === 1 ? CH.slice(1, ch).flatMap(c => c.intake).slice(-3) : act === 2 ? ['taco', 'kevin'].concat(CH.slice(6, ch).flatMap(c => c.intake).slice(-4)) : ['chancla', 'tamale', 'gator', 'eagle', 'rhino', 'trex', 'mammoth', 'penguin', 'tiger', 'kangaroo'];
  for (const id of keep) if (SP[id]) addResident(newResident(id));
  if (act >= 4) for (const [a, b] of [['chancla', 'trex'], ['rhino', 'eagle'], ['tamale', 'python']]) addResident(mashResident(a, b));
  save(); startChapter(ch); return { ch, act, residents: GS.residents.length };
}
window.__EA = {
  get GS() { return GS; }, get RT() { return RT; }, get L() { return L; }, get LY() { return LY; }, get errors() { return ERRS; }, get frames() { return FRAMES; },
  hits() { return HITS.map(h => ({ id: h.id, x: L.ox + h.x * L.sc, y: L.oy + h.y * L.sc, w: h.w * L.sc, h: h.h * L.sc })); },
  hit(id) { const h = HITS.find(q => q.id === id); return h ? { id, x: L.ox + (h.x + h.w / 2) * L.sc, y: L.oy + (h.y + h.h / 2) * L.sc, w: h.w * L.sc, h: h.h * L.sc } : null; },
  click(id) { return clickHit(id); }, jump: debugJump, skipStory() { let n = 0; while (RT.story && n++ < 5) storySkip(); return !RT.story; },
  endShift() { if (RT.phase === 'care') RT.shiftT = RT.shiftLen; }, setMoney(v) { GS.money = v; },
  goalsDone, goalProg: () => CH[GS.ch].goals.map(goalProg), state() { return { scene: RT.scene, story: !!RT.story, phase: RT.phase, tab: RT.tab, ch: GS.ch, act: GS.act, day: GS.day, money: GS.money, res: GS.residents.length, queue: GS.queue.length, arrivals: RT.arrivals.length, call: !!RT.call, modal: RT.modal && RT.modal.type, adopters: RT.adopters.length, ai: RT.ai, portrait: L.portrait, W: L.W, H: L.H, sc: L.sc, romance: !!RT.romance, bench: !!RT.bench, fin: RT.fin ? RT.fin.step : null, settings: !!RT.settings, humor: SETTINGS.humor }; },
  adopter() { const a = curAdopter(); if (!a) return null; return { name: a.name, celeb: !!a.celeb, fake: !!a.fake, flag: !!(a.flag && flagActive(a, adoptables()[RT.ci])), ci: RT.ci, best: bestMatchIdx(a), n: adoptables().length }; },
  iconURL, audio() { return { ctx: AC ? AC.state : 'none', music: MUS.cur, playing: MUS.playing, want: MUS.want }; }, makeMash, CH, SP, UPG, TRACKS,
};
/* ---------- boot ---------- */
load(); layout(); RT.scene = 'title'; musicPlay(0);
if (document.fonts && document.fonts.load) Promise.all(["20px 'EA Lucky'", "20px 'EA Lilita'", "20px 'EA Fredoka'", "600 20px 'EA Fredoka'"].map(f => document.fonts.load(f))).then(() => { CACHE.clear(); ART.clear(); }).catch(() => {});
requestAnimationFrame(frame);
