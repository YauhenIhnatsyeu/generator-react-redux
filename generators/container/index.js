'use strict';
const Generator = require('yeoman-generator');

const { containerPrompts } = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');

const writeContainer = require('../../writers/containerWriter');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(containerPrompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);

        writeContainer(this, generatorConfig);
    }
};
