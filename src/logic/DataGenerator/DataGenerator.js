export class DataGenerator{

    constructor(activation){
        this.activation = activation;
    }

    generate(options){
        let data = [];
        for(let x = options.from; x < options.to; x += options.threshold){
            data.push({
                "name": `Point ${x}`,
                "y": this.activation(x)
            })
        }
        return data;
    }

}