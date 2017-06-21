/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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
var contentCn = exports.contentCn = function contentCn(className) {
  return className + "__content";
};
var headingCn = exports.headingCn = function headingCn(className) {
  return contentCn(className) + "__heading";
};
var headingLabelCn = exports.headingLabelCn = function headingLabelCn(className) {
  return headingCn(className) + "__label";
};
var headingIconCn = exports.headingIconCn = function headingIconCn(className) {
  return headingCn(className) + "__icon";
};
var menuCn = exports.menuCn = function menuCn(className) {
  return className + "__menu";
};
var menuWrapperCn = exports.menuWrapperCn = function menuWrapperCn(className) {
  return menuCn(className) + "-wrapper";
};
var menuItemCn = exports.menuItemCn = function menuItemCn(className) {
  return menuCn(className) + "__item";
};
var menuItemLabelCn = exports.menuItemLabelCn = function menuItemLabelCn(className) {
  return menuItemCn(className) + "__label";
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareContent;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _elementClassnames = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareContent(className, widget) {
    var contentClassName = (0, _elementClassnames.contentCn)(className);
    var contentElement = widget.children('.' + contentClassName);

    if (contentElement.length === 0) {
        contentElement = (0, _cashDom2.default)('<div></div>').addClass(contentClassName).append(widget.children()).appendTo(widget);
    }

    return contentElement;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deactivateAll = deactivateAll;
exports.default = prepareLinks;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _scrollTo = __webpack_require__(8);

var _scrollTo2 = _interopRequireDefault(_scrollTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genActivateItem(headingAnchors, allAnchors) {
    return function (id, scroll) {
        allAnchors.filter('[data-id="' + id + '"].inactive').removeClass('inactive').addClass('active').attr('aria-selected', 'true');
        allAnchors.filter('.active').not('[data-id="' + id + '"]').removeClass('active').addClass('inactive').attr('aria-selected', 'false');

        if (scroll) {
            (0, _scrollTo2.default)(headingAnchors.filter('[data-id="' + id + '"]'));
        }
    };
}

function deactivateAll(allAnchors) {
    allAnchors.filter('.active').removeClass('active').addClass('inactive').attr('aria-selected', 'false');
}

function prepareLinks(headings) {
    var menu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var canDeactivate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollOnActivate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var activateInitial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    var headingAnchors = headings.reduce(function (acc, _ref) {
        var item = _ref.item;
        return acc.add(item.is('[data-id]') ? item : item.parent());
    }, (0, _cashDom2.default)());
    var allAnchors = menu ? headingAnchors.add(menu.find('a[data-id]')) : headingAnchors;

    var activateItem = genActivateItem(headingAnchors, allAnchors);

    allAnchors.on('click', function (evt) {
        evt.preventDefault();

        var anchor = (0, _cashDom2.default)(this);
        if (anchor.hasClass('inactive')) {
            activateItem((0, _cashDom2.default)(this).attr('data-id'), scrollOnActivate);
        } else if (canDeactivate) {
            deactivateAll(allAnchors);
        }
    });

    if (activateInitial !== null) {
        activateItem(activateInitial, false);
    }

    return activateItem;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findHeadings;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _elementClassnames = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findHeadings(className, widget, content) {
    var headingTagName = content.children().first().prop('tagName');
    var headerElements = content.children(headingTagName);

    return headerElements.map(function (element, i) {
        var item = (0, _cashDom2.default)(element).attr('data-id', i);
        var contentElements = [];
        var next = item.next();
        while (next.length > 0 && next.prop('tagName') !== headingTagName) {
            contentElements.push(next);
            next = next.next();
        }

        var content = (0, _cashDom2.default)('<div></div>').append(contentElements).insertAfter(item);

        return {
            element: element,
            item: item,
            text: item.html(),
            id: i,
            content: content
        };
    });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scrolledIntoView;
function scrolledIntoView(elem) {
    var docViewTop = window.scrollY;
    var docViewBottom = docViewTop + window.innerHeight;

    var elemTop = elem.offset().top;
    var elemHeight = elem.height();
    var elemBottom = elemTop + elemHeight;

    var viewTop = Math.max(elemTop, docViewTop);
    var viewBottom = Math.min(elemBottom, docViewBottom);

    return (viewBottom - viewTop) / elemHeight;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareAccordionHeadings;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _elementClassnames = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareAccordionHeadings(patternClassname, widget, index, headings) {
    var headingClass = (0, _elementClassnames.headingCn)(patternClassname);

    var anchors = [];

    headings.forEach(function (_ref) {
        var element = _ref.element,
            item = _ref.item,
            text = _ref.text;

        var anchor = (0, _cashDom2.default)('<a/>').addClass(headingClass + ' inactive');
        anchors.push(anchor);
        anchor.attr('href', '#');

        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
            var span = (0, _cashDom2.default)('<span/>');
            span.html(text);
            item.empty();
            span.addClass((0, _elementClassnames.headingLabelCn)(patternClassname));
            item.append(span);
        } else {
            anchor.append(item.children());
        }

        var icon = (0, _cashDom2.default)('<span/>');
        icon.attr('aria-hidden', 'true');
        icon.addClass((0, _elementClassnames.headingIconCn)(patternClassname));
        item.append(icon);
        anchor.insertBefore(item);
        anchor.append(item);
        anchor.attr('data-id', item.attr('data-id'));
        item.removeAttr('data-id');
    });

    return headings;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareTabsHeadings;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _elementClassnames = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareTabsHeadings(className, widget, i, headings, content) {
    var wrap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    var tabsBar = (0, _cashDom2.default)('<div></div>').addClass((0, _elementClassnames.menuCn)(className));

    headings.forEach(function (_ref) {
        var text = _ref.text,
            id = _ref.id;

        var anchor = (0, _cashDom2.default)('<a href="#"></a>').addClass((0, _elementClassnames.menuItemCn)(className)).addClass('inactive').attr('data-id', id);
        (0, _cashDom2.default)('<span></span>').addClass((0, _elementClassnames.menuItemLabelCn)(className)).html(text).appendTo(anchor);

        anchor.appendTo(tabsBar);
    });

    if (wrap) {
        (0, _cashDom2.default)('<div></div>').addClass((0, _elementClassnames.menuWrapperCn)(className)).append(tabsBar).insertBefore(content);
    } else {
        tabsBar.insertBefore(content);
    }

    return tabsBar;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scrollTo;
function scrollTo(element) {
    element[0].scrollIntoView();
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _urlDropdown = __webpack_require__(20);

var _urlDropdown2 = _interopRequireDefault(_urlDropdown);

var _lazyLoad = __webpack_require__(14);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

var _accordion = __webpack_require__(11);

var _accordion2 = _interopRequireDefault(_accordion);

var _videoPreview = __webpack_require__(22);

var _videoPreview2 = _interopRequireDefault(_videoPreview);

var _navMobile = __webpack_require__(15);

var _navMobile2 = _interopRequireDefault(_navMobile);

var _tabs = __webpack_require__(13);

var _tabs2 = _interopRequireDefault(_tabs);

var _linkedContent = __webpack_require__(12);

var _linkedContent2 = _interopRequireDefault(_linkedContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_linkedContent2.default, _tabs2.default, _accordion2.default, _videoPreview2.default, _lazyLoad2.default, _urlDropdown2.default, _navMobile2.default];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _prepareSections = __webpack_require__(4);

var _prepareSections2 = _interopRequireDefault(_prepareSections);

var _prepareContent = __webpack_require__(2);

var _prepareContent2 = _interopRequireDefault(_prepareContent);

var _prepareAccordionHeadings = __webpack_require__(6);

var _prepareAccordionHeadings2 = _interopRequireDefault(_prepareAccordionHeadings);

var _prepareLinks = __webpack_require__(3);

var _prepareLinks2 = _interopRequireDefault(_prepareLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch(el, i) {
    var widget = (0, _cashDom2.default)(el);
    var content = (0, _prepareContent2.default)(className, widget);
    var headings = (0, _prepareSections2.default)(className, widget, content);

    (0, _prepareAccordionHeadings2.default)(className, widget, i, headings);
    (0, _prepareLinks2.default)(headings, null, true, true);
}

var className = 'accordion';

exports.default = {
    launch: launch,
    className: className
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _prepareSections = __webpack_require__(4);

var _prepareSections2 = _interopRequireDefault(_prepareSections);

var _prepareContent = __webpack_require__(2);

var _prepareContent2 = _interopRequireDefault(_prepareContent);

var _prepareMenu = __webpack_require__(7);

var _prepareMenu2 = _interopRequireDefault(_prepareMenu);

var _prepareLinks = __webpack_require__(3);

var _prepareLinks2 = _interopRequireDefault(_prepareLinks);

var _scrolledIntoView = __webpack_require__(5);

var _scrolledIntoView2 = _interopRequireDefault(_scrolledIntoView);

var _moveIntoViewInContainer = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'linked-content';

function launch(el, i) {
    var widget = (0, _cashDom2.default)(el);
    var content = (0, _prepareContent2.default)(className, widget);
    var headings = (0, _prepareSections2.default)(className, widget, content);

    var menu = (0, _prepareMenu2.default)(className, widget, i, headings, content, true);
    var activateItem = (0, _prepareLinks2.default)(headings, menu, false, true, headings.length > 0 && headings[0].id);

    (0, _cashDom2.default)(window).on('scroll', function () {
        var best = headings.map(function (_ref) {
            var item = _ref.item;
            return (0, _scrolledIntoView2.default)(item, widget);
        }).reduce(function (maxIndex, v, i, arr) {
            return v > arr[maxIndex] ? i : maxIndex;
        }, 0);

        activateItem(headings[best].id);
    });

    (0, _moveIntoViewInContainer.initMoveIntoView)(menu);
}

exports.default = {
    launch: launch,
    className: className
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _prepareSections = __webpack_require__(4);

var _prepareSections2 = _interopRequireDefault(_prepareSections);

var _prepareContent = __webpack_require__(2);

var _prepareContent2 = _interopRequireDefault(_prepareContent);

var _prepareAccordionHeadings = __webpack_require__(6);

var _prepareAccordionHeadings2 = _interopRequireDefault(_prepareAccordionHeadings);

var _prepareMenu = __webpack_require__(7);

var _prepareMenu2 = _interopRequireDefault(_prepareMenu);

var _prepareLinks = __webpack_require__(3);

var _prepareLinks2 = _interopRequireDefault(_prepareLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'tabs';

function launch(el, i) {
    var widget = (0, _cashDom2.default)(el);
    var content = (0, _prepareContent2.default)(className, widget);
    var headings = (0, _prepareSections2.default)(className, widget, content);

    (0, _prepareAccordionHeadings2.default)(className, widget, i, headings);
    var menu = (0, _prepareMenu2.default)(className, widget, i, headings, content);
    (0, _prepareLinks2.default)(headings, menu, false, false, headings.length > 0 && headings[0].id);
}

exports.default = {
    launch: launch,
    className: className
};

/***/ }),
/* 14 */
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

var _vanillaLazyload = __webpack_require__(32);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _navMobileHorizontal = __webpack_require__(16);

var _navMobileHorizontal2 = _interopRequireDefault(_navMobileHorizontal);

var _navMobileVertical = __webpack_require__(18);

var _navMobileVertical2 = _interopRequireDefault(_navMobileVertical);

var _navMobileSimple = __webpack_require__(17);

var _navMobileSimple2 = _interopRequireDefault(_navMobileSimple);

var _parseNav = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function navClass(element) {
    if (element.hasClass('nav-mobile--horizontal')) {
        return _navMobileHorizontal2.default;
    } else if (element.hasClass('nav-mobile--simple')) {
        return _navMobileSimple2.default;
    } else {
        return _navMobileVertical2.default;
    }
}

function launch() {
    var element = (0, _cashDom2.default)(this);
    var NavMobile = navClass(element);
    var nav = new NavMobile(element, _parseNav.tree, _parseNav.current);
    nav.launch();
}

exports.default = {
    className: 'nav-mobile',
    launch: launch
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function maxLevel(root) {
    return root.children.length === 0 ? 0 : 1 + root.children.reduce(function (acc, item) {
        return Math.max(acc, maxLevel(item));
    }, 0);
}

var NavMobileHorizontal = function () {
    function NavMobileHorizontal(nav, tree, defaultOpen) {
        _classCallCheck(this, NavMobileHorizontal);

        this.nav = nav;
        this.overlay = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__overlay').appendTo(this.nav);
        this.tree = tree;
        this.defaultOpen = defaultOpen;

        this.levelElements = [];
        this.openLevels = [];

        this.backTo = this.backTo.bind(this);
        this.levelDown = this.levelDown.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.openNav = this.openNav.bind(this);
    }

    _createClass(NavMobileHorizontal, [{
        key: 'launch',
        value: function launch() {
            var backTo = this.backTo,
                levelDown = this.levelDown,
                closeNav = this.closeNav,
                openNav = this.openNav;


            this.nav.on('click', '.nav-mobile__toggle', function (evt) {
                evt.preventDefault();
                openNav();
            });

            this.nav.on('click', '.nav-mobile__close-link', function (evt) {
                evt.preventDefault();
                closeNav();
            });

            this.nav.on('click', '[data-back-to]', function (evt) {
                backTo(parseInt((0, _cashDom2.default)(this).attr('data-back-to')));
                evt.preventDefault();
            });

            this.nav.on('click', '[data-down-to]', function (evt) {
                levelDown(parseInt((0, _cashDom2.default)(this).attr('data-down-to')), parseInt((0, _cashDom2.default)(this).attr('data-index')));
                evt.preventDefault();
            });

            this.prepareLevels();
        }
    }, {
        key: 'prepareLevels',
        value: function prepareLevels() {
            var max = maxLevel(this.tree);
            for (var level = 0; level < max; level++) {
                var element = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level nav-mobile__level--l' + level);
                var header = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level__header').appendTo(element);

                (0, _cashDom2.default)('<a href="#" class="nav-mobile__close-link"><span class="fa fa-close" aria-hidden="true"></span></a>').appendTo(header);

                header.append('<a class="nav-mobile__page-link"><span class="nav-mobile__page-link__label"></span></a>');
                if (level > 0) {
                    (0, _cashDom2.default)('<a href="#" class="nav-mobile__goto-link"><span class="fa fa-angle-left" aria-hidden="true"></span></a>').attr('data-back-to', level - 1).appendTo(header);
                } else {}

                (0, _cashDom2.default)('<ul></ul>').appendTo(element);

                this.levelElements[level] = element;
                this.overlay.append(element);
            }
        }
    }, {
        key: 'levelDown',
        value: function levelDown(level, index) {
            var parent = this.openLevels[level - 1];
            var item = parent.children[index];
            this.setLevelMenu(level, item);
            this.goToLevel(level);
        }
    }, {
        key: 'backTo',
        value: function backTo(level) {
            this.goToLevel(level);
        }
    }, {
        key: 'goToLevel',
        value: function goToLevel(level) {
            this.levelElements.forEach(function (element, i) {
                element.toggleClass('nav-mobile__level--left', i < level);
                element.toggleClass('nav-mobile__level--center', i === level);
                element.toggleClass('nav-mobile__level--right', i > level);
            });
        }
    }, {
        key: 'openNav',
        value: function openNav() {
            var _this = this;

            this.nav.addClass('open');
            this.defaultOpen.forEach(function (item, i) {
                return _this.setLevelMenu(i, item);
            });
            this.goToLevel(this.defaultOpen.length - 1);
        }
    }, {
        key: 'closeNav',
        value: function closeNav() {
            this.nav.removeClass('open');
        }
    }, {
        key: 'setLevelMenu',
        value: function setLevelMenu(level, item) {
            var levelElement = this.levelElements[level];
            this.openLevels[level] = item;

            if (item.name) {
                levelElement.find('.nav-mobile__level__header .nav-mobile__page-link').attr('href', item.url + location.search).removeClass('nav-mobile__page-link--t0 nav-mobile__page-link--t1 nav-mobile__page-link--t2').addClass('nav-mobile__page-link--t' + item.type);

                levelElement.find('.nav-mobile__level__header .nav-mobile__page-link__label').html(item.name);
            }

            var ul = levelElement.children('ul');
            ul.empty();

            item.children.forEach(function (item, i) {
                var li = (0, _cashDom2.default)('<li></li>').appendTo(ul);
                (0, _cashDom2.default)('<a class="nav-mobile__page-link"></a>').addClass('nav-mobile__page-link--t' + item.type).attr('href', item.url + location.search).append((0, _cashDom2.default)('<span class="nav-mobile__page-link__label"></span>').html(item.name)).appendTo(li);
                if (item.children.length > 0) {
                    (0, _cashDom2.default)('<a class="nav-mobile__goto-link" href="#"><span class="fa fa-angle-right" aria-hidden="true"></span></a>').attr('data-down-to', level + 1).attr('data-index', i).appendTo(li);
                }
            });
        }
    }]);

    return NavMobileHorizontal;
}();

exports.default = NavMobileHorizontal;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _clone = __webpack_require__(9);

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function prepareTreeIds(tree, map) {
    var parentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    tree.parentId = parentId;
    tree.id = (parentId ? parentId + '.' : '') + tree.index;
    map[tree.id] = tree;
    tree.children.forEach(function (child) {
        return prepareTreeIds(child, map, tree.id);
    });
}

function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVisible;
}

var NavMobileSimple = function () {
    function NavMobileSimple(nav, tree, defaultOpen) {
        var _this = this;

        _classCallCheck(this, NavMobileSimple);

        this.nav = nav;
        this.overlay = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__overlay').appendTo(this.nav);
        this.tree = (0, _clone2.default)(tree);

        this.toggleItem = this.toggleItem.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.openNav = this.openNav.bind(this);

        this.levelMap = {};
        prepareTreeIds(this.tree, this.levelMap);

        this.defaultOpen = [this.tree.id];
        defaultOpen.slice(1).filter(function (_ref) {
            var children = _ref.children;
            return children.length > 0;
        }).forEach(function (_ref2, i) {
            var index = _ref2.index;
            return _this.defaultOpen.push(_this.levelMap[_this.defaultOpen[i]].children[index].id);
        });
        this.openLevels = this.defaultOpen.map(function (v) {
            return v;
        });
    }

    _createClass(NavMobileSimple, [{
        key: 'launch',
        value: function launch() {
            var toggleItem = this.toggleItem,
                closeNav = this.closeNav,
                openNav = this.openNav;


            this.nav.on('click', '.nav-mobile__toggle', function (evt) {
                evt.preventDefault();
                openNav();
            });

            this.nav.on('click', '.nav-mobile__close-link', function (evt) {
                evt.preventDefault();
                closeNav();
            });

            this.nav.on('click', '[data-toggle]', function (evt) {
                toggleItem((0, _cashDom2.default)(this).attr('data-toggle'));
                evt.preventDefault();
            });

            this.prepareItemElement(this.tree);
        }
    }, {
        key: 'toggleItem',
        value: function toggleItem(id) {
            var index = this.openLevels.indexOf(id);
            if (index === this.openLevels.length - 1) {
                if (index > 0) {
                    this.openLevels.splice(index, 1);
                }
            } else if (index >= 0) {
                this.openLevels.splice(index + 1, this.openLevels.length - index - 1);
            } else {
                this.openLevels.push(id);
            }

            this.updateLevels();
        }
    }, {
        key: 'openNav',
        value: function openNav() {
            this.nav.addClass('open');
            this.openLevels = this.defaultOpen.map(function (v) {
                return v;
            });
            this.updateLevels();
        }
    }, {
        key: 'closeNav',
        value: function closeNav() {
            this.nav.removeClass('open');
        }
    }, {
        key: 'updateLevels',
        value: function updateLevels() {
            var _this2 = this;

            var currentOpen = this.previousOpen || [];
            var currentChildren = currentOpen.length > 0 ? this.levelMap[currentOpen[currentOpen.length - 1]].children.map(function (_ref3) {
                var id = _ref3.id;
                return id;
            }) : [];
            this.previousOpen = [].concat(_toConsumableArray(this.openLevels));

            this.overlay.find('.nav-mobile__level__header--tx').removeClass('nav-mobile__level__header--tx');

            var lastIndex = this.openLevels.length - 1;
            this.overlay.find('.nav-mobile__toggle-link span').addClass('fa-plus').removeClass('fa-minus');
            this.overlay.find('.nav-mobile__level').removeClass('open last');

            this.openLevels.forEach(function (id, i) {
                var item = _this2.levelMap[id];
                _this2.prepareItemElement(item);
                item.children.forEach(function (child) {
                    return _this2.prepareItemElement(child);
                });

                item.element.addClass('open');
                if (currentChildren.indexOf(item.id) >= 0) {
                    item.element.children('.nav-mobile__level__header').addClass('nav-mobile__level__header--tx');
                }

                if (i === lastIndex) {
                    item.element.addClass('last');
                    item.element.children('.nav-mobile__level__header').find('.nav-mobile__toggle-link span').addClass('fa-minus').removeClass('fa-plus');

                    item.children.forEach(function (_ref4) {
                        var id = _ref4.id,
                            element = _ref4.element;

                        if (currentOpen.indexOf(id) >= 0) {
                            element.children('.nav-mobile__level__header').addClass('nav-mobile__level__header--tx');
                        }
                    });
                }
            });

            var tx = this.overlay.find('.nav-mobile__level__header--tx');
            if (tx.length > 0 && !isScrolledIntoView(tx[0])) {
                tx[0].scrollIntoView();
            }
        }
    }, {
        key: 'prepareItemElement',
        value: function prepareItemElement(item) {
            if (!item.element) {
                var container = item.parentId ? this.levelMap[item.parentId].childrenContainer : this.overlay;
                var element = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level nav-mobile__level--l' + item.level);
                var header = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level__header').appendTo(element);

                if (item.level === 0) {
                    (0, _cashDom2.default)('<a href="#" class="nav-mobile__close-link"><span class="fa fa-close" aria-hidden="true"></span></a>').appendTo(header);
                }

                (0, _cashDom2.default)('<a class="nav-mobile__page-link"></a>').addClass('nav-mobile__page-link--t' + item.type).attr('href', item.url + location.search).append((0, _cashDom2.default)('<span class="nav-mobile__page-link__label"></span>').html(item.name)).appendTo(header);

                if (item.children.length > 0) {
                    var k = (0, _cashDom2.default)('<a href="#" class="nav-mobile__toggle-link"><span class="fa fa-plus" aria-hidden="true"></span></a>');
                    k = k.attr('data-toggle', item.id);
                    k.appendTo(header);
                }

                var ul = (0, _cashDom2.default)('<ul></ul>').appendTo(element);

                item.element = element;
                item.childrenContainer = ul;
                container.append(element);
            }
        }
    }]);

    return NavMobileSimple;
}();

exports.default = NavMobileSimple;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _clone = __webpack_require__(9);

var _clone2 = _interopRequireDefault(_clone);

var _scrollTo = __webpack_require__(8);

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _scrolledIntoView = __webpack_require__(5);

var _scrolledIntoView2 = _interopRequireDefault(_scrolledIntoView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function prepareTreeIds(tree, map) {
    var parentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    tree.parentId = parentId;
    tree.id = (parentId ? parentId + '.' : '') + tree.index;
    map[tree.id] = tree;
    tree.children.forEach(function (child) {
        return prepareTreeIds(child, map, tree.id);
    });
}

var NavMobileVertical = function () {
    function NavMobileVertical(nav, tree, defaultOpen) {
        var _this = this;

        _classCallCheck(this, NavMobileVertical);

        this.nav = nav;
        this.overlay = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__overlay').appendTo(this.nav);
        this.tree = (0, _clone2.default)(tree);

        this.defaultOpen = [this.tree];
        defaultOpen.slice(1).forEach(function (_ref, i) {
            var index = _ref.index;
            return _this.defaultOpen.push(_this.defaultOpen[i].children[index]);
        });

        this.toggleChildren = this.toggleChildren.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.openNav = this.openNav.bind(this);

        this.levelMap = {};
        prepareTreeIds(this.tree, this.levelMap);
    }

    _createClass(NavMobileVertical, [{
        key: 'launch',
        value: function launch() {
            var toggleChildren = this.toggleChildren,
                closeNav = this.closeNav,
                openNav = this.openNav;


            this.nav.on('click', '.nav-mobile__toggle', function (evt) {
                evt.preventDefault();
                openNav();
            });

            this.nav.on('click', '.nav-mobile__close-link', function (evt) {
                evt.preventDefault();
                closeNav();
            });

            this.nav.on('click', '[data-toggle]', function (evt) {
                toggleChildren((0, _cashDom2.default)(this).attr('data-toggle'));
                evt.preventDefault();
            });

            this.prepareItemElement(this.tree);
        }
    }, {
        key: 'toggleChildren',
        value: function toggleChildren(item) {
            var _this2 = this;

            if (typeof item === 'string') item = this.levelMap[item];

            if (item.children.length > 0) {
                var ancestors = item.element.parents('.nav-mobile__level');
                var setOpen = !item.element.hasClass('open');

                if (setOpen) {
                    this.overlay.find('.nav-mobile__level.open').removeClass('open');
                }

                item.element.toggleClass('open', setOpen);

                item.element.children('.nav-mobile__level__header').find('.nav-mobile__toggle-link span').toggleClass('__fa-plus', !setOpen).toggleClass('__fa-minus', setOpen);

                if (setOpen) {
                    ancestors.addClass('open');
                    item.children.forEach(function (item) {
                        return _this2.prepareItemElement(item);
                    });
                }

                if ((0, _scrolledIntoView2.default)(item.element) < 1) {
                    (0, _scrollTo2.default)(item.element);
                }
            }
        }
    }, {
        key: 'openNav',
        value: function openNav() {
            var _this3 = this;

            this.nav.addClass('open');
            this.defaultOpen.forEach(function (item) {
                _this3.prepareItemElement(item);
                _this3.toggleChildren(item);
            });

            this.defaultOpen[this.defaultOpen.length - 1].element[0].scrollIntoView();
        }
    }, {
        key: 'closeNav',
        value: function closeNav() {
            this.nav.removeClass('open');
        }
    }, {
        key: 'prepareItemElement',
        value: function prepareItemElement(item) {
            if (!item.element) {
                var container = item.parentId ? this.levelMap[item.parentId].childrenContainer : this.overlay;
                var element = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level nav-mobile__level--l' + item.level);
                var header = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level__header').appendTo(element);

                if (item.level === 0) {
                    (0, _cashDom2.default)('<a href="#" class="nav-mobile__close-link"><span class="fa fa-close" aria-hidden="true"></span></a>').appendTo(header);
                }

                (0, _cashDom2.default)('<a class="nav-mobile__page-link"></a>').addClass('nav-mobile__page-link--t' + item.type).attr('href', item.url + location.search).append((0, _cashDom2.default)('<span class="nav-mobile__page-link__label"></span>').html(item.name)).appendTo(header);

                if (item.level > 0 && item.children.length > 0) {
                    var k = (0, _cashDom2.default)('<a href="#" class="nav-mobile__toggle-link"><span class="fa __fa-plus" aria-hidden="true"></span></a>');
                    k = k.attr('data-toggle', item.id);
                    k.appendTo(header);
                }

                var ul = (0, _cashDom2.default)('<ul></ul>').appendTo(element);

                item.element = element;
                item.childrenContainer = ul;
                container.append(element);
            }
        }
    }]);

    return NavMobileVertical;
}();

exports.default = NavMobileVertical;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PARSE_REGEX = /^\s*([0-9]) ([^\s]+) ([0-9]) (.+)$/;

function loadData() {
    return document.getElementById("nav-mobile__data").innerHTML;
}

function parseNav(data) {
    var tree = {
        name: null,
        index: null,
        url: null,
        type: null,
        level: null,
        children: []
    };

    var ancestors = [];

    data.split(/\r?\n/).forEach(function (line) {
        var match = line.match(PARSE_REGEX);
        if (match) {
            var _match = _slicedToArray(match, 5),
                levelStr = _match[1],
                url = _match[2],
                typeStr = _match[3],
                name = _match[4];

            var level = parseInt(levelStr);
            var type = parseInt(typeStr);
            var item = { level: level, type: type, url: url, name: name, children: [], index: 0 };

            if (level > 0) {
                var parent = ancestors[level - 1];
                item.index = parent.children.length;
                parent.children.push(item);
            } else {
                tree = item;
            }

            ancestors[level] = item;
        }
    });

    var currentHead = tree;
    var current = [];
    while (currentHead && currentHead.children.length > 0) {
        current.push(currentHead);
        currentHead = findCurrent(currentHead.children);
    }

    return { tree: tree, current: current };
}

function findCurrent(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].type > 0) {
            return list[i];
        }
    }

    return null;
}

var _parseNav = parseNav(loadData()),
    tree = _parseNav.tree,
    current = _parseNav.current;

exports.tree = tree;
exports.current = current;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch(el) {
    var widget = (0, _cashDom2.default)(el);
    var select = widget.children('select');

    widget.on('change', 'select', function () {
        var url = select.children().eq(select.prop('selectedIndex')).attr('data-url');
        if (url) {
            window.location.href = url + '/_nocache' + window.location.search;
        }
    });
}

var className = 'url-dropdown';

exports.default = {
    launch: launch,
    className: className
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadYoutubeVideo;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _extend = __webpack_require__(30);

var _extend2 = _interopRequireDefault(_extend);

var _youtubePlayer = __webpack_require__(26);

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

var _scrolledIntoView = __webpack_require__(5);

var _scrolledIntoView2 = _interopRequireDefault(_scrolledIntoView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PARAMS = {
    frameBorder: "0"
};

function loadYoutubeVideo(wrapper, _ref) {
    var id = _ref.id,
        params = _ref.params;

    var iframeId = "ytev-" + id;

    var link = wrapper.children('a');
    var fallbackParams = {
        width: link.width(),
        height: link.height()
    };

    var playerParams = (0, _extend2.default)({}, DEFAULT_PARAMS, fallbackParams, params, {
        videoId: id,
        events: {
            onInit: function onInit() {
                (0, _cashDom2.default)('<div/>').attr('id', iframeId).attr(fallbackParams).insertBefore(link);
                wrapper.addClass('video-preview-wrapper--loading');
            },
            onReady: function onReady(evt) {
                wrapper.removeClass('video-preview-wrapper--loading');
                wrapper.addClass('media');
                wrapper.addClass('media--youtube');
                wrapper.children(":not(#" + iframeId + ")").remove();

                var player = evt.target;
                var iframe = wrapper.children('iframe');

                player.playVideo();

                (0, _cashDom2.default)(document).on('scroll', function () {
                    if ((0, _scrolledIntoView2.default)(iframe) < 0.5) {
                        player.pauseVideo();
                    }
                });
            }
        }
    });

    (0, _youtubePlayer2.default)(iframeId, playerParams);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _getDataAttrs = __webpack_require__(24);

var _getDataAttrs2 = _interopRequireDefault(_getDataAttrs);

var _videoPreviewYoutube = __webpack_require__(21);

var _videoPreviewYoutube2 = _interopRequireDefault(_videoPreviewYoutube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getService(link) {
    var href = link.attr('href') || '';
    var params = (0, _getDataAttrs2.default)(link);

    var ytMatch = href.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/);
    if (ytMatch) {
        return { type: 'youtube', id: ytMatch[1], params: params };
    }

    return null;
}

function launch(el) {
    var link = (0, _cashDom2.default)(el);
    var service = getService(link);

    if (service) {
        var parent = link.parent();
        var wrapper = null;

        if (parent.hasClass('video-preview-wrapper')) {
            wrapper = parent;
        } else if (parent.prop("tagName").toLowerCase() === 'figure') {
            wrapper = parent;
            wrapper.addClass('video-preview-wrapper');
        } else {
            wrapper = (0, _cashDom2.default)('<figure/>').addClass('video-preview-wrapper').insertBefore(link);
            wrapper.append(link);
        }

        link.on('click', function (evt) {
            loadVideo(wrapper, service);
            evt.preventDefault();
        });
    }
}

function loadVideo(wrapper, service) {
    switch (service.type) {
        case 'youtube':
            return (0, _videoPreviewYoutube2.default)(wrapper, service);
        default:
            return false;
    }
}

exports.default = {
    className: 'video-preview',
    launch: launch
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _componentList = __webpack_require__(10);

var _componentList2 = _interopRequireDefault(_componentList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launchPattern(pattern) {
    if (typeof pattern === 'function') {
        pattern();
    } else if (pattern.className) {
        var className = pattern.className,
            launch = pattern.launch;

        (0, _cashDom2.default)('.' + className + ':not(.' + className + '-njs)').each(launch);
    }
}

!function () {
    _componentList2.default.forEach(launchPattern);
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getDataAttributes;
var dataAttrRegex = /^data-(.+)$/;

function getDataAttributes(node) {
    return Array.from(node.get(0).attributes).reduce(function (acc, attr) {
        var match = attr.nodeName.match(dataAttrRegex);
        if (match) {
            acc[match[1]] = attr.nodeValue;
        }
        return acc;
    }, {});
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveIntoViewInContainer = moveIntoViewInContainer;
exports.initMoveIntoView = initMoveIntoView;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function elementContentWidth(elem) {
    var cs = getComputedStyle(elem[0]);
    return elem.width() - (parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)) - (parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
}

function moveIntoViewInContainer(elem) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var docViewTop = window.scrollY;

    var parent = elem.parent();

    var parentTop = parent.offset().top;
    var parentHeight = parent.height();

    var elemHeight = elem.height();

    var currentStatus = elem.attr('data-miv-status');

    var nextStatus = void 0;

    if (parentTop >= docViewTop) {
        nextStatus = 't';
    } else if (parentTop + parentHeight < docViewTop + elemHeight) {
        nextStatus = 'b';
    } else {
        nextStatus = 'm';
    }

    if (force || nextStatus !== currentStatus) {
        elem.attr('data-miv-status', nextStatus);

        switch (nextStatus) {
            case 't':
                elem.css({
                    width: null,
                    position: null,
                    top: null,
                    bottom: null
                });
                break;
            case 'm':
                elem.css({
                    width: elementContentWidth(parent) + 'px',
                    position: 'fixed',
                    top: 0,
                    bottom: null
                });
                break;
            case 'b':
                elem.css({
                    width: elementContentWidth(parent) + 'px',
                    position: 'absolute',
                    top: 'auto',
                    bottom: '0'
                });
                break;
        }
    }
}

function initMoveIntoView(elem) {
    (0, _cashDom2.default)(window).on('scroll', function () {
        moveIntoViewInContainer(elem);
    });

    (0, _cashDom2.default)(window).on('resize', function () {
        moveIntoViewInContainer(elem, true);
    });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createPlayer;
var UNLOADED = 'UNLOADED';
var LOADING = 'LOADING';
var LOADED = 'LOADED';

var apiStatus = UNLOADED;

var pendingPlayers = [];

var players = {};

function createPlayer(id, data) {
    if (apiStatus === LOADED) {
        initPlayer(id, data);
    } else {
        pendingPlayers.push({ id: id, data: data });
        if (apiStatus === UNLOADED) {
            loadApi();
        }
    }
}

function initPlayer(id, data) {
    if (data && data.events && data.events.onInit) {
        data.events.onInit();
    }

    var player = new YT.Player(id, data);
    players[id] = { player: player, data: data };
}

function loadApi() {
    apiStatus = LOADING;
    window.onYouTubeIframeAPIReady = function () {
        pendingPlayers.forEach(function (_ref) {
            var id = _ref.id,
                data = _ref.data;
            return initPlayer(id, data);
        });
    };

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(27)
var ieee754 = __webpack_require__(31)
var isArray = __webpack_require__(29)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _extends=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(a,b){"object"===( false?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=b(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a.LazyLoad=b()}(this,function(){"use strict";var a={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},b=!("onscroll"in window)||/glebot/.test(navigator.userAgent),c=function(a,b){a&&a(b)},d=function(a){return a.getBoundingClientRect().top+window.pageYOffset-a.ownerDocument.documentElement.clientTop},e=function(a,b,c){return(b===window?window.innerHeight+window.pageYOffset:d(b)+b.offsetHeight)<=d(a)-c},f=function(a){return a.getBoundingClientRect().left+window.pageXOffset-a.ownerDocument.documentElement.clientLeft},g=function(a,b,c){var d=window.innerWidth;return(b===window?d+window.pageXOffset:f(b)+d)<=f(a)-c},h=function(a,b,c){return(b===window?window.pageYOffset:d(b))>=d(a)+c+a.offsetHeight},i=function(a,b,c){return(b===window?window.pageXOffset:f(b))>=f(a)+c+a.offsetWidth},j=function(a,b,c){return!(e(a,b,c)||h(a,b,c)||g(a,b,c)||i(a,b,c))},k=function(a,b){var c=new a(b),d=new CustomEvent("LazyLoad::Initialized",{detail:{instance:c}});window.dispatchEvent(d)},l=function(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.dataset[b];f&&e.setAttribute("srcset",f)}}},m=function(a,b,c){var d=a.tagName,e=a.dataset[c];if("IMG"===d){l(a,b);var f=a.dataset[b];return f&&a.setAttribute("srcset",f),void(e&&a.setAttribute("src",e))}if("IFRAME"===d)return void(e&&a.setAttribute("src",e));e&&(a.style.backgroundImage="url("+e+")")},n=function(b){this._settings=_extends({},a,b),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};n.prototype={_reveal:function(a){var b=this._settings,d=function d(){b&&(a.removeEventListener("load",e),a.removeEventListener("error",d),a.classList.remove(b.class_loading),a.classList.add(b.class_error),c(b.callback_error,a))},e=function e(){b&&(a.classList.remove(b.class_loading),a.classList.add(b.class_loaded),a.removeEventListener("load",e),a.removeEventListener("error",d),c(b.callback_load,a))};"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",e),a.addEventListener("error",d),a.classList.add(b.class_loading)),m(a,b.data_srcset,b.data_src),c(b.callback_set,a)},_loopThroughElements:function(){var a=this._settings,d=this._elements,e=d?d.length:0,f=void 0,g=[],h=this._isFirstLoop;for(f=0;f<e;f++){var i=d[f];a.skip_invisible&&null===i.offsetParent||(b||j(i,a.container,a.threshold))&&(h&&i.classList.add(a.class_initial),this._reveal(i),g.push(f),i.dataset.wasProcessed=!0)}for(;g.length>0;)d.splice(g.pop(),1),c(a.callback_processed,d.length);0===e&&this._stopScrollHandler(),h&&(this._isFirstLoop=!1)},_purgeElements:function(){var a=this._elements,b=a.length,c=void 0,d=[];for(c=0;c<b;c++){a[c].dataset.wasProcessed&&d.push(c)}for(;d.length>0;)a.splice(d.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var a=this,b=this._settings.throttle;0!==b?function(){var c=function(){(new Date).getTime()},d=c(),e=b-(d-a._previousLoopTime);e<=0||e>b?(a._loopTimeout&&(clearTimeout(a._loopTimeout),a._loopTimeout=null),a._previousLoopTime=d,a._loopThroughElements()):a._loopTimeout||(a._loopTimeout=setTimeout(function(){this._previousLoopTime=c(),this._loopTimeout=null,this._loopThroughElements()}.bind(a),e))}():this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var o=window.lazyLoadOptions;return o&&function(a,b){var c=b.length;if(c)for(var d=0;d<c;d++)k(a,b[d]);else k(a,b)}(n,o),n});

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODUxYTVjNTEwZGJkMzYxZjAwOWMiLCJ3ZWJwYWNrOi8vLy4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWxpbmtzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL3Njcm9sbC10by5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nsb25lL2Nsb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvbGlua2VkLWNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvdGFicy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXp5LWxvYWQvbGF6eS1sb2FkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9uYXYtbW9iaWxlLWhvcml6b250YWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9uYXYtbW9iaWxlLXNpbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL25hdi1tb2JpbGUtdmVydGljYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9wYXJzZS1uYXYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlby1wcmV2aWV3L3ZpZGVvLXByZXZpZXcteW91dHViZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlby1wcmV2aWV3L3ZpZGVvLXByZXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9nZXQtZGF0YS1hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMtdXRpbHMvbW92ZS1pbnRvLXZpZXctaW4tY29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy95b3V0dWJlLXBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9+L2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2J1ZmZlci9+L2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9leHRlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLnRyYW5zcGlsZWQubWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOlsiY29udGVudENuIiwiY2xhc3NOYW1lIiwiaGVhZGluZ0NuIiwiaGVhZGluZ0xhYmVsQ24iLCJoZWFkaW5nSWNvbkNuIiwibWVudUNuIiwibWVudVdyYXBwZXJDbiIsIm1lbnVJdGVtQ24iLCJtZW51SXRlbUxhYmVsQ24iLCJwcmVwYXJlQ29udGVudCIsIndpZGdldCIsImNvbnRlbnRDbGFzc05hbWUiLCJjb250ZW50RWxlbWVudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJhcHBlbmQiLCJhcHBlbmRUbyIsImRlYWN0aXZhdGVBbGwiLCJwcmVwYXJlTGlua3MiLCJnZW5BY3RpdmF0ZUl0ZW0iLCJoZWFkaW5nQW5jaG9ycyIsImFsbEFuY2hvcnMiLCJpZCIsInNjcm9sbCIsImZpbHRlciIsInJlbW92ZUNsYXNzIiwiYXR0ciIsIm5vdCIsImhlYWRpbmdzIiwibWVudSIsImNhbkRlYWN0aXZhdGUiLCJzY3JvbGxPbkFjdGl2YXRlIiwiYWN0aXZhdGVJbml0aWFsIiwicmVkdWNlIiwiYWNjIiwiaXRlbSIsImFkZCIsImlzIiwicGFyZW50IiwiZmluZCIsImFjdGl2YXRlSXRlbSIsIm9uIiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJhbmNob3IiLCJoYXNDbGFzcyIsImZpbmRIZWFkaW5ncyIsImNvbnRlbnQiLCJoZWFkaW5nVGFnTmFtZSIsImZpcnN0IiwicHJvcCIsImhlYWRlckVsZW1lbnRzIiwibWFwIiwiZWxlbWVudCIsImkiLCJjb250ZW50RWxlbWVudHMiLCJuZXh0IiwicHVzaCIsImluc2VydEFmdGVyIiwidGV4dCIsImh0bWwiLCJzY3JvbGxlZEludG9WaWV3IiwiZWxlbSIsImRvY1ZpZXdUb3AiLCJ3aW5kb3ciLCJzY3JvbGxZIiwiZG9jVmlld0JvdHRvbSIsImlubmVySGVpZ2h0IiwiZWxlbVRvcCIsIm9mZnNldCIsInRvcCIsImVsZW1IZWlnaHQiLCJoZWlnaHQiLCJlbGVtQm90dG9tIiwidmlld1RvcCIsIk1hdGgiLCJtYXgiLCJ2aWV3Qm90dG9tIiwibWluIiwicHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzIiwicGF0dGVybkNsYXNzbmFtZSIsImluZGV4IiwiaGVhZGluZ0NsYXNzIiwiYW5jaG9ycyIsImZvckVhY2giLCJjaGlsZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiVEVYVF9OT0RFIiwic3BhbiIsImVtcHR5IiwiaWNvbiIsImluc2VydEJlZm9yZSIsInJlbW92ZUF0dHIiLCJwcmVwYXJlVGFic0hlYWRpbmdzIiwid3JhcCIsInRhYnNCYXIiLCJzY3JvbGxUbyIsInNjcm9sbEludG9WaWV3IiwibGF1bmNoIiwiZWwiLCJiZXN0IiwibWF4SW5kZXgiLCJ2IiwiYXJyIiwiZWxlbWVudHNfc2VsZWN0b3IiLCJkYXRhX3NyYyIsInRocmVzaG9sZCIsImNhbGxiYWNrX2xvYWQiLCJpbWciLCJzdHlsZSIsInBhZGRpbmdCb3R0b20iLCJuYXZDbGFzcyIsIk5hdk1vYmlsZSIsIm5hdiIsIm1heExldmVsIiwicm9vdCIsIk5hdk1vYmlsZUhvcml6b250YWwiLCJ0cmVlIiwiZGVmYXVsdE9wZW4iLCJvdmVybGF5IiwibGV2ZWxFbGVtZW50cyIsIm9wZW5MZXZlbHMiLCJiYWNrVG8iLCJiaW5kIiwibGV2ZWxEb3duIiwiY2xvc2VOYXYiLCJvcGVuTmF2IiwicGFyc2VJbnQiLCJwcmVwYXJlTGV2ZWxzIiwibGV2ZWwiLCJoZWFkZXIiLCJzZXRMZXZlbE1lbnUiLCJnb1RvTGV2ZWwiLCJ0b2dnbGVDbGFzcyIsImxldmVsRWxlbWVudCIsIm5hbWUiLCJ1cmwiLCJsb2NhdGlvbiIsInNlYXJjaCIsInR5cGUiLCJ1bCIsImxpIiwicHJlcGFyZVRyZWVJZHMiLCJwYXJlbnRJZCIsImNoaWxkIiwiaXNTY3JvbGxlZEludG9WaWV3IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwiaXNWaXNpYmxlIiwiTmF2TW9iaWxlU2ltcGxlIiwidG9nZ2xlSXRlbSIsImxldmVsTWFwIiwic2xpY2UiLCJwcmVwYXJlSXRlbUVsZW1lbnQiLCJpbmRleE9mIiwic3BsaWNlIiwidXBkYXRlTGV2ZWxzIiwiY3VycmVudE9wZW4iLCJwcmV2aW91c09wZW4iLCJjdXJyZW50Q2hpbGRyZW4iLCJsYXN0SW5kZXgiLCJ0eCIsImNvbnRhaW5lciIsImNoaWxkcmVuQ29udGFpbmVyIiwiayIsIk5hdk1vYmlsZVZlcnRpY2FsIiwidG9nZ2xlQ2hpbGRyZW4iLCJhbmNlc3RvcnMiLCJwYXJlbnRzIiwic2V0T3BlbiIsIlBBUlNFX1JFR0VYIiwibG9hZERhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwicGFyc2VOYXYiLCJkYXRhIiwic3BsaXQiLCJtYXRjaCIsImxpbmUiLCJsZXZlbFN0ciIsInR5cGVTdHIiLCJjdXJyZW50SGVhZCIsImN1cnJlbnQiLCJmaW5kQ3VycmVudCIsImxpc3QiLCJzZWxlY3QiLCJlcSIsImhyZWYiLCJsb2FkWW91dHViZVZpZGVvIiwiREVGQVVMVF9QQVJBTVMiLCJmcmFtZUJvcmRlciIsIndyYXBwZXIiLCJwYXJhbXMiLCJpZnJhbWVJZCIsImxpbmsiLCJmYWxsYmFja1BhcmFtcyIsIndpZHRoIiwicGxheWVyUGFyYW1zIiwidmlkZW9JZCIsImV2ZW50cyIsIm9uSW5pdCIsIm9uUmVhZHkiLCJyZW1vdmUiLCJwbGF5ZXIiLCJ0YXJnZXQiLCJpZnJhbWUiLCJwbGF5VmlkZW8iLCJwYXVzZVZpZGVvIiwiZ2V0U2VydmljZSIsInl0TWF0Y2giLCJzZXJ2aWNlIiwidG9Mb3dlckNhc2UiLCJsb2FkVmlkZW8iLCJsYXVuY2hQYXR0ZXJuIiwicGF0dGVybiIsImVhY2giLCJnZXREYXRhQXR0cmlidXRlcyIsImRhdGFBdHRyUmVnZXgiLCJub2RlIiwiQXJyYXkiLCJmcm9tIiwiZ2V0IiwiYXR0cmlidXRlcyIsIm5vZGVOYW1lIiwibm9kZVZhbHVlIiwibW92ZUludG9WaWV3SW5Db250YWluZXIiLCJpbml0TW92ZUludG9WaWV3IiwiZWxlbWVudENvbnRlbnRXaWR0aCIsImNzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlRmxvYXQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImJvcmRlckxlZnRXaWR0aCIsImJvcmRlclJpZ2h0V2lkdGgiLCJmb3JjZSIsInBhcmVudFRvcCIsInBhcmVudEhlaWdodCIsImN1cnJlbnRTdGF0dXMiLCJuZXh0U3RhdHVzIiwiY3NzIiwicG9zaXRpb24iLCJjcmVhdGVQbGF5ZXIiLCJVTkxPQURFRCIsIkxPQURJTkciLCJMT0FERUQiLCJhcGlTdGF0dXMiLCJwZW5kaW5nUGxheWVycyIsInBsYXllcnMiLCJpbml0UGxheWVyIiwibG9hZEFwaSIsIllUIiwiUGxheWVyIiwib25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkiLCJ0YWciLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiZmlyc3RTY3JpcHRUYWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInBhcmVudE5vZGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7a0VDaEVBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxjQUFjOztBQUUxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVUsWUFBWTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFVBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVksU0FBUztBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSyxFQUFFOztBQUVQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLG9GQUFvRjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDMVBBOzs7O0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUFLLFdBQVcsc0RBQXNELDJEQUEyRCwyQkFBMkIsOENBQThDLFFBQVEsSUFBSSxLQUFLLHFDQUFxQyxLQUFLLFdBQVcscUJBQXFCLGdDQUFnQyxnSUFBZ0ksK0JBQStCLG1JQUFtSSx5QkFBeUIscUNBQXFDLGlCQUFpQixpQkFBaUIscUJBQXFCLG1DQUFtQyxvTEFBb0wsOEVBQThFLGFBQWEsK0JBQStCLG1CQUFtQixpTUFBaU0sb0JBQW9CLHdPQUF3Tyw2QkFBNkIsd0JBQXdCLGVBQWUsaUJBQWlCLElBQUksY0FBYyxZQUFZLFFBQVEsRTs7Ozs7O0FDQXBoSzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg1MWE1YzUxMGRiZDM2MWYwMDljIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qISBjYXNoLWRvbSAxLjMuNSwgaHR0cHM6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvY2FzaCBAbGljZW5zZSBNSVQgKi9cbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5jYXNoID0gcm9vdC4kID0gZmFjdG9yeSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCwgd2luID0gd2luZG93LCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLCBzbGljZSA9IEFycmF5UHJvdG8uc2xpY2UsIGZpbHRlciA9IEFycmF5UHJvdG8uZmlsdGVyLCBwdXNoID0gQXJyYXlQcm90by5wdXNoO1xuXG4gIHZhciBub29wID0gZnVuY3Rpb24gKCkge30sIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIC8vIEBzZWUgaHR0cHM6Ly9jcmJ1Zy5jb20vNTY4NDQ4XG4gICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSB0eXBlb2Ygbm9vcCAmJiBpdGVtLmNhbGw7XG4gIH0sIGlzU3RyaW5nID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IHR5cGVvZiBcIlwiO1xuICB9O1xuXG4gIHZhciBpZE1hdGNoID0gL14jW1xcdy1dKiQvLCBjbGFzc01hdGNoID0gL15cXC5bXFx3LV0qJC8sIGh0bWxNYXRjaCA9IC88Lis+Lywgc2luZ2xldCA9IC9eXFx3KyQvO1xuXG4gIGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2M7XG4gICAgdmFyIGVsZW1zID0gKGNsYXNzTWF0Y2gudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc2xpY2UoMSkpIDogc2luZ2xldC50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIDogY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgcmV0dXJuIGVsZW1zO1xuICB9XG5cbiAgdmFyIGZyYWc7XG4gIGZ1bmN0aW9uIHBhcnNlSFRNTChzdHIpIHtcbiAgICBpZiAoIWZyYWcpIHtcbiAgICAgIGZyYWcgPSBkb2MuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCk7XG4gICAgICB2YXIgYmFzZSA9IGZyYWcuY3JlYXRlRWxlbWVudChcImJhc2VcIik7XG4gICAgICBiYXNlLmhyZWYgPSBkb2MubG9jYXRpb24uaHJlZjtcbiAgICAgIGZyYWcuaGVhZC5hcHBlbmRDaGlsZChiYXNlKTtcbiAgICB9XG5cbiAgICBmcmFnLmJvZHkuaW5uZXJIVE1MID0gc3RyO1xuXG4gICAgcmV0dXJuIGZyYWcuYm9keS5jaGlsZE5vZGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gb25SZWFkeShmbikge1xuICAgIGlmIChkb2MucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgIGZuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gSW5pdChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIElmIGFscmVhZHkgYSBjYXNoIGNvbGxlY3Rpb24sIGRvbid0IGRvIGFueSBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgICBpZiAoc2VsZWN0b3IuY2FzaCAmJiBzZWxlY3RvciAhPT0gd2luKSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1zID0gc2VsZWN0b3IsIGkgPSAwLCBsZW5ndGg7XG5cbiAgICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgICBlbGVtcyA9IChpZE1hdGNoLnRlc3Qoc2VsZWN0b3IpID9cbiAgICAgIC8vIElmIGFuIElEIHVzZSB0aGUgZmFzdGVyIGdldEVsZW1lbnRCeUlkIGNoZWNrXG4gICAgICBkb2MuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpIDogaHRtbE1hdGNoLnRlc3Qoc2VsZWN0b3IpID9cbiAgICAgIC8vIElmIEhUTUwsIHBhcnNlIGl0IGludG8gcmVhbCBlbGVtZW50c1xuICAgICAgcGFyc2VIVE1MKHNlbGVjdG9yKSA6XG4gICAgICAvLyBlbHNlIHVzZSBgZmluZGBcbiAgICAgIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpKTtcblxuICAgICAgLy8gSWYgZnVuY3Rpb24sIHVzZSBhcyBzaG9ydGN1dCBmb3IgRE9NIHJlYWR5XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgb25SZWFkeShzZWxlY3Rvcik7cmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgYSBzaW5nbGUgRE9NIGVsZW1lbnQgaXMgcGFzc2VkIGluIG9yIHJlY2VpdmVkIHZpYSBJRCwgcmV0dXJuIHRoZSBzaW5nbGUgZWxlbWVudFxuICAgIGlmIChlbGVtcy5ub2RlVHlwZSB8fCBlbGVtcyA9PT0gd2luKSB7XG4gICAgICB0aGlzWzBdID0gZWxlbXM7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyZWF0IGxpa2UgYW4gYXJyYXkgYW5kIGxvb3AgdGhyb3VnaCBlYWNoIGl0ZW0uXG4gICAgICBsZW5ndGggPSB0aGlzLmxlbmd0aCA9IGVsZW1zLmxlbmd0aDtcbiAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpc1tpXSA9IGVsZW1zW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FzaChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgSW5pdChzZWxlY3RvciwgY29udGV4dCk7XG4gIH1cblxuICB2YXIgZm4gPSBjYXNoLmZuID0gY2FzaC5wcm90b3R5cGUgPSBJbml0LnByb3RvdHlwZSA9IHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgY2FzaDogdHJ1ZSxcbiAgICBsZW5ndGg6IDAsXG4gICAgcHVzaDogcHVzaCxcbiAgICBzcGxpY2U6IEFycmF5UHJvdG8uc3BsaWNlLFxuICAgIG1hcDogQXJyYXlQcm90by5tYXAsXG4gICAgaW5pdDogSW5pdFxuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJjb25zdHJ1Y3RvclwiLCB7IHZhbHVlOiBjYXNoIH0pO1xuXG4gIGNhc2gucGFyc2VIVE1MID0gcGFyc2VIVE1MO1xuICBjYXNoLm5vb3AgPSBub29wO1xuICBjYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICBjYXNoLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbiAgY2FzaC5leHRlbmQgPSBmbi5leHRlbmQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHt9O1xuXG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksIGxlbmd0aCA9IGFyZ3MubGVuZ3RoLCBpID0gMTtcblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGFyZ2V0ID0gdGhpcztcbiAgICAgIGkgPSAwO1xuICAgIH1cblxuICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghYXJnc1tpXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmdzW2ldKSB7XG4gICAgICAgIGlmIChhcmdzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ3NbaV1ba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgZnVuY3Rpb24gZWFjaChjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBsID0gY29sbGVjdGlvbi5sZW5ndGgsIGkgPSAwO1xuXG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGNvbGxlY3Rpb25baV0sIGNvbGxlY3Rpb25baV0sIGksIGNvbGxlY3Rpb24pID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXRjaGVzKGVsLCBzZWxlY3Rvcikge1xuICAgIHZhciBtID0gZWwgJiYgKGVsLm1hdGNoZXMgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvciB8fCBlbC5vTWF0Y2hlc1NlbGVjdG9yKTtcbiAgICByZXR1cm4gISFtICYmIG0uY2FsbChlbCwgc2VsZWN0b3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAvKiBVc2UgYnJvd3NlcidzIGBtYXRjaGVzYCBmdW5jdGlvbiBpZiBzdHJpbmcgKi9cbiAgICBpc1N0cmluZyhzZWxlY3RvcikgPyBtYXRjaGVzIDpcbiAgICAvKiBNYXRjaCBhIGNhc2ggZWxlbWVudCAqL1xuICAgIHNlbGVjdG9yLmNhc2ggPyBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rvci5pcyhlbCk7XG4gICAgfSA6XG4gICAgLyogRGlyZWN0IGNvbXBhcmlzb24gKi9cbiAgICBmdW5jdGlvbiAoZWwsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZWwgPT09IHNlbGVjdG9yO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5pcXVlKGNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gY2FzaChzbGljZS5jYWxsKGNvbGxlY3Rpb24pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICAgIH0pKTtcbiAgfVxuXG4gIGNhc2guZXh0ZW5kKHtcbiAgICBtZXJnZTogZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgIHZhciBsZW4gPSArc2Vjb25kLmxlbmd0aCwgaSA9IGZpcnN0Lmxlbmd0aCwgaiA9IDA7XG5cbiAgICAgIGZvciAoOyBqIDwgbGVuOyBpKyssIGorKykge1xuICAgICAgICBmaXJzdFtpXSA9IHNlY29uZFtqXTtcbiAgICAgIH1cblxuICAgICAgZmlyc3QubGVuZ3RoID0gaTtcbiAgICAgIHJldHVybiBmaXJzdDtcbiAgICB9LFxuXG4gICAgZWFjaDogZWFjaCxcbiAgICBtYXRjaGVzOiBtYXRjaGVzLFxuICAgIHVuaXF1ZTogdW5pcXVlLFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXksXG4gICAgaXNOdW1lcmljOiBmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIHVpZCA9IGNhc2gudWlkID0gXCJfY2FzaFwiICsgRGF0ZS5ub3coKTtcblxuICBmdW5jdGlvbiBnZXREYXRhQ2FjaGUobm9kZSkge1xuICAgIHJldHVybiAobm9kZVt1aWRdID0gbm9kZVt1aWRdIHx8IHt9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERhdGEobm9kZSwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiAoZ2V0RGF0YUNhY2hlKG5vZGUpW2tleV0gPSB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRhKG5vZGUsIGtleSkge1xuICAgIHZhciBjID0gZ2V0RGF0YUNhY2hlKG5vZGUpO1xuICAgIGlmIChjW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY1trZXldID0gbm9kZS5kYXRhc2V0ID8gbm9kZS5kYXRhc2V0W2tleV0gOiBjYXNoKG5vZGUpLmF0dHIoXCJkYXRhLVwiICsga2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGNba2V5XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZURhdGEobm9kZSwga2V5KSB7XG4gICAgdmFyIGMgPSBnZXREYXRhQ2FjaGUobm9kZSk7XG4gICAgaWYgKGMpIHtcbiAgICAgIGRlbGV0ZSBjW2tleV07XG4gICAgfSBlbHNlIGlmIChub2RlLmRhdGFzZXQpIHtcbiAgICAgIGRlbGV0ZSBub2RlLmRhdGFzZXRba2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FzaChub2RlKS5yZW1vdmVBdHRyKFwiZGF0YS1cIiArIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgZGF0YTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gdW5kZWZpbmVkID8gZ2V0RGF0YSh0aGlzWzBdLCBuYW1lKSA6IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBzZXREYXRhKHYsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICB0aGlzLmRhdGEoa2V5LCBuYW1lW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVtb3ZlRGF0YTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gcmVtb3ZlRGF0YSh2LCBrZXkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBub3RXaGl0ZU1hdGNoID0gL1xcUysvZztcblxuICBmdW5jdGlvbiBnZXRDbGFzc2VzKGMpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoYykgJiYgYy5tYXRjaChub3RXaGl0ZU1hdGNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKHYsIGMpIHtcbiAgICByZXR1cm4gKHYuY2xhc3NMaXN0ID8gdi5jbGFzc0xpc3QuY29udGFpbnMoYykgOiBuZXcgUmVnRXhwKFwiKF58IClcIiArIGMgKyBcIiggfCQpXCIsIFwiZ2lcIikudGVzdCh2LmNsYXNzTmFtZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSkge1xuICAgIGlmICh2LmNsYXNzTGlzdCkge1xuICAgICAgdi5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH0gZWxzZSBpZiAoc3BhY2VkTmFtZS5pbmRleE9mKFwiIFwiICsgYyArIFwiIFwiKSkge1xuICAgICAgdi5jbGFzc05hbWUgKz0gXCIgXCIgKyBjO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKHYsIGMpIHtcbiAgICBpZiAodi5jbGFzc0xpc3QpIHtcbiAgICAgIHYuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdi5jbGFzc05hbWUgPSB2LmNsYXNzTmFtZS5yZXBsYWNlKGMsIFwiXCIpO1xuICAgIH1cbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG5cbiAgICAgIHJldHVybiAoY2xhc3NlcyA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICB2YXIgc3BhY2VkTmFtZSA9IFwiIFwiICsgdi5jbGFzc05hbWUgKyBcIiBcIjtcbiAgICAgICAgZWFjaChjbGFzc2VzLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIGFkZENsYXNzKHYsIGMsIHNwYWNlZE5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pIDogdGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHI6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS5nZXRBdHRyaWJ1dGUgPyB0aGlzWzBdLmdldEF0dHJpYnV0ZShuYW1lKSA6IHRoaXNbMF1bbmFtZV0gOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgaWYgKHYuc2V0QXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICB0aGlzLmF0dHIoa2V5LCBuYW1lW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgY2hlY2sgPSBmYWxzZSwgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG4gICAgICBpZiAoY2xhc3NlcyAmJiBjbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBjaGVjayA9IGhhc0NsYXNzKHYsIGNsYXNzZXNbMF0pO1xuICAgICAgICAgIHJldHVybiAhY2hlY2s7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH0sXG5cbiAgICBwcm9wOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgPyB0aGlzWzBdW25hbWVdIDogdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgdltuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMucHJvcChrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmVBdHRyOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAodi5yZW1vdmVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICB2LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdltuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbiAgICAgIH1cbiAgICAgIHZhciBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcbiAgICAgIHJldHVybiAoY2xhc3NlcyA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmVtb3ZlQ2xhc3ModiwgYyk7XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJvcDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgZGVsZXRlIHZbbmFtZV07XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uIChjLCBzdGF0ZSkge1xuICAgICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbc3RhdGUgPyBcImFkZENsYXNzXCIgOiBcInJlbW92ZUNsYXNzXCJdKGMpO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzZXMgPSBnZXRDbGFzc2VzKGMpO1xuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBzcGFjZWROYW1lID0gXCIgXCIgKyB2LmNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgaWYgKGhhc0NsYXNzKHYsIGMpKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyh2LCBjKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pIDogdGhpcyk7XG4gICAgfSB9KTtcblxuICBmbi5leHRlbmQoe1xuICAgIGFkZDogZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdW5pcXVlKGNhc2gubWVyZ2UodGhpcywgY2FzaChzZWxlY3RvciwgY29udGV4dCkpKTtcbiAgICB9LFxuXG4gICAgZWFjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICBlYWNoKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBlcTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICByZXR1cm4gY2FzaCh0aGlzLmdldChpbmRleCkpO1xuICAgIH0sXG5cbiAgICBmaWx0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmF0b3IgPSAoaXNGdW5jdGlvbihzZWxlY3RvcikgPyBzZWxlY3RvciA6IGdldENvbXBhcmVGdW5jdGlvbihzZWxlY3RvcikpO1xuXG4gICAgICByZXR1cm4gY2FzaChmaWx0ZXIuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcihlLCBzZWxlY3Rvcik7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGZpcnN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcSgwKTtcbiAgICB9LFxuXG4gICAgZ2V0OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzbGljZS5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChpbmRleCA8IDAgPyB0aGlzW2luZGV4ICsgdGhpcy5sZW5ndGhdIDogdGhpc1tpbmRleF0pO1xuICAgIH0sXG5cbiAgICBpbmRleDogZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHZhciBjaGlsZCA9IGVsZW0gPyBjYXNoKGVsZW0pWzBdIDogdGhpc1swXSwgY29sbGVjdGlvbiA9IGVsZW0gPyB0aGlzIDogY2FzaChjaGlsZCkucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgICAgIHJldHVybiBzbGljZS5jYWxsKGNvbGxlY3Rpb24pLmluZGV4T2YoY2hpbGQpO1xuICAgIH0sXG5cbiAgICBsYXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcSgtMSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBjYW1lbENhc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW1lbFJlZ2V4ID0gLyg/Ol5cXHd8W0EtWl18XFxiXFx3KS9nLCB3aGl0ZVNwYWNlID0gL1tcXHMtX10rL2c7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZShjYW1lbFJlZ2V4LCBmdW5jdGlvbiAobGV0dGVyLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGV0dGVyW2luZGV4ID09PSAwID8gXCJ0b0xvd2VyQ2FzZVwiIDogXCJ0b1VwcGVyQ2FzZVwiXSgpO1xuICAgICAgfSkucmVwbGFjZSh3aGl0ZVNwYWNlLCBcIlwiKTtcbiAgICB9O1xuICB9KCkpO1xuXG4gIHZhciBnZXRQcmVmaXhlZFByb3AgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYWNoZSA9IHt9LCBkb2MgPSBkb2N1bWVudCwgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksIHN0eWxlID0gZGl2LnN0eWxlO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBwcm9wID0gY2FtZWxDYXNlKHByb3ApO1xuICAgICAgaWYgKGNhY2hlW3Byb3BdKSB7XG4gICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHVjUHJvcCA9IHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpLCBwcmVmaXhlcyA9IFtcIndlYmtpdFwiLCBcIm1velwiLCBcIm1zXCIsIFwib1wiXSwgcHJvcHMgPSAocHJvcCArIFwiIFwiICsgKHByZWZpeGVzKS5qb2luKHVjUHJvcCArIFwiIFwiKSArIHVjUHJvcCkuc3BsaXQoXCIgXCIpO1xuXG4gICAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAocCkge1xuICAgICAgICBpZiAocCBpbiBzdHlsZSkge1xuICAgICAgICAgIGNhY2hlW3BdID0gcHJvcCA9IGNhY2hlW3Byb3BdID0gcDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgfTtcbiAgfSgpKTtcblxuICBjYXNoLnByZWZpeGVkUHJvcCA9IGdldFByZWZpeGVkUHJvcDtcbiAgY2FzaC5jYW1lbENhc2UgPSBjYW1lbENhc2U7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBjc3M6IGZ1bmN0aW9uIChwcm9wLCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgICAgIHByb3AgPSBnZXRQcmVmaXhlZFByb3AocHJvcCk7XG4gICAgICAgIHJldHVybiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgPyB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9KSA6IHdpbi5nZXRDb21wdXRlZFN0eWxlKHRoaXNbMF0pW3Byb3BdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3ApIHtcbiAgICAgICAgdGhpcy5jc3Moa2V5LCBwcm9wW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gY29tcHV0ZShlbCwgcHJvcCkge1xuICAgIHJldHVybiBwYXJzZUludCh3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbFswXSwgbnVsbClbcHJvcF0sIDEwKSB8fCAwO1xuICB9XG5cbiAgZWFjaChbXCJXaWR0aFwiLCBcIkhlaWdodFwiXSwgZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgbG93ZXIgPSB2LnRvTG93ZXJDYXNlKCk7XG5cbiAgICBmbltsb3dlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtsb3dlcl07XG4gICAgfTtcblxuICAgIGZuW1wiaW5uZXJcIiArIHZdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXNbMF1bXCJjbGllbnRcIiArIHZdO1xuICAgIH07XG5cbiAgICBmbltcIm91dGVyXCIgKyB2XSA9IGZ1bmN0aW9uIChtYXJnaW5zKSB7XG4gICAgICByZXR1cm4gdGhpc1swXVtcIm9mZnNldFwiICsgdl0gKyAobWFyZ2lucyA/IGNvbXB1dGUodGhpcywgXCJtYXJnaW5cIiArICh2ID09PSBcIldpZHRoXCIgPyBcIkxlZnRcIiA6IFwiVG9wXCIpKSArIGNvbXB1dGUodGhpcywgXCJtYXJnaW5cIiArICh2ID09PSBcIldpZHRoXCIgPyBcIlJpZ2h0XCIgOiBcIkJvdHRvbVwiKSkgOiAwKTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiByZWdpc3RlckV2ZW50KG5vZGUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZXZlbnRDYWNoZSA9IGdldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiKSB8fCBzZXREYXRhKG5vZGUsIFwiX2Nhc2hFdmVudHNcIiwge30pO1xuICAgIGV2ZW50Q2FjaGVbZXZlbnROYW1lXSA9IGV2ZW50Q2FjaGVbZXZlbnROYW1lXSB8fCBbXTtcbiAgICBldmVudENhY2hlW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQobm9kZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudHMgPSBnZXREYXRhKG5vZGUsIFwiX2Nhc2hFdmVudHNcIiksIGV2ZW50Q2FjaGUgPSAoZXZlbnRzICYmIGV2ZW50c1tldmVudE5hbWVdKSwgaW5kZXg7XG5cbiAgICBpZiAoIWV2ZW50Q2FjaGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIGluZGV4ID0gZXZlbnRDYWNoZS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGV2ZW50Q2FjaGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChldmVudENhY2hlLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgICBldmVudENhY2hlID0gW107XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBvZmY6IGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVFdmVudCh2LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGVsZWdhdGUsIGNhbGxiYWNrLCBydW5PbmNlKSB7XG4gICAgICAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgICAgdmFyIG9yaWdpbmFsQ2FsbGJhY2s7XG5cbiAgICAgIGlmICghaXNTdHJpbmcoZXZlbnROYW1lKSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnROYW1lKSB7XG4gICAgICAgICAgdGhpcy5vbihrZXksIGRlbGVnYXRlLCBldmVudE5hbWVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGRlbGVnYXRlKSkge1xuICAgICAgICBjYWxsYmFjayA9IGRlbGVnYXRlO1xuICAgICAgICBkZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudE5hbWUgPT09IFwicmVhZHlcIikge1xuICAgICAgICBvblJlYWR5KGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgdCA9IGUudGFyZ2V0O1xuXG4gICAgICAgICAgd2hpbGUgKCFtYXRjaGVzKHQsIGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKHQgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICh0ID0gZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IHQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgb3JpZ2luYWxDYWxsYmFjay5jYWxsKHQsIGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICB2YXIgZmluYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAocnVuT25jZSkge1xuICAgICAgICAgIGZpbmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodiwgZXZlbnROYW1lLCBmaW5hbENhbGxiYWNrKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdGVyRXZlbnQodiwgZXZlbnROYW1lLCBmaW5hbENhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvbmU6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMub24oZXZlbnROYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHRydWUpO1xuICAgIH0sXG5cbiAgICByZWFkeTogb25SZWFkeSxcblxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIHZhciBldnQgPSBkb2MuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuICAgICAgZXZ0LmRhdGEgPSBkYXRhO1xuICAgICAgZXZ0LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIGZhbHNlKTtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGVuY29kZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiBcIiZcIiArIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC8lMjAvZywgXCIrXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0TXVsdGlwbGVfKGVsKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGVhY2goZWwub3B0aW9ucywgZnVuY3Rpb24gKG8pIHtcbiAgICAgIGlmIChvLnNlbGVjdGVkKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKG8udmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzIDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNlbGVjdFNpbmdsZV8oZWwpIHtcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IGVsLnNlbGVjdGVkSW5kZXg7XG4gICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPj0gMCA/IGVsLm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0udmFsdWUgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmFsdWUoZWwpIHtcbiAgICB2YXIgdHlwZSA9IGVsLnR5cGU7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgXCJzZWxlY3Qtb25lXCI6XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RTaW5nbGVfKGVsKTtcbiAgICAgIGNhc2UgXCJzZWxlY3QtbXVsdGlwbGVcIjpcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdE11bHRpcGxlXyhlbCk7XG4gICAgICBjYXNlIFwicmFkaW9cIjpcbiAgICAgICAgcmV0dXJuIChlbC5jaGVja2VkKSA/IGVsLnZhbHVlIDogbnVsbDtcbiAgICAgIGNhc2UgXCJjaGVja2JveFwiOlxuICAgICAgICByZXR1cm4gKGVsLmNoZWNrZWQpID8gZWwudmFsdWUgOiBudWxsO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGVsLnZhbHVlID8gZWwudmFsdWUgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcXVlcnkgPSBcIlwiO1xuXG4gICAgICBlYWNoKHRoaXNbMF0uZWxlbWVudHMgfHwgdGhpcywgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmIChlbC5kaXNhYmxlZCB8fCBlbC50YWdOYW1lID09PSBcIkZJRUxEU0VUXCIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWUgPSBlbC5uYW1lO1xuICAgICAgICBzd2l0Y2ggKGVsLnR5cGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIGNhc2UgXCJmaWxlXCI6XG4gICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgY2FzZSBcInN1Ym1pdFwiOlxuICAgICAgICAgIGNhc2UgXCJidXR0b25cIjpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJzZWxlY3QtbXVsdGlwbGVcIjpcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBnZXRWYWx1ZShlbCk7XG4gICAgICAgICAgICBpZiAodmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGVhY2godmFsdWVzLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShlbCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcXVlcnkgKz0gZW5jb2RlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBxdWVyeS5zdWJzdHIoMSk7XG4gICAgfSxcblxuICAgIHZhbDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZ2V0VmFsdWUodGhpc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGluc2VydEVsZW1lbnQoZWwsIGNoaWxkLCBwcmVwZW5kKSB7XG4gICAgaWYgKHByZXBlbmQpIHtcbiAgICAgIHZhciBmaXJzdCA9IGVsLmNoaWxkTm9kZXNbMF07XG4gICAgICBlbC5pbnNlcnRCZWZvcmUoY2hpbGQsIGZpcnN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydENvbnRlbnQocGFyZW50LCBjaGlsZCwgcHJlcGVuZCkge1xuICAgIHZhciBzdHIgPSBpc1N0cmluZyhjaGlsZCk7XG5cbiAgICBpZiAoIXN0ciAmJiBjaGlsZC5sZW5ndGgpIHtcbiAgICAgIGVhY2goY2hpbGQsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiBpbnNlcnRDb250ZW50KHBhcmVudCwgdiwgcHJlcGVuZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlYWNoKHBhcmVudCwgc3RyID8gZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2Lmluc2VydEFkamFjZW50SFRNTChwcmVwZW5kID8gXCJhZnRlcmJlZ2luXCIgOiBcImJlZm9yZWVuZFwiLCBjaGlsZCk7XG4gICAgfSA6IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICByZXR1cm4gaW5zZXJ0RWxlbWVudCh2LCAoaSA9PT0gMCA/IGNoaWxkIDogY2hpbGQuY2xvbmVOb2RlKHRydWUpKSwgcHJlcGVuZCk7XG4gICAgfSk7XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIGFmdGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGNhc2goc2VsZWN0b3IpLmluc2VydEFmdGVyKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGFwcGVuZDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQodGhpcywgY29udGVudCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwZW5kVG86IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQoY2FzaChwYXJlbnQpLCB0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBiZWZvcmU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QmVmb3JlKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY2FzaCh0aGlzLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGVtcHR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmh0bWwoXCJcIik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaHRtbDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0uaW5uZXJIVE1MO1xuICAgICAgfVxuICAgICAgdmFyIHNvdXJjZSA9IChjb250ZW50Lm5vZGVUeXBlID8gY29udGVudFswXS5vdXRlckhUTUwgOiBjb250ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYuaW5uZXJIVE1MID0gc291cmNlO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblxuICAgICAgY2FzaChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGUsIHNpYmxpbmcgPSBlbC5uZXh0U2libGluZztcbiAgICAgICAgX3RoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoKGkgPT09IDAgPyB2IDogdi5jbG9uZU5vZGUodHJ1ZSkpLCBzaWJsaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICAgIGNhc2goc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICBfdGhpczIuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoKGkgPT09IDAgPyB2IDogdi5jbG9uZU5vZGUodHJ1ZSkpLCBlbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcHJlcGVuZDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQodGhpcywgY29udGVudCwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcHJlcGVuZFRvOiBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICBpbnNlcnRDb250ZW50KGNhc2gocGFyZW50KSwgdGhpcywgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodik7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdGV4dDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0udGV4dENvbnRlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgcG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBlbC5vZmZzZXRMZWZ0LFxuICAgICAgICB0b3A6IGVsLm9mZnNldFRvcFxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgb2Zmc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVjdCA9IHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWwuY2xpZW50VG9wLFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbC5jbGllbnRMZWZ0XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ub2Zmc2V0UGFyZW50KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBjaGlsZHJlbjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgZWxlbXMgPSBbXTtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcHVzaC5hcHBseShlbGVtcywgZWwuY2hpbGRyZW4pO1xuICAgICAgfSk7XG4gICAgICBlbGVtcyA9IHVuaXF1ZShlbGVtcyk7XG5cbiAgICAgIHJldHVybiAoIXNlbGVjdG9yID8gZWxlbXMgOiBlbGVtcy5maWx0ZXIoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXModiwgc2VsZWN0b3IpO1xuICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBjbG9zZXN0OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IgfHwgdGhpcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBjYXNoKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCgpLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIH0sXG5cbiAgICBpczogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gZmFsc2UsIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIG1hdGNoID0gY29tcGFyYXRvcihlbCwgc2VsZWN0b3IpO1xuICAgICAgICByZXR1cm4gIW1hdGNoO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9LFxuXG4gICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yLm5vZGVUeXBlKSB7XG4gICAgICAgIHJldHVybiBjYXNoKHNlbGVjdG9yICYmIHRoaXMuaGFzKHNlbGVjdG9yKS5sZW5ndGggPyBzZWxlY3RvciA6IG51bGwpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxlbXMgPSBbXTtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcHVzaC5hcHBseShlbGVtcywgZmluZChzZWxlY3RvciwgZWwpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKGVsZW1zKTtcbiAgICB9LFxuXG4gICAgaGFzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBjb21wYXJhdG9yID0gKGlzU3RyaW5nKHNlbGVjdG9yKSA/IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gZmluZChzZWxlY3RvciwgZWwpLmxlbmd0aCAhPT0gMDtcbiAgICAgIH0gOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIGVsLmNvbnRhaW5zKHNlbGVjdG9yKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG4gICAgfSxcblxuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICB9LFxuXG4gICAgbm90OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb21wYXJhdG9yID0gZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKTtcblxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gIWNvbXBhcmF0b3IoZWwsIHNlbGVjdG9yKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwYXJlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0ucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKHJlc3VsdCk7XG4gICAgfSxcblxuICAgIHBhcmVudHM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIGxhc3QsIHJlc3VsdCA9IFtdO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbGFzdCA9IGl0ZW07XG5cbiAgICAgICAgd2hpbGUgKGxhc3QgJiYgbGFzdC5wYXJlbnROb2RlICYmIGxhc3QgIT09IGRvYy5ib2R5LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBsYXN0ID0gbGFzdC5wYXJlbnROb2RlO1xuXG4gICAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAoc2VsZWN0b3IgJiYgbWF0Y2hlcyhsYXN0LCBzZWxlY3RvcikpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChsYXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKHJlc3VsdCk7XG4gICAgfSxcblxuICAgIHByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgfSxcblxuICAgIHNpYmxpbmdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMucGFyZW50KCkuY2hpbGRyZW4oKSwgZWwgPSB0aGlzWzBdO1xuXG4gICAgICByZXR1cm4gY29sbGVjdGlvbi5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIGkgIT09IGVsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG5cbiAgcmV0dXJuIGNhc2g7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY2FzaC1kb20vZGlzdC9jYXNoLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBjb250ZW50Q24gPSBjbGFzc05hbWUgPT4gYCR7Y2xhc3NOYW1lfV9fY29udGVudGA7XG5leHBvcnQgY29uc3QgaGVhZGluZ0NuID0gY2xhc3NOYW1lID0+IGAke2NvbnRlbnRDbihjbGFzc05hbWUpfV9faGVhZGluZ2A7XG5leHBvcnQgY29uc3QgaGVhZGluZ0xhYmVsQ24gPSBjbGFzc05hbWUgPT4gYCR7aGVhZGluZ0NuKGNsYXNzTmFtZSl9X19sYWJlbGA7XG5leHBvcnQgY29uc3QgaGVhZGluZ0ljb25DbiA9IGNsYXNzTmFtZSA9PiBgJHtoZWFkaW5nQ24oY2xhc3NOYW1lKX1fX2ljb25gO1xuZXhwb3J0IGNvbnN0IG1lbnVDbiA9IGNsYXNzTmFtZSA9PiBgJHtjbGFzc05hbWV9X19tZW51YDtcbmV4cG9ydCBjb25zdCBtZW51V3JhcHBlckNuID0gY2xhc3NOYW1lID0+IGAke21lbnVDbihjbGFzc05hbWUpfS13cmFwcGVyYDtcbmV4cG9ydCBjb25zdCBtZW51SXRlbUNuID0gY2xhc3NOYW1lID0+IGAke21lbnVDbihjbGFzc05hbWUpfV9faXRlbWA7XG5leHBvcnQgY29uc3QgbWVudUl0ZW1MYWJlbENuID0gY2xhc3NOYW1lID0+IGAke21lbnVJdGVtQ24oY2xhc3NOYW1lKX1fX2xhYmVsYDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9lbGVtZW50LWNsYXNzbmFtZXMuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQge2NvbnRlbnRDbn0gZnJvbSAnLi9lbGVtZW50LWNsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlQ29udGVudChjbGFzc05hbWUsIHdpZGdldCkge1xuICAgIGxldCBjb250ZW50Q2xhc3NOYW1lID0gY29udGVudENuKGNsYXNzTmFtZSk7XG4gICAgbGV0IGNvbnRlbnRFbGVtZW50ID0gd2lkZ2V0LmNoaWxkcmVuKGAuJHtjb250ZW50Q2xhc3NOYW1lfWApO1xuXG4gICAgaWYgKGNvbnRlbnRFbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250ZW50RWxlbWVudCA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoY29udGVudENsYXNzTmFtZSkuYXBwZW5kKHdpZGdldC5jaGlsZHJlbigpKS5hcHBlbmRUbyh3aWRnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50RWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1jb250ZW50LmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHNjcm9sbFRvIGZyb20gJy4uLy4uLy4uL2pzLXV0aWxzL3Njcm9sbC10byc7XG5cbmZ1bmN0aW9uIGdlbkFjdGl2YXRlSXRlbShoZWFkaW5nQW5jaG9ycywgYWxsQW5jaG9ycykge1xuICAgIHJldHVybiAoaWQsIHNjcm9sbCkgPT4ge1xuICAgICAgICBhbGxBbmNob3JzLmZpbHRlcihgW2RhdGEtaWQ9XCIke2lkfVwiXS5pbmFjdGl2ZWApLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgYWxsQW5jaG9ycy5maWx0ZXIoYC5hY3RpdmVgKS5ub3QoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2luYWN0aXZlJykuYXR0cignYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuXG4gICAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvKGhlYWRpbmdBbmNob3JzLmZpbHRlcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlQWxsKGFsbEFuY2hvcnMpIHtcbiAgICBhbGxBbmNob3JzLmZpbHRlcignLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnaW5hY3RpdmUnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVMaW5rcyhoZWFkaW5ncywgbWVudSA9IG51bGwsIGNhbkRlYWN0aXZhdGUgPSBmYWxzZSwgc2Nyb2xsT25BY3RpdmF0ZSA9IGZhbHNlLCBhY3RpdmF0ZUluaXRpYWwgPSBudWxsKSB7XG4gICAgbGV0IGhlYWRpbmdBbmNob3JzID0gaGVhZGluZ3MucmVkdWNlKChhY2MsIHtpdGVtfSkgPT4gYWNjLmFkZChpdGVtLmlzKCdbZGF0YS1pZF0nKSA/IGl0ZW0gOiBpdGVtLnBhcmVudCgpKSwgJCgpKTtcbiAgICBsZXQgYWxsQW5jaG9ycyA9IG1lbnUgPyBoZWFkaW5nQW5jaG9ycy5hZGQobWVudS5maW5kKCdhW2RhdGEtaWRdJykpIDogaGVhZGluZ0FuY2hvcnM7XG5cbiAgICBsZXQgYWN0aXZhdGVJdGVtID0gZ2VuQWN0aXZhdGVJdGVtKGhlYWRpbmdBbmNob3JzLCBhbGxBbmNob3JzKTtcblxuICAgIGFsbEFuY2hvcnMub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgYW5jaG9yID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKGFuY2hvci5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuICAgICAgICAgICAgYWN0aXZhdGVJdGVtKCQodGhpcykuYXR0cignZGF0YS1pZCcpLCBzY3JvbGxPbkFjdGl2YXRlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjYW5EZWFjdGl2YXRlKSB7XG4gICAgICAgICAgICBkZWFjdGl2YXRlQWxsKGFsbEFuY2hvcnMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoYWN0aXZhdGVJbml0aWFsICE9PSBudWxsKSB7XG4gICAgICAgIGFjdGl2YXRlSXRlbShhY3RpdmF0ZUluaXRpYWwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aXZhdGVJdGVtO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtbGlua3MuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQge2hlYWRpbmdDbn0gZnJvbSAnLi9lbGVtZW50LWNsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSGVhZGluZ3MoY2xhc3NOYW1lLCB3aWRnZXQsIGNvbnRlbnQpIHtcbiAgICBsZXQgaGVhZGluZ1RhZ05hbWUgPSBjb250ZW50LmNoaWxkcmVuKCkuZmlyc3QoKS5wcm9wKCd0YWdOYW1lJyk7XG4gICAgbGV0IGhlYWRlckVsZW1lbnRzID0gY29udGVudC5jaGlsZHJlbihoZWFkaW5nVGFnTmFtZSk7XG5cbiAgICByZXR1cm4gaGVhZGVyRWxlbWVudHMubWFwKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgIGxldCBpdGVtID0gJChlbGVtZW50KS5hdHRyKCdkYXRhLWlkJywgaSk7XG4gICAgICAgIGxldCBjb250ZW50RWxlbWVudHMgPSBbXTtcbiAgICAgICAgbGV0IG5leHQgPSBpdGVtLm5leHQoKTtcbiAgICAgICAgd2hpbGUobmV4dC5sZW5ndGggPiAwICYmIG5leHQucHJvcCgndGFnTmFtZScpICAhPT0gaGVhZGluZ1RhZ05hbWUpIHtcbiAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50cy5wdXNoKG5leHQpO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbnRlbnQgPSAkKCc8ZGl2PjwvZGl2PicpLmFwcGVuZChjb250ZW50RWxlbWVudHMpLmluc2VydEFmdGVyKGl0ZW0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIHRleHQ6IGl0ZW0uaHRtbCgpLFxuICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICBjb250ZW50XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1zZWN0aW9ucy5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Nyb2xsZWRJbnRvVmlldyhlbGVtKSB7XG4gICAgbGV0IGRvY1ZpZXdUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICBsZXQgZG9jVmlld0JvdHRvbSA9IGRvY1ZpZXdUb3AgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICBsZXQgZWxlbVRvcCA9IGVsZW0ub2Zmc2V0KCkudG9wO1xuICAgIGxldCBlbGVtSGVpZ2h0ID0gZWxlbS5oZWlnaHQoKTtcbiAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBlbGVtSGVpZ2h0O1xuXG4gICAgbGV0IHZpZXdUb3AgPSBNYXRoLm1heChlbGVtVG9wLCBkb2NWaWV3VG9wKTtcbiAgICBsZXQgdmlld0JvdHRvbSA9IE1hdGgubWluKGVsZW1Cb3R0b20sIGRvY1ZpZXdCb3R0b20pO1xuXG4gICAgcmV0dXJuICh2aWV3Qm90dG9tIC0gdmlld1RvcCkgLyBlbGVtSGVpZ2h0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL3Njcm9sbGVkLWludG8tdmlldy5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IHtoZWFkaW5nQ24sIGhlYWRpbmdMYWJlbENuLCBoZWFkaW5nSWNvbkNufSBmcm9tICcuL2VsZW1lbnQtY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyhwYXR0ZXJuQ2xhc3NuYW1lLCB3aWRnZXQsIGluZGV4LCBoZWFkaW5ncykge1xuICAgIGxldCBoZWFkaW5nQ2xhc3MgPSBoZWFkaW5nQ24ocGF0dGVybkNsYXNzbmFtZSk7XG5cbiAgICBsZXQgYW5jaG9ycyA9IFtdO1xuXG4gICAgaGVhZGluZ3MuZm9yRWFjaCgoe2VsZW1lbnQsIGl0ZW0sIHRleHR9KSA9PiB7XG4gICAgICAgIGxldCBhbmNob3IgPSAkKCc8YS8+JykuYWRkQ2xhc3MoYCR7aGVhZGluZ0NsYXNzfSBpbmFjdGl2ZWApO1xuICAgICAgICBhbmNob3JzLnB1c2goYW5jaG9yKTtcbiAgICAgICAgYW5jaG9yLmF0dHIoJ2hyZWYnLCAnIycpO1xuXG4gICAgICAgIGlmIChlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmIGVsZW1lbnQuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gJCgnPHNwYW4vPicpO1xuICAgICAgICAgICAgc3Bhbi5odG1sKHRleHQpO1xuICAgICAgICAgICAgaXRlbS5lbXB0eSgpO1xuICAgICAgICAgICAgc3Bhbi5hZGRDbGFzcyhoZWFkaW5nTGFiZWxDbihwYXR0ZXJuQ2xhc3NuYW1lKSk7XG4gICAgICAgICAgICBpdGVtLmFwcGVuZChzcGFuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuY2hvci5hcHBlbmQoaXRlbS5jaGlsZHJlbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpY29uID0gJCgnPHNwYW4vPicpO1xuICAgICAgICBpY29uLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgaWNvbi5hZGRDbGFzcyhoZWFkaW5nSWNvbkNuKHBhdHRlcm5DbGFzc25hbWUpKTtcbiAgICAgICAgaXRlbS5hcHBlbmQoaWNvbik7XG4gICAgICAgIGFuY2hvci5pbnNlcnRCZWZvcmUoaXRlbSk7XG4gICAgICAgIGFuY2hvci5hcHBlbmQoaXRlbSk7XG4gICAgICAgIGFuY2hvci5hdHRyKCdkYXRhLWlkJywgaXRlbS5hdHRyKCdkYXRhLWlkJykpO1xuICAgICAgICBpdGVtLnJlbW92ZUF0dHIoJ2RhdGEtaWQnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBoZWFkaW5ncztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWFjY29yZGlvbi1oZWFkaW5ncy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCB7bWVudUNuLCBtZW51V3JhcHBlckNuLCBtZW51SXRlbUNuLCBtZW51SXRlbUxhYmVsQ259IGZyb20gJy4vZWxlbWVudC1jbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZVRhYnNIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgaSwgaGVhZGluZ3MsIGNvbnRlbnQsIHdyYXAgPSBmYWxzZSkge1xuICAgIGxldCB0YWJzQmFyID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhtZW51Q24oY2xhc3NOYW1lKSk7XG5cbiAgICBoZWFkaW5ncy5mb3JFYWNoKCh7dGV4dCwgaWR9KSA9PiB7XG4gICAgICAgIGxldCBhbmNob3IgPSAkKCc8YSBocmVmPVwiI1wiPjwvYT4nKS5hZGRDbGFzcyhtZW51SXRlbUNuKGNsYXNzTmFtZSkpLmFkZENsYXNzKCdpbmFjdGl2ZScpLmF0dHIoJ2RhdGEtaWQnLCBpZCk7XG4gICAgICAgICQoJzxzcGFuPjwvc3Bhbj4nKS5hZGRDbGFzcyhtZW51SXRlbUxhYmVsQ24oY2xhc3NOYW1lKSkuaHRtbCh0ZXh0KS5hcHBlbmRUbyhhbmNob3IpO1xuXG4gICAgICAgIGFuY2hvci5hcHBlbmRUbyh0YWJzQmFyKTtcbiAgICB9KTtcblxuICAgIGlmICh3cmFwKSB7XG4gICAgICAgICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MobWVudVdyYXBwZXJDbihjbGFzc05hbWUpKS5hcHBlbmQodGFic0JhcikuaW5zZXJ0QmVmb3JlKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYnNCYXIuaW5zZXJ0QmVmb3JlKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0YWJzQmFyO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLW1lbnUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGxUbyhlbGVtZW50KSB7XG4gICAgZWxlbWVudFswXS5zY3JvbGxJbnRvVmlldygpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy11dGlscy9zY3JvbGwtdG8uanMiLCJ2YXIgY2xvbmUgPSAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnN0YW5jZW9mKG9iaiwgdHlwZSkge1xuICByZXR1cm4gdHlwZSAhPSBudWxsICYmIG9iaiBpbnN0YW5jZW9mIHR5cGU7XG59XG5cbnZhciBuYXRpdmVNYXA7XG50cnkge1xuICBuYXRpdmVNYXAgPSBNYXA7XG59IGNhdGNoKF8pIHtcbiAgLy8gbWF5YmUgYSByZWZlcmVuY2UgZXJyb3IgYmVjYXVzZSBubyBgTWFwYC4gR2l2ZSBpdCBhIGR1bW15IHZhbHVlIHRoYXQgbm9cbiAgLy8gdmFsdWUgd2lsbCBldmVyIGJlIGFuIGluc3RhbmNlb2YuXG4gIG5hdGl2ZU1hcCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVTZXQ7XG50cnkge1xuICBuYXRpdmVTZXQgPSBTZXQ7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlU2V0ID0gZnVuY3Rpb24oKSB7fTtcbn1cblxudmFyIG5hdGl2ZVByb21pc2U7XG50cnkge1xuICBuYXRpdmVQcm9taXNlID0gUHJvbWlzZTtcbn0gY2F0Y2goXykge1xuICBuYXRpdmVQcm9taXNlID0gZnVuY3Rpb24oKSB7fTtcbn1cblxuLyoqXG4gKiBDbG9uZXMgKGNvcGllcykgYW4gT2JqZWN0IHVzaW5nIGRlZXAgY29weWluZy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHN1cHBvcnRzIGNpcmN1bGFyIHJlZmVyZW5jZXMgYnkgZGVmYXVsdCwgYnV0IGlmIHlvdSBhcmUgY2VydGFpblxuICogdGhlcmUgYXJlIG5vIGNpcmN1bGFyIHJlZmVyZW5jZXMgaW4geW91ciBvYmplY3QsIHlvdSBjYW4gc2F2ZSBzb21lIENQVSB0aW1lXG4gKiBieSBjYWxsaW5nIGNsb25lKG9iaiwgZmFsc2UpLlxuICpcbiAqIENhdXRpb246IGlmIGBjaXJjdWxhcmAgaXMgZmFsc2UgYW5kIGBwYXJlbnRgIGNvbnRhaW5zIGNpcmN1bGFyIHJlZmVyZW5jZXMsXG4gKiB5b3VyIHByb2dyYW0gbWF5IGVudGVyIGFuIGluZmluaXRlIGxvb3AgYW5kIGNyYXNoLlxuICpcbiAqIEBwYXJhbSBgcGFyZW50YCAtIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkXG4gKiBAcGFyYW0gYGNpcmN1bGFyYCAtIHNldCB0byB0cnVlIGlmIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkIG1heSBjb250YWluXG4gKiAgICBjaXJjdWxhciByZWZlcmVuY2VzLiAob3B0aW9uYWwgLSB0cnVlIGJ5IGRlZmF1bHQpXG4gKiBAcGFyYW0gYGRlcHRoYCAtIHNldCB0byBhIG51bWJlciBpZiB0aGUgb2JqZWN0IGlzIG9ubHkgdG8gYmUgY2xvbmVkIHRvXG4gKiAgICBhIHBhcnRpY3VsYXIgZGVwdGguIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIEluZmluaXR5KVxuICogQHBhcmFtIGBwcm90b3R5cGVgIC0gc2V0cyB0aGUgcHJvdG90eXBlIHRvIGJlIHVzZWQgd2hlbiBjbG9uaW5nIGFuIG9iamVjdC5cbiAqICAgIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIHBhcmVudCBwcm90b3R5cGUpLlxuICogQHBhcmFtIGBpbmNsdWRlTm9uRW51bWVyYWJsZWAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgbm9uLWVudW1lcmFibGUgcHJvcGVydGllc1xuICogICAgc2hvdWxkIGJlIGNsb25lZCBhcyB3ZWxsLiBOb24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9uIHRoZSBwcm90b3R5cGVcbiAqICAgIGNoYWluIHdpbGwgYmUgaWdub3JlZC4gKG9wdGlvbmFsIC0gZmFsc2UgYnkgZGVmYXVsdClcbiovXG5mdW5jdGlvbiBjbG9uZShwYXJlbnQsIGNpcmN1bGFyLCBkZXB0aCwgcHJvdG90eXBlLCBpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICBpZiAodHlwZW9mIGNpcmN1bGFyID09PSAnb2JqZWN0Jykge1xuICAgIGRlcHRoID0gY2lyY3VsYXIuZGVwdGg7XG4gICAgcHJvdG90eXBlID0gY2lyY3VsYXIucHJvdG90eXBlO1xuICAgIGluY2x1ZGVOb25FbnVtZXJhYmxlID0gY2lyY3VsYXIuaW5jbHVkZU5vbkVudW1lcmFibGU7XG4gICAgY2lyY3VsYXIgPSBjaXJjdWxhci5jaXJjdWxhcjtcbiAgfVxuICAvLyBtYWludGFpbiB0d28gYXJyYXlzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzLCB3aGVyZSBjb3JyZXNwb25kaW5nIHBhcmVudHNcbiAgLy8gYW5kIGNoaWxkcmVuIGhhdmUgdGhlIHNhbWUgaW5kZXhcbiAgdmFyIGFsbFBhcmVudHMgPSBbXTtcbiAgdmFyIGFsbENoaWxkcmVuID0gW107XG5cbiAgdmFyIHVzZUJ1ZmZlciA9IHR5cGVvZiBCdWZmZXIgIT0gJ3VuZGVmaW5lZCc7XG5cbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PSAndW5kZWZpbmVkJylcbiAgICBjaXJjdWxhciA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBkZXB0aCA9PSAndW5kZWZpbmVkJylcbiAgICBkZXB0aCA9IEluZmluaXR5O1xuXG4gIC8vIHJlY3Vyc2UgdGhpcyBmdW5jdGlvbiBzbyB3ZSBkb24ndCByZXNldCBhbGxQYXJlbnRzIGFuZCBhbGxDaGlsZHJlblxuICBmdW5jdGlvbiBfY2xvbmUocGFyZW50LCBkZXB0aCkge1xuICAgIC8vIGNsb25pbmcgbnVsbCBhbHdheXMgcmV0dXJucyBudWxsXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGRlcHRoID09PSAwKVxuICAgICAgcmV0dXJuIHBhcmVudDtcblxuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgcHJvdG87XG4gICAgaWYgKHR5cGVvZiBwYXJlbnQgIT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuXG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlTWFwKSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlTWFwKCk7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVNldCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVNldCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVQcm9taXNlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHBhcmVudC50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmVzb2x2ZShfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICByZWplY3QoX2Nsb25lKGVyciwgZGVwdGggLSAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzQXJyYXkocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNSZWdFeHAocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgUmVnRXhwKHBhcmVudC5zb3VyY2UsIF9fZ2V0UmVnRXhwRmxhZ3MocGFyZW50KSk7XG4gICAgICBpZiAocGFyZW50Lmxhc3RJbmRleCkgY2hpbGQubGFzdEluZGV4ID0gcGFyZW50Lmxhc3RJbmRleDtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNEYXRlKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IERhdGUocGFyZW50LmdldFRpbWUoKSk7XG4gICAgfSBlbHNlIGlmICh1c2VCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IEJ1ZmZlcihwYXJlbnQubGVuZ3RoKTtcbiAgICAgIHBhcmVudC5jb3B5KGNoaWxkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgRXJyb3IpKSB7XG4gICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwcm90b3R5cGUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50KTtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcbiAgICAgICAgcHJvdG8gPSBwcm90b3R5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNpcmN1bGFyKSB7XG4gICAgICB2YXIgaW5kZXggPSBhbGxQYXJlbnRzLmluZGV4T2YocGFyZW50KTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiBhbGxDaGlsZHJlbltpbmRleF07XG4gICAgICB9XG4gICAgICBhbGxQYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIGFsbENoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGtleUNoaWxkID0gX2Nsb25lKGtleSwgZGVwdGggLSAxKTtcbiAgICAgICAgdmFyIHZhbHVlQ2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLnNldChrZXlDaGlsZCwgdmFsdWVDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlU2V0KSkge1xuICAgICAgcGFyZW50LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIGVudHJ5Q2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLmFkZChlbnRyeUNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgaW4gcGFyZW50KSB7XG4gICAgICB2YXIgYXR0cnM7XG4gICAgICBpZiAocHJvdG8pIHtcbiAgICAgICAgYXR0cnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJzICYmIGF0dHJzLnNldCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2hpbGRbaV0gPSBfY2xvbmUocGFyZW50W2ldLCBkZXB0aCAtIDEpO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBEb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IGNsb25pbmcgYSBzeW1ib2wgYmVjYXVzZSBpdCBpcyBhIHByaW1pdGl2ZSxcbiAgICAgICAgLy8gbGlrZSBhIG51bWJlciBvciBzdHJpbmcuXG4gICAgICAgIHZhciBzeW1ib2wgPSBzeW1ib2xzW2ldO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBzeW1ib2wpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmICFpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3N5bWJvbF0gPSBfY2xvbmUocGFyZW50W3N5bWJvbF0sIGRlcHRoIC0gMSk7XG4gICAgICAgIGlmICghZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBzeW1ib2wsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgIHZhciBhbGxQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsUHJvcGVydHlOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gYWxsUHJvcGVydHlOYW1lc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRbcHJvcGVydHlOYW1lXSA9IF9jbG9uZShwYXJlbnRbcHJvcGVydHlOYW1lXSwgZGVwdGggLSAxKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICByZXR1cm4gX2Nsb25lKHBhcmVudCwgZGVwdGgpO1xufVxuXG4vKipcbiAqIFNpbXBsZSBmbGF0IGNsb25lIHVzaW5nIHByb3RvdHlwZSwgYWNjZXB0cyBvbmx5IG9iamVjdHMsIHVzZWZ1bGwgZm9yIHByb3BlcnR5XG4gKiBvdmVycmlkZSBvbiBGTEFUIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChubyBuZXN0ZWQgcHJvcHMpLlxuICpcbiAqIFVTRSBXSVRIIENBVVRJT04hIFRoaXMgbWF5IG5vdCBiZWhhdmUgYXMgeW91IHdpc2ggaWYgeW91IGRvIG5vdCBrbm93IGhvdyB0aGlzXG4gKiB3b3Jrcy5cbiAqL1xuY2xvbmUuY2xvbmVQcm90b3R5cGUgPSBmdW5jdGlvbiBjbG9uZVByb3RvdHlwZShwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgYyA9IGZ1bmN0aW9uICgpIHt9O1xuICBjLnByb3RvdHlwZSA9IHBhcmVudDtcbiAgcmV0dXJuIG5ldyBjKCk7XG59O1xuXG4vLyBwcml2YXRlIHV0aWxpdHkgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIF9fb2JqVG9TdHIobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuY2xvbmUuX19vYmpUb1N0ciA9IF9fb2JqVG9TdHI7XG5cbmZ1bmN0aW9uIF9faXNEYXRlKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5jbG9uZS5fX2lzRGF0ZSA9IF9faXNEYXRlO1xuXG5mdW5jdGlvbiBfX2lzQXJyYXkobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5jbG9uZS5fX2lzQXJyYXkgPSBfX2lzQXJyYXk7XG5cbmZ1bmN0aW9uIF9faXNSZWdFeHAobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuY2xvbmUuX19pc1JlZ0V4cCA9IF9faXNSZWdFeHA7XG5cbmZ1bmN0aW9uIF9fZ2V0UmVnRXhwRmxhZ3MocmUpIHtcbiAgdmFyIGZsYWdzID0gJyc7XG4gIGlmIChyZS5nbG9iYWwpIGZsYWdzICs9ICdnJztcbiAgaWYgKHJlLmlnbm9yZUNhc2UpIGZsYWdzICs9ICdpJztcbiAgaWYgKHJlLm11bHRpbGluZSkgZmxhZ3MgKz0gJ20nO1xuICByZXR1cm4gZmxhZ3M7XG59XG5jbG9uZS5fX2dldFJlZ0V4cEZsYWdzID0gX19nZXRSZWdFeHBGbGFncztcblxucmV0dXJuIGNsb25lO1xufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY2xvbmUvY2xvbmUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHVybERyb3Bkb3duIGZyb20gJy4vY29tcG9uZW50cy91cmwtZHJvcGRvd24vdXJsLWRyb3Bkb3duJztcbmltcG9ydCBsYXp5TG9hZCBmcm9tICcuL2NvbXBvbmVudHMvbGF6eS1sb2FkL2xhenktbG9hZCc7XG5pbXBvcnQgYWNjb3JkaW9uIGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvYWNjb3JkaW9uXCI7XG5pbXBvcnQgdmlkZW9QcmV2aWV3IGZyb20gXCIuL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3XCI7XG5pbXBvcnQgbmF2TW9iaWxlIGZyb20gXCIuL2NvbXBvbmVudHMvbmF2LW1vYmlsZVwiO1xuaW1wb3J0IHRhYnMgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy90YWJzXCI7XG5pbXBvcnQgbGlua2VkQ29udGVudCBmcm9tIFwiLi9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2xpbmtlZC1jb250ZW50XCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAgIGxpbmtlZENvbnRlbnQsXG4gICAgdGFicyxcbiAgICBhY2NvcmRpb24sXG4gICAgdmlkZW9QcmV2aWV3LFxuICAgIGxhenlMb2FkLFxuICAgIHVybERyb3Bkb3duLFxuICAgIG5hdk1vYmlsZVxuXTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnQtbGlzdC5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCBmaW5kSGVhZGluZ3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1zZWN0aW9ucyc7XG5pbXBvcnQgcHJlcGFyZUNvbnRlbnQgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1jb250ZW50JztcbmltcG9ydCBwcmVwYXJlQWNjb3JkaW9uSGVhZGluZ3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1hY2NvcmRpb24taGVhZGluZ3MnO1xuaW1wb3J0IHByZXBhcmVMaW5rcyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWxpbmtzJztcblxuZnVuY3Rpb24gbGF1bmNoKGVsLCBpKSB7XG4gICAgbGV0IHdpZGdldCA9ICQoZWwpO1xuICAgIGxldCBjb250ZW50ID0gcHJlcGFyZUNvbnRlbnQoY2xhc3NOYW1lLCB3aWRnZXQpO1xuICAgIGxldCBoZWFkaW5ncyA9IGZpbmRIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgY29udGVudCk7XG5cbiAgICBwcmVwYXJlQWNjb3JkaW9uSGVhZGluZ3MoY2xhc3NOYW1lLCB3aWRnZXQsIGksIGhlYWRpbmdzKTtcbiAgICBwcmVwYXJlTGlua3MoaGVhZGluZ3MsIG51bGwsIHRydWUsIHRydWUpO1xufVxuXG5jb25zdCBjbGFzc05hbWUgPSAnYWNjb3JkaW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxhdW5jaCxcbiAgICBjbGFzc05hbWVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2FjY29yZGlvbi5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCBmaW5kSGVhZGluZ3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1zZWN0aW9ucyc7XG5pbXBvcnQgcHJlcGFyZUNvbnRlbnQgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1jb250ZW50JztcbmltcG9ydCBwcmVwYXJlTWVudSBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLW1lbnUnO1xuaW1wb3J0IHByZXBhcmVMaW5rcyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWxpbmtzJztcbmltcG9ydCBzY3JvbGxlZEludG9WaWV3IGZyb20gJy4uLy4uL2pzLXV0aWxzL3Njcm9sbGVkLWludG8tdmlldyc7XG5pbXBvcnQge2luaXRNb3ZlSW50b1ZpZXd9IGZyb20gJy4uLy4uL2pzLXV0aWxzL21vdmUtaW50by12aWV3LWluLWNvbnRhaW5lcic7XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICdsaW5rZWQtY29udGVudCc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCwgaSkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgY29udGVudCA9IHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KTtcbiAgICBsZXQgaGVhZGluZ3MgPSBmaW5kSGVhZGluZ3MoY2xhc3NOYW1lLCB3aWRnZXQsIGNvbnRlbnQpO1xuXG4gICAgbGV0IG1lbnUgPSBwcmVwYXJlTWVudShjbGFzc05hbWUsIHdpZGdldCwgaSwgaGVhZGluZ3MsIGNvbnRlbnQsIHRydWUpO1xuICAgIGxldCBhY3RpdmF0ZUl0ZW0gPSBwcmVwYXJlTGlua3MoaGVhZGluZ3MsIG1lbnUsIGZhbHNlLCB0cnVlLCBoZWFkaW5ncy5sZW5ndGggPiAwICYmIGhlYWRpbmdzWzBdLmlkKTtcblxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICBsZXQgYmVzdCA9IGhlYWRpbmdzXG4gICAgICAgICAgICAubWFwKCh7aXRlbX0pID0+IHNjcm9sbGVkSW50b1ZpZXcoaXRlbSwgd2lkZ2V0KSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1heEluZGV4LCB2LCBpLCBhcnIpID0+IHYgPiBhcnJbbWF4SW5kZXhdID8gaSA6IG1heEluZGV4LCAwKTtcblxuICAgICAgICBhY3RpdmF0ZUl0ZW0oaGVhZGluZ3NbYmVzdF0uaWQpO1xuICAgIH0pO1xuXG4gICAgaW5pdE1vdmVJbnRvVmlldyhtZW51KTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGF1bmNoLFxuICAgIGNsYXNzTmFtZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvbGlua2VkLWNvbnRlbnQuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgZmluZEhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtc2VjdGlvbnMnO1xuaW1wb3J0IHByZXBhcmVDb250ZW50IGZyb20gJy4vY29tbW9uL3ByZXBhcmUtY29udGVudCc7XG5pbXBvcnQgcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzJztcbmltcG9ydCBwcmVwYXJlTWVudSBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLW1lbnUnO1xuaW1wb3J0IHByZXBhcmVMaW5rcyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWxpbmtzJztcblxuY29uc3QgY2xhc3NOYW1lID0gJ3RhYnMnO1xuXG5cbmZ1bmN0aW9uIGxhdW5jaChlbCwgaSkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgY29udGVudCA9IHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KTtcbiAgICBsZXQgaGVhZGluZ3MgPSBmaW5kSGVhZGluZ3MoY2xhc3NOYW1lLCB3aWRnZXQsIGNvbnRlbnQpO1xuXG4gICAgcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBpLCBoZWFkaW5ncyk7XG4gICAgbGV0IG1lbnUgPSBwcmVwYXJlTWVudShjbGFzc05hbWUsIHdpZGdldCwgaSwgaGVhZGluZ3MsIGNvbnRlbnQpO1xuICAgIHByZXBhcmVMaW5rcyhoZWFkaW5ncywgbWVudSwgZmFsc2UsIGZhbHNlLCBoZWFkaW5ncy5sZW5ndGggPiAwICYmIGhlYWRpbmdzWzBdLmlkKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGF1bmNoLFxuICAgIGNsYXNzTmFtZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvdGFicy5qcyIsImltcG9ydCBMYXp5TG9hZCBmcm9tIFwidmFuaWxsYS1sYXp5bG9hZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IExhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6IFwiLmxhenktbG9hZFwiLFxuICAgICAgICBkYXRhX3NyYzogJ3NyYycsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgY2FsbGJhY2tfbG9hZDogaW1nID0+IHtcbiAgICAgICAgICAgIGltZy5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbGF6eS1sb2FkL2xhenktbG9hZC5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IE5hdk1vYmlsZUhvcml6b250YWwgZnJvbSAnLi9uYXYtbW9iaWxlLWhvcml6b250YWwnO1xuaW1wb3J0IE5hdk1vYmlsZVZlcnRpY2FsIGZyb20gJy4vbmF2LW1vYmlsZS12ZXJ0aWNhbCc7XG5pbXBvcnQgTmF2TW9iaWxlU2ltcGxlIGZyb20gJy4vbmF2LW1vYmlsZS1zaW1wbGUnO1xuaW1wb3J0IHt0cmVlLCBjdXJyZW50fSBmcm9tICcuL3BhcnNlLW5hdic7XG5cbmZ1bmN0aW9uIG5hdkNsYXNzKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNDbGFzcygnbmF2LW1vYmlsZS0taG9yaXpvbnRhbCcpKSB7XG4gICAgICAgIHJldHVybiBOYXZNb2JpbGVIb3Jpem9udGFsO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5oYXNDbGFzcygnbmF2LW1vYmlsZS0tc2ltcGxlJykpIHtcbiAgICAgICAgcmV0dXJuIE5hdk1vYmlsZVNpbXBsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTmF2TW9iaWxlVmVydGljYWw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXVuY2goKSB7XG4gICAgbGV0IGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgIGxldCBOYXZNb2JpbGUgPSBuYXZDbGFzcyhlbGVtZW50KTtcbiAgICBsZXQgbmF2ID0gbmV3IE5hdk1vYmlsZShlbGVtZW50LCB0cmVlLCBjdXJyZW50KTtcbiAgICBuYXYubGF1bmNoKCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNsYXNzTmFtZTogJ25hdi1tb2JpbGUnLFxuICAgIGxhdW5jaFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvaW5kZXguanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcblxuZnVuY3Rpb24gbWF4TGV2ZWwocm9vdCkge1xuICAgIHJldHVybiByb290LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCA/IDAgOlxuICAgICAgICAxICsgcm9vdC5jaGlsZHJlbi5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gTWF0aC5tYXgoYWNjLCBtYXhMZXZlbChpdGVtKSksIDApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZNb2JpbGVIb3Jpem9udGFsIHtcbiAgICBjb25zdHJ1Y3RvcihuYXYsIHRyZWUsIGRlZmF1bHRPcGVuKSB7XG4gICAgICAgIHRoaXMubmF2ID0gbmF2O1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCduYXYtbW9iaWxlX19vdmVybGF5JykuYXBwZW5kVG8odGhpcy5uYXYpO1xuICAgICAgICB0aGlzLnRyZWUgPSB0cmVlO1xuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuID0gZGVmYXVsdE9wZW47XG5cbiAgICAgICAgdGhpcy5sZXZlbEVsZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMub3BlbkxldmVscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuYmFja1RvID0gdGhpcy5iYWNrVG8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5sZXZlbERvd24gPSB0aGlzLmxldmVsRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlTmF2ID0gdGhpcy5jbG9zZU5hdi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9wZW5OYXYgPSB0aGlzLm9wZW5OYXYuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBsYXVuY2goKSB7XG4gICAgICAgIGxldCB7YmFja1RvLCBsZXZlbERvd24sIGNsb3NlTmF2LCBvcGVuTmF2fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5uYXYub24oJ2NsaWNrJywgJy5uYXYtbW9iaWxlX190b2dnbGUnLCBldnQgPT4ge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvcGVuTmF2KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmF2Lm9uKCdjbGljaycsICcubmF2LW1vYmlsZV9fY2xvc2UtbGluaycsIGV2dCA9PiB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlTmF2KCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5uYXYub24oJ2NsaWNrJywgJ1tkYXRhLWJhY2stdG9dJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgYmFja1RvKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1iYWNrLXRvJykpKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5hdi5vbignY2xpY2snLCAnW2RhdGEtZG93bi10b10nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICBsZXZlbERvd24ocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWRvd24tdG8nKSksIHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpKSk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlTGV2ZWxzKCk7XG4gICAgfVxuXG4gICAgcHJlcGFyZUxldmVscygpIHtcbiAgICAgICAgbGV0IG1heCA9IG1heExldmVsKHRoaXMudHJlZSk7XG4gICAgICAgIGZvciAobGV0IGxldmVsID0gMDsgbGV2ZWwgPCBtYXg7IGxldmVsKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fbGV2ZWwgbmF2LW1vYmlsZV9fbGV2ZWwtLWwke2xldmVsfWApO1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXInKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1tb2JpbGVfX2Nsb3NlLWxpbmtcIj48c3BhbiBjbGFzcz1cImZhIGZhLWNsb3NlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT4nKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhoZWFkZXIpO1xuXG4gICAgICAgICAgICBoZWFkZXIuYXBwZW5kKCc8YSBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua1wiPjxzcGFuIGNsYXNzPVwibmF2LW1vYmlsZV9fcGFnZS1saW5rX19sYWJlbFwiPjwvc3Bhbj48L2E+Jyk7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1tb2JpbGVfX2dvdG8tbGlua1wiPjxzcGFuIGNsYXNzPVwiZmEgZmEtYW5nbGUtbGVmdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L2E+JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtYmFjay10bycsIGxldmVsIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGhlYWRlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCc8dWw+PC91bD4nKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5sZXZlbEVsZW1lbnRzW2xldmVsXSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV2ZWxEb3duKGxldmVsLCBpbmRleCkge1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5vcGVuTGV2ZWxzW2xldmVsIC0gMV07XG4gICAgICAgIGxldCBpdGVtID0gcGFyZW50LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgdGhpcy5zZXRMZXZlbE1lbnUobGV2ZWwsIGl0ZW0pO1xuICAgICAgICB0aGlzLmdvVG9MZXZlbChsZXZlbCk7XG4gICAgfVxuXG4gICAgYmFja1RvKGxldmVsKSB7XG4gICAgICAgIHRoaXMuZ29Ub0xldmVsKGxldmVsKTtcbiAgICB9XG5cbiAgICBnb1RvTGV2ZWwobGV2ZWwpIHtcbiAgICAgICAgdGhpcy5sZXZlbEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsLS1sZWZ0JywgaSA8IGxldmVsKTtcbiAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsLS1jZW50ZXInLCBpID09PSBsZXZlbCk7XG4gICAgICAgICAgICBlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtbW9iaWxlX19sZXZlbC0tcmlnaHQnLCBpID4gbGV2ZWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvcGVuTmF2KCkge1xuICAgICAgICB0aGlzLm5hdi5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuLmZvckVhY2goKGl0ZW0sIGkpID0+IHRoaXMuc2V0TGV2ZWxNZW51KGksIGl0ZW0pKTtcbiAgICAgICAgdGhpcy5nb1RvTGV2ZWwodGhpcy5kZWZhdWx0T3Blbi5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBjbG9zZU5hdigpIHtcbiAgICAgICAgdGhpcy5uYXYucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICB9XG5cbiAgICBzZXRMZXZlbE1lbnUobGV2ZWwsIGl0ZW0pIHtcbiAgICAgICAgbGV0IGxldmVsRWxlbWVudCA9IHRoaXMubGV2ZWxFbGVtZW50c1tsZXZlbF07XG4gICAgICAgIHRoaXMub3BlbkxldmVsc1tsZXZlbF0gPSBpdGVtO1xuXG4gICAgICAgIGlmIChpdGVtLm5hbWUpIHtcbiAgICAgICAgICAgIGxldmVsRWxlbWVudC5maW5kKCcubmF2LW1vYmlsZV9fbGV2ZWxfX2hlYWRlciAubmF2LW1vYmlsZV9fcGFnZS1saW5rJylcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsIGl0ZW0udXJsICsgbG9jYXRpb24uc2VhcmNoKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10MCBuYXYtbW9iaWxlX19wYWdlLWxpbmstLXQxIG5hdi1tb2JpbGVfX3BhZ2UtbGluay0tdDInKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10JHtpdGVtLnR5cGV9YCk7XG5cbiAgICAgICAgICAgIGxldmVsRWxlbWVudC5maW5kKCcubmF2LW1vYmlsZV9fbGV2ZWxfX2hlYWRlciAubmF2LW1vYmlsZV9fcGFnZS1saW5rX19sYWJlbCcpXG4gICAgICAgICAgICAgICAgLmh0bWwoaXRlbS5uYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVsID0gbGV2ZWxFbGVtZW50LmNoaWxkcmVuKCd1bCcpO1xuICAgICAgICB1bC5lbXB0eSgpO1xuXG5cbiAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGkgPSAkKCc8bGk+PC9saT4nKS5hcHBlbmRUbyh1bCk7XG4gICAgICAgICAgICAkKCc8YSBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua1wiPjwvYT4nKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10JHtpdGVtLnR5cGV9YClcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsIGl0ZW0udXJsICsgbG9jYXRpb24uc2VhcmNoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJuYXYtbW9iaWxlX19wYWdlLWxpbmtfX2xhYmVsXCI+PC9zcGFuPicpLmh0bWwoaXRlbS5uYW1lKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obGkpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQoJzxhIGNsYXNzPVwibmF2LW1vYmlsZV9fZ290by1saW5rXCIgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImZhIGZhLWFuZ2xlLXJpZ2h0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT4nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1kb3duLXRvJywgbGV2ZWwgKyAxKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1pbmRleCcsIGkpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhsaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9uYXYtbW9iaWxlLWhvcml6b250YWwuanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcbmltcG9ydCBjbG9uZSBmcm9tICdjbG9uZSc7XG5cbmZ1bmN0aW9uIHByZXBhcmVUcmVlSWRzKHRyZWUsIG1hcCwgcGFyZW50SWQgPSBudWxsKSB7XG4gICAgdHJlZS5wYXJlbnRJZCA9IHBhcmVudElkO1xuICAgIHRyZWUuaWQgPSAocGFyZW50SWQgPyBwYXJlbnRJZCArICcuJyA6ICcnKSArIHRyZWUuaW5kZXg7XG4gICAgbWFwW3RyZWUuaWRdID0gdHJlZTtcbiAgICB0cmVlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gcHJlcGFyZVRyZWVJZHMoY2hpbGQsIG1hcCwgdHJlZS5pZCkpO1xufVxuXG5mdW5jdGlvbiBpc1Njcm9sbGVkSW50b1ZpZXcoZWwpIHtcbiAgICB2YXIgZWxlbVRvcCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICB2YXIgZWxlbUJvdHRvbSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcblxuICAgIHZhciBpc1Zpc2libGUgPSAoZWxlbVRvcCA+PSAwKSAmJiAoZWxlbUJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHJldHVybiBpc1Zpc2libGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdk1vYmlsZVNpbXBsZSB7XG4gICAgY29uc3RydWN0b3IobmF2LCB0cmVlLCBkZWZhdWx0T3Blbikge1xuICAgICAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnbmF2LW1vYmlsZV9fb3ZlcmxheScpLmFwcGVuZFRvKHRoaXMubmF2KTtcbiAgICAgICAgdGhpcy50cmVlID0gY2xvbmUodHJlZSk7XG5cbiAgICAgICAgdGhpcy50b2dnbGVJdGVtID0gdGhpcy50b2dnbGVJdGVtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2VOYXYgPSB0aGlzLmNsb3NlTmF2LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub3Blbk5hdiA9IHRoaXMub3Blbk5hdi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubGV2ZWxNYXAgPSB7fTtcbiAgICAgICAgcHJlcGFyZVRyZWVJZHModGhpcy50cmVlLCB0aGlzLmxldmVsTWFwKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuID0gW3RoaXMudHJlZS5pZF07XG4gICAgICAgIGRlZmF1bHRPcGVuXG4gICAgICAgICAgICAuc2xpY2UoMSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHtjaGlsZHJlbn0pID0+IGNoaWxkcmVuLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAuZm9yRWFjaCgoe2luZGV4fSwgaSkgPT4gdGhpcy5kZWZhdWx0T3Blbi5wdXNoKHRoaXMubGV2ZWxNYXBbdGhpcy5kZWZhdWx0T3BlbltpXV0uY2hpbGRyZW5baW5kZXhdLmlkKSk7XG4gICAgICAgIHRoaXMub3BlbkxldmVscyA9IHRoaXMuZGVmYXVsdE9wZW4ubWFwKHYgPT4gdik7XG4gICAgfVxuXG4gICAgbGF1bmNoKCkge1xuICAgICAgICBsZXQge3RvZ2dsZUl0ZW0sIGNsb3NlTmF2LCBvcGVuTmF2fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5uYXYub24oJ2NsaWNrJywgJy5uYXYtbW9iaWxlX190b2dnbGUnLCBldnQgPT4ge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvcGVuTmF2KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmF2Lm9uKCdjbGljaycsICcubmF2LW1vYmlsZV9fY2xvc2UtbGluaycsIGV2dCA9PiB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlTmF2KCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5uYXYub24oJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZV0nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB0b2dnbGVJdGVtKCQodGhpcykuYXR0cignZGF0YS10b2dnbGUnKSk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQodGhpcy50cmVlKTtcbiAgICB9XG5cblxuICAgIHRvZ2dsZUl0ZW0oaWQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5vcGVuTGV2ZWxzLmluZGV4T2YoaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMub3BlbkxldmVscy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTGV2ZWxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuTGV2ZWxzLnNwbGljZShpbmRleCArIDEsIHRoaXMub3BlbkxldmVscy5sZW5ndGggLSBpbmRleCAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuTGV2ZWxzLnB1c2goaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVMZXZlbHMoKTtcbiAgICB9XG5cbiAgICBvcGVuTmF2KCkge1xuICAgICAgICB0aGlzLm5hdi5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICB0aGlzLm9wZW5MZXZlbHMgPSB0aGlzLmRlZmF1bHRPcGVuLm1hcCh2ID0+IHYpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxldmVscygpO1xuICAgIH1cblxuICAgIGNsb3NlTmF2KCkge1xuICAgICAgICB0aGlzLm5hdi5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgIH1cblxuICAgIHVwZGF0ZUxldmVscygpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRPcGVuID0gdGhpcy5wcmV2aW91c09wZW4gfHwgW107XG4gICAgICAgIGxldCBjdXJyZW50Q2hpbGRyZW4gPSBjdXJyZW50T3Blbi5sZW5ndGggPiAwID8gdGhpcy5sZXZlbE1hcFtjdXJyZW50T3BlbltjdXJyZW50T3Blbi5sZW5ndGggLSAxXV0uY2hpbGRyZW4ubWFwKCh7aWR9KSA9PiBpZCkgOiBbXTtcbiAgICAgICAgdGhpcy5wcmV2aW91c09wZW4gPSBbLi4udGhpcy5vcGVuTGV2ZWxzXTtcblxuICAgICAgICB0aGlzLm92ZXJsYXkuZmluZCgnLm5hdi1tb2JpbGVfX2xldmVsX19oZWFkZXItLXR4JykucmVtb3ZlQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXItLXR4Jyk7XG5cbiAgICAgICAgbGV0IGxhc3RJbmRleCA9IHRoaXMub3BlbkxldmVscy5sZW5ndGggLSAxO1xuICAgICAgICB0aGlzLm92ZXJsYXkuZmluZCgnLm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rIHNwYW4nKS5hZGRDbGFzcygnZmEtcGx1cycpLnJlbW92ZUNsYXNzKCdmYS1taW51cycpO1xuICAgICAgICB0aGlzLm92ZXJsYXkuZmluZCgnLm5hdi1tb2JpbGVfX2xldmVsJykucmVtb3ZlQ2xhc3MoJ29wZW4gbGFzdCcpO1xuXG4gICAgICAgIHRoaXMub3BlbkxldmVscy5mb3JFYWNoKChpZCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmxldmVsTWFwW2lkXTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUl0ZW1FbGVtZW50KGl0ZW0pO1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHRoaXMucHJlcGFyZUl0ZW1FbGVtZW50KGNoaWxkKSk7XG5cbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudC5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGlsZHJlbi5pbmRleE9mKGl0ZW0uaWQpID49IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtLmVsZW1lbnQuY2hpbGRyZW4oJy5uYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyJykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXItLXR4Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpID09PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmVsZW1lbnQuYWRkQ2xhc3MoJ2xhc3QnKTtcbiAgICAgICAgICAgICAgICBpdGVtLmVsZW1lbnQuY2hpbGRyZW4oJy5uYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5uYXYtbW9iaWxlX190b2dnbGUtbGluayBzcGFuJylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1taW51cycpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtcGx1cycpO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKCh7aWQsIGVsZW1lbnR9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50T3Blbi5pbmRleE9mKGlkKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkcmVuKCcubmF2LW1vYmlsZV9fbGV2ZWxfX2hlYWRlcicpLmFkZENsYXNzKCduYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyLS10eCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB0eCA9IHRoaXMub3ZlcmxheS5maW5kKCcubmF2LW1vYmlsZV9fbGV2ZWxfX2hlYWRlci0tdHgnKTtcbiAgICAgICAgaWYgKHR4Lmxlbmd0aCA+IDAgJiYgIWlzU2Nyb2xsZWRJbnRvVmlldyh0eFswXSkpIHtcbiAgICAgICAgICAgIHR4WzBdLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByZXBhcmVJdGVtRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5lbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gaXRlbS5wYXJlbnRJZCA/IHRoaXMubGV2ZWxNYXBbaXRlbS5wYXJlbnRJZF0uY2hpbGRyZW5Db250YWluZXIgOiB0aGlzLm92ZXJsYXk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoYG5hdi1tb2JpbGVfX2xldmVsIG5hdi1tb2JpbGVfX2xldmVsLS1sJHtpdGVtLmxldmVsfWApO1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXInKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwibmF2LW1vYmlsZV9fY2xvc2UtbGlua1wiPjxzcGFuIGNsYXNzPVwiZmEgZmEtY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPicpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhoZWFkZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCc8YSBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua1wiPjwvYT4nKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10JHtpdGVtLnR5cGV9YClcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsIGl0ZW0udXJsICsgbG9jYXRpb24uc2VhcmNoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJuYXYtbW9iaWxlX19wYWdlLWxpbmtfX2xhYmVsXCI+PC9zcGFuPicpLmh0bWwoaXRlbS5uYW1lKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oaGVhZGVyKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBrID0gJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rXCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT4nKTtcbiAgICAgICAgICAgICAgICBrID0gay5hdHRyKCdkYXRhLXRvZ2dsZScsIGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIGsuYXBwZW5kVG8oaGVhZGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHVsID0gJCgnPHVsPjwvdWw+JykuYXBwZW5kVG8oZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuQ29udGFpbmVyID0gdWw7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL25hdi1tb2JpbGUtc2ltcGxlLmpzIiwiaW1wb3J0ICQgZnJvbSBcImNhc2gtZG9tXCI7XG5pbXBvcnQgY2xvbmUgZnJvbSAnY2xvbmUnO1xuaW1wb3J0IHNjcm9sbFRvIGZyb20gJy4uLy4uL2pzLXV0aWxzL3Njcm9sbC10byc7XG5pbXBvcnQgc2Nyb2xsZWRJbnRvVmlldyBmcm9tICcuLi8uLi9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcnO1xuXG5mdW5jdGlvbiBwcmVwYXJlVHJlZUlkcyh0cmVlLCBtYXAsIHBhcmVudElkID0gbnVsbCkge1xuICAgIHRyZWUucGFyZW50SWQgPSBwYXJlbnRJZDtcbiAgICB0cmVlLmlkID0gKHBhcmVudElkID8gcGFyZW50SWQgKyAnLicgOiAnJykgKyB0cmVlLmluZGV4O1xuICAgIG1hcFt0cmVlLmlkXSA9IHRyZWU7XG4gICAgdHJlZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHByZXBhcmVUcmVlSWRzKGNoaWxkLCBtYXAsIHRyZWUuaWQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2TW9iaWxlVmVydGljYWwge1xuICAgIGNvbnN0cnVjdG9yKG5hdiwgdHJlZSwgZGVmYXVsdE9wZW4pIHtcbiAgICAgICAgdGhpcy5uYXYgPSBuYXY7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX292ZXJsYXknKS5hcHBlbmRUbyh0aGlzLm5hdik7XG4gICAgICAgIHRoaXMudHJlZSA9IGNsb25lKHRyZWUpO1xuXG5cbiAgICAgICAgdGhpcy5kZWZhdWx0T3BlbiA9IFt0aGlzLnRyZWVdO1xuICAgICAgICBkZWZhdWx0T3Blbi5zbGljZSgxKS5mb3JFYWNoKCh7aW5kZXh9LCBpKSA9PiB0aGlzLmRlZmF1bHRPcGVuLnB1c2godGhpcy5kZWZhdWx0T3BlbltpXS5jaGlsZHJlbltpbmRleF0pKTtcblxuICAgICAgICB0aGlzLnRvZ2dsZUNoaWxkcmVuID0gdGhpcy50b2dnbGVDaGlsZHJlbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlTmF2ID0gdGhpcy5jbG9zZU5hdi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9wZW5OYXYgPSB0aGlzLm9wZW5OYXYuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmxldmVsTWFwID0ge307XG4gICAgICAgIHByZXBhcmVUcmVlSWRzKHRoaXMudHJlZSwgdGhpcy5sZXZlbE1hcCk7XG4gICAgfVxuXG4gICAgbGF1bmNoKCkge1xuICAgICAgICBsZXQge3RvZ2dsZUNoaWxkcmVuLCBjbG9zZU5hdiwgb3Blbk5hdn0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMubmF2Lm9uKCdjbGljaycsICcubmF2LW1vYmlsZV9fdG9nZ2xlJywgZXZ0ID0+IHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb3Blbk5hdigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5hdi5vbignY2xpY2snLCAnLm5hdi1tb2JpbGVfX2Nsb3NlLWxpbmsnLCBldnQgPT4ge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZU5hdigpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMubmF2Lm9uKCdjbGljaycsICdbZGF0YS10b2dnbGVdJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgdG9nZ2xlQ2hpbGRyZW4oJCh0aGlzKS5hdHRyKCdkYXRhLXRvZ2dsZScpKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByZXBhcmVJdGVtRWxlbWVudCh0aGlzLnRyZWUpO1xuICAgIH1cblxuXG4gICAgdG9nZ2xlQ2hpbGRyZW4oaXRlbSkge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgaXRlbSA9IHRoaXMubGV2ZWxNYXBbaXRlbV07XG5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGFuY2VzdG9ycyA9IGl0ZW0uZWxlbWVudC5wYXJlbnRzKCcubmF2LW1vYmlsZV9fbGV2ZWwnKTtcbiAgICAgICAgICAgIGxldCBzZXRPcGVuID0gIWl0ZW0uZWxlbWVudC5oYXNDbGFzcygnb3BlbicpO1xuXG4gICAgICAgICAgICBpZiAoc2V0T3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5maW5kKCcubmF2LW1vYmlsZV9fbGV2ZWwub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudC50b2dnbGVDbGFzcygnb3BlbicsIHNldE9wZW4pO1xuXG4gICAgICAgICAgICBpdGVtLmVsZW1lbnQuY2hpbGRyZW4oJy5uYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyJykuZmluZCgnLm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rIHNwYW4nKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnX19mYS1wbHVzJywgIXNldE9wZW4pXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdfX2ZhLW1pbnVzJywgc2V0T3Blbik7XG5cbiAgICAgICAgICAgIGlmIChzZXRPcGVuKSB7XG4gICAgICAgICAgICAgICAgYW5jZXN0b3JzLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQoaXRlbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWRJbnRvVmlldyhpdGVtLmVsZW1lbnQpIDwgMSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvKGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuTmF2KCkge1xuICAgICAgICB0aGlzLm5hdi5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVJdGVtRWxlbWVudChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2hpbGRyZW4oaXRlbSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0T3Blblt0aGlzLmRlZmF1bHRPcGVuLmxlbmd0aCAtIDFdLmVsZW1lbnRbMF0uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG5cbiAgICBjbG9zZU5hdigpIHtcbiAgICAgICAgdGhpcy5uYXYucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICB9XG5cblxuICAgIHByZXBhcmVJdGVtRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5lbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gaXRlbS5wYXJlbnRJZCA/IHRoaXMubGV2ZWxNYXBbaXRlbS5wYXJlbnRJZF0uY2hpbGRyZW5Db250YWluZXIgOiB0aGlzLm92ZXJsYXk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoYG5hdi1tb2JpbGVfX2xldmVsIG5hdi1tb2JpbGVfX2xldmVsLS1sJHtpdGVtLmxldmVsfWApO1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXInKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwibmF2LW1vYmlsZV9fY2xvc2UtbGlua1wiPjxzcGFuIGNsYXNzPVwiZmEgZmEtY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPicpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhoZWFkZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCc8YSBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua1wiPjwvYT4nKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10JHtpdGVtLnR5cGV9YClcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsIGl0ZW0udXJsICsgbG9jYXRpb24uc2VhcmNoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJuYXYtbW9iaWxlX19wYWdlLWxpbmtfX2xhYmVsXCI+PC9zcGFuPicpLmh0bWwoaXRlbS5uYW1lKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oaGVhZGVyKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWwgPiAwICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBrID0gJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rXCI+PHNwYW4gY2xhc3M9XCJmYSBfX2ZhLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPicpO1xuICAgICAgICAgICAgICAgIGsgPSBrLmF0dHIoJ2RhdGEtdG9nZ2xlJywgaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgay5hcHBlbmRUbyhoZWFkZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdWwgPSAkKCc8dWw+PC91bD4nKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5Db250YWluZXIgPSB1bDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvbmF2LW1vYmlsZS12ZXJ0aWNhbC5qcyIsImNvbnN0IFBBUlNFX1JFR0VYID0gL15cXHMqKFswLTldKSAoW15cXHNdKykgKFswLTldKSAoLispJC87XG5cbmZ1bmN0aW9uIGxvYWREYXRhKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tb2JpbGVfX2RhdGFcIikuaW5uZXJIVE1MO1xufVxuXG5mdW5jdGlvbiBwYXJzZU5hdihkYXRhKSB7XG4gICAgbGV0IHRyZWUgPSB7XG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIGluZGV4OiBudWxsLFxuICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICB9O1xuXG4gICAgbGV0IGFuY2VzdG9ycyA9IFtdO1xuXG4gICAgZGF0YS5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgIGxldCBtYXRjaCA9IGxpbmUubWF0Y2goUEFSU0VfUkVHRVgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGxldCBbLCBsZXZlbFN0ciwgdXJsLCB0eXBlU3RyLCBuYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgbGV0IGxldmVsID0gcGFyc2VJbnQobGV2ZWxTdHIpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBwYXJzZUludCh0eXBlU3RyKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0ge2xldmVsLCB0eXBlLCB1cmwsIG5hbWUsIGNoaWxkcmVuOiBbXSwgaW5kZXg6IDB9O1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGFuY2VzdG9yc1tsZXZlbCAtIDFdO1xuICAgICAgICAgICAgICAgIGl0ZW0uaW5kZXggPSBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmVlID0gaXRlbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW5jZXN0b3JzW2xldmVsXSA9IGl0ZW07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBjdXJyZW50SGVhZCA9IHRyZWU7XG4gICAgbGV0IGN1cnJlbnQgPSBbXTtcbiAgICB3aGlsZSAoY3VycmVudEhlYWQgJiYgY3VycmVudEhlYWQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjdXJyZW50LnB1c2goY3VycmVudEhlYWQpO1xuICAgICAgICBjdXJyZW50SGVhZCA9IGZpbmRDdXJyZW50KGN1cnJlbnRIZWFkLmNoaWxkcmVuKTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7dHJlZSwgY3VycmVudH07XG59XG5cbmZ1bmN0aW9uIGZpbmRDdXJyZW50KGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV0udHlwZSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmxldCB7dHJlZSwgY3VycmVudH0gPSBwYXJzZU5hdihsb2FkRGF0YSgpKTtcblxuZXhwb3J0IHt0cmVlLCBjdXJyZW50fTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9wYXJzZS1uYXYuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgc2VsZWN0ID0gd2lkZ2V0LmNoaWxkcmVuKCdzZWxlY3QnKTtcblxuICAgIHdpZGdldC5vbignY2hhbmdlJywgJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IHNlbGVjdC5jaGlsZHJlbigpLmVxKHNlbGVjdC5wcm9wKCdzZWxlY3RlZEluZGV4JykpLmF0dHIoJ2RhdGEtdXJsJyk7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsICsgJy9fbm9jYWNoZScgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICd1cmwtZHJvcGRvd24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGF1bmNoLFxuICAgIGNsYXNzTmFtZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bi5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGV4dGVuZCBmcm9tIFwiZXh0ZW5kXCI7XG5pbXBvcnQgY3JlYXRlWW91dHViZVBsYXllciBmcm9tIFwiLi4vLi4vanMtdXRpbHMveW91dHViZS1wbGF5ZXJcIjtcbmltcG9ydCBzY29sbGVkSW50b1ZpZXcgZnJvbSBcIi4uLy4uL2pzLXV0aWxzL3Njcm9sbGVkLWludG8tdmlld1wiO1xuXG5jb25zdCBERUZBVUxUX1BBUkFNUyA9IHtcbiAgICBmcmFtZUJvcmRlcjogXCIwXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRZb3V0dWJlVmlkZW8od3JhcHBlciwge2lkLCBwYXJhbXN9KSB7XG4gICAgbGV0IGlmcmFtZUlkID0gYHl0ZXYtJHtpZH1gO1xuXG4gICAgbGV0IGxpbmsgPSB3cmFwcGVyLmNoaWxkcmVuKCdhJyk7XG4gICAgbGV0IGZhbGxiYWNrUGFyYW1zID0ge1xuICAgICAgICB3aWR0aDogbGluay53aWR0aCgpLFxuICAgICAgICBoZWlnaHQ6IGxpbmsuaGVpZ2h0KClcbiAgICB9O1xuXG4gICAgbGV0IHBsYXllclBhcmFtcyA9IGV4dGVuZCh7fSxcbiAgICAgICAgREVGQVVMVF9QQVJBTVMsXG4gICAgICAgIGZhbGxiYWNrUGFyYW1zLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZpZGVvSWQ6IGlkLFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25Jbml0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJzxkaXYvPicpLmF0dHIoJ2lkJywgaWZyYW1lSWQpLmF0dHIoZmFsbGJhY2tQYXJhbXMpLmluc2VydEJlZm9yZShsaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlYWR5OiBldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCd2aWRlby1wcmV2aWV3LXdyYXBwZXItLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbWVkaWEnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbWVkaWEtLXlvdXR1YmUnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jaGlsZHJlbihgOm5vdCgjJHtpZnJhbWVJZH0pYCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZnJhbWUgPSB3cmFwcGVyLmNoaWxkcmVuKCdpZnJhbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29sbGVkSW50b1ZpZXcoaWZyYW1lKSA8IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBjcmVhdGVZb3V0dWJlUGxheWVyKGlmcmFtZUlkLCBwbGF5ZXJQYXJhbXMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3LXlvdXR1YmUuanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcbmltcG9ydCBnZXREYXRhQXR0cmlidXRlcyBmcm9tIFwiLi4vLi4vanMtdXRpbHMvZ2V0LWRhdGEtYXR0cnNcIjtcbmltcG9ydCBsb2FkWW91dHViZVZpZGVvIGZyb20gXCIuL3ZpZGVvLXByZXZpZXcteW91dHViZVwiO1xuXG5mdW5jdGlvbiBnZXRTZXJ2aWNlKGxpbmspIHtcbiAgICBsZXQgaHJlZiA9IGxpbmsuYXR0cignaHJlZicpIHx8ICcnO1xuICAgIGxldCBwYXJhbXMgPSBnZXREYXRhQXR0cmlidXRlcyhsaW5rKTtcblxuICAgIGxldCB5dE1hdGNoID0gaHJlZi5tYXRjaCgvKD86aHR0cHM/OlxcL1xcLyk/KD86d3d3XFwuKT95b3V0dVxcLj9iZSg/OlxcLmNvbSk/XFwvPy4qKD86d2F0Y2h8ZW1iZWQpPyg/Oi4qdj18dlxcL3xcXC8pKFtcXHdcXC1fXSspXFwmPy8pO1xuICAgIGlmICh5dE1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogJ3lvdXR1YmUnLCBpZDogeXRNYXRjaFsxXSwgcGFyYW1zfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gbGF1bmNoKGVsKSB7XG4gICAgbGV0IGxpbmsgPSAkKGVsKTtcbiAgICBsZXQgc2VydmljZSA9IGdldFNlcnZpY2UobGluayk7XG5cbiAgICBpZiAoc2VydmljZSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gbGluay5wYXJlbnQoKTtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSBudWxsO1xuXG4gICAgICAgIGlmIChwYXJlbnQuaGFzQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlcicpKSB7XG4gICAgICAgICAgICB3cmFwcGVyID0gcGFyZW50O1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5wcm9wKFwidGFnTmFtZVwiKS50b0xvd2VyQ2FzZSgpID09PSAnZmlndXJlJykge1xuICAgICAgICAgICAgd3JhcHBlciA9IHBhcmVudDtcbiAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3JhcHBlciA9ICQoJzxmaWd1cmUvPicpLmFkZENsYXNzKCd2aWRlby1wcmV2aWV3LXdyYXBwZXInKS5pbnNlcnRCZWZvcmUobGluayk7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZChsaW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpbmsub24oJ2NsaWNrJywgZXZ0ID0+IHtcbiAgICAgICAgICAgIGxvYWRWaWRlbyh3cmFwcGVyLCBzZXJ2aWNlKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRWaWRlbyh3cmFwcGVyLCBzZXJ2aWNlKSB7XG4gICAgc3dpdGNoIChzZXJ2aWNlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAneW91dHViZSc6XG4gICAgICAgICAgICByZXR1cm4gbG9hZFlvdXR1YmVWaWRlbyh3cmFwcGVyLCBzZXJ2aWNlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNsYXNzTmFtZTogJ3ZpZGVvLXByZXZpZXcnLFxuICAgIGxhdW5jaFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlldy5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IHBhdHRlcm5zIGZyb20gJy4vY29tcG9uZW50LWxpc3QnO1xuXG5mdW5jdGlvbiBsYXVuY2hQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAocGF0dGVybi5jbGFzc05hbWUpIHtcbiAgICAgICAgbGV0IHtjbGFzc05hbWUsIGxhdW5jaH0gPSBwYXR0ZXJuO1xuICAgICAgICAkKGAuJHtjbGFzc05hbWV9Om5vdCguJHtjbGFzc05hbWV9LW5qcylgKS5lYWNoKGxhdW5jaCk7XG4gICAgfVxufVxuXG5cbiEoZnVuY3Rpb24gKCkge1xuICAgIHBhdHRlcm5zLmZvckVhY2gobGF1bmNoUGF0dGVybik7XG59KCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiY29uc3QgZGF0YUF0dHJSZWdleCA9IC9eZGF0YS0oLispJC87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERhdGFBdHRyaWJ1dGVzKG5vZGUpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShub2RlLmdldCgwKS5hdHRyaWJ1dGVzKS5yZWR1Y2UoKGFjYywgYXR0cikgPT4ge1xuICAgICAgICBsZXQgbWF0Y2ggPSBhdHRyLm5vZGVOYW1lLm1hdGNoKGRhdGFBdHRyUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGFjY1ttYXRjaFsxXV0gPSBhdHRyLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy11dGlscy9nZXQtZGF0YS1hdHRycy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcblxuZnVuY3Rpb24gZWxlbWVudENvbnRlbnRXaWR0aChlbGVtKSB7XG4gICAgbGV0IGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtWzBdKTtcbiAgICByZXR1cm4gZWxlbS53aWR0aCgpIC0gKHBhcnNlRmxvYXQoY3MucGFkZGluZ0xlZnQpICsgcGFyc2VGbG9hdChjcy5wYWRkaW5nUmlnaHQpKSAtIChwYXJzZUZsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyBwYXJzZUZsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUludG9WaWV3SW5Db250YWluZXIoZWxlbSwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGxldCBkb2NWaWV3VG9wID0gd2luZG93LnNjcm9sbFk7XG5cbiAgICBsZXQgcGFyZW50ID0gZWxlbS5wYXJlbnQoKTtcblxuICAgIGxldCBwYXJlbnRUb3AgPSBwYXJlbnQub2Zmc2V0KCkudG9wO1xuICAgIGxldCBwYXJlbnRIZWlnaHQgPSBwYXJlbnQuaGVpZ2h0KCk7XG5cbiAgICBsZXQgZWxlbUhlaWdodCA9IGVsZW0uaGVpZ2h0KCk7XG5cbiAgICBsZXQgY3VycmVudFN0YXR1cyA9IGVsZW0uYXR0cignZGF0YS1taXYtc3RhdHVzJyk7XG5cbiAgICBsZXQgbmV4dFN0YXR1cztcblxuICAgIGlmIChwYXJlbnRUb3AgPj0gZG9jVmlld1RvcCkge1xuICAgICAgICBuZXh0U3RhdHVzID0gJ3QnO1xuICAgIH0gZWxzZSBpZiAocGFyZW50VG9wICsgcGFyZW50SGVpZ2h0IDwgZG9jVmlld1RvcCArIGVsZW1IZWlnaHQpIHtcbiAgICAgICAgbmV4dFN0YXR1cyA9ICdiJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0U3RhdHVzID0gJ20nO1xuICAgIH1cblxuICAgIGlmIChmb3JjZSB8fCBuZXh0U3RhdHVzICE9PSBjdXJyZW50U3RhdHVzKSB7XG4gICAgICAgIGVsZW0uYXR0cignZGF0YS1taXYtc3RhdHVzJywgbmV4dFN0YXR1cyk7XG5cbiAgICAgICAgc3dpdGNoIChuZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2VsZW1lbnRDb250ZW50V2lkdGgocGFyZW50KX1weGAsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7ZWxlbWVudENvbnRlbnRXaWR0aChwYXJlbnQpfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICcwJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1vdmVJbnRvVmlldyhlbGVtKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIG1vdmVJbnRvVmlld0luQ29udGFpbmVyKGVsZW0pO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIG1vdmVJbnRvVmlld0luQ29udGFpbmVyKGVsZW0sIHRydWUpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL21vdmUtaW50by12aWV3LWluLWNvbnRhaW5lci5qcyIsImNvbnN0IFVOTE9BREVEID0gJ1VOTE9BREVEJztcbmNvbnN0IExPQURJTkcgPSAnTE9BRElORyc7XG5jb25zdCBMT0FERUQgPSAnTE9BREVEJztcblxubGV0IGFwaVN0YXR1cyA9IFVOTE9BREVEO1xuXG5sZXQgcGVuZGluZ1BsYXllcnMgPSBbXTtcblxubGV0IHBsYXllcnMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKGlkLCBkYXRhKSB7XG4gICAgaWYgKGFwaVN0YXR1cyA9PT0gTE9BREVEKSB7XG4gICAgICAgIGluaXRQbGF5ZXIoaWQsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBlbmRpbmdQbGF5ZXJzLnB1c2goe2lkLCBkYXRhfSk7XG4gICAgICAgIGlmIChhcGlTdGF0dXMgPT09IFVOTE9BREVEKSB7XG4gICAgICAgICAgICBsb2FkQXBpKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaW5pdFBsYXllcihpZCwgZGF0YSkge1xuICAgIGlmIChkYXRhICYmIGRhdGEuZXZlbnRzICYmIGRhdGEuZXZlbnRzLm9uSW5pdCkge1xuICAgICAgICBkYXRhLmV2ZW50cy5vbkluaXQoKTtcbiAgICB9XG5cbiAgICBsZXQgcGxheWVyID0gbmV3IFlULlBsYXllcihpZCwgZGF0YSk7XG4gICAgcGxheWVyc1tpZF0gPSB7cGxheWVyLCBkYXRhfTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkQXBpKCkge1xuICAgIGFwaVN0YXR1cyA9IExPQURJTkc7XG4gICAgd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwZW5kaW5nUGxheWVycy5mb3JFYWNoKCh7aWQsIGRhdGF9KSA9PiBpbml0UGxheWVyKGlkLCBkYXRhKSk7XG4gICAgfTtcblxuICAgIGxldCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICB0YWcuc3JjID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCI7XG4gICAgbGV0IGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL3lvdXR1YmUtcGxheWVyLmpzIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIHBsYWNlSG9sZGVycyA9IHBsYWNlSG9sZGVyc0NvdW50KGI2NClcblxuICBhcnIgPSBuZXcgQXJyKGxlbiAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYnVmZmVyL34vaXNhcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcblx0aWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcblx0fVxuXG5cdHJldHVybiB0b1N0ci5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzT3duQ29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzSXNQcm90b3R5cGVPZiA9IG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlICYmIGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzT3duQ29uc3RydWN0b3IgJiYgIWhhc0lzUHJvdG90eXBlT2YpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcblx0Ly8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIG9iaikgeyAvKiovIH1cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZTtcblx0dmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblx0dmFyIGkgPSAxO1xuXHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0dmFyIGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH1cblx0aWYgKHRhcmdldCA9PSBudWxsIHx8ICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZXh0ZW5kL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pZWVlNzU0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTE7Yjxhcmd1bWVudHMubGVuZ3RoO2IrKyl7dmFyIGM9YXJndW1lbnRzW2JdO2Zvcih2YXIgZCBpbiBjKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjLGQpJiYoYVtkXT1jW2RdKX1yZXR1cm4gYX0sX3R5cGVvZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oYSl7cmV0dXJuIHR5cGVvZiBhfTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZhLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZhIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBhfTshZnVuY3Rpb24oYSxiKXtcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzP1widW5kZWZpbmVkXCI6X3R5cGVvZihleHBvcnRzKSkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9YigpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYik6YS5MYXp5TG9hZD1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgYT17ZWxlbWVudHNfc2VsZWN0b3I6XCJpbWdcIixjb250YWluZXI6d2luZG93LHRocmVzaG9sZDozMDAsdGhyb3R0bGU6MTUwLGRhdGFfc3JjOlwib3JpZ2luYWxcIixkYXRhX3NyY3NldDpcIm9yaWdpbmFsLXNldFwiLGNsYXNzX2xvYWRpbmc6XCJsb2FkaW5nXCIsY2xhc3NfbG9hZGVkOlwibG9hZGVkXCIsY2xhc3NfZXJyb3I6XCJlcnJvclwiLGNsYXNzX2luaXRpYWw6XCJpbml0aWFsXCIsc2tpcF9pbnZpc2libGU6ITAsY2FsbGJhY2tfbG9hZDpudWxsLGNhbGxiYWNrX2Vycm9yOm51bGwsY2FsbGJhY2tfc2V0Om51bGwsY2FsbGJhY2tfcHJvY2Vzc2VkOm51bGx9LGI9IShcIm9uc2Nyb2xsXCJpbiB3aW5kb3cpfHwvZ2xlYm90Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGM9ZnVuY3Rpb24oYSxiKXthJiZhKGIpfSxkPWZ1bmN0aW9uKGEpe3JldHVybiBhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCt3aW5kb3cucGFnZVlPZmZzZXQtYS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3B9LGU9ZnVuY3Rpb24oYSxiLGMpe3JldHVybihiPT09d2luZG93P3dpbmRvdy5pbm5lckhlaWdodCt3aW5kb3cucGFnZVlPZmZzZXQ6ZChiKStiLm9mZnNldEhlaWdodCk8PWQoYSktY30sZj1mdW5jdGlvbihhKXtyZXR1cm4gYS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldC1hLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnR9LGc9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXdpbmRvdy5pbm5lcldpZHRoO3JldHVybihiPT09d2luZG93P2Qrd2luZG93LnBhZ2VYT2Zmc2V0OmYoYikrZCk8PWYoYSktY30saD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuKGI9PT13aW5kb3c/d2luZG93LnBhZ2VZT2Zmc2V0OmQoYikpPj1kKGEpK2MrYS5vZmZzZXRIZWlnaHR9LGk9ZnVuY3Rpb24oYSxiLGMpe3JldHVybihiPT09d2luZG93P3dpbmRvdy5wYWdlWE9mZnNldDpmKGIpKT49ZihhKStjK2Eub2Zmc2V0V2lkdGh9LGo9ZnVuY3Rpb24oYSxiLGMpe3JldHVybiEoZShhLGIsYyl8fGgoYSxiLGMpfHxnKGEsYixjKXx8aShhLGIsYykpfSxrPWZ1bmN0aW9uKGEsYil7dmFyIGM9bmV3IGEoYiksZD1uZXcgQ3VzdG9tRXZlbnQoXCJMYXp5TG9hZDo6SW5pdGlhbGl6ZWRcIix7ZGV0YWlsOntpbnN0YW5jZTpjfX0pO3dpbmRvdy5kaXNwYXRjaEV2ZW50KGQpfSxsPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5wYXJlbnRFbGVtZW50O2lmKFwiUElDVFVSRVwiPT09Yy50YWdOYW1lKWZvcih2YXIgZD0wO2Q8Yy5jaGlsZHJlbi5sZW5ndGg7ZCsrKXt2YXIgZT1jLmNoaWxkcmVuW2RdO2lmKFwiU09VUkNFXCI9PT1lLnRhZ05hbWUpe3ZhciBmPWUuZGF0YXNldFtiXTtmJiZlLnNldEF0dHJpYnV0ZShcInNyY3NldFwiLGYpfX19LG09ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEudGFnTmFtZSxlPWEuZGF0YXNldFtjXTtpZihcIklNR1wiPT09ZCl7bChhLGIpO3ZhciBmPWEuZGF0YXNldFtiXTtyZXR1cm4gZiYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIixmKSx2b2lkKGUmJmEuc2V0QXR0cmlidXRlKFwic3JjXCIsZSkpfWlmKFwiSUZSQU1FXCI9PT1kKXJldHVybiB2b2lkKGUmJmEuc2V0QXR0cmlidXRlKFwic3JjXCIsZSkpO2UmJihhLnN0eWxlLmJhY2tncm91bmRJbWFnZT1cInVybChcIitlK1wiKVwiKX0sbj1mdW5jdGlvbihiKXt0aGlzLl9zZXR0aW5ncz1fZXh0ZW5kcyh7fSxhLGIpLHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZT10aGlzLl9zZXR0aW5ncy5jb250YWluZXI9PT13aW5kb3c/ZG9jdW1lbnQ6dGhpcy5fc2V0dGluZ3MuY29udGFpbmVyLHRoaXMuX3ByZXZpb3VzTG9vcFRpbWU9MCx0aGlzLl9sb29wVGltZW91dD1udWxsLHRoaXMuX2JvdW5kSGFuZGxlU2Nyb2xsPXRoaXMuaGFuZGxlU2Nyb2xsLmJpbmQodGhpcyksdGhpcy5faXNGaXJzdExvb3A9ITAsd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbCksdGhpcy51cGRhdGUoKX07bi5wcm90b3R5cGU9e19yZXZlYWw6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5fc2V0dGluZ3MsZD1mdW5jdGlvbiBkKCl7YiYmKGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixlKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGQpLGEuY2xhc3NMaXN0LnJlbW92ZShiLmNsYXNzX2xvYWRpbmcpLGEuY2xhc3NMaXN0LmFkZChiLmNsYXNzX2Vycm9yKSxjKGIuY2FsbGJhY2tfZXJyb3IsYSkpfSxlPWZ1bmN0aW9uIGUoKXtiJiYoYS5jbGFzc0xpc3QucmVtb3ZlKGIuY2xhc3NfbG9hZGluZyksYS5jbGFzc0xpc3QuYWRkKGIuY2xhc3NfbG9hZGVkKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIixkKSxjKGIuY2FsbGJhY2tfbG9hZCxhKSl9O1wiSU1HXCIhPT1hLnRhZ05hbWUmJlwiSUZSQU1FXCIhPT1hLnRhZ05hbWV8fChhLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZSksYS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixkKSxhLmNsYXNzTGlzdC5hZGQoYi5jbGFzc19sb2FkaW5nKSksbShhLGIuZGF0YV9zcmNzZXQsYi5kYXRhX3NyYyksYyhiLmNhbGxiYWNrX3NldCxhKX0sX2xvb3BUaHJvdWdoRWxlbWVudHM6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9zZXR0aW5ncyxkPXRoaXMuX2VsZW1lbnRzLGU9ZD9kLmxlbmd0aDowLGY9dm9pZCAwLGc9W10saD10aGlzLl9pc0ZpcnN0TG9vcDtmb3IoZj0wO2Y8ZTtmKyspe3ZhciBpPWRbZl07YS5za2lwX2ludmlzaWJsZSYmbnVsbD09PWkub2Zmc2V0UGFyZW50fHwoYnx8aihpLGEuY29udGFpbmVyLGEudGhyZXNob2xkKSkmJihoJiZpLmNsYXNzTGlzdC5hZGQoYS5jbGFzc19pbml0aWFsKSx0aGlzLl9yZXZlYWwoaSksZy5wdXNoKGYpLGkuZGF0YXNldC53YXNQcm9jZXNzZWQ9ITApfWZvcig7Zy5sZW5ndGg+MDspZC5zcGxpY2UoZy5wb3AoKSwxKSxjKGEuY2FsbGJhY2tfcHJvY2Vzc2VkLGQubGVuZ3RoKTswPT09ZSYmdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKSxoJiYodGhpcy5faXNGaXJzdExvb3A9ITEpfSxfcHVyZ2VFbGVtZW50czpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX2VsZW1lbnRzLGI9YS5sZW5ndGgsYz12b2lkIDAsZD1bXTtmb3IoYz0wO2M8YjtjKyspe2FbY10uZGF0YXNldC53YXNQcm9jZXNzZWQmJmQucHVzaChjKX1mb3IoO2QubGVuZ3RoPjA7KWEuc3BsaWNlKGQucG9wKCksMSl9LF9zdGFydFNjcm9sbEhhbmRsZXI6ZnVuY3Rpb24oKXt0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsfHwodGhpcy5faXNIYW5kbGluZ1Njcm9sbD0hMCx0aGlzLl9zZXR0aW5ncy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuX2JvdW5kSGFuZGxlU2Nyb2xsKSl9LF9zdG9wU2Nyb2xsSGFuZGxlcjpmdW5jdGlvbigpe3RoaXMuX2lzSGFuZGxpbmdTY3JvbGwmJih0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsPSExLHRoaXMuX3NldHRpbmdzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGwpKX0saGFuZGxlU2Nyb2xsOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxiPXRoaXMuX3NldHRpbmdzLnRocm90dGxlOzAhPT1iP2Z1bmN0aW9uKCl7dmFyIGM9ZnVuY3Rpb24oKXsobmV3IERhdGUpLmdldFRpbWUoKX0sZD1jKCksZT1iLShkLWEuX3ByZXZpb3VzTG9vcFRpbWUpO2U8PTB8fGU+Yj8oYS5fbG9vcFRpbWVvdXQmJihjbGVhclRpbWVvdXQoYS5fbG9vcFRpbWVvdXQpLGEuX2xvb3BUaW1lb3V0PW51bGwpLGEuX3ByZXZpb3VzTG9vcFRpbWU9ZCxhLl9sb29wVGhyb3VnaEVsZW1lbnRzKCkpOmEuX2xvb3BUaW1lb3V0fHwoYS5fbG9vcFRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe3RoaXMuX3ByZXZpb3VzTG9vcFRpbWU9YygpLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwsdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpfS5iaW5kKGEpLGUpKX0oKTp0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuX2VsZW1lbnRzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKSksdGhpcy5fcHVyZ2VFbGVtZW50cygpLHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKSx0aGlzLl9zdGFydFNjcm9sbEhhbmRsZXIoKX0sZGVzdHJveTpmdW5jdGlvbigpe3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGwpLHRoaXMuX2xvb3BUaW1lb3V0JiYoY2xlYXJUaW1lb3V0KHRoaXMuX2xvb3BUaW1lb3V0KSx0aGlzLl9sb29wVGltZW91dD1udWxsKSx0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpLHRoaXMuX2VsZW1lbnRzPW51bGwsdGhpcy5fcXVlcnlPcmlnaW5Ob2RlPW51bGwsdGhpcy5fc2V0dGluZ3M9bnVsbH19O3ZhciBvPXdpbmRvdy5sYXp5TG9hZE9wdGlvbnM7cmV0dXJuIG8mJmZ1bmN0aW9uKGEsYil7dmFyIGM9Yi5sZW5ndGg7aWYoYylmb3IodmFyIGQ9MDtkPGM7ZCsrKWsoYSxiW2RdKTtlbHNlIGsoYSxiKX0obixvKSxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3ZhbmlsbGEtbGF6eWxvYWQvZGlzdC9sYXp5bG9hZC50cmFuc3BpbGVkLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9