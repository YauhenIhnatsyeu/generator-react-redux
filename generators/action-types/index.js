'use strict';
const Generator = require('yeoman-generator');

const prompts = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');

const writeActionTypes = require('../../writers/actionTypesWriter');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(prompts.actionTypesPrompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);

        writeActionTypes(this, generatorConfig);
    }
};
