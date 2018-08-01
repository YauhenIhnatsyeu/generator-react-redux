'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

const prompts = require('../../constants/prompts');
const getGeneratorConfig = require('../../helpers/getGeneratorConfig');
const defaultConfigValues = require('../../constants/defaultConfigValues');
const containerPostfix = require('../../constants/containerPostfix');

module.exports = class extends Generator {
    prompting() {
		return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        const generatorConfig = getGeneratorConfig(this);

        this._writeComponent(generatorConfig);
        if (this.props.containerIsNeeded) {
            this._writeContainer(generatorConfig);
        }
    }

    _writeComponent(generatorConfig) {
        const componentsPath = this._getConfigValueAndLog(
            generatorConfig,
            'componentsPath',
            'Components path',
        );

        const destinationPath = path.resolve(
            componentsPath,
            this.props.completedComponentPath,
            this.props.componentName,
        );

        this.log(`Writing component to ${chalk.green(destinationPath)}...`);

        this.fs.copyTpl(
            this.templatePath('component'),
            this.destinationPath(destinationPath),
            this.props,
        );

        if (this.props.indexCssIsNeeded) {
            this.fs.write(path.resolve(destinationPath, 'index.css'), '');
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
