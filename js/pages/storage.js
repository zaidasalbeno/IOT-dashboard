var tempInput = document.getElementById("tempLimit");
var humInput = document.getElementById("humLimit");
var limits = load("storgeLimits", {
    temp: farmData.storage.temperatureLimit,
    hum: farmData.storage.humidityLimit
});

tempInput.value = limits.temp;
humInput.value = limits.hum;

function drawStorage() {
    var temp = farmData.storage.temperature;
    var hum = farmData.storage.humidity;
    var tooHot = temp > limits.temp;
    var tooHumid = hum > limits.hum;
    var fansOn = isOn && tooHot;
    var ventsOpen = isOn && tooHumid;

    document.getElementById("tempNow").textContent = temp.toFixed(1) + " C";
    document.getElementById("humNow").textContent = hum + " %";

    document.getElementById("tempBar").style.width = (temp - 10) / 30 * 100 + "%";
    document.getElementById("humBar").style.width = hum + "%";
    document.getElementById("tempBar").className = "progress-bar " + (tooHot ? "bg-danger" : "bg-success");
    document.getElementById("humBar").className = "progress-bar " + (tooHumid ? "bg-danger" : "bg-success");

    document.getElementById("fan").classList.toggle("on", fansOn);
    document.getElementById("vent").classList.toggle("open", ventsOpen);
    document.getElementById("fanText").textContent = fansOn ? "Fans running" : "Fans off";
    document.getElementById("ventText").textContent = ventsOpen ? "Vents open" : "Vents closed";
}

function saveLimits() {
    limits = {
        temp: Number(tempInput.value),
        hum: Number(humInput.value)
    };

    save("storgeLimits", limits);
    addLog("Storage", "Limits set: " + limits.temp + " C and " + limits.hum + " %");
    drawStorage();
}

tempInput.onchange = saveLimits;
humInput.onchange = saveLimits;
document.addEventListener("partchange", drawStorage);

drawStorage();
