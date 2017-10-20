'use strict';
var config = require('config.json');
var express = require('express');
const fileUpload = require('express-fileupload');
var router = express.Router();
var carouselService = require('services/carousel.service');
var path = require('path');

// routes
router.post('/insert', insert);
router.post('/insertUpload', insertUpload);
router.get('/', getAll);
router.get('/count', count);
router.get('/get/:_id', get);
router.get('/paged/:limit/:page/:size', getPaged);
router.put('/:_id', update);
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

  if(req.files.imgFile) {//controllo se contiene file
    // The name of the input field (i.e. "imgFile") is used to retrieve the uploaded file
    let imgFile = req.files.imgFile;
    const publicImgPath = '/public/img/';

    // Use the mv() method to place the file somewhere on your server
    let imgPath = __dirname + '/..'+ publicImgPath + req.files.imgFile.name;

    imgFile.mv(imgPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }

      req.body.imgPath = publicImgPath + req.files.imgFile.name;
      //insert slide
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

  //controllo se contiene fail

  //elimino vecchio

  //aggiungo nuovo

  //aggiorno record

  // The name of the input field (i.e. "imgFile") is used to retrieve the uploaded file
  let imgFile = req.files.imgFile;
  const publicImgPath = '/public/img/';

  // Use the mv() method to place the file somewhere on your server
  let imgPath = __dirname + '/..'+ publicImgPath + req.files.imgFile.name;

  imgFile.mv(imgPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    req.body.imgPath = publicImgPath + req.files.imgFile.name;
    //update slide
    carouselService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
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
