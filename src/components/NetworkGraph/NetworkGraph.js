import React from 'react';
import cytoscape from 'cytoscape';
import {connect} from 'react-redux';
import {LabelInfo} from "../common/LabelInfo";
import NetworkGraphBuilder from '../../NetworkGraphBuilder/NetworkGraphBuilder';
import {NetworkGraphConfigurator} from "../../NetworkGraphBuilder/NetworkGraphConfigurator";
import {GraphSideUtil} from "./GraphSideUtil/GraphSideUtil";
import {EXPORTS_TYPES} from "../../NetworkGraphBuilder/utils/Exports";
//import {TEST_NETWORK} from "../../examples/networks";

const EXPORTS = [EXPORTS_TYPES.PNG, EXPORTS_TYPES.JPEG, EXPORTS_TYPES.JSON];

class NetworkGraph extends React.Component {

    // Graph's container ID
    networkGraphId = 'cy';

    state = {
        styles: {
            networkGraphContainer: {
                transform: "translateX(-60vw)"
            }
        },
        graph:{
            styles:{
                node:{
                   "background-color":"#f1f1f1",
                },
                edge: {
                    backgroundColor: "#f2f2f2"
                }
            }
        }

    };

    componentDidMount() {
        this.setupInitStyles();
        this.initGraph();
    }

    /**
     * Styling the component(e.g moving scene) at the beginning.
     */

    setupInitStyles = () => {
      this.setState({
          styles:{
              networkGraphContainer: {
                  transform: 'none'
              }
          }
      })
    };

    /**
     * Method initializing network graph.
     * Returning the main cytoscape object responsible for all actions.
     */
    initGraph = () => {
        return cytoscape({
            container: this.graph, // Graph container. All the stuff is rendereing inside.
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

    render() {
        const projectName = this.props.general.projectName;
        return (
                <div className={"NetworkGraphContainer"}
                     style={this.state.styles.networkGraphContainer}>
                    <GraphSideUtil text={"Exports"}/>
                    <LabelInfo
                        text={projectName}
                        className={"ProjectName"}
                    />
                    <div
                        ref={(div) => this.graph = div}
                        className={"NetworkGraph"}
                        id={this.networkGraphId}/>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        general: state.generalReducer,
        graph: state.graphReducer
    };
};

export default connect(mapStateToProps)(NetworkGraph)