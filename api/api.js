'use strict';

// GET /
exports.ping = function(req, res) {
  res.json({data: 'pong'});
};

// GET /getForum/:forum_type
var forumActiveList = require(appRoot + '/data/forum_active.json');
exports.getForum = function(req, res) {
  var type = req.params.forum_type;
  var data = [];

  switch (type) {
    case 'active':
      data = forumActiveList;
      break;
    // case 'kudos':
    // case 'archived':
    default:
      data = [];
  }

  res.json(data);
};


// POST /comment
var comment = require(appRoot + '/data/comment_1.json');
exports.postComment = function(req, res) {
  console.log(req.body);

  comment.date = new Date();
  comment.body = req.body.body;

  res.json(comment);
};
