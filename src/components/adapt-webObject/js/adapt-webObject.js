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
	

    inview: function(event, visible) {
            if (visible) {
			 triggerVar = "0";
             triggerCheck = setInterval(this.inview1, 1000, this);
		     this.triggerCheck;
            }
    },
 
      
    inview1: function(my_webobject) {
        if (triggerVar == "1") {
            my_webobject.setCompletionStatus();
            clearInterval(this.triggerCheck);
        }
    }

  });

  
    
  Adapt.register("webObject", WebObject);

});