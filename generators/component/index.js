'use strict';
const Generator = require('yeoman-generator');

const prompts = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');

const writeComponent = require('../../writers/componentWriter');
const writeContainer = require('../../writers/containerWriter');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(prompts.componentPrompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);

        writeComponent(this, generatorConfig);
        if (this.props.containerIsNeeded) {
            writeContainer(this, generatorConfig);
        }
    }
};
