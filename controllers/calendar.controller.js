/* jshint node: true */
"use strict";

const express = require("express");
const router = express.Router();
const caledarService = require("services/calendar.service");

// routes
router.post("/insert", insert);
router.get("/month/:month/:year", getMonthEvents);
router.get("/", getAll);
router.get("/get/:_id", get);
router.put("/:_id", update);
router.delete("/:_id", _delete);
module.exports = router;

function insert(req, res) {
  caledarService
    .create(req.app.locals.db, req.body)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  caledarService
    .getAll(req.app.locals.db)
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function getMonthEvents(req, res) {
  caledarService
    .getMonthEvents(req.app.locals.db, req.params.month, req.params.year)
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function get(req, res) {
  caledarService
    .getById(req.app.locals.db, req.params._id)
    .then(events => {
      if (events) {
        res.send(events);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function update(req, res) {
  caledarService
    .update(req.app.locals.db, req.params._id, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  caledarService
    .delete(req.app.locals.db, req.params._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}
