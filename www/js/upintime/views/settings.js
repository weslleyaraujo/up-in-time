define(['text!../views/settings.html'], function (html){
  return Backbone.View.extend({
    className: 'template settings page',
    initialize: function () {
      this.render();
    },
    render: function () {
      // var template = _.template($('script[name=test]').html());
      // this.$el.html(template());
      this.$el.html('aeaeae');
    }
  });
});
