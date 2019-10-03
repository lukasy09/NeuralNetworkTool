import {SETTINGS} from "../../settings/ApplicationSettings";

/**
 * The class is to validate the correctness of the built model.
 */
export class ModelValidator {

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

    static filterActivationsByLayerType(type, activations){
        const OUTPUT = SETTINGS.model.layerTypes.OUTPUT;
        const INPUT = SETTINGS.model.layerTypes.INPUT;
        const NONE = SETTINGS.model.layerActivations.NONE;

        if(type === OUTPUT || type === INPUT){
            return [NONE];
        }
        return activations;
    }
}
