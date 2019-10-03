import {SETTINGS} from "../../settings/ApplicationSettings";
import {DataGenerator} from "../DataGenerator/DataGenerator";
import{relu} from "../Activations/relu";
import {sigmoid} from "../Activations/sigmoid";
import {none} from "../Activations/none";

export class DataGeneratorUtil{
    static getGeneratorByActivation(activation){
        switch (activation){
            case SETTINGS.model.layerActivations.RELU:
                return new DataGenerator(relu);
            case SETTINGS.model.layerActivations.SIGMOID:
                return new DataGenerator(sigmoid);
            case SETTINGS.model.layerActivations.NONE:
                return new DataGenerator(none);
            // Maybe in the future we will  add some visualisation of that activation type
            case SETTINGS.model.layerActivations.SOFTMAX:
                return;
            default:
                return;
        }
    }
}