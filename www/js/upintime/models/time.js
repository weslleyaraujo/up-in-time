define(['helpers'], function () {
  return Backbone.Model.extend({
    initialize: function () {
      this.now();
      this.on('change', this.setLocal, this);
      this.on('sync', this.setLocal, this);
      this.on('invalid', this.onError, this);
      this.trigger('sync');
    },
    
    setLocal: function () {
      
      window.localStorage.baseTime = this.get('baseTime');
      window.localStorage.discount = this.get('discount');
      window.localStorage.arrived = this.get('arrived');
      this.setBaseTime();
      this.now();
    },

    defaults: {
      baseTime: window.localStorage.baseTime || '09:48',
      discount: window.localStorage.discount || 15
    },

    validate: function (attrs, options) {
      if (_.isNull(attrs.baseTime.match(/^([0-9][0-9]+:+[0-9][0-9])$/))) {
        return 'Basetime should be in time format.';
      }
     
      if (!_.isNumber(parseInt(attrs.discount))) {
        return 'Discount should be a number.';
      }
      
      if (_.isEmpty(attrs.discount)) {
        return 'Discount cant be empty';
      }
    },
  
    now: function () {
      var date;
      if (window.localStorage.arrived) {
        date = window.localStorage.arrived;
      }
      else {
        date = new Date();
        date = Timers.timeAsString(date);
      }

      this.set('arrived', date);
      window.localStorage.arrived = date;
    },

    // set base time date
    setBaseTime: function () {
      var time = this.get('baseTime').split(/[^0-9]/)
        hours = parseInt(time[0], 10),
        minutes = parseInt(time[1], 10);

      this.set('_baseTime', ((hours * 60 + minutes) * 60 * 1000));
    },

    onError: function (model, errors) {
      this.set('discount', this.defaults.discount);
      this.set('baseTime', this.defaults.baseTime);
      this.now();
    }

  });
});
