const date = require('node-datetime');
const dt = date.create();

var days = dt.format('d');
var years = dt.format('Y');
var mes = dt.format('m');
var h = dt.format('I:M:S');
module.exports = {
  dateES: function() {
    if (mes == '01') {
      var vermes = 'Enero';
    } else if (mes == '02') {
      var vermes = 'Febrero';
    } else if (mes == '03') {
      var vermes = 'Marzo';
    } else if (mes == '04') {
      var vermes = 'Abril';
    } else if (mes == '05') {
      var vermes = 'Mayo';
    } else if (mes == '06') {
      var vermes = 'Junio';
    } else if (mes == '07') {
      var vermes = 'Julio';
    } else if (mes == '08') {
      var vermes = 'Agosto';
    } else if (mes == '09') {
      var vermes = 'Septiembre';
    } else if (mes == '10') {
      var vermes = 'Octubre';
    } else if (mes == '11') {
      var vermes = 'Noviembre';
    } else if (mes == '12') {
      var vermes = 'Diciembre';
    }
    return fecha_spanish = days + ' de ' + vermes + ' ' + years;
  },
  hora: function() {
    return h;
  }
}
