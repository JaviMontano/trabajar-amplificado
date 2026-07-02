(function(){
  document.querySelectorAll('[data-modal]').forEach(function(el){
    function open(){
      var d=document.getElementById(el.getAttribute('data-modal'));
      if(d&&d.showModal)d.showModal();
    }
    el.addEventListener('click',open);
    el.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}
    });
  });
  document.querySelectorAll('dialog.ta-modal').forEach(function(d){
    d.addEventListener('click',function(e){if(e.target===d)d.close();});
    d.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',function(){d.close();});});
  });
  var html=document.documentElement;
  var tb=document.getElementById('themebtn');
  function ti(){ if(tb) tb.textContent = html.dataset.theme==='dark' ? '☀' : '☾'; }
  ti();
  if(tb) tb.addEventListener('click', function(){
    html.dataset.theme = (html.dataset.theme==='dark') ? 'light' : 'dark';
    try{ localStorage.setItem('mdg_theme', html.dataset.theme); }catch(e){}
    ti();
  });
  var langs=['es','en','pt'], lb=document.getElementById('langbtn');
  function setLang(l){
    if(langs.indexOf(l)<0) l='es';
    html.lang=l;
    try{ localStorage.setItem('mdg_locale', l); }catch(e){}
    if(lb) lb.textContent=l.toUpperCase();
  }
  setLang(html.lang||'es');
  if(lb) lb.addEventListener('click', function(){
    var i=langs.indexOf(html.lang);
    setLang(langs[(i+1)%langs.length]);
  });
})();
