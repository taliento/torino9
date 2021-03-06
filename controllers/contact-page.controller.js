/* jshint node: true */
"use strict";

const express = require("express");
const router = express.Router();
const contactService = require("services/contact-page.service");

// routes
router.post("/insert", insert);
router.get("/", get);
router.get("/get/:_id", getById); //test only
router.delete("/:_id", _delete); //test only
module.exports = router;

function insert(req, res) {
  contactService
    .create(req.app.locals.db, req.body)
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function get(req, res) {
  contactService
    .get(req.app.locals.db)
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function getById(req, res) {
  contactService
    .getById(req.app.locals.db, req.params._id)
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  contactService
    .delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}
