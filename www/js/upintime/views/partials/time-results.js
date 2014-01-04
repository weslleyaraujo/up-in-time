define(function (require){
  return Backbone.View.extend({
    initialize: function (opts) {
      this.timeResult = require('timeResult');
      this.render();
    },

    render: function () {
      var template = this.itemTemplate;
      this.collection.each(function (model) {
        var timeResult = new this.timeResult({
          model: model
        });

         this.$el.append(timeResult.el);

      }, this);
    }
  });
});
