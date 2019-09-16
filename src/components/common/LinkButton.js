import React from 'react';
import {Link} from 'react-router-dom';

export const LinkButton = (props)=>{
    return(
        <div
            onClick={props.action}
            style={props.style}
            className= "LinkButton Submit">
            <Link to={props.path}>{props.text}</Link>
        </div>
    )
};