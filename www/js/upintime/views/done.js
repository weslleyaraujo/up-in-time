define(['text!../views/done.html'], function (html){
  return Backbone.View.extend({
    className: 'template done page',

    initialize: function () {
      this.render();
      this.blinkClock();
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
        }, 500);
      }, 1000);
    }
  });
});
