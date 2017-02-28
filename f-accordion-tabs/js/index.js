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
    var headings = (0, _selectors.selectChildren)(el, 'h2,h3,h4,div.' + patternClassname + '__heading');
    var anchors = [];

    var clickManager = function clickManager() {
        var _this = this;

        anchors.forEach(function (anchor) {
            (0, _selectors.toggleClass)(anchor.parentNode, 'active', anchor === _this ? null : false);
        });
    };

    headings.forEach(function (heading, i) {
        var anchor = document.createElement('a');
        anchors.push(anchor);
        anchor.setAttribute('href', '#t' + (index + 1) + '-' + (i + 1));
        (0, _selectors.moveChildren)(heading, anchor);
        heading.appendChild(anchor);

        anchor.addEventListener('click', clickManager);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzI0NTgzMzU1YjJkNDc3NzEzMzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL2FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0dGVybnMvbGF6eS1sb2FkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYXR0ZXJucy9hY2NvcmRpb24tdGFicy9wcmVwYXJlLWFjY29yZGlvbi10YWJzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQubWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsYXVuY2giLCJlbCIsImkiLCJjb25zb2xlIiwibG9nIiwiQ0xBU1NOQU1FIiwiZWxlbWVudHNfc2VsZWN0b3IiLCJkYXRhX3NyYyIsInRocmVzaG9sZCIsImNhbGxiYWNrX2xvYWQiLCJpbWciLCJzdHlsZSIsInBhZGRpbmdCb3R0b20iLCJwcmVwYXJlQWNjb3JkaW9uVGFicyIsInBhdHRlcm5DbGFzc25hbWUiLCJpbmRleCIsImFkZFRhYkhlYWRpbmdzIiwiaGVhZGluZ3MiLCJhbmNob3JzIiwiY2xpY2tNYW5hZ2VyIiwiZm9yRWFjaCIsImFuY2hvciIsInBhcmVudE5vZGUiLCJoZWFkaW5nIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicHVzaCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbGVjdENoaWxkcmVuIiwibW92ZUNoaWxkcmVuIiwidG9nZ2xlQ2xhc3MiLCJzZWxlY3RvciIsIkFycmF5IiwiZnJvbSIsImNoaWxkcmVuIiwiZmlsdGVyIiwiY2hpbGQiLCJtYXRjaGVzIiwidG8iLCJjaGlsZE5vZGVzIiwibm9kZSIsImNsYXNzbmFtZSIsImZvcmNlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJhZGQiLCJhY2NvcmRpb24iLCJsYXVuY2hQYXR0ZXJuIiwicGF0dGVybiIsImNuIiwicXVlcnlTZWxlY3RvckFsbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O1FDOURnQkEsTSxHQUFBQSxNOztBQUZoQjs7Ozs7O0FBRU8sU0FBU0EsTUFBVCxDQUFnQkMsRUFBaEIsRUFBb0JDLENBQXBCLEVBQXVCO0FBQzFCQyxZQUFRQyxHQUFSLENBQVlILEVBQVo7QUFDQSx3Q0FBa0JJLFNBQWxCLEVBQTZCSixFQUE3QixFQUFpQ0MsQ0FBakMsRUFBb0MsS0FBcEM7QUFDSDs7QUFFTSxJQUFNRyxnQ0FBWSxXQUFsQixDOzs7Ozs7Ozs7Ozs7O2tCQ0xRLFlBQVk7QUFDdkIsa0NBQWE7QUFDVEMsMkJBQW1CLFlBRFY7QUFFVEMsa0JBQVUsS0FGRDtBQUdUQyxtQkFBVyxDQUhGO0FBSVRDLHVCQUFlLDRCQUFPO0FBQ2xCQyxnQkFBSUMsS0FBSixDQUFVQyxhQUFWLEdBQTBCLENBQTFCO0FBQ0g7QUFOUSxLQUFiO0FBUUgsQzs7QUFYRDs7Ozs7Ozs7Ozs7Ozs7OztrQkNFd0JDLG9COztBQUZ4Qjs7QUFFZSxTQUFTQSxvQkFBVCxDQUE4QkMsZ0JBQTlCLEVBQWdEYixFQUFo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LFFBQVEsSUFBSSxxQ0FBcUMsS0FBSyxXQUFXLHFCQUFxQiw0Q0FBNEMsNkhBQTZILDJDQUEyQyxnSUFBZ0kscUNBQXFDLFVBQVUsa1NBQWtTLDhFQUE4RSx5Q0FBeUMsK0JBQStCLHdLQUF3SyxnQ0FBZ0MsbU9BQW1PLEdBQUc7QUFDNWxKLHdDOzs7Ozs7Ozs7QUNEQTs7OztBQUNBOztJQUFZTSxTOzs7Ozs7QUFFWixTQUFTQyxhQUFULENBQXVCQyxPQUF2QixFQUFnQztBQUM1QixRQUFJLE9BQU9BLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDL0JBO0FBQ0gsS0FGRCxNQUVPLElBQUlBLFFBQVE5QyxTQUFaLEVBQXVCO0FBQUEsWUFDVitDLEVBRFUsR0FDSUQsT0FESixDQUNyQjlDLFNBRHFCO0FBQUEsWUFDTkwsTUFETSxHQUNJbUQsT0FESixDQUNObkQsTUFETTs7QUFFMUJ3QixpQkFBUzZCLGdCQUFULE9BQThCRCxFQUE5QixjQUF5Q0EsRUFBekMsWUFBb0RoQyxPQUFwRCxDQUE0RHBCLE1BQTVEO0FBQ0g7QUFDSjs7QUFFRCxDQUFFLFlBQVk7QUFDVmtELGtCQUFjRCxTQUFkO0FBQ0FDO0FBQ0gsQ0FIQyxFQUFGLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzMjQ1ODMzNTViMmQ0Nzc3MTMzNSIsImltcG9ydCBwcmVwYXJlQWNjb3JkaW9ucyBmcm9tIFwiLi9wcmVwYXJlLWFjY29yZGlvbi10YWJzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXVuY2goZWwsIGkpIHtcbiAgICBjb25zb2xlLmxvZyhlbCk7XG4gICAgcHJlcGFyZUFjY29yZGlvbnMoQ0xBU1NOQU1FLCBlbCwgaSwgZmFsc2UpO1xufVxuXG5leHBvcnQgY29uc3QgQ0xBU1NOQU1FID0gJ2FjY29yZGlvbic7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL2FjY29yZGlvbi5qcyIsImltcG9ydCBMYXp5TG9hZCBmcm9tIFwidmFuaWxsYS1sYXp5bG9hZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IExhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6IFwiLmxhenktbG9hZFwiLFxuICAgICAgICBkYXRhX3NyYzogJ3NyYycsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgY2FsbGJhY2tfbG9hZDogaW1nID0+IHtcbiAgICAgICAgICAgIGltZy5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdHRlcm5zL2xhenktbG9hZC9pbmRleC5qcyIsImltcG9ydCB7c2VsZWN0Q2hpbGRyZW4sIG1vdmVDaGlsZHJlbiwgdG9nZ2xlQ2xhc3N9IGZyb20gXCIuLi8uLi91dGlscy9zZWxlY3RvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZUFjY29yZGlvblRhYnMocGF0dGVybkNsYXNzbmFtZSwgZWwsIGluZGV4LCBhZGRUYWJIZWFkaW5ncykge1xuICAgIGxldCBoZWFkaW5ncyA9IHNlbGVjdENoaWxkcmVuKGVsLCBgaDIsaDMsaDQsZGl2LiR7cGF0dGVybkNsYXNzbmFtZX1fX2hlYWRpbmdgKTtcbiAgICBsZXQgYW5jaG9ycyA9IFtdO1xuXG4gICAgbGV0IGNsaWNrTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYW5jaG9ycy5mb3JFYWNoKGFuY2hvciA9PiB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyhhbmNob3IucGFyZW50Tm9kZSwgJ2FjdGl2ZScsIGFuY2hvciA9PT0gdGhpcyA/IG51bGwgOiBmYWxzZSk7XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGhlYWRpbmdzLmZvckVhY2goKGhlYWRpbmcsIGkpID0+IHtcbiAgICAgICAgbGV0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYW5jaG9ycy5wdXNoKGFuY2hvcik7XG4gICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgI3Qke2luZGV4ICsgMX0tJHtpICsgMX1gKTtcbiAgICAgICAgbW92ZUNoaWxkcmVuKGhlYWRpbmcsIGFuY2hvcik7XG4gICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQoYW5jaG9yKTtcblxuICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja01hbmFnZXIpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL3ByZXBhcmUtYWNjb3JkaW9uLXRhYnMuanMiLCJleHBvcnQgZnVuY3Rpb24gc2VsZWN0Q2hpbGRyZW4oZWwsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWwuY2hpbGRyZW4pLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5tYXRjaGVzKHNlbGVjdG9yKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbSwgdG8pIHtcbiAgICBBcnJheS5mcm9tKGZyb20uY2hpbGROb2RlcykuZm9yRWFjaChub2RlID0+IHRvLmFwcGVuZENoaWxkKG5vZGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsLCBjbGFzc25hbWUsIGZvcmNlID0gbnVsbCkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NuYW1lKSkge1xuICAgICAgICBpZiAoZm9yY2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZm9yY2UgIT09IGZhbHNlKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTtcbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9zZWxlY3RvcnMuanMiLCIhZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLkxhenlMb2FkPWIoKX0odGhpcyxmdW5jdGlvbigpe2Z1bmN0aW9uIGEoKXtrfHwoaj17ZWxlbWVudHNfc2VsZWN0b3I6XCJpbWdcIixjb250YWluZXI6d2luZG93LHRocmVzaG9sZDozMDAsdGhyb3R0bGU6MTUwLGRhdGFfc3JjOlwib3JpZ2luYWxcIixkYXRhX3NyY3NldDpcIm9yaWdpbmFsLXNldFwiLGNsYXNzX2xvYWRpbmc6XCJsb2FkaW5nXCIsY2xhc3NfbG9hZGVkOlwibG9hZGVkXCIsc2tpcF9pbnZpc2libGU6ITAsY2FsbGJhY2tfbG9hZDpudWxsLGNhbGxiYWNrX2Vycm9yOm51bGwsY2FsbGJhY2tfc2V0Om51bGwsY2FsbGJhY2tfcHJvY2Vzc2VkOm51bGx9LGs9ITApfWZ1bmN0aW9uIGIoYSxiLGMpe2Z1bmN0aW9uIGQoKXtyZXR1cm4gd2luZG93LmlubmVyV2lkdGh8fGwuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofHxkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRofWZ1bmN0aW9uIGUoKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxsLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR8fGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0fWZ1bmN0aW9uIGYoYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wK20tbC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wfWZ1bmN0aW9uIGcoYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCtuLWwuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnR9ZnVuY3Rpb24gaCgpe3ZhciBkO3JldHVybiBkPWI9PT13aW5kb3c/ZSgpK206ZihiKStiLm9mZnNldEhlaWdodCxkPD1mKGEpLWN9ZnVuY3Rpb24gaSgpe3ZhciBlO3JldHVybiBlPWI9PT13aW5kb3c/ZCgpK3dpbmRvdy5wYWdlWE9mZnNldDpnKGIpK2QoKSxlPD1nKGEpLWN9ZnVuY3Rpb24gaigpe3ZhciBkO3JldHVybiBkPWI9PT13aW5kb3c/bTpmKGIpLGQ+PWYoYSkrYythLm9mZnNldEhlaWdodH1mdW5jdGlvbiBrKCl7dmFyIGQ7cmV0dXJuIGQ9Yj09PXdpbmRvdz9uOmcoYiksZD49ZyhhKStjK2Eub2Zmc2V0V2lkdGh9dmFyIGwsbSxuO3JldHVybiBsPWEub3duZXJEb2N1bWVudCxtPXdpbmRvdy5wYWdlWU9mZnNldHx8bC5ib2R5LnNjcm9sbFRvcCxuPXdpbmRvdy5wYWdlWE9mZnNldHx8bC5ib2R5LnNjcm9sbExlZnQsIShoKCl8fGooKXx8aSgpfHxrKCkpfWZ1bmN0aW9uIGMoKXt2YXIgYT1uZXcgRGF0ZTtyZXR1cm4gYS5nZXRUaW1lKCl9ZnVuY3Rpb24gZChhLGIpe3ZhciBjLGQ9e307Zm9yKGMgaW4gYSlhLmhhc093blByb3BlcnR5KGMpJiYoZFtjXT1hW2NdKTtmb3IoYyBpbiBiKWIuaGFzT3duUHJvcGVydHkoYykmJihkW2NdPWJbY10pO3JldHVybiBkfWZ1bmN0aW9uIGUoYSl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEpfWZ1bmN0aW9uIGYoYSxiKXt2YXIgYz1hLnBhcmVudEVsZW1lbnQ7aWYoXCJQSUNUVVJFXCI9PT1jLnRhZ05hbWUpZm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspe3ZhciBlPWMuY2hpbGRyZW5bZF07aWYoXCJTT1VSQ0VcIj09PWUudGFnTmFtZSl7dmFyIGY9ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK2IpO2YmJmUuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZil9fX1mdW5jdGlvbiBnKGEsYixjKXt2YXIgZD1hLnRhZ05hbWUsZT1hLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrYyk7aWYoXCJJTUdcIj09PWQpe2YoYSxiKTt2YXIgZz1hLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrYik7cmV0dXJuIGcmJmEuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZyksdm9pZChlJiZhLnNldEF0dHJpYnV0ZShcInNyY1wiLGUpKX1yZXR1cm5cIklGUkFNRVwiPT09ZD92b2lkKGUmJmEuc2V0QXR0cmlidXRlKFwic3JjXCIsZSkpOnZvaWQoZSYmKGEuc3R5bGUuYmFja2dyb3VuZEltYWdlPVwidXJsKFwiK2UrXCIpXCIpKX1mdW5jdGlvbiBoKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkoYixhcmd1bWVudHMpfX1mdW5jdGlvbiBpKGIpe2EoKSx0aGlzLl9zZXR0aW5ncz1kKGosYiksdGhpcy5fcXVlcnlPcmlnaW5Ob2RlPXRoaXMuX3NldHRpbmdzLmNvbnRhaW5lcj09PXdpbmRvdz9kb2N1bWVudDp0aGlzLl9zZXR0aW5ncy5jb250YWluZXIsdGhpcy5fcHJldmlvdXNMb29wVGltZT0wLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwsdGhpcy5faGFuZGxlU2Nyb2xsRm49aCh0aGlzLmhhbmRsZVNjcm9sbCx0aGlzKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSx0aGlzLnVwZGF0ZSgpfXZhciBqLGs9ITE7cmV0dXJuIGkucHJvdG90eXBlLl9zaG93T25BcHBlYXI9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYigpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjKSxhLmNsYXNzTGlzdC5yZW1vdmUoZC5jbGFzc19sb2FkaW5nKSxkLmNhbGxiYWNrX2Vycm9yJiZkLmNhbGxiYWNrX2Vycm9yKGEpfWZ1bmN0aW9uIGMoKXtudWxsIT09ZCYmKGQuY2FsbGJhY2tfbG9hZCYmZC5jYWxsYmFja19sb2FkKGEpLGEuY2xhc3NMaXN0LnJlbW92ZShkLmNsYXNzX2xvYWRpbmcpLGEuY2xhc3NMaXN0LmFkZChkLmNsYXNzX2xvYWRlZCksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGMpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsYikpfXZhciBkPXRoaXMuX3NldHRpbmdzO1wiSU1HXCIhPT1hLnRhZ05hbWUmJlwiSUZSQU1FXCIhPT1hLnRhZ05hbWV8fChhLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsYyksYS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixiKSxhLmNsYXNzTGlzdC5hZGQoZC5jbGFzc19sb2FkaW5nKSksZyhhLGQuZGF0YV9zcmNzZXQsZC5kYXRhX3NyYyksZC5jYWxsYmFja19zZXQmJmQuY2FsbGJhY2tfc2V0KGEpfSxpLnByb3RvdHlwZS5fbG9vcFRocm91Z2hFbGVtZW50cz1mdW5jdGlvbigpe3ZhciBhLGMsZD10aGlzLl9zZXR0aW5ncyxlPXRoaXMuX2VsZW1lbnRzLGY9ZT9lLmxlbmd0aDowLGc9W107Zm9yKGE9MDthPGY7YSsrKWM9ZVthXSxkLnNraXBfaW52aXNpYmxlJiZudWxsPT09Yy5vZmZzZXRQYXJlbnR8fGIoYyxkLmNvbnRhaW5lcixkLnRocmVzaG9sZCkmJih0aGlzLl9zaG93T25BcHBlYXIoYyksZy5wdXNoKGEpLGMud2FzUHJvY2Vzc2VkPSEwKTtmb3IoO2cubGVuZ3RoPjA7KWUuc3BsaWNlKGcucG9wKCksMSksZC5jYWxsYmFja19wcm9jZXNzZWQmJmQuY2FsbGJhY2tfcHJvY2Vzc2VkKGUubGVuZ3RoKTswPT09ZiYmdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKX0saS5wcm90b3R5cGUuX3B1cmdlRWxlbWVudHM9ZnVuY3Rpb24oKXt2YXIgYSxiLGM9dGhpcy5fZWxlbWVudHMsZD1jLmxlbmd0aCxlPVtdO2ZvcihhPTA7YTxkO2ErKyliPWNbYV0sYi53YXNQcm9jZXNzZWQmJmUucHVzaChhKTtmb3IoO2UubGVuZ3RoPjA7KWMuc3BsaWNlKGUucG9wKCksMSl9LGkucHJvdG90eXBlLl9zdGFydFNjcm9sbEhhbmRsZXI9ZnVuY3Rpb24oKXt0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsfHwodGhpcy5faXNIYW5kbGluZ1Njcm9sbD0hMCx0aGlzLl9zZXR0aW5ncy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSl9LGkucHJvdG90eXBlLl9zdG9wU2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe3RoaXMuX2lzSGFuZGxpbmdTY3JvbGwmJih0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsPSExLHRoaXMuX3NldHRpbmdzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5faGFuZGxlU2Nyb2xsRm4pKX0saS5wcm90b3R5cGUuaGFuZGxlU2Nyb2xsPWZ1bmN0aW9uKCl7dmFyIGEsYixkO3RoaXMuX3NldHRpbmdzJiYoYj1jKCksZD10aGlzLl9zZXR0aW5ncy50aHJvdHRsZSwwIT09ZD8oYT1kLShiLXRoaXMuX3ByZXZpb3VzTG9vcFRpbWUpLGE8PTB8fGE+ZD8odGhpcy5fbG9vcFRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwpLHRoaXMuX3ByZXZpb3VzTG9vcFRpbWU9Yix0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCkpOnRoaXMuX2xvb3BUaW1lb3V0fHwodGhpcy5fbG9vcFRpbWVvdXQ9c2V0VGltZW91dChoKGZ1bmN0aW9uKCl7dGhpcy5fcHJldmlvdXNMb29wVGltZT1jKCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCl9LHRoaXMpLGEpKSk6dGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpKX0saS5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy5fZWxlbWVudHM9ZSh0aGlzLl9xdWVyeU9yaWdpbk5vZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5lbGVtZW50c19zZWxlY3RvcikpLHRoaXMuX3B1cmdlRWxlbWVudHMoKSx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCksdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCl9LGkucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSx0aGlzLl9sb29wVGltZW91dCYmKGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCksdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKSx0aGlzLl9lbGVtZW50cz1udWxsLHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZT1udWxsLHRoaXMuX3NldHRpbmdzPW51bGx9LGl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhenlsb2FkLm1pbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbGF6eUxvYWQgZnJvbSAnLi9wYXR0ZXJucy9sYXp5LWxvYWQnO1xuaW1wb3J0ICogYXMgYWNjb3JkaW9uIGZyb20gXCIuL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL2FjY29yZGlvblwiO1xuXG5mdW5jdGlvbiBsYXVuY2hQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAocGF0dGVybi5DTEFTU05BTUUpIHtcbiAgICAgICAgbGV0IHtDTEFTU05BTUU6IGNuLCBsYXVuY2h9ID0gcGF0dGVybjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Y259Om5vdCguJHtjbn0tbmpzKWApLmZvckVhY2gobGF1bmNoKTtcbiAgICB9XG59XG5cbiEoZnVuY3Rpb24gKCkge1xuICAgIGxhdW5jaFBhdHRlcm4oYWNjb3JkaW9uKTtcbiAgICBsYXVuY2hQYXR0ZXJuKGxhenlMb2FkKTtcbn0oKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9