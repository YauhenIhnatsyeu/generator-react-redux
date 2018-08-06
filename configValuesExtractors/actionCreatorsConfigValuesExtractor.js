const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');

module.exports = function name(context, config) {
    return {
        actionCreatorsPath: getConfigValueAndLog(
            context,
            config,
            'actionCreatorsPath',
            'Action creators path',
        ),
        importActionTypesPath: getConfigValueAndLog(
            context,
            config,
            'importActionTypesPath',
            'Import action types path',
        ),
    }
}
