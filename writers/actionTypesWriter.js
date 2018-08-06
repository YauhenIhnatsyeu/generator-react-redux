const path = require('path');

const logWriting = require('../helpers/logWriting');
const postfixes = require('../constants/postfixes');

module.exports = function (context, configValues) {
    if (!context) {
        return null;
    }

    const { props, fs } = context;

    const destinationPath = path.resolve(
        configValues.actionTypesPath,
        `${props.actionName}${postfixes.actionTypesPostfix}.js`,
    );

    logWriting(context, 'action types', destinationPath);

    fs.copyTpl(
        context.templatePath('actionTypes.js'),
        context.destinationPath(destinationPath),
        { actionTypes: props.actionTypes },
    );
}
