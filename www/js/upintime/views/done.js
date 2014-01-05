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
    }
  });
});
