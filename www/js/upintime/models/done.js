define(function (){
  return Backbone.Model.extend({
    defaults: {
      today: '',
      isCreated: false,
      timeNow: ''
    },

    initialize: function () {
      this.setRemaing();
      this.bind();
    },

    bind: function () {
      this.on('change', this.onChange);
    },

    onChange: function () {
      this.setRemaing();
      console.log('mudou ai');
    },
   
    setTimeNow: function () {
      var date = new Date();
      var hours = date.getHours().toString(),
          minutes = date.getMinutes().toString();

      if (hours.length == 1) {
        hours = '0' + hours;
      }

      if (minutes.length == 1) {
        minutes = '0' + minutes;
      }
      
      this.set('timeNow', hours + ':' + minutes);
    },

    padding: function (str, len, char) {
      return (Array(len).join(char)+str).substr(-len);
    },

    setRemaing: function () {
      this.setTimeNow();
      var now = this.get('timeNow'),
          y = this.get('result'),
          day = "Sun Jan 05 2014 ", // or whatever
          remaining = new Date(new Date(day+y)-new Date(day+now));
      remaining = this.padding(remaining.getUTCHours(), 2, 0) + ':' + this.padding(remaining.getUTCMinutes(), 2, 0);
      
      this.set('remaining', remaining);
    }

  });
});
