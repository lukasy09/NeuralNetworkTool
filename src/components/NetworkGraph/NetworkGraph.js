import React from 'react';
import {connect} from 'react-redux';

import {LabelInfo} from "../common/LabelInfo";
import NetworkGraphBuilder from '../../NetworkGraphBuilder/NetworkGraphBuilder';
import {NetworkGraphConfigurator} from "../../NetworkGraphBuilder/NetworkGraphConfigurator";
import {GraphSideUtil} from "./GraphSideUtil/GraphSideUtil";
import {GraphEqualizer} from "./GraphEqualizer/GraphEqualizer";
import {ESCAPE} from "../../utils/Keyboard";
import {userActions} from "../../NetworkGraphBuilder/utils/Equalizer";



class NetworkGraph extends React.Component {

    // Graph's container ID
    networkGraphId = 'cy';

    state = {
        exportsPopupActive: false,
        styles: {
            networkGraphContainer: {
                transform: "translateX(-60vw)"
            },
            exportsPopup:{
                display: 'none'
            }

        }
    };

    componentDidMount() {
        this.setupInitStyles();
        this.cy = this.initGraph();

        window.addEventListener('keydown', (e)=>{
            if(e.keyCode === ESCAPE.code){
                if(this.state.exportsPopupActive){
                    this.triggerExportsPopup();
                }
            }
        });
    }

    /**
     * Styling the component(e.g moving scene) at the beginning.
     */

    setupInitStyles = () => {
      this.setState({
          styles:{
              ...this.state.styles,
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
        this.cy = NetworkGraphConfigurator.initializeCytoObject(this.graph);
        return this.cy;
    };

    triggerExportsPopup = ()=>{
        let style;

        if(this.state.styles.exportsPopup){
            style = null;
        }else{
            style={display:'none'};
        }
        this.setState({
            ...this.state,
            exportsPopupActive: !this.state.exportsPopupActive,
            styles:{
                ...this.state.styles,
                exportsPopup: style
            }
        });
    };

    componentDidUpdate(){
        if(this.props.graph.layers.length > 0){
            this.networkGraphBuilder = new NetworkGraphBuilder(this.initGraph());
            this.networkGraphBuilder.buildNeuralNetworkVisualisation(this.props.graph);
        }
    }


    render() {
        const projectName = this.props.general.projectName;
        const actionList = [userActions.CENTER, userActions.ZOOM_IN, userActions.ZOOM_OUT];
        return (
                <div className={"NetworkGraphContainer"}
                     style={this.state.styles.networkGraphContainer}>
                    <GraphSideUtil cy={this.cy}
                                   action={this.triggerExportsPopup}
                                   style={this.state.styles.exportsPopup}
                                   exportText={"Exports"}/>
                    <LabelInfo
                        text={projectName}
                        className={"ProjectName"}
                    />

                    <GraphEqualizer actions = {actionList}/>
                    <div ref={(div) => this.graph = div}
                        className={"NetworkGraph"}
                        id={this.networkGraphId}
                        style={{backgroundColor: '#f1ebe0'}}/>
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