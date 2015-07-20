/*
* adapt-webObject
*/


define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var WebObject = ComponentView.extend({

    events: {
      'inview':'inview'
    },

    postRender: function() {
      this.setReadyStatus();
    },


    inview: function(event) {
                         triggerVar = "0";
             triggerCheck = setInterval(this.inview1, 100, this);
    },


    inview1: function(my_webobject) {
        if (triggerVar == "1") {
            my_webobject.setCompletionStatus();
        }
    }

  });



  Adapt.register("webObject", WebObject);

});