/* jshint node: true */
'use strict';

const userService = require('services/user.service');
const uploadService = require('services/upload.service');
const imgurService = require('services/imgur.service');
const express = require('express');
const router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/insertUpload', insertUpload);
router.post('/insertTest', insertTest);
router.get('/count', count);
router.get('/', getAll);
router.get('/paged/:limit/:page/:size', getPaged);
router.put('/:_id', update);
router.post('/updateUpload', updateUpload);
router.get('/:_id', getById);
router.delete('/:_id', _delete);
module.exports = router;

function authenticate(req, res) {
  userService.authenticate(
    req.app.locals.db, req.body.username, req.body.password)
    .then((user) => {
      if (user) {
        // authentication successful
        res.send(user);
      } else {
        // authentication failed
        res.status(401).send('Username or password is incorrect');
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function register(req, res) {
  userService.create(req.app.locals.db, req.body)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function insertUpload(req, res) {
  if (req.files && req.files.imgFile) {
    uploadService.insert(req.files.imgFile).then((newImage) => {
        imgurService.upload(newImage).then((_imgPath) => { //upload to imgur
          req.body.imgPath = _imgPath;
          register(req, res);
        }).catch((err) => {
          console.log("imgurService.upload error " + err.message);
          res.status(400).send(err);
        });
      })
      .catch((err) => {
        console.error("uploadService error: " + err.message);
        res.status(400).send(err);
      });
  } else {
    register(req, res);
  }
}

function insertTest(req, res) {
  userService.create(req.app.locals.db, req.body)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  userService.getAll(req.app.locals.db)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getById(req, res) {
  userService.getById(req.app.locals.db, req.params._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function update(req, res) {
  userService.update(req.app.locals.db, req.params._id, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function updateUpload(req, res) {

  req.params._id = req.body._id; //XXX
  if (req.files && req.files.imgFile) {
    uploadService.update(req.files.imgFile, req.body.imgPath)
      .then((newImage) => {
        imgurService.upload(newImage).then((_imgPath) => { //upload to imgur
          req.body.imgPath = _imgPath;
          update(req, res);
        }).catch((err) => {
          console.log("imgurService.upload error " + err.message);
          res.status(400).send(err);
        });

      })
      .catch((err) => {
        console.log("uploadService.update error " + err.message);
        res.status(400).send(err);
      });
  } else {
    update(req, res);
  }
}

function _delete(req, res) {
  userService.delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function count(req, res) {
  userService.count(req.app.locals.db)
    .then((_count) => {
      res.send(_count+"");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getPaged(req, res) {
  userService.getPaged(
    req.app.locals.db, req.params.limit, req.params.page, req.params.size)
    .then((_user) => {
      res.send(_user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}
