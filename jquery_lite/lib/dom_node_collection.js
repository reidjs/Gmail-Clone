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
