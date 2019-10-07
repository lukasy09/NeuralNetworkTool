import {DataGeneratorUtil} from "../utils/DataGeneratorUtil";

export class DataGenerator{

    constructor(activation){
        this.activation = activation;
    }

    generate(options){
        let data = [];
        let inputs = DataGeneratorUtil.fillList(options);
        for(let x = options.from; x < options.to; x += options.threshold){
            data.push({
                "name": `Point ${x}`,
                "y": this.activation(x, inputs)
            })
        }
        return data;
    }

}