const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push('PE ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('CE ' + m.text()); });
  await p.goto('file://' + __dirname + '/../EllasArk.html'); await p.waitForTimeout(1200);
  await p.screenshot({ path: __dirname + '/tmp/s_title.png' });
  const tap = async id => { const h = await p.evaluate(i => __EA.hit(i), id); if (!h) { console.log('no hit', id); return false; } await p.mouse.click(h.x, h.y); await p.waitForTimeout(250); return true; };
  await tap('play'); await p.waitForTimeout(500); await p.screenshot({ path: __dirname + '/tmp/s_story.png' });
  await p.evaluate(() => __EA.skipStory()); await p.waitForTimeout(600);
  console.log(JSON.stringify(await p.evaluate(() => __EA.state())));
  await p.screenshot({ path: __dirname + '/tmp/s_day.png' });
  for (let i = 0; i < 4; i++) { if (!(await tap('arr_open')) ) await tap('crate'); await p.waitForTimeout(400); await tap('arr_next'); }
  await p.waitForTimeout(500); await p.screenshot({ path: __dirname + '/tmp/s_care.png' });
  console.log(JSON.stringify(await p.evaluate(() => __EA.state())));
  console.log((await p.evaluate(() => __EA.hits().map(h => h.id))).join(' '));
  console.log(errs.slice(0, 10).join('\n')); console.log('ERRS', JSON.stringify(await p.evaluate(() => __EA.errors)).slice(0, 2000));
  await b.close();
})();
