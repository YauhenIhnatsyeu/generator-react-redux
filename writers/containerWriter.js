const path = require('path');

const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');
const logWriting = require('../helpers/logWriting');
const containerPostfix = require('../constants/containerPostfix');

module.exports = function (context, config) {
    if (!context) {
        return null;
    }

    const { props, fs, templatePath } = context;

    const containersPath = getConfigValueAndLog(
        context,
        config,
        'containersPath',
        'Containers path',
    );

    const importComponentsPath = getConfigValueAndLog(
        context,
        config,
        'importComponentsPath',
        'Import components path',
    );

    const destinationPath = path.resolve(
        containersPath,
        `${props.componentName}${containerPostfix}.js`,
    );

    logWriting(context, 'container', destinationPath);

    fs.copyTpl(
        templatePath('container.js'),
        context.destinationPath(destinationPath),
        Object.assign({}, props, { importComponentsPath }),
    );
}
