// ============================================
// NAV — scroll state + mobile toggle
// ============================================
function initNav() {
  const nav    = document.querySelector('.nav');
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

// ============================================
// REVEAL
// A single opacity step per block, plus one authored entrance for the
// hero words. Content is visible by default in CSS; the `js` class set
// in each page head is what arms the hidden state, so a script failure
// can never hide the page.
// ============================================
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // The hero mask reveal. 120ms to let the first paint settle, then a
  // 55ms stagger — short enough that the line still reads as one unit.
  const words = document.querySelectorAll('.hero-title .word-inner');
  if (!words.length) return;
  setTimeout(() => {
    words.forEach((w, i) => setTimeout(() => w.classList.add('visible'), i * 55));
  }, 120);
}

// ============================================
// IMAGE LIGHTBOX
// ============================================
function initImageModal() {
  const figures = document.querySelectorAll('.project-figure img');
  if (!figures.length) return;

  const modal = document.createElement('div');
  modal.className = 'img-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="img-modal-backdrop"></div>
    <div class="img-modal-content">
      <img src="" alt="">
      <span class="img-modal-caption"></span>
    </div>
    <button class="img-modal-close" type="button" aria-label="Close image">
      <svg class="ic" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg>
    </button>
  `;
  document.body.appendChild(modal);

  const modalImg     = modal.querySelector('.img-modal-content img');
  const modalCaption = modal.querySelector('.img-modal-caption');
  const backdrop     = modal.querySelector('.img-modal-backdrop');
  const closeBtn     = modal.querySelector('.img-modal-close');

  let lastFocused = null;

  function openModal(src, alt, caption) {
    lastFocused = document.activeElement;
    modalImg.src = src;
    modalImg.alt = alt;
    modalCaption.textContent = caption || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  figures.forEach(img => {
    img.addEventListener('click', () => {
      const caption = img.closest('figure')?.querySelector('figcaption')?.textContent || '';
      openModal(img.currentSrc || img.src, img.alt, caption);
    });
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Close on Escape, and hold focus on the only control the dialog has
  // so Tab cannot walk out into the page behind it.
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      e.preventDefault();
      closeBtn.focus();
    }
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initImageModal();
});
