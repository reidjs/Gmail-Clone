const DOMNodeCollection = require('./dom_node_collection.js');

let stack = [];
document.addEventListener("DOMContentLoaded", function(event) {
  stack.forEach((el) => {
    el();
  });
});

Window.prototype.$l = function $l(arg) {
  // let stack = [];
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(arg);
  } else if (arg instanceof Function) {
    if (document.readyState === "complete") {
      arg();
    }
    stack.push(arg);
  } else {
    const selection =  Array.from(this.document.querySelectorAll(arg));
    return new DOMNodeCollection(selection);
    // return new DOMNodeCollection(selection);
  }
};

Window.prototype.DOMNodeCollection = DOMNodeCollection;
