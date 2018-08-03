'use strict';
const Generator = require('yeoman-generator');

const { actionTypesPrompts } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getConfigValues = require('../../configValuesExctractors/actionTypesConfigValuesExtractor');

const writeActionTypes = require('../../writers/actionTypesWriter');
const overwriteActionTypes = require('../../overwriters/actionTypesOverwriter');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(actionTypesPrompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const configValues = getConfigValues(this, generatorConfig);

        writeActionTypes(this, configValues);
        overwriteActionTypes(this, this.props.actionTypesName, configValues);
    }
};
