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
     * @param layerInfo
     * E.G input: {
     *      type: "hidden",
     *      nodesNumber: 8,
     *      layerIndex: 3
     * }
     */
    addLayerNodes = (layerInfo) =>{
        const {nodesNumber, layerIndex} = layerInfo;
        for(let i=0; i< nodesNumber; i++){
            this.nodes.push({
               group: this.groupTypes.NODE,
               data: {
                   id:"l" + layerIndex + " " + "n" + (i+1).toString()
               },
               position: {
                   x: this.currentPosition.x,
                   y: this.currentPosition.y
               }
            });
            this.currentPosition.y += this.nodesGap.vertical;
        }
        this.currentPosition.x += this.nodesGap.horizontal;
        this.currentPosition.y = this.origin.y;
        return this.nodes;
    };


    buildNeuralNetworkVisualisation = (network) => {
        const LAYERS = network.layers;
        const LAYERS_NUMBER = LAYERS.length;

        for(let l = 0; l < LAYERS_NUMBER; l++){
            this.addLayerNodes(LAYERS[l]);
        }
        console.log(this.nodes);
        return this.CY.add(this.nodes);
    }
}