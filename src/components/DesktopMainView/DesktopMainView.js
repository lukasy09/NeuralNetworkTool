import React from 'react';
import {Link} from 'react-router-dom'
import {SETTINGS} from "../../settings/ApplicationSettings";
import StartInfoInput from "./StartInfoInput/StartInfoInput";

export default class DesktopMainView extends React.Component {


    render(){
        return(
            <div className = "MainViewContainer">
                <StartInfoInput/>
            </div>
        )
    }
}
