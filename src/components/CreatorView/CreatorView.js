import React from 'react';
import {SETTINGS} from "../../settings/ApplicationSettings";
import NetworkGraph from "./NetworkGraph/NetworkGraph";


export default class CreatorView extends React.Component {

    render(){
        return(
            <div className = "CreatorContainer">
                <NetworkGraph/>
                <div className={"ToolBoxContainer"}>

                </div>
            </div>
        )
    }
}