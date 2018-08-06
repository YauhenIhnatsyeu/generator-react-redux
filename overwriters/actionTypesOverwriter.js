const path = require('path');
const chalk = require('chalk');

const insertIntoString = require('../utils/insertIntoString');

const postfixes = require('../constants/postfixes');

const logWriting = require('../helpers/logWriting');

const getImportInsertIndex = require('../insertIndexFinders/actionTypesIndexJsImport');
const getImportInsertString = require('../insertStrings/actionTypesIndexJsImport');
const getExportInsertIndex = require('../insertIndexFinders/actionTypesIndexJsExport');
const getExportInsertString = require('../insertStrings/actionTypesIndexJsExport');

function addImportToIndexJs(file, context, actionName) {
    const importInsertIndex = getImportInsertIndex(file);
    const actionTypeName = actionName + postfixes.actionTypesPostfix;
    const importString = getImportInsertString(actionTypeName);
    
    if (importInsertIndex === null) {
        context.log(chalk.red('Cannot add import of action type to index.js'));
    } else if (importInsertIndex === 0) {
        file = importString + file;
    } else {
        file = insertIntoString(file, importInsertIndex, `${importString}`);
    }

    return file;
}

function addExportToIndexJs(file, context, actionName) {
    const exportInsertIndex = getExportInsertIndex(file);
    const actionTypeName = actionName + postfixes.actionTypesPostfix;
    const exportString = getExportInsertString(actionTypeName);

    if (exportInsertIndex === null) {
        context.log(chalk.red('Cannot add export of action type to index.js'));
    } else {
        file = insertIntoString(file, exportInsertIndex, `${exportString}`);
    }

    return file;
}

module.exports = function (context, actionName, configValues) {
    const destinationPath = path.resolve(configValues.actionTypesPath, 'index.js');
    const file = context.fs.read(destinationPath);

    logWriting(context, 'import and export', destinationPath);

    let newFile = addImportToIndexJs(file, context, actionName);
    newFile = addExportToIndexJs(newFile, context, actionName);

    context.fs.write(destinationPath, newFile);
}
