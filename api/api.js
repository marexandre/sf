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


// POST /messsage
var messsage = require(appRoot + '/data/messsage_1.json');
exports.postMesssage = function(req, res) {
  console.log(req.body);

  messsage.date = new Date();
  messsage.body = req.body.body;

  res.json(messsage);
};
