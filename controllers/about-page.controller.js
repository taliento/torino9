/* jshint node: true */
'use strict';

const express = require('express');
const router = express.Router();
const aboutService = require('services/about-page.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.get('/get/:_id', getById); //test only
router.delete('/:_id', _delete); //test only
module.exports = router;

function insert(req, res) {
  aboutService.create(req.app.locals.db, req.body)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function get(req, res) {
  aboutService.get(req.app.locals.db)
    .then((about) => {
      res.send(about);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getById(req, res) {
  aboutService.getById(req.app.locals.db, req.params._id)
    .then((about) => {
      res.send(about);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  aboutService.delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}
