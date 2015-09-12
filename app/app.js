'use strict';

var forumActiveList = require(appRoot + '/data/forum_active.json');
var postList = require(appRoot + '/data/post_list.json');

// GET /
exports.index = function(req, res) {
  res.render('index', {
    data: forumActiveList
  });
};

// GET /category/:forum_id
exports.category = function(req, res) {
  var title = '';

  switch (parseInt(req.params.forum_id, 10)) {
    case 1:
      title = 'Forum Rules';
      break;
    case 2:
      title = 'Forum Announcements';
      break;
    case 3:
      title = 'Cycling Racing';
      break;
    case 4:
      title = 'Cycling Gear';
      break;
    case 5:
      title = 'Running Racing';
      break;
    case 6:
      title = 'Running Gear';
      break;
    case 7:
      title = 'Strava Climbing Challenge';
      break;
    case 8:
      title = 'Gran Fondo 120';
      break;
    case 9:
      title = 'The Rut Climbing Challenge';
      break;
  }

  var tmpList = [];
  for (var i = 0; i < 16; i++) {
    tmpList.push(postList[i % 2]);
  }

  res.render('category', {
    title: title,
    data: tmpList
  });
};
