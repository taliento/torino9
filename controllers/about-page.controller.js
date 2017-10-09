'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var aboutService = require('services/about-page.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.put('/:_id', update);

module.exports = router;


function insert(req, res) {
    aboutService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function get(req, res) {
    aboutService.get()
        .then(function (events) {
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    aboutService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
