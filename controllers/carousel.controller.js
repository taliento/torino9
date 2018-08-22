/* jshint node: true */
"use strict";

const carouselService = require("services/carousel.service");
const imgurService = require("services/imgur.service");
const uploadService = require("services/upload.service");
const express = require("express");
const router = express.Router();

// routes
router.post("/insert", insert);
router.post("/insertUpload", insertUpload);
router.get("/", getAll);
router.get("/count", count);
router.get("/get/:_id", get);
router.get("/paged/:limit/:page/:size", getPaged);
router.put("/:_id", update);
router.post("/updateUpload", updateUpload);
router.delete("/:_id", _delete);
module.exports = router;

function insert(req, res) {
  carouselService
    .create(req.app.locals.db, req.body)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function insertUpload(req, res) {
  if (req.files && req.files.imgFile) {
    uploadService
      .insert(req.files.imgFile)
      .then(newImage => {
        imgurService
          .upload(newImage)
          .then(_imgPath => {
            //upload to imgur
            req.body.imgPath = _imgPath;
            insert(req, res);
          })
          .catch(err => {
            console.log("imgurService.upload error " + err.message);
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  } else {
    insert(req, res);
  }
}

function getAll(req, res) {
  carouselService
    .getAll(req.app.locals.db)
    .then(_carouselItem => {
      res.send(_carouselItem);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function count(req, res) {
  carouselService
    .count(req.app.locals.db)
    .then(_count => {
      res.send(_count + "");
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function getPaged(req, res) {
  carouselService
    .getPaged(
      req.app.locals.db,
      req.params.limit,
      req.params.page,
      req.params.size
    )
    .then(_carouselItem => {
      res.send(_carouselItem);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function get(req, res) {
  carouselService
    .getById(req.app.locals.db, req.params._id)
    .then(_carouselItem => {
      if (_carouselItem) {
        res.send(_carouselItem);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function update(req, res) {
  carouselService
    .update(req.app.locals.db, req.params._id, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function updateUpload(req, res) {
  req.params._id = req.body._id; //XXX
  if (req.files && req.files.imgFile) {
    uploadService
      .update(req.files.imgFile, req.body.imgPath)
      .then(newImage => {
        imgurService
          .upload(newImage)
          .then(_imgPath => {
            //upload to imgur
            req.body.imgPath = _imgPath;
            update(req, res);
          })
          .catch(err => {
            console.log("imgurService.upload error " + err.message);
            res.status(400).send(err);
          });
      })
      .catch(err => {
        console.log("uploadService.upload error " + err.message);
        res.status(400).send(err);
      });
  } else {
    update(req, res);
  }
}

function _delete(req, res) {
  carouselService
    .getById(req.app.locals.db, req.params._id)
    .then(_carouselItem => {
      if (_carouselItem) {
        uploadService
          ._delete(__dirname + "/.." + _carouselItem.imgPath)
          .then(() => {
            _deleteSlide(req, res);
          })
          .catch(err => {
            res.status(400).send(err);
          });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function _deleteSlide(req, res) {
  carouselService
    .delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}
