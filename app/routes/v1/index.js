'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');

// Utils
var getUserFromToken = require('../../utils/getUserFromToken');
var auth = require('../../utils/auth');
var hasRole = require('../../utils/roleMiddleware');

// Routes
var authenticate = require('./authenticate');
var users = require('./users');
var me = require('./me');
var roles = require('./roles');
var forgot = require('./forgot');

var hooks = require('./hooks');
var merchants = require('./merchants');




router.use(cors());

router.use('/authenticate', authenticate);
router.use('/me', auth, me);
router.use('/roles', roles);
router.use('/forgot', forgot);
router.use('/users', users); 


router.use('/hooks', getUserFromToken, hooks); 
router.use('/merchants', merchants); 


module.exports = router;