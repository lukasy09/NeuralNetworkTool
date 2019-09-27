import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";


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

LinkButton.propTypes = {
    text: PropTypes.string,
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    path: PropTypes.string
};