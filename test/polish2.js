// More overlap-review captures: story, quick call, inspection, ads, love bench, romance, settings, finale
const { chromium } = require('playwright'); const { setup } = require('./lib'); const path = require('path');
(async () => { const out = path.resolve(__dirname, process.argv[2] || 'tmp'), pre = process.argv[3] || 'pol2_'; const b = await chromium.launch();
  for (const [o, vp] of [['p', { width: 390, height: 664 }], ['l', { width: 844, height: 390 }]]) {
    const H = await setup(b, { viewport: vp, deviceScaleFactor: 2, hasTouch: true }); const { p } = H; const shot = n => H.shot(pre + o + '_' + n, out);
    await p.evaluate(() => __EA.jump(3)); await p.waitForTimeout(300); for (let i = 0; i < 3; i++) await H.tap('story_next', 120); await p.waitForTimeout(900); await shot('story');
    await H.skipStory(); await H.arrivals(); await p.evaluate(() => { spawnCall(); toast('GOAL COMPLETE: Ads posted', '#9cff9c', 3); }); await p.waitForTimeout(400); await shot('call');
    await H.tap('tab_ads', 300); await H.tap('ch_gram', 400); await shot('ads');
    await H.tap('tab_ark', 200); await p.evaluate(() => __EA.jump(5)); await H.skipStory(); await H.arrivals(); await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(800); await shot('inspect');
    await p.evaluate(() => __EA.jump(13)); await H.skipStory(); await H.arrivals(); await p.evaluate(() => { __EA.GS.upgrades.p_bench = 1; __EA.GS.upgrades.p_scope = 1; __EA.endShift(); }); await p.waitForTimeout(600); if (await H.has('insp_ok')) await H.tap('insp_ok');
    await p.evaluate(() => endOpen()); await p.waitForTimeout(400); await H.tap('romance', 400); const ids = (await H.ids()).filter(i => i.startsWith('bench_') && !/go|rand/.test(i)); await H.tap(ids[0], 150); await H.tap(ids[2], 300); await shot('bench');
    await H.tap('bench_go', 1200); await shot('romance1'); await p.waitForTimeout(2500); await shot('romance2');
    await H.tap('menu', 300); await shot('settings'); await H.tap('set_resume', 200);
    await p.evaluate(() => __EA.jump(20)); await H.skipStory(); await p.waitForTimeout(500); await shot('finale');
    console.log(o, 'errors:', JSON.stringify(H.errs.concat(await p.evaluate(() => __EA.errors))).slice(0, 600)); await H.ctx.close();
  }
  await b.close(); })();
