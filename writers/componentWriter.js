const path = require('path');

const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');
const logWriting = require('../helpers/logWriting');

module.exports = function (context, config) {
    if (!context) {
        return null;
    }

    const { props, fs, templatePath } = context;

    const componentsPath = getConfigValueAndLog(
        context,
        config,
        'componentsPath',
        'Components path',
    );

    const destinationPath = path.resolve(
        componentsPath,
        props.completedComponentPath,
        props.componentName,
    );

    logWriting(context, 'component', destinationPath);

    fs.copyTpl(
        templatePath('component'),
        context.destinationPath(destinationPath),
        props,
    );

    if (props.indexCssIsNeeded) {
        fs.write(path.resolve(destinationPath, 'index.css'), '');
    }
}
