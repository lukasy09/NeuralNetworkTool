import React from 'react';
import NetworkGraph from "../NetworkGraph/NetworkGraph";
import ModelToolBox from "../ModelToolBox/ModelToolBox";


export default class CreatorView extends React.Component {

    render(){
        return(
            <div className = "CreatorContainer">
                <NetworkGraph/>
                <ModelToolBox/>
            </div>
        )
    }
}