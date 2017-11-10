document.addEventListener("DOMContentLoaded", () => {
  const lis = document.querySelectorAll(".sidebar-nav li");
  lis.forEach(li => {
    li.addEventListener("click", (e) => {
      const innerText = e.target.textContent.toLowerCase();
      window.location.hash = innerText;
    });
  });
});