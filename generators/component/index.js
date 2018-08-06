'use strict';
const Generator = require('yeoman-generator');

const { componentPrompts, actionTypesPrompts } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getComponentConfigValues = require('../../configValuesExtractors/componentConfigValuesExtractor');
const getContainerConfigValues = require('../../configValuesExtractors/containerConfigValuesExtractor');
const getActionTypesConfigValues = require('../../configValuesExtractors/actionTypesConfigValuesExtractor');

const writeComponent = require('../../writers/componentWriter');
const writeContainer = require('../../writers/containerWriter');
const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const componentAnswers = await this.prompt(componentPrompts);
        this.props = { ...this.props, ...componentAnswers };
        if (this.props.actionTypesAreNeeded) {
            const actionTypesAnswers = await this.prompt(actionTypesPrompts);
            this.props = { ...this.props, ...actionTypesAnswers };
        }
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const componentConfigValues = getComponentConfigValues(this, generatorConfig);

        writeComponent(this, componentConfigValues);

        if (this.props.containerIsNeeded) {
            const containerConfigValues = getContainerConfigValues(this, generatorConfig);

            writeContainer(this, containerConfigValues);
        }

        if (this.props.actionTypesAreNeeded) {
            const actionTypesConfigValues = getActionTypesConfigValues(this, generatorConfig); 

            writeActionTypes(this, actionTypesConfigValues);
            overwriteActionTypes(this, this.props.actionName, actionTypesConfigValues);
        }
    }
};
