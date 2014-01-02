require.config({
  baseUrl: '../bower_components/',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    // libs
    jquery: 'jquery/jquery',
    backbone: 'backbone/backbone',
    underscore: 'underscore/underscore',
    
    // views
    index: '../js/upintime/views/index',
    
    // app
    upintime: '../js/upintime/upintime',
    app: '../js/app'
  },
  shim: {
    // libs
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
    
    // app
    'upintime': {
      // setting all deps of app
      deps: ['index']
    },
    'app': {
      deps: ['upintime'],
      exports: 'app'
    }
  }
});

require(['app'], function(app){
  app.init();
});
