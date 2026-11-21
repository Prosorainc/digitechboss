/*
 * DIGITECHBOSS — konfigurasi CTA WhatsApp
 * ============================================================
 * ISI NOMOR WHATSAPP DI BARIS DI BAWAH INI.
 * Contoh:
 *   const WHATSAPP_URL = 'https://wa.me/6281234567890?text=Halo%20Digitechboss%2C%20saya%20mau%20tanya';
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
