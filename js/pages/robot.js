var robot = farmData.robot;
var total = robot.columns * robot.rows;
var map = document.getElementById("map");
var cells = document.querySelectorAll("#map .cell");
var canvases = document.querySelectorAll(".photo-canvas");

function cellIndex(step) {
    var row = Math.floor(step / robot.columns);
    var column = step % robot.columns;

    if (row % 2 === 1) {
        column = robot.columns - 1 - column;
    }

    return row * robot.columns + column;
}

function placeName(step) {
    var row = Math.floor(step / robot.columns) + 1;
    var column = cellIndex(step) % robot.columns + 1;

    return "Row " + row + ", Col " + column;
}

function isIntruderStep(step) {
    return Array.from(canvases).some(function (canvas) {
        return Number(canvas.dataset.step) === step;
    });
}

function showMap() {
    for (var step = 0; step < total; step++) {
        var classes = "cell";

        if (step < robot.position) {
            classes += " done";
        }

        if (step === robot.position) {
            classes += " bot";
        }

        if (isIntruderStep(step)) {
            classes += " alarm";
        }

        cells[cellIndex(step)].className = classes;
    }

    map.classList.toggle("active", isOn);
    document.getElementById("scanned").textContent = robot.position;
    document.getElementById("intruders").textContent = canvases.length;
    document.getElementById("robotText").textContent =
        (isOn ? "Robot is scanning " : "Robot is docked at ") + placeName(robot.position).toLowerCase();
}

function paintPicture(canvas) {
    var pen = canvas.getContext("2d");
    var where = placeName(Number(canvas.dataset.step));
    var time = canvas.dataset.time;

    pen.fillStyle = "#1d2b16";
    pen.fillRect(0, 0, 240, 150);

    pen.strokeStyle = "#2c4222";
    for (var y = 20; y < 150; y += 18) {
        pen.beginPath();
        pen.moveTo(0, y);
        pen.lineTo(240, y);
        pen.stroke();
    }

    pen.fillStyle = "#0b0b0b";
    pen.beginPath();
    pen.arc(120, 60, 14, 0, 7);
    pen.fill();
    pen.fillRect(104, 76, 32, 50);

    pen.fillStyle = "#ff5a4d";
    pen.font = "11px monospace";
    pen.fillText("CAM 1  " + where, 8, 14);
    pen.fillText(time, 8, 144);

    canvas.closest(".photo-item").querySelector(".photo-text").textContent = where + " - " + time;
}

canvases.forEach(paintPicture);
document.addEventListener("partchange", showMap);

showMap();
