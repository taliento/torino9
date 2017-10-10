'use strict';

var config = require('config.json');
var express = require('express');
var router = express.Router();
var brancaService = require('services/branca.service');

// routes
router.get('/:_id', get);

module.exports = router;


function get(req, res) {
    brancaService.get(req.params._id)
        .then(function (about) {
            res.send(about);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
