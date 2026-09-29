var defaultStates = {
    storge: true,
    sort: true,
    garage: false,
    robot: true
};

function showBadges() {
    Object.keys(defaultStates).forEach(function (name) {
        var link = document.querySelector('a[href="' + name + '.html"]');
        var badge = link.closest(".card").querySelector(".status-badge");
        var on = load(name + "On", defaultStates[name]);

        badge.textContent = on ? "Active" : "Disabled";
        badge.className = "badge status-badge " + (on ? "bg-success" : "bg-danger");
    });
}

function showSummary() {
    var pumps = load("pumps", []);
    var log = load("farmLog", []);
    var running = pumps.filter(Boolean).length;
    var dry = farmData.fields.filter(function (field) {
        return field.moisture < 30;
    }).length;

    document.getElementById("sumSorted").textContent = farmData.sorting.fruits.length;
    document.getElementById("sumPumps").textContent = running;
    document.getElementById("sumDry").textContent = dry;
    document.getElementById("sumLast").textContent = log.length ? log[0].section + ": " + log[0].text : "No activity yet";
}

showBadges();
showSummary();
