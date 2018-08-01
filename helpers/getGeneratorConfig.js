const generatorConfigKey = require('../constants/generatorConfigKey');
const configFileName = require('../constants/configFileName');

module.exports = function (generatorContext) {
    if (!generatorContext) {
        return null;
    }

    if (generatorContext.fs.exists(configFileName)) {
        const fileJson = generatorContext.fs.readJSON(configFileName);
        return fileJson && fileJson[generatorConfigKey];
    }
    return null;
}
