module.exports = function (str, separator) {
    return str.split(separator).map(value => value.trim());
}
