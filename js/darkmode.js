const darkMode = localStorage.getItem("darkMode");

if (darkMode === "true") {
    document.body.classList.add("dark-mode");
}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "true");
    } else {
        localStorage.setItem("darkMode", "false");
    }
}
