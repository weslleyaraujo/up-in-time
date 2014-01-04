define(function (require){
  'use-strict';

  var app,
  _private,
  upintime = require('upintime'),
  elements = {
    $main: null
  },
  actual = {
    currentPage: null,
    models: {
      timeModel: new upintime.Models.time()
    }
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
      upintime.Helpers.events.on('settings', _private.views.settings);
      upintime.Helpers.events.on('choose', _private.views.choose);
      upintime.Helpers.events.on('done', _private.views.done);
    },

    showActualView: function () {
      actual.$view.addClass('is-visible');
    },
    
    // the user has allreay calculated the time?
    issetTime: function () {
      if(false) {
        return true;
      }

      return false;
    },

    // the user has settings work times already?
    issetConfig: function () {
      if(!true) {
        return false;
      }

      return true;

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
        if (actual.$oldView) {
          actual.$oldView.remove(); 
        }
      }, 30);
    },

    // views methods
    views: {
      index: function () {
        // is the user has now config yet and not set the time of the day
        if (!_private.issetTime()) {
          _private.changeView(new upintime.Views.index());
          _private.slideIn();
        }
        // if the user has already set the time of the day
        else if (_private.issetTime()) {
          // send to final time 
          console.log('the final time page');
        }
        else {
          // calculate and send to choose time 
          console.log('the choose time page');
        }
      },

      settings: function () {
        _private.changeView(new upintime.Views.settings({
          model: actual.models.timeModel
        }));

        _private.slideIn();
      },

      choose: function () {
        _private.changeView(new upintime.Views.choose());
        _private.slideIn();
      },

      done: function () {
        _private.changeView(new upintime.Views.done());
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

    startHanler: function () {
      if (!_private.issetConfig()) {
      }
    }
  }

  return app;
});
