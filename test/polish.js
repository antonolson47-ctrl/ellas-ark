// Quick art-review captures: node polish.js [outdir] [prefix]  (Chromium, iPhone-sized portrait + landscape)
const { chromium } = require('playwright'); const { setup } = require('./lib'); const path = require('path');
(async () => { const out = path.resolve(__dirname, process.argv[2] || 'tmp'), pre = process.argv[3] || 'pol_'; const b = await chromium.launch();
  for (const [o, vp] of [['p', { width: 390, height: 664 }], ['l', { width: 844, height: 390 }]]) {
    const H = await setup(b, { viewport: vp, deviceScaleFactor: 2, hasTouch: true }); const { p } = H; const shot = n => H.shot(pre + o + '_' + n, out);
    if (o === 'p') await shot('title');
    await H.tap('play'); await H.skipStory(); await H.arrivals(); await p.evaluate(() => { const r = __EA.GS.residents[0]; r.hunger = .2; });
    await H.tap('tool_feed', 120); await p.evaluate(() => toast('Belly rub (brace for impact)! Meatball is living their best life.', '#ffd24a', 3)); await p.waitForTimeout(250); await shot('care1');
    await p.evaluate(() => __EA.jump(6)); await H.skipStory(); await p.waitForTimeout(200); await H.tap('arr_next', 200); await shot('exotic');
    await H.arrivals(); await p.evaluate(() => { const r = __EA.GS.residents.find(q => q.sp === 'gator'); if (r) { r.hunger = .1; select(r); } }); await H.tap('tool_feed', 150); await p.evaluate(() => toast('HABOOB! Dust storm! Everyone needs a bath. Again.', '#e0a050', 3)); await p.waitForTimeout(200); await shot('care2');
    await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(700); await shot('open');
    await p.evaluate(() => __EA.jump(11)); await H.skipStory(); await p.evaluate(() => { __EA.RT.arrivals = [addResident(mashResident('chancla', 'trex')), addResident(mashResident('tamale', 'python'))]; __EA.RT.arrivalI = 0; __EA.RT.crateOpen = false; __EA.RT.phase = 'morning'; }); await p.waitForTimeout(200); await shot('crate');
    await H.tap('arr_open', 1500); await shot('mash');
    await H.arrivals(); await H.tap('tab_dex', 300); await H.tap('dex_mash', 300); await shot('dexmash'); const ids = await H.ids(); const m = ids.find(i => i.startsWith('dexm_')); if (m) { await H.tap(m, 400); await shot('mashcard'); }
    await p.evaluate(() => __EA.jump(16)); await H.skipStory(); await H.arrivals(); await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(700); await shot('celeb');
    await p.evaluate(() => endOpen()); await p.waitForTimeout(600); await shot('report');
    await H.tap('tab_build', 300); await shot('build');
    console.log(o, 'errors:', JSON.stringify(H.errs.concat(await p.evaluate(() => __EA.errors))).slice(0, 600)); await H.ctx.close();
  }
  await b.close(); })();
