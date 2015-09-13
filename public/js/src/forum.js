$(function() {

  /**
   * When tabs clicked on forum top page, update the forum list
   */
  var $ajaxRequest = null;
  var $forumLoader = $('#ajax-loader');
  $('.forum .nav-tabs li').on('click', function(e) {
    e.preventDefault();

    if ($ajaxRequest) {
      $ajaxRequest.abort();
    }

    var $this = $(this);
    var forumType = $this.data('forum-type');

    $this.addClass('active').siblings().removeClass('active');

    $forumLoader.show();

    $ajaxRequest = $.get('/api/getForum/'+ forumType)
      .done(function(res) {
        $('#category-list').html(Handlebars.templates.category_list({data: res}));
      })
      .fail(function() {
        // TODO: log some error or update UI
      })
      .always(function() {
        $forumLoader.hide();
        $ajaxRequest = null;
      });
  });

});
