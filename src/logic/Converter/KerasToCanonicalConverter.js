import {JSONFormatConverter} from "./Converter";
import {format} from "./Format";
import {SETTINGS} from "../../settings/ApplicationSettings";

const DEFAULT_LAYER_NAME = 'dense_0';

export class KerasToCanonicalConverter extends JSONFormatConverter {

    /**
     * Converting JSON model into a cannonical format.
     * @param kerasModel
     * @returns {{layers: Array}}
     */
    convert(kerasModel) {
        const kerasModelConfig = kerasModel.modelTopology.model_config;
        const kerasTrainingConfig = kerasModel.modelTopology.training_config;

        let model = {
            layers: []
        };

        let graph = {
            layers: []
        };

        if (kerasModelConfig.class_name !== format.modelConfigClassName) {
            throw new Error("This model class name is not serviced!");
        }

        model = {
            ...model,
            compilationParameters: {
                optimizer: kerasTrainingConfig.optimizer_config.class_name.toLowerCase(),
                loss: kerasTrainingConfig.loss.toLowerCase(),
                metrics: kerasTrainingConfig.metrics
            }
        };
        const layerConfig = kerasModelConfig.config;
        const length = layerConfig.length;
        for (let i = 0; i < length; i++) {
            const kerasLayer = layerConfig[i];

            // If we encounter first model's layer we add an additinal input layer(In the keras model the first hidden layer has information about input layer's dimension
            if (i === 0) {
                let inputLayer = {
                    index: i,
                    name: DEFAULT_LAYER_NAME,
                    type: SETTINGS.model.layerTypes.INPUT,
                    classType: SETTINGS.model.layerClassTypes.NONE,
                    activation: SETTINGS.model.layerActivations.NONE,
                    nodesNumber: kerasLayer.config.batch_input_shape[1]
                };
                model.layers.push(inputLayer);
                graph.layers.push({
                    index: inputLayer.index,
                    type: inputLayer.type,
                    activation: inputLayer.activation,
                    nodesNumber: inputLayer.nodesNumber
                });
            }

            let layer = {
                index: i + 1,
                name: kerasLayer.config.name,
                type: (i === length - 1) ? SETTINGS.model.layerTypes.OUTPUT : SETTINGS.model.layerTypes.HIDDEN,
                classType: kerasLayer.class_name.toLowerCase(),
                activation: kerasLayer.config.activation,
                nodesNumber: kerasLayer.config.units
            };
            model.layers.push(layer);
            graph.layers.push({
                index: layer.index,
                type: layer.type,
                activation: layer.activation,
                nodesNumber: layer.nodesNumber
            });
        }
        return {
            model: model,
            graph: graph
        }
    }
}