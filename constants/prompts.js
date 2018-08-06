const actionCreatorsPromptsWithoutNameAsking = [
    {
        type: 'input',
        name: 'actionCreators',
        message: 'List all action creators respectively to action types',
        default: '',
    },
];

const actionCreatorsPromptsWithNameAsking = [
    actionNamePrompt,
    actionCreatorsPromptsWithoutNameAsking,
];

const actionTypesPrompts = [
    actionNamePrompt,
    {
        type: 'input',
        name: 'actionTypes',
        message: 'List all action types',
        default: '',
    },
];

const componentNamePrompt = {
    type: 'input',
    name: 'componentName',
    message: 'What\'s the name of your component?',
    default: 'App',
};

const actionTypesAreNeededPrompt = {
    type: 'confirm',
    name: 'actionTypesAreNeeded',
    message: 'Do you need action types?',
    default: false,
};

const actionNamePrompt = {
    type: 'input',
    name: 'actionName',
    message: 'What\'s your action name',
    default: 'app',
};

const containerPrompts = [
    componentNamePrompt,
    actionTypesAreNeededPrompt,
];

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
    actionTypesAreNeededPrompt,
];

module.exports = {
    componentPrompts,
    containerPrompts,
    actionTypesPrompts,
    actionCreatorsPromptsWithNameAsking,
    actionCreatorsPromptsWithoutNameAsking,
};
