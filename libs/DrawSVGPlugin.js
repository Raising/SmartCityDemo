/*!
 * VERSION: 0.0.6
 * DATE: 2015-08-22
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * This is a special version of the plugin that is only to be used on certain sites like codepen.io. It will redirect to a page on GreenSock.com if you try using it on a different domain. Please sign up for Club GreenSock to get the fully-functional version at http://greensock.com/club/
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * For licensing details, see http://greensock.com/licensing/
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";function a(a,b,c,d){return c=parseFloat(c)-parseFloat(a),d=parseFloat(d)-parseFloat(b),Math.sqrt(c*c+d*d)}function g(a){return"string"!=typeof a&&a.nodeType||(a=_gsScope.TweenLite.selector(a),a.length&&(a=a[0])),a}function h(a,b,c){var e,f,d=a.indexOf(" ");return-1===d?(e=void 0!==c?c+"":a,f=a):(e=a.substr(0,d),f=a.substr(d+1)),e=-1!==e.indexOf("%")?parseFloat(e)/100*b:parseFloat(e),f=-1!==f.indexOf("%")?parseFloat(f)/100*b:parseFloat(f),e>f?[f,e]:[e,f]}function i(b){if(!b)return 0;b=g(b);var d,e,f,h,i,j,k,l,c=b.tagName.toLowerCase();if("path"===c)i=b.style.strokeDasharray,b.style.strokeDasharray="none",d=b.getTotalLength()||0,e=b.getBBox(),b.style.strokeDasharray=i;else if("rect"===c)e=b.getBBox(),d=2*(e.width+e.height);else if("circle"===c)d=2*Math.PI*parseFloat(b.getAttribute("r"));else if("line"===c)d=a(b.getAttribute("x1"),b.getAttribute("y1"),b.getAttribute("x2"),b.getAttribute("y2"));else if("polyline"===c||"polygon"===c)for(f=b.getAttribute("points").split(" "),d=0,i=f[0].split(","),"polygon"===c&&(f.push(f[0]),-1===f[0].indexOf(",")&&f.push(f[1])),j=1;j<f.length;j++)h=f[j].split(","),1===h.length&&(h[1]=f[j++]),2===h.length&&(d+=a(i[0],i[1],h[0],h[1])||0,i=h);else"ellipse"===c&&(k=parseFloat(b.getAttribute("rx")),l=parseFloat(b.getAttribute("ry")),d=Math.PI*(3*(k+l)-Math.sqrt((3*k+l)*(k+3*l))));return d||0}function l(a,b){if(!a)return[0,0];a=g(a),b=b||i(a)+1;var c=j(a),d=c.strokeDasharray||"",e=parseFloat(c.strokeDashoffset),f=d.indexOf(",");return 0>f&&(f=d.indexOf(" ")),d=0>f?b:parseFloat(d.substr(0,f))||1e-5,d>b&&(d=b),[Math.max(0,-e),Math.max(0,d-e)]}var k,b="codepen",c="DrawSVGPlugin",d=String.fromCharCode(103,114,101,101,110,115,111,99,107,46,99,111,109),e=String.fromCharCode(47,114,101,113,117,105,114,101,115,45,109,101,109,98,101,114,115,104,105,112,47),f=function(a){return!0;}(window?window.location.host:""),j=document.defaultView?document.defaultView.getComputedStyle:function(){};k=_gsScope._gsDefine.plugin({propName:"drawSVG",API:2,version:"0.0.6",global:!0,overwriteProps:["drawSVG"],init:function(a,g){if(!a.getBBox)return!1;var m,n,o,k=i(a)+1;return f?(this._style=a.style,g===!0||"true"===g?g="0 100%":g?-1===(g+"").indexOf(" ")&&(g="0 "+g):g="0 0",m=l(a,k),n=h(g,k,m[0]),this._length=k+10,0===m[0]&&0===n[0]?(o=Math.max(1e-5,n[1]-k),this._dash=k+o,this._offset=k-m[1]+o,this._addTween(this,"_offset",this._offset,k-n[1]+o,"drawSVG")):(this._dash=m[1]-m[0]||1e-6,this._offset=-m[0],this._addTween(this,"_dash",this._dash,n[1]-n[0]||1e-5,"drawSVG"),this._addTween(this,"_offset",this._offset,-n[0],"drawSVG")),f):(window.location.href="http://"+d+e+"?plugin="+c+"&source="+b,!1)},set:function(a){this._firstPT&&(this._super.setRatio.call(this,a),this._style.strokeDashoffset=this._offset,this._style.strokeDasharray=1===a||0===a?this._offset<.001&&this._length-this._dash<=10?"none":this._offset===this._dash?"0px, 999999px":this._dash+"px,"+this._length+"px":this._dash+"px,"+this._length+"px")}}),k.getLength=i,k.getPosition=l}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();