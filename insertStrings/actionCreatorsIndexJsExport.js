module.exports = function(actionCreators, actionCreatorsName) {
    const firstPart = '\n\nexport {';
    const secondPart = actionCreators.map(ac => `\n\t${ac},`).join('');
    const thirdPart = `\n} from "./${actionCreatorsName}";`;

    return firstPart + secondPart + thirdPart;
}
