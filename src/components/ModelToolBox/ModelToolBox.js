import React from 'react';
import {TextButton} from "../common/TextButton";
import {connect} from 'react-redux';
import {setModel} from "../../actions/modelActions";
import {setGraph} from "../../actions/graphActions";

class ModelToolBox extends React.Component {


    state = {

    };

    /**
     * Event listener, adding a new layer on user's click.
     */
    addNewLayer = () => {
        this.props.setGraph();
    };

    render(){
        return(
            <div className = {"ModelToolBox"}>
                <div className={"NewLayerContainer"}>
                    <TextButton
                        text={"Add a new layer"}
                        className={"AddNewLayerBtn"}
                        action={this.addNewLayer}
                    />
                </div>

            </div>
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