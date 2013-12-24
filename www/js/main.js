require.config({
  baseUrl: '../bower_components/',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
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
      exports: 'app'
    }
  }
  
});
