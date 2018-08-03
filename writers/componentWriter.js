const path = require('path');

const logWriting = require('../helpers/logWriting');

module.exports = function (context, configValues) {
    if (!context) {
        return null;
    }

    const { props, fs } = context;

    const destinationPath = path.resolve(
        configValues.componentsPath,
        props.completedComponentPath,
        props.componentName,
    );

    logWriting(context, 'component', destinationPath);

    fs.copyTpl(
        context.templatePath('component'),
        context.destinationPath(destinationPath),
        props,
    );

    if (props.indexCssIsNeeded) {
        fs.write(path.resolve(destinationPath, 'index.css'), '');
    }
}
