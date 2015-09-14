/* jshint ignore:start */
require('./post_detail.js');
require('./forum.js');
require('./file_upload.js');
require('./form.js');
/* jshint ignore:end */

var helpers = require('../../../shared/js/helpers.js');
Handlebars.registerHelper(helpers.handlebarsHelpers);


$(function() {

  /**
   * On kudos button click, update the cont by the button,
   * and if it's the post detail page update the count in the post meta
   */
  $('.forum').on('click', '.btn-kudo', function(e) {
    e.preventDefault();

    // TODO: make an ajax call to api

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

});
