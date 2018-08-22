/* jshint node: true */
"use strict";

const brancaService = require("services/branca.service");
const uploadService = require("services/upload.service");
const imgurService = require("services/imgur.service");
const express = require("express");
const router = express.Router();

// routes
router.get("", getAll);
router.post("/insert", insert);
router.post("/insertUpload", insertUpload);
router.get("/get/:_id", get);
router.delete("/:_id", _delete);
module.exports = router;

function getAll(req, res) {
  brancaService
    .getAll(req.app.locals.db)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function get(req, res) {
  brancaService
    .get(req.app.locals.db, req.params._id)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function insert(req, res) {
  brancaService
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

function _delete(req, res) {
  brancaService
    .delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}
