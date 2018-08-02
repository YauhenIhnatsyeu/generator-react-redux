const path = require('path');

const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');
const logWriting = require('../helpers/logWriting');

module.exports = function (context, config) {
    if (!context) {
        return null;
    }

    const componentsPath = getConfigValueAndLog(
        context,
        config,
        'componentsPath',
        'Components path',
    );

    const destinationPath = path.resolve(
        componentsPath,
        context.props.completedComponentPath,
        context.props.componentName,
    );

    logWriting(context, 'component', destinationPath);

    context.fs.copyTpl(
        context.templatePath('component'),
        context.destinationPath(destinationPath),
        context.props,
    );

    if (context.props.indexCssIsNeeded) {
        context.fs.write(path.resolve(destinationPath, 'index.css'), '');
    }
}
