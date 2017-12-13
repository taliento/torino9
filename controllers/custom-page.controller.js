/* jshint node: true */
'use strict';

const express = require('express');
const imgurService = require('services/imgur.service');
const uploadService = require('services/upload.service');
const router = express.Router();
const pageService = require('services/custom-page.service');

// routes
router.post('/insert', insert);
router.post('/insertUpload', insertUpload);
router.get('/', get);
router.put('/:_id', update);
router.post('/updateUpload', updateUpload);
router.get('/get/:_id', getById);//test only

router.delete('/:_id', _delete);
module.exports = router;

function insert(req, res) {
  pageService.create(req.body)
  .then(function(page) {
    res.send(page);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function insertUpload(req, res) {
  if (req.files && req.files.imgFile) {
    uploadService.insert(req.files.imgFile).then(function(newImage) {
      imgurService.upload(newImage).then(function(_imgPath) {//upload to imgur
        req.body.imgPath = _imgPath;
        insert(req, res);
      }).catch(function(err) {
        console.log("imgurService.upload error " + err.message);
        res.status(400).send(err);
      });
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
  } else {
    insert(req, res);
  }
}

function update(req, res) {
  pageService.update(req.params._id, req.body)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function updateUpload(req, res) {
  req.params._id = req.body._id;//XXX
  if (req.files && req.files.imgFile) {
    uploadService.update(req.files.imgFile, req.body.imgPath).then(function(newImage) {
      imgurService.upload(newImage).then(function(_imgPath) {//upload to imgur
        req.body.imgPath = _imgPath;
        update(req, res);
      }).catch(function(err) {
        console.log("imgurService.upload error " + err.message);
        res.status(400).send(err);
      });
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
  } else {
    update(req, res);
  }
}

function get(req, res) {
  pageService.get()
  .then(function(pages) {
    res.send(pages);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getById(req, res) {
  pageService.getById(req.params._id)
  .then(function(page) {
    res.send(page);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function _delete(req, res) {
  pageService.delete(req.params._id)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}
