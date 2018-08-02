const chalk = require('chalk');

const defaultConfigValues = require('../constants/defaultConfigValues');

module.exports = function(context, config, key, caption) {
    if (!context) {
        return null;
    }

    let value = defaultConfigValues[key];

    if (!config || !config[key]) {
        context.log(`${caption} is ${chalk.red('not')} specified, using default '${value}'`);
    } else {
        value = config[key];
        context.log(`${caption} is detected: ${chalk.green(value)}`)
    }

    return value;
}
