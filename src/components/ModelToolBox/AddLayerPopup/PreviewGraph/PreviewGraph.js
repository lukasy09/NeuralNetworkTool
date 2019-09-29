import React from 'react';
import PropTypes from "prop-types";
import cytoscape from "cytoscape";
import NetworkGraphBuilder from "../../../../NetworkGraphBuilder/NetworkGraphBuilder";
import {TEST_NETWORK} from "../../../../examples/networks";

const ELEMENT_TYPES = {
    NODE: 'nodes',
    EDGE: 'edges'
};

export class PreviewGraph extends React.Component{
    previewGraphId = "previewCy";

    initGraph = () => {
        return cytoscape({
            container: this.previewGraph, // Graph container. All the stuff is rendereing inside.

            style: [ // default styles
                {
                    selector:  ELEMENT_TYPES.NODE,
                    style:{
                        background: "background-color: #f1f1f1"
                    }
                },

                {
                    selector: ELEMENT_TYPES.EDGE,
                    style:{
                        backgroundColor: "#f2f2f2"
                    }
                }
            ],

            layout: {
                name: "cose",
                padding: 60,
                gravity: 12,
            },

        });
    };

    /**
     * @todo Check why nodes have wrong styles on popup
     */

    componentDidUpdate(){
        this.networkGraphBuilder = new NetworkGraphBuilder(this.initGraph());
        this.networkGraphBuilder.buildNeuralNetworkVisualisation(this.props.graph);
    }

    render(){
        return(
            <div className={"PreviewGraphContainer"}>

                <div
                    ref={(div) => this.previewGraph = div}
                    className={"PreviewGraph"}
                    id={this.previewGraphId}/>
            </div>
        )
    }
}


PreviewGraph.propTypes = {

};