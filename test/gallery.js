// builds a gallery page from src parts and screenshots every species + mashups
const { chromium } = require('/workspace/careys-punchout/test/node_modules/playwright');
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '../src');
const parts = ['10_core.js', '12_draw.js', '14_world.js', '16_people.js', '22_rig.js', '23_heads.js', '24_bodies.js', '26_species.js', '28_mashup.js'];
let js = parts.map(p => fs.readFileSync(path.join(src, p), 'utf8')).join('\n');
const fonts = fs.readFileSync(path.join(__dirname, '../build_assets/fonts.css'), 'utf8');
const mode = process.argv[2] || 'species';
const html = `<!DOCTYPE html><html><head><style>${fonts} body{margin:0;background:#fff}</style></head><body><canvas id="cv"></canvas><div id="safe"></div><script>
${js}
window.onerror=(m)=>{document.title='ERR '+m};
const MODE='${mode}';
cv.width=1600;cv.height=1500;cv.style.width='1600px';
g.fillStyle='#f4ead6';g.fillRect(0,0,1600,1500);
let list=[];
if(MODE==='species'){ list=Object.keys(SP).map(k=>({kit:SP[k].kit,label:SP[k].name})); for(let i=0;i<4;i++){const k=strayKit(100+i*37,i%2==1);k.id='st'+i;k.headType=k.headType||'dog';list.push({kit:k,label:'stray '+i});} }
else { gseed=12345; for(const L of LEGENDS_MASH){const m=makeMash(L.a,L.b);list.push({kit:m.kit,label:m.name});} }
if(MODE==='random'){ list=[]; gseed=999; for(let i=0;i<30;i++){const a=pick(BREEDABLE);let b=pick(BREEDABLE);if(a===b)continue;const m=makeMash(a,b);list.push({kit:m.kit,label:m.name+' ('+a+'+'+b+')'});} }
const cols=7, cw=1600/cols, chh=210;
list.forEach((it,i)=>{const x=(i%cols)*cw, y=Math.floor(i/cols)*chh; const s=getSprite(it.kit); drawSpr(s,x+cw/2,y+chh-30,cw-14,chh-40); g.fillStyle='#222';g.font='13px sans-serif';g.textAlign='center';g.fillText(it.label,x+cw/2,y+chh-12);});
document.title='DONE';
</script></body></html>`;
fs.writeFileSync(path.join(__dirname, 'tmp/gallery.html'), html);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1600, height: 1500 } });
  const errs = []; p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(__dirname, 'tmp/gallery.html')); await p.waitForFunction(() => document.title.startsWith('DONE') || document.title.startsWith('ERR'), null, { timeout: 30000 }).catch(() => {});
  console.log('title', await p.title(), errs.slice(0, 10));
  await p.screenshot({ path: path.join(__dirname, `tmp/gallery_${mode}.png`) }); await b.close();
})();
