/* ===================== INPUT: pointer (touch + mouse), wheel, keyboard, lifecycle, re-fit ===================== */
let PID = null;
function vpos(e) { const r = cv.getBoundingClientRect(); return toV(e.clientX - r.left, e.clientY - r.top); }
function onDown(e) {
  if (PID != null && PID !== e.pointerId) return; PID = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch (er) {}
  audioInit(); const [x, y] = vpos(e); const h = hitAt(x, y);
  Object.assign(PTR, { down: true, x, y, sx: x, sy: y, moved: false, t0: performance.now(), id: h ? h.id : null, drag: h && h.o.drag || null, scroll: null, sc0: 0, viewSwipe: false });
  const sa = SCROLLS.slice().reverse().find(s => inR(s.rect, x, y) && s.max > 0); if (sa) { PTR.scroll = sa.key; PTR.sc0 = RT.scroll[sa.key] || 0; }
  if (RT.scene === 'day' && !RT.story && LY.view && inR(LY.view, x, y) && RT.tab === 'ark' && (RT.phase === 'care' || RT.phase === 'morning') && !RT.arrivals.length && !RT.modal) PTR.viewSwipe = true;
  e.preventDefault();
}
function onMove(e) {
  if (e.pointerId !== PID) { if (e.pointerType === 'mouse' && PID == null) { const [x, y] = vpos(e); PTR.hx = x; PTR.hy = y; } return; }
  const [x, y] = vpos(e); PTR.x = x; PTR.y = y; const dx = x - PTR.sx, dy = y - PTR.sy;
  if (Math.hypot(dx, dy) > 10) PTR.moved = true;
  if (PTR.scroll && Math.abs(dy) > 8) { RT.scroll[PTR.scroll] = PTR.sc0 - dy; PTR.scrolling = true; }
}
function onUp(e) {
  if (e.pointerId !== PID) return; PID = null; const [x, y] = vpos(e); const dx = x - PTR.sx, dy = y - PTR.sy; PTR.down = false;
  const wasScroll = PTR.scrolling; PTR.scrolling = false;
  if (PTR.drag === 'call' && RT.call && Math.abs(dx) > 55) { sfx('swish'); answerCall(dx < 0 ? 0 : 1); PTR.drag = null; PTR.id = null; return; }
  PTR.drag = null;
  if (PTR.viewSwipe && Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { const G = gridGeom(); if (G.pages > 1) { RT.page = (RT.page + (dx < 0 ? 1 : -1) + G.pages) % G.pages; sfx('swish'); } PTR.id = null; return; }
  if (wasScroll) { PTR.id = null; return; }
  if (PTR.moved && Math.hypot(dx, dy) > 24) { PTR.id = null; return; }
  const h = hitAt(x, y); const id = PTR.id; PTR.id = null;
  if (h && h.id === id) { try { h.fn(); } catch (er) { console.error(er); } }
}
cv.addEventListener('pointerdown', onDown); addEventListener('pointermove', onMove); addEventListener('pointerup', onUp); addEventListener('pointercancel', e => { if (e.pointerId === PID) { PID = null; PTR.down = false; PTR.id = null; PTR.drag = null; } });
cv.addEventListener('wheel', e => { const [x, y] = vpos(e); const sa = SCROLLS.slice().reverse().find(s => inR(s.rect, x, y) && s.max > 0); if (sa) { RT.scroll[sa.key] = (RT.scroll[sa.key] || 0) + e.deltaY * .6; e.preventDefault(); } }, { passive: false });
['touchend', 'pointerup', 'click', 'keydown'].forEach(ev => document.addEventListener(ev, () => { audioInit(); applyVol(); if (MUS.want >= 0 && !MUS.playing && SETTINGS.music > 0) musicPlay(MUS.want); }, { capture: true, passive: true }));
document.addEventListener('gesturestart', e => e.preventDefault()); document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('visibilitychange', () => { if (document.hidden) { save(); if (RT.scene === 'day' && !RT.settings && RT.phase === 'care') openSettings(); } });
addEventListener('pagehide', () => save());
// ---- keyboard
function clickHit(id) { const h = HITS.find(q => q.id === id); if (h) { h.fn(); return true; } return false; }
function moveSel(d) {
  const G = gridGeom(), list = GS.residents.filter(r => r.st >= 0).sort((a, b) => a.st - b.st); if (!list.length) return;
  let i = list.findIndex(r => r.id === RT.sel); i = i < 0 ? 0 : (i + d + list.length) % list.length; select(list[i]); sfx('tap');
}
addEventListener('keydown', e => {
  const k = e.key, code = e.code; if (e.metaKey || e.ctrlKey) return;
  if (code === 'KeyM') { toggleMute(); toast(SETTINGS.muted ? 'Muted' : 'Sound on', '#cfe8ff', 1); return; }
  if (RT.help) { if (k === 'Escape' || k === 'Enter' || k === ' ') { RT.help = false; } e.preventDefault(); return; }
  if (RT.settings) { if (k === 'Escape' || code === 'KeyP') closeSettings(); e.preventDefault(); return; }
  if (RT.story) { if (k === ' ' || k === 'Enter' || k === 'ArrowRight') { storyAdvance(); e.preventDefault(); } else if (k === 'Escape') storySkip(); return; }
  if (RT.scene === 'title') { if (k === 'Enter' || k === ' ') { e.preventDefault(); if (RT.confirmNew) RT.confirmNew = false; else { audioInit(); startPlay(); } } return; }
  if (RT.scene === 'credits') { if (k === 'Enter' || k === ' ') enterSanctuary(); return; }
  if (RT.scene === 'finale') { const n = parseInt(k, 10); if (n >= 1 && n <= 6) finalePress(n - 1); return; }
  if (RT.scene !== 'day') return;
  if (k === 'Escape' || code === 'KeyP') { openSettings(); e.preventDefault(); return; }
  if (k === 'Tab') { e.preventDefault(); const ids = TABS.map(t => t[0]).filter(t => !tabLocked(t)); setTab(ids[(ids.indexOf(RT.tab) + (e.shiftKey ? -1 : 1) + ids.length) % ids.length]); return; }
  if (RT.arrivals.length) { if (k === 'Enter' || k === ' ') { e.preventDefault(); if (!clickHit('arr_next')) clickHit('arr_open'); } return; }
  if (RT.modal) { if (k === 'Enter' || k === ' ') clickHit('insp_ok'); return; }
  if (RT.phase === 'care') {
    if (k === 'ArrowRight' || code === 'KeyD' && !e.shiftKey) { moveSel(1); e.preventDefault(); return; }
    if (k === 'ArrowLeft') { moveSel(-1); e.preventDefault(); return; }
    if (k === 'ArrowDown') { moveSel(gridGeom().cols); e.preventDefault(); return; }
    if (k === 'ArrowUp') { moveSel(-gridGeom().cols); e.preventDefault(); return; }
    const n = parseInt(k, 10); if (n >= 1 && n <= 6) { doCare(TOOLS[n - 1][0]); return; }
    if (code === 'KeyQ' && RT.call) { answerCall(0); return; } if (code === 'KeyE' && RT.call) { answerCall(1); return; }
    if (k === ' ' || k === 'Enter') { e.preventDefault(); const r = selRes(); if (r) { const t = TOOLS.find(([kk]) => needsIt(kk, r)); if (t) doCare(t[0]); } else moveSel(1); return; }
  }
  if (RT.phase === 'open') { if (k === 'ArrowRight') { clickHit('pick_next'); return; } if (k === 'ArrowLeft') { clickHit('pick_prev'); return; } if (code === 'KeyA' || k === 'Enter') { approve(); return; } if (code === 'KeyD' || k === 'Backspace') { deny(); return; } if (k === '1') ask('home'); if (k === '2') ask('day'); if (k === '3') ask('past'); return; }
  if (RT.phase === 'report') { if (RT.bench) return; if (k === ' ' || k === 'Enter') { e.preventDefault(); if (RT.romance) { if (!clickHit('next_day')) RT.romance.t = 5; } else if (!clickHit('romance')) clickHit('next_day'); } }
});
// ---- re-fit on resize / rotation (no cropping: virtual canvas re-fits inside the safe area)
let fitTimer = 0;
function refit() { layout(); clearTimeout(fitTimer); fitTimer = setTimeout(layout, 250); setTimeout(layout, 700); }
addEventListener('resize', refit); addEventListener('orientationchange', refit); if (window.visualViewport) visualViewport.addEventListener('resize', refit);
if (screen.orientation && screen.orientation.addEventListener) screen.orientation.addEventListener('change', refit);
