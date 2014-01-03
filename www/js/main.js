require.config({
  baseUrl: '../bower_components/',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    // libs
    jquery: 'jquery/jquery',
    backbone: 'backbone/backbone',
    underscore: 'underscore/underscore',
    fastclick: 'fastclick/lib/fastclick',
    text: 'requirejs-text/text',
    
    // views
    settings: '../js/upintime/views/settings',
    
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

    // views
    'settings': {
      deps: ['backbone']
    },
    
    // app
    'upintime': {
      // setting all deps of app
      deps: [
        'fastclick',
        'text',

        // views
        'settings'
      ]
    },
    'app': {
      deps: [
        'upintime'
      ],
      exports: 'app'
    }
  }
});

require(['app'], function(app){
  app.init();
});
