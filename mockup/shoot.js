// node shoot.js [mode...]  → ../plan/mockup_*.png
const { chromium } = require('/workspace/careys-punchout/test/node_modules/playwright');
const path = require('path');
const OUT = { keyart: 'mockup_keyart_portrait.png', gameplay: 'mockup_gameplay_landscape.png', cards: 'mockup_mashup_cards.png' };
const SZ = { keyart: [390, 844, 3], gameplay: [844, 390, 3], cards: [1200, 760, 2] };
(async () => {
  const modes = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(OUT);
  const b = await chromium.launch();
  for (const m of modes) {
    const [w, h, d] = SZ[m]; const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: d });
    p.on('console', x => console.log(m, x.type(), x.text())); p.on('pageerror', e => console.log(m, 'PAGEERR', e.message));
    await p.goto('file://' + path.join(__dirname, 'mockup.html') + '?mode=' + m);
    await p.waitForFunction(() => document.title === 'DONE' || document.title.startsWith('ERR'), null, { timeout: 15000 });
    console.log(m, await p.title());
    await p.screenshot({ path: path.join(__dirname, '..', 'plan', OUT[m]) }); await p.close();
  }
  await b.close();
})();
