'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var brancaService = require('services/branca.service');

// routes
router.get('',getAll);
router.get('/get/:_id', get);

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
