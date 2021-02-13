const encodeString = (string) => {
    return string
        .replace(/ /g, '%20')
        .replace(/&/g, '%26')
        .replace(/ö/g, '%C3%B6')
        .replace(/ü/g, '%C3%BC')
    };

module.exports = encodeString;