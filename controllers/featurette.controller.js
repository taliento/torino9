'use strict';

const featuretteService = require('services/featurette.service');
const imgurService = require('services/imgur.service');
const uploadService = require('services/upload.service');
const express = require('express');
const router = express.Router();

// routes
router.post('/insert', insert);
router.post('/insertUpload', insertUpload);
router.get('/', getAll);
router.get('/count', count);
router.get('/get/:_id', get);
router.get('/paged/:limit/:page/:size', getPaged);
router.put('/:_id', update);
router.post('/updateUpload', updateUpload);
router.delete('/:_id', _delete);
module.exports = router;

function insert(req, res) {
  featuretteService.create(req.body)
  .then(function(doc) {
    res.send(doc);
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

function getAll(req, res) {
  featuretteService.getAll()
  .then(function(_featurette) {
    res.send(_featurette);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function count(req, res) {
  featuretteService.count()
  .then(function(_count) {
    res.send(_count);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getPaged(req, res) {
  featuretteService.getPaged(req.params.limit, req.params.page, req.params.size)
  .then(function(_featurette) {
    res.send(_featurette);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function get(req, res) {
  featuretteService.getById(req.params._id)
  .then(function(featurette) {
    if (featurette) {
      res.send(featurette);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function update(req, res) {
  featuretteService.update(req.params._id, req.body)
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

function _delete(req, res) {
  featuretteService.delete(req.params._id)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}
