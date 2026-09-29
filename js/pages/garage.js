var spotBox = document.getElementById("spots");

function drawGarage() {
    var html = "";
    var free = 0;

    farmData.parking.forEach(function (taken, index) {
        if (!taken) {
            free++;
        }

        html +=
            '<div class="col-4 col-md-2"><div class="spot ' + (taken ? "taken" : "free") + '">' +
            "P" + (index + 1) + "<br><small>" + (taken ? "Taken" : "Free") + "</small></div></div>";
    });

    spotBox.innerHTML = html;
    document.getElementById("freeCount").textContent = free + " / " + farmData.parking.length;

    document.getElementById("secText").innerHTML =
        '<span class="lamp ' + (isOn ? "" : "off") + '"></span>' +
        (isOn ? "Security system is armed" : "Security system is off");
}

document.addEventListener("partchange", drawGarage);

drawGarage();
