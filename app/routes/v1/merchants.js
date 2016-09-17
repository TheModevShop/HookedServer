'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Utils
var auth = require('../../utils/auth');

// Models
var Roles// = require('../../models/roles');
var Merchants = require('../../controllers/merchants');

router.route('/')
  .post(function(req, res) {
    Merchants.add(req.body)
    .then(function(userAdded) {
      res.json(userAdded);
    })
    .catch(function(err) {
      console.log(err)
      res.status(422).json(err)
    })
  })
  .get(function(req, res) {
    Merchants.getAll(req.query.limit, req.query.offset)
      .then(function(users) {
        res.json(users);
      })
  });

router.route('/:id')
  .get(function(req, res) {
    Merchants.getById(req.params.id)
      .then(function(user) {
        res.json(user);
      });
  })
  .put(function(req, res) {
    Merchants.updateById(req.params.id, req.body)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });




module.exports = router;
