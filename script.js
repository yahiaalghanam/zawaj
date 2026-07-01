/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         WEDDING INVITATION — MAIN SCRIPT                     ║
 * ║  All content driven by data.js — do NOT edit content here.   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
'use strict';

/* ══════════════════════════════════════════════════════════════
   A0 — SECTION VISIBILITY
   Reads weddingData.sections and hides disabled sections.
   Also hides adjacent dividers so no empty gaps appear.
   To hide a section: set its key to false in data.js → sections{}
══════════════════════════════════════════════════════════════ */
function applySectionVisibility() {
  const cfg = weddingData.sections || {};

  const SECTION_MAP = {
    hero:      '[data-section="hero"]',
    quran:     '[data-section="quran"]',
    countdown: '[data-section="countdown"]',
    details:   '[data-section="details"]',
    location:  '[data-section="location"]',
    calendar:  '[data-section="calendar"]',
    rsvp:      '[data-section="rsvp"]',
    blessings: '[data-section="blessings"]',
    gallery:   '[data-section="gallery"]',
    final:     '[data-section="final"]',
    footer:    '[data-section="footer"]',
  };

  const NAV_MAP = {
    hero:      'hero',
    countdown: 'countdown',
    details:   'details',
    location:  'location',
    calendar:  'calendar',
    rsvp:      'rsvp',
    gallery:   'gallery',
    final:     'final',
  };

  Object.entries(SECTION_MAP).forEach(([key, selector]) => {
    const visible = cfg[key] !== false;
    if (visible) return;

    const el = document.querySelector(selector);
    if (!el) return;

    el.style.display = 'none';

    // Hide divider immediately before this section
    let prev = el.previousElementSibling;
    while (prev) {
      if (prev.classList.contains('divider')) { prev.style.display = 'none'; break; }
      if (!prev.classList.contains('divider')) break;
      prev = prev.previousElementSibling;
    }

    // Hide divider immediately after this section
    let next = el.nextElementSibling;
    while (next) {
      if (next.classList.contains('divider')) { next.style.display = 'none'; break; }
      if (!next.classList.contains('divider')) break;
      next = next.nextElementSibling;
    }
  });

  // Hide nav-dots for disabled sections
  Object.entries(NAV_MAP).forEach(([key, sectionId]) => {
    const visible = cfg[key] !== false;
    const dot = document.querySelector(`.nav-dot[data-section="${sectionId}"]`);
    if (dot) dot.style.display = visible ? '' : 'none';
  });
}


/* ══════════════════════════════════════════════════════════════
   A — DATA RENDERER
   Reads weddingData (from data.js) and populates the DOM.
   Called once on DOMContentLoaded.
══════════════════════════════════════════════════════════════ */
function renderWeddingData() {
  const d   = weddingData;
  const el  = id       => document.getElementById(id);
  const qs  = sel      => document.querySelector(sel);
  const set = (id, t)  => { const e = el(id); if (e) e.textContent = t; };
  const htm = (id, h)  => { const e = el(id); if (e) e.innerHTML   = h; };
  const att = (id,a,v) => { const e = el(id); if (e) e.setAttribute(a, v); };

  // ── 1. Page title & meta ──────────────────────────────────
  const { bride, groom } = d.couple;
  const title = `${bride.nameEn} & ${groom.nameEn} — Wedding Invitation`;
  document.title = title;
  qs('meta[name="description"]')?.setAttribute('content',
    `Join us celebrating the wedding of ${bride.nameEn} & ${groom.nameEn}. You are warmly invited.`);
  qs('meta[property="og:title"]')?.setAttribute('content',
    `${bride.nameEn} & ${groom.nameEn} — Wedding Invitation`);
  qs('meta[property="og:description"]')?.setAttribute('content',
    `We invite you to celebrate our wedding on ${d.event.dateDisplayEn}`);
  qs('meta[property="og:url"]')?.setAttribute('content',   d.seo.siteUrl);
  qs('meta[property="og:image"]')?.setAttribute('content', d.seo.ogImage);
  qs('meta[name="twitter:title"]')?.setAttribute('content', title);
  qs('meta[name="twitter:image"]')?.setAttribute('content', d.seo.ogImage);

  // ── 2. Opening screen background (image or video) ─────────
  renderOpeningMedia(d.media);

  // ── 3. Hero couple photo ──────────────────────────────────
  renderHeroPhoto(d.media);

  // ── 4. Hero section text ──────────────────────────────────
  set('hero-bismillah', d.couple.bismillah);
  set('hero-bride',     bride.nameAr);
  set('hero-groom',     groom.nameAr);
  set('hero-invite-ar', d.couple.inviteAr);
  set('hero-invite-en', d.couple.inviteEn);

  // Date parts: 15 · March · 2025
  const dateParts = el('hero-date-parts');
  if (dateParts && d.event.dateShort) {
    dateParts.innerHTML = d.event.dateShort
      .map(p => `<span>${p}</span>`)
      .join('<span class="hero-date-sep" aria-hidden="true">·</span>');
  }

  // ── 5. Quran verse ────────────────────────────────────────
  set('quran-verse',  d.quran.verseAr);
  set('quran-source', d.quran.sourceAr);

  // ── 6. Event detail cards ─────────────────────────────────
  const v = d.event.venue;
  set('detail-venue-ar',   v.nameAr);
  set('detail-venue-en',   v.nameEn);
  set('detail-date-ar',    d.event.dateDisplayAr);
  set('detail-date-en',    d.event.dateDisplayEn);
  set('detail-time-ar',    d.event.timeAr);
  set('detail-time-en',    d.event.timeEn);
  set('detail-address-ar', v.addressAr);
  set('detail-address-en', v.addressEn);

  // ── 7. Location section ───────────────────────────────────
  set('location-address', v.fullLabelAr || `${v.nameAr} — ${v.addressAr}`);
  const mapsBtn = el('maps-btn');
  if (mapsBtn) mapsBtn.href = v.mapsLink;

  // ── 8. RSVP buttons ───────────────────────────────────────
  set('rsvp-deadline-ar', d.event.rsvpDeadlineAr);
  set('rsvp-deadline-en', d.event.rsvpDeadlineEn);
  const num    = d.event.rsvpWhatsapp;
  const yesMsg = encodeURIComponent(`🌹 أؤكد حضوري لحفل زفاف ${bride.nameAr} و${groom.nameAr} ✨`);
  const noMsg  = encodeURIComponent(`أعتذر عن حضور حفل زفاف ${bride.nameAr} و${groom.nameAr}`);
  const yesBtn = el('rsvp-yes-btn');
  const noBtn  = el('rsvp-no-btn');
  if (yesBtn) yesBtn.href = `https://wa.me/${num}?text=${yesMsg}`;
  if (noBtn)  noBtn.href  = `https://wa.me/${num}?text=${noMsg}`;

  // ── 9. Blessings section ──────────────────────────────────
  set('wishes-title-en', d.texts.blessingTitleEn);
  htm('wishes-text-ar',  d.texts.blessingAr.replace(/\n/g, '<br>'));
  htm('wishes-text-en',  d.texts.blessingEn.replace(/\n/g, '<br>'));

  // ── 10. Gallery ───────────────────────────────────────────
  renderGallery(d.gallery);

  // ── 11. Final section ─────────────────────────────────────
  set('final-title-ar',    d.texts.finalTitleAr);
  set('final-subtitle-en', d.texts.finalSubtitleEn);
  htm('final-msg-ar',      d.texts.finalMsgAr.replace(/\n/g, '<br>'));
  htm('final-msg-en',      d.texts.finalMsgEn.replace(/\n/g, '<br>'));
  set('final-bride',       bride.nameAr);
  set('final-groom',       groom.nameAr);
  const fd = el('final-couple-date');
  if (fd) fd.textContent = d.event.dateDisplayEn;

  // WhatsApp share button
  const shareBtn = el('whatsapp-share-btn');
  if (shareBtn) {
    const msg = d.sharing.customMessage ||
      `🌹 You're warmly invited to the wedding of ${bride.nameEn} & ${groom.nameEn}` +
      ` on ${d.event.dateDisplayEn} at ${d.event.timeEn}. ${v.nameEn}, ${v.addressEn}.`;
    shareBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }

  // ── 12. Footer ────────────────────────────────────────────
  const br    = d.branding;
  const fName = el('footer-brand-name');
  const fLogo = el('footer-logo');
  if (br.logo && br.logo.trim()) {
    if (fLogo) { fLogo.src = br.logo; fLogo.alt = br.name; fLogo.style.display = 'block'; }
    if (fName) fName.style.display = 'none';
  } else {
    if (fName) fName.textContent = br.name;
    if (fLogo) fLogo.style.display = 'none';
  }
  set('footer-tagline',   br.tagline);
  att('footer-whatsapp',  'href', br.social.whatsapp);
  att('footer-instagram', 'href', br.social.instagram);
  att('footer-facebook',  'href', br.social.facebook);
  set('footer-copy-text', `© ${br.year} ${br.name} · All rights reserved`);
}


/* ══════════════════════════════════════════════════════════════
   B — OPENING MEDIA RENDERER
   Set media.openingImage or media.openingVideo in data.js.
   Video takes priority when both are set.
   Works with local filenames and full https:// URLs.
══════════════════════════════════════════════════════════════ */
function renderOpeningMedia(media) {
  const imgEl   = document.getElementById('opening-bg-img');
  const videoEl = document.getElementById('opening-bg-video');

  const videoSrc = (media.openingVideo || '').trim();
  const imageSrc = (media.openingImage || '').trim();

  if (videoSrc) {
    // ── VIDEO ──────────────────────────────────────────────
    if (imgEl) imgEl.style.display = 'none';

    if (videoEl) {
      videoEl.style.display    = 'block';
      videoEl.style.opacity    = '0';
      videoEl.style.transition = 'opacity 1.2s ease';
      videoEl.src = videoSrc;
      videoEl.load();
      videoEl.play().catch(() => {});

      videoEl.addEventListener('canplay', function handler() {
        videoEl.style.opacity = '0.75';
        videoEl.removeEventListener('canplay', handler);
      });
    }

  } else if (imageSrc) {
    // ── IMAGE ──────────────────────────────────────────────
    if (videoEl) videoEl.style.display = 'none';

    if (imgEl) {
      imgEl.style.display    = 'block';
      imgEl.style.opacity    = '0';
      imgEl.style.transition = 'opacity 1.8s ease';

      const showImage = () => {
        imgEl.style.opacity = '0.8';
      };

      const onError = () => {
        imgEl.style.display = 'none';
        console.warn(
          '[Wedding] Opening image not found: "' + imageSrc + '"\n' +
          'Make sure the file is in the same folder as index.html\n' +
          'and the filename matches exactly (case-sensitive).'
        );
      };

      // Attach listeners BEFORE setting src
      imgEl.addEventListener('load',  showImage, { once: true });
      imgEl.addEventListener('error', onError,   { once: true });

      imgEl.src = imageSrc;

      // Handle cached images — load event may have already fired
      if (imgEl.complete && imgEl.naturalWidth > 0) {
        showImage();
      }
    }
  }
  // If both empty → .opening-bg-default dark gradient shows automatically
}


/* ══════════════════════════════════════════════════════════════
   C — HERO PHOTO RENDERER
   Reads data.js → media.couplePhoto
   Handles load reveal and error fallback.
══════════════════════════════════════════════════════════════ */
function renderHeroPhoto(media) {
  const heroImg     = document.querySelector('.hero-photo');
  const heroWrapper = document.querySelector('.hero-photo-wrapper');
  if (!heroImg) return;

  const src = (media.couplePhoto || '').trim();
  if (!src) return;

  heroImg.alt = media.couplePhotoAlt || '';
  heroImg.src = src;

  const reveal = () => {
    heroImg.classList.add('is-loaded');
    if (heroWrapper) heroWrapper.classList.add('is-loaded');
  };

  heroImg.addEventListener('error', () => {
    heroImg.style.display = 'none';
    if (heroWrapper) heroWrapper.classList.add('is-loaded');
  }, { once: true });

  if (heroImg.complete && heroImg.naturalWidth > 0) {
    reveal();
  } else {
    heroImg.addEventListener('load', reveal, { once: true });
  }
}


/* ══════════════════════════════════════════════════════════════
   D — GALLERY RENDERER
   Reads data.js → gallery[]
   Each entry: { src: "path.jpg", alt: "caption" }
   Empty array → shows placeholder cards
══════════════════════════════════════════════════════════════ */
const PH_GRADIENTS = [
  'linear-gradient(145deg,#C9A07A,#8B5E3C,#3A2010)',
  'linear-gradient(145deg,#9A7870,#6B4E42,#3F2B23)',
  'linear-gradient(145deg,#B09070,#7A5E44,#4A3020)',
  'linear-gradient(155deg,#A89080,#6C5048,#3C2820)',
  'linear-gradient(145deg,#C0A080,#886050,#503828)',
  'linear-gradient(145deg,#B8A888,#80604A,#48301E)',
];

const EXPAND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="15 3 21 3 21 9"/>
  <polyline points="9 21 3 21 3 15"/>
  <line x1="21" y1="3" x2="14" y2="10"/>
  <line x1="3" y1="21" x2="10" y2="14"/>
</svg>`;

function renderGallery(photos) {
  const track    = document.getElementById('gallery-track');
  const dotsWrap = document.getElementById('gallery-dots');
  if (!track) return;

  const count = Math.max(photos.length, 6);
  let html = '';

  for (let i = 0; i < count; i++) {
    const photo    = photos[i];
    const gradient = PH_GRADIENTS[i % PH_GRADIENTS.length];

    const innerHtml = photo
      ? `<img class="gc-img" src="${photo.src}"
              alt="${photo.alt || 'Photo ' + (i + 1)}"
              loading="lazy" draggable="false">`
      : `<div class="gc-placeholder" style="background:${gradient}">
           <span class="gc-ph-icon" aria-hidden="true">♡</span>
           <span class="gc-ph-text" aria-hidden="true">add photo</span>
         </div>`;

    html += `
      <div class="gc" role="listitem" data-index="${i}" tabindex="0"
           aria-label="Gallery photo ${i + 1}">
        <div class="gc-img-wrap">${innerHtml}</div>
        <div class="gc-overlay" aria-hidden="true">${EXPAND_SVG}</div>
      </div>`;
  }

  track.innerHTML = html;

  // Lazy-load with IntersectionObserver
  const imgs = track.querySelectorAll('.gc-img');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;

      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
      img.addEventListener('error', () => {
        img.classList.add('is-error');
        const wrap = img.closest('.gc-img-wrap');
        if (wrap) wrap.style.background =
          PH_GRADIENTS[parseInt(img.closest('.gc').dataset.index) % PH_GRADIENTS.length];
      }, { once: true });

      if (img.complete && img.naturalWidth > 0) img.classList.add('is-loaded');
      obs.unobserve(img);
    });
  }, { rootMargin: '0px 0px 300px 0px', threshold: 0.01 });

  imgs.forEach(img => observer.observe(img));

  // Build dot indicators
  if (dotsWrap) {
    dotsWrap.innerHTML = Array.from({ length: count }, (_, i) =>
      `<button class="gallery-dot${i === 0 ? ' is-active' : ''}"
               data-dot="${i}" aria-label="Go to photo ${i + 1}"></button>`
    ).join('');
  }

  initGallerySwipe(track, dotsWrap, count);
}


/* ══════════════════════════════════════════════════════════════
   E — SWIPE ENGINE
   Touch + mouse drag, snap scrolling, active dot sync.
══════════════════════════════════════════════════════════════ */
function initGallerySwipe(track, dotsWrap, count) {
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  let activeIdx = 0;

  const syncActive = (idx) => {
    activeIdx = idx;
    track.querySelectorAll('.gc').forEach((c, i) =>
      c.classList.toggle('is-active', i === idx));
    dotsWrap && dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) =>
      d.classList.toggle('is-active', i === idx));
  };

  const scrollToCard = (idx) => {
    const cards = track.querySelectorAll('.gc');
    if (!cards[idx]) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect  = cards[idx].getBoundingClientRect();
    const offset    = cardRect.left - trackRect.left - (trackRect.width - cardRect.width) / 2;
    track.scrollBy({ left: offset, behavior: 'smooth' });
    syncActive(idx);
  };

  prevBtn && prevBtn.addEventListener('click', () => scrollToCard(Math.max(0, activeIdx - 1)));
  nextBtn && nextBtn.addEventListener('click', () => scrollToCard(Math.min(count - 1, activeIdx + 1)));

  dotsWrap && dotsWrap.addEventListener('click', e => {
    const dot = e.target.closest('.gallery-dot');
    if (dot) scrollToCard(parseInt(dot.dataset.dot));
  });

  // Detect centred card via IntersectionObserver
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        syncActive(parseInt(entry.target.dataset.index));
      }
    });
  }, { root: track, threshold: 0.5 });

  track.querySelectorAll('.gc').forEach(c => cardObserver.observe(c));

  // Mouse drag
  let isDragging = false, startX = 0, scrollLeft = 0;
  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX     = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.2;
  });
  const stopDrag = () => { isDragging = false; track.classList.remove('is-dragging'); };
  track.addEventListener('mouseup',    stopDrag);
  track.addEventListener('mouseleave', stopDrag);

  // Keyboard
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  scrollToCard(Math.max(0, activeIdx - 1));
    if (e.key === 'ArrowRight') scrollToCard(Math.min(count - 1, activeIdx + 1));
  });

  // Card click → full-screen viewer
  track.addEventListener('click', e => {
    if (track.classList.contains('is-dragging')) return;
    const card = e.target.closest('.gc');
    if (card) openFSViewer(weddingData.gallery, parseInt(card.dataset.index));
  });

  setTimeout(() => scrollToCard(0), 60);
}


/* ══════════════════════════════════════════════════════════════
   F — FULL-SCREEN PHOTO VIEWER
   Opens on gallery card tap. Supports swipe, keyboard, arrows.
══════════════════════════════════════════════════════════════ */
let fsCurrentIdx  = 0;
let fsTotalPhotos = 0;
let fsPhotos      = [];

function openFSViewer(photos, startIdx) {
  const viewer = document.getElementById('fs-viewer');
  if (!viewer) return;

  fsPhotos      = photos;
  fsTotalPhotos = photos.length;
  fsCurrentIdx  = startIdx;

  viewer.classList.add('is-open');
  viewer.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('no-scroll');

  buildFsDots(fsCurrentIdx, fsTotalPhotos);

  if (fsTotalPhotos === 0) {
    viewer.classList.remove('has-image');
    updateFSCounter(0, 0);
  } else {
    loadFSPhoto(fsCurrentIdx);
  }

  document.getElementById('fs-close') && document.getElementById('fs-close').focus();
}

function loadFSPhoto(idx) {
  const viewer  = document.getElementById('fs-viewer');
  const fsImg   = document.getElementById('fs-img');
  const blurBg  = document.getElementById('fs-blur-bg');
  const imgWrap = document.getElementById('fs-img-wrap');
  if (!viewer || !fsImg) return;

  const photo = fsPhotos[idx];
  if (!photo) {
    viewer.classList.remove('has-image');
    updateFSCounter(idx, fsTotalPhotos);
    syncFsDots(idx);
    return;
  }

  if (imgWrap) imgWrap.classList.add('is-transitioning');

  const probe    = new Image();
  probe.onload  = () => {
    fsImg.src = photo.src;
    fsImg.alt = photo.alt || ('Photo ' + (idx + 1));
    if (blurBg) blurBg.style.backgroundImage = `url('${photo.src}')`;
    viewer.classList.add('has-image');
    if (imgWrap) imgWrap.classList.remove('is-transitioning');
    // Re-trigger CSS entry animation
    fsImg.style.animation = 'none';
    void fsImg.offsetWidth;
    fsImg.style.animation = '';
  };
  probe.onerror = () => {
    viewer.classList.remove('has-image');
    if (imgWrap) imgWrap.classList.remove('is-transitioning');
  };
  probe.src = photo.src;

  updateFSCounter(idx, fsTotalPhotos);
  syncFsDots(idx);
}

function updateFSCounter(idx, total) {
  const counter = document.getElementById('fs-counter');
  if (counter) counter.textContent = total > 0 ? `${idx + 1} / ${total}` : '';
}

function buildFsDots(activeIdx, total) {
  const wrap = document.getElementById('fs-dots');
  if (!wrap) return;
  wrap.innerHTML = Array.from({ length: total }, (_, i) =>
    `<button class="fs-dot${i === activeIdx ? ' is-active' : ''}"
             data-idx="${i}" aria-label="Photo ${i + 1}"></button>`
  ).join('');
  wrap.addEventListener('click', e => {
    const dot = e.target.closest('.fs-dot');
    if (dot) { fsCurrentIdx = parseInt(dot.dataset.idx); loadFSPhoto(fsCurrentIdx); }
  });
}

function syncFsDots(idx) {
  document.querySelectorAll('.fs-dot').forEach((d, i) =>
    d.classList.toggle('is-active', i === idx));
}

function closeFSViewer() {
  const viewer = document.getElementById('fs-viewer');
  if (!viewer) return;
  viewer.classList.remove('is-open');
  viewer.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('no-scroll');
}

function initFSViewer() {
  const closeBtn = document.getElementById('fs-close');
  const prevBtn  = document.getElementById('fs-prev');
  const nextBtn  = document.getElementById('fs-next');
  const viewer   = document.getElementById('fs-viewer');

  closeBtn && closeBtn.addEventListener('click', closeFSViewer);

  prevBtn && prevBtn.addEventListener('click', () => {
    if (fsTotalPhotos < 1) return;
    fsCurrentIdx = (fsCurrentIdx - 1 + fsTotalPhotos) % fsTotalPhotos;
    loadFSPhoto(fsCurrentIdx);
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    if (fsTotalPhotos < 1) return;
    fsCurrentIdx = (fsCurrentIdx + 1) % fsTotalPhotos;
    loadFSPhoto(fsCurrentIdx);
  });

  // Click backdrop to close
  viewer && viewer.addEventListener('click', e => {
    if (e.target === viewer) closeFSViewer();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!viewer || !viewer.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeFSViewer(); return; }
    if (e.key === 'ArrowLeft') {
      fsCurrentIdx = (fsCurrentIdx - 1 + fsTotalPhotos) % fsTotalPhotos;
      loadFSPhoto(fsCurrentIdx);
    }
    if (e.key === 'ArrowRight') {
      fsCurrentIdx = (fsCurrentIdx + 1) % fsTotalPhotos;
      loadFSPhoto(fsCurrentIdx);
    }
  });

  // Touch swipe inside viewer
  let touchStartX = 0;
  viewer && viewer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  viewer && viewer.addEventListener('touchend', e => {
    if (fsTotalPhotos < 1) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) {
      fsCurrentIdx = (fsCurrentIdx + 1) % fsTotalPhotos;
    } else {
      fsCurrentIdx = (fsCurrentIdx - 1 + fsTotalPhotos) % fsTotalPhotos;
    }
    loadFSPhoto(fsCurrentIdx);
  }, { passive: true });
}


/* ══════════════════════════════════════════════════════════════
   G — AUDIO ENGINE
══════════════════════════════════════════════════════════════ */
const bgMusic   = new Audio();
bgMusic.loop    = true;
bgMusic.preload = 'none';
bgMusic.volume  = 0;

let audioCtx;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function fadeInAudio() {
  const target = weddingData.music.volume;
  const steps  = 60;
  const stepMs = weddingData.music.fadeInMs / steps;
  let   step   = 0;
  const tick   = setInterval(() => {
    step++;
    bgMusic.volume = Math.min(target, step * (target / steps));
    if (step >= steps) clearInterval(tick);
  }, stepMs);
}

function playMusicWithFade() {
  bgMusic.src = weddingData.music.src;
  const ctx   = getAudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  bgMusic.play().then(fadeInAudio).catch(() => {});
  updateMusicBtnUI(true);
}

function updateMusicBtnUI(playing) {
  const btn = document.getElementById('music-btn');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(playing));
  const noteIco  = document.getElementById('music-ico-note');
  const pauseIco = document.getElementById('music-ico-pause');
  if (noteIco)  noteIco.classList.toggle('is-hidden',  playing);
  if (pauseIco) pauseIco.classList.toggle('is-hidden', !playing);
}


/* ══════════════════════════════════════════════════════════════
   H — COUNTDOWN ENGINE
   Reads date from weddingData.event.date in data.js.
══════════════════════════════════════════════════════════════ */
function initCountdown() {
  const targetMs = new Date(weddingData.event.date).getTime();
  const section  = document.querySelector('.s-countdown');

  if (section) {
    const msg     = document.createElement('div');
    msg.className = 'celebration-msg';
    msg.innerHTML =
      `<p class="celebration-msg-ar" lang="ar" dir="rtl">لقد بدأ الاحتفال! بارك الله لهما ✨</p>
       <p class="celebration-msg-en">The celebration has begun — May Allah bless them ✨</p>`;
    const grid = section.querySelector('.countdown-grid');
    if (grid) grid.after(msg);
  }

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-minutes');
  const sEl = document.getElementById('cd-seconds');

  const pad  = n => String(n).padStart(2, '0');

  const tick = (el, val) => {
    if (el && el.innerText !== val) {
      el.innerText = val;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    }
  };

  const run = () => {
    const diff = targetMs - Date.now();
    if (diff <= 0) {
      [dEl, hEl, mEl, sEl].forEach(e => { if (e) e.innerText = '00'; });
      if (section) section.classList.add('is-celebrated');
      return;
    }
    tick(dEl, pad(Math.floor(diff / 86400000)));
    tick(hEl, pad(Math.floor((diff % 86400000) / 3600000)));
    tick(mEl, pad(Math.floor((diff % 3600000)  / 60000)));
    tick(sEl, pad(Math.floor((diff % 60000)    / 1000)));
  };

  run();
  setInterval(run, 1000);
}


/* ══════════════════════════════════════════════════════════════
   I — CALENDAR EXPORT
   All values read from weddingData in data.js.
══════════════════════════════════════════════════════════════ */
function buildICS() {
  const { event, couple, branding } = weddingData;
  const sMs = new Date(event.date).getTime();
  const eMs = sMs + event.durationHours * 3600000;
  const fmt = ms => {
    const d = new Date(ms);
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
  };
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    `PRODID:-//${branding.name}//Wedding//EN`,
    'BEGIN:VEVENT',
    `DTSTART:${fmt(sMs)}`,
    `DTEND:${fmt(eMs)}`,
    `SUMMARY:Wedding of ${couple.bride.nameEn} & ${couple.groom.nameEn}`,
    'DESCRIPTION:You are warmly invited.',
    `LOCATION:${event.venue.nameEn}, ${event.venue.addressEn}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS() {
  const { bride, groom } = weddingData.couple;
  const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `${groom.nameEn}-${bride.nameEn}-wedding.ics`.replace(/\s/g, '-');
  a.click();
  URL.revokeObjectURL(a.href);
}

window.addToGoogleCalendar = e => {
  e.preventDefault();
  const { event, couple } = weddingData;
  const s   = new Date(event.date).getTime();
  const end = s + event.durationHours * 3600000;
  const fmt = ms => new Date(ms).toISOString().replace(/[-:]/g, '').replace('.000', '');
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action',   'TEMPLATE');
  url.searchParams.set('text',     `Wedding of ${couple.bride.nameEn} & ${couple.groom.nameEn}`);
  url.searchParams.set('dates',    `${fmt(s)}/${fmt(end)}`);
  url.searchParams.set('details',  'You are warmly invited.');
  url.searchParams.set('location', `${event.venue.nameEn}, ${event.venue.addressEn}`);
  window.open(url.toString(), '_blank', 'noopener,noreferrer');
};

window.addToAppleCalendar = e => { e.preventDefault(); downloadICS(); };
window.addToOutlook       = e => { e.preventDefault(); downloadICS(); };


/* ══════════════════════════════════════════════════════════════
   J — PARTICLES
══════════════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');
  let   particles = [];
  let   frameId;

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
      this.x    = Math.random() * canvas.width;
      this.y    = canvas.height + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.vy   = Math.random() * 0.4 + 0.1;
      this.vx   = Math.sin(Math.random() * 2) * 0.15;
      this.op   = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.y -= this.vy;
      this.x += this.vx;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle   = `rgba(237,212,160,${this.op})`;
      ctx.shadowBlur  = 4;
      ctx.shadowColor = '#C79545';
      ctx.fill();
    }
  }

  const count = Math.min(Math.floor(window.innerWidth / 12), 50);
  for (let i = 0; i < count; i++) particles.push(new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    particles.forEach(p => { p.update(); p.draw(); });
    frameId = requestAnimationFrame(animate);
  };
  animate();

  // Returns a cancel function
  return () => cancelAnimationFrame(frameId);
}


/* ══════════════════════════════════════════════════════════════
   K — SCROLL ENGINE
   Reveal animations, progress bar, back-to-top, nav dots.
══════════════════════════════════════════════════════════════ */
function initScrollEngine(invMain) {
  const reveals   = document.querySelectorAll('.reveal');
  const scrollBar = document.getElementById('scroll-bar');
  const progWrap  = document.querySelector('.scroll-progress');
  const navDots   = document.querySelectorAll('.nav-dot[data-section]');
  const backBtn   = document.getElementById('back-to-top');

  // Only track sections that are visible
  const sections = ['hero', 'countdown', 'details', 'location', 'calendar', 'rsvp', 'gallery', 'final']
    .map(id => document.getElementById(id))
    .filter(el => el && el.style.display !== 'none');

  const run = () => {
    const trigY = window.innerHeight * 0.88;

    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < trigY) el.classList.add('is-revealed');
    });

    if (scrollBar && invMain && !invMain.classList.contains('is-hidden')) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
      if (progWrap) progWrap.setAttribute('aria-valuenow', Math.round(window.scrollY / (docH || 1) * 100));
    }

    if (backBtn) {
      const past = window.scrollY > 400;
      backBtn.classList.toggle('is-visible', past);
      backBtn.classList.toggle('is-hidden',  !past);
    }

    let activeId = '';
    const half   = window.innerHeight * 0.5;
    sections.forEach(s => { if (s.getBoundingClientRect().top <= half) activeId = s.id; });
    navDots.forEach(d => d.classList.toggle('is-active', d.dataset.section === activeId));
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { run(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  return run;
}


/* ══════════════════════════════════════════════════════════════
   L — CONFETTI
══════════════════════════════════════════════════════════════ */
function initConfetti() {
  const canvas  = document.getElementById('confetti-canvas');
  const trigger = document.getElementById('rsvp-yes-btn');
  if (!canvas || !trigger) return;

  const ctx    = canvas.getContext('2d');
  const COLORS = ['#C79545','#DDB96B','#EDD4A0','#C4A0A0','#EDD5D5','#FAF7F2','#9C7030'];
  let   pieces = [];
  let   frame;

  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  class Piece {
    constructor() {
      this.x     = Math.random() * canvas.width;
      this.y     = -10;
      this.w     = Math.random() * 10 + 4;
      this.h     = Math.random() * 5 + 3;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.vx    = (Math.random() - 0.5) * 3;
      this.vy    = Math.random() * 3 + 2;
      this.rot   = Math.random() * Math.PI * 2;
      this.rotV  = (Math.random() - 0.5) * 0.15;
      this.alpha = 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.rot += this.rotV;
      if (this.y > canvas.height * 0.85) this.alpha -= 0.025;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = this.color;
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      ctx.restore();
    }
  }

  trigger.addEventListener('click', () => {
    canvas.classList.add('is-active');
    for (let i = 0; i < 140; i++) pieces.push(new Piece());

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces = pieces.filter(p => p.alpha > 0);
      pieces.forEach(p => { p.update(); p.draw(); });
      if (pieces.length) {
        frame = requestAnimationFrame(run);
      } else {
        canvas.classList.remove('is-active');
      }
    };

    cancelAnimationFrame(frame);
    run();
  });
}


/* ══════════════════════════════════════════════════════════════
   M — BOOTSTRAP
   Entry point — runs when DOM is ready.
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Render all content from data.js into the DOM
  renderWeddingData();

  // 2. Apply section visibility (hide sections set to false in data.js)
  applySectionVisibility();

  // 3. Loading screen
  const loadingScreen = document.getElementById('loading-screen');
  document.documentElement.classList.add('no-scroll');
  window.addEventListener('load', () => {
    setTimeout(() => { if (loadingScreen) loadingScreen.classList.add('is-hidden'); }, 600);
  });
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('is-hidden')) {
      loadingScreen.classList.add('is-hidden');
    }
  }, 3000);

  // 4. Init feature modules
  let stopParticles = initParticles();
  initCountdown();
  initFSViewer();
  initConfetti();

  const invMain      = document.getElementById('invitation');
  const handleScroll = initScrollEngine(invMain);

  // 5. Music button toggle
  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      const playing = musicBtn.getAttribute('aria-pressed') === 'true';
      if (playing) {
        const fade = setInterval(() => {
          if (bgMusic.volume > 0.05) {
            bgMusic.volume -= 0.05;
          } else {
            bgMusic.pause();
            bgMusic.volume = 0;
            clearInterval(fade);
          }
        }, 60);
        updateMusicBtnUI(false);
      } else {
        playMusicWithFade();
      }
    });
  }

  // 6. Open invitation button
  const openBtn       = document.getElementById('open-btn');
  const openingScreen = document.getElementById('opening-screen');
  const navDotsNav    = document.getElementById('nav-dots');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openBtn.style.transform = 'scale(0.96)';
      if (openingScreen) openingScreen.classList.add('fade-out');
      if (invMain)       invMain.classList.remove('is-hidden');

      setTimeout(() => {
        if (invMain)    invMain.classList.add('is-visible');
        document.documentElement.classList.remove('no-scroll');
        window.scrollTo({ top: 0, behavior: 'instant' });
        handleScroll();
        if (musicBtn)   musicBtn.classList.remove('is-hidden');
        if (navDotsNav) navDotsNav.classList.remove('is-hidden');
        if (stopParticles) { stopParticles(); stopParticles = null; }
      }, 800);

      setTimeout(() => { if (navDotsNav) navDotsNav.classList.add('is-visible'); }, 1400);

      // Start music automatically after user interaction
      playMusicWithFade();
    });
  }

  // 7. Touch feedback for cards
  document.querySelectorAll('.countdown-card, .detail-card').forEach(el => {
    el.addEventListener('touchstart', () => {
      el.style.transform = 'translateY(-3px) scale(0.99)';
    }, { passive: true });
    el.addEventListener('touchend', () => {
      el.style.transform = '';
    }, { passive: true });
  });

});
