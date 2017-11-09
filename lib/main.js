const DOMNodeCollection = require('./dom_node_collection.js');

Window.prototype.$l = function $l(arg) {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(arg);
  } else {
    const selection =  Array.from(this.document.querySelectorAll(arg));
    return new DOMNodeCollection(selection);
    // return new DOMNodeCollection(selection);
  }
};
