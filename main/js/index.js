!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=6)}([function(t,e,n){"use strict";var r,i;!function(o,a){r=a,void 0!==(i="function"==typeof r?r.call(e,n,e,t):r)&&(t.exports=i)}(0,function(){function t(t,e){return e=e||O,I.test(t)?e.getElementsByClassName(t.slice(1)):R.test(t)?e.getElementsByTagName(t):e.querySelectorAll(t)}function e(t){if(!C){C=O.implementation.createHTMLDocument();var e=C.createElement("base");e.href=O.location.href,C.head.appendChild(e)}return C.body.innerHTML=t,C.body.childNodes}function n(t){"loading"!==O.readyState?t():O.addEventListener("DOMContentLoaded",t)}function r(r,i){if(!r)return this;if(r.cash&&r!==A)return r;var o,a=r,u=0;if(j(r))a=B.test(r)?O.getElementById(r.slice(1)):D.test(r)?e(r):t(r,i);else if(P(r))return n(r),this;if(!a)return this;if(a.nodeType||a===A)this[0]=a,this.length=1;else for(o=this.length=a.length;u<o;u++)this[u]=a[u];return this}function i(t,e){return new r(t,e)}function o(t,e){for(var n=t.length,r=0;r<n&&e.call(t[r],t[r],r,t)!==!1;r++);}function a(t,e){var n=t&&(t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector);return!!n&&n.call(t,e)}function u(t){return j(t)?a:t.cash?function(e){return t.is(e)}:function(t,e){return t===e}}function s(t){return i(x.call(t).filter(function(t,e,n){return n.indexOf(t)===e}))}function c(t){return t[F]=t[F]||{}}function l(t,e,n){return c(t)[e]=n}function f(t,e){var n=c(t);return void 0===n[e]&&(n[e]=t.dataset?t.dataset[e]:i(t).attr("data-"+e)),n[e]}function d(t,e){var n=c(t);n?delete n[e]:t.dataset?delete t.dataset[e]:i(t).removeAttr("data-"+name)}function h(t){return j(t)&&t.match(U)}function p(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)}function v(t,e,n){t.classList?t.classList.add(e):n.indexOf(" "+e+" ")&&(t.className+=" "+e)}function m(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(e,"")}function g(t,e){return parseInt(A.getComputedStyle(t[0],null)[e],10)||0}function _(t,e,n){var r=f(t,"_cashEvents")||l(t,"_cashEvents",{});r[e]=r[e]||[],r[e].push(n),t.addEventListener(e,n)}function y(t,e,n){var r,i=f(t,"_cashEvents"),a=i&&i[e];a&&(n?(t.removeEventListener(e,n),(r=a.indexOf(n))>=0&&a.splice(r,1)):(o(a,function(n){t.removeEventListener(e,n)}),a=[]))}function w(t,e){return"&"+encodeURIComponent(t)+"="+encodeURIComponent(e).replace(/%20/g,"+")}function b(t){var e=[];return o(t.options,function(t){t.selected&&e.push(t.value)}),e.length?e:null}function E(t){var e=t.selectedIndex;return e>=0?t.options[e].value:null}function L(t){var e=t.type;if(!e)return null;switch(e.toLowerCase()){case"select-one":return E(t);case"select-multiple":return b(t);case"radio":case"checkbox":return t.checked?t.value:null;default:return t.value?t.value:null}}function T(t,e,n){if(n){var r=t.childNodes[0];t.insertBefore(e,r)}else t.appendChild(e)}function N(t,e,n){var r=j(e);if(!r&&e.length)return void o(e,function(e){return N(t,e,n)});o(t,r?function(t){return t.insertAdjacentHTML(n?"afterbegin":"beforeend",e)}:function(t,r){return T(t,0===r?e:e.cloneNode(!0),n)})}var C,O=document,A=window,S=Array.prototype,x=S.slice,M=S.filter,k=S.push,H=function(){},P=function(t){return typeof t==typeof H&&t.call},j=function(t){return"string"==typeof t},B=/^#[\w-]*$/,I=/^\.[\w-]*$/,D=/<.+>/,R=/^\w+$/,q=i.fn=i.prototype=r.prototype={cash:!0,length:0,push:k,splice:S.splice,map:S.map,init:r};Object.defineProperty(q,"constructor",{value:i}),i.parseHTML=e,i.noop=H,i.isFunction=P,i.isString=j,i.extend=q.extend=function(t){t=t||{};var e=x.call(arguments),n=e.length,r=1;for(1===e.length&&(t=this,r=0);r<n;r++)if(e[r])for(var i in e[r])e[r].hasOwnProperty(i)&&(t[i]=e[r][i]);return t},i.extend({merge:function(t,e){for(var n=+e.length,r=t.length,i=0;i<n;r++,i++)t[r]=e[i];return t.length=r,t},each:o,matches:a,unique:s,isArray:Array.isArray,isNumeric:function(t){return!isNaN(parseFloat(t))&&isFinite(t)}});var F=i.uid="_cash"+Date.now();q.extend({data:function(t,e){if(j(t))return void 0===e?f(this[0],t):this.each(function(n){return l(n,t,e)});for(var n in t)this.data(n,t[n]);return this},removeData:function(t){return this.each(function(e){return d(e,t)})}});var U=/\S+/g;q.extend({addClass:function(t){var e=h(t);return e?this.each(function(t){var n=" "+t.className+" ";o(e,function(e){v(t,e,n)})}):this},attr:function(t,e){if(t){if(j(t))return void 0===e?this[0]?this[0].getAttribute?this[0].getAttribute(t):this[0][t]:void 0:this.each(function(n){n.setAttribute?n.setAttribute(t,e):n[t]=e});for(var n in t)this.attr(n,t[n]);return this}},hasClass:function(t){var e=!1,n=h(t);return n&&n.length&&this.each(function(t){return!(e=p(t,n[0]))}),e},prop:function(t,e){if(j(t))return void 0===e?this[0][t]:this.each(function(n){n[t]=e});for(var n in t)this.prop(n,t[n]);return this},removeAttr:function(t){return this.each(function(e){e.removeAttribute?e.removeAttribute(t):delete e[t]})},removeClass:function(t){if(!arguments.length)return this.attr("class","");var e=h(t);return e?this.each(function(t){o(e,function(e){m(t,e)})}):this},removeProp:function(t){return this.each(function(e){delete e[t]})},toggleClass:function(t,e){if(void 0!==e)return this[e?"addClass":"removeClass"](t);var n=h(t);return n?this.each(function(t){var e=" "+t.className+" ";o(n,function(n){p(t,n)?m(t,n):v(t,n,e)})}):this}}),q.extend({add:function(t,e){return s(i.merge(this,i(t,e)))},each:function(t){return o(this,t),this},eq:function(t){return i(this.get(t))},filter:function(t){if(!t)return this;var e=P(t)?t:u(t);return i(M.call(this,function(n){return e(n,t)}))},first:function(){return this.eq(0)},get:function(t){return void 0===t?x.call(this):t<0?this[t+this.length]:this[t]},index:function(t){var e=t?i(t)[0]:this[0],n=t?this:i(e).parent().children();return x.call(n).indexOf(e)},last:function(){return this.eq(-1)}});var Y=function(){return function(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(t,e){return t[0===e?"toLowerCase":"toUpperCase"]()}).replace(/[\s-_]+/g,"")}}(),z=function(){var t={},e=document,n=e.createElement("div"),r=n.style;return function(e){if(e=Y(e),t[e])return t[e];var n=e.charAt(0).toUpperCase()+e.slice(1);return o((e+" "+["webkit","moz","ms","o"].join(n+" ")+n).split(" "),function(n){if(n in r)return t[n]=e=t[e]=n,!1}),t[e]}}();i.prefixedProp=z,i.camelCase=Y,q.extend({css:function(t,e){if(j(t))return t=z(t),arguments.length>1?this.each(function(n){return n.style[t]=e}):A.getComputedStyle(this[0])[t];for(var n in t)this.css(n,t[n]);return this}}),o(["Width","Height"],function(t){var e=t.toLowerCase();q[e]=function(){return this[0].getBoundingClientRect()[e]},q["inner"+t]=function(){return this[0]["client"+t]},q["outer"+t]=function(e){return this[0]["offset"+t]+(e?g(this,"margin"+("Width"===t?"Left":"Top"))+g(this,"margin"+("Width"===t?"Right":"Bottom")):0)}}),q.extend({off:function(t,e){return this.each(function(n){return y(n,t,e)})},on:function(t,e,r,i){var o;if(!j(t)){for(var u in t)this.on(u,e,t[u]);return this}return P(e)&&(r=e,e=null),"ready"===t?(n(r),this):(e&&(o=r,r=function(t){for(var n=t.target;!a(n,e);){if(n===this)return n=!1;n=n.parentNode}n&&o.call(n,t)}),this.each(function(e){var n=r;i&&(n=function(){r.apply(this,arguments),y(e,t,n)}),_(e,t,n)}))},one:function(t,e,n){return this.on(t,e,n,!0)},ready:n,trigger:function(t,e){var n=O.createEvent("HTMLEvents");return n.data=e,n.initEvent(t,!0,!1),this.each(function(t){return t.dispatchEvent(n)})}}),q.extend({serialize:function(){var t="";return o(this[0].elements||this,function(e){if(!e.disabled&&"FIELDSET"!==e.tagName){var n=e.name;switch(e.type.toLowerCase()){case"file":case"reset":case"submit":case"button":break;case"select-multiple":var r=L(e);null!==r&&o(r,function(e){t+=w(n,e)});break;default:var i=L(e);null!==i&&(t+=w(n,i))}}}),t.substr(1)},val:function(t){return void 0===t?L(this[0]):this.each(function(e){return e.value=t})}}),q.extend({after:function(t){return i(t).insertAfter(this),this},append:function(t){return N(this,t),this},appendTo:function(t){return N(i(t),this),this},before:function(t){return i(t).insertBefore(this),this},clone:function(){return i(this.map(function(t){return t.cloneNode(!0)}))},empty:function(){return this.html(""),this},html:function(t){if(void 0===t)return this[0].innerHTML;var e=t.nodeType?t[0].outerHTML:t;return this.each(function(t){return t.innerHTML=e})},insertAfter:function(t){var e=this;return i(t).each(function(t,n){var r=t.parentNode,i=t.nextSibling;e.each(function(t){r.insertBefore(0===n?t:t.cloneNode(!0),i)})}),this},insertBefore:function(t){var e=this;return i(t).each(function(t,n){var r=t.parentNode;e.each(function(e){r.insertBefore(0===n?e:e.cloneNode(!0),t)})}),this},prepend:function(t){return N(this,t,!0),this},prependTo:function(t){return N(i(t),this,!0),this},remove:function(){return this.each(function(t){return t.parentNode.removeChild(t)})},text:function(t){return void 0===t?this[0].textContent:this.each(function(e){return e.textContent=t})}});var $=O.documentElement;return q.extend({position:function(){var t=this[0];return{left:t.offsetLeft,top:t.offsetTop}},offset:function(){var t=this[0].getBoundingClientRect();return{top:t.top+A.pageYOffset-$.clientTop,left:t.left+A.pageXOffset-$.clientLeft}},offsetParent:function(){return i(this[0].offsetParent)}}),q.extend({children:function(t){var e=[];return this.each(function(t){k.apply(e,t.children)}),e=s(e),t?e.filter(function(e){return a(e,t)}):e},closest:function(t){return!t||this.length<1?i():this.is(t)?this.filter(t):this.parent().closest(t)},is:function(t){if(!t)return!1;var e=!1,n=u(t);return this.each(function(r){return!(e=n(r,t))}),e},find:function(e){if(!e||e.nodeType)return i(e&&this.has(e).length?e:null);var n=[];return this.each(function(r){k.apply(n,t(e,r))}),s(n)},has:function(e){var n=j(e)?function(n){return 0!==t(e,n).length}:function(t){return t.contains(e)};return this.filter(n)},next:function(){return i(this[0].nextElementSibling)},not:function(t){if(!t)return this;var e=u(t);return this.filter(function(n){return!e(n,t)})},parent:function(){var t=[];return this.each(function(e){e&&e.parentNode&&t.push(e.parentNode)}),s(t)},parents:function(t){var e,n=[];return this.each(function(r){for(e=r;e&&e.parentNode&&e!==O.body.parentNode;)e=e.parentNode,(!t||t&&a(e,t))&&n.push(e)}),s(n)},prev:function(){return i(this[0].previousElementSibling)},siblings:function(){var t=this.parent().children(),e=this[0];return t.filter(function(t){return t!==e})}}),i})},function(t,e,n){"use strict";function r(t,e){(0,o.default)(a,t,e,!1)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),o=function(t){return t&&t.__esModule?t:{default:t}}(i),a="accordion";e.default={launch:r,className:a}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){new i.default({elements_selector:".lazy-load",data_src:"src",threshold:0,callback_load:function(t){t.style.paddingBottom=0}})};var r=n(11),i=function(t){return t&&t.__esModule?t:{default:t}}(r)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t){var e=t.attr("href")||"",n=(0,l.default)(t),r=e.match(/www\.youtube\.com\/watch\/?\?v=(.*)$/);return r?{type:"youtube",id:r[1],params:n}:null}function o(t){var e=(0,s.default)(t),n=i(e);if(n){var r=e.parent(),o=null;r.hasClass("video-preview-wrapper")?o=r:(o=(0,s.default)("<figure/>").addClass("video-preview-wrapper").insertBefore(e),o.append(e)),e.on("click",function(t){a(o,n),t.preventDefault()})}}function a(t,e){switch(e.type){case"youtube":return(0,d.default)(t,e);default:return!1}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),s=r(u),c=n(7),l=r(c),f=n(5),d=r(f);e.default={className:"video-preview",launch:o}},function(t,e,n){"use strict";function r(t,e,n,r){var i=t+"__heading",a=(0,o.default)(e).children("h2,h3,h4,div."+i),u=[],s=function(){var t=this,e=(0,o.default)(this).parent().hasClass("active");u.forEach(function(n){var r=n[0]===t&&!e;n.parent().toggleClass("active",r),n.parent().toggleClass("inactive",!r)})};a.each(function(e,r){(0,o.default)(e).addClass(i+" inactive");var a=(0,o.default)("<a/>");if(u.push(a),a.attr("href","#t"+(n+1)+"-"+(r+1)),1===e.childNodes.length&&e.childNodes[0].nodeType===Node.TEXT_NODE){var c=(0,o.default)("<span/>");c.html((0,o.default)(e).html()),(0,o.default)(e).empty(),c.addClass(t+"__heading__label"),a.append(c)}else a.append((0,o.default)(e).children());var l=(0,o.default)("<span/>");l.attr("aria-hidden","true"),l.addClass(i+"__icon"),a.append(l),a.on("click",s),(0,o.default)(e).append(a)})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var i=n(0),o=function(t){return t&&t.__esModule?t:{default:t}}(i)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n=e.id,r=e.params,i="ytev-"+n,o=t.children("a"),u={width:o.width(),height:o.height()},c=(0,s.default)({},h,u,r,{videoId:n,events:{onInit:function(){(0,a.default)("<div/>").attr("id",i).attr(u).insertBefore(o),t.addClass("video-preview-wrapper--loading")},onReady:function(e){t.removeClass("video-preview-wrapper--loading"),t.addClass("media"),t.addClass("media--youtube"),o.remove();var n=e.target,r=t.children("iframe");n.playVideo(),(0,a.default)(document).on("scroll",function(){(0,d.default)(r)<.5&&n.pauseVideo()})}}});(0,l.default)(i,c)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i;var o=n(0),a=r(o),u=n(10),s=r(u),c=n(9),l=r(c),f=n(8),d=r(f),h={frameBorder:"0"}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t){if("function"==typeof t)t();else if(t.className){var e=t.className,n=t.launch;(0,a.default)("."+e+":not(."+e+"-njs)").each(n)}}var o=n(0),a=r(o),u=n(2),s=r(u),c=n(1),l=r(c),f=n(3),d=r(f),h=[l.default,d.default,s.default];!function(){h.forEach(i)}()},function(t,e,n){"use strict";function r(t){return Array.from(t.get(0).attributes).reduce(function(t,e){var n=e.nodeName.match(i);return n&&(t[n[1]]=e.nodeValue),t},{})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var i=/^data-(.+)$/},function(t,e,n){"use strict";function r(t){var e=window.scrollY,n=e+window.innerHeight,r=t.offset().top,i=t.height(),o=r+i,a=Math.max(r,e);return(Math.min(o,n)-a)/i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t,e){c===s?i(t,e):(l.push({id:t,data:e}),c===a&&o())}function i(t,e){e&&e.events&&e.events.onInit&&e.events.onInit();var n=new YT.Player(t,e);f[t]={player:n,data:e}}function o(){c=u,window.onYouTubeIframeAPIReady=function(){l.forEach(function(t){return i(t.id,t.data)})};var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var a="UNLOADED",u="LOADING",s="LOADED",c=a,l=[],f={}},function(t,e,n){"use strict";var r=Object.prototype.hasOwnProperty,i=Object.prototype.toString,o=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===i.call(t)},a=function(t){if(!t||"[object Object]"!==i.call(t))return!1;var e=r.call(t,"constructor"),n=t.constructor&&t.constructor.prototype&&r.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!n)return!1;var o;for(o in t);return void 0===o||r.call(t,o)};t.exports=function t(){var e,n,r,i,u,s,c=arguments[0],l=1,f=arguments.length,d=!1;for("boolean"==typeof c?(d=c,c=arguments[1]||{},l=2):("object"!=typeof c&&"function"!=typeof c||null==c)&&(c={});l<f;++l)if(null!=(e=arguments[l]))for(n in e)r=c[n],i=e[n],c!==i&&(d&&i&&(a(i)||(u=o(i)))?(u?(u=!1,s=r&&o(r)?r:[]):s=r&&a(r)?r:{},c[n]=t(d,s,i)):void 0!==i&&(c[n]=i));return c}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i,o,a,u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();"function"==typeof Symbol&&Symbol.iterator;!function(n,r){o=[],i=r,void 0!==(a="function"==typeof i?i.apply(e,o):i)&&(t.exports=a)}(window,function(){var t=!("onscroll"in window)||/glebot/.test(navigator.userAgent),e=function(t){return t.getBoundingClientRect().top+window.pageYOffset-t.ownerDocument.documentElement.clientTop},n=function(t,n,r){return(n===window?window.innerHeight+window.pageYOffset:e(n)+n.offsetHeight)<=e(t)-r},i=function(t){return t.getBoundingClientRect().left+window.pageXOffset-t.ownerDocument.documentElement.clientLeft},o=function(t,e,n){var r=window.innerWidth;return(e===window?r+window.pageXOffset:i(e)+r)<=i(t)-n},a=function(t,n,r){return(n===window?window.pageYOffset:e(n))>=e(t)+r+t.offsetHeight},s=function(t,e,n){return(e===window?window.pageXOffset:i(e))>=i(t)+n+t.offsetWidth},c=function(t,e,r){return!(n(t,e,r)||a(t,e,r)||o(t,e,r)||s(t,e,r))},l=function(t,e){t&&t(e)},f={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",class_error:"error",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null};return function(){function e(t){r(this,e),this._settings=Object.assign({},f,t),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),window.addEventListener("resize",this._boundHandleScroll),this.update()}return u(e,[{key:"_setSourcesForPicture",value:function(t,e){var n=t.parentElement;if("PICTURE"===n.tagName)for(var r=0;r<n.children.length;r++){var i=n.children[r];if("SOURCE"===i.tagName){var o=i.getAttribute("data-"+e);o&&i.setAttribute("srcset",o)}}}},{key:"_setSources",value:function(t,e,n){var r=t.tagName,i=t.getAttribute("data-"+n);if("IMG"===r){this._setSourcesForPicture(t,e);var o=t.getAttribute("data-"+e);return o&&t.setAttribute("srcset",o),void(i&&t.setAttribute("src",i))}if("IFRAME"===r)return void(i&&t.setAttribute("src",i));i&&(t.style.backgroundImage="url("+i+")")}},{key:"_showOnAppear",value:function(t){var e=this._settings,n=function n(){e&&(t.removeEventListener("load",r),t.removeEventListener("error",n),t.classList.remove(e.class_loading),t.classList.add(e.class_error),l(e.callback_error,t))},r=function r(){e&&(t.classList.remove(e.class_loading),t.classList.add(e.class_loaded),t.removeEventListener("load",r),t.removeEventListener("error",n),l(e.callback_load,t))};"IMG"!==t.tagName&&"IFRAME"!==t.tagName||(t.addEventListener("load",r),t.addEventListener("error",n),t.classList.add(e.class_loading)),this._setSources(t,e.data_srcset,e.data_src),l(e.callback_set,t)}},{key:"_loopThroughElements",value:function(){var e=this._settings,n=this._elements,r=n?n.length:0,i=void 0,o=[];for(i=0;i<r;i++){var a=n[i];e.skip_invisible&&null===a.offsetParent||(t||c(a,e.container,e.threshold))&&(this._showOnAppear(a),o.push(i),a.wasProcessed=!0)}for(;o.length>0;)n.splice(o.pop(),1),l(e.callback_processed,n.length);0===r&&this._stopScrollHandler()}},{key:"_purgeElements",value:function(){var t=this._elements,e=t.length,n=void 0,r=[];for(n=0;n<e;n++)t[n].wasProcessed&&r.push(n);for(;r.length>0;)t.splice(r.pop(),1)}},{key:"_startScrollHandler",value:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))}},{key:"_stopScrollHandler",value:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))}},{key:"handleScroll",value:function(){var t=this._settings.throttle;if(0!==t){var e=function(){(new Date).getTime()},n=e(),r=t-(n-this._previousLoopTime);r<=0||r>t?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=n,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=e(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),r))}else this._loopThroughElements()}},{key:"update",value:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()}},{key:"destroy",value:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}}]),e}()})}]);