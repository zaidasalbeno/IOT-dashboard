var farmData = {
    fields: [
        { name: "North Field", crop: "Wheat", moisture: 55 },
        { name: "South Field", crop: "Corn", moisture: 28 },
        { name: "East Orchard", crop: "Apples", moisture: 64 },
        { name: "Greenhouse", crop: "Tomatoes", moisture: 42 }
    ],

    storage: {
        temperature: 27.5,
        humidity: 68,
        temperatureLimit: 26,
        humidityLimit: 60
    },

    sorting: {
        smallBelow: 100,
        largeFrom: 200,
        fruits: [
            { name: "Apple", volume: 85 },
            { name: "Orange", volume: 140 },
            { name: "Mango", volume: 260 },
            { name: "Plum", volume: 55 },
            { name: "Peach", volume: 170 },
            { name: "Pear", volume: 210 },
            { name: "Lemon", volume: 95 },
            { name: "Grapefruit", volume: 290 }
        ]
    },

    parking: [true, false, true, true, false, false, true, false, false, true, false, true],

    robot: {
        columns: 8,
        rows: 5,
        position: 26,
        intruders: [
            { step: 9, time: "06:42" },
            { step: 21, time: "07:15" }
        ]
    }
};
