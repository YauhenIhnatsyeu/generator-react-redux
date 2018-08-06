'use strict';
const Generator = require('yeoman-generator');

const { actionTypesPrompts } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getActionTypesConfigValues = require('../../configValuesExtractors/actionTypesConfigValuesExtractor');

const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const actionTypesAnswers = await this.prompt(actionTypesPrompts);
        this.props = { ...this.props, ...actionTypesAnswers };
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const actionTypesConfigValues = getActionTypesConfigValues(this, generatorConfig); 

        writeActionTypes(this, actionTypesConfigValues);
        overwriteActionTypes(this, this.props.actionName, actionTypesConfigValues);
    }
};
