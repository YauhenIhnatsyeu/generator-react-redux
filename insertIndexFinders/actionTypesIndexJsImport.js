const indicesOf = require('../utils/indicesOf');

module.exports = function(file) {
    const indicesOfSemiColumns = indicesOf(file, ';');

    if (indicesOfSemiColumns.length < 1) {
        return null;
    } else if (indicesOfSemiColumns.length === 1) {
        return 0;
    }

    return indicesOfSemiColumns[indicesOfSemiColumns.length - 2] + 1;
}
