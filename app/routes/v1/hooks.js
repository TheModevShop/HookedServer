'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Utils
var auth = require('../../utils/auth');

// Models
var Roles// = require('../../models/roles');
var Users = require('../../controllers/users');
var Hooks = require('../../controllers/hooks');

router.route('/')
  .post(function(req, res) {
    Hooks.add(req.body)
    .then(function(hookeAdded) {
      res.json(hookeAdded);
    })
    .catch(function(err) {
      console.log(err)
      res.status(422).json(err)
    })
  })
  .get(function(req, res) {
    const position = {
      lat: req.headers.lat,
      lng: req.headers.lng
    }
    Hooks.getAll(req.query, position)
      .then(function(hooks) {
        // console.log(hooks)
        res.json(hooks);
      })
      .catch(function(err) {
        console.log(err)
        res.status(422).json(err);
      })
  });

router.route('/:id')
  .get(function(req, res) {
    const userId = _.get(req, 'decoded.user.id') || -1;
    const position = {
      lat: req.headers.lat,
      lng: req.headers.lng
    }
    Hooks.getById(req.params.id, req.query, position, userId)
      .then(function(hook) {
        if (hook && hook[0]) {
          res.json(hook[0]);
        } else {
          res.status(422).json(err);
        }
      })
      .catch(function(err) {
        console.log(err)
        res.status(422).json(err);
      });
  })
  .put(function(req, res) {
    Hooks.updateById(req.params.id, req.body)
      .then(function(hook) {
        res.json(hook);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });

router.route('/:id/redeem')
  .post(function(req, res) {
    const userId = _.get(req, 'decoded.user.id') || -1;
    const position = {
      lat: req.headers.lat,
      lng: req.headers.lng
    }
    Hooks.redeem(req.params.id, req.body, position, userId)
      .then(function(hook) {
        res.json(hook);
      })
      .catch(function(err) {
        res.status(404).json(err);
      });
  });



module.exports = router;
