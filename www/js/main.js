require.config({
  baseUrl: '../bower_components/',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    jquery: 'jquery/jquery',
    backbone: 'backbone/backbone',
    underscore: 'underscore/underscore',
    index: '../js/upintime/views/index',
    upintime: '../js/upintime/upintime',
    app: '../js/app'
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
    'index': {
      deps: ['upintime']
    },
    'app': {
      deps: ['index'],
      exports: 'app'
    }
  }
});

require(['app'], function(app){
  app.init();
});
