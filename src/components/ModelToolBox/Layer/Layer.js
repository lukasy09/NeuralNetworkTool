import React from 'react';
import PropTypes from 'prop-types';

export const Layer = (props) => {
    return (
        <div className={`LayerRepresentation ${props.type}`}>
            <div className={`Type ${props.type}`}>
                {props.type}
            </div>
        </div>
    )
};

Layer.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    classType: PropTypes.string,
    activation: PropTypes.string
};