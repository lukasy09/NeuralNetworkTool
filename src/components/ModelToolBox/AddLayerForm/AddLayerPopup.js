import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {TextButton} from "../../common/TextButton";

const layerClassTypes = [
    SETTINGS.model.layerClassTypes.DENSE,
    //SETTINGS.model.layerClassTypes.CONV2D,
];

const layerTypes = [
    SETTINGS.model.layerTypes.INPUT,
    SETTINGS.model.layerTypes.HIDDEN,
    SETTINGS.model.layerTypes.OUTPUT
];

class AddLayerPopup extends React.Component{
    state = {
      addLayersNumber: 1 // Represents the number of layers on the popup
    };

    render(){
        const layerIndex = (this.props.model.layers.length + this.state.addLayersNumber) - 1;
        const classTypeDefaultValue = SETTINGS.model.layerClassTypes.DENSE;

        return(
            <div className={"AddLayerPopupContainer"}>
                <div className={"Layer"}>
                    <input defaultValue={`Layer ${layerIndex}`}
                            type={"text"}/>
                    <select defaultValue={classTypeDefaultValue}>
                        {layerClassTypes.map((layerClassType, index)=>{
                            return(
                                <option key={index}>
                                    {layerClassType.toUpperCase()}
                                </option>
                            )
                        })}
                    </select>
                    <label>
                    Neuron's count
                    <input type={"number"}
                           defaultValue={1}
                           min={1}/>
                    </label>
                    <TextButton text={"Submit"}/>
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