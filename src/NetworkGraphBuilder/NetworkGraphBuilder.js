import {NetworkGraphBuildUtils} from "./utils/NetworkGraphBuildUtils";
import {NetworkGraphStyleManager} from "./NetworkGraphStyleManager";

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
        horizontal: 150,
        vertical: 100
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
     * E.G input: {
     *      type: "hidden",
     *      nodesNumber: 8,
     *      layerIndex: 3
     * }
     * @param style
     */
    addLayerNodes = (layer, style) => {
        const {nodesNumber, index: layerIndex} = layer;
        for (let i = 0; i < nodesNumber; i++) {
            this.nodes.push({
                group: this.groupTypes.NODE,
                data: {
                    id: `l${layerIndex.toString()} n${i.toString()}`
                },
                position: NetworkGraphBuildUtils.getNodePosition(layer, i, this.maxNodesNumber, this.nodesGap),
                style: style ? style : NetworkGraphStyleManager.defaultNodesStyle
            });
            this.currentPosition.y += this.nodesGap.vertical;
        }
        this.currentPosition.x += this.nodesGap.horizontal;
        this.currentPosition.y = this.origin.y;
        return this.CY.add(this.nodes);
    };


    /**
     * Adding a connections between nodes
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
                if (fromLayerIndex === (toLayerIndex - 1)){
                    this.edges.push({
                        group: this.groupTypes.EDGE,
                        data: {
                            id: //"l" + fromLayerIndex + " " + "from" + " " +fromNodeIndex + " " + "to" + " " + toNodeIndex,
                                `l${fromLayerIndex.toString()} from ${fromNodeIndex.toString()} to ${toNodeIndex}`,
                            source: fromNode.data.id, // the source node id (edge comes from this node)
                            target: toNode.data.id  // the target node id (edge goes to this node)
                        },
                        pannable: true
                    });
                }
            }
        }
        return this.CY.add(this.edges);
    };


    /**
     * Building an artificial neural network visualisation from a JSON object passed as an input parameter.
     * @param network
     */
    buildNeuralNetworkVisualisation = (network) => {
        let layers = network.layers;
        const LAYERS_NUMBER = layers.length;
        this.maxNodesNumber = NetworkGraphBuildUtils.getMaximalNodesInLayers(layers);

        for (let l = 0; l < LAYERS_NUMBER; l++) {
            const styles = NetworkGraphStyleManager.getLayerNodesStyles(layers[l]);
            this.addLayerNodes(layers[l], styles);
        }
        for (let l = 0; l < LAYERS_NUMBER; l++) {
            if (l !== (LAYERS_NUMBER - 1)) {
                this.addLayerEdges(layers[l], layers[l + 1], layers[l].index);
            }
        }

        return this.CY.center();
    }
}