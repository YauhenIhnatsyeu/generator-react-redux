module.exports = function(fullActionTypeName) {
    return `import ${fullActionTypeName} from "./${fullActionTypeName}";`
}
