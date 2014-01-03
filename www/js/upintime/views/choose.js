define(['text!../views/choose.html'], function (html){
  return Backbone.View.extend({
    className: 'template choose page',
    initialize: function () {
      this.render();
    },
    render: function () {
      var template = _.template(html);
      this.$el.html(template());
    }
  });
});
