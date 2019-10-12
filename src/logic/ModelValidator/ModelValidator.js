import {SETTINGS} from "../../settings/ApplicationSettings";
import {ALERT_STATUS} from "./ValidationStatus";

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
     * @TODO Split code into many shorter parts
     * @param layers
     */

    validateModelLayers(layers) {
        this.outputInfo = [];
        const OUTPUT = SETTINGS.model.layerTypes.OUTPUT;
        const INPUT = SETTINGS.model.layerTypes.INPUT;
        const NONE = SETTINGS.model.layerActivations.NONE;
        const length = layers.length;

        if (length > 0) {
            // Checking if the first layer has type 'input'
            if (!ModelValidator.checkLayerType(layers[0], INPUT)) {
                this.outputInfo.push(ALERT_STATUS.order.input);
            }
            // Checking if the last layer has type 'output'
            if (!ModelValidator.checkLayerType(layers[layers.length - 1], OUTPUT)) {
                this.outputInfo.push(ALERT_STATUS.order.output);
            }

            // Checking the correctness of activation function binding
            for (let i = 0; i < length; i++) {
                const layer = layers[i];
                if (layer.type === INPUT && layer.activation !== NONE) {
                    this.outputInfo.push(ALERT_STATUS.feature.input.activation);
                }
            }

            //Warnings
            if (layers[0].nodesNumber === 1) {
                this.outputInfo.push(ALERT_STATUS.count.input);
            }
        }

        return (this.outputInfo.length === 0);
    }

    getAlerts = () => {
        return this.outputInfo;
    };

    static checkLayerType(layer, type) {
        return layer.type === type;
    }


}
