class DOMNodeCollection {
  constructor (HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html(string) {
    if (string === undefined) {
        return this.HTMLElements[0].innerHTML;
    } else {
      this.HTMLElements.forEach((el) => {
        el.innerHTML = string;
      });
    }
    return this.HTMLElements;
  }

  empty() {
    this.HTMLElements.forEach((el) => {
      el.innerHTML = "";
    });
    return this.HTMLElements;
  }

  append(arg) {
    switch(arg.constructor) {
      case DOMNodeCollection:
        this.HTMLElements.forEach((el) => {
          arg.HTMLElements.forEach((argEl) => {
            el.appendChild(argEl);
          });
        });
        break;
      case HTMLElement:
        this.HTMLElements.forEach((el) => {
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
      this.HTMLElements.forEach((el) => {
        el.setAttribute(attributeName, value);
      });
      return this;
    }
  }

  addClass(className) {
    this.HTMLElements.forEach((el) => {
      if (el.className.length !== 0) {
        el.className += " ";
      }
      el.className += className;
    });
  }

  removeClass(className) {
    this.HTMLElements.forEach((el) => {
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

  _loopThroughElements(callback) {
    this.HTMLElements.forEach((el) => {
      callback(el);
    });
  }
}

module.exports = DOMNodeCollection;
