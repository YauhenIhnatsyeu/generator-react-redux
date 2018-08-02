const path = require('path');

const splitAndTrim = require('../utils/splitAndTrim');

const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');
const logWriting = require('../helpers/logWriting');
const postfixes = require('../constants/postfixes');

function extractActionTypesFromString(str) {
    return splitAndTrim(str, ',').map(at => at.toUpperCase());
}

module.exports = function (context, config) {
    if (!context) {
        return null;
    }

    const { props, fs } = context;

    const actionTypesPath = getConfigValueAndLog(
        context,
        config,
        'actionTypesPath',
        'Action types path',
    );

    const destinationPath = path.resolve(
        actionTypesPath,
        `${props.actionTypesName}${postfixes.actionTypesPostfix}.js`,
    );

    logWriting(context, 'action types', destinationPath);

    const actionTypes = extractActionTypesFromString(props.actionTypes);

    fs.copyTpl(
        context.templatePath('actionTypes.js'),
        context.destinationPath(destinationPath),
        { actionTypes },
    );
}