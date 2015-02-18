/*
 * adapt-narrativeWithAudio
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers - Himanshu Rajotia <himanshu.rajotia@credipoint.com>, CrediPoint Solutions <git@credipoint.com>
 */

define(function(require) {
  var ComponentView = require("coreViews/componentView");
  var Adapt = require("coreJS/adapt");

  var NarrativeWithAudio = ComponentView.extend({

    events: function() {
      return Adapt.device.touch == true ? {
        'touchstart .narrativeWithAudio-slider': 'navigateTouch',
        'touchstart .narrativeWithAudio-popup-open': 'openNarrative',
		'touchstart .narrativePlayButton': 'playNarrative',
        'click .narrativeWithAudio-popup-close': 'closeNarrative',
        'click .narrativeWithAudio-controls': 'navigateClick'
      } : {
        'click .narrativeWithAudio-controls': 'navigateClick',
        'click .narrativeWithAudio-popup-open': 'openNarrative',
		'click .narrativePlayButton': 'playNarrative',
        'click .narrativeWithAudio-popup-close': 'closeNarrative'
      }
    },

    preRender: function() {
      this.listenTo(Adapt, 'pageView:ready', this.setupNarrative, this);
      this.listenTo(Adapt, 'device:changed', this.reRender, this);
      this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
      this.setDeviceSize();
    },

    setDeviceSize: function() {
      if (Adapt.device.screenSize === 'large') {
        this.$el.addClass('desktop').removeClass('mobile');
        this.model.set('_isDesktop', true);
      } else {
        this.$el.addClass('mobile').removeClass('desktop');
        this.model.set('_isDesktop', false)
      }
    },

    postRender: function() {
      this.$('.narrativeWithAudio-slider').imageready(_.bind(function() {
        this.setReadyStatus();
      }, this));
    },

    setupNarrative: function() {
      this.setDeviceSize();
      var slideCount = this.$('.narrativeWithAudio-slider-graphic', this.$el).length;
      this.model.set('_itemCount', slideCount);
      this.calculateWidths();

      this.model.set('_active', true);

      if (this.model.get('_stage')) {
        this.setStage(this.model.get('_stage'));
      } else {
        this.setStage(0);
      }
    },

    calculateWidths: function() {
      var slideWidth = this.$('.narrativeWithAudio-slide-container').width();
      var slideCount = this.model.get('_itemCount');
      var extraMargin = parseInt(this.$('.narrativeWithAudio-slider-graphic').css('margin-right'));

      this.$('.narrativeWithAudio-slider-graphic').width(slideWidth);
      this.$('.narrativeWithAudio-slider').width((slideWidth + extraMargin) * slideCount);

      var stage = this.model.get('_stage');
      var margin = -(stage * slideWidth);

      this.$('.narrativeWithAudio-slider').css('margin-left', margin);
    },

    resizeControl: function() {
      this.setDeviceSize();
      this.calculateWidths();
      this.evaluateNavigation();
    },
/**
    reRender: function() {
      if (this.model.get('_wasHotgraphic') && Adapt.device.screenSize == 'large') {
        this.replaceWithHotgraphic();
      }
    },

    replaceWithHotgraphic: function() {
      var Hotgraphic = require('components/adapt-hotgraphicWithAudio/js/adapt-hotgraphicWithAudio');
      var model = this.prepareHotgraphicModel();
      var newHotgraphic = new Hotgraphic({model: model, $parent: this.options.$parent});
      this.options.$parent.append(newHotgraphic.$el);
      Adapt.trigger('device:resize');
      this.remove();
    },

    prepareHotgraphicModel: function() {
      var model = this.model;
      model.set('_component', 'hotgraphicWithAudio');
      model.set('body', model.get('originalBody'));
      return model;
    },
**/
    navigateClick: function(event) {
      event.preventDefault();
      if (!this.model.get('_active')) return;

      var extraMargin = parseInt(this.$('.narrativeWithAudio-slider-graphic').css('margin-right'));
      var movementSize = this.$('.narrativeWithAudio-slide-container').width() + extraMargin;

      var stage = this.model.get('_stage');
      var itemCount = this.model.get('_itemCount');

      if ($(event.currentTarget).hasClass('narrativeWithAudio-control-right')) {
        this.navigateRight(stage, itemCount, movementSize);
      }
      if ($(event.currentTarget).hasClass('narrativeWithAudio-control-left')) {
        this.navigateLeft(stage, movementSize);
      }
    },

    navigateRight: function(stage, itemCount, movementSize) {
      if (stage < itemCount - 1) {
        stage++;
        this.$('.narrativeWithAudio-slider').stop().animate({'margin-left': -(movementSize * stage)});
        if (this.model.get('_isDesktop')) {
          this.$('.narrativeWithAudio-slider-graphic').eq(stage).addClass('visited');
        }

        this.setStage(stage);
      }
    },

    navigateLeft: function(stage, movementSize) {
      if (stage > 0) {
        stage--;
        this.$('.narrativeWithAudio-slider').stop().animate({'margin-left': -(movementSize * stage)});

        this.setStage(stage);
      }
    },

    setStage: function(stage) {
      this.model.set('_stage', stage);

      // Set the visited attribute
      var currentItem = this.model.get('items')[stage];
      currentItem.visited = true;

      this.$('.narrativeWithAudio-progress').removeClass('selected').eq(stage).addClass('selected');
      this.$('.narrativeWithAudio-slider-graphic').children('.controls').attr('tabindex', -1);
      this.$('.narrativeWithAudio-slider-graphic').eq(stage).children('.controls').attr('tabindex', 0);
      this.$('.narrativeWithAudio-content-item').addClass('narrativeWithAudio-hidden').eq(stage).removeClass('narrativeWithAudio-hidden');
      this.$('.narrativeWithAudio-strapline-title').addClass('narrativeWithAudio-hidden').eq(stage).removeClass('narrativeWithAudio-hidden');

      this.evaluateNavigation();
      this.evaluateCompletion();
    },

    navigateSwipe: function(el, stage) {
      var extraMargin = parseInt(this.$('.narrativeWithAudio-slider-graphic').css('margin-right'));
      var strapLineSize = this.$('.narrativeWithAudio-strapline-title').width();
      var movementSize = this.$('.narrativeWithAudio-slide-container').width() + extraMargin;

      $('.narrativeWithAudio-slider', el).animate({'margin-left': -(movementSize * stage)});

      if (this.model.get('_isDesktop')) {
        this.$('.narrativeWithAudio-slider-graphic').eq(stage).addClass('visited');
      }

      this.setStage(stage);
    },

    navigateTouch: function(event) {
      event.preventDefault();
      if (!this.model.get('_active')) return;

      var that = this;
      var xOrigPos = event.originalEvent.touches[0]['pageX'];
      var startPos = parseInt(this.$('.narrativeWithAudio-slider').css('margin-left'));
      var stage = this.model.get('_stage');
      var narrativeSize = this.model.get('_itemCount');
      var move;
      var xPos;
      var onFirst = (stage == 0) ? true : false;
      var onLast = (stage == narrativeSize - 1) ? true : false;
      var swipeLeft = false;
      var swipeRight = false;

      this.$('.narrativeWithAudio-slider').on('touchmove', _.bind(function(event) {
        event.preventDefault();
        xPos = event.originalEvent.touches[0]['pageX'];
        swipeLeft = (xOrigPos > xPos) ? true : false;
        swipeRight = (xOrigPos < xPos) ? true : false;

        // Ensure the user does not scroll beyond the bounds
        if (onFirst && swipeRight || onLast && swipeLeft) return;

        if (swipeRight && !onLast || swipeLeft && !onFirst) {
          move = (xPos + startPos) - xOrigPos;
        }
        else {
          move = (xPos - xOrigPos) / 4 + (startPos);
        }

        this.$('.narrativeWithAudio-slider').css('margin-left', move);
      }, this));

      this.$('.narrativeWithAudio-slider').one('touchend', _.bind(function(event) {
        event.preventDefault();
        $('.narrativeWithAudio-slider', that.$el).unbind('touchmove');

        if (swipeRight || swipeLeft) {
          if (swipeLeft && !onLast) stage++;
          if (swipeRight && !onFirst) stage--;
        } else {
          return;
        }

        that.navigateSwipe(that.$el, stage);
      }, this));
    },

    evaluateNavigation: function() {
      var currentStage = this.model.get('_stage');
      var itemCount = this.model.get('_itemCount');

      if (currentStage == 0) {
        this.$('.narrativeWithAudio-control-left').addClass('narrativeWithAudio-hidden');

        if (itemCount > 1) {
          this.$('.narrativeWithAudio-control-right').removeClass('narrativeWithAudio-hidden');
        }
      } else {
        this.$('.narrativeWithAudio-control-left').removeClass('narrativeWithAudio-hidden');

        if (currentStage == itemCount - 1) {
          this.$('.narrativeWithAudio-control-right').addClass('narrativeWithAudio-hidden');
        } else {
          this.$('.narrativeWithAudio-control-right').removeClass('narrativeWithAudio-hidden');
        }
      }

    },

    getVisitedItems: function() {
      return _.filter(this.model.get('items'), function(item) {
        return item.visited;
      });
    },

    evaluateCompletion: function() {
      if (this.getVisitedItems().length == this.model.get('items').length) {
        this.setCompletionStatus();
      }
    },
	
	playNarrative: function(event) {
	  event.preventDefault();
	  //disables hash link
      this.model.set('_active', false);
      this.model.set("_currentAudioElement", $(event.currentTarget).siblings('.narrativeWithAudio-item-audio').find('audio')[this.model.get('_stage')]);
      this.playAudioForElement(this.model.get("_currentAudioElement"));	
	  //is class hidden?
	  
	},

    openNarrative: function(event) {
      event.preventDefault();
      this.model.set('_active', false);
      this.model.set("_currentAudioElement", $(event.currentTarget).siblings('.narrativeWithAudio-item-audio').find('audio')[this.model.get('_stage')]);
      this.playAudioForElement(this.model.get("_currentAudioElement"));

      var outerMargin = parseFloat(this.$('.narrativeWithAudio-popup-inner').css('margin'));
      var innerPadding = parseFloat(this.$('.narrativeWithAudio-popup-inner').css('padding'));
      var toolBarHeight = this.$('.narrativeWithAudio-toolbar').height();

      this.$('.narrativeWithAudio-slider-graphic').eq(this.model.get('_stage')).addClass('visited');
      this.$('.narrativeWithAudio-popup-toolbar-title').addClass('narrativeWithAudio-hidden').eq(this.model.get('_stage')).removeClass('narrativeWithAudio-hidden');
      this.$('.narrativeWithAudio-popup-content').addClass('narrativeWithAudio-hidden').eq(this.model.get('_stage')).removeClass('narrativeWithAudio-hidden');
      this.$('.narrativeWithAudio-popup-inner').css('height', $(window).height() - (outerMargin * 2) - (innerPadding * 2));
      this.$('.narrativeWithAudio-popup').removeClass('narrativeWithAudio-hidden');
      this.$('.narrativeWithAudio-popup-content').css('height', (this.$('.narrativeWithAudio-popup-inner').height() - toolBarHeight));
    },

    closeNarrative: function(event) {
      event.preventDefault();
      this.model.set('_active', true);
      this.stopCurrentAudio();

      this.$('.narrativeWithAudio-popup-close').blur();
      this.$('.narrativeWithAudio-popup').addClass('narrativeWithAudio-hidden');

      this.evaluateCompletion();
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
    }

  });

  Adapt.register("narrativeWithAudio", NarrativeWithAudio);
  return NarrativeWithAudio;

});
