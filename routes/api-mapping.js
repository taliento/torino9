const apiMapping = [
  {
    endpoint: '/api/users',
    controller: './controllers/users.controller'
  },
  {
    endpoint: '/api/news',
    controller: './controllers/news.controller'
  },
  {
    endpoint: '/api/calendar',
    controller: './controllers/calendar.controller'
  },
  {
    endpoint: '/api/carousel',
    controller: './controllers/carousel.controller'
  },
  {
    endpoint: '/api/featurette',
    controller: './controllers/featurette.controller'
  },
  {
    endpoint: '/api/about',
    controller: './controllers/about-page.controller'
  },
  {
    endpoint: '/api/contact',
    controller: './controllers/contact-page.controller'
  },
  {
    endpoint: '/api/page',
    controller: './controllers/custom-page.controller'
  },
  {
    endpoint: '/api/branca',
    controller: './controllers/branca.controller'
  },
  {
    endpoint: '/api/download',
    controller: './controllers/download.controller'
  },
  {
    endpoint: '/api/config',
    controller: './controllers/app-config.controller'
  }
];

module.exports = apiMapping;
