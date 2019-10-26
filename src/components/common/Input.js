import React from 'react';
import PropTypes from "prop-types";

export const Input = (props) => {
    const additionalClassName = props.className ? props.className : "";
    const defaultClassName = "UserInput";
    const className = `${defaultClassName} ${additionalClassName}`;
    return (
        <div className={className}
             style={props.style}>
            {props.label ?
                <label>{props.label.text}</label> : <></>}
            <input
                className={"Input"}
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

Input.propTypes = {
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