'use strict';

const brancaService = require('services/branca.service');
const uploadService = require('services/upload.service');
const express = require('express');
const router = express.Router();

// routes
router.get('',getAll);
router.post('/insert', insert);
router.post('/insertUpload', insertUpload);
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

function insertUpload(req, res) {
  if(req.files && req.files.imgFile) {
    uploadService.insert(req.files.imgFile).then(function (newImage) {
      req.body.imgPath = newImage;
      insert(req, res);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
  } else {
    insert(req, res);
  }
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
