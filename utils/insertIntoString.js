module.exports = function (str, index, sub) {
    return str.slice(0, index) + sub + str.slice(index);
}
