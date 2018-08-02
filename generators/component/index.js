'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

const prompts = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const defaultConfigValues = require('../../constants/defaultConfigValues');
const containerPostfix = require('../../constants/containerPostfix');

const writeComponent = require('../../writers/componentWriter');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);

        writeComponent(this, generatorConfig);
        if (this.props.containerIsNeeded) {
            this._writeContainer(generatorConfig);
        }
    }

    _writeContainer(generatorConfig) {
        const containersPath = this._getConfigValueAndLog(
            generatorConfig,
            'containersPath',
            'Containers path',
        );

        const importComponentsPath = this._getConfigValueAndLog(
            generatorConfig,
            'importComponentsPath',
            'Import components path',
        );
        
        const destinationPath = path.resolve(
            containersPath,
            `${this.props.componentName}${containerPostfix}.js`,
        );

        this.log(`Writing container to ${chalk.green(destinationPath)}...`);

        this.fs.copyTpl(
            this.templatePath('container.js'),
            this.destinationPath(destinationPath),
            Object.assign({}, this.props, { importComponentsPath }),
        );
    }

    _getConfigValueAndLog(generatorConfig, key, caption) {
        let value = defaultConfigValues[key];

        if (!generatorConfig || !generatorConfig[key]) {
            this.log(`${caption} is ${chalk.red('not')} specified, using default '${value}'`);
        } else {
            value = generatorConfig[key];
            this.log(`${caption} is detected: ${chalk.green(value)}`)
        }

        return value;
    }
};
