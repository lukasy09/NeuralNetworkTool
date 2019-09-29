import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {TextButton} from "../../common/TextButton";
import {UserInput} from "../../common/UserInput";
import {UserSelect} from "../../common/UserSelect";

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
  SETTINGS.model.layerActivations.SOFTMAX
];

class AddLayerPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newLayersCount: 0, // Represents the number of (new)layers on the popup,
        };

        this.layerIndex = this.props.graph.layers.length + this.state.newLayersCount;
        this.classTypeDefaultValue = SETTINGS.model.layerClassTypes.DENSE;
        this.typeDefaultValue = SETTINGS.model.layerTypes.INPUT;
        this.activationDefaultValue = SETTINGS.model.layerActivations.RELU;

        this.layer = {
            index: this.layerIndex,
            name: `Layer ${this.layerIndex}`,
            classType: this.classTypeDefaultValue,
            type: this.typeDefaultValue,
            activation: this.activationDefaultValue,
            nodesNumber: 1
        };
        this.layers =[];
    }

    /**
     * Adding a current layer(with data displayed on popup) to layers list and updating the index
     */
    addLayer = () => {
        this.layer.index = this.layerIndex;
        this.layers.push(Object.assign({}, this.layer));
        this.layerIndex++;
    };


    render() {
        return (
            <div className={"AddLayerPopupContainer"}
                 style={this.props.style}>
                <div className={"Layer"}>
                    <div className={"FeatureWrapper"}>
                        <UserInput action={(e) => {this.layer.name = e.target.value}}
                                   className={"LayerNameInput"}
                                   type={"text"}
                                   defaultValue={`Layer ${this.layerIndex}`}
                                   label={{
                                       text: 'Layer name'
                                   }}

                        />
                    </div>
                    <div className={"FeatureWrapper"}>
                        <UserSelect action={(e) => {this.layer.classType = e.target.value.toLowerCase()}}
                                    className={"LayerClassTypeSelect"}
                                    label={{
                                        text: 'Layer class type'
                                    }}
                                    defaultValue={this.classTypeDefaultValue}
                                    options={layerClassTypes}/>
                    </div>

                    <div className={"FeatureWrapper"}>
                        <UserSelect action={(e) => {this.layer.type = e.target.value.toLowerCase()}}
                                    className={"LayerClassTypeSelect"}
                                    label={{
                                        text: 'Layer type'
                                    }}
                                    defaultValue={this.typeDefaultValue}
                                    options={layerTypes}/>
                    </div>

                    <div className={"FeatureWrapper"}>
                        <UserSelect action={(e) => {this.layer.activation = e.target.value.toLowerCase()}}
                                    className={"LayerActivation"}
                                    label={{
                                        text: 'Layer activation'
                                    }}
                                    defaultValue={this.activationDefaultValue}
                                    options={layerActivations}/>
                    </div>

                    <div className={"FeatureWrapper"}>
                        <UserInput action={(e) => {this.layer.nodesNumber = parseInt(e.target.value)}}
                                   className={"LayerCountInput"}
                                   type={"number"}
                                   defaultValue={"1"}
                                   min={1}
                                   label={{
                                       text: "Neuron's count"
                                   }}
                        />
                    </div>

                    <TextButton text={"Add"}
                                action={this.addLayer}
                                className={"AddBtn"}/>

                    <TextButton text={"Submit"}
                                action={() => {this.props.submitLayers(this.layers)}}
                                className={"SubmitBtn"}/>

                    <TextButton text={"X"}
                                action={this.props.triggerPopup}
                                className={"ExitBtn"}/>
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

export default connect(mapStateToProps)(AddLayerPopup);

// AddLayerPopup.PropTypes = {
//
// };