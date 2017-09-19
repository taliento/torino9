'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var carouselService = require('services/carousel.service');

// routes
router.post('/insert', insert);
router.get('/', getAll);
router.get('/count', count);
router.get('/:_id', get);
router.get('/:limit/:page/:size', getPaged);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;


function insert(req, res) {
    carouselService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    carouselService.getAll()
        .then(function (_carouselItem) {
            res.send(_carouselItem);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function count(req, res) {
  carouselService.count()
      .then(function (_count) {
          res.send(_count);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function getPaged(req, res) {
  carouselService.getPaged(req.params.limit, req.params.page, req.params.size)
        .then(function (_carouselItem) {
            res.send(_carouselItem);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function get(req, res) {
    carouselService.getById(req.params._id)
        .then(function (_carouselItem) {
            if (_carouselItem) {
                res.send(_carouselItem);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    carouselService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    carouselService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
