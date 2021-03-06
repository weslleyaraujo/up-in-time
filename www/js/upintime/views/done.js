define(['text!../views/done.html', 'helpers'], function (html, helpers){
  return Backbone.View.extend({
    className: 'template done page',

    initialize: function () {
      this.render();
      this.blinkClock();
      this.bind();
    },

    bind: function () {
      this.model.on('change', this.render, this);
    },

    events: {
      'click #settings-button': 'settingsHanlder',
      'click #reset-button': 'resetHanlder',
    },

    render: function () {
      // render view
      var template = _.template(html);
      this.$el.html(template(this.model.toJSON()));

      // clear and start interval again
      this.interval = clearInterval(this.interval);
      this.blinkClock();
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

    settingsHanlder: function (event) {
      event && event.preventDefault();
      if (confirm('Are you sure you want to settings your defaults? (You gonna loose your actual timesheet)')) {
        Backbone.history.navigate('settings', {
          trigger: true
        });
      }
    },

    resetHanlder: function (event) {
      event && event.preventDefault();
      if (confirm('Are you sure you want to reset your? (You gonna loose your actual timesheet)')) {
        Backbone.history.navigate('start', {
          trigger: true
        });
      }
    }
  });
});
