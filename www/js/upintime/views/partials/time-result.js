define(function (require){
  return Backbone.View.extend({
    tagName: 'label',

    className: 'time-result',

    initialize: function (opts) {
      this.setClass();
      this.setAttrs();
      this.render();
    },

    render: function () {
      var html = require('text!../views/partials/result-item.html'),
        template = _.template(html);
      this.$el.html(template(this.model.toJSON()));
      this.setCidValue();
    },

    setAttrs: function () {
      this.$el.attr('for', this.model.get('type')); 
      this.$el.attr('data-item-cid', this.model.cid); 
    },

    setClass: function () {
      this.$el.addClass(this.model.get('type'));
    },

    setCidValue: function () {
      this.$el.find('.time-result-radio').val(this.model.cid); 
    }
    
  });
});
