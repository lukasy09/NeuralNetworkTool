export class JSONFormatConverter{

    constructor(){}

    convert(data){
       this.data = this.converter.convert(data);
       return this;
    }

    getData = () => {
        return this.data;
    }
}