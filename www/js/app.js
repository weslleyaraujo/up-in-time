define(function (require){
  'use-strict';

  var app,
  _private,
  upintime = require('upintime'),
  elements = {
    $main: null
  },
  actual = {
    currentPage: null
  };

  // _private methods 
  _private = {
    router: function () {
      actual.router = new upintime.Router();
      _private.bindRoutes();
      Backbone.history.start();
    },

    bindRoutes: function () {
      upintime.Helpers.events.on('settings', _private.views.settings);
    },

    showActualView: function () {
      actual.$view.addClass('is-visible');
    },

    // the user has settings already?
    issetConfig: function () {
      if(!true) {
        // upintime.Helpers.events.trigger('settings');
        return;
      }

      Backbone.history.navigate('settings', {
        trigger: true 
      });
    },
   
    // change view settings
    changeView: function (view) {
      if (actual.$view) {
        actual.$oldView = actual.$view;
      }
      actual.$view = view.$el;
      elements.$main.append(view.el);
    },

    slideIn: function () {
      if (actual.$oldView)  {
        actual.$oldView.removeClass('is-visible');
      }
      setTimeout(function () {
        _private.showActualView();
        actual.$oldView.remove();
      }, 30);
    },

    // views methods
    views: {
      settings: function () {
        var settings = require('settings');
        _private.changeView(new settings());
        _private.slideIn();
      }
    }
  };

  // app methods
  app = {
    init: function () {
      app.setDom();
      app.bind();
    },

    setDom: function () {
      elements.$main = $('#main-content');
      elements.$startButton = $('#start-button');
      actual.$view = $('.template.index');  
    },

    bind: function () {
      _private.router();
      elements.$startButton.on('click', _private.issetConfig);
    }, 

    go: function (view) {
      actual.previous = actual.currentPage || null;
      actual.next = view;

      if (previous) {
        previous.transitionOut(function () {
          previous.remove();
        });
      }

      next.render({ page: true });
      this.$el.append( next.$el );
      next.transitionIn();
      this.currentPage = next;
    }
  }

  return app;
});
