'use strict';

const express = require('express');
const router = express.Router();
const featuretteService = require('services/featurette.service');

// routes
router.post('/insert', insert);
router.get('/', getAll);
router.get('/count', count);
router.get('/get/:_id', get);
router.get('/paged/:limit/:page/:size', getPaged);
router.put('/:_id', update);
router.delete('/:_id', _delete);
module.exports = router;

function insert(req, res) {
  featuretteService.create(req.body)
  .then(function (doc) {
    res.send(doc);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function getAll(req, res) {
  featuretteService.getAll()
  .then(function (_featurette) {
    res.send(_featurette);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function count(req, res) {
  featuretteService.count()
  .then(function (_count) {
    res.send(_count);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function getPaged(req, res) {
  featuretteService.getPaged(req.params.limit, req.params.page, req.params.size)
  .then(function (_featurette) {
    res.send(_featurette);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function get(req, res) {
  featuretteService.getById(req.params._id)
  .then(function (featurette) {
    if (featurette) {
      res.send(featurette);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function update(req, res) {
  featuretteService.update(req.params._id, req.body)
  .then(function () {
    res.sendStatus(200);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function _delete(req, res) {
  featuretteService.delete(req.params._id)
  .then(function () {
    res.sendStatus(200);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}
