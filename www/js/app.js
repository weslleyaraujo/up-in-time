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
      upintime.Helpers.events.on('index', _private.views.index);
    },

    slideIn: function () {
      if (actual.$oldView)  {
        actual.$view.removeClass('is-visible');
      }
      setTimeout(function () {
        _private.showActualView();
      }, 300);
    },

    showActualView: function () {
      actual.$view.addClass('is-visible');
    },
    
    // views methods
    views: {
      index: function () {
        // var view = new upintime.Views.Index();
        // if (actual.$view) {
        //   actual.$oldView = actual.$view;
        // }
        // actual.$view = view.$el;
        // elements.$main.append(view.el);
        // _private.slideIn();
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
    },

    bind: function () {
      _private.router();
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
