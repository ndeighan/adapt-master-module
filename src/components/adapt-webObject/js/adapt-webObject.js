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
      this.intervalCheck();
    },  
      
    intervalCheck: function() {
        if (triggerVar == "0") {
           console.log("triggerVar is still zero", triggerVar);
           triggerCheck = setInterval(this.inview1, 1000);
		   this.triggerCheck;
        } 
        
    },
      
    inview1: function() {
        console.log("trying completion", triggerVar);
        if (triggerVar == "1") {
			console.log("trying status", triggerVar);
            this.setCompletionStatus();
             }
    }        

  });
    
  Adapt.register("webObject", WebObject);

});