var cards = document.querySelectorAll(".field-card");

var fillPerTick = 3;
var dropPerTick = 0.5;
var tickTime = 2000;

var pumps = load("pumps", [false, false, false, false]);
var moisture = load("moisture", farmData.fieldMoisture);

function barColor(value) {
    if (value < 30) {
        return "bg-danger";
    }

    if (value < 50) {
        return "bg-warning";
    }

    return "bg-success";
}

function showFields() {
    cards.forEach(function (card, index) {
        var pumpOn = pumps[index];
        var level = Math.round(moisture[index]);
        var bar = card.querySelector(".moisture-bar");
        var button = card.querySelector(".pump-button");

        card.querySelector(".pump-lamp").classList.toggle("off", !pumpOn);
        card.querySelector(".pump-text").textContent = pumpOn ? "Pump on" : "Pump off";
        card.querySelector(".field-moisture").textContent = level + "%";

        bar.style.width = level + "%";
        bar.className = "progress-bar moisture-bar " + barColor(level);

        button.textContent = pumpOn ? "Stop pump" : "Start pump";
        button.className = "btn btn-sm pump-button " + (pumpOn ? "btn-danger" : "btn-primary");
    });
}

function changeMoisture() {
    moisture = moisture.map(function (value, index) {
        var next = value + (pumps[index] ? fillPerTick : -dropPerTick);
        return Math.min(100, Math.max(0, next));
    });

    save("moisture", moisture);
    showFields();
}

cards.forEach(function (card, index) {
    var name = card.querySelector("h5").textContent;

    card.querySelector(".pump-button").onclick = function () {
        pumps[index] = !pumps[index];
        save("pumps", pumps);
        showFields();

        addLog("Fields", name + ": pump " + (pumps[index] ? "started" : "stopped"));
        toast(name + ": pump " + (pumps[index] ? "on" : "off"));
    };
});

showFields();
setInterval(changeMoisture, tickTime);
