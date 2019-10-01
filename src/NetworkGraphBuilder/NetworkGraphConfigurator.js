import {SETTINGS} from "../settings/ApplicationSettings";

const ELEMENT_TYPES = {
    NODE: "node",
    EDGE: "edge"
};

const ACTIVATION_TYPES = {
    RELU: SETTINGS.model.layerActivations.RELU,
    SIGMOID: SETTINGS.model.layerActivations.SIGMOID,
    SOFTMAX: SETTINGS.model.layerActivations.SOFTMAX
};

const RELU_RESOURCE = "http://i.imgur.com/6K4n9mZ.png";
const SIGMOID_RESOURCE = "http://i.imgur.com/sbTRr0E.png";

export class NetworkGraphConfigurator {

    /**
     * Returns default styles configuration for graph's nodes/edges depending on the layer type
     * @returns {*[]}
     */
    static getGraphStyleConfiguration() {
        const INPUT = SETTINGS.model.layerTypes.INPUT;
        const HIDDEN = SETTINGS.model.layerTypes.HIDDEN;
        const OUTPUT = SETTINGS.model.layerTypes.OUTPUT;
        return [
            {
                selector: ELEMENT_TYPES.NODE,
                css: {
                    //'content': 'data(id)', // Uncomment if you want to see node's label
                    ...NetworkGraphConfigurator.getCommonStyles()
                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[inLayerType = '${INPUT}']`,
                css: {
                    'background-color': '#99ff99',
                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[inLayerType = '${HIDDEN}']`,
                css: {
                    'background-color': '#0066ff',

                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[inLayerType = '${OUTPUT}']`,
                css: {
                    'background-color': '#f1f1f1',
                },

            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[activation = '${ACTIVATION_TYPES.RELU}']`,
                css: {
                    backgroundImage: RELU_RESOURCE,
                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[activation = '${ACTIVATION_TYPES.SIGMOID}']`,
                css: {
                    backgroundImage: SIGMOID_RESOURCE,
                }
            },
        ]

    }


    /**
     * Storing common (nodes') styles
     * @returns {{color: string, borderWidth: string, borderColor: string, backgroundFit: string, backgroundImageOpacity: number}}
     */
    static getCommonStyles(){
        return{
            color: 'black',
            borderWidth: '1px',
            borderColor: 'black',
            backgroundFit: "contain",
        }
    }
}
