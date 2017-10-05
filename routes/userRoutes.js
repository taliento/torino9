'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');
  var newsController = require('../controllers/newsController');

  app.route('/users')
    .get(userController.getAll)
    .post(userController.insert);

  app.route('/users/:userId')
    .get(userController.get)
    .put(userController.update)
    .delete(userController.delete);
};
