'use strict';

const config = require('config.json');
const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const carouselService = require('services/carousel.service');
const path = require('path');
const fs = require('fs');
const publicImgPath = '/public/img/';

// routes
router.post('/insert', insert);
router.post('/insertUpload', insertUpload);
router.get('/', getAll);
router.get('/count', count);
router.get('/get/:_id', get);
router.get('/paged/:limit/:page/:size', getPaged);
router.put('/:_id', update);
router.post('/carouselUpload', updateUpload);
router.delete('/:_id', _delete);

module.exports = router;

function insert(req, res) {
  carouselService.create(req.body)
  .then(function (doc) {
    res.send(doc);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function insertUpload(req, res) {
  if(req.files.imgFile) {
    let imgFile = req.files.imgFile;
    let imgPath = __dirname + '/..'+ publicImgPath + req.files.imgFile.name;
    imgFile.mv(imgPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      req.body.imgPath = publicImgPath + req.files.imgFile.name;
      insert(req, res);
    });
  } else {
    insert(req, res);
  }
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

function updateUpload(req, res) {
  req.params._id = req.body._id;//XXX
  if(req.files.imgFile) {
    var imageDir = __dirname + '/..' + req.body.imgPath;
    var imgFile = req.files.imgFile;
    var imgPath = __dirname + '/..'+ publicImgPath + req.files.imgFile.name;
    if (fs.existsSync(imageDir)) {
      fs.unlink(__dirname + '/..' + req.body.imgPath, function(err) {
        if (err) throw err;
        updateFile(imgFile, imgPath);
      });
    } else {
      updateFile(imgFile, imgPath);
    }
  } else {
    update(req, res);
  }
}

function updateFile(imgFile, imgPath) {
  imgFile.mv(imgPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    req.body.imgPath = publicImgPath + req.files.imgFile.name;
    update(req, res);
  });
}

function _delete(req, res) {
  carouselService.getById(req.params._id)
  .then(function (_carouselItem) {
    if (_carouselItem) {
      var imageDir = __dirname + '/..'+ _carouselItem.imgPath;
      if (fs.existsSync(imageDir)) {
        fs.unlink(imageDir, function(err) {
          if (err) console.log(err);
          _deleteSlide(req,res);
        });
      } else {
        _deleteSlide(req,res);
      }
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function (err) {
    res.status(400).send(err);
  })
}

function _deleteSlide(req, res) {
  carouselService.delete(req.params._id)
  .then(function () {
    res.sendStatus(200);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
}
