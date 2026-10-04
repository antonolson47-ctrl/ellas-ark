// Render a sprite gallery (all species + sample mashups) to tmp/gallery_*.png for art review
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => { const out = process.argv[2] || 'tmp'; const b = await chromium.launch(); const p = await b.newPage({ deviceScaleFactor: 1 });
  await p.goto('file://' + path.resolve(__dirname, '../EllasArk.html')); await p.waitForFunction(() => window.__EA && __EA.frames > 2); await p.waitForTimeout(500);
  const d = await p.evaluate(() => {
    const ids = Object.keys(SP); const cols = 8, cw = 180, chh = 170; const res = [];
    const mk = (list, label) => { const rows = Math.ceil(list.length / cols); const c = document.createElement('canvas'); c.width = cols * cw; c.height = rows * chh; const x = c.getContext('2d'); const old = g; g = x;
      g.fillStyle = '#f2e2c4'; g.fillRect(0, 0, c.width, c.height);
      list.forEach((kit, i) => { const cx = (i % cols) * cw + cw / 2, by = Math.floor(i / cols) * chh + chh - 26; drawSpr(getSprite(kit), cx, by, cw - 16, chh - 40); g.fillStyle = '#3a2416'; g.font = '13px sans-serif'; g.textAlign = 'center'; g.fillText(kit.label || kit.id, cx, by + 18); });
      g = old; return c.toDataURL('image/png'); };
    res.push(mk(ids.map(id => Object.assign({}, SP[id].kit, { label: id })), 'species'));
    const pairs = [['chancla', 'trex'], ['tamale', 'python'], ['rhino', 'eagle'], ['kevin', 'gator'], ['meatball', 'hippo'], ['duchess', 'flamingo'], ['lowrider', 'penguin'], ['tiger', 'sloth'], ['gorilla', 'kangaroo'], ['elephant', 'roadrunner'], ['coyote', 'lion'], ['taco', 'mammoth'], ['churro', 'eagle'], ['pelon', 'gila'], ['boots', 'tri'], ['barksalot', 'javelina']];
    res.push(mk(pairs.filter(([a, b]) => SP[a] && SP[b]).map(([a, b]) => { const r = mashResident(a, b); const k = kitOf(r); return Object.assign({}, k, { label: r.name }); }), 'mash'));
    return res; });
  d.forEach((u, i) => fs.writeFileSync(path.join(__dirname, out, 'gallery_' + ['species', 'mash'][i] + '.png'), Buffer.from(u.split(',')[1], 'base64')));
  await b.close(); })();
