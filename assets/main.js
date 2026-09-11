(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);

  btn.addEventListener('click', function () {
    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = root.getAttribute('data-theme') || (dark ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // If a project screenshot is missing, drop back to the text-only card
  // layout rather than showing a broken image.
  document.querySelectorAll('.shot img').forEach(function (img) {
    img.addEventListener('error', function () {
      var fig = img.closest('.shot');
      var card = img.closest('.project');
      if (fig) fig.remove();
      if (card) card.classList.add('no-shot');
    });
  });

  var items = document.querySelectorAll('.project, .skill-group, .about-body, .section-title');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });

  // Safety net: never let the reveal animation hide content permanently.
  setTimeout(function () {
    items.forEach(function (el) { el.classList.add('in'); });
  }, 4000);
})();
