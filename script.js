// Theme toggle, year, smooth anchors, and scrollspy
(function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Theme toggle
  const btn = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const user = localStorage.getItem('tg-theme');
  const dark = user ? user === 'dark' : prefersDark;

  function setTheme(isDark){
    document.documentElement.style.setProperty('--bg', isDark ? '#0b0f14' : '#f6f8fa');
    document.documentElement.style.setProperty('--card', isDark ? '#111722' : '#ffffff');
    document.documentElement.style.setProperty('--text', isDark ? '#e6edf3' : '#0b1320');
    document.documentElement.style.setProperty('--muted', isDark ? '#96a3b2' : '#5b6b7d');
    document.documentElement.style.setProperty('--border', isDark ? '#1d2633' : '#dde3ea');
    if(btn) btn.textContent = isDark ? '☀' : '☾';
  }

  setTheme(dark);
  btn?.addEventListener('click', ()=>{
    const isDark = btn.textContent === '☾';
    const next = !isDark;
    setTheme(next);
    localStorage.setItem('tg-theme', next ? 'dark' : 'light');
  });

  // Smooth anchor handling (offset not needed as no fixed header over content)
  document.querySelectorAll('.side-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      const el = id ? document.querySelector(id) : null;
      if(el){
        el.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', id);
      }
    })
  })

  // Scrollspy active link
  const links = Array.from(document.querySelectorAll('.side-nav a[href^="#"]'));
  const sections = links
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = links.find(l => l.getAttribute('href') === id);
      if(link){
        if(entry.isIntersecting){
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    })
  }, {rootMargin: '-40% 0px -55% 0px', threshold: [0, 1]});

  sections.forEach(sec => observer.observe(sec));
})();
