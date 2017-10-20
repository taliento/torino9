'use strict';

const config = require('config.json');
const express = require('express');
const router = express.Router();
const newsService = require('services/news.service');

// routes
router.post('/insert', insert);
router.get('/', getAll);
router.get('/count', count);
router.get('/get/:_id', get);
router.get('/paged/:limit/:page/:size', getPaged);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;


function insert(req, res) {
    newsService.create(req.body)
        .then(function (doc) {
            res.send(doc);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    newsService.getAll()
        .then(function (_news) {
            res.send(_news);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function count(req, res) {
  newsService.count()
      .then(function (_count) {
          res.send(_count);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function getPaged(req, res) {
  newsService.getPaged(req.params.limit, req.params.page, req.params.size)
        .then(function (_news) {
            res.send(_news);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function get(req, res) {
    newsService.getById(req.params._id)
        .then(function (news) {
            if (news) {
                res.send(news);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    newsService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    newsService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
