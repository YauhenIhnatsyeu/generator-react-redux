const listPromptFilter = require('./listPromptFilter');

module.exports = function (input) {
    return listPromptFilter(input).map(str => str.toUpperCase());
}
