import React from 'react';
import PropTypes from "prop-types";

export const UserInput = (props)=>{
    return(
        <div className="UserInput"
             style={props.style}>
            <input
                type={props.type}
                onChange={props.action}
                placeholder={props.placeholder}
                className="UserInput">
            </input>
        </div>

    )
};

UserInput.propTypes = {
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string
};