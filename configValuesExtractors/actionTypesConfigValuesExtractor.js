const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');

module.exports = function name(context, config) {
    return {
        actionTypesPath: getConfigValueAndLog(
            context,
            config,
            'actionTypesPath',
            'Action types path',
        ),
    }
}
