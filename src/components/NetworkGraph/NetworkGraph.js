import React from 'react';
import cytoscape from 'cytoscape';
import {connect} from 'react-redux';
import {LabelInfo} from "../common/LabelInfo";
import NetworkGraphBuilder from '../../NetworkGraphBuilder/NetworkGraphBuilder';

const ELEMENT_TYPES = {
    NODE: 'nodes',
    EDGE: 'edges'
};

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
        this.networkGraphBuilder = new NetworkGraphBuilder(this.initGraph());

        const TEST_NETWORK = {
          layers:[
              {
                  type: "INPUT",
                  nodesNumber: 5,
                  index: 0
              },
              {
                  type: "HIDDEN",
                  nodesNumber: 4,
                  index: 1
              },
              {
                  type: "HIDDEN",
                  nodesNumber: 4,
                  index: 2
              },
              {
                  type: "OUTPUT",
                  nodesNumber: 2,
                  index: 3
              }
          ]
        };
        this.networkGraphBuilder.buildNeuralNetworkVisualisation(TEST_NETWORK)
    }

    /**
     * Styling the component(e.g moving scene) at the beginning.
     */

    setupInitStyles = () => {
      this.setState({
          styles:{
              networkGraphContainer: null
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

            style: [ // default styles
                {
                    selector:  ELEMENT_TYPES.NODE,
                    style: this.state.graph.styles.node
                },

                {
                    selector: ELEMENT_TYPES.EDGE,
                    style: this.state.graph.styles.edge
                }
            ],

            layout: {
                name: "cose",
                padding: 60,
                gravity: 12,
            },


        });
    };

    render() {
        const projectName = this.props.general.projectName;
        return (
                <div className={"NetworkGraphContainer"}
                     style={this.state.styles.networkGraphContainer}>
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
        general: state.generalReducer.general
    };
};

export default connect(mapStateToProps)(NetworkGraph)