/* ═══════════════════════════════════════════
   Odontolab Soacha — Scripts principales
   Desarrollado por Libeldata
═══════════════════════════════════════════ */

  // Navbar transparente → blanco al scroll
  const nav = document.querySelector('.nav');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const halfway = document.body.scrollHeight / 2;
    if(window.scrollY > halfway){
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
  scrollTopBtn.addEventListener('mouseover', ()=>{ scrollTopBtn.style.background='#1F2D3D'; });
  scrollTopBtn.addEventListener('mouseout',  ()=>{ scrollTopBtn.style.background='rgba(31,45,61,.75)'; });

  // Testimonials carousel
  const testimonials = [
    {
      quote: "Me hicieron el blanqueamiento dental y quedé increíblemente satisfecha. El resultado fue natural y el proceso muy cómodo. El equipo fue atento en todo momento.",
      name: "Paola Ramírez", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"P",
      color: "linear-gradient(135deg,#C7E8D5,#7FBE9C)"
    },
    {
      quote: "Me pusieron un implante y la atención fue excelente de principio a fin. Profesionales muy capacitados, me explicaron cada paso y el resultado es perfecto.",
      name: "Hernán Torres", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"H",
      color: "linear-gradient(135deg,#FED7C4,#E8A48E)"
    },
    {
      quote: "Llevo varios meses de ortodoncia y el avance es notable. Los controles siempre puntuales y el equipo resuelve todas mis dudas con paciencia y amabilidad.",
      name: "Valentina Nieto", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"V",
      color: "linear-gradient(135deg,#D9D2F0,#9F92D6)"
    },
    {
      quote: "Me diseñaron la sonrisa con carillas y el cambio fue total. Me siento mucho más segura de sonreír. Trabajo de altísima calidad y a un precio justo.",
      name: "Diana Morales", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"D",
      color: "linear-gradient(135deg,#C9E0F2,#7DA9CC)"
    },
    {
      quote: "Vine asustada por una endodoncia y fue la experiencia más tranquila que he tenido en un consultorio dental. Cero dolor, mucha profesionalidad. Súper recomendados.",
      name: "Juliana Castro", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"J",
      color: "linear-gradient(135deg,#F5D5DD,#D695A4)"
    }
  ];

  const dotsEl = document.getElementById('testDots');
  let current = 0;
  testimonials.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i===0?' active':'');
    d.addEventListener('click', () => render(i));
    dotsEl.appendChild(d);
  });

  function render(i){
    current = (i + testimonials.length) % testimonials.length;
    const t = testimonials[current];
    const card = document.getElementById('testCard');
    card.style.opacity = 0;
    setTimeout(()=>{
      document.getElementById('testQuote').textContent = t.quote;
      document.getElementById('testName').textContent = t.name;
      document.getElementById('testLoc').textContent = t.loc;
      document.getElementById('ratingNum').textContent = t.rating;
      const av = document.getElementById('testAvatar');
      av.textContent = t.initial;
      av.style.background = t.color;
      [...dotsEl.children].forEach((d,idx)=>d.classList.toggle('active', idx===current));
      card.style.opacity = 1;
    }, 150);
  }

  // Reveal del test-card
  const testCardEl = document.getElementById('testCard');
  testCardEl.style.opacity = '0';
  testCardEl.style.transform = 'translateY(22px)';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    testCardEl.style.transition = 'opacity .65s ease, transform .65s ease';
    new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        testCardEl.style.opacity = '1';
        testCardEl.style.transform = 'translateY(0)';
        setTimeout(()=>{ testCardEl.style.transition = 'opacity .25s'; }, 700);
      }
    }, {threshold: 0.15}).observe(testCardEl);
  }));

  document.getElementById('prevBtn').addEventListener('click', ()=>{
    document.getElementById('prevBtn').classList.add('active');
    document.getElementById('nextBtn').classList.remove('active');
    render(current-1);
  });
  document.getElementById('nextBtn').addEventListener('click', ()=>{
    document.getElementById('nextBtn').classList.add('active');
    document.getElementById('prevBtn').classList.remove('active');
    render(current+1);
  });
  setInterval(()=>render(current+1), 7000);

  function handleSubmit(e){
    e.preventDefault();
    const btn = e.target.querySelector('.send-btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje enviado!';
    btn.style.background = '#2e5e3b';
    setTimeout(()=>{
      btn.innerHTML = original; btn.style.background='';
      e.target.reset();
    }, 2400);
    return false;
  }

  // ── Service card highlight desde footer ──
  document.querySelectorAll('a[href^="#svc-"]').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const card = document.querySelector(targetId);
      if(!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if('onscrollend' in window){
        window.addEventListener('scrollend', () => {
          card.classList.add('svc-flash');
          card.addEventListener('animationend', () => {
            card.classList.remove('svc-flash');
          }, { once: true });
        }, { once: true });
      } else {
        setTimeout(() => {
          card.classList.add('svc-flash');
          card.addEventListener('animationend', () => {
            card.classList.remove('svc-flash');
          }, { once: true });
        }, 1000);
      }
    });
  });

  // ── Hamburguesa mobile ──
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if(id.length>1){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'}); }
      }
    });
  });
