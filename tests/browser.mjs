import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const URL = process.env.GAME_URL || 'https://jackson-heylion.github.io/gyzh-html/';
const output = 'browser-artifacts';
await mkdir(output, { recursive: true });
const failures = [];
const checks = [];
const hash = b => createHash('sha256').update(b).digest('hex');
const success = (name) => {checks.push(name);console.log('PASS '+name)};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const browser = await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});

async function play(session, mobile=false) {
  const context = await browser.newContext(
    mobile ? {viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}
      : {viewport:{width:1280,height:960},deviceScaleFactor:1}
  );
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e=>errors.push('Page error: '+e.message));
  page.on('console', m=>{if(m.type()==='error' && !/fonts.googleapis.com|fonts.gstatic.com/.test(m.text()))errors.push('Console: '+m.text())});

  const response = await page.goto(URL, {waitUntil:'domcontentloaded',timeout:45000});
  assert.equal(response?.status(),200,'live GitHub Pages must respond HTTP 200');
  await page.waitForFunction(() => Boolean(window.GYArt && document.querySelector('#game')?.width===352), {timeout:20000});
  await pause(400);
  const canvas = page.locator('#game');
  const info = await canvas.evaluate(el=>{
    const rect=el.getBoundingClientRect();
    const ctx=el.getContext('2d');
    const pixels=ctx.getImageData(0,0,el.width,el.height).data;
    let covered=0;
    for(let i=0;i<pixels.length;i+=4000)if(pixels[i]!==0||pixels[i+1]!==0||pixels[i+2]!==0)covered++;
    return {width:el.width,height:el.height,cssWidth:rect.width,cssHeight:rect.height,covered,viewport:innerWidth};
  });
  assert.equal(info.width,352);assert.equal(info.height,440);
  assert.ok(info.covered>10,'Canvas must actually paint artwork');
  assert.ok(info.cssWidth>160,'Canvas should have usable display width');
  if(mobile)assert.ok(info.cssWidth<=info.viewport+1,'Canvas must not overflow mobile viewport');
  success(session+': site loads, HD canvas actually renders at 352×440');
  const title=await canvas.screenshot({path:`${output}/${session}-title.png`});

  // Start a new game: title -> chapter intro dialog -> explorable map.
  if(mobile)await page.locator('[data-key="ok"]').tap();
  else await page.keyboard.press('Enter');
  await pause(150);
  const intro=await canvas.screenshot({path:`${output}/${session}-intro.png`});
  assert.notEqual(hash(intro),hash(title),'starting must change title screen');
  success(session+': starting a game opens a story dialog');
  for(let i=0;i<3;i++){
    if(mobile)await page.locator('[data-key="ok"]').tap();
    else await page.keyboard.press('Enter');
    await pause(125);
  }
  await pause(200);
  const world=await canvas.screenshot({path:`${output}/${session}-world.png`});
  assert.notEqual(hash(world),hash(title),'world view should differ from title');
  assert.notEqual(hash(world),hash(intro),'chapter dialog must dismiss into gameplay');
  success(session+': dialog completes and world renders');

  if(mobile)await page.locator('[data-key="right"]').tap();
  else await page.keyboard.press('ArrowRight');
  await pause(220);
  const moved=await canvas.screenshot({path:`${output}/${session}-moved.png`});
  assert.notEqual(hash(world),hash(moved),'moving right should change game view');
  success(session+': directional controls work');

  if(mobile)await page.locator('[data-key="menu"]').tap();
  else await page.keyboard.press('0');
  await pause(175);
  const menu=await canvas.screenshot({path:`${output}/${session}-menu.png`});
  assert.notEqual(hash(menu),hash(moved),'menu should open');
  success(session+': menu opens successfully');

  if(mobile)await page.locator('[data-key="back"]').tap();
  else await page.keyboard.press('Escape');
  await pause(100);
  await page.locator('#saveBtn').click();
  const saved=await page.evaluate(()=>localStorage.getItem('gyzh2_web_save_v1'));
  assert.ok(saved?.includes('"chapter":0'),'save control must persist chapter state');
  success(session+': save button stores chapter progress');

  if(!mobile){
    await page.keyboard.press('x'); // special attack
    await pause(90);
    await canvas.screenshot({path:`${output}/${session}-attack.png`});
    success(session+': special attack key executes without page crash');
  }
  await page.screenshot({path:`${output}/${session}-full-page.png`,fullPage:true});
  assert.deepEqual(errors,[],'no JavaScript errors allowed');
  success(session+': no JavaScript runtime errors');
  await context.close();
}

try{
 await play('desktop',false);
 await play('mobile',true);
 console.log(`BROWSER PASS: ${checks.length} checks against ${URL}`);
}catch(err){
 console.error('BROWSER FAIL: '+(err.stack||err));
 process.exitCode=1;
}finally{
 await browser.close();
}
