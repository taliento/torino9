const mongo = require('mongoskin');
//db connection
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('about');
db.bind('config');
db.bind('branca');
db.bind('calendar');
db.bind('carousel');
db.bind('contact');
db.bind('page');
db.bind('featurette');
db.bind('news');
db.bind('users');
module.exports = db;
