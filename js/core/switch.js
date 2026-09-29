var part = location.pathname.split("/").pop().replace(".html", "");

var partNames = {
    sort: "Sorting",
    storge: "Storage",
    garage: "Garage",
    robot: "Robot"
};

var labels = {
    garage: ["Activate security", "Deactivate security", "Security armed", "Security off"],
    robot: ["Start patrol", "Stop patrol", "Patrolling", "Docked"],
    storge: ["Turn on auto control", "Turn off auto control", "Auto control on", "Auto control off"],
    sort: ["Start sorting", "Stop sorting", "Running", "Stopped"]
};

var actBtn = document.getElementById("act");
var partBadge = document.querySelector(".status-card .badge");
var isOn = load(part + "On", part !== "garage");

function showState() {
    var text = labels[part];

    actBtn.textContent = isOn ? text[1] : text[0];
    actBtn.className = "btn " + (isOn ? "btn-danger" : "btn-primary");
    partBadge.textContent = isOn ? text[2] : text[3];
    partBadge.className = "badge " + (isOn ? "bg-success" : "bg-danger");
}

actBtn.onclick = function () {
    var message = isOn ? labels[part][3] : labels[part][2];

    isOn = !isOn;
    save(part + "On", isOn);
    showState();
    addLog(partNames[part], message);
    toast(partNames[part] + ": " + message);
    document.dispatchEvent(new Event("partchange"));
};

showState();
