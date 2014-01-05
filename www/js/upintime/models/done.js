define(function (){
  return Backbone.Model.extend({
    defaults: {
      today: '',
      isCreated: false,
      timeNow: ''
    },

    initialize: function () {
      var interval;
      this.startInterval();
      this.setToday();
      this.bind();
    },

    bind: function () {
      this.on('change', this.onChange);
    },

    onChange: function () {
      this.setRemaing();
    },
    
    setToday: function () {
      this.set('today', new Date().toJSON().slice(0,10));
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
          remaining = new Date(new Date(day+y)-new Date(day+now)),
          hours = this.padding(remaining.getUTCHours(), 2, 0),
          minutes = this.padding(remaining.getUTCMinutes(), 2, 0);

      remaining = hours + ':' + minutes;
      
      this.set('remaining', remaining);
      this.set('hours', hours);
      this.set('minutes', minutes);

      if (this.get('isCreated')) {
        window.localStorage.done = JSON.stringify(this.toJSON()); 
      }
    },

    startInterval: function () {
      if (this.get('isCreated')) {
        var that = this;
        interval = setInterval(function () {
          that.setRemaing();
        }, 1000);
      }
    }

  });
});
