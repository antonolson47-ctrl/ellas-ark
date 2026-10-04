// full playthrough of a day + debug jumps, Chromium, screenshot every phase into tmp/
const { chromium, webkit, devices } = require('playwright'); const { setup } = require('./lib');
(async () => {
  const which = process.argv[2] || 'portrait'; const b = await chromium.launch();
  const vp = which === 'portrait' ? { width: 390, height: 844 } : { width: 844, height: 390 };
  const H = await setup(b, { viewport: vp, deviceScaleFactor: 2 }); const { p } = H; const T = which[0];
  await H.tap('play'); await H.skipStory(); await H.arrivals(); await H.shot(T + '1_care');
  await H.care(14); console.log('after care', JSON.stringify(await H.st()));
  await p.evaluate(() => __EA.endShift()); await p.waitForTimeout(800); console.log('end shift', JSON.stringify(await H.st())); await H.shot(T + '2_after');
  for (let i = 0; i < 6; i++) { const s = await H.st(); if (s.modal) await H.tap('insp_ok'); if (await H.has('pre_bell')) await H.tap('pre_bell'); }
  await H.shot(T + '3_open');
  for (let i = 0; i < 8; i++) { const s = await H.st(); if (s.phase !== 'open') break; await H.tap('q_home', 150); await H.shot(T + '3_open_q'); await H.tap('approve', 1400); }
  console.log('after open', JSON.stringify(await H.st())); await H.shot(T + '4_report');
  await H.tap('next_day', 800); console.log('next', JSON.stringify(await H.st())); await H.skipStory(); await H.shot(T + '5_next'); await H.arrivals(); await H.shot(T + '5_care2');
  for (const tab of ['ads', 'build', 'dex', 'adopt']) { await H.tap('tab_' + tab, 300); await H.shot(T + '6_' + tab); }
  await H.tap('tab_ark'); await H.tap('menu', 300); await H.shot(T + '7_settings'); await H.tap('set_resume');
  for (const ch of [6, 11, 16, 20]) { await p.evaluate(c => __EA.jump(c), ch); await p.waitForTimeout(300); await H.shot(T + '8_story' + ch); await H.skipStory(); await p.waitForTimeout(300); await H.shot(T + '8_ch' + ch + 'a'); await H.arrivals(); await H.shot(T + '8_ch' + ch + 'b'); console.log('ch', ch, JSON.stringify(await H.st())); }
  console.log('ERR', H.errs.slice(0, 8).join('\n'), JSON.stringify(await p.evaluate(() => __EA.errors)).slice(0, 1500));
  await b.close();
})();
