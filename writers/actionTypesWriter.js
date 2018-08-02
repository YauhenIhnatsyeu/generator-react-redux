const path = require('path');

const splitAndTrim = require('../utils/splitAndTrim');
const indicesOf = require('../utils/indicesOf');
const insertIntoString = require('../utils/insertIntoString');

const getConfigValueAndLog = require('../helpers/getConfigValueAndLog');
const logWriting = require('../helpers/logWriting');
const postfixes = require('../constants/postfixes');

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
    const indicesOfSemiColumns = indicesOf(file, ';');
    const fullActionTypeName = actionTypeName + postfixes.actionTypesPostfix;
    const importString = `import ${fullActionTypeName} from "./${fullActionTypeName}";`;

    if (indicesOfSemiColumns.length < 1) {
        context.log('Cannot add import of action type to index.js');
    } else if (indicesOfSemiColumns.length === 1) {
        newFile = importString + file;
    } else {
        const penultimateIndexOfSemiColumn = indicesOfSemiColumns[indicesOfSemiColumns.length - 2];
        newFile = insertIntoString(
            file,
            penultimateIndexOfSemiColumn + 1,
            `\n${importString}`,
        );
    }

    return newFile;
}

function addExportToIndexJs(file, context, actionTypeName) {
    const indicesOfCommas = indicesOf(file, ',');
    const fullActionTypeName = actionTypeName + postfixes.actionTypesPostfix;
    const exportString = `${fullActionTypeName},`;

    if (indicesOfCommas.length < 1) {
        context.log('Cannot add export of action type to index.js');
    } else {
        const lastIndexOfСommas = indicesOfCommas[indicesOfCommas.length - 1];
        newFile = insertIntoString(
            file,
            lastIndexOfСommas + 1,
            `\n\t${exportString}`,
        );
    }

    return newFile;
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
