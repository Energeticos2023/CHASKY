/* ══════════════════════════════════════════════════════════════
   CHASKI · MOTOR DE BÚSQUEDA
   Región → Provincia → Distrito · 1 874 distritos del Perú
   Sector público y privado · Cualquier rubro
   ══════════════════════════════════════════════════════════════ */

var RUBROS=[
 {g:"Construcción",n:"Obras civiles",q:'"ejecución de obra" OR "obras civiles" OR construcción'},
 {g:"Construcción",n:"Saneamiento",q:'"agua potable" OR alcantarillado OR desagüe OR saneamiento'},
 {g:"Construcción",n:"Carreteras y vías",q:'carretera OR pavimentación OR "trocha carrozable" OR asfaltado'},
 {g:"Construcción",n:"Edificaciones",q:'edificación OR "local escolar" OR "centro de salud" OR "losa deportiva"'},
 {g:"Construcción",n:"Defensa ribereña",q:'"defensa ribereña" OR "protección de riberas" OR gaviones OR encauzamiento'},
 {g:"Construcción",n:"Movimiento de tierras",q:'"movimiento de tierras" OR excavación OR demolición OR "eliminación de desmonte"'},

 {g:"Energía",n:"Instalaciones eléctricas",q:'"instalaciones eléctricas" OR "instalación eléctrica" OR electrificación'},
 {g:"Energía",n:"Pozo a tierra",q:'"pozo a tierra" OR "puesta a tierra" OR "sistema de puesta a tierra"'},
 {g:"Energía",n:"Paneles solares",q:'"panel solar" OR "paneles solares" OR fotovoltaico OR "energía solar"'},
 {g:"Energía",n:"Termas solares",q:'"terma solar" OR "termas solares" OR "calentador solar"'},
 {g:"Energía",n:"Redes y alumbrado",q:'"redes eléctricas" OR "alumbrado público" OR "media tensión" OR luminaria'},
 {g:"Energía",n:"Subestaciones",q:'subestación OR transformador OR "celda de media tensión"'},
 {g:"Energía",n:"Grupos electrógenos",q:'"grupo electrógeno" OR generador OR "planta eléctrica"'},

 {g:"Mecánica",n:"Mantenimiento industrial",q:'"mantenimiento industrial" OR "mantenimiento preventivo" OR "mantenimiento correctivo"'},
 {g:"Mecánica",n:"Metalmecánica",q:'metalmecánica OR soldadura OR "estructura metálica" OR "fabricación metálica"'},
 {g:"Mecánica",n:"Maquinaria pesada",q:'"maquinaria pesada" OR "alquiler de maquinaria" OR excavadora OR "cargador frontal"'},
 {g:"Mecánica",n:"Aire acondicionado",q:'"aire acondicionado" OR climatización OR ventilación OR refrigeración'},
 {g:"Mecánica",n:"Bombas y motores",q:'electrobomba OR "bomba sumergible" OR motor OR "estación de bombeo"'},
 {g:"Mecánica",n:"Ascensores",q:'ascensor OR montacargas OR elevador'},

 {g:"Seguridad",n:"Contra incendios",q:'"sistema contra incendio" OR extintor OR "detección de humo" OR rociadores'},
 {g:"Seguridad",n:"Vigilancia",q:'"servicio de vigilancia" OR seguridad OR resguardo OR "agente de seguridad"'},
 {g:"Seguridad",n:"Cámaras y CCTV",q:'CCTV OR "cámaras de seguridad" OR videovigilancia OR "central de monitoreo"'},
 {g:"Seguridad",n:"EPP y señalización",q:'"equipos de protección personal" OR EPP OR señalización OR señalética'},

 {g:"Servicios",n:"Limpieza",q:'"servicio de limpieza" OR "limpieza pública" OR conserjería'},
 {g:"Servicios",n:"Alimentación",q:'"servicio de alimentación" OR catering OR "raciones alimenticias" OR desayuno'},
 {g:"Servicios",n:"Residuos sólidos",q:'"residuos sólidos" OR "recojo de basura" OR "disposición final"'},
 {g:"Servicios",n:"Jardinería y fumigación",q:'jardinería OR "áreas verdes" OR fumigación OR desratización'},
 {g:"Servicios",n:"Lavandería",q:'lavandería OR "lavado de ropa" OR "servicio de lavado"'},

 {g:"Transporte",n:"Transporte de personal",q:'"transporte de personal" OR "servicio de transporte" OR movilidad'},
 {g:"Transporte",n:"Transporte de carga",q:'"transporte de carga" OR flete OR "distribución de material"'},
 {g:"Transporte",n:"Alquiler de vehículos",q:'"alquiler de vehículo" OR "alquiler de camioneta" OR "arrendamiento de vehículos"'},
 {g:"Transporte",n:"Combustible",q:'combustible OR "vales de combustible" OR petróleo OR gasolina OR diésel'},

 {g:"Tecnología",n:"Equipos de cómputo",q:'"equipos de cómputo" OR computadora OR laptop OR servidor OR impresora'},
 {g:"Tecnología",n:"Software y sistemas",q:'software OR "sistema informático" OR licencia OR "desarrollo de sistema"'},
 {g:"Tecnología",n:"Cableado y redes",q:'"cableado estructurado" OR "red de datos" OR "fibra óptica" OR switch'},
 {g:"Tecnología",n:"Telecomunicaciones",q:'telecomunicaciones OR internet OR "servicio de datos" OR telefonía'},

 {g:"Salud",n:"Equipos médicos",q:'"equipo médico" OR "equipamiento biomédico" OR "material médico"'},
 {g:"Salud",n:"Medicamentos",q:'medicamento OR "productos farmacéuticos" OR "insumo médico"'},
 {g:"Salud",n:"Laboratorio",q:'"insumos de laboratorio" OR reactivo OR "material de laboratorio"'},

 {g:"Consultoría",n:"Supervisión de obra",q:'"supervisión de obra" OR "supervisor de obra" OR "inspector de obra"'},
 {g:"Consultoría",n:"Expedientes técnicos",q:'"expediente técnico" OR "elaboración de expediente" OR "estudio definitivo"'},
 {g:"Consultoría",n:"Estudios y proyectos",q:'"estudio de preinversión" OR "ficha técnica" OR "estudio de impacto"'},
 {g:"Consultoría",n:"Capacitación",q:'capacitación OR "servicio de capacitación" OR taller OR "curso de"'},
 {g:"Consultoría",n:"Contable y legal",q:'"servicio contable" OR auditoría OR "asesoría legal" OR "patrocinio legal"'},

 {g:"Suministros",n:"Ferretería",q:'ferretería OR "materiales de construcción" OR cemento OR fierro'},
 {g:"Suministros",n:"Mobiliario",q:'mobiliario OR escritorio OR "carpeta escolar" OR estante'},
 {g:"Suministros",n:"Útiles de oficina",q:'"útiles de oficina" OR "material de escritorio" OR papelería OR tóner'},
 {g:"Suministros",n:"Imprenta",q:'"servicio de impresión" OR imprenta OR "material impreso" OR banner'},
 {g:"Suministros",n:"Uniformes y calzado",q:'uniforme OR "ropa de trabajo" OR calzado OR "prendas de vestir"'},
 {g:"Suministros",n:"Víveres",q:'víveres OR "productos alimenticios" OR abarrotes'},

 {g:"Agro",n:"Insumos agrícolas",q:'"insumos agrícolas" OR fertilizante OR semilla OR abono'},
 {g:"Agro",n:"Riego tecnificado",q:'"riego tecnificado" OR "sistema de riego" OR aspersión OR goteo'},
 {g:"Agro",n:"Pecuario",q:'pecuario OR ganado OR "sanidad animal" OR "alimento balanceado"'},

 {g:"Otros",n:"Carpintería y vidrio",q:'carpintería OR "trabajos en madera" OR vidriería OR mampara'},
 {g:"Otros",n:"Pintura",q:'"trabajos de pintura" OR pintado OR "pintura látex" OR esmalte'},
 {g:"Otros",n:"Gasfitería",q:'gasfitería OR "instalaciones sanitarias" OR tubería OR grifería'},
 {g:"Otros",n:"Publicidad y eventos",q:'publicidad OR "organización de evento" OR difusión OR "spot publicitario"'}
];

var VENTANAS=[{k:'d',n:'24 horas'},{k:'w',n:'Semana'},{k:'m',n:'Mes'},{k:'y',n:'Año'},{k:'',n:'Sin límite'}];

/* ── estado ── */
var B={rubro:null,tipoObj:'',region:'Áncash',prov:'',dist:'',ambito:'publico',ventana:'m',excluir:'',exacta:false};

function g(q,v){
  var u='https://www.google.com/search?q='+encodeURIComponent(q);
  if(v) u+='&tbs=qdr:'+v;
  return u;
}

/* ── fuentes ── */
var FUENTES_PUB=[
 {n:"SEACE · Buscador Público",d:"Oficial. Te copio la búsqueda para pegarla",i:"🏛️",top:true,manual:true,
  u:function(){return 'https://prod2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml';}},
 {n:"Contrataciones Abiertas",d:"Portal oficial de datos abiertos del OECE",i:"📊",manual:true,
  u:function(){return 'https://contratacionesabiertas.oece.gob.pe/';}},
 {n:"Menores a 8 UIT",d:"Órdenes de servicio y compra directa",i:"💰",top:true,
  u:function(q,z,v){return 'https://licitacionesperu.pe/contrataciones-menores/?search='+
    encodeURIComponent(q)+'&status=Vigente&sort=published_at+DESC';}},
 {n:"Convocatorias vigentes",d:"Procedimientos en etapa de convocatoria",i:"📋",top:true,
  u:function(q,z,v){return 'https://licitacionesperu.pe/licitaciones/?search='+
    encodeURIComponent(q)+'&phase=Convocatoria&sort=published_at+DESC';}},
 {n:"Procesos desiertos",d:"Los que nadie ganó y se vuelven a convocar",i:"🏜️",
  u:function(q,z,v){return 'https://licitacionesperu.pe/licitaciones/?search='+
    encodeURIComponent(q)+'&phase=Desierto&sort=published_at+DESC';}},
 {n:"TodoLicitaciones",d:"Buscador alterno de convocatorias",i:"🔎",
  u:function(q,z,v){return g('site:todolicitaciones.pe '+q+' '+z,v);}},
 {n:"PerúLicitaciones",d:"Con nomenclatura y fecha límite",i:"📄",
  u:function(q,z,v){return g('site:perulicitaciones.com '+q+' '+z,v);}},
 {n:"PerúContrata",d:"Boletín diario de convocatorias",i:"📰",
  u:function(q,z,v){return g('site:perucontrata.com.pe '+q+' '+z,v);}},
 {n:"Órdenes de servicio",d:"Transparencia de cada entidad",i:"🧾",top:true,
  u:function(q,z,v){return g('(site:transparencia.gob.pe OR site:gob.pe) ("orden de servicio" OR "menores a 8 UIT" OR cotización) '+q+' '+z,v);}},
 {n:"Municipalidad del distrito",d:"El portal propio de la municipalidad",i:"🏛️",
  u:function(q,z,v){return g('municipalidad '+z+' (convocatoria OR contrataciones OR "orden de servicio" OR requerimiento) '+q,v);}},
 {n:"Convocatorias del Estado",d:"Ministerios, programas y proyectos",i:"🏢",
  u:function(q,z,v){return g('site:gob.pe (convocatoria OR contratación OR requerimiento) '+q+' '+z,v);}},
 {n:"PERÚ COMPRAS",d:"Catálogos electrónicos de Acuerdo Marco",i:"🛒",
  u:function(q,z,v){return g('(site:perucompras.gob.pe OR "acuerdo marco") "catálogo electrónico" '+q,v);}},
 {n:"Búsqueda abierta",d:"Todo lo publicado en la ventana elegida",i:"🌐",
  u:function(q,z,v){return g('(convocatoria OR licitación OR "términos de referencia" OR requerimiento) '+q+' '+z,v);}}
];

var FUENTES_PRIV=[
 {n:"Pedidos de cotización",d:"Empresas buscando proveedor ahora",i:"💬",top:true,
  u:function(q,z,v){return g('("solicito cotización" OR "requiero proveedor" OR "busco proveedor" OR "necesito servicio de" OR "se necesita") '+q+' '+z,v);}},
 {n:"Facebook",d:"Grupos y páginas del distrito",i:"📱",top:true,
  u:function(q,z,v){return g('site:facebook.com '+q+' (necesito OR busco OR requiero OR cotizar OR contrato) '+z,v);}},
 {n:"Empresas de la zona",d:"Quién opera y compra en ese distrito",i:"🏭",top:true,
  u:function(q,z,v){return g('(empresa OR compañía OR "S.A.C" OR "E.I.R.L") '+z+' '+q,v);}},
 {n:"LinkedIn",d:"Proyectos, compras y contactos",i:"💼",
  u:function(q,z,v){return g('site:linkedin.com '+q+' (proveedor OR contratista OR "jefe de compras" OR licitación) '+z,v);}},
 {n:"Portales de proveedores",d:"Grandes empresas con registro abierto",i:"🚪",top:true,
  u:function(q,z,v){return g('("portal de proveedores" OR "registro de proveedores" OR "sé nuestro proveedor") '+q+' '+z,v);}},
 {n:"Minería y energía",d:"Mineras, hidroeléctricas, concesionarias",i:"⛏️",
  u:function(q,z,v){return g('(minera OR "unidad minera" OR hidroeléctrica OR concesionaria) (proveedor OR contratista OR licitación OR homologación) '+q+' '+z,v);}},
 {n:"Constructoras",d:"El que gana la obra subcontrata tu parte",i:"🏗️",
  u:function(q,z,v){return g('(constructora OR contratista OR "empresa constructora") (subcontrato OR proveedor OR busca) '+q+' '+z,v);}},
 {n:"Obras en marcha",d:"Proyectos que van a necesitar servicios",i:"🚧",
  u:function(q,z,v){return g('("nuevo proyecto" OR "inicio de obra" OR "en construcción" OR inauguración OR ampliación) '+q+' '+z,v);}},
 {n:"Hoteles y comercios",d:"Negocios nuevos que equipan y mantienen",i:"🏨",
  u:function(q,z,v){return g('(hotel OR hospedaje OR restaurante OR clínica OR colegio OR grifo) '+z+' (nuevo OR apertura OR remodelación OR requiere) '+q,v);}},
 {n:"Bolsas de trabajo",d:"Muchos servicios salen como empleo",i:"👷",
  u:function(q,z,v){return g('(site:computrabajo.com.pe OR site:bumeran.com.pe OR site:indeed.com.pe) '+q+' '+z,v);}},
 {n:"Marketplace de compras",d:"Oportunidades públicas y privadas",i:"🛍️",
  u:function(q,z,v){return g('site:linkcontrata.lat '+q+' '+z,v);}},
 {n:"ONG y cooperación",d:"Términos de referencia y consultorías",i:"🤝",
  u:function(q,z,v){return g('("términos de referencia" OR "convocatoria a consultoría" OR TDR) (ONG OR cooperación OR proyecto) '+q+' '+z,v);}},
 {n:"Gremios y cámaras",d:"Cámara de comercio, CAPECO, SNI",i:"🏛️",
  u:function(q,z,v){return g('("cámara de comercio" OR CAPECO OR "Sociedad Nacional de Industrias") (convocatoria OR proveedor OR oportunidad) '+q+' '+z,v);}},
 {n:"Homologación",d:"Requisito para entrar a grandes empresas",i:"✅",
  u:function(q,z,v){return g('"homologación de proveedores" '+q+' Perú requisitos','');}}
];

/* ══ construcción de la consulta ══ */
function consulta(){
  var libre=((document.getElementById('bTexto')||{}).value||'').trim();
  var base='';
  if(libre) base=B.exacta?('"'+libre.replace(/"/g,'')+'"'):libre;
  else if(B.rubro!==null) base=RUBROS[B.rubro].q;
  if(!base) return '';
  var ex=(B.excluir||'').trim();
  if(ex) base+=' '+ex.split(/[\s,]+/).filter(Boolean).map(function(w){return '-'+w;}).join(' ');
  return base;
}

/* zona: lo más específico primero, con el padre como contexto */
function zona(){
  if(B.dist)  return '"'+B.dist+'" ("'+B.prov+'" OR "'+B.region+'")';
  if(B.prov)  return '"'+B.prov+'" "'+B.region+'"';
  if(B.region)return '"'+B.region+'"';
  return '';
}
function zonaCorta(){
  if(B.dist)  return B.dist+', '+B.prov+', '+B.region;
  if(B.prov)  return B.prov+', '+B.region;
  return B.region||'Todo el Perú';
}
/* texto para pegar en el SEACE: sin operadores */
function consultaPlana(){
  var libre=((document.getElementById('bTexto')||{}).value||'').trim();
  if(libre) return libre;
  if(B.rubro!==null) return RUBROS[B.rubro].n;
  return '';
}

/* ══ selectores en cascada ══ */
function setRegion(v){B.region=v;B.prov='';B.dist='';pintarBuscador();}
function setProv(v){B.prov=v;B.dist='';pintarBuscador();}
function setDist(v){B.dist=v;pintarBuscador();}
function setAmbito(a){B.ambito=a;pintarBuscador();}
function setVentana(v){B.ventana=v;pintarBuscador();}
function pickRubro(i){B.rubro=(B.rubro===i)?null:i;pintarBuscador();}
function toggleExacta(){B.exacta=!B.exacta;pintarBuscador();}

function opciones(lista,sel,ph){
  return '<option value="">'+ph+'</option>'+lista.map(function(x){
    return '<option value="'+esc(x)+'"'+(x===sel?' selected':'')+'>'+esc(x)+'</option>';}).join('');
}

/* ══ búsquedas guardadas ══ */
var GUARDADAS=[];
function cargarGuardadas(){
  try{GUARDADAS=JSON.parse(localStorage.getItem('chaski.busquedas')||'[]');}catch(e){GUARDADAS=[];}
}
function guardarBusqueda(){
  var n=consultaPlana(); if(!n){aviso('Primero define una búsqueda.');return;}
  GUARDADAS.unshift({n:n,z:zonaCorta(),r:B.region,p:B.prov,d:B.dist,a:B.ambito,ru:B.rubro,
    t:((document.getElementById('bTexto')||{}).value||''),v:B.ventana,x:B.excluir,e:B.exacta});
  GUARDADAS=GUARDADAS.slice(0,12);
  try{localStorage.setItem('chaski.busquedas',JSON.stringify(GUARDADAS));}catch(e){}
  aviso('Búsqueda guardada.');
  pintarBuscador();
}
function usarGuardada(i){
  var s=GUARDADAS[i]; if(!s)return;
  B.region=s.r;B.prov=s.p;B.dist=s.d;B.ambito=s.a;B.rubro=s.ru;B.ventana=s.v||'m';
  B.excluir=s.x||'';B.exacta=!!s.e;
  pintarBuscador();
  var i2=document.getElementById('bTexto'); if(i2){i2.value=s.t||'';}
  pintarResultados();
}
function borrarGuardada(i,ev){
  if(ev&&ev.stopPropagation)ev.stopPropagation();
  GUARDADAS.splice(i,1);
  try{localStorage.setItem('chaski.busquedas',JSON.stringify(GUARDADAS));}catch(e){}
  pintarBuscador();
}

/* ══ ejecutar ══ */
function buscar(){
  if(!consulta()){aviso('Escribe algo o elige un rubro.');return;}
  pintarMotor(); pintarResultados();
  var r=document.getElementById('bResult');
  if(r&&r.scrollIntoView)r.scrollIntoView({behavior:'smooth',block:'start'});
}
function fuentesActivas(){
  var l=[];
  if(B.ambito==='publico'||B.ambito==='ambos') l=l.concat(FUENTES_PUB);
  if(B.ambito==='privado'||B.ambito==='ambos') l=l.concat(FUENTES_PRIV);
  return l;
}
function abrirTop(){
  var q=consulta(),z=zona(),v=B.ventana;
  fuentesActivas().filter(function(f){return f.top;}).slice(0,4).forEach(function(f){
    window.open(f.manual?f.u():f.u(q,z,v),'_blank','noopener');});
}
function copiarBusqueda(){
  texto(consultaPlana(),'Copiado. Pégalo en «Descripción del Objeto» y elige el departamento.');
}

function pintarResultados(){
  var el=document.getElementById('bResult'); if(!el)return;
  var q=consulta(); if(!q){el.innerHTML='';return;}
  var z=zona(),v=B.ventana,lista=fuentesActivas();
  var vn=VENTANAS.filter(function(x){return x.k===v;})[0];

  el.innerHTML=
   '<div class="rescab">'+
     '<div class="rq">'+esc(consultaPlana())+'</div>'+
     '<div class="rz">📍 '+esc(zonaCorta())+'</div>'+
     '<div class="rz">'+(B.ambito==='publico'?'🏛️ Entidades públicas':B.ambito==='privado'?'🏢 Empresas privadas':'🌐 Público y privado')+
       ' · 🕐 '+esc(vn?vn.n:'')+' · '+lista.length+' fuentes</div>'+
     '<div class="racc">'+
       '<button class="all" onclick="abrirTop()">🚀 Abrir las mejores fuentes</button>'+
       '<button class="bt2" onclick="guardarBusqueda()">⭐ Guardar búsqueda</button>'+
     '</div>'+
   '</div>'+
   '<div class="g2">'+lista.map(function(f){
      var href=f.manual?f.u():f.u(q,z,v);
      return '<a class="t'+(f.top?' hi':'')+'" target="_blank" rel="noopener" href="'+esc(href)+'"'+
        (f.manual?' onclick="copiarBusqueda()"':'')+'>'+
        '<span class="e">'+f.i+'</span><span class="n">'+esc(f.n)+'</span>'+
        '<span class="d">'+esc(f.d)+'</span>'+
        (f.manual?'<span class="mn">se copia solo</span>':'')+'</a>';
   }).join('')+'</div>';
}

/* ══ pintar panel ══ */
function chipsRubros(){
  var gr=[],v={};
  RUBROS.forEach(function(r){if(!v[r.g]){v[r.g]=1;gr.push(r.g);}});
  return gr.map(function(G){
    return '<div class="rgrupo"><div class="rgt">'+esc(G)+'</div><div class="rgc">'+
      RUBROS.map(function(r,i){return r.g===G?
        '<span class="rb'+(B.rubro===i?' on':'')+'" onclick="pickRubro('+i+')">'+esc(r.n)+'</span>':'';}).join('')+
      '</div></div>';
  }).join('');
}

function pintarBuscador(){
  var el=document.getElementById('bPanel'); if(!el)return;
  var txt=((document.getElementById('bTexto')||{}).value)||'';
  var regs=Object.keys(UBIGEO);
  var provs=B.region&&UBIGEO[B.region]?Object.keys(UBIGEO[B.region]):[];
  var dists=(B.region&&B.prov&&UBIGEO[B.region]&&UBIGEO[B.region][B.prov])?UBIGEO[B.region][B.prov]:[];

  el.innerHTML=
   /* ámbito */
   '<div class="ambito">'+
     '<button class="amb'+(B.ambito==='publico'?' on':'')+'" onclick="setAmbito(\'publico\')">'+
       '<span class="ai">🏛️</span><span class="an">Sector público</span>'+
       '<span class="ad">Estado y municipios</span></button>'+
     '<button class="amb'+(B.ambito==='privado'?' on':'')+'" onclick="setAmbito(\'privado\')">'+
       '<span class="ai">🏢</span><span class="an">Sector privado</span>'+
       '<span class="ad">Empresas y negocios</span></button>'+
     '<button class="amb ancho'+(B.ambito==='ambos'?' on':'')+'" onclick="setAmbito(\'ambos\')">'+
       '<span class="an">🌐 Los dos a la vez</span></button>'+
   '</div>'+

   /* geografía en cascada */
   '<div class="geo">'+
     '<div class="geot">📍 Dónde buscar</div>'+
     '<div class="geor">'+
       '<div class="gc"><label>Región</label><select onchange="setRegion(this.value)">'+
         opciones(regs,B.region,'Todo el Perú')+'</select></div>'+
       '<div class="gc"><label>Provincia</label><select onchange="setProv(this.value)"'+
         (provs.length?'':' disabled')+'>'+opciones(provs,B.prov,provs.length?'Toda la región':'—')+'</select></div>'+
       '<div class="gc"><label>Tipo</label><select onchange="B.tipoObj=this.value;pintarMotor()">'+
         opciones(['Obra','Servicio','Bien','Consultoría'],B.tipoObj||'','Todos')+'</select></div>'+
       '<div class="gc"><label>Distrito</label><select onchange="setDist(this.value)"'+
         (dists.length?'':' disabled')+'>'+opciones(dists,B.dist,dists.length?'Toda la provincia':'—')+'</select></div>'+
     '</div>'+
     '<div class="georuta">'+esc(zonaCorta())+
       (dists.length?' · <b>'+dists.length+'</b> distritos disponibles':
        provs.length?' · <b>'+provs.length+'</b> provincias':'')+'</div>'+
   '</div>'+

   /* caja de búsqueda */
   '<div class="bcaja">'+
     '<input type="text" id="bTexto" value="'+esc(txt)+'" '+
       'placeholder="¿Qué buscas? Ej.: carpintería, catering, pozo a tierra..." '+
       'onkeydown="if(event.key===\'Enter\')buscar()">'+
     '<button class="bir" onclick="buscar()">🔍 Buscar</button>'+
   '</div>'+

   /* opciones avanzadas */
   '<div class="avz">'+
     '<div class="avl">Publicado en:</div>'+
     '<div class="avc">'+VENTANAS.map(function(v){
        return '<span class="vt'+(B.ventana===v.k?' on':'')+'" onclick="setVentana(\''+v.k+'\')">'+v.n+'</span>';}).join('')+'</div>'+
     '<div class="avr">'+
       '<label class="chk" onclick="toggleExacta()"><span class="bx'+(B.exacta?' on':'')+'">'+(B.exacta?'✓':'')+'</span>Frase exacta</label>'+
       '<input class="exc" type="text" value="'+esc(B.excluir)+'" placeholder="Excluir palabras: lima arequipa" '+
         'onchange="B.excluir=this.value;pintarMotor();pintarResultados()">'+
     '</div>'+
   '</div>'+

   '<div class="motorcab"><span class="mt">⚡ Resultados del motor CHASKI</span>'+
     '<span class="ms">busca dentro de la app, sin salir</span></div>'+
   '<div id="mResult"></div>'+

   '<div class="motorcab web"><span class="mt">🌐 Buscar en la web</span>'+
     '<span class="ms">abre las fuentes completas en otra pestaña</span></div>'+
   '<div id="bResult"></div>'+

   /* guardadas */
   (GUARDADAS.length?'<h2>Tus búsquedas guardadas</h2><div class="guard">'+
     GUARDADAS.map(function(s,i){
       return '<span class="gd" onclick="usarGuardada('+i+')">'+esc(s.n)+
         '<em>'+esc(s.z)+'</em><b onclick="borrarGuardada('+i+',event)">✕</b></span>';}).join('')+
     '</div>':'')+

   '<h2>'+RUBROS.length+' rubros</h2>'+
   '<div class="rubros">'+chipsRubros()+'</div>';

  var i=document.getElementById('bTexto'); if(i)i.value=txt;
  pintarMotor();
  if(consulta())pintarResultados();
}

cargarGuardadas();
