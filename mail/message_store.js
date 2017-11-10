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