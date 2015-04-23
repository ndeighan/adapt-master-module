/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'Group',
            type:'group',
            rect:['328','116','343','117','auto','auto'],
            c:[
            {
               id:'RoundRect',
               type:'rect',
               rect:['0px','0px','343px','117px','auto','auto'],
               borderRadius:["10px","10px","10px","10px"],
               fill:["rgba(192,192,192,1)"],
               stroke:[0,"rgba(0,0,0,1)","none"]
            },
            {
               id:'Five',
               type:'text',
               rect:['71px','34px','auto','auto','auto','auto'],
               text:"5",
               font:['Arial, Helvetica, sans-serif',43,"rgba(0,0,0,1)","normal","none",""]
            },
            {
               id:'Four',
               type:'text',
               rect:['111px','34px','auto','auto','auto','auto'],
               text:"4",
               font:['Arial, Helvetica, sans-serif',43,"rgba(0,0,0,1)","normal","none",""]
            },
            {
               id:'Three',
               type:'text',
               rect:['152px','34px','auto','auto','auto','auto'],
               text:"3",
               font:['Arial, Helvetica, sans-serif',43,"rgba(0,0,0,1)","normal","none",""]
            },
            {
               id:'Two',
               type:'text',
               rect:['192px','34px','auto','auto','auto','auto'],
               text:"2",
               font:['Arial, Helvetica, sans-serif',43,"rgba(0,0,0,1)","normal","none",""]
            },
            {
               id:'One',
               type:'text',
               rect:['233px','34px','auto','auto','auto','auto'],
               text:"1",
               font:['Arial, Helvetica, sans-serif',43,"rgba(0,0,0,1)","normal","none",""]
            }]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_RoundRect}": [
            ["style", "top", '0px'],
            ["style", "left", '-704px'],
            ["color", "background-color", 'rgba(63,184,251,1.00)']
         ],
         "${_One}": [
            ["style", "top", '44px'],
            ["style", "opacity", '0.000000'],
            ["style", "left", '233px'],
            ["style", "font-size", '43px']
         ],
         "${_Five}": [
            ["style", "top", '34px'],
            ["style", "opacity", '0'],
            ["style", "left", '71px'],
            ["style", "font-size", '43px']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "overflow", 'hidden'],
            ["style", "height", '350px'],
            ["style", "width", '1024px']
         ],
         "${_Three}": [
            ["style", "top", '34px'],
            ["style", "opacity", '0.000000'],
            ["style", "left", '152px'],
            ["style", "font-size", '43px']
         ],
         "${_Two}": [
            ["style", "top", '34px'],
            ["style", "opacity", '0.000000'],
            ["style", "left", '192px'],
            ["style", "font-size", '43px']
         ],
         "${_Four}": [
            ["style", "top", '34px'],
            ["style", "opacity", '0'],
            ["style", "left", '111px'],
            ["style", "font-size", '43px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 3500,
         autoPlay: true,
         timeline: [
            { id: "eid56", tween: [ "style", "${_One}", "left", '233px', { fromValue: '233px'}], position: 3500, duration: 0 },
            { id: "eid31", tween: [ "style", "${_Three}", "opacity", '1', { fromValue: '0.000000'}], position: 2000, duration: 500 },
            { id: "eid33", tween: [ "style", "${_One}", "opacity", '1', { fromValue: '0.000000'}], position: 3000, duration: 500 },
            { id: "eid55", tween: [ "style", "${_Two}", "left", '192px', { fromValue: '192px'}], position: 3500, duration: 0 },
            { id: "eid53", tween: [ "style", "${_Four}", "left", '111px', { fromValue: '111px'}], position: 3500, duration: 0 },
            { id: "eid52", tween: [ "style", "${_Five}", "left", '71px', { fromValue: '71px'}], position: 3500, duration: 0 },
            { id: "eid59", tween: [ "style", "${_One}", "top", '44px', { fromValue: '44px'}], position: 3500, duration: 0 },
            { id: "eid32", tween: [ "style", "${_Two}", "opacity", '1', { fromValue: '0.000000'}], position: 2500, duration: 500 },
            { id: "eid3", tween: [ "style", "${_RoundRect}", "left", '0px', { fromValue: '-704px'}], position: 0, duration: 1061 },
            { id: "eid54", tween: [ "style", "${_Three}", "left", '152px', { fromValue: '152px'}], position: 3500, duration: 0 },
            { id: "eid28", tween: [ "style", "${_Five}", "opacity", '1', { fromValue: '0.000000'}], position: 1061, duration: 439 },
            { id: "eid30", tween: [ "style", "${_Four}", "opacity", '1', { fromValue: '0.000000'}], position: 1500, duration: 500 },
            { id: "eid5", tween: [ "color", "${_RoundRect}", "background-color", 'rgba(63,184,251,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(63,184,251,1.00)'}], position: 0, duration: 0 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-138156337");
