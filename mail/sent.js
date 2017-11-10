const messageStore = require("./message_store.js");
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