var filter = document.getElementById("filter");
var logBody = document.getElementById("logBody");

function showLog() {
    var log = load("farmLog", []);
    var rows = "";
    var shown = 0;

    log.forEach(function (item) {
        if (filter.value !== "" && item.section !== filter.value) {
            return;
        }

        rows += "<tr><td>" + item.time + "</td><td>" + item.section + "</td><td>" + item.text + "</td></tr>";
        shown++;
    });

    logBody.innerHTML = rows || '<tr><td colspan="3">Nothing here yet. Use the other pages and events will show up.</td></tr>';
    document.getElementById("logCount").textContent = shown + " entries";
}

filter.onchange = showLog;

document.getElementById("clearLog").onclick = function () {
    if (confirm("Delete the whole log?")) {
        save("farmLog", []);
        showLog();
    }
};

showLog();
