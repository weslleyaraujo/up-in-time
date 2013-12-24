require.config({
  baseUrl: '../bower_components/',
  paths: {
    domready: 'require/domready',
    jquery: 'jquery/jquery',
    backbone: 'backbone/backbone',
    underscore: 'underscore/underscore',
    hellotime: '../js/app/hellotime'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      deps: ['jquery'],
      exports: '_'
    },
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'hellotime': {
      deps: ['backbone'],
      exports: 'HelloTime'
    }
  }
  
});

// require hellotime app
require(['hellotime'], function (){
  app.initialize();
});
