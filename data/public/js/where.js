/* Obtener Datos de la Url */
function getVar(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var name = getVar('v');

/* Get Datos Json */
var datos = db.articulos;
/* Filter Json */
var nGet = datos.filter(all => all.urls == name);


/* Agregar datos a Dom */
/* Title */
$('title').text(short(nGet[0].titulo, 10) + ' | AwTorrentLite');
$('.title_game').text(short(nGet[0].titulo, 40));
$('.title_get').text(short(nGet[0].nombre, 40));
$('.title_lugar').text(short(nGet[0].nombre, 30));

/* Set ID */
$('.btn_des_where').attr('data-id', nGet[0].urls);

/* Uri */
/* Get Datos Json */
var uris = db.torrents;
/* Filter Json */
var seturi = uris.filter(all => all.artID == name);
$('.btn_des_where').attr('data-uri', seturi[0].torrents);

/* Icono */
$('.icono_game').attr('style', 'background-image: url(' + nGet[0].cover + ');');

/* Generos */
var getdata = $('.generosver').html();
$('.generosver').html(getdata + gns(nGet[0].generos));

/* Peso */
$('.title_peso').text(nGet[0].peso);

/* Release */
$('.title_version').text(nGet[0].version);

/* Desarrolladora */
$('.title_dsrr').text(nGet[0].desarrolladora);
/* Banner */
$('.banner').attr('style', 'background-image: url(' + nGet[0].banner + ');');
/* Dcp */
$('.dcp_art').html(remplaNor(nGet[0].dcp));
/* Requisitos */
$('.rq_min').text(nGet[0].minimos);
$('.rq_max').text(nGet[0].recomendados);

/* Video */
videoplay(nGet[0].trailer, '.get_video');

/* Comentarios */
$('.fb-comments').attr('href', 'https://www.facebook.com/lokuedo5000#' + spaceRem(nGet[0].nombre));



/* Cap */
/* Working */
var limpiar = document.querySelector('#cap');
limpiar.innerHTML = '';
for (var i = 0; i < 6; i++) {
  limpiar.innerHTML += loadcap(nGet[0].banner);
}

function loadcap(img) {
  return `<div class="col">
            <div class="capgames box-s" style='background-image: url(${img});'></div>
          </div>`;
}

/* Ver Como */
var sort_by = (field, reverse, primer) => {

  const key = primer ?
    function(x) {
      return primer(x[field])
    } :
    function(x) {
      return x[field]
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}

/* Last */
window.addEventListener('load', loadlast, false);

function loadlast() {
  var gamesLast = db.articulos.sort(sort_by('id', true, parseInt));
  var last = document.querySelector('#lastgames');
  last.innerHTML = '';
  for (var i = 0; i < verifiqNum(gamesLast.length, 6); i++) {
    last.innerHTML += `<a href="/where?v=${gamesLast[i].urls}" class="list-group-item list-group-item-action">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${gamesLast[i].nombre}</h5>
                            <small class="text-muted">3 days ago</small>
                          </div>
                          <small class="text-muted">shared by (lokuedo5000)</small>
                        </a>`;
  }
}


// var last = document.querySelector('#last');
// last.innerHTML = '';
// for (var i = 0; i < 6; i++) {
//   limpiar.innerHTML += loadcap(nGet[0].banner);
// }
/* Acortar Texto */
function short(text, num) {
  if (text.length > num) {
    return text.slice(0, num) + '...';
  } else {
    return text;
  }
}
/* Generos */
function gns(text) {
  var d = "";

  var comvert = text.split(",");
  for (var get in comvert) {
    d += `<span class="genes" onclick="openatc('${comvert[get]}')">${mfirst(comvert[get])}</span>`;
  }
  return d;
}

// Open Web
function openatc(url) {
  location.href = '/result?v=' + url;
}
/* Primera Letra Mayuscula */
function mfirst(text) {
  var getnum = text.length;
  var firstletter = text.slice(0, 1)
  var mayutext = firstletter.toUpperCase();

  var deletefirst = text.slice(1, getnum)
  return mayutext + deletefirst;
}
/* Texto Normal */
function remplaNor(text) {
  return text.replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/-\(/g, "<h5 class='m-0'>")
    .replace(/\)-/g, "</h5>");
}
/* Crear iframe Video YouTube */
function videoplay(videoID, idInstall) {
  let createvideo = document.querySelector(idInstall);
  var newifram = document.createElement("iframe");
  newifram.setAttribute("src", "https://www.youtube.com/embed/" + videoID);
  newifram.setAttribute("class", "responsive-iframe");
  newifram.setAttribute("allowtransparency", "true");
  newifram.setAttribute("scrolling", "no");
  newifram.setAttribute("frameborder", "0");
  newifram.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
  newifram.setAttribute("framespacing", "0");
  newifram.setAttribute("allowfullscreen", "");
  createvideo.appendChild(newifram);
}
/* Remplazar Espacios */
function spaceRem(text) {
  return text.replace(/\s/g, '-');
}
/* Verificar la cantidad de juegos agregados */
function verifiqNum(games, num) {
  if (games > num) {
    return num;
  } else {
    return games;
  }
}
