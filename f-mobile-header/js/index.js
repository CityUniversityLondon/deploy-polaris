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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
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

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _urlDropdown = __webpack_require__(17);

var _urlDropdown2 = _interopRequireDefault(_urlDropdown);

var _lazyLoad = __webpack_require__(13);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

var _accordion = __webpack_require__(10);

var _accordion2 = _interopRequireDefault(_accordion);

var _videoPreview = __webpack_require__(19);

var _videoPreview2 = _interopRequireDefault(_videoPreview);

var _navMobile = __webpack_require__(14);

var _navMobile2 = _interopRequireDefault(_navMobile);

var _tabs = __webpack_require__(12);

var _tabs2 = _interopRequireDefault(_tabs);

var _linkedContent = __webpack_require__(11);

var _linkedContent2 = _interopRequireDefault(_linkedContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_linkedContent2.default, _tabs2.default, _accordion2.default, _videoPreview2.default, _lazyLoad2.default, _urlDropdown2.default, _navMobile2.default];

/***/ }),
/* 10 */
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

var _prepareMenu = __webpack_require__(7);

var _prepareMenu2 = _interopRequireDefault(_prepareMenu);

var _prepareLinks = __webpack_require__(3);

var _prepareLinks2 = _interopRequireDefault(_prepareLinks);

var _scrolledIntoView = __webpack_require__(5);

var _scrolledIntoView2 = _interopRequireDefault(_scrolledIntoView);

var _moveIntoViewInContainer = __webpack_require__(22);

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
/* 13 */
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

var _vanillaLazyload = __webpack_require__(30);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _navMobile = __webpack_require__(15);

var _navMobile2 = _interopRequireDefault(_navMobile);

var _parseNav = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch() {
    var element = (0, _cashDom2.default)(this);
    var nav = new _navMobile2.default(element, _parseNav.tree, _parseNav.current);
    nav.launch();
}

exports.default = {
    className: 'nav-mobile',
    launch: launch
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _clone = __webpack_require__(27);

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

var NavMobile = function () {
    function NavMobile(nav, tree, defaultOpen) {
        var _this = this;

        _classCallCheck(this, NavMobile);

        this.nav = nav;
        this.tree = (0, _clone2.default)(tree);
        this.toggle = nav.find('.nav-mobile__toggle');
        this.menu = nav.find('.nav-mobile__content:not(.nav-mobile__content--nojs)');

        this.defaultOpen = [this.tree];
        defaultOpen.slice(1).forEach(function (_ref, i) {
            var index = _ref.index;
            return _this.defaultOpen.push(_this.defaultOpen[i].children[index]);
        });

        this.toggleChildren = this.toggleChildren.bind(this);

        this.levelMap = {};
        prepareTreeIds(this.tree, this.levelMap);

        var label = this.nav.prev();
        if (label.length > 0 && label.attr('for')) {
            this.toggle = (0, _cashDom2.default)('#' + label.attr('for'));
        }
    }

    _createClass(NavMobile, [{
        key: 'launch',
        value: function launch() {
            var _this2 = this;

            var toggleChildren = this.toggleChildren;


            this.nav.on('click', '[data-toggle]', function (evt) {
                toggleChildren((0, _cashDom2.default)(this).attr('data-toggle'));
                evt.preventDefault();
            });

            this.toggle.on('change', function () {
                if (_this2.toggle.prop('checked')) {
                    _this2.openNav();
                }
            });

            this.prepareItemElement(this.tree);
        }
    }, {
        key: 'toggleChildren',
        value: function toggleChildren(item) {
            var _this3 = this;

            var forceOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (typeof item === 'string') item = this.levelMap[item];

            if (item.children.length > 0) {
                var ancestors = item.element.parents('.nav-mobile__level');
                var setOpen = forceOpen || !item.element.hasClass('open');

                if (setOpen) {
                    this.menu.find('.nav-mobile__level.open').removeClass('open');
                }

                item.element.toggleClass('open', setOpen);

                item.element.children('.nav-mobile__level__header').find('.nav-mobile__toggle-link span').toggleClass('__fa-plus', !setOpen).toggleClass('__fa-minus', setOpen);

                if (setOpen) {
                    ancestors.addClass('open');
                    item.children.forEach(function (item) {
                        return _this3.prepareItemElement(item);
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
            var _this4 = this;

            this.defaultOpen.forEach(function (item) {
                _this4.prepareItemElement(item);
                _this4.toggleChildren(item, true);
            });

            this.defaultOpen[this.defaultOpen.length - 1].element[0].scrollIntoView();
        }
    }, {
        key: 'prepareItemElement',
        value: function prepareItemElement(item) {
            if (!item.element) {
                if (item.parentId) {
                    var container = this.levelMap[item.parentId].childrenContainer;
                    var element = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level nav-mobile__level--l' + item.level).appendTo(container);

                    var header = (0, _cashDom2.default)('<div></div>').addClass('nav-mobile__level__header').appendTo(element);

                    (0, _cashDom2.default)('<a class="nav-mobile__page-link"></a>').addClass('nav-mobile__page-link--t' + item.type).attr('href', item.url + location.search).append((0, _cashDom2.default)('<span class="nav-mobile__page-link__label"></span>').html(item.name)).appendTo(header);

                    if (item.children.length > 0) {
                        var childrenToggle = (0, _cashDom2.default)('<a href="#" class="nav-mobile__toggle-link"><span class="fa __fa-plus" aria-hidden="true"></span></a>');
                        childrenToggle = childrenToggle.attr('data-toggle', item.id);
                        childrenToggle.appendTo(header);
                    }

                    item.element = element;
                } else {
                    item.element = this.menu;
                }

                if (item.children.length > 0) {
                    item.childrenContainer = (0, _cashDom2.default)('<ul></ul>').appendTo(item.element);
                }
            }
        }
    }]);

    return NavMobile;
}();

exports.default = NavMobile;

/***/ }),
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadYoutubeVideo;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _extend = __webpack_require__(28);

var _extend2 = _interopRequireDefault(_extend);

var _youtubePlayer = __webpack_require__(23);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _getDataAttrs = __webpack_require__(21);

var _getDataAttrs2 = _interopRequireDefault(_getDataAttrs);

var _videoPreviewYoutube = __webpack_require__(18);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _componentList = __webpack_require__(9);

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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(24)
var ieee754 = __webpack_require__(29)
var isArray = __webpack_require__(26)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 27 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25).Buffer))

/***/ }),
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _extends=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(a,b){"object"===( false?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=b(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a.LazyLoad=b()}(this,function(){"use strict";var a={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},b=!("onscroll"in window)||/glebot/.test(navigator.userAgent),c=function(a,b){a&&a(b)},d=function(a){return a.getBoundingClientRect().top+window.pageYOffset-a.ownerDocument.documentElement.clientTop},e=function(a,b,c){return(b===window?window.innerHeight+window.pageYOffset:d(b)+b.offsetHeight)<=d(a)-c},f=function(a){return a.getBoundingClientRect().left+window.pageXOffset-a.ownerDocument.documentElement.clientLeft},g=function(a,b,c){var d=window.innerWidth;return(b===window?d+window.pageXOffset:f(b)+d)<=f(a)-c},h=function(a,b,c){return(b===window?window.pageYOffset:d(b))>=d(a)+c+a.offsetHeight},i=function(a,b,c){return(b===window?window.pageXOffset:f(b))>=f(a)+c+a.offsetWidth},j=function(a,b,c){return!(e(a,b,c)||h(a,b,c)||g(a,b,c)||i(a,b,c))},k=function(a,b){var c=new a(b),d=new CustomEvent("LazyLoad::Initialized",{detail:{instance:c}});window.dispatchEvent(d)},l=function(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.dataset[b];f&&e.setAttribute("srcset",f)}}},m=function(a,b,c){var d=a.tagName,e=a.dataset[c];if("IMG"===d){l(a,b);var f=a.dataset[b];return f&&a.setAttribute("srcset",f),void(e&&a.setAttribute("src",e))}if("IFRAME"===d)return void(e&&a.setAttribute("src",e));e&&(a.style.backgroundImage="url("+e+")")},n=function(b){this._settings=_extends({},a,b),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};n.prototype={_reveal:function(a){var b=this._settings,d=function d(){b&&(a.removeEventListener("load",e),a.removeEventListener("error",d),a.classList.remove(b.class_loading),a.classList.add(b.class_error),c(b.callback_error,a))},e=function e(){b&&(a.classList.remove(b.class_loading),a.classList.add(b.class_loaded),a.removeEventListener("load",e),a.removeEventListener("error",d),c(b.callback_load,a))};"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",e),a.addEventListener("error",d),a.classList.add(b.class_loading)),m(a,b.data_srcset,b.data_src),c(b.callback_set,a)},_loopThroughElements:function(){var a=this._settings,d=this._elements,e=d?d.length:0,f=void 0,g=[],h=this._isFirstLoop;for(f=0;f<e;f++){var i=d[f];a.skip_invisible&&null===i.offsetParent||(b||j(i,a.container,a.threshold))&&(h&&i.classList.add(a.class_initial),this._reveal(i),g.push(f),i.dataset.wasProcessed=!0)}for(;g.length>0;)d.splice(g.pop(),1),c(a.callback_processed,d.length);0===e&&this._stopScrollHandler(),h&&(this._isFirstLoop=!1)},_purgeElements:function(){var a=this._elements,b=a.length,c=void 0,d=[];for(c=0;c<b;c++){a[c].dataset.wasProcessed&&d.push(c)}for(;d.length>0;)a.splice(d.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var a=this,b=this._settings.throttle;0!==b?function(){var c=function(){(new Date).getTime()},d=c(),e=b-(d-a._previousLoopTime);e<=0||e>b?(a._loopTimeout&&(clearTimeout(a._loopTimeout),a._loopTimeout=null),a._previousLoopTime=d,a._loopThroughElements()):a._loopTimeout||(a._loopTimeout=setTimeout(function(){this._previousLoopTime=c(),this._loopTimeout=null,this._loopThroughElements()}.bind(a),e))}():this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var o=window.lazyLoadOptions;return o&&function(a,b){var c=b.length;if(c)for(var d=0;d<c;d++)k(a,b[d]);else k(a,b)}(n,o),n});

/***/ }),
/* 31 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDE0MDA4YTFhMzZiMjliZmY2ZTQiLCJ3ZWJwYWNrOi8vLy4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWxpbmtzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL3Njcm9sbC10by5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50LWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2xpbmtlZC1jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF6eS1sb2FkL2xhenktbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvbmF2LW1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL3BhcnNlLW5hdi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy91cmwtZHJvcGRvd24vdXJsLWRyb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlldy15b3V0dWJlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL2dldC1kYXRhLWF0dHJzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9tb3ZlLWludG8tdmlldy1pbi1jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL3lvdXR1YmUtcGxheWVyLmpzIiwid2VicGFjazovLy8uL34vYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYnVmZmVyL34vaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nsb25lL2Nsb25lLmpzIiwid2VicGFjazovLy8uL34vZXh0ZW5kL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZhbmlsbGEtbGF6eWxvYWQvZGlzdC9sYXp5bG9hZC50cmFuc3BpbGVkLm1pbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbImNvbnRlbnRDbiIsImNsYXNzTmFtZSIsImhlYWRpbmdDbiIsImhlYWRpbmdMYWJlbENuIiwiaGVhZGluZ0ljb25DbiIsIm1lbnVDbiIsIm1lbnVXcmFwcGVyQ24iLCJtZW51SXRlbUNuIiwibWVudUl0ZW1MYWJlbENuIiwicHJlcGFyZUNvbnRlbnQiLCJ3aWRnZXQiLCJjb250ZW50Q2xhc3NOYW1lIiwiY29udGVudEVsZW1lbnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsImFkZENsYXNzIiwiYXBwZW5kIiwiYXBwZW5kVG8iLCJkZWFjdGl2YXRlQWxsIiwicHJlcGFyZUxpbmtzIiwiZ2VuQWN0aXZhdGVJdGVtIiwiaGVhZGluZ0FuY2hvcnMiLCJhbGxBbmNob3JzIiwiaWQiLCJzY3JvbGwiLCJmaWx0ZXIiLCJyZW1vdmVDbGFzcyIsImF0dHIiLCJub3QiLCJoZWFkaW5ncyIsIm1lbnUiLCJjYW5EZWFjdGl2YXRlIiwic2Nyb2xsT25BY3RpdmF0ZSIsImFjdGl2YXRlSW5pdGlhbCIsInJlZHVjZSIsImFjYyIsIml0ZW0iLCJhZGQiLCJpcyIsInBhcmVudCIsImZpbmQiLCJhY3RpdmF0ZUl0ZW0iLCJvbiIsImV2dCIsInByZXZlbnREZWZhdWx0IiwiYW5jaG9yIiwiaGFzQ2xhc3MiLCJmaW5kSGVhZGluZ3MiLCJjb250ZW50IiwiaGVhZGluZ1RhZ05hbWUiLCJmaXJzdCIsInByb3AiLCJoZWFkZXJFbGVtZW50cyIsIm1hcCIsImVsZW1lbnQiLCJpIiwiY29udGVudEVsZW1lbnRzIiwibmV4dCIsInB1c2giLCJpbnNlcnRBZnRlciIsInRleHQiLCJodG1sIiwic2Nyb2xsZWRJbnRvVmlldyIsImVsZW0iLCJkb2NWaWV3VG9wIiwid2luZG93Iiwic2Nyb2xsWSIsImRvY1ZpZXdCb3R0b20iLCJpbm5lckhlaWdodCIsImVsZW1Ub3AiLCJvZmZzZXQiLCJ0b3AiLCJlbGVtSGVpZ2h0IiwiaGVpZ2h0IiwiZWxlbUJvdHRvbSIsInZpZXdUb3AiLCJNYXRoIiwibWF4Iiwidmlld0JvdHRvbSIsIm1pbiIsInByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyIsInBhdHRlcm5DbGFzc25hbWUiLCJpbmRleCIsImhlYWRpbmdDbGFzcyIsImFuY2hvcnMiLCJmb3JFYWNoIiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIlRFWFRfTk9ERSIsInNwYW4iLCJlbXB0eSIsImljb24iLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVBdHRyIiwicHJlcGFyZVRhYnNIZWFkaW5ncyIsIndyYXAiLCJ0YWJzQmFyIiwic2Nyb2xsVG8iLCJzY3JvbGxJbnRvVmlldyIsImxhdW5jaCIsImVsIiwiYmVzdCIsIm1heEluZGV4IiwidiIsImFyciIsImVsZW1lbnRzX3NlbGVjdG9yIiwiZGF0YV9zcmMiLCJ0aHJlc2hvbGQiLCJjYWxsYmFja19sb2FkIiwiaW1nIiwic3R5bGUiLCJwYWRkaW5nQm90dG9tIiwibmF2IiwicHJlcGFyZVRyZWVJZHMiLCJ0cmVlIiwicGFyZW50SWQiLCJjaGlsZCIsIk5hdk1vYmlsZSIsImRlZmF1bHRPcGVuIiwidG9nZ2xlIiwic2xpY2UiLCJ0b2dnbGVDaGlsZHJlbiIsImJpbmQiLCJsZXZlbE1hcCIsImxhYmVsIiwicHJldiIsIm9wZW5OYXYiLCJwcmVwYXJlSXRlbUVsZW1lbnQiLCJmb3JjZU9wZW4iLCJhbmNlc3RvcnMiLCJwYXJlbnRzIiwic2V0T3BlbiIsInRvZ2dsZUNsYXNzIiwiY29udGFpbmVyIiwiY2hpbGRyZW5Db250YWluZXIiLCJsZXZlbCIsImhlYWRlciIsInR5cGUiLCJ1cmwiLCJsb2NhdGlvbiIsInNlYXJjaCIsIm5hbWUiLCJjaGlsZHJlblRvZ2dsZSIsIlBBUlNFX1JFR0VYIiwibG9hZERhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwicGFyc2VOYXYiLCJkYXRhIiwic3BsaXQiLCJtYXRjaCIsImxpbmUiLCJsZXZlbFN0ciIsInR5cGVTdHIiLCJwYXJzZUludCIsImN1cnJlbnRIZWFkIiwiY3VycmVudCIsImZpbmRDdXJyZW50IiwibGlzdCIsInNlbGVjdCIsImVxIiwiaHJlZiIsImxvYWRZb3V0dWJlVmlkZW8iLCJERUZBVUxUX1BBUkFNUyIsImZyYW1lQm9yZGVyIiwid3JhcHBlciIsInBhcmFtcyIsImlmcmFtZUlkIiwibGluayIsImZhbGxiYWNrUGFyYW1zIiwid2lkdGgiLCJwbGF5ZXJQYXJhbXMiLCJ2aWRlb0lkIiwiZXZlbnRzIiwib25Jbml0Iiwib25SZWFkeSIsInJlbW92ZSIsInBsYXllciIsInRhcmdldCIsImlmcmFtZSIsInBsYXlWaWRlbyIsInBhdXNlVmlkZW8iLCJnZXRTZXJ2aWNlIiwieXRNYXRjaCIsInNlcnZpY2UiLCJ0b0xvd2VyQ2FzZSIsImxvYWRWaWRlbyIsImxhdW5jaFBhdHRlcm4iLCJwYXR0ZXJuIiwiZWFjaCIsImdldERhdGFBdHRyaWJ1dGVzIiwiZGF0YUF0dHJSZWdleCIsIm5vZGUiLCJBcnJheSIsImZyb20iLCJnZXQiLCJhdHRyaWJ1dGVzIiwibm9kZU5hbWUiLCJub2RlVmFsdWUiLCJtb3ZlSW50b1ZpZXdJbkNvbnRhaW5lciIsImluaXRNb3ZlSW50b1ZpZXciLCJlbGVtZW50Q29udGVudFdpZHRoIiwiY3MiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyc2VGbG9hdCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsImZvcmNlIiwicGFyZW50VG9wIiwicGFyZW50SGVpZ2h0IiwiY3VycmVudFN0YXR1cyIsIm5leHRTdGF0dXMiLCJjc3MiLCJwb3NpdGlvbiIsImJvdHRvbSIsImNyZWF0ZVBsYXllciIsIlVOTE9BREVEIiwiTE9BRElORyIsIkxPQURFRCIsImFwaVN0YXR1cyIsInBlbmRpbmdQbGF5ZXJzIiwicGxheWVycyIsImluaXRQbGF5ZXIiLCJsb2FkQXBpIiwiWVQiLCJQbGF5ZXIiLCJvbllvdVR1YmVJZnJhbWVBUElSZWFkeSIsInRhZyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJmaXJzdFNjcmlwdFRhZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztrRUNoRUE7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLGNBQWM7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLLEVBQUU7O0FBRVA7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esb0ZBQW9GO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1dkRBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFQQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBLFFBQVEsVUFBVTs7QUFFbEI7QUFDQTs7Ozs7OztBQ25GQSwwR0FBd0MsWUFBWSxtQkFBbUIsS0FBSyxtQkFBbUIsc0VBQXNFLFNBQVMsaUZBQWlGLGdCQUFnQixhQUFhLHFHQUFxRyxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0hBQW9MLGlCQUFpQixhQUFhLE9BQU8sZ1RBQWdULDhFQUE4RSxRQUFRLGVBQWUsa0dBQWtHLG1CQUFtQixxRkFBcUYsZUFBZSxvR0FBb0csbUJBQW1CLHdCQUF3Qix1REFBdUQsbUJBQW1CLGtFQUFrRSxtQkFBbUIsaUVBQWlFLG1CQUFtQixnREFBZ0QsaUJBQWlCLDBEQUEwRCxRQUFRLFlBQVksRUFBRSx3QkFBd0IsaUJBQWlCLHNCQUFzQixxQ0FBcUMsb0JBQW9CLEtBQUssb0JBQW9CLHlCQUF5QixtQkFBbUIsZ0NBQWdDLG1CQUFtQiwrQkFBK0IsY0FBYyxPQUFPLG1CQUFtQixzRUFBc0Usd0RBQXdELDBDQUEwQyxlQUFlLDBCQUEwQixtU0FBbVMsYUFBYSxvQkFBb0Isb0NBQW9DLCtKQUErSixnQkFBZ0IsZ0tBQWdLLHlMQUF5TCxpQ0FBaUMsdUZBQXVGLFFBQVEsSUFBSSxLQUFLLFdBQVcsc0tBQXNLLEtBQUssV0FBVyxzREFBc0QsMkRBQTJELDJCQUEyQiw4Q0FBOEMsUUFBUSxJQUFJLEtBQUsscUNBQXFDLEtBQUssV0FBVyxxQkFBcUIsZ0NBQWdDLGdJQUFnSSwrQkFBK0IsbUlBQW1JLHlCQUF5QixxQ0FBcUMsaUJBQWlCLGlCQUFpQixxQkFBcUIsbUNBQW1DLG9MQUFvTCw4RUFBOEUsYUFBYSwrQkFBK0IsbUJBQW1CLGlNQUFpTSxvQkFBb0Isd09BQXdPLDZCQUE2Qix3QkFBd0IsZUFBZSxpQkFBaUIsSUFBSSxjQUFjLFlBQVksUUFBUSxFOzs7Ozs7QUNBcGhLOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDE0MDA4YTFhMzZiMjliZmY2ZTQiLCJcInVzZSBzdHJpY3RcIjtcblxuLyohIGNhc2gtZG9tIDEuMy41LCBodHRwczovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9jYXNoIEBsaWNlbnNlIE1JVCAqL1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290LmNhc2ggPSByb290LiQgPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50LCB3aW4gPSB3aW5kb3csIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIHNsaWNlID0gQXJyYXlQcm90by5zbGljZSwgZmlsdGVyID0gQXJyYXlQcm90by5maWx0ZXIsIHB1c2ggPSBBcnJheVByb3RvLnB1c2g7XG5cbiAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fSwgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgLy8gQHNlZSBodHRwczovL2NyYnVnLmNvbS81Njg0NDhcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IHR5cGVvZiBub29wICYmIGl0ZW0uY2FsbDtcbiAgfSwgaXNTdHJpbmcgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gdHlwZW9mIFwiXCI7XG4gIH07XG5cbiAgdmFyIGlkTWF0Y2ggPSAvXiNbXFx3LV0qJC8sIGNsYXNzTWF0Y2ggPSAvXlxcLltcXHctXSokLywgaHRtbE1hdGNoID0gLzwuKz4vLCBzaW5nbGV0ID0gL15cXHcrJC87XG5cbiAgZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvYztcbiAgICB2YXIgZWxlbXMgPSAoY2xhc3NNYXRjaC50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvci5zbGljZSgxKSkgOiBzaW5nbGV0LnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICByZXR1cm4gZWxlbXM7XG4gIH1cblxuICB2YXIgZnJhZztcbiAgZnVuY3Rpb24gcGFyc2VIVE1MKHN0cikge1xuICAgIGlmICghZnJhZykge1xuICAgICAgZnJhZyA9IGRvYy5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoKTtcbiAgICAgIHZhciBiYXNlID0gZnJhZy5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKTtcbiAgICAgIGJhc2UuaHJlZiA9IGRvYy5sb2NhdGlvbi5ocmVmO1xuICAgICAgZnJhZy5oZWFkLmFwcGVuZENoaWxkKGJhc2UpO1xuICAgIH1cblxuICAgIGZyYWcuYm9keS5pbm5lckhUTUwgPSBzdHI7XG5cbiAgICByZXR1cm4gZnJhZy5ib2R5LmNoaWxkTm9kZXM7XG4gIH1cblxuICBmdW5jdGlvbiBvblJlYWR5KGZuKSB7XG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikge1xuICAgICAgZm4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgYWxyZWFkeSBhIGNhc2ggY29sbGVjdGlvbiwgZG9uJ3QgZG8gYW55IGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgIGlmIChzZWxlY3Rvci5jYXNoICYmIHNlbGVjdG9yICE9PSB3aW4pIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICB2YXIgZWxlbXMgPSBzZWxlY3RvciwgaSA9IDAsIGxlbmd0aDtcblxuICAgIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICAgIGVsZW1zID0gKGlkTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgYW4gSUQgdXNlIHRoZSBmYXN0ZXIgZ2V0RWxlbWVudEJ5SWQgY2hlY2tcbiAgICAgIGRvYy5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgSFRNTCwgcGFyc2UgaXQgaW50byByZWFsIGVsZW1lbnRzXG4gICAgICBwYXJzZUhUTUwoc2VsZWN0b3IpIDpcbiAgICAgIC8vIGVsc2UgdXNlIGBmaW5kYFxuICAgICAgZmluZChzZWxlY3RvciwgY29udGV4dCkpO1xuXG4gICAgICAvLyBJZiBmdW5jdGlvbiwgdXNlIGFzIHNob3J0Y3V0IGZvciBET00gcmVhZHlcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBvblJlYWR5KHNlbGVjdG9yKTtyZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBhIHNpbmdsZSBET00gZWxlbWVudCBpcyBwYXNzZWQgaW4gb3IgcmVjZWl2ZWQgdmlhIElELCByZXR1cm4gdGhlIHNpbmdsZSBlbGVtZW50XG4gICAgaWYgKGVsZW1zLm5vZGVUeXBlIHx8IGVsZW1zID09PSB3aW4pIHtcbiAgICAgIHRoaXNbMF0gPSBlbGVtcztcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJlYXQgbGlrZSBhbiBhcnJheSBhbmQgbG9vcCB0aHJvdWdoIGVhY2ggaXRlbS5cbiAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzW2ldID0gZWxlbXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgfVxuXG4gIHZhciBmbiA9IGNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IEluaXQucHJvdG90eXBlID0geyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICBjYXNoOiB0cnVlLFxuICAgIGxlbmd0aDogMCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHNwbGljZTogQXJyYXlQcm90by5zcGxpY2UsXG4gICAgbWFwOiBBcnJheVByb3RvLm1hcCxcbiAgICBpbml0OiBJbml0XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImNvbnN0cnVjdG9yXCIsIHsgdmFsdWU6IGNhc2ggfSk7XG5cbiAgY2FzaC5wYXJzZUhUTUwgPSBwYXJzZUhUTUw7XG4gIGNhc2gubm9vcCA9IG5vb3A7XG4gIGNhc2guaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gIGNhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcblxuICBjYXNoLmV4dGVuZCA9IGZuLmV4dGVuZCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwge307XG5cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSwgbGVuZ3RoID0gYXJncy5sZW5ndGgsIGkgPSAxO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0aGlzO1xuICAgICAgaSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFhcmdzW2ldKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3NbaV0pIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnc1tpXVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBmdW5jdGlvbiBlYWNoKGNvbGxlY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGwgPSBjb2xsZWN0aW9uLmxlbmd0aCwgaSA9IDA7XG5cbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoY29sbGVjdGlvbltpXSwgY29sbGVjdGlvbltpXSwgaSwgY29sbGVjdGlvbikgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hdGNoZXMoZWwsIHNlbGVjdG9yKSB7XG4gICAgdmFyIG0gPSBlbCAmJiAoZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpO1xuICAgIHJldHVybiAhIW0gJiYgbS5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gKFxuICAgIC8qIFVzZSBicm93c2VyJ3MgYG1hdGNoZXNgIGZ1bmN0aW9uIGlmIHN0cmluZyAqL1xuICAgIGlzU3RyaW5nKHNlbGVjdG9yKSA/IG1hdGNoZXMgOlxuICAgIC8qIE1hdGNoIGEgY2FzaCBlbGVtZW50ICovXG4gICAgc2VsZWN0b3IuY2FzaCA/IGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yLmlzKGVsKTtcbiAgICB9IDpcbiAgICAvKiBEaXJlY3QgY29tcGFyaXNvbiAqL1xuICAgIGZ1bmN0aW9uIChlbCwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBlbCA9PT0gc2VsZWN0b3I7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmlxdWUoY29sbGVjdGlvbikge1xuICAgIHJldHVybiBjYXNoKHNsaWNlLmNhbGwoY29sbGVjdGlvbikuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XG4gICAgfSkpO1xuICB9XG5cbiAgY2FzaC5leHRlbmQoe1xuICAgIG1lcmdlOiBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuICAgICAgdmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLCBpID0gZmlyc3QubGVuZ3RoLCBqID0gMDtcblxuICAgICAgZm9yICg7IGogPCBsZW47IGkrKywgaisrKSB7XG4gICAgICAgIGZpcnN0W2ldID0gc2Vjb25kW2pdO1xuICAgICAgfVxuXG4gICAgICBmaXJzdC5sZW5ndGggPSBpO1xuICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH0sXG5cbiAgICBlYWNoOiBlYWNoLFxuICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgdW5pcXVlOiB1bmlxdWUsXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSxcbiAgICBpc051bWVyaWM6IGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgdWlkID0gY2FzaC51aWQgPSBcIl9jYXNoXCIgKyBEYXRlLm5vdygpO1xuXG4gIGZ1bmN0aW9uIGdldERhdGFDYWNoZShub2RlKSB7XG4gICAgcmV0dXJuIChub2RlW3VpZF0gPSBub2RlW3VpZF0gfHwge30pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGF0YShub2RlLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIChnZXREYXRhQ2FjaGUobm9kZSlba2V5XSA9IHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGEobm9kZSwga2V5KSB7XG4gICAgdmFyIGMgPSBnZXREYXRhQ2FjaGUobm9kZSk7XG4gICAgaWYgKGNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjW2tleV0gPSBub2RlLmRhdGFzZXQgPyBub2RlLmRhdGFzZXRba2V5XSA6IGNhc2gobm9kZSkuYXR0cihcImRhdGEtXCIgKyBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gY1trZXldO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRGF0YShub2RlLCBrZXkpIHtcbiAgICB2YXIgYyA9IGdldERhdGFDYWNoZShub2RlKTtcbiAgICBpZiAoYykge1xuICAgICAgZGVsZXRlIGNba2V5XTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YXNldCkge1xuICAgICAgZGVsZXRlIG5vZGUuZGF0YXNldFtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXNoKG5vZGUpLnJlbW92ZUF0dHIoXCJkYXRhLVwiICsgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBkYXRhOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgPyBnZXREYXRhKHRoaXNbMF0sIG5hbWUpIDogdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHNldERhdGEodiwgbmFtZSwgdmFsdWUpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmVEYXRhOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVEYXRhKHYsIGtleSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIG5vdFdoaXRlTWF0Y2ggPSAvXFxTKy9nO1xuXG4gIGZ1bmN0aW9uIGdldENsYXNzZXMoYykge1xuICAgIHJldHVybiBpc1N0cmluZyhjKSAmJiBjLm1hdGNoKG5vdFdoaXRlTWF0Y2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzQ2xhc3ModiwgYykge1xuICAgIHJldHVybiAodi5jbGFzc0xpc3QgPyB2LmNsYXNzTGlzdC5jb250YWlucyhjKSA6IG5ldyBSZWdFeHAoXCIoXnwgKVwiICsgYyArIFwiKCB8JClcIiwgXCJnaVwiKS50ZXN0KHYuY2xhc3NOYW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKSB7XG4gICAgaWYgKHYuY2xhc3NMaXN0KSB7XG4gICAgICB2LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfSBlbHNlIGlmIChzcGFjZWROYW1lLmluZGV4T2YoXCIgXCIgKyBjICsgXCIgXCIpKSB7XG4gICAgICB2LmNsYXNzTmFtZSArPSBcIiBcIiArIGM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3ModiwgYykge1xuICAgIGlmICh2LmNsYXNzTGlzdCkge1xuICAgICAgdi5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2LmNsYXNzTmFtZSA9IHYuY2xhc3NOYW1lLnJlcGxhY2UoYywgXCJcIik7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcblxuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBzcGFjZWROYW1lID0gXCIgXCIgKyB2LmNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0cjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmdldEF0dHJpYnV0ZSA/IHRoaXNbMF0uZ2V0QXR0cmlidXRlKG5hbWUpIDogdGhpc1swXVtuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAodi5zZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHYuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdltuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXR0cihrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjaGVjayA9IGZhbHNlLCBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcbiAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIGNoZWNrID0gaGFzQ2xhc3ModiwgY2xhc3Nlc1swXSk7XG4gICAgICAgICAgcmV0dXJuICFjaGVjaztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSxcblxuICAgIHByb3A6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXNbMF1bbmFtZV0gOiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICB2W25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9wKGtleSwgbmFtZVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnJlbW92ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgIHYucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB2W25hbWVdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzZXMgPSBnZXRDbGFzc2VzKGMpO1xuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZW1vdmVDbGFzcyh2LCBjKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSA6IHRoaXMpO1xuICAgIH0sXG5cbiAgICByZW1vdmVQcm9wOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBkZWxldGUgdltuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGMsIHN0YXRlKSB7XG4gICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1tzdGF0ZSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oYyk7XG4gICAgICB9XG4gICAgICB2YXIgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG4gICAgICByZXR1cm4gKGNsYXNzZXMgPyB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFyIHNwYWNlZE5hbWUgPSBcIiBcIiArIHYuY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoaGFzQ2xhc3ModiwgYykpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKHYsIGMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9IH0pO1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWRkOiBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB1bmlxdWUoY2FzaC5tZXJnZSh0aGlzLCBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSkpO1xuICAgIH0sXG5cbiAgICBlYWNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIGVhY2godGhpcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGVxOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG4gICAgfSxcblxuICAgIGZpbHRlcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29tcGFyYXRvciA9IChpc0Z1bmN0aW9uKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKSk7XG5cbiAgICAgIHJldHVybiBjYXNoKGZpbHRlci5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKGUsIHNlbGVjdG9yKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZmlyc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxKDApO1xuICAgIH0sXG5cbiAgICBnZXQ6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHNsaWNlLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGluZGV4IDwgMCA/IHRoaXNbaW5kZXggKyB0aGlzLmxlbmd0aF0gOiB0aGlzW2luZGV4XSk7XG4gICAgfSxcblxuICAgIGluZGV4OiBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgdmFyIGNoaWxkID0gZWxlbSA/IGNhc2goZWxlbSlbMF0gOiB0aGlzWzBdLCBjb2xsZWN0aW9uID0gZWxlbSA/IHRoaXMgOiBjYXNoKGNoaWxkKS5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICAgICAgcmV0dXJuIHNsaWNlLmNhbGwoY29sbGVjdGlvbikuaW5kZXhPZihjaGlsZCk7XG4gICAgfSxcblxuICAgIGxhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxKC0xKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIGNhbWVsQ2FzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbWVsUmVnZXggPSAvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIHdoaXRlU3BhY2UgPSAvW1xccy1fXSsvZztcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsUmVnZXgsIGZ1bmN0aW9uIChsZXR0ZXIsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsZXR0ZXJbaW5kZXggPT09IDAgPyBcInRvTG93ZXJDYXNlXCIgOiBcInRvVXBwZXJDYXNlXCJdKCk7XG4gICAgICB9KS5yZXBsYWNlKHdoaXRlU3BhY2UsIFwiXCIpO1xuICAgIH07XG4gIH0oKSk7XG5cbiAgdmFyIGdldFByZWZpeGVkUHJvcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhY2hlID0ge30sIGRvYyA9IGRvY3VtZW50LCBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgc3R5bGUgPSBkaXYuc3R5bGU7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHByb3AgPSBjYW1lbENhc2UocHJvcCk7XG4gICAgICBpZiAoY2FjaGVbcHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgfVxuXG4gICAgICB2YXIgdWNQcm9wID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSksIHByZWZpeGVzID0gW1wid2Via2l0XCIsIFwibW96XCIsIFwibXNcIiwgXCJvXCJdLCBwcm9wcyA9IChwcm9wICsgXCIgXCIgKyAocHJlZml4ZXMpLmpvaW4odWNQcm9wICsgXCIgXCIpICsgdWNQcm9wKS5zcGxpdChcIiBcIik7XG5cbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIGlmIChwIGluIHN0eWxlKSB7XG4gICAgICAgICAgY2FjaGVbcF0gPSBwcm9wID0gY2FjaGVbcHJvcF0gPSBwO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICB9O1xuICB9KCkpO1xuXG4gIGNhc2gucHJlZml4ZWRQcm9wID0gZ2V0UHJlZml4ZWRQcm9wO1xuICBjYXNoLmNhbWVsQ2FzZSA9IGNhbWVsQ2FzZTtcblxuICBmbi5leHRlbmQoe1xuICAgIGNzczogZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgICAgcHJvcCA9IGdldFByZWZpeGVkUHJvcChwcm9wKTtcbiAgICAgICAgcmV0dXJuIChhcmd1bWVudHMubGVuZ3RoID4gMSA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiB2LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0pIDogd2luLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSlbcHJvcF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgICAgICB0aGlzLmNzcyhrZXksIHByb3Bba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBjb21wdXRlKGVsLCBwcm9wKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsWzBdLCBudWxsKVtwcm9wXSwgMTApIHx8IDA7XG4gIH1cblxuICBlYWNoKFtcIldpZHRoXCIsIFwiSGVpZ2h0XCJdLCBmdW5jdGlvbiAodikge1xuICAgIHZhciBsb3dlciA9IHYudG9Mb3dlckNhc2UoKTtcblxuICAgIGZuW2xvd2VyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2xvd2VyXTtcbiAgICB9O1xuXG4gICAgZm5bXCJpbm5lclwiICsgdl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1swXVtcImNsaWVudFwiICsgdl07XG4gICAgfTtcblxuICAgIGZuW1wib3V0ZXJcIiArIHZdID0gZnVuY3Rpb24gKG1hcmdpbnMpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wib2Zmc2V0XCIgKyB2XSArIChtYXJnaW5zID8gY29tcHV0ZSh0aGlzLCBcIm1hcmdpblwiICsgKHYgPT09IFwiV2lkdGhcIiA/IFwiTGVmdFwiIDogXCJUb3BcIikpICsgY29tcHV0ZSh0aGlzLCBcIm1hcmdpblwiICsgKHYgPT09IFwiV2lkdGhcIiA/IFwiUmlnaHRcIiA6IFwiQm90dG9tXCIpKSA6IDApO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQobm9kZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudENhY2hlID0gZ2V0RGF0YShub2RlLCBcIl9jYXNoRXZlbnRzXCIpIHx8IHNldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiLCB7fSk7XG4gICAgZXZlbnRDYWNoZVtldmVudE5hbWVdID0gZXZlbnRDYWNoZVtldmVudE5hbWVdIHx8IFtdO1xuICAgIGV2ZW50Q2FjaGVbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudChub2RlLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGV2ZW50cyA9IGdldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiKSwgZXZlbnRDYWNoZSA9IChldmVudHMgJiYgZXZlbnRzW2V2ZW50TmFtZV0pLCBpbmRleDtcblxuICAgIGlmICghZXZlbnRDYWNoZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgaW5kZXggPSBldmVudENhY2hlLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgZXZlbnRDYWNoZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGV2ZW50Q2FjaGUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50Q2FjaGUgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUV2ZW50KHYsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHJ1bk9uY2UpIHtcbiAgICAgIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgICB2YXIgb3JpZ2luYWxDYWxsYmFjaztcblxuICAgICAgaWYgKCFpc1N0cmluZyhldmVudE5hbWUpKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBldmVudE5hbWUpIHtcbiAgICAgICAgICB0aGlzLm9uKGtleSwgZGVsZWdhdGUsIGV2ZW50TmFtZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVsZWdhdGUpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZGVsZWdhdGU7XG4gICAgICAgIGRlbGVnYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gXCJyZWFkeVwiKSB7XG4gICAgICAgIG9uUmVhZHkoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciB0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModCwgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICByZXR1cm4gKHQgPSBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gdC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrLmNhbGwodCwgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGlmIChydW5PbmNlKSB7XG4gICAgICAgICAgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXJFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGVsZWdhdGUsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbihldmVudE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHJlYWR5OiBvblJlYWR5LFxuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgdmFyIGV2dCA9IGRvYy5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICBldnQuZGF0YSA9IGRhdGE7XG4gICAgICBldnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZW5jb2RlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUyMC9nLCBcIitcIik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZWxlY3RNdWx0aXBsZV8oZWwpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZWFjaChlbC5vcHRpb25zLCBmdW5jdGlvbiAobykge1xuICAgICAgaWYgKG8uc2VsZWN0ZWQpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goby52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXMgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0U2luZ2xlXyhlbCkge1xuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gZWwuc2VsZWN0ZWRJbmRleDtcbiAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA+PSAwID8gZWwub3B0aW9uc1tzZWxlY3RlZEluZGV4XS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWYWx1ZShlbCkge1xuICAgIHZhciB0eXBlID0gZWwudHlwZTtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSBcInNlbGVjdC1vbmVcIjpcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdFNpbmdsZV8oZWwpO1xuICAgICAgY2FzZSBcInNlbGVjdC1tdWx0aXBsZVwiOlxuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0TXVsdGlwbGVfKGVsKTtcbiAgICAgIGNhc2UgXCJyYWRpb1wiOlxuICAgICAgICByZXR1cm4gKGVsLmNoZWNrZWQpID8gZWwudmFsdWUgOiBudWxsO1xuICAgICAgY2FzZSBcImNoZWNrYm94XCI6XG4gICAgICAgIHJldHVybiAoZWwuY2hlY2tlZCkgPyBlbC52YWx1ZSA6IG51bGw7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZWwudmFsdWUgPyBlbC52YWx1ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBxdWVyeSA9IFwiXCI7XG5cbiAgICAgIGVhY2godGhpc1swXS5lbGVtZW50cyB8fCB0aGlzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmRpc2FibGVkIHx8IGVsLnRhZ05hbWUgPT09IFwiRklFTERTRVRcIikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZSA9IGVsLm5hbWU7XG4gICAgICAgIHN3aXRjaCAoZWwudHlwZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgY2FzZSBcImZpbGVcIjpcbiAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICBjYXNlIFwic3VibWl0XCI6XG4gICAgICAgICAgY2FzZSBcImJ1dHRvblwiOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInNlbGVjdC1tdWx0aXBsZVwiOlxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGdldFZhbHVlKGVsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGVuY29kZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGVsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHF1ZXJ5LnN1YnN0cigxKTtcbiAgICB9LFxuXG4gICAgdmFsOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChlbCwgY2hpbGQsIHByZXBlbmQpIHtcbiAgICBpZiAocHJlcGVuZCkge1xuICAgICAgdmFyIGZpcnN0ID0gZWwuY2hpbGROb2Rlc1swXTtcbiAgICAgIGVsLmluc2VydEJlZm9yZShjaGlsZCwgZmlyc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0Q29udGVudChwYXJlbnQsIGNoaWxkLCBwcmVwZW5kKSB7XG4gICAgdmFyIHN0ciA9IGlzU3RyaW5nKGNoaWxkKTtcblxuICAgIGlmICghc3RyICYmIGNoaWxkLmxlbmd0aCkge1xuICAgICAgZWFjaChjaGlsZCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIGluc2VydENvbnRlbnQocGFyZW50LCB2LCBwcmVwZW5kKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVhY2gocGFyZW50LCBzdHIgPyBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaW5zZXJ0QWRqYWNlbnRIVE1MKHByZXBlbmQgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsIGNoaWxkKTtcbiAgICB9IDogZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgIHJldHVybiBpbnNlcnRFbGVtZW50KHYsIChpID09PSAwID8gY2hpbGQgOiBjaGlsZC5jbG9uZU5vZGUodHJ1ZSkpLCBwcmVwZW5kKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QWZ0ZXIodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBhcHBlbmRUbzogZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudChjYXNoKHBhcmVudCksIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBjYXNoKHNlbGVjdG9yKS5pbnNlcnRCZWZvcmUodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaHRtbChcIlwiKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBodG1sOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS5pbm5lckhUTUw7XG4gICAgICB9XG4gICAgICB2YXIgc291cmNlID0gKGNvbnRlbnQubm9kZVR5cGUgPyBjb250ZW50WzBdLm91dGVySFRNTCA6IGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5pbm5lckhUTUwgPSBzb3VyY2U7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuXG4gICAgICBjYXNoKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZSwgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuICAgICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIHNpYmxpbmcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgY2FzaChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIF90aGlzMi5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIGVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50LCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kVG86IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQoY2FzaChwYXJlbnQpLCB0aGlzLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0ZXh0OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGVsLm9mZnNldExlZnQsXG4gICAgICAgIHRvcDogZWwub2Zmc2V0VG9wXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWN0ID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbC5jbGllbnRUb3AsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsLmNsaWVudExlZnRcbiAgICAgIH07XG4gICAgfSxcblxuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5vZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICB9KTtcblxuICBmbi5leHRlbmQoe1xuICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBlbC5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICAgIGVsZW1zID0gdW5pcXVlKGVsZW1zKTtcblxuICAgICAgcmV0dXJuICghc2VsZWN0b3IgPyBlbGVtcyA6IGVsZW1zLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyh2LCBzZWxlY3Rvcik7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3RvciB8fCB0aGlzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIoc2VsZWN0b3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50KCkuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgfSxcblxuICAgIGlzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2ggPSBmYWxzZSwgY29tcGFyYXRvciA9IGdldENvbXBhcmVGdW5jdGlvbihzZWxlY3Rvcik7XG5cbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbWF0Y2ggPSBjb21wYXJhdG9yKGVsLCBzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiAhbWF0Y2g7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0sXG5cbiAgICBmaW5kOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3Iubm9kZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goc2VsZWN0b3IgJiYgdGhpcy5oYXMoc2VsZWN0b3IpLmxlbmd0aCA/IHNlbGVjdG9yIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBmaW5kKHNlbGVjdG9yLCBlbCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUoZWxlbXMpO1xuICAgIH0sXG5cbiAgICBoYXM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIGNvbXBhcmF0b3IgPSAoaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbCkubGVuZ3RoICE9PSAwO1xuICAgICAgfSA6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gZWwuY29udGFpbnMoc2VsZWN0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgICB9LFxuXG4gICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIH0sXG5cbiAgICBub3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiAhY29tcGFyYXRvcihlbCwgc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgcGFyZW50czogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgbGFzdCwgcmVzdWx0ID0gW107XG5cbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBsYXN0ID0gaXRlbTtcblxuICAgICAgICB3aGlsZSAobGFzdCAmJiBsYXN0LnBhcmVudE5vZGUgJiYgbGFzdCAhPT0gZG9jLmJvZHkucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGxhc3QgPSBsYXN0LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IChzZWxlY3RvciAmJiBtYXRjaGVzKGxhc3QsIHNlbGVjdG9yKSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgcHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbiAgICB9LFxuXG4gICAgc2libGluZ3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLCBlbCA9IHRoaXNbMF07XG5cbiAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gaSAhPT0gZWw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cblxuICByZXR1cm4gY2FzaDtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IGNvbnRlbnRDbiA9IGNsYXNzTmFtZSA9PiBgJHtjbGFzc05hbWV9X19jb250ZW50YDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nQ24gPSBjbGFzc05hbWUgPT4gYCR7Y29udGVudENuKGNsYXNzTmFtZSl9X19oZWFkaW5nYDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nTGFiZWxDbiA9IGNsYXNzTmFtZSA9PiBgJHtoZWFkaW5nQ24oY2xhc3NOYW1lKX1fX2xhYmVsYDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nSWNvbkNuID0gY2xhc3NOYW1lID0+IGAke2hlYWRpbmdDbihjbGFzc05hbWUpfV9faWNvbmA7XG5leHBvcnQgY29uc3QgbWVudUNuID0gY2xhc3NOYW1lID0+IGAke2NsYXNzTmFtZX1fX21lbnVgO1xuZXhwb3J0IGNvbnN0IG1lbnVXcmFwcGVyQ24gPSBjbGFzc05hbWUgPT4gYCR7bWVudUNuKGNsYXNzTmFtZSl9LXdyYXBwZXJgO1xuZXhwb3J0IGNvbnN0IG1lbnVJdGVtQ24gPSBjbGFzc05hbWUgPT4gYCR7bWVudUNuKGNsYXNzTmFtZSl9X19pdGVtYDtcbmV4cG9ydCBjb25zdCBtZW51SXRlbUxhYmVsQ24gPSBjbGFzc05hbWUgPT4gYCR7bWVudUl0ZW1DbihjbGFzc05hbWUpfV9fbGFiZWxgO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lcy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCB7Y29udGVudENufSBmcm9tICcuL2VsZW1lbnQtY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KSB7XG4gICAgbGV0IGNvbnRlbnRDbGFzc05hbWUgPSBjb250ZW50Q24oY2xhc3NOYW1lKTtcbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSB3aWRnZXQuY2hpbGRyZW4oYC4ke2NvbnRlbnRDbGFzc05hbWV9YCk7XG5cbiAgICBpZiAoY29udGVudEVsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhjb250ZW50Q2xhc3NOYW1lKS5hcHBlbmQod2lkZ2V0LmNoaWxkcmVuKCkpLmFwcGVuZFRvKHdpZGdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRlbnRFbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWNvbnRlbnQuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgc2Nyb2xsVG8gZnJvbSAnLi4vLi4vLi4vanMtdXRpbHMvc2Nyb2xsLXRvJztcblxuZnVuY3Rpb24gZ2VuQWN0aXZhdGVJdGVtKGhlYWRpbmdBbmNob3JzLCBhbGxBbmNob3JzKSB7XG4gICAgcmV0dXJuIChpZCwgc2Nyb2xsKSA9PiB7XG4gICAgICAgIGFsbEFuY2hvcnMuZmlsdGVyKGBbZGF0YS1pZD1cIiR7aWR9XCJdLmluYWN0aXZlYCkucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICBhbGxBbmNob3JzLmZpbHRlcihgLmFjdGl2ZWApLm5vdChgW2RhdGEtaWQ9XCIke2lkfVwiXWApLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnaW5hY3RpdmUnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICAgICAgc2Nyb2xsVG8oaGVhZGluZ0FuY2hvcnMuZmlsdGVyKGBbZGF0YS1pZD1cIiR7aWR9XCJdYCkpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGVBbGwoYWxsQW5jaG9ycykge1xuICAgIGFsbEFuY2hvcnMuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdpbmFjdGl2ZScpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZUxpbmtzKGhlYWRpbmdzLCBtZW51ID0gbnVsbCwgY2FuRGVhY3RpdmF0ZSA9IGZhbHNlLCBzY3JvbGxPbkFjdGl2YXRlID0gZmFsc2UsIGFjdGl2YXRlSW5pdGlhbCA9IG51bGwpIHtcbiAgICBsZXQgaGVhZGluZ0FuY2hvcnMgPSBoZWFkaW5ncy5yZWR1Y2UoKGFjYywge2l0ZW19KSA9PiBhY2MuYWRkKGl0ZW0uaXMoJ1tkYXRhLWlkXScpID8gaXRlbSA6IGl0ZW0ucGFyZW50KCkpLCAkKCkpO1xuICAgIGxldCBhbGxBbmNob3JzID0gbWVudSA/IGhlYWRpbmdBbmNob3JzLmFkZChtZW51LmZpbmQoJ2FbZGF0YS1pZF0nKSkgOiBoZWFkaW5nQW5jaG9ycztcblxuICAgIGxldCBhY3RpdmF0ZUl0ZW0gPSBnZW5BY3RpdmF0ZUl0ZW0oaGVhZGluZ0FuY2hvcnMsIGFsbEFuY2hvcnMpO1xuXG4gICAgYWxsQW5jaG9ycy5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBhbmNob3IgPSAkKHRoaXMpO1xuICAgICAgICBpZiAoYW5jaG9yLmhhc0NsYXNzKCdpbmFjdGl2ZScpKSB7XG4gICAgICAgICAgICBhY3RpdmF0ZUl0ZW0oJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksIHNjcm9sbE9uQWN0aXZhdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNhbkRlYWN0aXZhdGUpIHtcbiAgICAgICAgICAgIGRlYWN0aXZhdGVBbGwoYWxsQW5jaG9ycyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChhY3RpdmF0ZUluaXRpYWwgIT09IG51bGwpIHtcbiAgICAgICAgYWN0aXZhdGVJdGVtKGFjdGl2YXRlSW5pdGlhbCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3RpdmF0ZUl0ZW07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1saW5rcy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCB7aGVhZGluZ0NufSBmcm9tICcuL2VsZW1lbnQtY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgY29udGVudCkge1xuICAgIGxldCBoZWFkaW5nVGFnTmFtZSA9IGNvbnRlbnQuY2hpbGRyZW4oKS5maXJzdCgpLnByb3AoJ3RhZ05hbWUnKTtcbiAgICBsZXQgaGVhZGVyRWxlbWVudHMgPSBjb250ZW50LmNoaWxkcmVuKGhlYWRpbmdUYWdOYW1lKTtcblxuICAgIHJldHVybiBoZWFkZXJFbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtaWQnLCBpKTtcbiAgICAgICAgbGV0IGNvbnRlbnRFbGVtZW50cyA9IFtdO1xuICAgICAgICBsZXQgbmV4dCA9IGl0ZW0ubmV4dCgpO1xuICAgICAgICB3aGlsZShuZXh0Lmxlbmd0aCA+IDAgJiYgbmV4dC5wcm9wKCd0YWdOYW1lJykgICE9PSBoZWFkaW5nVGFnTmFtZSkge1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnRzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29udGVudCA9ICQoJzxkaXY+PC9kaXY+JykuYXBwZW5kKGNvbnRlbnRFbGVtZW50cykuaW5zZXJ0QWZ0ZXIoaXRlbSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgdGV4dDogaXRlbS5odG1sKCksXG4gICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGxlZEludG9WaWV3KGVsZW0pIHtcbiAgICBsZXQgZG9jVmlld1RvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIGxldCBkb2NWaWV3Qm90dG9tID0gZG9jVmlld1RvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIGxldCBlbGVtVG9wID0gZWxlbS5vZmZzZXQoKS50b3A7XG4gICAgbGV0IGVsZW1IZWlnaHQgPSBlbGVtLmhlaWdodCgpO1xuICAgIGxldCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW1IZWlnaHQ7XG5cbiAgICBsZXQgdmlld1RvcCA9IE1hdGgubWF4KGVsZW1Ub3AsIGRvY1ZpZXdUb3ApO1xuICAgIGxldCB2aWV3Qm90dG9tID0gTWF0aC5taW4oZWxlbUJvdHRvbSwgZG9jVmlld0JvdHRvbSk7XG5cbiAgICByZXR1cm4gKHZpZXdCb3R0b20gLSB2aWV3VG9wKSAvIGVsZW1IZWlnaHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3LmpzIiwiaW1wb3J0ICQgZnJvbSBcImNhc2gtZG9tXCI7XG5pbXBvcnQge2hlYWRpbmdDbiwgaGVhZGluZ0xhYmVsQ24sIGhlYWRpbmdJY29uQ259IGZyb20gJy4vZWxlbWVudC1jbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzKHBhdHRlcm5DbGFzc25hbWUsIHdpZGdldCwgaW5kZXgsIGhlYWRpbmdzKSB7XG4gICAgbGV0IGhlYWRpbmdDbGFzcyA9IGhlYWRpbmdDbihwYXR0ZXJuQ2xhc3NuYW1lKTtcblxuICAgIGxldCBhbmNob3JzID0gW107XG5cbiAgICBoZWFkaW5ncy5mb3JFYWNoKCh7ZWxlbWVudCwgaXRlbSwgdGV4dH0pID0+IHtcbiAgICAgICAgbGV0IGFuY2hvciA9ICQoJzxhLz4nKS5hZGRDbGFzcyhgJHtoZWFkaW5nQ2xhc3N9IGluYWN0aXZlYCk7XG4gICAgICAgIGFuY2hvcnMucHVzaChhbmNob3IpO1xuICAgICAgICBhbmNob3IuYXR0cignaHJlZicsICcjJyk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgZWxlbWVudC5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSAkKCc8c3Bhbi8+Jyk7XG4gICAgICAgICAgICBzcGFuLmh0bWwodGV4dCk7XG4gICAgICAgICAgICBpdGVtLmVtcHR5KCk7XG4gICAgICAgICAgICBzcGFuLmFkZENsYXNzKGhlYWRpbmdMYWJlbENuKHBhdHRlcm5DbGFzc25hbWUpKTtcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKHNwYW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZChpdGVtLmNoaWxkcmVuKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGljb24gPSAkKCc8c3Bhbi8+Jyk7XG4gICAgICAgIGljb24uYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBpY29uLmFkZENsYXNzKGhlYWRpbmdJY29uQ24ocGF0dGVybkNsYXNzbmFtZSkpO1xuICAgICAgICBpdGVtLmFwcGVuZChpY29uKTtcbiAgICAgICAgYW5jaG9yLmluc2VydEJlZm9yZShpdGVtKTtcbiAgICAgICAgYW5jaG9yLmFwcGVuZChpdGVtKTtcbiAgICAgICAgYW5jaG9yLmF0dHIoJ2RhdGEtaWQnLCBpdGVtLmF0dHIoJ2RhdGEtaWQnKSk7XG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cignZGF0YS1pZCcpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGhlYWRpbmdzO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHttZW51Q24sIG1lbnVXcmFwcGVyQ24sIG1lbnVJdGVtQ24sIG1lbnVJdGVtTGFiZWxDbn0gZnJvbSAnLi9lbGVtZW50LWNsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlVGFic0hlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBpLCBoZWFkaW5ncywgY29udGVudCwgd3JhcCA9IGZhbHNlKSB7XG4gICAgbGV0IHRhYnNCYXIgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKG1lbnVDbihjbGFzc05hbWUpKTtcblxuICAgIGhlYWRpbmdzLmZvckVhY2goKHt0ZXh0LCBpZH0pID0+IHtcbiAgICAgICAgbGV0IGFuY2hvciA9ICQoJzxhIGhyZWY9XCIjXCI+PC9hPicpLmFkZENsYXNzKG1lbnVJdGVtQ24oY2xhc3NOYW1lKSkuYWRkQ2xhc3MoJ2luYWN0aXZlJykuYXR0cignZGF0YS1pZCcsIGlkKTtcbiAgICAgICAgJCgnPHNwYW4+PC9zcGFuPicpLmFkZENsYXNzKG1lbnVJdGVtTGFiZWxDbihjbGFzc05hbWUpKS5odG1sKHRleHQpLmFwcGVuZFRvKGFuY2hvcik7XG5cbiAgICAgICAgYW5jaG9yLmFwcGVuZFRvKHRhYnNCYXIpO1xuICAgIH0pO1xuXG4gICAgaWYgKHdyYXApIHtcbiAgICAgICAgJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhtZW51V3JhcHBlckNuKGNsYXNzTmFtZSkpLmFwcGVuZCh0YWJzQmFyKS5pbnNlcnRCZWZvcmUoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFic0Jhci5pbnNlcnRCZWZvcmUoY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhYnNCYXI7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtbWVudS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbFRvKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50WzBdLnNjcm9sbEludG9WaWV3KCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL3Njcm9sbC10by5qcyIsImltcG9ydCB1cmxEcm9wZG93biBmcm9tICcuL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bic7XG5pbXBvcnQgbGF6eUxvYWQgZnJvbSAnLi9jb21wb25lbnRzL2xhenktbG9hZC9sYXp5LWxvYWQnO1xuaW1wb3J0IGFjY29yZGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2FjY29yZGlvblwiO1xuaW1wb3J0IHZpZGVvUHJldmlldyBmcm9tIFwiLi9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlld1wiO1xuaW1wb3J0IG5hdk1vYmlsZSBmcm9tIFwiLi9jb21wb25lbnRzL25hdi1tb2JpbGVcIjtcbmltcG9ydCB0YWJzIGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvdGFic1wiO1xuaW1wb3J0IGxpbmtlZENvbnRlbnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9saW5rZWQtY29udGVudFwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgICBsaW5rZWRDb250ZW50LFxuICAgIHRhYnMsXG4gICAgYWNjb3JkaW9uLFxuICAgIHZpZGVvUHJldmlldyxcbiAgICBsYXp5TG9hZCxcbiAgICB1cmxEcm9wZG93bixcbiAgICBuYXZNb2JpbGVcbl07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50LWxpc3QuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgZmluZEhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtc2VjdGlvbnMnO1xuaW1wb3J0IHByZXBhcmVDb250ZW50IGZyb20gJy4vY29tbW9uL3ByZXBhcmUtY29udGVudCc7XG5pbXBvcnQgcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzJztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCwgaSkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgY29udGVudCA9IHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KTtcbiAgICBsZXQgaGVhZGluZ3MgPSBmaW5kSGVhZGluZ3MoY2xhc3NOYW1lLCB3aWRnZXQsIGNvbnRlbnQpO1xuXG4gICAgcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBpLCBoZWFkaW5ncyk7XG4gICAgcHJlcGFyZUxpbmtzKGhlYWRpbmdzLCBudWxsLCB0cnVlLCB0cnVlKTtcbn1cblxuY29uc3QgY2xhc3NOYW1lID0gJ2FjY29yZGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsYXVuY2gsXG4gICAgY2xhc3NOYW1lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb24uanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgZmluZEhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtc2VjdGlvbnMnO1xuaW1wb3J0IHByZXBhcmVDb250ZW50IGZyb20gJy4vY29tbW9uL3ByZXBhcmUtY29udGVudCc7XG5pbXBvcnQgcHJlcGFyZU1lbnUgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1tZW51JztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5pbXBvcnQgc2Nyb2xsZWRJbnRvVmlldyBmcm9tICcuLi8uLi9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcnO1xuaW1wb3J0IHtpbml0TW92ZUludG9WaWV3fSBmcm9tICcuLi8uLi9qcy11dGlscy9tb3ZlLWludG8tdmlldy1pbi1jb250YWluZXInO1xuXG5jb25zdCBjbGFzc05hbWUgPSAnbGlua2VkLWNvbnRlbnQnO1xuXG5mdW5jdGlvbiBsYXVuY2goZWwsIGkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gJChlbCk7XG4gICAgbGV0IGNvbnRlbnQgPSBwcmVwYXJlQ29udGVudChjbGFzc05hbWUsIHdpZGdldCk7XG4gICAgbGV0IGhlYWRpbmdzID0gZmluZEhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBjb250ZW50KTtcblxuICAgIGxldCBtZW51ID0gcHJlcGFyZU1lbnUoY2xhc3NOYW1lLCB3aWRnZXQsIGksIGhlYWRpbmdzLCBjb250ZW50LCB0cnVlKTtcbiAgICBsZXQgYWN0aXZhdGVJdGVtID0gcHJlcGFyZUxpbmtzKGhlYWRpbmdzLCBtZW51LCBmYWxzZSwgdHJ1ZSwgaGVhZGluZ3MubGVuZ3RoID4gMCAmJiBoZWFkaW5nc1swXS5pZCk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgbGV0IGJlc3QgPSBoZWFkaW5nc1xuICAgICAgICAgICAgLm1hcCgoe2l0ZW19KSA9PiBzY3JvbGxlZEludG9WaWV3KGl0ZW0sIHdpZGdldCkpXG4gICAgICAgICAgICAucmVkdWNlKChtYXhJbmRleCwgdiwgaSwgYXJyKSA9PiB2ID4gYXJyW21heEluZGV4XSA/IGkgOiBtYXhJbmRleCwgMCk7XG5cbiAgICAgICAgYWN0aXZhdGVJdGVtKGhlYWRpbmdzW2Jlc3RdLmlkKTtcbiAgICB9KTtcblxuICAgIGluaXRNb3ZlSW50b1ZpZXcobWVudSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxhdW5jaCxcbiAgICBjbGFzc05hbWVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2xpbmtlZC1jb250ZW50LmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IGZpbmRIZWFkaW5ncyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zJztcbmltcG9ydCBwcmVwYXJlQ29udGVudCBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWNvbnRlbnQnO1xuaW1wb3J0IHByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWFjY29yZGlvbi1oZWFkaW5ncyc7XG5pbXBvcnQgcHJlcGFyZU1lbnUgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1tZW51JztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICd0YWJzJztcblxuXG5mdW5jdGlvbiBsYXVuY2goZWwsIGkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gJChlbCk7XG4gICAgbGV0IGNvbnRlbnQgPSBwcmVwYXJlQ29udGVudChjbGFzc05hbWUsIHdpZGdldCk7XG4gICAgbGV0IGhlYWRpbmdzID0gZmluZEhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBjb250ZW50KTtcblxuICAgIHByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgaSwgaGVhZGluZ3MpO1xuICAgIGxldCBtZW51ID0gcHJlcGFyZU1lbnUoY2xhc3NOYW1lLCB3aWRnZXQsIGksIGhlYWRpbmdzLCBjb250ZW50KTtcbiAgICBwcmVwYXJlTGlua3MoaGVhZGluZ3MsIG1lbnUsIGZhbHNlLCBmYWxzZSwgaGVhZGluZ3MubGVuZ3RoID4gMCAmJiBoZWFkaW5nc1swXS5pZCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxhdW5jaCxcbiAgICBjbGFzc05hbWVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL3RhYnMuanMiLCJpbXBvcnQgTGF6eUxvYWQgZnJvbSBcInZhbmlsbGEtbGF6eWxvYWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIG5ldyBMYXp5TG9hZCh7XG4gICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiBcIi5sYXp5LWxvYWRcIixcbiAgICAgICAgZGF0YV9zcmM6ICdzcmMnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIGNhbGxiYWNrX2xvYWQ6IGltZyA9PiB7XG4gICAgICAgICAgICBpbWcuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2xhenktbG9hZC9sYXp5LWxvYWQuanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcbmltcG9ydCBOYXZNb2JpbGUgZnJvbSAnLi9uYXYtbW9iaWxlJztcbmltcG9ydCB7dHJlZSwgY3VycmVudH0gZnJvbSAnLi9wYXJzZS1uYXYnO1xuXG5cbmZ1bmN0aW9uIGxhdW5jaCgpIHtcbiAgICBsZXQgZWxlbWVudCA9ICQodGhpcyk7XG4gICAgbGV0IG5hdiA9IG5ldyBOYXZNb2JpbGUoZWxlbWVudCwgdHJlZSwgY3VycmVudCk7XG4gICAgbmF2LmxhdW5jaCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xhc3NOYW1lOiAnbmF2LW1vYmlsZScsXG4gICAgbGF1bmNoXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9pbmRleC5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGNsb25lIGZyb20gJ2Nsb25lJztcbmltcG9ydCBzY3JvbGxUbyBmcm9tICcuLi8uLi9qcy11dGlscy9zY3JvbGwtdG8nO1xuaW1wb3J0IHNjcm9sbGVkSW50b1ZpZXcgZnJvbSAnLi4vLi4vanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3JztcblxuZnVuY3Rpb24gcHJlcGFyZVRyZWVJZHModHJlZSwgbWFwLCBwYXJlbnRJZCA9IG51bGwpIHtcbiAgICB0cmVlLnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdHJlZS5pZCA9IChwYXJlbnRJZCA/IHBhcmVudElkICsgJy4nIDogJycpICsgdHJlZS5pbmRleDtcbiAgICBtYXBbdHJlZS5pZF0gPSB0cmVlO1xuICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBwcmVwYXJlVHJlZUlkcyhjaGlsZCwgbWFwLCB0cmVlLmlkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdk1vYmlsZSB7XG4gICAgY29uc3RydWN0b3IobmF2LCB0cmVlLCBkZWZhdWx0T3Blbikge1xuICAgICAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICAgICAgdGhpcy50cmVlID0gY2xvbmUodHJlZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlID0gbmF2LmZpbmQoJy5uYXYtbW9iaWxlX190b2dnbGUnKTtcbiAgICAgICAgdGhpcy5tZW51ID0gbmF2LmZpbmQoJy5uYXYtbW9iaWxlX19jb250ZW50Om5vdCgubmF2LW1vYmlsZV9fY29udGVudC0tbm9qcyknKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuID0gW3RoaXMudHJlZV07XG4gICAgICAgIGRlZmF1bHRPcGVuLnNsaWNlKDEpLmZvckVhY2goKHtpbmRleH0sIGkpID0+IHRoaXMuZGVmYXVsdE9wZW4ucHVzaCh0aGlzLmRlZmF1bHRPcGVuW2ldLmNoaWxkcmVuW2luZGV4XSkpO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlQ2hpbGRyZW4gPSB0aGlzLnRvZ2dsZUNoaWxkcmVuLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5sZXZlbE1hcCA9IHt9O1xuICAgICAgICBwcmVwYXJlVHJlZUlkcyh0aGlzLnRyZWUsIHRoaXMubGV2ZWxNYXApO1xuXG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMubmF2LnByZXYoKTtcbiAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCA+IDAgJiYgbGFiZWwuYXR0cignZm9yJykpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJChgIyR7bGFiZWwuYXR0cignZm9yJyl9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXVuY2goKSB7XG4gICAgICAgIGxldCB7dG9nZ2xlQ2hpbGRyZW59ID0gdGhpcztcblxuICAgICAgICB0aGlzLm5hdi5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlXScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHRvZ2dsZUNoaWxkcmVuKCQodGhpcykuYXR0cignZGF0YS10b2dnbGUnKSk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50b2dnbGUub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5OYXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQodGhpcy50cmVlKTtcbiAgICB9XG5cblxuICAgIHRvZ2dsZUNoaWxkcmVuKGl0ZW0sIGZvcmNlT3BlbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5sZXZlbE1hcFtpdGVtXTtcblxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgYW5jZXN0b3JzID0gaXRlbS5lbGVtZW50LnBhcmVudHMoJy5uYXYtbW9iaWxlX19sZXZlbCcpO1xuICAgICAgICAgICAgbGV0IHNldE9wZW4gPSBmb3JjZU9wZW4gfHwgIWl0ZW0uZWxlbWVudC5oYXNDbGFzcygnb3BlbicpO1xuXG4gICAgICAgICAgICBpZiAoc2V0T3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudS5maW5kKCcubmF2LW1vYmlsZV9fbGV2ZWwub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudC50b2dnbGVDbGFzcygnb3BlbicsIHNldE9wZW4pO1xuXG4gICAgICAgICAgICBpdGVtLmVsZW1lbnQuY2hpbGRyZW4oJy5uYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyJykuZmluZCgnLm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rIHNwYW4nKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnX19mYS1wbHVzJywgIXNldE9wZW4pXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdfX2ZhLW1pbnVzJywgc2V0T3Blbik7XG5cbiAgICAgICAgICAgIGlmIChzZXRPcGVuKSB7XG4gICAgICAgICAgICAgICAgYW5jZXN0b3JzLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQoaXRlbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWRJbnRvVmlldyhpdGVtLmVsZW1lbnQpIDwgMSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvKGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuTmF2KCkge1xuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVJdGVtRWxlbWVudChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2hpbGRyZW4oaXRlbSwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0T3Blblt0aGlzLmRlZmF1bHRPcGVuLmxlbmd0aCAtIDFdLmVsZW1lbnRbMF0uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG5cblxuICAgIHByZXBhcmVJdGVtRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5lbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnRJZCkge1xuICAgICAgICAgICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmxldmVsTWFwW2l0ZW0ucGFyZW50SWRdLmNoaWxkcmVuQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYG5hdi1tb2JpbGVfX2xldmVsIG5hdi1tb2JpbGVfX2xldmVsLS1sJHtpdGVtLmxldmVsfWApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhjb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXInKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICQoJzxhIGNsYXNzPVwibmF2LW1vYmlsZV9fcGFnZS1saW5rXCI+PC9hPicpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10JHtpdGVtLnR5cGV9YClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBpdGVtLnVybCArIGxvY2F0aW9uLnNlYXJjaClcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua19fbGFiZWxcIj48L3NwYW4+JykuaHRtbChpdGVtLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oaGVhZGVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuVG9nZ2xlID0gJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rXCI+PHNwYW4gY2xhc3M9XCJmYSBfX2ZhLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPicpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRvZ2dsZSA9IGNoaWxkcmVuVG9nZ2xlLmF0dHIoJ2RhdGEtdG9nZ2xlJywgaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuVG9nZ2xlLmFwcGVuZFRvKGhlYWRlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5lbGVtZW50ID0gdGhpcy5tZW51O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuQ29udGFpbmVyID0gJCgnPHVsPjwvdWw+JykuYXBwZW5kVG8oaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9uYXYtbW9iaWxlLmpzIiwiY29uc3QgUEFSU0VfUkVHRVggPSAvXlxccyooWzAtOV0pIChbXlxcc10rKSAoWzAtOV0pICguKykkLztcblxuZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1vYmlsZV9fZGF0YVwiKS5pbm5lckhUTUw7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTmF2KGRhdGEpIHtcbiAgICBsZXQgdHJlZSA9IHtcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgaW5kZXg6IG51bGwsXG4gICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgIH07XG5cbiAgICBsZXQgYW5jZXN0b3JzID0gW107XG5cbiAgICBkYXRhLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgICAgbGV0IG1hdGNoID0gbGluZS5tYXRjaChQQVJTRV9SRUdFWCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgbGV0IFssIGxldmVsU3RyLCB1cmwsIHR5cGVTdHIsIG5hbWVdID0gbWF0Y2g7XG4gICAgICAgICAgICBsZXQgbGV2ZWwgPSBwYXJzZUludChsZXZlbFN0cik7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHBhcnNlSW50KHR5cGVTdHIpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7bGV2ZWwsIHR5cGUsIHVybCwgbmFtZSwgY2hpbGRyZW46IFtdLCBpbmRleDogMH07XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gYW5jZXN0b3JzW2xldmVsIC0gMV07XG4gICAgICAgICAgICAgICAgaXRlbS5pbmRleCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyZWUgPSBpdGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbmNlc3RvcnNbbGV2ZWxdID0gaXRlbTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGN1cnJlbnRIZWFkID0gdHJlZTtcbiAgICBsZXQgY3VycmVudCA9IFtdO1xuICAgIHdoaWxlIChjdXJyZW50SGVhZCAmJiBjdXJyZW50SGVhZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGN1cnJlbnQucHVzaChjdXJyZW50SGVhZCk7XG4gICAgICAgIGN1cnJlbnRIZWFkID0gZmluZEN1cnJlbnQoY3VycmVudEhlYWQuY2hpbGRyZW4pO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHt0cmVlLCBjdXJyZW50fTtcbn1cblxuZnVuY3Rpb24gZmluZEN1cnJlbnQobGlzdCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXS50eXBlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxubGV0IHt0cmVlLCBjdXJyZW50fSA9IHBhcnNlTmF2KGxvYWREYXRhKCkpO1xuXG5leHBvcnQge3RyZWUsIGN1cnJlbnR9O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL3BhcnNlLW5hdi5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcblxuZnVuY3Rpb24gbGF1bmNoKGVsKSB7XG4gICAgbGV0IHdpZGdldCA9ICQoZWwpO1xuICAgIGxldCBzZWxlY3QgPSB3aWRnZXQuY2hpbGRyZW4oJ3NlbGVjdCcpO1xuXG4gICAgd2lkZ2V0Lm9uKCdjaGFuZ2UnLCAnc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICBsZXQgdXJsID0gc2VsZWN0LmNoaWxkcmVuKCkuZXEoc2VsZWN0LnByb3AoJ3NlbGVjdGVkSW5kZXgnKSkuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmwgKyAnL19ub2NhY2hlJyArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgY2xhc3NOYW1lID0gJ3VybC1kcm9wZG93bic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsYXVuY2gsXG4gICAgY2xhc3NOYW1lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy91cmwtZHJvcGRvd24vdXJsLWRyb3Bkb3duLmpzIiwiaW1wb3J0ICQgZnJvbSBcImNhc2gtZG9tXCI7XG5pbXBvcnQgZXh0ZW5kIGZyb20gXCJleHRlbmRcIjtcbmltcG9ydCBjcmVhdGVZb3V0dWJlUGxheWVyIGZyb20gXCIuLi8uLi9qcy11dGlscy95b3V0dWJlLXBsYXllclwiO1xuaW1wb3J0IHNjb2xsZWRJbnRvVmlldyBmcm9tIFwiLi4vLi4vanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3XCI7XG5cbmNvbnN0IERFRkFVTFRfUEFSQU1TID0ge1xuICAgIGZyYW1lQm9yZGVyOiBcIjBcIlxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZFlvdXR1YmVWaWRlbyh3cmFwcGVyLCB7aWQsIHBhcmFtc30pIHtcbiAgICBsZXQgaWZyYW1lSWQgPSBgeXRldi0ke2lkfWA7XG5cbiAgICBsZXQgbGluayA9IHdyYXBwZXIuY2hpbGRyZW4oJ2EnKTtcbiAgICBsZXQgZmFsbGJhY2tQYXJhbXMgPSB7XG4gICAgICAgIHdpZHRoOiBsaW5rLndpZHRoKCksXG4gICAgICAgIGhlaWdodDogbGluay5oZWlnaHQoKVxuICAgIH07XG5cbiAgICBsZXQgcGxheWVyUGFyYW1zID0gZXh0ZW5kKHt9LFxuICAgICAgICBERUZBVUxUX1BBUkFNUyxcbiAgICAgICAgZmFsbGJhY2tQYXJhbXMsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgICAgdmlkZW9JZDogaWQsXG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBvbkluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnPGRpdi8+JykuYXR0cignaWQnLCBpZnJhbWVJZCkuYXR0cihmYWxsYmFja1BhcmFtcykuaW5zZXJ0QmVmb3JlKGxpbmspO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCd2aWRlby1wcmV2aWV3LXdyYXBwZXItLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVhZHk6IGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlci0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtZWRpYScpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdtZWRpYS0teW91dHViZScpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNoaWxkcmVuKGA6bm90KCMke2lmcmFtZUlkfSlgKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlmcmFtZSA9IHdyYXBwZXIuY2hpbGRyZW4oJ2lmcmFtZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb2xsZWRJbnRvVmlldyhpZnJhbWUpIDwgMC41KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGNyZWF0ZVlvdXR1YmVQbGF5ZXIoaWZyYW1lSWQsIHBsYXllclBhcmFtcyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy92aWRlby1wcmV2aWV3L3ZpZGVvLXByZXZpZXcteW91dHViZS5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGdldERhdGFBdHRyaWJ1dGVzIGZyb20gXCIuLi8uLi9qcy11dGlscy9nZXQtZGF0YS1hdHRyc1wiO1xuaW1wb3J0IGxvYWRZb3V0dWJlVmlkZW8gZnJvbSBcIi4vdmlkZW8tcHJldmlldy15b3V0dWJlXCI7XG5cbmZ1bmN0aW9uIGdldFNlcnZpY2UobGluaykge1xuICAgIGxldCBocmVmID0gbGluay5hdHRyKCdocmVmJykgfHwgJyc7XG4gICAgbGV0IHBhcmFtcyA9IGdldERhdGFBdHRyaWJ1dGVzKGxpbmspO1xuXG4gICAgbGV0IHl0TWF0Y2ggPSBocmVmLm1hdGNoKC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pP3lvdXR1XFwuP2JlKD86XFwuY29tKT9cXC8/LiooPzp3YXRjaHxlbWJlZCk/KD86Lip2PXx2XFwvfFxcLykoW1xcd1xcLV9dKylcXCY/Lyk7XG4gICAgaWYgKHl0TWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiAneW91dHViZScsIGlkOiB5dE1hdGNoWzFdLCBwYXJhbXN9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBsYXVuY2goZWwpIHtcbiAgICBsZXQgbGluayA9ICQoZWwpO1xuICAgIGxldCBzZXJ2aWNlID0gZ2V0U2VydmljZShsaW5rKTtcblxuICAgIGlmIChzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBsaW5rLnBhcmVudCgpO1xuICAgICAgICBsZXQgd3JhcHBlciA9IG51bGw7XG5cbiAgICAgICAgaWYgKHBhcmVudC5oYXNDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyJykpIHtcbiAgICAgICAgICAgIHdyYXBwZXIgPSBwYXJlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyZW50LnByb3AoXCJ0YWdOYW1lXCIpLnRvTG93ZXJDYXNlKCkgPT09ICdmaWd1cmUnKSB7XG4gICAgICAgICAgICB3cmFwcGVyID0gcGFyZW50O1xuICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3cmFwcGVyID0gJCgnPGZpZ3VyZS8+JykuYWRkQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlcicpLmluc2VydEJlZm9yZShsaW5rKTtcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKGxpbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgbGluay5vbignY2xpY2snLCBldnQgPT4ge1xuICAgICAgICAgICAgbG9hZFZpZGVvKHdyYXBwZXIsIHNlcnZpY2UpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9hZFZpZGVvKHdyYXBwZXIsIHNlcnZpY2UpIHtcbiAgICBzd2l0Y2ggKHNlcnZpY2UudHlwZSkge1xuICAgICAgICBjYXNlICd5b3V0dWJlJzpcbiAgICAgICAgICAgIHJldHVybiBsb2FkWW91dHViZVZpZGVvKHdyYXBwZXIsIHNlcnZpY2UpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xhc3NOYW1lOiAndmlkZW8tcHJldmlldycsXG4gICAgbGF1bmNoXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3LmpzIiwiaW1wb3J0ICQgZnJvbSBcImNhc2gtZG9tXCI7XG5pbXBvcnQgcGF0dGVybnMgZnJvbSAnLi9jb21wb25lbnQtbGlzdCc7XG5cbmZ1bmN0aW9uIGxhdW5jaFBhdHRlcm4ocGF0dGVybikge1xuICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwYXR0ZXJuKCk7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuLmNsYXNzTmFtZSkge1xuICAgICAgICBsZXQge2NsYXNzTmFtZSwgbGF1bmNofSA9IHBhdHRlcm47XG4gICAgICAgICQoYC4ke2NsYXNzTmFtZX06bm90KC4ke2NsYXNzTmFtZX0tbmpzKWApLmVhY2gobGF1bmNoKTtcbiAgICB9XG59XG5cblxuIShmdW5jdGlvbiAoKSB7XG4gICAgcGF0dGVybnMuZm9yRWFjaChsYXVuY2hQYXR0ZXJuKTtcbn0oKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJjb25zdCBkYXRhQXR0clJlZ2V4ID0gL15kYXRhLSguKykkLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RGF0YUF0dHJpYnV0ZXMobm9kZSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5vZGUuZ2V0KDApLmF0dHJpYnV0ZXMpLnJlZHVjZSgoYWNjLCBhdHRyKSA9PiB7XG4gICAgICAgIGxldCBtYXRjaCA9IGF0dHIubm9kZU5hbWUubWF0Y2goZGF0YUF0dHJSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgYWNjW21hdGNoWzFdXSA9IGF0dHIubm9kZVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL2dldC1kYXRhLWF0dHJzLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuXG5mdW5jdGlvbiBlbGVtZW50Q29udGVudFdpZHRoKGVsZW0pIHtcbiAgICBsZXQgY3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1bMF0pO1xuICAgIHJldHVybiBlbGVtLndpZHRoKCkgLSAocGFyc2VGbG9hdChjcy5wYWRkaW5nTGVmdCkgKyBwYXJzZUZsb2F0KGNzLnBhZGRpbmdSaWdodCkpIC0gKHBhcnNlRmxvYXQoY3MuYm9yZGVyTGVmdFdpZHRoKSArIHBhcnNlRmxvYXQoY3MuYm9yZGVyUmlnaHRXaWR0aCkpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlSW50b1ZpZXdJbkNvbnRhaW5lcihlbGVtLCBmb3JjZSA9IGZhbHNlKSB7XG4gICAgbGV0IGRvY1ZpZXdUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGxldCBwYXJlbnQgPSBlbGVtLnBhcmVudCgpO1xuXG4gICAgbGV0IHBhcmVudFRvcCA9IHBhcmVudC5vZmZzZXQoKS50b3A7XG4gICAgbGV0IHBhcmVudEhlaWdodCA9IHBhcmVudC5oZWlnaHQoKTtcblxuICAgIGxldCBlbGVtSGVpZ2h0ID0gZWxlbS5oZWlnaHQoKTtcblxuICAgIGxldCBjdXJyZW50U3RhdHVzID0gZWxlbS5hdHRyKCdkYXRhLW1pdi1zdGF0dXMnKTtcblxuICAgIGxldCBuZXh0U3RhdHVzO1xuXG4gICAgaWYgKHBhcmVudFRvcCA+PSBkb2NWaWV3VG9wKSB7XG4gICAgICAgIG5leHRTdGF0dXMgPSAndCc7XG4gICAgfSBlbHNlIGlmIChwYXJlbnRUb3AgKyBwYXJlbnRIZWlnaHQgPCBkb2NWaWV3VG9wICsgZWxlbUhlaWdodCkge1xuICAgICAgICBuZXh0U3RhdHVzID0gJ2InO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRTdGF0dXMgPSAnbSc7XG4gICAgfVxuXG4gICAgaWYgKGZvcmNlIHx8IG5leHRTdGF0dXMgIT09IGN1cnJlbnRTdGF0dXMpIHtcbiAgICAgICAgZWxlbS5hdHRyKCdkYXRhLW1pdi1zdGF0dXMnLCBuZXh0U3RhdHVzKTtcblxuICAgICAgICBzd2l0Y2ggKG5leHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7ZWxlbWVudENvbnRlbnRXaWR0aChwYXJlbnQpfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtlbGVtZW50Q29udGVudFdpZHRoKHBhcmVudCl9cHhgLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJzAnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0TW92ZUludG9WaWV3KGVsZW0pIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgbW92ZUludG9WaWV3SW5Db250YWluZXIoZWxlbSk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgbW92ZUludG9WaWV3SW5Db250YWluZXIoZWxlbSwgdHJ1ZSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMtdXRpbHMvbW92ZS1pbnRvLXZpZXctaW4tY29udGFpbmVyLmpzIiwiY29uc3QgVU5MT0FERUQgPSAnVU5MT0FERUQnO1xuY29uc3QgTE9BRElORyA9ICdMT0FESU5HJztcbmNvbnN0IExPQURFRCA9ICdMT0FERUQnO1xuXG5sZXQgYXBpU3RhdHVzID0gVU5MT0FERUQ7XG5cbmxldCBwZW5kaW5nUGxheWVycyA9IFtdO1xuXG5sZXQgcGxheWVycyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoaWQsIGRhdGEpIHtcbiAgICBpZiAoYXBpU3RhdHVzID09PSBMT0FERUQpIHtcbiAgICAgICAgaW5pdFBsYXllcihpZCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGVuZGluZ1BsYXllcnMucHVzaCh7aWQsIGRhdGF9KTtcbiAgICAgICAgaWYgKGFwaVN0YXR1cyA9PT0gVU5MT0FERUQpIHtcbiAgICAgICAgICAgIGxvYWRBcGkoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbml0UGxheWVyKGlkLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5ldmVudHMgJiYgZGF0YS5ldmVudHMub25Jbml0KSB7XG4gICAgICAgIGRhdGEuZXZlbnRzLm9uSW5pdCgpO1xuICAgIH1cblxuICAgIGxldCBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGlkLCBkYXRhKTtcbiAgICBwbGF5ZXJzW2lkXSA9IHtwbGF5ZXIsIGRhdGF9O1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRBcGkoKSB7XG4gICAgYXBpU3RhdHVzID0gTE9BRElORztcbiAgICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlbmRpbmdQbGF5ZXJzLmZvckVhY2goKHtpZCwgZGF0YX0pID0+IGluaXRQbGF5ZXIoaWQsIGRhdGEpKTtcbiAgICB9O1xuXG4gICAgbGV0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRhZy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIjtcbiAgICBsZXQgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMtdXRpbHMveW91dHViZS1wbGF5ZXIuanMiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiBiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIobGVuICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICBsID0gcGxhY2VIb2xkZXJzID4gMCA/IGxlbiAtIDQgOiBsZW5cblxuICB2YXIgTCA9IDBcblxuICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gKyBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gKyBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBvdXRwdXQgPSAnJ1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPT0nXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArICh1aW50OFtsZW4gLSAxXSlcbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAxMF1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9J1xuICB9XG5cbiAgcGFydHMucHVzaChvdXRwdXQpXG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9idWZmZXIvfi9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2xvbmUgPSAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnN0YW5jZW9mKG9iaiwgdHlwZSkge1xuICByZXR1cm4gdHlwZSAhPSBudWxsICYmIG9iaiBpbnN0YW5jZW9mIHR5cGU7XG59XG5cbnZhciBuYXRpdmVNYXA7XG50cnkge1xuICBuYXRpdmVNYXAgPSBNYXA7XG59IGNhdGNoKF8pIHtcbiAgLy8gbWF5YmUgYSByZWZlcmVuY2UgZXJyb3IgYmVjYXVzZSBubyBgTWFwYC4gR2l2ZSBpdCBhIGR1bW15IHZhbHVlIHRoYXQgbm9cbiAgLy8gdmFsdWUgd2lsbCBldmVyIGJlIGFuIGluc3RhbmNlb2YuXG4gIG5hdGl2ZU1hcCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVTZXQ7XG50cnkge1xuICBuYXRpdmVTZXQgPSBTZXQ7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlU2V0ID0gZnVuY3Rpb24oKSB7fTtcbn1cblxudmFyIG5hdGl2ZVByb21pc2U7XG50cnkge1xuICBuYXRpdmVQcm9taXNlID0gUHJvbWlzZTtcbn0gY2F0Y2goXykge1xuICBuYXRpdmVQcm9taXNlID0gZnVuY3Rpb24oKSB7fTtcbn1cblxuLyoqXG4gKiBDbG9uZXMgKGNvcGllcykgYW4gT2JqZWN0IHVzaW5nIGRlZXAgY29weWluZy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHN1cHBvcnRzIGNpcmN1bGFyIHJlZmVyZW5jZXMgYnkgZGVmYXVsdCwgYnV0IGlmIHlvdSBhcmUgY2VydGFpblxuICogdGhlcmUgYXJlIG5vIGNpcmN1bGFyIHJlZmVyZW5jZXMgaW4geW91ciBvYmplY3QsIHlvdSBjYW4gc2F2ZSBzb21lIENQVSB0aW1lXG4gKiBieSBjYWxsaW5nIGNsb25lKG9iaiwgZmFsc2UpLlxuICpcbiAqIENhdXRpb246IGlmIGBjaXJjdWxhcmAgaXMgZmFsc2UgYW5kIGBwYXJlbnRgIGNvbnRhaW5zIGNpcmN1bGFyIHJlZmVyZW5jZXMsXG4gKiB5b3VyIHByb2dyYW0gbWF5IGVudGVyIGFuIGluZmluaXRlIGxvb3AgYW5kIGNyYXNoLlxuICpcbiAqIEBwYXJhbSBgcGFyZW50YCAtIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkXG4gKiBAcGFyYW0gYGNpcmN1bGFyYCAtIHNldCB0byB0cnVlIGlmIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkIG1heSBjb250YWluXG4gKiAgICBjaXJjdWxhciByZWZlcmVuY2VzLiAob3B0aW9uYWwgLSB0cnVlIGJ5IGRlZmF1bHQpXG4gKiBAcGFyYW0gYGRlcHRoYCAtIHNldCB0byBhIG51bWJlciBpZiB0aGUgb2JqZWN0IGlzIG9ubHkgdG8gYmUgY2xvbmVkIHRvXG4gKiAgICBhIHBhcnRpY3VsYXIgZGVwdGguIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIEluZmluaXR5KVxuICogQHBhcmFtIGBwcm90b3R5cGVgIC0gc2V0cyB0aGUgcHJvdG90eXBlIHRvIGJlIHVzZWQgd2hlbiBjbG9uaW5nIGFuIG9iamVjdC5cbiAqICAgIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIHBhcmVudCBwcm90b3R5cGUpLlxuICogQHBhcmFtIGBpbmNsdWRlTm9uRW51bWVyYWJsZWAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgbm9uLWVudW1lcmFibGUgcHJvcGVydGllc1xuICogICAgc2hvdWxkIGJlIGNsb25lZCBhcyB3ZWxsLiBOb24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9uIHRoZSBwcm90b3R5cGVcbiAqICAgIGNoYWluIHdpbGwgYmUgaWdub3JlZC4gKG9wdGlvbmFsIC0gZmFsc2UgYnkgZGVmYXVsdClcbiovXG5mdW5jdGlvbiBjbG9uZShwYXJlbnQsIGNpcmN1bGFyLCBkZXB0aCwgcHJvdG90eXBlLCBpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICBpZiAodHlwZW9mIGNpcmN1bGFyID09PSAnb2JqZWN0Jykge1xuICAgIGRlcHRoID0gY2lyY3VsYXIuZGVwdGg7XG4gICAgcHJvdG90eXBlID0gY2lyY3VsYXIucHJvdG90eXBlO1xuICAgIGluY2x1ZGVOb25FbnVtZXJhYmxlID0gY2lyY3VsYXIuaW5jbHVkZU5vbkVudW1lcmFibGU7XG4gICAgY2lyY3VsYXIgPSBjaXJjdWxhci5jaXJjdWxhcjtcbiAgfVxuICAvLyBtYWludGFpbiB0d28gYXJyYXlzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzLCB3aGVyZSBjb3JyZXNwb25kaW5nIHBhcmVudHNcbiAgLy8gYW5kIGNoaWxkcmVuIGhhdmUgdGhlIHNhbWUgaW5kZXhcbiAgdmFyIGFsbFBhcmVudHMgPSBbXTtcbiAgdmFyIGFsbENoaWxkcmVuID0gW107XG5cbiAgdmFyIHVzZUJ1ZmZlciA9IHR5cGVvZiBCdWZmZXIgIT0gJ3VuZGVmaW5lZCc7XG5cbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PSAndW5kZWZpbmVkJylcbiAgICBjaXJjdWxhciA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBkZXB0aCA9PSAndW5kZWZpbmVkJylcbiAgICBkZXB0aCA9IEluZmluaXR5O1xuXG4gIC8vIHJlY3Vyc2UgdGhpcyBmdW5jdGlvbiBzbyB3ZSBkb24ndCByZXNldCBhbGxQYXJlbnRzIGFuZCBhbGxDaGlsZHJlblxuICBmdW5jdGlvbiBfY2xvbmUocGFyZW50LCBkZXB0aCkge1xuICAgIC8vIGNsb25pbmcgbnVsbCBhbHdheXMgcmV0dXJucyBudWxsXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGRlcHRoID09PSAwKVxuICAgICAgcmV0dXJuIHBhcmVudDtcblxuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgcHJvdG87XG4gICAgaWYgKHR5cGVvZiBwYXJlbnQgIT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuXG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlTWFwKSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlTWFwKCk7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVNldCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVNldCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVQcm9taXNlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHBhcmVudC50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmVzb2x2ZShfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICByZWplY3QoX2Nsb25lKGVyciwgZGVwdGggLSAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzQXJyYXkocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNSZWdFeHAocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgUmVnRXhwKHBhcmVudC5zb3VyY2UsIF9fZ2V0UmVnRXhwRmxhZ3MocGFyZW50KSk7XG4gICAgICBpZiAocGFyZW50Lmxhc3RJbmRleCkgY2hpbGQubGFzdEluZGV4ID0gcGFyZW50Lmxhc3RJbmRleDtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNEYXRlKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IERhdGUocGFyZW50LmdldFRpbWUoKSk7XG4gICAgfSBlbHNlIGlmICh1c2VCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IEJ1ZmZlcihwYXJlbnQubGVuZ3RoKTtcbiAgICAgIHBhcmVudC5jb3B5KGNoaWxkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgRXJyb3IpKSB7XG4gICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwcm90b3R5cGUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50KTtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcbiAgICAgICAgcHJvdG8gPSBwcm90b3R5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNpcmN1bGFyKSB7XG4gICAgICB2YXIgaW5kZXggPSBhbGxQYXJlbnRzLmluZGV4T2YocGFyZW50KTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiBhbGxDaGlsZHJlbltpbmRleF07XG4gICAgICB9XG4gICAgICBhbGxQYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIGFsbENoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGtleUNoaWxkID0gX2Nsb25lKGtleSwgZGVwdGggLSAxKTtcbiAgICAgICAgdmFyIHZhbHVlQ2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLnNldChrZXlDaGlsZCwgdmFsdWVDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlU2V0KSkge1xuICAgICAgcGFyZW50LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIGVudHJ5Q2hpbGQgPSBfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSk7XG4gICAgICAgIGNoaWxkLmFkZChlbnRyeUNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgaW4gcGFyZW50KSB7XG4gICAgICB2YXIgYXR0cnM7XG4gICAgICBpZiAocHJvdG8pIHtcbiAgICAgICAgYXR0cnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJzICYmIGF0dHJzLnNldCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2hpbGRbaV0gPSBfY2xvbmUocGFyZW50W2ldLCBkZXB0aCAtIDEpO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBEb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IGNsb25pbmcgYSBzeW1ib2wgYmVjYXVzZSBpdCBpcyBhIHByaW1pdGl2ZSxcbiAgICAgICAgLy8gbGlrZSBhIG51bWJlciBvciBzdHJpbmcuXG4gICAgICAgIHZhciBzeW1ib2wgPSBzeW1ib2xzW2ldO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBzeW1ib2wpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmICFpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3N5bWJvbF0gPSBfY2xvbmUocGFyZW50W3N5bWJvbF0sIGRlcHRoIC0gMSk7XG4gICAgICAgIGlmICghZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBzeW1ib2wsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgIHZhciBhbGxQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsUHJvcGVydHlOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gYWxsUHJvcGVydHlOYW1lc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRbcHJvcGVydHlOYW1lXSA9IF9jbG9uZShwYXJlbnRbcHJvcGVydHlOYW1lXSwgZGVwdGggLSAxKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICByZXR1cm4gX2Nsb25lKHBhcmVudCwgZGVwdGgpO1xufVxuXG4vKipcbiAqIFNpbXBsZSBmbGF0IGNsb25lIHVzaW5nIHByb3RvdHlwZSwgYWNjZXB0cyBvbmx5IG9iamVjdHMsIHVzZWZ1bGwgZm9yIHByb3BlcnR5XG4gKiBvdmVycmlkZSBvbiBGTEFUIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChubyBuZXN0ZWQgcHJvcHMpLlxuICpcbiAqIFVTRSBXSVRIIENBVVRJT04hIFRoaXMgbWF5IG5vdCBiZWhhdmUgYXMgeW91IHdpc2ggaWYgeW91IGRvIG5vdCBrbm93IGhvdyB0aGlzXG4gKiB3b3Jrcy5cbiAqL1xuY2xvbmUuY2xvbmVQcm90b3R5cGUgPSBmdW5jdGlvbiBjbG9uZVByb3RvdHlwZShwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgYyA9IGZ1bmN0aW9uICgpIHt9O1xuICBjLnByb3RvdHlwZSA9IHBhcmVudDtcbiAgcmV0dXJuIG5ldyBjKCk7XG59O1xuXG4vLyBwcml2YXRlIHV0aWxpdHkgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIF9fb2JqVG9TdHIobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuY2xvbmUuX19vYmpUb1N0ciA9IF9fb2JqVG9TdHI7XG5cbmZ1bmN0aW9uIF9faXNEYXRlKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5jbG9uZS5fX2lzRGF0ZSA9IF9faXNEYXRlO1xuXG5mdW5jdGlvbiBfX2lzQXJyYXkobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5jbG9uZS5fX2lzQXJyYXkgPSBfX2lzQXJyYXk7XG5cbmZ1bmN0aW9uIF9faXNSZWdFeHAobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuY2xvbmUuX19pc1JlZ0V4cCA9IF9faXNSZWdFeHA7XG5cbmZ1bmN0aW9uIF9fZ2V0UmVnRXhwRmxhZ3MocmUpIHtcbiAgdmFyIGZsYWdzID0gJyc7XG4gIGlmIChyZS5nbG9iYWwpIGZsYWdzICs9ICdnJztcbiAgaWYgKHJlLmlnbm9yZUNhc2UpIGZsYWdzICs9ICdpJztcbiAgaWYgKHJlLm11bHRpbGluZSkgZmxhZ3MgKz0gJ20nO1xuICByZXR1cm4gZmxhZ3M7XG59XG5jbG9uZS5fX2dldFJlZ0V4cEZsYWdzID0gX19nZXRSZWdFeHBGbGFncztcblxucmV0dXJuIGNsb25lO1xufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY2xvbmUvY2xvbmUuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaiB8fCB0b1N0ci5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGhhc093bkNvbnN0cnVjdG9yID0gaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKTtcblx0dmFyIGhhc0lzUHJvdG90eXBlT2YgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpO1xuXHQvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG5cdGlmIChvYmouY29uc3RydWN0b3IgJiYgIWhhc093bkNvbnN0cnVjdG9yICYmICFoYXNJc1Byb3RvdHlwZU9mKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHsgLyoqLyB9XG5cblx0cmV0dXJuIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmU7XG5cdHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG5cdHZhciBpID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9XG5cdGlmICh0YXJnZXQgPT0gbnVsbCB8fCAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzW2ldO1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAob3B0aW9ucyAhPSBudWxsKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbbmFtZV07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gY29weSkge1xuXHRcdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRcdGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gaXNBcnJheShjb3B5KSkpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvcHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBjb3B5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2V4dGVuZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaWVlZTc1NC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0xO2I8YXJndW1lbnRzLmxlbmd0aDtiKyspe3ZhciBjPWFyZ3VtZW50c1tiXTtmb3IodmFyIGQgaW4gYylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYyxkKSYmKGFbZF09Y1tkXSl9cmV0dXJuIGF9LF90eXBlb2Y9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGEpe3JldHVybiB0eXBlb2YgYX06ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmYS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmYSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgYX07IWZ1bmN0aW9uKGEsYil7XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgZXhwb3J0cz9cInVuZGVmaW5lZFwiOl90eXBlb2YoZXhwb3J0cykpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWIoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGIpOmEuTGF6eUxvYWQ9YigpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGE9e2VsZW1lbnRzX3NlbGVjdG9yOlwiaW1nXCIsY29udGFpbmVyOndpbmRvdyx0aHJlc2hvbGQ6MzAwLHRocm90dGxlOjE1MCxkYXRhX3NyYzpcIm9yaWdpbmFsXCIsZGF0YV9zcmNzZXQ6XCJvcmlnaW5hbC1zZXRcIixjbGFzc19sb2FkaW5nOlwibG9hZGluZ1wiLGNsYXNzX2xvYWRlZDpcImxvYWRlZFwiLGNsYXNzX2Vycm9yOlwiZXJyb3JcIixjbGFzc19pbml0aWFsOlwiaW5pdGlhbFwiLHNraXBfaW52aXNpYmxlOiEwLGNhbGxiYWNrX2xvYWQ6bnVsbCxjYWxsYmFja19lcnJvcjpudWxsLGNhbGxiYWNrX3NldDpudWxsLGNhbGxiYWNrX3Byb2Nlc3NlZDpudWxsfSxiPSEoXCJvbnNjcm9sbFwiaW4gd2luZG93KXx8L2dsZWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxjPWZ1bmN0aW9uKGEsYil7YSYmYShiKX0sZD1mdW5jdGlvbihhKXtyZXR1cm4gYS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LWEub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wfSxlPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4oYj09PXdpbmRvdz93aW5kb3cuaW5uZXJIZWlnaHQrd2luZG93LnBhZ2VZT2Zmc2V0OmQoYikrYi5vZmZzZXRIZWlnaHQpPD1kKGEpLWN9LGY9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCt3aW5kb3cucGFnZVhPZmZzZXQtYS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0fSxnPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD13aW5kb3cuaW5uZXJXaWR0aDtyZXR1cm4oYj09PXdpbmRvdz9kK3dpbmRvdy5wYWdlWE9mZnNldDpmKGIpK2QpPD1mKGEpLWN9LGg9ZnVuY3Rpb24oYSxiLGMpe3JldHVybihiPT09d2luZG93P3dpbmRvdy5wYWdlWU9mZnNldDpkKGIpKT49ZChhKStjK2Eub2Zmc2V0SGVpZ2h0fSxpPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4oYj09PXdpbmRvdz93aW5kb3cucGFnZVhPZmZzZXQ6ZihiKSk+PWYoYSkrYythLm9mZnNldFdpZHRofSxqPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4hKGUoYSxiLGMpfHxoKGEsYixjKXx8ZyhhLGIsYyl8fGkoYSxiLGMpKX0saz1mdW5jdGlvbihhLGIpe3ZhciBjPW5ldyBhKGIpLGQ9bmV3IEN1c3RvbUV2ZW50KFwiTGF6eUxvYWQ6OkluaXRpYWxpemVkXCIse2RldGFpbDp7aW5zdGFuY2U6Y319KTt3aW5kb3cuZGlzcGF0Y2hFdmVudChkKX0sbD1mdW5jdGlvbihhLGIpe3ZhciBjPWEucGFyZW50RWxlbWVudDtpZihcIlBJQ1RVUkVcIj09PWMudGFnTmFtZSlmb3IodmFyIGQ9MDtkPGMuY2hpbGRyZW4ubGVuZ3RoO2QrKyl7dmFyIGU9Yy5jaGlsZHJlbltkXTtpZihcIlNPVVJDRVwiPT09ZS50YWdOYW1lKXt2YXIgZj1lLmRhdGFzZXRbYl07ZiYmZS5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIixmKX19fSxtPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hLnRhZ05hbWUsZT1hLmRhdGFzZXRbY107aWYoXCJJTUdcIj09PWQpe2woYSxiKTt2YXIgZj1hLmRhdGFzZXRbYl07cmV0dXJuIGYmJmEuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZiksdm9pZChlJiZhLnNldEF0dHJpYnV0ZShcInNyY1wiLGUpKX1pZihcIklGUkFNRVwiPT09ZClyZXR1cm4gdm9pZChlJiZhLnNldEF0dHJpYnV0ZShcInNyY1wiLGUpKTtlJiYoYS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9XCJ1cmwoXCIrZStcIilcIil9LG49ZnVuY3Rpb24oYil7dGhpcy5fc2V0dGluZ3M9X2V4dGVuZHMoe30sYSxiKSx0aGlzLl9xdWVyeU9yaWdpbk5vZGU9dGhpcy5fc2V0dGluZ3MuY29udGFpbmVyPT09d2luZG93P2RvY3VtZW50OnRoaXMuX3NldHRpbmdzLmNvbnRhaW5lcix0aGlzLl9wcmV2aW91c0xvb3BUaW1lPTAsdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCx0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbD10aGlzLmhhbmRsZVNjcm9sbC5iaW5kKHRoaXMpLHRoaXMuX2lzRmlyc3RMb29wPSEwLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGwpLHRoaXMudXBkYXRlKCl9O24ucHJvdG90eXBlPXtfcmV2ZWFsOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuX3NldHRpbmdzLGQ9ZnVuY3Rpb24gZCgpe2ImJihhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIixkKSxhLmNsYXNzTGlzdC5yZW1vdmUoYi5jbGFzc19sb2FkaW5nKSxhLmNsYXNzTGlzdC5hZGQoYi5jbGFzc19lcnJvciksYyhiLmNhbGxiYWNrX2Vycm9yLGEpKX0sZT1mdW5jdGlvbiBlKCl7YiYmKGEuY2xhc3NMaXN0LnJlbW92ZShiLmNsYXNzX2xvYWRpbmcpLGEuY2xhc3NMaXN0LmFkZChiLmNsYXNzX2xvYWRlZCksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGUpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZCksYyhiLmNhbGxiYWNrX2xvYWQsYSkpfTtcIklNR1wiIT09YS50YWdOYW1lJiZcIklGUkFNRVwiIT09YS50YWdOYW1lfHwoYS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGUpLGEuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZCksYS5jbGFzc0xpc3QuYWRkKGIuY2xhc3NfbG9hZGluZykpLG0oYSxiLmRhdGFfc3Jjc2V0LGIuZGF0YV9zcmMpLGMoYi5jYWxsYmFja19zZXQsYSl9LF9sb29wVGhyb3VnaEVsZW1lbnRzOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fc2V0dGluZ3MsZD10aGlzLl9lbGVtZW50cyxlPWQ/ZC5sZW5ndGg6MCxmPXZvaWQgMCxnPVtdLGg9dGhpcy5faXNGaXJzdExvb3A7Zm9yKGY9MDtmPGU7ZisrKXt2YXIgaT1kW2ZdO2Euc2tpcF9pbnZpc2libGUmJm51bGw9PT1pLm9mZnNldFBhcmVudHx8KGJ8fGooaSxhLmNvbnRhaW5lcixhLnRocmVzaG9sZCkpJiYoaCYmaS5jbGFzc0xpc3QuYWRkKGEuY2xhc3NfaW5pdGlhbCksdGhpcy5fcmV2ZWFsKGkpLGcucHVzaChmKSxpLmRhdGFzZXQud2FzUHJvY2Vzc2VkPSEwKX1mb3IoO2cubGVuZ3RoPjA7KWQuc3BsaWNlKGcucG9wKCksMSksYyhhLmNhbGxiYWNrX3Byb2Nlc3NlZCxkLmxlbmd0aCk7MD09PWUmJnRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCksaCYmKHRoaXMuX2lzRmlyc3RMb29wPSExKX0sX3B1cmdlRWxlbWVudHM6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9lbGVtZW50cyxiPWEubGVuZ3RoLGM9dm9pZCAwLGQ9W107Zm9yKGM9MDtjPGI7YysrKXthW2NdLmRhdGFzZXQud2FzUHJvY2Vzc2VkJiZkLnB1c2goYyl9Zm9yKDtkLmxlbmd0aD4wOylhLnNwbGljZShkLnBvcCgpLDEpfSxfc3RhcnRTY3JvbGxIYW5kbGVyOmZ1bmN0aW9uKCl7dGhpcy5faXNIYW5kbGluZ1Njcm9sbHx8KHRoaXMuX2lzSGFuZGxpbmdTY3JvbGw9ITAsdGhpcy5fc2V0dGluZ3MuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbCkpfSxfc3RvcFNjcm9sbEhhbmRsZXI6ZnVuY3Rpb24oKXt0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsJiYodGhpcy5faXNIYW5kbGluZ1Njcm9sbD0hMSx0aGlzLl9zZXR0aW5ncy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMuX2JvdW5kSGFuZGxlU2Nyb2xsKSl9LGhhbmRsZVNjcm9sbDpmdW5jdGlvbigpe3ZhciBhPXRoaXMsYj10aGlzLl9zZXR0aW5ncy50aHJvdHRsZTswIT09Yj9mdW5jdGlvbigpe3ZhciBjPWZ1bmN0aW9uKCl7KG5ldyBEYXRlKS5nZXRUaW1lKCl9LGQ9YygpLGU9Yi0oZC1hLl9wcmV2aW91c0xvb3BUaW1lKTtlPD0wfHxlPmI/KGEuX2xvb3BUaW1lb3V0JiYoY2xlYXJUaW1lb3V0KGEuX2xvb3BUaW1lb3V0KSxhLl9sb29wVGltZW91dD1udWxsKSxhLl9wcmV2aW91c0xvb3BUaW1lPWQsYS5fbG9vcFRocm91Z2hFbGVtZW50cygpKTphLl9sb29wVGltZW91dHx8KGEuX2xvb3BUaW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGlzLl9wcmV2aW91c0xvb3BUaW1lPWMoKSx0aGlzLl9sb29wVGltZW91dD1udWxsLHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKX0uYmluZChhKSxlKSl9KCk6dGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpfSx1cGRhdGU6ZnVuY3Rpb24oKXt0aGlzLl9lbGVtZW50cz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9xdWVyeU9yaWdpbk5vZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5lbGVtZW50c19zZWxlY3RvcikpLHRoaXMuX3B1cmdlRWxlbWVudHMoKSx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCksdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2JvdW5kSGFuZGxlU2Nyb2xsKSx0aGlzLl9sb29wVGltZW91dCYmKGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCksdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKSx0aGlzLl9lbGVtZW50cz1udWxsLHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZT1udWxsLHRoaXMuX3NldHRpbmdzPW51bGx9fTt2YXIgbz13aW5kb3cubGF6eUxvYWRPcHRpb25zO3JldHVybiBvJiZmdW5jdGlvbihhLGIpe3ZhciBjPWIubGVuZ3RoO2lmKGMpZm9yKHZhciBkPTA7ZDxjO2QrKylrKGEsYltkXSk7ZWxzZSBrKGEsYil9KG4sbyksbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQudHJhbnNwaWxlZC5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==