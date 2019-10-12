import {JSONFormatConverter} from "./Converter";
import {format} from "./format";
import {SETTINGS} from "../../settings/ApplicationSettings";

export class KerasToCanonicalConverter extends JSONFormatConverter{


    constructor(){
        super();
    }

    /**
     * Converting JSON model
     * @param kerasModel
     * @returns {{layers: Array}}
     */
    convert(kerasModel) {
        const kerasModelConfig = kerasModel.modelTopology.model_config;
        const kerasTrainingConfig = kerasModel.modelTopology.training_config;

        let model={
            layers: []
        };

        if (kerasModelConfig.class_name !== format.modelConfigClassName) {
            throw new Error("This model class name is not serviced!");
        }

        model = {
            ...model,
            optimizer: kerasTrainingConfig.optimizer_config.class_name.toLowerCase(),
            loss: kerasTrainingConfig.loss.toLowerCase(),
            metrics: kerasTrainingConfig.metrics

        };
        const layerConfig = kerasModelConfig.config;
        const length = layerConfig.length;
        for (let i = 0; i < length; i++) {
            const kerasLayer = layerConfig[i];

            // If we encounter first model's layer we add an additinal input layer(In the keras model the first hidden layer has information about input layer's dimension
            if(i === 0){
                let inputLayer = {
                    index: i,
                    name: kerasLayer.config.name,
                    type: SETTINGS.model.layerTypes.INPUT,
                    classType: SETTINGS.model.layerClassTypes.NONE,
                    activation: SETTINGS.model.layerActivations.NONE,
                    nodesNumber: kerasLayer.config.batch_input_shape[1]
                };
                model.layers.push(inputLayer);
            }

            let layer = {
                index: i+1,
                name: 'dense_0',
                type: (i === length - 1) ? SETTINGS.model.layerTypes.OUTPUT : SETTINGS.model.layerTypes.HIDDEN,
                classType: kerasLayer.class_name.toLowerCase(),
                activation: kerasLayer.config.activation,
                nodesNumber: kerasLayer.config.units
            };
            model.layers.push(layer);
        }
        return model;
    }
}