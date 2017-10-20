'use strict';

const config = require('config.json');
const express = require('express');
const router = express.Router();
const aboutService = require('services/about-page.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.get('/get/:_id', getById);//test only
router.delete('/:_id', _delete);//test only

module.exports = router;


function insert(req, res) {
    aboutService.create(req.body)
        .then(function (doc) {
            res.send(doc);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function get(req, res) {
    aboutService.get()
        .then(function (about) {
            res.send(about);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    aboutService.getById(req.params._id)
        .then(function (about) {
            res.send(about);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    aboutService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
