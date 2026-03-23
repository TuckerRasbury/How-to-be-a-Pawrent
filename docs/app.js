// ============================================================
// app.js — all interactivity for Sunny & Luna care site
// Depends on: data.js (loaded first in index.html)
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentMode = localStorage.getItem('pawrent-mode') || DEFAULT_MODE;
let heroBgPhotos = [];
let heroBgIndex = 0;
let lightboxPhotos = [];
let lightboxIndex = 0;
let carouselTimers = {};

// All discovered photo paths (populated on init)
const allPhotos = { sunny: [], luna: [] };

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  discoverPhotos().then(() => {
    renderEmergencyContent();
    renderEmergencyPage();
    renderDogPage('sunny');
    renderDogPage('luna');
    renderPhotoGrid();
    applyMode(currentMode, false);
    startClock();
    setupSwipe(document.getElementById('lightbox'), lightboxSwipeHandler);
  });
});

// ── PAGE ROUTING ─────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === name);
  });
  // scroll to top on page change
  window.scrollTo(0, 0);
}

// ── MODE TOGGLE ───────────────────────────────────────────────
function setMode(mode) {
  currentMode = mode;
  localStorage.setItem('pawrent-mode', mode);
  applyMode(mode, true);
}

function applyMode(mode, rerender) {
  document.getElementById('btn-wfh').classList.toggle('active', mode === 'wfh');
  document.getElementById('btn-office').classList.toggle('active', mode === 'office');
  document.getElementById('office-banner').classList.toggle('hidden', mode !== 'office');
  renderTimeline();
  renderWhatsNext();
}

// ── CLOCK & WHAT'S NEXT ───────────────────────────────────────
function startClock() {
  renderWhatsNext();
  setInterval(renderWhatsNext, 30000);
}

function renderWhatsNext() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const nowMins = h * 60 + m;

  // Format current time display
  const timeStr = formatTime12(h, m);
  document.getElementById('current-time').textContent = 'Current time: ' + timeStr;

  const schedule = SCHEDULE[currentMode];
  const sorted = [...schedule].sort((a, b) => timeToMins(a.time) - timeToMins(b.time));

  const container = document.getElementById('whats-next');
  container.innerHTML = '';

  ['sunny', 'luna'].forEach(dog => {
    const dog_tasks = sorted.filter(t => t.dog === dog || t.dog === 'both');
    const info = getTaskForDog(dog_tasks, nowMins);
    const dogData = DOGS[dog];

    const el = document.createElement('div');
    el.className = 'whats-next-dog';
    el.innerHTML = `
      <div class="wnd-dot" style="background:var(--${dog})"></div>
      <div>
        <div class="wnd-name">${dogData.name}</div>
        <div class="wnd-task">${escHtml(info.activity)}</div>
        <div class="wnd-time">${escHtml(info.timeLabel)}</div>
      </div>
    `;
    container.appendChild(el);
  });

  // Hero background cycling
  updateHeroBg();
}

function getTaskForDog(tasks, nowMins) {
  if (!tasks.length) return { activity: 'All done for today', timeLabel: '' };

  // Find a task that is "current" (started, not yet past)
  for (let i = 0; i < tasks.length; i++) {
    const taskMins = timeToMins(tasks[i].time);
    const nextMins = i + 1 < tasks.length ? timeToMins(tasks[i + 1].time) : taskMins + 90;
    if (nowMins >= taskMins && nowMins < nextMins) {
      return {
        activity: tasks[i].activity,
        timeLabel: 'Right now · started ' + formatTime12h(tasks[i].time),
      };
    }
  }

  // Find the next upcoming task
  const upcoming = tasks.find(t => timeToMins(t.time) > nowMins);
  if (upcoming) {
    const mins = timeToMins(upcoming.time) - nowMins;
    const label = mins < 60
      ? `in ${mins} min · at ${formatTime12h(upcoming.time)}`
      : `at ${formatTime12h(upcoming.time)}`;
    return { activity: upcoming.activity, timeLabel: 'Coming up ' + label };
  }

  // All tasks past
  return { activity: 'All wrapped up for today', timeLabel: '' };
}

// ── TIMELINE ──────────────────────────────────────────────────
function renderTimeline() {
  const schedule = SCHEDULE[currentMode];
  const sorted = [...schedule].sort((a, b) => timeToMins(a.time) - timeToMins(b.time));

  const container = document.getElementById('timeline');
  container.innerHTML = '';

  sorted.forEach(item => {
    const dogData = DOGS[item.dog === 'both' ? 'sunny' : item.dog];
    const color = item.dog === 'both'
      ? `linear-gradient(135deg, var(--sunny), var(--luna))`
      : `var(--${item.dog})`;

    const block = document.createElement('div');
    block.className = 'timeline-block';
    block.innerHTML = `
      <div class="block-header" onclick="toggleBlock(this.parentElement)">
        <span class="block-time">${formatTime12h(item.time)}</span>
        <span class="block-dog-dot" style="background:var(--${item.dog === 'both' ? 'sunny' : item.dog})"></span>
        <span class="block-dog-name" style="color:var(--${item.dog === 'both' ? 'sunny' : item.dog})">${item.dog === 'both' ? 'Both' : (DOGS[item.dog]?.name || item.dog)}</span>
        <span class="block-activity">${escHtml(item.activity)}</span>
        ${item.nonNeg ? '<span class="non-neg-badge">Non-Negotiable</span>' : ''}
        <span class="block-chevron">▾</span>
      </div>
      <div class="block-details">
        <div class="block-details-inner">${escHtml(item.details)}</div>
      </div>
    `;
    container.appendChild(block);
  });
}

function toggleBlock(el) {
  el.classList.toggle('open');
}

// ── DOG PAGES ─────────────────────────────────────────────────
function renderDogPage(dogKey) {
  const dog = DOGS[dogKey];

  // Stats
  const statsEl = document.getElementById(dogKey + '-stats');
  const stats = [
    { label: 'Breed', value: dog.breed },
    { label: 'Born', value: dog.born },
    { label: 'Sex', value: dog.sex },
    { label: 'Weight', value: dog.weight },
    { label: 'Energy', value: dog.energy },
  ];
  statsEl.innerHTML = stats.map(s => `
    <div class="dog-stat">
      <div class="dog-stat-label">${escHtml(s.label)}</div>
      <div class="dog-stat-value">${escHtml(s.value)}</div>
    </div>
  `).join('');

  // Carousel
  renderCarousel(dogKey, dogKey + '-carousel');

  // Care guide
  const guideEl = document.getElementById(dogKey + '-guide');
  guideEl.innerHTML = dog.careGuide.map(section => `
    <div class="guide-section${section.highlight ? ' highlight' : ''}">
      <div class="guide-header" onclick="toggleBlock(this.parentElement)">
        <span class="guide-title">${escHtml(section.title)}</span>
        <span class="guide-chevron">▾</span>
      </div>
      <div class="guide-body">
        <div class="guide-text">${escHtml(section.content)}</div>
      </div>
    </div>
  `).join('');
}

// ── CAROUSEL ──────────────────────────────────────────────────
function renderCarousel(dogKey, containerId) {
  const container = document.getElementById(containerId);
  const photos = allPhotos[dogKey];

  if (!photos.length) {
    container.innerHTML = `<div class="carousel-placeholder">📸 Photos coming soon —<br>drop images into /images to get started</div>`;
    return;
  }

  // Build track
  const track = document.createElement('div');
  track.className = 'carousel-track';
  track.id = containerId + '-track';

  photos.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = DOGS[dogKey].name + ' photo ' + (i + 1);
    img.loading = 'lazy';
    img.onclick = () => openLightbox(photos, i);
    slide.appendChild(img);
    track.appendChild(slide);
  });

  // Dots
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  dots.id = containerId + '-dots';
  photos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dots.appendChild(dot);
  });

  // Arrows
  const prev = document.createElement('button');
  prev.className = 'carousel-arrow carousel-arrow-prev';
  prev.textContent = '‹';
  prev.setAttribute('aria-label', 'Previous photo');
  prev.onclick = () => carouselGo(containerId, -1);

  const next = document.createElement('button');
  next.className = 'carousel-arrow carousel-arrow-next';
  next.textContent = '›';
  next.setAttribute('aria-label', 'Next photo');
  next.onclick = () => carouselGo(containerId, 1);

  container.innerHTML = '';
  container.appendChild(track);
  container.appendChild(dots);
  container.appendChild(prev);
  container.appendChild(next);
  container.dataset.index = '0';
  container.dataset.count = photos.length;

  // Touch swipe
  setupSwipe(container, (dir) => carouselGo(containerId, dir));

  // Auto-advance
  startCarouselTimer(containerId);
}

function carouselGo(containerId, dir) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const count = parseInt(container.dataset.count);
  let idx = parseInt(container.dataset.index);
  idx = (idx + dir + count) % count;
  container.dataset.index = idx;

  const track = document.getElementById(containerId + '-track');
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;

  const dotsEl = document.getElementById(containerId + '-dots');
  if (dotsEl) {
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  resetCarouselTimer(containerId);
}

function startCarouselTimer(containerId) {
  if (carouselTimers[containerId]) clearInterval(carouselTimers[containerId]);
  carouselTimers[containerId] = setInterval(() => carouselGo(containerId, 1), 4000);
}

function resetCarouselTimer(containerId) {
  startCarouselTimer(containerId);
}

// ── PHOTO GRID ────────────────────────────────────────────────
function renderPhotoGrid() {
  const allPhotoList = [];
  // Interleave sunny and luna photos
  const maxLen = Math.max(allPhotos.sunny.length, allPhotos.luna.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < allPhotos.sunny.length) allPhotoList.push(allPhotos.sunny[i]);
    if (i < allPhotos.luna.length) allPhotoList.push(allPhotos.luna[i]);
  }

  const grid = document.getElementById('photo-grid');

  if (!allPhotoList.length) {
    grid.innerHTML = `<div class="photo-grid-placeholder">
      📸 Photos coming soon<br><br>
      Drop images into /images to get started.<br>
      Name them sunny-1.jpg, luna-1.jpg, etc.
    </div>`;
    return;
  }

  grid.innerHTML = allPhotoList.map((src, i) => `
    <div class="photo-item" onclick="openLightbox(allPhotoList, ${i})">
      <img src="${escAttr(src)}" alt="Sunny and Luna" loading="lazy" />
    </div>
  `).join('');

  // Make allPhotoList accessible to onclick handlers
  window.allPhotoList = allPhotoList;
  // Re-render with correct reference
  grid.innerHTML = allPhotoList.map((src, i) => `
    <div class="photo-item">
      <img src="${escAttr(src)}" alt="Sunny and Luna" loading="lazy" onclick="openLightbox(window.allPhotoList, ${i})" />
    </div>
  `).join('');
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function openLightbox(photos, index) {
  lightboxPhotos = photos;
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = photos[index];
  lb.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

function lightboxNav(dir, event) {
  if (event) event.stopPropagation();
  lightboxIndex = (lightboxIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  document.getElementById('lightbox-img').src = lightboxPhotos[lightboxIndex];
}

function lightboxSwipeHandler(dir) {
  lightboxNav(dir === 'left' ? 1 : -1, null);
}

// ── EMERGENCY ─────────────────────────────────────────────────
function openEmergency() {
  document.getElementById('emergency-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeEmergency() {
  document.getElementById('emergency-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderEmergencyContent() {
  document.getElementById('emergency-content').innerHTML = buildEmergencyHTML();
}

function renderEmergencyPage() {
  document.getElementById('emergency-page-content').innerHTML = buildEmergencyHTML();
}

function buildEmergencyHTML() {
  const e = EMERGENCY;
  return `
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="e-card">
        <div class="e-card-title">Vet Clinic</div>
        <div class="e-card-name">${escHtml(e.vet.name)}</div>
        <div class="e-card-detail">${escHtml(e.vet.address || '')}</div>
        <a class="e-phone-link" href="tel:${escAttr(e.vet.phone)}">📞 ${escHtml(e.vet.phone)}</a>
      </div>

      <div class="e-card" style="border-color:var(--emergency)">
        <div class="e-card-title" style="color:var(--emergency)">24hr Emergency Vet</div>
        <div class="e-card-name">${escHtml(e.emergencyVet.name)}</div>
        <div class="e-card-detail">${escHtml(e.emergencyVet.address)}</div>
        <a class="e-phone-link" href="tel:${escAttr(e.emergencyVet.phone)}">📞 ${escHtml(e.emergencyVet.phone)}</a>
      </div>

      <div class="e-card">
        <div class="e-card-title">Owner Contacts</div>
        ${e.owners.map(o => `
          <div style="margin-bottom:8px">
            <div class="e-card-name">${escHtml(o.name)}</div>
            <a class="e-phone-link" href="tel:${escAttr(o.phone)}">📞 ${escHtml(o.phone)}</a>
          </div>
        `).join('')}
      </div>

      <div class="e-card">
        <div class="e-card-title">Pet Insurance</div>
        <div class="e-card-name">${escHtml(e.insurance.provider)}</div>
        <div class="e-card-detail">Sunny policy: ${escHtml(e.insurance.sunnyPolicy)}</div>
        <div class="e-card-detail">Luna policy: ${escHtml(e.insurance.lunaPolicy)}</div>
        <div class="e-card-detail" style="margin-top:6px">${escHtml(e.insurance.note)}</div>
      </div>

      ${e.protocols.map(p => `
        <div class="e-protocol">
          <div class="e-protocol-title">${escHtml(p.title)}</div>
          <ol>${p.steps.map(s => `<li>${escHtml(s)}</li>`).join('')}</ol>
        </div>
      `).join('')}
    </div>
  `;
}

// ── HELP OVERLAY ──────────────────────────────────────────────
function openHelp() {
  document.getElementById('help-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeHelp() {
  document.getElementById('help-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ── HERO BACKGROUND ───────────────────────────────────────────
function updateHeroBg() {
  if (!heroBgPhotos.length) return;
  const bgEl = document.getElementById('hero-bg');
  bgEl.style.backgroundImage = `url('${heroBgPhotos[heroBgIndex]}')`;
  bgEl.classList.add('visible');
  heroBgIndex = (heroBgIndex + 1) % heroBgPhotos.length;
}

let heroBgTimer = null;
function startHeroBgCycle() {
  if (heroBgTimer) clearInterval(heroBgTimer);
  heroBgTimer = setInterval(updateHeroBg, 6000);
}

function openHeroBgPhoto() {
  if (!heroBgPhotos.length) return;
  const currentIdx = heroBgIndex === 0 ? heroBgPhotos.length - 1 : heroBgIndex - 1;
  openLightbox(heroBgPhotos, currentIdx);
}

// ── PHOTO DISCOVERY ───────────────────────────────────────────
// Since GitHub Pages is static, we probe for images by naming convention.
// Tries .jpg, .jpeg, .png, .webp. Stops after first missing file (with a gap tolerance of 1).
async function discoverPhotos() {
  const extensions = ['jpg', 'jpeg', 'png', 'webp'];
  const base = '../images/';

  for (const dog of ['sunny', 'luna']) {
    let i = 1;
    let misses = 0;
    while (misses < 2 && i <= 50) {
      let found = false;
      for (const ext of extensions) {
        const src = base + dog + '-' + i + '.' + ext;
        const ok = await probeImage(src);
        if (ok) {
          allPhotos[dog].push(src);
          found = true;
          break;
        }
      }
      if (!found) misses++;
      else misses = 0;
      i++;
    }
  }

  // Assemble hero bg pool from all photos
  const allFlat = [];
  const maxLen = Math.max(allPhotos.sunny.length, allPhotos.luna.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < allPhotos.sunny.length) allFlat.push(allPhotos.sunny[i]);
    if (i < allPhotos.luna.length) allFlat.push(allPhotos.luna[i]);
  }
  heroBgPhotos = allFlat;
  if (heroBgPhotos.length) {
    updateHeroBg();
    startHeroBgCycle();
  }
}

function probeImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

// ── TOUCH SWIPE HELPER ────────────────────────────────────────
function setupSwipe(el, callback) {
  if (!el) return;
  let startX = null;
  el.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  el.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) callback(dx < 0 ? 'left' : 'right');
    startX = null;
  }, { passive: true });
}

// ── UTIL: TIME ────────────────────────────────────────────────
function timeToMins(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function formatTime12h(time24) {
  const [h, m] = time24.split(':').map(Number);
  return formatTime12(h, m);
}

function formatTime12(h, m) {
  const ampm = h < 12 ? 'am' : 'pm';
  const h12 = h % 12 || 12;
  const mm = m.toString().padStart(2, '0');
  return `${h12}:${mm}${ampm}`;
}

// ── UTIL: ESCAPE HTML ─────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ── KEYBOARD: close overlays with Escape ──────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeEmergency();
    closeHelp();
    closeLightbox();
  }
});
