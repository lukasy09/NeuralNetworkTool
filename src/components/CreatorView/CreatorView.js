import React from 'react';
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