'use strict';
const Generator = require('yeoman-generator');

const { actionCreatorsPromptsWithNameAsking } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getActionCreatorsConfigValues = require('../../configValuesExtractors/actionCreatorsConfigValuesExtractor');

const writeActionCreators = require('../../writers/actionCreatorsWriter');
const overwriteActionCreators = require('../../overwriters/actionCreatorsOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const actionCreatorsAnswers = await this.prompt(actionCreatorsPromptsWithNameAsking);
        this.props = { ...this.props, ...actionCreatorsAnswers };
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const actionCreatorsConfigValues = getActionCreatorsConfigValues(this, generatorConfig); 

        writeActionCreators(this, actionCreatorsConfigValues);
        overwriteActionCreators(this, actionCreatorsConfigValues);
    }
};
