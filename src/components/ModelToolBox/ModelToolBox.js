import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel, setModelCompilationParameters, setModelLayers} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import {ModelToolBoxStyle} from "./ModelToolBoxStyle";
import Editor from "./Editor/Editor";
import {Upload} from "../common/Upload";
import {ESCAPE} from "../../utils/Keyboard";
import {ModelValidator} from "../../logic/ModelValidator/ModelValidator";
import Alerts from "./Alerts/Alerts";
import {setAlerts} from "../../actions/alertsActions";
import {getFileData, uploadFormatType} from "../../utils/Upload";
import {KerasToCanonicalConverter} from "../../logic/Converter/KerasToCanonicalConverter";
import {JSONFormatConverter} from "../../logic/Converter/Converter";
import {handleApi} from "../../api/Api";
import {SETTINGS} from "../../settings/ApplicationSettings";
import {env} from "../../index";
import {ModelBlockRepresentation} from "./ModelRepresentation/Block/ModelBlockRepresentation";
import {ModelRepresentation} from "./ModelRepresentation/ModelRepresentation";
import {RepresentationGroup} from "./RepresentationGroup/RepresentationGroup";
import {ModelCodeRepresentation} from "./ModelRepresentation/Code/ModelCodeRepresentation";
import {setData} from "../../actions/dataActions";
import DataConfigurator from "./DataConfigurator/DataConfigurator";
import dataIcon from "../../assets/images/png/data-icon-negative.png";
import {DataPreprocessor} from "../../utils/DataPreprocessor";

export const editorScene = {
    LAYER: 'layers',
    PARAMETER: 'parameters'
};

export const modelRepresentationTypes = {
    BLOCK: 'block',
    CODE: 'code'
};

const availableRepresentations = [modelRepresentationTypes.BLOCK, modelRepresentationTypes.CODE];

class ModelToolBox extends React.Component {


    state = {
        styles: ModelToolBoxStyle.defaultStyle,
        activePopup: false,
        activeAlerts: false,
        scene: editorScene.LAYER,
        isModelValid: false,
        alerts: [],
        modelRepresentation: modelRepresentationTypes.BLOCK
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

    switchModelRepresentation = (option) => {
        this.styleManager.switchModelRepresentation(option);
    };

    /**
     * Submitting layers on the preview and replacing with the existing ones
     * @param graph
     * @param newParams
     * @param fit
     */
    submitModel = (graph, newParams, fit) => {
        this.props.setGraph(graph);
        this.props.setModel({
            layers: graph.layers,
            compilationParameters: newParams,
            fit: fit
        });
        this.updateAlerts(graph.layers);
        this.triggerPopup();
    };

    /**
     * Setting model from input json.
     * @param json
     */
    setModel = (json) => {
        let canonical = this.converter.convert(json).getData();
        this.props.setModel(canonical.model);
        this.props.setGraph(canonical.graph);
        this.updateAlerts(canonical.graph.layers);
    };

    /**
     * Setting data from csv.
     * @param csvData
     */
    setData = (csvData) => {
        let header = csvData.slice(0, 1);
        let trainData = csvData.slice(1);

        this.props.setData({
            header: header,
            data: trainData
        })
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
        getFileData(e, uploadFormatType.JSON,this.setModel);
    };

    uploadData = (e) => {
        getFileData(e, uploadFormatType.CSV, this.setData);
    };


    sendModel = () => {
        const config = (env === SETTINGS.runtimeEnv.development) ? SETTINGS.api.paths.dev.train : SETTINGS.api.paths.prod.train;
        const model = this.props.model;
        const dataInfo = this.props.dataInfo;
        const catIndexes = dataInfo.categoricalColumns;
        const data = DataPreprocessor.filterColumns(dataInfo.data, dataInfo.trainableColumns);

        const sendData = {
          model: model,
          dataInfo: {
              data: data,
              categoricalIndexes: catIndexes
          }
        };
        handleApi(config, sendData);
    };


    componentDidMount() {
        this.styleManager.setupInitStyles();
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === ESCAPE.code) {
                if (this.state.activePopup) {
                    this.triggerPopup();
                }
            }
        });
    }

    render() {
        const modelLayers = this.props.model.layers;
        let Representation;
        switch (this.state.modelRepresentation) {
            case modelRepresentationTypes.BLOCK:
                Representation = ModelRepresentation(ModelBlockRepresentation, modelLayers);
                break;
            case modelRepresentationTypes.CODE:
                Representation = ModelRepresentation(ModelCodeRepresentation);
                break;

            default:
                console.log("Unhandled model representation!");
        }

        return (
            <>
                <div className={"ModelToolBox"}
                     style={this.state.styles.modelToolBoxContainer}>

                    <RepresentationGroup options={availableRepresentations}
                                         action={this.switchModelRepresentation}/>

                    {this.props.alerts.length > 0 ?
                        <Alerts activeAlerts={this.state.activeAlerts}
                                triggerAlerts={() => {
                                    this.setState({...this.state, activeAlerts: !this.state.activeAlerts})
                                }}/>
                        : <></>
                    }
                    {Representation}
                    <Upload text={"Upload model"}
                            id={"Uploader"}
                            className={"Uploader"}
                            accept={"*.json"}
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
                    <Upload text={"Upload data"}
                            id={"DataUploader"}
                            className={"Data"}
                            accept={"*.csv"}
                            action={(e) => {this.uploadData(e)}}/>

                    {this.props.dataInfo.data.length > 0 ?
                        <div onClick={this.styleManager.controlDataPopup}
                             className={"DataDisplay"}>
                            <img src={dataIcon}
                                 alt={"Data icon"}
                                 width={50}
                                 height={50}/>
                        </div>: <></>
                    }
                </div>
                <DataConfigurator style={this.state.styles.dataPopup} />
                <Editor triggerPopup={this.triggerPopup}
                        submitModel={this.submitModel}
                        switchScene={this.switchScene}
                        style={this.state.styles.popup}
                        scene={this.state.scene}
                        altScene={this.state.scene === editorScene.LAYER ? editorScene.PARAMETER : editorScene.LAYER}/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        model: state.modelReducer,
        graph: state.graphReducer,
        alerts: state.alertsReducer.alerts,
        dataInfo: state.dataReducer
    }
};

const mapActionsToProps = {
    setModel: setModel,
    setGraph: setGraph,
    setModelLayers: setModelLayers,
    setModelCompilationParameters: setModelCompilationParameters,
    setData: setData,
    setAlerts: setAlerts
};

export default connect(mapStateToProps, mapActionsToProps)(ModelToolBox);