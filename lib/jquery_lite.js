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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

Window.prototype.$l = function $l(arg) {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(arg);
  } else {
    const selection =  Array.from(this.document.querySelectorAll(arg));
    return new DOMNodeCollection(selection);
    // return new DOMNodeCollection(selection);
  }
};

Window.prototype.DOMNodeCollection = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html(string) {
    if (string === undefined) {
        return this.HTMLElements[0].innerHTML;
    } else {
      this.each((el) => {
        el.innerHTML = string;
      });
    }
    return this.HTMLElements;
  }

  empty() {
    this.each((el) => {
      el.innerHTML = "";
    });
    return this.HTMLElements;
  }

  append(arg) {
    switch(arg.constructor) {
      case DOMNodeCollection:
        this.each((el) => {
          arg.each((argEl) => {
            el.appendChild(argEl);
          });
        });
        break;
      case HTMLElement:
        this.each((el) => {
          const element = document.createElement(arg);
          el.appendChild(element);
        });
        break;
      case String:
        this.html(arg);
        break;
      default:
        console.log('error');
        break;
      }
  }

  attr(attributeName, value) {
    if (value === undefined) {
      return this.HTMLElements[0].getAttribute(attributeName);
    } else {
      this.each((el) => {
        el.setAttribute(attributeName, value);
      });
      return this;
    }
  }

  addClass(className) {
    this.each((el) => {
      if (el.className.length !== 0) {
        el.className += " ";
      }
      el.className += className;
    });
  }

  removeClass(className) {
    this.each((el) => {
      if (el.className === className) {
        el.className = "";
      } else {
        let start = el.className.indexOf(className);
        if (start >= 0) {
          el.className = el.className.slice(0,start) + el.className.slice(start + className.length + 1);
          el.className = el.className.trim();
        }
      }
    });
  }

  children() {
    let result = [];
    // this.each((el) => {
    //   result.push(el.children);
    // });
    this.each((el) => {
      result.push(el.children);
    });
    return new DOMNodeCollection(result);
  }

  parent() {
    let result = [];
    this.each((el) => {
      result.push(el.parentElement);
    });
    return new DOMNodeCollection(result);
  }

  find(arg) {
    let result = [];
    this.each((el) => {
      result.push(el.querySelectorAll(arg));
    });
    return new DOMNodeCollection(result);
  }

  remove() {
    let result = [];
    this.each((el) => {
      result.push(el);
      el.remove();
    });
    return new DOMNodeCollection(result);
  }

  on(action, callback) {
    this.each((el) => {
      el.addEventListener(action, callback);
      if (el.events === undefined) {
        el.events = [callback];
      } else {
        el.events.push(callback);
      }
    });
    return this;
  }

  off(action, selector) {
    this.each((el) => {
      if (selector === undefined) {
        el.events.forEach( (e) => {
          el.removeEventListener(action, e);
        });
      } else {
        el.removeEventListener(action, selector);
      }
    });
    return this;
  }

  //Goes through HTML elements
  each(callback) {
    this.HTMLElements.forEach(callback);
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);