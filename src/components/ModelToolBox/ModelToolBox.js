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
    triggerLayerForm = () => {
        if (!this.state.popupActive) {
            this.setState({
                popupActive: true
            })
        }
    };

    render() {
        return (
            <>
                <div className={"ModelToolBox"}>
                    <TextButton
                        text={"Add a new layer"}
                        className={"AddNewLayerBtn"}
                        action={this.triggerLayerForm}
                    />
                </div>
                {this.state.popupActive ?
                   <AddLayerPopup/>: <></>
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