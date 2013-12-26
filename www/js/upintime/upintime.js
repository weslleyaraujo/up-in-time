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
      '': 'index',
      'test': 'test'
    },

    index: function () {
       upintime.Helpers.events.trigger('index');
     },

    test: function () {
       upintime.Helpers.events.trigger('test');
    }
  });
  
  upintime.Views.Index = Backbone.View.extend({
    className: 'index page',
    initialize: function () {
      this.render();
    },
    render: function () {
      var template = _.template($('script[name=index]').html());
      this.$el.html(template());
    }
  });

  upintime.Views.Test = Backbone.View.extend({
    className: 'test page',
    initialize: function () {
      this.render();
    },
    render: function () {
      var template = _.template($('script[name=test]').html());
      this.$el.html(template());
    }
  });
  return upintime;
});
