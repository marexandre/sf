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
  var imax = 6;

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
    default:
      title = 'Forum Rules';
      imax = 10;
      forumID = 1;
      break;
  }

  req.session.post_title = title;
  req.session.forum_id = forumID;

  var tmpList = [];
  for (var i = 0; i < imax; i++) {
    tmpList.push(postList[i % 3]);
  }

  res.render('post_list', {
    title: title,
    data: tmpList
  });
};

// GET /post/:post_id
exports.post = function(req, res) {
  var postID = parseInt(req.params.post_id, 10);
  var post;

  switch (postID) {
    case 1:
    case 2:
    case 3:
      post = require(appRoot + '/data/post_'+ postID +'.json');
      break;
    default:
      post = require(appRoot + '/data/post_1.json');
  }

  var title = 'Category Name';
  var forum_id = 1;
  if (req.session.post_title) {
    title = req.session.post_title;
  }
  if (req.session.forum_id) {
    forum_id = req.session.forum_id;
  }

  res.render('post', {
    title: title,
    forum_id: forum_id,
    post: post
  });
};


// GET /create
exports.create = function(req, res) {
  var title = 'Category Name';
  var forum_id = 1;
  if (req.session.post_title) {
    title = req.session.post_title;
    forum_id = req.session.forum_id;
  }
  if (req.session.forum_id) {
    forum_id = req.session.forum_id;
  }

  res.render('post_create', {
    title: title,
    forum_id: forum_id
  });

};

