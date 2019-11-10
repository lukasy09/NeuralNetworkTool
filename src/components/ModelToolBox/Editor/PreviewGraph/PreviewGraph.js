import React from 'react';
import PropTypes from "prop-types";
import NetworkGraphBuilder from "../../../../NetworkGraphBuilder/NetworkGraphBuilder";
import {NetworkGraphConfigurator} from "../../../../NetworkGraphBuilder/NetworkGraphConfigurator";

export class PreviewGraph extends React.Component{
    previewGraphId = "previewCy";

    initGraph = () => {
        return NetworkGraphConfigurator.initializeCytoObject(this.previewGraph);
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
                     style={{backgroundColor: '#222222'}}/>
            </div>
        )
    }
}

PreviewGraph.propTypes = {
    graph:PropTypes.object
};