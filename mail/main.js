const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js');

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash = "inbox"
  const lis = document.querySelectorAll(".sidebar-nav li");
  lis.forEach(li => {
    li.addEventListener("click", (e) => {
      const innerText = e.target.textContent.toLowerCase();
      window.location.hash = innerText;
    });
  });
  const main = document.querySelector(".content");
  const router = new Router(main, routes);
  router.start();
});

const routes = {
  'inbox' : new Inbox,
  'sent' : new Sent
}