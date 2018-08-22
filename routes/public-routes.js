const publicRoutes = [
  //public app routes
  "/login",
  "/mainlayout/home",
  "/mainlayout/news/list",
  "/mainlayout/calendar",
  "/mainlayout/about",
  "/mainlayout/contact",
  "/mainlayout/admin/tabs",
  /^\/mainlayout\/page\/.*/,
  /^\/mainlayout\/branca\/.*/,

  //public folders
  /^\/public\/.*/,
  /^\/public\/img\/.*/,

  //public api routes
  "/api/news/archivesDate",
  "/api/users/authenticate",
  "/api/users/googleAuthenticate",
  "/api/users/getOauthUrl",
  "/api/users/register",
  "/api/news",
  "/api/page",
  /^\/api\/page\/get\/.*/,
  /^\/api\/news\/count\/.*/,
  /^\/api\/news\/get\/.*/,
  /^\/api\/news\/paged\/.*/,
  "/api/carousel",
  "/api/carousel/count",
  /^\/api\/carousel\/get\/.*/,
  /^\/api\/carousel\/paged\/.*/,
  "/api/calendar",
  /^\/api\/calendar\/month\/.*/,
  /^\/api\/calendar\/get\/.*/,
  "/api/featurette",
  "/api/featurette/count",
  /^\/api\/featurette\/get\/.*/,
  /^\/api\/featurette\/paged\/.*/,
  "/api/about",
  /^\/api\/about\/get\/.*/,
  "/api/contact",
  /^\/api\/contact\/get\/.*/,
  "/api/branca",
  /^\/api\/branca\/get\/.*/,
  "/api/config"
];

module.exports = publicRoutes;
