define(['helpers'], function (helpers){
  return Backbone.Model.extend({
    defaults: {
      isCreated: false,
      remainderHours: '--',
      remainderMinutes: '--',
      remainder: '00:00',
      percent: 0,
      percentInt: 0
    },

    initialize: function () {
      this.bind();
    },

    bind: function () {
      this.on('change', this.onChange);
    },

    onChange: function () {
      this.saveModel();
    },

    saveModel: function () {
      if(this.get('isCreated')) {
        window.localStorage.done = JSON.stringify(this.toJSON());
      }
    }
  });
});
