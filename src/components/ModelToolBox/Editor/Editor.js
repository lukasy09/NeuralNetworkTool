import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {EDITOR_SCENE} from "../ModelToolBox";
import {TextButton} from "../../common/TextButton";
import {Input} from "../../common/Input";
import {Select} from "../../common/Select";
import {PreviewGraph} from "./PreviewGraph/PreviewGraph";
import {PopupBlur} from "../../common/PopupBlur";


const layerClassTypes = [
    SETTINGS.model.layerClassTypes.DENSE,
    //SETTINGS.model.layerClassTypes.CONV2D,
];

const layerTypes = [
    SETTINGS.model.layerTypes.INPUT,
    SETTINGS.model.layerTypes.HIDDEN,
    SETTINGS.model.layerTypes.OUTPUT
];

const layerActivations = [
    SETTINGS.model.layerActivations.NONE,
    SETTINGS.model.layerActivations.RELU,
    SETTINGS.model.layerActivations.SIGMOID,
    SETTINGS.model.layerActivations.SOFTMAX,
];

const OPTIMIZERS = [
    SETTINGS.model.compilation.optimizer.ADAM,
    SETTINGS.model.compilation.optimizer.RMSPROP,
    SETTINGS.model.compilation.optimizer.SGD
];
const LOSSES = [
    SETTINGS.model.compilation.loss.BINARY_CROSSENTROPY,
    SETTINGS.model.compilation.loss.CATEGORICAL_CROSSENTROPY,
    SETTINGS.model.compilation.loss.MSE
];

const METRICS = [
    SETTINGS.model.compilation.metrics.ACCURACY
];

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subGraph: {layers: []},
            currentLayer: {
                index: this.props.graph.layers.length,
                name: `Layer ${this.props.graph.layers.length}`,
                classType: SETTINGS.model.layerClassTypes.DENSE,
                type: SETTINGS.model.layerTypes.INPUT,
                activation: SETTINGS.model.layerActivations.NONE,
                nodesNumber: 5
            },

            model: {
                compilationParameters: {
                    optimizer: SETTINGS.model.compilation.optimizer.ADAM,
                    loss: SETTINGS.model.compilation.loss.BINARY_CROSSENTROPY,
                    metrics: [SETTINGS.model.compilation.metrics.ACCURACY],
                }
            }
        };
    }

    /**
     * Adding a current layer(with data displayed on popup) to layers list and updating the index
     */
    addLayer = () => {
        const newIndex = this.state.currentLayer.index + 1;
        this.setState({
            index: newIndex,
            subGraph: {
                layers: this.state.subGraph.layers.concat(this.state.currentLayer)
            },
            currentLayer: {
                ...this.state.currentLayer,
                name: `Layer ${newIndex}`,
                index: newIndex,
            },
        });
    };
    /**
     * Removing(popping) last layer from the state list. "Back btn" listener.
     */
    removeLastLayer = () => {
        const newIndex = this.state.currentLayer.index - 1;
        if (this.state.subGraph.layers.length >= 1) {
            let current = this.state.subGraph.layers;
            current.pop();
            this.setState({
                subGraph: {
                    layers: current
                },
                currentLayer: {
                    ...this.state.currentLayer,
                    name: `Layer ${newIndex}`,
                    index: newIndex,
                }
            })
        }
    };

    componentDidMount() {
        this.setState({
            defaultLayerType: this.state.subGraph.layers.length > 0 ? SETTINGS.model.layerTypes.HIDDEN : SETTINGS.model.layerTypes.INPUT
        })
    }

    render() {
        return (
            <div className={"EditorContainer"}
                 style={this.props.style}>

                <PopupBlur/>

                <TextButton text={this.props.altScene.toUpperCase()}
                            className={'SceneSwitchBtn'}
                            action={this.props.switchScene}/>
                <TextButton text={"Esc"}
                            action={this.props.triggerPopup}
                            className={"ExitBtn"}/>
                <TextButton text={"Submit"}
                            action={() => {
                                this.props.submitModel(this.state.subGraph.layers, this.state.model.compilationParameters)
                            }}
                            className={"SubmitBtn"}/>

                {this.props.scene === EDITOR_SCENE.LAYER ?
                    <div className={"LayerScene"}>
                        <div className={"Layer"}>
                            <div className={"FeatureWrapper"}>
                                <Input action={(e) => {
                                    this.setState({currentLayer: {...this.state.currentLayer, name: e.target.value}})
                                }}
                                       className={"LayerNameInput"}
                                       type={"text"}
                                       value={`Layer ${this.state.currentLayer.index}`}
                                       label={{
                                           text: 'Layer name'
                                       }}

                                />
                            </div>
                            <div className={"FeatureWrapper"}>
                                <Select action={(e) => {
                                    this.setState({
                                        currentLayer: {
                                            ...this.state.currentLayer,
                                            classType: e.target.value.toLowerCase()
                                        }
                                    })
                                }}
                                        className={"LayerClassTypeSelect"}
                                        label={{
                                            text: 'Layer class type'
                                        }}
                                        defaultValue={this.state.defaultLayerType}
                                        options={layerClassTypes}/>
                            </div>

                            <div className={"FeatureWrapper"}>
                                <Select action={(e) => {
                                    this.setState({
                                        currentLayer: {
                                            ...this.state.currentLayer,
                                            type: e.target.value.toLowerCase()
                                        }
                                    })
                                }}
                                        className={"LayerClassTypeSelect"}
                                        label={{
                                            text: 'Layer type'
                                        }}
                                        defaultValue={this.state.defaultLayerType}
                                        options={layerTypes}/>
                            </div>

                            <div className={"FeatureWrapper"}>
                                <Select action={(e) => {
                                    this.setState({
                                        currentLayer: {
                                            ...this.state.currentLayer,
                                            activation: e.target.value.toLowerCase()
                                        }
                                    })
                                }}
                                        className={"LayerActivation"}
                                        label={{
                                            text: 'Layer activation'
                                        }}
                                        defaultValue={this.state.currentLayer.activation}
                                        options={layerActivations}/>
                            </div>

                            <div className={"FeatureWrapper"}>
                                <Input action={(e) => {
                                    this.setState({
                                        currentLayer: {
                                            ...this.state.currentLayer,
                                            nodesNumber: parseInt(e.target.value)
                                        }
                                    })
                                }}
                                       className={"LayerCountInput"}
                                       type={"number"}
                                       defaultValue={"5"}
                                       min={1}
                                       label={{
                                           text: "Neuron's count"
                                       }}
                                />
                            </div>

                            {this.state.subGraph.layers.length >= 1 ?
                                <TextButton text={"Revert"}
                                            action={this.removeLastLayer}
                                            className={"RemoveBtn"}/> : <></>
                            }

                            <TextButton text={"Add"}
                                        action={this.addLayer}
                                        className={"AddBtn"}/>
                        </div>

                        <PreviewGraph graph={this.state.subGraph}/>
                    </div>
                    :
                    <div className={'ParametersScene'}>
                        <div className={"Parameters"}>
                            <div className={"FeatureWrapper"}>
                                <Select action={(e) => {
                                    this.setState({
                                        model: {
                                            ...this.state.model,
                                            compilation:{
                                                ...this.state.compilation,
                                                optimizer: e.target.value.toLowerCase()
                                            }
                                        }
                                    })
                                }}
                                        className={"ParameterSelect enlarged"}
                                        label={{
                                            text: 'Loss'
                                        }}
                                        defaultValue={this.state.model.compilationParameters.optimizer}
                                        options={LOSSES}/>
                            </div>
                            <div className={"FeatureWrapper"}>
                                <Select action={(e) => {
                                    this.setState({
                                        model: {
                                            ...this.state.model,
                                            compilation:{
                                                ...this.state.compilation,
                                                optimizer: e.target.value.toLowerCase()
                                            }
                                        }
                                    })
                                }}
                                        className={"ParameterSelect enlarged"}
                                        label={{
                                            text: 'Optimizer'
                                        }}
                                        defaultValue={this.state.model.compilationParameters.loss}
                                        options={OPTIMIZERS}/>
                            </div>

                            <div className={"FeatureWrapper"}>
                                <Select action={(e) => {
                                    this.setState({
                                        model: {
                                            ...this.state.model,
                                            compilation:{
                                                ...this.state.compilation,
                                                metrics: e.target.value.toLowerCase()
                                            }
                                        }
                                    })
                                }}
                                        className={"ParameterSelect enlarged"}
                                        label={{
                                            text: 'Metrics'
                                        }}
                                        defaultValue={this.state.model.compilationParameters.metrics}
                                        options={METRICS}/>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        model: state.modelReducer,
        graph: state.graphReducer
    };
};

Editor.propTypes = {
    triggerPopup: PropTypes.func,
    submitLayers: PropTypes.func,
    switchScene: PropTypes.func,
    scene: PropTypes.string,
    altScene: PropTypes.string,
    style: PropTypes.object
};

export default connect(mapStateToProps)(Editor);