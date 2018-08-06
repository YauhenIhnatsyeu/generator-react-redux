'use strict';
const Generator = require('yeoman-generator');

const { containerPrompts, actionTypesPrompts } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getContainerConfigValues = require('../../configValuesExtractors/containerConfigValuesExtractor');
const getActionTypesConfigValues = require('../../configValuesExtractors/actionTypesConfigValuesExtractor');

const writeContainer = require('../../writers/containerWriter');
const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');

module.exports = class extends Generator {
    async prompting() {
        const containerAnswers = await this.prompt(containerPrompts);
        this.props = { ...this.props, ...containerAnswers };
        if (this.props.actionTypesAreNeeded) {
            const actionTypesAnswers = await this.prompt(actionTypesPrompts);
            this.props = { ...this.props, ...actionTypesAnswers };
        }
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const containerConfigValues = getContainerConfigValues(this, generatorConfig);

        writeContainer(this, containerConfigValues);

        if (this.props.actionTypesAreNeeded) {
            const actionTypesConfigValues = getActionTypesConfigValues(this, generatorConfig); 

            writeActionTypes(this, actionTypesConfigValues);
            overwriteActionTypes(this, this.props.actionTypesName, actionTypesConfigValues);
        }
    }
};
