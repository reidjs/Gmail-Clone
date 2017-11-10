class Inbox {
  constructor() {
    
  }
  render() {
    const ul = document.createElement('UL');
    ul.className = "messages";
    ul.innerHTML = "An Inbox Message";
    return ul;
  }
}
module.exports = Inbox;