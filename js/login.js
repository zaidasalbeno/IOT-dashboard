const password = "admin";
const username = "admin";

localStorage.setItem("username", username);
localStorage.setItem("password", password);

const user = document.getElementById("username");
const pass = document.getElementById("password");
const btn = document.getElementById("loginButton");

btn.onclick = (event) => {

    event.preventDefault();

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (user.value === savedUsername && pass.value === savedPassword) {

        window.location.href = "main.html";

    } else {

        alert("Wrong username or password");

    }

};
