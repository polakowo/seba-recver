(function (app) {
  'use strict';

  app.registerModule('premium', ['core']);
  app.registerModule('premium.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
