define(function (){
  return Backbone.Model.extend({
    initialize: function () {
      this.on('change', this.setLocal, this);
    },
    
    setLocal: function () {
      window.localStorage.baseTime = this.get('baseTime');
      window.localStorage.discount = this.get('discount');
      window.localStorage.settings = true;
      console.log('save ai');
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
    }
  });
});
