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
    
    // main calculate method
    controller: {
      saveSettings: function () {
       actual.models.timeModel.set({
          baseTime: elements.$baseTime.val(),
          discount: elements.$discount.val()
        }, {
          validate: true
        })
      },

      calculate: function (event) {
        event && event.preventDefault();

        // save user settings
        _private.controller.saveSettings();

        // send to choose page 
        Backbone.history.navigate('choose', {
          trigger: true
        });
      }
    },

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
        _private.changeView(new upintime.Views.settings());
        _private.slideIn();

        // get settings elements
        elements.$nextButton = $('#next-button');
        elements.$baseTime = $('#base-time');
        elements.$discount = $('#discount');
        elements.$settingsForm = $('#settings-form');

        // trigguer elements
        elements.$nextButton.on('click', _private.controller.calculate);
        elements.$settingsForm.on('submit', _private.controller.calculate);
        
        // settings values
        elements.$baseTime.val(actual.models.timeModel.get('baseTime'));
        elements.$discount.attr('placeholder', actual.models.timeModel.get('discount'));
      },

      index: function () {
        // is the user has now config yet and not set the time of the day
        if (!_private.issetTime()) {
          console.log('the index page');

          _private.changeView(new upintime.Views.index());
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
        _private.changeView(new upintime.Views.choose());
        _private.slideIn();

        // get settings elements
        elements.$doneButton = $('#done-button');
        elements.$timeResults = $('.time-result-radio');

        // trigguer elements
        elements.$doneButton.on('click', _private.setNotification);
        elements.$timeResults.on('change', function () {
          elements.$timeResults.closest('.time-result').removeClass('is-checked');
          $(this).closest('.time-result').addClass('is-checked');
        });
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
