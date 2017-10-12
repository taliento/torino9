'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var caledarService = require('services/calendar.service');

// routes
router.post('/insert', insert);
router.get('/month/:month/:year', getMonthEvents);
router.get('/', getAll);
router.get('/get/:_id', get);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;


function insert(req, res) {
    caledarService.create(req.body)
        .then(function (doc) {
            res.send(doc);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    caledarService.getAll()
        .then(function (events) {
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getMonthEvents(req, res) {
    caledarService.getMonthEvents(req.params.month, req.params.year)
        .then(function (events) {
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function get(req, res) {
    caledarService.getById(req.params._id)
        .then(function (events) {
            if (events) {
                res.send(events);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    caledarService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    caledarService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
