/* jshint node: true */
'use strict';

const express = require('express');
const router = express.Router();
const newsService = require('services/news.service');

// routes
router.post('/insert', insert);
router.get('/', getAll);
router.get('/count/:date', count);
router.get('/get/:_id', get);
router.get('/paged/:limit/:page/:size/:date', getPaged);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/archivesDate',archivesDate);
module.exports = router;

function insert(req, res) {
  newsService.create(req.app.locals.db,req.body)
  .then(function(doc) {
    res.send(doc);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getAll(req, res) {
  newsService.getAll(req.app.locals.db)
  .then(function(_news) {
    res.send(_news);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function archivesDate(req, res) {
  newsService.archivesDate(req.app.locals.db)
  .then(function(dates) {
    res.send(dates);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function count(req, res) {
  newsService.count(req.app.locals.db,req.params.date)
  .then(function(_count) {
    res.send(_count);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getPaged(req, res) {
  newsService.getPaged(req.app.locals.db,req.params.limit, req.params.page, req.params.size, req.params.date)
  .then(function(_news) {
    res.send(_news);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function get(req, res) {
  newsService.getById(req.app.locals.db,req.params._id)
  .then(function(news) {
    if (news) {
      res.send(news);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function update(req, res) {
  newsService.update(req.app.locals.db,req.params._id, req.body)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function _delete(req, res) {
  newsService.delete(req.app.locals.db,req.params._id)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}
