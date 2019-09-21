import React from 'react';

export const LabelInfo = (props)=>{
    const additionalClassName = props.className ? props.className : "";
    const defaultClassName = "LabelInfoWrapper";
    return(
        <div
            style={props.style}
            className={additionalClassName ? defaultClassName+ " " + additionalClassName : defaultClassName}>
            <span>{props.text}</span>
        </div>
    )
};