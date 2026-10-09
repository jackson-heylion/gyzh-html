/* 关羽正传Ⅱ · Original HTML5 homage for 176×220 KJava-era screens.
   All game art is generated using Canvas primitives; no original JAR assets. */
const canvas=document.getElementById('game'), g=canvas.getContext('2d',{alpha:false});
// Logical coordinates stay at 176x220 for backwards compatible gameplay and save files.
// Rendering happens in a true 352x440 backing store; HDArt paints at half-logical-pixel precision.
const W=176,H=220,T=16,RENDER_SCALE=2,SAVE='gyzh2_web_save_v1';
g.imageSmoothingEnabled=false;
g.setTransform(RENDER_SCALE,0,0,RENDER_SCALE,0,0);
const $=s=>document.querySelector(s), clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const CHAPTERS=[
 {
  "name": "白马坡·斩颜良",
  "year": "建安五年 · 200",
  "biome": "autumn",
  "leader": "曹操",
  "boss": "颜良",
  "rank": 1,
  "intro": [
   "建安五年，刘备兵败失散。关羽为保护二位嫂嫂，暂栖曹营。",
   "袁绍大将颜良围困白马，曹军诸将难敌。关羽决意斩将报恩。"
  ],
  "talk": [
   "曹操：颜良勇猛，诸军难当。云长能否助我破敌？",
   "关羽：昔日承丞相厚恩，今日愿立此功以报。",
   "赶往白马坡，击破颜良！"
  ],
  "pre": [
   "颜良：白马营前，何人敢战？",
   "关羽：河东关云长在此！"
  ],
  "win": [
   "马到阵前，刀光一闪。颜良败亡，白马之围遂解。"
  ],
  "tip": "白马坡斩颜良",
  "theme": 1
 },
 {
  "name": "延津·诛文丑",
  "year": "建安五年 · 200",
  "biome": "autumn",
  "leader": "曹操",
  "boss": "文丑",
  "rank": 2,
  "intro": [
   "白马之围既解，袁绍复遣文丑领军逼近延津。曹军辎重未整，危机四伏。",
   "关羽为报曹操知遇之恩，再请出战。"
  ],
  "talk": [
   "曹操：文丑率精骑逼近延津，我军阵脚未稳。",
   "关羽：颜良已败，文丑何足道哉？请丞相静候捷报。",
   "前往延津关道，截击文丑！"
  ],
  "pre": [
   "文丑：关羽！吾来为颜良报仇！",
   "关羽：两军交锋，且凭手中刀说话！"
  ],
  "win": [
   "延津一战，文丑军败。关羽报恩之心已遂，愈发思念故主刘备。"
  ],
  "tip": "延津迎敌，诛文丑",
  "theme": 1
 },
 {
  "name": "许昌·挂印封金",
  "year": "建安五年 · 200",
  "biome": "fort",
  "leader": "孙乾",
  "boss": "曹军校尉",
  "rank": 3,
  "intro": [
   "故主刘备已有消息。关羽封存汉寿亭侯印，留书辞曹。",
   "富贵不能移其志，他决意护送二位嫂嫂，千里寻兄。"
  ],
  "talk": [
   "孙乾：将军既已得知玄德公下落，速往北方与之会合！",
   "关羽：曹公恩义，容日后再报；兄长之约，今日必践。"
  ],
  "pre": [
   "曹军校尉：无丞相通关文书，不得擅离！",
   "关羽：关某心意已决，请恕难从命。"
  ],
  "win": [
   "关羽辞别曹营，保护车驾，踏上千里单骑之路。"
  ],
  "tip": "告别许昌，北寻刘备",
  "theme": 2
 },
 {
  "name": "东岭关·斩孔秀",
  "year": "建安五年 · 200",
  "biome": "autumn",
  "leader": "车夫",
  "boss": "孔秀",
  "rank": 4,
  "intro": [
   "行至东岭关，守将孔秀索要过关文书。",
   "关羽不愿生事，却也绝不能抛下嫂嫂。"
  ],
  "talk": [
   "车夫：前方东岭关盘查甚严，将军千万小心。",
   "关羽：只须随我前行，何惧阻挠！"
  ],
  "pre": [
   "孔秀：没有通关文书，谁也不准过去！",
   "关羽：关某礼数已尽，休要逼人！"
  ],
  "win": [
   "东岭关已破，车驾继续向北。"
  ],
  "tip": "过东岭关，斩孔秀",
  "theme": 1
 },
 {
  "name": "洛阳·战韩福",
  "year": "建安五年 · 200",
  "biome": "fort",
  "leader": "旅人",
  "boss": "韩福·孟坦",
  "rank": 5,
  "intro": [
   "洛阳太守韩福暗布弓弩，诈以好言相迎。",
   "关羽识破埋伏，决意突围。"
  ],
  "talk": [
   "旅人：听说韩福与孟坦设下伏兵，切勿轻信。",
   "关羽：谢过告知。明枪易躲，暗箭却须提防。"
  ],
  "pre": [
   "韩福：关羽！今日便叫你有来无回！",
   "关羽：尔等阴谋已露，何必再遮掩！"
  ],
  "win": [
   "洛阳伏兵溃散，前路虽险，关羽毫无退意。"
  ],
  "tip": "识破韩福埋伏",
  "theme": 2
 },
 {
  "name": "汜水关·识破卞喜",
  "year": "建安五年 · 200",
  "biome": "spring",
  "leader": "普净",
  "boss": "卞喜",
  "rank": 6,
  "intro": [
   "汜水关镇国寺，卞喜欲假借宴席设伏，谋害关羽。"
  ],
  "talk": [
   "普净：贫僧与将军有旧，特来相告：宴后刀斧手已伏在侧。",
   "关羽：多谢长老指点。此恩铭记于心。"
  ],
  "pre": [
   "卞喜：关将军何故不入席？",
   "关羽：席中暗藏杀机，汝尚不自知？"
  ],
  "win": [
   "卞喜伏诛，普净合掌相送，关羽再上征程。"
  ],
  "tip": "揭穿卞喜毒计",
  "theme": 0
 },
 {
  "name": "荥阳·火夜斩王植",
  "year": "建安五年 · 200",
  "biome": "autumn",
  "leader": "胡班",
  "boss": "王植",
  "rank": 7,
  "intro": [
   "荥阳太守王植欲夜间纵火烧死关羽一行。",
   "幸得胡班示警，忠义之士得以脱险。"
  ],
  "talk": [
   "胡班：家父有书嘱我敬重关将军。王植已命军士放火，请速离城！",
   "关羽：壮士高义，容日后相报。"
  ],
  "pre": [
   "王植：识破火计又如何？还不束手就擒！",
   "关羽：害人之心，终有报应！"
  ],
  "win": [
   "夜火映天，关羽突围而去，荥阳再不可留。"
  ],
  "tip": "逃出火城，战王植",
  "theme": 1
 },
 {
  "name": "黄河渡·斩秦琪",
  "year": "建安五年 · 200",
  "biome": "river",
  "leader": "渡船翁",
  "boss": "秦琪",
  "rank": 8,
  "intro": [
   "黄河渡口，守将秦琪挡住船路。",
   "至此已历四关，最后一渡就在眼前。"
  ],
  "talk": [
   "渡船翁：将军，只要清除河岸兵马，老汉便可驾船送你们过河。",
   "关羽：有劳老丈，关某去去便回。"
  ],
  "pre": [
   "秦琪：不留首级，休想乘船！",
   "关羽：好言不听，自取灭亡！"
  ],
  "win": [
   "五关六将，终成传奇。渡过黄河，兄弟团聚已在眼前。"
  ],
  "tip": "斩秦琪，渡黄河",
  "theme": 3
 },
 {
  "name": "古城·兄弟重逢",
  "year": "建安五年 · 200",
  "biome": "spring",
  "leader": "张飞",
  "boss": "蔡阳",
  "rank": 9,
  "intro": [
   "关羽抵达古城，张飞误以为兄长已投曹。",
   "为释疑虑，关羽当面斩将，以忠义之心证明清白。"
  ],
  "talk": [
   "张飞：二哥！你既在曹营，怎又来寻我们？",
   "关羽：兄弟情义岂可相负？待我斩此追将，再细细分说。"
  ],
  "pre": [
   "蔡阳：关羽，哪里逃！",
   "关羽：正好以尔之败，明我一片丹心！"
  ],
  "win": [
   "鼓声未歇，蔡阳已败。三兄弟重逢，百感交集。"
  ],
  "tip": "战蔡阳，解兄弟误会",
  "theme": 0
 }
];
const ITEMS=[{name:'金疮药',cost:35,desc:'恢复生命 55 点'},{name:'回气散',cost:42,desc:'恢复真气 30 点'},{name:'精炼偃月刀',cost:95,desc:'攻击力 +5（逐级强化）'},{name:'精钢战甲',cost:85,desc:'防御力 +3（逐级强化）'}];
const baseHero=()=>({x:3,y:11,dir:1,hp:100,mp:40,level:1,xp:0,gold:75,potions:4,ethers:2,weapon:0,armor:0,kills:0});
const saveExists=()=>{try{return !!localStorage.getItem(SAVE)}catch{return false}};
const game={mode:'title',hero:baseHero(),chapter:0,world:null,talked:false,bossTalked:false,cleared:false,sideDone:false,sideAccepted:false,sideCount:0,menuIndex:0,shopIndex:0,inventoryIndex:0,titleIndex:0,dialog:[],dialogIndex:0,afterDialog:null,clock:0,time:0,last:performance.now(),camera:{x:0,y:0},log:[],floaters:[],effects:[],muted:true,audio:null,audioTime:0,walkAt:0,attackAt:0,skillAt:0,hurtAt:0,autosaveAt:0,toastText:'',toastUntil:0};
const maxHp=()=>100+(game.hero.level-1)*16;
const maxMp=()=>40+(game.hero.level-1)*5;
const heroAtk=()=>14+game.hero.level*2+game.hero.weapon*5;
const heroDef=()=>3+Math.floor(game.hero.level/2)+game.hero.armor*3;
const noise=(x,y,n=0)=>{let v=(x*374761393+y*668265263+n*1442695041)|0;v=Math.imul(v^(v>>>13),1274126177);return ((v^(v>>>16))>>>0)/4294967295};
function worldBuild(){
 const c=CHAPTERS[game.chapter], grid=[];
 for(let y=0;y<21;y++){const row=[];for(let x=0;x<26;x++){
  let z=noise(x,y,game.chapter+11),t=0;
  if(c.biome==='fort')t=z>.84?7:1;
  else if(c.biome==='snow')t=z>.82?7:0;
  else t=z>.74?1:0;
  if(y>=10&&y<=12)t=2;
  if(x===0||y===0||x===25||y===20)t=5;
  if(x>19&&x<25&&y<9)t=7;
  if(x>19&&x<25&&y>13)t=7;
  if(c.biome==='river'&&x>=13&&x<=14){t=(y>=10&&y<=12)?8:4}
  if(c.biome==='spring'&&z>.92)t=9;
  if(c.biome==='autumn'&&z>.92)t=10;
  if(c.biome==='snow'&&z>.94)t=11;
  if(x>0&&x<25&&y>0&&y<20&&!(y>=9&&y<=13)&&!(x>=4&&x<=9&&y>=6&&y<=15)&&!(x>=17&&x<=24&&y>=9&&y<=13)){
    if(noise(x*5,y*7,game.chapter*13)>.89)t=5;
  }
  row.push(t);
 }grid.push(row)}
 // huts, shrine and market, clear paths
 for(const [x,y] of [[6,6],[10,6],[4,16]]){for(let yy=y;yy<y+3;yy++)for(let xx=x;xx<x+3;xx++)grid[yy][xx]=6;grid[y+2][x+1]=12;grid[y+3][x+1]=2}
 for(let x=2;x<24;x++)for(let y=10;y<=12;y++)if(!(c.biome==='river'&&(x===13||x===14)))grid[y][x]=2;
 for(let y=8;y<=14;y++)for(let x=3;x<=11;x++)if(grid[y][x]===5)grid[y][x]=0;
 // east keep border wall, explicit doorway
 for(let y=2;y<19;y++){grid[y][22]=(y>=10&&y<=12)?2:7}
 grid[11][24]=13;
 const enemies=[];
 const bandits=[{x:11,y:9},{x:12,y:14},{x:16,y:9},{x:16,y:14},{x:18,y:15},{x:15,y:12}];
 bandits.forEach((p,i)=>{const tile=grid[p.y][p.x];if(tile===5||tile===4||tile===6)grid[p.y][p.x]=1;enemies.push({id:'e'+i,x:p.x,y:p.y,hp:27+game.chapter*6,max:27+game.chapter*6,atk:5+Math.floor(game.chapter/2),name:game.chapter>9?'精锐守兵':'乱军士卒',boss:false,alive:true,moveAt:0,hitAt:0,type:i%3})});
 if(!game.cleared)enemies.push({id:'boss',x:19,y:11,hp:80+game.chapter*27,max:80+game.chapter*27,atk:9+game.chapter*2,name:c.boss,boss:true,alive:true,moveAt:0,hitAt:0,type:3});
 return {grid,enemies};
}
function startFresh(){
 game.hero=baseHero();game.chapter=0;game.talked=false;game.bossTalked=false;game.cleared=false;game.sideAccepted=false;game.sideDone=false;game.sideCount=0;
 chapterEnter(true);
}
function chapterEnter(first=false){
 game.world=worldBuild();game.hero.x=3;game.hero.y=11;game.hero.dir=1;game.mode='play';game.effects=[];game.floaters=[];game.hurtAt=0;
 const c=CHAPTERS[game.chapter];
 writeChapterInfo();
 queueDialog(['【第'+(game.chapter+1)+'回】'+c.name+'　'+c.year,...c.intro],()=>{toast('任务：'+c.tip,3000)});
 if(!first)saveGame(false);
}
function writeChapterInfo(){
 const c=CHAPTERS[game.chapter], el=$('#chapterInfo');
 if(el)el.innerHTML='<strong>第 '+(game.chapter+1)+' / '+CHAPTERS.length+' 回 · '+c.name+'</strong><div>'+c.year+'</div><div>目标：'+c.tip+'</div><div>武力 '+heroAtk()+' · 防御 '+heroDef()+' · 等级 '+game.hero.level+'</div>';
}
function queueDialog(lines,done){
 game.dialog=lines.map(String);game.dialogIndex=0;game.afterDialog=done||null;game.mode='dialog';sound('dialog');
}
function nextDialog(){
 game.dialogIndex++;
 if(game.dialogIndex>=game.dialog.length){
  game.mode='play';game.dialog=[];const done=game.afterDialog;game.afterDialog=null;if(done)done();
 }else sound('dialog');
}
function toast(str,ms=1900){game.toastText=str;game.toastUntil=performance.now()+ms}
function float(text,x,y,color='#fff1a2'){game.floaters.push({text,x,y,t:performance.now(),color})}
function saveGame(notify=true){if(game.mode==='title')return false;try{
 const {hero,chapter,talked,bossTalked,cleared,sideAccepted,sideDone,sideCount}=game;
 localStorage.setItem(SAVE,JSON.stringify({v:1,hero,chapter,talked,bossTalked,cleared,sideAccepted,sideDone,sideCount,saved:Date.now()}));
 if(notify)toast('进度已保存');return true;
 }catch{toast('存档不可用，请检查浏览器设置');return false}}
function loadGame(){try{
 const raw=localStorage.getItem(SAVE);if(!raw){toast('还没有存档');return false}
 const s=JSON.parse(raw);if(s.v!==1||!Number.isInteger(s.chapter)||s.chapter<0||s.chapter>=CHAPTERS.length||!s.hero)throw Error('invalid save');
 game.chapter=s.chapter;game.hero={...baseHero(),...s.hero};game.hero.hp=clamp(game.hero.hp,1,maxHp());game.hero.mp=clamp(game.hero.mp,0,maxMp());
 for(const k of ['talked','bossTalked','cleared','sideAccepted','sideDone'])game[k]=!!s[k];
 game.sideCount=clamp(Number(s.sideCount)||0,0,10);game.world=worldBuild();
 game.hero.x=clamp(Math.trunc(game.hero.x),1,24);game.hero.y=clamp(Math.trunc(game.hero.y),1,19);
 if(!canWalk(game.hero.x,game.hero.y))game.hero.x=3,game.hero.y=11;
 game.mode='play';game.effects=[];game.floaters=[];writeChapterInfo();toast('已读取存档');return true;
 }catch{toast('存档损坏或无法读取');return false}}
function canWalk(x,y){const t=game.world?.grid[y]?.[x];return t!==undefined&&![4,5,6,7].includes(t)}
function occupied(x,y){return game.world.enemies.some(e=>e.alive&&e.x===x&&e.y===y)}
function tryMove(dx,dy){
 if(game.mode!=='play')return;
 const now=performance.now();if(now<game.walkAt)return;game.walkAt=now+98;
 const h=game.hero;h.dir=dx?dx>0?1:3:dy>0?2:0;
 const x=h.x+dx,y=h.y+dy;
 if(!canWalk(x,y)){sound('bump');return}
 if(occupied(x,y)){attack();return}
 if(x===24&&y===11){interactExit();return}
 h.x=x;h.y=y;
 if(game.clock%3===0)game.effects.push({type:'dust',x,y,t:now});
 if(game.world.enemies.some(e=>e.alive&&!e.boss&&Math.abs(e.x-x)+Math.abs(e.y-y)<4))sound('step');
}
function near(ax,ay,bx,by,range=1){return Math.abs(ax-bx)+Math.abs(ay-by)<=range}
function interaction(){
 if(game.mode!=='play')return;
 const h=game.hero;
 if(near(h.x,h.y,5,9,2)){storyTalk();return}
 if(near(h.x,h.y,9,9,2)){game.mode='shop';game.shopIndex=0;sound('menu');return}
 if(near(h.x,h.y,6,14,2)){sideTalk();return}
 if(near(h.x,h.y,4,13,1)){if(h.gold>=12){h.gold-=12;h.hp=maxHp();h.mp=maxMp();toast('客栈休息：恢复气血真气 -12 钱');sound('heal')}else toast('休息需要 12 钱');return}
 if(near(h.x,h.y,24,11,2)){interactExit();return}
 const boss=game.world.enemies.find(e=>e.boss&&e.alive);
 if(boss&&near(h.x,h.y,boss.x,boss.y,2)){bossIntro();return}
 toast('前方无人可交谈');
}
function storyTalk(){const c=CHAPTERS[game.chapter];queueDialog(game.talked?['【'+c.leader+'】',c.tip+'。','一路小心，保重。']:['【'+c.leader+'】',...c.talk],()=>{game.talked=true;saveGame(false)})}
function sideTalk(){
 if(game.sideDone){queueDialog(['【乡间老者】','大侠除恶安民，乡亲们都记在心里。']);return}
 if(game.sideAccepted&&game.sideCount>=3){
  game.sideDone=true;game.hero.gold+=75;game.hero.potions++;queueDialog(['【乡间老者】','多谢将军除去三名恶徒！薄礼七十五钱与金疮药一瓶，还请笑纳。'],()=>{toast('支线完成：+75钱 +金疮药');saveGame(false)});return;
 }
 if(game.sideAccepted){queueDialog(['【乡间老者】','村外贼兵尚未肃清。已消灭：'+Math.min(3,game.sideCount)+'/3。']);return}
 game.sideAccepted=true;queueDialog(['【乡间老者】','附近军兵扰民，能否击退三名贼兵？酬谢七十五钱与一瓶金疮药。','关羽：惩恶安民，义不容辞。'],()=>toast('支线：击退 3 名普通敌人'));
}
function bossIntro(){if(game.bossTalked)return;game.bossTalked=true;const c=CHAPTERS[game.chapter];queueDialog(['【'+c.boss+'】',...c.pre],()=>{toast('首领战 · '+c.boss,2400);sound('boss')})}
function interactExit(){
 if(!game.cleared){queueDialog(['【关隘守卫】','前方关口尚未肃清。请先击败'+CHAPTERS[game.chapter].boss+'！']);return}
 if(game.chapter===CHAPTERS.length-1){finish();return}
 game.chapter++;game.talked=false;game.bossTalked=false;game.cleared=false;game.sideAccepted=false;game.sideDone=false;game.sideCount=0;game.hero.hp=clamp(game.hero.hp+40,1,maxHp());game.hero.mp=maxMp();chapterEnter();
}
function attack(power=false){
 if(game.mode!=='play')return;
 const h=game.hero, now=performance.now();
 if(power){if(now<game.skillAt)return;if(h.mp<12){toast('真气不足，青龙斩需 12 点真气');sound('bump');return}h.mp-=12;game.skillAt=now+650;game.attackAt=now+340}
 else {if(now<game.attackAt)return;game.attackAt=now+250;h.mp=Math.min(maxMp(),h.mp+1)}
 const dv=[[0,-1],[1,0],[0,1],[-1,0]][h.dir],cx=h.x+dv[0],cy=h.y+dv[1];
 game.effects.push({type:power?'special':'slash',x:h.x,y:h.y,dir:h.dir,t:now});
 sound(power?'special':'slash');
 let count=0;
 for(const e of game.world.enemies){
  if(!e.alive)continue;
  const ex=e.x-h.x,ey=e.y-h.y,dist=Math.abs(ex)+Math.abs(ey),front=ex*dv[0]+ey*dv[1];
  const isHit=power?dist<=3&&front>=-1:(dist<=2&&front>=1&&(Math.abs(ex*dv[1]-ey*dv[0])<=1));
  if(!isHit)continue;
  if(e.boss&&!game.bossTalked){bossIntro();continue}
  const crit=noise(Math.floor(now),e.x,e.y)>.87;
  // Boss toughness is applied separately to keep the damage formula predictable.
  const actual=Math.max(3,Math.floor(heroAtk()*(power?2:1)*(crit?1.5:1)-(e.boss?game.chapter*.6:0)));
  e.hp-=actual;count++;float((crit?'暴击 ':'-')+actual,e.x,e.y,crit?'#ffe287':'#fff1a2');
  game.effects.push({type:'hit',x:e.x,y:e.y,t:now});
  if(e.hp<=0)defeat(e);
 }
 if(!count)float('挥刀',cx,cy,'#d7e3b0');
}
function defeat(e){
 e.alive=false;const h=game.hero;h.kills++;
 const xp=e.boss?50+game.chapter*16:8+game.chapter*3,gold=e.boss?95+game.chapter*16:7+game.chapter*2;
 h.gold+=gold;h.xp+=xp;float('+'+xp+'经验',e.x,e.y-1,'#7ef0ba');
 sound('victory');
 if(!e.boss){
  if(game.sideAccepted&&!game.sideDone)game.sideCount++;
  if(noise(e.x,e.y,game.clock+17)>.68){h.potions++;toast('获得金疮药 ×1')}
 }else{
  game.cleared=true;h.hp=Math.min(maxHp(),h.hp+35);h.mp=Math.min(maxMp(),h.mp+12);
  queueDialog(['【'+CHAPTERS[game.chapter].boss+' 败北】',...CHAPTERS[game.chapter].win,'获得 '+gold+' 钱、'+xp+' 经验！从东边关隘继续前行。'],()=>{saveGame(false);toast('已打通关隘 · 请前往东侧 →',3200)});
 }
 let threshold=48+h.level*24;
 while(h.xp>=threshold){h.xp-=threshold;h.level++;h.hp=maxHp();h.mp=maxMp();float('升级！',h.x,h.y-1,'#ffdf7e');toast('升级至 '+h.level+' 级，气血真气已恢复');sound('level');threshold=48+h.level*24}
 writeChapterInfo();
}
function hurt(amount){
 if(game.mode!=='play')return;const now=performance.now();if(now<game.hurtAt)return;
 game.hurtAt=now+500;const h=game.hero;const actual=Math.max(1,Math.round(amount-heroDef()*.55));h.hp=Math.max(0,h.hp-actual);
 game.effects.push({type:'hurt',x:h.x,y:h.y,t:now});float('-'+actual,h.x,h.y-1,'#fa897c');sound('hurt');
 if(h.hp<=0){game.mode='gameover';game.menuIndex=0;sound('death')}
}
function usePotion(type='hp'){
 const h=game.hero;
 if(type==='hp'){if(!h.potions){toast('金疮药不足');return}if(h.hp>=maxHp()){toast('气血已满');return}h.potions--;h.hp=Math.min(maxHp(),h.hp+55);toast('服用金疮药 +55 气血')}
 else {if(!h.ethers){toast('回气散不足');return}if(h.mp>=maxMp()){toast('真气已满');return}h.ethers--;h.mp=Math.min(maxMp(),h.mp+30);toast('服用回气散 +30 真气')}
 sound('heal');
}
function shopBuy(){
 const i=game.shopIndex, item=ITEMS[i],h=game.hero;
 const cost=i===2?item.cost*(h.weapon+1):i===3?item.cost*(h.armor+1):item.cost;
 if(h.gold<cost){toast('钱币不足：需要 '+cost);sound('bump');return}
 if(i>=2&&((i===2?h.weapon:h.armor)>=7)){toast('装备已强化至上限');return}
 h.gold-=cost;
 if(i===0)h.potions++;
 if(i===1)h.ethers++;
 if(i===2)h.weapon++;
 if(i===3)h.armor++;
 sound('buy');toast('购得 '+item.name);writeChapterInfo();saveGame(false);
}
function showMenu(){if(game.mode==='play'){game.mode='menu';game.menuIndex=0;sound('menu')}else if(game.mode==='menu'){game.mode='play'}else if(['shop','status','inventory','quest','map','help'].includes(game.mode)){game.mode='menu';game.menuIndex=0}}
function menuChoose(){
 const i=game.menuIndex;
 if(i===0)game.mode='status';
 if(i===1){game.mode='inventory';game.inventoryIndex=0}
 if(i===2)game.mode='quest';
 if(i===3)game.mode='map';
 if(i===4){saveGame();game.mode='play'}
 if(i===5)game.mode='help';
 if(i===6)game.mode='title',game.titleIndex=1;
 sound('menu');
}
function finish(){game.mode='ending';game.menuIndex=0;try{const s=JSON.parse(localStorage.getItem(SAVE)||'{}');s.finished=true;localStorage.setItem(SAVE,JSON.stringify(s))}catch{}}
function restoreAfterDeath(){const h=game.hero;h.hp=maxHp();h.mp=maxMp();h.gold=Math.max(0,h.gold-40);h.x=3;h.y=11;game.world=worldBuild();game.mode='play';toast('返回营地，损失 40 钱');saveGame(false)}
function direction(dx,dy){if(['menu','shop','title','inventory','gameover','ending'].includes(game.mode)){const length=game.mode==='menu'?7:game.mode==='shop'?ITEMS.length:game.mode==='title'?3:game.mode==='inventory'?2:game.mode==='gameover'?2:2;const key=game.mode==='shop'?'shopIndex':game.mode==='title'?'titleIndex':game.mode==='inventory'?'inventoryIndex':'menuIndex';const delta=dy||dx;game[key]=(game[key]+(delta>0?1:-1)+length)%length;sound('menu')}else if(game.mode==='play')tryMove(dx,dy)}
function confirm(){
 switch(game.mode){
 case 'title':if(game.titleIndex===0)startFresh();else if(game.titleIndex===1)loadGame();else game.mode='help';break;
 case 'dialog':nextDialog();break;
 case 'play':if(near(game.hero.x,game.hero.y,5,9,2)||near(game.hero.x,game.hero.y,9,9,2)||near(game.hero.x,game.hero.y,6,14,2)||near(game.hero.x,game.hero.y,24,11,2))interaction();else attack();break;
 case 'menu':menuChoose();break;
 case 'shop':shopBuy();break;
 case 'inventory':usePotion(game.inventoryIndex===0?'hp':'mp');break;
 case 'gameover':if(game.menuIndex===0)restoreAfterDeath();else if(!loadGame())restoreAfterDeath();break;
 case 'ending':if(game.menuIndex===0){game.mode='title';game.titleIndex=0}else{startFresh()}break;
 default:game.mode='play';
 }
}
function back(){
 if(game.mode==='dialog'){nextDialog();return}
 if(game.mode==='title'){return}
 if(game.mode==='play'){interaction();return}
 if(['status','quest','inventory','map','shop','help'].includes(game.mode)){game.mode='menu';return}
 if(game.mode==='menu'){game.mode='play';return}
 if(game.mode==='gameover'){restoreAfterDeath()}
}
function press(k){
 if(['up','down','left','right'].includes(k)){const v={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[k];direction(...v);return}
 if(k==='ok'){confirm();return}
 if(k==='back'){back();return}
 if(k==='menu'||k==='0'){showMenu();return}
 if(k==='star'){attack(true);return}
 if(k==='hash'){if(game.mode==='play')usePotion();return}
 if(k==='5'){confirm();return}
 if(k==='2'){direction(0,-1);return}
 if(k==='8'){direction(0,1);return}
 if(k==='4'){direction(-1,0);return}
 if(k==='6'){direction(1,0);return}
 if(game.mode==='play'&&k==='1')game.mode='status';
 if(game.mode==='play'&&k==='3')game.mode='quest';
 if(game.mode==='play'&&k==='7')game.mode='inventory',game.inventoryIndex=0;
 if(game.mode==='play'&&k==='9')game.mode='map';
}
const keyMap={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right',Enter:'ok',' ':'5',z:'back',Z:'back',Escape:'back',Backspace:'back',m:'menu',M:'menu',e:'menu',E:'menu',x:'star',X:'star',h:'hash',H:'hash','*':'star','#':'hash',q:'menu',Q:'menu'};
document.addEventListener('keydown',e=>{const k=keyMap[e.key]||e.key;if(['up','down','left','right','ok','back','menu','star','hash','0','1','2','3','4','5','6','7','8','9'].includes(k)){e.preventDefault();if(e.repeat&&game.mode!=='play')return;press(k)}});
let hold=null;
document.querySelectorAll('[data-key]').forEach(b=>{
 b.addEventListener('pointerdown',e=>{e.preventDefault();const key=b.dataset.key;try{b.setPointerCapture(e.pointerId)}catch{}press(key);
  if(['up','down','left','right'].includes(key)){clearInterval(hold);hold=setInterval(()=>press(key),140)}
 });
 for(const name of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(name,()=>{clearInterval(hold);hold=null});
});
window.addEventListener('blur',()=>{clearInterval(hold);hold=null});
$('#saveBtn').addEventListener('click',()=>saveGame());
$('#loadBtn').addEventListener('click',()=>loadGame());
$('#muteBtn').addEventListener('click',()=>{game.muted=!game.muted;if(!game.muted)ensureAudio();$('#muteBtn').textContent=game.muted?'♫ 开启声音':'♫ 关闭声音';$('#muteBtn').setAttribute('aria-pressed',String(!game.muted));if(!game.muted)sound('buy')});
$('#fullBtn').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else canvas.requestFullscreen?.()});
function ensureAudio(){if(game.audio)return;try{game.audio=new(window.AudioContext||window.webkitAudioContext)()}catch{}}
function tone(f,d=.07,type='square',vol=.035,delay=0){if(game.muted)return;ensureAudio();if(!game.audio)return;try{if(game.audio.state==='suspended')game.audio.resume();const a=game.audio,t=a.currentTime+delay,o=a.createOscillator(),v=a.createGain();o.type=type;o.frequency.value=f;v.gain.setValueAtTime(vol,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(a.destination);o.start(t);o.stop(t+d+.02)}catch{}}
function sound(kind){
 if(game.muted)return;
 const specs={dialog:[[600,.024]],menu:[[490,.023]],bump:[[170,.045]],step:[[160,.018]],slash:[[220,.05],[480,.07]],special:[[240,.1],[370,.1],[580,.16]],hit:[[250,.06]],hurt:[[110,.12]],heal:[[500,.08],[750,.13]],buy:[[500,.06],[660,.09]],victory:[[660,.06],[880,.12]],boss:[[180,.16],[230,.18]],death:[[260,.1],[170,.18]],level:[[520,.06],[660,.08],[880,.14]]};
 let offset=0;for(const [f,d] of specs[kind]||[]){tone(f,d,'square',kind==='step'?.009:.023,offset);offset+=d*.66}
}
function music(now){if(game.muted||game.mode==='title'||!game.audio||now<game.audioTime)return;game.audioTime=now+320;
 const notes=[220,293.66,329.63,392,329.63,293.66,246.94,220,196,246.94,293.66,329.63,293.66,246.94,220,164.81];
 const beat=Math.floor(now/320)%notes.length;tone(notes[beat],.17,'triangle',.006);if(beat%4===0)tone(notes[beat]/2,.24,'sine',.009);
}
function tick(now){
 const dt=Math.min(60,now-game.last);game.last=now;game.time+=dt;
 if(game.mode==='play'&&game.world){
  game.clock++;
  if(game.clock%24===0){const h=game.hero;h.mp=Math.min(maxMp(),h.mp+1)}
  for(const e of game.world.enemies){if(!e.alive)continue;
   const h=game.hero,dist=Math.abs(e.x-h.x)+Math.abs(e.y-h.y);
   if(e.boss&&!game.bossTalked)continue;
   if(dist<=1&&now>e.hitAt){e.hitAt=now+(e.boss?1200:1600);hurt(e.atk);continue}
   if(now<e.moveAt||dist>5||dist<2)continue;
   e.moveAt=now+(e.boss?510:750)+noise(e.x,e.y,game.clock)*280;
   const dx=Math.sign(h.x-e.x),dy=Math.sign(h.y-e.y);
   const opts=Math.abs(dx)>Math.abs(dy)?[[dx,0],[0,dy]]:[[0,dy],[dx,0]];
   for(const [ox,oy] of opts){if(!ox&&!oy)continue;const nx=e.x+ox,ny=e.y+oy;
    if(canWalk(nx,ny)&&!(nx===h.x&&ny===h.y)&&!occupied(nx,ny)&&!(nx===5&&ny===9)&&!(nx===9&&ny===9)){e.x=nx;e.y=ny;break}
   }
  }
  music(now);
 }
 game.floaters=game.floaters.filter(e=>now-e.t<780);
 game.effects=game.effects.filter(e=>now-e.t<(e.type==='special'?430:300));
 render(now);requestAnimationFrame(tick);
}
const rect=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h))};
const text=(t,x,y,color='#f4e6bc',size=10,align='left')=>{g.font='bold '+size+'px "Microsoft YaHei","PingFang SC",sans-serif';g.textAlign=align;g.textBaseline='top';g.fillStyle='#0a1219';g.fillText(String(t),Math.round(x)+1,Math.round(y)+1);g.fillStyle=color;g.fillText(String(t),Math.round(x),Math.round(y))};
function wrap(s,max=14){const out=[];let line='';for(const ch of Array.from(s)){if(ch==='\n'){out.push(line);line='';continue}if((/[ -~]/.test(ch)? .55:1)+(Array.from(line).reduce((a,b)=>a+(/[ -~]/.test(b)?.55:1),0))>max){out.push(line);line=''}line+=ch}if(line)out.push(line);return out}
function panel(x,y,w,h){if(window.GYArt?.panel){window.GYArt.panel(g,x,y,w,h);return}rect(x,y,w,h,'#0b1319');rect(x+1,y+1,w-2,h-2,'#c69e57');rect(x+2,y+2,w-4,h-4,'#253f46');rect(x+4,y+4,w-8,h-8,'#14292f');for(const xx of [x+2,x+w-5])for(const yy of [y+2,y+h-5])rect(xx,yy,3,3,'#edca7b')}
function bar(x,y,w,val,max,color){rect(x,y,w,5,'#07171c');rect(x+1,y+1,w-2,3,'#364148');rect(x+1,y+1,Math.floor((w-2)*clamp(val/max,0,1)),3,color)}
function drawTile(t,x,y,ix,iy,biome){if(window.GYArt?.tile){window.GYArt.tile(g,t,x,y,ix,iy,biome,game.cleared);return}
 const n=noise(ix,iy,game.chapter+6);
 const grass=biome==='snow'?'#bdc9bd':biome==='autumn'?'#7e9567':biome==='river'?'#62876a':'#6b9b73';
 const dirt=biome==='snow'?'#c1b7a5':'#c0a67a';
 rect(x,y,16,16,t===7?'#727b79':t===1?dirt:t===2?'#b9a47d':t===8?'#9c7e56':t===4?'#315d74':grass);
 if(t===0||t===9||t===10||t===11){rect(x+2+(n*7|0),y+4,2,2,biome==='snow'?'#e0e9df':'#3c744f');rect(x+10,y+11,2,1,'#496c54');if(t===9){rect(x+6,y+6,2,3,'#dce7a2');rect(x+7,y+5,2,2,'#d98a9a')}if(t===10){rect(x+5,y+8,5,2,'#bf7043')}if(t===11){rect(x+8,y+3,2,2,'#f4f6ef')}}
 if(t===1||t===2){rect(x+2,y+3,4,1,t===1?'#d2ba8e':'#d1bd94');rect(x+11,y+12,3,1,'#927d5b');if(n>.66)rect(x+6,y+7,2,1,'#9e886b')}
 if(t===5){rect(x,y,16,16,grass);rect(x+6,y+11,4,5,'#685640');rect(x+4,y+3,9,11,'#244d3b');rect(x+2,y+6,13,6,'#2f6142');rect(x+5,y+1,7,10,'#438451');rect(x+7,y+3,3,5,'#63945e');rect(x+2,y+10,3,2,'#244d3b')}
 if(t===4){rect(x,y+3,14,2,'#42768d');rect(x+4,y+11,11,2,'#5990a1');rect(x+10,y+1,3,1,'#81b4c1')}
 if(t===8){rect(x,y,16,16,'#6f6e5a');for(let k=1;k<16;k+=5)rect(x,y+k,16,2,'#ceaa76');rect(x+2,y,2,16,'#896d4c');rect(x+13,y,2,16,'#896d4c')}
 if(t===7){rect(x,y,16,16,'#7b8580');rect(x,y+6,16,1,'#596663');rect(x+7,y,1,6,'#536462');rect(x+3,y+8,1,8,'#64706d');rect(x+11,y+8,1,8,'#66736d');rect(x+1,y+1,5,1,'#b4ada1')}
 if(t===6||t===12){rect(x,y,16,16,'#9b644c');rect(x,y,16,3,'#513b36');for(let i=2;i<16;i+=5)rect(x+i,y+4,3,11,'#bc8861');rect(x,y+14,16,2,'#665344');if(t===12){rect(x+4,y+7,8,9,'#292522');rect(x+6,y+8,4,8,'#664e35')}}
 if(t===13){rect(x,y,16,16,'#bfa579');rect(x+3,y+2,10,12,'#5c463c');rect(x+5,y+4,6,9,game.cleared?'#d6ba73':'#41372e');rect(x+3,y+1,10,2,'#9a674e')}
}
function actor(x,y,kind=0,face=2,phase=0,scale=1){if(window.GYArt?.actor){window.GYArt.actor(g,x,y,kind,face,phase,scale);return}
 // 16x21 pixel actor silhouettes. kind: hero 0, villager 1, merchant 2, soldier 3, boss 4, ally 5
 g.save();g.translate(Math.round(x),Math.round(y));g.scale(scale,scale);
 const skin=kind===4?'#df9771':'#e0a77b',robe=['#266f5b','#988264','#795b43','#834b45','#8f3330','#385f81'][kind]||'#777';
 rect(3,18,11,2,'#1926297e');rect(5,15+phase,3,4,'#33353a');rect(10,15-phase,3,4,'#343943');
 rect(4,8,10,9,'#172a2c');rect(5,8,8,8,robe);
 rect(3,9,3,6,robe);rect(12,9,3,6,robe);
 rect(5,4,9,7,skin);rect(4,3,11,4,kind===0?'#306344':kind===4?'#a53c2c':'#3a3833');
 if(kind===0){rect(3,2,13,2,'#2d6b4e');rect(6,1,7,2,'#1b4d42');rect(6,8,7,6,'#1b2024');rect(7,11,4,6,'#181f25');rect(4,8,2,8,'#278c61');rect(11,8,3,8,'#2e735a');rect(3,14,11,2,'#bb9a54');rect(7,5,2,1,'#342822');rect(11,5,2,1,'#342822');rect(8,7,4,1,'#802c23');rect(13,-7,2,24,'#8f7751');rect(12,-10,4,7,'#d9d7b0');rect(12,-12,5,3,'#b6d0bd');rect(13,13,4,3,'#d8be6f')}
 else if(kind===4){rect(4,1,11,4,'#962c2b');rect(6,-1,6,2,'#c5a451');rect(5,8,9,2,'#b78f54');rect(5,11,8,1,'#ca9d54');rect(8,7,6,2,'#3c2728');rect(1,-5,2,20,'#9b8a72');rect(0,-7,5,4,'#e3e0cb');rect(8,5,2,1,'#24211f')}
 else if(kind===3){rect(4,2,11,4,'#697d86');rect(4,8,10,5,'#7b4c4c');rect(0,2,2,18,'#8e7757');rect(0,-1,4,5,'#bac7ba');rect(8,5,2,1,'#2d2f2c')}
 else if(kind===2){rect(2,1,13,3,'#78664a');rect(5,9,9,3,'#ccaa65');rect(7,5,2,1,'#342c22')}
 else if(kind===5){rect(4,0,10,4,'#284c6c');rect(5,9,8,3,'#c9b77c');rect(7,5,2,1,'#332c2a')}
 else{rect(4,2,11,2,'#554538');rect(7,5,2,1,'#302a22')}
 g.restore();
}
function drawPortrait(x,y,kind=0){if(window.GYArt?.portrait){window.GYArt.portrait(g,x,y,kind);return}
 rect(x,y,35,38,'#805f42');rect(x+2,y+2,31,34,'#b6a37b');rect(x+4,y+4,27,31,'#40664c');
 if(kind===0){rect(x+8,y+10,20,17,'#d89770');rect(x+5,y+6,25,7,'#175541');rect(x+9,y+3,18,5,'#286d52');rect(x+11,y+23,17,12,'#192424');rect(x+13,y+17,3,2,'#402c2b');rect(x+22,y+17,3,2,'#402c2b');rect(x+15,y+21,9,2,'#763528');rect(x+17,y+25,6,10,'#232a28')}
 else {rect(x+8,y+11,20,17,'#d7a47f');rect(x+6,y+6,23,8,kind===4?'#80372d':'#655444');rect(x+13,y+18,3,2,'#342827');rect(x+23,y+18,3,2,'#342827');rect(x+15,y+26,10,6,'#42342e')}
}
function hud(){if(window.GYArt?.hud){window.GYArt.hud(g,game.hero,{maxHp:maxHp(),maxMp:maxMp()});return}
 const h=game.hero;rect(0,0,W,24,'#14272e');rect(0,23,W,1,'#c5a46c');text('关',4,3,'#edcc86',13);text('LV'+h.level,23,4,'#e3dcc0',9);
 bar(55,4,72,h.hp,maxHp(),'#c85c49');bar(55,13,72,h.mp,maxMp(),'#478cbd');
 text(h.hp+'/'+maxHp(),131,2,'#edcdb7',8);text(h.mp+'/'+maxMp(),131,12,'#a7d4ee',8);
}
function drawWorld(now){
 if(!game.world)return;
 const h=game.hero, cam=game.camera;
 cam.x=clamp(h.x*T-80,0,26*T-W);cam.y=clamp(h.y*T-95,0,21*T-172);
 g.save();g.beginPath();g.rect(0,24,176,170);g.clip();
 rect(0,24,176,170,'#668b6b');
 const minX=Math.max(0,Math.floor(cam.x/T)),maxX=Math.min(25,Math.ceil((cam.x+W)/T)),minY=Math.max(0,Math.floor(cam.y/T)),maxY=Math.min(20,Math.ceil((cam.y+172)/T));
 for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){drawTile(game.world.grid[y][x],x*T-cam.x,y*T-cam.y+24,x,y,CHAPTERS[game.chapter].biome)}
 const entities=[
 {x:5,y:9,type:5,label:CHAPTERS[game.chapter].leader},
 {x:9,y:9,type:2,label:'铁匠'},
 {x:6,y:14,type:1,label:'乡老'},
 {x:4,y:13,type:1,label:'客栈'}
 ];
 for(const a of entities){const sx=a.x*T-cam.x,sy=a.y*T-cam.y+24;if(sx>-18&&sx<W&&sy>-32&&sy<197){actor(sx,sy-5,a.type);text(a.label,sx+8,sy-15,'#f6e3b5',8,'center')}}
 for(const e of game.world.enemies){if(!e.alive)continue;const sx=e.x*T-cam.x,sy=e.y*T-cam.y+24;if(sx<-20||sx>W||sy<5||sy>198)continue;
  actor(sx,sy-4,e.boss?4:3,2,Math.floor(now/270)%2);
  if(e.hp<e.max||e.boss){bar(sx-1,sy-9,18,e.hp,e.max,e.boss?'#cf5a42':'#beae64');if(e.boss)text(e.name,sx+8,sy-23,'#ffdaab',8,'center')}
 }
 const sx=h.x*T-cam.x,sy=h.y*T-cam.y+24;
 if(now<game.hurtAt&&Math.floor(now/90)%2)g.globalAlpha=.38;
 actor(sx,sy-4,0,h.dir,Math.floor(now/140)%2);g.globalAlpha=1;
 for(const e of game.effects){const ex=e.x*T-cam.x,ey=e.y*T-cam.y+24,age=now-e.t;
  if(window.GYArt?.effect){window.GYArt.effect(g,e,ex,ey,age);continue}
  if(e.type==='slash'||e.type==='special'){
   const dirs=[[0,-1],[1,0],[0,1],[-1,0]],v=dirs[e.dir];g.save();g.strokeStyle=e.type==='special'?'#68efe9':'#fbeaa5';g.lineWidth=e.type==='special'?4:3;g.globalAlpha=1-age/(e.type==='special'?440:270);g.beginPath();g.arc(ex+8+v[0]*12,ey+6+v[1]*9,e.type==='special'?28:18,(e.dir-1)*Math.PI/2,(e.dir+.8)*Math.PI/2);g.stroke();g.restore();
   if(e.type==='special')for(let k=0;k<6;k++)rect(ex+Math.sin(k*2)*21,ey+Math.cos(k*2)*15,2,2,'#c6fff1');
  }else if(e.type==='hit'){rect(ex+3,ey,11,2,'#fff3a1');rect(ex+7,ey-4,2,14,'#fff2ac')}
  else if(e.type==='hurt'){rect(ex,ey,16,16,'#ef6d6055')}
  else if(e.type==='dust'){rect(ex+5,ey+14,5,2,'#cbb390')}
 }
 if(window.GYArt?.atmosphere)window.GYArt.atmosphere(g,CHAPTERS[game.chapter].biome,now,cam.x,cam.y);
 for(const e of game.floaters){const age=(now-e.t)/780;g.globalAlpha=1-age;text(e.text,e.x*T-cam.x+8,e.y*T-cam.y+3-age*17,e.color,9,'center')}g.globalAlpha=1;
 g.restore();
 // bottom action bar
 rect(0,194,W,26,'#172b32');rect(0,194,W,1,'#d1ad66');
 text('第'+(game.chapter+1)+'回',4,199,'#f2d58f',10);text(CHAPTERS[game.chapter].name,40,199,'#d6d2bd',9);
 text('金'+h.gold,171,210,'#d3ad5e',8,'right');
 text('5攻击  *绝技  #丹药  0菜单',4,211,'#a9b9b6',8);
 if(now<game.toastUntil){rect(7,171,162,19,'#102027');rect(8,172,160,17,'#455a52');rect(10,174,156,13,'#233536');text(game.toastText,88,176,'#f5dfab',9,'center')}
}
function titleScreen(now){if(window.GYArt?.title){window.GYArt.title(g,now,game.titleIndex,saveExists());return}
 rect(0,0,W,H,'#131f25');
 // distant stars and landscape
 for(let i=0;i<28;i++){let x=(noise(i,1,47)*176)|0,y=(noise(i,4,29)*95)|0;rect(x,y,1,1,'#c0a36f')}
 rect(0,0,W,105,'#24373a');
 rect(114,20,26,26,'#e3be77');rect(117,22,19,21,'#f3d79c');
 for(let i=0;i<176;i+=6){const y=105+Math.sin(i*.06)*8+Math.cos(i*.11)*6;rect(i,y,8,110-y,'#293c39')}
 for(let i=0;i<176;i+=12){const y=127+Math.sin(i*.071)*5;rect(i,y,14,80-y,'#1b302f')}
 rect(0,170,176,50,'#142328');
 // stylized hero title art
 g.save();g.translate(103,94);g.scale(3,3);actor(0,0,0,2,0);g.restore();
 rect(8,11,160,56,'#0a1619aa');text('关 羽 正 传',88,17,'#ffe7b7',18,'center');text('Ⅱ',88,42,'#e4af69',18,'center');
 text('一 骑 千 里 · 忠 义 千 秋',88,74,'#d7be85',9,'center');
 panel(20,139,136,69);
 const options=['开 始 游 戏','继 续 游 戏','操 作 帮 助'];
 options.forEach((s,i)=>{if(i===game.titleIndex){rect(27,146+i*17,122,15,'#835a33');text('▶',31,148,'#eacc81',10)}text(s,92,149+i*17,i===1&&!saveExists()?'#687676':'#f5e5bf',11,'center')});
 text('© 独立重制 · 原创像素素材',88,212,'#7f9997',7,'center');
}
function dialogBox(now){
 const s=game.dialog[game.dialogIndex]||'';
 panel(4,125,168,91);
 const isHeader=/^【/.test(s),parts=wrap(s,12);
 drawPortrait(11,135,isHeader?4:0);
 text(isHeader?'人物对话':'关云长',51,136,'#ebbd74',10);
 const lines=parts.slice(0,4);for(let i=0;i<lines.length;i++)text(lines[i],51,150+i*13,'#e7e7d2',9);
 if(lines.length===0)text('……',52,150,'#e4d1b0',9);
 const arrow=Math.floor(now/420)%2?'▼':'▾';text(arrow,158,200,'#ffe59d',12);
 text((game.dialogIndex+1)+'/'+game.dialog.length,11,201,'#b6c4be',8);
}
function genericList(title,items,idx,footer='5确定   右键返回'){
 panel(4,27,168,188);text(title,88,35,'#f0d196',14,'center');rect(12,56,152,1,'#9c895f');
 items.forEach((it,i)=>{const y=67+i*22;if(y>194)return;if(i===idx){rect(11,y-3,154,20,'#715438');text('▶',16,y,'#f9d795',10)}text(it,30,y,'#e1e0c6',10)});
 text(footer,88,202,'#b8c1b3',8,'center');
}
function render(now){
 rect(0,0,W,H,'#11232b');
 if(game.mode==='title'){titleScreen(now);return}
 if(game.mode==='ending'){endScreen(now);return}
 if(game.mode==='gameover'){gameOverScreen();return}
 drawWorld(now);hud();
 if(game.mode==='dialog'){dialogBox(now);return}
 if(game.mode==='menu'){genericList('行 囊 菜 单',['人物属性','背包 / 道具','任务日志','行军地图','保存进度','操作帮助','返回标题'],game.menuIndex);return}
 if(game.mode==='shop'){
  const h=game.hero;panel(4,27,168,188);text('村 东 铁 匠 铺',88,34,'#f2ce89',13,'center');text('持有钱币：'+h.gold,10,53,'#efcc79',10);
  ITEMS.forEach((item,i)=>{const price=i===2?item.cost*(h.weapon+1):i===3?item.cost*(h.armor+1):item.cost;const y=71+i*27;if(i===game.shopIndex)rect(10,y-2,156,24,'#664c35');text((i===game.shopIndex?'▶ ':'')+item.name,12,y,'#f1e1bd',9);text(price+' 钱',163,y,'#ebce83',9,'right');text(item.desc,26,y+11,'#b8c5bb',8)});
  text('5购买 · 返回取消',88,202,'#cbccb3',8,'center');return;
 }
 if(game.mode==='status'){
  const h=game.hero;panel(4,27,168,188);text('关 云 长 · 人 物',88,35,'#f4cf86',13,'center');
  drawPortrait(11,62,0);text('关羽  字云长',55,66,'#f7e4b8',11);text('等级 '+h.level+'  ·  经验 '+h.xp,55,83,'#a4ded2',8);
  const stats=[['气血',h.hp+'/'+maxHp()],['真气',h.mp+'/'+maxMp()],['武力',heroAtk()],['防御',heroDef()],['金钱',h.gold],['击败敌军',h.kills]];
  stats.forEach((r,i)=>{text(r[0],17,108+i*14,'#b6c1bd',9);text(r[1],157,108+i*14,'#f0ddb2',10,'right')});
  text('偃月刀+'+h.weapon+'  战甲+'+h.armor,88,194,'#d9b681',9,'center');return;
 }
 if(game.mode==='inventory'){const h=game.hero;genericList('行 囊 · 道 具',['金疮药 ×'+h.potions+'  气血+55','回气散 ×'+h.ethers+'  真气+30'],game.inventoryIndex,'5使用 · 右键返回');text('当前 '+h.hp+'/'+maxHp()+' 气血    '+h.mp+'/'+maxMp()+' 真气',88,151,'#d8ceab',9,'center');return}
 if(game.mode==='quest'){
  const c=CHAPTERS[game.chapter];panel(4,27,168,188);text('征 途 · 任 务',88,35,'#f0ca80',14,'center');text('主线 · '+c.name,12,64,'#d0ae70',10);
  wrap(c.tip,18).forEach((t,i)=>text(t,15,82+i*14,'#f0e2c5',9));
  text('进度：'+(game.cleared?'关隘已开启':game.talked?'正在完成任务':'寻找'+c.leader),15,119,game.cleared?'#8de3b4':'#c6d5c8',9);
  rect(13,140,149,1,'#728077');text('支线 · 乡村除贼',12,148,'#d0ae70',10);text(game.sideDone?'任务已完成':game.sideAccepted?'已击败 '+Math.min(3,game.sideCount)+'/3 名贼兵':'找乡老接受委托',15,168,'#e6dcbf',9);
  text('右键返回',88,201,'#b2beb8',8,'center');return;
 }
 if(game.mode==='map'){mapScreen();return}
 if(game.mode==='help'){genericList('操 作 指 南',['方向键 / 2468 移动','5 / 确定：挥刀、对话','* / X：青龙斩（耗真气）','# / H：金疮药回复','0 / M：打开菜单','靠近 NPC 按 Z 交谈','打败首领后向东通关'],8,'按确定或右键返回');return}
}
function mapScreen(){
 panel(4,27,168,188);text('行 军 地 图',88,35,'#f0d59b',14,'center');
 const map=game.world.grid;
 for(let y=0;y<21;y++)for(let x=0;x<26;x++){const t=map[y][x];rect(9+x*6,59+y*6,6,6,t===4?'#447590':t===5?'#365b47':t===7?'#808c83':t===2?'#bba67a':t===6?'#ad7551':'#759574')}
 rect(9+game.hero.x*6,59+game.hero.y*6,5,5,'#ffee80');rect(9+24*6,59+11*6,5,5,game.cleared?'#9af7c0':'#e57874');
 text('● 当前所在    ■ 关隘出口',88,192,'#ece0bd',9,'center');
 text('右键返回',88,204,'#a9bdb7',8,'center');
}
function gameOverScreen(){
 rect(0,0,W,H,'#201d21');for(let i=0;i<22;i++){const y=noise(i,3,20)*220;rect(noise(i,8,9)*176,y,1,14,'#543c40')}
 drawPortrait(70,40,0);text('胜 败 乃 兵 家 常 事',88,96,'#ebbb86',13,'center');
 text('云长力竭，暂且退守营寨……',88,122,'#c5b7a9',9,'center');
 ['返回营地','读取上次存档'].forEach((s,i)=>{if(i===game.menuIndex)rect(29,151+i*23,118,20,'#6b4932');text((i===game.menuIndex?'▶ ':'')+s,88,154+i*23,'#f0dbb5',10,'center')});
}
function endScreen(now){
 rect(0,0,W,H,'#17262c');rect(98,18,24,25,'#d1b97d');
 for(let i=0;i<26;i++)rect(noise(i,2,99)*W,(now*.019+i*17)%H,1,3,'#dfe1d4');
 g.save();g.translate(57,65);g.scale(4,4);actor(0,0,0,2,0);g.restore();
 text('忠 义 千 秋',88,22,'#f0d19b',19,'center');text('关 羽 正 传 Ⅱ',88,134,'#e5cd94',12,'center');
 text('九回征途已尽',88,153,'#b8c4bd',10,'center');
 text('英雄不朽，往事长存。',88,169,'#c8bca4',9,'center');
 ['返回标题','再赴征途'].forEach((s,i)=>{if(i===game.menuIndex)rect(20,184+i*17,137,16,'#60503b');text((i===game.menuIndex?'▶ ':'')+s,88,186+i*17,'#f0e1bf',9,'center')});
}
writeChapterInfo();
requestAnimationFrame(tick);
