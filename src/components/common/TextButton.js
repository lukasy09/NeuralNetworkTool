import React from 'react';

export const TextButton = (props)=>{
    return(
        <div
            onClick={props.action}
            style={props.style}
            className={props.className}>
            <span>{props.text}</span>
        </div>
    )
};