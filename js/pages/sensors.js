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

function showSensors() {

list.innerHTML = "";

sensors.forEach(function(sensor) {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${sensor.id}</td>

        <td>${sensor.name}</td>

        <td>${sensor.type}</td>

        <td>
            <span class="badge ${sensor.status === "Active" ? "bg-success" : "bg-danger"}">
                ${sensor.status}
            </span>
        </td>

        <td>
            <button
                class="btn btn-warning btn-sm edit-btn"
                onclick="editSensor(${sensor.id})">
                Edit
            </button>

            <button
                class="btn btn-danger btn-sm"
                onclick="deleteSensor(${sensor.id})">
                Delete
            </button>
        </td>
    `;

    list.appendChild(row);

});

count.textContent = sensors.length + " Sensors";

}

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
