const path = require('path');

const logWriting = require('../helpers/logWriting');
const postfixes = require('../constants/postfixes');

module.exports = function (context, configValues) {
    if (!context) {
        return null;
    }

    const { props, fs } = context;

    const destinationPath = path.resolve(
        configValues.containersPath,
        `${props.componentName}${postfixes.containerPostfix}.js`,
    );

    logWriting(context, 'container', destinationPath);

    fs.copyTpl(
        context.templatePath('container.js'),
        context.destinationPath(destinationPath),
        Object.assign(
            {},
            props,
            {
                importComponentsPath: configValues.importComponentsPath,
                importActionCreatorsPath: configValues.importActionCreatorsPath,
            },
        ),
    );
}
