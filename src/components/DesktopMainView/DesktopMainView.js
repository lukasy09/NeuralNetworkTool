import React from 'react';
import {Link} from 'react-router-dom'
import {SETTINGS} from "../../settings/ApplicationSettings";

export default class DesktopMainView extends React.Component {


    render(){
        return(
            <div className = "MainViewContainer">
                <Link to={SETTINGS.routes.creator}>Creator</Link>
            </div>
        )
    }
}