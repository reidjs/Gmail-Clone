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

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(3);
const Sent = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash = "inbox"
  const lis = document.querySelectorAll(".sidebar-nav li");
  lis.forEach(li => {
    li.addEventListener("click", (e) => {
      const innerText = e.target.textContent.toLowerCase();
      window.location.hash = innerText;
    });
  });
  const main = document.querySelector(".content");
  const router = new Router(main, routes);
  router.start();
});

const routes = {
  'inbox' : new Inbox,
  'sent' : new Sent
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }
  
  start() {
    this.render();
    window.addEventListener("hashchange", () => {
      // debugger
      this.render();
    });
  }
  
  render() {
    const component = this.activeRoute();
    if (component === undefined) {
      this.node.innerHTML = "";
    } else {
      this.node.innerHTML = "";
      const view = component.render();
      // const paragraph = document.createElement('P');
      // paragraph.innerHTML = component;
      this.node.appendChild(view);
    }
    
  }
  
  activeRoute() {
    const hash = window.location.hash;
    return this.routes[hash.slice(1)];
  }
  
}

module.exports = Router;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const messageStore = __webpack_require__(4);
class Inbox {
  constructor() {
    
  }
  render() {
    const messages = messageStore.getInboxMessages()
    const ul = document.createElement('UL');
    ul.className = "messages";
    messages.forEach((message) => {
      const renderedMessage = this.renderMessage(message);
      ul.appendChild(renderedMessage);
    });
    // ul.innerHTML = "An Inbox Message";
    return ul;
  }
  
  renderMessage(message) {
    const li = document.createElement('LI');
    li.className = "message";
    li.innerHTML = `
      <span>from: ${message.from}</span><br/>
      <span>subject: ${message.subject}</span><br/>
      <span>Body: ${message.body}</span>
    `
    return li;
  }
}
module.exports = Inbox;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body: "Stay at home mom discovers cure for leg cramps. Doctors hate her"}, {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"} 
  ] 
};

class MessageStore {
  constructor(messages) {
    this.sent = messages['sent'];
    this.inbox = messages['inbox'];
    this.draft = new Message();
  }
  
  getInboxMessages() {
    return this.inbox;
  }
  
  getSentMessages() {
    return this.sent;
  }
  
  resetDraft() {
    this.draft = new Message();
  }
}

class Message {
  constructor(from, to, subject, body) {
    this.from = from 
    this.to = to 
    this.subject = subject 
    this.body = body 
  }
  
  updateDraftField(field, value) {
    this[field] = value;
  }
  
  sendDraft() {
    messages.sent.push(this);
    messageStore.resetDraft();
    // messageDraft = new Message();
    // this.constructor();
  }
  
}

// let messageDraft = new Message();

const messageStore = new MessageStore(messages)

module.exports = messageStore;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const messageStore = __webpack_require__(4);
class Sent {
  constructor() {
    
  }
  render() {
    const messages = messageStore.getSentMessages()
    const ul = document.createElement('UL');
    ul.className = "messages";
    messages.forEach((message) => {
      const renderedMessage = this.renderMessage(message);
      ul.appendChild(renderedMessage);
    });
    return ul;
  }
  
  renderMessage(message) {
    const li = document.createElement('LI');
    li.className = "message";
    li.innerHTML = `
      <span>to: ${message.to}</span><br/>
      <span>subject: ${message.subject}</span><br/>
      <span>Body: ${message.body}</span>
    `
    return li;
  }
}
module.exports = Sent;

/***/ })
/******/ ]);