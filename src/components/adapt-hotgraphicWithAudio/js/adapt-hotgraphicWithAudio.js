/*
 * adapt-hotgraphicWithAudio
 * License - https://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 * Maintainers - Himanshu Rajotia <himanshu.rajotia@credipoint.com>, CrediPoint Solutions <git@credipoint.com>
 */

define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var HotGraphicWithAudio = ComponentView.extend({

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      this.listenTo(this.model, 'change:_isVisible', this.toggleVisibility);
      this.preRender();
      if (Adapt.device.screenSize == 'large') {
        this.render();
      } else {
        this.reRender();
      }
    },

    events: function() {
      return {
        'click .hotgraphicWithAudio-graphic-pin': 'openHotGraphic',
        'click .hotgraphicWithAudio-popup-done': 'closeHotGraphic',
        'click .hotgraphicWithAudio-popup-nav .back': 'previousHotGraphic',
        'click .hotgraphicWithAudio-popup-nav .next': 'nextHotGraphic'
      }
    },

    preRender: function() {
      this.listenTo(Adapt, 'device:changed', this.reRender, this);
    },

    postRender: function() {
      this.$('.hotgraphicWithAudio-widget').imageready(_.bind(function() {
        this.setReadyStatus();
      }, this));
    },

    reRender: function() {
      if (Adapt.device.screenSize != 'large') {
        this.replaceWithNarrative();
      }
    },

    replaceWithNarrative: function() {
      var Narrative = require('components/adapt-narrativeWithAudio/js/adapt-narrativeWithAudio');
      var model = this.prepareNarrativeModel();
      var newNarrative = new Narrative({model: model, $parent: this.options.$parent});
      newNarrative.reRender();
      newNarrative.setupNarrative();
      this.options.$parent.append(newNarrative.$el);
      Adapt.trigger('device:resize');
      this.remove();
    },

    prepareNarrativeModel: function() {
      var model = this.model;
      model.set('_component', 'narrativeWithAudio');
      model.set('_wasHotgraphic', true);
      model.set('originalBody', model.get('body'));
      if (model.get('mobileBody')) {
        model.set('body', model.get('mobileBody'));
      }
      return model;
    },

    openHotGraphic: function(event) {
      event.preventDefault();
      this.playAudioForElement($(event.currentTarget).find('.hotgraphicWithAudio-item-audio audio')[0]);
      var currentHotSpot = $(event.currentTarget).data('id');
      this.$('.hotgraphicWithAudio-item').hide().removeClass('active');
      this.$('.' + currentHotSpot).show().addClass('active');
      var currentIndex = this.$('.hotgraphicWithAudio-item.active').index();
      this.setVisited(currentIndex);
      this.$('.hotgraphicWithAudio-popup-count .current').html(currentIndex + 1);
      this.$('.hotgraphicWithAudio-popup-count .total').html(this.$('.hotgraphicWithAudio-item').length);
      this.$('.hotgraphicWithAudio-popup').show();
      this.$('.hotgraphicWithAudio-popup a.next').focus();
    },

    closeHotGraphic: function(event) {
      event.preventDefault();
      this.stopCurrentAudio();
      var currentIndex = this.$('.hotgraphicWithAudio-item.active').index();
      this.$('.hotgraphicWithAudio-popup').hide();
      this.$('.hotgraphicWithAudio-item').eq(currentIndex).focus();
    },

    playAudioForElement: function(audioElement) {
      if (audioElement) {
        this.stopCurrentAudio();
        this.model.set("_currentAudioElement", audioElement);
        audioElement.play();
      }
    },

    stopCurrentAudio: function() {
      var audioElement = this.model.get("_currentAudioElement");
      if (audioElement) {
        if (!audioElement.paused) {
          audioElement.pause();
        }
        if (audioElement.currentTime != 0) {
          audioElement.currentTime = 0.0;
        }
        this.model.set("_currentAudioElement", "");
      }
    },

    previousHotGraphic: function(event) {
      event.preventDefault();
      var currentIndex = this.$('.hotgraphicWithAudio-item.active').index();
      if (currentIndex > 0) {
        this.$('.hotgraphicWithAudio-item.active').hide().removeClass('active');
        this.$('.hotgraphicWithAudio-item').eq(currentIndex - 1).show().addClass('active');
        this.setVisited(currentIndex - 1);
        this.$('.hotgraphicWithAudio-popup-count .current').html(currentIndex);
      }
      var newIndex = $('.hotgraphicWithAudio-item.active').index();
      if (newIndex != currentIndex) {
        var audioElement = $($(event.currentTarget).closest('.hotgraphicWithAudio-popup').siblings('.hotgraphicWithAudio-graphic-pin')[newIndex]).find('.hotgraphicWithAudio-item-audio audio')[0];
        this.playAudioForElement(audioElement);
      }
    },

    nextHotGraphic: function(event) {
      event.preventDefault();
      var currentIndex = this.$('.hotgraphicWithAudio-item.active').index();
      if (currentIndex < (this.$('.hotgraphicWithAudio-item').length - 1)) {
        this.$('.hotgraphicWithAudio-item.active').hide().removeClass('active');
        this.$('.hotgraphicWithAudio-item').eq(currentIndex + 1).show().addClass('active');
        this.setVisited(currentIndex + 1);
        this.$('.hotgraphicWithAudio-popup-count .current').html(currentIndex + 2);
      }
      var newIndex = $('.hotgraphicWithAudio-item.active').index();
      if (newIndex != currentIndex) {
        var audioElement = $($(event.currentTarget).closest('.hotgraphicWithAudio-popup').siblings('.hotgraphicWithAudio-graphic-pin')[newIndex]).find('.hotgraphicWithAudio-item-audio audio')[0];
        this.playAudioForElement(audioElement);
      }
    },

    setVisited: function(index) {
      var item = this.model.get('items')[index];
      item._isVisited = true;
      this.$('.hotgraphicWithAudio-graphic-pin').eq(index).addClass('visited');
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

  Adapt.register("hotgraphicWithAudio", HotGraphicWithAudio);
  return HotGraphicWithAudio;

});