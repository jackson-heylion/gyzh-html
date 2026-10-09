/* Guan Yu II HD pixel-art engine — handcrafted procedural art, no external images.
   Coordinates are legacy 176x220 units. The caller renders at 2x backing resolution,
   allowing 0.5-unit strokes and pixel detail unavailable in the original 176x220 art. */
(function(root){
'use strict';
const snap=n=>Math.round(n*2)/2;
function r(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(snap(x),snap(y),Math.max(.5,snap(w)),Math.max(.5,snap(h)))}
function letter(c,str,x,y,color='#f6e8c8',size=10,align='left',bold=true){
 c.save();c.font=(bold?'bold ':'')+size+'px "Microsoft YaHei","PingFang SC",sans-serif';
 c.textAlign=align;c.textBaseline='top';c.fillStyle='#0b141a';c.fillText(String(str),x+.5,y+1);
 c.fillStyle=color;c.fillText(String(str),x,y);c.restore();
}
function n(x,y,seed=0){
 let h=Math.imul((x|0)^((seed+61)|0),0x45d9f3b)^Math.imul((y|0)+seed*11,0x27d4eb2d);
 h=Math.imul(h^(h>>>15),0x85ebca6b);
 return ((h^(h>>>13))>>>0)/4294967296;
}
const P={
 spring:{soil:'#829f73',hi:'#9bb581',shadow:'#52775d',mud:'#a89772',route:'#cbb78c',twig:'#385e48',leaf:'#599f68'},
 autumn:{soil:'#8c9467',hi:'#abb179',shadow:'#64794e',mud:'#bda781',route:'#d2bb93',twig:'#596547',leaf:'#b98549'},
 fort:{soil:'#9a9b83',hi:'#b9b69c',shadow:'#676d62',mud:'#ad9f85',route:'#c3b69b',twig:'#555e57',leaf:'#668273'},
 river:{soil:'#6f987e',hi:'#94b89a',shadow:'#467467',mud:'#a9a489',route:'#c8b998',twig:'#356a5a',leaf:'#5ca397'},
 snow:{soil:'#c2cabb',hi:'#e5e8d9',shadow:'#8a9d99',mud:'#b4aaa0',route:'#d6cbb2',twig:'#5d7671',leaf:'#8cabaa'}
};
function soil(c,x,y,ix,iy,theme){
 r(c,x,y,16,16,theme.soil);
 for(let k=0;k<9;k++){
  const u=n(ix*13+k,iy*19,31),v=n(ix*21,iy*11+k,32);
  r(c,x+.5+Math.floor(u*14)/2*2,y+.5+Math.floor(v*14),u>.62?1.5:.5,u>.5?1:.5,u>.55?theme.hi:theme.shadow);
 }
}
function grass(c,x,y,ix,iy,theme){
 for(let k=0;k<5;k++){
  let a=1.5+Math.floor(n(ix*31+k,iy*17,8)*12),b=2.5+Math.floor(n(ix*43,iy*7+k,13)*11);
  const light=k%3===0;
  r(c,x+a,y+b,1,2.5,light?theme.hi:theme.shadow);
  r(c,x+a-1,y+b+1,1,1,theme.leaf);
  r(c,x+a+1,y+b+.5,.5,1.5,theme.leaf);
 }
}
function stone(c,x,y,ix,iy,theme){
 r(c,x,y,16,16,'#778480');r(c,x,y,16,.5,'#b9bcac');
 r(c,x,y+7.5,16,.5,'#4c615e');r(c,x+7.5,y,.5,7.5,'#4c615e');
 r(c,x+3.5,y+8,1,8,'#526865');r(c,x+12.5,y+8,1,8,'#536864');
 r(c,x+1,y+1,5,1,'#a7aaa0');r(c,x+8.5,y+9,5,1,'#a7aaa0');
 for(let i=0;i<5;i++){
  const a=n(ix*5+i,iy*7,3)*13,b=n(iy*4+i,ix,4)*14;
  r(c,x+snap(a),y+snap(b),.5,.5,i%2?'#bac0af':'#5c6c69');
 }
}
function house(c,x,y,ix,iy,t){
 const origins=[[6,6],[10,6],[4,16]];
 let origin=origins.find(([a,b])=>ix>=a&&ix<a+3&&iy>=b&&iy<b+3);
 const a=origin?ix-origin[0]:ix%3,b=origin?iy-origin[1]:iy%3;
 r(c,x,y,16,16,'#ab8a68');
 if(b===0){
  r(c,x,y,16,16,'#70473e');r(c,x,y+1,16,2,'#362e32');r(c,x,y+13,16,2,'#3b3835');
  for(let i=0;i<4;i++){r(c,x+i*4,y+3,3.5,4,'#8c5950');r(c,x+i*4+1,y+4,1.5,1,'#b17a61');
  r(c,x+i*4+1,y+9,3,2,'#5c3b36')}
 }else if(b===1){
  r(c,x,y,16,16,'#b49372');r(c,x,y,16,2,'#6a4b3e');r(c,x,y+14,16,2,'#7e6650');
  if(a===0||a===2){r(c,x+(a===0?1:12),y+2,3,12,'#6a503e');r(c,x+5,y+6,6,6,'#443e35');r(c,x+6,y+6,4,5,'#a5ab8b')}
  else {r(c,x+1,y+4,14,2,'#d0b394');r(c,x+6,y+5,4,9,'#806349')}
 }else{
  r(c,x,y,16,16,'#b09376');r(c,x,y,16,3,'#76533c');
  r(c,x,y+12,16,4,'#8f7a61');r(c,x+2,y+8,12,1,'#ddbb8a');
  if(a===1||t===12){r(c,x+3,y+2,10,14,'#493930');r(c,x+5,y+3,6,13,'#68503d');
   r(c,x+10,y+9,.5,1,'#edcf89');r(c,x+4,y+2,8,1,'#c7a979')}
  else r(c,x+6,y+3,2,9,'#6b594c');
 }
 for(let k=0;k<4;k++){
  const u=2+Math.floor(n(ix,iy+k,31)*11),v=2+Math.floor(n(iy+k,ix,23)*12);
  r(c,x+u,y+v,.5,.5,'#e5bc8766');
 }
}
function tree(c,x,y,ix,iy,theme){
 // Trunk, textured dark canopy, layered leaf clumps and dappled highlights.
 r(c,x,y,16,16,theme.soil);
 r(c,x+7,y+10,4.5,6,'#483c33');r(c,x+8,y+10,1,6,'#8f6b4b');
 r(c,x+4,y+3,10,11,'#234a3e');r(c,x+2,y+5,14,8,'#315b40');
 r(c,x+3,y+3,11,7,'#426a43');r(c,x+6,y+1,8,9,theme.shadow);
 r(c,x+5,y+2,8,7,theme.leaf);r(c,x+3,y+6,7,5,theme.leaf);
 r(c,x+7,y+4,6,5,'#81a363');r(c,x+6,y+2,4,2,theme.hi);
 for(let k=0;k<12;k++){
  const a=3+snap(n(ix*7+k,iy*13,25)*9),b=2+snap(n(ix*9,iy*4+k,19)*10);
  r(c,x+a,y+b,1+(k%3===0?.5:0),.5,k%3===0?theme.hi:k%3===1?theme.leaf:'#315843');
 }
 r(c,x+3,y+12,3,.5,'#213c35');r(c,x+12,y+11,2,1,'#25443b');
}
function river(c,x,y,ix,iy){
 r(c,x,y,16,16,'#24495e');r(c,x,y,16,2,'#376980');
 r(c,x+1,y+4,9,1,'#5b8f9f');r(c,x+7,y+10,8,1,'#4b8c9b');
 r(c,x+3,y+6,5,.5,'#a3c9c6');r(c,x+10,y+13,4,.5,'#a9d0c5');
 r(c,x+10,y+2,3,.5,'#719aa7');r(c,x+1,y+15,6,.5,'#173c52');
 for(let i=0;i<3;i++)r(c,x+n(ix+i,iy,37)*13,y+2+n(ix,iy+i,7)*12,1,.5,'#7db5b8');
}
function rawTile(c,t,x,y,ix,iy,biome,cleared){
 const theme=P[biome]||P.spring;
 soil(c,x,y,ix,iy,theme);
 if([0,9,10,11].includes(t)){
  grass(c,x,y,ix,iy,theme);
  if(t===9){r(c,x+7,y+6,2,2,'#e8c7cf');r(c,x+6.5,y+7,3,1,'#d86e8f');r(c,x+8,y+6.5,.5,.5,'#fcecb5')}
  if(t===10){r(c,x+5,y+8,5,2,'#bd7545');r(c,x+7,y+7,3,1,'#dca36b')}
  if(t===11){r(c,x+8,y+4,2,1,'#f8fbf3');r(c,x+5,y+12,3,1,'#edf3eb')}
 }else if(t===1||t===2){
  r(c,x,y,16,16,t===1?theme.mud:theme.route);
  if(t===2){r(c,x,y,16,1,'#dfcda2');r(c,x,y+15,16,1,'#8f886b')}
  for(let i=0;i<11;i++){
   const a=snap(n(ix*5+i,iy*3,11)*15),b=snap(n(ix*11,iy*7+i,21)*15);
   r(c,x+a,y+b,i%4===0?2:.5,i%3===0?1:.5,i%3===0?'#e6d4b0':'#a39572');
  }
  if(t===1){r(c,x+1,y+2,4,.5,'#f0d6ac');r(c,x+9,y+12,3,.5,'#947e63')}
 }else if(t===4)river(c,x,y,ix,iy);
 else if(t===5)tree(c,x,y,ix,iy,theme);
 else if(t===6||t===12)house(c,x,y,ix,iy,t);
 else if(t===7)stone(c,x,y,ix,iy,theme);
 else if(t===8){
  r(c,x,y,16,16,'#566a64');r(c,x,y+1,16,14,'#74634f');
  for(let i=0;i<4;i++){r(c,x,y+i*4,16,1,'#d9b484');r(c,x,y+i*4+1,16,2,'#a4815f')}
  r(c,x+1,y,1.5,16,'#674d3a');r(c,x+13.5,y,1.5,16,'#604b35');
  for(let i=0;i<4;i++){r(c,x+4,y+i*4+2,1,1,'#4b4438');r(c,x+11,y+i*4+2,1,1,'#4b4438')}
 }else if(t===13){
  r(c,x,y,16,16,'#b29a74');r(c,x+1,y,14,16,'#6b5144');r(c,x+3,y+2,10,14,'#332f2d');
  r(c,x+5,y+3,6,12,cleared?'#dfbd79':'#504139');
  r(c,x+5,y+5,6,.5,cleared?'#f3d6a8':'#755b4b');
  r(c,x+2,y+1,12,2,'#b98f5a');r(c,x+1,y,14,1,'#432f2b');
  r(c,x+3,y+15,10,1,'#e1c297');
 }
 // Subpixel borders give each tile a crisp but not sterile presentation.
 if(t===2||t===7||t===8)r(c,x,y+15.5,16,.5,'#413f3755');
}
/* Cached 32x32 atlas cells. A scene uses the same tile pixels across hundreds
   of frames, so rasterize only once per world coordinate and terrain state. */
const tileCache=new Map();
function tile(c,t,x,y,ix,iy,biome,cleared){
 const doc=root.document;
 if(!doc||typeof doc.createElement!=='function')return rawTile(c,t,x,y,ix,iy,biome,cleared);
 const key=biome+':'+t+':'+ix+':'+iy+':'+(cleared?1:0);
 let cached=tileCache.get(key);
 if(!cached){
  cached=doc.createElement('canvas');cached.width=32;cached.height=32;
  const buffer=cached.getContext?.('2d');
  if(!buffer)return rawTile(c,t,x,y,ix,iy,biome,cleared);
  buffer.imageSmoothingEnabled=false;buffer.setTransform(2,0,0,2,0,0);
  rawTile(buffer,t,0,0,ix,iy,biome,cleared);
  tileCache.set(key,cached);
  if(tileCache.size>800)tileCache.delete(tileCache.keys().next().value);
 }
 c.drawImage(cached,snap(x),snap(y),16,16);
}
function actor(c,x,y,kind=0,face=2,phase=0,scale=1){
 c.save();c.translate(snap(x),snap(y));c.scale(scale,scale);
 if(face===3){c.translate(16,0);c.scale(-1,1)}
 const back=face===0;
 const hero=kind===0,boss=kind===4,soldier=kind===3,merchant=kind===2,ally=kind===5;
 const armor=hero?'#245843':boss?'#843f3d':soldier?'#616c74':ally?'#34546c':merchant?'#756148':'#766551';
 const lite=hero?'#56936b':boss?'#bc6656':soldier?'#91a0aa':ally?'#62819a':merchant?'#aa9168':'#a8936b';
 const shade=hero?'#132b2b':boss?'#482e32':soldier?'#313f45':'#43372e';
 const skin=boss?'#d69a77':hero?'#bd6d57':'#d7a27b',boot='#242a2b',gold='#d7b46b';
 // Ground shadow + stride
 r(c,2.5,18,12,.9,'#17272b88');
 r(c,4.5,14.5+(phase?0:.5),4,4.5,boot);
 r(c,10,14+(phase?.5:0),3.5,5,boot);
 r(c,5,16,3,.8,'#69716c');r(c,10.5,16,2.5,.8,'#59645d');
 // Mantle and torso
 r(c,4,8.5,11,7.5,shade);r(c,5.5,8,8.5,7.5,armor);
 r(c,3,9,2.5,6,shade);r(c,3.5,9.5,2,4.5,lite);
 r(c,13.5,9,2,6,shade);r(c,13.5,10,1,4,armor);
 r(c,6,10.5,7,1,lite);r(c,6,13.5,8,1,gold);
 r(c,7,9,1.5,5,'#d9c497');r(c,9.5,9,2,4,shade);
 r(c,7,15,1.5,1.5,gold);r(c,11,15,1.5,1.5,gold);
 // Neck and face outlined in dark silhouette
 r(c,5,3.5,10,6.5,shade);r(c,6,4,8,5.5,skin);
 r(c,6.5,4.5,2,3,'#ebac85');r(c,12.5,5,1,3,'#9a5041');
 if(back){r(c,6.5,4.5,6.5,5,'#243532');r(c,7,6,5,4,hero?'#1b4134':shade)}
 else{
  r(c,7,6,1.5,.7,'#262b2a');r(c,11.5,6,1.5,.7,'#262b2a');
  r(c,7,7,2,.5,'#e4a27e');r(c,11,7,2,.5,'#ad7058');
  r(c,8,8,4,.5,'#703d32');r(c,9,8.5,3,.5,'#2a2827');
  if(hero){r(c,7,8.5,6,2.5,'#292622');r(c,8.5,10.5,4,2.5,'#242626');r(c,9.5,12.5,2,2,'#1b2423');r(c,7,8.5,2,1,'#312722')}
  if(boss){r(c,7,8.5,5,1,'#46302d');r(c,8.5,9.5,3,1.5,'#2a2b2c')}
 }
 // Distinct headgear with feather and crest
 if(hero){
  r(c,4.5,2.5,11,2,'#13352f');r(c,6,1,8,3,'#286e4b');r(c,8,0,4,1.5,'#60a46b');
  r(c,13.5,2,3,1,'#8eb57d');r(c,13,1.5,2,.5,'#c5bd76');
  r(c,5,9,2,4,'#4a9b64');r(c,14,9,1.5,5,'#36664d');
  // Guandao, forged blade, beveled edges
  r(c,14,-9,1.5,25,'#6a513f');r(c,14.5,-9,1,25,'#c4a36a');
  r(c,13.5,-11.5,3,7,'#899f99');r(c,14,-14,2,7,'#dae3d1');
  r(c,15,-13.5,3,5,'#d1dbca');r(c,16,-11,2,4,'#f2f2d9');
  r(c,12.5,-7,1.5,2,'#afc2b2');r(c,13,-3.5,3,1,gold);
  r(c,13.5,12,3,1.5,'#e4be68');
 }else if(boss){
  r(c,5,1,10,3,'#632f33');r(c,6,0,8,2,'#a64c42');
  r(c,9,-2,2,3,gold);r(c,4.5,2,11,1,'#d3a45b');
  r(c,5,10,2,2,gold);r(c,13,10,2,2,gold);r(c,8,12,5,1,'#e5c68a');
  r(c,1,-7,1.5,23,'#756c5b');r(c,1,-10,3,7,'#d4d8c5');
  r(c,.5,-12,3,4,'#e2e9df');r(c,4,-6,2,2,'#b5c7bf');
 }else if(soldier){
  r(c,4.5,1.5,11,3,'#3c5358');r(c,6,0,9,2,'#80919b');
  r(c,7,-2,5,2,'#abafb0');r(c,5,10,2,2,'#a3abb2');
  r(c,1,-5,1.5,22,'#78634a');r(c,.5,-8,3.5,5,'#b4bfbb');
 }else if(merchant){
  r(c,3,1.5,13,3,'#533b2e');r(c,5,0,9,2,'#927450');
  r(c,5,10,10,2,'#ceae78');r(c,12,13,2,2,'#b18b4e');
 }else if(ally){
  r(c,4,1.5,11,2,'#244b67');r(c,7,0,6,2,'#597997');
  r(c,6,10,8,1,gold);r(c,7,14,5,.5,'#e1cc87');
 }else{
  r(c,3,2,13,2,'#665142');r(c,6,1,8,2,'#8d7052');
  r(c,5,12,11,1,'#c2a17a');r(c,7,14,6,1,'#4c493b');
 }
 c.restore();
}
function portrait(c,x,y,kind=0){
 const hero=kind===0,boss=kind===4;
 r(c,x,y,35,38,'#322e2b');r(c,x+.5,y+.5,34,37,'#c39c5e');
 r(c,x+1.5,y+1.5,32,35,'#2e4b45');
 for(let i=0;i<5;i++)r(c,x+2+i*6,y+3,2,.5,'#63807b');
 r(c,x+4,y+27,27,9,hero?'#234f3c':boss?'#8c443e':'#52606b');
 r(c,x+4,y+31,27,1,'#c5a974');
 r(c,x+8,y+7,19,22,'#352d2d');r(c,x+9,y+10,17,16,hero?'#bd7763':'#d6a17c');
 r(c,x+10,y+11,5,12,hero?'#e2a181':'#efba8c');
 r(c,x+23,y+13,2,9,'#955343');
 r(c,x+9,y+15,5,2,hero?'#a2594f':'#bf866c');
 r(c,x+10,y+17,5,.9,'#2b302d');r(c,x+20,y+17,4,.9,'#2b302d');
 r(c,x+11,y+18,2,.5,'#f6ddb1');r(c,x+21,y+18,1.5,.5,'#f6ddb1');
 r(c,x+17,y+20,2,3,'#a86251');r(c,x+17,y+23,6,1,'#8c4f42');
 if(hero){
  r(c,x+6,y+5,23,6,'#164e39');r(c,x+9,y+3,17,4,'#34845a');
  r(c,x+14,y+1,10,3,'#70aa73');r(c,x+28,y+5,3,1,'#d6c17d');
  r(c,x+10,y+23,15,4,'#302b2a');r(c,x+13,y+26,10,8,'#22292a');
  r(c,x+16,y+31,6,5,'#1c2626');r(c,x+6,y+29,5,7,'#4c986a');
  r(c,x+27,y+8,2,25,'#b79c6b');r(c,x+26,y+5,4,5,'#d2e2d1');
 }else{
  r(c,x+6,y+6,22,5,boss?'#8f3b39':'#5d5346');
  r(c,x+11,y+3,15,4,boss?'#b45e4f':'#84725c');
  r(c,x+12,y+24,12,3,'#4c3630');r(c,x+14,y+27,7,7,'#352f2e');
 }
 r(c,x+2,y+2,31,.5,'#dfbd7e');r(c,x+2,y+35.5,31,.5,'#755637');
}
function panel(c,x,y,w,h){
 r(c,x,y,w,h,'#07161b');r(c,x+.5,y+.5,w-1,h-1,'#ab8952');
 r(c,x+1.5,y+1.5,w-3,h-3,'#344e4c');r(c,x+2.5,y+2.5,w-5,h-5,'#122c33');
 r(c,x+4.5,y+4.5,w-9,h-9,'#1c3338');
 r(c,x+5,y+5,w-10,1,'#315353');
 r(c,x+5,y+h-6,w-10,.5,'#567066');
 for(const [u,v] of [[x+2,y+2],[x+w-7,y+2],[x+2,y+h-7],[x+w-7,y+h-7]]){
  r(c,u,v,5,5,'#8f6e40');r(c,u+1,v+1,3,3,'#e0ba74');r(c,u+2,v+2,1,1,'#fce4a0');
 }
 r(c,x+8,y+2,w-16,.5,'#deb775');r(c,x+8,y+h-3,w-16,.5,'#7b6a4f');
}
function smallBar(c,x,y,w,ratio,fill){
 r(c,x,y,w,6,'#080f16');r(c,x+.5,y+.5,w-1,5,'#716952');
 r(c,x+1,y+1,w-2,4,'#232d37');
 const width=Math.max(0,Math.floor((w-2)*Math.max(0,Math.min(1,ratio))*2)/2);
 if(width){r(c,x+1,y+1,width,3,fill);r(c,x+1,y+1,width,.7,'#ffffff55')}
}
function hud(c,h,limits){
 r(c,0,0,176,24,'#071a24');r(c,0,22.5,176,1.5,'#d2aa64');
 r(c,1,1,20,21,'#4a372e');r(c,2,2,18,19,'#265c48');
 letter(c,'关',11,3,'#f4d592',12,'center');
 letter(c,'LV '+h.level,24,7,'#e3d5ac',9);
 smallBar(c,59,3,67,h.hp/limits.maxHp,'#c65a50');
 smallBar(c,59,12,67,h.mp/limits.maxMp,'#4e9cba');
 letter(c,'气',49,2,'#ec998e',9,'center');
 letter(c,'真',49,11,'#8fcce1',9,'center');
 letter(c,h.hp+'/'+limits.maxHp,131,2,'#f1d4bc',8);
 letter(c,h.mp+'/'+limits.maxMp,131,12,'#aedceb',8);
 r(c,0,0,176,.5,'#597d78');
}
function effect(c,e,x,y,age){
 c.save();const a=Math.max(0,1-age/(e.type==='special'?430:300));c.globalAlpha=a;
 if(e.type==='slash'||e.type==='special'){
  const special=e.type==='special',di=[[0,-1],[1,0],[0,1],[-1,0]][e.dir];
  const px=x+8+di[0]*11,py=y+6+di[1]*9,rad=special?28:17;
  for(let i=0;i<4;i++){
   c.beginPath();c.strokeStyle=special?['#137988','#3dd0bd','#bbfff1','#f5ffea'][i]:['#735839','#d6a35c','#fff0ad','#ffffff'][i];
   c.lineWidth=(special?7:5)-i*1.4;
   c.arc(px,py,rad+i*.6,(e.dir-1)*Math.PI/2,(e.dir+.8)*Math.PI/2);
   c.stroke();
  }
  const count=special?20:9;
  for(let k=0;k<count;k++){
   const ang=k*2.399+e.dir;
   const distance=(special?9:6)+n(k,age>>5,3)*(special?25:14);
   const xx=px+Math.cos(ang)*distance,yy=py+Math.sin(ang)*distance;
   r(c,xx,yy,k%3?1:2,k%2?1:2,special?(k%2?'#9beee0':'#f5ebbb'):'#ffe3a5');
  }
 }else if(e.type==='hit'){
  for(let i=0;i<8;i++){const a=i*Math.PI/4;const d=5+age/28;
   r(c,x+8+Math.cos(a)*d,y+7+Math.sin(a)*d,2,2,i%2?'#ffcf7b':'#fff5c9')}
  r(c,x+4,y+5,8,3,'#fff7b8');
 }else if(e.type==='hurt'){
  r(c,x,y,16,16,'#f36c6177');
  r(c,x+2,y+2,12,.5,'#ffd2c1');
 }else if(e.type==='dust'){
  for(let i=0;i<4;i++)r(c,x+2+i*3,y+14-(i%2)*2,2,1.5,i%2?'#c1a886':'#eee3bf');
 }
 c.restore();
}
function atmosphere(c,biome,time,camX,camY){
 c.save();c.globalAlpha=biome==='snow'?.65:.4;
 const count=biome==='snow'?24:biome==='river'?12:7;
 for(let k=0;k<count;k++){
  const speed=biome==='snow'?.015:biome==='river'?.008:.006;
  let x=(n(k,2,44)*200+time*speed+(camX*.03))%196-10;
  let y=(n(k,3,33)*186+time*speed*.63+(camY*.02))%181+25;
  if(biome==='snow'){r(c,x,y,1.5,1.5,'#f6f6ed')}
  else if(biome==='autumn'){r(c,x,y,1.5,.8,k%2?'#ddab64':'#c17b48')}
  else if(biome==='river'){r(c,x,y,2,.5,'#c0d5c4')}
  else if(biome==='fort'){r(c,x,y,.5,1,'#efdfbb')}
  else{r(c,x,y,1,1,'#d3e8b1')}
 }
 c.restore();
}
function title(c,time,selected,hasSave){
 r(c,0,0,176,220,'#091923');
 // Rich atmospheric dusky gradient, moonlight and distant mountains.
 for(let y=0;y<137;y+=2){
  const t=y/137,rr=Math.floor(15+t*31),gg=Math.floor(29+t*31),bb=Math.floor(39+t*20);
  r(c,0,y,176,2,'rgb('+rr+','+gg+','+bb+')');
 }
 for(let i=0;i<55;i++){
  const x=Math.floor(n(i,2,33)*175),y=Math.floor(n(i,4,29)*93);
  r(c,x,y,i%5? .5:1,i%5?.5:1,i%3?'#a8b4ac':'#e5d6b2');
 }
 r(c,115,29,30,30,'#b8aa8066');r(c,117,31,26,26,'#dec892');
 r(c,122,32,16,23,'#f1dfa9');r(c,123,33,10,6,'#fbebbb');
 // Layered mountain silhouettes
 for(let x=0;x<176;x+=2){
  const yy=115+Math.sin(x*.041)*10+Math.cos(x*.083)*6;
  r(c,x,yy,2,66,'#334e4c');
  const z=136+Math.cos(x*.062)*8+Math.sin(x*.12)*4;
  r(c,x,z,2,60,'#1d383a');
  if(x%12===0)r(c,x,yy-1,1,1,'#6c7767');
 }
 // Distant fortified pass / pagoda
 r(c,12,100,35,46,'#192c2e');r(c,9,105,41,4,'#131f25');
 r(c,15,97,30,6,'#413e37');r(c,12,96,37,2,'#655a43');
 r(c,20,89,18,9,'#203235');r(c,17,88,24,3,'#4e4838');
 r(c,23,80,14,9,'#22343a');r(c,20,79,21,3,'#5d5040');
 r(c,27,112,8,34,'#1d2b2c');r(c,28,114,6,27,'#3f4a41');
 r(c,40,110,1,35,'#82684a');r(c,40,109,13,7,'#9d3d39');
 r(c,42,110,10,4,'#b85042');
 r(c,0,155,176,65,'#14272a');
 for(let x=0;x<176;x+=3){let y=153+Math.floor(Math.sin(x*.16)*4);r(c,x,y,3,12,'#1b3736')}
 // Larger, hand-painted character with silhouette and weapon
 c.save();c.translate(102,106);c.scale(3.5,3.5);actor(c,0,0,0,2,0);c.restore();
 r(c,93,103,33,2,'#162e31');
 // High-contrast title plaque
 r(c,8,10,160,63,'#0c2027e0');r(c,9,11,158,61,'#243c3f');
 r(c,11,13,154,57,'#112a30');
 r(c,16,15,144,1,'#ad8855');r(c,16,67,144,1,'#ab8656');
 r(c,14,16,3,3,'#d8ac64');r(c,159,16,3,3,'#d8ac64');
 letter(c,'关 羽 正 传',88,19,'#ffe4a9',19,'center');
 letter(c,'Ⅱ',88,44,'#e1b779',18,'center');
 letter(c,'一 骑 千 里 · 忠 义 千 秋',88,77,'#d5c294',8.5,'center');
 panel(c,19,139,138,69);
 const options=['开 始 游 戏','继 续 游 戏','操 作 帮 助'];
 for(let i=0;i<3;i++){
  const y=146+i*18;
  if(selected===i){r(c,27,y-2,122,17,'#705138');r(c,29,y-.5,117,.5,'#a68b5c');letter(c,'◆',34,y,'#eccc85',9)}
  letter(c,options[i],88,y,(!hasSave&&i===1)?'#718581':selected===i?'#ffe6ae':'#d2d6c4',10.5,'center');
 }
 letter(c,'HD PIXEL REMASTER · 352×440',88,211,'#90a9a3',7,'center',false);
}
root.GYArt=Object.freeze({tile,actor,portrait,panel,hud,effect,atmosphere,title});
})(globalThis);
