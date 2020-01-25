import React from 'react';
import {connect} from 'react-redux';
import {LabelInfo} from "../Common/LabelInfo";
import NetworkGraphBuilder from '../../NetworkGraphBuilder/NetworkGraphBuilder';
import {NetworkGraphConfigurator} from "../../NetworkGraphBuilder/NetworkGraphConfigurator";
import {GraphSideUtil} from "./GraphSideUtil/GraphSideUtil";
import {GraphEqualizer} from "./GraphEqualizer/GraphEqualizer";
import {ESCAPE} from "../../utils/Keyboard";
import {userActions, equalizerConfig} from "../../NetworkGraphBuilder/utils/EqualizerSettings";
import {NetworkGraphStyle} from "./NetworkGraphStyle";


class NetworkGraph extends React.Component {

    // Graph's container ID
    networkGraphId = 'cy';

    state = {
        exportsPopupActive: false,
        styles: NetworkGraphStyle.defaultStyle
    };

    constructor(props) {
        super(props);
        this.styleManager = new NetworkGraphStyle(this);
        this.zoomLevel = equalizerConfig.initialZoomLevel;
    }

    componentDidMount() {
        this.styleManager.setupInitStyles();
        this.cy = this.initGraph();
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === ESCAPE.code) {
                if (this.state.exportsPopupActive) {
                    this.triggerExportsPopup();
                }
            }
        });
    }

    /**
     * Method initializing network graph.
     * Returning the main cytoscape object responsible for all actions.
     */
    initGraph = () => {
        this.cy = NetworkGraphConfigurator.initializeCytoObject(this.graph);
        return this.cy;
    };

    triggerExportsPopup = () => {
        this.styleManager.controlPopup();
    };

    componentDidUpdate() {
        if (this.props.graph.layers.length > 0) {
            this.networkGraphBuilder = new NetworkGraphBuilder(this.initGraph());
            this.networkGraphBuilder.buildNeuralNetworkVisualisation(this.props.graph, false, this.props.weights);
        }
    }

    /**
     * Zooming in/out
     * @param step
     */
    zoom = (step) => {
        this.zoomLevel += step;
        this.cy.zoom({
                level: this.zoomLevel,
                renderedPosition: {x: this.cy.pan().x, y: this.cy.pan().y}
            }
        );
        this.cy.center();
    };

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

                <GraphEqualizer center={() => this.cy.center()}
                                zoomIn={() => {
                                    this.zoom(equalizerConfig.zoomStep)
                                }}
                                zoomOut={() => this.zoom(-equalizerConfig.zoomStep)}
                                actionList={actionList}/>

                <div ref={(div) => this.graph = div}
                     className={"NetworkGraph"}
                     id={this.networkGraphId}
                     style={{backgroundColor: '#222222'}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        general: state.generalReducer,
        graph: state.graphReducer,
        weights: state.modelReducer.weights
    };
};

export default connect(mapStateToProps)(NetworkGraph)