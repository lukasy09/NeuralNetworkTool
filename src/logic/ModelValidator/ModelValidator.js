import {SETTINGS} from "../../settings/ApplicationSettings";


const WRONG_INPUT_LAYER = "Wrong input layer!";
const WRONG_OUTPUT_LAYER = "Wrong output layer!";

const WRONG_ACTIVATION_INPUT = "Input layer cannot have specified activation function";
const WRONG_ACTIVATION_OUTPUT = "Output layer cannot have specified activation function";

/**
 * The class is to validate the correctness of the built model.
 */
export class ModelValidator {

    outputInfo = [];

    /**
     * Filtering the remaining layer types.
     * e.g If a network has already an input layer, we don't want to let user create another one.
     * Same with the network already having output layer.
     * @param currentLayers
     * @returns {*}
     */
    static filterOpenLayerTypes = (currentLayers) => {
        const INPUT = SETTINGS.model.layerTypes.INPUT;
        const HIDDEN = SETTINGS.model.layerTypes.HIDDEN;
        const OUTPUT = SETTINGS.model.layerTypes.OUTPUT;

        if (currentLayers.length === 0) {
            return [INPUT]
        } else {

            for (let i = 0; i < currentLayers.length; i++) {
                if (currentLayers[i].type === OUTPUT) {
                    return [];
                }
            }
            return [HIDDEN, OUTPUT]
        }
    };

    static filterActivationsByLayerType(type, activations) {
        const OUTPUT = SETTINGS.model.layerTypes.OUTPUT;
        const INPUT = SETTINGS.model.layerTypes.INPUT;
        const NONE = SETTINGS.model.layerActivations.NONE;

        if (type === OUTPUT || type === INPUT) {
            return [NONE];
        }
        return activations;
    }

    /**
     * Validating method - checking if created model(by user) has a correct structure.
     * e.g Does the model have only a single input layer?
     * @param model
     */

    validateModel(model) {
        const OUTPUT = SETTINGS.model.layerTypes.OUTPUT;
        const INPUT = SETTINGS.model.layerTypes.INPUT;
        const NONE = SETTINGS.model.layerActivations.NONE;

        const layers = model.layers;
        const length = layers.length;

        if (this.checkLayerType(layers[0], INPUT)) {
            this.outputInfo.push(WRONG_INPUT_LAYER);
        }
        if (this.checkLayerType(layers[layers.length - 1], OUTPUT)) {
            this.outputInfo.push(WRONG_OUTPUT_LAYER);
        }

        for (let i = 0; i < length; i++) {
            const layer = layers[i];
            if(layer.type === INPUT && layer.activation !== NONE){
                this.outputInfo.push(WRONG_ACTIVATION_INPUT);
                continue;
            }
            if(layer.type === OUTPUT && layer.activation !== NONE){
                this.outputInfo.push(WRONG_ACTIVATION_OUTPUT);
            }
        }
        return this.outputInfo.length === 0;
    }

    static checkLayerType(layer, type) {
        return layer.type === type;
    }


}
