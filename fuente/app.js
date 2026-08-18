/* ══════════════════════════════════════════════════════════════
   CHASKI · lógica de la aplicación
   ══════════════════════════════════════════════════════════════ */

var MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre'];
var DIA=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
var ESTADOS=['Pendiente','Contactada','Evaluando','Descartada','Ganada'];

function hoy0(){var d=new Date();d.setHours(0,0,0,0);return d;}
function parseF(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2]);}
function dias(s){return Math.round((parseF(s)-hoy0())/86400000);}
function fFull(s){var d=parseF(s);return DIA[d.getDay()]+' '+d.getDate()+' de '+MES[d.getMonth()];}
function fCorta(s){var d=parseF(s);return d.getDate()+' '+MES[d.getMonth()].slice(0,3)+'.';}
function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function nivel(d){return d<=2?'r':(d<=9?'y':'g');}
function score(o){var s=0;for(var k in o.encaje)s+=o.encaje[k];return s;}
function nivelScore(s){return s>=75?'alto':(s>=60?'medio':'bajo');}

/* ── memoria del dispositivo (tolerante a fallos) ── */
var MEM={};
function memLeer(){
  try{var r=localStorage.getItem('chaski.seguimiento');MEM=r?JSON.parse(r):{};}
  catch(e){MEM={};}
}
function memGuardar(){
  try{localStorage.setItem('chaski.seguimiento',JSON.stringify(MEM));}catch(e){}
}
function seg(id){
  if(!MEM[id])MEM[id]={estado:'Pendiente',accion:'',fecha:'',notas:'',fav:false};
  return MEM[id];
}
function setSeg(id,campo,valor){seg(id)[campo]=valor;memGuardar();}

var DATA={oportunidades:[],permanentes:[]}, F={urg:'todas',prov:'todas',tipo:'todos',estado:'todos'};

/* ══ vista ejecutiva ══ */
function pintarResumen(){
  var vivas=vigentes();
  var urg=vivas.filter(function(o){return dias(o.oficial.cierra)<=2;});
  var alto=vivas.filter(function(o){return score(o)>=75;});
  var favs=vivas.filter(function(o){return seg(o.id).fav;});
  var hoyStr=new Date().toISOString().slice(0,10);
  var segHoy=vivas.filter(function(o){var s=seg(o.id);return s.fecha&&s.fecha<=hoyStr;});
  var pend=vivas.filter(function(o){return seg(o.id).estado==='Pendiente';});
  var prox=vivas.length?vivas[0]:null;

  document.getElementById('resumen').innerHTML=
    '<div class="kpis">'+
      kpi(urg.length,'urgentes','r')+
      kpi(alto.length,'buen encaje','a')+
      kpi(pend.length,'sin contactar','b')+
      kpi(segHoy.length,'seguimiento hoy','v')+
    '</div>'+
    (prox?'<div class="prox"><span class="l">Próxima fecha crítica</span>'+
      '<span class="v">'+fFull(prox.oficial.cierra)+'</span>'+
      '<span class="q">'+esc(prox.titulo)+'</span></div>':'')+
    '<button class="all" onclick="verHoy()">📋 Qué debo hacer hoy<small>Lo urgente y lo pendiente de contactar</small></button>'+
    (favs.length?'<div class="minota">⭐ Tienes '+favs.length+' marcada'+(favs.length>1?'s':'')+' como favorita'+(favs.length>1?'s':'')+'.</div>':'');
}
function kpi(n,l,c){return '<div class="kpi '+c+'"><div class="n">'+n+'</div><div class="l">'+l+'</div></div>';}
function verHoy(){
  F={urg:'accion',prov:'todas',tipo:'todos',estado:'todos'};
  document.querySelectorAll('.chip[data-g="urg"]').forEach(function(c){
    c.classList.toggle('on', c.dataset.v==='accion');});
  pintar();
  document.getElementById('lista').scrollIntoView({behavior:'smooth',block:'start'});
}

function vigentes(){
  return DATA.oportunidades
    .filter(function(o){return dias(o.oficial.cierra)>=0;})
    .sort(function(a,b){return dias(a.oficial.cierra)-dias(b.oficial.cierra);});
}

/* ══ filtros ══ */
function pasa(o){
  var d=dias(o.oficial.cierra), s=seg(o.id);
  if(F.urg==='urgente'&&d>2)return false;
  if(F.urg==='semana'&&d>7)return false;
  if(F.urg==='alta'&&score(o)<75)return false;
  if(F.urg==='fav'&&!s.fav)return false;
  if(F.urg==='accion'&&!(d<=2||s.estado==='Pendiente'))return false;
  if(F.prov!=='todas'&&o.oficial.provincia!==F.prov)return false;
  if(F.tipo!=='todos'&&o.oficial.tipo!==F.tipo)return false;
  if(F.estado!=='todos'&&s.estado!==F.estado)return false;
  return true;
}

/* ══ tarjeta ══ */
function tarjeta(o){
  var d=dias(o.oficial.cierra), n=nivel(d), sc=score(o), ns=nivelScore(sc);
  var s=seg(o.id), of=o.oficial, an=o.analisis;
  var txt=d===0?'<b>HOY</b>cierra':(d===1?'<b>1</b>día':'<b>'+d+'</b>días');
  var certeza=an.certeza==='probable'
    ? '<span class="et pro">Probable</span>'
    : '<span class="et hip">Hipótesis</span>';

  return '<div class="op '+n+(s.fav?' fav':'')+'" id="c-'+o.id+'">'+
    '<div class="top">'+
      '<div class="ti">'+esc(o.titulo)+'</div>'+
      '<div class="dias '+n+'">'+txt+'</div>'+
    '</div>'+

    '<div class="fila">'+
      '<span class="sc '+ns+'" onclick="verEncaje(\''+o.id+'\')">Encaje '+sc+'/100 ▾</span>'+
      '<span class="et est '+s.estado.toLowerCase()+'">'+esc(s.estado)+'</span>'+
      '<span class="fv" onclick="toggleFav(\''+o.id+'\')">'+(s.fav?'⭐':'☆')+'</span>'+
    '</div>'+
    '<div class="desglose" id="e-'+o.id+'">'+desglose(o)+'</div>'+

    /* ── DATO OFICIAL ── */
    '<div class="blq of">'+
      '<div class="bt">✓ Dato oficial</div>'+
      linea('Entidad',of.entidad)+
      (of.unidad&&of.unidad!=='No verificada'?linea('Unidad ejecutora',of.unidad):'')+
      linea('Nomenclatura',of.nomenclatura,of.nomenclatura.indexOf('No publicada')<0?o.id:null)+
      linea('Tipo',of.tipo+' · '+of.modalidad)+
      linea('Lugar',(of.distrito&&of.distrito.indexOf('No ')<0?of.distrito+', ':'')+of.provincia+', Áncash')+
      (of.cui?linea('CUI',of.cui):'')+
      linea('Monto',of.monto?('S/ '+of.monto):'No verificado')+
      linea('Cierra',fFull(of.cierra)+(of.hora?' · '+of.hora:' · hora no verificada'))+
      '<div class="fnt">Fuente: '+esc(of.fuente)+' · verificado el '+fCorta(of.verificado)+'</div>'+
    '</div>'+

    /* ── ANÁLISIS ── */
    '<div class="blq an">'+
      '<div class="bt">💡 Análisis CHASKI '+certeza+'</div>'+
      '<div class="res">'+esc(an.resumen)+'</div>'+
      '<div class="det" id="d-'+o.id+'">'+esc(an.detalle)+'</div>'+
      '<span class="mas" onclick="verDetalle(\''+o.id+'\')">Ver análisis completo ▾</span>'+
    '</div>'+

    /* ── POR VERIFICAR ── */
    '<div class="blq pv">'+
      '<div class="bt">? Por verificar</div>'+
      '<ul>'+o.porverificar.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>'+
    '</div>'+

    /* ── ACCIONES ── */
    '<div class="acc">'+
      '<a class="bt2" href="'+esc(DATA.buscadores_oficiales.seace)+'" target="_blank" rel="noopener">🏛️ Buscar en SEACE</a>'+
      '<a class="bt2" href="'+esc(of.fuente_url)+'" target="_blank" rel="noopener">📄 Ver en '+esc(of.fuente)+'</a>'+
      '<span class="bt2" onclick="guion(\''+o.id+'\')">📞 Copiar guion</span>'+
      '<span class="bt2 sg" onclick="verSeg(\''+o.id+'\')">📝 Seguimiento</span>'+
    '</div>'+

    /* ── PANEL DE SEGUIMIENTO ── */
    '<div class="seg" id="s-'+o.id+'">'+
      '<label>Estado</label>'+
      '<select onchange="setSeg(\''+o.id+'\',\'estado\',this.value);pintar();pintarResumen();">'+
        ESTADOS.map(function(e){return '<option'+(s.estado===e?' selected':'')+'>'+e+'</option>';}).join('')+
      '</select>'+
      '<label>Próxima acción</label>'+
      '<input type="text" value="'+esc(s.accion)+'" placeholder="Ej.: llamar a logística y pedir el expediente" '+
        'onchange="setSeg(\''+o.id+'\',\'accion\',this.value)">'+
      '<label>Fecha de seguimiento</label>'+
      '<input type="date" value="'+esc(s.fecha)+'" onchange="setSeg(\''+o.id+'\',\'fecha\',this.value);pintarResumen();">'+
      '<label>Notas</label>'+
      '<textarea rows="3" placeholder="Con quién hablaste, qué te dijeron..." '+
        'onchange="setSeg(\''+o.id+'\',\'notas\',this.value)">'+esc(s.notas)+'</textarea>'+
      (s.accion?'<div class="rec">📌 '+esc(s.accion)+(s.fecha?' · para el '+fCorta(s.fecha):'')+'</div>':'')+
    '</div>'+
  '</div>';
}

function linea(k,v,copiaId){
  return '<div class="ln"><span class="k">'+esc(k)+'</span><span class="v">'+esc(v)+
    (copiaId?' <span class="cp" onclick="copiar(\''+copiaId+'\')">copiar</span>':'')+'</span></div>';
}

function desglose(o){
  var M=DATA.metodo_encaje;
  if(!M)return '';
  return M.factores.map(function(f){
    var val=o.encaje[f.k]||0, pct=Math.round(val/f.max*100);
    return '<div class="fa"><span class="fn">'+esc(f.n)+'</span>'+
      '<span class="bar"><i style="width:'+pct+'%"></i></span>'+
      '<span class="fv2">'+val+'/'+f.max+'</span></div>';
  }).join('')+'<div class="nota2">'+esc(M.descripcion)+'</div>';
}

/* ══ interacciones ══ */
function verEncaje(id){var e=document.getElementById('e-'+id);e.classList.toggle('on');}
function verDetalle(id){var e=document.getElementById('d-'+id);e.classList.toggle('on');
  e.nextElementSibling.textContent=e.classList.contains('on')?'Ocultar análisis ▴':'Ver análisis completo ▾';}
function verSeg(id){document.getElementById('s-'+id).classList.toggle('on');}
function toggleFav(id){setSeg(id,'fav',!seg(id).fav);pintar();pintarResumen();}

function copiar(id){
  var o=DATA.oportunidades.filter(function(x){return x.id===id;})[0];
  if(!o)return;
  texto(o.oficial.nomenclatura,'Nomenclatura copiada. Pégala en el buscador del SEACE.');
}
function guion(id){
  var o=DATA.oportunidades.filter(function(x){return x.id===id;})[0];
  if(!o)return;
  var g='Buenos días, le habla el Ingeniero Rafael Zeña, de RyC Contratistas Generales, de Huaraz. '+
    'Somos especialistas en instalaciones eléctricas, pozos a tierra y energía solar, con experiencia acreditada en entidades públicas de Áncash.\n\n'+
    'Lo llamo por el proceso "'+o.titulo+'"'+
    (o.oficial.nomenclatura.indexOf('No publicada')<0?' ('+o.oficial.nomenclatura+')':'')+
    ' de '+o.oficial.entidad+'.\n\n'+
    'Quisiera consultarle dos cosas:\n'+
    '1) Si el expediente técnico contempla partidas eléctricas, y de ser así, cuáles.\n'+
    '2) Quiénes se han registrado como participantes, para poder coordinar con ellos.\n\n'+
    'Podemos ejecutar esa parte del trabajo o acompañar al postor que resulte ganador. ¿Con quién debería coordinar?';
  texto(g,'Guion copiado. Pégalo donde lo necesites.');
}
function texto(t,msg){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){aviso(msg);},function(){fallback(t,msg);});
  } else fallback(t,msg);
}
function fallback(t,msg){
  var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity=0;
  document.body.appendChild(a);a.select();
  try{document.execCommand('copy');aviso(msg);}catch(e){aviso('No pude copiar. Selecciónalo a mano.');}
  document.body.removeChild(a);
}
function aviso(m){
  var t=document.getElementById('toast');
  t.textContent=m;t.classList.add('on');
  clearTimeout(window._tt);window._tt=setTimeout(function(){t.classList.remove('on');},2600);
}

/* ══ pintar lista ══ */
function pintar(){
  var vivas=vigentes(), f=vivas.filter(pasa);
  var urg=vivas.filter(function(o){return dias(o.oficial.cierra)<=2;}).length;
  var b=document.getElementById('bdg');
  if(urg>0){b.textContent=urg;b.style.display='flex';b.title=urg+' cierran en 2 días o menos';}
  else b.style.display='none';

  document.getElementById('cuenta').textContent=
    f.length+' de '+vivas.length+' oportunidad'+(vivas.length===1?'':'es')+' vigente'+(vivas.length===1?'':'s');

  var el=document.getElementById('lista');
  el.innerHTML=f.length?f.map(tarjeta).join('')
    :'<div class="vacio"><span class="em">🌄</span>Nada con estos filtros.<br>Prueba quitando alguno.</div>';
}

/* ══ desiertos ══ */
function pintarDes(){
  var D=DATA.desiertos; if(!D)return;
  document.getElementById('dPorque').textContent=D.porque_importa||'';
  document.getElementById('dDespues').textContent=D.que_pasa_despues||'';
  document.getElementById('dJugada').textContent=D.jugada||'';
  document.getElementById('dCand').innerHTML=(D.candidatas||[]).map(function(c){
    var dd=dias(c.cerro);
    var et=dd===0?'cerró hoy':(dd<0?'cerró hace '+Math.abs(dd)+(Math.abs(dd)===1?' día':' días'):'cierra en '+dd+' d');
    return '<div class="op y"><div class="top"><div class="ti">'+esc(c.titulo)+'</div>'+
      '<div class="dias y peq">'+esc(et)+'</div></div>'+
      '<div class="sub">'+esc(c.entidad)+' · 📍 '+esc(c.lugar)+'</div>'+
      '<div class="blq an"><div class="bt">💡 Por qué vigilarla <span class="et hip">Hipótesis</span></div>'+
      '<div class="res">'+esc(c.senal)+'</div></div>'+
      '<div class="acc"><a class="bt2" href="'+esc(c.url)+'" target="_blank" rel="noopener">Ver el proceso →</a></div></div>';
  }).join('')||'<div class="vacio">Sin candidatas registradas.</div>';
  document.getElementById('dFuentes').innerHTML=(D.donde_cazarlos||[]).map(function(f){
    return '<div class="pm"><span class="ti">'+esc(f.nombre)+'</span><div class="pq">'+esc(f.detalle)+'</div>'+
      '<a class="ver" href="'+esc(f.url)+'" target="_blank" rel="noopener">Abrir →</a></div>';
  }).join('');
}

/* ══ jugadas ══ */
function pintarPerms(){
  document.getElementById('perms').innerHTML=DATA.permanentes
    .slice().sort(function(a,b){return a.prioridad-b.prioridad;})
    .map(function(p,i){
      return '<div class="pm'+(i===0?' top1':'')+'"><span class="nu">'+p.prioridad+'</span>'+
        '<span class="ti">'+esc(p.titulo)+'</span><div class="ent">'+esc(p.entidad)+'</div>'+
        '<div class="pq">'+esc(p.porque)+'</div>'+
        '<a class="ver" href="'+esc(p.url)+'" target="_blank" rel="noopener">Abrir el portal →</a></div>';
    }).join('');
}

/* ══ fuentes citadas ══ */
function pintarFuentes(){
  var el=document.getElementById('fuentes'); if(!el||!DATA.fuentes_citadas)return;
  el.innerHTML=DATA.fuentes_citadas.map(function(f){
    return '<div class="pm"><div class="pq">«'+esc(f.afirmacion)+'»</div>'+
      '<div class="ent">'+esc(f.fuente)+'</div>'+
      '<a class="ver" href="'+esc(f.url)+'" target="_blank" rel="noopener">Ver la fuente →</a></div>';
  }).join('');
}

/* ══ filtros dinámicos ══ */
function montarFiltros(){
  var provs=[],tipos=[];
  DATA.oportunidades.forEach(function(o){
    if(provs.indexOf(o.oficial.provincia)<0)provs.push(o.oficial.provincia);
    if(tipos.indexOf(o.oficial.tipo)<0)tipos.push(o.oficial.tipo);
  });
  sel('fProv',['todas'].concat(provs.sort()),'Provincia');
  sel('fTipo',['todos'].concat(tipos.sort()),'Tipo');
  sel('fEstado',['todos'].concat(ESTADOS),'Estado comercial');
}
function sel(id,vals,lbl){
  var e=document.getElementById(id); if(!e)return;
  e.innerHTML=vals.map(function(v){
    return '<option value="'+esc(v)+'">'+(v==='todas'||v==='todos'?lbl+': '+v:esc(v))+'</option>';}).join('');
}

/* ══ exportar / importar seguimiento ══ */
function exportarSeg(){
  var blob=new Blob([JSON.stringify(MEM,null,2)],{type:'application/json'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='chaski-seguimiento.json';a.click();
  aviso('Seguimiento exportado.');
}
function importarSeg(inp){
  var f=inp.files[0]; if(!f)return;
  var r=new FileReader();
  r.onload=function(){try{MEM=JSON.parse(r.result);memGuardar();pintar();pintarResumen();aviso('Seguimiento importado.');}
    catch(e){aviso('El archivo no es válido.');}};
  r.readAsText(f);
}

/* ══ arranque ══ */
function aplicar(d,origen){
  DATA=d;
  var f=parseF(d.actualizado);
  document.getElementById('sb').innerHTML=
    'Actualizado el '+f.getDate()+' de '+MES[f.getMonth()]+(d.hora?', '+d.hora:'')+
    ' · <span class="ver2">verificado uno por uno</span>';
  montarFiltros();
  pintarResumen(); pintar(); pintarPerms(); pintarDes(); pintarFuentes();
  var av=document.getElementById('avisoLocal');
  if(av)av.style.display=(origen==='archivo')?'block':'none';
}

memLeer();
aplicar(DATOS_EMBEBIDOS,'archivo');

fetch('oportunidades.json?v='+Date.now())
  .then(function(r){if(!r.ok)throw 0;return r.json();})
  .then(function(d){if(d&&d.actualizado&&d.actualizado>=DATOS_EMBEBIDOS.actualizado)aplicar(d,'web');})
  .catch(function(){});

/* filtros */
document.querySelectorAll('.chip').forEach(function(c){
  c.addEventListener('click',function(){
    document.querySelectorAll('.chip[data-g="urg"]').forEach(function(x){x.classList.remove('on');});
    c.classList.add('on');F.urg=c.dataset.v;pintar();
  });
});
['fProv','fTipo','fEstado'].forEach(function(id){
  var e=document.getElementById(id); if(!e)return;
  e.addEventListener('change',function(){
    F[id==='fProv'?'prov':id==='fTipo'?'tipo':'estado']=e.value;pintar();
  });
});

/* pestañas */
document.querySelectorAll('nav button').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('nav button').forEach(function(x){x.classList.remove('on');});
    document.querySelectorAll('.pane').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on');
    document.getElementById(b.dataset.p).classList.add('on');
    window.scrollTo(0,0);
  });
});

/* fuentes en vivo */
var FUENTES=[
 'https://www.perucontrata.com.pe/licitaciones-peru/ancash/',
 'https://licitacionesperu.pe/contrataciones-menores/?status=Vigente&year=2026',
 'https://www.perulicitaciones.com/departamento/ancash.html',
 'https://www.perucontrata.com.pe/boletin-licitaciones/',
 'https://prod6.seace.gob.pe/auth-proveedor/',
 'https://prod2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml'];
function abrirTodas(){for(var i=0;i<FUENTES.length;i++){window.open(FUENTES[i],'_blank','noopener');}}

/* instalación */
var deferred=null,btn=document.getElementById('inst');
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;btn.style.display='block';});
if(btn)btn.addEventListener('click',function(){
  if(!deferred)return;deferred.prompt();
  deferred.userChoice.then(function(){deferred=null;btn.style.display='none';});
});
window.addEventListener('appinstalled',function(){
  if(btn)btn.style.display='none';
  var a=document.getElementById('ayudaInst');if(a)a.style.display='none';
});
if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone){
  var a0=document.getElementById('ayudaInst');if(a0)a0.style.display='none';
}

if('serviceWorker' in navigator){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});
}
