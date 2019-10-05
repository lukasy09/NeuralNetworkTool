import React from 'react';
import PropTypes from "prop-types";

export const Select = (props) => {
    const additionalClassName = props.className ? props.className : "";
    const defaultClassName = "UserSelect";
    return (
        <div className={additionalClassName ? defaultClassName+ " " + additionalClassName : defaultClassName}>
            {props.label ?
                <label>{props.label.text}</label> : <></>}
            <select onChange={props.action}
                    value={props.value}
                    defaultValue={props.defaultValue}>
                {props.options.map((value, index)=>{
                    return(
                        <option key={index}>
                            {value.toUpperCase()}
                        </option>
                    )
                })}
            </select>
        </div>
    )
};

Select.propTypes = {
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    defaultValue: PropTypes.string,
    label: PropTypes.object,
    value: PropTypes.string
};