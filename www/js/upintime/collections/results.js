define(function (require) {
  return Backbone.Collection.extend({
    initialize: function () {
    },

    calculate: function () {
      this.each(function (model) {
        var period;
        switch (model.get('type')) {
          case 'minimum' :
            period = (model.get('baseTime') - (model.get('discount') * 60 * 1000));
          break;
          case 'normal' :
            period = model.get('baseTime');
          break;
          case 'maximum' :
            period = (model.get('baseTime') + (model.get('discount') * 60 * 1000));
          break;
        }

        var time = '09:00'.split(/[^0-9]/),
          hours = time[0],
          minutes = time[1],
          dateTime = new Date(2014, 01, 01, hours, minutes),
          result = new Date(dateTime.getTime() + period);
        
        console.log(result);
      });
    }
  });
});
