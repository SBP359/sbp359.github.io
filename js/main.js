/* ==========================================================================
   SBP359 Portfolio — Interactive Controls
   Theme toggle, IST live clock, scroll hairline, add-on filter,
   architectural Spec Sheet modal, Cmd+K Command Palette, CTF easter egg.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Grounded Project Spec Data ---------- */
  const PROJECT_SPECS = {
    'scribd-downloader': {
      kicker: 'FIREFOX ADD-ON // AMO VERIFIED',
      title: 'Scribd Downloader',
      meta: [
        { k: 'Version', v: '1.0.2 (Nov 13, 2026)' },
        { k: 'Adoption', v: '847 Users · 5.0★ (11 reviews)' },
        { k: 'Footprint', v: '37.1 KB · MIT License' },
        { k: 'Privacy', v: 'Zero Data Collection' }
      ],
      points: [
        'Scrolls through an accessible Scribd document automatically to ensure pages render cleanly.',
        'Triggers the browser native print dialog so you can save directly as a clean PDF.',
        'Scoped strictly to scribd.com tabs and does not bypass Scribd access restrictions.',
        'Compatible with both Firefox Desktop and Firefox for Android.'
      ],
      links: [
        { label: 'Install on Firefox Add-ons', href: 'https://addons.mozilla.org/en-US/firefox/addon/scribd-downloader/', icon: 'fa-brands fa-firefox-browser', primary: true }
      ]
    },
    'studytube': {
      kicker: 'BROWSER EXTENSION // FOCUS TOOL',
      title: 'StudyTube',
      meta: [
        { k: 'Version', v: '1.4.0' },
        { k: 'Platforms', v: 'Firefox & Chrome' },
        { k: 'Architecture', v: 'O(1) Map Policy Engine' },
        { k: 'Render Path', v: 'Instant CSS at document_start' }
      ],
      points: [
        'Redirects the YouTube homepage to a distraction-free educational feed without laggy JS overlays.',
        'Includes 1-click subject switching across Physics, Chemistry, Maths, CS & AI, and English.',
        'Supports dynamic channel approval by name, @handle, or URL, plus playlist-only and per-video overrides.',
        'Built-in Study Theater mode (hides comments, live chat, and end-screens), daily study streaks, and 25/5 Pomodoro auto-cycles.'
      ],
      links: [
        { label: 'Install on Firefox Add-ons', href: 'https://addons.mozilla.org/en-US/firefox/addon/studytube-v1/', icon: 'fa-brands fa-firefox-browser', primary: true },
        { label: 'Source on GitHub', href: 'https://github.com/SBP359/StudyTube', icon: 'fa-brands fa-github', primary: false }
      ]
    },
    'pintgrab': {
      kicker: 'BROWSER EXTENSION // MEDIA UTILITY',
      title: 'Pintgrab',
      meta: [
        { k: 'Version', v: '1.0.1' },
        { k: 'Platforms', v: 'Firefox & Chrome' },
        { k: 'Media Support', v: '720p MP4 Videos & HD Images' },
        { k: 'Navigation', v: 'SPA-Aware Background Fetch' }
      ],
      points: [
        'Downloads both Pinterest video pins (full 720p MP4) and high-resolution image pins directly without external web downloaders.',
        'Extracts video streams and original image URLs cleanly via background script handling.',
        'Works reliably across feed cards and Pinterest single-page app (SPA) navigations.'
      ],
      links: [
        { label: 'Install on Firefox Add-ons', href: 'https://addons.mozilla.org/en-US/firefox/addon/pintgrab/', icon: 'fa-brands fa-firefox-browser', primary: true }
      ]
    },
    'vidysetu-ai': {
      kicker: 'HACKATHON PROJECT // WINNER',
      title: 'AI VidyaSetu 1.0',
      meta: [
        { k: 'Recognition', v: 'Winner — Zonal Hackathon' },
        { k: 'Domain', v: 'Artificial Intelligence' },
        { k: 'Role', v: 'Student Developer' },
        { k: 'Status', v: 'Awarded Live Demo' }
      ],
      points: [
        'Built and pitched as an applied AI solution for the Zonal Hackathon, earning First Place.',
        'Demonstrated live under competition constraints with a focus on practical student utility.',
        'Reflects an ongoing focus on combining AI/ML capabilities with clean, approachable software.'
      ],
      links: [
        { label: 'Explore GitHub Profile', href: 'https://github.com/SBP359', icon: 'fa-brands fa-github', primary: true }
      ]
    },
    'study-tracker': {
      kicker: 'WEB APPLICATION // OFFLINE PWA',
      title: 'Study Tracker',
      meta: [
        { k: 'Tracks', v: '15 Boards & Exams' },
        { k: 'Syllabus', v: '3,987 Chapters' },
        { k: 'Storage', v: 'Browser localStorage' },
        { k: 'Technology', v: 'HTML · CSS · JavaScript' }
      ],
      points: [
        'Tracks chapter progress, daily study plans, revision schedules, and exam scores in one place.',
        'Includes national, state-board, international-board, JEE, and NEET study tracks.',
        'Runs as a 100% static, offline-ready PWA with no backend or build step.',
        'Supports JSON backup export, restore, and legacy backup importing.'
      ],
      links: [
        { label: 'Open Study Tracker', href: 'https://sbp359.github.io/Study-Tracker/', icon: 'fa-solid fa-arrow-up-right-from-square', primary: true },
        { label: 'Source on GitHub', href: 'https://github.com/SBP359/Study-Tracker', icon: 'fa-brands fa-github', primary: false }
      ]
    }
  };

  /* ---------- Toast Utility ---------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2400);
  }

  /* ---------- Copy to Clipboard ---------- */
  function copyEmail() {
    const email = 'sachinbp359@gmail.com';
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(email).then(function () {
        showToast('Copied sachinbp359@gmail.com');
      }).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const el = document.createElement('textarea');
      el.value = email;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
        showToast('Copied sachinbp359@gmail.com');
      } catch (e) {
        showToast('Email: sachinbp359@gmail.com');
      }
      document.body.removeChild(el);
    }
  }

  /* ---------- Theme Toggle ---------- */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  function applyTheme(theme, announce) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
    try {
      localStorage.setItem('sbp359_theme', theme);
    } catch (e) {
      /* Ignore storage restrictions */
    }
    if (announce) {
      showToast('Switched to ' + (theme === 'dark' ? 'Dark' : 'Light') + ' mode');
    }
  }

  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem('sbp359_theme');
    } catch (e) {
      saved = null;
    }
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved, false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      applyTheme('light', false);
    } else {
      applyTheme('dark', false);
    }
  }

  function toggleTheme() {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  /* ---------- Mobile Menu ---------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = !mobileNav.hidden;
      mobileNav.hidden = isOpen;
      mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.hidden = true;
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  /* ---------- Live IST Clock ---------- */
  const clockEl = document.getElementById('ist-clock');
  function updateClock() {
    if (!clockEl) return;
    try {
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
      clockEl.textContent = formatted + ' IST';
    } catch (e) {
      clockEl.textContent = 'UTC+5:30 IST';
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- Scroll Progress Hairline ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    progressBar.style.width = pct.toFixed(2) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Project Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });
      projectCards.forEach(function (card) {
        const cat = card.getAttribute('data-category');
        card.hidden = !(filter === 'all' || cat === filter);
      });
    });
  });

  /* ---------- Spec Sheet Modal ---------- */
  const specModal = document.getElementById('spec-modal');
  const specKicker = document.getElementById('spec-modal-kicker');
  const specTitle = document.getElementById('spec-modal-title');
  const specBody = document.getElementById('spec-modal-body');
  const specFooter = document.getElementById('spec-modal-footer');
  const specClose = document.getElementById('spec-modal-close');

  function openSpecModal(projectId) {
    const spec = PROJECT_SPECS[projectId];
    if (!spec || !specModal) return;

    specKicker.textContent = spec.kicker;
    specTitle.textContent = spec.title;

    const metaHtml = '<div class="spec-meta-grid">' + spec.meta.map(function (m) {
      return '<div class="spec-meta-cell"><span class="spec-meta-key">' + m.k + '</span><span class="spec-meta-val">' + m.v + '</span></div>';
    }).join('') + '</div>';

    const pointsHtml = '<ul class="spec-list">' + spec.points.map(function (p) {
      return '<li>' + p + '</li>';
    }).join('') + '</ul>';

    specBody.innerHTML = metaHtml + pointsHtml;

    specFooter.innerHTML = spec.links.map(function (l) {
      const cls = l.primary ? 'btn btn-primary' : 'btn btn-outline';
      return '<a href="' + l.href + '" target="_blank" rel="noopener noreferrer" class="' + cls + '"><i class="' + l.icon + '"></i><span>' + l.label + '</span></a>';
    }).join('');

    specModal.hidden = false;
  }

  function closeAllModals() {
    if (specModal) specModal.hidden = true;
    if (cmdModal) cmdModal.hidden = true;
    if (ctfModal) ctfModal.hidden = true;
  }

  document.querySelectorAll('[data-inspect]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openSpecModal(btn.getAttribute('data-inspect'));
    });
  });

  if (specClose) specClose.addEventListener('click', closeAllModals);
  if (specModal) {
    specModal.addEventListener('click', function (e) {
      if (e.target === specModal) closeAllModals();
    });
  }

  /* ---------- Command Palette (Cmd+K / Ctrl+K) ---------- */
  const cmdModal = document.getElementById('cmd-modal');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-list');
  const cmdOpenBtn = document.getElementById('cmd-open-btn');
  const footerCmdBtn = document.getElementById('footer-cmd-btn');

  const COMMANDS = [
    { label: 'Jump to About Me', hint: '#about', icon: 'fa-regular fa-user', run: function () { location.hash = '#about'; } },
    { label: 'Jump to Firefox Add-ons', hint: '#addons', icon: 'fa-brands fa-firefox-browser', run: function () { location.hash = '#addons'; } },
    { label: 'Jump to Core Skills', hint: '#skills', icon: 'fa-solid fa-code', run: function () { location.hash = '#skills'; } },
    { label: 'Jump to Milestones', hint: '#achievements', icon: 'fa-solid fa-trophy', run: function () { location.hash = '#achievements'; } },
    { label: 'Jump to Connect & Ko-fi', hint: '#connect', icon: 'fa-regular fa-paper-plane', run: function () { location.hash = '#connect'; } },
    { label: 'Toggle Light / Dark Mode', hint: 'Hotkey T', icon: 'fa-solid fa-circle-half-stroke', run: toggleTheme },
    { label: 'Copy Email (sachinbp359@gmail.com)', hint: 'Clipboard', icon: 'fa-regular fa-copy', run: copyEmail },
    { label: 'Open GitHub Profile (SBP359)', hint: 'External', icon: 'fa-brands fa-github', run: function () { window.open('https://github.com/SBP359', '_blank', 'noopener,noreferrer'); } },
    { label: 'Open Scribd Downloader (AMO)', hint: 'External', icon: 'fa-solid fa-file-pdf', run: function () { window.open('https://addons.mozilla.org/en-US/firefox/addon/scribd-downloader/', '_blank', 'noopener,noreferrer'); } },
    { label: 'Open StudyTube (AMO)', hint: 'External', icon: 'fa-solid fa-graduation-cap', run: function () { window.open('https://addons.mozilla.org/en-US/firefox/addon/studytube-v1/', '_blank', 'noopener,noreferrer'); } },
    { label: 'Open Pintgrab (AMO)', hint: 'External', icon: 'fa-solid fa-download', run: function () { window.open('https://addons.mozilla.org/en-US/firefox/addon/pintgrab/', '_blank', 'noopener,noreferrer'); } },
    { label: 'Open Study Tracker', hint: 'Search · External', icon: 'fa-solid fa-magnifying-glass', run: function () { window.open('https://sbp359.github.io/Study-Tracker/', '_blank', 'noopener,noreferrer'); } },
    { label: 'Launch Micro-CTF Challenge', hint: 'Easter Egg', icon: 'fa-solid fa-flag', run: function () { openCtfModal(); } }
  ];

  function renderCommands(query) {
    if (!cmdList) return;
    const q = (query || '').trim().toLowerCase();
    const filtered = COMMANDS.filter(function (c) {
      return c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q);
    });
    cmdList.innerHTML = '';
    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'cmd-item';
      empty.textContent = 'No matching commands.';
      cmdList.appendChild(empty);
      return;
    }
    filtered.forEach(function (cmd) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cmd-item';
      btn.innerHTML = '<span class="cmd-item-left"><i class="' + cmd.icon + '"></i><span>' + cmd.label + '</span></span><span class="cmd-item-hint">' + cmd.hint + '</span>';
      btn.addEventListener('click', function () {
        closeAllModals();
        cmd.run();
      });
      cmdList.appendChild(btn);
    });
  }

  function openCmdModal() {
    if (!cmdModal) return;
    closeAllModals();
    cmdModal.hidden = false;
    if (cmdInput) {
      cmdInput.value = '';
      renderCommands('');
      setTimeout(function () { cmdInput.focus(); }, 20);
    }
  }

  if (cmdOpenBtn) cmdOpenBtn.addEventListener('click', openCmdModal);
  if (footerCmdBtn) footerCmdBtn.addEventListener('click', openCmdModal);
  if (cmdInput) {
    cmdInput.addEventListener('input', function () {
      renderCommands(cmdInput.value);
    });
  }
  if (cmdModal) {
    cmdModal.addEventListener('click', function (e) {
      if (e.target === cmdModal) closeAllModals();
    });
  }

  /* ---------- Micro-CTF Challenge ---------- */
  const ctfModal = document.getElementById('ctf-modal');
  const ctfOpenBtn = document.getElementById('ctf-open-btn');
  const ctfCloseBtn = document.getElementById('ctf-modal-close');
  const ctfForm = document.getElementById('ctf-form');
  const ctfInput = document.getElementById('ctf-input');
  const ctfFeedback = document.getElementById('ctf-feedback');

  function openCtfModal() {
    if (!ctfModal) return;
    closeAllModals();
    ctfModal.hidden = false;
    if (ctfFeedback) {
      ctfFeedback.textContent = '';
      ctfFeedback.className = 'ctf-feedback';
    }
    if (ctfInput) {
      ctfInput.value = '';
      setTimeout(function () { ctfInput.focus(); }, 20);
    }
  }

  if (ctfOpenBtn) ctfOpenBtn.addEventListener('click', openCtfModal);
  if (ctfCloseBtn) ctfCloseBtn.addEventListener('click', closeAllModals);
  if (ctfModal) {
    ctfModal.addEventListener('click', function (e) {
      if (e.target === ctfModal) closeAllModals();
    });
  }

  if (ctfForm) {
    ctfForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = (ctfInput ? ctfInput.value : '').trim();
      if (val === 'SBP359{glory_to_open_source}') {
        ctfFeedback.textContent = 'Flag accepted. Glory to Open Source.';
        ctfFeedback.className = 'ctf-feedback ok';
        showToast('CTF Solved!');
      } else {
        ctfFeedback.textContent = 'Not quite — hint: Base64 decode the string above.';
        ctfFeedback.className = 'ctf-feedback err';
      }
    });
  }

  /* ---------- Copy Email Button ---------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', copyEmail);
  }

  /* ---------- Global Keyboard Shortcuts ---------- */
  document.addEventListener('keydown', function (e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    const typing = tag === 'input' || tag === 'textarea';

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && !cmdModal.hidden) {
        closeAllModals();
      } else {
        openCmdModal();
      }
      return;
    }

    if (e.key === 'Escape') {
      closeAllModals();
      return;
    }

    if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 't') {
      toggleTheme();
    }
  });
})();
