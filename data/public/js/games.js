/* Games */
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

$('.setall').pagination({ // you call the plugin
  dataSource: db.articulos.sort(sort_by('id', true, parseInt)), // pass all the data
  pageSize: 8, // put how many items per page you want
  callback: function(data, pagination) {
    // data will be chunk of your data (json.Product) per page
    // that you need to display
    var wrapper = $('.setall #games').empty();
    $.each(data, function(i, f) {
      $('.setall #games').append(rows(f.titulo, f.cover, f.urls, f.trailer));
    });
  }
});

function rows(name, cover, urls, trailer) {
  return `<div class="col">
    <div class="cover" style="background-image: url(${cover});">
      <div class="c_btn_trailer">
        <div class="btn_trailer">
          <div class="play_ic cwI-play"></div>
        </div>
      </div>
      <div class="c_btn_des">
        <div class="btn_des" onclick="wheres('${urls}')">
          Download
        </div>
      </div>
    </div>
  </div>`;
}

/* Ver Juego */
function wheres(urls) {
  window.location.href = '/where?v='+urls;
}
