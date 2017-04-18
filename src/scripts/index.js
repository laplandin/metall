(function() {
  $('.js-scroll').on('click', function(ev) {
    ev.preventDefault();
    var substr = $(this).attr('href').substr(1);
    $('html, body').animate({
      scrollTop: $('[name='+ substr + ']').offset().top
    }, 500);
  });

  function getScrollWidth() {
    var div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollWidth;
  }


  var vWidth = $(window).width() + getScrollWidth();
  var offset = 0;
  var count = 0;

  $('.slide-left').on('click', function() {
    offset += vWidth;

    count -= 1;

    if (count < 0) {
      offset = -2*vWidth;
      count = 2;

      $('.slide-wrapper').css({
        'transform': 'translate(' + offset + 'px, 0)'
      });
      return;
    }

    $('.slide-wrapper').css({
      'transform': 'translate(' + offset + 'px, 0)'
    });


  });

  $('.slide-right').on('click', function() {
    offset -= vWidth;
    count += 1;
    if (count > 2) {
      offset = 0;
      count = 0;

      $('.slide-wrapper').css({
        'transform': 'translate(' + offset + 'px, 0)'
      });
      return;
    }


    $('.slide-wrapper').css({
      'transform': 'translate(' + offset + 'px, 0)'
    });
  });
}());
