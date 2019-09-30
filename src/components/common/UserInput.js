import React from 'react';
import PropTypes from "prop-types";

export const UserInput = (props) => {
    const additionalClassName = props.className ? props.className : "";
    const defaultClassName = "UserInput";
    return (
        <div className={additionalClassName ? defaultClassName+ " " + additionalClassName : defaultClassName}
             style={props.style}>
            {props.label ?
                <label>{props.label.text}</label> : <></>}
            <input
                className={"UserInput"}
                type={props.type}
                onChange={props.action}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                value={props.value}
                min={props.min}
                max={props.max}>
            </input>
        </div>
    )
};

UserInput.propTypes = {
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number
};