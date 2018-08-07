'use strict';
const Generator = require('yeoman-generator');

const {
    componentPrompts,
    actionTypesPrompts,
    actionCreatorsPromptsWithoutNameAsking,
} = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getComponentConfigValues = require('../../configValuesExtractors/componentConfigValuesExtractor');
const getContainerConfigValues = require('../../configValuesExtractors/containerConfigValuesExtractor');
const getActionTypesConfigValues = require('../../configValuesExtractors/actionTypesConfigValuesExtractor');
const getActionCreatorsConfigValues = require('../../configValuesExtractors/actionCreatorsConfigValuesExtractor');

const writeComponent = require('../../writers/componentWriter');
const writeContainer = require('../../writers/containerWriter');
const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');
const writeActionCreators = require('../../writers/actionCreatorsWriter');
const overwriteActionCreators = require('../../overwriters/actionCreatorsOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const componentAnswers = await this.prompt(componentPrompts);
        this.props = { ...this.props, ...componentAnswers };
        
        if (this.props.actionTypesAreNeeded) {
            const actionTypesAnswers = await this.prompt(actionTypesPrompts);
            this.props = { ...this.props, ...actionTypesAnswers };
        }
        
        if (this.props.actionCreatorsAreNeeded) {
            const actionCreatorsAnswers = await this.prompt(actionCreatorsPromptsWithoutNameAsking);
            this.props = { ...this.props, ...actionCreatorsAnswers };
        }
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const componentConfigValues = getComponentConfigValues(this, generatorConfig);
        let containerConfigValues;

        writeComponent(this, componentConfigValues);

        if (this.props.containerIsNeeded) {
            containerConfigValues = getContainerConfigValues(this, generatorConfig);

            writeContainer(this, containerConfigValues);
        }

        if (this.props.actionTypesAreNeeded) {
            const actionTypesConfigValues = getActionTypesConfigValues(this, generatorConfig); 

            writeActionTypes(this, actionTypesConfigValues);
            overwriteActionTypes(this, actionTypesConfigValues);
        }
        
        if (this.props.actionCreatorsAreNeeded) {
            const actionCreatorsConfigValues = getActionCreatorsConfigValues(this, generatorConfig); 

            if (this.props.containerIsNeeded) {
                writeContainer(this, containerConfigValues);
            }

            writeActionCreators(this, actionCreatorsConfigValues);
            overwriteActionCreators(this, actionCreatorsConfigValues);
        }
    }
};
