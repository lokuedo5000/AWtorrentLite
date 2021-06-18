const path = require('path');
const fs = require('fs');
module.exports = {
  read: function(file) {
    const load = fs.readFileSync(file, 'utf-8');
    return JSON.parse(load);
  },
  view: function(file) {
    const load = fs.readFileSync(file, 'utf-8');
    return JSON.parse(load);
  },
  add: function(file, value) {
    const load = fs.readFileSync(file, 'utf-8');
    let parse = JSON.parse(load);

    /* Add ID */
    if (parse.length == 0) {
      var numID = 1;
    } else {
      var numID = parse.length + parseInt(1);
    }
    value.id = numID;

    /*Verificar Duplicados*/
    if (parse.length > 0) {
      var gettorrent = parse.filter(all => all.infoHash == value.infoHash);
      if (gettorrent.length > 0) {
        // console.log('Lo siento Este articulo ya esta agregado');
        return false;
      }else{
        /* Save in Torrent Json */
        parse.push(value);
        fs.writeFileSync(file, JSON.stringify(parse, null, 2), 'utf-8');

        return true;
      }
    }else{
      /* Save in Torrent Json */
      parse.push(value);
      fs.writeFileSync(file, JSON.stringify(parse, null, 2), 'utf-8');

      return true;
    }



  },
  upTorrent: function(file, value, sHash) {
    const load = fs.readFileSync(file, 'utf-8');
    let parse = JSON.parse(load);

    for (var g = 0; g < parse.length; g++) {
      if (parse[g].infoHash == sHash) {
        parse[g].progress = value.progress;
        parse[g].descargado = value.descargado;
        break;
      }
    }

    fs.writeFileSync(file, JSON.stringify(parse, null, 2), 'utf-8');
  },
  get: function(file, sHash) {
    const load = fs.readFileSync(file, 'utf-8');
    let get = JSON.parse(load);
    return get.filter(all => all.infoHash == sHash);
  },
  getTorrent: function(file) {
    const load = fs.readFileSync(file, 'utf-8');
    return JSON.parse(load);
  },
  check: function(file) {
    const load = fs.readFileSync(file, 'utf-8');
    return JSON.parse(load).length;
  }

}
