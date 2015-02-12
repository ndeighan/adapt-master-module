define(function (require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');
    
    Adapt.on('router:menu', function (model) {
    // Listen to when Adapt hits a menu and navigate to a page. Make sure the string here is the page ID you're trying to route too.
    
        var newRouteId = Adapt.contentObjects.models[0].get('_id');
        Backbone.history.navigate('#/id/' + newRouteId, true);

    });

    Adapt.on('router:page', function (model) {

    // Hide the navigation back button. _.defer makes show everything is rendered before hiding.

        _.defer(function () {
            $('.navigation-back-button').addClass('display-none');
           // $('.navigation-drawer-toggle-button').addClass('display-none');
          // $('.navigation').addClass('display-none');
        //    $('#wrapper').addClass('padding-none');
        });
    });
});
