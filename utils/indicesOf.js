module.exports = function (array, value) {
    const result = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            result.push(i);
        }
    }

    return result;
}
