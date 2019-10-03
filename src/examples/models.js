export const TEST_MODEL = {
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
            activation: 'sigmoid',
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