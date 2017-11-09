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
}

module.exports = DOMNodeCollection;
