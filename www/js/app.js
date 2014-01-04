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
      upintime.Helpers.events.on('settings', _private.views.settings);
      upintime.Helpers.events.on('choose', _private.views.choose);
      upintime.Helpers.events.on('done', _private.views.done);
    },

    showActualView: function () {
      actual.$view.addClass('is-visible');
    },

    // main calculate method
    calculate: function () {
      if(false) {
        alert('Something wrong with validation'); 
        return;
      }

      // send to choose page 
      Backbone.history.navigate('choose', {
        trigger: true
      });
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

    setNotification: function () {
      // set notification logic
      
      // send to done page 
      Backbone.history.navigate('done', {
        trigger: true
      });
    },

    // views methods
    views: {
      settings: function () {
        var settings = require('settings');
        _private.changeView(new settings());
        _private.slideIn();

        // get settings elements
        elements.$nextButton = $('#next-button');

        // trigguer elements
        elements.$nextButton.on('click', _private.calculate);
      },

      index: function () {
        // is the user has now config yet and not set the time of the day
        if (!_private.issetTime()) {
          console.log('the index page');

          var index = require('index');
          _private.changeView(new index());
          _private.slideIn();

          // get index elements
          elements.$startButton = $('#start-button');

          // bind elements
          elements.$startButton.on('click', function () {
            Backbone.history.navigate('settings', {
              trigger: true 
            });
          });
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

      choose: function () {
        var choose = require('choose');
        _private.changeView(new choose());
        _private.slideIn();

        // get settings elements
        elements.$nextButton = $('#next-button');

        // trigguer elements
        elements.$nextButton.on('click', _private.setNotification);
      },

      done: function () {
        var done = require('done');
        _private.changeView(new done());
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
