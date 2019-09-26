import React from 'react';

export const TextButton = (props)=>{
    const additionalClassName = props.className ? props.className : "";
    const defaultClassName = "TextButton";
    return(
        <div
            onClick={props.action}
            style={props.style}
            className={additionalClassName ? defaultClassName+ " " + additionalClassName : defaultClassName}>
            <span>{props.text}</span>
        </div>
    )
};