$(function() {
  'use strict';

  var $form = $('form');
  var $messsageTextarea  = $form.find('textarea');
  var $messsagesubmitBtn = $form.find('.btn-submit');

  // When user is typing
  $messsageTextarea.on('keyup', function() {
    if ($messsageTextarea.val().length === 0) {
      $messsagesubmitBtn.addClass('disabled');
    } else {
      $messsagesubmitBtn.removeClass('disabled');
    }
  });

});
