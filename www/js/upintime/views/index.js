define(['text!../views/index.html'], function (html){
  return Backbone.View.extend({
    className: 'template index page',
    initialize: function () {
      this.render();
    },
    render: function () {
      var template = _.template(html);
      this.$el.html(template());
    }
  });
});
