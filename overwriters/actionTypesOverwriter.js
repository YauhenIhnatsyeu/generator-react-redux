const path = require('path');

const insertIntoString = require('../utils/insertIntoString');

const postfixes = require('../constants/postfixes');

const logWriting = require('../helpers/logWriting');

const getImportInsertIndex = require('../insertIndexFinders/actionTypesIndexJsImport');
const getImportInsertString = require('../insertStrings/actionTypesIndexJsImport');
const getExportInsertIndex = require('../insertIndexFinders/actionTypesIndexJsExport');
const getExportInsertString = require('../insertStrings/actionTypesIndexJsExport');

function addImportToIndexJs(file, context, actionTypeName) {
    const importInsertIndex = getImportInsertIndex(file);
    const fullActionTypeName = actionTypeName + postfixes.actionTypesPostfix;
    const importString = getImportInsertString(fullActionTypeName);
    
    if (importInsertIndex === null) {
        context.log('Cannot add import of action type to index.js');
    } else if (importInsertIndex === 0) {
        file = importString + file;
    } else {
        file = insertIntoString(file, importInsertIndex, `\n${importString}`);
    }

    return file;
}

function addExportToIndexJs(file, context, actionTypeName) {
    const exportInsertIndex = getExportInsertIndex(file);
    const fullActionTypeName = actionTypeName + postfixes.actionTypesPostfix;
    const exportString = getExportInsertString(fullActionTypeName);

    if (exportInsertIndex === null) {
        context.log('Cannot add export of action type to index.js');
    } else {
        file = insertIntoString(file, exportInsertIndex, `\n\t${exportString}`);
    }

    return file;
}

module.exports = function (context, actionTypeName, configValues) {
    const destinationPath = path.resolve(configValues.actionTypesPath, 'index.js');
    const file = context.fs.read(destinationPath);

    logWriting(context, 'import and export', destinationPath);

    let newFile = addImportToIndexJs(file, context, actionTypeName);
    newFile = addExportToIndexJs(newFile, context, actionTypeName);

    context.fs.write(destinationPath, newFile);
}
