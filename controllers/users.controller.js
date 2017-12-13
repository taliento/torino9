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
  userService.authenticate(req.body.username, req.body.password)
  .then(function(user) {
    if (user) {
      // authentication successful
      res.send(user);
    } else {
      // authentication failed
      res.status(401).send('Username or password is incorrect');
    }
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function register(req, res) {
  userService.create(req.body)
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
        register(req, res);
      }).catch(function(err) {
        console.log("imgurService.upload error " + err.message);
        res.status(400).send(err);
      });
    })
    .catch(function(err) {
      console.error("uploadService error: " + err.message);
      res.status(400).send(err);
    });
  } else {
    register(req, res);
  }
}

function insertTest(req, res) {
  userService.create(req.body)
  .then(function(doc) {
    res.send(doc);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getAll(req, res) {
  userService.getAll()
  .then(function(users) {
    res.send(users);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getById(req, res) {
  userService.getById(req.params._id)
  .then(function(user) {
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function update(req, res) {
  userService.update(req.params._id, req.body)
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
      console.log("uploadService.update error " + err.message);
      res.status(400).send(err);
    });
  } else {
    update(req, res);
  }
}

function _delete(req, res) {
  userService.delete(req.params._id)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function count(req, res) {
  userService.count()
  .then(function(_count) {
    res.send(_count);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getPaged(req, res) {
  userService.getPaged(req.params.limit, req.params.page, req.params.size)
  .then(function(_user) {
    res.send(_user);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}
