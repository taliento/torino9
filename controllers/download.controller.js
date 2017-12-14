/* jshint node: true */
'use strict';

const downloadService = require('services/download.service');
const express = require('express');
const router = express.Router();

router.get('/downloadAll', downloadAll);
router.post('/uploadAll',uploadAll);
module.exports = router;

function downloadAll(req, res) {
  downloadService.downloadAll()
  .then(() => {
    res.download(__dirname + '/../public/images.zip');
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}

function uploadAll(req, res) {
  if (req.files && req.files.imgFile) {
    downloadService.uploadAll(req.files.imgFile)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
}
