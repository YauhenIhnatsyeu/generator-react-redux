const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');

module.exports = function name(context, config) {
    return {
        containersPath: getConfigValueAndLog(
            context,
            config,
            'containersPath',
            'Containers path',
        ),
        importComponentsPath: getConfigValueAndLog(
            context,
            config,
            'importComponentsPath',
            'Import components path',
        ),
        importActionCreatorsPath: getConfigValueAndLog(
            context,
            config,
            'importActionCreatorsPath',
            'Import action creators path',
        ),
    }
}
