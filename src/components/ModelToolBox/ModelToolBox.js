import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel, setModelLayers} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import AddLayerPopup from "./AddLayerPopup/AddLayerPopup";
import {Layer} from "./Layer/Layer";
import {ESCAPE} from "../../utils/Keyboard";
import {ModelValidator} from "../../logic/ModelValidator/ModelValidator";
import Alerts from "./Alerts/Alerts";
import {setAlerts} from "../../actions/alertsActions";

class ModelToolBox extends React.Component {

    state = {
        activePopup: false,
        activeAlerts: false,

        styles: {
            popup: {
                transform: 'translateY(-100vh)'
            },
            modelToolBoxContainer: {
                transform: "translateY(60vw)"
            }
        },

        isModelValid: false,
        alerts:[]

    };

    constructor(props){
        super(props);
        this.modelValidator = new ModelValidator();
    }

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
     * Submitting layers on the preview and replacing with the existing ones
     * @param newLayers
     */
    submitLayers = (newLayers) => {
        this.props.setGraph(newLayers);
        this.props.setModelLayers(newLayers);
        this.updateAlerts(newLayers);
        this.triggerPopup();
    };


    /**
     * Calling validation method to check if the network has a properly built structure
     */
    updateAlerts = (layers) => {
        this.modelValidator.validateModelLayers(layers);
        let alerts = this.modelValidator.getAlerts();
        console.log("my alerts");
        console.log(alerts);
        this.props.setAlerts(alerts);
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
                    {this.props.alerts.length > 0 ?
                        <Alerts activeAlerts={this.state.activeAlerts}
                                triggerAlerts={()=>{this.setState({...this.state, activeAlerts: !this.state.activeAlerts})}}/>
                        : <></>
                    }

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
                        text={"Settings"}
                        className={"NetworkSettingsBtn"}
                        action={this.triggerPopup}
                    />

                    <TextButton
                        text={"Layers"}
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
        graph: state.graphReducer,
        alerts: state.alertsReducer.alerts
    }
};

const mapActionsToProps = {
    setModel: setModel,
    setGraph: setGraph,
    setModelLayers: setModelLayers,
    setAlerts: setAlerts
};

export default connect(mapStateToProps, mapActionsToProps)(ModelToolBox);