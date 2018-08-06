const path = require('path');
const chalk = require('chalk');

const logWriting = require('../helpers/logWriting');
const postfixes = require('../constants/postfixes');

module.exports = function (context, configValues) {
    if (!context) {
        return null;
    }

    const { props, fs } = context;
    let actionTypes = props.actionTypes;

    if (!actionTypes) {
        actionTypes = [];
        context.log(`${chalk.red('No')} action types detected`);
    }

    const destinationPath = path.resolve(
        configValues.actionCreatorsPath,
        `${props.actionName}${postfixes.actionCreatorsPostfix}.js`,
    );

    logWriting(context, 'action creators', destinationPath);

    fs.copyTpl(
        context.templatePath('actionCreators.js'),
        context.destinationPath(destinationPath),
        {
            actionTypes,
            actionCreators: props.actionCreators,
            importActionTypesPath: configValues.importActionTypesPath,
        },
    );
}
