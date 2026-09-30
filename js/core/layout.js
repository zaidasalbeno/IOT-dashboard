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

function markActiveLink() {
    var links = document.querySelectorAll(".navbar .nav-link");

    links.forEach(function (link) {
        if (link.getAttribute("href") === here + ".html") {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function startLayout() {
    var content = document.querySelector("main");
    var themeButton = document.getElementById("themeButton");
    var logoutButton = document.getElementById("logoutButton");
    var wantsDark = load("darkMode", matchMedia("(prefers-color-scheme: dark)").matches);

    document.body.classList.toggle("dark-mode", wantsDark);
    setTheme();

    if (content) {
        content.id = "content";
    }

    markActiveLink();

    if (themeButton) {
        themeButton.onclick = toggleDarkMode;
    }

    if (logoutButton) {
        logoutButton.onclick = function () {
            sessionStorage.removeItem("auth");
            location.href = "login.html";
        };
    }
}

startLayout();
