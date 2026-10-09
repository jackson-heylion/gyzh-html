import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const src=readFileSync(new URL('../game.js',import.meta.url),'utf8');
let frame=0,now=1000,drawCount=0;
const gfx=new Proxy({imageSmoothingEnabled:false},{get(o,k){if(k in o)return o[k];return (...args)=>{drawCount++}},set(o,k,v){o[k]=v;return true}});
const fakeNode=()=>({innerHTML:'',textContent:'',dataset:{},setAttribute(){},addEventListener(){},requestFullscreen(){},getContext(){return gfx}});
const elements=Object.fromEntries(['#chapterInfo','#saveBtn','#loadBtn','#muteBtn','#fullBtn'].map(k=>[k,fakeNode()]));
const document={getElementById:fakeNode,querySelector:(k)=>elements[k]||fakeNode(),querySelectorAll:()=>[],addEventListener(){}};
const memory=new Map();
const localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,String(v))};
const context={document,window:{addEventListener(){}},localStorage,performance:{now:()=>now},requestAnimationFrame:fn=>{frame++;}};
const exported='\n;globalThis.testApi={game,CHAPTERS,startFresh,nextDialog,storyTalk,sideTalk,bossIntro,attack,defeat,interactExit,saveGame,loadGame,render,tryMove,shopBuy,usePotion,restoreAfterDeath,press,tick};';
runInNewContext(src+exported,context,{filename:'game.js',timeout:5000});
const a=context.testApi;
let checks=0;
function ok(value,msg){assert.ok(value,msg);checks++}
function eq(actual,expected,msg){assert.equal(actual,expected,msg);checks++}
function finishDialog(){let count=0;while(a.game.mode==='dialog'&&count++<30)a.nextDialog();ok(count<30,'dialog completed')}
function setMode(mode){a.game.mode=mode;a.render(now);ok(drawCount>0,'render '+mode)}
setMode('title');
a.startFresh();finishDialog();
eq(a.CHAPTERS.length,9,'nine-story campaign');
eq(a.CHAPTERS[0].boss,'颜良','starts at White Horse');
eq(a.CHAPTERS[1].boss,'文丑','Yan Jin / Wen Chou');
eq(a.game.mode,'play','game begins');
ok(a.game.world.grid.length===21,'map height');
ok(a.game.world.grid.every(row=>row.length===26),'map width');
a.game.hero.x=5;a.game.hero.y=9;a.storyTalk();finishDialog();ok(a.game.talked,'story conversation flags');
a.game.hero.x=9;a.game.hero.y=9;a.game.mode='shop';const money=a.game.hero.gold;a.shopBuy();ok(a.game.hero.gold<money,'shop deducts money');
a.game.mode='play';a.game.hero.x=6;a.game.hero.y=14;a.sideTalk();finishDialog();
ok(a.game.sideAccepted,'side quest started');
for(let i=0;i<3;i++)a.defeat(a.game.world.enemies[i]);
a.sideTalk();finishDialog();ok(a.game.sideDone,'side quest completion');
a.game.hero.gold=222;a.saveGame(false);a.game.hero.gold=0;ok(a.loadGame(),'load accepted');eq(a.game.hero.gold,222,'save restores gold');
a.game.hero.hp=25;const potions=a.game.hero.potions;a.usePotion();ok(a.game.hero.hp===80&&a.game.hero.potions===potions-1,'medicine restores life');
a.game.hero.x=10;a.game.hero.y=9;a.game.hero.dir=1;const enemy=a.game.world.enemies.find(e=>e.alive&&!e.boss);
if(enemy){enemy.x=11;enemy.y=9;const old=enemy.hp;now+=900;a.attack();ok(enemy.hp<old,'real action attack deals damage')}
a.game.hero.x=19;a.game.hero.y=11;a.bossIntro();finishDialog();ok(a.game.bossTalked,'boss introduction');
for(let i=0;i<a.CHAPTERS.length;i++){
 const boss=a.game.world.enemies.find(e=>e.boss&&e.alive);
 ok(boss,'boss spawned in chapter '+i);
 a.defeat(boss);finishDialog();ok(a.game.cleared,'chapter '+i+' boss defeated');
 setMode('play');
 if(i<a.CHAPTERS.length-1){a.interactExit();finishDialog();eq(a.game.chapter,i+1,'chapter transition '+i)}
}
a.interactExit();eq(a.game.mode,'ending','campaign ending');
setMode('ending');setMode('gameover');setMode('map');setMode('status');setMode('inventory');setMode('quest');setMode('menu');setMode('shop');setMode('help');
a.game.mode='gameover';a.restoreAfterDeath();eq(a.game.mode,'play','gameover recovery');
ok(drawCount>500,'Canvas art actually drawn');
console.log('PASS '+checks+' assertions; nine chapters, combat, quests, shop, saves, screen rendering, ending.');
