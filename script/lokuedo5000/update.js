// REQUIRE JS DEFAULT
const url = require('url');
const path = require('path');
const fs = require('fs');
const https = require('https');



module.exports = {
  UpdateGames: function(filehttp) {
    // Info
    var gress = document.querySelector(".progress-bar");
    var text_up = document.querySelector(".tipo_text");
    text_up.innerText = 'Descargando datos';
    var file = fs.createWriteStream(path.join(__dirname, '../../', 'data', 'public', 'db', 'games.json'));
    var len = 0;
    https.get(filehttp, function(res) {
      res.on('data', function(chunk) {
        file.write(chunk);
        len += chunk.length;
        var percent = (len / res.headers['content-length']) * 100;

        // Progress Bar
        gress.style.width = percent + '%';
      });
      res.on('end', function() {
        file.close();
      });
      file.on('close', function() {
        // New Update

        setTimeout(function() {
          document.querySelector(".updatefiles").click();
        }, 3000);


      });
    }).on('error', function() {

    });
  },
  UpdateFiles: function(filehttp) {
    // Info
    var gress = document.querySelector(".progress-bar");
    var text_up = document.querySelector(".tipo_text");
    var file = fs.createWriteStream(path.join(__dirname, '../../', 'data', 'download', 'update.zip'));
    var len = 0;
    https.get(filehttp, function(res) {
      res.on('data', function(chunk) {
        file.write(chunk);
        len += chunk.length;
        var percent = (len / res.headers['content-length']) * 100;

        // Progress Bar
        gress.style.width = percent + '%';
      });
      res.on('end', function() {
        file.close();
      });
      file.on('close', function() {
        // Finished
        setTimeout(function() {
          document.querySelector(".updateinstall").click();
        }, 3000);
      });
    }).on('error', function() {});
  },
  updateInstall: function() {
    // Info
    var gress = document.querySelector(".progress-bar");
    var text_up = document.querySelector(".tipo_text");
    // EXTRAER ARCHIVOS
    var file_descargada = path.join(__dirname, '../../', 'data', 'download', 'update.zip');
    var folder_installl = path.join(__dirname, '../../');
    var extract = require('extract-zip');
    var update_file = path.resolve(file_descargada);
    var install_update = path.resolve(folder_installl);

    extract(update_file, {
      dir: install_update
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        text_up.innerText = 'Terminando...';
        // Progress Bar
        gress.style.width = 100 + '%';
        setTimeout(function() {
          window.location.href = '/';
        }, 5000);
      }
    })
  }
}
