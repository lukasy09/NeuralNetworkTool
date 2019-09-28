import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";
import AddLayerPopup from "./AddLayerForm/AddLayerPopup";

class ModelToolBox extends React.Component {


    state = {
        popupActive: true,
    };

    /**
     * Event listener, adding a new layer on user's click.
     */
    triggerPopup = () => {
            this.setState({
                popupActive: !this.state.popupActive
            })
    };

    submitLayers = ( l) => {
        console.log("HERE WE GO");
        console.log(l);
    };

    render() {
        return (
            <>
                <div className={"ModelToolBox"}>
                    <TextButton
                        text={"Add a new layer"}
                        className={"AddNewLayerBtn"}
                        action={this.triggerPopup}
                    />
                </div>
                {this.state.popupActive ?
                   <AddLayerPopup triggerPopup = {this.triggerPopup}
                                  submitLayers={this.submitLayers}/>: <></>
                }
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
    setGraph: setGraph
};

export default connect(mapStateToProps, mapActionsToProps)(ModelToolBox);