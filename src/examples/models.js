export const TEST_MODEL = {
    name: 'my-project',

    optimizer: 'rmsprop',
    loss: 'categorical_crossentropy',
    metrics: ['accuracy'],

    layers: [
        {
            index: 0,
            name: 'Layer 0',
            type: 'input',
            classType: 'dense',
            activation: null,
            nodesNumber: 8
        },
        {
            index: 1,
            name: 'Layer 1',
            type: 'hidden',
            classType: 'dense',
            activation: 'relu',
            nodesNumber: 5
        },
        {
            index: 2,
            name: 'Layer 2',
            type: 'output',
            classType: 'dense',
            activation: null,
            nodesNumber: 2
        },
    ]
};