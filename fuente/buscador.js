/* ══════════════════════════════════════════════════════════════
   CHASKI · BUSCADOR UNIVERSAL
   Cualquier rubro · Entidades públicas o empresas privadas
   ══════════════════════════════════════════════════════════════ */

var RUBROS=[
 {g:"Construcción",  n:"Obras civiles",        q:'"ejecución de obra" OR "obras civiles" OR construcción'},
 {g:"Construcción",  n:"Saneamiento",          q:'"agua potable" OR alcantarillado OR desagüe OR saneamiento'},
 {g:"Construcción",  n:"Carreteras y vías",    q:'carretera OR pavimentación OR "trocha carrozable" OR asfaltado'},
 {g:"Construcción",  n:"Edificaciones",        q:'edificación OR "local escolar" OR "centro de salud" OR "losa deportiva"'},
 {g:"Construcción",  n:"Defensa ribereña",     q:'"defensa ribereña" OR "protección de riberas" OR gaviones OR encauzamiento'},
 {g:"Construcción",  n:"Movimiento de tierras",q:'"movimiento de tierras" OR excavación OR demolición OR "eliminación de desmonte"'},

 {g:"Energía",       n:"Instalaciones eléctricas", q:'"instalaciones eléctricas" OR "instalación eléctrica" OR electrificación'},
 {g:"Energía",       n:"Pozo a tierra",        q:'"pozo a tierra" OR "puesta a tierra" OR "sistema de puesta a tierra"'},
 {g:"Energía",       n:"Paneles solares",      q:'"panel solar" OR "paneles solares" OR fotovoltaico OR "energía solar"'},
 {g:"Energía",       n:"Termas solares",       q:'"terma solar" OR "termas solares" OR "calentador solar"'},
 {g:"Energía",       n:"Redes y alumbrado",    q:'"redes eléctricas" OR "alumbrado público" OR "media tensión" OR luminaria'},
 {g:"Energía",       n:"Subestaciones",        q:'subestación OR transformador OR "celda de media tensión"'},
 {g:"Energía",       n:"Grupos electrógenos",  q:'"grupo electrógeno" OR generador OR "planta eléctrica"'},

 {g:"Mecánica",      n:"Mantenimiento industrial", q:'"mantenimiento industrial" OR "mantenimiento preventivo" OR "mantenimiento correctivo"'},
 {g:"Mecánica",      n:"Metalmecánica",        q:'metalmecánica OR soldadura OR "estructura metálica" OR "fabricación metálica"'},
 {g:"Mecánica",      n:"Maquinaria pesada",    q:'"maquinaria pesada" OR "alquiler de maquinaria" OR excavadora OR cargador frontal'},
 {g:"Mecánica",      n:"Aire acondicionado",   q:'"aire acondicionado" OR climatización OR ventilación OR refrigeración'},
 {g:"Mecánica",      n:"Bombas y motores",     q:'"electrobomba" OR "bomba sumergible" OR motor OR "estación de bombeo"'},
 {g:"Mecánica",      n:"Ascensores",           q:'ascensor OR montacargas OR elevador'},

 {g:"Seguridad",     n:"Contra incendios",     q:'"sistema contra incendio" OR extintor OR "detección de humo" OR rociadores'},
 {g:"Seguridad",     n:"Vigilancia",           q:'"servicio de vigilancia" OR seguridad OR resguardo OR "agente de seguridad"'},
 {g:"Seguridad",     n:"Cámaras y CCTV",       q:'CCTV OR "cámaras de seguridad" OR videovigilancia OR "central de monitoreo"'},
 {g:"Seguridad",     n:"EPP y señalización",   q:'"equipos de protección personal" OR EPP OR señalización OR "señalética"'},

 {g:"Servicios",     n:"Limpieza",             q:'"servicio de limpieza" OR "limpieza pública" OR conserjería'},
 {g:"Servicios",     n:"Alimentación",         q:'"servicio de alimentación" OR catering OR "raciones alimenticias" OR desayuno'},
 {g:"Servicios",     n:"Residuos sólidos",     q:'"residuos sólidos" OR "recojo de basura" OR "disposición final"'},
 {g:"Servicios",     n:"Jardinería y fumigación", q:'jardinería OR "áreas verdes" OR fumigación OR desratización'},
 {g:"Servicios",     n:"Lavandería",           q:'lavandería OR "lavado de ropa" OR "servicio de lavado"'},

 {g:"Transporte",    n:"Transporte de personal", q:'"transporte de personal" OR "servicio de transporte" OR movilidad'},
 {g:"Transporte",    n:"Transporte de carga",  q:'"transporte de carga" OR flete OR "distribución de material"'},
 {g:"Transporte",    n:"Alquiler de vehículos",q:'"alquiler de vehículo" OR "alquiler de camioneta" OR "arrendamiento de vehículos"'},
 {g:"Transporte",    n:"Combustible",          q:'combustible OR "vales de combustible" OR petróleo OR gasolina OR diésel'},

 {g:"Tecnología",    n:"Equipos de cómputo",   q:'"equipos de cómputo" OR computadora OR laptop OR servidor OR impresora'},
 {g:"Tecnología",    n:"Software y sistemas",  q:'software OR "sistema informático" OR licencia OR "desarrollo de sistema"'},
 {g:"Tecnología",    n:"Cableado y redes",     q:'"cableado estructurado" OR "red de datos" OR fibra óptica OR switch'},
 {g:"Tecnología",    n:"Telecomunicaciones",   q:'telecomunicaciones OR internet OR "servicio de datos" OR telefonía'},

 {g:"Salud",         n:"Equipos médicos",      q:'"equipo médico" OR "equipamiento biomédico" OR "material médico"'},
 {g:"Salud",         n:"Medicamentos",         q:'medicamento OR "productos farmacéuticos" OR insumo médico'},
 {g:"Salud",         n:"Laboratorio",          q:'"insumos de laboratorio" OR reactivo OR "material de laboratorio"'},

 {g:"Consultoría",   n:"Supervisión de obra",  q:'"supervisión de obra" OR "supervisor de obra" OR "inspector de obra"'},
 {g:"Consultoría",   n:"Expedientes técnicos", q:'"expediente técnico" OR "elaboración de expediente" OR "estudio definitivo"'},
 {g:"Consultoría",   n:"Estudios y proyectos", q:'"estudio de preinversión" OR "ficha técnica" OR perfil OR "estudio de impacto"'},
 {g:"Consultoría",   n:"Capacitación",         q:'capacitación OR "servicio de capacitación" OR taller OR "curso de"'},
 {g:"Consultoría",   n:"Contable y legal",     q:'"servicio contable" OR auditoría OR "asesoría legal" OR "patrocinio legal"'},

 {g:"Suministros",   n:"Ferretería",           q:'ferretería OR "materiales de construcción" OR cemento OR fierro'},
 {g:"Suministros",   n:"Mobiliario",           q:'mobiliario OR escritorio OR "carpeta escolar" OR estante OR silla'},
 {g:"Suministros",   n:"Útiles de oficina",    q:'"útiles de oficina" OR "material de escritorio" OR papelería OR tóner'},
 {g:"Suministros",   n:"Imprenta",             q:'"servicio de impresión" OR imprenta OR "material impreso" OR banner'},
 {g:"Suministros",   n:"Uniformes y calzado",  q:'uniforme OR "ropa de trabajo" OR calzado OR "prendas de vestir"'},
 {g:"Suministros",   n:"Víveres",              q:'víveres OR "productos alimenticios" OR abarrotes'},

 {g:"Agro",          n:"Insumos agrícolas",    q:'"insumos agrícolas" OR fertilizante OR semilla OR abono'},
 {g:"Agro",          n:"Riego tecnificado",    q:'"riego tecnificado" OR "sistema de riego" OR aspersión OR goteo'},
 {g:"Agro",          n:"Pecuario",             q:'pecuario OR ganado OR "sanidad animal" OR "alimento balanceado"'},

 {g:"Otros",         n:"Carpintería y vidrio", q:'carpintería OR "trabajos en madera" OR vidriería OR "mampara"'},
 {g:"Otros",         n:"Pintura",              q:'"trabajos de pintura" OR pintado OR "pintura látex" OR esmalte'},
 {g:"Otros",         n:"Gasfitería",           q:'gasfitería OR "instalaciones sanitarias" OR tubería OR grifería'},
 {g:"Otros",         n:"Publicidad y eventos", q:'publicidad OR "organización de evento" OR difusión OR "spot publicitario"'}
];

var DEPTOS=["Todo el Perú","Áncash","Amazonas","Apurímac","Arequipa","Ayacucho","Cajamarca","Callao","Cusco",
 "Huancavelica","Huánuco","Ica","Junín","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua",
 "Pasco","Piura","Puno","San Martín","Tacna","Tumbes","Ucayali"];

/* zona por defecto: los distritos de Rafael */
var ZONA_LOCAL='"Huaraz" OR "Carhuaz" OR "Yungay" OR "Caraz" OR "Recuay" OR "Huaylas"';

function G(q){return 'https://www.google.com/search?q='+encodeURIComponent(q)+'&tbs=qdr:m';}
function Gs(q){return 'https://www.google.com/search?q='+encodeURIComponent(q)+'&tbs=qdr:w';}

/* ── fuentes públicas ── */
var FUENTES_PUB=[
 {n:"SEACE · Buscador Público",d:"Oficial. Copio tu búsqueda; pégala en «Descripción del Objeto»",icono:"🏛️",destacada:true,
  manual:true,u:function(){return 'https://prod2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml';}},
 {n:"Contrataciones Abiertas",d:"Portal oficial de datos abiertos del OECE",icono:"📊",destacada:true,
  manual:true,u:function(){return 'https://contratacionesabiertas.oece.gob.pe/';}},
 {n:"Menores a 8 UIT",d:"Órdenes de servicio y compra directa",icono:"💰",destacada:true,
  u:function(q,d){return 'https://licitacionesperu.pe/contrataciones-menores/?search='+encodeURIComponent(q)+
    '&status=Vigente&sort=published_at+DESC';}},
 {n:"LicitacionesPerú",d:"Procedimientos de selección con filtro de etapa",icono:"📋",
  u:function(q,d){return 'https://licitacionesperu.pe/licitaciones/?search='+encodeURIComponent(q)+
    '&phase=Convocatoria&sort=published_at+DESC';}},
 {n:"Procesos desiertos",d:"Los que nadie ganó y se vuelven a convocar",icono:"🏜️",
  u:function(q,d){return 'https://licitacionesperu.pe/licitaciones/?search='+encodeURIComponent(q)+
    '&phase=Desierto&sort=published_at+DESC';}},
 {n:"TodoLicitaciones",d:"Buscador alterno de convocatorias",icono:"🔎",
  u:function(q,d){return G('site:todolicitaciones.pe '+q+(d?' '+d:''));}},
 {n:"PerúLicitaciones",d:"Con nomenclatura y fecha límite",icono:"📄",
  u:function(q,d){return G('site:perulicitaciones.com '+q+(d?' '+d:''));}},
 {n:"PerúContrata",d:"Boletín diario de convocatorias vigentes",icono:"📰",
  u:function(q,d){return G('site:perucontrata.com.pe '+q+(d?' '+d:''));}},
 {n:"Órdenes de servicio",d:"Portales de transparencia de cada entidad",icono:"🧾",
  u:function(q,d){return G('site:transparencia.gob.pe OR site:gob.pe ("orden de servicio" OR "menores a 8 UIT" OR cotización) '+q+(d?' '+d:''));}},
 {n:"Convocatorias del Estado",d:"Municipalidades, ministerios y programas",icono:"🏢",
  u:function(q,d){return G('site:gob.pe (convocatoria OR contratación OR requerimiento) '+q+(d?' '+d:''));}},
 {n:"PERÚ COMPRAS",d:"Catálogos electrónicos de Acuerdo Marco",icono:"🛒",
  u:function(q,d){return G('site:perucompras.gob.pe OR "acuerdo marco" catálogo electrónico '+q);}},
 {n:"Búsqueda abierta",d:"Todo lo que se publicó esta semana",icono:"🌐",
  u:function(q,d){return Gs('(convocatoria OR licitación OR "términos de referencia" OR requerimiento) '+q+(d?' '+d:''));}}
];

/* ── fuentes privadas ── */
var FUENTES_PRIV=[
 {n:"Pedidos de cotización",d:"Empresas que buscan proveedor ahora mismo",icono:"💬",destacada:true,
  u:function(q,d){return Gs('("solicito cotización" OR "requiero proveedor" OR "busco proveedor" OR "necesito servicio de") '+q+(d?' '+d:''));}},
 {n:"Facebook",d:"Grupos y páginas locales de tu rubro",icono:"📱",destacada:true,
  u:function(q,d){return Gs('site:facebook.com '+q+' (necesito OR busco OR requiero OR cotizar OR "se necesita") '+(d?d:''));}},
 {n:"LinkedIn",d:"Empresas, proyectos y contactos de compras",icono:"💼",destacada:true,
  u:function(q,d){return G('site:linkedin.com '+q+' (proveedor OR contratista OR "jefe de compras" OR licitación) '+(d?d:''));}},
 {n:"Portales de proveedores",d:"Grandes empresas con registro abierto",icono:"🚪",
  u:function(q,d){return G('("portal de proveedores" OR "registro de proveedores" OR "sé nuestro proveedor") '+q+' Perú '+(d?d:''));}},
 {n:"Minería y energía",d:"Mineras, hidroeléctricas y contratistas",icono:"⛏️",
  u:function(q,d){return G('(minera OR "unidad minera" OR hidroeléctrica OR concesionaria) (proveedor OR contratista OR licitación OR homologación) '+q+' '+(d?d:'Perú'));}},
 {n:"Constructoras",d:"Quien gana la obra subcontrata tu parte",icono:"🏗️",
  u:function(q,d){return G('(constructora OR contratista OR "empresa constructora") (subcontrato OR proveedor OR "busca") '+q+' '+(d?d:'Perú'));}},
 {n:"Obras en marcha",d:"Proyectos nuevos que van a necesitar servicios",icono:"🚧",
  u:function(q,d){return G('("nuevo proyecto" OR "inicio de obra" OR "en construcción" OR inauguración OR ampliación) '+q+' '+(d?d:'Perú'));}},
 {n:"Bolsas de trabajo",d:"Muchos servicios se publican como empleo",icono:"👷",
  u:function(q,d){return G('(site:computrabajo.com.pe OR site:bumeran.com.pe OR site:indeed.com.pe) '+q+' '+(d?d:''));}},
 {n:"Marketplace de compras",d:"Oportunidades públicas y privadas juntas",icono:"🛍️",
  u:function(q,d){return G('site:linkcontrata.lat '+q+' '+(d?d:''));}},
 {n:"ONG y cooperación",d:"Términos de referencia y consultorías",icono:"🤝",
  u:function(q,d){return G('("términos de referencia" OR "convocatoria a consultoría" OR TDR) (ONG OR cooperación OR proyecto) '+q+' '+(d?d:'Perú'));}},
 {n:"Gremios y cámaras",d:"Cámara de comercio, CAPECO, SNI",icono:"🏛️",
  u:function(q,d){return G('("cámara de comercio" OR CAPECO OR "Sociedad Nacional de Industrias" OR gremio) (convocatoria OR proveedor OR oportunidad) '+q+' '+(d?d:'Perú'));}},
 {n:"Homologación",d:"Requisito para entrar a grandes empresas",icono:"✅",
  u:function(q,d){return G('"homologación de proveedores" '+q+' Perú requisitos');}}
];

/* ── estado del buscador ── */
var B={texto:'',rubro:null,depto:'Áncash',ambito:'publico'};

function chipsRubros(){
  var grupos=[],vistos={};
  RUBROS.forEach(function(r){if(!vistos[r.g]){vistos[r.g]=1;grupos.push(r.g);}});
  return grupos.map(function(g){
    return '<div class="rgrupo"><div class="rgt">'+esc(g)+'</div><div class="rgc">'+
      RUBROS.filter(function(r){return r.g===g;}).map(function(r,i){
        var idx=RUBROS.indexOf(r);
        return '<span class="rb'+(B.rubro===idx?' on':'')+'" onclick="pickRubro('+idx+')">'+esc(r.n)+'</span>';
      }).join('')+'</div></div>';
  }).join('');
}

function pickRubro(i){
  B.rubro = (B.rubro===i)? null : i;
  var inp=document.getElementById('bTexto');
  if(B.rubro!==null && inp && !inp.value.trim()) inp.placeholder=RUBROS[i].n;
  pintarBuscador();
}
function setAmbito(a){B.ambito=a;pintarBuscador();}

function consulta(){
  var libre=(document.getElementById('bTexto')||{}).value||'';
  libre=libre.trim();
  if(libre) return '"'+libre.replace(/"/g,'')+'"';
  if(B.rubro!==null) return RUBROS[B.rubro].q;
  return '';
}
function zona(){
  var d=(document.getElementById('bDepto')||{}).value||B.depto;
  if(d==='Todo el Perú') return '';
  if(d==='Áncash') return '('+ZONA_LOCAL+' OR "Áncash")';
  return '"'+d+'"';
}

function buscar(){
  var q=consulta();
  if(!q){aviso('Escribe algo o elige un rubro.');return;}
  pintarResultados();
  var r=document.getElementById('bResult');
  if(r) r.scrollIntoView({behavior:'smooth',block:'start'});
}

function pintarResultados(){
  var q=consulta(), z=zona();
  var el=document.getElementById('bResult');
  if(!q){el.innerHTML='';return;}

  var lista=[];
  if(B.ambito==='publico'||B.ambito==='ambos') lista=lista.concat(FUENTES_PUB.map(function(f){return {f:f,t:'pub'};}));
  if(B.ambito==='privado'||B.ambito==='ambos') lista=lista.concat(FUENTES_PRIV.map(function(f){return {f:f,t:'priv'};}));

  var textoPlano=(document.getElementById('bTexto').value||'').trim()||
                 (B.rubro!==null?RUBROS[B.rubro].n:'');

  el.innerHTML=
   '<div class="rescab">'+
     '<div class="rq">Buscando: <b>'+esc(textoPlano)+'</b></div>'+
     '<div class="rz">'+esc((document.getElementById('bDepto')||{}).value||'Áncash')+' · '+
       (B.ambito==='publico'?'Entidades públicas':B.ambito==='privado'?'Empresas privadas':'Público y privado')+
       ' · '+lista.length+' fuentes</div>'+
     '<button class="all" onclick="abrirTop()">🚀 Abrir las 3 mejores fuentes</button>'+
   '</div>'+
   '<div class="g2">'+lista.map(function(x){
      var f=x.f;
      var href=f.manual? f.u() : f.u(q,z);
      var onc=f.manual? ' onclick="copiarBusqueda(event,\''+esc(q).replace(/'/g,"\\'")+'\',\''+esc(href)+'\')"':'';
      return '<a class="t'+(f.destacada?' hi':'')+'" target="_blank" rel="noopener" href="'+esc(href)+'"'+onc+'>'+
        '<span class="e">'+f.icono+'</span><span class="n">'+esc(f.n)+'</span>'+
        '<span class="d">'+esc(f.d)+'</span>'+
        (f.manual?'<span class="mn">se copia solo</span>':'')+'</a>';
   }).join('')+'</div>';
}

function copiarBusqueda(ev,q,url){
  texto(q,'Búsqueda copiada. Pégala en el campo «Descripción del Objeto» y dale Buscar.');
}

function abrirTop(){
  var q=consulta(), z=zona();
  var base=(B.ambito==='privado')?FUENTES_PRIV:FUENTES_PUB;
  base.filter(function(f){return f.destacada;}).slice(0,3).forEach(function(f){
    window.open(f.manual?f.u():f.u(q,z),'_blank','noopener');
  });
}

function pintarBuscador(){
  var el=document.getElementById('bPanel'); if(!el)return;
  var txt=(document.getElementById('bTexto')||{}).value||'';
  el.innerHTML=
   '<div class="ambito">'+
     '<button class="amb'+(B.ambito==='publico'?' on':'')+'" onclick="setAmbito(\'publico\')">'+
       '<span class="ai">🏛️</span><span class="an">Entidades públicas</span>'+
       '<span class="ad">Estado, municipios, ministerios</span></button>'+
     '<button class="amb'+(B.ambito==='privado'?' on':'')+'" onclick="setAmbito(\'privado\')">'+
       '<span class="ai">🏢</span><span class="an">Empresas privadas</span>'+
       '<span class="ad">Mineras, constructoras, negocios</span></button>'+
     '<button class="amb ancho'+(B.ambito==='ambos'?' on':'')+'" onclick="setAmbito(\'ambos\')">'+
       '<span class="an">🌐 Buscar en los dos a la vez</span></button>'+
   '</div>'+

   '<div class="bcaja">'+
     '<input type="text" id="bTexto" value="'+esc(txt)+'" placeholder="¿Qué buscas? Ej.: carpintería, catering, vigilancia..." '+
       'onkeydown="if(event.key===\'Enter\')buscar()">'+
     '<select id="bDepto">'+DEPTOS.map(function(d){
        return '<option'+(d===B.depto?' selected':'')+'>'+d+'</option>';}).join('')+'</select>'+
     '<button class="bir" onclick="buscar()">Buscar</button>'+
   '</div>'+
   '<div class="bhint">Escribe cualquier cosa, o elige uno de los '+RUBROS.length+' rubros de abajo.</div>'+

   '<div id="bResult"></div>'+

   '<h2>Rubros</h2>'+
   '<div class="rubros">'+chipsRubros()+'</div>';

  var i=document.getElementById('bTexto');
  if(i){i.value=txt;}
  if(consulta()) pintarResultados();
}
