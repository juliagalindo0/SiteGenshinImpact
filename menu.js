// menu.js
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const menuLinks = document.getElementById("menuLinks");

    if (hamburger && menuLinks) {
        hamburger.addEventListener("click", function () {
            menuLinks.classList.toggle("show");
        });
    }
});
