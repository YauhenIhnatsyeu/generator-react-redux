const splitAndTrim = require('../utils/splitAndTrim');

module.exports = function (input) {
    return splitAndTrim(input, ',').map(str => str.toUpperCase());
}
