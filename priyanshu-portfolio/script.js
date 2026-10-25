(() => {
  const header = document.querySelector('.site-header');
  const links = [...document.querySelectorAll('.nav-link')];
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-pill');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 35);
    let current = 'home';
    document.querySelectorAll('main section[id]').forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Gentle pointer parallax on large screens, with no movement on touch devices.
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.profile-card, .statement-card, .contact-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - .5;
        const y = (event.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }
})();