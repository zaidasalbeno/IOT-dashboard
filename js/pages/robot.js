var mapBox = document.getElementById("map");
var robot = farmData.robot;
var total = robot.columns * robot.rows;
var cells = [];

function cellIndex(step) {
    var row = Math.floor(step / robot.columns);
    var column = step % robot.columns;

    if (row % 2 === 1) {
        column = robot.columns - 1 - column;
    }

    return row * robot.columns + column;
}

function isIntruderStep(step) {
    return robot.intruders.some(function (item) {
        return item.step === step;
    });
}

function buildMap() {
    for (var i = 0; i < total; i++) {
        var cell = document.createElement("div");

        cell.className = "cell";
        mapBox.appendChild(cell);
        cells.push(cell);
    }
}

function drawMap() {
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

    var row = Math.floor(robot.position / robot.columns) + 1;
    var column = cellIndex(robot.position) % robot.columns + 1;

    mapBox.classList.toggle("active", isOn);
    document.getElementById("scanned").textContent = robot.position;
    document.getElementById("intruders").textContent = robot.intruders.length;
    document.getElementById("robotText").textContent = isOn
        ? "Robot is scanning row " + row + ", column " + column
        : "Robot is docked at row " + row + ", column " + column;
}

function drawPicture(where, time) {
    var canvas = document.createElement("canvas");
    var pen = canvas.getContext("2d");

    canvas.width = 240;
    canvas.height = 150;

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

    return canvas.toDataURL("image/jpeg", 0.6);
}

function drawPhotos() {
    var html = "";

    robot.intruders.forEach(function (item) {
        var row = Math.floor(item.step / robot.columns) + 1;
        var column = cellIndex(item.step) % robot.columns + 1;
        var where = "Row " + row + ", Col " + column;

        html +=
            '<div class="col-6 col-md-4"><div class="shot">' +
            '<img src="' + drawPicture(where, item.time) + '" alt="Intruder picture"></div>' +
            "<small>" + where + " - " + item.time + "</small></div>";
    });

    document.getElementById("photos").innerHTML = html;
}

buildMap();
drawMap();
drawPhotos();
document.addEventListener("partchange", drawMap);
