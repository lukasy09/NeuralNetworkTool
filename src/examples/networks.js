
/*
    From here we can import some test networks for development purposes.
 */
const COMPLICATED_NETWORK = {
    layers:[
        {
            type: "input",
            nodesNumber: 10,
            index: 0
        },
        {
            type: "hidden",
            nodesNumber: 7,
            index: 1
        },
        {
            type: "hidden",
            nodesNumber: 8,
            index: 2
        },
        {
            type: "hidden",
            nodesNumber: 8,
            index: 3
        },
        {
            type: "hidden",
            nodesNumber: 9,
            index: 4
        },
        {
            type: "hidden",
            nodesNumber: 6,
            index: 5
        },
        {
            type: "output",
            nodesNumber: 3,
            index: 6
        }
    ]
};

const SIMPLE_NETWORK = {
    layers:[
        {
            type: "input",
            nodesNumber: 5,
            index: 0
        },
        {
            type: "hidden",
            nodesNumber: 5,
            index: 1
        },
        {
            type: "hidden",
            nodesNumber: 4,
            index: 2
        },
        {
            type: "output",
            nodesNumber: 2,
            index: 3
        }
    ]
};


export const TEST_NETWORK = SIMPLE_NETWORK;