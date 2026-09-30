var spots = document.querySelectorAll(".spot");

function showGarage() {
    var free = document.querySelectorAll(".spot.free").length;

    document.getElementById("freeCount").textContent = free + " / " + spots.length;
    document.getElementById("secLamp").classList.toggle("off", !isOn);
    document.getElementById("secText").textContent = isOn ? "Security system is armed" : "Security system is off";
}

document.addEventListener("partchange", showGarage);

showGarage();
