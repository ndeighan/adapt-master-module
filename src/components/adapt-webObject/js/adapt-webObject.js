/*
* adapt-webObject
*/
define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');
<<<<<<< HEAD
  
  var triggerVar = 0;
  
    
=======

>>>>>>> f5d6ec6fef2711e525e2d3f573a3f07c57488e27
  var WebObject = ComponentView.extend({
      
    postRender: function() {
      this.setReadyStatus();
<<<<<<< HEAD
      this.intervalCheck();
    },  
      
    intervalCheck: function() {
        if (triggerVar == 0) {
           console.log("triggerVar is still zero", triggerVar);
           triggerCheck = setInterval(this.inview1, 1000);
        } else {
        console.log("else has been fired", triggerVar);
        this.inview1();
          }
        
    },
      
    inview1: function() {
        console.log("trying completion", triggerVar);
        if (triggerVar == 1) {
            this.setCompletionStatus();
        }
    }    

  });
    
=======
      this.$('.component-inner').on('inview', _.bind(this.inview, this));
    },      
      
    inview: function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            if (visiblePartY === 'top') {
                this._isVisibleTop = true;
            } else if (visiblePartY === 'bottom') {
                this._isVisibleBottom = true;
            } else {
                this._isVisibleTop = true;
                this._isVisibleBottom = true;
            }

            if (this._isVisibleTop && this._isVisibleBottom) {
                this.$('.component-inner').off('inview');
                this.setCompletionStatus();
            }
            
        }
    },
      
  });

>>>>>>> f5d6ec6fef2711e525e2d3f573a3f07c57488e27
  Adapt.register("webObject", WebObject);

});

<<<<<<< HEAD
    var abc = function() {
//        alert("sss");    
    };
   
=======
    function abc() {
        alert("sss");
        WebObject.inview('event', 'visible', 'visiblePartX', 'visiblePartY');
    }   
>>>>>>> f5d6ec6fef2711e525e2d3f573a3f07c57488e27
