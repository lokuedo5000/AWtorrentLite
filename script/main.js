/*EventEmitter*/
const et = require('events');
et.EventEmitter.defaultMaxListeners = 0;

/*Electron*/
const {
  app,
  BrowserWindow,
  webContents,
  Menu,
  ipcMain,
  screen,
  dialog
} = require('electron');
// const unhandled = require('electron-unhandled');
// const {openNewGitHubIssue, debugInfo} = require('electron-util');
//
// unhandled({
// 	reportButton: error => {
// 		openNewGitHubIssue({
// 			user: 'sindresorhus',
// 			repo: 'electron-unhandled',
// 			body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
// 		});
// 	}
// });

// Importar Expresss
const express = require('express');
const exp = express();

/*Importar Ejs*/
const ejs = require('ejs');

// Aqui los otros Modules
const url = require('url');
const path = require('path');
const fs = require('fs');
const https = require('https');

/*Save Info Windows*/
const WindowStateManager = require('electron-window-state-manager');

/*Importar parseTorrent*/
const parseTorrent = require('parse-torrent');

/* Importar Script creados por lokuedo5000 */
const json = require(path.join(__dirname, 'lokuedo5000', 'json-files.js'));

/* Rutas */
var ruta_Config = path.join(__dirname, '../', 'data', 'cog', 'config.json');
var ruta_games = path.join(__dirname, '../', 'data', 'public', 'db', 'games.json');

/*Importar webtorrent*/
var WebTorrent = require('webtorrent');
/*Get Config*/
var config = json.view(ruta_Config);
/*Set Config Torrent*/
var client = new WebTorrent({
  tracker: config.tracker
});

/* Get Config */
function getcog() {
  return json.view(ruta_Config);
}
/* Get Games */
function getgames() {
  return json.view(ruta_games);
}

function getgames_d() {
  const db = json.view(ruta_games);
  var nm = db.filter(all => all.urls == id);
}


// Creador de Carpetas
function craeteData(folder) {
  try {
    fs.mkdirSync(folder);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}

// GET PACKAGE
var readPackage = json.read(path.join(__dirname, '../', 'package.json'));
// SETTING SERVER

// GET PORT USER
var getport = getcog();
if (getport.port == undefined) {
  var portDefault = readPackage.config.port;
}else{
  var portDefault = getport.port;
}
// END
exp.set("view engine", "ejs");
exp.set('port', process.env.PORT || portDefault)
exp.use(express.urlencoded({
  extended: false
}));

// Rutas Server
/*Home*/
exp.get('/', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'index'), {
    cog: getcog()
  });
})
/*Games*/
exp.get('/games', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'games'), {
    cog: getcog(),
    games: getgames()
  });
})
/*Where*/
exp.get('/where', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'where'), {
    cog: getcog(),
    games: getgames()
  });
})
/*Result*/
exp.get('/result', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'result'), {
    cog: getcog(),
    games: getgames()
  });
})
/*Downloading*/
exp.get('/downloading', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'downloading'), {
    cog: getcog()
  });
})
/*Setting*/
exp.get('/setting', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'setting'), {
    cog: getcog()
  });
})

/*Setting*/
exp.get('/update', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'update'), {
    cog: getcog()
  });
})

/*App*/
exp.get('/appweb', (req, res) => {
  res.render(path.join(__dirname, '../', 'data', 'views', 'app'), {
    cog: getcog(),
    games: getgames()
  });
})

/* POST WEB*/
exp.post('/des', (req, res) => {
  /*Verificar & Iniciar Descargar*/
  const {
    id
  } = req.body;

  /*Cargar Archivo*/
  const getRuta = path.join(__dirname, '../', 'data', 'download', 'games.json');
  let getSave = json.read(getRuta);

  if (getSave.length > 0) {
    if (getSave[0].id == id) {
      if (getSave[0].active == false) {
        getSave[0].active = true;
        fs.writeFileSync(getRuta, JSON.stringify(getSave, null, 2), 'utf-8');

        desGamesUri();

        res.send('runing');

      } else {
        res.send(false + 'true');
      }
    } else {
      res.send(false);
    }
  }

})

/*Carpeta Publica*/
exp.use(express.static(path.join(__dirname, '../', 'data', 'public')))

/*Pagina Web Error 404*/
exp.use(function(req, res) {
  res.status(404).send('Sorry cant find that!' + ' <a href="/">home</a>');
})

/*Arrancar Servidor*/
exp.listen(exp.get('port'), () => {
  console.log('Server is Runing...');
})


/*Script Torrent*/

/*Electron JS*/
/*Ready*/
app.on('ready', () => {
  /*Abrir ventana por tamaño default*/
  const winState = new WindowStateManager('win', {
    defaultWidth: 500,
    defaultHeight: 500
  });
  /*Datos de la ventana*/
  win = new BrowserWindow({
    icon: path.join(__dirname, '../', 'data', 'assets', 'icons', 'win', 'ico#2.ico'),
    width: winState.width,
    height: winState.height,
    'minWidth': 500,
    'minHeight': 500,
    x: winState.x,
    y: winState.y,
    title: 'AppWeb',
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    // maximizable: true,
    // resizable: true,
    frame: false,
    show: false,
    webPreferences: {
      // nodeIntegration: true, // is default value after Electron v5
      // contextIsolation: false, // protect against prototype pollution
      // enableRemoteModule: true, // turn off remote
      preload: path.join(__dirname, 'reload', 'win.js') /* Archivo Preloader /script/reload/win.js */
    }
  });

  /*Add Menu*/
  const menuMainWindow = Menu.buildFromTemplate(templateMenu);
  win.setMenu(menuMainWindow);
  win.setMenuBarVisibility(false);

  // Mediante este evento muestra la ventana principal cuando está cargada y lista para mostrar
  win.once('ready-to-show', () => {
    win.show()
  });

  /*Load Url*/
  win.loadURL('http://' + readPackage.config.host + ':' + portDefault + '/update');
  win.on('close', () => {
    winState.saveState(win);
    /* Limpiar Json Torrent */
    fs.writeFileSync(path.join(__dirname, '../', 'data', 'download', 'addtorrent.json'), JSON.stringify([], null, 2), 'utf-8');
    fs.writeFileSync(path.join(__dirname, '../', 'data', 'download', 'games.json'), JSON.stringify([], null, 2), 'utf-8');
    fs.writeFileSync(path.join(__dirname, '../', 'data', 'download', 'finished.json'), JSON.stringify([], null, 2), 'utf-8');
  })

  /*Verifica si la Ventana fue cerrada maximizada*/
  if (winState.maximized) {
    win.maximize();
  }

})

/* Ads */
function adsventana(url) {
  /*Abrir ventana por tamaño default*/
  const winState = new WindowStateManager('adswin', {
    defaultWidth: 500,
    defaultHeight: 500
  });
  /*Datos de la ventana*/
  adswin = new BrowserWindow({
    icon: path.join(__dirname, '../', 'data', 'assets', 'icons', 'win', 'ico#2.ico'),
    width: winState.width,
    height: winState.height,
    'minWidth': 500,
    'minHeight': 500,
    x: winState.x,
    y: winState.y,
    title: 'AppWeb - Ads'
  });

  /*Add Menu*/
  const menuMainWindow = Menu.buildFromTemplate(templateMenu);
  adswin.setMenu(menuMainWindow);
  adswin.setMenuBarVisibility(false);

  /*Load Url*/
  adswin.loadURL(url);
  adswin.on('close', () => {
    winState.saveState(adswin);
  })

  /*Verifica si la Ventana fue cerrada maximizada*/
  if (winState.maximized) {
    adswin.maximize();
  }

}
/* Run ventana Ads */
ipcMain.on('open-ads', (e, data) => {
  adsventana(data);
})

/*Descargar Torrents*/
function download(value, sHash, tipo, save) {
  var filejsonRuta = path.join(__dirname, '../', 'data', 'download', 'addtorrent.json');
  if (tipo == 'des') {
    /* Get Data Torrent save in Json */
    var trrn = json.get(filejsonRuta, sHash);
    /*Set Download*/
    var torrent = client.add(value, {
      path: save
    });
    /*Save Progress*/
    var interval = setInterval(function() {
      json.upTorrent(filejsonRuta, {
        progress: (torrent.progress * 100).toFixed(1) + '%',
        descargado: torrent.received
      }, sHash);
    }, 5000)

    torrent.on('done', function() {
      /* Get Torrent */
      var datafile = json.get(filejsonRuta, sHash);
      /* Save Info Torrent */
      json.upTorrent(filejsonRuta, {
        progress: '100%',
        descargado: datafile[0].length
      }, sHash);

      const t = client.get(sHash);
      if (t) {
        t.destroy();
      }

      clearInterval(interval);

    })
  }
}

// Download Torrent
ipcMain.on('torrent-down', (e, data) => {
  var config = json.view(ruta_Config);

  if (config.save == 'choose') {
    dialog.showOpenDialog(null, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      if (result.canceled == false) {
        download(data.uri, data.Hash, data.tipo, result.filePaths[0]);
      }
    }).catch(err => {
      console.log(err)
    })
  } else if (config.save == 'downloads') {
    download(data.uri, data.Hash, data.tipo, app.getPath('downloads'));
  } else if (config.save == 'desktop') {
    download(data.uri, data.Hash, data.tipo, app.getPath('desktop'));
  } else if (config.save == 'default') {
    download(data.uri, data.Hash, data.tipo, app.getPath('downloads'));
  }
})

/* Descargar Juego */
function desGames(value, save) {
  /* Ruta File */
  var ruta_file_games = path.join(__dirname, '../', 'data', 'download', 'games.json');

  /* Get Uri */
  const uri = parseTorrent.toMagnetURI({
    infoHash: value[0].infoHash
  })

  var theuri = uri + '&dn' + value[0].dn;

  /* Add Torrent */
  var torrent = client.add(theuri, {
    announce: value[0].announce,
    path: save
  });
  /*Save Progress*/
  var interval = setInterval(function() {
    var leerdata = json.read(ruta_file_games);

    leerdata[0].progress = (torrent.progress * 100).toFixed(1) + '%';

    fs.writeFileSync(ruta_file_games, JSON.stringify(leerdata, null, 2), 'utf-8');
  }, 5000)
  /* Terminado Torrent */
  torrent.on('done', function() {
    /* Save Info Torrent */
    var leerdata = json.read(ruta_file_games);

    leerdata[0].progress = '100%';

    fs.writeFileSync(ruta_file_games, JSON.stringify(leerdata, null, 2), 'utf-8');

    const t = client.get(value[0].infoHash);
    if (t) {
      t.destroy();
    }

    clearInterval(interval);

  })
}

/*Iniciar*/
ipcMain.on('torrent-games', (e, data) => {

})
// Delete Torrent
/* Working */

/*Ruta de Torrents*/
function openTorrent() {
  var options = {
    title: "Add Torrent",
    defaultPath: app.getPath('desktop'),
    filters: [{
      name: 'Torrent',
      extensions: ['torrent']
    }]
  }
  dialog.showOpenDialog(null, options).then(result => {
    if (result.canceled == false) {

      const file_art = path.join(result.filePaths[0]);
      win.webContents.send('ruta-torrent', file_art);



    }
  }).catch(err => {
    console.log(err)
  })
}

function desGamesUri() {
  dialog.showOpenDialog(null, {
    properties: ['openFile', 'openDirectory']
  }).then(result => {

    if (result.canceled == false) {
      const getRuta = path.join(__dirname, '../', 'data', 'download', 'games.json');
      let getSave = json.read(getRuta);
      desGames(getSave, result.filePaths[0])

      /*Exit ventana ads cuando inicie la descarga*/
      adswin.close();
    }


  }).catch(err => {
    console.log(err)
  })
}
// Add Torrent
ipcMain.on('torrent-add', (e, data) => {
  openTorrent();
})
// Add Ruta
// ipcMain.on('torrent-ruta', (e, data) => {
//   desGamesUri();
// })

/* Win Action */
ipcMain.on('win-action', (e, data) => {
  if (data == "minimize") {
    win.minimize();
  } else if (data == "close") {
    app.quit();
  }
})

/*Menu Clear*/
Menu.setApplicationMenu(null);

/*Menu*/
var templateMenu = [{
  role: 'reload'
}];

// Reload in Development for Browser Windows
var DevTools = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : true;

if (DevTools) {
  templateMenu.push({
    label: 'DevTools',
    submenu: [{
      label: 'Show/Hide Dev Tools',
      accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
      click(item, focusedWindow) {
        focusedWindow.toggleDevTools();
      }
    }]
  })
}
