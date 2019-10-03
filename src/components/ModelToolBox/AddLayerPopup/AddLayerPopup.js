import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {TextButton} from "../../common/TextButton";
import {UserInput} from "../../common/UserInput";
import {UserSelect} from "../../common/UserSelect";
import {PreviewGraph} from "./PreviewGraph/PreviewGraph";
import {ModelValidator} from "../../../logic/ModelValidator/ModelValidator";

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
    SETTINGS.model.layerActivations.RELU,
    SETTINGS.model.layerActivations.SIGMOID,
    SETTINGS.model.layerActivations.SOFTMAX,
    SETTINGS.model.layerActivations.NONE,
];

class AddLayerPopup extends React.Component {

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
                // type: newIndex > 0 ? SETTINGS.model.layerTypes.HIDDEN : SETTINGS.model.layerTypes.INPUT,
                // activation: newIndex === 0 || this.state.currentLayer.type === SETTINGS.model.layerTypes.OUTPUT ? SETTINGS.model.layerActivations.NONE
                //     : (this.state.currentLayer.activation === SETTINGS.model.layerActivations.NONE ? SETTINGS.model.layerActivations.RELU :
                //     this.state.currentLayer.activation)
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
                    // type: newIndex > 0 ? SETTINGS.model.layerTypes.HIDDEN : SETTINGS.model.layerTypes.INPUT,
                    // activation: newIndex === 0 || this.state.currentLayer.type === SETTINGS.model.layerTypes.OUTPUT ? SETTINGS.model.layerActivations.NONE
                    //     : this.state.currentLayer.activation
                }
            })
        }
    };

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
            }
        };
    }

    componentDidMount() {
        this.setState({
            defaultLayerType: this.state.subGraph.layers.length > 0 ? SETTINGS.model.layerTypes.HIDDEN : SETTINGS.model.layerTypes.INPUT
        })
    }

    render() {
        //let filteredLayerTypes = ModelValidator.filterOpenLayerTypes(this.state.subGraph.layers);
        //let filteredLayerActivation = ModelValidator.filterActivationsByLayerType(this.state.currentLayer.type, layerActivations);
        return (
            <div className={"AddLayerPopupContainer"}
                 style={this.props.style}>
                <div className={"Layer"}>
                    <div className={"FeatureWrapper"}>
                        <UserInput action={(e) => {
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
                        <UserSelect action={(e) => {
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
                                    value={this.state.defaultLayerType}
                                    options={layerClassTypes}/>
                    </div>

                    <div className={"FeatureWrapper"}>
                        <UserSelect action={(e) => {
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
                        <UserSelect action={(e) => {
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
                        <UserInput action={(e) => {
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

                    <TextButton text={"Submit"}
                                action={() => {
                                    this.props.submitLayers(this.state.subGraph.layers)
                                }}
                                className={"SubmitBtn"}/>

                    <TextButton text={"X"}
                                action={this.props.triggerPopup}
                                className={"ExitBtn"}/>
                </div>

                <PreviewGraph graph={this.state.subGraph}/>

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

export default connect(mapStateToProps)(AddLayerPopup);

AddLayerPopup.propTypes = {
    triggerPopup: PropTypes.func,
    submitLayers: PropTypes.func,
    style: PropTypes.object
};