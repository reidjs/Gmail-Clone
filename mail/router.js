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