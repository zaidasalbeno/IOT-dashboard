var smallInput = document.getElementById("smallBelow");
var largeInput = document.getElementById("largeFrom");
var belt = document.getElementById("belt");
var rows = document.querySelectorAll("#fruitTable tr");
var items = document.querySelectorAll("#belt .item");

var limits = load("sortLimits", {
    small: farmData.sorting.smallBelow,
    large: farmData.sorting.largeFrom
});

smallInput.value = limits.small;
largeInput.value = limits.large;

function sizeOf(volume) {
    if (volume < limits.small) {
        return { key: "s", name: "Small", badge: "bg-warning" };
    }

    if (volume >= limits.large) {
        return { key: "l", name: "Large", badge: "bg-danger" };
    }

    return { key: "m", name: "Medium", badge: "bg-success" };
}

function showSorting() {
    var counts = { s: 0, m: 0, l: 0 };

    rows.forEach(function (row, index) {
        var size = sizeOf(Number(row.dataset.volume));
        var badge = row.querySelector(".fruit-size");

        counts[size.key]++;

        badge.textContent = size.name;
        badge.className = "badge fruit-size " + size.badge;

        items[index].classList.remove("s", "m", "l");
        items[index].classList.add(size.key);
    });

    belt.classList.toggle("run", isOn);

    document.getElementById("countS").textContent = counts.s;
    document.getElementById("countM").textContent = counts.m;
    document.getElementById("countL").textContent = counts.l;
}

function saveLimits() {
    limits = {
        small: Number(smallInput.value),
        large: Number(largeInput.value)
    };

    save("sortLimits", limits);
    addLog("Sorting", "Limits set: small below " + limits.small + ", large from " + limits.large);
    showSorting();
}

smallInput.onchange = saveLimits;
largeInput.onchange = saveLimits;
document.addEventListener("partchange", showSorting);

showSorting();
