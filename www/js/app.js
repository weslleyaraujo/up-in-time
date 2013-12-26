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
      upintime.Helpers.events.on('index', app.index);
      upintime.Helpers.events.on('test', app.test);
    },
    removeActualView: function () {
      if (actual.$oldView)  {
        actual.$view.removeClass('is-visible');
      }
      setTimeout(function () {
        _private.showActualView();
      }, 300);
    },
    showActualView: function () {
      console.log('show the view', actual.$view)
      actual.$view.addClass('is-visible');
    }
  };

  // app methods
  app = {
    init: function () {
      app.setDom();
      app.bind();
    },
    setDom: function () {
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
    },

    // views
    index: function () {
      var view = new upintime.Views.Index();
      console.log(actual);
      if (actual.$view) {
        actual.$oldView = actual.$view;
      }
      actual.$view = view.$el;
      $('body').append(view.el);
      _private.removeActualView();
    },

    test: function () {
      var view = new upintime.Views.Test();
      if (actual.$view) {
        actual.$oldView = actual.$view;
      }
      actual.$view = view.$el;
      $('body').append(view.el);
      _private.removeActualView();
    }
  }

  return app;
});
