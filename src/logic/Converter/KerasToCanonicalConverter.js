import {JSONFormatConverter} from "./Converter";
import {format} from "./format";

export class KerasToCanonicalConverter extends JSONFormatConverter{


    constructor(){
        super();
        this.graph = {

        }
    }

    convert(kerasModel) {
        const kerasModelConfig = kerasModel.modelTopology.model_config;

        let model={
            layers: []
        };

        if (kerasModelConfig.class_name !== format.modelConfigClassName) {
            console.log("This model class name is not serviced!");
            return;
        }

        const layerConfig = kerasModelConfig.config;
        const lenght = layerConfig.length;
        for (let i = 0; i < lenght; i++) {
            const kerasLayer = layerConfig[i];
            let layer = {
                index: i,
                //name: kerasLayer.config.name,
                type: 'hidden',
                //classType:kerasLayer.class_name,
                nodesNumber: kerasLayer.config.units

            };
            model.layers.push(layer);
        }
        return model;
    }
}