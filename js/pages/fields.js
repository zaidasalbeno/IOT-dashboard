var zoneList = document.getElementById("zoneList");
var pumps = load("pumps", [false, false, false, false]);

function barClass(moisture) {
    if (moisture < 30) {
        return "low";
    }

    if (moisture < 50) {
        return "mid";
    }

    return "";
}

function drawFields() {
    var html = "";

    farmData.fields.forEach(function (field, index) {
        var pumpOn = pumps[index];

        html +=
            '<div class="col-12 col-md-6"><div class="card p-3">' +
            '<div class="d-flex justify-content-between">' +
            '<h5 class="mb-0">' + field.name + "</h5>" +
            '<span><span class="lamp ' + (pumpOn ? "" : "off") + '"></span>' + (pumpOn ? "Pump on" : "Pump off") + "</span>" +
            "</div>" +
            "<small>" + field.crop + "</small>" +
            '<div class="big my-2">' + field.moisture + "%</div>" +
            '<div class="bar mb-3"><i class="' + barClass(field.moisture) + '" style="width:' + field.moisture + '%"></i></div>' +
            '<button class="btn btn-sm ' + (pumpOn ? "btn-danger" : "btn-primary") + '" data-index="' + index + '">' +
            (pumpOn ? "Stop pump" : "Start pump") + "</button>" +
            "</div></div>";
    });

    zoneList.innerHTML = html;
}

zoneList.onclick = function (event) {
    var index = event.target.dataset.index;

    if (index === undefined) {
        return;
    }

    pumps[index] = !pumps[index];
    save("pumps", pumps);
    drawFields();

    addLog("Fields", farmData.fields[index].name + ": pump " + (pumps[index] ? "started" : "stopped"));
    toast(farmData.fields[index].name + ": pump " + (pumps[index] ? "on" : "off"));
};

drawFields();
