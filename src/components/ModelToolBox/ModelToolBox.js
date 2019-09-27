import React from 'react';
import {TextButton} from "../common/TextButton";


export default class ModelToolBox extends React.Component {


    /**
     * Event listener, adding a new layer on user's click.
     */
    addNewLayer = () => {
        console.log("Adding a new layer!")
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