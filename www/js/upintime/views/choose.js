define(function (require){
  return Backbone.View.extend({
    className: 'template choose page',

    initialize: function () {
      this.timeResults = require('timeResults');
      this.render();
    },

    render: function () {
      // render main view
      var html = require('text!../views/choose.html'),
        template = _.template(html);
      this.$el.html(template());

      // render items
      this.timeResults = new this.timeResults({
        collection: this.collection,
      }, this);

      // append items
      this.$el.find('#time-results').html(this.timeResults.el);
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
