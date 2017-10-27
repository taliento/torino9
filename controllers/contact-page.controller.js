'use strict';

const express = require('express');
const router = express.Router();
const contactService = require('services/contact-page.service');

// routes
router.post('/insert', insert);
router.get('/', get);
router.get('/get/:_id', getById);//test only
router.delete('/:_id', _delete);//test only
module.exports = router;

function insert(req, res) {
  contactService.create(req.body)
  .then(function(contact) {
    res.send(contact);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function get(req, res) {
  contactService.get()
  .then(function(contact) {
    res.send(contact);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function getById(req, res) {
  contactService.getById(req.params._id)
  .then(function(contact) {
    res.send(contact);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}

function _delete(req, res) {
  contactService.delete(req.params._id)
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
}
