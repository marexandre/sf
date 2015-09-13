$(function() {
  var $loader = $('#ajax-loader');


  /**
   * On kudos button click, update the cont by the button,
   * and if it's the post detail page update the count in the post meta
   */
  $('.btn-kudo').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $kudos = $this.find('.icon-kudo');
    var $count = $this.find('.count');
    var d = 1;

    if ($kudos.hasClass('icon-orange')) {
      $kudos
        .removeClass('icon-orange')
        .addClass('icon-dark');

      d = -1;
    } else {
      $kudos
        .removeClass('icon-dark')
        .addClass('icon-orange');

      d = 1;
    }

    $count.html(parseInt($count.text(), 10) + d);
  });


  var $ajaxRequest = null;
  $('.forum .nav-tabs li').on('click', function(e) {
    e.preventDefault();

    if ($ajaxRequest) {
      $ajaxRequest.abort();
    }

    var $this = $(this);
    var forumType = $this.data('forum-type');

    $this.addClass('active').siblings().removeClass('active');

    $loader.show();

    $ajaxRequest = $.get('/api/getForum/'+ forumType, function(res) {
      $ajaxRequest = null;
      $loader.hide();
      $('#category-list').html(Handlebars.templates.category_list({data: res}));
    });
  });

});
