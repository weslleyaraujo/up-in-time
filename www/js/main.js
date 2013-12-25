require.config({
  baseUrl: '../bower_components/',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    jquery: 'jquery/jquery',
    backbone: 'backbone/backbone',
    underscore: 'underscore/underscore',
    upintime: '../js/app/upintime'
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
    'upintime': {
      deps: ['backbone'],
      exports: 'UpInTime'
    }
  }
});

require(['upintime'], function(){
  new UpInTime.init();
});
