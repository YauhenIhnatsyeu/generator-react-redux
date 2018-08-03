const path = require('path');

const splitAndTrim = require('../utils/splitAndTrim');
const indicesOf = require('../utils/indicesOf');
const insertIntoString = require('../utils/insertIntoString');

const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');
const logWriting = require('../helpers/logWriting');
const postfixes = require('../constants/postfixes');

const getImportInsertIndex = require('../insertIndexFinders/actionTypesIndexJsImport');
const getImportInsertString = require('../insertStrings/actionTypesIndexJsImport');
const getExportInsertIndex = require('../insertIndexFinders/actionTypesIndexJsExport');
const getExportInsertString = require('../insertStrings/actionTypesIndexJsExport');

function extractActionTypesFromString(str) {
    return splitAndTrim(str, ',').map(at => at.toUpperCase());
}

function addImportAndExportToIndexJs(context, actionTypeName, actionTypesPath) {
    const filePath = path.resolve(actionTypesPath, 'index.js');
    const file = context.fs.read(filePath);

    let newFile = addImportToIndexJs(file, context, actionTypeName);
    newFile = addExportToIndexJs(newFile, context, actionTypeName);

    context.fs.write(filePath, newFile);
}

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

module.exports = function (context, config) {
    if (!context) {
        return null;
    }

    const { props, fs } = context;

    const actionTypesPath = getConfigValueAndLog(
        context,
        config,
        'actionTypesPath',
        'Action types path',
    );

    const destinationPath = path.resolve(
        actionTypesPath,
        `${props.actionTypesName}${postfixes.actionTypesPostfix}.js`,
    );

    logWriting(context, 'action types', destinationPath);

    const actionTypes = extractActionTypesFromString(props.actionTypes);

    fs.copyTpl(
        context.templatePath('actionTypes.js'),
        context.destinationPath(destinationPath),
        { actionTypes },
    );

    addImportAndExportToIndexJs(context, props.actionTypesName, actionTypesPath);
}
