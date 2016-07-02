(function (app) {
  'use strict';

  // The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('workshops', ['core', 'ngYoutubeEmbed', 'uiGmapgoogle-maps']);
  app.registerModule('workshops.services');
  app.registerModule('workshops.routes', ['ui.router', 'core.routes', 'workshops.services']);
}(ApplicationConfiguration));
