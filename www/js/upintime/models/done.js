define(['helpers'], function (helpers){
  return Backbone.Model.extend({
    defaults: {
      isCreated: false,
      timeNow: ''
    },

    initialize: function () {
      this.bind();
      this.setTimeNow();
    },

    bind: function () {
      this.on('change', this.onChange);
    },

    onChange: function () {
      // this.setRemaing();
    },
    
    setTimeNow: function () {
      this.set('timeNow', new Date());
    },



  });
});
