/* jshint node: true */
"use strict";

/**
 * create a default user if not exists
 */

const userService = require("../services/user.service");
const user = {
  username: "test",
  password: "test",
  admin: true,
  imgPath: "assets/images/logo.svg"
};
const db = require("../datasource/mongoskin-datasource");

userService
  .count(db)
  .then(result => {
    if (result.count == 0) {
      // console.log("No user found");
      createDefaultUser();
    } else {
      // console.log(result.count + " users found");
      db.close();
      return;
    }
  })
  .catch(err => {
    console.log(err);
    db.close();
    return;
  });

function createDefaultUser() {
  console.log("I'm inserting " + JSON.stringify(user));

  userService
    .create(db, user)
    .then(doc => {
      console.log("Default user created!");
      db.close();
      return;
    })
    .catch(err => {
      console.log("Error while inserting default user: " + err);
      db.close();
      return;
    });
}
