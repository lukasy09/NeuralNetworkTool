import {SETTINGS} from "../../settings/ApplicationSettings";
import {DataGenerator} from "../DataGenerator/DataGenerator";

import {none} from "../Activations/none";
import{relu} from "../Activations/relu";
import {sigmoid} from "../Activations/sigmoid";
import{softmax} from "../Activations/softmax";

export class DataGeneratorUtil{
    static getGeneratorByActivation(activation){
        switch (activation){
            case SETTINGS.model.layerActivations.NONE:
                return new DataGenerator(none);
            case SETTINGS.model.layerActivations.RELU:
                return new DataGenerator(relu);
            case SETTINGS.model.layerActivations.SIGMOID:
                return new DataGenerator(sigmoid);
            case SETTINGS.model.layerActivations.SOFTMAX:
                return new DataGenerator(softmax);
            default:
                return;
        }
    }

    /**
     * Filling list with numbers from a given range.
     * Used by softmax activation function.
     * @param options
     * @returns {Array}
     */
    static fillList(options){
        let output = [];
        for(let i = options.from; i <= options.to; i++){
            output.push(i);
        }
        return output;
    }
}