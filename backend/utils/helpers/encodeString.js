const encodeString = (string) => {
    return string
        .replace(/ /g, '%20')
        .replace(/&/g, '%26')
};

module.exports = encodeString;