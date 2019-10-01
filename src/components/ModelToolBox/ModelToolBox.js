import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import AddLayerPopup from "./AddLayerPopup/AddLayerPopup";

class ModelToolBox extends React.Component {

    state = {
        styles: {
            popup: {
                transform: 'translateY(-100vh)'
            },
            modelToolBoxContainer: {
                transform: "translateY(60vw)"
            }

        }

    };

    /**
     * Event listener, adding a new layer on user's click.
     */
    triggerPopup = () => {
        let popupStyle;
        if (this.state.styles.popup) {
             popupStyle = null;
        } else {
            popupStyle = {
                transform:  "translateY(-100vh)",
            }
        }
        this.setState({
            styles: {
                popup: popupStyle
            }
        })
    };

    /**
     * Submitting layers on the preview and merging with the existing ones
     * @param nextLayers
     */
    submitLayers = (nextLayers) => {
        let prevLayers = this.props.graph.layers;
        let merged = prevLayers.concat(nextLayers);
        this.props.setGraph(merged);
        this.triggerPopup();
    };

    /**
     * Styling the component(e.g moving scene) at the beginning.
     */

    setupInitStyles = () => {
        this.setState({
            styles:{
                ...this.state.styles,
                modelToolBoxContainer: {
                    transform: 'none'
                }
            }
        })
    };

    componentDidMount(){
        this.setupInitStyles();
    }

    render() {
        return (
            <>
                <div className={"ModelToolBox"}
                      style={this.state.styles.modelToolBoxContainer}>
                    <TextButton
                        text={"Add a new layer"}
                        className={"AddNewLayerBtn"}
                        action={this.triggerPopup}
                    />
                </div>
                <AddLayerPopup triggerPopup={this.triggerPopup}
                               submitLayers={this.submitLayers}
                               style={this.state.styles.popup}/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        model: state.modelReducer,
        graph: state.graphReducer
    }
};

const mapActionsToProps = {
    setModel: setModel,
    setGraph: setGraph
};

export default connect(mapStateToProps, mapActionsToProps)(ModelToolBox);