define(function (){
  return Backbone.Model.extend({
    initialize: function () {
      this.on('change', this.setLocal, this);
      this.on('sync', this.setLocal, this);
      this.trigger('sync');
    },
    
    setLocal: function () {
      window.localStorage.baseTime = this.get('baseTime');
      window.localStorage.discount = this.get('discount');
      this.setBaseTime();
    },

    defaults: {
      baseTime: window.localStorage.baseTime || '09:48',
      discount: window.localStorage.discount || 15
    },

    validate: function (attrs, options) {
      if (_.isNull(attrs.baseTime.match(/^([0-9][0-9]+:+[0-9][0-9])$/))) {
        return 'Basetime should be in time format.';
      }
     
      if (_.isEmpty(attrs.discount)) {
        return 'Discount cant be empty.';
      }

      if (!_.isNumber(parseInt(attrs.discount))) {
        return 'Discount should be a number.';
      }
    },

    // set base time date
    setBaseTime: function () {
      var time = this.get('baseTime').split(/[^0-9]/)
        hours = parseInt(time[0], 10),
        minutes = parseInt(time[1], 10);

      this.set('_baseTime', ((hours * 60 + minutes) * 60 * 1000));
    }

  });
});
