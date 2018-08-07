'use strict';
const Generator = require('yeoman-generator');

const {
    containerPrompts,
    actionTypesAreNeededPrompt,
    actionTypesPrompts,
    actionCreatorsAreNeededPrompt,
    actionCreatorsPromptsWithNameAsking,
    actionCreatorsPromptsWithoutNameAsking,
} = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getContainerConfigValues = require('../../configValuesExtractors/containerConfigValuesExtractor');
const getActionTypesConfigValues = require('../../configValuesExtractors/actionTypesConfigValuesExtractor');
const getActionCreatorsConfigValues = require('../../configValuesExtractors/actionCreatorsConfigValuesExtractor');

const writeContainer = require('../../writers/containerWriter');
const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');
const writeActionCreators = require('../../writers/actionCreatorsWriter');
const overwriteActionCreators = require('../../overwriters/actionCreatorsOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const containerAnswers = await this.prompt(containerPrompts);
        this.props = { ...this.props, ...containerAnswers };
        
        const { actionTypesAreNeeded } = await this.prompt(actionTypesAreNeededPrompt);

        if (actionTypesAreNeeded) {
            const actionTypesAnswers = await this.prompt(actionTypesPrompts);
            this.props = { ...this.props, actionTypesAreNeeded, ...actionTypesAnswers };
        }

        const { actionCreatorsAreNeeded } = await this.prompt(actionCreatorsAreNeededPrompt);
        
        if (actionCreatorsAreNeeded) {
            const actionCreatorsAnswers = await this.prompt(actionTypesAreNeeded
                ? actionCreatorsPromptsWithoutNameAsking
                : actionCreatorsPromptsWithNameAsking);
            this.props = { ...this.props, actionCreatorsAreNeeded, ...actionCreatorsAnswers };
        }
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const containerConfigValues = getContainerConfigValues(this, generatorConfig);

        writeContainer(this, containerConfigValues);

        if (this.props.actionTypesAreNeeded) {
            const actionTypesConfigValues = getActionTypesConfigValues(this, generatorConfig); 

            writeActionTypes(this, actionTypesConfigValues);
            overwriteActionTypes(this, actionTypesConfigValues);
        }
        
        if (this.props.actionCreatorsAreNeeded) {
            const actionCreatorsConfigValues = getActionCreatorsConfigValues(this, generatorConfig); 

            writeContainer(this, containerConfigValues);
            writeActionCreators(this, actionCreatorsConfigValues);
            overwriteActionCreators(this, actionCreatorsConfigValues);
        }
    }
};
