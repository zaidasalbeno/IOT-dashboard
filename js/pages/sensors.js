const form = document.getElementById("sensorForm");

const name = document.getElementById("name");
const type = document.getElementById("type");
const status = document.getElementById("status");

const list = document.getElementById("list");
const count = document.getElementById("count");

const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

let sensors = JSON.parse(localStorage.getItem("sensors")) || [];

let editId = null;

const rowTemplate = document.getElementById("sensorRowTemplate");

function showSensors() {

    list.innerHTML = "";

    sensors.forEach(function(sensor) {

        const row = rowTemplate.content.cloneNode(true);
        const badge = row.querySelector(".sensor-status");

        row.querySelector(".sensor-id").textContent = sensor.id;
        row.querySelector(".sensor-name").textContent = sensor.name;
        row.querySelector(".sensor-type").textContent = sensor.type;

        badge.textContent = sensor.status;
        badge.className = "badge sensor-status " + (sensor.status === "Active" ? "bg-success" : "bg-danger");

        row.querySelector(".edit-button").dataset.id = sensor.id;
        row.querySelector(".delete-button").dataset.id = sensor.id;

        list.appendChild(row);

    });

    count.textContent = sensors.length + " Sensors";

}

list.addEventListener("click", function(event) {

    const id = Number(event.target.dataset.id);

    if (!id) {
        return;
    }

    if (event.target.classList.contains("edit-button")) {
        editSensor(id);
    }

    if (event.target.classList.contains("delete-button")) {
        deleteSensor(id);
    }

});

form.addEventListener("submit", function(event) {

event.preventDefault();

if (editId === null) {

    const sensor = {

        id: Date.now(),

        name: name.value,

        type: type.value,

        status: status.value

    };

    sensors.push(sensor);

} else {

    const sensor = sensors.find(function(item) {
        return item.id === editId;
    });

    sensor.name = name.value;
    sensor.type = type.value;
    sensor.status = status.value;

    editId = null;

    addBtn.textContent = "Add Sensor";

}

localStorage.setItem("sensors", JSON.stringify(sensors));

form.reset();

showSensors();

});

function editSensor(id) {

const sensor = sensors.find(function(item) {
    return item.id === id;
});

name.value = sensor.name;
type.value = sensor.type;
status.value = sensor.status;

editId = id;

addBtn.textContent = "Update Sensor";

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

function deleteSensor(id) {

const answer = confirm("Are you sure you want to delete this sensor?");

if (answer) {

    sensors = sensors.filter(function(sensor) {
        return sensor.id !== id;
    });

    localStorage.setItem("sensors", JSON.stringify(sensors));

    showSensors();

}

}

cancelBtn.addEventListener("click", function() {

form.reset();

editId = null;

addBtn.textContent = "Add Sensor";

});

showSensors();
