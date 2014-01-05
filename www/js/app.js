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
      timeModel: new upintime.Models.time(),
      done: new upintime.Models.done()
    },
    collections: {
      results: new upintime.Collections.results({
        model: upintime.Models.result
      })
    }
  };


  // _private methods 
  _private = {
    router: function () {
      actual.router = new upintime.Router();
      _private.bind();
      Backbone.history.start();
    },

    bind: function () {
      // bind routes
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
      if(window.localStorage.done) {
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

    arrivedDate: function (arrived) {
      var date = new Date();
      arrived = arrived.split(':');
      date.setHours(arrived[0]);
      date.setMinutes(arrived[1]);
      return date;
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
          actual.models.done.set({
            today: actual.retrieved.today,
            timeNow: actual.retrieved.timeNow,
            result: actual.retrieved.result,
            remaining: actual.retrieved.remaining,
            minutes: actual.retrieved.minutes,
            isCreated: actual.retrieved.isCreated,
            hours: actual.retrieved.hours,
            baseTime: actual.retrieved.baseTime,
            arrived: actual.retrieved.arrived
          });

          _private.changeView(new upintime.Views.done({
            model: actual.models.done
          }));

          _private.slideIn();
        }
      },

      settings: function () {
        var settings = new upintime.Views.settings({
          model: actual.models.timeModel
        });

        console.log(actual.models.timeModel);

        _private.changeView(settings);
        _private.slideIn();
        
        // get model when it updates
        elements.$settingsForm = $('#settings-form');
        elements.$settingsForm.on('submit', function (event) {
          event && event.preventDefault();
          actual.models.timeModel = settings.model; 
      
          Backbone.history.navigate('choose', {
            trigger: true
          });
        });
      },

      choose: function () {
        // reset result collections
        actual.collections.results.reset();
      
        // add three items
        actual.collections.results.add({
          type: 'minimum',
          discount: actual.models.timeModel.get('discount'),
          baseTime: actual.models.timeModel.get('_baseTime'),
          arrived: actual.models.timeModel.get('arrived'),
          arrivedDate: _private.arrivedDate(actual.models.timeModel.get('arrived')),
          isSelected: true
        });

        actual.collections.results.add({
          type: 'normal',
          discount: actual.models.timeModel.get('discount'),
          baseTime: actual.models.timeModel.get('_baseTime'),
          arrived: actual.models.timeModel.get('arrived'),
          arrivedDate: _private.arrivedDate(actual.models.timeModel.get('arrived'))
        });

        actual.collections.results.add({
          type: 'maximum',
          discount: actual.models.timeModel.get('discount'),
          baseTime: actual.models.timeModel.get('_baseTime'),
          arrived: actual.models.timeModel.get('arrived'),
          arrivedDate: _private.arrivedDate(actual.models.timeModel.get('arrived'))
        });

        // calculate new times
        actual.collections.results.calculate();

        _private.changeView(new upintime.Views.choose({
          collection: actual.collections.results
        }));

        _private.slideIn();
      },

      done: function () {
        var selected = actual.collections.results.findWhere({
          isSelected: true 
        });

        if (selected.get('isCreated')) {
          window.localStorage.done = JSON.stringify(this.toJSON()); 
        }
        
        actual.models.done.set({
          arrived: selected.attributes.arrived,
          arrivedDate: selected.attributes.arrivedDate,
          baseTime: selected.attributes.baseTime,
          baseTimeHours: actual.models.timeModel.attributes.baseTime,
          result: selected.attributes.result,
          type: selected.attributes.type,
          discount: selected.attributes.discount,
          isCreated: true
        });

        _private.changeView(new upintime.Views.done({
          model: actual.models.done
        }));

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
    }
  }

  return app;
});
