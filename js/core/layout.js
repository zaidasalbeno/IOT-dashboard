var pages = [
    ["main", "Home"],
    ["fields", "Fields"],
    ["storge", "Storage"],
    ["sort", "Sorting"],
    ["garage", "Garage"],
    ["robot", "Robot"],
    ["sensors", "Sensors"],
    ["reports", "Reports"],
    ["log", "Activity"],
    ["howtouse", "Guide"]
];

var here = location.pathname.split("/").pop().replace(".html", "");

if (here !== "login" && sessionStorage.getItem("auth") !== "1") {
    location.replace("login.html");
}

function setTheme() {
    var mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", mode);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    save("darkMode", document.body.classList.contains("dark-mode"));
    setTheme();
}

function toast(message) {
    var box = document.getElementById("toastBox");
    var note = document.createElement("div");

    note.textContent = message;
    box.appendChild(note);

    setTimeout(function () {
        note.remove();
    }, 2500);
}

function buildNavbar() {
    var nav = document.querySelector("nav.navbar");
    var links = "";

    if (!nav || here === "login") {
        return;
    }

    pages.forEach(function (page) {
        var active = page[0] === here ? "active" : "";
        links += '<li><a class="nav-link ' + active + '" href="' + page[0] + '.html">' + page[1] + "</a></li>";
    });

    nav.className = "navbar navbar-expand-xl sticky-top";
    nav.innerHTML =
        '<div class="container">' +
        '<a class="navbar-brand fw-bold" href="main.html">Smart Farm</a>' +
        '<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nv" aria-label="Menu">' +
        '<span class="navbar-toggler-icon"></span></button>' +
        '<div class="collapse navbar-collapse" id="nv">' +
        '<ul class="navbar-nav me-auto">' + links + "</ul>" +
        '<div class="d-flex gap-2 my-2">' +
        '<button class="btn btn-outline-secondary btn-sm" id="themeBtn">Day / Night</button>' +
        '<button class="btn btn-outline-secondary btn-sm" id="outBtn">Log out</button>' +
        "</div></div></div>";

    document.getElementById("themeBtn").onclick = toggleDarkMode;

    document.getElementById("outBtn").onclick = function () {
        sessionStorage.removeItem("auth");
        location.href = "login.html";
    };
}

function startLayout() {
    var toastBox = document.createElement("div");
    var content = document.querySelector("main");
    var wantsDark = load("darkMode", matchMedia("(prefers-color-scheme: dark)").matches);

    document.body.classList.toggle("dark-mode", wantsDark);
    setTheme();

    toastBox.id = "toastBox";
    toastBox.className = "toast-box";
    document.body.appendChild(toastBox);

    document.body.insertAdjacentHTML("afterbegin", '<a class="skip" href="#content">Skip to content</a>');

    if (content) {
        content.id = "content";
    }

    buildNavbar();
}

startLayout();
