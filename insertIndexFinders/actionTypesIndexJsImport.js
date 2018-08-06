const indicesOf = require('../utils/indicesOf');

module.exports = function(file) {
    const indicesOfSemiColons = indicesOf(file, ';');

    if (indicesOfSemiColons.length < 1) {
        return null;
    } else if (indicesOfSemiColons.length === 1) {
        return 0;
    }

    return indicesOfSemiColons[indicesOfSemiColons.length - 2] + 1;
}
