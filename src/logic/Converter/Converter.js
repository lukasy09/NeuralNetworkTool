export class JSONFormatConverter{

    constructor(conv){
        this.converter = conv;
    }

    convert(data){
       this.data = this.converter.convert(data);
       return this;
    }

    getData = () => {
        return this.data;
    }
}