!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=10)}([function(e,t,n){"use strict";var r,i;!function(o,a){r=a,void 0!==(i="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=i)}(0,function(){function e(e,t){return t=t||O,B.test(e)?t.getElementsByClassName(e.slice(1)):R.test(e)?t.getElementsByTagName(e):t.querySelectorAll(e)}function t(e){if(!N){N=O.implementation.createHTMLDocument();var t=N.createElement("base");t.href=O.location.href,N.head.appendChild(t)}return N.body.innerHTML=e,N.body.childNodes}function n(e){"loading"!==O.readyState?e():O.addEventListener("DOMContentLoaded",e)}function r(r,i){if(!r)return this;if(r.cash&&r!==M)return r;var o,a=r,s=0;if(H(r))a=I.test(r)?O.getElementById(r.slice(1)):D.test(r)?t(r):e(r,i);else if(j(r))return n(r),this;if(!a)return this;if(a.nodeType||a===M)this[0]=a,this.length=1;else for(o=this.length=a.length;s<o;s++)this[s]=a[s];return this}function i(e,t){return new r(e,t)}function o(e,t){for(var n=e.length,r=0;r<n&&t.call(e[r],e[r],r,e)!==!1;r++);}function a(e,t){var n=e&&(e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector);return!!n&&n.call(e,t)}function s(e){return H(e)?a:e.cash?function(t){return e.is(t)}:function(e,t){return e===t}}function u(e){return i(x.call(e).filter(function(e,t,n){return n.indexOf(e)===t}))}function l(e){return e[z]=e[z]||{}}function c(e,t,n){return l(e)[t]=n}function f(e,t){var n=l(e);return void 0===n[t]&&(n[t]=e.dataset?e.dataset[t]:i(e).attr("data-"+t)),n[t]}function d(e,t){var n=l(e);n?delete n[t]:e.dataset?delete e.dataset[t]:i(e).removeAttr("data-"+name)}function h(e){return H(e)&&e.match(F)}function v(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)}function p(e,t,n){e.classList?e.classList.add(t):n.indexOf(" "+t+" ")&&(e.className+=" "+t)}function m(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(t,"")}function _(e,t){return parseInt(M.getComputedStyle(e[0],null)[t],10)||0}function g(e,t,n){var r=f(e,"_cashEvents")||c(e,"_cashEvents",{});r[t]=r[t]||[],r[t].push(n),e.addEventListener(t,n)}function y(e,t,n){var r,i=f(e,"_cashEvents"),a=i&&i[t];a&&(n?(e.removeEventListener(t,n),(r=a.indexOf(n))>=0&&a.splice(r,1)):(o(a,function(n){e.removeEventListener(t,n)}),a=[]))}function b(e,t){return"&"+encodeURIComponent(e)+"="+encodeURIComponent(t).replace(/%20/g,"+")}function w(e){var t=[];return o(e.options,function(e){e.selected&&t.push(e.value)}),t.length?t:null}function L(e){var t=e.selectedIndex;return t>=0?e.options[t].value:null}function E(e){var t=e.type;if(!t)return null;switch(t.toLowerCase()){case"select-one":return L(e);case"select-multiple":return w(e);case"radio":case"checkbox":return e.checked?e.value:null;default:return e.value?e.value:null}}function T(e,t,n){if(n){var r=e.childNodes[0];e.insertBefore(t,r)}else e.appendChild(t)}function C(e,t,n){var r=H(t);if(!r&&t.length)return void o(t,function(t){return C(e,t,n)});o(e,r?function(e){return e.insertAdjacentHTML(n?"afterbegin":"beforeend",t)}:function(e,r){return T(e,0===r?t:t.cloneNode(!0),n)})}var N,O=document,M=window,k=Array.prototype,x=k.slice,S=k.filter,A=k.push,P=function(){},j=function(e){return typeof e==typeof P&&e.call},H=function(e){return"string"==typeof e},I=/^#[\w-]*$/,B=/^\.[\w-]*$/,D=/<.+>/,R=/^\w+$/,q=i.fn=i.prototype=r.prototype={cash:!0,length:0,push:A,splice:k.splice,map:k.map,init:r};Object.defineProperty(q,"constructor",{value:i}),i.parseHTML=t,i.noop=P,i.isFunction=j,i.isString=H,i.extend=q.extend=function(e){e=e||{};var t=x.call(arguments),n=t.length,r=1;for(1===t.length&&(e=this,r=0);r<n;r++)if(t[r])for(var i in t[r])t[r].hasOwnProperty(i)&&(e[i]=t[r][i]);return e},i.extend({merge:function(e,t){for(var n=+t.length,r=e.length,i=0;i<n;r++,i++)e[r]=t[i];return e.length=r,e},each:o,matches:a,unique:u,isArray:Array.isArray,isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)}});var z=i.uid="_cash"+Date.now();q.extend({data:function(e,t){if(H(e))return void 0===t?f(this[0],e):this.each(function(n){return c(n,e,t)});for(var n in e)this.data(n,e[n]);return this},removeData:function(e){return this.each(function(t){return d(t,e)})}});var F=/\S+/g;q.extend({addClass:function(e){var t=h(e);return t?this.each(function(e){var n=" "+e.className+" ";o(t,function(t){p(e,t,n)})}):this},attr:function(e,t){if(e){if(H(e))return void 0===t?this[0]?this[0].getAttribute?this[0].getAttribute(e):this[0][e]:void 0:this.each(function(n){n.setAttribute?n.setAttribute(e,t):n[e]=t});for(var n in e)this.attr(n,e[n]);return this}},hasClass:function(e){var t=!1,n=h(e);return n&&n.length&&this.each(function(e){return!(t=v(e,n[0]))}),t},prop:function(e,t){if(H(e))return void 0===t?this[0][e]:this.each(function(n){n[e]=t});for(var n in e)this.prop(n,e[n]);return this},removeAttr:function(e){return this.each(function(t){t.removeAttribute?t.removeAttribute(e):delete t[e]})},removeClass:function(e){if(!arguments.length)return this.attr("class","");var t=h(e);return t?this.each(function(e){o(t,function(t){m(e,t)})}):this},removeProp:function(e){return this.each(function(t){delete t[e]})},toggleClass:function(e,t){if(void 0!==t)return this[t?"addClass":"removeClass"](e);var n=h(e);return n?this.each(function(e){var t=" "+e.className+" ";o(n,function(n){v(e,n)?m(e,n):p(e,n,t)})}):this}}),q.extend({add:function(e,t){return u(i.merge(this,i(e,t)))},each:function(e){return o(this,e),this},eq:function(e){return i(this.get(e))},filter:function(e){if(!e)return this;var t=j(e)?e:s(e);return i(S.call(this,function(n){return t(n,e)}))},first:function(){return this.eq(0)},get:function(e){return void 0===e?x.call(this):e<0?this[e+this.length]:this[e]},index:function(e){var t=e?i(e)[0]:this[0],n=e?this:i(t).parent().children();return x.call(n).indexOf(t)},last:function(){return this.eq(-1)}});var U=function(){return function(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return e[0===t?"toLowerCase":"toUpperCase"]()}).replace(/[\s-_]+/g,"")}}(),Y=function(){var e={},t=document,n=t.createElement("div"),r=n.style;return function(t){if(t=U(t),e[t])return e[t];var n=t.charAt(0).toUpperCase()+t.slice(1);return o((t+" "+["webkit","moz","ms","o"].join(n+" ")+n).split(" "),function(n){if(n in r)return e[n]=t=e[t]=n,!1}),e[t]}}();i.prefixedProp=Y,i.camelCase=U,q.extend({css:function(e,t){if(H(e))return e=Y(e),arguments.length>1?this.each(function(n){return n.style[e]=t}):M.getComputedStyle(this[0])[e];for(var n in e)this.css(n,e[n]);return this}}),o(["Width","Height"],function(e){var t=e.toLowerCase();q[t]=function(){return this[0].getBoundingClientRect()[t]},q["inner"+e]=function(){return this[0]["client"+e]},q["outer"+e]=function(t){return this[0]["offset"+e]+(t?_(this,"margin"+("Width"===e?"Left":"Top"))+_(this,"margin"+("Width"===e?"Right":"Bottom")):0)}}),q.extend({off:function(e,t){return this.each(function(n){return y(n,e,t)})},on:function(e,t,r,i){var o;if(!H(e)){for(var s in e)this.on(s,t,e[s]);return this}return j(t)&&(r=t,t=null),"ready"===e?(n(r),this):(t&&(o=r,r=function(e){for(var n=e.target;!a(n,t);){if(n===this)return n=!1;n=n.parentNode}n&&o.call(n,e)}),this.each(function(t){var n=r;i&&(n=function(){r.apply(this,arguments),y(t,e,n)}),g(t,e,n)}))},one:function(e,t,n){return this.on(e,t,n,!0)},ready:n,trigger:function(e,t){var n=O.createEvent("HTMLEvents");return n.data=t,n.initEvent(e,!0,!1),this.each(function(e){return e.dispatchEvent(n)})}}),q.extend({serialize:function(){var e="";return o(this[0].elements||this,function(t){if(!t.disabled&&"FIELDSET"!==t.tagName){var n=t.name;switch(t.type.toLowerCase()){case"file":case"reset":case"submit":case"button":break;case"select-multiple":var r=E(t);null!==r&&o(r,function(t){e+=b(n,t)});break;default:var i=E(t);null!==i&&(e+=b(n,i))}}}),e.substr(1)},val:function(e){return void 0===e?E(this[0]):this.each(function(t){return t.value=e})}}),q.extend({after:function(e){return i(e).insertAfter(this),this},append:function(e){return C(this,e),this},appendTo:function(e){return C(i(e),this),this},before:function(e){return i(e).insertBefore(this),this},clone:function(){return i(this.map(function(e){return e.cloneNode(!0)}))},empty:function(){return this.html(""),this},html:function(e){if(void 0===e)return this[0].innerHTML;var t=e.nodeType?e[0].outerHTML:e;return this.each(function(e){return e.innerHTML=t})},insertAfter:function(e){var t=this;return i(e).each(function(e,n){var r=e.parentNode,i=e.nextSibling;t.each(function(e){r.insertBefore(0===n?e:e.cloneNode(!0),i)})}),this},insertBefore:function(e){var t=this;return i(e).each(function(e,n){var r=e.parentNode;t.each(function(t){r.insertBefore(0===n?t:t.cloneNode(!0),e)})}),this},prepend:function(e){return C(this,e,!0),this},prependTo:function(e){return C(i(e),this,!0),this},remove:function(){return this.each(function(e){return e.parentNode.removeChild(e)})},text:function(e){return void 0===e?this[0].textContent:this.each(function(t){return t.textContent=e})}});var $=O.documentElement;return q.extend({position:function(){var e=this[0];return{left:e.offsetLeft,top:e.offsetTop}},offset:function(){var e=this[0].getBoundingClientRect();return{top:e.top+M.pageYOffset-$.clientTop,left:e.left+M.pageXOffset-$.clientLeft}},offsetParent:function(){return i(this[0].offsetParent)}}),q.extend({children:function(e){var t=[];return this.each(function(e){A.apply(t,e.children)}),t=u(t),e?t.filter(function(t){return a(t,e)}):t},closest:function(e){return!e||this.length<1?i():this.is(e)?this.filter(e):this.parent().closest(e)},is:function(e){if(!e)return!1;var t=!1,n=s(e);return this.each(function(r){return!(t=n(r,e))}),t},find:function(t){if(!t||t.nodeType)return i(t&&this.has(t).length?t:null);var n=[];return this.each(function(r){A.apply(n,e(t,r))}),u(n)},has:function(t){var n=H(t)?function(n){return 0!==e(t,n).length}:function(e){return e.contains(t)};return this.filter(n)},next:function(){return i(this[0].nextElementSibling)},not:function(e){if(!e)return this;var t=s(e);return this.filter(function(n){return!t(n,e)})},parent:function(){var e=[];return this.each(function(t){t&&t.parentNode&&e.push(t.parentNode)}),u(e)},parents:function(e){var t,n=[];return this.each(function(r){for(t=r;t&&t.parentNode&&t!==O.body.parentNode;)t=t.parentNode,(!e||e&&a(t,e))&&n.push(t)}),u(n)},prev:function(){return i(this[0].previousElementSibling)},siblings:function(){var e=this.parent().children(),t=this[0];return e.filter(function(e){return e!==t})}}),i})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(4),o=r(i),a=n(2),s=r(a),u=n(9),l=r(u),c=n(5),f=r(c);t.default=[s.default,l.default,o.default,f.default]},function(e,t,n){"use strict";function r(e,t){(0,o.default)(a,e,t,!1)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=function(e){return e&&e.__esModule?e:{default:e}}(i),a="accordion";t.default={launch:r,className:a}},function(e,t,n){"use strict";function r(e,t,n,r){var i=e+"__heading",a=(0,o.default)(t).children("h2,h3,h4,div."+i),s=[],u=function(){var e=this,t=(0,o.default)(this).parent().hasClass("active");s.forEach(function(n){var r=n[0]===e&&!t;n.parent().toggleClass("active",r),n.parent().toggleClass("inactive",!r)})};a.each(function(t,r){(0,o.default)(t).addClass(i+" inactive");var a=(0,o.default)("<a/>");if(s.push(a),a.attr("href","#t"+(n+1)+"-"+(r+1)),1===t.childNodes.length&&t.childNodes[0].nodeType===Node.TEXT_NODE){var l=(0,o.default)("<span/>");l.html((0,o.default)(t).html()),(0,o.default)(t).empty(),l.addClass(e+"__heading__label"),a.append(l)}else a.append((0,o.default)(t).children());var c=(0,o.default)("<span/>");c.attr("aria-hidden","true"),c.addClass(i+"__icon"),a.append(c),a.on("click",u),(0,o.default)(t).append(a)})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(i)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){new i.default({elements_selector:".lazy-load",data_src:"src",threshold:0,callback_load:function(e){e.style.paddingBottom=0}})};var r=n(15),i=function(e){return e&&e.__esModule?e:{default:e}}(r)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){new u.default((0,a.default)(this),l.tree,l.current).launch()}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=r(o),s=n(6),u=r(s),l=n(7);t.default={className:"nav-mobile",launch:i}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){return 0===e.children.length?0:1+e.children.reduce(function(e,t){return Math.max(e,i(t))},0)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),s=function(e){return e&&e.__esModule?e:{default:e}}(a),u=function(){function e(t,n,i){r(this,e),this.nav=t,this.overlay=(0,s.default)("<div></div>").addClass("nav-mobile__overlay").appendTo(this.nav),this.tree=n,this.defaultOpen=i,this.levelElements=[],this.openLevels=[]}return o(e,[{key:"launch",value:function(){var e=this;this.nav.children(".nav-mobile__toggle").on("click",function(t){t.preventDefault(),e.openNav()});var t=this.backTo.bind(this),n=this.levelDown.bind(this);this.nav.on("click","[data-back-to]",function(){t(parseInt((0,s.default)(this).attr("data-back-to")))}),this.nav.on("click","[data-down-to]",function(){n(parseInt((0,s.default)(this).attr("data-down-to")),parseInt((0,s.default)(this).attr("data-index")))}),this.prepareLevels(),this.openNav()}},{key:"prepareLevels",value:function(){for(var e=i(this.tree),t=0;t<e;t++){var n=(0,s.default)("<div></div>").addClass("nav-mobile__level nav-mobile__level--l"+t);if(t>0){var r=(0,s.default)("<div></div>").addClass("nav-mobile__level__header").appendTo(n);(0,s.default)('<a href="#" class="nav-mobile__goto-link"><span class="fa fa-angle-left" aria-hidden="true"></span></a>').attr("data-back-to",t-1).appendTo(r),r.append('<a class="nav-mobile__page-link"><span class="nav-mobile__page-link__label"></span></a>')}(0,s.default)("<ul></ul>").appendTo(n),this.levelElements[t]=n,this.overlay.append(n)}}},{key:"levelDown",value:function(e,t){var n=this.openLevels[e-1],r=n.children[t];this.setLevelMenu(e,r),this.goToLevel(e)}},{key:"backTo",value:function(e){this.goToLevel(e)}},{key:"goToLevel",value:function(e){this.levelElements.forEach(function(t,n){t.toggleClass("nav-mobile__level--left",n<e),t.toggleClass("nav-mobile__level--center",n===e),t.toggleClass("nav-mobile__level--right",n>e)})}},{key:"openNav",value:function(){var e=this;this.nav.addClass("open"),this.defaultOpen.forEach(function(t,n){return e.setLevelMenu(n,t)}),this.goToLevel(this.defaultOpen.length-1)}},{key:"setLevelMenu",value:function(e,t){var n=this.levelElements[e];this.openLevels[e]=t,t.name&&n.find(".nav-mobile__level__header .nav-mobile__page-link__label").html(t.name);var r=n.children("ul");r.empty(),t.children.forEach(function(t,n){var i=(0,s.default)("<li></li>").appendTo(r);(0,s.default)('<a class="nav-mobile__page-link"></a>').attr("href",t.url).append((0,s.default)('<span class="nav-mobile__page-link__label"></span>').html(t.name)).appendTo(i),t.children.length>0&&(0,s.default)('<a class="nav-mobile__goto-link" href="#"><span class="fa fa-angle-right" aria-hidden="true"></span></a>').attr("data-down-to",e+1).attr("data-index",n).appendTo(i)})}}]),e}();t.default=u},function(e,t,n){"use strict";function r(e){for(var t=0;t<e.length;t++)if(e[t].type>0)return e[t];return null}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=/^\s*([0-9]) ([^\s]+) ([0-9]) (.+)$/,a=function(e){var t={name:null,index:null,url:null,type:null,level:null,children:[]},n=[t];e.split(/\r?\n/).forEach(function(e){var t=e.match(o);if(t){var r=i(t,5),a=r[1],s=r[2],u=r[3],l=r[4],c=parseInt(a),f=parseInt(u),d=n[c-1],h={level:c,type:f,url:s,name:l,children:[],index:d.children.length};d.children.push(h),n[c]=h}});for(var a=t,s=[];a&&a.children.length>0;)s.push(a),a=r(a.children);return{tree:t,current:s}}(function(){return document.getElementById("nav-mobile__data").innerHTML}()),s=a.tree,u=a.current;t.tree=s,t.current=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=t.id,r=t.params,i="ytev-"+n,o=e.children("a"),s={width:o.width(),height:o.height()},l=(0,u.default)({},h,s,r,{videoId:n,events:{onInit:function(){(0,a.default)("<div/>").attr("id",i).attr(s).insertBefore(o),e.addClass("video-preview-wrapper--loading")},onReady:function(t){e.removeClass("video-preview-wrapper--loading"),e.addClass("media"),e.addClass("media--youtube"),e.children(":not(#"+i+")").remove();var n=t.target,r=e.children("iframe");n.playVideo(),(0,a.default)(document).on("scroll",function(){(0,d.default)(r)<.5&&n.pauseVideo()})}}});(0,c.default)(i,l)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var o=n(0),a=r(o),s=n(14),u=r(s),l=n(13),c=r(l),f=n(12),d=r(f),h={frameBorder:"0"}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){var t=e.attr("href")||"",n=(0,c.default)(e),r=t.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/);return r?{type:"youtube",id:r[1],params:n}:null}function o(e){var t=(0,u.default)(e),n=i(t);if(n){var r=t.parent(),o=null;r.hasClass("video-preview-wrapper")?o=r:"figure"===r.prop("tagName").toLowerCase()?(o=r,o.addClass("video-preview-wrapper")):(o=(0,u.default)("<figure/>").addClass("video-preview-wrapper").insertBefore(t),o.append(t)),t.on("click",function(e){a(o,n),e.preventDefault()})}}function a(e,t){switch(t.type){case"youtube":return(0,d.default)(e,t);default:return!1}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(0),u=r(s),l=n(11),c=r(l),f=n(8),d=r(f);t.default={className:"video-preview",launch:o}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){if("function"==typeof e)e();else if(e.className){var t=e.className,n=e.launch;(0,a.default)("."+t+":not(."+t+"-njs)").each(n)}}var o=n(0),a=r(o),s=n(1),u=r(s);!function(){u.default.forEach(i)}()},function(e,t,n){"use strict";function r(e){return Array.from(e.get(0).attributes).reduce(function(e,t){var n=t.nodeName.match(i);return n&&(e[n[1]]=t.nodeValue),e},{})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=/^data-(.+)$/},function(e,t,n){"use strict";function r(e){var t=window.scrollY,n=t+window.innerHeight,r=e.offset().top,i=e.height(),o=r+i,a=Math.max(r,t);return(Math.min(o,n)-a)/i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t){l===u?i(e,t):(c.push({id:e,data:t}),l===a&&o())}function i(e,t){t&&t.events&&t.events.onInit&&t.events.onInit();var n=new YT.Player(e,t);f[e]={player:n,data:t}}function o(){l=s,window.onYouTubeIframeAPIReady=function(){c.forEach(function(e){return i(e.id,e.data)})};var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a="UNLOADED",s="LOADING",u="LOADED",l=a,c=[],f={}},function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,i=Object.prototype.toString,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===i.call(e)},a=function(e){if(!e||"[object Object]"!==i.call(e))return!1;var t=r.call(e,"constructor"),n=e.constructor&&e.constructor.prototype&&r.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!t&&!n)return!1;var o;for(o in e);return void 0===o||r.call(e,o)};e.exports=function e(){var t,n,r,i,s,u,l=arguments[0],c=1,f=arguments.length,d=!1;for("boolean"==typeof l&&(d=l,l=arguments[1]||{},c=2),(null==l||"object"!=typeof l&&"function"!=typeof l)&&(l={});c<f;++c)if(null!=(t=arguments[c]))for(n in t)r=l[n],i=t[n],l!==i&&(d&&i&&(a(i)||(s=o(i)))?(s?(s=!1,u=r&&o(r)?r:[]):u=r&&a(r)?r:{},l[n]=e(d,u,i)):void 0!==i&&(l[n]=i));return l}},function(e,t,n){var r,i,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(o,s){"object"===a(t)&&void 0!==e?e.exports=s():(r=s,void 0!==(i="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=i))}(0,function(){"use strict";var e={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},t=!("onscroll"in window)||/glebot/.test(navigator.userAgent),n=function(e,t){e&&e(t)},r=function(e){return e.getBoundingClientRect().top+window.pageYOffset-e.ownerDocument.documentElement.clientTop},i=function(e,t,n){return(t===window?window.innerHeight+window.pageYOffset:r(t)+t.offsetHeight)<=r(e)-n},a=function(e){return e.getBoundingClientRect().left+window.pageXOffset-e.ownerDocument.documentElement.clientLeft},s=function(e,t,n){var r=window.innerWidth;return(t===window?r+window.pageXOffset:a(t)+r)<=a(e)-n},u=function(e,t,n){return(t===window?window.pageYOffset:r(t))>=r(e)+n+e.offsetHeight},l=function(e,t,n){return(t===window?window.pageXOffset:a(t))>=a(e)+n+e.offsetWidth},c=function(e,t,n){return!(i(e,t,n)||u(e,t,n)||s(e,t,n)||l(e,t,n))},f=function(e,t){var n=new e(t),r=new CustomEvent("LazyLoad::Initialized",{detail:{instance:n}});window.dispatchEvent(r)},d=function(e,t){var n=e.parentElement;if("PICTURE"===n.tagName)for(var r=0;r<n.children.length;r++){var i=n.children[r];if("SOURCE"===i.tagName){var o=i.dataset[t];o&&i.setAttribute("srcset",o)}}},h=function(e,t,n){var r=e.tagName,i=e.dataset[n];if("IMG"===r){d(e,t);var o=e.dataset[t];return o&&e.setAttribute("srcset",o),void(i&&e.setAttribute("src",i))}if("IFRAME"===r)return void(i&&e.setAttribute("src",i));i&&(e.style.backgroundImage="url("+i+")")},v=function(t){this._settings=o({},e,t),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};v.prototype={_reveal:function(e){var t=this._settings,r=function r(){t&&(e.removeEventListener("load",i),e.removeEventListener("error",r),e.classList.remove(t.class_loading),e.classList.add(t.class_error),n(t.callback_error,e))},i=function i(){t&&(e.classList.remove(t.class_loading),e.classList.add(t.class_loaded),e.removeEventListener("load",i),e.removeEventListener("error",r),n(t.callback_load,e))};"IMG"!==e.tagName&&"IFRAME"!==e.tagName||(e.addEventListener("load",i),e.addEventListener("error",r),e.classList.add(t.class_loading)),h(e,t.data_srcset,t.data_src),n(t.callback_set,e)},_loopThroughElements:function(){var e=this._settings,r=this._elements,i=r?r.length:0,o=void 0,a=[],s=this._isFirstLoop;for(o=0;o<i;o++){var u=r[o];e.skip_invisible&&null===u.offsetParent||(t||c(u,e.container,e.threshold))&&(s&&u.classList.add(e.class_initial),this._reveal(u),a.push(o),u.dataset.wasProcessed=!0)}for(;a.length>0;)r.splice(a.pop(),1),n(e.callback_processed,r.length);0===i&&this._stopScrollHandler(),s&&(this._isFirstLoop=!1)},_purgeElements:function(){var e=this._elements,t=e.length,n=void 0,r=[];for(n=0;n<t;n++)e[n].dataset.wasProcessed&&r.push(n);for(;r.length>0;)e.splice(r.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var e=this,t=this._settings.throttle;0!==t?function(){var n=function(){(new Date).getTime()},r=n(),i=t-(r-e._previousLoopTime);i<=0||i>t?(e._loopTimeout&&(clearTimeout(e._loopTimeout),e._loopTimeout=null),e._previousLoopTime=r,e._loopThroughElements()):e._loopTimeout||(e._loopTimeout=setTimeout(function(){this._previousLoopTime=n(),this._loopTimeout=null,this._loopThroughElements()}.bind(e),i))}():this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var p=window.lazyLoadOptions;return p&&function(e,t){var n=t.length;if(n)for(var r=0;r<n;r++)f(e,t[r]);else f(e,t)}(v,p),v})}]);