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

function addImportToIndexJs(context, actionTypeName, actionTypesPath) {
    const filePath = path.resolve(actionTypesPath, 'index.js');
    const file = context.fs.read(filePath);
    const indicesOfSemiColumns = indicesOf(file, ';');
    const fullActionTypeName = actionTypeName + postfixes.actionTypesPostfix;
    const importString = `import ${fullActionTypeName} from "./${fullActionTypeName}";`;
    let newFile = file;

    if (indicesOfSemiColumns.length < 1) {
        context.log('Cannot add import of action type to index.js');
    } else if (indicesOfSemiColumns.length === 1) {
        newFile = importString + newFile;
    } else {
        const penultimateIndexOfSemiColumn = indicesOfSemiColumns[indicesOfSemiColumns.length - 2];
        newFile = insertIntoString(
            newFile,
            penultimateIndexOfSemiColumn + 1,
            `\n${importString}`,
        );
    }

    context.fs.write(filePath, newFile);
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

    addImportToIndexJs(context, props.actionTypesName, actionTypesPath);
}
