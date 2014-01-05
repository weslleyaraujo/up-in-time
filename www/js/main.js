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

    // helpers
    helpers: '../js/helpers',
    
    // models
    time: '../js/upintime/models/time',
    result: '../js/upintime/models/result',
    doneModel: '../js/upintime/models/done',

    // views
    index: '../js/upintime/views/index',
    settings: '../js/upintime/views/settings',
    choose: '../js/upintime/views/choose',
    done: '../js/upintime/views/done',

    // partials views
    timeResult: '../js/upintime/views/partials/time-result',
    timeResults: '../js/upintime/views/partials/time-results',
  
    // collections
    results: '../js/upintime/collections/results',

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
