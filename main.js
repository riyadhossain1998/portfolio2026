// ============================================
// CONTENT LOADER — reads content.json and populates the page
// ============================================
async function loadContent() {
  try {
    const res = await fetch('./content.json');
    const c = await res.json();

    // Helper to get nested key e.g. "hero.eyebrow"
    const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

    // Populate [data-content] elements
    document.querySelectorAll('[data-content]').forEach(el => {
      const val = get(c, el.dataset.content);
      if (val !== undefined) el.textContent = val;
    });

    buildNav(c);
    buildHero(c);
    buildMarquee(c);
    buildProjects(c);
    buildAboutCta(c);
    buildContact(c);
    buildFooter(c);
  } catch (e) {
    console.warn('content.json failed to load:', e);
  }
}

function buildNav(c) {
  const navLinks = document.getElementById('nav-links');
  const mobileLinks = document.getElementById('mobile-menu-links');
  if (!navLinks) return;

  c.nav.links.forEach(link => {
    [navLinks, mobileLinks].forEach(container => {
      if (!container) return;
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      container.appendChild(a);
    });
  });
}

function buildHero(c) {
  const titleEl = document.getElementById('hero-title');
  if (!titleEl) return;

  // Build title lines with italic accent word
  const accent = c.hero.accentWord;
  c.hero.titleLines.forEach((line, lineIdx) => {
    const lineDiv = document.createElement('div');
    lineDiv.style.display = 'block';

    // Split line into words, wrapping accent word in <em>
    const words = line.split(' ');
    words.forEach((word, wordIdx) => {
      const isAccent = word.toLowerCase() === accent.toLowerCase();
      const wrapper = document.createElement('span');
      wrapper.className = 'word';
      wrapper.style.transitionDelay = `${0.4 + (lineIdx * words.length + wordIdx) * 0.06}s`;

      const inner = document.createElement('span');
      inner.className = 'word-inner';

      if (isAccent) {
        const em = document.createElement('em');
        em.textContent = word;
        inner.appendChild(em);
      } else {
        inner.textContent = word;
      }

      wrapper.appendChild(inner);
      lineDiv.appendChild(wrapper);

      // Add space between words (not after last)
      if (wordIdx < words.length - 1) {
        lineDiv.appendChild(document.createTextNode('\u00A0'));
      }
    });

    titleEl.appendChild(lineDiv);
  });

  // CTA buttons
  const ctaEl = document.getElementById('hero-cta');
  if (ctaEl) {
    const primary = document.createElement('a');
    primary.href = c.hero.cta.primary.href;
    primary.className = 'btn btn-primary magnetic';
    primary.textContent = c.hero.cta.primary.label;

    const secondary = document.createElement('a');
    secondary.href = c.hero.cta.secondary.href;
    secondary.className = 'btn btn-ghost magnetic';
    secondary.textContent = c.hero.cta.secondary.label;

    ctaEl.appendChild(primary);
    ctaEl.appendChild(secondary);
  }
}

function buildMarquee(c) {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Duplicate items for seamless loop
  const items = [...c.marquee.items, ...c.marquee.items];
  items.forEach(item => {
    const el = document.createElement('span');
    el.className = 'marquee-item';
    el.textContent = item;
    track.appendChild(el);
  });
}

function buildProjects(c) {
  const list = document.getElementById('project-list');
  if (!list) return;

  c.work.projects.forEach((proj, i) => {
    const a = document.createElement('a');
    a.href = proj.href;
    a.className = 'project-item reveal' + (i % 2 !== 0 ? ' reverse' : '');

    a.innerHTML = `
      <div class="project-image">
        <div class="project-placeholder" style="background: ${proj.gradient}">
          <span>${proj.number}</span>
        </div>
      </div>
      <div class="project-info">
        <span class="project-number">${proj.number}</span>
        <span class="project-category">${proj.category}</span>
        <h3 class="project-name">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        <span class="project-link">
          View Case Study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    `;

    list.appendChild(a);
  });
}

function buildAboutCta(c) {
  const cta = document.getElementById('about-cta');
  if (!cta) return;
  cta.href = c.about.cta.href;
  cta.textContent = c.about.cta.label;
}

function buildContact(c) {
  const form = document.getElementById('contact-form');
  if (form) form.action = c.contact.formAction;

  const btn = document.getElementById('submit-btn');
  if (btn) {
    btn.querySelector('span').textContent = c.contact.submitLabel;
  }
}

function buildFooter(c) {
  const links = document.getElementById('footer-links');
  if (links) {
    c.footer.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      if (!link.href.startsWith('mailto')) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      links.appendChild(a);
    });
  }

  const copy = document.getElementById('footer-copy');
  if (copy) {
    copy.textContent = `© ${new Date().getFullYear()} ${c.footer.name}. ${c.footer.tagline}`;
  }
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCursor() {
  if (window.matchMedia('(max-width: 560px)').matches) return;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isVisible = false;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with lerp
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on links/buttons
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, input, textarea, [role="button"]')) {
      ring.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, input, textarea, [role="button"]')) {
      ring.classList.remove('hover');
    }
  });

  // Click pulse
  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('click'));

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
  });
}

// ============================================
// NAV — scroll + mobile toggle
// ============================================
function initNav() {
  const nav    = document.querySelector('.nav');
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ============================================
// SCROLL REVEAL — IntersectionObserver
// ============================================
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Also trigger word animations inside this element
        entry.target.querySelectorAll('.word-inner').forEach(w => w.classList.add('visible'));

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Trigger hero words on load
  setTimeout(() => {
    document.querySelectorAll('#hero-title .word-inner').forEach(w => w.classList.add('visible'));
  }, 400);
}

// ============================================
// SMOOTH ANCHOR SCROLL
// ============================================
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const span = btn.querySelector('span');
    span.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.textContent = 'Message sent! I\'ll get back to you soon.';
        status.className = 'success';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please try again.';
        status.className = 'error';
      }
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'error';
    }

    span.textContent = 'Send Message';
    btn.disabled = false;
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadContent();
  initCursor();
  initNav();
  initReveal();
  initSmoothScroll();
  initMagnetic();
  initContactForm();
});
