'use strict';
const Generator = require('yeoman-generator');

const { actionTypesPrompts, actionCreatorsPromptsWithoutNameAsking } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getActionTypesConfigValues = require('../../configValuesExtractors/actionTypesConfigValuesExtractor');
const getActionCreatorsConfigValues = require('../../configValuesExtractors/actionCreatorsConfigValuesExtractor');

const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');
const writeActionCreators = require('../../writers/actionCreatorsWriter');
const overwriteActionCreators = require('../../overwriters/actionCreatorsOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const actionTypesAnswers = await this.prompt(actionTypesPrompts);
        this.props = { ...this.props, ...actionTypesAnswers };
        
        if (this.props.actionCreatorsAreNeeded) {
            const actionCreatorsAnswers = await this.prompt(actionCreatorsPromptsWithoutNameAsking);
            this.props = { ...this.props, ...actionCreatorsAnswers };
        }
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const actionTypesConfigValues = getActionTypesConfigValues(this, generatorConfig); 

        writeActionTypes(this, actionTypesConfigValues);
        overwriteActionTypes(this, actionTypesConfigValues);
        
        if (this.props.actionCreatorsAreNeeded) {
            const actionCreatorsConfigValues = getActionCreatorsConfigValues(this, generatorConfig); 

            writeActionCreators(this, actionCreatorsConfigValues);
            overwriteActionCreators(this, actionCreatorsConfigValues);
        }
    }
};
