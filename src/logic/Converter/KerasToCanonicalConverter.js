import {JSONFormatConverter} from "./Converter";
import {format} from "./format";
import {SETTINGS} from "../../settings/ApplicationSettings";

export class KerasToCanonicalConverter extends JSONFormatConverter{


    constructor(){
        super();
        this.graph = {

        }
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
            console.log("This model class name is not serviced!");
            return;
        }

        model = {
            ...model,
            optimizer: kerasTrainingConfig.optimizer_config.class_name,
            loss: kerasTrainingConfig.loss,
            metrics: kerasTrainingConfig.metrics

        };
        const layerConfig = kerasModelConfig.config;
        const length = layerConfig.length;
        for (let i = 0; i < length; i++) {
            const kerasLayer = layerConfig[i];
            let layer = {
                index: i,
                name: kerasLayer.config.name,
                type: SETTINGS.model.layerTypes.HIDDEN,
                classType:kerasLayer.class_name,
                activation: kerasLayer.config.activation,
                nodesNumber: kerasLayer.config.units,
            };

            if(i === 0){
                layer.type = SETTINGS.model.layerTypes.INPUT;
                //model.layers.push(layer);
            }else if(i === (length - 1)){
                layer.type = SETTINGS.model.layerTypes.OUTPUT;
                break;
            }
            layer.type = SETTINGS.model.layerTypes.HIDDEN;
            model.layers.push(layer);
        }
        return model;
    }
}