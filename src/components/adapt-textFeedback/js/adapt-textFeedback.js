/*
* adapt-textFeedback
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Niall Deighan <niall.deighan@injixo.com>
*/

define(function (require) {
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');
    
    var TextFeedback = QuestionView.extend({
        events: {
            "click .textFeedback-widget .button.submit":"onSubmitClicked",
            "click .textFeedback-widget .button.reset":"onResetClicked",
//            "click .textFeedback-widget .button.model":"onModelAnswerClicked",
//            "click .textFeedback-widget .button.user":"onUserAnswerClicked",
            "blur input":"forceFixedPositionFakeScroll",
            "focus input":"clearValidationError"
        },

        forceFixedPositionFakeScroll: function() {
            if (Modernizr.touch) {
                _.defer(function() {
                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                });
            } 
        },
        
        canSubmit:function() {
            var canSubmit = true;
            this.$(".textFeedback-item-textbox").each(function() {
                if($(this).val()=="") {
                    canSubmit = false;
                }
            });
            return canSubmit;
        },

        onCannotSubmit: function() {
            this.showValidationError();
        },

        showValidationError: function() {
            this.$(".textFeedback-item-textbox").addClass("textFeedback-validation-error");
        },

        clearValidationError: function() {
            this.$(".textFeedback-item-textbox").removeClass("textFeedback-validation-error");
        },
        
        checkAnswerIsCorrect: function(possibleAnswers, userAnswer) {
            var answerIsCorrect = _.contains(possibleAnswers, this.cleanupUserAnswer(userAnswer));
            if(answerIsCorrect) this.model.set('_hasAtLeastOneCorrectSelection', true);
            return answerIsCorrect;
        },
        
        cleanupUserAnswer: function(userAnswer) {
            if(this.model.get('_allowsAnyCase')) {
                userAnswer = userAnswer.toLowerCase();
            }
            if(this.model.get('_allowsPunctuation')) {
                var userAnswerClean = userAnswer.replace(/[\.,-\/#!$£%\^&\*;:{}=\-_`~()]/g,"");
                userAnswer = $.trim(userAnswerClean);
            }
            return userAnswer;
        },
        
        forEachAnswer: function(callback) {
             _.each(this.model.get('_items'), function(item, index) {
                var userAnswer = this.$(".textFeedback-item-textbox").eq(index).val();
                callback(this.checkAnswerIsCorrect(item._answers, userAnswer), item);
            }, this);
			
        },
        
        markQuestion: function() {
            this.forEachAnswer(function(correct, item) {
                item.correct = correct;
            });
            QuestionView.prototype.markQuestion.apply(this);
        },
        
        onEnabledChanged: function() {
            this.$('.textFeedback-item-textbox').prop('disabled', !this.model.get('_isEnabled'));
        },
        
        onModelAnswerShown:function () {
            _.each(this.model.get('_items'), function(item, index){
                this.$(".textFeedback-item-textbox").eq(index).val(item._answers[0]);
            }, this);
        },
        
        onUserAnswerShown:function () {
            _.each(this.model.get('_items'), function(item, index){
                this.$(".textFeedback-item-textbox").eq(index).val(item.userAnswer);
            }, this);
        },
        
        postRender: function() {
            QuestionView.prototype.postRender.apply(this);
            this.setReadyStatus();
        },
        
        storeUserAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                item.userAnswer = this.$('.textFeedback-item-textbox').eq(index).val();
				this.model.set('feedbackVal', "Feedback: " + item.userAnswer);
            }, this);
            this.hideButton();
        },
        
        hideButton: function() {
             this.$('.buttons').hide(); 
            this.$('.showButton').show(); 
           
        }
        
    });
    
    Adapt.register("textFeedback", TextFeedback);
    
});