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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
var headingAnchorCn = exports.headingAnchorCn = function headingAnchorCn(className) {
  return contentCn(className) + "__heading-anchor";
};
var headingAnchorLabelCn = exports.headingAnchorLabelCn = function headingAnchorLabelCn(className) {
  return headingAnchorCn(className) + "__label";
};
var headingAnchorIconCn = exports.headingAnchorIconCn = function headingAnchorIconCn(className) {
  return headingAnchorCn(className) + "__icon";
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scrollTo;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTo(element) {

    element[0].scrollIntoView(true);

    var maxHeight = 0;

    (0, _cashDom2.default)('.js-is-stuck').each(function () {
        console.log(this);
        var height = (0, _cashDom2.default)(this).height();
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    if (maxHeight > 0) {
        var scrolledY = window.scrollY;

        if (scrolledY) {
            window.scroll(0, scrolledY - maxHeight);
        }
    }
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

function prepareAccordionHeading(patternClassname, text, id) {
    var anchor = (0, _cashDom2.default)('<a/>').addClass((0, _elementClassnames.headingAnchorCn)(patternClassname) + ' inactive').attr('href', '#').attr('data-id', id).attr('data-accordion-anchor', true);

    (0, _cashDom2.default)('<span/>').html(text).addClass((0, _elementClassnames.headingAnchorLabelCn)(patternClassname)).appendTo(anchor);

    (0, _cashDom2.default)('<span/>').attr('aria-hidden', 'true').addClass((0, _elementClassnames.headingAnchorIconCn)(patternClassname)).appendTo(anchor);

    return anchor;
}

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

        var anchor = prepareAccordionHeading(className, item.html(), i);

        anchor.insertBefore(item);

        var content = (0, _cashDom2.default)('<div></div>').append(item.addClass((0, _elementClassnames.headingCn)(className))).append(contentElements).insertAfter(anchor);

        return {
            id: i,
            text: item.html(),
            anchor: anchor,
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

    var grid = (0, _cashDom2.default)('<div></div>').addClass(contentClassName + '-grid').append(contentElement);
    return (0, _cashDom2.default)('<div></div>').addClass(contentClassName + '-container').append(grid).appendTo(widget);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deactivateAll = deactivateAll;
exports.default = prepareLinks;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _scrollTo = __webpack_require__(3);

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
    var activateInitial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var headingAnchors = headings.reduce(function (acc, _ref) {
        var anchor = _ref.anchor;
        return acc.add(anchor);
    }, (0, _cashDom2.default)());
    var allAnchors = menu ? headingAnchors.add(menu.find('a[data-id]')) : headingAnchors;

    var activateItem = genActivateItem(headingAnchors, allAnchors);

    allAnchors.on('click', function (evt) {
        evt.preventDefault();

        var anchor = (0, _cashDom2.default)(this);
        var isAccordinAnchor = anchor.attr('data-accordion-anchor');
        if (anchor.hasClass('inactive')) {
            activateItem((0, _cashDom2.default)(this).attr('data-id'), isAccordinAnchor);
        } else if (isAccordinAnchor) {
            deactivateAll(allAnchors);
        }
    });

    if (activateInitial !== null) {
        activateItem(activateInitial, false);
    }

    return activateItem;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerComponent = registerComponent;
exports.default = launch;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _scrolledIntoView = __webpack_require__(2);

var _scrolledIntoView2 = _interopRequireDefault(_scrolledIntoView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registeredElements = [];

function registerComponent(element, classNameOrFunction) {
    registeredElements.push({
        element: element,
        className: typeof classNameOrFunction === 'string' ? classNameOrFunction : null,
        func: typeof classNameOrFunction === 'function' ? classNameOrFunction : null,
        completed: false
    });
}

function launch() {
    checkAll();
    (0, _cashDom2.default)(window).on('scroll', checkAll);
    (0, _cashDom2.default)(window).on('resize', checkAll);
}

function checkAll() {
    var toDelete = [];
    registeredElements.forEach(function (item, i) {
        var value = (0, _scrolledIntoView2.default)(item.element);
        if (value > .5) {
            if (item.className) {
                item.element.addClass(item.className);
            }
            if (item.func) {
                item.func(item.element);
            }
            toDelete.push(i);
        }
    });

    toDelete.reverse().forEach(function (i) {
        return registeredElements.splice(i, 1);
    });
}

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _urlDropdown = __webpack_require__(10);

var _urlDropdown2 = _interopRequireDefault(_urlDropdown);

var _lazyLoad = __webpack_require__(11);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

var _videoPreview = __webpack_require__(13);

var _videoPreview2 = _interopRequireDefault(_videoPreview);

var _navMobile = __webpack_require__(18);

var _navMobile2 = _interopRequireDefault(_navMobile);

var _navDesktop = __webpack_require__(27);

var _navDesktop2 = _interopRequireDefault(_navDesktop);

var _accordion = __webpack_require__(28);

var _accordion2 = _interopRequireDefault(_accordion);

var _accordionTabs = __webpack_require__(29);

var _accordionTabs2 = _interopRequireDefault(_accordionTabs);

var _animateOnScroll = __webpack_require__(7);

var _animateOnScroll2 = _interopRequireDefault(_animateOnScroll);

var _statsBlock = __webpack_require__(32);

var _statsBlock2 = _interopRequireDefault(_statsBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_statsBlock2.default, _accordion2.default, _accordionTabs2.default, _videoPreview2.default, _lazyLoad2.default, _urlDropdown2.default, _navMobile2.default, _animateOnScroll2.default];

/***/ }),
/* 10 */
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
/* 11 */
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

var _vanillaLazyload = __webpack_require__(12);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _extends=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(a,b){"object"===( false?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=b(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a.LazyLoad=b()}(this,function(){"use strict";var a={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},b=!("onscroll"in window)||/glebot/.test(navigator.userAgent),c=function(a,b){a&&a(b)},d=function(a){return a.getBoundingClientRect().top+window.pageYOffset-a.ownerDocument.documentElement.clientTop},e=function(a,b,c){return(b===window?window.innerHeight+window.pageYOffset:d(b)+b.offsetHeight)<=d(a)-c},f=function(a){return a.getBoundingClientRect().left+window.pageXOffset-a.ownerDocument.documentElement.clientLeft},g=function(a,b,c){var d=window.innerWidth;return(b===window?d+window.pageXOffset:f(b)+d)<=f(a)-c},h=function(a,b,c){return(b===window?window.pageYOffset:d(b))>=d(a)+c+a.offsetHeight},i=function(a,b,c){return(b===window?window.pageXOffset:f(b))>=f(a)+c+a.offsetWidth},j=function(a,b,c){return!(e(a,b,c)||h(a,b,c)||g(a,b,c)||i(a,b,c))},k=function(a,b){var c=new a(b),d=new CustomEvent("LazyLoad::Initialized",{detail:{instance:c}});window.dispatchEvent(d)},l=function(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.dataset[b];f&&e.setAttribute("srcset",f)}}},m=function(a,b,c){var d=a.tagName,e=a.dataset[c];if("IMG"===d){l(a,b);var f=a.dataset[b];return f&&a.setAttribute("srcset",f),void(e&&a.setAttribute("src",e))}if("IFRAME"===d)return void(e&&a.setAttribute("src",e));e&&(a.style.backgroundImage="url("+e+")")},n=function(b){this._settings=_extends({},a,b),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};n.prototype={_reveal:function(a){var b=this._settings,d=function d(){b&&(a.removeEventListener("load",e),a.removeEventListener("error",d),a.classList.remove(b.class_loading),a.classList.add(b.class_error),c(b.callback_error,a))},e=function e(){b&&(a.classList.remove(b.class_loading),a.classList.add(b.class_loaded),a.removeEventListener("load",e),a.removeEventListener("error",d),c(b.callback_load,a))};"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",e),a.addEventListener("error",d),a.classList.add(b.class_loading)),m(a,b.data_srcset,b.data_src),c(b.callback_set,a)},_loopThroughElements:function(){var a=this._settings,d=this._elements,e=d?d.length:0,f=void 0,g=[],h=this._isFirstLoop;for(f=0;f<e;f++){var i=d[f];a.skip_invisible&&null===i.offsetParent||(b||j(i,a.container,a.threshold))&&(h&&i.classList.add(a.class_initial),this._reveal(i),g.push(f),i.dataset.wasProcessed=!0)}for(;g.length>0;)d.splice(g.pop(),1),c(a.callback_processed,d.length);0===e&&this._stopScrollHandler(),h&&(this._isFirstLoop=!1)},_purgeElements:function(){var a=this._elements,b=a.length,c=void 0,d=[];for(c=0;c<b;c++){a[c].dataset.wasProcessed&&d.push(c)}for(;d.length>0;)a.splice(d.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var a=this,b=this._settings.throttle;0!==b?function(){var c=function(){(new Date).getTime()},d=c(),e=b-(d-a._previousLoopTime);e<=0||e>b?(a._loopTimeout&&(clearTimeout(a._loopTimeout),a._loopTimeout=null),a._previousLoopTime=d,a._loopThroughElements()):a._loopTimeout||(a._loopTimeout=setTimeout(function(){this._previousLoopTime=c(),this._loopTimeout=null,this._loopThroughElements()}.bind(a),e))}():this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var o=window.lazyLoadOptions;return o&&function(a,b){var c=b.length;if(c)for(var d=0;d<c;d++)k(a,b[d]);else k(a,b)}(n,o),n});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _getDataAttrs = __webpack_require__(14);

var _getDataAttrs2 = _interopRequireDefault(_getDataAttrs);

var _videoPreviewYoutube = __webpack_require__(15);

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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadYoutubeVideo;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _extend = __webpack_require__(16);

var _extend2 = _interopRequireDefault(_extend);

var _youtubePlayer = __webpack_require__(17);

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

var _scrolledIntoView = __webpack_require__(2);

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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _navMobile = __webpack_require__(19);

var _navMobile2 = _interopRequireDefault(_navMobile);

var _parseNav = __webpack_require__(26);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _clone = __webpack_require__(20);

var _clone2 = _interopRequireDefault(_clone);

var _scrollTo = __webpack_require__(3);

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _scrolledIntoView = __webpack_require__(2);

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
/* 20 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(23)
var ieee754 = __webpack_require__(24)
var isArray = __webpack_require__(25)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 22 */
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


/***/ }),
/* 23 */
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
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PARSE_REGEX = /^\s*([0-9]) ([^\s]+) [0-9] (.+)$/;

function loadData() {
    return document.getElementById("nav-mobile__data").innerHTML;
}

function loadUrls() {
    return document.getElementById("page_urls").innerHTML;
}

function getPath(url) {
    return url.replace(/^https?:\/\/[^/]*/, '');
}

function matchLevel(path, currentPath) {
    if (path === currentPath) {
        return 2;
    } else if (currentPath.indexOf(path) === 0) {
        return 1;
    } else {
        return 0;
    }
}

function parseNav(data, currentUrl) {
    var tree = {
        name: null,
        index: null,
        url: null,
        type: null,
        level: null,
        children: []
    };

    var currentPath = getPath(currentUrl);

    var ancestors = [];

    data.split(/\r?\n/).forEach(function (line) {
        var match = line.match(PARSE_REGEX);
        if (match) {
            var _match = _slicedToArray(match, 4),
                levelStr = _match[1],
                url = _match[2],
                name = _match[3];

            var level = parseInt(levelStr);
            var type = matchLevel(getPath(url), currentPath);
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

var _parseNav = parseNav(loadData(), loadUrls()),
    tree = _parseNav.tree,
    current = _parseNav.current;

exports.tree = tree;
exports.current = current;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {

    // FOR USER TESTING

    var header = document.querySelector('.header');
    var anchors = document.querySelectorAll('a[href]');

    if (header.className.indexOf('header--') > -1) {
        var variation = header.className.split('header--')[1];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = anchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var anchor = _step.value;

                anchor.href = anchor.href + '?c=' + variation;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    var breadcrumb = document.querySelector('.breadcrumbs');
    var breadcrumbItems = document.querySelectorAll('.breadcrumbs__list > li');

    var breadcrumbDropdownChildren = document.querySelector('.breadcrumbs-dropdown--children');
    if (breadcrumbDropdownChildren !== null) {
        var childrenData = breadcrumbItems[breadcrumbItems.length - 1].innerHTML;
        breadcrumbItems[breadcrumbItems.length - 1].innerHTML = childrenData + '<div>' + breadcrumbDropdownChildren.innerHTML + '</div>';
        document.querySelector('.breadcrumbs__list > li:last-child a').classList.add('has-children');
    }

    var breadcrumbDropdownCurrent = document.querySelector('.breadcrumbs-dropdown--current');
    if (breadcrumbDropdownCurrent !== null && breadcrumbItems.length > 1) {
        var currentData = breadcrumbItems[breadcrumbItems.length - 2].innerHTML;
        breadcrumbItems[breadcrumbItems.length - 2].innerHTML = currentData + '<div>' + breadcrumbDropdownCurrent.innerHTML + '</div>';
        document.querySelector('.breadcrumbs__list > li:nth-last-child(2) a').classList.add('has-children');
    }
})();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _prepareSections = __webpack_require__(4);

var _prepareSections2 = _interopRequireDefault(_prepareSections);

var _prepareContent = __webpack_require__(5);

var _prepareContent2 = _interopRequireDefault(_prepareContent);

var _prepareLinks = __webpack_require__(6);

var _prepareLinks2 = _interopRequireDefault(_prepareLinks);

var _elementClassnames = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch(el, i) {
    var widget = (0, _cashDom2.default)(el);
    var contentWrapper = (0, _prepareContent2.default)(className, widget);
    var content = contentWrapper.children().children('.' + (0, _elementClassnames.contentCn)(className));
    var headings = (0, _prepareSections2.default)(className, widget, content);

    (0, _prepareLinks2.default)(headings, null);
}

var className = 'accordion';

exports.default = {
    launch: launch,
    className: className
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _prepareSections = __webpack_require__(4);

var _prepareSections2 = _interopRequireDefault(_prepareSections);

var _prepareContent = __webpack_require__(5);

var _prepareContent2 = _interopRequireDefault(_prepareContent);

var _prepareMenu = __webpack_require__(30);

var _prepareMenu2 = _interopRequireDefault(_prepareMenu);

var _prepareLinks = __webpack_require__(6);

var _prepareLinks2 = _interopRequireDefault(_prepareLinks);

var _elementClassnames = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'accordion-tabs';

function launch(el, i) {
    var widget = (0, _cashDom2.default)(el);
    var contentWrapper = (0, _prepareContent2.default)(className, widget);
    var content = contentWrapper.children().children('.' + (0, _elementClassnames.contentCn)(className));
    var headings = (0, _prepareSections2.default)(className, widget, content);

    var menu = (0, _prepareMenu2.default)(className, widget, i, headings, contentWrapper);
    (0, _prepareLinks2.default)(headings, menu, headings.length > 0 && headings[0].id);
}

exports.default = {
    launch: launch,
    className: className
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prepareTabsHeadings;

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _elementClassnames = __webpack_require__(1);

var _stickybits = __webpack_require__(31);

var _stickybits2 = _interopRequireDefault(_stickybits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareTabsHeadings(className, widget, i, headings, content) {
    var tabsBar = (0, _cashDom2.default)('<div></div>').addClass((0, _elementClassnames.menuCn)(className));

    headings.forEach(function (_ref) {
        var text = _ref.text,
            id = _ref.id;

        var anchor = (0, _cashDom2.default)('<a href="#"></a>').addClass((0, _elementClassnames.menuItemCn)(className)).addClass('inactive').attr('data-id', id);
        (0, _cashDom2.default)('<span></span>').addClass((0, _elementClassnames.menuItemLabelCn)(className)).html(text).appendTo(anchor);

        anchor.appendTo(tabsBar);
    });

    var wrapper = (0, _cashDom2.default)('<div></div>').addClass((0, _elementClassnames.menuWrapperCn)(className)).append(tabsBar);
    var containerClass = (0, _elementClassnames.menuCn)(className) + '-fullwidth';
    (0, _cashDom2.default)('<div></div>').addClass(containerClass).append(wrapper).insertBefore(content);

    (0, _stickybits2.default)('.' + containerClass, { useStickyClasses: true });

    return tabsBar;
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.stickybits = factory());
}(this, (function () { 'use strict';

/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
function Stickybit(target, o) {
  if (typeof window === 'undefined') throw Error('stickybits requires `window`');
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionStickyVal = fixed || sticky
  */
  this.el = target;
  this.offset = o && o.stickyBitStickyOffset || 0;
  this.vp = o && o.verticalPosition || 'top';
  this.useClasses = o && o.useStickyClasses || false;
  this.styles = this.el.style;
  this.positionStickyVal = 'fixed';
  this.setStickyPosition();
  if (this.positionStickyVal === 'fixed' || this.useClasses === true) {
    this.manageStickiness();
  }
  return this;
}

/*
  setStickyPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var styles = this.styles;
  var vp = this.vp;
  for (var i = 0; i < browserPrefix.length; i += 1) {
    styles.position = browserPrefix[i] + 'sticky';
  }
  if (styles.position !== '') {
    this.positionStickyVal = styles.position;
    if (vp === 'top') {
      styles[vp] = this.offset + 'px';
    }
  }
  return this;
};

/*
  manageStickiness ✔️
  --------
  — manages stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.manageStickiness = function manageStickiness() {
  var parent = this.el.parentNode;
  var pv = this.positionStickyVal;
  var vp = this.vp;
  var offset = this.offset;
  var styles = this.styles;
  var classes = this.el.classList;
  var win = window;
  parent.classList.add('js-stickybit-parent');
  var stickyBitStart = this.el.getBoundingClientRect().top;
  var stickyBitStop = stickyBitStart + parent.offsetHeight - (this.el.offsetHeight - offset);
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';

  // manage stickiness
  function stickiness() {
    var scroll = win.scrollY || win.pageYOffset;
    var hasStickyClass = classes.contains(stickyClass);
    var hasStuckClass = classes.contains(stuckClass);
    if (scroll < stickyBitStart) {
      if (hasStickyClass) {
        classes.remove(stickyClass);
        if (pv === 'fixed') styles.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!hasStickyClass) classes.add(stickyClass);
      if (hasStuckClass) {
        classes.remove(stuckClass);
        styles.bottom = '';
      }
      styles.position = pv;
      styles[vp] = offset + 'px';
    } else if (scroll > stickyBitStop && !hasStuckClass) {
      classes.remove(stickyClass);
      classes.add(stuckClass);
      if (pv !== 'fixed') return;
      styles.top = '';
      styles.bottom = '0';
      styles.position = 'absolute';
    }
  }

  var invoked = void 0;

  this.checkStickiness = function checkStickiness() {
    if (invoked) return;
    invoked = true;
    win.requestAnimationFrame(stickiness);
    win.setTimeout(function () {
      invoked = false;
    }, 0);
  };

  win.addEventListener('scroll', this.checkStickiness);
  return this;
};

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybit.prototype.cleanup = function cleanup() {
  var el = this.el;
  var styles = this.styles;
  // cleanup styles
  styles.position = '';
  styles[this.vp] = '';
  // cleanup CSS classes
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  // remove scroll event listener
  window.removeEventListener('scroll', this.checkStickiness);
  // turn of sticky invocation
  this.checkStickiness = false;
};

function MultiBits(userInstances) {
  var _this = this;

  this.privateInstances = userInstances || [];
  this.cleanup = function () {
    return _this.privateInstances.forEach(function (instance) {
      return instance.cleanup();
    });
  };
}

function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var instances = [];
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    instances.push(new Stickybit(el, o));
  }
  return new MultiBits(instances);
}

return stickybits;

})));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cashDom = __webpack_require__(0);

var _cashDom2 = _interopRequireDefault(_cashDom);

var _animateOnScroll = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function launch(el, i) {
    (0, _animateOnScroll.registerComponent)((0, _cashDom2.default)(el).find('.stats-block__piechart'), function (piechart) {
        var piechartValue = piechart.find('.stats-block__piechart__value');
        if (piechartValue[0] && piechartValue[0].getTotalLength) {
            var length = piechartValue[0].getTotalLength() + 'px';
            piechartValue.css({
                'stroke-dashoffset': length,
                'stroke-dasharray': length + ', ' + length
            });
        }

        piechartValue.addClass('stats-block__piechart__value--jsrun');
        setTimeout(function () {
            piechartValue.css({
                'stroke-dashoffset': 0
            }, 100);
        }, 0);
    });
}

var className = 'stats-block';

exports.default = {
    launch: launch,
    className: className
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjg2MDMwODUzZDI1MzBiZTg1ZGUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nhc2gtZG9tL2Rpc3QvY2FzaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vZWxlbWVudC1jbGFzc25hbWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzLXV0aWxzL3Njcm9sbC10by5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1zZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWxpbmtzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtb24tc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50LWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXp5LWxvYWQvbGF6eS1sb2FkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQudHJhbnNwaWxlZC5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy9nZXQtZGF0YS1hdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlby1wcmV2aWV3L3ZpZGVvLXByZXZpZXcteW91dHViZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXh0ZW5kL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy11dGlscy95b3V0dWJlLXBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvbmF2LW1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2xvbmUvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtbW9iaWxlL3BhcnNlLW5hdi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXYtZGVza3RvcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvYWNjb3JkaW9uLXRhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RpY2t5Yml0cy9kaXN0L3N0aWNreWJpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdHMtYmxvY2svc3RhdHMtYmxvY2suanMiXSwibmFtZXMiOlsiY29udGVudENuIiwiY2xhc3NOYW1lIiwiaGVhZGluZ0NuIiwiaGVhZGluZ0FuY2hvckNuIiwiaGVhZGluZ0FuY2hvckxhYmVsQ24iLCJoZWFkaW5nQW5jaG9ySWNvbkNuIiwibWVudUNuIiwibWVudVdyYXBwZXJDbiIsIm1lbnVJdGVtQ24iLCJtZW51SXRlbUxhYmVsQ24iLCJzY3JvbGxlZEludG9WaWV3IiwiZWxlbSIsImRvY1ZpZXdUb3AiLCJ3aW5kb3ciLCJzY3JvbGxZIiwiZG9jVmlld0JvdHRvbSIsImlubmVySGVpZ2h0IiwiZWxlbVRvcCIsIm9mZnNldCIsInRvcCIsImVsZW1IZWlnaHQiLCJoZWlnaHQiLCJlbGVtQm90dG9tIiwidmlld1RvcCIsIk1hdGgiLCJtYXgiLCJ2aWV3Qm90dG9tIiwibWluIiwic2Nyb2xsVG8iLCJlbGVtZW50Iiwic2Nyb2xsSW50b1ZpZXciLCJtYXhIZWlnaHQiLCJlYWNoIiwiY29uc29sZSIsImxvZyIsInNjcm9sbGVkWSIsInNjcm9sbCIsImZpbmRIZWFkaW5ncyIsInByZXBhcmVBY2NvcmRpb25IZWFkaW5nIiwicGF0dGVybkNsYXNzbmFtZSIsInRleHQiLCJpZCIsImFuY2hvciIsImFkZENsYXNzIiwiYXR0ciIsImh0bWwiLCJhcHBlbmRUbyIsIndpZGdldCIsImNvbnRlbnQiLCJoZWFkaW5nVGFnTmFtZSIsImNoaWxkcmVuIiwiZmlyc3QiLCJwcm9wIiwiaGVhZGVyRWxlbWVudHMiLCJtYXAiLCJpIiwiaXRlbSIsImNvbnRlbnRFbGVtZW50cyIsIm5leHQiLCJsZW5ndGgiLCJwdXNoIiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kIiwiaW5zZXJ0QWZ0ZXIiLCJwcmVwYXJlQ29udGVudCIsImNvbnRlbnRDbGFzc05hbWUiLCJjb250ZW50RWxlbWVudCIsImdyaWQiLCJkZWFjdGl2YXRlQWxsIiwicHJlcGFyZUxpbmtzIiwiZ2VuQWN0aXZhdGVJdGVtIiwiaGVhZGluZ0FuY2hvcnMiLCJhbGxBbmNob3JzIiwiZmlsdGVyIiwicmVtb3ZlQ2xhc3MiLCJub3QiLCJoZWFkaW5ncyIsIm1lbnUiLCJhY3RpdmF0ZUluaXRpYWwiLCJyZWR1Y2UiLCJhY2MiLCJhZGQiLCJmaW5kIiwiYWN0aXZhdGVJdGVtIiwib24iLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsImlzQWNjb3JkaW5BbmNob3IiLCJoYXNDbGFzcyIsInJlZ2lzdGVyQ29tcG9uZW50IiwibGF1bmNoIiwicmVnaXN0ZXJlZEVsZW1lbnRzIiwiY2xhc3NOYW1lT3JGdW5jdGlvbiIsImZ1bmMiLCJjb21wbGV0ZWQiLCJjaGVja0FsbCIsInRvRGVsZXRlIiwiZm9yRWFjaCIsInZhbHVlIiwicmV2ZXJzZSIsInNwbGljZSIsImxhdW5jaFBhdHRlcm4iLCJwYXR0ZXJuIiwiZWwiLCJzZWxlY3QiLCJ1cmwiLCJlcSIsImxvY2F0aW9uIiwiaHJlZiIsInNlYXJjaCIsImVsZW1lbnRzX3NlbGVjdG9yIiwiZGF0YV9zcmMiLCJ0aHJlc2hvbGQiLCJjYWxsYmFja19sb2FkIiwiaW1nIiwic3R5bGUiLCJwYWRkaW5nQm90dG9tIiwiZ2V0U2VydmljZSIsImxpbmsiLCJwYXJhbXMiLCJ5dE1hdGNoIiwibWF0Y2giLCJ0eXBlIiwic2VydmljZSIsInBhcmVudCIsIndyYXBwZXIiLCJ0b0xvd2VyQ2FzZSIsImxvYWRWaWRlbyIsImdldERhdGFBdHRyaWJ1dGVzIiwiZGF0YUF0dHJSZWdleCIsIm5vZGUiLCJBcnJheSIsImZyb20iLCJnZXQiLCJhdHRyaWJ1dGVzIiwibm9kZU5hbWUiLCJub2RlVmFsdWUiLCJsb2FkWW91dHViZVZpZGVvIiwiREVGQVVMVF9QQVJBTVMiLCJmcmFtZUJvcmRlciIsImlmcmFtZUlkIiwiZmFsbGJhY2tQYXJhbXMiLCJ3aWR0aCIsInBsYXllclBhcmFtcyIsInZpZGVvSWQiLCJldmVudHMiLCJvbkluaXQiLCJvblJlYWR5IiwicmVtb3ZlIiwicGxheWVyIiwidGFyZ2V0IiwiaWZyYW1lIiwicGxheVZpZGVvIiwiZG9jdW1lbnQiLCJwYXVzZVZpZGVvIiwiY3JlYXRlUGxheWVyIiwiVU5MT0FERUQiLCJMT0FESU5HIiwiTE9BREVEIiwiYXBpU3RhdHVzIiwicGVuZGluZ1BsYXllcnMiLCJwbGF5ZXJzIiwiZGF0YSIsImluaXRQbGF5ZXIiLCJsb2FkQXBpIiwiWVQiLCJQbGF5ZXIiLCJvbllvdVR1YmVJZnJhbWVBUElSZWFkeSIsInRhZyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJmaXJzdFNjcmlwdFRhZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSIsIm5hdiIsInByZXBhcmVUcmVlSWRzIiwidHJlZSIsInBhcmVudElkIiwiaW5kZXgiLCJjaGlsZCIsIk5hdk1vYmlsZSIsImRlZmF1bHRPcGVuIiwidG9nZ2xlIiwic2xpY2UiLCJ0b2dnbGVDaGlsZHJlbiIsImJpbmQiLCJsZXZlbE1hcCIsImxhYmVsIiwicHJldiIsIm9wZW5OYXYiLCJwcmVwYXJlSXRlbUVsZW1lbnQiLCJmb3JjZU9wZW4iLCJhbmNlc3RvcnMiLCJwYXJlbnRzIiwic2V0T3BlbiIsInRvZ2dsZUNsYXNzIiwiY29udGFpbmVyIiwiY2hpbGRyZW5Db250YWluZXIiLCJsZXZlbCIsImhlYWRlciIsIm5hbWUiLCJjaGlsZHJlblRvZ2dsZSIsIlBBUlNFX1JFR0VYIiwibG9hZERhdGEiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImxvYWRVcmxzIiwiZ2V0UGF0aCIsInJlcGxhY2UiLCJtYXRjaExldmVsIiwicGF0aCIsImN1cnJlbnRQYXRoIiwiaW5kZXhPZiIsInBhcnNlTmF2IiwiY3VycmVudFVybCIsInNwbGl0IiwibGluZSIsImxldmVsU3RyIiwicGFyc2VJbnQiLCJjdXJyZW50SGVhZCIsImN1cnJlbnQiLCJmaW5kQ3VycmVudCIsImxpc3QiLCJxdWVyeVNlbGVjdG9yIiwiYW5jaG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YXJpYXRpb24iLCJicmVhZGNydW1iIiwiYnJlYWRjcnVtYkl0ZW1zIiwiYnJlYWRjcnVtYkRyb3Bkb3duQ2hpbGRyZW4iLCJjaGlsZHJlbkRhdGEiLCJjbGFzc0xpc3QiLCJicmVhZGNydW1iRHJvcGRvd25DdXJyZW50IiwiY3VycmVudERhdGEiLCJjb250ZW50V3JhcHBlciIsInByZXBhcmVUYWJzSGVhZGluZ3MiLCJ0YWJzQmFyIiwiY29udGFpbmVyQ2xhc3MiLCJ1c2VTdGlja3lDbGFzc2VzIiwicGllY2hhcnRWYWx1ZSIsInBpZWNoYXJ0IiwiZ2V0VG90YWxMZW5ndGgiLCJjc3MiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O2tFQzdEQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCx3QkFBd0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMsY0FBYzs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLFlBQVk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLFNBQVM7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUssRUFBRTs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxvRkFBb0Y7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFF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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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Q0FBa0I7QUFDZCxxQ0FBcUI7QUFEUCxhQUFsQixFQUVHLEdBRkg7QUFHSCxTQUpELEVBSUcsQ0FKSDtBQUtILEtBaEJEO0FBaUJIOztBQUVELElBQU1qUCxZQUFZLGFBQWxCOztrQkFFZTtBQUNYeUYsa0JBRFc7QUFFWHpGO0FBRlcsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI4NjAzMDg1M2QyNTMwYmU4NWRlIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qISBjYXNoLWRvbSAxLjMuNSwgaHR0cHM6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvY2FzaCBAbGljZW5zZSBNSVQgKi9cbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5jYXNoID0gcm9vdC4kID0gZmFjdG9yeSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCwgd2luID0gd2luZG93LCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLCBzbGljZSA9IEFycmF5UHJvdG8uc2xpY2UsIGZpbHRlciA9IEFycmF5UHJvdG8uZmlsdGVyLCBwdXNoID0gQXJyYXlQcm90by5wdXNoO1xuXG4gIHZhciBub29wID0gZnVuY3Rpb24gKCkge30sIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIC8vIEBzZWUgaHR0cHM6Ly9jcmJ1Zy5jb20vNTY4NDQ4XG4gICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSB0eXBlb2Ygbm9vcCAmJiBpdGVtLmNhbGw7XG4gIH0sIGlzU3RyaW5nID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IHR5cGVvZiBcIlwiO1xuICB9O1xuXG4gIHZhciBpZE1hdGNoID0gL14jW1xcdy1dKiQvLCBjbGFzc01hdGNoID0gL15cXC5bXFx3LV0qJC8sIGh0bWxNYXRjaCA9IC88Lis+Lywgc2luZ2xldCA9IC9eXFx3KyQvO1xuXG4gIGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2M7XG4gICAgdmFyIGVsZW1zID0gKGNsYXNzTWF0Y2gudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc2xpY2UoMSkpIDogc2luZ2xldC50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIDogY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgcmV0dXJuIGVsZW1zO1xuICB9XG5cbiAgdmFyIGZyYWc7XG4gIGZ1bmN0aW9uIHBhcnNlSFRNTChzdHIpIHtcbiAgICBpZiAoIWZyYWcpIHtcbiAgICAgIGZyYWcgPSBkb2MuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCk7XG4gICAgICB2YXIgYmFzZSA9IGZyYWcuY3JlYXRlRWxlbWVudChcImJhc2VcIik7XG4gICAgICBiYXNlLmhyZWYgPSBkb2MubG9jYXRpb24uaHJlZjtcbiAgICAgIGZyYWcuaGVhZC5hcHBlbmRDaGlsZChiYXNlKTtcbiAgICB9XG5cbiAgICBmcmFnLmJvZHkuaW5uZXJIVE1MID0gc3RyO1xuXG4gICAgcmV0dXJuIGZyYWcuYm9keS5jaGlsZE5vZGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gb25SZWFkeShmbikge1xuICAgIGlmIChkb2MucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgIGZuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gSW5pdChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIElmIGFscmVhZHkgYSBjYXNoIGNvbGxlY3Rpb24sIGRvbid0IGRvIGFueSBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgICBpZiAoc2VsZWN0b3IuY2FzaCAmJiBzZWxlY3RvciAhPT0gd2luKSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1zID0gc2VsZWN0b3IsIGkgPSAwLCBsZW5ndGg7XG5cbiAgICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgICBlbGVtcyA9IChpZE1hdGNoLnRlc3Qoc2VsZWN0b3IpID9cbiAgICAgIC8vIElmIGFuIElEIHVzZSB0aGUgZmFzdGVyIGdldEVsZW1lbnRCeUlkIGNoZWNrXG4gICAgICBkb2MuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpIDogaHRtbE1hdGNoLnRlc3Qoc2VsZWN0b3IpID9cbiAgICAgIC8vIElmIEhUTUwsIHBhcnNlIGl0IGludG8gcmVhbCBlbGVtZW50c1xuICAgICAgcGFyc2VIVE1MKHNlbGVjdG9yKSA6XG4gICAgICAvLyBlbHNlIHVzZSBgZmluZGBcbiAgICAgIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpKTtcblxuICAgICAgLy8gSWYgZnVuY3Rpb24sIHVzZSBhcyBzaG9ydGN1dCBmb3IgRE9NIHJlYWR5XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgb25SZWFkeShzZWxlY3Rvcik7cmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSWYgYSBzaW5nbGUgRE9NIGVsZW1lbnQgaXMgcGFzc2VkIGluIG9yIHJlY2VpdmVkIHZpYSBJRCwgcmV0dXJuIHRoZSBzaW5nbGUgZWxlbWVudFxuICAgIGlmIChlbGVtcy5ub2RlVHlwZSB8fCBlbGVtcyA9PT0gd2luKSB7XG4gICAgICB0aGlzWzBdID0gZWxlbXM7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyZWF0IGxpa2UgYW4gYXJyYXkgYW5kIGxvb3AgdGhyb3VnaCBlYWNoIGl0ZW0uXG4gICAgICBsZW5ndGggPSB0aGlzLmxlbmd0aCA9IGVsZW1zLmxlbmd0aDtcbiAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpc1tpXSA9IGVsZW1zW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FzaChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgSW5pdChzZWxlY3RvciwgY29udGV4dCk7XG4gIH1cblxuICB2YXIgZm4gPSBjYXNoLmZuID0gY2FzaC5wcm90b3R5cGUgPSBJbml0LnByb3RvdHlwZSA9IHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgY2FzaDogdHJ1ZSxcbiAgICBsZW5ndGg6IDAsXG4gICAgcHVzaDogcHVzaCxcbiAgICBzcGxpY2U6IEFycmF5UHJvdG8uc3BsaWNlLFxuICAgIG1hcDogQXJyYXlQcm90by5tYXAsXG4gICAgaW5pdDogSW5pdFxuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJjb25zdHJ1Y3RvclwiLCB7IHZhbHVlOiBjYXNoIH0pO1xuXG4gIGNhc2gucGFyc2VIVE1MID0gcGFyc2VIVE1MO1xuICBjYXNoLm5vb3AgPSBub29wO1xuICBjYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICBjYXNoLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbiAgY2FzaC5leHRlbmQgPSBmbi5leHRlbmQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHt9O1xuXG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksIGxlbmd0aCA9IGFyZ3MubGVuZ3RoLCBpID0gMTtcblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGFyZ2V0ID0gdGhpcztcbiAgICAgIGkgPSAwO1xuICAgIH1cblxuICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghYXJnc1tpXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmdzW2ldKSB7XG4gICAgICAgIGlmIChhcmdzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ3NbaV1ba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgZnVuY3Rpb24gZWFjaChjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBsID0gY29sbGVjdGlvbi5sZW5ndGgsIGkgPSAwO1xuXG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGNvbGxlY3Rpb25baV0sIGNvbGxlY3Rpb25baV0sIGksIGNvbGxlY3Rpb24pID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXRjaGVzKGVsLCBzZWxlY3Rvcikge1xuICAgIHZhciBtID0gZWwgJiYgKGVsLm1hdGNoZXMgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvciB8fCBlbC5vTWF0Y2hlc1NlbGVjdG9yKTtcbiAgICByZXR1cm4gISFtICYmIG0uY2FsbChlbCwgc2VsZWN0b3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAvKiBVc2UgYnJvd3NlcidzIGBtYXRjaGVzYCBmdW5jdGlvbiBpZiBzdHJpbmcgKi9cbiAgICBpc1N0cmluZyhzZWxlY3RvcikgPyBtYXRjaGVzIDpcbiAgICAvKiBNYXRjaCBhIGNhc2ggZWxlbWVudCAqL1xuICAgIHNlbGVjdG9yLmNhc2ggPyBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rvci5pcyhlbCk7XG4gICAgfSA6XG4gICAgLyogRGlyZWN0IGNvbXBhcmlzb24gKi9cbiAgICBmdW5jdGlvbiAoZWwsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZWwgPT09IHNlbGVjdG9yO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5pcXVlKGNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gY2FzaChzbGljZS5jYWxsKGNvbGxlY3Rpb24pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICAgIH0pKTtcbiAgfVxuXG4gIGNhc2guZXh0ZW5kKHtcbiAgICBtZXJnZTogZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgIHZhciBsZW4gPSArc2Vjb25kLmxlbmd0aCwgaSA9IGZpcnN0Lmxlbmd0aCwgaiA9IDA7XG5cbiAgICAgIGZvciAoOyBqIDwgbGVuOyBpKyssIGorKykge1xuICAgICAgICBmaXJzdFtpXSA9IHNlY29uZFtqXTtcbiAgICAgIH1cblxuICAgICAgZmlyc3QubGVuZ3RoID0gaTtcbiAgICAgIHJldHVybiBmaXJzdDtcbiAgICB9LFxuXG4gICAgZWFjaDogZWFjaCxcbiAgICBtYXRjaGVzOiBtYXRjaGVzLFxuICAgIHVuaXF1ZTogdW5pcXVlLFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXksXG4gICAgaXNOdW1lcmljOiBmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgdmFyIHVpZCA9IGNhc2gudWlkID0gXCJfY2FzaFwiICsgRGF0ZS5ub3coKTtcblxuICBmdW5jdGlvbiBnZXREYXRhQ2FjaGUobm9kZSkge1xuICAgIHJldHVybiAobm9kZVt1aWRdID0gbm9kZVt1aWRdIHx8IHt9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERhdGEobm9kZSwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiAoZ2V0RGF0YUNhY2hlKG5vZGUpW2tleV0gPSB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRhKG5vZGUsIGtleSkge1xuICAgIHZhciBjID0gZ2V0RGF0YUNhY2hlKG5vZGUpO1xuICAgIGlmIChjW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY1trZXldID0gbm9kZS5kYXRhc2V0ID8gbm9kZS5kYXRhc2V0W2tleV0gOiBjYXNoKG5vZGUpLmF0dHIoXCJkYXRhLVwiICsga2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGNba2V5XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZURhdGEobm9kZSwga2V5KSB7XG4gICAgdmFyIGMgPSBnZXREYXRhQ2FjaGUobm9kZSk7XG4gICAgaWYgKGMpIHtcbiAgICAgIGRlbGV0ZSBjW2tleV07XG4gICAgfSBlbHNlIGlmIChub2RlLmRhdGFzZXQpIHtcbiAgICAgIGRlbGV0ZSBub2RlLmRhdGFzZXRba2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FzaChub2RlKS5yZW1vdmVBdHRyKFwiZGF0YS1cIiArIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgZGF0YTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gdW5kZWZpbmVkID8gZ2V0RGF0YSh0aGlzWzBdLCBuYW1lKSA6IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBzZXREYXRhKHYsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICB0aGlzLmRhdGEoa2V5LCBuYW1lW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVtb3ZlRGF0YTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gcmVtb3ZlRGF0YSh2LCBrZXkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBub3RXaGl0ZU1hdGNoID0gL1xcUysvZztcblxuICBmdW5jdGlvbiBnZXRDbGFzc2VzKGMpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoYykgJiYgYy5tYXRjaChub3RXaGl0ZU1hdGNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKHYsIGMpIHtcbiAgICByZXR1cm4gKHYuY2xhc3NMaXN0ID8gdi5jbGFzc0xpc3QuY29udGFpbnMoYykgOiBuZXcgUmVnRXhwKFwiKF58IClcIiArIGMgKyBcIiggfCQpXCIsIFwiZ2lcIikudGVzdCh2LmNsYXNzTmFtZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSkge1xuICAgIGlmICh2LmNsYXNzTGlzdCkge1xuICAgICAgdi5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH0gZWxzZSBpZiAoc3BhY2VkTmFtZS5pbmRleE9mKFwiIFwiICsgYyArIFwiIFwiKSkge1xuICAgICAgdi5jbGFzc05hbWUgKz0gXCIgXCIgKyBjO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKHYsIGMpIHtcbiAgICBpZiAodi5jbGFzc0xpc3QpIHtcbiAgICAgIHYuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdi5jbGFzc05hbWUgPSB2LmNsYXNzTmFtZS5yZXBsYWNlKGMsIFwiXCIpO1xuICAgIH1cbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG5cbiAgICAgIHJldHVybiAoY2xhc3NlcyA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICB2YXIgc3BhY2VkTmFtZSA9IFwiIFwiICsgdi5jbGFzc05hbWUgKyBcIiBcIjtcbiAgICAgICAgZWFjaChjbGFzc2VzLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIGFkZENsYXNzKHYsIGMsIHNwYWNlZE5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pIDogdGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHI6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS5nZXRBdHRyaWJ1dGUgPyB0aGlzWzBdLmdldEF0dHJpYnV0ZShuYW1lKSA6IHRoaXNbMF1bbmFtZV0gOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgaWYgKHYuc2V0QXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICB0aGlzLmF0dHIoa2V5LCBuYW1lW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgY2hlY2sgPSBmYWxzZSwgY2xhc3NlcyA9IGdldENsYXNzZXMoYyk7XG4gICAgICBpZiAoY2xhc3NlcyAmJiBjbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBjaGVjayA9IGhhc0NsYXNzKHYsIGNsYXNzZXNbMF0pO1xuICAgICAgICAgIHJldHVybiAhY2hlY2s7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH0sXG5cbiAgICBwcm9wOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB1bmRlZmluZWQgPyB0aGlzWzBdW25hbWVdIDogdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgdltuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMucHJvcChrZXksIG5hbWVba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW1vdmVBdHRyOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAodi5yZW1vdmVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICB2LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdltuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbiAgICAgIH1cbiAgICAgIHZhciBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhjKTtcbiAgICAgIHJldHVybiAoY2xhc3NlcyA/IHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmVtb3ZlQ2xhc3ModiwgYyk7XG4gICAgICAgIH0pO1xuICAgICAgfSkgOiB0aGlzKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJvcDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgZGVsZXRlIHZbbmFtZV07XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uIChjLCBzdGF0ZSkge1xuICAgICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbc3RhdGUgPyBcImFkZENsYXNzXCIgOiBcInJlbW92ZUNsYXNzXCJdKGMpO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzZXMgPSBnZXRDbGFzc2VzKGMpO1xuICAgICAgcmV0dXJuIChjbGFzc2VzID8gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhciBzcGFjZWROYW1lID0gXCIgXCIgKyB2LmNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgaWYgKGhhc0NsYXNzKHYsIGMpKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyh2LCBjKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkQ2xhc3ModiwgYywgc3BhY2VkTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pIDogdGhpcyk7XG4gICAgfSB9KTtcblxuICBmbi5leHRlbmQoe1xuICAgIGFkZDogZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdW5pcXVlKGNhc2gubWVyZ2UodGhpcywgY2FzaChzZWxlY3RvciwgY29udGV4dCkpKTtcbiAgICB9LFxuXG4gICAgZWFjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICBlYWNoKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBlcTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICByZXR1cm4gY2FzaCh0aGlzLmdldChpbmRleCkpO1xuICAgIH0sXG5cbiAgICBmaWx0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmF0b3IgPSAoaXNGdW5jdGlvbihzZWxlY3RvcikgPyBzZWxlY3RvciA6IGdldENvbXBhcmVGdW5jdGlvbihzZWxlY3RvcikpO1xuXG4gICAgICByZXR1cm4gY2FzaChmaWx0ZXIuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcihlLCBzZWxlY3Rvcik7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGZpcnN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcSgwKTtcbiAgICB9LFxuXG4gICAgZ2V0OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzbGljZS5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChpbmRleCA8IDAgPyB0aGlzW2luZGV4ICsgdGhpcy5sZW5ndGhdIDogdGhpc1tpbmRleF0pO1xuICAgIH0sXG5cbiAgICBpbmRleDogZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHZhciBjaGlsZCA9IGVsZW0gPyBjYXNoKGVsZW0pWzBdIDogdGhpc1swXSwgY29sbGVjdGlvbiA9IGVsZW0gPyB0aGlzIDogY2FzaChjaGlsZCkucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgICAgIHJldHVybiBzbGljZS5jYWxsKGNvbGxlY3Rpb24pLmluZGV4T2YoY2hpbGQpO1xuICAgIH0sXG5cbiAgICBsYXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcSgtMSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIHZhciBjYW1lbENhc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW1lbFJlZ2V4ID0gLyg/Ol5cXHd8W0EtWl18XFxiXFx3KS9nLCB3aGl0ZVNwYWNlID0gL1tcXHMtX10rL2c7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZShjYW1lbFJlZ2V4LCBmdW5jdGlvbiAobGV0dGVyLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGV0dGVyW2luZGV4ID09PSAwID8gXCJ0b0xvd2VyQ2FzZVwiIDogXCJ0b1VwcGVyQ2FzZVwiXSgpO1xuICAgICAgfSkucmVwbGFjZSh3aGl0ZVNwYWNlLCBcIlwiKTtcbiAgICB9O1xuICB9KCkpO1xuXG4gIHZhciBnZXRQcmVmaXhlZFByb3AgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYWNoZSA9IHt9LCBkb2MgPSBkb2N1bWVudCwgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksIHN0eWxlID0gZGl2LnN0eWxlO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBwcm9wID0gY2FtZWxDYXNlKHByb3ApO1xuICAgICAgaWYgKGNhY2hlW3Byb3BdKSB7XG4gICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHVjUHJvcCA9IHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpLCBwcmVmaXhlcyA9IFtcIndlYmtpdFwiLCBcIm1velwiLCBcIm1zXCIsIFwib1wiXSwgcHJvcHMgPSAocHJvcCArIFwiIFwiICsgKHByZWZpeGVzKS5qb2luKHVjUHJvcCArIFwiIFwiKSArIHVjUHJvcCkuc3BsaXQoXCIgXCIpO1xuXG4gICAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAocCkge1xuICAgICAgICBpZiAocCBpbiBzdHlsZSkge1xuICAgICAgICAgIGNhY2hlW3BdID0gcHJvcCA9IGNhY2hlW3Byb3BdID0gcDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgfTtcbiAgfSgpKTtcblxuICBjYXNoLnByZWZpeGVkUHJvcCA9IGdldFByZWZpeGVkUHJvcDtcbiAgY2FzaC5jYW1lbENhc2UgPSBjYW1lbENhc2U7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBjc3M6IGZ1bmN0aW9uIChwcm9wLCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgICAgIHByb3AgPSBnZXRQcmVmaXhlZFByb3AocHJvcCk7XG4gICAgICAgIHJldHVybiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgPyB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9KSA6IHdpbi5nZXRDb21wdXRlZFN0eWxlKHRoaXNbMF0pW3Byb3BdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3ApIHtcbiAgICAgICAgdGhpcy5jc3Moa2V5LCBwcm9wW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gY29tcHV0ZShlbCwgcHJvcCkge1xuICAgIHJldHVybiBwYXJzZUludCh3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbFswXSwgbnVsbClbcHJvcF0sIDEwKSB8fCAwO1xuICB9XG5cbiAgZWFjaChbXCJXaWR0aFwiLCBcIkhlaWdodFwiXSwgZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgbG93ZXIgPSB2LnRvTG93ZXJDYXNlKCk7XG5cbiAgICBmbltsb3dlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtsb3dlcl07XG4gICAgfTtcblxuICAgIGZuW1wiaW5uZXJcIiArIHZdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXNbMF1bXCJjbGllbnRcIiArIHZdO1xuICAgIH07XG5cbiAgICBmbltcIm91dGVyXCIgKyB2XSA9IGZ1bmN0aW9uIChtYXJnaW5zKSB7XG4gICAgICByZXR1cm4gdGhpc1swXVtcIm9mZnNldFwiICsgdl0gKyAobWFyZ2lucyA/IGNvbXB1dGUodGhpcywgXCJtYXJnaW5cIiArICh2ID09PSBcIldpZHRoXCIgPyBcIkxlZnRcIiA6IFwiVG9wXCIpKSArIGNvbXB1dGUodGhpcywgXCJtYXJnaW5cIiArICh2ID09PSBcIldpZHRoXCIgPyBcIlJpZ2h0XCIgOiBcIkJvdHRvbVwiKSkgOiAwKTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiByZWdpc3RlckV2ZW50KG5vZGUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZXZlbnRDYWNoZSA9IGdldERhdGEobm9kZSwgXCJfY2FzaEV2ZW50c1wiKSB8fCBzZXREYXRhKG5vZGUsIFwiX2Nhc2hFdmVudHNcIiwge30pO1xuICAgIGV2ZW50Q2FjaGVbZXZlbnROYW1lXSA9IGV2ZW50Q2FjaGVbZXZlbnROYW1lXSB8fCBbXTtcbiAgICBldmVudENhY2hlW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQobm9kZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudHMgPSBnZXREYXRhKG5vZGUsIFwiX2Nhc2hFdmVudHNcIiksIGV2ZW50Q2FjaGUgPSAoZXZlbnRzICYmIGV2ZW50c1tldmVudE5hbWVdKSwgaW5kZXg7XG5cbiAgICBpZiAoIWV2ZW50Q2FjaGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIGluZGV4ID0gZXZlbnRDYWNoZS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGV2ZW50Q2FjaGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChldmVudENhY2hlLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgICBldmVudENhY2hlID0gW107XG4gICAgfVxuICB9XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBvZmY6IGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVFdmVudCh2LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGVsZWdhdGUsIGNhbGxiYWNrLCBydW5PbmNlKSB7XG4gICAgICAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgICAgdmFyIG9yaWdpbmFsQ2FsbGJhY2s7XG5cbiAgICAgIGlmICghaXNTdHJpbmcoZXZlbnROYW1lKSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnROYW1lKSB7XG4gICAgICAgICAgdGhpcy5vbihrZXksIGRlbGVnYXRlLCBldmVudE5hbWVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGRlbGVnYXRlKSkge1xuICAgICAgICBjYWxsYmFjayA9IGRlbGVnYXRlO1xuICAgICAgICBkZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudE5hbWUgPT09IFwicmVhZHlcIikge1xuICAgICAgICBvblJlYWR5KGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgdCA9IGUudGFyZ2V0O1xuXG4gICAgICAgICAgd2hpbGUgKCFtYXRjaGVzKHQsIGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKHQgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICh0ID0gZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IHQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgb3JpZ2luYWxDYWxsYmFjay5jYWxsKHQsIGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICB2YXIgZmluYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAocnVuT25jZSkge1xuICAgICAgICAgIGZpbmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodiwgZXZlbnROYW1lLCBmaW5hbENhbGxiYWNrKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdGVyRXZlbnQodiwgZXZlbnROYW1lLCBmaW5hbENhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvbmU6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMub24oZXZlbnROYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHRydWUpO1xuICAgIH0sXG5cbiAgICByZWFkeTogb25SZWFkeSxcblxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIHZhciBldnQgPSBkb2MuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuICAgICAgZXZ0LmRhdGEgPSBkYXRhO1xuICAgICAgZXZ0LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIGZhbHNlKTtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGVuY29kZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiBcIiZcIiArIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC8lMjAvZywgXCIrXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0TXVsdGlwbGVfKGVsKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGVhY2goZWwub3B0aW9ucywgZnVuY3Rpb24gKG8pIHtcbiAgICAgIGlmIChvLnNlbGVjdGVkKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKG8udmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzIDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNlbGVjdFNpbmdsZV8oZWwpIHtcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IGVsLnNlbGVjdGVkSW5kZXg7XG4gICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPj0gMCA/IGVsLm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0udmFsdWUgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmFsdWUoZWwpIHtcbiAgICB2YXIgdHlwZSA9IGVsLnR5cGU7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgXCJzZWxlY3Qtb25lXCI6XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RTaW5nbGVfKGVsKTtcbiAgICAgIGNhc2UgXCJzZWxlY3QtbXVsdGlwbGVcIjpcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdE11bHRpcGxlXyhlbCk7XG4gICAgICBjYXNlIFwicmFkaW9cIjpcbiAgICAgICAgcmV0dXJuIChlbC5jaGVja2VkKSA/IGVsLnZhbHVlIDogbnVsbDtcbiAgICAgIGNhc2UgXCJjaGVja2JveFwiOlxuICAgICAgICByZXR1cm4gKGVsLmNoZWNrZWQpID8gZWwudmFsdWUgOiBudWxsO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGVsLnZhbHVlID8gZWwudmFsdWUgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZuLmV4dGVuZCh7XG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcXVlcnkgPSBcIlwiO1xuXG4gICAgICBlYWNoKHRoaXNbMF0uZWxlbWVudHMgfHwgdGhpcywgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmIChlbC5kaXNhYmxlZCB8fCBlbC50YWdOYW1lID09PSBcIkZJRUxEU0VUXCIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWUgPSBlbC5uYW1lO1xuICAgICAgICBzd2l0Y2ggKGVsLnR5cGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIGNhc2UgXCJmaWxlXCI6XG4gICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgY2FzZSBcInN1Ym1pdFwiOlxuICAgICAgICAgIGNhc2UgXCJidXR0b25cIjpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJzZWxlY3QtbXVsdGlwbGVcIjpcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBnZXRWYWx1ZShlbCk7XG4gICAgICAgICAgICBpZiAodmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGVhY2godmFsdWVzLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShlbCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcXVlcnkgKz0gZW5jb2RlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBxdWVyeS5zdWJzdHIoMSk7XG4gICAgfSxcblxuICAgIHZhbDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZ2V0VmFsdWUodGhpc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIHYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGluc2VydEVsZW1lbnQoZWwsIGNoaWxkLCBwcmVwZW5kKSB7XG4gICAgaWYgKHByZXBlbmQpIHtcbiAgICAgIHZhciBmaXJzdCA9IGVsLmNoaWxkTm9kZXNbMF07XG4gICAgICBlbC5pbnNlcnRCZWZvcmUoY2hpbGQsIGZpcnN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydENvbnRlbnQocGFyZW50LCBjaGlsZCwgcHJlcGVuZCkge1xuICAgIHZhciBzdHIgPSBpc1N0cmluZyhjaGlsZCk7XG5cbiAgICBpZiAoIXN0ciAmJiBjaGlsZC5sZW5ndGgpIHtcbiAgICAgIGVhY2goY2hpbGQsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiBpbnNlcnRDb250ZW50KHBhcmVudCwgdiwgcHJlcGVuZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlYWNoKHBhcmVudCwgc3RyID8gZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2Lmluc2VydEFkamFjZW50SFRNTChwcmVwZW5kID8gXCJhZnRlcmJlZ2luXCIgOiBcImJlZm9yZWVuZFwiLCBjaGlsZCk7XG4gICAgfSA6IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICByZXR1cm4gaW5zZXJ0RWxlbWVudCh2LCAoaSA9PT0gMCA/IGNoaWxkIDogY2hpbGQuY2xvbmVOb2RlKHRydWUpKSwgcHJlcGVuZCk7XG4gICAgfSk7XG4gIH1cblxuICBmbi5leHRlbmQoe1xuICAgIGFmdGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGNhc2goc2VsZWN0b3IpLmluc2VydEFmdGVyKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGFwcGVuZDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQodGhpcywgY29udGVudCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwZW5kVG86IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQoY2FzaChwYXJlbnQpLCB0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBiZWZvcmU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QmVmb3JlKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY2FzaCh0aGlzLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB9KSk7XG4gICAgfSxcblxuICAgIGVtcHR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmh0bWwoXCJcIik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgaHRtbDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0uaW5uZXJIVE1MO1xuICAgICAgfVxuICAgICAgdmFyIHNvdXJjZSA9IChjb250ZW50Lm5vZGVUeXBlID8gY29udGVudFswXS5vdXRlckhUTUwgOiBjb250ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYuaW5uZXJIVE1MID0gc291cmNlO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblxuICAgICAgY2FzaChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGUsIHNpYmxpbmcgPSBlbC5uZXh0U2libGluZztcbiAgICAgICAgX3RoaXMuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoKGkgPT09IDAgPyB2IDogdi5jbG9uZU5vZGUodHJ1ZSkpLCBzaWJsaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICAgIGNhc2goc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICBfdGhpczIuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoKGkgPT09IDAgPyB2IDogdi5jbG9uZU5vZGUodHJ1ZSkpLCBlbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcHJlcGVuZDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGluc2VydENvbnRlbnQodGhpcywgY29udGVudCwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcHJlcGVuZFRvOiBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICBpbnNlcnRDb250ZW50KGNhc2gocGFyZW50KSwgdGhpcywgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodik7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdGV4dDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0udGV4dENvbnRlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9KTtcblxuICB2YXIgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gIGZuLmV4dGVuZCh7XG4gICAgcG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBlbC5vZmZzZXRMZWZ0LFxuICAgICAgICB0b3A6IGVsLm9mZnNldFRvcFxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgb2Zmc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVjdCA9IHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWwuY2xpZW50VG9wLFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbC5jbGllbnRMZWZ0XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ub2Zmc2V0UGFyZW50KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZm4uZXh0ZW5kKHtcbiAgICBjaGlsZHJlbjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgZWxlbXMgPSBbXTtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcHVzaC5hcHBseShlbGVtcywgZWwuY2hpbGRyZW4pO1xuICAgICAgfSk7XG4gICAgICBlbGVtcyA9IHVuaXF1ZShlbGVtcyk7XG5cbiAgICAgIHJldHVybiAoIXNlbGVjdG9yID8gZWxlbXMgOiBlbGVtcy5maWx0ZXIoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXModiwgc2VsZWN0b3IpO1xuICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBjbG9zZXN0OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IgfHwgdGhpcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBjYXNoKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCgpLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIH0sXG5cbiAgICBpczogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gZmFsc2UsIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIG1hdGNoID0gY29tcGFyYXRvcihlbCwgc2VsZWN0b3IpO1xuICAgICAgICByZXR1cm4gIW1hdGNoO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9LFxuXG4gICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yLm5vZGVUeXBlKSB7XG4gICAgICAgIHJldHVybiBjYXNoKHNlbGVjdG9yICYmIHRoaXMuaGFzKHNlbGVjdG9yKS5sZW5ndGggPyBzZWxlY3RvciA6IG51bGwpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxlbXMgPSBbXTtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcHVzaC5hcHBseShlbGVtcywgZmluZChzZWxlY3RvciwgZWwpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKGVsZW1zKTtcbiAgICB9LFxuXG4gICAgaGFzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBjb21wYXJhdG9yID0gKGlzU3RyaW5nKHNlbGVjdG9yKSA/IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gZmluZChzZWxlY3RvciwgZWwpLmxlbmd0aCAhPT0gMDtcbiAgICAgIH0gOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIGVsLmNvbnRhaW5zKHNlbGVjdG9yKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG4gICAgfSxcblxuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICB9LFxuXG4gICAgbm90OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb21wYXJhdG9yID0gZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKTtcblxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gIWNvbXBhcmF0b3IoZWwsIHNlbGVjdG9yKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwYXJlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0ucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKHJlc3VsdCk7XG4gICAgfSxcblxuICAgIHBhcmVudHM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIGxhc3QsIHJlc3VsdCA9IFtdO1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbGFzdCA9IGl0ZW07XG5cbiAgICAgICAgd2hpbGUgKGxhc3QgJiYgbGFzdC5wYXJlbnROb2RlICYmIGxhc3QgIT09IGRvYy5ib2R5LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBsYXN0ID0gbGFzdC5wYXJlbnROb2RlO1xuXG4gICAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAoc2VsZWN0b3IgJiYgbWF0Y2hlcyhsYXN0LCBzZWxlY3RvcikpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChsYXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdW5pcXVlKHJlc3VsdCk7XG4gICAgfSxcblxuICAgIHByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjYXNoKHRoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgfSxcblxuICAgIHNpYmxpbmdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMucGFyZW50KCkuY2hpbGRyZW4oKSwgZWwgPSB0aGlzWzBdO1xuXG4gICAgICByZXR1cm4gY29sbGVjdGlvbi5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIGkgIT09IGVsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG5cbiAgcmV0dXJuIGNhc2g7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jYXNoLWRvbS9kaXN0L2Nhc2guanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IGNvbnRlbnRDbiA9IGNsYXNzTmFtZSA9PiBgJHtjbGFzc05hbWV9X19jb250ZW50YDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nQ24gPSBjbGFzc05hbWUgPT4gYCR7Y29udGVudENuKGNsYXNzTmFtZSl9X19oZWFkaW5nYDtcbmV4cG9ydCBjb25zdCBoZWFkaW5nQW5jaG9yQ24gPSBjbGFzc05hbWUgPT4gYCR7Y29udGVudENuKGNsYXNzTmFtZSl9X19oZWFkaW5nLWFuY2hvcmA7XG5leHBvcnQgY29uc3QgaGVhZGluZ0FuY2hvckxhYmVsQ24gPSBjbGFzc05hbWUgPT4gYCR7aGVhZGluZ0FuY2hvckNuKGNsYXNzTmFtZSl9X19sYWJlbGA7XG5leHBvcnQgY29uc3QgaGVhZGluZ0FuY2hvckljb25DbiA9IGNsYXNzTmFtZSA9PiBgJHtoZWFkaW5nQW5jaG9yQ24oY2xhc3NOYW1lKX1fX2ljb25gO1xuZXhwb3J0IGNvbnN0IG1lbnVDbiA9IGNsYXNzTmFtZSA9PiBgJHtjbGFzc05hbWV9X19tZW51YDtcbmV4cG9ydCBjb25zdCBtZW51V3JhcHBlckNuID0gY2xhc3NOYW1lID0+IGAke21lbnVDbihjbGFzc05hbWUpfS13cmFwcGVyYDtcbmV4cG9ydCBjb25zdCBtZW51SXRlbUNuID0gY2xhc3NOYW1lID0+IGAke21lbnVDbihjbGFzc05hbWUpfV9faXRlbWA7XG5leHBvcnQgY29uc3QgbWVudUl0ZW1MYWJlbENuID0gY2xhc3NOYW1lID0+IGAke21lbnVJdGVtQ24oY2xhc3NOYW1lKX1fX2xhYmVsYDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9lbGVtZW50LWNsYXNzbmFtZXMuanMiLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbGVkSW50b1ZpZXcoZWxlbSkge1xuICAgIGxldCBkb2NWaWV3VG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgbGV0IGRvY1ZpZXdCb3R0b20gPSBkb2NWaWV3VG9wICsgd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgbGV0IGVsZW1Ub3AgPSBlbGVtLm9mZnNldCgpLnRvcDtcbiAgICBsZXQgZWxlbUhlaWdodCA9IGVsZW0uaGVpZ2h0KCk7XG4gICAgbGV0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgZWxlbUhlaWdodDtcblxuICAgIGxldCB2aWV3VG9wID0gTWF0aC5tYXgoZWxlbVRvcCwgZG9jVmlld1RvcCk7XG4gICAgbGV0IHZpZXdCb3R0b20gPSBNYXRoLm1pbihlbGVtQm90dG9tLCBkb2NWaWV3Qm90dG9tKTtcblxuICAgIHJldHVybiAodmlld0JvdHRvbSAtIHZpZXdUb3ApIC8gZWxlbUhlaWdodDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy11dGlscy9zY3JvbGxlZC1pbnRvLXZpZXcuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbFRvKGVsZW1lbnQpIHtcblxuICAgIGVsZW1lbnRbMF0uc2Nyb2xsSW50b1ZpZXcodHJ1ZSk7XG5cbiAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcblxuICAgICQoJy5qcy1pcy1zdHVjaycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgbGV0IGhlaWdodCA9ICQodGhpcykuaGVpZ2h0KCk7XG4gICAgICAgIGlmIChoZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIG1heEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1heEhlaWdodCA+IDApIHtcbiAgICAgICAgbGV0IHNjcm9sbGVkWSA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgICAgIGlmIChzY3JvbGxlZFkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgc2Nyb2xsZWRZIC0gbWF4SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMtdXRpbHMvc2Nyb2xsLXRvLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHtoZWFkaW5nQ24sIGhlYWRpbmdBbmNob3JDbiwgaGVhZGluZ0FuY2hvckljb25DbiwgaGVhZGluZ0FuY2hvckxhYmVsQ259IGZyb20gXCIuL2VsZW1lbnQtY2xhc3NuYW1lc1wiO1xuXG5cbmZ1bmN0aW9uIHByZXBhcmVBY2NvcmRpb25IZWFkaW5nKHBhdHRlcm5DbGFzc25hbWUsIHRleHQsIGlkKSB7XG4gICAgbGV0IGFuY2hvciA9ICQoJzxhLz4nKVxuICAgICAgICAuYWRkQ2xhc3MoYCR7aGVhZGluZ0FuY2hvckNuKHBhdHRlcm5DbGFzc25hbWUpfSBpbmFjdGl2ZWApXG4gICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAuYXR0cignZGF0YS1pZCcsIGlkKVxuICAgICAgICAuYXR0cignZGF0YS1hY2NvcmRpb24tYW5jaG9yJywgdHJ1ZSk7XG5cbiAgICAkKCc8c3Bhbi8+JylcbiAgICAgICAgLmh0bWwodGV4dClcbiAgICAgICAgLmFkZENsYXNzKGhlYWRpbmdBbmNob3JMYWJlbENuKHBhdHRlcm5DbGFzc25hbWUpKVxuICAgICAgICAuYXBwZW5kVG8oYW5jaG9yKTtcblxuICAgICQoJzxzcGFuLz4nKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgIC5hZGRDbGFzcyhoZWFkaW5nQW5jaG9ySWNvbkNuKHBhdHRlcm5DbGFzc25hbWUpKVxuICAgICAgICAuYXBwZW5kVG8oYW5jaG9yKTtcblxuICAgIHJldHVybiBhbmNob3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgY29udGVudCkge1xuICAgIGxldCBoZWFkaW5nVGFnTmFtZSA9IGNvbnRlbnQuY2hpbGRyZW4oKS5maXJzdCgpLnByb3AoJ3RhZ05hbWUnKTtcbiAgICBsZXQgaGVhZGVyRWxlbWVudHMgPSBjb250ZW50LmNoaWxkcmVuKGhlYWRpbmdUYWdOYW1lKTtcblxuICAgIHJldHVybiBoZWFkZXJFbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtaWQnLCBpKTtcbiAgICAgICAgbGV0IGNvbnRlbnRFbGVtZW50cyA9IFtdO1xuICAgICAgICBsZXQgbmV4dCA9IGl0ZW0ubmV4dCgpO1xuICAgICAgICB3aGlsZSAobmV4dC5sZW5ndGggPiAwICYmIG5leHQucHJvcCgndGFnTmFtZScpICE9PSBoZWFkaW5nVGFnTmFtZSkge1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnRzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYW5jaG9yID0gcHJlcGFyZUFjY29yZGlvbkhlYWRpbmcoY2xhc3NOYW1lLCBpdGVtLmh0bWwoKSwgaSk7XG5cbiAgICAgICAgYW5jaG9yLmluc2VydEJlZm9yZShpdGVtKTtcblxuICAgICAgICBsZXQgY29udGVudCA9ICQoJzxkaXY+PC9kaXY+JylcbiAgICAgICAgICAgIC5hcHBlbmQoaXRlbS5hZGRDbGFzcyhoZWFkaW5nQ24oY2xhc3NOYW1lKSkpXG4gICAgICAgICAgICAuYXBwZW5kKGNvbnRlbnRFbGVtZW50cylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcihhbmNob3IpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgIHRleHQ6IGl0ZW0uaHRtbCgpLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgY29udGVudFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvY29tbW9uL3ByZXBhcmUtc2VjdGlvbnMuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQge2NvbnRlbnRDbn0gZnJvbSAnLi9lbGVtZW50LWNsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlQ29udGVudChjbGFzc05hbWUsIHdpZGdldCkge1xuICAgIGxldCBjb250ZW50Q2xhc3NOYW1lID0gY29udGVudENuKGNsYXNzTmFtZSk7XG4gICAgbGV0IGNvbnRlbnRFbGVtZW50ID0gd2lkZ2V0LmNoaWxkcmVuKGAuJHtjb250ZW50Q2xhc3NOYW1lfWApO1xuXG4gICAgaWYgKGNvbnRlbnRFbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250ZW50RWxlbWVudCA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoY29udGVudENsYXNzTmFtZSkuYXBwZW5kKHdpZGdldC5jaGlsZHJlbigpKS5hcHBlbmRUbyh3aWRnZXQpO1xuICAgIH1cblxuICAgIGxldCBncmlkID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhgJHtjb250ZW50Q2xhc3NOYW1lfS1ncmlkYCkuYXBwZW5kKGNvbnRlbnRFbGVtZW50KTtcbiAgICByZXR1cm4gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhgJHtjb250ZW50Q2xhc3NOYW1lfS1jb250YWluZXJgKS5hcHBlbmQoZ3JpZCkuYXBwZW5kVG8od2lkZ2V0KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1jb250ZW50LmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHNjcm9sbFRvIGZyb20gJy4uLy4uLy4uL2pzLXV0aWxzL3Njcm9sbC10byc7XG5cbmZ1bmN0aW9uIGdlbkFjdGl2YXRlSXRlbShoZWFkaW5nQW5jaG9ycywgYWxsQW5jaG9ycykge1xuICAgIHJldHVybiAoaWQsIHNjcm9sbCkgPT4ge1xuICAgICAgICBhbGxBbmNob3JzLmZpbHRlcihgW2RhdGEtaWQ9XCIke2lkfVwiXS5pbmFjdGl2ZWApLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgYWxsQW5jaG9ycy5maWx0ZXIoYC5hY3RpdmVgKS5ub3QoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2luYWN0aXZlJykuYXR0cignYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuXG4gICAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvKGhlYWRpbmdBbmNob3JzLmZpbHRlcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlQWxsKGFsbEFuY2hvcnMpIHtcbiAgICBhbGxBbmNob3JzLmZpbHRlcignLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnaW5hY3RpdmUnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXBhcmVMaW5rcyhoZWFkaW5ncywgbWVudSA9IG51bGwsIGFjdGl2YXRlSW5pdGlhbCA9IG51bGwpIHtcbiAgICBsZXQgaGVhZGluZ0FuY2hvcnMgPSBoZWFkaW5ncy5yZWR1Y2UoKGFjYywge2FuY2hvcn0pID0+IGFjYy5hZGQoYW5jaG9yKSwgJCgpKTtcbiAgICBsZXQgYWxsQW5jaG9ycyA9IG1lbnUgPyBoZWFkaW5nQW5jaG9ycy5hZGQobWVudS5maW5kKCdhW2RhdGEtaWRdJykpIDogaGVhZGluZ0FuY2hvcnM7XG5cbiAgICBsZXQgYWN0aXZhdGVJdGVtID0gZ2VuQWN0aXZhdGVJdGVtKGhlYWRpbmdBbmNob3JzLCBhbGxBbmNob3JzKTtcblxuICAgIGFsbEFuY2hvcnMub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgYW5jaG9yID0gJCh0aGlzKTtcbiAgICAgICAgbGV0IGlzQWNjb3JkaW5BbmNob3IgPSBhbmNob3IuYXR0cignZGF0YS1hY2NvcmRpb24tYW5jaG9yJyk7XG4gICAgICAgIGlmIChhbmNob3IuaGFzQ2xhc3MoJ2luYWN0aXZlJykpIHtcbiAgICAgICAgICAgIGFjdGl2YXRlSXRlbSgkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSwgaXNBY2NvcmRpbkFuY2hvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBY2NvcmRpbkFuY2hvcikge1xuICAgICAgICAgICAgZGVhY3RpdmF0ZUFsbChhbGxBbmNob3JzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGFjdGl2YXRlSW5pdGlhbCAhPT0gbnVsbCkge1xuICAgICAgICBhY3RpdmF0ZUl0ZW0oYWN0aXZhdGVJbml0aWFsLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGl2YXRlSXRlbTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2NvbW1vbi9wcmVwYXJlLWxpbmtzLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHNjcm9sbGVkSW50b1ZpZXcgZnJvbSAnLi4vanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3JztcblxubGV0IHJlZ2lzdGVyZWRFbGVtZW50cyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQoZWxlbWVudCwgY2xhc3NOYW1lT3JGdW5jdGlvbikge1xuICAgIHJlZ2lzdGVyZWRFbGVtZW50cy5wdXNoKHtcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgY2xhc3NOYW1lOiB0eXBlb2YgY2xhc3NOYW1lT3JGdW5jdGlvbiA9PT0gJ3N0cmluZycgPyBjbGFzc05hbWVPckZ1bmN0aW9uIDogbnVsbCxcbiAgICAgICAgZnVuYzogdHlwZW9mIGNsYXNzTmFtZU9yRnVuY3Rpb24gPT09ICdmdW5jdGlvbicgPyBjbGFzc05hbWVPckZ1bmN0aW9uIDogbnVsbCxcbiAgICAgICAgY29tcGxldGVkOiBmYWxzZVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYXVuY2goKSB7XG4gICAgY2hlY2tBbGwoKTtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGNoZWNrQWxsKTtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGNoZWNrQWxsKTtcbn1cblxuXG5mdW5jdGlvbiBjaGVja0FsbCgpIHtcbiAgICBsZXQgdG9EZWxldGUgPSBbXTtcbiAgICByZWdpc3RlcmVkRWxlbWVudHMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBzY3JvbGxlZEludG9WaWV3KGl0ZW0uZWxlbWVudCk7XG4gICAgICAgIGlmICh2YWx1ZSA+IC41KSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmVsZW1lbnQuYWRkQ2xhc3MoaXRlbS5jbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW0uZnVuYykge1xuICAgICAgICAgICAgICAgIGl0ZW0uZnVuYyhpdGVtLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9EZWxldGUucHVzaChpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9EZWxldGUucmV2ZXJzZSgpLmZvckVhY2goaSA9PiByZWdpc3RlcmVkRWxlbWVudHMuc3BsaWNlKGksIDEpKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLW9uLXNjcm9sbC5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IHBhdHRlcm5zIGZyb20gJy4vY29tcG9uZW50LWxpc3QnO1xuXG5mdW5jdGlvbiBsYXVuY2hQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAocGF0dGVybi5jbGFzc05hbWUpIHtcbiAgICAgICAgbGV0IHtjbGFzc05hbWUsIGxhdW5jaH0gPSBwYXR0ZXJuO1xuICAgICAgICAkKGAuJHtjbGFzc05hbWV9Om5vdCguJHtjbGFzc05hbWV9LW5qcylgKS5lYWNoKGxhdW5jaCk7XG4gICAgfVxufVxuXG5cbiEoZnVuY3Rpb24gKCkge1xuICAgIHBhdHRlcm5zLmZvckVhY2gobGF1bmNoUGF0dGVybik7XG59KCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IHVybERyb3Bkb3duIGZyb20gJy4vY29tcG9uZW50cy91cmwtZHJvcGRvd24vdXJsLWRyb3Bkb3duJztcbmltcG9ydCBsYXp5TG9hZCBmcm9tICcuL2NvbXBvbmVudHMvbGF6eS1sb2FkL2xhenktbG9hZCc7XG5pbXBvcnQgdmlkZW9QcmV2aWV3IGZyb20gXCIuL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3XCI7XG5pbXBvcnQgbmF2TW9iaWxlIGZyb20gXCIuL2NvbXBvbmVudHMvbmF2LW1vYmlsZVwiO1xuaW1wb3J0IG5hdkRlc2t0b3AgZnJvbSBcIi4vY29tcG9uZW50cy9uYXYtZGVza3RvcFwiO1xuaW1wb3J0IGFjY29yZGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2FjY29yZGlvblwiO1xuaW1wb3J0IGFjY29yZGlvblRhYnMgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9hY2NvcmRpb24tdGFic1wiO1xuaW1wb3J0IGFuaW1hdGVPblNjcm9sbCBmcm9tICcuL2NvbXBvbmVudHMvYW5pbWF0ZS1vbi1zY3JvbGwnO1xuaW1wb3J0IHN0YXRzQmxvY2sgZnJvbSAnLi9jb21wb25lbnRzL3N0YXRzLWJsb2NrL3N0YXRzLWJsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgW1xuICAgIHN0YXRzQmxvY2ssXG4gICAgYWNjb3JkaW9uLFxuICAgIGFjY29yZGlvblRhYnMsXG4gICAgdmlkZW9QcmV2aWV3LFxuICAgIGxhenlMb2FkLFxuICAgIHVybERyb3Bkb3duLFxuICAgIG5hdk1vYmlsZSxcbiAgICBhbmltYXRlT25TY3JvbGxcbl07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50LWxpc3QuanMiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCkge1xuICAgIGxldCB3aWRnZXQgPSAkKGVsKTtcbiAgICBsZXQgc2VsZWN0ID0gd2lkZ2V0LmNoaWxkcmVuKCdzZWxlY3QnKTtcblxuICAgIHdpZGdldC5vbignY2hhbmdlJywgJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IHNlbGVjdC5jaGlsZHJlbigpLmVxKHNlbGVjdC5wcm9wKCdzZWxlY3RlZEluZGV4JykpLmF0dHIoJ2RhdGEtdXJsJyk7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsICsgJy9fbm9jYWNoZScgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICd1cmwtZHJvcGRvd24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGF1bmNoLFxuICAgIGNsYXNzTmFtZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdXJsLWRyb3Bkb3duL3VybC1kcm9wZG93bi5qcyIsImltcG9ydCBMYXp5TG9hZCBmcm9tIFwidmFuaWxsYS1sYXp5bG9hZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IExhenlMb2FkKHtcbiAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6IFwiLmxhenktbG9hZFwiLFxuICAgICAgICBkYXRhX3NyYzogJ3NyYycsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgY2FsbGJhY2tfbG9hZDogaW1nID0+IHtcbiAgICAgICAgICAgIGltZy5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbGF6eS1sb2FkL2xhenktbG9hZC5qcyIsInZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihhKXtmb3IodmFyIGI9MTtiPGFyZ3VtZW50cy5sZW5ndGg7YisrKXt2YXIgYz1hcmd1bWVudHNbYl07Zm9yKHZhciBkIGluIGMpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGMsZCkmJihhW2RdPWNbZF0pfXJldHVybiBhfSxfdHlwZW9mPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihhKXtyZXR1cm4gdHlwZW9mIGF9OmZ1bmN0aW9uKGEpe3JldHVybiBhJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmEuY29uc3RydWN0b3I9PT1TeW1ib2wmJmEhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGF9OyFmdW5jdGlvbihhLGIpe1wib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHM/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGV4cG9ydHMpKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1iKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShiKTphLkxhenlMb2FkPWIoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBhPXtlbGVtZW50c19zZWxlY3RvcjpcImltZ1wiLGNvbnRhaW5lcjp3aW5kb3csdGhyZXNob2xkOjMwMCx0aHJvdHRsZToxNTAsZGF0YV9zcmM6XCJvcmlnaW5hbFwiLGRhdGFfc3Jjc2V0Olwib3JpZ2luYWwtc2V0XCIsY2xhc3NfbG9hZGluZzpcImxvYWRpbmdcIixjbGFzc19sb2FkZWQ6XCJsb2FkZWRcIixjbGFzc19lcnJvcjpcImVycm9yXCIsY2xhc3NfaW5pdGlhbDpcImluaXRpYWxcIixza2lwX2ludmlzaWJsZTohMCxjYWxsYmFja19sb2FkOm51bGwsY2FsbGJhY2tfZXJyb3I6bnVsbCxjYWxsYmFja19zZXQ6bnVsbCxjYWxsYmFja19wcm9jZXNzZWQ6bnVsbH0sYj0hKFwib25zY3JvbGxcImluIHdpbmRvdyl8fC9nbGVib3QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksYz1mdW5jdGlvbihhLGIpe2EmJmEoYil9LGQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wK3dpbmRvdy5wYWdlWU9mZnNldC1hLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcH0sZT1mdW5jdGlvbihhLGIsYyl7cmV0dXJuKGI9PT13aW5kb3c/d2luZG93LmlubmVySGVpZ2h0K3dpbmRvdy5wYWdlWU9mZnNldDpkKGIpK2Iub2Zmc2V0SGVpZ2h0KTw9ZChhKS1jfSxmPWZ1bmN0aW9uKGEpe3JldHVybiBhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQrd2luZG93LnBhZ2VYT2Zmc2V0LWEub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdH0sZz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9d2luZG93LmlubmVyV2lkdGg7cmV0dXJuKGI9PT13aW5kb3c/ZCt3aW5kb3cucGFnZVhPZmZzZXQ6ZihiKStkKTw9ZihhKS1jfSxoPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4oYj09PXdpbmRvdz93aW5kb3cucGFnZVlPZmZzZXQ6ZChiKSk+PWQoYSkrYythLm9mZnNldEhlaWdodH0saT1mdW5jdGlvbihhLGIsYyl7cmV0dXJuKGI9PT13aW5kb3c/d2luZG93LnBhZ2VYT2Zmc2V0OmYoYikpPj1mKGEpK2MrYS5vZmZzZXRXaWR0aH0saj1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIShlKGEsYixjKXx8aChhLGIsYyl8fGcoYSxiLGMpfHxpKGEsYixjKSl9LGs9ZnVuY3Rpb24oYSxiKXt2YXIgYz1uZXcgYShiKSxkPW5ldyBDdXN0b21FdmVudChcIkxhenlMb2FkOjpJbml0aWFsaXplZFwiLHtkZXRhaWw6e2luc3RhbmNlOmN9fSk7d2luZG93LmRpc3BhdGNoRXZlbnQoZCl9LGw9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLnBhcmVudEVsZW1lbnQ7aWYoXCJQSUNUVVJFXCI9PT1jLnRhZ05hbWUpZm9yKHZhciBkPTA7ZDxjLmNoaWxkcmVuLmxlbmd0aDtkKyspe3ZhciBlPWMuY2hpbGRyZW5bZF07aWYoXCJTT1VSQ0VcIj09PWUudGFnTmFtZSl7dmFyIGY9ZS5kYXRhc2V0W2JdO2YmJmUuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsZil9fX0sbT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YS50YWdOYW1lLGU9YS5kYXRhc2V0W2NdO2lmKFwiSU1HXCI9PT1kKXtsKGEsYik7dmFyIGY9YS5kYXRhc2V0W2JdO3JldHVybiBmJiZhLnNldEF0dHJpYnV0ZShcInNyY3NldFwiLGYpLHZvaWQoZSYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixlKSl9aWYoXCJJRlJBTUVcIj09PWQpcmV0dXJuIHZvaWQoZSYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixlKSk7ZSYmKGEuc3R5bGUuYmFja2dyb3VuZEltYWdlPVwidXJsKFwiK2UrXCIpXCIpfSxuPWZ1bmN0aW9uKGIpe3RoaXMuX3NldHRpbmdzPV9leHRlbmRzKHt9LGEsYiksdGhpcy5fcXVlcnlPcmlnaW5Ob2RlPXRoaXMuX3NldHRpbmdzLmNvbnRhaW5lcj09PXdpbmRvdz9kb2N1bWVudDp0aGlzLl9zZXR0aW5ncy5jb250YWluZXIsdGhpcy5fcHJldmlvdXNMb29wVGltZT0wLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGw9dGhpcy5oYW5kbGVTY3JvbGwuYmluZCh0aGlzKSx0aGlzLl9pc0ZpcnN0TG9vcD0hMCx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2JvdW5kSGFuZGxlU2Nyb2xsKSx0aGlzLnVwZGF0ZSgpfTtuLnByb3RvdHlwZT17X3JldmVhbDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLl9zZXR0aW5ncyxkPWZ1bmN0aW9uIGQoKXtiJiYoYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGUpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZCksYS5jbGFzc0xpc3QucmVtb3ZlKGIuY2xhc3NfbG9hZGluZyksYS5jbGFzc0xpc3QuYWRkKGIuY2xhc3NfZXJyb3IpLGMoYi5jYWxsYmFja19lcnJvcixhKSl9LGU9ZnVuY3Rpb24gZSgpe2ImJihhLmNsYXNzTGlzdC5yZW1vdmUoYi5jbGFzc19sb2FkaW5nKSxhLmNsYXNzTGlzdC5hZGQoYi5jbGFzc19sb2FkZWQpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixlKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGQpLGMoYi5jYWxsYmFja19sb2FkLGEpKX07XCJJTUdcIiE9PWEudGFnTmFtZSYmXCJJRlJBTUVcIiE9PWEudGFnTmFtZXx8KGEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixlKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGQpLGEuY2xhc3NMaXN0LmFkZChiLmNsYXNzX2xvYWRpbmcpKSxtKGEsYi5kYXRhX3NyY3NldCxiLmRhdGFfc3JjKSxjKGIuY2FsbGJhY2tfc2V0LGEpfSxfbG9vcFRocm91Z2hFbGVtZW50czpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX3NldHRpbmdzLGQ9dGhpcy5fZWxlbWVudHMsZT1kP2QubGVuZ3RoOjAsZj12b2lkIDAsZz1bXSxoPXRoaXMuX2lzRmlyc3RMb29wO2ZvcihmPTA7ZjxlO2YrKyl7dmFyIGk9ZFtmXTthLnNraXBfaW52aXNpYmxlJiZudWxsPT09aS5vZmZzZXRQYXJlbnR8fChifHxqKGksYS5jb250YWluZXIsYS50aHJlc2hvbGQpKSYmKGgmJmkuY2xhc3NMaXN0LmFkZChhLmNsYXNzX2luaXRpYWwpLHRoaXMuX3JldmVhbChpKSxnLnB1c2goZiksaS5kYXRhc2V0Lndhc1Byb2Nlc3NlZD0hMCl9Zm9yKDtnLmxlbmd0aD4wOylkLnNwbGljZShnLnBvcCgpLDEpLGMoYS5jYWxsYmFja19wcm9jZXNzZWQsZC5sZW5ndGgpOzA9PT1lJiZ0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpLGgmJih0aGlzLl9pc0ZpcnN0TG9vcD0hMSl9LF9wdXJnZUVsZW1lbnRzOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fZWxlbWVudHMsYj1hLmxlbmd0aCxjPXZvaWQgMCxkPVtdO2ZvcihjPTA7YzxiO2MrKyl7YVtjXS5kYXRhc2V0Lndhc1Byb2Nlc3NlZCYmZC5wdXNoKGMpfWZvcig7ZC5sZW5ndGg+MDspYS5zcGxpY2UoZC5wb3AoKSwxKX0sX3N0YXJ0U2Nyb2xsSGFuZGxlcjpmdW5jdGlvbigpe3RoaXMuX2lzSGFuZGxpbmdTY3JvbGx8fCh0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsPSEwLHRoaXMuX3NldHRpbmdzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5fYm91bmRIYW5kbGVTY3JvbGwpKX0sX3N0b3BTY3JvbGxIYW5kbGVyOmZ1bmN0aW9uKCl7dGhpcy5faXNIYW5kbGluZ1Njcm9sbCYmKHRoaXMuX2lzSGFuZGxpbmdTY3JvbGw9ITEsdGhpcy5fc2V0dGluZ3MuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbCkpfSxoYW5kbGVTY3JvbGw6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGI9dGhpcy5fc2V0dGluZ3MudGhyb3R0bGU7MCE9PWI/ZnVuY3Rpb24oKXt2YXIgYz1mdW5jdGlvbigpeyhuZXcgRGF0ZSkuZ2V0VGltZSgpfSxkPWMoKSxlPWItKGQtYS5fcHJldmlvdXNMb29wVGltZSk7ZTw9MHx8ZT5iPyhhLl9sb29wVGltZW91dCYmKGNsZWFyVGltZW91dChhLl9sb29wVGltZW91dCksYS5fbG9vcFRpbWVvdXQ9bnVsbCksYS5fcHJldmlvdXNMb29wVGltZT1kLGEuX2xvb3BUaHJvdWdoRWxlbWVudHMoKSk6YS5fbG9vcFRpbWVvdXR8fChhLl9sb29wVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhpcy5fcHJldmlvdXNMb29wVGltZT1jKCksdGhpcy5fbG9vcFRpbWVvdXQ9bnVsbCx0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCl9LmJpbmQoYSksZSkpfSgpOnRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKX0sdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5fZWxlbWVudHM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fcXVlcnlPcmlnaW5Ob2RlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpKSx0aGlzLl9wdXJnZUVsZW1lbnRzKCksdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpLHRoaXMuX3N0YXJ0U2Nyb2xsSGFuZGxlcigpfSxkZXN0cm95OmZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLl9ib3VuZEhhbmRsZVNjcm9sbCksdGhpcy5fbG9vcFRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpLHRoaXMuX2xvb3BUaW1lb3V0PW51bGwpLHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCksdGhpcy5fZWxlbWVudHM9bnVsbCx0aGlzLl9xdWVyeU9yaWdpbk5vZGU9bnVsbCx0aGlzLl9zZXR0aW5ncz1udWxsfX07dmFyIG89d2luZG93LmxhenlMb2FkT3B0aW9ucztyZXR1cm4gbyYmZnVuY3Rpb24oYSxiKXt2YXIgYz1iLmxlbmd0aDtpZihjKWZvcih2YXIgZD0wO2Q8YztkKyspayhhLGJbZF0pO2Vsc2UgayhhLGIpfShuLG8pLG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQudHJhbnNwaWxlZC5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGdldERhdGFBdHRyaWJ1dGVzIGZyb20gXCIuLi8uLi9qcy11dGlscy9nZXQtZGF0YS1hdHRyc1wiO1xuaW1wb3J0IGxvYWRZb3V0dWJlVmlkZW8gZnJvbSBcIi4vdmlkZW8tcHJldmlldy15b3V0dWJlXCI7XG5cbmZ1bmN0aW9uIGdldFNlcnZpY2UobGluaykge1xuICAgIGxldCBocmVmID0gbGluay5hdHRyKCdocmVmJykgfHwgJyc7XG4gICAgbGV0IHBhcmFtcyA9IGdldERhdGFBdHRyaWJ1dGVzKGxpbmspO1xuXG4gICAgbGV0IHl0TWF0Y2ggPSBocmVmLm1hdGNoKC8oPzpodHRwcz86XFwvXFwvKT8oPzp3d3dcXC4pP3lvdXR1XFwuP2JlKD86XFwuY29tKT9cXC8/LiooPzp3YXRjaHxlbWJlZCk/KD86Lip2PXx2XFwvfFxcLykoW1xcd1xcLV9dKylcXCY/Lyk7XG4gICAgaWYgKHl0TWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiAneW91dHViZScsIGlkOiB5dE1hdGNoWzFdLCBwYXJhbXN9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBsYXVuY2goZWwpIHtcbiAgICBsZXQgbGluayA9ICQoZWwpO1xuICAgIGxldCBzZXJ2aWNlID0gZ2V0U2VydmljZShsaW5rKTtcblxuICAgIGlmIChzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBsaW5rLnBhcmVudCgpO1xuICAgICAgICBsZXQgd3JhcHBlciA9IG51bGw7XG5cbiAgICAgICAgaWYgKHBhcmVudC5oYXNDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyJykpIHtcbiAgICAgICAgICAgIHdyYXBwZXIgPSBwYXJlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyZW50LnByb3AoXCJ0YWdOYW1lXCIpLnRvTG93ZXJDYXNlKCkgPT09ICdmaWd1cmUnKSB7XG4gICAgICAgICAgICB3cmFwcGVyID0gcGFyZW50O1xuICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3cmFwcGVyID0gJCgnPGZpZ3VyZS8+JykuYWRkQ2xhc3MoJ3ZpZGVvLXByZXZpZXctd3JhcHBlcicpLmluc2VydEJlZm9yZShsaW5rKTtcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKGxpbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgbGluay5vbignY2xpY2snLCBldnQgPT4ge1xuICAgICAgICAgICAgbG9hZFZpZGVvKHdyYXBwZXIsIHNlcnZpY2UpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9hZFZpZGVvKHdyYXBwZXIsIHNlcnZpY2UpIHtcbiAgICBzd2l0Y2ggKHNlcnZpY2UudHlwZSkge1xuICAgICAgICBjYXNlICd5b3V0dWJlJzpcbiAgICAgICAgICAgIHJldHVybiBsb2FkWW91dHViZVZpZGVvKHdyYXBwZXIsIHNlcnZpY2UpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xhc3NOYW1lOiAndmlkZW8tcHJldmlldycsXG4gICAgbGF1bmNoXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3LmpzIiwiY29uc3QgZGF0YUF0dHJSZWdleCA9IC9eZGF0YS0oLispJC87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERhdGFBdHRyaWJ1dGVzKG5vZGUpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShub2RlLmdldCgwKS5hdHRyaWJ1dGVzKS5yZWR1Y2UoKGFjYywgYXR0cikgPT4ge1xuICAgICAgICBsZXQgbWF0Y2ggPSBhdHRyLm5vZGVOYW1lLm1hdGNoKGRhdGFBdHRyUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGFjY1ttYXRjaFsxXV0gPSBhdHRyLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy11dGlscy9nZXQtZGF0YS1hdHRycy5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGV4dGVuZCBmcm9tIFwiZXh0ZW5kXCI7XG5pbXBvcnQgY3JlYXRlWW91dHViZVBsYXllciBmcm9tIFwiLi4vLi4vanMtdXRpbHMveW91dHViZS1wbGF5ZXJcIjtcbmltcG9ydCBzY29sbGVkSW50b1ZpZXcgZnJvbSBcIi4uLy4uL2pzLXV0aWxzL3Njcm9sbGVkLWludG8tdmlld1wiO1xuXG5jb25zdCBERUZBVUxUX1BBUkFNUyA9IHtcbiAgICBmcmFtZUJvcmRlcjogXCIwXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRZb3V0dWJlVmlkZW8od3JhcHBlciwge2lkLCBwYXJhbXN9KSB7XG4gICAgbGV0IGlmcmFtZUlkID0gYHl0ZXYtJHtpZH1gO1xuXG4gICAgbGV0IGxpbmsgPSB3cmFwcGVyLmNoaWxkcmVuKCdhJyk7XG4gICAgbGV0IGZhbGxiYWNrUGFyYW1zID0ge1xuICAgICAgICB3aWR0aDogbGluay53aWR0aCgpLFxuICAgICAgICBoZWlnaHQ6IGxpbmsuaGVpZ2h0KClcbiAgICB9O1xuXG4gICAgbGV0IHBsYXllclBhcmFtcyA9IGV4dGVuZCh7fSxcbiAgICAgICAgREVGQVVMVF9QQVJBTVMsXG4gICAgICAgIGZhbGxiYWNrUGFyYW1zLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZpZGVvSWQ6IGlkLFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25Jbml0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJzxkaXYvPicpLmF0dHIoJ2lkJywgaWZyYW1lSWQpLmF0dHIoZmFsbGJhY2tQYXJhbXMpLmluc2VydEJlZm9yZShsaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygndmlkZW8tcHJldmlldy13cmFwcGVyLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlYWR5OiBldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCd2aWRlby1wcmV2aWV3LXdyYXBwZXItLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbWVkaWEnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnbWVkaWEtLXlvdXR1YmUnKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jaGlsZHJlbihgOm5vdCgjJHtpZnJhbWVJZH0pYCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZnJhbWUgPSB3cmFwcGVyLmNoaWxkcmVuKCdpZnJhbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29sbGVkSW50b1ZpZXcoaWZyYW1lKSA8IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBjcmVhdGVZb3V0dWJlUGxheWVyKGlmcmFtZUlkLCBwbGF5ZXJQYXJhbXMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvdmlkZW8tcHJldmlldy92aWRlby1wcmV2aWV3LXlvdXR1YmUuanMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7IC8qKi8gfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lO1xuXHR2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXHR2YXIgaSA9IDE7XG5cdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR2YXIgZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fVxuXHRpZiAodGFyZ2V0ID09IG51bGwgfHwgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgVU5MT0FERUQgPSAnVU5MT0FERUQnO1xuY29uc3QgTE9BRElORyA9ICdMT0FESU5HJztcbmNvbnN0IExPQURFRCA9ICdMT0FERUQnO1xuXG5sZXQgYXBpU3RhdHVzID0gVU5MT0FERUQ7XG5cbmxldCBwZW5kaW5nUGxheWVycyA9IFtdO1xuXG5sZXQgcGxheWVycyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoaWQsIGRhdGEpIHtcbiAgICBpZiAoYXBpU3RhdHVzID09PSBMT0FERUQpIHtcbiAgICAgICAgaW5pdFBsYXllcihpZCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGVuZGluZ1BsYXllcnMucHVzaCh7aWQsIGRhdGF9KTtcbiAgICAgICAgaWYgKGFwaVN0YXR1cyA9PT0gVU5MT0FERUQpIHtcbiAgICAgICAgICAgIGxvYWRBcGkoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbml0UGxheWVyKGlkLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5ldmVudHMgJiYgZGF0YS5ldmVudHMub25Jbml0KSB7XG4gICAgICAgIGRhdGEuZXZlbnRzLm9uSW5pdCgpO1xuICAgIH1cblxuICAgIGxldCBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGlkLCBkYXRhKTtcbiAgICBwbGF5ZXJzW2lkXSA9IHtwbGF5ZXIsIGRhdGF9O1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRBcGkoKSB7XG4gICAgYXBpU3RhdHVzID0gTE9BRElORztcbiAgICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlbmRpbmdQbGF5ZXJzLmZvckVhY2goKHtpZCwgZGF0YX0pID0+IGluaXRQbGF5ZXIoaWQsIGRhdGEpKTtcbiAgICB9O1xuXG4gICAgbGV0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRhZy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIjtcbiAgICBsZXQgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMtdXRpbHMveW91dHViZS1wbGF5ZXIuanMiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcbmltcG9ydCBOYXZNb2JpbGUgZnJvbSAnLi9uYXYtbW9iaWxlJztcbmltcG9ydCB7dHJlZSwgY3VycmVudH0gZnJvbSAnLi9wYXJzZS1uYXYnO1xuXG5cbmZ1bmN0aW9uIGxhdW5jaCgpIHtcbiAgICBsZXQgZWxlbWVudCA9ICQodGhpcyk7XG4gICAgbGV0IG5hdiA9IG5ldyBOYXZNb2JpbGUoZWxlbWVudCwgdHJlZSwgY3VycmVudCk7XG4gICAgbmF2LmxhdW5jaCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xhc3NOYW1lOiAnbmF2LW1vYmlsZScsXG4gICAgbGF1bmNoXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9pbmRleC5qcyIsImltcG9ydCAkIGZyb20gXCJjYXNoLWRvbVwiO1xuaW1wb3J0IGNsb25lIGZyb20gJ2Nsb25lJztcbmltcG9ydCBzY3JvbGxUbyBmcm9tICcuLi8uLi9qcy11dGlscy9zY3JvbGwtdG8nO1xuaW1wb3J0IHNjcm9sbGVkSW50b1ZpZXcgZnJvbSAnLi4vLi4vanMtdXRpbHMvc2Nyb2xsZWQtaW50by12aWV3JztcblxuZnVuY3Rpb24gcHJlcGFyZVRyZWVJZHModHJlZSwgbWFwLCBwYXJlbnRJZCA9IG51bGwpIHtcbiAgICB0cmVlLnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdHJlZS5pZCA9IChwYXJlbnRJZCA/IHBhcmVudElkICsgJy4nIDogJycpICsgdHJlZS5pbmRleDtcbiAgICBtYXBbdHJlZS5pZF0gPSB0cmVlO1xuICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBwcmVwYXJlVHJlZUlkcyhjaGlsZCwgbWFwLCB0cmVlLmlkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdk1vYmlsZSB7XG4gICAgY29uc3RydWN0b3IobmF2LCB0cmVlLCBkZWZhdWx0T3Blbikge1xuICAgICAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICAgICAgdGhpcy50cmVlID0gY2xvbmUodHJlZSk7XG4gICAgICAgIHRoaXMudG9nZ2xlID0gbmF2LmZpbmQoJy5uYXYtbW9iaWxlX190b2dnbGUnKTtcbiAgICAgICAgdGhpcy5tZW51ID0gbmF2LmZpbmQoJy5uYXYtbW9iaWxlX19jb250ZW50Om5vdCgubmF2LW1vYmlsZV9fY29udGVudC0tbm9qcyknKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuID0gW3RoaXMudHJlZV07XG4gICAgICAgIGRlZmF1bHRPcGVuLnNsaWNlKDEpLmZvckVhY2goKHtpbmRleH0sIGkpID0+IHRoaXMuZGVmYXVsdE9wZW4ucHVzaCh0aGlzLmRlZmF1bHRPcGVuW2ldLmNoaWxkcmVuW2luZGV4XSkpO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlQ2hpbGRyZW4gPSB0aGlzLnRvZ2dsZUNoaWxkcmVuLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5sZXZlbE1hcCA9IHt9O1xuICAgICAgICBwcmVwYXJlVHJlZUlkcyh0aGlzLnRyZWUsIHRoaXMubGV2ZWxNYXApO1xuXG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMubmF2LnByZXYoKTtcbiAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCA+IDAgJiYgbGFiZWwuYXR0cignZm9yJykpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJChgIyR7bGFiZWwuYXR0cignZm9yJyl9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXVuY2goKSB7XG4gICAgICAgIGxldCB7dG9nZ2xlQ2hpbGRyZW59ID0gdGhpcztcblxuICAgICAgICB0aGlzLm5hdi5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlXScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHRvZ2dsZUNoaWxkcmVuKCQodGhpcykuYXR0cignZGF0YS10b2dnbGUnKSk7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50b2dnbGUub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5OYXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQodGhpcy50cmVlKTtcbiAgICB9XG5cblxuICAgIHRvZ2dsZUNoaWxkcmVuKGl0ZW0sIGZvcmNlT3BlbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5sZXZlbE1hcFtpdGVtXTtcblxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgYW5jZXN0b3JzID0gaXRlbS5lbGVtZW50LnBhcmVudHMoJy5uYXYtbW9iaWxlX19sZXZlbCcpO1xuICAgICAgICAgICAgbGV0IHNldE9wZW4gPSBmb3JjZU9wZW4gfHwgIWl0ZW0uZWxlbWVudC5oYXNDbGFzcygnb3BlbicpO1xuXG4gICAgICAgICAgICBpZiAoc2V0T3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudS5maW5kKCcubmF2LW1vYmlsZV9fbGV2ZWwub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudC50b2dnbGVDbGFzcygnb3BlbicsIHNldE9wZW4pO1xuXG4gICAgICAgICAgICBpdGVtLmVsZW1lbnQuY2hpbGRyZW4oJy5uYXYtbW9iaWxlX19sZXZlbF9faGVhZGVyJykuZmluZCgnLm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rIHNwYW4nKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnX19mYS1wbHVzJywgIXNldE9wZW4pXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdfX2ZhLW1pbnVzJywgc2V0T3Blbik7XG5cbiAgICAgICAgICAgIGlmIChzZXRPcGVuKSB7XG4gICAgICAgICAgICAgICAgYW5jZXN0b3JzLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5wcmVwYXJlSXRlbUVsZW1lbnQoaXRlbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWRJbnRvVmlldyhpdGVtLmVsZW1lbnQpIDwgMSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvKGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuTmF2KCkge1xuICAgICAgICB0aGlzLmRlZmF1bHRPcGVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVJdGVtRWxlbWVudChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2hpbGRyZW4oaXRlbSwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0T3Blblt0aGlzLmRlZmF1bHRPcGVuLmxlbmd0aCAtIDFdLmVsZW1lbnRbMF0uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG5cblxuICAgIHByZXBhcmVJdGVtRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5lbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnRJZCkge1xuICAgICAgICAgICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmxldmVsTWFwW2l0ZW0ucGFyZW50SWRdLmNoaWxkcmVuQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYG5hdi1tb2JpbGVfX2xldmVsIG5hdi1tb2JpbGVfX2xldmVsLS1sJHtpdGVtLmxldmVsfWApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhjb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ25hdi1tb2JpbGVfX2xldmVsX19oZWFkZXInKS5hcHBlbmRUbyhlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICQoJzxhIGNsYXNzPVwibmF2LW1vYmlsZV9fcGFnZS1saW5rXCI+PC9hPicpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgbmF2LW1vYmlsZV9fcGFnZS1saW5rLS10JHtpdGVtLnR5cGV9YClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBpdGVtLnVybCArIGxvY2F0aW9uLnNlYXJjaClcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cIm5hdi1tb2JpbGVfX3BhZ2UtbGlua19fbGFiZWxcIj48L3NwYW4+JykuaHRtbChpdGVtLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oaGVhZGVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuVG9nZ2xlID0gJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1tb2JpbGVfX3RvZ2dsZS1saW5rXCI+PHNwYW4gY2xhc3M9XCJmYSBfX2ZhLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPicpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRvZ2dsZSA9IGNoaWxkcmVuVG9nZ2xlLmF0dHIoJ2RhdGEtdG9nZ2xlJywgaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuVG9nZ2xlLmFwcGVuZFRvKGhlYWRlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5lbGVtZW50ID0gdGhpcy5tZW51O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuQ29udGFpbmVyID0gJCgnPHVsPjwvdWw+JykuYXBwZW5kVG8oaXRlbS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2LW1vYmlsZS9uYXYtbW9iaWxlLmpzIiwidmFyIGNsb25lID0gKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW5zdGFuY2VvZihvYmosIHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUgIT0gbnVsbCAmJiBvYmogaW5zdGFuY2VvZiB0eXBlO1xufVxuXG52YXIgbmF0aXZlTWFwO1xudHJ5IHtcbiAgbmF0aXZlTWFwID0gTWFwO1xufSBjYXRjaChfKSB7XG4gIC8vIG1heWJlIGEgcmVmZXJlbmNlIGVycm9yIGJlY2F1c2Ugbm8gYE1hcGAuIEdpdmUgaXQgYSBkdW1teSB2YWx1ZSB0aGF0IG5vXG4gIC8vIHZhbHVlIHdpbGwgZXZlciBiZSBhbiBpbnN0YW5jZW9mLlxuICBuYXRpdmVNYXAgPSBmdW5jdGlvbigpIHt9O1xufVxuXG52YXIgbmF0aXZlU2V0O1xudHJ5IHtcbiAgbmF0aXZlU2V0ID0gU2V0O1xufSBjYXRjaChfKSB7XG4gIG5hdGl2ZVNldCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVQcm9taXNlO1xudHJ5IHtcbiAgbmF0aXZlUHJvbWlzZSA9IFByb21pc2U7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlUHJvbWlzZSA9IGZ1bmN0aW9uKCkge307XG59XG5cbi8qKlxuICogQ2xvbmVzIChjb3BpZXMpIGFuIE9iamVjdCB1c2luZyBkZWVwIGNvcHlpbmcuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBzdXBwb3J0cyBjaXJjdWxhciByZWZlcmVuY2VzIGJ5IGRlZmF1bHQsIGJ1dCBpZiB5b3UgYXJlIGNlcnRhaW5cbiAqIHRoZXJlIGFyZSBubyBjaXJjdWxhciByZWZlcmVuY2VzIGluIHlvdXIgb2JqZWN0LCB5b3UgY2FuIHNhdmUgc29tZSBDUFUgdGltZVxuICogYnkgY2FsbGluZyBjbG9uZShvYmosIGZhbHNlKS5cbiAqXG4gKiBDYXV0aW9uOiBpZiBgY2lyY3VsYXJgIGlzIGZhbHNlIGFuZCBgcGFyZW50YCBjb250YWlucyBjaXJjdWxhciByZWZlcmVuY2VzLFxuICogeW91ciBwcm9ncmFtIG1heSBlbnRlciBhbiBpbmZpbml0ZSBsb29wIGFuZCBjcmFzaC5cbiAqXG4gKiBAcGFyYW0gYHBhcmVudGAgLSB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZFxuICogQHBhcmFtIGBjaXJjdWxhcmAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgb2JqZWN0IHRvIGJlIGNsb25lZCBtYXkgY29udGFpblxuICogICAgY2lyY3VsYXIgcmVmZXJlbmNlcy4gKG9wdGlvbmFsIC0gdHJ1ZSBieSBkZWZhdWx0KVxuICogQHBhcmFtIGBkZXB0aGAgLSBzZXQgdG8gYSBudW1iZXIgaWYgdGhlIG9iamVjdCBpcyBvbmx5IHRvIGJlIGNsb25lZCB0b1xuICogICAgYSBwYXJ0aWN1bGFyIGRlcHRoLiAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBJbmZpbml0eSlcbiAqIEBwYXJhbSBgcHJvdG90eXBlYCAtIHNldHMgdGhlIHByb3RvdHlwZSB0byBiZSB1c2VkIHdoZW4gY2xvbmluZyBhbiBvYmplY3QuXG4gKiAgICAob3B0aW9uYWwgLSBkZWZhdWx0cyB0byBwYXJlbnQgcHJvdG90eXBlKS5cbiAqIEBwYXJhbSBgaW5jbHVkZU5vbkVudW1lcmFibGVgIC0gc2V0IHRvIHRydWUgaWYgdGhlIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAqICAgIHNob3VsZCBiZSBjbG9uZWQgYXMgd2VsbC4gTm9uLWVudW1lcmFibGUgcHJvcGVydGllcyBvbiB0aGUgcHJvdG90eXBlXG4gKiAgICBjaGFpbiB3aWxsIGJlIGlnbm9yZWQuIChvcHRpb25hbCAtIGZhbHNlIGJ5IGRlZmF1bHQpXG4qL1xuZnVuY3Rpb24gY2xvbmUocGFyZW50LCBjaXJjdWxhciwgZGVwdGgsIHByb3RvdHlwZSwgaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PT0gJ29iamVjdCcpIHtcbiAgICBkZXB0aCA9IGNpcmN1bGFyLmRlcHRoO1xuICAgIHByb3RvdHlwZSA9IGNpcmN1bGFyLnByb3RvdHlwZTtcbiAgICBpbmNsdWRlTm9uRW51bWVyYWJsZSA9IGNpcmN1bGFyLmluY2x1ZGVOb25FbnVtZXJhYmxlO1xuICAgIGNpcmN1bGFyID0gY2lyY3VsYXIuY2lyY3VsYXI7XG4gIH1cbiAgLy8gbWFpbnRhaW4gdHdvIGFycmF5cyBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcywgd2hlcmUgY29ycmVzcG9uZGluZyBwYXJlbnRzXG4gIC8vIGFuZCBjaGlsZHJlbiBoYXZlIHRoZSBzYW1lIGluZGV4XG4gIHZhciBhbGxQYXJlbnRzID0gW107XG4gIHZhciBhbGxDaGlsZHJlbiA9IFtdO1xuXG4gIHZhciB1c2VCdWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9ICd1bmRlZmluZWQnO1xuXG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT0gJ3VuZGVmaW5lZCcpXG4gICAgY2lyY3VsYXIgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZGVwdGggPT0gJ3VuZGVmaW5lZCcpXG4gICAgZGVwdGggPSBJbmZpbml0eTtcblxuICAvLyByZWN1cnNlIHRoaXMgZnVuY3Rpb24gc28gd2UgZG9uJ3QgcmVzZXQgYWxsUGFyZW50cyBhbmQgYWxsQ2hpbGRyZW5cbiAgZnVuY3Rpb24gX2Nsb25lKHBhcmVudCwgZGVwdGgpIHtcbiAgICAvLyBjbG9uaW5nIG51bGwgYWx3YXlzIHJldHVybnMgbnVsbFxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIGlmIChkZXB0aCA9PT0gMClcbiAgICAgIHJldHVybiBwYXJlbnQ7XG5cbiAgICB2YXIgY2hpbGQ7XG4gICAgdmFyIHByb3RvO1xuICAgIGlmICh0eXBlb2YgcGFyZW50ICE9ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZU1hcCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZU1hcCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVTZXQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVTZXQoKTtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlUHJvbWlzZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwYXJlbnQudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJlc29sdmUoX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KF9jbG9uZShlcnIsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gW107XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzUmVnRXhwKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFJlZ0V4cChwYXJlbnQuc291cmNlLCBfX2dldFJlZ0V4cEZsYWdzKHBhcmVudCkpO1xuICAgICAgaWYgKHBhcmVudC5sYXN0SW5kZXgpIGNoaWxkLmxhc3RJbmRleCA9IHBhcmVudC5sYXN0SW5kZXg7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzRGF0ZShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEYXRlKHBhcmVudC5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSBpZiAodXNlQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBCdWZmZXIocGFyZW50Lmxlbmd0aCk7XG4gICAgICBwYXJlbnQuY29weShjaGlsZCk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIEVycm9yKSkge1xuICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdG90eXBlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gICAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG4gICAgICAgIHByb3RvID0gcHJvdG90eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaXJjdWxhcikge1xuICAgICAgdmFyIGluZGV4ID0gYWxsUGFyZW50cy5pbmRleE9mKHBhcmVudCk7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gYWxsQ2hpbGRyZW5baW5kZXhdO1xuICAgICAgfVxuICAgICAgYWxsUGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICBhbGxDaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVNYXApKSB7XG4gICAgICBwYXJlbnQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHZhciBrZXlDaGlsZCA9IF9jbG9uZShrZXksIGRlcHRoIC0gMSk7XG4gICAgICAgIHZhciB2YWx1ZUNoaWxkID0gX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpO1xuICAgICAgICBjaGlsZC5zZXQoa2V5Q2hpbGQsIHZhbHVlQ2hpbGQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVNldCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBlbnRyeUNoaWxkID0gX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpO1xuICAgICAgICBjaGlsZC5hZGQoZW50cnlDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpIGluIHBhcmVudCkge1xuICAgICAgdmFyIGF0dHJzO1xuICAgICAgaWYgKHByb3RvKSB7XG4gICAgICAgIGF0dHJzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgaSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRycyAmJiBhdHRycy5zZXQgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNoaWxkW2ldID0gX2Nsb25lKHBhcmVudFtpXSwgZGVwdGggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHBhcmVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gRG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBjbG9uaW5nIGEgc3ltYm9sIGJlY2F1c2UgaXQgaXMgYSBwcmltaXRpdmUsXG4gICAgICAgIC8vIGxpa2UgYSBudW1iZXIgb3Igc3RyaW5nLlxuICAgICAgICB2YXIgc3ltYm9sID0gc3ltYm9sc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgc3ltYm9sKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgIWRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiAhaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZFtzeW1ib2xdID0gX2Nsb25lKHBhcmVudFtzeW1ib2xdLCBkZXB0aCAtIDEpO1xuICAgICAgICBpZiAoIWRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgc3ltYm9sLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gICAgICB2YXIgYWxsUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHBhcmVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbFByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IGFsbFByb3BlcnR5TmFtZXNbaV07XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3Byb3BlcnR5TmFtZV0gPSBfY2xvbmUocGFyZW50W3Byb3BlcnR5TmFtZV0sIGRlcHRoIC0gMSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgcmV0dXJuIF9jbG9uZShwYXJlbnQsIGRlcHRoKTtcbn1cblxuLyoqXG4gKiBTaW1wbGUgZmxhdCBjbG9uZSB1c2luZyBwcm90b3R5cGUsIGFjY2VwdHMgb25seSBvYmplY3RzLCB1c2VmdWxsIGZvciBwcm9wZXJ0eVxuICogb3ZlcnJpZGUgb24gRkxBVCBjb25maWd1cmF0aW9uIG9iamVjdCAobm8gbmVzdGVkIHByb3BzKS5cbiAqXG4gKiBVU0UgV0lUSCBDQVVUSU9OISBUaGlzIG1heSBub3QgYmVoYXZlIGFzIHlvdSB3aXNoIGlmIHlvdSBkbyBub3Qga25vdyBob3cgdGhpc1xuICogd29ya3MuXG4gKi9cbmNsb25lLmNsb25lUHJvdG90eXBlID0gZnVuY3Rpb24gY2xvbmVQcm90b3R5cGUocGFyZW50KSB7XG4gIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIGMgPSBmdW5jdGlvbiAoKSB7fTtcbiAgYy5wcm90b3R5cGUgPSBwYXJlbnQ7XG4gIHJldHVybiBuZXcgYygpO1xufTtcblxuLy8gcHJpdmF0ZSB1dGlsaXR5IGZ1bmN0aW9uc1xuXG5mdW5jdGlvbiBfX29ialRvU3RyKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cbmNsb25lLl9fb2JqVG9TdHIgPSBfX29ialRvU3RyO1xuXG5mdW5jdGlvbiBfX2lzRGF0ZShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuY2xvbmUuX19pc0RhdGUgPSBfX2lzRGF0ZTtcblxuZnVuY3Rpb24gX19pc0FycmF5KG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuY2xvbmUuX19pc0FycmF5ID0gX19pc0FycmF5O1xuXG5mdW5jdGlvbiBfX2lzUmVnRXhwKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmNsb25lLl9faXNSZWdFeHAgPSBfX2lzUmVnRXhwO1xuXG5mdW5jdGlvbiBfX2dldFJlZ0V4cEZsYWdzKHJlKSB7XG4gIHZhciBmbGFncyA9ICcnO1xuICBpZiAocmUuZ2xvYmFsKSBmbGFncyArPSAnZyc7XG4gIGlmIChyZS5pZ25vcmVDYXNlKSBmbGFncyArPSAnaSc7XG4gIGlmIChyZS5tdWx0aWxpbmUpIGZsYWdzICs9ICdtJztcbiAgcmV0dXJuIGZsYWdzO1xufVxuY2xvbmUuX19nZXRSZWdFeHBGbGFncyA9IF9fZ2V0UmVnRXhwRmxhZ3M7XG5cbnJldHVybiBjbG9uZTtcbn0pKCk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2xvbmUvY2xvbmUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQQVJTRV9SRUdFWCA9IC9eXFxzKihbMC05XSkgKFteXFxzXSspIFswLTldICguKykkLztcblxuZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1vYmlsZV9fZGF0YVwiKS5pbm5lckhUTUw7XG59XG5cbmZ1bmN0aW9uIGxvYWRVcmxzKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhZ2VfdXJsc1wiKS5pbm5lckhUTUw7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGgodXJsKSB7XG4gICAgcmV0dXJuIHVybC5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcL1teL10qLywgJycpO1xufVxuXG5mdW5jdGlvbiBtYXRjaExldmVsKHBhdGgsIGN1cnJlbnRQYXRoKSB7XG4gICAgaWYgKHBhdGggPT09IGN1cnJlbnRQYXRoKSB7XG4gICAgICAgIHJldHVybiAyO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBhdGguaW5kZXhPZihwYXRoKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlTmF2KGRhdGEsIGN1cnJlbnRVcmwpIHtcbiAgICBsZXQgdHJlZSA9IHtcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgaW5kZXg6IG51bGwsXG4gICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgIH07XG5cbiAgICBsZXQgY3VycmVudFBhdGggPSBnZXRQYXRoKGN1cnJlbnRVcmwpO1xuXG4gICAgbGV0IGFuY2VzdG9ycyA9IFtdO1xuXG4gICAgZGF0YS5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgIGxldCBtYXRjaCA9IGxpbmUubWF0Y2goUEFSU0VfUkVHRVgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGxldCBbLCBsZXZlbFN0ciwgdXJsLCBuYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgbGV0IGxldmVsID0gcGFyc2VJbnQobGV2ZWxTdHIpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBtYXRjaExldmVsKGdldFBhdGgodXJsKSwgY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7bGV2ZWwsIHR5cGUsIHVybCwgbmFtZSwgY2hpbGRyZW46IFtdLCBpbmRleDogMH07XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gYW5jZXN0b3JzW2xldmVsIC0gMV07XG4gICAgICAgICAgICAgICAgaXRlbS5pbmRleCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyZWUgPSBpdGVtO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGFuY2VzdG9yc1tsZXZlbF0gPSBpdGVtO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgY3VycmVudEhlYWQgPSB0cmVlO1xuICAgIGxldCBjdXJyZW50ID0gW107XG4gICAgd2hpbGUgKGN1cnJlbnRIZWFkICYmIGN1cnJlbnRIZWFkLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY3VycmVudC5wdXNoKGN1cnJlbnRIZWFkKTtcbiAgICAgICAgY3VycmVudEhlYWQgPSBmaW5kQ3VycmVudChjdXJyZW50SGVhZC5jaGlsZHJlbik7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge3RyZWUsIGN1cnJlbnR9O1xufVxuXG5mdW5jdGlvbiBmaW5kQ3VycmVudChsaXN0KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldLnR5cGUgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdFtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5sZXQge3RyZWUsIGN1cnJlbnR9ID0gcGFyc2VOYXYobG9hZERhdGEoKSwgbG9hZFVybHMoKSk7XG5cbmV4cG9ydCB7dHJlZSwgY3VycmVudH07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL25hdi1tb2JpbGUvcGFyc2UtbmF2LmpzIiwiKCgpID0+IHtcblxuICAgIC8vIEZPUiBVU0VSIFRFU1RJTkdcblxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XG4gICAgbGV0IGFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZdJyk7XG5cbiAgICBpZiAoaGVhZGVyLmNsYXNzTmFtZS5pbmRleE9mKCdoZWFkZXItLScpID4gLTEpIHtcbiAgICAgICAgbGV0IHZhcmlhdGlvbiA9IGhlYWRlci5jbGFzc05hbWUuc3BsaXQoJ2hlYWRlci0tJylbMV07XG4gICAgICAgIGZvciAodmFyIGFuY2hvciBvZiBhbmNob3JzKSB7XG4gICAgICAgICAgICBhbmNob3IuaHJlZiA9IGAke2FuY2hvci5ocmVmfT9jPSR7dmFyaWF0aW9ufWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYnJlYWRjcnVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icmVhZGNydW1icycpO1xuICAgIGxldCBicmVhZGNydW1iSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnJlYWRjcnVtYnNfX2xpc3QgPiBsaScpO1xuXG4gICAgbGV0IGJyZWFkY3J1bWJEcm9wZG93bkNoaWxkcmVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJyZWFkY3J1bWJzLWRyb3Bkb3duLS1jaGlsZHJlbicpO1xuICAgIGlmIChicmVhZGNydW1iRHJvcGRvd25DaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgY2hpbGRyZW5EYXRhID0gYnJlYWRjcnVtYkl0ZW1zW2JyZWFkY3J1bWJJdGVtcy5sZW5ndGgtMV0uaW5uZXJIVE1MO1xuICAgICAgICBicmVhZGNydW1iSXRlbXNbYnJlYWRjcnVtYkl0ZW1zLmxlbmd0aC0xXS5pbm5lckhUTUwgPSBgJHtjaGlsZHJlbkRhdGF9PGRpdj4ke2JyZWFkY3J1bWJEcm9wZG93bkNoaWxkcmVuLmlubmVySFRNTH08L2Rpdj5gO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJlYWRjcnVtYnNfX2xpc3QgPiBsaTpsYXN0LWNoaWxkIGEnKS5jbGFzc0xpc3QuYWRkKCdoYXMtY2hpbGRyZW4nKTtcbiAgICB9XG5cbiAgICBsZXQgYnJlYWRjcnVtYkRyb3Bkb3duQ3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icmVhZGNydW1icy1kcm9wZG93bi0tY3VycmVudCcpO1xuICAgIGlmIChicmVhZGNydW1iRHJvcGRvd25DdXJyZW50ICE9PSBudWxsICYmIGJyZWFkY3J1bWJJdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IGJyZWFkY3J1bWJJdGVtc1ticmVhZGNydW1iSXRlbXMubGVuZ3RoLTJdLmlubmVySFRNTDtcbiAgICAgICAgYnJlYWRjcnVtYkl0ZW1zW2JyZWFkY3J1bWJJdGVtcy5sZW5ndGgtMl0uaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGF9PGRpdj4ke2JyZWFkY3J1bWJEcm9wZG93bkN1cnJlbnQuaW5uZXJIVE1MfTwvZGl2PmA7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icmVhZGNydW1ic19fbGlzdCA+IGxpOm50aC1sYXN0LWNoaWxkKDIpIGEnKS5jbGFzc0xpc3QuYWRkKCdoYXMtY2hpbGRyZW4nKTtcbiAgICB9XG5cbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9uYXYtZGVza3RvcC9pbmRleC5qcyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcbmltcG9ydCBmaW5kSGVhZGluZ3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1zZWN0aW9ucyc7XG5pbXBvcnQgcHJlcGFyZUNvbnRlbnQgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1jb250ZW50JztcbmltcG9ydCBwcmVwYXJlTGlua3MgZnJvbSAnLi9jb21tb24vcHJlcGFyZS1saW5rcyc7XG5pbXBvcnQge2NvbnRlbnRDbn0gZnJvbSBcIi4vY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lc1wiO1xuXG5mdW5jdGlvbiBsYXVuY2goZWwsIGkpIHtcbiAgICBsZXQgd2lkZ2V0ID0gJChlbCk7XG4gICAgbGV0IGNvbnRlbnRXcmFwcGVyID0gcHJlcGFyZUNvbnRlbnQoY2xhc3NOYW1lLCB3aWRnZXQpO1xuICAgIGxldCBjb250ZW50ID0gY29udGVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihgLiR7Y29udGVudENuKGNsYXNzTmFtZSl9YCk7XG4gICAgbGV0IGhlYWRpbmdzID0gZmluZEhlYWRpbmdzKGNsYXNzTmFtZSwgd2lkZ2V0LCBjb250ZW50KTtcblxuICAgIHByZXBhcmVMaW5rcyhoZWFkaW5ncywgbnVsbCk7XG59XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICdhY2NvcmRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGF1bmNoLFxuICAgIGNsYXNzTmFtZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXRhYnMvYWNjb3JkaW9uLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IGZpbmRIZWFkaW5ncyBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLXNlY3Rpb25zJztcbmltcG9ydCBwcmVwYXJlQ29udGVudCBmcm9tICcuL2NvbW1vbi9wcmVwYXJlLWNvbnRlbnQnO1xuaW1wb3J0IHByZXBhcmVNZW51IGZyb20gJy4vY29tbW9uL3ByZXBhcmUtbWVudSc7XG5pbXBvcnQgcHJlcGFyZUxpbmtzIGZyb20gJy4vY29tbW9uL3ByZXBhcmUtbGlua3MnO1xuaW1wb3J0IHtjb250ZW50Q259IGZyb20gJy4vY29tbW9uL2VsZW1lbnQtY2xhc3NuYW1lcyc7XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICdhY2NvcmRpb24tdGFicyc7XG5cblxuZnVuY3Rpb24gbGF1bmNoKGVsLCBpKSB7XG4gICAgbGV0IHdpZGdldCA9ICQoZWwpO1xuICAgIGxldCBjb250ZW50V3JhcHBlciA9IHByZXBhcmVDb250ZW50KGNsYXNzTmFtZSwgd2lkZ2V0KTtcbiAgICBsZXQgY29udGVudCA9IGNvbnRlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oYC4ke2NvbnRlbnRDbihjbGFzc05hbWUpfWApO1xuICAgIGxldCBoZWFkaW5ncyA9IGZpbmRIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgY29udGVudCk7XG5cbiAgICBsZXQgbWVudSA9IHByZXBhcmVNZW51KGNsYXNzTmFtZSwgd2lkZ2V0LCBpLCBoZWFkaW5ncywgY29udGVudFdyYXBwZXIpO1xuICAgIHByZXBhcmVMaW5rcyhoZWFkaW5ncywgbWVudSwgaGVhZGluZ3MubGVuZ3RoID4gMCAmJiBoZWFkaW5nc1swXS5pZCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxhdW5jaCxcbiAgICBjbGFzc05hbWVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi10YWJzL2FjY29yZGlvbi10YWJzLmpzIiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHttZW51Q24sIG1lbnVXcmFwcGVyQ24sIG1lbnVJdGVtQ24sIG1lbnVJdGVtTGFiZWxDbn0gZnJvbSAnLi9lbGVtZW50LWNsYXNzbmFtZXMnO1xuaW1wb3J0IHN0aWNreWJpdHMgZnJvbSBcInN0aWNreWJpdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZVRhYnNIZWFkaW5ncyhjbGFzc05hbWUsIHdpZGdldCwgaSwgaGVhZGluZ3MsIGNvbnRlbnQpIHtcbiAgICBsZXQgdGFic0JhciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MobWVudUNuKGNsYXNzTmFtZSkpO1xuXG4gICAgaGVhZGluZ3MuZm9yRWFjaCgoe3RleHQsIGlkfSkgPT4ge1xuICAgICAgICBsZXQgYW5jaG9yID0gJCgnPGEgaHJlZj1cIiNcIj48L2E+JykuYWRkQ2xhc3MobWVudUl0ZW1DbihjbGFzc05hbWUpKS5hZGRDbGFzcygnaW5hY3RpdmUnKS5hdHRyKCdkYXRhLWlkJywgaWQpO1xuICAgICAgICAkKCc8c3Bhbj48L3NwYW4+JykuYWRkQ2xhc3MobWVudUl0ZW1MYWJlbENuKGNsYXNzTmFtZSkpLmh0bWwodGV4dCkuYXBwZW5kVG8oYW5jaG9yKTtcblxuICAgICAgICBhbmNob3IuYXBwZW5kVG8odGFic0Jhcik7XG4gICAgfSk7XG5cbiAgICBsZXQgd3JhcHBlciA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MobWVudVdyYXBwZXJDbihjbGFzc05hbWUpKS5hcHBlbmQodGFic0Jhcik7XG4gICAgbGV0IGNvbnRhaW5lckNsYXNzID0gYCR7bWVudUNuKGNsYXNzTmFtZSl9LWZ1bGx3aWR0aGA7XG4gICAgJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhjb250YWluZXJDbGFzcykuYXBwZW5kKHdyYXBwZXIpLmluc2VydEJlZm9yZShjb250ZW50KTtcblxuICAgIHN0aWNreWJpdHMoYC4ke2NvbnRhaW5lckNsYXNzfWAsIHt1c2VTdGlja3lDbGFzc2VzOiB0cnVlfSk7XG5cbiAgICByZXR1cm4gdGFic0Jhcjtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24tdGFicy9jb21tb24vcHJlcGFyZS1tZW51LmpzIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLnN0aWNreWJpdHMgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8qXG4gIFNUSUNLWUJJVFMg8J+SiVxuICAtLS0tLS0tLVxuICBhIGxpZ2h0d2VpZ2h0IGFsdGVybmF0aXZlIHRvIGBwb3NpdGlvbjogc3RpY2t5YCBwb2x5ZmlsbHMg8J+NrFxuKi9cbmZ1bmN0aW9uIFN0aWNreWJpdCh0YXJnZXQsIG8pIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB0aHJvdyBFcnJvcignc3RpY2t5Yml0cyByZXF1aXJlcyBgd2luZG93YCcpO1xuICAvKlxuICAgIGRlZmF1bHRzIPCflIxcbiAgICAtLS0tLS0tLVxuICAgIC0gdGFyZ2V0ID0gZWwgKERPTSBlbGVtZW50KVxuICAgIC0gb2Zmc2V0ID0gMCB8fCAnZGVhbGVyJ3MgY2hvaWNlJ1xuICAgIC0gdmVydGljYWxQb3NpdGlvbiA9IHRvcCB8fCBib3R0b21cbiAgICAtIHVzZVN0aWNreUNsYXNzZXMgPVxuICAgIC0gZWxTdHlsZXMgPSBDU1MgU3R5bGVzXG4gICAgLSBwb3NpdGlvblN0aWNreVZhbCA9IGZpeGVkIHx8IHN0aWNreVxuICAqL1xuICB0aGlzLmVsID0gdGFyZ2V0O1xuICB0aGlzLm9mZnNldCA9IG8gJiYgby5zdGlja3lCaXRTdGlja3lPZmZzZXQgfHwgMDtcbiAgdGhpcy52cCA9IG8gJiYgby52ZXJ0aWNhbFBvc2l0aW9uIHx8ICd0b3AnO1xuICB0aGlzLnVzZUNsYXNzZXMgPSBvICYmIG8udXNlU3RpY2t5Q2xhc3NlcyB8fCBmYWxzZTtcbiAgdGhpcy5zdHlsZXMgPSB0aGlzLmVsLnN0eWxlO1xuICB0aGlzLnBvc2l0aW9uU3RpY2t5VmFsID0gJ2ZpeGVkJztcbiAgdGhpcy5zZXRTdGlja3lQb3NpdGlvbigpO1xuICBpZiAodGhpcy5wb3NpdGlvblN0aWNreVZhbCA9PT0gJ2ZpeGVkJyB8fCB0aGlzLnVzZUNsYXNzZXMgPT09IHRydWUpIHtcbiAgICB0aGlzLm1hbmFnZVN0aWNraW5lc3MoKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLypcbiAgc2V0U3RpY2t5UG9zaXRpb24g4pyU77iPXG4gIC0tLS0tLS0tXG4gIOKAlCBtb3N0IGJhc2ljIHRoaW5nIHN0aWNreWJpdHMgZG9lc1xuICA9PiBjaGVja3MgdG8gc2VlIGlmIHBvc2l0aW9uIHN0aWNreSBpcyBzdXBwb3J0ZWRcbiAgPT4gc3RpY2t5Yml0cyB3b3JrcyBhY2NvcmRpbmdseVxuKi9cblN0aWNreWJpdC5wcm90b3R5cGUuc2V0U3RpY2t5UG9zaXRpb24gPSBmdW5jdGlvbiBzZXRTdGlja3lQb3NpdGlvbigpIHtcbiAgdmFyIGJyb3dzZXJQcmVmaXggPSBbJycsICctby0nLCAnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW1zLSddO1xuICB2YXIgc3R5bGVzID0gdGhpcy5zdHlsZXM7XG4gIHZhciB2cCA9IHRoaXMudnA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnJvd3NlclByZWZpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHN0eWxlcy5wb3NpdGlvbiA9IGJyb3dzZXJQcmVmaXhbaV0gKyAnc3RpY2t5JztcbiAgfVxuICBpZiAoc3R5bGVzLnBvc2l0aW9uICE9PSAnJykge1xuICAgIHRoaXMucG9zaXRpb25TdGlja3lWYWwgPSBzdHlsZXMucG9zaXRpb247XG4gICAgaWYgKHZwID09PSAndG9wJykge1xuICAgICAgc3R5bGVzW3ZwXSA9IHRoaXMub2Zmc2V0ICsgJ3B4JztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKlxuICBtYW5hZ2VTdGlja2luZXNzIOKclO+4j1xuICAtLS0tLS0tLVxuICDigJQgbWFuYWdlcyBzdGlja3liaXQgc3RhdGVcbiAgPT4gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZWxlbWVudCBpcyBzdGlja3kgfHwgc3R1Y2tcbiAgPT4gYmFzZWQgb24gd2luZG93IHNjcm9sbFxuKi9cblN0aWNreWJpdC5wcm90b3R5cGUubWFuYWdlU3RpY2tpbmVzcyA9IGZ1bmN0aW9uIG1hbmFnZVN0aWNraW5lc3MoKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLmVsLnBhcmVudE5vZGU7XG4gIHZhciBwdiA9IHRoaXMucG9zaXRpb25TdGlja3lWYWw7XG4gIHZhciB2cCA9IHRoaXMudnA7XG4gIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgdmFyIHN0eWxlcyA9IHRoaXMuc3R5bGVzO1xuICB2YXIgY2xhc3NlcyA9IHRoaXMuZWwuY2xhc3NMaXN0O1xuICB2YXIgd2luID0gd2luZG93O1xuICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnanMtc3RpY2t5Yml0LXBhcmVudCcpO1xuICB2YXIgc3RpY2t5Qml0U3RhcnQgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgdmFyIHN0aWNreUJpdFN0b3AgPSBzdGlja3lCaXRTdGFydCArIHBhcmVudC5vZmZzZXRIZWlnaHQgLSAodGhpcy5lbC5vZmZzZXRIZWlnaHQgLSBvZmZzZXQpO1xuICB2YXIgc3RpY2t5Q2xhc3MgPSAnanMtaXMtc3RpY2t5JztcbiAgdmFyIHN0dWNrQ2xhc3MgPSAnanMtaXMtc3R1Y2snO1xuXG4gIC8vIG1hbmFnZSBzdGlja2luZXNzXG4gIGZ1bmN0aW9uIHN0aWNraW5lc3MoKSB7XG4gICAgdmFyIHNjcm9sbCA9IHdpbi5zY3JvbGxZIHx8IHdpbi5wYWdlWU9mZnNldDtcbiAgICB2YXIgaGFzU3RpY2t5Q2xhc3MgPSBjbGFzc2VzLmNvbnRhaW5zKHN0aWNreUNsYXNzKTtcbiAgICB2YXIgaGFzU3R1Y2tDbGFzcyA9IGNsYXNzZXMuY29udGFpbnMoc3R1Y2tDbGFzcyk7XG4gICAgaWYgKHNjcm9sbCA8IHN0aWNreUJpdFN0YXJ0KSB7XG4gICAgICBpZiAoaGFzU3RpY2t5Q2xhc3MpIHtcbiAgICAgICAgY2xhc3Nlcy5yZW1vdmUoc3RpY2t5Q2xhc3MpO1xuICAgICAgICBpZiAocHYgPT09ICdmaXhlZCcpIHN0eWxlcy5wb3NpdGlvbiA9ICcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2Nyb2xsID4gc3RpY2t5Qml0U3RhcnQgJiYgc2Nyb2xsIDwgc3RpY2t5Qml0U3RvcCkge1xuICAgICAgaWYgKCFoYXNTdGlja3lDbGFzcykgY2xhc3Nlcy5hZGQoc3RpY2t5Q2xhc3MpO1xuICAgICAgaWYgKGhhc1N0dWNrQ2xhc3MpIHtcbiAgICAgICAgY2xhc3Nlcy5yZW1vdmUoc3R1Y2tDbGFzcyk7XG4gICAgICAgIHN0eWxlcy5ib3R0b20gPSAnJztcbiAgICAgIH1cbiAgICAgIHN0eWxlcy5wb3NpdGlvbiA9IHB2O1xuICAgICAgc3R5bGVzW3ZwXSA9IG9mZnNldCArICdweCc7XG4gICAgfSBlbHNlIGlmIChzY3JvbGwgPiBzdGlja3lCaXRTdG9wICYmICFoYXNTdHVja0NsYXNzKSB7XG4gICAgICBjbGFzc2VzLnJlbW92ZShzdGlja3lDbGFzcyk7XG4gICAgICBjbGFzc2VzLmFkZChzdHVja0NsYXNzKTtcbiAgICAgIGlmIChwdiAhPT0gJ2ZpeGVkJykgcmV0dXJuO1xuICAgICAgc3R5bGVzLnRvcCA9ICcnO1xuICAgICAgc3R5bGVzLmJvdHRvbSA9ICcwJztcbiAgICAgIHN0eWxlcy5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgfVxuICB9XG5cbiAgdmFyIGludm9rZWQgPSB2b2lkIDA7XG5cbiAgdGhpcy5jaGVja1N0aWNraW5lc3MgPSBmdW5jdGlvbiBjaGVja1N0aWNraW5lc3MoKSB7XG4gICAgaWYgKGludm9rZWQpIHJldHVybjtcbiAgICBpbnZva2VkID0gdHJ1ZTtcbiAgICB3aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0aWNraW5lc3MpO1xuICAgIHdpbi5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGludm9rZWQgPSBmYWxzZTtcbiAgICB9LCAwKTtcbiAgfTtcblxuICB3aW4uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5jaGVja1N0aWNraW5lc3MpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qXG4gIGNsZWFudXAg8J+bgVxuICAtLS0tLS0tLVxuICAtIHRhcmdldCA9IGVsIChET00gZWxlbWVudClcbiAgLSBzY3JvbGx0YXJnZXQgPSB3aW5kb3cgfHwgJ2RlYWxlcidzIGNob3NlJ1xuICAtIHNjcm9sbCA9IHJlbW92ZXMgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyXG4qL1xuU3RpY2t5Yml0LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgdmFyIGVsID0gdGhpcy5lbDtcbiAgdmFyIHN0eWxlcyA9IHRoaXMuc3R5bGVzO1xuICAvLyBjbGVhbnVwIHN0eWxlc1xuICBzdHlsZXMucG9zaXRpb24gPSAnJztcbiAgc3R5bGVzW3RoaXMudnBdID0gJyc7XG4gIC8vIGNsZWFudXAgQ1NTIGNsYXNzZXNcbiAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnanMtaXMtc3RpY2t5JywgJ2pzLWlzLXN0dWNrJyk7XG4gIGVsLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnanMtc3RpY2t5Yml0LXBhcmVudCcpO1xuICAvLyByZW1vdmUgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmNoZWNrU3RpY2tpbmVzcyk7XG4gIC8vIHR1cm4gb2Ygc3RpY2t5IGludm9jYXRpb25cbiAgdGhpcy5jaGVja1N0aWNraW5lc3MgPSBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIE11bHRpQml0cyh1c2VySW5zdGFuY2VzKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5wcml2YXRlSW5zdGFuY2VzID0gdXNlckluc3RhbmNlcyB8fCBbXTtcbiAgdGhpcy5jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpcy5wcml2YXRlSW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2UuY2xlYW51cCgpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdGlja3liaXRzKHRhcmdldCwgbykge1xuICB2YXIgZWxzID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCkgOiB0YXJnZXQ7XG4gIGlmICghKCdsZW5ndGgnIGluIGVscykpIGVscyA9IFtlbHNdO1xuICB2YXIgaW5zdGFuY2VzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIGVsID0gZWxzW2ldO1xuICAgIGluc3RhbmNlcy5wdXNoKG5ldyBTdGlja3liaXQoZWwsIG8pKTtcbiAgfVxuICByZXR1cm4gbmV3IE11bHRpQml0cyhpbnN0YW5jZXMpO1xufVxuXG5yZXR1cm4gc3RpY2t5Yml0cztcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0aWNreWJpdHMvZGlzdC9zdGlja3liaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XG5pbXBvcnQge3JlZ2lzdGVyQ29tcG9uZW50fSBmcm9tICcuLi9hbmltYXRlLW9uLXNjcm9sbCc7XG5cbmZ1bmN0aW9uIGxhdW5jaChlbCwgaSkge1xuICAgIHJlZ2lzdGVyQ29tcG9uZW50KCQoZWwpLmZpbmQoJy5zdGF0cy1ibG9ja19fcGllY2hhcnQnKSwgcGllY2hhcnQgPT4ge1xuICAgICAgICBsZXQgcGllY2hhcnRWYWx1ZSA9IHBpZWNoYXJ0LmZpbmQoJy5zdGF0cy1ibG9ja19fcGllY2hhcnRfX3ZhbHVlJyk7XG4gICAgICAgIGlmIChwaWVjaGFydFZhbHVlWzBdICYmIHBpZWNoYXJ0VmFsdWVbMF0uZ2V0VG90YWxMZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBwaWVjaGFydFZhbHVlWzBdLmdldFRvdGFsTGVuZ3RoKCkgKyAncHgnO1xuICAgICAgICAgICAgcGllY2hhcnRWYWx1ZS5jc3Moe1xuICAgICAgICAgICAgICAgICdzdHJva2UtZGFzaG9mZnNldCc6IGxlbmd0aCxcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IGAke2xlbmd0aH0sICR7bGVuZ3RofWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGllY2hhcnRWYWx1ZS5hZGRDbGFzcygnc3RhdHMtYmxvY2tfX3BpZWNoYXJ0X192YWx1ZS0tanNydW4nKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBwaWVjaGFydFZhbHVlLmNzcyh7XG4gICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNob2Zmc2V0JzogMFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IGNsYXNzTmFtZSA9ICdzdGF0cy1ibG9jayc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsYXVuY2gsXG4gICAgY2xhc3NOYW1lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9zdGF0cy1ibG9jay9zdGF0cy1ibG9jay5qcyJdLCJzb3VyY2VSb290IjoiIn0=