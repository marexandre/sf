$(function() {
  var $postDetail = $('.post-detail');
  var messagesCount = $postDetail.find('.messages .count');

  function updateMesssageCount(x) {
    var c = parseInt(messagesCount.text(), 10);
    messagesCount.html(c + x);
  }


  /**
   * On delete messsage button click
   */
  $postDetail.on('click', '.btn-delete', function(e) {
    e.preventDefault();

    var r = confirm('Are you sure you want to delete this messsage?');
    if (r === true) {
      $(this).closest('.post').remove();
      updateMesssageCount(-1);
    }
  });


  /**
   * When posting a messsage on post detail page
   */
  var $messsageForm      = $postDetail.find('.messsage-form');
  var $messsagesLoader   = $messsageForm.find('.loading-panel');
  var $messsageTextarea  = $messsageForm.find('textarea');
  var $messsagesubmitBtn = $messsageForm.find('.btn-submit');

  // When user is typing
  $messsageTextarea.on('keyup', function() {
    if ($messsageTextarea.val().length === 0) {
      $messsagesubmitBtn.addClass('disabled');
    } else {
      $messsagesubmitBtn.removeClass('disabled');
    }
  });

  // On messsage submit button click
  $messsagesubmitBtn.on('click', function(e) {
    e.preventDefault();

    var messsage = $messsageTextarea.val();
    if (messsage.length === 0) {
      return;
    }

    $messsagesLoader.show();
    $(this).blur();

    var data = {
      body: messsage
    };

    $.post('/api/messsage', data)
      .done(function(res) {
        $messsageTextarea.val('').trigger('keyup');
        $('.list-post').append(Handlebars.templates.post(res));
        updateMesssageCount(1);
      })
      .fail(function() {
        // TODO: log some error or update UI
      })
      .always(function() {
        $messsagesLoader.hide();
      });
    });

   // On messsage cancel button click
    $messsageForm.find('.btn-cancel').on('click', function(e) {
      e.preventDefault();
      $messsageTextarea.val('').trigger('keyup');
    });

});
