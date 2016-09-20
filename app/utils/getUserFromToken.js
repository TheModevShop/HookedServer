'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');


router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
      if (err) {
        req.decoded = {};
        next();
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    next();
  }
});

module.exports = router;
