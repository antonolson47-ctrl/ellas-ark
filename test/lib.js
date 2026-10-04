const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '../EllasArk.html');
async function setup(browser, ctxOpts, url) {
  const ctx = await browser.newContext(ctxOpts); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto(url || FILE); await p.waitForFunction(() => window.__EA && __EA.frames > 3); await p.waitForTimeout(400);
  const touch = !!(ctxOpts && ctxOpts.hasTouch);
  const H = {
    p, ctx, errs,
    st: () => p.evaluate(() => __EA.state()),
    ids: () => p.evaluate(() => __EA.hits().map(h => h.id)),
    has: id => p.evaluate(i => !!__EA.hit(i), id),
    async tap(id, wait = 260) { const h = await p.evaluate(i => __EA.hit(i), id); if (!h) return false; if (touch) await p.touchscreen.tap(h.x, h.y); else await p.mouse.click(h.x, h.y); await p.waitForTimeout(wait); return true; },
    async swipe(id, dx) { const h = await p.evaluate(i => __EA.hit(i), id); if (!h) return false; await p.mouse.move(h.x, h.y); await p.mouse.down(); for (let i = 1; i <= 8; i++) await p.mouse.move(h.x + dx * i / 8, h.y); await p.mouse.up(); await p.waitForTimeout(250); return true; },
    async waitHit(id, ms = 6000) { try { await p.waitForFunction(i => !!__EA.hit(i), id, { timeout: ms }); return true; } catch (e) { return false; } },
    shot: (name, dir) => p.screenshot({ path: path.join(dir || path.join(__dirname, 'tmp'), name + '.png') }),
    async skipStory() { await p.evaluate(() => __EA.skipStory()); await p.waitForTimeout(350); },
    async arrivals() { for (let i = 0; i < 12; i++) { const s = await H.st(); if (!s.arrivals || s.phase !== 'morning') break; if (await H.has('arr_open')) await H.tap('arr_open', 900); else if (await H.has('crate')) await H.tap('crate', 900); else if (!(await H.tap('arr_next', 300))) await p.waitForTimeout(300); } },
    async care(n = 12) { for (let i = 0; i < n; i++) { const ids = await H.ids(); const tool = ['tool_feed', 'tool_wash', 'tool_vet', 'tool_play', 'tool_clean', 'tool_sig'][i % 6]; if (ids.includes(tool)) await H.tap(tool, 150); } },
  };
  return H;
}
module.exports = { setup, FILE };
