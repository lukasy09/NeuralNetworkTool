import {SETTINGS} from "../settings/ApplicationSettings";

const ELEMENT_TYPES = {
    NODE: "node",
    EDGE: "edge"
};

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
                css: {
                    'background-color': '#f1f1f1',
                    ...NetworkGraphConfigurator.getCommonStyles()
                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[inLayerType = '${INPUT}']`,
                css: {
                    'background-color': '#ff471a',
                    ...NetworkGraphConfigurator.getCommonStyles()
                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[inLayerType = '${HIDDEN}']`,
                css: {
                    'background-color': '#0066ff',
                    ...NetworkGraphConfigurator.getCommonStyles()

                }
            },
            {
                selector: `${ELEMENT_TYPES.NODE}node[inLayerType = '${OUTPUT}']`,
                css: {
                    'background-color': '#f1f1f1',
                    ...NetworkGraphConfigurator.getCommonStyles()


                }
            }
        ]

    }


    /**
     * Storing common (nodes') styles
     * @returns {{color: string, borderWidth: string, borderColor: string}}
     */
    static getCommonStyles(){
        return{
            color: 'black',
            borderWidth: '1px',
            borderColor: 'black'
        }

    }
}