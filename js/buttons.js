const sact = document.getElementById("act");

sact.addEventListener("click", () => {

    if (sact.textContent === "Activate") {

        sact.textContent = "Deactivate";
        sact.style.backgroundColor = "red";

    } else {

        sact.textContent = "Activate";
        sact.style.backgroundColor = "";

    }

});
