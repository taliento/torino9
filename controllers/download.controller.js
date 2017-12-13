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
  .then(function() {
    res.download(__dirname + '/../public/images.zip');
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function uploadAll(req, res) {
  if (req.files && req.files.imgFile) {
    downloadService.uploadAll(req.files.imgFile)
    .then(function(){
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
  }
}
