/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLASSNAME = undefined;
exports.launch = launch;

var _prepareAccordionTabs = __webpack_require__(2);

var _prepareAccordionTabs2 = _interopRequireDefault(_prepareAccordionTabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch(el, i) {
    console.log(el);
    (0, _prepareAccordionTabs2.default)(CLASSNAME, el, i, false);
}

var CLASSNAME = exports.CLASSNAME = 'accordion';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    new _vanillaLazyload2.default({
        elements_selector: ".lazy-load",
        data_src: 'src',
        threshold: 0,
        callback_load: function callback_load(img) {
            img.style.paddingBottom = 0;
        }
    });
};

var _vanillaLazyload = __webpack_require__(4);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareAccordionTabs;

var _selectors = __webpack_require__(3);

function prepareAccordionTabs(patternClassname, el, index, addTabHeadings) {
    var headingClass = patternClassname + '__heading';
    var headings = (0, _selectors.selectChildren)(el, 'h2,h3,h4,div.' + headingClass);
    var anchors = [];

    var clickManager = function clickManager() {
        var _this = this;

        anchors.forEach(function (anchor) {
            (0, _selectors.toggleClass)(anchor.parentNode, 'active', anchor === _this ? null : false);
            (0, _selectors.toggleClass)(anchor.parentNode, 'inactive', anchor === _this ? null : true);
        });
    };

    headings.forEach(function (heading, i) {
        heading.classList.add(headingClass, 'inactive');

        var anchor = document.createElement('a');
        anchors.push(anchor);
        anchor.setAttribute('href', '#t' + (index + 1) + '-' + (i + 1));
        if (heading.childNodes.length === 1 && heading.childNodes[0].nodeType === Node.TEXT_NODE) {
            var span = document.createElement('span');
            (0, _selectors.moveChildren)(heading, span);
            anchor.appendChild(span);
            span.classList.add(patternClassname + '__heading__label');
        } else {
            (0, _selectors.moveChildren)(heading, anchor);
        }

        var icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.classList.add(headingClass + '__icon');
        anchor.appendChild(icon);
        anchor.addEventListener('click', clickManager);

        heading.appendChild(anchor);
    });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectChildren = selectChildren;
exports.moveChildren = moveChildren;
exports.toggleClass = toggleClass;
exports.addIcon = addIcon;
function selectChildren(el, selector) {
    return Array.from(el.children).filter(function (child) {
        return child.matches(selector);
    });
}

function moveChildren(from, to) {
    Array.from(from.childNodes).forEach(function (node) {
        return to.appendChild(node);
    });
}

function toggleClass(el, classname) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (el.classList.contains(classname)) {
        if (force !== true) {
            el.classList.remove(classname);
        }
    } else if (force !== false) {
        el.classList.add(classname);
    }
}

function addIcon(where, icon) {
    var el = document.createElement('span');
    el.classList.add('fa', 'fa-' + icon);
    el.setAttribute('aria-hidden', 'true');
    where.appendChild(el);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=b():a.LazyLoad=b()}(this,function(){function a(){k||(j={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},k=!0)}function b(a,b,c){function d(){return window.innerWidth||l.documentElement.clientWidth||document.body.clientWidth}function e(){return window.innerHeight||l.documentElement.clientHeight||document.body.clientHeight}function f(a){return a.getBoundingClientRect().top+m-l.documentElement.clientTop}function g(a){return a.getBoundingClientRect().left+n-l.documentElement.clientLeft}function h(){var d;return d=b===window?e()+m:f(b)+b.offsetHeight,d<=f(a)-c}function i(){var e;return e=b===window?d()+window.pageXOffset:g(b)+d(),e<=g(a)-c}function j(){var d;return d=b===window?m:f(b),d>=f(a)+c+a.offsetHeight}function k(){var d;return d=b===window?n:g(b),d>=g(a)+c+a.offsetWidth}var l,m,n;return l=a.ownerDocument,m=window.pageYOffset||l.body.scrollTop,n=window.pageXOffset||l.body.scrollLeft,!(h()||j()||i()||k())}function c(){var a=new Date;return a.getTime()}function d(a,b){var c,d={};for(c in a)a.hasOwnProperty(c)&&(d[c]=a[c]);for(c in b)b.hasOwnProperty(c)&&(d[c]=b[c]);return d}function e(a){return Array.prototype.slice.call(a)}function f(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.getAttribute("data-"+b);f&&e.setAttribute("srcset",f)}}}function g(a,b,c){var d=a.tagName,e=a.getAttribute("data-"+c);if("IMG"===d){f(a,b);var g=a.getAttribute("data-"+b);return g&&a.setAttribute("srcset",g),void(e&&a.setAttribute("src",e))}return"IFRAME"===d?void(e&&a.setAttribute("src",e)):void(e&&(a.style.backgroundImage="url("+e+")"))}function h(a,b){return function(){return a.apply(b,arguments)}}function i(b){a(),this._settings=d(j,b),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=h(this.handleScroll,this),window.addEventListener("resize",this._handleScrollFn),this.update()}var j,k=!1;return i.prototype._showOnAppear=function(a){function b(){a.removeEventListener("load",c),a.classList.remove(d.class_loading),d.callback_error&&d.callback_error(a)}function c(){null!==d&&(d.callback_load&&d.callback_load(a),a.classList.remove(d.class_loading),a.classList.add(d.class_loaded),a.removeEventListener("load",c),a.removeEventListener("error",b))}var d=this._settings;"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",c),a.addEventListener("error",b),a.classList.add(d.class_loading)),g(a,d.data_srcset,d.data_src),d.callback_set&&d.callback_set(a)},i.prototype._loopThroughElements=function(){var a,c,d=this._settings,e=this._elements,f=e?e.length:0,g=[];for(a=0;a<f;a++)c=e[a],d.skip_invisible&&null===c.offsetParent||b(c,d.container,d.threshold)&&(this._showOnAppear(c),g.push(a),c.wasProcessed=!0);for(;g.length>0;)e.splice(g.pop(),1),d.callback_processed&&d.callback_processed(e.length);0===f&&this._stopScrollHandler()},i.prototype._purgeElements=function(){var a,b,c=this._elements,d=c.length,e=[];for(a=0;a<d;a++)b=c[a],b.wasProcessed&&e.push(a);for(;e.length>0;)c.splice(e.pop(),1)},i.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._handleScrollFn))},i.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._handleScrollFn))},i.prototype.handleScroll=function(){var a,b,d;this._settings&&(b=c(),d=this._settings.throttle,0!==d?(a=d-(b-this._previousLoopTime),a<=0||a>d?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=b,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(h(function(){this._previousLoopTime=c(),this._loopTimeout=null,this._loopThroughElements()},this),a))):this._loopThroughElements())},i.prototype.update=function(){this._elements=e(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},i.prototype.destroy=function(){window.removeEventListener("resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},i});
//# sourceMappingURL=lazyload.min.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lazyLoad = __webpack_require__(1);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

var _accordion = __webpack_require__(0);

var accordion = _interopRequireWildcard(_accordion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launchPattern(pattern) {
    if (typeof pattern === 'function') {
        pattern();
    } else if (pattern.CLASSNAME) {
        var cn = pattern.CLASSNAME,
            launch = pattern.launch;

        document.querySelectorAll('.' + cn + ':not(.' + cn + '-njs)').forEach(launch);
    }
}

!function () {
    launchPattern(accordion);
    launchPattern(_lazyLoad2.default);
}();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmFkYmZlMGE3MmFhN2Y4MjA3YWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL2FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0dGVybnMvbGF6eS1sb2FkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYXR0ZXJucy9hY2NvcmRpb24tdGFicy9wcmVwYXJlLWFjY29yZGlvbi10YWJzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQubWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsYXVuY2giLCJlbCIsImkiLCJjb25zb2xlIiwibG9nIiwiQ0xBU1NOQU1FIiwiZWxlbWVudHNfc2VsZWN0b3IiLCJkYXRhX3NyYyIsInRocmVzaG9sZCIsImNhbGxiYWNrX2xvYWQiLCJpbWciLCJzdHlsZSIsInBhZGRpbmdCb3R0b20iLCJwcmVwYXJlQWNjb3JkaW9uVGFicyIsInBhdHRlcm5DbGFzc25hbWUiLCJpbmRleCIsImFkZFRhYkhlYWRpbmdzIiwiaGVhZGluZ0NsYXNzIiwiaGVhZGluZ3MiLCJhbmNob3JzIiwiY2xpY2tNYW5hZ2VyIiwiZm9yRWFjaCIsImFuY2hvciIsInBhcmVudE5vZGUiLCJoZWFkaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicHVzaCIsInNldEF0dHJpYnV0ZSIsImNoaWxkTm9kZXMiLCJsZW5ndGgiLCJub2RlVHlwZSIsIk5vZGUiLCJURVhUX05PREUiLCJzcGFuIiwiYXBwZW5kQ2hpbGQiLCJpY29uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbGVjdENoaWxkcmVuIiwibW92ZUNoaWxkcmVuIiwidG9nZ2xlQ2xhc3MiLCJhZGRJY29uIiwic2VsZWN0b3IiLCJBcnJheSIsImZyb20iLCJjaGlsZHJlbiIsImZpbHRlciIsImNoaWxkIiwibWF0Y2hlcyIsInRvIiwibm9kZSIsImNsYXNzbmFtZSIsImZvcmNlIiwiY29udGFpbnMiLCJyZW1vdmUiLCJ3aGVyZSIsImFjY29yZGlvbiIsImxhdW5jaFBhdHRlcm4iLCJwYXR0ZXJuIiwiY24iLCJxdWVyeVNlbGVjdG9yQWxsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7UUM5RGdCQSxNLEdBQUFBLE07O0FBRmhCOzs7Ozs7QUFFTyxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFvQkMsQ0FBcEIsRUFBdUI7QUFDMUJDLFlBQVFDLEdBQVIsQ0FBWUgsRUFBWjtBQUNBLHdDQUFrQkksU0FBbEIsRUFBNkJKLEVBQTdCLEVBQWlDQyxDQUFqQyxFQUFvQyxLQUFwQztBQUNIOztBQUVNLElBQU1HLGdDQUFZLFdBQWxCLEM7Ozs7Ozs7Ozs7Ozs7a0JDTFEsWUFBWTtBQUN2QixrQ0FBYTtBQUNUQywyQkFBbUIsWUFEVjtBQUVUQyxrQkFBVSxLQUZEO0FBR1RDLG1CQUFXLENBSEY7QUFJVEMsdUJBQWUsNEJBQU87QUFDbEJDLGdCQUFJQyxLQUFKLENBQVVDLGFBQVYsR0FBMEIsQ0FBMUI7QUFDSDtBQU5RLEtBQWI7QUFR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LHNJQUFzSSxLQUFLLFdBQVcsMEVBQTBFLGlDQUFpQyx1Q0FBdUMseUNBQXlDLFFBQVEsSUFBSSxxQ0FBcUMsS0FBSyxXQUFXLHFCQUFxQiw0Q0FBNEMsNkhBQTZILDJDQUEyQyxnSUFBZ0kscUNBQXFDLFVBQVUsa1NBQWtTLDhFQUE4RSx5Q0FBeUMsK0JBQStCLHdLQUF3SyxnQ0FBZ0MsbU9BQW1PLEdBQUc7QUFDNWxKLHdDOzs7Ozs7Ozs7QUNEQTs7OztBQUNBOztJQUFZeUQsUzs7Ozs7O0FBRVosU0FBU0MsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0M7QUFDNUIsUUFBSSxPQUFPQSxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQy9CQTtBQUNILEtBRkQsTUFFTyxJQUFJQSxRQUFRdkQsU0FBWixFQUF1QjtBQUFBLFlBQ1Z3RCxFQURVLEdBQ0lELE9BREosQ0FDckJ2RCxTQURxQjtBQUFBLFlBQ05MLE1BRE0sR0FDSTRELE9BREosQ0FDTjVELE1BRE07O0FBRTFCMkIsaUJBQVNtQyxnQkFBVCxPQUE4QkQsRUFBOUIsY0FBeUNBLEVBQXpDLFlBQW9EeEMsT0FBcEQsQ0FBNERyQixNQUE1RDtBQUNIO0FBQ0o7O0FBRUQsQ0FBRSxZQUFZO0FBQ1YyRCxrQkFBY0QsU0FBZDtBQUNBQztBQUNILENBSEMsRUFBRixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmFkYmZlMGE3MmFhN2Y4MjA3YWQiLCJpbXBvcnQgcHJlcGFyZUFjY29yZGlvbnMgZnJvbSBcIi4vcHJlcGFyZS1hY2NvcmRpb24tdGFic1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbGF1bmNoKGVsLCBpKSB7XG4gICAgY29uc29sZS5sb2coZWwpO1xuICAgIHByZXBhcmVBY2NvcmRpb25zKENMQVNTTkFNRSwgZWwsIGksIGZhbHNlKTtcbn1cblxuZXhwb3J0IGNvbnN0IENMQVNTTkFNRSA9ICdhY2NvcmRpb24nO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXR0ZXJucy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb24uanMiLCJpbXBvcnQgTGF6eUxvYWQgZnJvbSBcInZhbmlsbGEtbGF6eWxvYWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIG5ldyBMYXp5TG9hZCh7XG4gICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiBcIi5sYXp5LWxvYWRcIixcbiAgICAgICAgZGF0YV9zcmM6ICdzcmMnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIGNhbGxiYWNrX2xvYWQ6IGltZyA9PiB7XG4gICAgICAgICAgICBpbWcuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXR0ZXJucy9sYXp5LWxvYWQvaW5kZXguanMiLCJpbXBvcnQge3NlbGVjdENoaWxkcmVuLCBtb3ZlQ2hpbGRyZW4sIHRvZ2dsZUNsYXNzfSBmcm9tIFwiLi4vLi4vdXRpbHMvc2VsZWN0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVBY2NvcmRpb25UYWJzKHBhdHRlcm5DbGFzc25hbWUsIGVsLCBpbmRleCwgYWRkVGFiSGVhZGluZ3MpIHtcbiAgICBsZXQgaGVhZGluZ0NsYXNzID0gYCR7cGF0dGVybkNsYXNzbmFtZX1fX2hlYWRpbmdgO1xuICAgIGxldCBoZWFkaW5ncyA9IHNlbGVjdENoaWxkcmVuKGVsLCBgaDIsaDMsaDQsZGl2LiR7aGVhZGluZ0NsYXNzfWApO1xuICAgIGxldCBhbmNob3JzID0gW107XG5cbiAgICBsZXQgY2xpY2tNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhbmNob3JzLmZvckVhY2goYW5jaG9yID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGFuY2hvci5wYXJlbnROb2RlLCAnYWN0aXZlJywgYW5jaG9yID09PSB0aGlzID8gbnVsbCA6IGZhbHNlKTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGFuY2hvci5wYXJlbnROb2RlLCAnaW5hY3RpdmUnLCBhbmNob3IgPT09IHRoaXMgPyBudWxsIDogdHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGhlYWRpbmdzLmZvckVhY2goKGhlYWRpbmcsIGkpID0+IHtcbiAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKGhlYWRpbmdDbGFzcywgJ2luYWN0aXZlJyk7XG5cbiAgICAgICAgbGV0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYW5jaG9ycy5wdXNoKGFuY2hvcik7XG4gICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgI3Qke2luZGV4ICsgMX0tJHtpICsgMX1gKTtcbiAgICAgICAgaWYgKGhlYWRpbmcuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgaGVhZGluZy5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBtb3ZlQ2hpbGRyZW4oaGVhZGluZywgc3Bhbik7XG4gICAgICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoYCR7cGF0dGVybkNsYXNzbmFtZX1fX2hlYWRpbmdfX2xhYmVsYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3ZlQ2hpbGRyZW4oaGVhZGluZywgYW5jaG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoYCR7aGVhZGluZ0NsYXNzfV9faWNvbmApO1xuICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrTWFuYWdlcik7XG5cbiAgICAgICAgaGVhZGluZy5hcHBlbmRDaGlsZChhbmNob3IpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL3ByZXBhcmUtYWNjb3JkaW9uLXRhYnMuanMiLCJleHBvcnQgZnVuY3Rpb24gc2VsZWN0Q2hpbGRyZW4oZWwsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWwuY2hpbGRyZW4pLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5tYXRjaGVzKHNlbGVjdG9yKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbSwgdG8pIHtcbiAgICBBcnJheS5mcm9tKGZyb20uY2hpbGROb2RlcykuZm9yRWFjaChub2RlID0+IHRvLmFwcGVuZENoaWxkKG5vZGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsLCBjbGFzc25hbWUsIGZvcmNlID0gbnVsbCkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NuYW1lKSkge1xuICAgICAgICBpZiAoZm9yY2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZm9yY2UgIT09IGZhbHNlKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJY29uKHdoZXJlLCBpY29uKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2ZhJywgYGZhLSR7aWNvbn1gKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICB3aGVyZS5hcHBlbmRDaGlsZChlbCk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9zZWxlY3RvcnMuanMiLCIhZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLkxhenlMb2FkPWIoKX0odGhpcyxmdW5jdGlvbigpe2Z1bmN0aW9uIGEoKXtrfHwoaj17ZWxlbWVudHNfc2VsZWN0b3I6XCJpbWdcIixjb250YWluZXI6d2luZG93LHRocmVzaG9sZDozMDAsdGhyb3R0bGU6MTUwLGRhdGFfc3JjOlwib3JpZ2luYWxcIixkYXRhX3NyY3NldDpcIm9yaWdpbmFsLXNldFwiLGNsYXNzX2xvYWRpbmc6XCJsb2FkaW5nXCIsY2xhc3NfbG9hZGVkOlwibG9hZGVkXCIsc2tpcF9pbnZpc2libGU6ITAsY2FsbGJhY2tfbG9hZDpudWxsLGNhbGxiYWNrX2Vycm9yOm51bGwsY2FsbGJhY2tfc2V0Om51bGwsY2FsbGJhY2tfcHJvY2Vzc2VkOm51bGx9LGs9ITApfWZ1bmN0aW9uIGIoYSxiLGMpe2Z1bmN0aW9uIGQoKXtyZXR1cm4gd2luZG93LmlubmVyV2lkdGh8fGwuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofHxkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRofWZ1bmN0aW9uIGUoKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxsLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR8fGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0fWZ1bmN0aW9uIGYoYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wK20tbC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wfWZ1bmN0aW9uIGcoYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCtuLWwuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnR9ZnVuY3Rpb24gaCgpe3ZhciBkO3JldHVybiBkPWI9PT13aW5kb3c/ZSgpK206ZihiKStiLm9mZnNldEhlaWdodCxkPD1mKGEpLWN9ZnVuY3Rpb24gaSgpe3ZhciBlO3JldHVybiBlPWI9PT13aW5kb3c/ZCgpK3dpbmRvdy5wYWdlWE9mZnNldDpnKGIpK2QoKSxlPD1nKGEpLWN9ZnVuY3Rpb24gaigpe3ZhciBkO3JldHVybiBkPWI9PT13aW5kb3c/bTpmKGIpLGQ+PWYoYSkrYythLm9mZnNldEhlaWdodH1mdW5jdGlvbiBrKCl7dmFyIGQ7cmV0dXJuIGQ9Yj09PXdpbmRvdz9uOmcoYiksZD49ZyhhKStjK2Eub2Zmc2V0V2lkdGh9dmFyIGwsbSxuO3JldHVybiBsPWEub3duZXJEb2N1bWVudCxtPXdpbmRvdy5wYWdlWU9mZnNldHx8bC5ib2R5LnNjcm9sbFRvcCxuPXdpbmRvdy5wYWdlWE9mZnNldHx8bC5ib2R5LnNjcm9sbExlZnQsIShoKCl8fGooKXx8aSgpfHxrKCkpfWZ1bmN0aW9uIGMoKXt2YXIgYT1uZXcgRGF0ZTtyZXR1cm4gYS5nZXRUaW1lKCl9ZnVuY3Rpb24gZChhLGIpe3ZhciBjLGQ9e307Zm9yKGMgaW4gYSlhLmhhc093blByb3BlcnR5KGMpJiYoZFtjXT1hW2NdKTtmb3IoYyBpbiBiKWIuaGFzT3duUHJvcGVydHkoYykmJihkW2NdPWJbY10pO3JldHVybiBkfWZ1bmN0aW9uIGUoYSl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEpfWZ1bmN0aW9uIGYoYSxiKXt2YXIgYz1hLnBhcmVudEVsZW1lbnQ7aWYoXCJQSUNUVVJFXCI9PT1jLnRhZ05hbWUpZm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspe3ZhciBlPWMuY2hpbGRyZW5bZF07aWYoXCJTT1VSQ0VcIj09PWUudGFnTmFtZSl7dmFyIGY9ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK2IpO2YmJmUuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZil9fX1mdW5jdGlvbiBnKGEsYixjKXt2YXIgZD1hLnRhZ05hbWUsZT1hLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrYyk7aWYoXCJJTUdcIj09PWQpe2YoYSxiKTt2YXIgZz1hLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrYik7cmV0dXJuIGcmJmEuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZyksdm9pZChlJiZhLnNldEF0dHJpYnV0ZShcInNyY1wiLGUpKX1yZXR1cm5cIklGUkFNRVwiPT09ZD92b2lkKGUmJmEuc2V0QXR0cmlidXRlKFwic3JjXCIsZSkpOnZvaWQoZSYmKGEuc3R5bGUuYmFja2dyb3VuZEltYWdlPVwidXJsKFwiK2UrXCIpXCIpKX1mdW5jdGlvbiBoKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkoYixhcmd1bWVudHMpfX1mdW5jdGlvbiBpKGIpe2EoKSx0aGlzLl9zZXR0aW5ncz1kKGosYiksdGhpcy5fcXVlcnlPcmlnaW5Ob2RlPXRoaXMuX3NldHRpbmdzLmNvbnRhaW5lcj09PXdpbmRvdz9kb2N1bWVudDp0aGlzLl9zZXR0aW5ncy5jb250YWluZXIsdGhpcy5fcHJldmlvdXNMb29wVGltZT0wLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwsdGhpcy5faGFuZGxlU2Nyb2xsRm49aCh0aGlzLmhhbmRsZVNjcm9sbCx0aGlzKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSx0aGlzLnVwZGF0ZSgpfXZhciBqLGs9ITE7cmV0dXJuIGkucHJvdG90eXBlLl9zaG93T25BcHBlYXI9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYigpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjKSxhLmNsYXNzTGlzdC5yZW1vdmUoZC5jbGFzc19sb2FkaW5nKSxkLmNhbGxiYWNrX2Vycm9yJiZkLmNhbGxiYWNrX2Vycm9yKGEpfWZ1bmN0aW9uIGMoKXtudWxsIT09ZCYmKGQuY2FsbGJhY2tfbG9hZCYmZC5jYWxsYmFja19sb2FkKGEpLGEuY2xhc3NMaXN0LnJlbW92ZShkLmNsYXNzX2xvYWRpbmcpLGEuY2xhc3NMaXN0LmFkZChkLmNsYXNzX2xvYWRlZCksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGMpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsYikpfXZhciBkPXRoaXMuX3NldHRpbmdzO1wiSU1HXCIhPT1hLnRhZ05hbWUmJlwiSUZSQU1FXCIhPT1hLnRhZ05hbWV8fChhLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsYyksYS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixiKSxhLmNsYXNzTGlzdC5hZGQoZC5jbGFzc19sb2FkaW5nKSksZyhhLGQuZGF0YV9zcmNzZXQsZC5kYXRhX3NyYyksZC5jYWxsYmFja19zZXQmJmQuY2FsbGJhY2tfc2V0KGEpfSxpLnByb3RvdHlwZS5fbG9vcFRocm91Z2hFbGVtZW50cz1mdW5jdGlvbigpe3ZhciBhLGMsZD10aGlzLl9zZXR0aW5ncyxlPXRoaXMuX2VsZW1lbnRzLGY9ZT9lLmxlbmd0aDowLGc9W107Zm9yKGE9MDthPGY7YSsrKWM9ZVthXSxkLnNraXBfaW52aXNpYmxlJiZudWxsPT09Yy5vZmZzZXRQYXJlbnR8fGIoYyxkLmNvbnRhaW5lcixkLnRocmVzaG9sZCkmJih0aGlzLl9zaG93T25BcHBlYXIoYyksZy5wdXNoKGEpLGMud2FzUHJvY2Vzc2VkPSEwKTtmb3IoO2cubGVuZ3RoPjA7KWUuc3BsaWNlKGcucG9wKCksMSksZC5jYWxsYmFja19wcm9jZXNzZWQmJmQuY2FsbGJhY2tfcHJvY2Vzc2VkKGUubGVuZ3RoKTswPT09ZiYmdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKX0saS5wcm90b3R5cGUuX3B1cmdlRWxlbWVudHM9ZnVuY3Rpb24oKXt2YXIgYSxiLGM9dGhpcy5fZWxlbWVudHMsZD1jLmxlbmd0aCxlPVtdO2ZvcihhPTA7YTxkO2ErKyliPWNbYV0sYi53YXNQcm9jZXNzZWQmJmUucHVzaChhKTtmb3IoO2UubGVuZ3RoPjA7KWMuc3BsaWNlKGUucG9wKCksMSl9LGkucHJvdG90eXBlLl9zdGFydFNjcm9sbEhhbmRsZXI9ZnVuY3Rpb24oKXt0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsfHwodGhpcy5faXNIYW5kbGluZ1Njcm9sbD0hMCx0aGlzLl9zZXR0aW5ncy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSl9LGkucHJvdG90eXBlLl9zdG9wU2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe3RoaXMuX2lzSGFuZGxpbmdTY3JvbGwmJih0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsPSExLHRoaXMuX3NldHRpbmdzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5faGFuZGxlU2Nyb2xsRm4pKX0saS5wcm90b3R5cGUuaGFuZGxlU2Nyb2xsPWZ1bmN0aW9uKCl7dmFyIGEsYixkO3RoaXMuX3NldHRpbmdzJiYoYj1jKCksZD10aGlzLl9zZXR0aW5ncy50aHJvdHRsZSwwIT09ZD8oYT1kLShiLXRoaXMuX3ByZXZpb3VzTG9vcFRpbWUpLGE8PTB8fGE+ZD8odGhpcy5fbG9vcFRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwpLHRoaXMuX3ByZXZpb3VzTG9vcFRpbWU9Yix0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCkpOnRoaXMuX2xvb3BUaW1lb3V0fHwodGhpcy5fbG9vcFRpbWVvdXQ9c2V0VGltZW91dChoKGZ1bmN0aW9uKCl7dGhpcy5fcHJldmlvdXNMb29wVGltZT1jKCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCl9LHRoaXMpLGEpKSk6dGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpKX0saS5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy5fZWxlbWVudHM9ZSh0aGlzLl9xdWVyeU9yaWdpbk5vZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5lbGVtZW50c19zZWxlY3RvcikpLHRoaXMuX3B1cmdlRWxlbWVudHMoKSx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCksdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCl9LGkucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSx0aGlzLl9sb29wVGltZW91dCYmKGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCksdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKSx0aGlzLl9lbGVtZW50cz1udWxsLHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZT1udWxsLHRoaXMuX3NldHRpbmdzPW51bGx9LGl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhenlsb2FkLm1pbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbGF6eUxvYWQgZnJvbSAnLi9wYXR0ZXJucy9sYXp5LWxvYWQnO1xuaW1wb3J0ICogYXMgYWNjb3JkaW9uIGZyb20gXCIuL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL2FjY29yZGlvblwiO1xuXG5mdW5jdGlvbiBsYXVuY2hQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAocGF0dGVybi5DTEFTU05BTUUpIHtcbiAgICAgICAgbGV0IHtDTEFTU05BTUU6IGNuLCBsYXVuY2h9ID0gcGF0dGVybjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Y259Om5vdCguJHtjbn0tbmpzKWApLmZvckVhY2gobGF1bmNoKTtcbiAgICB9XG59XG5cbiEoZnVuY3Rpb24gKCkge1xuICAgIGxhdW5jaFBhdHRlcm4oYWNjb3JkaW9uKTtcbiAgICBsYXVuY2hQYXR0ZXJuKGxhenlMb2FkKTtcbn0oKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9