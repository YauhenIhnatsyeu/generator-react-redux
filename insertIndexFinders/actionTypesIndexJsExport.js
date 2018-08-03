const indicesOf = require('../utils/indicesOf');

module.exports = function(file) {
    const indicesOfCommas = indicesOf(file, ',');

    if (indicesOfCommas.length < 1) {
        return null;
    }

    return indicesOfCommas[indicesOfCommas.length - 1] + 1;
}
