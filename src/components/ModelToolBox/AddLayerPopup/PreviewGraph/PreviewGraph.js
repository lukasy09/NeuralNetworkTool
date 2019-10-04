import React from 'react';
import PropTypes from "prop-types";
import cytoscape from "cytoscape";
import NetworkGraphBuilder from "../../../../NetworkGraphBuilder/NetworkGraphBuilder";
import {NetworkGraphConfigurator} from "../../../../NetworkGraphBuilder/NetworkGraphConfigurator";
//import {TEST_NETWORK} from "../../../../examples/networks";

export class PreviewGraph extends React.Component{
    previewGraphId = "previewCy";

    initGraph = () => {
        return cytoscape({
            container: this.previewGraph, // Graph container. All the stuff is rendereing inside.
            style: NetworkGraphConfigurator.getGraphStyleConfiguration(),

            layout: {
                name: "cose",
                padding: 60,
                gravity: 12,
            },

        });
    };

    componentDidUpdate(){
        this.networkGraphBuilder = new NetworkGraphBuilder(this.initGraph());
        this.networkGraphBuilder.buildNeuralNetworkVisualisation(this.props.graph);
    }

    render(){
        return(
            <div className={"PreviewGraphContainer"}>
                <div ref={(div) => this.previewGraph = div}
                     className={"PreviewGraph"}
                     id={this.previewGraphId}
                     style={{backgroundColor: '#f1ebe0'}}/>
            </div>
        )
    }
}

PreviewGraph.propTypes = {
    graph:PropTypes.object
};