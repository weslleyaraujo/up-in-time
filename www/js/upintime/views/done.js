define(['text!../views/done.html'], function (html){
  return Backbone.View.extend({
    className: 'template done page',

    initialize: function () {
      this.render();
    },

    render: function () {
      var template = _.template(html);
      this.$el.html(template());
    },
    
  });
});
