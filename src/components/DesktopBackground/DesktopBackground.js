import React from 'react';
import VisualisationNetwork from "./VisulisationNetwork/VisualisationNetwork";
const SKEW_DEFAULT = "LeftSkew";
const SKEW_EDITOR = `${SKEW_DEFAULT} shifted`;

export const DesktopBackground = (props)=>{
    const skewType = props.activeBackground ? SKEW_EDITOR : SKEW_DEFAULT;
    const currentStyle = props.activeBackground ? {background:'red'} : {};
    return(
        <div className={"DesktopBackground"}>
            <div className={skewType}>
            </div>
            <VisualisationNetwork style={currentStyle}/>
        </div>
    )
};