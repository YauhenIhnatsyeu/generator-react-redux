const path = require('path');
const chalk = require('chalk');

const insertIntoString = require('../utils/insertIntoString');

const postfixes = require('../constants/postfixes');

const logWriting = require('../helpers/logWriting');

const getExportInsertIndex = require('../insertIndexFinders/actionCreatorsIndexJsExport');
const getExportInsertString = require('../insertStrings/actionCreatorsIndexJsExport');

module.exports = function (context, configValues) {
    const { actionName, actionCreators } = context.props;
    const destinationPath = path.resolve(configValues.actionCreatorsPath, 'index.js');
    
    let file = context.fs.read(destinationPath);

    const exportInsertIndex = getExportInsertIndex(file);
    const actionCreatorsName = actionName + postfixes.actionCreatorsPostfix;
    const exportString = getExportInsertString(actionCreators, actionCreatorsName);

    logWriting(context, 'import', destinationPath);
    
    if (exportInsertIndex === null) {
        context.log(chalk.red('Cannot add export of action creator to index.js'));
    } else if (exportInsertIndex === 0) {
        file = exportString + file;
    } else {
        file = insertIntoString(file, exportInsertIndex, `${exportString}`);
    }

    context.fs.write(destinationPath, file);
}
