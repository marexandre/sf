$(function() {
  'use strict';

  var fileTypeRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
  var $attachments = $('#attachments');

  /**
   * On add photo button click, add add image preview
   */
  $('.btn-add-photo').on('click', function(e) {
    e.preventDefault();
    $('#fileUpload').click();
  });

  $('#fileUpload').on('change', function() {

    if (typeof (FileReader) === 'undefined') {
      console.log('This browser does not support FileReader.');
    }

    var _onLoad = function(e) {
      var img = document.createElement('img');
      img.setAttribute('src', e.target.result);
      img.setAttribute('alt', 'Attachment preview');
      $attachments.append(img);
    };

    var $this = $(this);
    var imax = $(this)[0].files.length;
    for (var i = 0; i < imax; i++) {
      var file = $this[0].files[i];
      if (!fileTypeRegex.test(file.name.toLowerCase())) {
        alert(file.name +' is not image file. Please select only images.');
        return false;
      }

      var reader = new FileReader();
      reader.onload = _onLoad;
      reader.readAsDataURL(file);
    }
    $attachments.show();
  });

});
