import {NetworkGraphBuildUtils} from "./utils/NetworkGraphBuildUtils";
import {NetworkGraphConfigurator} from "./NetworkGraphConfigurator";

export default class NetworkGraphBuilder {

    origin = {
        x: 0,
        y: 0
    };

    currentPosition = {
        x: this.origin.x,
        y: this.origin.y
    };

    nodesGap = {
        horizontal: 260,
        vertical: 140
    };

    groupTypes = {
        NODE: 'nodes',
        EDGE: 'edges'
    };


    nodes = [];
    edges = [];

    constructor(cy) {
        this.CY = cy;
    }

    /**
     * Adding a nodes' layer(without connections between nodes)
     * @param layer
     * E.G INPUT: {
     *      type: "HIDDEN",
     *      nodesNumber: 8,
     *      layerIndex: 3
     * }
     */
    addLayerNodes = (layer) => {
        const {nodesNumber, index: layerIndex, type, activation} = layer;
        for (let i = 0; i < nodesNumber; i++) {
            this.nodes.push({
                group: this.groupTypes.NODE,
                data: {
                    id: `l${layerIndex.toString()} n${i.toString()}`,
                    inLayerType: type,
                    activation: activation,
                    displayInfo: `Unit index: ${i}\nLayer:${layerIndex}`,
                    layerIndex: layerIndex,
                    order: i
                },
                position: NetworkGraphBuildUtils.getNodePosition(layer, i, this.maxNodesNumber, this.nodesGap),
            });
            this.currentPosition.y += this.nodesGap.vertical;
        }
        this.currentPosition.x += this.nodesGap.horizontal;
        this.currentPosition.y = this.origin.y;
    };


    /**
     * Adding a connections between nodes
     * @return {*}
     */
    addLayerEdges = () => {
        for (let i = 0; i < this.nodes.length; i++) {
            let fromNode = this.nodes[i];
            const fromLayerIndex = parseInt(NetworkGraphBuildUtils.getNodeLayerIndexByNodeId(fromNode.data.id));
            const fromNodeIndex = NetworkGraphBuildUtils.getNodeIndexInLayerById(fromNode.data.id);

            for (let j = 0; j < this.nodes.length; j++) {
                let toNode = this.nodes[j];
                const toLayerIndex = parseInt(NetworkGraphBuildUtils.getNodeLayerIndexByNodeId(toNode.data.id));
                const toNodeIndex = NetworkGraphBuildUtils.getNodeIndexInLayerById(toNode.data.id);
                if (fromLayerIndex === (toLayerIndex - 1)) {
                    //const valueInfoPart = params ? `,value: ${params[fromLayerIndex][toLayerIndex].toFixed(3)}` : null;
                    this.edges.push({
                        group: this.groupTypes.EDGE,
                        data: {
                            id: //"l" + fromLayerIndex + " " + "from" + " " +fromNodeIndex + " " + "to" + " " + toNodeIndex,
                                `l${fromLayerIndex.toString()} from ${fromNodeIndex.toString()} to ${toNodeIndex}`,
                            fromLayerIndex: fromLayerIndex,
                            fromNodeIndex: fromNodeIndex,
                            toNodeIndex: toNodeIndex,
                            inLayerType: toNode.inLayerType,
                            displayInfo: `From:${fromLayerIndex.toString()} to: ${toLayerIndex.toString()}, layer: ${fromLayerIndex + 1}`,
                            source: fromNode.data.id, // the source node id (edge comes from this node)
                            target: toNode.data.id  // the target node id (edge goes to this node),
                        },
                        css:{
                          width: NetworkGraphConfigurator.getEdgeConfig().min
                        },
                        pannable: true
                    });
                }
            }
        }
    };


    /**
     * Propagating the weights to the graph
     * @param weights
     */
    propagateParameters = (weights) => {
        const ranges = NetworkGraphBuildUtils.computeWeightsExtrema(weights);
        for (let i = 0; i < this.edges.length; i++) {
            let edgeData = this.edges[i].data;
            let edgeCSS = this.edges[i].css;
            const layerIndex = edgeData.fromLayerIndex;
            const fromNodeIndex = edgeData.fromNodeIndex;
            const toNodeIndex = edgeData.toNodeIndex;
            edgeData.value = weights[layerIndex][0][fromNodeIndex][toNodeIndex];   // params, not biases
            edgeData.displayInfo = edgeData.value.toFixed(5);
            edgeCSS.width = NetworkGraphBuildUtils.getEdgeWidth(edgeData.value, ranges, NetworkGraphConfigurator.getEdgeConfig());
        }
    };


    /**
     * Building an artificial neural network visualisation from a JSON object passed as an INPUT parameter.
     * @param network - topology
     * @param weights - parameters
     * @param isPreviewGraph
     */
    buildNeuralNetworkVisualisation = (network, isPreviewGraph, weights) => {
        let layers = network.layers;
        this.layersNumber = layers.length;
        this.maxNodesNumber = NetworkGraphBuildUtils.getMaximalNodesInLayers(layers);

        for (let l = 0; l < this.layersNumber; l++) {
            this.addLayerNodes(layers[l]);
        }
        for (let l = 0; l < this.layersNumber; l++) {
            if (l !== (this.layersNumber - 1)) {
                this.addLayerEdges();
            }
        }

        if (weights && weights.length > 0 && !isPreviewGraph) {
            this.propagateParameters(weights);
        }

        this.CY.add(this.nodes);
        this.CY.add(this.edges);
        return this.CY.center();
    }
}