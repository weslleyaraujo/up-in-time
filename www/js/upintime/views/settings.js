define(['text!../views/settings.html', 'helpers'], function (html) {
  return Backbone.View.extend({
    className: 'template settings page',

    initialize: function () {
      this.render();
    },

    render: function () {
      var template = _.template(html);
      this.$el.html(template(this.model.toJSON()));
    },

    events: {
     'click #next-button': 'saveSettings',
     'submit #settings-form': 'saveSettings',
    },

    saveSettings: function (event) {
      event && event.preventDefault();
      var newValuews = this.$el.find('#settings-form').serializeObject();

      this.model.set({
        baseTime: newValuews.baseTime,
        discount: newValuews.discount
      }, {
        validate: true
      });
      
      Backbone.history.navigate('choose', {
        trigger: true
      });
    }

  });
});
