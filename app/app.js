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
  var forumID = parseInt(req.params.forum_id, 10);
  var title = '';
  var imax = 10;

  switch (forumID) {
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

// GET /post/:post_id
exports.post = function(req, res) {
  var postID = parseInt(req.params.post_id, 10);

  postID = 1;
  var post = require(appRoot + '/data/post_'+ postID +'.json');

  res.render('post', {
    title: 'Category Name',
    post: post
  });
};


// GET /create
exports.create = function(req, res) {
  res.render('post_create', {
    title: 'Category Name'
  });

};

