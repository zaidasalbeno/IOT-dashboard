var belt = document.getElementById("belt");
var smallInput = document.getElementById("smallBelow");
var largeInput = document.getElementById("largeFrom");
var fruitTable = document.getElementById("fruitTable");
var limits = load("sortLimits", {
    small: farmData.sorting.smallBelow,
    large: farmData.sorting.largeFrom
});

smallInput.value = limits.small;
largeInput.value = limits.large;

function sizeOf(volume) {
    if (volume < limits.small) {
        return { key: "s", name: "Small" };
    }

    if (volume >= limits.large) {
        return { key: "l", name: "Large" };
    }

    return { key: "m", name: "Medium" };
}

function drawSorting() {
    var counts = { s: 0, m: 0, l: 0 };
    var rows = "";
    var beltItems = "";

    farmData.sorting.fruits.forEach(function (fruit, index) {
        var size = sizeOf(fruit.volume);
        var pixels = 14 + fruit.volume / 10;

        counts[size.key]++;

        rows +=
            "<tr><td>" + fruit.name + "</td><td>" + fruit.volume + " cm3</td><td>" + size.name + "</td></tr>";

        beltItems +=
            '<span class="item ' + size.key + '" style="width:' + pixels + "px;height:" + pixels +
            "px;top:" + (46 - pixels) / 2 + "px;left:" + index * 12 + "%;animation-delay:-" + index * 0.9 + 's"></span>';
    });

    fruitTable.innerHTML = rows;
    belt.innerHTML = beltItems;
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
    drawSorting();
}

smallInput.onchange = saveLimits;
largeInput.onchange = saveLimits;
document.addEventListener("partchange", drawSorting);

drawSorting();
