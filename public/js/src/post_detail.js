$(function() {
  var $postDetail = $('.post-detail');
  var messagesCount = $postDetail.find('.messages .count');

  function addCommentCount() {
    var c = parseInt(messagesCount.text(), 10);
    messagesCount.html(c + 1);
  }
  function removeCommentCount() {
    var c = parseInt(messagesCount.text(), 10);
    messagesCount.html(c - 1);
  }


  /**
   * On delete comment button click
   */
  $postDetail.on('click', '.btn-delete', function(e) {
    e.preventDefault();

    var r = confirm('Are you sure you want to delete this comment?');
    if (r === true) {
      $(this).closest('.post').remove();
      removeCommentCount();
    }
  });


  /**
   * When posting a comment on post detail page
   */
  var $commentForm      = $postDetail.find('.comment-form');
  var $commentsLoader   = $commentForm.find('.loading-panel');
  var $commentTextarea  = $commentForm.find('textarea');
  var $commentsubmitBtn = $commentForm.find('.btn-submit');

  // When user is typing
  $commentTextarea.on('keyup', function() {
    if ($commentTextarea.val().length === 0) {
      $commentsubmitBtn.addClass('disabled');
    } else {
      $commentsubmitBtn.removeClass('disabled');
    }
  });

  // On comment submit button click
  $commentsubmitBtn.on('click', function(e) {
    e.preventDefault();

    var comment = $commentTextarea.val();
    if (comment.length === 0) {
      return;
    }

    $commentsLoader.show();
    $(this).blur();

    var data = {
      body: comment
    };

    $.post('/api/comment', data)
      .done(function(res) {
        $commentTextarea.val('').trigger('keyup');
        $('.list-post').append(Handlebars.templates.post(res));
        addCommentCount();
      })
      .fail(function() {
        // TODO: log some error or update UI
      })
      .always(function() {
        $commentsLoader.hide();
      });
    });

   // On comment cancel button click
    $commentForm.find('.btn-cancel').on('click', function(e) {
      e.preventDefault();
      $commentTextarea.val('').trigger('keyup');
    });

});
