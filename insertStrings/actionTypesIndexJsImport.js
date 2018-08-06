module.exports = function(actionTypeName) {
    return `\nimport ${actionTypeName} from "./${actionTypeName}";`
}
