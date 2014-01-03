define(function (require){
  'use-strict';
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    upintime = {
      Views: {},
      Collections: {},
      Models: {},
      Extensions: {},
      Helpers: {
        // extend underscore events
        events: _.extend({}, Backbone.Events)
      }
    };

  // setting routes
  upintime.Router = Backbone.Router.extend({
    routes: {
      'settings': 'settings',
    },

    settings: function () {
       upintime.Helpers.events.trigger('settings');
    }
  });
  
  return upintime;
});
