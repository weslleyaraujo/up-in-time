define(function (require){
  'use-strict';
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    upintime = {
      Views: {
        settings: require('settings'),
        index: require('index'),
        choose: require('choose'),
        done: require('done')
      },
      Collections: {
        results: require('results')
      },
      Models: {
        time: require('time'),
        result: require('result'),
        done: require('doneModel')
      },
      Extensions: {},
      Helpers: {
        // extend underscore events
        events: _.extend({}, Backbone.Events)
      }
    };

  // setting routes
  upintime.Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'settings': 'settings',
      'start': 'start',
      'choose': 'choose',
      'done': 'done'
    },

    index: function () {
       upintime.Helpers.events.trigger('index');
    },

    settings: function () {
       upintime.Helpers.events.trigger('settings');
    },

    choose: function () {
       upintime.Helpers.events.trigger('choose');
    },

    done: function () {
       upintime.Helpers.events.trigger('done');
    },

    start: function () {
       upintime.Helpers.events.trigger('start');
    }

  });
  
  return upintime;
});
