// Scroll reveal
(function(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});
  },{threshold:0.06});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// FAQ
document.querySelectorAll('.faq-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.parentElement;
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!open)item.classList.add('open');
  });
});

// Burger
(function(){
  const burger=document.getElementById('burger');
  const drawer=document.getElementById('navDrawer');
  const overlay=document.getElementById('navOverlay');
  if(!burger||!drawer)return;
  function toggle(open){
    burger.classList.toggle('open',open);
    drawer.classList.toggle('open',open);
    overlay.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  }
  burger.addEventListener('click',()=>toggle(!drawer.classList.contains('open')));
  overlay.addEventListener('click',()=>toggle(false));
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
})();

// Carousel
document.querySelectorAll('[data-carousel]').forEach(wrap=>{
  const track=wrap.querySelector('.carousel-track');
  const slides=wrap.querySelectorAll('.slide');
  const prev=wrap.querySelector('.carousel-prev');
  const next=wrap.querySelector('.carousel-next');
  const dotsWrap=wrap.querySelector('.carousel-dots');
  let cur=0;
  const total=slides.length;
  if(total<=1)return;

  // dots
  slides.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='carousel-dot'+(i===0?' active':'');
    d.addEventListener('click',()=>go(i));
    dotsWrap.appendChild(d);
  });

  function handleVideo(idx){
    slides.forEach((slide,i)=>{
      const v=slide.querySelector('video');
      if(!v)return;
      if(i===idx){
        // try with sound first (requires prior user gesture)
        v.muted=false;
        const p=v.play();
        if(p!==undefined){
          p.catch(()=>{
            // fallback: play muted, show tap-to-unmute overlay
            v.muted=true;
            v.play().catch(()=>{});
            let overlay=slide.querySelector('.vid-unmute');
            if(!overlay){
              overlay=document.createElement('button');
              overlay.className='vid-unmute';
              overlay.textContent='🔊 Нажмите для звука';
              overlay.style.cssText='position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.6);color:#fff;border:none;padding:.5rem 1rem;font-size:.8rem;cursor:pointer;border-radius:2rem;z-index:20;';
              slide.style.position='relative';
              slide.appendChild(overlay);
              overlay.addEventListener('click',()=>{
                v.muted=false;
                v.play().catch(()=>{});
                overlay.remove();
              },{once:true});
            }
          });
        }
      } else {
        v.pause();
        v.currentTime=0;
        v.muted=true;
        const overlay=slide.querySelector('.vid-unmute');
        if(overlay)overlay.remove();
      }
    });
  }

  function go(n){
    cur=(n+total)%total;
    track.style.transform=`translateX(-${cur*100}%)`;
    wrap.querySelectorAll('.carousel-dot').forEach((d,i)=>d.classList.toggle('active',i===cur));
    handleVideo(cur);
  }
  if(prev)prev.addEventListener('click',()=>go(cur-1));
  if(next)next.addEventListener('click',()=>go(cur+1));

  // touch swipe
  let sx=0;
  track.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  track.addEventListener('touchend',e=>{
    const dx=sx-e.changedTouches[0].clientX;
    if(Math.abs(dx)>40)go(cur+(dx>0?1:-1));
  });
});
