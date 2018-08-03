'use strict';
const Generator = require('yeoman-generator');

const { componentPrompts } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const getComponentConfigValues = require('../../configValuesExctractors/componentConfigValuesExtractor');
const getContainerConfigValues = require('../../configValuesExctractors/containerConfigValuesExtractor');

const writeComponent = require('../../writers/componentWriter');
const writeContainer = require('../../writers/containerWriter');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(componentPrompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);
        const configValues = Object.assign(
            {},
            getComponentConfigValues(this, generatorConfig),
            getContainerConfigValues(this, generatorConfig),
        );

        writeComponent(this, configValues);
        if (this.props.containerIsNeeded) {
            writeContainer(this, configValues);
        }
    }
};
