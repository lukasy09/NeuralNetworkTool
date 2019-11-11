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


    /**
     * Computing minimal and maximal value from the weights. Used to compute the edge width.
     * @param weights
     * @return {{min: number, max: number}}
     */
    static computeWeightsExtrema(weights){
        const length = weights.length;
        let max = 0;
        let min = 0;
        for(let i=0; i<length; i++){
            const matrix = weights[i][0];
            for(let fromNodeIndex = 0; fromNodeIndex<matrix.length; fromNodeIndex++){
                const row = matrix[fromNodeIndex];
                for(let toNodeIndex = 0; toNodeIndex<row.length; toNodeIndex++){
                        const val = row[toNodeIndex];
                        if(val < min){
                            min = val
                        }
                        if(val >= max){
                            max = val
                        }
                }
            }
        }

        return {
            min: min,
            max: max
        }
    }

    /**
     * Computing the edge width as a linear function
     * @param value
     * @param xExtrema
     * @param widthExtrema
     * @return {number}
     */
    static getEdgeWidth(value, xExtrema, widthExtrema){
        const a = ((widthExtrema.max - widthExtrema.min) / (xExtrema.max - xExtrema.min));
        const b = widthExtrema.min - a * xExtrema.min;

        return (a * value + b)
    }


}
