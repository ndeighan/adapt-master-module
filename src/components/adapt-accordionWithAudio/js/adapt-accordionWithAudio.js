/*
 * adapt-accordionWithAudio
 * License - https://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 * Maintainers - Himanshu Rajotia <himanshu.rajotia@credipoint.com>, CrediPoint Solutions <git@credipoint.com>
 */

define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var AccordionWithAudio = ComponentView.extend({

    postRender: function() {
      this.setReadyStatus();
    },

    events: {
      'click .accordionWithAudio-item-title': 'toggleItem'
    },

    toggleItem: function(event) {
      event.preventDefault();
      this.$('.accordionWithAudio-item-body').stop(true, true).slideUp(200);
      if (!$(event.currentTarget).hasClass('selected')) {
        this.playAudio($(event.currentTarget));
        this.$('.accordionWithAudio-item-title').removeClass('selected');
        $(event.currentTarget).addClass('selected visited').siblings('.accordionWithAudio-item-body').slideToggle(200);
        this.$('.accordionWithAudio-item-title-icon').removeClass('icon-minus').addClass('icon-plus');
        $('.accordionWithAudio-item-title-icon', event.currentTarget).removeClass('icon-plus').addClass('icon-minus');
        if ($(event.currentTarget).hasClass('accordionWithAudio-item')) {
          this.setVisited($(event.currentTarget).index());
        } else {
          this.setVisited($(event.currentTarget).parent('.accordionWithAudio-item').index());
        }
      } else {
        this.stopAllAudios();
        this.$('.accordionWithAudio-item-title').removeClass('selected');
        $(event.currentTarget).removeClass('selected');
        $('.accordionWithAudio-item-title-icon', event.currentTarget).removeClass('icon-minus').addClass('icon-plus');
      }
    },

    playAudio: function($currentElement) {
      var audioElement;
      if ($currentElement.hasClass('.accordionWithAudio-item')) {
        audioElement = $currentElement.find('.accordionWithAudio-item-audio audio')[0];
      } else {
        audioElement = $currentElement.siblings('.accordionWithAudio-item-audio').find('audio')[0];
      }
      if (audioElement) {
        this.stopAllAudios();
        if (audioElement.currentTime == 0) {
          audioElement.play();
        }
      }
    },

    stopAllAudios: function() {
      _.each(this.$('.accordionWithAudio-item-audio audio'), function(audio) {
        if (!audio.paused) {
          audio.pause();
        }
        if (audio.currentTime != 0) {
          audio.currentTime = 0.0;
        }
      }, this);
    },

    setVisited: function(index) {
      var item = this.model.get('items')[index];
      item._isVisited = true;
      this.checkCompletionStatus();
    },

    getVisitedItems: function() {
      return _.filter(this.model.get('items'), function(item) {
        return item._isVisited;
      });
    },

    checkCompletionStatus: function() {
      if (!this.model.get('_isComplete')) {
        if (this.getVisitedItems().length == this.model.get('items').length) {
          this.setCompletionStatus();
        }
      }
    }

  });

  Adapt.register("accordionWithAudio", AccordionWithAudio);
  return AccordionWithAudio;

});