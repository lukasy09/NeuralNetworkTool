import React from 'react';
import {SETTINGS} from "../../settings/ApplicationSettings";
import ExpandingCanvas from "./ExpandingCanvas/ExpandingCanvas";


export default class CreatorView extends React.Component {


    render(){
        return(
            <div className = "CreatorContainer">
                <ExpandingCanvas
                    sizeFactors={SETTINGS.expandingCanvasSizeFactors}
                />
                <div className={"ToolBoxContainer"}>

                </div>
            </div>
        )
    }
}