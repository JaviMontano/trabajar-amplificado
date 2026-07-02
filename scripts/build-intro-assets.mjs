import { writeFileSync } from "node:fs";

const updated = "2026-07-01";
const siteBase = "https://javimontano.github.io/trabajar-amplificado/";

function attr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function pageShell({ title, description, slug = "", bodyClass = "", styles = "", body = "", scripts = "" }) {
  const canonicalUrl = slug ? `${siteBase}${slug}` : "";
  const metadata = slug ? `
<link rel="canonical" href="${canonicalUrl}">
<link rel="alternate" hreflang="es" href="${canonicalUrl}">
<link rel="alternate" hreflang="en" href="${canonicalUrl}">
<link rel="alternate" hreflang="pt" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:site_name" content="MetodologIA">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">` : "";
  return `<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${attr(description)}">
<meta name="author" content="Javier Montaño · MetodologIA">
<title>${attr(title)}</title>${metadata}
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' rx='10' fill='%23122562'/%3E%3Cpath d='M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z' fill='%23fff'/%3E%3Ccircle cx='18' cy='8' r='2' fill='%23FFD700'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
:root{--navy:#122562;--night:#071426;--deep:#0a122a;--surface:#10264a;--surface-2:#f9fafb;--paper:#fffdf3;--gold:#ffd700;--gold-2:#b8860b;--blue:#137dc5;--ink:#101827;--muted:#5b6677;--soft:#fff8d6;--line:rgba(18,37,98,.14);--dark-line:rgba(255,215,0,.22);--shadow:0 22px 60px rgba(7,20,38,.18);--fh:'Poppins',system-ui,sans-serif;--fb:'Montserrat',system-ui,sans-serif;--fm:'JetBrains Mono',ui-monospace,monospace}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--fb);line-height:1.65;background:#f6f8fc;color:var(--ink)}body.theme-dark{background:var(--deep);color:#eaf1ff}a{color:var(--navy);font-weight:800}body.theme-dark a{color:#ffe875}h1,h2,h3{font-family:var(--fh);line-height:1.08;margin:0;color:var(--navy);letter-spacing:0}body.theme-dark h1,body.theme-dark h2,body.theme-dark h3{color:#fff8d6}h1{font-size:clamp(2.25rem,6vw,5.2rem);font-weight:900}h2{font-size:clamp(1.55rem,3.2vw,2.7rem);font-weight:850}h3{font-size:1.08rem}p{margin:.65rem 0 0}.top{position:sticky;top:0;z-index:50;background:rgba(255,253,243,.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}body.theme-dark .top{background:rgba(10,18,42,.92);border-color:var(--dark-line)}.top-in{max-width:1180px;margin:auto;padding:.72rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}.brand{display:inline-flex;align-items:center;gap:.55rem;text-decoration:none;color:var(--navy)}body.theme-dark .brand{color:#fff}.logo{width:32px;height:32px;border-radius:9px;background:var(--navy);position:relative;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}.logo:before{content:'';position:absolute;left:9px;top:10px;width:4px;height:13px;background:#fff;box-shadow:7px 0 0 #fff,14px 0 0 #fff}.logo:after{content:'';position:absolute;left:16px;top:6px;width:4px;height:4px;border-radius:50%;background:var(--gold)}.brand b{font-family:var(--fh);font-weight:900}.brand b span{color:var(--gold-2)}.nav{display:flex;gap:.55rem;align-items:center;flex-wrap:wrap}.nav a,.mini-btn{border:1px solid rgba(18,37,98,.16);background:#fff;color:var(--navy);border-radius:999px;padding:.42rem .75rem;font-size:.78rem;text-decoration:none;font-weight:800;cursor:pointer}body.theme-dark .nav a,body.theme-dark .mini-btn{background:#13294a;color:#ffe875;border-color:rgba(255,215,0,.28)}.hero{background:radial-gradient(circle at 12% 18%,rgba(255,215,0,.2),transparent 32%),linear-gradient(135deg,#fff 0%,#f5f7fb 55%,#fff8d6 100%);border-bottom:1px solid var(--line)}body.theme-dark .hero{background:radial-gradient(circle at 12% 18%,rgba(255,215,0,.12),transparent 34%),linear-gradient(135deg,#071426 0%,#0a122a 54%,#13294a 100%);border-color:var(--dark-line)}.hero-in{max-width:1180px;margin:auto;padding:4.8rem 1rem 4rem;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:2rem;align-items:center}.kicker{display:inline-flex;align-items:center;gap:.45rem;border:1px solid rgba(255,215,0,.55);background:rgba(255,215,0,.18);color:#7a5d00;border-radius:999px;padding:.4rem .78rem;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;font-weight:900;margin-bottom:1rem}body.theme-dark .kicker{color:#ffd700;background:rgba(255,215,0,.12)}.lead{font-size:1.08rem;color:var(--muted);max-width:70ch}body.theme-dark .lead,body.theme-dark .muted{color:#d7e0ef}.panel,.card,.wide,.note,.prompt,.table-wrap{background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 10px 28px rgba(18,37,98,.07)}body.theme-dark .panel,body.theme-dark .card,body.theme-dark .wide,body.theme-dark .note,body.theme-dark .table-wrap{background:var(--surface);border-color:var(--dark-line);box-shadow:none}.panel{padding:1.2rem}.wrap{max-width:1180px;margin:auto;padding:3rem 1rem}.section-head{max-width:820px;margin-bottom:1.4rem}.grid{display:grid;gap:1rem}.g2{grid-template-columns:repeat(2,minmax(0,1fr))}.g3{grid-template-columns:repeat(3,minmax(0,1fr))}.g4{grid-template-columns:repeat(4,minmax(0,1fr))}.card{padding:1.15rem}.card p,.card li,.table-wrap td{font-size:.94rem;color:var(--muted)}body.theme-dark .card p,body.theme-dark .card li,body.theme-dark .table-wrap td{color:#d7e0ef}.stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem}.stat{padding:.9rem;border-radius:12px;background:#f6f8fc;border:1px solid var(--line)}body.theme-dark .stat{background:#071426;border-color:var(--dark-line)}.stat strong{display:block;font-family:var(--fh);font-size:1.8rem;color:var(--navy)}body.theme-dark .stat strong{color:#ffd700}.stat span{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}.wide{padding:1.2rem}.timeline{display:grid;gap:.75rem}.time-row{display:grid;grid-template-columns:92px minmax(0,1fr);gap:1rem;align-items:start;padding:1rem;border-radius:12px;background:#fff;border:1px solid var(--line)}body.theme-dark .time-row{background:#10264a;border-color:var(--dark-line)}.time{font-family:var(--fm);font-weight:800;color:#8a6500}body.theme-dark .time{color:#ffd700}.note{padding:1rem 1.15rem;border-left:5px solid var(--gold);background:#fffdf3}body.theme-dark .note{background:#13294a}.prompt{background:#071426;color:#eaf1ff;overflow:hidden}.prompt-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;background:#13294a;border-bottom:1px solid rgba(255,215,0,.2);padding:.62rem .82rem}.prompt-head span{font-family:var(--fm);font-size:.76rem;color:#ffd700}.copy{border:1px solid rgba(255,215,0,.4);border-radius:8px;background:transparent;color:#ffd700;font-weight:800;padding:.32rem .65rem;cursor:pointer}.copy.ok,.copy:hover{background:#ffd700;color:#071426}pre{margin:0;padding:1rem;white-space:pre-wrap;overflow:auto;font-family:var(--fm);font-size:.84rem;line-height:1.55}.table-wrap{overflow:auto}.table-wrap table{width:100%;border-collapse:collapse;min-width:720px}.table-wrap th{background:var(--navy);color:#ffd700;text-align:left}.table-wrap th,.table-wrap td{padding:.78rem;border-bottom:1px solid var(--line);vertical-align:top}body.theme-dark .table-wrap th,body.theme-dark .table-wrap td{border-color:var(--dark-line)}.field{display:grid;gap:.35rem}.field label{font-weight:900;color:var(--navy)}body.theme-dark .field label{color:#fff8d6}textarea,input,select{width:100%;font:inherit;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:.78rem}body.theme-dark textarea,body.theme-dark input,body.theme-dark select{background:#071426;color:#eaf1ff;border-color:var(--dark-line)}textarea{min-height:96px;resize:vertical}.toolbar{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1rem}.btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;border:none;border-radius:10px;background:var(--gold);color:#071426;padding:.82rem 1rem;font-family:var(--fh);font-weight:850;text-decoration:none;cursor:pointer}.btn.secondary{background:#fff;color:var(--navy);border:1px solid var(--line)}body.theme-dark .btn.secondary{background:#13294a;color:#ffe875;border-color:var(--dark-line)}.footer{background:#071426;color:#d7e0ef;padding:2rem 1rem}.footer-in{max-width:1180px;margin:auto}.footer strong{color:#ffd700}.l-en,.l-pt{display:none}body.lang-en .l-es,body.lang-en .l-pt{display:none!important}body.lang-en .l-en{display:inline!important}body.lang-pt .l-es,body.lang-pt .l-en{display:none!important}body.lang-pt .l-pt{display:inline!important}body.lang-en .block-en,body.lang-pt .block-pt,body.lang-es .block-es{display:block!important}.block-en,.block-pt{display:none!important}@media(max-width:880px){.hero-in,.g2,.g3,.g4{grid-template-columns:1fr}.nav a:nth-child(n+4){display:none}.time-row{grid-template-columns:1fr}.hero-in{padding-top:3.4rem}.stat-grid{grid-template-columns:1fr}}@media print{.top,.toolbar,.copy{display:none!important}.hero,.footer{background:#fff!important;color:#000!important}.card,.panel,.wide,.note,.table-wrap{box-shadow:none!important}}
${styles}
</style>
</head>
<body class="lang-es theme-dark ${bodyClass}">
${body}
${baseScripts()}
${scripts}
</body>
</html>
`;
}

function baseScripts() {
  return `<script>
(function(){
  var lang='es';
  var theme='dark';
  function applyLang(next){
    lang=next;
    document.body.classList.remove('lang-es','lang-en','lang-pt');
    document.body.classList.add('lang-'+lang);
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-lang-current]').forEach(function(el){el.textContent=lang.toUpperCase();});
  }
  function applyTheme(next){
    theme=next;
    document.body.classList.toggle('theme-dark',theme==='dark');
    document.body.classList.toggle('theme-light',theme==='light');
    document.documentElement.setAttribute('data-theme',theme);
    document.querySelectorAll('[data-theme-current]').forEach(function(el){el.textContent=theme==='dark'?'☾':'☀';});
  }
  document.addEventListener('click',function(e){
    var langBtn=e.target.closest('[data-lang-toggle]');
    if(langBtn){applyLang(lang==='es'?'en':lang==='en'?'pt':'es');}
    var themeBtn=e.target.closest('[data-theme-toggle]');
    if(themeBtn){applyTheme(theme==='dark'?'light':'dark');}
    var copy=e.target.closest('[data-copy]');
    if(copy){
      var target=copy.closest('.prompt')?.querySelector('pre');
      if(target){
        var text=target.innerText.trim();
        navigator.clipboard.writeText(text).then(function(){
          var old=copy.textContent; copy.textContent='✓'; copy.classList.add('ok');
          setTimeout(function(){copy.textContent=old;copy.classList.remove('ok');},1200);
        });
      }
    }
  });
  applyLang('es'); applyTheme('dark');
})();
</script>`;
}

function topNav(active) {
  return `<header class="top">
  <div class="top-in">
    <a class="brand" href="index.html" aria-label="Volver al hub"><span class="logo" aria-hidden="true"></span><b>Metodolog<span>IA</span></b></a>
    <nav class="nav" aria-label="Navegación">
      <a href="clase-introductoria.html"${active === "masterclass" ? ' aria-current="page"' : ""}>Masterclass</a>
      <a href="workbook-introduccion.html"${active === "workbook" ? ' aria-current="page"' : ""}>Workbook</a>
      <a href="introduccion-trabajo-amplificado.html"${active === "workshop" ? ' aria-current="page"' : ""}>Taller gratis</a>
      <a href="diapositivas-introduccion.html"${active === "deck" ? ' aria-current="page"' : ""}>Deck</a>
      <a href="index.html">Hub</a>
      <button class="mini-btn" type="button" data-lang-toggle><span data-lang-current>ES</span></button>
      <button class="mini-btn" type="button" data-theme-toggle><span data-theme-current>☾</span></button>
    </nav>
  </div>
</header>`;
}

function footer(kind) {
  return `<footer class="footer">
  <div class="footer-in">
    <strong>MetodologIA · Introducción al Trabajo Amplificado</strong><br>
    ${kind} · v1.3 · actualizado ${updated}. Método primero, (Gen)IA después. Clase introductoria gratuita: soberanía operativa, herramienta candidata, evidencia proporcional y decisión humana visible.
  </div>
</footer>`;
}

function localized(es, en, pt) {
  return `<span class="l-es">${es}</span><span class="l-en">${en}</span><span class="l-pt">${pt}</span>`;
}

function masterclass() {
  const body = `${topNav("masterclass")}
<main>
  <section class="hero" id="inicio">
    <div class="hero-in">
      <div>
        <span class="kicker">${localized("Clase demo gratuita · 90-120 min", "Free demo class · 90-120 min", "Aula demo gratuita · 90-120 min")}</span>
        <h1>${localized("Introducción al Trabajo Amplificado", "Introduction to Amplified Work", "Introdução ao Trabalho Amplificado")}</h1>
        <p class="lead">${localized("Una masterclass para dejar de pedir respuestas bonitas y empezar a trabajar con IA (inteligencia artificial: software que genera o transforma información) como socio de pensamiento: una fricción real, una ruta primaria, una herramienta candidata (primer borrador útil, todavía no validado) y una forma honesta de verificarla.", "A masterclass to stop asking for polished answers and start using AI as a thinking partner: one real friction, one primary route, one candidate tool and an honest way to verify it.", "Uma masterclass para parar de pedir respostas bonitas e começar a trabalhar com IA como parceiro de pensamento: uma fricção real, uma rota primária, uma ferramenta candidata e uma forma honesta de verificá-la.")}</p>
      </div>
      <aside class="panel">
        <h3>${localized("La promesa correcta", "The right promise", "A promessa certa")}</h3>
        <div class="stat-grid" style="margin-top:1rem">
          <div class="stat"><strong>1</strong><span>${localized("fricción real", "real friction", "fricção real")}</span></div>
          <div class="stat"><strong>1</strong><span>${localized("ruta primaria", "primary route", "rota primária")}</span></div>
          <div class="stat"><strong>1</strong><span>${localized("herramienta candidata", "candidate tool", "ferramenta candidata")}</span></div>
          <div class="stat"><strong>0</strong><span>${localized("decisiones delegadas", "delegated decisions", "decisões delegadas")}</span></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="wrap" id="tesis">
    <div class="section-head">
      <span class="kicker">${localized("Tesis", "Thesis", "Tese")}</span>
      <h2>${localized("La tesis no es hacer más rápido. Es pensar mejor, con evidencia, sin rendición cognitiva.", "The thesis is not moving faster. It is thinking better, with evidence, without cognitive surrender.", "A tese não é fazer mais rápido. É pensar melhor, com evidência, sem rendição cognitiva.")}</h2>
      <p class="lead">${localized("El trabajo amplificado conserva objetivo, juicio, autoría y responsabilidad en la persona. La IA (inteligencia artificial) reduce fricción, estructura pensamiento y acelera práctica, pero no reemplaza deliberación ni decisión.", "Amplified work keeps goal, judgment, authorship and accountability with the person. AI reduces friction, structures thinking and accelerates practice, but it does not replace deliberation or decision.", "O trabalho amplificado mantém objetivo, julgamento, autoria e responsabilidade na pessoa. A IA reduz fricção, estrutura pensamento e acelera prática, mas não substitui deliberação nem decisão.")}</p>
    </div>
    <div class="grid g3">
      <article class="card"><h3>${localized("Agencia primero", "Agency first", "Agência primeiro")}</h3><p>${localized("La IA debe devolverte una decisión más clara, no una obediencia más rápida.", "AI should return a clearer decision, not faster obedience.", "A IA deve devolver uma decisão mais clara, não uma obediência mais rápida.")}</p></article>
      <article class="card"><h3>${localized("Método antes que output", "Method before output", "Método antes do output")}</h3><p>${localized("El resultado no es solo un texto: es un ritual, checklist, SOP (procedimiento operativo breve), rúbrica, bitácora o plantilla reutilizable.", "The result is not just text: it is a reusable ritual, checklist, SOP, rubric, logbook or template.", "O resultado não é só texto: é um ritual, checklist, SOP, rubrica, diário ou modelo reutilizável.")}</p></article>
      <article class="card"><h3>${localized("Evidencia proporcional", "Proportional evidence", "Evidência proporcional")}</h3><p>${localized("Una herramienta bonita no está validada. Declara cómo se probó, qué falta y qué riesgo tiene usarla.", "A polished tool is not validated. State how it was tested, what is missing and what risk it carries.", "Uma ferramenta bonita não está validada. Declare como foi testada, o que falta e qual risco traz.")}</p></article>
    </div>
  </section>

  <section class="wrap" id="agenda">
    <div class="section-head">
      <span class="kicker">${localized("Arquitectura de clase", "Class architecture", "Arquitetura da aula")}</span>
      <h2>${localized("De una fricción laboral a una herramienta candidata", "From work friction to a candidate tool", "De uma fricção laboral a uma ferramenta candidata")}</h2>
    </div>
    <div class="timeline">
      <article class="time-row"><div class="time">00:00</div><div><h3>${localized("El mito de la velocidad", "The speed myth", "O mito da velocidade")}</h3><p>${localized("Por qué pedirle a la IA que lo haga todo puede degradar criterio.", "Why asking AI to do everything can degrade judgment.", "Por que pedir para a IA fazer tudo pode degradar o julgamento.")}</p></div></article>
      <article class="time-row"><div class="time">00:15</div><div><h3>${localized("Contrato epistémico", "Epistemic contract", "Contrato epistêmico")}</h3><p>${localized("Objetivo, contexto, criterio, límite y evidencia disponible antes de producir.", "Goal, context, criteria, limits and available evidence before producing.", "Objetivo, contexto, critério, limite e evidência disponível antes de produzir.")}</p></div></article>
      <article class="time-row"><div class="time">00:30</div><div><h3>${localized("Diagnóstico de fricción", "Friction diagnosis", "Diagnóstico de fricção")}</h3><p>${localized("Claridad, exceso de opciones, deuda de método, falta de evidencia o miedo al error.", "Clarity, too many options, method debt, missing evidence or fear of error.", "Clareza, excesso de opções, dívida de método, falta de evidência ou medo do erro.")}</p></div></article>
      <article class="time-row"><div class="time">00:45</div><div><h3>${localized("Router de rutas", "Route router", "Roteador de rotas")}</h3><p>${localized("Se muestran seis rutas, pero se aplica solo una ruta primaria por riesgo y resultado esperado.", "Six routes are shown, but only one primary route is applied by risk and expected result.", "Seis rotas são mostradas, mas apenas uma rota primária é aplicada por risco e resultado esperado.")}</p></div></article>
      <article class="time-row"><div class="time">01:05</div><div><h3>${localized("Demo: decisión no vinculante", "Demo: non-binding decision", "Demo: decisão não vinculante")}</h3><p>${localized("La IA organiza criterios y tradeoffs; la decisión final vuelve a la persona.", "AI organizes criteria and tradeoffs; final decision returns to the person.", "A IA organiza critérios e tradeoffs; a decisão final volta para a pessoa.")}</p></div></article>
      <article class="time-row"><div class="time">01:35</div><div><h3>${localized("Workbook P/A/T/J/E", "P/A/T/J/E workbook", "Workbook P/A/T/J/E")}</h3><p>${localized("Propósito, agencia, transferencia, juicio y evidencia para cerrar sin sobreprometer.", "Purpose, agency, transfer, judgment and evidence to close without overpromising.", "Propósito, agência, transferência, julgamento e evidência para fechar sem prometer demais.")}</p></div></article>
    </div>
  </section>

  <section class="wrap" id="demo">
    <div class="section-head">
      <span class="kicker">${localized("Demo central", "Central demo", "Demo central")}</span>
      <h2>${localized("No le pidas a la IA que decida. Pídele que haga visible el criterio.", "Do not ask AI to decide. Ask it to make criteria visible.", "Não peça para a IA decidir. Peça para tornar o critério visível.")}</h2>
    </div>
    <div class="grid g2">
      <div class="prompt"><div class="prompt-head"><span>${localized("Antipatrón", "Anti-pattern", "Antipadrão")}</span><button class="copy" data-copy>Copy</button></div><pre>Decide por mí si debo aceptar esta propuesta de trabajo.</pre></div>
      <div class="prompt"><div class="prompt-head"><span>${localized("Forma amplificada", "Amplified form", "Forma amplificada")}</span><button class="copy" data-copy>Copy</button></div><pre>Ayúdame a preparar una decisión no vinculante. Primero identifica la decisión real, separa criterios duros, criterios deseables, restricciones y riesgos. Luego compara opciones, declara supuestos, propone abort criteria y cierra con una recomendación no vinculante. No decidas por mí: devuelve la decisión final a mi responsabilidad.</pre></div>
    </div>
    <div class="note" style="margin-top:1rem"><strong>${localized("Regla de cierre:", "Closing rule:", "Regra de fechamento:")}</strong> ${localized("si solo hay una buena explicación, el estado es candidate (candidato, no validado), no validated.", "if there is only a good explanation, the status is candidate, not validated.", "se há apenas uma boa explicação, o estado é candidate, não validated.")}</div>
  </section>

  <section class="wrap" id="rutas">
    <div class="section-head"><span class="kicker">${localized("Router", "Router", "Router")}</span><h2>${localized("Seis rutas posibles. Una ruta primaria por ejercicio.", "Six possible routes. One primary route per exercise.", "Seis rotas possíveis. Uma rota primária por exercício.")}</h2></div>
    <div class="grid g3">
      <article class="card"><h3>Decidir</h3><p>${localized("Criterios, opciones, tradeoffs, riesgos y recomendación no vinculante.", "Criteria, options, tradeoffs, risks and non-binding recommendation.", "Critérios, opções, tradeoffs, riscos e recomendação não vinculante.")}</p></article>
      <article class="card"><h3>Aprender</h3><p>${localized("Intento mínimo, pista, reformulación propia y transferencia.", "Minimum attempt, hint, own reformulation and transfer.", "Tentativa mínima, pista, reformulação própria e transferência.")}</p></article>
      <article class="card"><h3>Practicar</h3><p>${localized("Repetición breve, feedback y métrica P/A/T/J/E.", "Short repetition, feedback and P/A/T/J/E metric.", "Repetição curta, feedback e métrica P/A/T/J/E.")}</p></article>
      <article class="card"><h3>Construir</h3><p>${localized("Checklist, SOP (procedimiento operativo breve), plantilla o ritual en versión mínima útil.", "Checklist, SOP, template or ritual as a minimum useful version.", "Checklist, SOP, modelo ou ritual em versão mínima útil.")}</p></article>
      <article class="card"><h3>Evaluar</h3><p>${localized("Rúbrica, hallazgos, evidencia, límites y correcciones priorizadas.", "Rubric, findings, evidence, limits and prioritized corrections.", "Rubrica, achados, evidência, limites e correções priorizadas.")}</p></article>
      <article class="card"><h3>Reparar</h3><p>${localized("Síntoma, causa probable, parche y prueba antes/después.", "Symptom, probable cause, patch and before/after test.", "Sintoma, causa provável, correção e teste antes/depois.")}</p></article>
    </div>
  </section>

  <section class="wrap" id="salida">
    <div class="section-head"><span class="kicker">${localized("Salida", "Output", "Saída")}</span><h2>${localized("El éxito de la clase no es un output bonito", "Class success is not a polished output", "O sucesso da aula não é um output bonito")}</h2></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>P/A/T/J/E</th><th>${localized("Pregunta de control", "Control question", "Pergunta de controle")}</th><th>${localized("Evidencia mínima", "Minimum evidence", "Evidência mínima")}</th></tr></thead>
        <tbody>
          <tr><td>Propósito</td><td>${localized("¿Qué quiere lograr la persona y por qué importa?", "What does the person want to achieve and why does it matter?", "O que a pessoa quer alcançar e por que importa?")}</td><td>${localized("Objetivo en una frase.", "One-sentence goal.", "Objetivo em uma frase.")}</td></tr>
          <tr><td>Agencia</td><td>${localized("¿Qué decide, entiende o ejecuta la persona?", "What does the person decide, understand or execute?", "O que a pessoa decide, entende ou executa?")}</td><td>${localized("Decisión humana visible.", "Visible human decision.", "Decisão humana visível.")}</td></tr>
          <tr><td>Transferencia</td><td>${localized("¿Puede repetir el método en otro caso?", "Can the method be reused in another case?", "Pode repetir o método em outro caso?")}</td><td>${localized("Plantilla o checklist reutilizable.", "Reusable template or checklist.", "Modelo ou checklist reutilizável.")}</td></tr>
          <tr><td>Juicio</td><td>${localized("¿Qué criterios, riesgos y tradeoffs reconoce?", "Which criteria, risks and tradeoffs are recognized?", "Quais critérios, riscos e tradeoffs reconhece?")}</td><td>${localized("Lista de criterios y abort criteria.", "Criteria and abort criteria list.", "Lista de critérios e abort criteria.")}</td></tr>
          <tr><td>Evidencia</td><td>${localized("¿Qué prueba permite revisar el avance?", "What proof allows progress review?", "Que prova permite revisar o avanço?")}</td><td>${localized("Prueba mínima y brecha abierta.", "Minimum test and open gap.", "Teste mínimo e lacuna aberta.")}</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>
${footer("Masterclass")}`;
  return pageShell({
    title: "Introducción al Trabajo Amplificado · Masterclass",
    description: "Masterclass gratuita de MetodologIA para entender Trabajo Amplificado: agencia, criterio, fricción, rutas y evidencia proporcional.",
    slug: "clase-introductoria.html",
    body,
  });
}

function workbook() {
  const body = `${topNav("workbook")}
<main>
  <section class="hero" id="inicio">
    <div class="hero-in">
      <div>
        <span class="kicker">${localized("Workbook (cuaderno de trabajo) gratuito · uso en vivo", "Free workbook · live use", "Workbook gratuito · uso ao vivo")}</span>
        <h1>${localized("Workbook · Introducción al Trabajo Amplificado", "Workbook · Introduction to Amplified Work", "Workbook · Introdução ao Trabalho Amplificado")}</h1>
        <p class="lead">${localized("Un cuaderno ameno para convertir una fricción laboral en una herramienta candidata (primer borrador útil, todavía no validado). Escribe poco, decide mejor y sal con una prueba mínima, no con una promesa inflada.", "A friendly workbook to turn work friction into a candidate tool. Write less, decide better and leave with a minimum test, not an inflated promise.", "Um caderno amigável para transformar uma fricção laboral em uma ferramenta candidata. Escreva pouco, decida melhor e saia com um teste mínimo, não com uma promessa inflada.")}</p>
      </div>
      <aside class="panel">
        <h3>${localized("Qué guardas al final", "What you keep at the end", "O que fica no final")}</h3>
        <ul>
          <li>${localized("Diagnóstico de fricción", "Friction diagnosis", "Diagnóstico de fricção")}</li>
          <li>${localized("Ruta primaria elegida", "Chosen primary route", "Rota primária escolhida")}</li>
          <li>${localized("Herramienta candidata", "Candidate tool", "Ferramenta candidata")}</li>
          <li>${localized("Evaluación P/A/T/J/E", "P/A/T/J/E evaluation", "Avaliação P/A/T/J/E")}</li>
        </ul>
      </aside>
    </div>
  </section>

  <section class="wrap" id="contrato">
    <div class="section-head"><span class="kicker">${localized("0 · Contrato", "0 · Contract", "0 · Contrato")}</span><h2>${localized("Antes de usar IA (inteligencia artificial), declara qué no vas a delegar", "Before using AI, state what you will not delegate", "Antes de usar IA, declare o que você não vai delegar")}</h2></div>
    <div class="grid g2">
      <div class="field"><label>${localized("Mi decisión humana pendiente", "My pending human decision", "Minha decisão humana pendente")}</label><textarea data-save="decision" placeholder="Ej. Priorizar dos iniciativas, preparar una conversación, ordenar una propuesta, aprender un concepto."></textarea></div>
      <div class="field"><label>${localized("Límites de la IA", "AI limits", "Limites da IA")}</label><textarea data-save="limits" placeholder="Ej. No decidir por mí, no inventar evidencia, no enviar nada, no asumir datos personales."></textarea></div>
    </div>
  </section>

  <section class="wrap" id="friccion">
    <div class="section-head"><span class="kicker">${localized("1 · Fricción", "1 · Friction", "1 · Fricção")}</span><h2>${localized("Nombra el bloqueo real sin maquillarlo", "Name the real blockage without dressing it up", "Nomeie o bloqueio real sem maquiar")}</h2></div>
    <div class="grid g3">
      <div class="field"><label>${localized("Situación concreta", "Concrete situation", "Situação concreta")}</label><textarea data-save="situation" placeholder="Qué está pasando, con quién, cuándo y qué duele."></textarea></div>
      <div class="field"><label>${localized("Hipótesis de fricción", "Friction hypothesis", "Hipótese de fricção")}</label><select data-save="friction"><option>Falta de claridad</option><option>Exceso de opciones</option><option>Deuda de método</option><option>Falta de evidencia</option><option>Miedo al error</option><option>Baja energía</option></select></div>
      <div class="field"><label>${localized("Prueba mínima posible", "Possible minimum test", "Teste mínimo possível")}</label><textarea data-save="test" placeholder="Una revisión local, una comparación antes/después, una conversación, un piloto pequeño."></textarea></div>
    </div>
  </section>

  <section class="wrap" id="ruta">
    <div class="section-head"><span class="kicker">${localized("2 · Ruta primaria", "2 · Primary route", "2 · Rota primária")}</span><h2>${localized("Elige una ruta. No intentes resolver todo en la intro.", "Choose one route. Do not try to solve everything in the intro.", "Escolha uma rota. Não tente resolver tudo na introdução.")}</h2></div>
    <div class="grid g3">
      <label class="card"><input type="radio" name="route" value="Decidir" data-route> <strong>Decidir</strong><p>${localized("Criterios, opciones y recomendación no vinculante.", "Criteria, options and non-binding recommendation.", "Critérios, opções e recomendação não vinculante.")}</p></label>
      <label class="card"><input type="radio" name="route" value="Aprender" data-route> <strong>Aprender</strong><p>${localized("Intento mínimo, pista y transferencia.", "Minimum attempt, hint and transfer.", "Tentativa mínima, pista e transferência.")}</p></label>
      <label class="card"><input type="radio" name="route" value="Construir" data-route> <strong>Construir</strong><p>${localized("Checklist, SOP (procedimiento operativo breve), plantilla o ritual.", "Checklist, SOP, template or ritual.", "Checklist, SOP, modelo ou ritual.")}</p></label>
      <label class="card"><input type="radio" name="route" value="Practicar" data-route> <strong>Practicar</strong><p>${localized("Ejercicio, feedback y repetición.", "Exercise, feedback and repetition.", "Exercício, feedback e repetição.")}</p></label>
      <label class="card"><input type="radio" name="route" value="Evaluar" data-route> <strong>Evaluar</strong><p>${localized("Rúbrica y correcciones priorizadas.", "Rubric and prioritized corrections.", "Rubrica e correções priorizadas.")}</p></label>
      <label class="card"><input type="radio" name="route" value="Reparar" data-route> <strong>Reparar</strong><p>${localized("Causa probable, parche y prueba.", "Probable cause, patch and test.", "Causa provável, correção e teste.")}</p></label>
    </div>
  </section>

  <section class="wrap" id="herramienta">
    <div class="section-head"><span class="kicker">${localized("3 · Herramienta candidata", "3 · Candidate tool", "3 · Ferramenta candidata")}</span><h2>${localized("Construye algo pequeño, reutilizable y honesto", "Build something small, reusable and honest", "Construa algo pequeno, reutilizável e honesto")}</h2></div>
    <div class="grid g2">
      <div class="field"><label>${localized("Tipo de herramienta", "Tool type", "Tipo de ferramenta")}</label><select data-save="toolType"><option>Checklist</option><option>SOP breve</option><option>Plantilla</option><option>Rúbrica</option><option>Bitácora</option><option>Prompt reusable (instrucción escrita reutilizable)</option></select></div>
      <div class="field"><label>${localized("Criterio de listo", "Done criterion", "Critério de done")}</label><textarea data-save="done" placeholder="Cómo sabrás que esta herramienta candidata sirve para una prueba mínima."></textarea></div>
    </div>
    <div class="prompt" style="margin-top:1rem"><div class="prompt-head"><span>Prompt (instrucción escrita) · herramienta candidata</span><button class="copy" data-copy>Copy</button></div><pre>Actúa como facilitador de Trabajo Amplificado. No resuelvas mi problema de golpe. Usa mi diagnóstico y mi ruta primaria para ayudarme a crear una herramienta candidata: checklist, SOP breve, plantilla, rúbrica, bitácora o prompt reusable. Declara objetivo, límite, supuestos, criterio de listo, prueba mínima y brecha de evidencia. Cierra devolviéndome la decisión final.</pre></div>
  </section>

  <section class="wrap" id="evaluacion">
    <div class="section-head"><span class="kicker">${localized("4 · P/A/T/J/E", "4 · P/A/T/J/E", "4 · P/A/T/J/E")}</span><h2>${localized("Evalúa si amplifica criterio o solo produce texto", "Evaluate whether it amplifies judgment or only produces text", "Avalie se amplifica julgamento ou só produz texto")}</h2></div>
    <div class="grid g2">
      <div class="field"><label>Propósito</label><textarea data-save="p" placeholder="Qué busca mejorar y por qué importa."></textarea></div>
      <div class="field"><label>Agencia</label><textarea data-save="a" placeholder="Qué decides tú, qué hace la IA y qué no se delega."></textarea></div>
      <div class="field"><label>Transferencia</label><textarea data-save="t" placeholder="Cómo usarías el método en otro caso."></textarea></div>
      <div class="field"><label>Juicio</label><textarea data-save="j" placeholder="Criterios, riesgos, tradeoffs y abort criteria."></textarea></div>
      <div class="field"><label>Evidencia</label><textarea data-save="e" placeholder="Qué se probó, qué falta, qué queda como coverage_gap (brecha de evidencia pendiente)."></textarea></div>
      <div class="note"><strong>${localized("Estado honesto:", "Honest status:", "Estado honesto:")}</strong><p>${localized("Si hiciste una prueba mínima, puedes decir candidate (candidato, no validado). Sin práctica real ni evidencia posterior, no digas validated.", "If you ran a minimum test, you can say candidate. Without real practice and later evidence, do not say validated.", "Se fez um teste mínimo, pode dizer candidate. Sem prática real nem evidência posterior, não diga validated.")}</p></div>
    </div>
    <div class="toolbar">
      <button class="btn" type="button" id="exportMd">${localized("Exportar Markdown", "Export Markdown", "Exportar Markdown")}</button>
      <button class="btn secondary" type="button" id="clearForm">${localized("Limpiar notas", "Clear notes", "Limpar notas")}</button>
    </div>
  </section>
</main>
${footer("Workbook")}`;
  return pageShell({
    title: "Introducción al Trabajo Amplificado · Workbook",
    description: "Workbook gratuito de MetodologIA para diagnosticar fricción, elegir ruta primaria y crear una herramienta candidata con IA.",
    slug: "workbook-introduccion.html",
    body,
    scripts: `<script>
(function(){
  var KEY='intro-trabajo-amplificado-workbook';
  var fields=[].slice.call(document.querySelectorAll('[data-save]'));
  function load(){
    try{var data=JSON.parse(localStorage.getItem(KEY)||'{}');fields.forEach(function(f){if(data[f.dataset.save])f.value=data[f.dataset.save];});}catch(e){}
  }
  function save(){
    var data={};fields.forEach(function(f){data[f.dataset.save]=f.value;});
    var route=document.querySelector('[data-route]:checked'); if(route)data.route=route.value;
    try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){}
  }
  fields.forEach(function(f){f.addEventListener('input',save);f.addEventListener('change',save);});
  document.querySelectorAll('[data-route]').forEach(function(r){r.addEventListener('change',save);});
  document.getElementById('exportMd').addEventListener('click',function(){
    save();
    var data=JSON.parse(localStorage.getItem(KEY)||'{}');
    var md=['# Introducción al Trabajo Amplificado - Workbook','','## Contrato','- Decisión humana pendiente: '+(data.decision||''),'- Límites IA: '+(data.limits||''),'','## Fricción','- Situación: '+(data.situation||''),'- Hipótesis: '+(data.friction||''),'- Prueba mínima: '+(data.test||''),'','## Ruta primaria','- Ruta: '+(data.route||''),'','## Herramienta candidata','- Tipo: '+(data.toolType||''),'- Criterio de listo: '+(data.done||''),'','## P/A/T/J/E','- Propósito: '+(data.p||''),'- Agencia: '+(data.a||''),'- Transferencia: '+(data.t||''),'- Juicio: '+(data.j||''),'- Evidencia: '+(data.e||''),'','Estado recomendado: candidate, salvo que exista evidencia posterior proporcional al riesgo.'].join('\\n');
    navigator.clipboard.writeText(md).then(function(){alert('Markdown copiado al portapapeles.');});
  });
  document.getElementById('clearForm').addEventListener('click',function(){
    if(confirm('¿Limpiar las notas guardadas en este navegador?')){localStorage.removeItem(KEY);fields.forEach(function(f){f.value='';});document.querySelectorAll('[data-route]').forEach(function(r){r.checked=false;});}
  });
  load();
})();
</script>`,
  });
}

function introWorkshop() {
  const body = `${topNav("workshop")}
<main>
  <section class="hero" id="inicio">
    <div class="hero-in">
      <div>
        <span class="kicker">${localized("Taller gratuito · 90-120 min", "Free workshop · 90-120 min", "Workshop gratuito · 90-120 min")}</span>
        <h1>${localized("Introducción al Trabajo Amplificado", "Introduction to Amplified Work", "Introdução ao Trabalho Amplificado")}</h1>
        <p class="lead">${localized("Una clase demo para vivir el método sin costo: diagnosticas una fricción real, eliges una ruta primaria, construyes una herramienta candidata (primer borrador útil, todavía no validado) y sales con una prueba mínima.", "A demo class to experience the method at no cost: diagnose a real friction, choose a primary route, build a candidate tool and leave with a minimum test.", "Uma aula demo para viver o método sem custo: diagnostica uma fricção real, escolhe uma rota primária, constrói uma ferramenta candidata e sai com um teste mínimo.")}</p>
        <div class="toolbar">
          <a class="btn" href="https://forms.gle/uCwUZkeoyStaLegf7" target="_blank" rel="noopener">${localized("Inscríbete sin costo", "Enroll at no cost", "Inscreva-se sem custo")}</a>
          <a class="btn secondary" href="workbook-introduccion.html">${localized("Abrir workbook", "Open workbook", "Abrir workbook")}</a>
          <a class="btn secondary" href="diapositivas-introduccion.html">${localized("Ver deck (diapositivas)", "See deck", "Ver deck (diapositivas)")}</a>
        </div>
      </div>
      <aside class="panel">
        <h3>${localized("No es una demo de herramienta", "It is not a tool demo", "Não é uma demo de ferramenta")}</h3>
        <p>${localized("La herramienta aparece como soporte. El centro es agencia: propósito, criterio, límites, transferencia y evidencia.", "The tool appears as support. The center is agency: purpose, criteria, limits, transfer and evidence.", "A ferramenta aparece como suporte. O centro é agência: propósito, critério, limites, transferência e evidência.")}</p>
        <div class="stat-grid" style="margin-top:1rem">
          <div class="stat"><strong>1</strong><span>${localized("fricción", "friction", "fricção")}</span></div>
          <div class="stat"><strong>1</strong><span>${localized("ruta", "route", "rota")}</span></div>
          <div class="stat"><strong>1</strong><span>${localized("herramienta", "tool", "ferramenta")}</span></div>
          <div class="stat"><strong>1</strong><span>${localized("prueba", "test", "teste")}</span></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="wrap" id="que-es">
    <div class="section-head">
      <span class="kicker">${localized("Qué cambia", "What changes", "O que muda")}</span>
      <h2>${localized("Pasas de pedir outputs a diseñar una forma de trabajar", "You move from asking for outputs to designing a way of working", "Você passa de pedir outputs a desenhar uma forma de trabalhar")}</h2>
      <p class="lead">${localized("La intro toma la tesis de Empoderamiento en IA: la IA (inteligencia artificial) amplifica cuando aumenta agencia, no cuando oculta el juicio humano detrás de respuestas rápidas.", "The intro takes the Empowerment in AI thesis: AI amplifies when it increases agency, not when it hides human judgment behind fast answers.", "A introdução toma a tese de Empoderamento em IA: a IA amplifica quando aumenta agência, não quando esconde o julgamento humano atrás de respostas rápidas.")}</p>
    </div>
    <div class="grid g3">
      <article class="card"><h3>${localized("Método primero", "Method first", "Método primeiro")}</h3><p>${localized("Definimos objetivo, límite, criterio y evidencia antes de producir.", "We define goal, limit, criteria and evidence before producing.", "Definimos objetivo, limite, critério e evidência antes de produzir.")}</p></article>
      <article class="card"><h3>${localized("IA como socio de pensamiento", "AI as thinking partner", "IA como parceira de pensamento")}</h3><p>${localized("La IA organiza opciones, preguntas y tradeoffs; no reemplaza tu responsabilidad.", "AI organizes options, questions and tradeoffs; it does not replace your responsibility.", "A IA organiza opções, perguntas e tradeoffs; não substitui sua responsabilidade.")}</p></article>
      <article class="card"><h3>${localized("Salida verificable", "Verifiable output", "Saída verificável")}</h3><p>${localized("Cerramos con herramienta candidata y brecha de evidencia, no con una promesa de validación.", "We close with a candidate tool and evidence gap, not with a validation promise.", "Fechamos com ferramenta candidata e lacuna de evidência, não com uma promessa de validação.")}</p></article>
    </div>
  </section>

  <section class="wrap" id="agenda">
    <div class="section-head">
      <span class="kicker">${localized("Agenda", "Agenda", "Agenda")}</span>
      <h2>${localized("Una clase amena, práctica y con cierre honesto", "A friendly, practical class with an honest close", "Uma aula amena, prática e com fechamento honesto")}</h2>
    </div>
    <div class="timeline">
      <article class="time-row"><div class="time">00:00</div><div><h3>${localized("Mito de la velocidad", "Speed myth", "Mito da velocidade")}</h3><p>${localized("Por qué la IA puede acelerar el caos si no hay método.", "Why AI can accelerate chaos without method.", "Por que a IA pode acelerar o caos se não há método.")}</p></div></article>
      <article class="time-row"><div class="time">00:20</div><div><h3>${localized("Diagnóstico de fricción", "Friction diagnosis", "Diagnóstico de fricção")}</h3><p>${localized("Nombras un bloqueo concreto de trabajo y eliges qué no vas a delegar.", "You name a concrete work blockage and choose what you will not delegate.", "Você nomeia um bloqueio concreto de trabalho e escolhe o que não vai delegar.")}</p></div></article>
      <article class="time-row"><div class="time">00:45</div><div><h3>${localized("Router de rutas", "Route router", "Roteador de rotas")}</h3><p>${localized("Decidir, aprender, practicar, construir, evaluar o reparar. Elegimos una ruta primaria.", "Decide, learn, practice, build, evaluate or repair. We choose one primary route.", "Decidir, aprender, praticar, construir, avaliar ou reparar. Escolhemos uma rota primária.")}</p></div></article>
      <article class="time-row"><div class="time">01:05</div><div><h3>${localized("Demo guiada", "Guided demo", "Demo guiada")}</h3><p>${localized("Transformamos el antipatrón 'decide por mí' en decisión no vinculante con criterios visibles.", "We turn the 'decide for me' anti-pattern into a non-binding decision with visible criteria.", "Transformamos o antipadrão 'decida por mim' em decisão não vinculante com critérios visíveis.")}</p></div></article>
      <article class="time-row"><div class="time">01:35</div><div><h3>${localized("Workbook y P/A/T/J/E", "Workbook and P/A/T/J/E", "Workbook e P/A/T/J/E")}</h3><p>${localized("Cierras con una herramienta candidata, prueba mínima y brecha de evidencia.", "You close with a candidate tool, minimum test and evidence gap.", "Você fecha com uma ferramenta candidata, teste mínimo e lacuna de evidência.")}</p></div></article>
    </div>
  </section>

  <section class="wrap" id="materiales">
    <div class="section-head"><span class="kicker">${localized("Materiales", "Materials", "Materiais")}</span><h2>${localized("Masterclass (clase guía), workbook (cuaderno de trabajo) y deck (diapositivas) trabajan como una sola clase", "Masterclass, workbook and deck work as one class", "Masterclass, workbook e deck funcionam como uma só aula")}</h2></div>
    <div class="grid g3">
      <article class="card"><h3>Masterclass</h3><p>${localized("Marco narrativo y explicación de la tesis.", "Narrative frame and thesis explanation.", "Marco narrativo e explicação da tese.")}</p><p><a href="clase-introductoria.html">clase-introductoria.html</a></p></article>
      <article class="card"><h3>Workbook</h3><p>${localized("Cuaderno vivo para escribir la fricción, ruta, herramienta y evidencia.", "Live workbook to write friction, route, tool and evidence.", "Caderno vivo para escrever fricção, rota, ferramenta e evidência.")}</p><p><a href="workbook-introduccion.html">workbook-introduccion.html</a></p></article>
      <article class="card"><h3>Deck</h3><p>${localized("Diapositivas para facilitar la clase introductoria gratuita.", "Slides to facilitate the free introductory class.", "Slides para facilitar a aula introdutória gratuita.")}</p><p><a href="diapositivas-introduccion.html">diapositivas-introduccion.html</a></p></article>
    </div>
  </section>

  <section class="wrap" id="faq">
    <div class="section-head"><span class="kicker">FAQ</span><h2>${localized("Preguntas antes de entrar", "Questions before joining", "Perguntas antes de entrar")}</h2></div>
    <div class="grid g2">
      <article class="card"><h3>${localized("¿Cuánto cuesta?", "How much does it cost?", "Quanto custa?")}</h3><p>${localized("La clase introductoria es gratuita y sin costo. Los talleres especializados y el bootcamp (programa intensivo y guiado) siguen siendo rutas posteriores.", "The introductory class is free and at no cost. Specialized workshops and the bootcamp remain later paths.", "A aula introdutória é gratuita e sem custo. Workshops especializados e bootcamp seguem como rotas posteriores.")}</p></article>
      <article class="card"><h3>${localized("¿Necesito herramienta paga?", "Do I need a paid tool?", "Preciso de ferramenta paga?")}</h3><p>${localized("No para la intro. Puedes seguir la clase con el workbook y observar la demo.", "Not for the intro. You can follow the class with the workbook and observe the demo.", "Não para a intro. Você pode acompanhar a aula com o workbook e observar a demo.")}</p></article>
      <article class="card"><h3>${localized("¿Salgo con un sistema completo?", "Do I leave with a full system?", "Saio com um sistema completo?")}</h3><p>${localized("No. Sales con una herramienta candidata y una prueba mínima. El sistema completo pertenece al bootcamp (programa intensivo y guiado).", "No. You leave with a candidate tool and a minimum test. The full system belongs to the bootcamp.", "Não. Sai com uma ferramenta candidata e um teste mínimo. O sistema completo pertence ao bootcamp.")}</p></article>
      <article class="card"><h3>${localized("¿Cuál es el puente después?", "What is the bridge after?", "Qual é a ponte depois?")}</h3><p>${localized("Si la intro te sirve, puedes profundizar en prompting (diseño de instrucciones para IA), automatización o bootcamp según la fricción que hayas diagnosticado.", "If the intro helps, you can deepen into prompting, automation or bootcamp depending on the friction you diagnosed.", "Se a intro ajudar, você pode aprofundar em prompting, automação ou bootcamp segundo a fricção diagnosticada.")}</p></article>
    </div>
  </section>
</main>
${footer("Taller gratuito")}`;
  return pageShell({
    title: "Introducción al Trabajo Amplificado · Taller gratuito",
    description: "Taller introductorio gratuito de MetodologIA para diagnosticar fricción, elegir una ruta primaria y crear una herramienta candidata con IA.",
    slug: "introduccion-trabajo-amplificado.html",
    body,
  });
}

function deck() {
  const slides = [
    {
      k: localized("Taller gratuito · clase demo", "Free workshop · demo class", "Workshop gratuito · aula demo"),
      t: localized("Introducción al Trabajo Amplificado", "Introduction to Amplified Work", "Introdução ao Trabalho Amplificado"),
      l: localized("En esta demo no montas un Jarvis completo. Aprendes a convertir una fricción laboral real en una herramienta candidata verificable.", "In this demo you do not build a full Jarvis. You learn to turn real work friction into a verifiable candidate tool.", "Nesta demo você não monta um Jarvis completo. Aprende a transformar uma fricção laboral real em uma ferramenta candidata verificável."),
      n: localized("1 fricción · 1 ruta · 1 herramienta · 1 prueba mínima", "1 friction · 1 route · 1 tool · 1 minimum test", "1 fricção · 1 rota · 1 ferramenta · 1 teste mínimo"),
    },
    {
      k: localized("El mito", "The myth", "O mito"),
      t: localized("La IA no te vuelve mejor por responder más rápido", "AI does not make you better by answering faster", "A IA não te torna melhor por responder mais rápido"),
      l: localized("La productividad visible puede esconder rendición cognitiva. Si la IA piensa por ti, pierdes criterio justo cuando más lo necesitas.", "Visible productivity can hide cognitive surrender. If AI thinks for you, you lose judgment exactly when you need it most.", "A produtividade visível pode esconder rendição cognitiva. Se a IA pensa por você, você perde julgamento quando mais precisa dele."),
      n: localized("Velocidad sin juicio = deuda de método", "Speed without judgment = method debt", "Velocidade sem julgamento = dívida de método"),
    },
    {
      k: localized("La tesis", "The thesis", "A tese"),
      t: localized("Trabajo amplificado = agencia observable", "Amplified work = observable agency", "Trabalho amplificado = agência observável"),
      l: localized("La persona conserva objetivo, juicio, autoría y responsabilidad. La IA reduce fricción, estructura pensamiento y acelera práctica.", "The person keeps goal, judgment, authorship and responsibility. AI reduces friction, structures thinking and accelerates practice.", "A pessoa conserva objetivo, julgamento, autoria e responsabilidade. A IA reduz fricção, estrutura pensamento e acelera prática."),
      n: localized("La decisión final vuelve a ti", "The final decision returns to you", "A decisão final volta para você"),
    },
    {
      k: localized("Contrato", "Contract", "Contrato"),
      t: localized("Antes de producir, declara el límite", "Before producing, state the limit", "Antes de produzir, declare o limite"),
      l: localized("Todo output debe tener objetivo, contexto, criterio de calidad, límite y evidencia disponible. Si falta evidencia, se nombra la brecha.", "Every output needs goal, context, quality criteria, limits and available evidence. If evidence is missing, name the gap.", "Todo output precisa de objetivo, contexto, critério de qualidade, limite e evidência disponível. Se falta evidência, nomeie a lacuna."),
      n: localized("No convertir hipótesis en certeza", "Do not turn hypotheses into certainty", "Não transforme hipótese em certeza"),
    },
    {
      k: localized("Diagnóstico", "Diagnosis", "Diagnóstico"),
      t: localized("Nombra la fricción real", "Name the real friction", "Nomeie a fricção real"),
      l: localized("¿Falta claridad, sobran opciones, falta evidencia, hay deuda de método, baja energía o miedo al error?", "Is it missing clarity, too many options, missing evidence, method debt, low energy or fear of error?", "Falta clareza, sobram opções, falta evidência, há dívida de método, baixa energia ou medo do erro?"),
      n: localized("Problema bien nombrado > prompt elegante", "Well-named problem > elegant prompt", "Problema bem nomeado > prompt elegante"),
    },
    {
      k: localized("Router", "Router", "Router"),
      t: localized("Elige una ruta primaria", "Choose a primary route", "Escolha uma rota primária"),
      l: localized("Decidir, aprender, practicar, construir, evaluar o reparar. En la intro no se aplican todas: se elige una por riesgo y resultado esperado.", "Decide, learn, practice, build, evaluate or repair. In the intro you do not apply all of them: choose one by risk and expected result.", "Decidir, aprender, praticar, construir, avaliar ou reparar. Na introdução não se aplicam todas: escolha uma por risco e resultado esperado."),
      n: localized("Una ruta primaria", "One primary route", "Uma rota primária"),
    },
    {
      k: "Demo",
      t: localized("Antipatrón: decide por mí", "Anti-pattern: decide for me", "Antipadrão: decida por mim"),
      l: localized("Pedir una decisión delega responsabilidad. La IA puede sonar segura sin tener evidencia ni conocer tus valores.", "Asking for a decision delegates responsibility. AI may sound confident without evidence or your values.", "Pedir uma decisão delega responsabilidade. A IA pode soar segura sem evidência nem conhecer seus valores."),
      n: localized("No delegar decisiones de riesgo", "Do not delegate risky decisions", "Não delegue decisões de risco"),
    },
    {
      k: "Demo",
      t: localized("Forma amplificada: decisión no vinculante", "Amplified form: non-binding decision", "Forma amplificada: decisão não vinculante"),
      l: localized("La IA separa criterios, opciones, tradeoffs, riesgos y abort criteria. Luego devuelve una recomendación no vinculante y la decisión humana pendiente.", "AI separates criteria, options, tradeoffs, risks and abort criteria. Then it returns a non-binding recommendation and the pending human decision.", "A IA separa critérios, opções, tradeoffs, riscos e abort criteria. Depois devolve uma recomendação não vinculante e a decisão humana pendente."),
      n: localized("Criterio visible", "Visible criteria", "Critério visível"),
    },
    {
      k: "Workbook",
      t: localized("De output a herramienta candidata", "From output to candidate tool", "De output a ferramenta candidata"),
      l: localized("El resultado de clase debe ser pequeño y reusable: checklist, SOP (procedimiento operativo breve), plantilla, rúbrica, bitácora o prompt (instrucción escrita). No una respuesta final.", "Class output should be small and reusable: checklist, SOP, template, rubric, logbook or prompt. Not a final answer.", "O resultado da aula deve ser pequeno e reutilizável: checklist, SOP, modelo, rubrica, diário ou prompt. Não uma resposta final."),
      n: localized("Método antes que output", "Method before output", "Método antes do output"),
    },
    {
      k: "P/A/T/J/E",
      t: localized("La rúbrica mínima", "The minimum rubric", "A rubrica mínima"),
      l: localized("Propósito: qué busco. Agencia: qué decido. Transferencia: cómo lo reutilizo. Juicio: qué riesgos veo. Evidencia: qué probé.", "Purpose: what I seek. Agency: what I decide. Transfer: how I reuse it. Judgment: which risks I see. Evidence: what I tested.", "Propósito: o que busco. Agência: o que decido. Transferência: como reutilizo. Julgamento: quais riscos vejo. Evidência: o que testei."),
      n: localized("Cinco preguntas de control", "Five control questions", "Cinco perguntas de controle"),
    },
    {
      k: localized("Prueba mínima", "Minimum test", "Teste mínimo"),
      t: localized("Candidate no es validated", "Candidate is not validated", "Candidate não é validated"),
      l: localized("Si solo tienes una buena explicación, no hay validación. Una versión candidate (candidato, no validado) declara cómo se probó, qué falta y qué sigue incierto.", "If you only have a good explanation, there is no validation. A candidate version states how it was tested, what is missing and what remains uncertain.", "Se você só tem uma boa explicação, não há validação. Uma versão candidate declara como foi testada, o que falta e o que segue incerto."),
      n: localized("Evidencia proporcional", "Proportional evidence", "Evidência proporcional"),
    },
    {
      k: localized("Ejercicio en vivo", "Live exercise", "Exercício ao vivo"),
      t: localized("Tu fricción en 8 minutos", "Your friction in 8 minutes", "Sua fricção em 8 minutos"),
      l: localized("Escribe una fricción laboral actual, elige una ruta primaria y define qué herramienta candidata sería útil esta semana.", "Write a current work friction, choose one primary route and define which candidate tool would be useful this week.", "Escreva uma fricção laboral atual, escolha uma rota primária e defina qual ferramenta candidata seria útil esta semana."),
      n: localized("Bajo riesgo, caso real", "Low risk, real case", "Baixo risco, caso real"),
    },
    {
      k: localized("Puente", "Bridge", "Ponte"),
      t: localized("Qué sigue después de la intro", "What comes after the intro", "O que vem depois da intro"),
      l: localized("Talleres: prompting y automatización. Bootcamp: práctica, repetición, evaluación y transferencia hasta tener sistema propio.", "Workshops: prompting and automation. Bootcamp: practice, repetition, evaluation and transfer until you have your own system.", "Workshops: prompting e automação. Bootcamp: prática, repetição, avaliação e transferência até ter seu próprio sistema."),
      n: localized("La intro abre la puerta", "The intro opens the door", "A intro abre a porta"),
    },
    {
      k: localized("Cierre", "Close", "Fechamento"),
      t: localized("No saliste con magia. Saliste con método.", "You did not leave with magic. You left with method.", "Você não saiu com magia. Saiu com método."),
      l: localized("Si puedes explicar tu criterio, reutilizar tu herramienta y nombrar la brecha de evidencia, ya empezaste a trabajar amplificado.", "If you can explain your criteria, reuse your tool and name the evidence gap, you have started amplified work.", "Se consegue explicar seu critério, reutilizar sua ferramenta e nomear a lacuna de evidência, você começou a trabalhar amplificado."),
      n: localized("Método primero, (Gen)IA después", "Method first, (Gen)AI after", "Método primeiro, (Gen)IA depois"),
    },
  ];
  const body = `<a class="home-link" href="index.html">↩ Inicio</a>
<div class="deck-progress" id="progress"></div>
<main class="deck" id="deck">
${slides.map((s, i) => `<section class="slide${i === 0 ? " on" : ""}" aria-hidden="${i === 0 ? "false" : "true"}">
  <div class="slide-wrap">
    <span class="slide-kicker">${s.k}</span>
    <h1>${s.t}</h1>
    <p class="slide-lead">${s.l}</p>
    <div class="slide-note">${s.n}</div>
  </div>
</section>`).join("\n")}
</main>
<div class="brandbar"><span class="logo" aria-hidden="true"></span><b>Metodolog<span>IA</span></b><span>Introducción al Trabajo Amplificado</span></div>
<div class="hud">
  <button class="mini-btn" type="button" id="themeDeck">☾</button>
  <button class="mini-btn" type="button" data-lang-toggle><span data-lang-current>ES</span></button>
  <button class="navbtn" id="prev" aria-label="Anterior">‹</button>
  <span class="counter" id="counter">1 / ${slides.length}</span>
  <button class="navbtn" id="next" aria-label="Siguiente">›</button>
</div>`;
  return pageShell({
    title: "Introducción al Trabajo Amplificado · Deck",
    description: "Deck de clase demo gratuita Introducción al Trabajo Amplificado de MetodologIA.",
    slug: "diapositivas-introduccion.html",
    bodyClass: "deck-page",
    styles: `.deck-page{overflow:hidden;background:#071426;color:#eaf1ff}.deck-page .top{display:none}.home-link{position:fixed;top:14px;right:14px;z-index:80;text-decoration:none;border:1px solid rgba(255,215,0,.45);background:#0a122a;color:#ffd700;border-radius:999px;padding:.5rem .85rem;font-family:var(--fh);font-size:.8rem}.deck{position:fixed;inset:0;overflow:hidden}.slide{position:absolute;inset:0;display:flex;align-items:center;padding:clamp(2rem,6vw,5rem) clamp(1.4rem,8vw,8rem) 6rem;opacity:0;visibility:hidden;transform:translateX(40px);transition:opacity .45s ease,transform .45s ease;pointer-events:none;background:radial-gradient(circle at 14% 18%,rgba(255,215,0,.14),transparent 32%),linear-gradient(135deg,#071426,#0a122a 55%,#13294a)}.slide.on{opacity:1;visibility:visible;transform:none;pointer-events:auto}.slide.prev{transform:translateX(-40px)}.slide-wrap{max-width:1060px}.slide-kicker{display:inline-flex;margin-bottom:1.1rem;color:#ffd700;font-weight:900;text-transform:uppercase;letter-spacing:.18em;font-size:.72rem}.slide h1{font-size:clamp(2.4rem,7vw,5.8rem);color:#fff8d6}.slide-lead{font-size:clamp(1.1rem,2vw,1.55rem);max-width:760px;color:#d7e0ef;line-height:1.6;margin-top:1.3rem}.slide-note{margin-top:2rem;display:inline-flex;border:1px solid rgba(255,215,0,.35);background:rgba(255,215,0,.12);color:#ffd700;border-radius:999px;padding:.7rem 1rem;font-weight:900}.brandbar{position:fixed;left:clamp(1rem,4vw,3rem);bottom:1.1rem;z-index:70;display:flex;gap:.55rem;align-items:center;color:#d7e0ef;font-weight:800}.brandbar .logo{width:26px;height:26px}.brandbar b span{color:#ffd700}.hud{position:fixed;right:clamp(1rem,4vw,3rem);bottom:1rem;z-index:70;display:flex;align-items:center;gap:.5rem}.navbtn{width:46px;height:46px;border:1px solid rgba(255,215,0,.32);border-radius:12px;background:#13294a;color:#ffd700;font-size:1.4rem;cursor:pointer}.navbtn:hover{background:#ffd700;color:#071426}.counter{font-family:var(--fm);color:#d7e0ef;min-width:72px;text-align:center}.deck-progress{position:fixed;top:0;left:0;height:4px;background:#ffd700;width:0;z-index:90;transition:width .3s}.deck-page.theme-light .slide{background:radial-gradient(circle at 14% 18%,rgba(255,215,0,.2),transparent 32%),linear-gradient(135deg,#fff,#f3f6fb 60%,#fff8d6)}.deck-page.theme-light .slide h1{color:#122562}.deck-page.theme-light .slide-lead{color:#26324a}.deck-page.theme-light .brandbar,.deck-page.theme-light .counter{color:#122562}@media(max-width:760px){.slide{padding:4rem 1.25rem 6.2rem}.brandbar span:last-child{display:none}}`,
    body,
    scripts: `<script>
(function(){
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var i=0,n=slides.length,c=document.getElementById('counter'),p=document.getElementById('progress');
  function show(k){k=Math.max(0,Math.min(n-1,k));slides.forEach(function(s,idx){s.classList.remove('on','prev');s.setAttribute('aria-hidden','true');if(idx<k)s.classList.add('prev');});slides[k].classList.add('on');slides[k].setAttribute('aria-hidden','false');i=k;c.textContent=(k+1)+' / '+n;p.style.width=((k+1)/n*100)+'%';}
  document.getElementById('next').onclick=function(){show(i+1);};
  document.getElementById('prev').onclick=function(){show(i-1);};
  document.addEventListener('keydown',function(e){if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(i+1);}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(i-1);}if(e.key==='Home')show(0);if(e.key==='End')show(n-1);});
  document.getElementById('themeDeck').onclick=function(){document.body.classList.toggle('theme-light');document.body.classList.toggle('theme-dark');};
  show(0);
})();
</script>`,
  });
}

writeFileSync("clase-introductoria.html", masterclass());
writeFileSync("workbook-introduccion.html", workbook());
writeFileSync("introduccion-trabajo-amplificado.html", introWorkshop());
writeFileSync("diapositivas-introduccion.html", deck());
console.log("Generated intro assets: clase-introductoria.html, workbook-introduccion.html, introduccion-trabajo-amplificado.html, diapositivas-introduccion.html");
