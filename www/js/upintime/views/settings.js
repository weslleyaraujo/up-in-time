define(['text!../views/settings.html'], function (html){
  return Backbone.View.extend({
    className: 'template settings page',
    initialize: function () {
      this.render();
    },
    render: function () {
      var template = _.template(html);
      this.$el.html(template());
    }
  });
});
