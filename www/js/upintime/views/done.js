define(['text!../views/done.html', 'helpers'], function (html, helpers){
  return Backbone.View.extend({
    className: 'template done page',

    initialize: function () {
      this.setEndDate();
      this.setRemaing();
      this.render();
      this.blinkClock();
      this.bind();
    },

    bind: function () {
      this.model.on('change', this.render, this);
    },

    render: function () {
      var template = _.template(html);
      this.$el.html(template(this.model.toJSON()));
    },

    blinkClock: function () {
      var blink = this.$el.find('.main-time-clock-divisor');
      this.interval = setInterval(function () {
        blink.addClass('is-invisible');
        setTimeout(function () {
          blink.removeClass('is-invisible');
        }, 600);
      }, 1000);
    },
  
    // calculates the final date
    setEndDate: function () {
      var endDate = this.model.get('arrivedDate'),
          baseTime = this.model.get('baseTimeHours').split(':');
      endDate.addHours(parseInt(baseTime[0]));
      endDate.addMinutes(parseInt(baseTime[1]));
      this.model.set('endDate', endDate);
    },
    
    // calculate hours remaing
    setRemaing: function () {
      // this.setTimeNow();
      //     y = this.get('result'),
      //     day = "Sun Jan 05 2014 ", // or whatever
      //     remaining = new Date(new Date(day+y)-new Date(day+now)),
      //     hours = this.padding(remaining.getUTCHours(), 2, 0),
      //     minutes = this.padding(remaining.getUTCMinutes(), 2, 0);

      // remaining = hours + ':' + minutes;
      
      console.log(this.model.toJSON());
      var now = this.model.get('timeNow'),
      endDate = this.model.get('endDate'),
      seconds = (endDate-now)/1000,
      minutes = (seconds/60),
      hours = (minutes/60);



      console.log(hours + ':' + minutes);

      // this.set('remaining', remaining);
      // this.set('hours', hours);
      // this.set('minutes', minutes);

      // if (this.get('isCreated')) {
      //   window.localStorage.done = JSON.stringify(this.toJSON()); 
      // }
    }
  });
});
