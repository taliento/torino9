'use strict';

const config = require('config.json');
const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const carouselService = require('services/carousel.service');
const path = require('path');
const fs = require('fs');

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

  if(req.files.imgFile) {//controllo se contiene file

    fs.unlink(__dirname + '/..' + req.body.imgPath, function(err) {//elimino vecchio file
      if (err) throw err;

      let imgFile = req.files.imgFile;
      const publicImgPath = '/public/img/';

      let imgPath = __dirname + '/..'+ publicImgPath + req.files.imgFile.name;

      imgFile.mv(imgPath, function(err) {
        if (err) {
          return res.status(500).send(err);
        }

        req.body.imgPath = publicImgPath + req.files.imgFile.name;
        //update slide
        update(req, res);
      });

    });

  } else {
    update(req, res);
  }

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
