(function(){
"use strict";
if(window.__ceriabetPopupLoaded)return;
window.__ceriabetPopupLoaded=true;
function mount(){
  if(document.getElementById('ceriabet-popup-root'))return;
  var DELAY_KEY='ceriabet_popup_delay_1h';
  var DELAY_MS=3600000;
  var IMAGES=[
    'https://www.image2url.com/r2/default/images/1788097990438-2047cc2f-6da2-4728-8cb4-325b7b151283.png',
    'https://www.image2url.com/r2/default/images/1788097935225-ab0482a5-3215-49ad-a6e0-195629ad2ab9.png',
    'https://www.image2url.com/r2/default/images/1788098117610-0a2b8737-6add-4fed-86f9-b12a4fdaf8f6.png'
  ];
  var root=document.createElement('div');
  root.id='ceriabet-popup-root';
  var style=document.createElement('style');
  style.textContent='\
#ceriabet-popup-root, #ceriabet-popup-root *{box-sizing:border-box;font-family:Arial,sans-serif;}\
#ceriabet-popup-root #overlay{position:fixed;inset:0;z-index:2147483645;background:rgba(2,0,8,.78);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);opacity:1;transition:opacity 2.4s cubic-bezier(.22,.8,.28,1);}\
#ceriabet-popup-root #overlay.hidden,#ceriabet-popup-root #modal.hidden{display:none;}\
#ceriabet-popup-root #overlay.closing{opacity:0;}\
#ceriabet-popup-root #modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) scale(1);transform-origin:center center;z-index:2147483646;width:500px;max-width:calc(100vw - 20px);height:650px;max-height:calc(100dvh - 20px);padding:12px 14px 10px;display:flex;flex-direction:column;gap:7px;border-radius:22px;border:2px solid rgba(186,91,255,.95);background:linear-gradient(155deg,rgba(27,9,55,.30) 0%,rgba(11,4,28,.12) 52%,rgba(23,6,46,.26) 100%);box-shadow:0 0 0 4px rgba(51,5,91,.9),0 0 28px rgba(197,69,255,.6),0 0 56px rgba(68,84,255,.32),inset 0 0 18px rgba(143,48,255,.10);opacity:1;filter:blur(0);transition:opacity 2.4s cubic-bezier(.22,.8,.28,1),transform 2.4s cubic-bezier(.22,.8,.28,1),filter 2.4s cubic-bezier(.22,.8,.28,1),box-shadow 2.4s cubic-bezier(.22,.8,.28,1);overflow:hidden;color:#fff;}\
#ceriabet-popup-root #modal:before{content:"";position:absolute;inset:7px;border-radius:18px;border:1px solid rgba(27,225,255,.72);box-shadow:inset 0 0 16px rgba(25,204,255,.08);pointer-events:none;}\
#ceriabet-popup-root #modal.closing{opacity:0;transform:translate(-50%,-50%) scale(.84);filter:blur(11px);box-shadow:0 0 0 0 rgba(51,5,91,0),0 0 0 rgba(197,69,255,0),0 0 0 rgba(68,84,255,0),inset 0 0 0 rgba(143,48,255,0);}\
#ceriabet-popup-root header{height:43px;min-height:43px;display:flex;align-items:center;justify-content:center;padding:0 42px;position:relative;flex-shrink:0;}\
#ceriabet-popup-root .logo{display:flex;align-items:center;justify-content:center;}\
#ceriabet-popup-root .logo img{display:block;height:36px;max-width:145px;width:auto;object-fit:contain;}\
#ceriabet-popup-root #close{position:absolute;right:0;top:0;width:32px;height:32px;border:1px solid #f1caff;border-radius:50%;background:linear-gradient(#a642ff,#3a117f);color:#fff;font-size:22px;line-height:1;cursor:pointer;box-shadow:0 0 15px rgba(166,66,255,.9);}\
#ceriabet-popup-root #stage{position:relative;flex:0 0 auto;width:100%;max-width:530px;aspect-ratio:530/397;align-self:center;border-radius:16px;border:1px solid rgba(167,90,255,.95);background:transparent;overflow:hidden;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 18px rgba(132,34,217,.18),0 0 14px rgba(138,35,206,.22);}\
#ceriabet-popup-root #slide{display:block;width:100%;height:100%;object-fit:contain;opacity:1;transition:opacity .22s ease;background:transparent;}\
#ceriabet-popup-root #slide.loading{opacity:0;}\
#ceriabet-popup-root #loading{position:absolute;inset:0;display:grid;place-items:center;z-index:0;color:transparent;font-size:0;}\
#ceriabet-popup-root #error{display:none !important;}\
#ceriabet-popup-root .nav{position:absolute;top:50%;transform:translateY(-50%);z-index:4;width:34px;height:48px;border-radius:12px;border:1px solid #41dcff;background:rgba(38,11,93,.72);color:#fff;font-size:28px;cursor:pointer;box-shadow:0 0 11px rgba(35,141,248,.8);}\
#ceriabet-popup-root #prev{left:8px;}\
#ceriabet-popup-root #next{right:8px;}\
#ceriabet-popup-root #dots{display:flex;justify-content:center;gap:8px;min-height:8px;flex:0 0 auto;}\
#ceriabet-popup-root #dots button{width:8px;height:8px;padding:0;border:0;border-radius:50%;background:#805e9f;cursor:pointer;}\
#ceriabet-popup-root #dots button.active{background:#d1a6ff;box-shadow:0 0 10px #c45bff;}\
#ceriabet-popup-root .ticker{flex:0 0 auto;padding:7px 0;background:rgba(34,9,60,.45);border:1px solid rgba(109,41,171,.88);border-radius:8px;white-space:nowrap;overflow:hidden;font-size:11px;font-weight:800;}\
#ceriabet-popup-root .ticker span{display:inline-block;padding-left:100%;animation:ceriabet-marquee 18s linear infinite;}\
@keyframes ceriabet-marquee{to{transform:translateX(-100%);}}\
#ceriabet-popup-root .gifs{display:flex;justify-content:center;gap:10px;flex:0 0 auto;}\
#ceriabet-popup-root .gifs img{width:70px;height:70px;object-fit:cover;border-radius:12px;border:1px solid #b35bfa;box-shadow:0 0 12px rgba(164,65,254,.47);}\
#ceriabet-popup-root .actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;flex:0 0 auto;}\
#ceriabet-popup-root .actions a,#ceriabet-popup-root .actions button{padding:9px 4px;border-radius:12px;border:1px solid #c189ff;background:linear-gradient(#8736de,#3b0b72);font-size:11px;font-weight:900;color:#fff;text-decoration:none;text-align:center;cursor:pointer;}\
#ceriabet-popup-root .actions .red{background:linear-gradient(#eb263f,#960824);border-color:#ff677c;}\
#ceriabet-popup-root .actions .ok{grid-column:1/-1;max-width:115px;width:100%;justify-self:center;}\
#ceriabet-popup-root .count{padding-top:2px;text-align:center;color:#c9a7e8;font-size:9px;line-height:12px;letter-spacing:1.15px;text-transform:uppercase;text-shadow:0 0 8px #9444ff;flex:0 0 auto;}\
@media (max-width:540px){#ceriabet-popup-root #modal{width:calc(100vw - 20px);max-width:500px;height:min(650px,calc(100dvh - 20px));padding:10px;gap:6px;}#ceriabet-popup-root header{height:35px;min-height:35px;}#ceriabet-popup-root .logo img{height:29px;}#ceriabet-popup-root .gifs img{width:54px;height:54px;}#ceriabet-popup-root #close{width:30px;height:30px;}}\
@media (max-height:610px){#ceriabet-popup-root #modal{padding-top:7px;padding-bottom:7px;gap:4px;}#ceriabet-popup-root header{height:29px;min-height:29px;}#ceriabet-popup-root .logo img{height:26px;}#ceriabet-popup-root .gifs img{width:40px;height:40px;}#ceriabet-popup-root .ticker{padding:4px 0;}#ceriabet-popup-root .actions a,#ceriabet-popup-root .actions button{padding:5px 3px;}}';
  root.appendChild(style);
  root.innerHTML += '<div id="overlay"></div><main id="modal" role="dialog" aria-label="Popup CERIABET"><header><div class="logo"><img src="https://api2-crb.imgnxb.com/images/pod13iqh6ae/logo_96c00afb-2339-4071-aabc-5685e6905423_1793335296610.gif" alt="Logo CERIABET" loading="eager"></div><button id="close" aria-label="Tutup">×</button></header><div id="stage"><div id="loading"></div><img id="slide" class="loading" alt="Promo CERIABET" referrerpolicy="no-referrer"><div id="error"></div><button class="nav" id="prev" aria-label="Sebelumnya">‹</button><button class="nav" id="next" aria-label="Berikutnya">›</button></div><div id="dots"></div><div class="ticker"><span>CARI PENGALAMAN KEMENANGAN BESAR? DAFTAR DAN MAINKAN SEKARANG JUGA DI CERIABET!</span></div><div class="gifs"><img alt="Starlight Princess" src="https://media.tenor.com/ky4lyYmnHlsAAAAM/starlight-princess-slot-inces.gif"><img alt="Mahjong Ways" src="https://media.tenor.com/Yd-FAxXmftkAAAAM/pg-soft-mahjong-ways.gif"><img alt="Lucky Neko" src="https://imgcdn.it.com/knb2zump50st9c6kzrne/VIP_AI88/lucky_neko.webp"></div><div class="actions"><a href="https://ceriavpn.online/allinone" target="_blank" rel="noopener">⚽ ALL IN ONE</a><a class="red" href="https://aplikasi.ceriabetsbo.com" target="_blank" rel="noopener">📲 DOWNLOAD APK</a><button class="ok" id="ok">OK</button></div><div class="count">All Rights Reserved © CERIABET</div></main>';
  document.body.appendChild(root);
  var now=Date.now();
  var lastClosed=Number(localStorage.getItem(DELAY_KEY)||0);
  if(lastClosed && now-lastClosed < DELAY_MS){
    var ov=root.querySelector('#overlay');
    var mo=root.querySelector('#modal');
    if(ov)ov.classList.add('hidden');
    if(mo)mo.classList.add('hidden');
    return;
  }
  var slide=root.querySelector('#slide');
  var err=root.querySelector('#error');
  var load=root.querySelector('#loading');
  var dots=root.querySelector('#dots');
  var overlay=root.querySelector('#overlay');
  var modal=root.querySelector('#modal');
  var pos=0,timer;
  IMAGES.forEach(function(_,i){
    var b=document.createElement('button');
    b.type='button';
    b.setAttribute('aria-label','Tampilkan gambar '+(i+1));
    b.onclick=function(){change(i);restart();};
    dots.appendChild(b);
  });
  function change(i){
    pos=(i+IMAGES.length)%IMAGES.length;
    if(err)err.style.display='none';
    if(load)load.style.display='grid';
    slide.classList.add('loading');
    slide.removeAttribute('src');
    Array.prototype.forEach.call(dots.children,function(b,j){b.classList.toggle('active',pos===j);});
    slide.src=IMAGES[pos];
  }
  slide.onload=function(){slide.classList.remove('loading');if(load)load.style.display='none';if(err)err.style.display='none';};
  slide.onerror=function(){slide.classList.remove('loading');if(load)load.style.display='none';if(err)err.style.display='none';};
  function restart(){clearInterval(timer);timer=setInterval(function(){change((pos+1)%IMAGES.length);},7000);}
  function finishHide(){overlay.classList.add('hidden');modal.classList.add('hidden');overlay.classList.remove('closing');modal.classList.remove('closing');}
  function hide(){clearInterval(timer);localStorage.setItem(DELAY_KEY,String(Date.now()));overlay.classList.add('closing');modal.classList.add('closing');setTimeout(finishHide,2400);}
  function show(){overlay.classList.remove('hidden');modal.classList.remove('hidden');requestAnimationFrame(function(){overlay.classList.remove('closing');modal.classList.remove('closing');});change(pos);restart();}
  root.querySelector('#prev').onclick=function(){change(pos-1);restart();};
  root.querySelector('#next').onclick=function(){change(pos+1);restart();};
  root.querySelector('#close').onclick=hide;
  root.querySelector('#ok').onclick=hide;
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.classList.contains('hidden'))hide();});
  show();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
