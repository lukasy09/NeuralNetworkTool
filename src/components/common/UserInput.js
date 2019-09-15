import React from 'react';

export const UserInput = (props)=>{
    return(
        <div className="UserInput"
             style={props.style}>
            <input
                type={props.type}
                onChange={props.action}
                placeholder={props.placeholder}
                className="UserInput">
            </input>
        </div>

    )
};