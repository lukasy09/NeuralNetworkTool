import {SETTINGS} from "../settings/ApplicationSettings";

export class NetworkGraphStyleManager{

    static defaultNodesStyle = {
        backgroundColor: '#f1f1f1'
    };
    static getLayerNodesStyles(layer){
        const layerTypes = SETTINGS.model.layerTypes;

        switch (layer.type){
            case layerTypes.INPUT:
                return{
                    backgroundColor: '#DF6D16',

                };
            case layerTypes.HIDDEN:
                return {
                    backgroundColor: '#01B2FE'
                };
            case layerTypes.OUTPUT:
                return{
                    backgroundColor: '#f1f1f1'
                };
            default:
                console.log("Wrong layer type! - Contact with the application's developer.");
                return;
        }
    }
}