var app = {

  setup: function() {

    // loading bar setup
    NProgress.configure({
      showSpinner: false
    });

    // global delay handler
    app.delay = Delay();

    // the main content area
    app.content = Content(app);
    app.content.setup();

    // modal window handler
    app.modal = Modal(app);
    app.modal.setup();

    // enable context menus
    new Context();  

    // enable search
    new Search();

    // add the current csrf token to each post request
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      if(originalOptions.type && originalOptions.type.toLowerCase() == 'post') {      
        options.data = $.param($.extend(originalOptions.data, {
          csrf: $('body').attr('data-csrf')
        }));
      }    
    });

    // event delegation for all clicks on links
    $(document).on('click', 'a', function(e) {      

      var link = $(this);
      var href = link.attr('href');

      if(link.is('[data-dropdown]') || href.match(/^#/)) {
        return true;
      } else {

        if(link.is('[data-modal]')) {
          app.modal.open(link.attr('href'));
          return false;
        } else if(link.is('[target]')) {
          return true;
        } else {
          app.content.open(href);        
          return false;
        }

      }

    });

    // event delegation for all global shortcuts
    $(document).on('keydown', function(e) {

      switch(e.keyCode) {

        // meta+s
        // meta+enter
        case 83:
        case 13:
          if(!e.metaKey && !e.ctrlKey) return true;

          // check for an opened modal
          if(!app.hasModal()) {
            // submit the main content form
            app.content.form().trigger('submit');
          }

          return false;
          break;

        // esc
        case 27:
          app.modal.close();
          return false;
          break;
      }

    });

    // initialize all dropdowns
    $(document).dropdown();

  },

  // checks if a modal is currently open
  hasModal: function() {
    return $('.modal-content').length > 0;
  },

  load: function(url, type, callback) {

    // start the loading indicator
    app.isLoading(true);

    if(type == 'modal') {
      var headers = {modal: true};
    } else {
      var headers = false;
    }

    $.ajax({
      url: url,
      method: 'GET',
      headers: headers
    }).success(function(response, status, xhr) {

      // stop the loading indicator
      app.isLoading(false);

      // check for the current user
      var user = xhr.getResponseHeader('Panel-User');

      // check for possible problems
      if(!user || $.type(response) !== 'object') {
        window.location.href = url;
      }

      // set the document title
      document.title = response.title;

      // replace the csrf token
      $('body').attr('data-csrf', response.csrf);

      try {
        callback(response);        
      } catch(e) {
        window.location.href = url;
      }

    }).error(function() {
      window.location.href = url;
    });

  },

  csrf: function() {
    return $('body').attr('data-csrf');
  }, 

  // global loading indicator toggle
  isLoading: function(toggle) {
    if(toggle) {
      app.delay.start('loader', function() {
        NProgress.start();
      }, 250);
    } else {
      app.delay.stop('loader');
      NProgress.done();
    }
  }

};

// run the basic app setup
$(function() {
  app.setup();
});