# adapt-contrib-media

A basic media component that plays audio and video. This component uses the HTML5 audio and video specification and has a Flash/Silverlight alternative for browsers that don't support HTML5.

The component uses [MediaElement.js (v2.16.3)](http://mediaelementjs.com/), a player with a number of useful features including subtitles and accessible (and CSS-skinnable) controls. MediaElement.js carries an MIT license and is therefore compatible with Adapt.

## Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/cajones/adapt-cli), then from the command line run:

		adapt install adapt-contrib-media

# Configuration

See below for notes regarding the component JSON.

### Component completion

The ```setCompletionOn``` setting controls when the component is set to complete, and accepts the following values: "```inview```", "```play```" and "```ended```".

### MediaElement.js player

In the interest of customisability, all of MediaElement.js's player options can be configured via the component JSON.

The ```_playerOptions``` object is an **optional** dynamic object which can be used to set as many (or as few) of the supported player settings as required. See below for an annotated list of the settings offered as of v2.16.3:

```javascript
"_playerOptions": {
	// if the <video width> is not specified, this is the default
	"defaultVideoWidth": 480,
	// if the <video height> is not specified, this is the default
	"defaultVideoHeight": 270,
	// if set, overrides <video width>
	"videoWidth": -1,
	// if set, overrides <video height>
	"videoHeight": -1,
	// width of audio player
	"audioWidth": 400,
	// height of audio player
	"audioHeight": 30,
	// initial volume when the player starts
	"startVolume": 0.8,
	// useful for <audio> player loops
	"loop": false,
	// enables Flash and Silverlight to resize to content size
	"enableAutosize": true,
	// the order of controls you want on the control bar (and other plugins below)
	"features": ['playpause','progress','current','duration','tracks','volume','fullscreen'],
	// Hide controls when playing and mouse is not over the video
	"alwaysShowControls": false,
	// force iPad's native controls
	"iPadUseNativeControls": false,
	// force iPhone's native controls
	"iPhoneUseNativeControls": false,
	// force Android's native controls
	"AndroidUseNativeControls": false,
	// forces the hour marker (##:00:00)
	"alwaysShowHours": false,
	// show framecount in timecode (##:00:00:00)
	"showTimecodeFrameCount": false,
	// used when showTimecodeFrameCount is set to true
	"framesPerSecond": 25,
	// turns keyboard support on and off for this instance
	"enableKeyboard": true,
	// when this player starts, it will pause other players
	"pauseOtherPlayers": true,
	// array of keyboard commands
	"keyActions": []
}
```

You can check the [MediaElement.js site](http://mediaelementjs.com/#options) for full documentation regarding the player configuration.

***N.B.** as these settings are not implemented by the Adapt community, there is no guarantee that all features and combinations thereof will be compatible with your device set up. See example.json for a suggested configuration that has been confirmed as working on the full range of Adapt's supported devices.*  

## Usage

For example JSON format, see [example.json](https://github.com/adaptlearning/adapt-contrib-media/blob/master/example.json).

**Audio example:**
```json
"_media": {
	"mp3": "course/assets/audio.mp3",
	"ogg": "course/assets/audio.ogg"
},
```

**Video example:**
```json
"_media": {
	"mp4": "course/assets/video.mp4",
	"ogv": "course/assets/video.ogv"
},
```

**YouTube video example:**
```json
"_media": {
	"source": "http://www.youtube.com/watch?v=nOEw9iiopwI",
	"type": "video/youtube"
},
```

## MediaElement.js

For more information about the MediaElement.js player, visit [its GitHub page](https://github.com/johndyer/mediaelement).
