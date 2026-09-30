var filter = document.getElementById("filter");
var logBody = document.getElementById("logBody");
var rowTemplate = document.getElementById("logRowTemplate");
var emptyTemplate = document.getElementById("emptyLogTemplate");

function showLog() {
    var log = load("farmLog", []);
    var shown = 0;

    logBody.innerHTML = "";

    log.forEach(function (item) {
        var row;

        if (filter.value !== "" && item.section !== filter.value) {
            return;
        }

        row = rowTemplate.content.cloneNode(true);
        row.querySelector(".log-time").textContent = item.time;
        row.querySelector(".log-section").textContent = item.section;
        row.querySelector(".log-text").textContent = item.text;
        logBody.appendChild(row);
        shown++;
    });

    if (shown === 0) {
        logBody.appendChild(emptyTemplate.content.cloneNode(true));
    }

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
