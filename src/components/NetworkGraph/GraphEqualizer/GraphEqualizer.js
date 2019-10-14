import React from 'react';
import PropTypes from 'prop-types';
import centerIcon from '../../../assets/images/jpg/center-icon.jpg';
import zoomInIcon from '../../../assets/images/png/zoom-in.png';
import zoomOutIcon from '../../../assets/images/png/zoom-out.png';
import {userActions} from "../../../NetworkGraphBuilder/utils/EqualizerSettings";

const size = {
    width: '25',
    height: '25'
};

/**
 * @Todo FIX zooms in/out
 */
export const GraphEqualizer = (props) => {
    return (
        <div className={"EqualizerContainer"}>
            {props.actionList.map((action, index) => {
                let attributes = getActionAttributes(action, {center: props.center,
                                                              zoomIn: props.zoomIn,
                                                              zoomOut: props.zoomOut});
                return (
                    <div key={index}
                         onClick={attributes.actionMethod}
                         className={"Equalizer"}>
                        <img src={attributes.icon}
                             alt={"Action icon"}
                             width={size.width}
                             height={size.height}/>
                    </div>
                )
            })}
        </div>
    )
};

const getActionAttributes = (action, methods) => {
    const {CENTER, ZOOM_IN, ZOOM_OUT} = userActions;
    switch (action) {
        case CENTER:
            return {
                icon: centerIcon,
                actionMethod: methods.center
            };
        case ZOOM_IN:
            return {
                icon: zoomInIcon,
                actionMethod: methods.zoomIn
            };
        case ZOOM_OUT:
            return {
                icon: zoomOutIcon,
                actionMethod: methods.zoomOut
            };
        default:
            throw new Error('Wrong graph action icon!');
    }
};


GraphEqualizer.propTypes = {
    actionList: PropTypes.array,
    center: PropTypes.func,
    zoomIn: PropTypes.func,
    zoomOut: PropTypes.func
};