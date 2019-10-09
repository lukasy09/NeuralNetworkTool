import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel, setModelCompilationParameters, setModelLayers} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import Editor from "./Editor/Editor";
import {Layer} from "./Layer/Layer";
import {Upload} from "../common/Upload";
import {ESCAPE} from "../../utils/Keyboard";
import {ModelValidator} from "../../logic/ModelValidator/ModelValidator";
import Alerts from "./Alerts/Alerts";
import {setAlerts} from "../../actions/alertsActions";
import {handleUpload} from "../../utils/Upload";

export const EDITOR_SCENE = {
    LAYER: 'layers',
    PARAMETER: 'parameters'
};

class ModelToolBox extends React.Component {

    state = {
        activePopup: false,
        activeAlerts: false,
        scene: EDITOR_SCENE.LAYER,

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
     * Switching editor scenes.
     * (Between layer and parameters boxes)
     */
    switchScene = () => {
        let newScene;

        switch (this.state.scene){
            case EDITOR_SCENE.LAYER:
                newScene = EDITOR_SCENE.PARAMETER;
                break;
            case EDITOR_SCENE.PARAMETER:
                newScene = EDITOR_SCENE.LAYER;
                break;
            default:
                console.log("Wrong scene!");
        }
        this.setState({
            ...this.state,
            scene: newScene
        })
    };

    /**
     * Submitting layers on the preview and replacing with the existing ones
     * @param newLayers
     * @param newParams
     */
    submitModel = (newLayers, newParams) => {
        this.props.setGraph(newLayers);
        this.props.setModelLayers(newLayers);
        this.props.setModelCompilationParameters(newParams);
        this.updateAlerts(newLayers);
        this.triggerPopup();
    };

    /**
     * Calling validation method to check if the network has a properly built structure
     */
    updateAlerts = (layers) => {
        this.modelValidator.validateModelLayers(layers);
        let alerts = this.modelValidator.getAlerts();
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
                    <Upload text={"Upload your model"}
                            id={"Uploader"}
                            className={"Uploader"}
                            accept={".json,application/json"}
                            action={(e) => {
                                handleUpload(e, false);
                            }}/>
                    <TextButton
                        text={"Layers"}
                        className={"AddNewLayerBtn"}
                        action={this.triggerPopup}
                    />
                </div>
                <Editor triggerPopup={this.triggerPopup}
                        submitModel={this.submitModel}
                        switchScene={this.switchScene}
                        style={this.state.styles.popup}
                        scene={this.state.scene}
                        altScene={this.state.scene === EDITOR_SCENE.LAYER ? EDITOR_SCENE.PARAMETER : EDITOR_SCENE.LAYER}/>
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
    setModelCompilationParameters: setModelCompilationParameters,
    setAlerts: setAlerts
};

export default connect(mapStateToProps, mapActionsToProps)(ModelToolBox);