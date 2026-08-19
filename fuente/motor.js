/* ══════════════════════════════════════════════════════════════
   CHASKI · MOTOR DE BÚSQUEDA
   Busca dentro de la app sobre un índice local.
   Sin depender de Google. Sin salir a otra pestaña.
   ══════════════════════════════════════════════════════════════ */

var INDICE={registros:[],generado:'',total:0};

/* ── normalización: minúsculas y sin tildes ── */
function nm(s){
  return String(s==null?'':s).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^\w\s"-]/g,' ').replace(/\s+/g,' ').trim();
}

/* ── analiza la consulta: frases exactas, exclusiones, términos sueltos ── */
function analizar(txt){
  var q={frases:[],mas:[],menos:[]};
  var t=String(txt||'');
  t.replace(/"([^"]+)"/g,function(_,f){q.frases.push(nm(f));return ' ';});
  t=t.replace(/"[^"]*"/g,' ');
  nm(t).split(' ').forEach(function(w){
    if(!w)return;
    if(w.charAt(0)==='-'){ if(w.length>1)q.menos.push(w.slice(1)); }
    else q.mas.push(w);
  });
  return q;
}

/* ── texto indexado de un registro, con pesos ── */
function campos(r){
  return [
    {t:nm(r.titulo),  p:10},
    {t:nm(r.objeto),  p:6},
    {t:nm(r.entidad), p:5},
    {t:nm(r.distrito+' '+r.provincia+' '+r.region), p:4},
    {t:nm(r.tipo),    p:3}
  ];
}

/* ── puntúa un registro contra la consulta ── */
function puntuar(r,q){
  var cs=campos(r), todo=cs.map(function(c){return c.t;}).join(' ');

  for(var i=0;i<q.menos.length;i++) if(todo.indexOf(q.menos[i])>=0) return -1;
  for(var j=0;j<q.frases.length;j++) if(todo.indexOf(q.frases[j])<0) return -1;

  var pts=0, encontrados=0;
  q.frases.forEach(function(f){
    cs.forEach(function(c){ if(c.t.indexOf(f)>=0) pts+=c.p*3; });
    encontrados++;
  });
  q.mas.forEach(function(w){
    var hit=false;
    cs.forEach(function(c){
      var k=c.t.indexOf(w);
      if(k<0) return;
      hit=true;
      var exacto=new RegExp('(^| )'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'( |$)').test(c.t);
      pts+=c.p*(exacto?2:1);
    });
    if(hit)encontrados++;
  });

  var total=q.frases.length+q.mas.length;
  if(total>0 && encontrados===0) return -1;
  if(total>0) pts=pts*(encontrados/total);   // premia cubrir más términos

  /* recencia: lo que cierra pronto pesa más */
  var d=diasPara(r.cierra);
  if(d>=0) pts+= d<=3?9: d<=7?6: d<=15?3:1;
  return pts;
}
function diasPara(f){
  var p=String(f).split('-'), h=new Date(); h.setHours(0,0,0,0);
  return Math.round((new Date(+p[0],+p[1]-1,+p[2])-h)/86400000);
}

/* ── búsqueda ── */
function motorBuscar(texto,filtros){
  var q=analizar(texto), F=filtros||{};
  var res=[];
  INDICE.registros.forEach(function(r){
    if(F.region && r.region!==F.region) return;
    if(F.prov   && r.provincia!==F.prov) return;
    if(F.dist   && r.distrito!==F.dist) return;
    if(F.tipo   && r.tipo!==F.tipo) return;
    var d=diasPara(r.cierra);
    if(!F.vencidas && d<0) return;
    if(F.maxDias!=null && d>F.maxDias) return;
    var p=puntuar(r,q);
    if(p<0) return;
    res.push({r:r,p:p,d:d});
  });
  res.sort(function(a,b){return b.p-a.p || a.d-b.d;});
  return res;
}

/* ── sugerencias mientras escribe ── */
function sugerir(txt){
  var t=nm(txt); if(t.length<2) return [];
  var voc={};
  INDICE.registros.forEach(function(r){
    nm(r.titulo+' '+r.objeto+' '+r.entidad).split(' ').forEach(function(w){
      if(w.length>3 && w.indexOf(t)===0) voc[w]=(voc[w]||0)+1;
    });
  });
  return Object.keys(voc).sort(function(a,b){return voc[b]-voc[a];}).slice(0,6);
}

/* ── resaltar coincidencias ── */
function marcar(txt,q){
  var out=esc(txt);
  var terms=q.frases.concat(q.mas).filter(function(w){return w.length>2;});
  terms.forEach(function(w){
    try{
      var re=new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
      out=out.replace(re,'<mark>$1</mark>');
    }catch(e){}
  });
  return out;
}

/* ── pintar resultados del motor ── */
function pintarMotor(){
  var el=document.getElementById('mResult'); if(!el)return;
  var txt=((document.getElementById('bTexto')||{}).value||'').trim();
  var base=txt||(B.rubro!==null?RUBROS[B.rubro].q.replace(/ OR /g,' '):'');
  if(B.excluir) base+=' '+B.excluir.split(/[\s,]+/).filter(Boolean).map(function(w){return '-'+w;}).join(' ');

  var F={region:B.region||'',prov:B.prov||'',dist:B.dist||'',tipo:B.tipoObj||''};
  var res=motorBuscar(base,F);

  var cab='<div class="mcab"><span class="mn2">'+res.length+'</span> '+
    (res.length===1?'resultado':'resultados')+' en el índice'+
    ' · <span class="mfe">'+INDICE.total+' procesos · actualizado '+esc(INDICE.generado)+'</span></div>';

  if(!res.length){
    el.innerHTML=cab+'<div class="vacio"><span class="em">🔍</span>'+
      'Nada en el índice local con esos criterios.<br>'+
      'El índice tiene <b>'+INDICE.total+'</b> procesos verificados; crece con cada barrido.<br><br>'+
      'Usa <b>Buscar en la web</b> más abajo para ir a las fuentes completas.</div>';
    return;
  }
  var q=analizar(base);
  el.innerHTML=cab+res.slice(0,40).map(function(x){
    var r=x.r,d=x.d,n=d<=2?'r':(d<=9?'y':'g');
    var et=d<0?'cerrada':(d===0?'HOY':d+(d===1?' día':' días'));
    return '<div class="mr '+n+'">'+
      '<div class="mrt">'+marcar(r.titulo,q)+'</div>'+
      '<div class="mre">'+marcar(r.entidad,q)+'</div>'+
      '<div class="mrm">'+
        '<span class="mp">'+esc(r.tipo)+'</span>'+
        '<span>📍 '+esc(r.distrito+', '+r.provincia+', '+r.region)+'</span>'+
        '<span class="md '+n+'">'+esc(et)+'</span>'+
      '</div>'+
      '<div class="mrf">Cierra '+esc(r.cierra)+' · fuente: '+esc(r.fuente)+
        ' · <a href="'+esc(r.url)+'" target="_blank" rel="noopener">ver ficha →</a></div>'+
    '</div>';
  }).join('')+(res.length>40?'<div class="mmas">… y '+(res.length-40)+' más. Afina la búsqueda.</div>':'');
}

/* ── carga del índice ── */
function cargarIndice(){
  if(typeof INDICE_EMBEBIDO!=='undefined') INDICE=INDICE_EMBEBIDO;
  fetch('indice.json?v='+Date.now())
    .then(function(r){if(!r.ok)throw 0;return r.json();})
    .then(function(d){ if(d&&d.registros&&d.registros.length>=INDICE.registros.length){
      INDICE=d; if(document.getElementById('mResult')) pintarMotor(); } })
    .catch(function(){});
}
