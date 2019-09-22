export class NetworkGraphBuildUtils{

    /**
     * Computing the position of a node by parameters
     * @param layer - node's layer
     * @param nodeIndex -
     * @param maxNodes - maximal value of nodes in a layer in a whole network
     * @param gapObject
     * @returns {{x: number|*, y: *}}
     */
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

    /**
     * Returning an index of layer by a given id which is "l[layerIndex] n[nodeIndex in the layer] e.g "l2 n5"
     * @param nodeId
     */
    static getNodeLayerIndexByNodeId(nodeId){
        return nodeId.split(" ")[0].substring(1);
    }

    /**
     * Returning an index of a node in layer by a given id which is "l[layerIndex] n[nodeIndex in the layer] e.g "l2 n5"
     * @param nodeId
     */
    static getNodeIndexInLayerById(nodeId){
        return nodeId.split(" ")[1].substring(1);
    }
}
