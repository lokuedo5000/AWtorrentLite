$(document).ready(function() {
  /* Menu */
  function setpaddingMenu() {
    var hdiv = $('.navbar_menu').outerHeight(true);
    $('.body').css('padding-top', hdiv +'px');
    // $('.search_div').css('top', hdiv + 40 + 'px');
  }
  setpaddingMenu();
  $(window).resize(function() {
    setpaddingMenu();
  });

  /* Toast */
  $('.runtoast').click(function(event) {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
      // Creates an array of toasts (it only initializes them)
      return new bootstrap.Toast(toastEl) // No need for options; use the default options
    });
    toastList.forEach(toast => toast.show()); // This show them
  });
  /* Menu */
  $('button.navbar-toggler').click(function(event) {
    var verif = $('.navbar-collapse').attr('data-show');
    if (verif == 'show_menu') {
      $('.navbar-collapse').attr('data-show', 'hide_menu');
    } else if (verif == 'hide_menu') {
      $('.navbar-collapse').attr('data-show', 'show_menu');
    }
  });
  $('.buscargames').click(function(event) {
    $('.navbar-collapse').attr('data-show', 'hide_menu');
    $('.navbar-collapse').removeClass('show');

    // Show Search
    $('.search_div').css({
      'transition': '0.2s all',
      'height': '80px',
      'overflow': 'visible'
    });

    $('.inputsearch input').css({
      'transition': '0.2s all',
      'height': '80px'
    });
  });

  $('.close_search').click(function(event) {
    $('.search_div').css({
      'transition': '0.2s all',
      'height': '0px',
      'overflow': 'hidden'
    });

    $('.inputsearch input').css({
      'transition': '0.2s all',
      'height': '0'
    });
  });

  $(".navbar_menu .navbar-collapse").hover(function() {

  }, function() {
    var getattr = $(this).attr('data-show');
    if (getattr == "show_menu") {
      $('button.navbar-toggler').click();
    }
  });

  /* Open link */
  function linkopen(url) {
    $('.linkapp').attr('href', url);
    $('.linkapp').click();
  }
});
