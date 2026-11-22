/*
 * DIGITECHBOSS — konfigurasi CTA WhatsApp
 * ============================================================
 * ISI NOMOR WHATSAPP DI BARIS DI BAWAH INI.
 * Contoh:
 *   const WHATSAPP_URL = 'https://wa.me/62xxxxxxxxxx?text=Halo%20Digitechboss';
 *
 * Biarkan kosong ('') jika belum punya nomor. Semua tombol akan
 * menampilkan notifikasi "belum diisi" instead of membuka link.
 * ============================================================
 */
const WHATSAPP_URL = 'https://wa.me/6285174099513?text=Halo%20Digitechboss%2C%20saya%20mau%20tanya%20tentang%20mesin%20jualan';

// Terapkan ke semua elemen dengan atribut data-wa
document.querySelectorAll('[data-wa]').forEach(function (el) {
  if (WHATSAPP_URL && WHATSAPP_URL.trim() !== '') {
    el.setAttribute('href', WHATSAPP_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  } else {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var toast = document.getElementById('waToast');
      if (toast) {
        toast.classList.add('show');
        clearTimeout(window.__waToastTimer);
        window.__waToastTimer = setTimeout(function () {
          toast.classList.remove('show');
        }, 4500);
      }
    });
  }
});

// Nav berubah saat scroll
var nav = document.getElementById('nav');
window.addEventListener('scroll', function () {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Masuk halus untuk anchor
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = a.getAttribute('href');
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ============ CAROUSEL GENERIC ============ */
(function () {
  function Carousel(opt) {
    var track = document.getElementById(opt.track);
    if (!track) return;
    var prev = document.getElementById(opt.prev);
    var next = document.getElementById(opt.next);
    var dots = document.getElementById(opt.dots);
    var wrap = document.getElementById(opt.wrap);
    var items = Array.prototype.slice.call(track.children);
    var index = 0, per = 1, timer;

    function calcPer() {
      if (opt.mode === 'grid') {
        var cols = window.innerWidth <= 600 ? 1 : (window.innerWidth <= 900 ? 2 : 4);
        return cols * 2;
      }
      return 1;
    }
    function maxIndex() { return Math.max(0, Math.ceil(items.length / per) - 1); }

    function buildDots() {
      dots.innerHTML = '';
      for (var i = 0; i <= maxIndex(); i++) {
        (function (n) {
          var b = document.createElement('button');
          b.setAttribute('aria-label', 'Slide ' + (n + 1));
          b.addEventListener('click', function () { go(n); reset(); });
          dots.appendChild(b);
        })(i);
      }
    }

    function go(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      var w = items[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      var step = opt.mode === 'grid' ? (per / 2) * (w + gap) : (w + gap);
      track.style.transform = 'translateX(-' + (index * step) + 'px)';
      Array.prototype.forEach.call(dots.children, function (d, n) { d.classList.toggle('on', n === index); });
    }

    function reset() {
      clearInterval(timer);
      timer = setInterval(function () { go(index >= maxIndex() ? 0 : index + 1); }, opt.delay);
    }

    prev.addEventListener('click', function () { go(index - 1); reset(); });
    next.addEventListener('click', function () { go(index + 1); reset(); });
    wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
    wrap.addEventListener('mouseleave', reset);
    window.addEventListener('resize', function () { per = calcPer(); buildDots(); go(index); reset(); });
    per = calcPer(); buildDots(); go(0); reset();
  }

  Carousel({ mode: 'grid', wrap: 'carWrap', track: 'carTrack', prev: 'carPrev', next: 'carNext', dots: 'carDots', delay: 4500 });
  Carousel({ mode: 'slide', wrap: 'demoWrap', track: 'demoTrack', prev: 'demoPrev', next: 'demoNext', dots: 'demoDots', delay: 9000 });
})();

/* ============ REVEAL ON SCROLL ============ */
(function () {
  var els = document.querySelectorAll('.sec-head, .card, .step, .box');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(els, function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  Array.prototype.forEach.call(els, function (e) { e.classList.add('reveal'); io.observe(e); });
})();

/* ============ PROGRESS BAR ============ */
window.addEventListener('scroll', function () {
  var bar = document.getElementById('scrollProgress');
  if (!bar) return;
  var h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
});
