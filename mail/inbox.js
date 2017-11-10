const messageStore = require("./message_store.js");
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
    const spanFrom = document.createElement('SPAN');
    const spanSubject = document.createElement('SPAN');
    const spanBody = document.createElement('SPAN');
    // spanFrom.innerHTML = message.from;
    // spanSubject.innerHTML = message.subject;
    // spanBody.innerHTML = message.body;
    li.innerHTML = `
      <span>from: ${message.from}</span><br/>
      <span>subject: ${message.subject}</span><br/>
      <span>Body: ${message.body}</span>
    `
    // li.appendChild(spanFrom);
    // li.appendChild(spanSubject);
    // li.appendChild(spanBody);
    return li;
  }
}
module.exports = Inbox;