import React from 'react';

const SKEW_DEFAULT = "LeftSkew";
const SKEW_EDITOR = `${SKEW_DEFAULT} shifted`;

export const DesktopBackground = (props)=>{
    const skewType = props.activeBackground ? SKEW_EDITOR : SKEW_DEFAULT;
    return(
        <div className={"DesktopBackground"}>
            <div className={skewType}>

            </div>
        </div>
    )
};