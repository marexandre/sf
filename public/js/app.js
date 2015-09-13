$(function() {





  $('.btn-kudo').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $kudos = $this.find('.icon-kudo');
    var $count = $this.find('.count');
    var count = parseInt($count.text(), 10);

    if ($kudos.hasClass('icon-orange')) {
      $kudos.removeClass('icon-orange').addClass('icon-dark');
      $count.html(count - 1);
    } else {
      $kudos.removeClass('icon-dark').addClass('icon-orange');
      $count.html(count + 1);
    }
  });
});
