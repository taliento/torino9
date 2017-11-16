'use strict';

const express = require('express');
const router = express.Router();
const appConfigService = require('services/app-config.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.delete('/:_id', _delete);//test only
module.exports = router;

function insert(req, res) {
  appConfigService.create(req.body)
  .then(function(doc) {
    res.send(doc);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function get(req, res) {
  appConfigService.get()
  .then(function(doc) {
    res.send(doc);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function _delete(req, res) {
  appConfigService.delete(req.params._id)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}
