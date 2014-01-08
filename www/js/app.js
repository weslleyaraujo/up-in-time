define(function (require){
  'use-strict';

  var app,
  _private,
  interval,
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
      upintime.Helpers.events.on('start', _private.views.start);
      upintime.Helpers.events.on('settings', _private.views.settings);
      upintime.Helpers.events.on('choose', _private.views.choose);
      upintime.Helpers.events.on('done', _private.views.done);
    },

    showActualView: function () {
      actual.$view.addClass('is-visible');
    },

    // the user has allreay calculated the time?
    issetTime: function () {
      var retrived = window.localStorage.done;

      // set info into model
      if (retrived) {
        retrived = JSON.parse(retrived);
        console.log(retrived);
        actual.models.done.set({
          arrivedDate: new Date(retrived.arrivedDate),
          dateToLeave: new Date(retrived.dateToLeave),
          isCreated: true,
          percent: retrived.percent,
          percentInt: retrived.percentInt,
          remainder: retrived.remainder,
          remainderHours: retrived.remainderHours,
          remainderMinutes: retrived.remainderMinutes,
          result: retrived.result,
          type: retrived.type
        });

        // save into localStorage
        actual.models.done.saveModel();

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

    clearTimer: function () {
      // clear timer interval
      interval = clearInterval(interval);

      // clear storage info
      window.localStorage.removeItem('done');
      window.localStorage.removeItem('maxPeriod');
      window.localStorage.removeItem('minPeriod');
      window.localStorage.removeItem('period');
    },

    // create all periods to work
    setPeriods: function () {
      // Minimum
      var period = new Date('Sun Jan 01 2014 '+ window.localStorage.baseTime);
      window.localStorage.minPeriod = period.removeMinutes(parseInt(window.localStorage.discount));

      // Normal
      var period = new Date('Sun Jan 01 2014 '+ window.localStorage.baseTime);
      window.localStorage.period = period;

      // Maximun
      var period = new Date('Sun Jan 01 2014 '+ window.localStorage.baseTime);
      window.localStorage.maxPeriod = period.addMinutes(parseInt(window.localStorage.discount));

    },

    getPeriod: function (type) {
      switch (type) {
        case 'minimum' :
          return window.localStorage.minPeriod;
        break;
        case 'normal' :
          return window.localStorage.period;
        break;
        case 'maximum' :
          return window.localStorage.maxPeriod;
        break;
      }
    },

    // set the date object with time to leave
    dateToLeave: function (type) {
      arrivedDate = _private.arrivedDate(actual.models.timeModel.get('arrived'));
      period = _private.getPeriod(type);

      // set time to period
      arrivedDate.addHours(new Date(period).getHours());
      arrivedDate.addMinutes(new Date(period).getMinutes());

      return arrivedDate;
    },

    // create the arrivedDate
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
        // clear interval timer for save
        _private.clearTimer();

        // is the user has now config yet and not set the time of the day
        if (!_private.issetTime()) {
          Backbone.history.navigate('start', {
            trigger: true
          });
        }
        // if the user has already set the time of the day
        else if (_private.issetTime()) {
          Backbone.history.navigate('done', {
            trigger: true
          });
        }
      },

      start: function () {
        // clear interval timer for save
        _private.clearTimer();

        _private.changeView(new upintime.Views.index());
        _private.slideIn();
      },

      settings: function () {
        // clear interval timer for save
        _private.clearTimer();

        var settings = new upintime.Views.settings({
          model: actual.models.timeModel
        });

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
        // clear interval timer for save
        _private.clearTimer();

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
        // clear interval timer for save
        _private.clearTimer();

        var selected,
        isDone = false;
        if (!actual.models.done.get('isCreated')) {
          selected = actual.collections.results.findWhere({
            isSelected: true 
          });
        }
        else {
          selected = actual.models.done; 
        }

        // calculate all periods that is possible to leave
        _private.setPeriods();

        actual.models.done.set({
          result: selected.get('result'),
          type: selected.get('type'),
          arrivedDate: selected.get('arrivedDate'),
          dateToLeave: _private.dateToLeave(selected.get('type')),
          isCreated: true
        });

        // remainder time
        interval = setInterval(function(){
          var now = new Date(),
          arrivedDate = new Date(selected.get('arrivedDate')),
          period = new Date(_private.getPeriod(selected.get('type'))),
          totalPeriod = new Date(_private.getPeriod(selected.get('type')));

          if (new Date(actual.models.done.get('dateToLeave')) >= now && !isDone) {
            var arrivedMinutes = arrivedDate.getHours() * 60 + arrivedDate.getMinutes(),
            nowMinutes = now.getHours() * 60 + now.getMinutes(),

            // get worked minutes
            workedMinutes = nowMinutes - arrivedMinutes;
            period.removeMinutes(workedMinutes);

            // retrive values
            var hours = app.paddingNumber(period.getHours(), 2, 0),
                minutes = app.paddingNumber(period.getMinutes(), 2, 0),

            // get total period minutes
            periodMinutes = totalPeriod.getHours() * 60 + totalPeriod.getMinutes(),
            percent = (workedMinutes * 100) / periodMinutes;

            if (workedMinutes >= periodMinutes || percent === 100) {
              percent = 100;
              isDone = true;
            }

            // setting remainder time to model
            actual.models.done.set({
              remainder: hours + ':' + minutes,
              remainderHours: hours,
              remainderMinutes: minutes,
              percent: percent,
              percentInt: parseInt(percent)
            });
          }
          else {
            _private.clearTimer();
            alert('vai pra casa jamelão');
          }
        }, 100);

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
    },

    paddingNumber: function (str, len, char) {
      return (Array(len).join(char)+str).substr(-len);
    }
  }

  return app;
});


// VALIDAR SE A DATA ESCOLHIDA SE ENCAIXA COM NOW
