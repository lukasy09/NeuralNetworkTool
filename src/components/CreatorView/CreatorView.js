import React from 'react';
import {SETTINGS} from "../../settings/ApplicationSettings";
import {Link} from "react-router-dom";


export default class CreatorView extends React.Component {


    render(){
        return(
            <div className = "CreatorContainer">
                Creator View
                <Link to={SETTINGS.routes.root}>Creator</Link>
            </div>
        )
    }
}