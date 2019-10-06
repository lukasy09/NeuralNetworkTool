import React from 'react';
import PropTypes from "prop-types";

const CHECKBOX = "checkbox";

export const Checkbox = (props)=>{
    return(
        <div className={"UserCheckbox"}>
            <input onChange={props.action}
                   className={`UserCheckbox ${props.className}`}
                   type={CHECKBOX}
                   name={props.name}
            />
            {
                props.label ?
                    <label htmlFor={props.name}>{props.label.text}</label>: <></>
            }
        </div>

    )
};

Checkbox.propTypes = {
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.object
};