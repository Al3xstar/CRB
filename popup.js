
(function(){
  "use strict";
  if(window.__ceriabetNeonPopupLoaded) return;
  window.__ceriabetNeonPopupLoaded=true;
  function mount(){
    if(document.getElementById('modal')) return;
    const style=document.createElement('style');
    style.id='ceriabet-neon-style';
    style.textContent='#ceriabet-popup-root{font-family:Arial,sans-serif;color:#fff}\n\n*{box-sizing:border-box}\n\n\n#overlay{\n  position:fixed;inset:0;z-index:10;\n  background:#020008c9;\n  backdrop-filter:blur(7px);\n  -webkit-backdrop-filter:blur(7px);\n  opacity:1;\n  transition:opacity .28s ease;\n}\n#overlay.hidden,#modal.hidden{display:none}\n#overlay.closing{opacity:0}\n#modal{\n  position:fixed;\n  left:50%;top:50%;transform:translate(-50%,-50%) scale(1);\n  z-index:11;\n  width:min(720px,94vw);\n  height:min(92dvh,860px);\n  max-height:92dvh;\n  overflow:hidden;\n  display:flex;flex-direction:column;\n  gap:clamp(6px,.9vh,10px);\n  padding:clamp(10px,1.8vh,18px) clamp(11px,2vw,20px) clamp(9px,1.5vh,16px);\n  border-radius:25px;\n  background:linear-gradient(155deg,#1b0937 0%,#0b041c 52%,#17062e 100%);\n  border:2px solid #ba5bff;\n  box-shadow:\n    0 0 0 5px #33055b,\n    0 0 28px #c545ff,\n    0 0 56px rgba(68,84,255,.35),\n    inset 0 0 25px rgba(143,48,255,.11);\n  opacity:1;\n  transition:opacity .28s ease, transform .28s cubic-bezier(.22,.8,.28,1);\n}\n#modal::before{\n  content:"";pointer-events:none;position:absolute;inset:7px;\n  border:1px solid rgba(27,225,255,.72);border-radius:18px;\n  box-shadow:inset 0 0 18px rgba(25,204,255,.08);\n}\n#modal.closing{\n  opacity:0;\n  transform:translate(-50%,-50%) scale(.90);\n}\nheader{\n  position:relative;\n  height:clamp(36px,7vh,64px);\n  display:flex;align-items:center;justify-content:center;\n  padding:0 44px;flex:0 0 auto;\n}\n.logo{display:flex;align-items:center;justify-content:center}\n.logo img{\n  display:block;\n  width:auto;\n  height:clamp(26px,5.2vh,46px);\n  max-width:min(160px,44vw);\n  object-fit:contain;\n}\n#close{\n  position:absolute;right:0;top:0;\n  width:clamp(29px,5vh,38px);height:clamp(29px,5vh,38px);\n  border-radius:50%;border:1px solid #f1caff;\n  background:linear-gradient(#a642ff,#3a117f);\n  color:#fff;font-size:23px;line-height:1;cursor:pointer;\n  box-shadow:0 0 15px #a642ff;\n}\n#stage{\n  position:relative;\n  flex:1 1 auto;\n  min-height:260px;\n  width:100%;\n  border-radius:16px;\n  border:1px solid #a75aff;\n  background:radial-gradient(circle at 50% 40%,#2e1154 0%,#110525 55%,#09031b 100%);\n  overflow:hidden;\n  display:flex;align-items:center;justify-content:center;\n  box-shadow:inset 0 0 22px rgba(132,34,217,.33),0 0 14px rgba(138,35,206,.28);\n}\n#slide{\n  display:block;\n  width:100%;height:100%;\n  object-fit:contain;\n  position:relative;z-index:1;\n  opacity:1;\n  transition:opacity .22s ease;\n}\n#slide.loading{opacity:.01}\n#loading{\n  position:absolute;inset:0;display:grid;place-items:center;\n  color:#e5cdff;font-size:14px;z-index:0\n}\n#error{\n  display:none;position:absolute;inset:0;z-index:3;\n  background:#180a2d;color:#fff;\n  align-items:center;justify-content:center;flex-direction:column;\n  gap:12px;padding:18px;text-align:center;font-size:13px\n}\n#error span{color:#c9b5ef;font-size:12px;max-width:360px;line-height:1.5}\n.nav{\n  position:absolute;z-index:4;top:50%;transform:translateY(-50%);\n  width:38px;height:54px;border-radius:12px;border:1px solid #41dcff;\n  background:#260b5dda;color:white;font-size:30px;cursor:pointer;\n  box-shadow:0 0 11px #238df8\n}\n#prev{left:8px}#next{right:8px}\n#dots{display:flex;justify-content:center;gap:8px;min-height:10px;flex:0 0 auto}\n#dots button{width:8px;height:8px;padding:0;border:0;border-radius:50%;background:#805e9f;cursor:pointer}\n#dots button.active{background:#d1a6ff;box-shadow:0 0 10px #c45bff}\n.ticker{\n  flex:0 0 auto;\n  background:#22093c;border:1px solid #6d29ab;border-radius:8px;\n  white-space:nowrap;overflow:hidden;font-size:clamp(10px,1.45vh,13px);\n  padding:clamp(7px,1vh,10px) 0;font-weight:800\n}\n.ticker span{display:inline-block;animation:marquee 18s linear infinite;padding-left:100%}\n@keyframes marquee{to{transform:translateX(-100%)}}\n.gifs{display:flex;gap:12px;justify-content:center;flex:0 0 auto}\n.gifs img{\n  width:clamp(46px, min(8.5vh, 18vw), 86px);\n  height:clamp(46px, min(8.5vh, 18vw), 86px);\n  object-fit:cover;border:1px solid #b35bfa;border-radius:12px;\n  box-shadow:0 0 12px rgba(164,65,254,.47)\n}\n.actions{display:grid;grid-template-columns:1fr 1fr;gap:9px;flex:0 0 auto}\n.actions a,.actions button{\n  border:1px solid #c189ff;border-radius:12px;\n  background:linear-gradient(#8736de,#3b0b72);\n  padding:clamp(8px,1.2vh,12px) 5px;text-align:center;\n  font-size:clamp(10px,1.45vh,13px);color:#fff;text-decoration:none;\n  font-weight:900;cursor:pointer\n}\n.actions .red{background:linear-gradient(#eb263f,#960824);border-color:#ff677c}\n.actions .ok{grid-column:1/-1;max-width:150px;width:100%;justify-self:center}\n.count{\n  flex:0 0 auto;margin:0;padding-top:2px;\n  text-align:center;color:#c9a7e8;font-size:clamp(9px,1.18vh,11px);\n  letter-spacing:1.15px;text-transform:uppercase;text-shadow:0 0 8px #9444ff\n}\n@media(max-width:480px){\n  #modal{width:95vw;height:min(93dvh,820px);padding:10px 10px 9px}\n  header{height:clamp(34px,6.3vh,52px)}\n  .logo img{max-width:140px;height:32px}\n  .nav{height:42px;width:30px;font-size:24px}\n  .gifs{gap:8px}\n  .actions{gap:7px}\n}\n@media(max-height:560px){\n  #modal{gap:4px;padding-top:8px;padding-bottom:8px}\n  .gifs img{width:38px;height:38px}\n  .actions a,.actions button{padding:6px 4px}\n}\n';
    document.head.appendChild(style);
    const container=document.createElement('div');
    container.id='ceriabet-popup-root';
    container.innerHTML='<div id="overlay"></div>\n<main id="modal" role="dialog" aria-label="Popup CERIABET">\n  <header>\n    <div class="logo"><img src="https://api2-crb.imgnxb.com/images/pod13iqh6ae/logo_96c00afb-2339-4071-aabc-5685e6905423_1793335296610.gif" alt="Logo CERIABET" loading="eager"></div>\n    <button id="close" aria-label="Tutup">×</button>\n  </header>\n\n  <div id="stage">\n    <div id="loading">Memuat gambar promo...</div>\n    <img id="slide" class="loading" alt="Promo CERIABET" referrerpolicy="no-referrer">\n    <div id="error"><strong>Gambar tidak bisa dimuat langsung dari server image2url.</strong><span>Buka file HTML ini di Chrome atau Firefox. Jika masih gagal, host gambar perlu mengizinkan hotlink atau gambar dipindahkan ke hosting lain.</span></div>\n    <button class="nav" id="prev" aria-label="Sebelumnya">‹</button>\n    <button class="nav" id="next" aria-label="Berikutnya">›</button>\n  </div>\n\n  <div id="dots"></div>\n  <div class="ticker"><span>CARI PENGALAMAN KEMENANGAN BESAR? DAFTAR DAN MAINKAN SEKARANG JUGA DI CERIABET!</span></div>\n  <div class="gifs">\n    <img alt="Starlight Princess" src="https://media.tenor.com/ky4lyYmnHlsAAAAM/starlight-princess-slot-inces.gif">\n    <img alt="Mahjong Ways" src="https://media.tenor.com/Yd-FAxXmftkAAAAM/pg-soft-mahjong-ways.gif">\n    <img alt="Lucky Neko" src="https://imgcdn.it.com/knb2zump50st9c6kzrne/VIP_AI88/lucky_neko.webp">\n  </div>\n  <div class="actions">\n    <a href="https://ceriavpn.online/allinone" target="_blank" rel="noopener">⚽ ALL IN ONE</a>\n    <a class="red" href="https://aplikasi.ceriabetsbo.com" target="_blank" rel="noopener">📲 DOWNLOAD APK</a>\n    <button class="ok" id="ok">OK</button>\n  </div>\n  <div class="count" id="count">All Rights Reserved © CERIABET</div>\n</main>';
    document.body.appendChild(container);

const images=[
  'https://www.image2url.com/r2/default/images/1788097990438-2047cc2f-6da2-4728-8cb4-325b7b151283.png',
  'https://www.image2url.com/r2/default/images/1788097935225-ab0482a5-3215-49ad-a6e0-195629ad2ab9.png',
  'https://www.image2url.com/r2/default/images/1788098117610-0a2b8737-6add-4fed-86f9-b12a4fdaf8f6.png'
];
const slide=document.getElementById('slide');
const err=document.getElementById('error');
const load=document.getElementById('loading');
const dots=document.getElementById('dots');
const overlay=document.getElementById('overlay');
const modal=document.getElementById('modal');
let pos=0,timer;
images.forEach((_,i)=>{
  const b=document.createElement('button');
  b.type='button';
  b.setAttribute('aria-label','Tampilkan gambar '+(i+1));
  b.onclick=()=>{change(i);restart()};
  dots.appendChild(b);
});
function change(i){
  pos=(i+images.length)%images.length;
  err.style.display='none';
  load.style.display='grid';
  slide.classList.add('loading');
  slide.removeAttribute('src');
  [...dots.children].forEach((b,j)=>b.classList.toggle('active',pos===j));
  slide.src=images[pos];
}
slide.onload=()=>{
  slide.classList.remove('loading');
  load.style.display='none';
  err.style.display='none';
};
slide.onerror=()=>{
  slide.classList.remove('loading');
  load.style.display='none';
  err.style.display='flex';
};
function restart(){
  clearInterval(timer);
  timer=setInterval(()=>change((pos+1)%images.length),7000);
}
function finishHide(){
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
  overlay.classList.remove('closing');
  modal.classList.remove('closing');
}
function hide(){
  clearInterval(timer);
  overlay.classList.add('closing');
  modal.classList.add('closing');
  setTimeout(finishHide,290);
}
function show(){
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  requestAnimationFrame(()=>{
    overlay.classList.remove('closing');
    modal.classList.remove('closing');
  });
  change(pos);
  restart();
}
document.getElementById('prev').onclick=()=>{change(pos-1);restart()};
document.getElementById('next').onclick=()=>{change(pos+1);restart()};
document.getElementById('close').onclick=hide;
document.getElementById('ok').onclick=hide;
document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
show();

  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
