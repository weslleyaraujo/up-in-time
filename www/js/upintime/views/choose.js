define(['text!../views/choose.html'], function (html){
  return Backbone.View.extend({
    className: 'template choose page',

    initialize: function () {
      this.render();
    },

    render: function () {
      var template = _.template(html);
      this.$el.html(template());
    },

    events: {
      'click #done-button': 'onDoneClick',
      'change .time-result-radio': 'onTimeChange'
    },

    onDoneClick: function (event) {
      event && event.preventDefault();
      Backbone.history.navigate('done', {
        trigger: true
      });
    },

    onTimeChange: function (event) {
      this.$el.find('.time-result').removeClass('is-checked');
      $(event.target).closest('.time-result').addClass('is-checked');
    }
  });
});
