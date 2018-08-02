const componentNamePrompt = {
    type: 'input',
    name: 'componentName',
    message: 'What\'s the name of your component?',
    default: 'App',
};

const componentPrompts = [
    {
        type: 'input',
        name: 'completedComponentPath',
        message: 'Complete component path (relative to default)',
        default: '',
    },
    componentNamePrompt,
    {
        type: 'confirm',
        name: 'stateIsNeeded',
        message: 'Do you need a state?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'indexCssIsNeeded',
        message: 'Do you need an index.css?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'containerIsNeeded',
        message: 'Do you need a container?',
        default: false,
    },
];

const containerPrompts = [
    componentNamePrompt,
];

module.exports = {
    componentPrompts,
    containerPrompts,
};
