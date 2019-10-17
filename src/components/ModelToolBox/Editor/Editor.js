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


// topology
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

const useBias = [
    false,
    true
];

const initializers = [
    SETTINGS.model.initializers.ZEROS,
    SETTINGS.model.initializers.ONES,
    SETTINGS.model.initializers.RANDOM_UNIFORM
];

// Training
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

/**
 * @TODO: Split into 2 layer scenes components(Parameters & layer)
 */
class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subGraph: {layers: []},
            currentLayer: {
                index: this.props.graph.layers.length,
                name: `Layer ${this.props.graph.layers.length}`,
                type: SETTINGS.model.layerTypes.INPUT,
                classType: SETTINGS.model.layerClassTypes.DENSE,
                nodesNumber: SETTINGS.model.layerDefaults.units,
                activation: SETTINGS.model.layerActivations.NONE,
                useBias: SETTINGS.model.layerDefaults.useBias,
                kernelInitializer: SETTINGS.model.initializers.ZEROS,
                biasInitializer: SETTINGS.model.initializers.ZEROS
            },

            modelTraining: {
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
                                this.props.submitModel(this.state.subGraph, this.state.modelTraining.compilationParameters)
                            }}
                            className={"SubmitBtn"}/>

                <div className={"LayerScene"}
                     style={this.props.scene === EDITOR_SCENE.PARAMETER ? {display: 'none'} : {}}>
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
                                   defaultValue={this.state.currentLayer.nodesNumber}
                                   min={1}
                                   label={{
                                       text: "Units"
                                   }}
                            />
                        </div>
                        <div className={"FeatureWrapper"}>
                            <Select action={(e) => {
                                this.setState({
                                    currentLayer: {
                                        ...this.state.currentLayer,
                                        useBias: e.target.value
                                    }
                                })
                            }}
                                    className={"LayerInitializer"}
                                    label={{
                                        text: 'Use bias'
                                    }}
                                    defaultValue={this.state.currentLayer.activation}
                                    options={useBias}/>
                        </div>

                        <div className={"FeatureWrapper"}>
                            <Select action={(e) => {
                                this.setState({
                                    currentLayer: {
                                        ...this.state.currentLayer,
                                        "kernelInitializer": e.target.value.toLowerCase()
                                    }
                                })
                            }}
                                    className={"LayerInitializer"}
                                    label={{
                                        text: 'Kernel initializer'
                                    }}
                                    defaultValue={this.state.currentLayer.activation}
                                    options={initializers}/>
                        </div>

                        <div className={"FeatureWrapper"}>
                            <Select action={(e) => {
                                this.setState({
                                    currentLayer: {
                                        ...this.state.currentLayer,
                                        biasInitializer: e.target.value.toLowerCase()
                                    }
                                })
                            }}
                                    className={"LayerInitializer"}
                                    label={{
                                        text: 'Bias initializer'
                                    }}
                                    defaultValue={this.state.currentLayer.activation}
                                    options={initializers}/>
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

                <div className={'ParametersScene'}
                     style={this.props.scene === EDITOR_SCENE.LAYER ? {display: 'none'} : {}}>
                    <div className={"Parameters"}>
                        <div className={"FeatureWrapper"}>
                            <Select action={(e) => {
                                this.setState({
                                    ...this.state,
                                    model: {
                                        ...this.state.modelTraining,
                                        compilation: {
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
                                    defaultValue={this.state.modelTraining.compilationParameters.optimizer}
                                    options={LOSSES}/>
                        </div>
                        <div className={"FeatureWrapper"}>
                            <Select action={(e) => {
                                this.setState({
                                    ...this.state,
                                    model: {
                                        ...this.state.modelTraining,
                                        compilation: {
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
                                    defaultValue={this.state.modelTraining.compilationParameters.loss}
                                    options={OPTIMIZERS}/>
                        </div>

                        <div className={"FeatureWrapper"}>
                            <Select action={(e) => {
                                this.setState({
                                    ...this.state,
                                    model: {
                                        ...this.state.modelTraining,
                                        compilation: {
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
                                    defaultValue={this.state.modelTraining.compilationParameters.metrics[0]}
                                    options={METRICS}/>
                        </div>
                    </div>
                </div>

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
    submitModel: PropTypes.func,
    switchScene: PropTypes.func,
    scene: PropTypes.string,
    altScene: PropTypes.string,
    style: PropTypes.object
};

export default connect(mapStateToProps)(Editor);