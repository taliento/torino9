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


  app.route('/news')
    .get(newsController.getAll)
    .post(newsController.insert);

  app.route('/news/:id')
    .get(newsController.get)
    .put(newsController.update)
    .delete(newsController.delete);

  app.route('/news/:limit/:page/:size')
    .get(newsController.getPaged):

  app.route('/news/count')
    .get(newsController.count);
};
