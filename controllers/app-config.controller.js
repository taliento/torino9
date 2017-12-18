/* jshint node: true */
'use strict';

const express = require('express');
const router = express.Router();
const appConfigService = require('services/app-config.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.delete('/:_id', _delete); //test only
module.exports = router;

function insert(req, res) {
  appConfigService.create(req.app.locals.db, req.body)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function get(req, res) {
  appConfigService.get(req.app.locals.db)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  appConfigService.delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}
