import React from 'react';
import PropTypes from "prop-types";

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


LabelInfo.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};