const chalk = require('chalk');

module.exports = function (context, object, path) {
    if (context) {
        context.log(`Writing ${object} to ${chalk.green(path)}...`);
    }
}
