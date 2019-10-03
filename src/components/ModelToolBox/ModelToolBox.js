import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel, setModelLayers} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import AddLayerPopup from "./AddLayerPopup/AddLayerPopup";
import {Layer} from "./Layer/Layer";
import {ESCAPE} from "../../utils/Keyboard";
//import {TEST_MODEL} from "../../examples/models";

class ModelToolBox extends React.Component {

    state = {
        activePopup: false,
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
                transform: "translateY(-100vh)",
            }
        }
        this.setState({
            ...this.state,
            activePopup: !this.state.activePopup,
            styles: {
                popup: popupStyle,
            }
        })
    };

    /**
     * Submitting layers on the preview and merging with the existing ones
     * @param nextLayers
     */
    submitLayers = (nextLayers) => {
        this.props.setGraph(nextLayers);
        this.props.setModelLayers(nextLayers);
        this.triggerPopup();
    };

    /**
     * Styling the component(e.g moving scene) at the beginning.
     */

    setupInitStyles = () => {
        this.setState({
            styles: {
                ...this.state.styles,
                modelToolBoxContainer: {
                    transform: 'none'
                }
            }
        })
    };

    componentDidMount() {
        this.setupInitStyles();

        window.addEventListener('keydown', (e)=>{
            if(e.keyCode === ESCAPE.code){
                if(this.state.activePopup){
                    this.triggerPopup();
                }
            }
        });
    }

    render() {
        const modelLayers = this.props.model.layers;
        return (
            <>
                <div className={"ModelToolBox"}
                     style={this.state.styles.modelToolBoxContainer}>
                    <div className={"LayersContainer"}>
                        {
                            modelLayers.map((layer, index) => {
                                return (
                                    <Layer key={index}
                                           index={layer.index}
                                           name={layer.name}
                                           type={layer.type}
                                           classType={layer.classType}
                                           activation={layer.activation}
                                           nodesNumber={layer.nodesNumber}
                                    />
                                )
                            })
                        }
                    </div>
                    <TextButton
                        text={"New layer"}
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
    setGraph: setGraph,
    setModelLayers: setModelLayers
};

export default connect(mapStateToProps, mapActionsToProps)(ModelToolBox);