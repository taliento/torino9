'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var brancaService = require('services/branca.service');

// routes
router.get('',getAll);
router.post('/insert', insert);
router.get('/get/:_id', get);
router.delete('/:_id', _delete);

module.exports = router;

function getAll(req, res) {
  brancaService.getAll()
      .then(function (doc) {
          res.send(doc);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function get(req, res) {
    brancaService.get(req.params._id)
        .then(function (doc) {
            res.send(doc);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function insert(req, res) {
    brancaService.create(req.body)
        .then(function (doc) {
            res.send(doc);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    brancaService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
