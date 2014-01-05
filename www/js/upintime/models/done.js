define(['helpers'], function (helpers){
  return Backbone.Model.extend({
    defaults: {
      isCreated: false,
    },

    initialize: function () {
      this.bind();
    },

    bind: function () {
      this.on('change', this.onChange);
    },

    onChange: function () {
                console.log('model is chaged');
    }
    // QUANTO TEMPO PASSOU DA HORA QUE CHEGUEI ATE AGORA?
  });
});
