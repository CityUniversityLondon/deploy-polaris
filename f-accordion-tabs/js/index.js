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
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.cash = root.$ = factory();
  }
})(this, function () {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;

  var noop = function () {}, isFunction = function (item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  }, isString = function (item) {
    return typeof item === typeof "";
  };

  var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;

  function find(selector, context) {
    context = context || doc;
    var elems = (classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
    return elems;
  }

  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument();
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }

    frag.body.innerHTML = str;

    return frag.body.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector, i = 0, length;

    if (isString(selector)) {
      elems = (idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      find(selector, context));

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  Object.defineProperty(fn, "constructor", { value: cash });

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments), length = args.length, i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function each(collection, callback) {
    var l = collection.length, i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function getCompareFunction(selector) {
    return (
    /* Use browser's `matches` function if string */
    isString(selector) ? matches :
    /* Match a cash element */
    selector.cash ? function (el) {
      return selector.is(el);
    } :
    /* Direct comparison */
    function (el, selector) {
      return el === selector;
    });
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var uid = cash.uid = "_cash" + Date.now();

  function getDataCache(node) {
    return (node[uid] = node[uid] || {});
  }

  function setData(node, key, value) {
    return (getDataCache(node)[key] = value);
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }

  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }

  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return (value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        }));
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },

    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }

  });

  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function hasClass(v, c) {
    return (v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className));
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);

      return (classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this);
    },

    attr: function (name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },

    hasClass: function (c) {
      var check = false, classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },

    prop: function (name, value) {
      if (isString(name)) {
        return (value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        }));
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },

    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return (classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this);
    },

    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return (classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this);
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = (isFunction(selector) ? selector : getCompareFunction(selector));

      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return (index < 0 ? this[index + this.length] : this[index]);
    },

    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0], collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  var camelCase = (function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }());

  var getPrefixedProp = (function () {
    var cache = {}, doc = document, div = doc.createElement("div"), style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + (prefixes).join(ucProp + " ") + ucProp).split(" ");

      each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }());

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return (arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop]);
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };

    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });

  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"), eventCache = (events && events[eventName]), index;

    if (!eventCache) {
      return;
    }

    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },

    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line

      var originalCallback;

      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === "ready") {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;

          while (!matches(t, delegate)) {
            if (t === this) {
              return (t = false);
            }
            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },

    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },

    ready: onReady,

    trigger: function (eventName, data) {
      var evt = doc.createEvent("HTMLEvents");
      evt.data = data;
      evt.initEvent(eventName, true, false);
      return this.each(function (v) {
        return v.dispatchEvent(evt);
      });
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }

  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }

  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return (el.checked) ? el.value : null;
      case "checkbox":
        return (el.checked) ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }

  fn.extend({
    serialize: function () {
      var query = "";

      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      } else {
        return this.each(function (v) {
          return v.value = value;
        });
      }
    }

  });

  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, (i === 0 ? child : child.cloneNode(true)), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = (content.nodeType ? content[0].outerHTML : content);
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;


      cash(selector).each(function (el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore((i === 0 ? v : v.cloneNode(true)), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        return v.parentNode.removeChild(v);
      });
    },

    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  var docEl = doc.documentElement;

  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },

    offsetParent: function () {
      return cash(this[0].offsetParent);
    }

  });

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return (!selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      }));
    },

    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false, comparator = getCompareFunction(selector);

      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      var comparator = (isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      });

      return this.filter(comparator);
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = getCompareFunction(selector);

      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },

    parent: function () {
      var result = [];

      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });

      return unique(result);
    },

    parents: function (selector) {
      var last, result = [];

      this.each(function (item) {
        last = item;

        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;

          if (!selector || (selector && matches(last, selector))) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function () {
      var collection = this.parent().children(), el = this[0];

      return collection.filter(function (i) {
        return i !== el;
      });
    }

  });


  return cash;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLASSNAME = undefined;
exports.launch = launch;

var _prepareAccordionTabs = __webpack_require__(3);

var _prepareAccordionTabs2 = _interopRequireDefault(_prepareAccordionTabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch(el, i) {
    console.log(el);
    (0, _prepareAccordionTabs2.default)(CLASSNAME, el, i, false);
}

var CLASSNAME = exports.CLASSNAME = 'accordion';

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareAccordionTabs;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareAccordionTabs(patternClassname, el, index, addTabHeadings) {
    var headingClass = patternClassname + '__heading';
    var headings = (0, _cashDom2.default)(el).children('h2,h3,h4,div.' + headingClass);
    var anchors = [];

    var clickManager = function clickManager() {
        var _this = this;

        var active = (0, _cashDom2.default)(this).parent().hasClass('active');
        anchors.forEach(function (anchor) {
            var activate = anchor[0] === _this ? !active : false;
            anchor.parent().toggleClass('active', activate);
            anchor.parent().toggleClass('inactive', !activate);
        });
    };

    headings.each(function (heading, i) {
        (0, _cashDom2.default)(heading).addClass(headingClass + ' inactive');

        var anchor = (0, _cashDom2.default)('<a/>');
        anchors.push(anchor);
        anchor.attr('href', '#t' + (index + 1) + '-' + (i + 1));

        if (heading.childNodes.length === 1 && heading.childNodes[0].nodeType === Node.TEXT_NODE) {
            var span = (0, _cashDom2.default)('<span/>');
            span.html((0, _cashDom2.default)(heading).html());
            (0, _cashDom2.default)(heading).empty();
            span.addClass(patternClassname + '__heading__label');
            anchor.append(span);
        } else {
            anchor.append((0, _cashDom2.default)(heading).children());
        }

        var icon = (0, _cashDom2.default)('<span/>');
        icon.attr('aria-hidden', 'true');
        icon.addClass(headingClass + '__icon');

        anchor.append(icon);
        anchor.on('click', clickManager);

        (0, _cashDom2.default)(heading).append(anchor);
    });
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


var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _lazyLoad = __webpack_require__(2);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

var _accordion = __webpack_require__(1);

var accordion = _interopRequireWildcard(_accordion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launchPattern(pattern) {
    if (typeof pattern === 'function') {
        pattern();
    } else if (pattern.CLASSNAME) {
        var cn = pattern.CLASSNAME,
            launch = pattern.launch;

        (0, _cashDom2.default)("." + cn + ":not(." + cn + "-njs)").each(launch);
    }
}

!function () {
    launchPattern(accordion);
    launchPattern(_lazyLoad2.default);
}();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjMyYzhjNjY1MjgyOGE5Y2EwNTQiLCJ3ZWJwYWNrOi8vLy4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL2FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0dGVybnMvbGF6eS1sb2FkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYXR0ZXJucy9hY2NvcmRpb24tdGFicy9wcmVwYXJlLWFjY29yZGlvbi10YWJzLmpzIiwid2VicGFjazovLy8uL34vdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsibGF1bmNoIiwiZWwiLCJpIiwiY29uc29sZSIsImxvZyIsIkNMQVNTTkFNRSIsImVsZW1lbnRzX3NlbGVjdG9yIiwiZGF0YV9zcmMiLCJ0aHJlc2hvbGQiLCJjYWxsYmFja19sb2FkIiwiaW1nIiwic3R5bGUiLCJwYWRkaW5nQm90dG9tIiwicHJlcGFyZUFjY29yZGlvblRhYnMiLCJwYXR0ZXJuQ2xhc3NuYW1lIiwiaW5kZXgiLCJhZGRUYWJIZWFkaW5ncyIsImhlYWRpbmdDbGFzcyIsImhlYWRpbmdzIiwiY2hpbGRyZW4iLCJhbmNob3JzIiwiY2xpY2tNYW5hZ2VyIiwiYWN0aXZlIiwicGFyZW50IiwiaGFzQ2xhc3MiLCJmb3JFYWNoIiwiYWN0aXZhdGUiLCJhbmNob3IiLCJ0b2dnbGVDbGFzcyIsImVhY2giLCJoZWFkaW5nIiwiYWRkQ2xhc3MiLCJwdXNoIiwiYXR0ciIsImNoaWxkTm9kZXMiLCJsZW5ndGgiLCJub2RlVHlwZSIsIk5vZGUiLCJURVhUX05PREUiLCJzcGFuIiwiaHRtbCIsImVtcHR5IiwiYXBwZW5kIiwiaWNvbiIsIm9uIiwiYWNjb3JkaW9uIiwibGF1bmNoUGF0dGVybiIsInBhdHRlcm4iLCJjbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O2tFQ2hFQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCx3QkFBd0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMsY0FBYzs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLFlBQVk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLFNBQVM7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUssRUFBRTs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxvRkFBb0Y7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsR0FBRzs7O0FBR0g7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7Ozs7UUM3N0JlQSxNLEdBQUFBLE07O0FBRmhCOzs7Ozs7QUFFTyxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFvQkMsQ0FBcEIsRUFBdUI7QUFDMUJDLFlBQVFDLEdBQVIsQ0FBWUgsRUFBWjtBQUNBLHdDQUFrQkksU0FBbEIsRUFBNkJKLEVBQTdCLEVBQWlDQyxDQUFqQyxFQUFvQyxLQUFwQztBQUNIOztBQUVNLElBQU1HLGdDQUFZLFdBQWxCLEM7Ozs7Ozs7Ozs7Ozs7a0JDTFEsWUFBWTtBQUN2QixrQ0FBYTtBQUNUQywyQkFBbUIsWUFEVjtBQUVUQyxrQkFBVSxLQUZEO0FBR1RDLG1CQUFXLENBSEY7QUFJVEMsdUJBQWUsNEJBQU87QUFDbEJDLGdCQUFJQyxLQUFKLENBQVVDLGFBQVYsR0FBMEIsQ0FBMUI7QUFDSDtBQU5RLEtBQWI7QUFRSCxDOztBQVhEOzs7Ozs7Ozs7Ozs7Ozs7O2tCQ0V3QkMsb0I7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTQSxvQkFBVCxDQUE4QkMsZ0JBQTlCLEVBQWdEYixFQUFoRCxFQUFvRGMsS0FBcEQsRUFBMkRDLGNBQTNELEVBQTJFO0FBQ3RGLFFBQUlDLGVBQWtCSCxnQkFBbEIsY0FBSjtBQUNBLFFBQUlJLFdBQVcsdUJBQUVqQixFQUFGLEVBQU1rQixRQUFOLG1CQUErQkYsWUFBL0IsQ0FBZjtBQUNBLFFBQUlHLFVBQVUsRUFBZDs7QUFFQSxRQUFJQyxlQUFlLFNBQWZBLFlBQWUsR0FBWTtBQUFBOztBQUMzQixZQUFJQyxTQUFTLHVCQUFFLElBQUYsRUFBUUMsTUFBUixHQUFpQkMsUUFBakIsQ0FBMEIsUUFBMUIsQ0FBYjtBQUNBSixnQkFBUUssT0FBUixDQUFnQixrQkFBVTtBQUN0QixnQkFBSUMsV0FBV0MsT0FBTyxDQUFQLGNBQXFCLENBQUNMLE1BQXRCLEdBQStCLEtBQTlDO0FBQ0FLLG1CQUFPSixNQUFQLEdBQWdCSyxXQUFoQixDQUE0QixRQUE1QixFQUFzQ0YsUUFBdEM7QUFDQUMsbUJBQU9KLE1BQVAsR0FBZ0JLLFdBQWhCLENBQTRCLFVBQTVCLEVBQXdDLENBQUNGLFFBQXpDO0FBQ0gsU0FKRDtBQUtILEtBUEQ7O0FBU0FSLGFBQVNXLElBQVQsQ0FBYyxVQUFDQyxPQUFELEVBQVU1QixDQUFWLEVBQWdCO0FBQzFCLCtCQUFFNEIsT0FBRixFQUFXQyxRQUFYLENBQXVCZCxZQUF2Qjs7QUFFQSxZQUFJVSxTQUFTLHVCQUFFLE1BQUYsQ0FBYjtBQUNBUCxnQkFBUVksSUFBUixDQUFhTCxNQUFiO0FBQ0FBLGVBQU9NLElBQVAsQ0FBWSxNQUFaLFVBQXlCbEIsUUFBUSxDQUFqQyxXQUFzQ2IsSUFBSSxDQUExQzs7QUFFQSxZQUFJNEIsUUFBUUksVUFBUixDQUFtQkMsTUFBbkIsS0FBOEIsQ0FBOUIsSUFBbUNMLFFBQVFJLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0JFLFFBQXRCLEtBQW1DQyxLQUFLQyxTQUEvRSxFQUEwRjtBQUN0RixnQkFBSUMsT0FBTyx1QkFBRSxTQUFGLENBQVg7QUFDQUEsaUJBQUtDLElBQUwsQ0FBVSx1QkFBRVYsT0FBRixFQUFXVSxJQUFYLEVBQVY7QUFDQSxtQ0FBRVYsT0FBRixFQUFXVyxLQUFYO0FBQ0FGLGlCQUFLUixRQUFMLENBQWlCakIsZ0JBQWpCO0FBQ0FhLG1CQUFPZSxNQUFQLENBQWNILElBQWQ7QUFDSCxTQU5ELE1BTU87QUFDSFosbUJBQU9lLE1BQVAsQ0FBYyx1QkFBRVosT0FBRixFQUFXWCxRQUFYLEVBQWQ7QUFDSDs7QUFFRCxZQUFJd0IsT0FBTyx1QkFBRSxTQUFGLENBQVg7QUFDQUEsYUFBS1YsSUFBTCxDQUFVLGFBQVYsRUFBeUIsTUFBekI7QUFDQVUsYUFBS1osUUFBTCxDQUFpQmQsWUFBakI7O0FBRUFVLGVBQU9lLE1BQVAsQ0FBY0MsSUFBZDtBQUNBaEIsZUFBT2lCLEVBQVAsQ0FBVSxPQUFWLEVBQW1CdkIsWUFBbkI7O0FBRUEsK0JBQUVTLE9BQUYsRUFBV1ksTUFBWCxDQUFrQmYsTUFBbEI7QUFDSCxLQXpCRDtBQTBCSCxDOzs7Ozs7QUMxQ0QsK0dBQWU7QUFBQTtBQUFBO0FBQUEsZ0tBQThHLGlCQUFpQixhQUFhLE9BQU8sb1FBQW9RLE9BQU8sa0JBQWtCLGFBQWEsbUZBQW1GLGFBQWEsc0ZBQXNGLGNBQWMsbUVBQW1FLGNBQWMscUVBQXFFLGFBQWEsTUFBTSx3REFBd0QsYUFBYSxNQUFNLDhEQUE4RCxhQUFhLE1BQU0sb0RBQW9ELGFBQWEsTUFBTSxtREFBbUQsVUFBVSw4SEFBOEgsYUFBYSxlQUFlLG1CQUFtQixnQkFBZ0IsV0FBVyw0Q0FBNEMsNENBQTRDLFNBQVMsY0FBYyxxQ0FBcUMsZ0JBQWdCLHNCQUFzQixxQ0FBcUMsb0JBQW9CLEtBQUssb0JBQW9CLHlCQUF5QixnQ0FBZ0MsZ0NBQWdDLGtCQUFrQiw0Q0FBNEMsY0FBYyxPQUFPLGdDQUFnQyxzRUFBc0Usb0dBQW9HLGdCQUFnQixrQkFBa0IsNkJBQTZCLGNBQWMsd1JBQXdSLFdBQVcsNkNBQTZDLGFBQWEsMEdBQTBHLGFBQWEscUxBQXFMLHFCQUFxQix1TUFBdU0sNkNBQTZDLDhEQUE4RCxRQUFRLElBQUksc0lBQXNJLEtBQUssV0FBVywwRUFBMEUsaUNBQWlDLHVDQUF1Qyx5Q0FBeUMsUUFBUSxJQUFJLHFDQUFxQyxLQUFLLFdBQVcscUJBQXFCLDRDQUE0Qyw2SEFBNkgsMkNBQTJDLGdJQUFnSSxxQ0FBcUMsVUFBVSxrU0FBa1MsOEVBQThFLHlDQUF5QywrQkFBK0Isd0tBQXdLLGdDQUFnQyxtT0FBbU8sR0FBRztBQUM1bEosd0M7Ozs7Ozs7OztBQ0RBOzs7O0FBRUE7Ozs7QUFDQTs7SUFBWWtCLFM7Ozs7OztBQUVaLFNBQVNDLGFBQVQsQ0FBdUJDLE9BQXZCLEVBQWdDO0FBQzVCLFFBQUksT0FBT0EsT0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUMvQkE7QUFDSCxLQUZELE1BRU8sSUFBSUEsUUFBUTFDLFNBQVosRUFBdUI7QUFBQSxZQUNWMkMsRUFEVSxHQUNJRCxPQURKLENBQ3JCMUMsU0FEcUI7QUFBQSxZQUNOTCxNQURNLEdBQ0krQyxPQURKLENBQ04vQyxNQURNOztBQUUxQixxQ0FBTWdELEVBQU4sY0FBaUJBLEVBQWpCLFlBQTRCbkIsSUFBNUIsQ0FBaUM3QixNQUFqQztBQUNIO0FBQ0o7O0FBRUQsQ0FBRSxZQUFZO0FBQ1Y4QyxrQkFBY0QsU0FBZDtBQUNBQztBQUNILENBSEMsRUFBRixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjMyYzhjNjY1MjgyOGE5Y2EwNTQiLCJcInVzZSBzdHJpY3RcIjtcblxuLyohIGNhc2gtZG9tIDEuMy41LCBodHRwczovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9jYXNoIEBsaWNlbnNlIE1JVCAqL1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290LmNhc2ggPSByb290LiQgPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50LCB3aW4gPSB3aW5kb3csIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIHNsaWNlID0gQXJyYXlQcm90by5zbGljZSwgZmlsdGVyID0gQXJyYXlQcm90by5maWx0ZXIsIHB1c2ggPSBBcnJheVByb3RvLnB1c2g7XG5cbiAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fSwgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgLy8gQHNlZSBodHRwczovL2NyYnVnLmNvbS81Njg0NDhcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IHR5cGVvZiBub29wICYmIGl0ZW0uY2FsbDtcbiAgfSwgaXNTdHJpbmcgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gdHlwZW9mIFwiXCI7XG4gIH07XG5cbiAgdmFyIGlkTWF0Y2ggPSAvXiNbXFx3LV0qJC8sIGNsYXNzTWF0Y2ggPSAvXlxcLltcXHctXSokLywgaHRtbE1hdGNoID0gLzwuKz4vLCBzaW5nbGV0ID0gL15cXHcrJC87XG5cbiAgZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvYztcbiAgICB2YXIgZWxlbXMgPSAoY2xhc3NNYXRjaC50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvci5zbGljZSgxKSkgOiBzaW5nbGV0LnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICByZXR1cm4gZWxlbXM7XG4gIH1cblxuICB2YXIgZnJhZztcbiAgZnVuY3Rpb24gcGFyc2VIVE1MKHN0cikge1xuICAgIGlmICghZnJhZykge1xuICAgICAgZnJhZyA9IGRvYy5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoKTtcbiAgICAgIHZhciBiYXNlID0gZnJhZy5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKTtcbiAgICAgIGJhc2UuaHJlZiA9IGRvYy5sb2NhdGlvbi5ocmVmO1xuICAgICAgZnJhZy5oZWFkLmFwcGVuZENoaWxkKGJhc2UpO1xuICAgIH1cblxuICAgIGZyYWcuYm9keS5pbm5lckhUTUwgPSBzdHI7XG5cbiAgICByZXR1cm4gZnJhZy5ib2R5LmNoaWxkTm9kZXM7XG4gIH1cblxuICBmdW5jdGlvbiBvblJlYWR5KGZuKSB7XG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikge1xuICAgICAgZm4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgYWxyZWFkeSBhIGNhc2ggY29sbGVjdGlvbiwgZG9uJ3QgZG8gYW55IGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgIGlmIChzZWxlY3Rvci5jYXNoICYmIHNlbGVjdG9yICE9PSB3aW4pIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICB2YXIgZWxlbXMgPSBzZWxlY3RvciwgaSA9IDAsIGxlbmd0aDtcblxuICAgIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICAgIGVsZW1zID0gKGlkTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgYW4gSUQgdXNlIHRoZSBmYXN0ZXIgZ2V0RWxlbWVudEJ5SWQgY2hlY2tcbiAgICAgIGRvYy5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgSFRNTCwgcGFyc2UgaXQgaW50byByZWFsIGVsZW1lbnRzXG4gICAgICBwYXJzZUhUTUwoc2VsZWN0b3IpIDpcbiAgICAgIC8vIGVsc2UgdXNlIGBmaW5kYFxuICAgICAgZmluZChzZWxlY3RvciwgY29udGV4dCkpO1xuXG4gICAgICAvLyBJZiBmdW5jdGlvbiwgdXNlIGFzIHNob3J0Y3V0IGZvciBET00gcmVhZHlcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBvblJlYWR5KHNlbGVjdG9yKTtyZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBhIHNpbmdsZSBET00gZWxlbWVudCBpcyBwYXNzZWQgaW4gb3IgcmVjZWl2ZWQgdmlhIElELCByZXR1cm4gdGhlIHNpbmdsZSBlbGVtZW50XG4gICAgaWYgKGVsZW1zLm5vZGVUeXBlIHx8IGVsZW1zID09PSB3aW4pIHtcbiAgICAgIHRoaXNbMF0gPSBlbGVtcztcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJlYXQgbGlrZSBhbiBhcnJheSBhbmQgbG9vcCB0aHJvdWdoIGVhY2ggaXRlbS5cbiAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzW2ldID0gZWxlbXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgfVxuXG4gIHZhciBmbiA9IGNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IEluaXQucHJvdG90eXBlID0geyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICBjYXNoOiB0cnVlLFxuICAgIGxlbmd0aDogMCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHNwbGljZTogQXJyYXlQcm90by5zcGxpY2UsXG4gICAgbWFwOiBBcnJheVByb3RvLm1hcCxcbiAgICBpbml0OiBJbml0XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImNvbnN0cnVjdG9yXCIsIHsgdmFsdWU6IGNhc2ggfSk7XG5cbiAgY2FzaC5wYXJzZUhUTUwgPSBwYXJzZUhUTUw7XG4gIGNhc2gubm9vcCA9IG5vb3A7XG4gIGNhc2guaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gIGNhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcblxuICBjYXNoLmV4dGVuZCA9IGZuLmV4dGVuZCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwge307XG5cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSwgbGVuZ3RoID0gYXJncy5sZW5ndGgsIGkgPSAxO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0aGlzO1xuICAgICAgaSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFhcmdzW2ldKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3NbaV0pIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnc1tpXVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBmdW5jdGlvbiBlYWNoKGNvbGxlY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGwgPSBjb2xsZWN0aW9uLmxlbmd0aCwgaSA9IDA7XG5cbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoY29sbGVjdGlvbltpXSwgY29sbGVjdGlvbltpXSwgaSwgY29sbGVjdGlvbikgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hdGNoZXMoZWwsIHNlbGVjdG9yKSB7XG4gICAgdmFyIG0gPSBlbCAmJiAoZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpO1xuICAgIHJldHVybiAhIW0gJiYgbS5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gKFxuICAgIC8qIFVzZSBicm93c2VyJ3MgYG1hdGNoZXNgIGZ1bmN0aW9uIGlmIHN0cmluZyAqL1xuICAgIGlzU3RyaW5nKHNlbGVjdG9yKSA/IG1hdGNoZXMgOlxuICAgIC8qIE1hdGNoIGEgY2FzaCBlbGVtZW50ICovXG4gICAgc2VsZWN0b3IuY2FzaCA/IGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yLmlzKGVsKTtcbiAgICB9IDpcbiAgICAvKiBEaXJlY3QgY29tcGFyaXNvbiAqL1xuICAgIGZ1bmN0aW9uIChlbCwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBlbCA9PT0gc2VsZWN0b3I7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmlxdWUoY29sbGVjdGlvbikge1xuICAgIHJldHVybiBjYXNoKHNsaWNlLmNhbGwoY29sbGVjdGlvbikuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XG4gICAgfSkpO1xuICB9XG5cbiAgY2FzaC5leHRlbmQoe1xuICAgIG1lcmdlOiBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuICAgICAgdmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLCBpID0gZmlyc3QubGVuZ3RoLCBqID0gMDtcblxuICAgICAgZm9yICg7IGogPCBsZW47IGkrKywgaisrKSB7XG4gICAgICAgIGZpcnN0W2ldID0gc2Vjb25kW2pdO1xuICAgICAgfVxuXG4gICAgICBmaXJzdC5sZW5ndGggPSBpO1xuICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH0sXG5cbiAgICBlYWNoOiBlYWNoLFxuICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgdW5pcXVlOiB1bmlxdWUsXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSxcbiAgICBpc051bWVyaWM6IGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgdWlkID0gY2FzaC51aWQgPSBcIl9jYXNoXCIgKyBEYXRlLm5vdygpO1xuXG4gIGZ1bmN0aW9uIGdldERhdGFDYWNoZShub2RlKSB7XG4gICAgcmV0dXJuIChub2RlW3VpZF0gPSBub2RlW3VpZF0gfHwge30pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGF0YShub2RlLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIChnZXREYXRhQ2FjaGUobm9kZSlba2V5XSA9IHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGEobm9kZSwga2V5KSB7XG4gICAgdmFyIGMgPSBnZXREYXRhQ2FjaGUobm9kZSk7XG4gICAgaWYgKGNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjW2tleV0gPSBub2RlLmRhdGFzZXQgPyBub2RlLmRhdGFzZXRba2V5XSA6IGNhc2gobm9kZSkuYXR0cihcImRhdGEtXCIgKyBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gY1trZXldO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRGF0YShub2RlLCBrZXkpIHtcbiAgICB2YXIgYyA9IGdldERhdGFDYWNoZShub2RlKTtcbiAgICBpZiAoYykge1xuICAgICAgZGVsZXRlIGNba2V5XTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YXNldCkge1xuICAgICAgZGVsZXRlIG5vZGUuZGF0YXNldFtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXNoKG5vZGUpLnJlbW92ZUF0dHIoXCJkYXRhLVwiICsgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBkYXRhOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgPyBnZXREYXRhKHRoaXNbMF0sIG5hbWUpIDogdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHNldERhdGEodiwgbmFtZSwgdmFsdWUpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmVEYXRhOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVEYXRhKHYsIGtleSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIG5vdFdoaXRlTWF0Y2ggPSAvXFxTKy9nO1xuXG4gIGZ1bmN0aW9uIGdldENsYXNzZXMoYykge1xuICAgIHJldHVybiBpc1N0cmluZyhjKSAmJiBjLm1hdGNoKG5vdFdoaXRlTWF0Y2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzQ2xhc3ModiwgYykge1xuICAgIHJldHVybiAodi5jbGFzc0xpc3QgPyB2LmNsYXNzTGlzdC5jb250YWlucyhjKSA6IG5ldyBSZWdFeHAoXCIoXnwgKVwiICsgYyArIFwiKCB8JClcIiwgXCJnaVwiKS50ZXN0KHYuY2xhc3NOYW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKSB7XG4gICAgaWYgKHYuY2xhc3NMaXN0KSB7XG4gICAgICB2LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfSBlbHNlIGlmIChzcGFjZWROYW1lLmluZGV4T2YoXCIgXCIgKyBjICsgXCIgXCIpKSB7XG4gICAgICB2LmNsYXNzTmFtZSArPSBcIiBcIiArIGM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3ModiwgYykge1xuICAgIGlmICh2LmNsYXNzTGlzdCkge1xuICAgICAgdi5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2LmNsYXNzTmFtZSA9IHYuY2xhc3NOYW1lLnJlcGxhY2UoYywgXCJcIik7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcblxuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBzcGFjZWROYW1lID0gXCIgXCIgKyB2LmNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0cjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmdldEF0dHJpYnV0ZSA/IHRoaXNbMF0uZ2V0QXR0cmlidXRlKG5hbWUpIDogdGhpc1swXVtuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAodi5zZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHYuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdltuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXR0cihrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjaGVjayA9IGZhbHNlLCBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcbiAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIGNoZWNrID0gaGFzQ2xhc3ModiwgY2xhc3Nlc1swXSk7XG4gICAgICAgICAgcmV0dXJuICFjaGVjaztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSxcblxuICAgIHByb3A6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXNbMF1bbmFtZV0gOiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICB2W25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9wKGtleSwgbmFtZVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnJlbW92ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgIHYucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB2W25hbWVdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzZXMgPSBnZXRDbGFzc2VzKGMpO1xuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZW1vdmVDbGFzcyh2LCBjKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSA6IHRoaXMpO1xuICAgIH0sXG5cbiAgICByZW1vdmVQcm9wOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBkZWxldGUgdltuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGMsIHN0YXRlKSB7XG4gICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1tzdGF0ZSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oYyk7XG4gICAgICB9XG4gICAgICB2YXIgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG4gICAgICByZXR1cm4gKGNsYXNzZXMgPyB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFyIHNwYWNlZE5hbWUgPSBcIiBcIiArIHYuY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoaGFzQ2xhc3ModiwgYykpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKHYsIGMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9IH0pO1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWRkOiBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB1bmlxdWUoY2FzaC5tZXJnZSh0aGlzLCBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSkpO1xuICAgIH0sXG5cbiAgICBlYWNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIGVhY2godGhpcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGVxOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG4gICAgfSxcblxuICAgIGZpbHRlcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29tcGFyYXRvciA9IChpc0Z1bmN0aW9uKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKSk7XG5cbiAgICAgIHJldHVybiBjYXNoKGZpbHRlci5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKGUsIHNlbGVjdG9yKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZmlyc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxKDApO1xuICAgIH0sXG5cbiAgICBnZXQ6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHNsaWNlLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGluZGV4IDwgMCA/IHRoaXNbaW5kZXggKyB0aGlzLmxlbmd0aF0gOiB0aGlzW2luZGV4XSk7XG4gICAgfSxcblxuICAgIGluZGV4OiBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgdmFyIGNoaWxkID0gZWxlbSA/IGNhc2goZWxlbSlbMF0gOiB0aGlzWzBdLCBjb2xsZWN0aW9uID0gZWxlbSA/IHRoaXMgOiBjYXNoKGNoaWxkKS5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICAgICAgcmV0dXJuIHNsaWNlLmNhbGwoY29sbGVjdGlvbikuaW5kZXhPZihjaGlsZCk7XG4gICAgfSxcblxuICAgIGxhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxKC0xKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIGNhbWVsQ2FzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbWVsUmVnZXggPSAvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIHdoaXRlU3BhY2UgPSAvW1xccy1fXSsvZztcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsUmVnZXgsIGZ1bmN0aW9uIChsZXR0ZXIsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsZXR0ZXJbaW5kZXggPT09IDAgPyBcInRvTG93ZXJDYXNlXCIgOiBcInRvVXBwZXJDYXNlXCJdKCk7XG4gICAgICB9KS5yZXBsYWNlKHdoaXRlU3BhY2UsIFwiXCIpO1xuICAgIH07XG4gIH0oKSk7XG5cbiAgdmFyIGdldFByZWZpeGVkUHJvcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhY2hlID0ge30sIGRvYyA9IGRvY3VtZW50LCBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgc3R5bGUgPSBkaXYuc3R5bGU7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHByb3AgPSBjYW1lbENhc2UocHJvcCk7XG4gICAgICBpZiAoY2FjaGVbcHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgfVxuXG4gICAgICB2YXIgdWNQcm9wID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSksIHByZWZpeGVzID0gW1wid2Via2l0XCIsIFwibW96XCIsIFwibXNcIiwgXCJvXCJdLCBwcm9wcyA9IChwcm9wICsgXCIgXCIgKyAocHJlZml4ZXMpLmpvaW4odWNQcm9wICsgXCIgXCIpICsgdWNQcm9wKS5zcGxpdChcIiBcIik7XG5cbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIGlmIChwIGluIHN0eWxlKSB7XG4gICAgICAgICAgY2FjaGVbcF0gPSBwcm9wID0gY2FjaGVbcHJvcF0gPSBwO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICB9O1xuICB9KCkpO1xuXG4gIGNhc2gucHJlZml4ZWRQcm9wID0gZ2V0UHJlZml4ZWRQcm9wO1xuICBjYXNoLmNhbWVsQ2FzZSA9IGNhbWVsQ2FzZTtcblxuICBmbi5leHRlbmQoe1xuICAgIGNzczogZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgICAgcHJvcCA9IGdldFByZWZpeGVkUHJvcChwcm9wKTtcbiAgICAgICAgcmV0dXJuIChhcmd1bWVudHMubGVuZ3RoID4gMSA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiB2LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0pIDogd2luLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSlbcHJvcF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgICAgICB0aGlzLmNzcyhrZXksIHByb3Bba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBjb21wdXRlKGVsLCBwcm9wKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsWzBdLCBudWxsKVtwcm9wXSwgMTApIHx8IDA7XG4gIH1cblxuICBlYWNoKFtcIldpZHRoXCIsIFwiSGVpZ2h0XCJdLCBmdW5jdGlvbiAodikge1xuICAgIHZhciBsb3dlciA9IHYudG9Mb3dlckNhc2UoKTtcblxuICAgIGZuW2xvd2VyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2xvd2VyXTtcbiAgICB9O1xuXG4gICAgZm5bXCJpbm5lclwiICsgdl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1swXVtcImNsaWVudFwiICsgdl07XG4gICAgfTtcblxuICAgIGZuW1wib3V0ZXJcIiArIHZdID0gZnVuY3Rpb24gKG1hcmdpbnMpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wib2Zmc2V0XCIgKyB2XSArIChtYXJnaW5zID8gY29tcHV0ZSh0aGlzLCBcIm1hcmdpblwiICsgKHYgPT09IFwiV2lkdGhcIiA/IFwiTGVmdFwiIDogXCJUb3BcIikpICsgY29tcHV0ZSh0aGlzLCBcIm1hcmdpblwiICsgKHYgPT09IFwiV2lkdGhcIiA/IFwiUmlnaHRcIiA6IFwiQm90dG9tXCIpKSA6IDApO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQobm9kZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudENhY2hlID0gZ2V0RGF0YShub2RlLCBcIl9jYXNoRXZlbnRzXCIpIHx8IHNldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiLCB7fSk7XG4gICAgZXZlbnRDYWNoZVtldmVudE5hbWVdID0gZXZlbnRDYWNoZVtldmVudE5hbWVdIHx8IFtdO1xuICAgIGV2ZW50Q2FjaGVbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudChub2RlLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGV2ZW50cyA9IGdldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiKSwgZXZlbnRDYWNoZSA9IChldmVudHMgJiYgZXZlbnRzW2V2ZW50TmFtZV0pLCBpbmRleDtcblxuICAgIGlmICghZXZlbnRDYWNoZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgaW5kZXggPSBldmVudENhY2hlLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgZXZlbnRDYWNoZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGV2ZW50Q2FjaGUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50Q2FjaGUgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUV2ZW50KHYsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHJ1bk9uY2UpIHtcbiAgICAgIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgICB2YXIgb3JpZ2luYWxDYWxsYmFjaztcblxuICAgICAgaWYgKCFpc1N0cmluZyhldmVudE5hbWUpKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBldmVudE5hbWUpIHtcbiAgICAgICAgICB0aGlzLm9uKGtleSwgZGVsZWdhdGUsIGV2ZW50TmFtZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVsZWdhdGUpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZGVsZWdhdGU7XG4gICAgICAgIGRlbGVnYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gXCJyZWFkeVwiKSB7XG4gICAgICAgIG9uUmVhZHkoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciB0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModCwgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICByZXR1cm4gKHQgPSBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gdC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrLmNhbGwodCwgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGlmIChydW5PbmNlKSB7XG4gICAgICAgICAgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXJFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGVsZWdhdGUsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbihldmVudE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHJlYWR5OiBvblJlYWR5LFxuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgdmFyIGV2dCA9IGRvYy5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICBldnQuZGF0YSA9IGRhdGE7XG4gICAgICBldnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZW5jb2RlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUyMC9nLCBcIitcIik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZWxlY3RNdWx0aXBsZV8oZWwpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZWFjaChlbC5vcHRpb25zLCBmdW5jdGlvbiAobykge1xuICAgICAgaWYgKG8uc2VsZWN0ZWQpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goby52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXMgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0U2luZ2xlXyhlbCkge1xuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gZWwuc2VsZWN0ZWRJbmRleDtcbiAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA+PSAwID8gZWwub3B0aW9uc1tzZWxlY3RlZEluZGV4XS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWYWx1ZShlbCkge1xuICAgIHZhciB0eXBlID0gZWwudHlwZTtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSBcInNlbGVjdC1vbmVcIjpcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdFNpbmdsZV8oZWwpO1xuICAgICAgY2FzZSBcInNlbGVjdC1tdWx0aXBsZVwiOlxuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0TXVsdGlwbGVfKGVsKTtcbiAgICAgIGNhc2UgXCJyYWRpb1wiOlxuICAgICAgICByZXR1cm4gKGVsLmNoZWNrZWQpID8gZWwudmFsdWUgOiBudWxsO1xuICAgICAgY2FzZSBcImNoZWNrYm94XCI6XG4gICAgICAgIHJldHVybiAoZWwuY2hlY2tlZCkgPyBlbC52YWx1ZSA6IG51bGw7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZWwudmFsdWUgPyBlbC52YWx1ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBxdWVyeSA9IFwiXCI7XG5cbiAgICAgIGVhY2godGhpc1swXS5lbGVtZW50cyB8fCB0aGlzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmRpc2FibGVkIHx8IGVsLnRhZ05hbWUgPT09IFwiRklFTERTRVRcIikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZSA9IGVsLm5hbWU7XG4gICAgICAgIHN3aXRjaCAoZWwudHlwZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgY2FzZSBcImZpbGVcIjpcbiAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICBjYXNlIFwic3VibWl0XCI6XG4gICAgICAgICAgY2FzZSBcImJ1dHRvblwiOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInNlbGVjdC1tdWx0aXBsZVwiOlxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGdldFZhbHVlKGVsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGVuY29kZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGVsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHF1ZXJ5LnN1YnN0cigxKTtcbiAgICB9LFxuXG4gICAgdmFsOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChlbCwgY2hpbGQsIHByZXBlbmQpIHtcbiAgICBpZiAocHJlcGVuZCkge1xuICAgICAgdmFyIGZpcnN0ID0gZWwuY2hpbGROb2Rlc1swXTtcbiAgICAgIGVsLmluc2VydEJlZm9yZShjaGlsZCwgZmlyc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0Q29udGVudChwYXJlbnQsIGNoaWxkLCBwcmVwZW5kKSB7XG4gICAgdmFyIHN0ciA9IGlzU3RyaW5nKGNoaWxkKTtcblxuICAgIGlmICghc3RyICYmIGNoaWxkLmxlbmd0aCkge1xuICAgICAgZWFjaChjaGlsZCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIGluc2VydENvbnRlbnQocGFyZW50LCB2LCBwcmVwZW5kKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVhY2gocGFyZW50LCBzdHIgPyBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaW5zZXJ0QWRqYWNlbnRIVE1MKHByZXBlbmQgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsIGNoaWxkKTtcbiAgICB9IDogZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgIHJldHVybiBpbnNlcnRFbGVtZW50KHYsIChpID09PSAwID8gY2hpbGQgOiBjaGlsZC5jbG9uZU5vZGUodHJ1ZSkpLCBwcmVwZW5kKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QWZ0ZXIodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBhcHBlbmRUbzogZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudChjYXNoKHBhcmVudCksIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBjYXNoKHNlbGVjdG9yKS5pbnNlcnRCZWZvcmUodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaHRtbChcIlwiKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBodG1sOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS5pbm5lckhUTUw7XG4gICAgICB9XG4gICAgICB2YXIgc291cmNlID0gKGNvbnRlbnQubm9kZVR5cGUgPyBjb250ZW50WzBdLm91dGVySFRNTCA6IGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5pbm5lckhUTUwgPSBzb3VyY2U7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuXG4gICAgICBjYXNoKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZSwgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuICAgICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIHNpYmxpbmcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgY2FzaChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIF90aGlzMi5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIGVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50LCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kVG86IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQoY2FzaChwYXJlbnQpLCB0aGlzLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0ZXh0OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGVsLm9mZnNldExlZnQsXG4gICAgICAgIHRvcDogZWwub2Zmc2V0VG9wXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWN0ID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbC5jbGllbnRUb3AsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsLmNsaWVudExlZnRcbiAgICAgIH07XG4gICAgfSxcblxuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5vZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICB9KTtcblxuICBmbi5leHRlbmQoe1xuICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBlbC5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICAgIGVsZW1zID0gdW5pcXVlKGVsZW1zKTtcblxuICAgICAgcmV0dXJuICghc2VsZWN0b3IgPyBlbGVtcyA6IGVsZW1zLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyh2LCBzZWxlY3Rvcik7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3RvciB8fCB0aGlzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIoc2VsZWN0b3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50KCkuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgfSxcblxuICAgIGlzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2ggPSBmYWxzZSwgY29tcGFyYXRvciA9IGdldENvbXBhcmVGdW5jdGlvbihzZWxlY3Rvcik7XG5cbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbWF0Y2ggPSBjb21wYXJhdG9yKGVsLCBzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiAhbWF0Y2g7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0sXG5cbiAgICBmaW5kOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3Iubm9kZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goc2VsZWN0b3IgJiYgdGhpcy5oYXMoc2VsZWN0b3IpLmxlbmd0aCA/IHNlbGVjdG9yIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBmaW5kKHNlbGVjdG9yLCBlbCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUoZWxlbXMpO1xuICAgIH0sXG5cbiAgICBoYXM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIGNvbXBhcmF0b3IgPSAoaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbCkubGVuZ3RoICE9PSAwO1xuICAgICAgfSA6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gZWwuY29udGFpbnMoc2VsZWN0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgICB9LFxuXG4gICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIH0sXG5cbiAgICBub3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiAhY29tcGFyYXRvcihlbCwgc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgcGFyZW50czogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgbGFzdCwgcmVzdWx0ID0gW107XG5cbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBsYXN0ID0gaXRlbTtcblxuICAgICAgICB3aGlsZSAobGFzdCAmJiBsYXN0LnBhcmVudE5vZGUgJiYgbGFzdCAhPT0gZG9jLmJvZHkucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGxhc3QgPSBsYXN0LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IChzZWxlY3RvciAmJiBtYXRjaGVzKGxhc3QsIHNlbGVjdG9yKSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgcHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbiAgICB9LFxuXG4gICAgc2libGluZ3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLCBlbCA9IHRoaXNbMF07XG5cbiAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gaSAhPT0gZWw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cblxuICByZXR1cm4gY2FzaDtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHByZXBhcmVBY2NvcmRpb25zIGZyb20gXCIuL3ByZXBhcmUtYWNjb3JkaW9uLXRhYnNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGxhdW5jaChlbCwgaSkge1xuICAgIGNvbnNvbGUubG9nKGVsKTtcbiAgICBwcmVwYXJlQWNjb3JkaW9ucyhDTEFTU05BTUUsIGVsLCBpLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBjb25zdCBDTEFTU05BTUUgPSAnYWNjb3JkaW9uJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0dGVybnMvYWNjb3JkaW9uLXRhYnMvYWNjb3JkaW9uLmpzIiwiaW1wb3J0IExhenlMb2FkIGZyb20gXCJ2YW5pbGxhLWxhenlsb2FkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBuZXcgTGF6eUxvYWQoe1xuICAgICAgICBlbGVtZW50c19zZWxlY3RvcjogXCIubGF6eS1sb2FkXCIsXG4gICAgICAgIGRhdGFfc3JjOiAnc3JjJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBjYWxsYmFja19sb2FkOiBpbWcgPT4ge1xuICAgICAgICAgICAgaW1nLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0dGVybnMvbGF6eS1sb2FkL2luZGV4LmpzIiwiaW1wb3J0ICQgZnJvbSBcImNhc2gtZG9tXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVBY2NvcmRpb25UYWJzKHBhdHRlcm5DbGFzc25hbWUsIGVsLCBpbmRleCwgYWRkVGFiSGVhZGluZ3MpIHtcbiAgICBsZXQgaGVhZGluZ0NsYXNzID0gYCR7cGF0dGVybkNsYXNzbmFtZX1fX2hlYWRpbmdgO1xuICAgIGxldCBoZWFkaW5ncyA9ICQoZWwpLmNoaWxkcmVuKGBoMixoMyxoNCxkaXYuJHtoZWFkaW5nQ2xhc3N9YCk7XG4gICAgbGV0IGFuY2hvcnMgPSBbXTtcblxuICAgIGxldCBjbGlja01hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhY3RpdmUgPSAkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgYW5jaG9ycy5mb3JFYWNoKGFuY2hvciA9PiB7XG4gICAgICAgICAgICBsZXQgYWN0aXZhdGUgPSBhbmNob3JbMF0gPT09IHRoaXMgPyAhYWN0aXZlIDogZmFsc2U7XG4gICAgICAgICAgICBhbmNob3IucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScsIGFjdGl2YXRlKTtcbiAgICAgICAgICAgIGFuY2hvci5wYXJlbnQoKS50b2dnbGVDbGFzcygnaW5hY3RpdmUnLCAhYWN0aXZhdGUpO1xuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBoZWFkaW5ncy5lYWNoKChoZWFkaW5nLCBpKSA9PiB7XG4gICAgICAgICQoaGVhZGluZykuYWRkQ2xhc3MoYCR7aGVhZGluZ0NsYXNzfSBpbmFjdGl2ZWApO1xuXG4gICAgICAgIGxldCBhbmNob3IgPSAkKCc8YS8+Jyk7XG4gICAgICAgIGFuY2hvcnMucHVzaChhbmNob3IpO1xuICAgICAgICBhbmNob3IuYXR0cignaHJlZicsIGAjdCR7aW5kZXggKyAxfS0ke2kgKyAxfWApO1xuXG4gICAgICAgIGlmIChoZWFkaW5nLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmIGhlYWRpbmcuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gJCgnPHNwYW4vPicpO1xuICAgICAgICAgICAgc3Bhbi5odG1sKCQoaGVhZGluZykuaHRtbCgpKTtcbiAgICAgICAgICAgICQoaGVhZGluZykuZW1wdHkoKTtcbiAgICAgICAgICAgIHNwYW4uYWRkQ2xhc3MoYCR7cGF0dGVybkNsYXNzbmFtZX1fX2hlYWRpbmdfX2xhYmVsYCk7XG4gICAgICAgICAgICBhbmNob3IuYXBwZW5kKHNwYW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZCgkKGhlYWRpbmcpLmNoaWxkcmVuKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGljb24gPSAkKCc8c3Bhbi8+Jyk7XG4gICAgICAgIGljb24uYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBpY29uLmFkZENsYXNzKGAke2hlYWRpbmdDbGFzc31fX2ljb25gKTtcblxuICAgICAgICBhbmNob3IuYXBwZW5kKGljb24pO1xuICAgICAgICBhbmNob3Iub24oJ2NsaWNrJywgY2xpY2tNYW5hZ2VyKTtcblxuICAgICAgICAkKGhlYWRpbmcpLmFwcGVuZChhbmNob3IpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdHRlcm5zL2FjY29yZGlvbi10YWJzL3ByZXBhcmUtYWNjb3JkaW9uLXRhYnMuanMiLCIhZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLkxhenlMb2FkPWIoKX0odGhpcyxmdW5jdGlvbigpe2Z1bmN0aW9uIGEoKXtrfHwoaj17ZWxlbWVudHNfc2VsZWN0b3I6XCJpbWdcIixjb250YWluZXI6d2luZG93LHRocmVzaG9sZDozMDAsdGhyb3R0bGU6MTUwLGRhdGFfc3JjOlwib3JpZ2luYWxcIixkYXRhX3NyY3NldDpcIm9yaWdpbmFsLXNldFwiLGNsYXNzX2xvYWRpbmc6XCJsb2FkaW5nXCIsY2xhc3NfbG9hZGVkOlwibG9hZGVkXCIsc2tpcF9pbnZpc2libGU6ITAsY2FsbGJhY2tfbG9hZDpudWxsLGNhbGxiYWNrX2Vycm9yOm51bGwsY2FsbGJhY2tfc2V0Om51bGwsY2FsbGJhY2tfcHJvY2Vzc2VkOm51bGx9LGs9ITApfWZ1bmN0aW9uIGIoYSxiLGMpe2Z1bmN0aW9uIGQoKXtyZXR1cm4gd2luZG93LmlubmVyV2lkdGh8fGwuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofHxkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRofWZ1bmN0aW9uIGUoKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxsLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR8fGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0fWZ1bmN0aW9uIGYoYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wK20tbC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wfWZ1bmN0aW9uIGcoYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCtuLWwuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnR9ZnVuY3Rpb24gaCgpe3ZhciBkO3JldHVybiBkPWI9PT13aW5kb3c/ZSgpK206ZihiKStiLm9mZnNldEhlaWdodCxkPD1mKGEpLWN9ZnVuY3Rpb24gaSgpe3ZhciBlO3JldHVybiBlPWI9PT13aW5kb3c/ZCgpK3dpbmRvdy5wYWdlWE9mZnNldDpnKGIpK2QoKSxlPD1nKGEpLWN9ZnVuY3Rpb24gaigpe3ZhciBkO3JldHVybiBkPWI9PT13aW5kb3c/bTpmKGIpLGQ+PWYoYSkrYythLm9mZnNldEhlaWdodH1mdW5jdGlvbiBrKCl7dmFyIGQ7cmV0dXJuIGQ9Yj09PXdpbmRvdz9uOmcoYiksZD49ZyhhKStjK2Eub2Zmc2V0V2lkdGh9dmFyIGwsbSxuO3JldHVybiBsPWEub3duZXJEb2N1bWVudCxtPXdpbmRvdy5wYWdlWU9mZnNldHx8bC5ib2R5LnNjcm9sbFRvcCxuPXdpbmRvdy5wYWdlWE9mZnNldHx8bC5ib2R5LnNjcm9sbExlZnQsIShoKCl8fGooKXx8aSgpfHxrKCkpfWZ1bmN0aW9uIGMoKXt2YXIgYT1uZXcgRGF0ZTtyZXR1cm4gYS5nZXRUaW1lKCl9ZnVuY3Rpb24gZChhLGIpe3ZhciBjLGQ9e307Zm9yKGMgaW4gYSlhLmhhc093blByb3BlcnR5KGMpJiYoZFtjXT1hW2NdKTtmb3IoYyBpbiBiKWIuaGFzT3duUHJvcGVydHkoYykmJihkW2NdPWJbY10pO3JldHVybiBkfWZ1bmN0aW9uIGUoYSl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEpfWZ1bmN0aW9uIGYoYSxiKXt2YXIgYz1hLnBhcmVudEVsZW1lbnQ7aWYoXCJQSUNUVVJFXCI9PT1jLnRhZ05hbWUpZm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspe3ZhciBlPWMuY2hpbGRyZW5bZF07aWYoXCJTT1VSQ0VcIj09PWUudGFnTmFtZSl7dmFyIGY9ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK2IpO2YmJmUuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZil9fX1mdW5jdGlvbiBnKGEsYixjKXt2YXIgZD1hLnRhZ05hbWUsZT1hLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrYyk7aWYoXCJJTUdcIj09PWQpe2YoYSxiKTt2YXIgZz1hLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrYik7cmV0dXJuIGcmJmEuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZyksdm9pZChlJiZhLnNldEF0dHJpYnV0ZShcInNyY1wiLGUpKX1yZXR1cm5cIklGUkFNRVwiPT09ZD92b2lkKGUmJmEuc2V0QXR0cmlidXRlKFwic3JjXCIsZSkpOnZvaWQoZSYmKGEuc3R5bGUuYmFja2dyb3VuZEltYWdlPVwidXJsKFwiK2UrXCIpXCIpKX1mdW5jdGlvbiBoKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkoYixhcmd1bWVudHMpfX1mdW5jdGlvbiBpKGIpe2EoKSx0aGlzLl9zZXR0aW5ncz1kKGosYiksdGhpcy5fcXVlcnlPcmlnaW5Ob2RlPXRoaXMuX3NldHRpbmdzLmNvbnRhaW5lcj09PXdpbmRvdz9kb2N1bWVudDp0aGlzLl9zZXR0aW5ncy5jb250YWluZXIsdGhpcy5fcHJldmlvdXNMb29wVGltZT0wLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwsdGhpcy5faGFuZGxlU2Nyb2xsRm49aCh0aGlzLmhhbmRsZVNjcm9sbCx0aGlzKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSx0aGlzLnVwZGF0ZSgpfXZhciBqLGs9ITE7cmV0dXJuIGkucHJvdG90eXBlLl9zaG93T25BcHBlYXI9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYigpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjKSxhLmNsYXNzTGlzdC5yZW1vdmUoZC5jbGFzc19sb2FkaW5nKSxkLmNhbGxiYWNrX2Vycm9yJiZkLmNhbGxiYWNrX2Vycm9yKGEpfWZ1bmN0aW9uIGMoKXtudWxsIT09ZCYmKGQuY2FsbGJhY2tfbG9hZCYmZC5jYWxsYmFja19sb2FkKGEpLGEuY2xhc3NMaXN0LnJlbW92ZShkLmNsYXNzX2xvYWRpbmcpLGEuY2xhc3NMaXN0LmFkZChkLmNsYXNzX2xvYWRlZCksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGMpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsYikpfXZhciBkPXRoaXMuX3NldHRpbmdzO1wiSU1HXCIhPT1hLnRhZ05hbWUmJlwiSUZSQU1FXCIhPT1hLnRhZ05hbWV8fChhLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsYyksYS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixiKSxhLmNsYXNzTGlzdC5hZGQoZC5jbGFzc19sb2FkaW5nKSksZyhhLGQuZGF0YV9zcmNzZXQsZC5kYXRhX3NyYyksZC5jYWxsYmFja19zZXQmJmQuY2FsbGJhY2tfc2V0KGEpfSxpLnByb3RvdHlwZS5fbG9vcFRocm91Z2hFbGVtZW50cz1mdW5jdGlvbigpe3ZhciBhLGMsZD10aGlzLl9zZXR0aW5ncyxlPXRoaXMuX2VsZW1lbnRzLGY9ZT9lLmxlbmd0aDowLGc9W107Zm9yKGE9MDthPGY7YSsrKWM9ZVthXSxkLnNraXBfaW52aXNpYmxlJiZudWxsPT09Yy5vZmZzZXRQYXJlbnR8fGIoYyxkLmNvbnRhaW5lcixkLnRocmVzaG9sZCkmJih0aGlzLl9zaG93T25BcHBlYXIoYyksZy5wdXNoKGEpLGMud2FzUHJvY2Vzc2VkPSEwKTtmb3IoO2cubGVuZ3RoPjA7KWUuc3BsaWNlKGcucG9wKCksMSksZC5jYWxsYmFja19wcm9jZXNzZWQmJmQuY2FsbGJhY2tfcHJvY2Vzc2VkKGUubGVuZ3RoKTswPT09ZiYmdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKX0saS5wcm90b3R5cGUuX3B1cmdlRWxlbWVudHM9ZnVuY3Rpb24oKXt2YXIgYSxiLGM9dGhpcy5fZWxlbWVudHMsZD1jLmxlbmd0aCxlPVtdO2ZvcihhPTA7YTxkO2ErKyliPWNbYV0sYi53YXNQcm9jZXNzZWQmJmUucHVzaChhKTtmb3IoO2UubGVuZ3RoPjA7KWMuc3BsaWNlKGUucG9wKCksMSl9LGkucHJvdG90eXBlLl9zdGFydFNjcm9sbEhhbmRsZXI9ZnVuY3Rpb24oKXt0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsfHwodGhpcy5faXNIYW5kbGluZ1Njcm9sbD0hMCx0aGlzLl9zZXR0aW5ncy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSl9LGkucHJvdG90eXBlLl9zdG9wU2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe3RoaXMuX2lzSGFuZGxpbmdTY3JvbGwmJih0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsPSExLHRoaXMuX3NldHRpbmdzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5faGFuZGxlU2Nyb2xsRm4pKX0saS5wcm90b3R5cGUuaGFuZGxlU2Nyb2xsPWZ1bmN0aW9uKCl7dmFyIGEsYixkO3RoaXMuX3NldHRpbmdzJiYoYj1jKCksZD10aGlzLl9zZXR0aW5ncy50aHJvdHRsZSwwIT09ZD8oYT1kLShiLXRoaXMuX3ByZXZpb3VzTG9vcFRpbWUpLGE8PTB8fGE+ZD8odGhpcy5fbG9vcFRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwpLHRoaXMuX3ByZXZpb3VzTG9vcFRpbWU9Yix0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCkpOnRoaXMuX2xvb3BUaW1lb3V0fHwodGhpcy5fbG9vcFRpbWVvdXQ9c2V0VGltZW91dChoKGZ1bmN0aW9uKCl7dGhpcy5fcHJldmlvdXNMb29wVGltZT1jKCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCl9LHRoaXMpLGEpKSk6dGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpKX0saS5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy5fZWxlbWVudHM9ZSh0aGlzLl9xdWVyeU9yaWdpbk5vZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5lbGVtZW50c19zZWxlY3RvcikpLHRoaXMuX3B1cmdlRWxlbWVudHMoKSx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCksdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCl9LGkucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2hhbmRsZVNjcm9sbEZuKSx0aGlzLl9sb29wVGltZW91dCYmKGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCksdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKSx0aGlzLl9lbGVtZW50cz1udWxsLHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZT1udWxsLHRoaXMuX3NldHRpbmdzPW51bGx9LGl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhenlsb2FkLm1pbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcblxuaW1wb3J0IGxhenlMb2FkIGZyb20gJy4vcGF0dGVybnMvbGF6eS1sb2FkJztcbmltcG9ydCAqIGFzIGFjY29yZGlvbiBmcm9tIFwiLi9wYXR0ZXJucy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb25cIjtcblxuZnVuY3Rpb24gbGF1bmNoUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBhdHRlcm4oKTtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm4uQ0xBU1NOQU1FKSB7XG4gICAgICAgIGxldCB7Q0xBU1NOQU1FOiBjbiwgbGF1bmNofSA9IHBhdHRlcm47XG4gICAgICAgICQoYC4ke2NufTpub3QoLiR7Y259LW5qcylgKS5lYWNoKGxhdW5jaCk7XG4gICAgfVxufVxuXG4hKGZ1bmN0aW9uICgpIHtcbiAgICBsYXVuY2hQYXR0ZXJuKGFjY29yZGlvbik7XG4gICAgbGF1bmNoUGF0dGVybihsYXp5TG9hZCk7XG59KCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==