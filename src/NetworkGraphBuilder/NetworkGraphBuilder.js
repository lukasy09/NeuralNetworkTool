import {NetworkGraphBuildUtils} from "./utils/NetworkGraphBuildUtils";

export default class NetworkGraphBuilder {

    origin = {
        x: 100,
        y: 0
    };

    currentPosition = {
        x: this.origin.x,
        y: this.origin.y
    };

    nodesGap = {
      horizontal: 100,
      vertical: 100
    };

    groupTypes = {
        NODE: 'nodes',
        EDGE: 'edges'
    };


    nodes = [];

    constructor(cy){
        this.CY = cy;
    }

    /**
     * Adding a nodes' layer(without connections between nodes)
     * @param layer
     * E.G input: {
     *      type: "hidden",
     *      nodesNumber: 8,
     *      layerIndex: 3
     * }
     */
    addLayerNodes = (layer) =>{
        const {nodesNumber, index} = layer;
        for(let i=0; i< nodesNumber; i++){
            this.nodes.push({
               group: this.groupTypes.NODE,
               data: {
                   id:"l" + index + " " + "n" + (i+1).toString()
               },
               position: {
                   x: this.currentPosition.x,
                   y: this.currentPosition.y
               }
            });
            this.currentPosition.y += this.nodesGap.vertical;
            console.log(NetworkGraphBuildUtils.getNodePosition(layer, i, this.maxNodesNumber, this.nodesGap));
        }
        this.currentPosition.x += this.nodesGap.horizontal;
        this.currentPosition.y = this.origin.y;
        return this.nodes;
    };


    buildNeuralNetworkVisualisation = (network) => {
        let layers = network.layers;
        const LAYERS_NUMBER = layers.length;
        this.maxNodesNumber = NetworkGraphBuildUtils.getMaximalNodesInLayers(layers);

        for(let l = 0; l < LAYERS_NUMBER; l++){
            this.addLayerNodes(layers[l]);
        }
        return this.CY.add(this.nodes);
    }
}