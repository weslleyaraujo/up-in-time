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
        events: _.extend({}, Backbone.Events),
        
        // return time with two digits
        twoDigits: function (string) {
          var collection = ("00" + string).split("");
          return collection[collection.length - 2] + collection[collection.length - 1];
        },

        // return time time as string
        timeAsString: function(time) {
          return this.twoDigits(time.getHours()) + ":" + this.twoDigits(time.getMinutes());
        }
      }
    };

  // setting routes
  upintime.Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'settings': 'settings',
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
    }

  });
  
  return upintime;
});
