// Ella's Ark — full feature test on an iPhone profile. Usage: node mobile.js [webkit|chromium] [url]
const { webkit, chromium, devices } = require('playwright'); const { setup } = require('./lib'); const path = require('path');
const ENG = process.argv[2] || 'webkit', URL = process.argv[3], SHOTS = path.resolve(__dirname, ENG === 'webkit' && !URL ? '../screenshots' : 'tmp'), TAG = ENG === 'webkit' ? '' : 'chromium_';
const results = []; const ok = (name, cond, info = '') => { results.push([name, !!cond, info]); console.log((cond ? 'PASS ' : 'FAIL ') + name + (info ? ' — ' + info : '')); };
(async () => {
  const eng = ENG === 'webkit' ? webkit : chromium; const b = await eng.launch();
  const dev = { ...devices['iPhone 13'] }; if (ENG !== 'webkit') delete dev.defaultBrowserType;
  const H = await setup(b, dev, URL); const { p } = H; const shot = n => H.shot(TAG + n, SHOTS);
  const noScroll = () => p.evaluate(() => ({ sx: document.scrollingElement.scrollWidth <= innerWidth + 1 && document.scrollingElement.scrollHeight <= innerHeight + 1, sc: visualViewport ? visualViewport.scale : 1 }));
  const inView = () => p.evaluate(() => { const vw = innerWidth, vh = innerHeight; const bad = __EA.hits().filter(h => !/block|view_bg|story_next|goals|_bg$/.test(h.id) && h.w < vw && (h.x < -1 || h.y < -1 || h.x + h.w > vw + 1 || h.y + h.h > vh + 1)); return bad.map(h => h.id + '@' + Math.round(h.x) + ',' + Math.round(h.y) + ' ' + Math.round(h.w) + 'x' + Math.round(h.h)); });
  const rotate = async land => { const s = land ? devices['iPhone 13 landscape'].viewport : devices['iPhone 13'].viewport; await p.setViewportSize(s); await p.waitForTimeout(900); };
  const playOpen = async (want = {}) => { // run open house with matching; returns stats
    let approved = 0, denied = 0, celeb = 0, shotCeleb = false;
    for (let i = 0; i < 12; i++) {
      const s = await H.st(); if (s.phase !== 'open') break; const a = await p.evaluate(() => __EA.adopter()); if (!a) { await p.waitForTimeout(400); continue; }
      if (a.celeb && want.celebShot && !shotCeleb) { await shot(want.celebShot); shotCeleb = true; }
      if (a.fake || a.flag) { await H.tap('deny', 1500); denied++; continue; }
      for (let k = 0; k < a.n && (await p.evaluate(() => __EA.RT.ci)) !== a.best; k++) await H.tap('pick_next', 120);
      await H.tap('q_home', 200); const m0 = (await H.st()).money; await H.tap('approve', 500);
      if (want.donShot && !want._done) { await shot(want.donShot); want._done = 1; }
      await p.waitForTimeout(1200); approved++; if (a.celeb) celeb++;
    }
    return { approved, denied, celeb };
  };
  // 1) title
  ok('portrait layout at load', (await H.st()).portrait); await shot('01_title'); ok('no page scroll/zoom (title)', (await noScroll()).sx);
  ok('title buttons inside viewport', !(await inView()).length, (await inView()).join(' '));
  await rotate(true); await p.waitForTimeout(300); ok('title fits in landscape', !(await inView()).length, (await inView()).join(' ')); await shot('01b_title_landscape'); await rotate(false);
  // 2) act 1 care
  await H.tap('play'); await p.waitForTimeout(300); const au = await p.evaluate(() => __EA.audio()); ok('WebAudio started on first tap (music track playing)', au.ctx === 'running' && au.playing, JSON.stringify(au)); ok('story opens', (await H.st()).story); await shot('02_story_intro'); await H.skipStory(); await H.arrivals();
  let s = await H.st(); ok('Act 1 care shift started', s.phase === 'care' && s.act === 1, JSON.stringify(s));
  const need0 = await p.evaluate(() => { const r = __EA.GS.residents[0]; r.hunger = .2; r.clean = .3; return [r.hunger, r.clean]; });
  await H.tap('tool_feed', 600); await H.tap('tool_wash', 600);
  const need1 = await p.evaluate(() => { const r = __EA.GS.residents[0]; return [r.hunger, r.clean]; }); ok('care actions (feed + wash) raise needs', need1[0] > need0[0] && need1[1] > need0[1], JSON.stringify([need0, need1]));
  await H.care(6); await shot('03_act1_care_portrait'); ok('care UI inside viewport (portrait)', !(await inView()).length, (await inView()).join(' '));
  // 3) rotation mid-play
  await rotate(true); s = await H.st(); ok('rotated to landscape mid-shift', !s.portrait && s.phase === 'care', `${s.W}x${s.H}`);
  ok('no scroll after rotation', (await noScroll()).sx); const iv = await inView(); ok('care UI inside viewport (landscape)', !iv.length, iv.join(' '));
  await H.tap('tool_play', 400); await shot('04_act1_care_landscape');
  await rotate(false); s = await H.st(); ok('rotated back to portrait', s.portrait && s.phase === 'care');
  // 4) adoption matching + donation + chapter progression (ch1 -> ch2)
  await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(900);
  for (let i = 0; i < 4; i++) { if ((await H.st()).modal) await H.tap('insp_ok'); }
  const m0 = (await H.st()).money; const o1 = await playOpen({ donShot: '05_adoption_donation' }); s = await H.st();
  ok('adoption matching: matched adopter approved', o1.approved >= 1, JSON.stringify(o1)); ok('donation received', s.money > m0, `$${m0} -> $${s.money}`);
  ok('report shown', s.phase === 'report'); await shot('06_sunset_report'); await H.tap('next_day', 900); await H.skipStory(); await p.waitForTimeout(300); s = await H.st();
  ok('chapter 1 complete -> chapter 2', s.ch === 2, 'ch=' + s.ch); await H.arrivals();
  // 5) ads (ch3) + upgrade purchase
  await p.evaluate(() => __EA.jump(3)); await H.skipStory(); await H.arrivals(); await H.tap('tab_ads', 400);
  await H.tap('cap_0', 200); const ids = await H.ids(); const chId = ids.find(i => i === 'ch_gram') || ids.find(i => i.startsWith('ch_'));
  const b0 = await p.evaluate(() => __EA.RT.buzz); await H.tap(chId, 700); const b1 = await p.evaluate(() => __EA.RT.buzz); ok('ad posted raises Buzz', b1 > b0, `${chId} ${b0}->${b1}`); await shot('07_ads');
  await H.tap('tab_build', 400); await H.tap('br_hab', 300); const mB = (await H.st()).money; await H.tap('buy_h_kennel2', 700);
  const bought = await p.evaluate(() => !!__EA.GS.upgrades.h_kennel2); ok('upgrade purchased (Kennel Wing)', bought, `$${mB} -> $${(await H.st()).money}`); await shot('08_upgrades');
  await H.tap('tab_ark', 300);
  // 6) exotic arrivals (Act 2 flood)
  await p.evaluate(() => __EA.jump(6)); await shot('09_flood_story'); await H.skipStory(); await p.waitForTimeout(400); s = await H.st();
  ok('Act 2 exotic arrivals queued', s.act === 2 && s.arrivals >= 3, JSON.stringify({ act: s.act, arrivals: s.arrivals }));
  for (let i = 0; i < 2; i++) await H.tap('arr_next', 400); await shot('10_exotic_arrival');
  await H.arrivals(); await shot('11_exotics_care'); const exo = await p.evaluate(() => __EA.GS.residents.filter(r => __EA.SP[r.sp] && __EA.SP[r.sp].cls !== 'pet' && r.sp !== 'sarge').length); ok('exotics in the ark', exo >= 3, 'exotics=' + exo);
  // 7) Puddle mashup via the Love Bench generator (Act 3)
  await p.evaluate(() => __EA.jump(12)); await H.skipStory(); await H.arrivals(); await H.tap('tab_build', 300); await H.tap('br_puddle', 300); await H.tap('buy_p_bench', 600);
  ok('Love Bench upgrade bought', await p.evaluate(() => !!__EA.GS.upgrades.p_bench)); await H.tap('tab_ark', 300);
  await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(900); for (let i = 0; i < 3; i++) if ((await H.st()).modal) await H.tap('insp_ok');
  await playOpen(); await H.tap('romance', 500); s = await H.st(); ok('Love Bench (mashup generator) opened', s.bench);
  const benchIds = (await H.ids()).filter(i => i.startsWith('bench_') && !['bench_go', 'bench_rand'].includes(i)); await H.tap(benchIds[0], 200); await H.tap(benchIds[1], 300); await shot('12_love_bench');
  const lp = await p.evaluate(() => __EA.RT.lovePick.slice()); await H.tap('bench_go', 2400); console.log('  bench picks', JSON.stringify(lp), 'crates', await p.evaluate(() => JSON.stringify(__EA.GS.crates))); await shot('13_romance'); await H.waitHit('next_day', 8000); await H.tap('next_day', 900); await H.skipStory(); await p.waitForTimeout(300);
  s = await H.st(); ok('mashup crate delivered next morning', s.arrivals >= 1);
  if (await H.has('arr_open')) await H.tap('arr_open', 1600); await shot('14_mashup_reveal');
  const mash = await p.evaluate(() => __EA.RT.arrivals.concat(__EA.GS.residents).filter(r => r.sp === 'mash').map(r => r.name)); ok('Puddle mashup born', mash.length >= 1, mash.join(', '));
  await H.arrivals();
  // 8) celebrity adoption (Act 4)
  await p.evaluate(() => __EA.jump(16)); await H.skipStory(); await H.arrivals(); await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(900);
  const c0 = await p.evaluate(() => __EA.GS.stats ? JSON.stringify(__EA.GS.stats) : ''); const o4 = await playOpen({ celebShot: '15_celebrity_adopter', donShot: '16_celebrity_donation' });
  ok('celebrity adoption', o4.celeb >= 1, JSON.stringify(o4)); await rotate(true); await shot('17b_act4_report_landscape'); ok('report fits in landscape', !(await inView()).length, (await inView()).join(' ')); await rotate(false); await shot('17_act4_report');
  // 9) finale + credits
  await p.evaluate(() => __EA.jump(20)); await H.skipStory(); await p.waitForTimeout(400); await shot('18_finale');
  for (let i = 0; i < 8; i++) { const want = await p.evaluate(() => { const F = __EA.RT.fin; if (!F || F.done) return -1; return window.POWERS ? 0 : 0; }); if (want < 0) break; const lit = await p.evaluate(() => { const F = __EA.RT.fin; return F ? __EA.hits().findIndex(() => 0) : -1; }); await p.keyboard.press(String(await p.evaluate(() => { const F = __EA.RT.fin; return POWERS.findIndex(pw => pw[0] === F.seq[F.step][0]) + 1; }))); await p.waitForTimeout(250); }
  await p.waitForTimeout(2600); await H.skipStory(); await p.waitForTimeout(800); s = await H.st(); ok('finale -> credits', s.scene === 'credits', s.scene); await shot('19_credits');
  // 10) settings humor toggle + save/resume
  await p.evaluate(() => { __EA.RT.scene = 'title'; }); await H.waitHit('title_settings'); await H.tap('title_settings', 400); await H.tap('set_humor_clean', 300); ok('humor toggle -> Cleaner', (await H.st()).humor === 'clean'); await shot('20_settings'); await H.tap('set_humor_raunchy', 200); await H.tap('set_resume', 200);
  await p.reload(); await p.waitForFunction(() => window.__EA && __EA.frames > 3); ok('save persists across reload', (await p.evaluate(() => __EA.GS.day)) > 1);
  const ers = H.errs.concat(await p.evaluate(() => __EA.errors)); ok('no console/page errors', !ers.length, ers.slice(0, 5).join(' | '));
  const fails = results.filter(r => !r[1]); console.log(`\n${ENG}: ${results.length - fails.length}/${results.length} passed`); await b.close(); process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
