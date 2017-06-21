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
        this.menu = nav.find('.nav-mobile__content');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWJmOWY1ODBiZmU1ZWMxNmFiZjgiLCJ3ZWJwYWNrOi8vLy4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWxpbmtzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL3Njcm9sbC10by5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50LWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2xpbmtlZC1jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF6eS1sb2FkL2xhenktbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvbmF2LW1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL3BhcnNlLW5hdi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy91cmwtZHJvcGRvd24vdXJsLWRyb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlldy15b3V0dWJlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL2dldC1kYXRhLWF0dHJzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9tb3ZlLWludG8tdmlldy1pbi1jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL3lvdXR1YmUtcGxheWVyLmpzIiwid2VicGFjazovLy8uL34vYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYnVmZmVyL34vaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nsb25lL2Nsb25lLmpzIiwid2VicGFjazovLy8uL34vZXh0ZW5kL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZhbmlsbGEtbGF6eWxvYWQvZGlzdC9sYXp5bG9hZC50cmFuc3BpbGVkLm1pbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbImNvbnRlbnRDbiIsImNsYXNzTmFtZSIsImhlYWRpbmdDbiIsImhlYWRpbmdMYWJlbENuIiwiaGVhZGluZ0ljb25DbiIsIm1lbnVDbiIsIm1lbnVXcmFwcGVyQ24iLCJtZW51SXRlbUNuIiwibWVudUl0ZW1MYWJlbENuIiwicHJlcGFyZUNvbnRlbnQiLCJ3aWRnZXQiLCJjb250ZW50Q2xhc3NOYW1lIiwiY29udGVudEVsZW1lbnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsImFkZENsYXNzIiwiYXBwZW5kIiwiYXBwZW5kVG8iLCJkZWFjdGl2YXRlQWxsIiwicHJlcGFyZUxpbmtzIiwiZ2VuQWN0aXZhdGVJdGVtIiwiaGVhZGluZ0FuY2hvcnMiLCJhbGxBbmNob3JzIiwiaWQiLCJzY3JvbGwiLCJmaWx0ZXIiLCJyZW1vdmVDbGFzcyIsImF0dHIiLCJub3QiLCJoZWFkaW5ncyIsIm1lbnUiLCJjYW5EZWFjdGl2YXRlIiwic2Nyb2xsT25BY3RpdmF0ZSIsImFjdGl2YXRlSW5pdGlhbCIsInJlZHVjZSIsImFjYyIsIml0ZW0iLCJhZGQiLCJpcyIsInBhcmVudCIsImZpbmQiLCJhY3RpdmF0ZUl0ZW0iLCJvbiIsImV2dCIsInByZXZlbnREZWZhdWx0IiwiYW5jaG9yIiwiaGFzQ2xhc3MiLCJmaW5kSGVhZGluZ3MiLCJjb250ZW50IiwiaGVhZGluZ1RhZ05hbWUiLCJmaXJzdCIsInByb3AiLCJoZWFkZXJFbGVtZW50cyIsIm1hcCIsImVsZW1lbnQiLCJpIiwiY29udGVudEVsZW1lbnRzIiwibmV4dCIsInB1c2giLCJpbnNlcnRBZnRlciIsInRleHQiLCJodG1sIiwic2Nyb2xsZWRJbnRvVmlldyIsImVsZW0iLCJkb2NWaWV3VG9wIiwid2luZG93Iiwic2Nyb2xsWSIsImRvY1ZpZXdCb3R0b20iLCJpbm5lckhlaWdodCIsImVsZW1Ub3AiLCJvZmZzZXQiLCJ0b3AiLCJlbGVtSGVpZ2h0IiwiaGVpZ2h0IiwiZWxlbUJvdHRvbSIsInZpZXdUb3AiLCJNYXRoIiwibWF4Iiwidmlld0JvdHRvbSIsIm1pbiIsInByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyIsInBhdHRlcm5DbGFzc25hbWUiLCJpbmRleCIsImhlYWRpbmdDbGFzcyIsImFuY2hvcnMiLCJmb3JFYWNoIiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIlRFWFRfTk9ERSIsInNwYW4iLCJlbXB0eSIsImljb24iLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVBdHRyIiwicHJlcGFyZVRhYnNIZWFkaW5ncyIsIndyYXAiLCJ0YWJzQmFyIiwic2Nyb2xsVG8iLCJzY3JvbGxJbnRvVmlldyIsImxhdW5jaCIsImVsIiwiYmVzdCIsIm1heEluZGV4IiwidiIsImFyciIsImVsZW1lbnRzX3NlbGVjdG9yIiwiZGF0YV9zcmMiLCJ0aHJlc2hvbGQiLCJjYWxsYmFja19sb2FkIiwiaW1nIiwic3R5bGUiLCJwYWRkaW5nQm90dG9tIiwibmF2IiwicHJlcGFyZVRyZWVJZHMiLCJ0cmVlIiwicGFyZW50SWQiLCJjaGlsZCIsIk5hdk1vYmlsZSIsImRlZmF1bHRPcGVuIiwidG9nZ2xlIiwic2xpY2UiLCJ0b2dnbGVDaGlsZHJlbiIsImJpbmQiLCJsZXZlbE1hcCIsImxhYmVsIiwicHJldiIsIm9wZW5OYXYiLCJwcmVwYXJlSXRlbUVsZW1lbnQiLCJmb3JjZU9wZW4iLCJhbmNlc3RvcnMiLCJwYXJlbnRzIiwic2V0T3BlbiIsInRvZ2dsZUNsYXNzIiwiY29udGFpbmVyIiwiY2hpbGRyZW5Db250YWluZXIiLCJsZXZlbCIsImhlYWRlciIsInR5cGUiLCJ1cmwiLCJsb2NhdGlvbiIsInNlYXJjaCIsIm5hbWUiLCJjaGlsZHJlblRvZ2dsZSIsIlBBUlNFX1JFR0VYIiwibG9hZERhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwicGFyc2VOYXYiLCJkYXRhIiwic3BsaXQiLCJtYXRjaCIsImxpbmUiLCJsZXZlbFN0ciIsInR5cGVTdHIiLCJwYXJzZUludCIsImN1cnJlbnRIZWFkIiwiY3VycmVudCIsImZpbmRDdXJyZW50IiwibGlzdCIsInNlbGVjdCIsImVxIiwiaHJlZiIsImxvYWRZb3V0dWJlVmlkZW8iLCJERUZBVUxUX1BBUkFNUyIsImZyYW1lQm9yZGVyIiwid3JhcHBlciIsInBhcmFtcyIsImlmcmFtZUlkIiwibGluayIsImZhbGxiYWNrUGFyYW1zIiwid2lkdGgiLCJwbGF5ZXJQYXJhbXMiLCJ2aWRlb0lkIiwiZXZlbnRzIiwib25Jbml0Iiwib25SZWFkeSIsInJlbW92ZSIsInBsYXllciIsInRhcmdldCIsImlmcmFtZSIsInBsYXlWaWRlbyIsInBhdXNlVmlkZW8iLCJnZXRTZXJ2aWNlIiwieXRNYXRjaCIsInNlcnZpY2UiLCJ0b0xvd2VyQ2FzZSIsImxvYWRWaWRlbyIsImxhdW5jaFBhdHRlcm4iLCJwYXR0ZXJuIiwiZWFjaCIsImdldERhdGFBdHRyaWJ1dGVzIiwiZGF0YUF0dHJSZWdleCIsIm5vZGUiLCJBcnJheSIsImZyb20iLCJnZXQiLCJhdHRyaWJ1dGVzIiwibm9kZU5hbWUiLCJub2RlVmFsdWUiLCJtb3ZlSW50b1ZpZXdJbkNvbnRhaW5lciIsImluaXRNb3ZlSW50b1ZpZXciLCJlbGVtZW50Q29udGVudFdpZHRoIiwiY3MiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyc2VGbG9hdCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsImZvcmNlIiwicGFyZW50VG9wIiwicGFyZW50SGVpZ2h0IiwiY3VycmVudFN0YXR1cyIsIm5leHRTdGF0dXMiLCJjc3MiLCJwb3NpdGlvbiIsImJvdHRvbSIsImNyZWF0ZVBsYXllciIsIlVOTE9BREVEIiwiTE9BRElORyIsIkxPQURFRCIsImFwaVN0YXR1cyIsInBlbmRpbmdQbGF5ZXJzIiwicGxheWVycyIsImluaXRQbGF5ZXIiLCJsb2FkQXBpIiwiWVQiLCJQbGF5ZXIiLCJvbllvdVR1YmVJZnJhbWVBUElSZWFkeSIsInRhZyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJmaXJzdFNjcmlwdFRhZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztrRUNoRUE7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLGNBQWM7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLLEVBQUU7O0FBRVA7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esb0ZBQW9GO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1dkRBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFQQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBLFFBQVEsVUFBVTs7QUFFbEI7QUFDQTs7Ozs7OztBQ25GQSwwR0FBd0MsWUFBWSxtQkFBbUIsS0FBSyxtQkFBbUIsc0VBQXNFLFNBQVMsaUZBQWlGLGdCQUFnQixhQUFhLHFHQUFxRyxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0hBQW9MLGlCQUFpQixhQUFhLE9BQU8sZ1RBQWdULDhFQUE4RSxRQUFRLGVBQWUsa0dBQWtHLG1CQUFtQixxRkFBcUYsZUFBZSxvR0FBb0csbUJBQW1CLHdCQUF3Qix1REFBdUQsbUJBQW1CLGtFQUFrRSxtQkFBbUIsaUVBQWlFLG1CQUFtQixnREFBZ0QsaUJBQWlCLDBEQUEwRCxRQUFRLFlBQVksRUFBRSx3QkFBd0IsaUJBQWlCLHNCQUFzQixxQ0FBcUMsb0JBQW9CLEtBQUssb0JBQW9CLHlCQUF5QixtQkFBbUIsZ0NBQWdDLG1CQUFtQiwrQkFBK0IsY0FBYyxPQUFPLG1CQUFtQixzRUFBc0Usd0RBQXdELDBDQUEwQyxlQUFlLDBCQUEwQixtU0FBbVMsYUFBYSxvQkFBb0Isb0NBQW9DLCtKQUErSixnQkFBZ0IsZ0tBQWdLLHlMQUF5TCxpQ0FBaUMsdUZBQXVGLFFBQVEsSUFBSSxLQUFLLFdBQVcsc0tBQXNLLEtBQUssV0FBVyxzREFBc0QsMkRBQTJELDJCQUEyQiw4Q0FBOEMsUUFBUSxJQUFJLEtBQUsscUNBQXFDLEtBQUssV0FBVyxxQkFBcUIsZ0NBQWdDLGdJQUFnSSwrQkFBK0IsbUlBQW1JLHlCQUF5QixxQ0FBcUMsaUJBQWlCLGlCQUFpQixxQkFBcUIsbUNBQW1DLG9MQUFvTCw4RUFBOEUsYUFBYSwrQkFBK0IsbUJBQW1CLGlNQUFpTSxvQkFBb0Isd09BQXdPLDZCQUE2Qix3QkFBd0IsZUFBZSxpQkFBaUIsSUFBSSxjQUFjLFlBQVksUUFBUSxFOzs7Ozs7QUNBcGhLOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWJmOWY1ODBiZmU1ZWMxNmFiZjgiLCJcInVzZSBzdHJpY3RcIjtcblxuLyohIGNhc2gtZG9tIDEuMy41LCBodHRwczovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9jYXNoIEBsaWNlbnNlIE1JVCAqL1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290LmNhc2ggPSByb290LiQgPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50LCB3aW4gPSB3aW5kb3csIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIHNsaWNlID0gQXJyYXlQcm90by5zbGljZSwgZmlsdGVyID0gQXJyYXlQcm90by5maWx0ZXIsIHB1c2ggPSBBcnJheVByb3RvLnB1c2g7XG5cbiAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fSwgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgLy8gQHNlZSBodHRwczovL2NyYnVnLmNvbS81Njg0NDhcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IHR5cGVvZiBub29wICYmIGl0ZW0uY2FsbDtcbiAgfSwgaXNTdHJpbmcgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gdHlwZW9mIFwiXCI7XG4gIH07XG5cbiAgdmFyIGlkTWF0Y2ggPSAvXiNbXFx3LV0qJC8sIGNsYXNzTWF0Y2ggPSAvXlxcLltcXHctXSokLywgaHRtbE1hdGNoID0gLzwuKz4vLCBzaW5nbGV0ID0gL15cXHcrJC87XG5cbiAgZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvYztcbiAgICB2YXIgZWxlbXMgPSAoY2xhc3NNYXRjaC50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvci5zbGljZSgxKSkgOiBzaW5nbGV0LnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICByZXR1cm4gZWxlbXM7XG4gIH1cblxuICB2YXIgZnJhZztcbiAgZnVuY3Rpb24gcGFyc2VIVE1MKHN0cikge1xuICAgIGlmICghZnJhZykge1xuICAgICAgZnJhZyA9IGRvYy5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoKTtcbiAgICAgIHZhciBiYXNlID0gZnJhZy5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKTtcbiAgICAgIGJhc2UuaHJlZiA9IGRvYy5sb2NhdGlvbi5ocmVmO1xuICAgICAgZnJhZy5oZWFkLmFwcGVuZENoaWxkKGJhc2UpO1xuICAgIH1cblxuICAgIGZyYWcuYm9keS5pbm5lckhUTUwgPSBzdHI7XG5cbiAgICByZXR1cm4gZnJhZy5ib2R5LmNoaWxkTm9kZXM7XG4gIH1cblxuICBmdW5jdGlvbiBvblJlYWR5KGZuKSB7XG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikge1xuICAgICAgZm4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgYWxyZWFkeSBhIGNhc2ggY29sbGVjdGlvbiwgZG9uJ3QgZG8gYW55IGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgIGlmIChzZWxlY3Rvci5jYXNoICYmIHNlbGVjdG9yICE9PSB3aW4pIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICB2YXIgZWxlbXMgPSBzZWxlY3RvciwgaSA9IDAsIGxlbmd0aDtcblxuICAgIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICAgIGVsZW1zID0gKGlkTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgYW4gSUQgdXNlIHRoZSBmYXN0ZXIgZ2V0RWxlbWVudEJ5SWQgY2hlY2tcbiAgICAgIGRvYy5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sTWF0Y2gudGVzdChzZWxlY3RvcikgP1xuICAgICAgLy8gSWYgSFRNTCwgcGFyc2UgaXQgaW50byByZWFsIGVsZW1lbnRzXG4gICAgICBwYXJzZUhUTUwoc2VsZWN0b3IpIDpcbiAgICAgIC8vIGVsc2UgdXNlIGBmaW5kYFxuICAgICAgZmluZChzZWxlY3RvciwgY29udGV4dCkpO1xuXG4gICAgICAvLyBJZiBmdW5jdGlvbiwgdXNlIGFzIHNob3J0Y3V0IGZvciBET00gcmVhZHlcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBvblJlYWR5KHNlbGVjdG9yKTtyZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBJZiBhIHNpbmdsZSBET00gZWxlbWVudCBpcyBwYXNzZWQgaW4gb3IgcmVjZWl2ZWQgdmlhIElELCByZXR1cm4gdGhlIHNpbmdsZSBlbGVtZW50XG4gICAgaWYgKGVsZW1zLm5vZGVUeXBlIHx8IGVsZW1zID09PSB3aW4pIHtcbiAgICAgIHRoaXNbMF0gPSBlbGVtcztcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJlYXQgbGlrZSBhbiBhcnJheSBhbmQgbG9vcCB0aHJvdWdoIGVhY2ggaXRlbS5cbiAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzW2ldID0gZWxlbXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgfVxuXG4gIHZhciBmbiA9IGNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IEluaXQucHJvdG90eXBlID0geyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICBjYXNoOiB0cnVlLFxuICAgIGxlbmd0aDogMCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHNwbGljZTogQXJyYXlQcm90by5zcGxpY2UsXG4gICAgbWFwOiBBcnJheVByb3RvLm1hcCxcbiAgICBpbml0OiBJbml0XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImNvbnN0cnVjdG9yXCIsIHsgdmFsdWU6IGNhc2ggfSk7XG5cbiAgY2FzaC5wYXJzZUhUTUwgPSBwYXJzZUhUTUw7XG4gIGNhc2gubm9vcCA9IG5vb3A7XG4gIGNhc2guaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gIGNhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcblxuICBjYXNoLmV4dGVuZCA9IGZuLmV4dGVuZCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwge307XG5cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSwgbGVuZ3RoID0gYXJncy5sZW5ndGgsIGkgPSAxO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0aGlzO1xuICAgICAgaSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFhcmdzW2ldKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3NbaV0pIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnc1tpXVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBmdW5jdGlvbiBlYWNoKGNvbGxlY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGwgPSBjb2xsZWN0aW9uLmxlbmd0aCwgaSA9IDA7XG5cbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoY29sbGVjdGlvbltpXSwgY29sbGVjdGlvbltpXSwgaSwgY29sbGVjdGlvbikgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hdGNoZXMoZWwsIHNlbGVjdG9yKSB7XG4gICAgdmFyIG0gPSBlbCAmJiAoZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpO1xuICAgIHJldHVybiAhIW0gJiYgbS5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gKFxuICAgIC8qIFVzZSBicm93c2VyJ3MgYG1hdGNoZXNgIGZ1bmN0aW9uIGlmIHN0cmluZyAqL1xuICAgIGlzU3RyaW5nKHNlbGVjdG9yKSA/IG1hdGNoZXMgOlxuICAgIC8qIE1hdGNoIGEgY2FzaCBlbGVtZW50ICovXG4gICAgc2VsZWN0b3IuY2FzaCA/IGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yLmlzKGVsKTtcbiAgICB9IDpcbiAgICAvKiBEaXJlY3QgY29tcGFyaXNvbiAqL1xuICAgIGZ1bmN0aW9uIChlbCwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBlbCA9PT0gc2VsZWN0b3I7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmlxdWUoY29sbGVjdGlvbikge1xuICAgIHJldHVybiBjYXNoKHNsaWNlLmNhbGwoY29sbGVjdGlvbikuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XG4gICAgfSkpO1xuICB9XG5cbiAgY2FzaC5leHRlbmQoe1xuICAgIG1lcmdlOiBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuICAgICAgdmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLCBpID0gZmlyc3QubGVuZ3RoLCBqID0gMDtcblxuICAgICAgZm9yICg7IGogPCBsZW47IGkrKywgaisrKSB7XG4gICAgICAgIGZpcnN0W2ldID0gc2Vjb25kW2pdO1xuICAgICAgfVxuXG4gICAgICBmaXJzdC5sZW5ndGggPSBpO1xuICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH0sXG5cbiAgICBlYWNoOiBlYWNoLFxuICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgdW5pcXVlOiB1bmlxdWUsXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSxcbiAgICBpc051bWVyaWM6IGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgdWlkID0gY2FzaC51aWQgPSBcIl9jYXNoXCIgKyBEYXRlLm5vdygpO1xuXG4gIGZ1bmN0aW9uIGdldERhdGFDYWNoZShub2RlKSB7XG4gICAgcmV0dXJuIChub2RlW3VpZF0gPSBub2RlW3VpZF0gfHwge30pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGF0YShub2RlLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIChnZXREYXRhQ2FjaGUobm9kZSlba2V5XSA9IHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGEobm9kZSwga2V5KSB7XG4gICAgdmFyIGMgPSBnZXREYXRhQ2FjaGUobm9kZSk7XG4gICAgaWYgKGNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjW2tleV0gPSBub2RlLmRhdGFzZXQgPyBub2RlLmRhdGFzZXRba2V5XSA6IGNhc2gobm9kZSkuYXR0cihcImRhdGEtXCIgKyBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gY1trZXldO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRGF0YShub2RlLCBrZXkpIHtcbiAgICB2YXIgYyA9IGdldERhdGFDYWNoZShub2RlKTtcbiAgICBpZiAoYykge1xuICAgICAgZGVsZXRlIGNba2V5XTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGF0YXNldCkge1xuICAgICAgZGVsZXRlIG5vZGUuZGF0YXNldFtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXNoKG5vZGUpLnJlbW92ZUF0dHIoXCJkYXRhLVwiICsgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBkYXRhOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgPyBnZXREYXRhKHRoaXNbMF0sIG5hbWUpIDogdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHNldERhdGEodiwgbmFtZSwgdmFsdWUpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmVEYXRhOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVEYXRhKHYsIGtleSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIG5vdFdoaXRlTWF0Y2ggPSAvXFxTKy9nO1xuXG4gIGZ1bmN0aW9uIGdldENsYXNzZXMoYykge1xuICAgIHJldHVybiBpc1N0cmluZyhjKSAmJiBjLm1hdGNoKG5vdFdoaXRlTWF0Y2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzQ2xhc3ModiwgYykge1xuICAgIHJldHVybiAodi5jbGFzc0xpc3QgPyB2LmNsYXNzTGlzdC5jb250YWlucyhjKSA6IG5ldyBSZWdFeHAoXCIoXnwgKVwiICsgYyArIFwiKCB8JClcIiwgXCJnaVwiKS50ZXN0KHYuY2xhc3NOYW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKSB7XG4gICAgaWYgKHYuY2xhc3NMaXN0KSB7XG4gICAgICB2LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfSBlbHNlIGlmIChzcGFjZWROYW1lLmluZGV4T2YoXCIgXCIgKyBjICsgXCIgXCIpKSB7XG4gICAgICB2LmNsYXNzTmFtZSArPSBcIiBcIiArIGM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3ModiwgYykge1xuICAgIGlmICh2LmNsYXNzTGlzdCkge1xuICAgICAgdi5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2LmNsYXNzTmFtZSA9IHYuY2xhc3NOYW1lLnJlcGxhY2UoYywgXCJcIik7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcblxuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBzcGFjZWROYW1lID0gXCIgXCIgKyB2LmNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0cjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmdldEF0dHJpYnV0ZSA/IHRoaXNbMF0uZ2V0QXR0cmlidXRlKG5hbWUpIDogdGhpc1swXVtuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAodi5zZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHYuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdltuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXR0cihrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjaGVjayA9IGZhbHNlLCBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcbiAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIGNoZWNrID0gaGFzQ2xhc3ModiwgY2xhc3Nlc1swXSk7XG4gICAgICAgICAgcmV0dXJuICFjaGVjaztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSxcblxuICAgIHByb3A6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXNbMF1bbmFtZV0gOiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICB2W25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9wKGtleSwgbmFtZVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnJlbW92ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgIHYucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB2W25hbWVdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzZXMgPSBnZXRDbGFzc2VzKGMpO1xuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZW1vdmVDbGFzcyh2LCBjKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSA6IHRoaXMpO1xuICAgIH0sXG5cbiAgICByZW1vdmVQcm9wOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBkZWxldGUgdltuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGMsIHN0YXRlKSB7XG4gICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1tzdGF0ZSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oYyk7XG4gICAgICB9XG4gICAgICB2YXIgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG4gICAgICByZXR1cm4gKGNsYXNzZXMgPyB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFyIHNwYWNlZE5hbWUgPSBcIiBcIiArIHYuY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICBpZiAoaGFzQ2xhc3ModiwgYykpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKHYsIGMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh2LCBjLCBzcGFjZWROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9IH0pO1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWRkOiBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB1bmlxdWUoY2FzaC5tZXJnZSh0aGlzLCBjYXNoKHNlbGVjdG9yLCBjb250ZXh0KSkpO1xuICAgIH0sXG5cbiAgICBlYWNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIGVhY2godGhpcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGVxOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG4gICAgfSxcblxuICAgIGZpbHRlcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29tcGFyYXRvciA9IChpc0Z1bmN0aW9uKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKSk7XG5cbiAgICAgIHJldHVybiBjYXNoKGZpbHRlci5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKGUsIHNlbGVjdG9yKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZmlyc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxKDApO1xuICAgIH0sXG5cbiAgICBnZXQ6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHNsaWNlLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGluZGV4IDwgMCA/IHRoaXNbaW5kZXggKyB0aGlzLmxlbmd0aF0gOiB0aGlzW2luZGV4XSk7XG4gICAgfSxcblxuICAgIGluZGV4OiBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgdmFyIGNoaWxkID0gZWxlbSA/IGNhc2goZWxlbSlbMF0gOiB0aGlzWzBdLCBjb2xsZWN0aW9uID0gZWxlbSA/IHRoaXMgOiBjYXNoKGNoaWxkKS5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICAgICAgcmV0dXJuIHNsaWNlLmNhbGwoY29sbGVjdGlvbikuaW5kZXhPZihjaGlsZCk7XG4gICAgfSxcblxuICAgIGxhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVxKC0xKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIGNhbWVsQ2FzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbWVsUmVnZXggPSAvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIHdoaXRlU3BhY2UgPSAvW1xccy1fXSsvZztcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsUmVnZXgsIGZ1bmN0aW9uIChsZXR0ZXIsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsZXR0ZXJbaW5kZXggPT09IDAgPyBcInRvTG93ZXJDYXNlXCIgOiBcInRvVXBwZXJDYXNlXCJdKCk7XG4gICAgICB9KS5yZXBsYWNlKHdoaXRlU3BhY2UsIFwiXCIpO1xuICAgIH07XG4gIH0oKSk7XG5cbiAgdmFyIGdldFByZWZpeGVkUHJvcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhY2hlID0ge30sIGRvYyA9IGRvY3VtZW50LCBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgc3R5bGUgPSBkaXYuc3R5bGU7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHByb3AgPSBjYW1lbENhc2UocHJvcCk7XG4gICAgICBpZiAoY2FjaGVbcHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgfVxuXG4gICAgICB2YXIgdWNQcm9wID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSksIHByZWZpeGVzID0gW1wid2Via2l0XCIsIFwibW96XCIsIFwibXNcIiwgXCJvXCJdLCBwcm9wcyA9IChwcm9wICsgXCIgXCIgKyAocHJlZml4ZXMpLmpvaW4odWNQcm9wICsgXCIgXCIpICsgdWNQcm9wKS5zcGxpdChcIiBcIik7XG5cbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIGlmIChwIGluIHN0eWxlKSB7XG4gICAgICAgICAgY2FjaGVbcF0gPSBwcm9wID0gY2FjaGVbcHJvcF0gPSBwO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICB9O1xuICB9KCkpO1xuXG4gIGNhc2gucHJlZml4ZWRQcm9wID0gZ2V0UHJlZml4ZWRQcm9wO1xuICBjYXNoLmNhbWVsQ2FzZSA9IGNhbWVsQ2FzZTtcblxuICBmbi5leHRlbmQoe1xuICAgIGNzczogZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgICAgcHJvcCA9IGdldFByZWZpeGVkUHJvcChwcm9wKTtcbiAgICAgICAgcmV0dXJuIChhcmd1bWVudHMubGVuZ3RoID4gMSA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiB2LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0pIDogd2luLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSlbcHJvcF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgICAgICB0aGlzLmNzcyhrZXksIHByb3Bba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBjb21wdXRlKGVsLCBwcm9wKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsWzBdLCBudWxsKVtwcm9wXSwgMTApIHx8IDA7XG4gIH1cblxuICBlYWNoKFtcIldpZHRoXCIsIFwiSGVpZ2h0XCJdLCBmdW5jdGlvbiAodikge1xuICAgIHZhciBsb3dlciA9IHYudG9Mb3dlckNhc2UoKTtcblxuICAgIGZuW2xvd2VyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2xvd2VyXTtcbiAgICB9O1xuXG4gICAgZm5bXCJpbm5lclwiICsgdl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1swXVtcImNsaWVudFwiICsgdl07XG4gICAgfTtcblxuICAgIGZuW1wib3V0ZXJcIiArIHZdID0gZnVuY3Rpb24gKG1hcmdpbnMpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wib2Zmc2V0XCIgKyB2XSArIChtYXJnaW5zID8gY29tcHV0ZSh0aGlzLCBcIm1hcmdpblwiICsgKHYgPT09IFwiV2lkdGhcIiA/IFwiTGVmdFwiIDogXCJUb3BcIikpICsgY29tcHV0ZSh0aGlzLCBcIm1hcmdpblwiICsgKHYgPT09IFwiV2lkdGhcIiA/IFwiUmlnaHRcIiA6IFwiQm90dG9tXCIpKSA6IDApO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQobm9kZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudENhY2hlID0gZ2V0RGF0YShub2RlLCBcIl9jYXNoRXZlbnRzXCIpIHx8IHNldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiLCB7fSk7XG4gICAgZXZlbnRDYWNoZVtldmVudE5hbWVdID0gZXZlbnRDYWNoZVtldmVudE5hbWVdIHx8IFtdO1xuICAgIGV2ZW50Q2FjaGVbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudChub2RlLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGV2ZW50cyA9IGdldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiKSwgZXZlbnRDYWNoZSA9IChldmVudHMgJiYgZXZlbnRzW2V2ZW50TmFtZV0pLCBpbmRleDtcblxuICAgIGlmICghZXZlbnRDYWNoZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgaW5kZXggPSBldmVudENhY2hlLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgZXZlbnRDYWNoZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGV2ZW50Q2FjaGUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50Q2FjaGUgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUV2ZW50KHYsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHJ1bk9uY2UpIHtcbiAgICAgIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgICB2YXIgb3JpZ2luYWxDYWxsYmFjaztcblxuICAgICAgaWYgKCFpc1N0cmluZyhldmVudE5hbWUpKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBldmVudE5hbWUpIHtcbiAgICAgICAgICB0aGlzLm9uKGtleSwgZGVsZWdhdGUsIGV2ZW50TmFtZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVsZWdhdGUpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZGVsZWdhdGU7XG4gICAgICAgIGRlbGVnYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gXCJyZWFkeVwiKSB7XG4gICAgICAgIG9uUmVhZHkoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciB0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModCwgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICByZXR1cm4gKHQgPSBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gdC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrLmNhbGwodCwgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGlmIChydW5PbmNlKSB7XG4gICAgICAgICAgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXJFdmVudCh2LCBldmVudE5hbWUsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGVsZWdhdGUsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbihldmVudE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHJlYWR5OiBvblJlYWR5LFxuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgdmFyIGV2dCA9IGRvYy5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICBldnQuZGF0YSA9IGRhdGE7XG4gICAgICBldnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZW5jb2RlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUyMC9nLCBcIitcIik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZWxlY3RNdWx0aXBsZV8oZWwpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZWFjaChlbC5vcHRpb25zLCBmdW5jdGlvbiAobykge1xuICAgICAgaWYgKG8uc2VsZWN0ZWQpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goby52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXMgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0U2luZ2xlXyhlbCkge1xuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gZWwuc2VsZWN0ZWRJbmRleDtcbiAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA+PSAwID8gZWwub3B0aW9uc1tzZWxlY3RlZEluZGV4XS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWYWx1ZShlbCkge1xuICAgIHZhciB0eXBlID0gZWwudHlwZTtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSBcInNlbGVjdC1vbmVcIjpcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdFNpbmdsZV8oZWwpO1xuICAgICAgY2FzZSBcInNlbGVjdC1tdWx0aXBsZVwiOlxuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0TXVsdGlwbGVfKGVsKTtcbiAgICAgIGNhc2UgXCJyYWRpb1wiOlxuICAgICAgICByZXR1cm4gKGVsLmNoZWNrZWQpID8gZWwudmFsdWUgOiBudWxsO1xuICAgICAgY2FzZSBcImNoZWNrYm94XCI6XG4gICAgICAgIHJldHVybiAoZWwuY2hlY2tlZCkgPyBlbC52YWx1ZSA6IG51bGw7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZWwudmFsdWUgPyBlbC52YWx1ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBxdWVyeSA9IFwiXCI7XG5cbiAgICAgIGVhY2godGhpc1swXS5lbGVtZW50cyB8fCB0aGlzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmRpc2FibGVkIHx8IGVsLnRhZ05hbWUgPT09IFwiRklFTERTRVRcIikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZSA9IGVsLm5hbWU7XG4gICAgICAgIHN3aXRjaCAoZWwudHlwZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgY2FzZSBcImZpbGVcIjpcbiAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICBjYXNlIFwic3VibWl0XCI6XG4gICAgICAgICAgY2FzZSBcImJ1dHRvblwiOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInNlbGVjdC1tdWx0aXBsZVwiOlxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGdldFZhbHVlKGVsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGVuY29kZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGVsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHF1ZXJ5LnN1YnN0cigxKTtcbiAgICB9LFxuXG4gICAgdmFsOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChlbCwgY2hpbGQsIHByZXBlbmQpIHtcbiAgICBpZiAocHJlcGVuZCkge1xuICAgICAgdmFyIGZpcnN0ID0gZWwuY2hpbGROb2Rlc1swXTtcbiAgICAgIGVsLmluc2VydEJlZm9yZShjaGlsZCwgZmlyc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0Q29udGVudChwYXJlbnQsIGNoaWxkLCBwcmVwZW5kKSB7XG4gICAgdmFyIHN0ciA9IGlzU3RyaW5nKGNoaWxkKTtcblxuICAgIGlmICghc3RyICYmIGNoaWxkLmxlbmd0aCkge1xuICAgICAgZWFjaChjaGlsZCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIGluc2VydENvbnRlbnQocGFyZW50LCB2LCBwcmVwZW5kKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVhY2gocGFyZW50LCBzdHIgPyBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaW5zZXJ0QWRqYWNlbnRIVE1MKHByZXBlbmQgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsIGNoaWxkKTtcbiAgICB9IDogZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgIHJldHVybiBpbnNlcnRFbGVtZW50KHYsIChpID09PSAwID8gY2hpbGQgOiBjaGlsZC5jbG9uZU5vZGUodHJ1ZSkpLCBwcmVwZW5kKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QWZ0ZXIodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBhcHBlbmRUbzogZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudChjYXNoKHBhcmVudCksIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBjYXNoKHNlbGVjdG9yKS5pbnNlcnRCZWZvcmUodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaHRtbChcIlwiKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBodG1sOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS5pbm5lckhUTUw7XG4gICAgICB9XG4gICAgICB2YXIgc291cmNlID0gKGNvbnRlbnQubm9kZVR5cGUgPyBjb250ZW50WzBdLm91dGVySFRNTCA6IGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5pbm5lckhUTUwgPSBzb3VyY2U7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuXG4gICAgICBjYXNoKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZSwgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuICAgICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIHNpYmxpbmcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgY2FzaChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIF90aGlzMi5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSgoaSA9PT0gMCA/IHYgOiB2LmNsb25lTm9kZSh0cnVlKSksIGVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaW5zZXJ0Q29udGVudCh0aGlzLCBjb250ZW50LCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmVwZW5kVG86IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQoY2FzaChwYXJlbnQpLCB0aGlzLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0ZXh0OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGVsLm9mZnNldExlZnQsXG4gICAgICAgIHRvcDogZWwub2Zmc2V0VG9wXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWN0ID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbC5jbGllbnRUb3AsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsLmNsaWVudExlZnRcbiAgICAgIH07XG4gICAgfSxcblxuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5vZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICB9KTtcblxuICBmbi5leHRlbmQoe1xuICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBlbC5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICAgIGVsZW1zID0gdW5pcXVlKGVsZW1zKTtcblxuICAgICAgcmV0dXJuICghc2VsZWN0b3IgPyBlbGVtcyA6IGVsZW1zLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyh2LCBzZWxlY3Rvcik7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3RvciB8fCB0aGlzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIoc2VsZWN0b3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50KCkuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgfSxcblxuICAgIGlzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2ggPSBmYWxzZSwgY29tcGFyYXRvciA9IGdldENvbXBhcmVGdW5jdGlvbihzZWxlY3Rvcik7XG5cbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbWF0Y2ggPSBjb21wYXJhdG9yKGVsLCBzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiAhbWF0Y2g7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0sXG5cbiAgICBmaW5kOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3Iubm9kZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhc2goc2VsZWN0b3IgJiYgdGhpcy5oYXMoc2VsZWN0b3IpLmxlbmd0aCA/IHNlbGVjdG9yIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbGVtcyA9IFtdO1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBwdXNoLmFwcGx5KGVsZW1zLCBmaW5kKHNlbGVjdG9yLCBlbCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUoZWxlbXMpO1xuICAgIH0sXG5cbiAgICBoYXM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIGNvbXBhcmF0b3IgPSAoaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbCkubGVuZ3RoICE9PSAwO1xuICAgICAgfSA6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gZWwuY29udGFpbnMoc2VsZWN0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgICB9LFxuXG4gICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIH0sXG5cbiAgICBub3Q6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiAhY29tcGFyYXRvcihlbCwgc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHBhcmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgcGFyZW50czogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgbGFzdCwgcmVzdWx0ID0gW107XG5cbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBsYXN0ID0gaXRlbTtcblxuICAgICAgICB3aGlsZSAobGFzdCAmJiBsYXN0LnBhcmVudE5vZGUgJiYgbGFzdCAhPT0gZG9jLmJvZHkucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGxhc3QgPSBsYXN0LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IChzZWxlY3RvciAmJiBtYXRjaGVzKGxhc3QsIHNlbGVjdG9yKSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGxhc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1bmlxdWUocmVzdWx0KTtcbiAgICB9LFxuXG4gICAgcHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNhc2godGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbiAgICB9LFxuXG4gICAgc2libGluZ3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLCBlbCA9IHRoaXNbMF07XG5cbiAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gaSAhPT0gZWw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cblxuICByZXR1cm4gY2FzaDtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jYXNoLWRvbS9kaXN0L2Nhc2guanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IGNvbnRlbnRDbiA9IGNsYXNzTmFtZSA9PiBgJHtjbGFzc05hbWV9X19jb250ZW50YDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nQ24gPSBjbGFzc05hbWUgPT4gYCR7Y29udGVudENuKGNsYXNzTmFtZSl9X19oZWFkaW5nYDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nTGFiZWxDbiA9IGNsYXNzTmFtZSA9PiBgJHtoZWFkaW5nQ24oY2xhc3NOYW1lKX1fX2xhYmVsYDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nSWNvbkNuID0gY2xhc3NOYW1lID0+IGAke2hlYWRpbmdDbihjbGFzc05hbWUpfV9faWNvbmA7XG5leHBvcnQgY29uc3QgbWVudUNuID0gY2xhc3NOYW1lID0+IGAke2NsYXNzTmFtZX1fX21lbnVgO1xuZXhwb3J0IGNvbnN0IG1lbnVXcmFwcGVyQ24gPSBjbGFzc05hbWUgPT4gYCR7bWVudUNuKGNsYXNzTmFtZSl9LXdyYXBwZXJgO1xuZXhwb3J0IGNvbnN0IG1lbnVJdGVtQ24gPSBjbGFzc05hbWUgPT4gYCR7bWVudUNuKGNsYXNzTmFtZSl9X19pdGVtYDtcbmV4cG9ydCBjb25zdCBtZW51SXRlbUxhYmVsQ24gPSBjbGFzc05hbWUgPT4gYCR7bWVudUl0ZW1DbihjbGFzc05hbWUpfV9fbGFiZWxgO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lcy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCB7Y29udGVudENufSBmcm9tICcuL2VsZW1lbnQtY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KSB7XG4gICAgbGV0IGNvbnRlbnRDbGFzc05hbWUgPSBjb250ZW50Q24oY2xhc3NOYW1lKTtcbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSB3aWRnZXQuY2hpbGRyZW4oYC4ke2NvbnRlbnRDbGFzc05hbWV9YCk7XG5cbiAgICBpZiAoY29udGVudEVsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRlbnRFbGVtZW50ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhjb250ZW50Q2xhc3NOYW1lKS5hcHBlbmQod2lkZ2V0LmNoaWxkcmVuKCkpLmFwcGVuZFRvKHdpZGdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRlbnRFbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWNvbnRlbnQuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgc2Nyb2xsVG8gZnJvbSAnLi4vLi4vLi4vanMtdXRpbHMvc2Nyb2xsLXRvJztcblxuZnVuY3Rpb24gZ2VuQWN0aXZhdGVJdGVtKGhlYWRpbmdBbmNob3JzLCBhbGxBbmNob3JzKSB7XG4gICAgcmV0dXJuIChpZCwgc2Nyb2xsKSA9PiB7XG4gICAgICAgIGFsbEFuY2hvcnMuZmlsdGVyKGBbZGF0YS1pZD1cIiR7aWR9XCJdLmluYWN0aXZlYCkucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICBhbGxBbmNob3JzLmZpbHRlcihgLmFjdGl2ZWApLm5vdChgW2RhdGEtaWQ9XCIke2lkfVwiXWApLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnaW5hY3RpdmUnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICAgICAgc2Nyb2xsVG8oaGVhZGluZ0FuY2hvcnMuZmlsdGVyKGBbZGF0YS1pZD1cIiR7aWR9XCJdYCkpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGVBbGwoYWxsQW5jaG9ycykge1xuICAgIGFsbEFuY2hvcnMuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdpbmFjdGl2ZScpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZUxpbmtzKGhlYWRpbmdzLCBtZW51ID0gbnVsbCwgY2FuRGVhY3RpdmF0ZSA9IGZhbHNlLCBzY3JvbGxPbkFjdGl2YXRlID0gZmFsc2UsIGFjdGl2YXRlSW5pdGlhbCA9IG51bGwpIHtcbiAgICBsZXQgaGVhZGluZ0FuY2hvcnMgPSBoZWFkaW5ncy5yZWR1Y2UoKGFjYywge2l0ZW19KSA9PiBhY2MuYWRkKGl0ZW0uaXMoJ1tkYXRhLWlkXScpID8gaXRlbSA6IGl0ZW0ucGFyZW50KCkpLCAkKCkpO1xuICAgIGxldCBhbGxBbmNob3JzID0gbWVudSA/IGhlYWRpbmdBbmNob3JzLmFkZChtZW51LmZpbmQoJ2FbZGF0YS1pZF0nKSkgOiBoZWFkaW5nQW5jaG9ycztcblxuICAgIGxldCBhY3RpdmF0ZUl0ZW0gPSBnZW5BY3RpdmF0ZUl0ZW0oaGVhZGluZ0FuY2hvcnMsIGFsbEFuY2hvcnMpO1xuXG4gICAgYWxsQW5jaG9ycy5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBhbmNob3IgPSAkKHRoaXMpO1xuICAgICAgICBpZiAoYW5jaG9yLmhhc0NsYXNzKCdpbmFjdGl2ZScpKSB7XG4gICAgICAgICAgICBhY3RpdmF0ZUl0ZW0oJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksIHNjcm9sbE9uQWN0aXZhdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNhbkRlYWN0aXZhdGUpIHtcbiAgICAgICAgICAgIGRlYWN0aXZhdGVBbGwoYWxsQW5jaG9ycyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChhY3RpdmF0ZUluaXRpYWwgIT09IG51bGwpIHtcbiAgICAgICAgYWN0aXZhdGVJdGVtKGFjdGl2YXRlSW5pdGlhbCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3RpdmF0ZUl0ZW07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1saW5rcy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCB7aGVhZGluZ0NufSBmcm9tICcuL2VsZW1lbnQtY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgY29udGVudCkge1xuICAgIGxldCBoZWFkaW5nVGFnTmFtZSA9IGNvbnRlbnQuY2hpbGRyZW4oKS5maXJzdCgpLnByb3AoJ3RhZ05hbWUnKTtcbiAgICBsZXQgaGVhZGVyRWxlbWVudHMgPSBjb250ZW50LmNoaWxkcmVuKGhlYWRpbmdUYWdOYW1lKTtcblxuICAgIHJldHVybiBoZWFkZXJFbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtaWQnLCBpKTtcbiAgICAgICAgbGV0IGNvbnRlbnRFbGVtZW50cyA9IFtdO1xuICAgICAgICBsZXQgbmV4dCA9IGl0ZW0ubmV4dCgpO1xuICAgICAgICB3aGlsZShuZXh0Lmxlbmd0aCA+IDAgJiYgbmV4dC5wcm9wKCd0YWdOYW1lJykgICE9PSBoZWFkaW5nVGFnTmFtZSkge1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnRzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29udGVudCA9ICQoJzxkaXY+PC9kaXY+JykuYXBwZW5kKGNvbnRlbnRFbGVtZW50cykuaW5zZXJ0QWZ0ZXIoaXRlbSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgdGV4dDogaXRlbS5odG1sKCksXG4gICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGxlZEludG9WaWV3KGVsZW0pIHtcbiAgICBsZXQgZG9jVmlld1RvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIGxldCBkb2NWaWV3Qm90dG9tID0gZG9jVmlld1RvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIGxldCBlbGVtVG9wID0gZWxlbS5vZmZzZXQoKS50b3A7XG4gICAgbGV0IGVsZW1IZWlnaHQgPSBlbGVtLmhlaWdodCgpO1xuICAgIGxldCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW1IZWlnaHQ7XG5cbiAgICBsZXQgdmlld1RvcCA9IE1hdGgubWF4KGVsZW1Ub3AsIGRvY1ZpZXdUb3ApO1xuICAgIGxldCB2aWV3Qm90dG9tID0gTWF0aC5taW4oZWxlbUJvdHRvbSwgZG9jVmlld0JvdHRvbSk7XG5cbiAgICByZXR1cm4gKHZpZXdCb3R0b20gLSB2aWV3VG9wKSAvIGVsZW1IZWlnaHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3LmpzIiwiaW1wb3J0ICQgZnJvbSBcImNhc2gtZG9tXCI7XG5pbXBvcnQge2hlYWRpbmdDbiwgaGVhZGluZ0xhYmVsQ24sIGhlYWRpbmdJY29uQ259IGZyb20gJy4vZWxlbWVudC1jbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzKHBhdHRlcm5DbGFzc25hbWUsIHdpZGdldCwgaW5kZXgsIGhlYWRpbmdzKSB7XG4gICAgbGV0IGhlYWRpbmdDbGFzcyA9IGhlYWRpbmdDbihwYXR0ZXJuQ2xhc3NuYW1lKTtcblxuICAgIGxldCBhbmNob3JzID0gW107XG5cbiAgICBoZWFkaW5ncy5mb3JFYWNoKCh7ZWxlbWVudCwgaXRlbSwgdGV4dH0pID0+IHtcbiAgICAgICAgbGV0IGFuY2hvciA9ICQoJzxhLz4nKS5hZGRDbGFzcyhgJHtoZWFkaW5nQ2xhc3N9IGluYWN0aXZlYCk7XG4gICAgICAgIGFuY2hvcnMucHVzaChhbmNob3IpO1xuICAgICAgICBhbmNob3IuYXR0cignaHJlZicsICcjJyk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgZWxlbWVudC5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSAkKCc8c3Bhbi8+Jyk7XG4gICAgICAgICAgICBzcGFuLmh0bWwodGV4dCk7XG4gICAgICAgICAgICBpdGVtLmVtcHR5KCk7XG4gICAgICAgICAgICBzcGFuLmFkZENsYXNzKGhlYWRpbmdMYWJlbENuKHBhdHRlcm5DbGFzc25hbWUpKTtcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKHNwYW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yLmFwcGVuZChpdGVtLmNoaWxkcmVuKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGljb24gPSAkKCc8c3Bhbi8+Jyk7XG4gICAgICAgIGljb24uYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBpY29uLmFkZENsYXNzKGhlYWRpbmdJY29uQ24ocGF0dGVybkNsYXNzbmFtZSkpO1xuICAgICAgICBpdGVtLmFwcGVuZChpY29uKTtcbiAgICAgICAgYW5jaG9yLmluc2VydEJlZm9yZShpdGVtKTtcbiAgICAgICAgYW5jaG9yLmFwcGVuZChpdGVtKTtcbiAgICAgICAgYW5jaG9yLmF0dHIoJ2RhdGEtaWQnLCBpdGVtLmF0dHIoJ2RhdGEtaWQnKSk7XG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cignZGF0YS1pZCcpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGhlYWRpbmdzO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHttZW51Q24sIG1lbnVXcmFwcGVyQ24sIG1lbnVJdGVtQ24sIG1lbnVJdGVtTGFiZWxDbn0gZnJvbSAnLi9lbGVtZW50LWNsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlVGFic0hlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBpLCBoZWFkaW5ncywgY29udGVudCwgd3JhcCA9IGZhbHNlKSB7XG4gICAgbGV0IHRhYnNCYXIgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKG1lbnVDbihjbGFzc05hbWUpKTtcblxuICAgIGhlYWRpbmdzLmZvckVhY2goKHt0ZXh0LCBpZH0pID0+IHtcbiAgICAgICAgbGV0IGFuY2hvciA9ICQoJzxhIGhyZWY9XCIjXCI+PC9hPicpLmFkZENsYXNzKG1lbnVJdGVtQ24oY2xhc3NOYW1lKSkuYWRkQ2xhc3MoJ2luYWN0aXZlJykuYXR0cignZGF0YS1pZCcsIGlkKTtcbiAgICAgICAgJCgnPHNwYW4+PC9zcGFuPicpLmFkZENsYXNzKG1lbnVJdGVtTGFiZWxDbihjbGFzc05hbWUpKS5odG1sKHRleHQpLmFwcGVuZFRvKGFuY2hvcik7XG5cbiAgICAgICAgYW5jaG9yLmFwcGVuZFRvKHRhYnNCYXIpO1xuICAgIH0pO1xuXG4gICAgaWYgKHdyYXApIHtcbiAgICAgICAgJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhtZW51V3JhcHBlckNuKGNsYXNzTmFtZSkpLmFwcGVuZCh0YWJzQmFyKS5pbnNlcnRCZWZvcmUoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFic0Jhci5pbnNlcnRCZWZvcmUoY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhYnNCYXI7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtbWVudS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbFRvKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50WzBdLnNjcm9sbEludG9WaWV3KCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL3Njcm9sbC10by5qcyIsImltcG9ydCB1cmxEcm9wZG93biBmcm9tICcuL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bic7XG5pbXBvcnQgbGF6eUxvYWQgZnJvbSAnLi9jb21wb25lbnRzL2xhenktbG9hZC9sYXp5LWxvYWQnO1xuaW1wb3J0IGFjY29yZGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2FjY29yZGlvblwiO1xuaW1wb3J0IHZpZGVvUHJldmlldyBmcm9tIFwiLi9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlld1wiO1xuaW1wb3J0IG5hdk1vYmlsZSBmcm9tIFwiLi9jb21wb25lbnRzL25hdi1tb2JpbGVcIjtcbmltcG9ydCB0YWJzIGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvdGFic1wiO1xuaW1wb3J0IGxpbmtlZENvbnRlbnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9saW5rZWQtY29udGVudFwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgICBsaW5rZWRDb250ZW50LFxuICAgIHRhYnMsXG4gICAgYWNjb3JkaW9uLFxuICAgIHZpZGVvUHJldmlldyxcbiAgICBsYXp5TG9hZCxcbiAgICB1cmxEcm9wZG93bixcbiAgICBuYXZNb2JpbGVcbl07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50LWxpc3QuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgZmluZEhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtc2VjdGlvbnMnO1xuaW1wb3J0IHByZXBhcmVDb250ZW50IGZyb20gJy4vY29tbW9uL3ByZXBhcmUtY29udGVudCc7XG5pbXBvcnQgcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtYWNjb3JkaW9uLWhlYWRpbmdzJztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCwgaSkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgY29udGVudCA9IHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KTtcbiAgICBsZXQgaGVhZGluZ3MgPSBmaW5kSGVhZGluZ3MoY2xhc3NOYW1lLCB3aWRnZXQsIGNvbnRlbnQpO1xuXG4gICAgcHJlcGFyZUFjY29yZGlvbkhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBpLCBoZWFkaW5ncyk7XG4gICAgcHJlcGFyZUxpbmtzKGhlYWRpbmdzLCBudWxsLCB0cnVlLCB0cnVlKTtcbn1cblxuY29uc3QgY2xhc3NOYW1lID0gJ2FjY29yZGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsYXVuY2gsXG4gICAgY2xhc3NOYW1lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb24uanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQgZmluZEhlYWRpbmdzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtc2VjdGlvbnMnO1xuaW1wb3J0IHByZXBhcmVDb250ZW50IGZyb20gJy4vY29tbW9uL3ByZXBhcmUtY29udGVudCc7XG5pbXBvcnQgcHJlcGFyZU1lbnUgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1tZW51JztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5pbXBvcnQgc2Nyb2xsZWRJbnRvVmlldyBmcm9tICcuLi8uLi9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcnO1xuaW1wb3J0IHtpbml0TW92ZUludG9WaWV3fSBmcm9tICcuLi8uLi9qcy11dGlscy9tb3ZlLWludG8tdmlldy1pbi1jb250YWluZXInO1xuXG5jb25zdCBjbGFzc05hbWUgPSAnbGlua2VkLWNvbnRlbnQnO1xuXG5mdW5jdGlvbiBsYXVuY2goZWwsIGkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gJChlbCk7XG4gICAgbGV0IGNvbnRlbnQgPSBwcmVwYXJlQ29udGVudChjbGFzc05hbWUsIHdpZGdldCk7XG4gICAgbGV0IGhlYWRpbmdzID0gZmluZEhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBjb250ZW50KTtcblxuICAgIGxldCBtZW51ID0gcHJlcGFyZU1lbnUoY2xhc3NOYW1lLCB3aWRnZXQsIGksIGhlYWRpbmdzLCBjb250ZW50LCB0cnVlKTtcbiAgICBsZXQgYWN0aXZhdGVJdGVtID0gcHJlcGFyZUxpbmtzKGhlYWRpbmdzLCBtZW51LCBmYWxzZSwgdHJ1ZSwgaGVhZGluZ3MubGVuZ3RoID4gMCAmJiBoZWFkaW5nc1swXS5pZCk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgbGV0IGJlc3QgPSBoZWFkaW5nc1xuICAgICAgICAgICAgLm1hcCgoe2l0ZW19KSA9PiBzY3JvbGxlZEludG9WaWV3KGl0ZW0sIHdpZGdldCkpXG4gICAgICAgICAgICAucmVkdWNlKChtYXhJbmRleCwgdiwgaSwgYXJyKSA9PiB2ID4gYXJyW21heEluZGV4XSA/IGkgOiBtYXhJbmRleCwgMCk7XG5cbiAgICAgICAgYWN0aXZhdGVJdGVtKGhlYWRpbmdzW2Jlc3RdLmlkKTtcbiAgICB9KTtcblxuICAgIGluaXRNb3ZlSW50b1ZpZXcobWVudSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxhdW5jaCxcbiAgICBjbGFzc05hbWVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2xpbmtlZC1jb250ZW50LmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IGZpbmRIZWFkaW5ncyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zJztcbmltcG9ydCBwcmVwYXJlQ29udGVudCBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWNvbnRlbnQnO1xuaW1wb3J0IHByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWFjY29yZGlvbi1oZWFkaW5ncyc7XG5pbXBvcnQgcHJlcGFyZU1lbnUgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1tZW51JztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICd0YWJzJztcblxuXG5mdW5jdGlvbiBsYXVuY2goZWwsIGkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gJChlbCk7XG4gICAgbGV0IGNvbnRlbnQgPSBwcmVwYXJlQ29udGVudChjbGFzc05hbWUsIHdpZGdldCk7XG4gICAgbGV0IGhlYWRpbmdzID0gZmluZEhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBjb250ZW50KTtcblxuICAgIHByZXBhcmVBY2NvcmRpb25IZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgaSwgaGVhZGluZ3MpO1xuICAgIGxldCBtZW51ID0gcHJlcGFyZU1lbnUoY2xhc3NOYW1lLCB3aWRnZXQsIGksIGhlYWRpbmdzLCBjb250ZW50KTtcbiAgICBwcmVwYXJlTGlua3MoaGVhZGluZ3MsIG1lbnUsIGZhbHNlLCBmYWxzZSwgaGVhZGluZ3MubGVuZ3RoID4gMCAmJiBoZWFkaW5nc1swXS5pZCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxhdW5jaCxcbiAgICBjbGFzc05hbWVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL3RhYnMuanMiLCJpbXBvcnQgTGF6eUxvYWQgZnJvbSBcInZhbmlsbGEtbGF6eWxvYWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIG5ldyBMYXp5TG9hZCh7XG4gICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiBcIi5sYXp5LWxvYWRcIixcbiAgICAgICAgZGF0YV9zcmM6ICdzcmMnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIGNhbGxiYWNrX2xvYWQ6IGltZyA9PiB7XG4gICAgICAgICAgICBpbWcuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2xhenktbG9hZC9sYXp5LWxvYWQuanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcbmltcG9ydCBOYXZNb2JpbGUgZnJvbSAnLi9uYXYtbW9iaWxlJztcbmltcG9ydCB7dHJlZSwgY3VycmVudH0gZnJvbSAnLi9wYXJzZS1uYXYnO1xuXG5cbmZ1bmN0aW9uIGxhdW5jaCgpIHtcbiAgICBsZXQgZWxlbWVudCA9ICQodGhpcyk7XG4gICAgbGV0IG5hdiA9IG5ldyBOYXZNb2JpbGUoZWxlbWVudCwgdHJlZSwgY3VycmVudCk7XG4gICAgbmF2LmxhdW5jaCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xhc3NOYW1lOiAnbmF2LW1vYmlsZScsXG4gICAgbGF1bmNoXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9pbmRleC5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGNsb25lIGZyb20gJ2Nsb25lJztcbmltcG9ydCBzY3JvbGxUbyBmcm9tICcuLi8uLi9qcy11dGlscy9zY3JvbGwtdG8nO1xuaW1wb3J0IHNjcm9sbGVkSW50b1ZpZXcgZnJvbSAnLi4vLi4vanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3JztcblxuZnVuY3Rpb24gcHJlcGFyZVRyZWVJZHModHJlZSwgbWFwLCBwYXJlbnRJZCA9IG51bGwpIHtcbiAgICB0cmVlLnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdHJlZS5pZCA9IChwYXJlbnRJZCA/IHBhcmVudElkICsgJy4nIDogJycpICsgdHJlZS5pbmRleDtcbiAgICBtYXBbdHJlZS5pZF0gPSB0cmVlO1xuICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBwcmVwYXJlVHJlZUlkcyhjaGlsZCwgbWFwLCB0cmVlLmlkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdk1vYmlsZSB7XG4gICAgY29uc3RydWN0b3IobmF2LCB0cmVlLCBkZWZhdWx0T3Blbikge1xuICAgICAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICAgICAgdGhpcy50cmVlID0gY2xvbmUodHJlZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlID0gbmF2LmZpbmQoJy5uYXYtbW9iaWxlX190b2dnbGUnKTtcbiAgICAgICAgdGhpcy5tZW51ID0gbmF2LmZpbmQoJy5uYXYtbW9iaWxlX19jb250ZW50Jyk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0T3BlbiA9IFt0aGlzLnRyZWVdO1xuICAgICAgICBkZWZhdWx0T3Blbi5zbGljZSgxKS5mb3JFYWNoKCh7aW5kZXh9LCBpKSA9PiB0aGlzLmRlZmF1bHRPcGVuLnB1c2godGhpcy5kZWZhdWx0T3BlbltpXS5jaGlsZHJlbltpbmRleF0pKTtcblxuICAgICAgICB0aGlzLnRvZ2dsZUNoaWxkcmVuID0gdGhpcy50b2dnbGVDaGlsZHJlbi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubGV2ZWxNYXAgPSB7fTtcbiAgICAgICAgcHJlcGFyZVRyZWVJZHModGhpcy50cmVlLCB0aGlzLmxldmVsTWFwKTtcblxuICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLm5hdi5wcmV2KCk7XG4gICAgICAgIGlmIChsYWJlbC5sZW5ndGggPiAwICYmIGxhYmVsLmF0dHIoJ2ZvcicpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICQoYCMke2xhYmVsLmF0dHIoJ2ZvcicpfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGF1bmNoKCkge1xuICAgICAgICBsZXQge3RvZ2dsZUNoaWxkcmVufSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5uYXYub24oJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZV0nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB0b2dnbGVDaGlsZHJlbigkKHRoaXMpLmF0dHIoJ2RhdGEtdG9nZ2xlJykpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50b2dnbGUucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTmF2KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUl0ZW1FbGVtZW50KHRoaXMudHJlZSk7XG4gICAgfVxuXG5cbiAgICB0b2dnbGVDaGlsZHJlbihpdGVtLCBmb3JjZU9wZW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgaXRlbSA9IHRoaXMubGV2ZWxNYXBbaXRlbV07XG5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGFuY2VzdG9ycyA9IGl0ZW0uZWxlbWVudC5wYXJlbnRzKCcubmF2LW1vYmlsZV9fbGV2ZWwnKTtcbiAgICAgICAgICAgIGxldCBzZXRPcGVuID0gZm9yY2VPcGVuIHx8ICFpdGVtLmVsZW1lbnQuaGFzQ2xhc3MoJ29wZW4nKTtcblxuICAgICAgICAgICAgaWYgKHNldE9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuZmluZCgnLm5hdi1tb2JpbGVfX2xldmVsLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLmVsZW1lbnQudG9nZ2xlQ2xhc3MoJ29wZW4nLCBzZXRPcGVuKTtcblxuICAgICAgICAgICAgaXRlbS5lbGVtZW50LmNoaWxkcmVuKCcubmF2LW1vYmlsZV9fbGV2ZWxfX2hlYWRlcicpLmZpbmQoJy5uYXYtbW9iaWxlX190b2dnbGUtbGluayBzcGFuJylcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ19fZmEtcGx1cycsICFzZXRPcGVuKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnX19mYS1taW51cycsIHNldE9wZW4pO1xuXG4gICAgICAgICAgICBpZiAoc2V0T3Blbikge1xuICAgICAgICAgICAgICAgIGFuY2VzdG9ycy5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHRoaXMucHJlcGFyZUl0ZW1FbGVtZW50KGl0ZW0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkSW50b1ZpZXcoaXRlbS5lbGVtZW50KSA8IDEpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUbyhpdGVtLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbk5hdigpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0T3Blbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQoaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNoaWxkcmVuKGl0ZW0sIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wZW5bdGhpcy5kZWZhdWx0T3Blbi5sZW5ndGggLSAxXS5lbGVtZW50WzBdLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfVxuXG5cbiAgICBwcmVwYXJlSXRlbUVsZW1lbnQoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0uZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucGFyZW50SWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5sZXZlbE1hcFtpdGVtLnBhcmVudElkXS5jaGlsZHJlbkNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoJzxkaXY+PC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGBuYXYtbW9iaWxlX19sZXZlbCBuYXYtbW9iaWxlX19sZXZlbC0tbCR7aXRlbS5sZXZlbH1gKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXIgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCduYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyJykuYXBwZW5kVG8oZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAkKCc8YSBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua1wiPjwvYT4nKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYG5hdi1tb2JpbGVfX3BhZ2UtbGluay0tdCR7aXRlbS50eXBlfWApXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgaXRlbS51cmwgKyBsb2NhdGlvbi5zZWFyY2gpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJuYXYtbW9iaWxlX19wYWdlLWxpbmtfX2xhYmVsXCI+PC9zcGFuPicpLmh0bWwoaXRlbS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGhlYWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlblRvZ2dsZSA9ICQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuYXYtbW9iaWxlX190b2dnbGUtbGlua1wiPjxzcGFuIGNsYXNzPVwiZmEgX19mYS1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT4nKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5Ub2dnbGUgPSBjaGlsZHJlblRvZ2dsZS5hdHRyKCdkYXRhLXRvZ2dsZScsIGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRvZ2dsZS5hcHBlbmRUbyhoZWFkZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0uZWxlbWVudCA9IHRoaXMubWVudTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbkNvbnRhaW5lciA9ICQoJzx1bD48L3VsPicpLmFwcGVuZFRvKGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvbmF2LW1vYmlsZS5qcyIsImNvbnN0IFBBUlNFX1JFR0VYID0gL15cXHMqKFswLTldKSAoW15cXHNdKykgKFswLTldKSAoLispJC87XG5cbmZ1bmN0aW9uIGxvYWREYXRhKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tb2JpbGVfX2RhdGFcIikuaW5uZXJIVE1MO1xufVxuXG5mdW5jdGlvbiBwYXJzZU5hdihkYXRhKSB7XG4gICAgbGV0IHRyZWUgPSB7XG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIGluZGV4OiBudWxsLFxuICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICB9O1xuXG4gICAgbGV0IGFuY2VzdG9ycyA9IFtdO1xuXG4gICAgZGF0YS5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgIGxldCBtYXRjaCA9IGxpbmUubWF0Y2goUEFSU0VfUkVHRVgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGxldCBbLCBsZXZlbFN0ciwgdXJsLCB0eXBlU3RyLCBuYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgbGV0IGxldmVsID0gcGFyc2VJbnQobGV2ZWxTdHIpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBwYXJzZUludCh0eXBlU3RyKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0ge2xldmVsLCB0eXBlLCB1cmwsIG5hbWUsIGNoaWxkcmVuOiBbXSwgaW5kZXg6IDB9O1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGFuY2VzdG9yc1tsZXZlbCAtIDFdO1xuICAgICAgICAgICAgICAgIGl0ZW0uaW5kZXggPSBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmVlID0gaXRlbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW5jZXN0b3JzW2xldmVsXSA9IGl0ZW07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBjdXJyZW50SGVhZCA9IHRyZWU7XG4gICAgbGV0IGN1cnJlbnQgPSBbXTtcbiAgICB3aGlsZSAoY3VycmVudEhlYWQgJiYgY3VycmVudEhlYWQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjdXJyZW50LnB1c2goY3VycmVudEhlYWQpO1xuICAgICAgICBjdXJyZW50SGVhZCA9IGZpbmRDdXJyZW50KGN1cnJlbnRIZWFkLmNoaWxkcmVuKTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7dHJlZSwgY3VycmVudH07XG59XG5cbmZ1bmN0aW9uIGZpbmRDdXJyZW50KGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV0udHlwZSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmxldCB7dHJlZSwgY3VycmVudH0gPSBwYXJzZU5hdihsb2FkRGF0YSgpKTtcblxuZXhwb3J0IHt0cmVlLCBjdXJyZW50fTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9wYXJzZS1uYXYuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgc2VsZWN0ID0gd2lkZ2V0LmNoaWxkcmVuKCdzZWxlY3QnKTtcblxuICAgIHdpZGdldC5vbignY2hhbmdlJywgJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IHNlbGVjdC5jaGlsZHJlbigpLmVxKHNlbGVjdC5wcm9wKCdzZWxlY3RlZEluZGV4JykpLmF0dHIoJ2RhdGEtdXJsJyk7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsICsgJy9fbm9jYWNoZScgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICd1cmwtZHJvcGRvd24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGF1bmNoLFxuICAgIGNsYXNzTmFtZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bi5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGV4dGVuZCBmcm9tIFwiZXh0ZW5kXCI7XG5pbXBvcnQgY3JlYXRlWW91dHViZVBsYXllciBmcm9tIFwiLi4vLi4vanMtdXRpbHMveW91dHViZS1wbGF5ZXJcIjtcbmltcG9ydCBzY29sbGVkSW50b1ZpZXcgZnJvbSBcIi4uLy4uL2pzLXV0aWxzL3Njcm9sbGVkLWludG8tdmlld1wiO1xuXG5jb25zdCBERUZBVUxUX1BBUkFNUyA9IHtcbiAgICBmcmFtZUJvcmRlcjogXCIwXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRZb3V0dWJlVmlkZW8od3JhcHBlciwge2lkLCBwYXJhbXN9KSB7XG4gICAgbGV0IGlmcmFtZUlkID0gYHl0ZXYtJHtpZH1gO1xuXG4gICAgbGV0IGxpbmsgPSB3cmFwcGVyLmNoaWxkcmVuKCdhJyk7XG4gICAgbGV0IGZhbGxiYWNrUGFyYW1zID0ge1xuICAgICAgICB3aWR0aDogbGluay53aWR0aCgpLFxuICAgICAgICBoZWlnaHQ6IGxpbmsuaGVpZ2h0KClcbiAgICB9O1xuXG4gICAgbGV0IHBsYXllclBhcmFtcyA9IGV4dGVuZCh7fSxcbiAgICAgICAgREVGQVVMVF9QQVJBTVMsXG4gICAgICAgIGZhbGxiYWNrUGFyYW1zLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZpZGVvSWQ6IGlkLFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25Jbml0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJzxkaXYvPicpLmF0dHIoJ2lkJywgaWZyYW1lSWQpLmF0dHIoZmFsbGJhY2tQYXJhbXMpLmluc2VydEJlZm9yZShsaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlYWR5OiBldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCd2aWRlby1wcmV2aWV3LXdyYXBwZXItLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbWVkaWEnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbWVkaWEtLXlvdXR1YmUnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jaGlsZHJlbihgOm5vdCgjJHtpZnJhbWVJZH0pYCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZnJhbWUgPSB3cmFwcGVyLmNoaWxkcmVuKCdpZnJhbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29sbGVkSW50b1ZpZXcoaWZyYW1lKSA8IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBjcmVhdGVZb3V0dWJlUGxheWVyKGlmcmFtZUlkLCBwbGF5ZXJQYXJhbXMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3LXlvdXR1YmUuanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcbmltcG9ydCBnZXREYXRhQXR0cmlidXRlcyBmcm9tIFwiLi4vLi4vanMtdXRpbHMvZ2V0LWRhdGEtYXR0cnNcIjtcbmltcG9ydCBsb2FkWW91dHViZVZpZGVvIGZyb20gXCIuL3ZpZGVvLXByZXZpZXcteW91dHViZVwiO1xuXG5mdW5jdGlvbiBnZXRTZXJ2aWNlKGxpbmspIHtcbiAgICBsZXQgaHJlZiA9IGxpbmsuYXR0cignaHJlZicpIHx8ICcnO1xuICAgIGxldCBwYXJhbXMgPSBnZXREYXRhQXR0cmlidXRlcyhsaW5rKTtcblxuICAgIGxldCB5dE1hdGNoID0gaHJlZi5tYXRjaCgvKD86aHR0cHM/OlxcL1xcLyk/KD86d3d3XFwuKT95b3V0dVxcLj9iZSg/OlxcLmNvbSk/XFwvPy4qKD86d2F0Y2h8ZW1iZWQpPyg/Oi4qdj18dlxcL3xcXC8pKFtcXHdcXC1fXSspXFwmPy8pO1xuICAgIGlmICh5dE1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogJ3lvdXR1YmUnLCBpZDogeXRNYXRjaFsxXSwgcGFyYW1zfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gbGF1bmNoKGVsKSB7XG4gICAgbGV0IGxpbmsgPSAkKGVsKTtcbiAgICBsZXQgc2VydmljZSA9IGdldFNlcnZpY2UobGluayk7XG5cbiAgICBpZiAoc2VydmljZSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gbGluay5wYXJlbnQoKTtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSBudWxsO1xuXG4gICAgICAgIGlmIChwYXJlbnQuaGFzQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlcicpKSB7XG4gICAgICAgICAgICB3cmFwcGVyID0gcGFyZW50O1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5wcm9wKFwidGFnTmFtZVwiKS50b0xvd2VyQ2FzZSgpID09PSAnZmlndXJlJykge1xuICAgICAgICAgICAgd3JhcHBlciA9IHBhcmVudDtcbiAgICAgICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3JhcHBlciA9ICQoJzxmaWd1cmUvPicpLmFkZENsYXNzKCd2aWRlby1wcmV2aWV3LXdyYXBwZXInKS5pbnNlcnRCZWZvcmUobGluayk7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZChsaW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpbmsub24oJ2NsaWNrJywgZXZ0ID0+IHtcbiAgICAgICAgICAgIGxvYWRWaWRlbyh3cmFwcGVyLCBzZXJ2aWNlKTtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRWaWRlbyh3cmFwcGVyLCBzZXJ2aWNlKSB7XG4gICAgc3dpdGNoIChzZXJ2aWNlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAneW91dHViZSc6XG4gICAgICAgICAgICByZXR1cm4gbG9hZFlvdXR1YmVWaWRlbyh3cmFwcGVyLCBzZXJ2aWNlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNsYXNzTmFtZTogJ3ZpZGVvLXByZXZpZXcnLFxuICAgIGxhdW5jaFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL3ZpZGVvLXByZXZpZXcvdmlkZW8tcHJldmlldy5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IHBhdHRlcm5zIGZyb20gJy4vY29tcG9uZW50LWxpc3QnO1xuXG5mdW5jdGlvbiBsYXVuY2hQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAocGF0dGVybi5jbGFzc05hbWUpIHtcbiAgICAgICAgbGV0IHtjbGFzc05hbWUsIGxhdW5jaH0gPSBwYXR0ZXJuO1xuICAgICAgICAkKGAuJHtjbGFzc05hbWV9Om5vdCguJHtjbGFzc05hbWV9LW5qcylgKS5lYWNoKGxhdW5jaCk7XG4gICAgfVxufVxuXG5cbiEoZnVuY3Rpb24gKCkge1xuICAgIHBhdHRlcm5zLmZvckVhY2gobGF1bmNoUGF0dGVybik7XG59KCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiY29uc3QgZGF0YUF0dHJSZWdleCA9IC9eZGF0YS0oLispJC87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERhdGFBdHRyaWJ1dGVzKG5vZGUpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShub2RlLmdldCgwKS5hdHRyaWJ1dGVzKS5yZWR1Y2UoKGFjYywgYXR0cikgPT4ge1xuICAgICAgICBsZXQgbWF0Y2ggPSBhdHRyLm5vZGVOYW1lLm1hdGNoKGRhdGFBdHRyUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGFjY1ttYXRjaFsxXV0gPSBhdHRyLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy11dGlscy9nZXQtZGF0YS1hdHRycy5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcblxuZnVuY3Rpb24gZWxlbWVudENvbnRlbnRXaWR0aChlbGVtKSB7XG4gICAgbGV0IGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtWzBdKTtcbiAgICByZXR1cm4gZWxlbS53aWR0aCgpIC0gKHBhcnNlRmxvYXQoY3MucGFkZGluZ0xlZnQpICsgcGFyc2VGbG9hdChjcy5wYWRkaW5nUmlnaHQpKSAtIChwYXJzZUZsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyBwYXJzZUZsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUludG9WaWV3SW5Db250YWluZXIoZWxlbSwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGxldCBkb2NWaWV3VG9wID0gd2luZG93LnNjcm9sbFk7XG5cbiAgICBsZXQgcGFyZW50ID0gZWxlbS5wYXJlbnQoKTtcblxuICAgIGxldCBwYXJlbnRUb3AgPSBwYXJlbnQub2Zmc2V0KCkudG9wO1xuICAgIGxldCBwYXJlbnRIZWlnaHQgPSBwYXJlbnQuaGVpZ2h0KCk7XG5cbiAgICBsZXQgZWxlbUhlaWdodCA9IGVsZW0uaGVpZ2h0KCk7XG5cbiAgICBsZXQgY3VycmVudFN0YXR1cyA9IGVsZW0uYXR0cignZGF0YS1taXYtc3RhdHVzJyk7XG5cbiAgICBsZXQgbmV4dFN0YXR1cztcblxuICAgIGlmIChwYXJlbnRUb3AgPj0gZG9jVmlld1RvcCkge1xuICAgICAgICBuZXh0U3RhdHVzID0gJ3QnO1xuICAgIH0gZWxzZSBpZiAocGFyZW50VG9wICsgcGFyZW50SGVpZ2h0IDwgZG9jVmlld1RvcCArIGVsZW1IZWlnaHQpIHtcbiAgICAgICAgbmV4dFN0YXR1cyA9ICdiJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0U3RhdHVzID0gJ20nO1xuICAgIH1cblxuICAgIGlmIChmb3JjZSB8fCBuZXh0U3RhdHVzICE9PSBjdXJyZW50U3RhdHVzKSB7XG4gICAgICAgIGVsZW0uYXR0cignZGF0YS1taXYtc3RhdHVzJywgbmV4dFN0YXR1cyk7XG5cbiAgICAgICAgc3dpdGNoIChuZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2VsZW1lbnRDb250ZW50V2lkdGgocGFyZW50KX1weGAsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7ZWxlbWVudENvbnRlbnRXaWR0aChwYXJlbnQpfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICcwJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1vdmVJbnRvVmlldyhlbGVtKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIG1vdmVJbnRvVmlld0luQ29udGFpbmVyKGVsZW0pO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIG1vdmVJbnRvVmlld0luQ29udGFpbmVyKGVsZW0sIHRydWUpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL21vdmUtaW50by12aWV3LWluLWNvbnRhaW5lci5qcyIsImNvbnN0IFVOTE9BREVEID0gJ1VOTE9BREVEJztcbmNvbnN0IExPQURJTkcgPSAnTE9BRElORyc7XG5jb25zdCBMT0FERUQgPSAnTE9BREVEJztcblxubGV0IGFwaVN0YXR1cyA9IFVOTE9BREVEO1xuXG5sZXQgcGVuZGluZ1BsYXllcnMgPSBbXTtcblxubGV0IHBsYXllcnMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKGlkLCBkYXRhKSB7XG4gICAgaWYgKGFwaVN0YXR1cyA9PT0gTE9BREVEKSB7XG4gICAgICAgIGluaXRQbGF5ZXIoaWQsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBlbmRpbmdQbGF5ZXJzLnB1c2goe2lkLCBkYXRhfSk7XG4gICAgICAgIGlmIChhcGlTdGF0dXMgPT09IFVOTE9BREVEKSB7XG4gICAgICAgICAgICBsb2FkQXBpKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaW5pdFBsYXllcihpZCwgZGF0YSkge1xuICAgIGlmIChkYXRhICYmIGRhdGEuZXZlbnRzICYmIGRhdGEuZXZlbnRzLm9uSW5pdCkge1xuICAgICAgICBkYXRhLmV2ZW50cy5vbkluaXQoKTtcbiAgICB9XG5cbiAgICBsZXQgcGxheWVyID0gbmV3IFlULlBsYXllcihpZCwgZGF0YSk7XG4gICAgcGxheWVyc1tpZF0gPSB7cGxheWVyLCBkYXRhfTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkQXBpKCkge1xuICAgIGFwaVN0YXR1cyA9IExPQURJTkc7XG4gICAgd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwZW5kaW5nUGxheWVycy5mb3JFYWNoKCh7aWQsIGRhdGF9KSA9PiBpbml0UGxheWVyKGlkLCBkYXRhKSk7XG4gICAgfTtcblxuICAgIGxldCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICB0YWcuc3JjID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCI7XG4gICAgbGV0IGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzLXV0aWxzL3lvdXR1YmUtcGxheWVyLmpzIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIHBsYWNlSG9sZGVycyA9IHBsYWNlSG9sZGVyc0NvdW50KGI2NClcblxuICBhcnIgPSBuZXcgQXJyKGxlbiAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYnVmZmVyL34vaXNhcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNsb25lID0gKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW5zdGFuY2VvZihvYmosIHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUgIT0gbnVsbCAmJiBvYmogaW5zdGFuY2VvZiB0eXBlO1xufVxuXG52YXIgbmF0aXZlTWFwO1xudHJ5IHtcbiAgbmF0aXZlTWFwID0gTWFwO1xufSBjYXRjaChfKSB7XG4gIC8vIG1heWJlIGEgcmVmZXJlbmNlIGVycm9yIGJlY2F1c2Ugbm8gYE1hcGAuIEdpdmUgaXQgYSBkdW1teSB2YWx1ZSB0aGF0IG5vXG4gIC8vIHZhbHVlIHdpbGwgZXZlciBiZSBhbiBpbnN0YW5jZW9mLlxuICBuYXRpdmVNYXAgPSBmdW5jdGlvbigpIHt9O1xufVxuXG52YXIgbmF0aXZlU2V0O1xudHJ5IHtcbiAgbmF0aXZlU2V0ID0gU2V0O1xufSBjYXRjaChfKSB7XG4gIG5hdGl2ZVNldCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVQcm9taXNlO1xudHJ5IHtcbiAgbmF0aXZlUHJvbWlzZSA9IFByb21pc2U7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlUHJvbWlzZSA9IGZ1bmN0aW9uKCkge307XG59XG5cbi8qKlxuICogQ2xvbmVzIChjb3BpZXMpIGFuIE9iamVjdCB1c2luZyBkZWVwIGNvcHlpbmcuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBzdXBwb3J0cyBjaXJjdWxhciByZWZlcmVuY2VzIGJ5IGRlZmF1bHQsIGJ1dCBpZiB5b3UgYXJlIGNlcnRhaW5cbiAqIHRoZXJlIGFyZSBubyBjaXJjdWxhciByZWZlcmVuY2VzIGluIHlvdXIgb2JqZWN0LCB5b3UgY2FuIHNhdmUgc29tZSBDUFUgdGltZVxuICogYnkgY2FsbGluZyBjbG9uZShvYmosIGZhbHNlKS5cbiAqXG4gKiBDYXV0aW9uOiBpZiBgY2lyY3VsYXJgIGlzIGZhbHNlIGFuZCBgcGFyZW50YCBjb250YWlucyBjaXJjdWxhciByZWZlcmVuY2VzLFxuICogeW91ciBwcm9ncmFtIG1heSBlbnRlciBhbiBpbmZpbml0ZSBsb29wIGFuZCBjcmFzaC5cbiAqXG4gKiBAcGFyYW0gYHBhcmVudGAgLSB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZFxuICogQHBhcmFtIGBjaXJjdWxhcmAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZCBtYXkgY29udGFpblxuICogICAgY2lyY3VsYXIgcmVmZXJlbmNlcy4gKG9wdGlvbmFsIC0gdHJ1ZSBieSBkZWZhdWx0KVxuICogQHBhcmFtIGBkZXB0aGAgLSBzZXQgdG8gYSBudW1iZXIgaWYgdGhlIG9iamVjdCBpcyBvbmx5IHRvIGJlIGNsb25lZCB0b1xuICogICAgYSBwYXJ0aWN1bGFyIGRlcHRoLiAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBJbmZpbml0eSlcbiAqIEBwYXJhbSBgcHJvdG90eXBlYCAtIHNldHMgdGhlIHByb3RvdHlwZSB0byBiZSB1c2VkIHdoZW4gY2xvbmluZyBhbiBvYmplY3QuXG4gKiAgICAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBwYXJlbnQgcHJvdG90eXBlKS5cbiAqIEBwYXJhbSBgaW5jbHVkZU5vbkVudW1lcmFibGVgIC0gc2V0IHRvIHRydWUgaWYgdGhlIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAqICAgIHNob3VsZCBiZSBjbG9uZWQgYXMgd2VsbC4gTm9uLWVudW1lcmFibGUgcHJvcGVydGllcyBvbiB0aGUgcHJvdG90eXBlXG4gKiAgICBjaGFpbiB3aWxsIGJlIGlnbm9yZWQuIChvcHRpb25hbCAtIGZhbHNlIGJ5IGRlZmF1bHQpXG4qL1xuZnVuY3Rpb24gY2xvbmUocGFyZW50LCBjaXJjdWxhciwgZGVwdGgsIHByb3RvdHlwZSwgaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PT0gJ29iamVjdCcpIHtcbiAgICBkZXB0aCA9IGNpcmN1bGFyLmRlcHRoO1xuICAgIHByb3RvdHlwZSA9IGNpcmN1bGFyLnByb3RvdHlwZTtcbiAgICBpbmNsdWRlTm9uRW51bWVyYWJsZSA9IGNpcmN1bGFyLmluY2x1ZGVOb25FbnVtZXJhYmxlO1xuICAgIGNpcmN1bGFyID0gY2lyY3VsYXIuY2lyY3VsYXI7XG4gIH1cbiAgLy8gbWFpbnRhaW4gdHdvIGFycmF5cyBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcywgd2hlcmUgY29ycmVzcG9uZGluZyBwYXJlbnRzXG4gIC8vIGFuZCBjaGlsZHJlbiBoYXZlIHRoZSBzYW1lIGluZGV4XG4gIHZhciBhbGxQYXJlbnRzID0gW107XG4gIHZhciBhbGxDaGlsZHJlbiA9IFtdO1xuXG4gIHZhciB1c2VCdWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9ICd1bmRlZmluZWQnO1xuXG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT0gJ3VuZGVmaW5lZCcpXG4gICAgY2lyY3VsYXIgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZGVwdGggPT0gJ3VuZGVmaW5lZCcpXG4gICAgZGVwdGggPSBJbmZpbml0eTtcblxuICAvLyByZWN1cnNlIHRoaXMgZnVuY3Rpb24gc28gd2UgZG9uJ3QgcmVzZXQgYWxsUGFyZW50cyBhbmQgYWxsQ2hpbGRyZW5cbiAgZnVuY3Rpb24gX2Nsb25lKHBhcmVudCwgZGVwdGgpIHtcbiAgICAvLyBjbG9uaW5nIG51bGwgYWx3YXlzIHJldHVybnMgbnVsbFxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIGlmIChkZXB0aCA9PT0gMClcbiAgICAgIHJldHVybiBwYXJlbnQ7XG5cbiAgICB2YXIgY2hpbGQ7XG4gICAgdmFyIHByb3RvO1xuICAgIGlmICh0eXBlb2YgcGFyZW50ICE9ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZU1hcCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVTZXQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVTZXQoKTtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlUHJvbWlzZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwYXJlbnQudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJlc29sdmUoX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KF9jbG9uZShlcnIsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gW107XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzUmVnRXhwKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFJlZ0V4cChwYXJlbnQuc291cmNlLCBfX2dldFJlZ0V4cEZsYWdzKHBhcmVudCkpO1xuICAgICAgaWYgKHBhcmVudC5sYXN0SW5kZXgpIGNoaWxkLmxhc3RJbmRleCA9IHBhcmVudC5sYXN0SW5kZXg7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzRGF0ZShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEYXRlKHBhcmVudC5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSBpZiAodXNlQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBCdWZmZXIocGFyZW50Lmxlbmd0aCk7XG4gICAgICBwYXJlbnQuY29weShjaGlsZCk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIEVycm9yKSkge1xuICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdG90eXBlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gICAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG4gICAgICAgIHByb3RvID0gcHJvdG90eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaXJjdWxhcikge1xuICAgICAgdmFyIGluZGV4ID0gYWxsUGFyZW50cy5pbmRleE9mKHBhcmVudCk7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gYWxsQ2hpbGRyZW5baW5kZXhdO1xuICAgICAgfVxuICAgICAgYWxsUGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICBhbGxDaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVNYXApKSB7XG4gICAgICBwYXJlbnQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHZhciBrZXlDaGlsZCA9IF9jbG9uZShrZXksIGRlcHRoIC0gMSk7XG4gICAgICAgIHZhciB2YWx1ZUNoaWxkID0gX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpO1xuICAgICAgICBjaGlsZC5zZXQoa2V5Q2hpbGQsIHZhbHVlQ2hpbGQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVNldCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBlbnRyeUNoaWxkID0gX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpO1xuICAgICAgICBjaGlsZC5hZGQoZW50cnlDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpIGluIHBhcmVudCkge1xuICAgICAgdmFyIGF0dHJzO1xuICAgICAgaWYgKHByb3RvKSB7XG4gICAgICAgIGF0dHJzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgaSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRycyAmJiBhdHRycy5zZXQgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNoaWxkW2ldID0gX2Nsb25lKHBhcmVudFtpXSwgZGVwdGggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHBhcmVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gRG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBjbG9uaW5nIGEgc3ltYm9sIGJlY2F1c2UgaXQgaXMgYSBwcmltaXRpdmUsXG4gICAgICAgIC8vIGxpa2UgYSBudW1iZXIgb3Igc3RyaW5nLlxuICAgICAgICB2YXIgc3ltYm9sID0gc3ltYm9sc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgc3ltYm9sKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgIWRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiAhaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZFtzeW1ib2xdID0gX2Nsb25lKHBhcmVudFtzeW1ib2xdLCBkZXB0aCAtIDEpO1xuICAgICAgICBpZiAoIWRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgc3ltYm9sLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gICAgICB2YXIgYWxsUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHBhcmVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbFByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IGFsbFByb3BlcnR5TmFtZXNbaV07XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3Byb3BlcnR5TmFtZV0gPSBfY2xvbmUocGFyZW50W3Byb3BlcnR5TmFtZV0sIGRlcHRoIC0gMSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgcmV0dXJuIF9jbG9uZShwYXJlbnQsIGRlcHRoKTtcbn1cblxuLyoqXG4gKiBTaW1wbGUgZmxhdCBjbG9uZSB1c2luZyBwcm90b3R5cGUsIGFjY2VwdHMgb25seSBvYmplY3RzLCB1c2VmdWxsIGZvciBwcm9wZXJ0eVxuICogb3ZlcnJpZGUgb24gRkxBVCBjb25maWd1cmF0aW9uIG9iamVjdCAobm8gbmVzdGVkIHByb3BzKS5cbiAqXG4gKiBVU0UgV0lUSCBDQVVUSU9OISBUaGlzIG1heSBub3QgYmVoYXZlIGFzIHlvdSB3aXNoIGlmIHlvdSBkbyBub3Qga25vdyBob3cgdGhpc1xuICogd29ya3MuXG4gKi9cbmNsb25lLmNsb25lUHJvdG90eXBlID0gZnVuY3Rpb24gY2xvbmVQcm90b3R5cGUocGFyZW50KSB7XG4gIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIGMgPSBmdW5jdGlvbiAoKSB7fTtcbiAgYy5wcm90b3R5cGUgPSBwYXJlbnQ7XG4gIHJldHVybiBuZXcgYygpO1xufTtcblxuLy8gcHJpdmF0ZSB1dGlsaXR5IGZ1bmN0aW9uc1xuXG5mdW5jdGlvbiBfX29ialRvU3RyKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cbmNsb25lLl9fb2JqVG9TdHIgPSBfX29ialRvU3RyO1xuXG5mdW5jdGlvbiBfX2lzRGF0ZShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuY2xvbmUuX19pc0RhdGUgPSBfX2lzRGF0ZTtcblxuZnVuY3Rpb24gX19pc0FycmF5KG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuY2xvbmUuX19pc0FycmF5ID0gX19pc0FycmF5O1xuXG5mdW5jdGlvbiBfX2lzUmVnRXhwKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmNsb25lLl9faXNSZWdFeHAgPSBfX2lzUmVnRXhwO1xuXG5mdW5jdGlvbiBfX2dldFJlZ0V4cEZsYWdzKHJlKSB7XG4gIHZhciBmbGFncyA9ICcnO1xuICBpZiAocmUuZ2xvYmFsKSBmbGFncyArPSAnZyc7XG4gIGlmIChyZS5pZ25vcmVDYXNlKSBmbGFncyArPSAnaSc7XG4gIGlmIChyZS5tdWx0aWxpbmUpIGZsYWdzICs9ICdtJztcbiAgcmV0dXJuIGZsYWdzO1xufVxuY2xvbmUuX19nZXRSZWdFeHBGbGFncyA9IF9fZ2V0UmVnRXhwRmxhZ3M7XG5cbnJldHVybiBjbG9uZTtcbn0pKCk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nsb25lL2Nsb25lLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7IC8qKi8gfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lO1xuXHR2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXHR2YXIgaSA9IDE7XG5cdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR2YXIgZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fVxuXHRpZiAodGFyZ2V0ID09IG51bGwgfHwgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9leHRlbmQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihhKXtmb3IodmFyIGI9MTtiPGFyZ3VtZW50cy5sZW5ndGg7YisrKXt2YXIgYz1hcmd1bWVudHNbYl07Zm9yKHZhciBkIGluIGMpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGMsZCkmJihhW2RdPWNbZF0pfXJldHVybiBhfSxfdHlwZW9mPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihhKXtyZXR1cm4gdHlwZW9mIGF9OmZ1bmN0aW9uKGEpe3JldHVybiBhJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmEuY29uc3RydWN0b3I9PT1TeW1ib2wmJmEhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGF9OyFmdW5jdGlvbihhLGIpe1wib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHM/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGV4cG9ydHMpKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1iKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShiKTphLkxhenlMb2FkPWIoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBhPXtlbGVtZW50c19zZWxlY3RvcjpcImltZ1wiLGNvbnRhaW5lcjp3aW5kb3csdGhyZXNob2xkOjMwMCx0aHJvdHRsZToxNTAsZGF0YV9zcmM6XCJvcmlnaW5hbFwiLGRhdGFfc3Jjc2V0Olwib3JpZ2luYWwtc2V0XCIsY2xhc3NfbG9hZGluZzpcImxvYWRpbmdcIixjbGFzc19sb2FkZWQ6XCJsb2FkZWRcIixjbGFzc19lcnJvcjpcImVycm9yXCIsY2xhc3NfaW5pdGlhbDpcImluaXRpYWxcIixza2lwX2ludmlzaWJsZTohMCxjYWxsYmFja19sb2FkOm51bGwsY2FsbGJhY2tfZXJyb3I6bnVsbCxjYWxsYmFja19zZXQ6bnVsbCxjYWxsYmFja19wcm9jZXNzZWQ6bnVsbH0sYj0hKFwib25zY3JvbGxcImluIHdpbmRvdyl8fC9nbGVib3QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksYz1mdW5jdGlvbihhLGIpe2EmJmEoYil9LGQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wK3dpbmRvdy5wYWdlWU9mZnNldC1hLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcH0sZT1mdW5jdGlvbihhLGIsYyl7cmV0dXJuKGI9PT13aW5kb3c/d2luZG93LmlubmVySGVpZ2h0K3dpbmRvdy5wYWdlWU9mZnNldDpkKGIpK2Iub2Zmc2V0SGVpZ2h0KTw9ZChhKS1jfSxmPWZ1bmN0aW9uKGEpe3JldHVybiBhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQrd2luZG93LnBhZ2VYT2Zmc2V0LWEub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdH0sZz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9d2luZG93LmlubmVyV2lkdGg7cmV0dXJuKGI9PT13aW5kb3c/ZCt3aW5kb3cucGFnZVhPZmZzZXQ6ZihiKStkKTw9ZihhKS1jfSxoPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4oYj09PXdpbmRvdz93aW5kb3cucGFnZVlPZmZzZXQ6ZChiKSk+PWQoYSkrYythLm9mZnNldEhlaWdodH0saT1mdW5jdGlvbihhLGIsYyl7cmV0dXJuKGI9PT13aW5kb3c/d2luZG93LnBhZ2VYT2Zmc2V0OmYoYikpPj1mKGEpK2MrYS5vZmZzZXRXaWR0aH0saj1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIShlKGEsYixjKXx8aChhLGIsYyl8fGcoYSxiLGMpfHxpKGEsYixjKSl9LGs9ZnVuY3Rpb24oYSxiKXt2YXIgYz1uZXcgYShiKSxkPW5ldyBDdXN0b21FdmVudChcIkxhenlMb2FkOjpJbml0aWFsaXplZFwiLHtkZXRhaWw6e2luc3RhbmNlOmN9fSk7d2luZG93LmRpc3BhdGNoRXZlbnQoZCl9LGw9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLnBhcmVudEVsZW1lbnQ7aWYoXCJQSUNUVVJFXCI9PT1jLnRhZ05hbWUpZm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspe3ZhciBlPWMuY2hpbGRyZW5bZF07aWYoXCJTT1VSQ0VcIj09PWUudGFnTmFtZSl7dmFyIGY9ZS5kYXRhc2V0W2JdO2YmJmUuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZil9fX0sbT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YS50YWdOYW1lLGU9YS5kYXRhc2V0W2NdO2lmKFwiSU1HXCI9PT1kKXtsKGEsYik7dmFyIGY9YS5kYXRhc2V0W2JdO3JldHVybiBmJiZhLnNldEF0dHJpYnV0ZShcInNyY3NldFwiLGYpLHZvaWQoZSYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixlKSl9aWYoXCJJRlJBTUVcIj09PWQpcmV0dXJuIHZvaWQoZSYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixlKSk7ZSYmKGEuc3R5bGUuYmFja2dyb3VuZEltYWdlPVwidXJsKFwiK2UrXCIpXCIpfSxuPWZ1bmN0aW9uKGIpe3RoaXMuX3NldHRpbmdzPV9leHRlbmRzKHt9LGEsYiksdGhpcy5fcXVlcnlPcmlnaW5Ob2RlPXRoaXMuX3NldHRpbmdzLmNvbnRhaW5lcj09PXdpbmRvdz9kb2N1bWVudDp0aGlzLl9zZXR0aW5ncy5jb250YWluZXIsdGhpcy5fcHJldmlvdXNMb29wVGltZT0wLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGw9dGhpcy5oYW5kbGVTY3JvbGwuYmluZCh0aGlzKSx0aGlzLl9pc0ZpcnN0TG9vcD0hMCx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2JvdW5kSGFuZGxlU2Nyb2xsKSx0aGlzLnVwZGF0ZSgpfTtuLnByb3RvdHlwZT17X3JldmVhbDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLl9zZXR0aW5ncyxkPWZ1bmN0aW9uIGQoKXtiJiYoYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGUpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZCksYS5jbGFzc0xpc3QucmVtb3ZlKGIuY2xhc3NfbG9hZGluZyksYS5jbGFzc0xpc3QuYWRkKGIuY2xhc3NfZXJyb3IpLGMoYi5jYWxsYmFja19lcnJvcixhKSl9LGU9ZnVuY3Rpb24gZSgpe2ImJihhLmNsYXNzTGlzdC5yZW1vdmUoYi5jbGFzc19sb2FkaW5nKSxhLmNsYXNzTGlzdC5hZGQoYi5jbGFzc19sb2FkZWQpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixlKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGQpLGMoYi5jYWxsYmFja19sb2FkLGEpKX07XCJJTUdcIiE9PWEudGFnTmFtZSYmXCJJRlJBTUVcIiE9PWEudGFnTmFtZXx8KGEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixlKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGQpLGEuY2xhc3NMaXN0LmFkZChiLmNsYXNzX2xvYWRpbmcpKSxtKGEsYi5kYXRhX3NyY3NldCxiLmRhdGFfc3JjKSxjKGIuY2FsbGJhY2tfc2V0LGEpfSxfbG9vcFRocm91Z2hFbGVtZW50czpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX3NldHRpbmdzLGQ9dGhpcy5fZWxlbWVudHMsZT1kP2QubGVuZ3RoOjAsZj12b2lkIDAsZz1bXSxoPXRoaXMuX2lzRmlyc3RMb29wO2ZvcihmPTA7ZjxlO2YrKyl7dmFyIGk9ZFtmXTthLnNraXBfaW52aXNpYmxlJiZudWxsPT09aS5vZmZzZXRQYXJlbnR8fChifHxqKGksYS5jb250YWluZXIsYS50aHJlc2hvbGQpKSYmKGgmJmkuY2xhc3NMaXN0LmFkZChhLmNsYXNzX2luaXRpYWwpLHRoaXMuX3JldmVhbChpKSxnLnB1c2goZiksaS5kYXRhc2V0Lndhc1Byb2Nlc3NlZD0hMCl9Zm9yKDtnLmxlbmd0aD4wOylkLnNwbGljZShnLnBvcCgpLDEpLGMoYS5jYWxsYmFja19wcm9jZXNzZWQsZC5sZW5ndGgpOzA9PT1lJiZ0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpLGgmJih0aGlzLl9pc0ZpcnN0TG9vcD0hMSl9LF9wdXJnZUVsZW1lbnRzOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fZWxlbWVudHMsYj1hLmxlbmd0aCxjPXZvaWQgMCxkPVtdO2ZvcihjPTA7YzxiO2MrKyl7YVtjXS5kYXRhc2V0Lndhc1Byb2Nlc3NlZCYmZC5wdXNoKGMpfWZvcig7ZC5sZW5ndGg+MDspYS5zcGxpY2UoZC5wb3AoKSwxKX0sX3N0YXJ0U2Nyb2xsSGFuZGxlcjpmdW5jdGlvbigpe3RoaXMuX2lzSGFuZGxpbmdTY3JvbGx8fCh0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsPSEwLHRoaXMuX3NldHRpbmdzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGwpKX0sX3N0b3BTY3JvbGxIYW5kbGVyOmZ1bmN0aW9uKCl7dGhpcy5faXNIYW5kbGluZ1Njcm9sbCYmKHRoaXMuX2lzSGFuZGxpbmdTY3JvbGw9ITEsdGhpcy5fc2V0dGluZ3MuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbCkpfSxoYW5kbGVTY3JvbGw6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGI9dGhpcy5fc2V0dGluZ3MudGhyb3R0bGU7MCE9PWI/ZnVuY3Rpb24oKXt2YXIgYz1mdW5jdGlvbigpeyhuZXcgRGF0ZSkuZ2V0VGltZSgpfSxkPWMoKSxlPWItKGQtYS5fcHJldmlvdXNMb29wVGltZSk7ZTw9MHx8ZT5iPyhhLl9sb29wVGltZW91dCYmKGNsZWFyVGltZW91dChhLl9sb29wVGltZW91dCksYS5fbG9vcFRpbWVvdXQ9bnVsbCksYS5fcHJldmlvdXNMb29wVGltZT1kLGEuX2xvb3BUaHJvdWdoRWxlbWVudHMoKSk6YS5fbG9vcFRpbWVvdXR8fChhLl9sb29wVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhpcy5fcHJldmlvdXNMb29wVGltZT1jKCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCl9LmJpbmQoYSksZSkpfSgpOnRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKX0sdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5fZWxlbWVudHM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fcXVlcnlPcmlnaW5Ob2RlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpKSx0aGlzLl9wdXJnZUVsZW1lbnRzKCksdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpLHRoaXMuX3N0YXJ0U2Nyb2xsSGFuZGxlcigpfSxkZXN0cm95OmZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbCksdGhpcy5fbG9vcFRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwpLHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCksdGhpcy5fZWxlbWVudHM9bnVsbCx0aGlzLl9xdWVyeU9yaWdpbk5vZGU9bnVsbCx0aGlzLl9zZXR0aW5ncz1udWxsfX07dmFyIG89d2luZG93LmxhenlMb2FkT3B0aW9ucztyZXR1cm4gbyYmZnVuY3Rpb24oYSxiKXt2YXIgYz1iLmxlbmd0aDtpZihjKWZvcih2YXIgZD0wO2Q8YztkKyspayhhLGJbZF0pO2Vsc2UgayhhLGIpfShuLG8pLG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdmFuaWxsYS1sYXp5bG9hZC9kaXN0L2xhenlsb2FkLnRyYW5zcGlsZWQubWluLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=