/*
* adapt-webObject
*/
var triggerVar = "0";

define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');
  
   
  var WebObject = ComponentView.extend({
      
    postRender: function() {
      this.setReadyStatus();
      this.intervalCheck(this);
    },  
      
    intervalCheck: function(my_webobject) {
        if (triggerVar == "0") {
           console.log("triggerVar is still zero", triggerVar);
           triggerCheck = setInterval(this.inview1, 1000, my_webobject);
		   this.triggerCheck;
        } 
        
    },
      
    inview1: function(my_webobject) {
        console.log("trying completion", triggerVar);
        if (triggerVar == "1") {
			console.log("trying status", triggerVar);
            my_webobject.setCompletionStatus();
             }
    }        

  });
    
  Adapt.register("webObject", WebObject);

});