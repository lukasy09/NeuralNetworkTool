export class JSONFormatConverter{

    constructor(converter){
        this.converter = converter;
    }

    convert(data){
       this.data = this.converter.convert(data);
       return this;
    }

    getData = () => {
        return this.data;
    }
}