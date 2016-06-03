(function (app) {
  'use strict';

  app.registerModule('cvs', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('cvs.services');
  app.registerModule('cvs.routes', ['ui.router', 'core.routes', 'cvs.services']);
}(ApplicationConfiguration));
