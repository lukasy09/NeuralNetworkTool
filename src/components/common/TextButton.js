import React from 'react';

export const TextButton = (props)=>{
    return(
        <div
            onClick={props.action}
            style={props.style}
            className="TextButton">
            <span>{props.text}</span>
        </div>
    )
};