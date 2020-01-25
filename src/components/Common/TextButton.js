import React from 'react';
import PropTypes from 'prop-types';

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

TextButton.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};