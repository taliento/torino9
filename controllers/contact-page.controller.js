'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var contactService = require('services/contact-page.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.put('/:_id', update);

module.exports = router;


function insert(req, res) {
    contactService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function get(req, res) {
    contactService.get()
        .then(function (contact) {
            res.send(contact);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    contactService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
