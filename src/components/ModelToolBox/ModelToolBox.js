import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel, setModelCompilationParameters, setModelLayers} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import {ModelToolBoxStyle} from "./ModelToolBoxStyle";
import Editor from "./Editor/Editor";
import {Layer} from "./Layer/Layer";
import {Upload} from "../common/Upload";
import {ESCAPE} from "../../utils/Keyboard";
import {ModelValidator} from "../../logic/ModelValidator/ModelValidator";
import Alerts from "./Alerts/Alerts";
import {setAlerts} from "../../actions/alertsActions";
import {getFileData} from "../../utils/Upload";
import {KerasToCanonicalConverter} from "../../logic/Converter/KerasToCanonicalConverter";
import {JSONFormatConverter} from "../../logic/Converter/Converter";
import {handleApi} from "../../api/Api";
import {SETTINGS} from "../../settings/ApplicationSettings";
import {env} from "../../index";

export const EDITOR_SCENE = {
    LAYER: 'layers',
    PARAMETER: 'parameters'
};

class ModelToolBox extends React.Component {

    state = {
        activePopup: false,
        activeAlerts: false,
        scene: EDITOR_SCENE.LAYER,
        styles: ModelToolBoxStyle.defaultStyle,
        isModelValid: false,
        alerts: []

    };

    constructor(props) {
        super(props);
        this.modelValidator = new ModelValidator();
        this.converter = new JSONFormatConverter(new KerasToCanonicalConverter());
        this.styleManager = new ModelToolBoxStyle(this);
    }

    /**
     * Event listener, adding a new layer on user's click.
     */
    triggerPopup = () => {
        this.styleManager.controlPopup();
    };

    /**
     * Switching editor scenes.
     * (Between layer and parameters boxes)
     */
    switchScene = () => {
        this.styleManager.switchScene();
    };

    /**
     * Submitting layers on the preview and replacing with the existing ones
     * @param graph
     * @param newParams
     */
    submitModel = (graph, newParams) => {
        this.props.setGraph(graph);
        this.props.setModel({
           layers: graph.layers,
           compilationParameters: newParams
        });
        this.updateAlerts(graph.layers);
        this.triggerPopup();
    };

    /**
     * Setting model from input json.
     * @param json
     */
    setModel = (json) => {
        let cannonical = this.converter.convert(json).getData();
        this.props.setModel(cannonical.model);
        this.props.setGraph(cannonical.graph);
        this.updateAlerts(cannonical.graph.layers);
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
     * Handling user's model upload.
     * @param e
     */
    uploadModel = (e) => {
        getFileData(e, this.setModel);
    };

    sendModel = () => {
      const config = (env === SETTINGS.runtimeEnv.development) ? SETTINGS.api.paths.dev.train : SETTINGS.api.paths.prod.train;
      const model = this.props.model;
      handleApi(config, model);
    };


    componentDidMount() {
        this.styleManager.setupInitStyles();
        window.addEventListener('keydown',  (e) => {
            if (e.keyCode === ESCAPE.code) {
                if (this.state.activePopup) {
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
                                triggerAlerts={() => {
                                    this.setState({...this.state, activeAlerts: !this.state.activeAlerts})
                                }}/>
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
                    <Upload text={"Upload model"}
                            id={"Uploader"}
                            className={"Uploader"}
                            accept={".json,application/json"}
                            action={(e) => {
                                this.uploadModel(e)
                            }}/>
                    <TextButton
                        text={"Builder"}
                        className={"AddNewLayerBtn"}
                        action={this.triggerPopup}
                    />
                    <TextButton
                        text={"Send model"}
                        className={"SendBtn"}
                        action={this.sendModel}
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