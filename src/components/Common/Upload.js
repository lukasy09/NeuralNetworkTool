import React from 'react';
import PropTypes from 'prop-types';

export const Upload = (props) => {
    const className = props.className ? props.className : '';
    return (
        <div className={`UploadContainer ${className}`}>
            <input id={props.id}
                   type="file"
                   placeholder={props.text}
                   className={"Uploader"}
                   accept={props.accep}
                   onChange={props.action}/>
            <label htmlFor={props.id}>{props.text}</label>
        </div>
    )
};


Upload.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.func,
    accept: PropTypes.string
};