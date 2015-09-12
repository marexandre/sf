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
  // var imax = Math.round(Math.random() * 16) + 1;
  var imax = 10;

  switch (parseInt(req.params.forum_id, 10)) {
    case 1:
      title = 'Forum Rules';
      imax = 10;
      break;
    case 2:
      title = 'Forum Announcements';
      imax = 4;
      break;
    case 3:
      title = 'Cycling Racing';
      imax = 12;
      break;
    case 4:
      title = 'Cycling Gear';
      imax = 14;
      break;
    case 5:
      title = 'Running Racing';
      imax = 9;
      break;
    case 6:
      title = 'Running Gear';
      imax = 8;
      break;
    case 7:
      title = 'Strava Climbing Challenge';
      imax = 10;
      break;
    case 8:
      title = 'Gran Fondo 120';
      imax = 10;
      break;
    case 9:
      title = 'The Rut Climbing Challenge';
      imax = 3;
      break;
  }

  var tmpList = [];
  for (var i = 0; i < imax; i++) {
    tmpList.push(postList[i % 2]);
  }

  res.render('category', {
    title: title,
    data: tmpList
  });
};
