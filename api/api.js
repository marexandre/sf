'use strict';

// GET /
exports.ping = function(req, res) {
  res.json({data: 'pong'});
};
