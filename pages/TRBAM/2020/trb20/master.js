$(document).ready(function() {
  $('.navbar-collapse a').click(function() {
    $(".navbar-collapse").collapse('hide');
    $('div#hamburger').removeClass('open');
  });
  $('a').click(function() {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000);
    return false;
  });
  $('nav button').on('click', function() {
    $('div#hamburger').toggleClass('open');
  });
});
