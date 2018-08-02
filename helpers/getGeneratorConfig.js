const generatorConfigKey = require('../constants/generatorConfigKey');
const configFileName = require('../constants/configFileName');

module.exports = function (context) {
    if (!context) {
        return null;
    }

    if (context.fs.exists(configFileName)) {
        const fileJson = context.fs.readJSON(configFileName);
        return fileJson && fileJson[generatorConfigKey];
    }

    return null;
}
