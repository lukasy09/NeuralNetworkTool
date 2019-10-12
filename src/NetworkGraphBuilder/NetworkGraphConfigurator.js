import {SETTINGS} from "../settings/ApplicationSettings";
import cytoscape from "cytoscape";

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

    static commonConfig = {
        // initial viewport state:
        zoom: 1,
        pan: { x: 0, y: 0 },

        // interaction options:
        minZoom: 0.2,
        maxZoom: 7,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true,
        boxSelectionEnabled: true,
        selectionType: 'single',
        touchTapThreshold: 8,
        desktopTapThreshold: 4,
        autolock: false,
        autoungrabify: false,
        autounselectify: false,

        // rendering options:
        headless: false,
        styleEnabled: true,
        hideEdgesOnViewport: false,
        hideLabelsOnViewport: false,
        textureOnViewport: false,
        motionBlur: false,
        motionBlurOpacity: 0.2,
        //wheelSensitivity: 1,
        pixelRatio: 'auto'
    };

    static layoutConfig = {
        name: "cose",
        padding: 60,
        gravity: 12,
    };


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

    static initializeCytoObject = (graphContainer) => {
        return cytoscape({
            container: graphContainer, // Graph container. All the stuff is rendereing inside.
            style: NetworkGraphConfigurator.getGraphStyleConfiguration(),
            layout: NetworkGraphConfigurator.getGraphLayoutConfiguration(),
            ...NetworkGraphConfigurator.getcommonConfiguration()
        });
    };


    /**
     * Storing common (nodes') styles
     * @returns {{color: string, borderWidth: string, borderColor: string, backgroundFit: string, backgroundImageOpacity: number}}
     */
    static getCommonStyles() {
        return {
            color: 'black',
            borderWidth: '1px',
            borderColor: 'black',
            backgroundFit: "contain"
        }
    }


    static getGraphLayoutConfiguration() {
        return this.layoutConfig;
    }

    static getcommonConfiguration(){
        return this.commonConfig;
    }
}
