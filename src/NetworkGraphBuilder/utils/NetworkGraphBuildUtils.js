export class NetworkGraphBuildUtils{

    static getNodePosition(layer, nodeIndex, maxNodes, gapObject){
        const layerIndex = layer.index;
        let yAxisGap = gapObject.vertical;

      //  if(layer.nodesNumber < maxNodes){
            let xAxisPosition = layerIndex * gapObject.horizontal;
            let yAxisPosition = 0;

            if(maxNodes % 2 === 0){
                let gapsNumber = maxNodes - 1;
                let loopLength = gapsNumber - 1;
                for(let i=0; i<loopLength; i++){
                    yAxisPosition += yAxisGap;
                }
                yAxisPosition += (Math.round(yAxisGap/2));

            }else{

            }

            return{
                x: xAxisPosition,
                y: yAxisPosition
            }


      //  }
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
