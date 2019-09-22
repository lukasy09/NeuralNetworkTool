import React from 'react';
import cytoscape from 'cytoscape';
import {connect} from 'react-redux';
import {LabelInfo} from "../../common/LabelInfo";
import NetworkGraphBuilder from '../../../NetworkGraphBuilder/NetworkGraphBuilder'
class NetworkGraph extends React.Component {

    networkGraphId = 'cy';

    state = {
        styles: {
            networkGraphContainer: {
                transform: "translateX(-60vw)"
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
                  type: "hidden",
                  nodesNumber: 6,
                  index: 6
              },

              {
                  type: "hidden",
                  nodesNumber: 4,
                  index: 4
              }
          ]
        };
        this.networkGraphBuilder.buildNeuralNetworkVisualisation(TEST_NETWORK)

    }


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
            container: document.getElementById('cy'), // Graph container. All the stuff is rendereing inside.

            // elements: [ // list of graph elements to start with
            //     { // node a
            //         data: {id: 'a'},
            //     },
            //     { // node b
            //         data: {id: 'b'}
            //     },
            //     { // edge ab
            //         data: {id: 'ab', source: 'a', target: 'b'}
            //     }
            // ],

            style: [ // default styles
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        //'label': 'data(id)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
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
                    <div className={"NetworkGraph"}
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