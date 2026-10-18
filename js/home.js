
document.addEventListener('DOMContentLoaded', function () {
  var box = document.getElementById('testi');
  if (!box) return;
  var slides = box.querySelectorAll('.testi-slide');
  var dotsBox = document.getElementById('testi-dots');
  var current = 0, timer;

  slides.forEach(function (_, i) {
    var d = document.createElement('button');
    d.className = 'testi-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    d.addEventListener('click', function () { show(i); restart(); });
    dotsBox.appendChild(d);
  });

  function show(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    dotsBox.querySelectorAll('.testi-dot').forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }
  function restart() { clearInterval(timer); timer = setInterval(function () { show(current + 1); }, 6000); }

  document.getElementById('testi-prev').addEventListener('click', function () { show(current - 1); restart(); });
  document.getElementById('testi-next').addEventListener('click', function () { show(current + 1); restart(); });
  restart();
});

document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('hero-typed');
  if (!el) return;
  var words = ['modern websites.', 'online stores.', 'strong brands.', 'sites that sell.'];
  var w = 0, ch = 0, del = false;

  function tick() {
    var word = words[w];
    ch += del ? -1 : 1;
    el.textContent = word.substring(0, ch);
    var wait = del ? 40 : 90;
    if (!del && ch === word.length) { del = true; wait = 1500; }
    else if (del && ch === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
    setTimeout(tick, wait);
  }
  tick();
});