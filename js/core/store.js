function load(key, fallback) {
    var text = localStorage.getItem(key);

    if (text === null) {
        return fallback;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        return fallback;
    }
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function addLog(section, text) {
    var log = load("farmLog", []);

    log.unshift({
        section: section,
        text: text,
        time: new Date().toLocaleString()
    });

    save("farmLog", log.slice(0, 100));
}
