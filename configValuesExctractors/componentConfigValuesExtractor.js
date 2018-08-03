const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');

module.exports = function name(context, config) {
    return {
        componentsPath: getConfigValueAndLog(
            context,
            config,
            'componentsPath',
            'Components path',
        ),

    }
}
