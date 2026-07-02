(function () {
  if (window.__mdgUnifiedShell) return;
  window.__mdgUnifiedShell = true;

  var langs = ['es', 'en', 'pt'];
  var html = document.documentElement;

  function getStored(keys) {
    for (var i = 0; i < keys.length; i += 1) {
      try {
        var value = localStorage.getItem(keys[i]);
        if (value) return value;
      } catch (e) {}
    }
    return '';
  }

  function store(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function normalizeLang(value) {
    value = String(value || '').toLowerCase().slice(0, 2);
    return langs.indexOf(value) >= 0 ? value : 'es';
  }

  function getLang() {
    return normalizeLang(getStored(['mdg_locale', 'mdg_lang', 'lang']) || html.lang || 'es');
  }

  function getTheme() {
    var stored = getStored(['mdg_theme', 'ta-theme']);
    if (stored === 'light' || stored === 'dark') return stored;
    if (html.dataset.theme === 'light' || html.dataset.theme === 'dark') return html.dataset.theme;
    if (document.body && document.body.classList.contains('theme-light')) return 'light';
    return 'light';
  }

  function setButtonText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function applyLang(next) {
    var lang = normalizeLang(next);
    html.lang = lang;
    if (document.body) {
      document.body.classList.remove('lang-es', 'lang-en', 'lang-pt');
      document.body.classList.add('lang-' + lang);
    }
    store('mdg_locale', lang);
    setButtonText('[data-lang-current]', lang.toUpperCase());
    setButtonText('[data-mdg-lang-current]', lang.toUpperCase());
    var langBtn = document.getElementById('langbtn');
    if (langBtn) langBtn.textContent = lang.toUpperCase();
  }

  function applyTheme(next) {
    var theme = (next === 'light') ? 'light' : 'dark';
    html.dataset.theme = theme;
    if (document.body) {
      document.body.classList.toggle('theme-light', theme === 'light');
      document.body.classList.toggle('theme-dark', theme === 'dark');
      document.body.classList.toggle('dark', theme === 'dark');
    }
    store('mdg_theme', theme);
    setButtonText('[data-theme-current]', theme === 'dark' ? '\u2600' : '\u263e');
    setButtonText('[data-mdg-theme-current]', theme === 'dark' ? '\u2600' : '\u263e');
    var themeBtn = document.getElementById('themebtn');
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '\u2600' : '\u263e';
    var themeDeckBtn = document.getElementById('themeDeck');
    if (themeDeckBtn) themeDeckBtn.textContent = theme === 'dark' ? '\u2600' : '\u263e';
  }

  function logoSvg() {
    return '<svg class="mdg-brand-ribbon__logo" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><linearGradient id="mdgRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0A122A"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>' +
      '<rect width="36" height="36" rx="10" fill="url(#mdgRibbonGrad)"/>' +
      '<path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>' +
      '<circle cx="18" cy="8" r="2" fill="#FFD700"/>' +
      '</svg>';
  }

  function injectRibbon() {
    if (!document.body) return;
    if (document.querySelector('.mdg-brand-ribbon')) return;
    if (document.querySelector('.site-header')) return;
    if (document.querySelector('.top')) return;

    var nav = document.createElement('nav');
    nav.className = 'mdg-brand-ribbon';
    nav.setAttribute('aria-label', 'Navegacion global MetodologIA');
    nav.innerHTML =
      '<a class="mdg-brand-ribbon__brand" href="index.html" aria-label="MetodologIA - Inicio">' +
        logoSvg() +
        '<span><strong>Metodolog<span>IA</span></strong><small>Trabajar Amplificado</small></span>' +
      '</a>' +
      '<span class="mdg-brand-ribbon__links">' +
        '<a href="index.html">Hub</a>' +
        '<a href="dossier.html">Dossier</a>' +
        '<a href="playbook.html">Playbook</a>' +
      '</span>' +
      '<button class="mdg-brand-ribbon__btn" type="button" data-mdg-lang-toggle aria-label="Cambiar idioma"><span data-mdg-lang-current>ES</span></button>' +
      '<button class="mdg-brand-ribbon__btn" type="button" data-mdg-theme-toggle aria-label="Cambiar tema"><span data-mdg-theme-current>\u2600</span></button>';
    document.body.prepend(nav);
  }

  function classifyPage() {
    if (!document.body) return;
    document.body.classList.add('mdg-unified');
    if (document.querySelector('.deck, main.deck, .slide')) document.body.classList.add('mdg-page-deck');
    if (document.querySelector('.docset-bar, .sidebar-nav, .reading-progress')) document.body.classList.add('mdg-page-doc');
  }

  function nextLang() {
    var current = getLang();
    return langs[(langs.indexOf(current) + 1) % langs.length];
  }

  function boot() {
    classifyPage();
    injectRibbon();
    applyLang(getLang());
    applyTheme(getTheme());
  }

  document.addEventListener('click', function (event) {
    var langButton = event.target.closest('[data-mdg-lang-toggle], [data-lang-toggle], #langbtn');
    if (langButton) {
      event.preventDefault();
      event.stopPropagation();
      applyLang(nextLang());
      return;
    }

    var themeButton = event.target.closest('[data-mdg-theme-toggle], [data-theme-toggle], #themebtn, #themeDeck');
    if (themeButton) {
      event.preventDefault();
      event.stopPropagation();
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
