import React from 'react';

export const LabelInfo = (props)=>{
    return(
        <div
            style={props.style}
            className={"LabelInfoWrapper" + " " + props.className}>
            <span>{props.text}</span>
        </div>
    )
};