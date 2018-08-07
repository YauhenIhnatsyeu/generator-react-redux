const listPromptFilter = require('../promptsFilters/listPromptFilter');
const actionCreatorsPromptFilter = require('../promptsFilters/actionCreatorsPromptFilter');

const componentNamePrompt = {
    type: 'input',
    name: 'componentName',
    message: 'What\'s the name of your component?',
    default: 'App',
};

const actionNamePrompt = {
    type: 'input',
    name: 'actionName',
    message: 'What\'s your action name',
    default: 'app',
};

const containerIsNeededPrompt = 
{
    type: 'confirm',
    name: 'containerIsNeeded',
    message: 'Do you need a container?',
    default: false,
};

const actionTypesAreNeededPrompt = {
    type: 'confirm',
    name: 'actionTypesAreNeeded',
    message: 'Do you need action types?',
    default: false,
};

const actionCreatorsAreNeededPrompt = {
    type: 'confirm',
    name: 'actionCreatorsAreNeeded',
    message: 'Do you need action creators?',
    default: false,
};

const actionCreatorsPromptsWithoutNameAsking = [
    {
        type: 'input',
        name: 'actionCreators',
        message: 'List all action creators respectively to action types',
        default: '',
        filter: listPromptFilter,
    },
];

const actionCreatorsPromptsWithNameAsking = [
    actionNamePrompt,
    ...actionCreatorsPromptsWithoutNameAsking,
];

const actionTypesPrompts = [
    actionNamePrompt,
    {
        type: 'input',
        name: 'actionTypes',
        message: 'List all action types',
        default: '',
        filter: actionCreatorsPromptFilter,
    },
];

const containerPrompts = [
    componentNamePrompt,
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
];

module.exports = {
    componentPrompts,
    containerPrompts,
    actionTypesPrompts,
    actionCreatorsPromptsWithNameAsking,
    actionCreatorsPromptsWithoutNameAsking,

    containerIsNeededPrompt,
    actionTypesAreNeededPrompt,
    actionCreatorsAreNeededPrompt,
};
