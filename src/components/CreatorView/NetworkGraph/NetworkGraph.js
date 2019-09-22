import React from 'react';
import cytoscape from 'cytoscape';
import {connect} from 'react-redux';
import {LabelInfo} from "../../common/LabelInfo";
import NetworkGraphBuilder from '../../../NetworkGraphBuilder/NetworkGraphBuilder';

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
                    "border":"solid 1px white"

                },
                edge: {
                    backgroundColor: "#f2f2f2"
                }
            }
        }

    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setupInitStyles();
        this.networkGraphBuilder = new NetworkGraphBuilder(this.initGraph());

        const TEST_NETWORK = {
          layers:[
              {
                  type: "input",
                  nodesNumber: 20,
                  index: 0
              },

              {
                  type: "hidden",
                  nodesNumber: 8,
                  index: 1
              },
              {
                  type: "hidden",
                  nodesNumber: 8,
                  index: 2
              },
              {
                  type: "hidden",
                  nodesNumber: 6,
                  index: 3
              },
              {
                  type: "hidden",
                  nodesNumber: 3,
                  index: 4
              },
              {
                  type: "output",
                  nodesNumber: 2,
                  index: 5
              }
          ]
        };
        this.networkGraphBuilder.buildNeuralNetworkVisualisation(TEST_NETWORK)

    }

    /**
     * Styling the component(e.g moving scene)
     */

    setupInitStyles = () => {
      this.setState({
          styles:{
              networkGraphContainer: null
          }
      })
    };

    /**
     * Method initializing network graph
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
                name: 'grid',
                rows: 1
            }

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