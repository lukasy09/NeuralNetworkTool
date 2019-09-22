export class NetworkGraphBuildUtils{

    static getNodePosition(layer, nodeIndex, maxNodes, gapObject){
        const layerIndex = layer.index;
        const nodesNumber = layer.nodesNumber;
        let xAxisGap = gapObject.horizontal;
        let yAxisGap = gapObject.vertical;
        let xAxisPosition;
        let yAxisPosition;
        let startIndex;

        xAxisPosition = (layerIndex + 1) * xAxisGap;

        if(layer.nodesNumber < maxNodes){
            startIndex = (maxNodes - nodesNumber)/2;
            yAxisPosition = (startIndex + nodeIndex) * yAxisGap;
        }else{
            yAxisPosition = nodeIndex * yAxisGap;
        }
        return{
            x:xAxisPosition,
            y:yAxisPosition
        }
    }


    /**
     * Returning a maximal number of nodes in a whole network
     * @param layers
     * @returns {number}
     */
    static getMaximalNodesInLayers(layers){
        const l = layers.length;
        let max = 0;
        for(let i=0; i<l; i++){
            const layer = layers[i];
            if(layer.nodesNumber > max){
                max = layer.nodesNumber;
            }
        }
        return max;
    }
}
