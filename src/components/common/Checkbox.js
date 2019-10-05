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

// CustomCheckbox.propTypes = {
//     text: PropTypes.string,
//     action: PropTypes.func,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     path: PropTypes.string
// };