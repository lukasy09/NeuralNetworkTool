import React from 'react';
import PropTypes from 'prop-types';
import centerIcon from '../../../assets/images/jpg/center-icon.jpg';
import zoomInIcon from '../../../assets/images/png/zoom-in.png';
import zoomOutIcon from '../../../assets/images/png/zoom-out.png';
import {userActions} from "../../../NetworkGraphBuilder/utils/Equalizer";

const size = {
  width: '25',
  height: '25'
};

export const GraphEqualizer = (props)=>{
    return(
        <div className={"EqualizerContainer"}>
            {props.actions.map((action, index)=>{
                let imgObj = getActionIcon(action);
                return(
                    <div key={index}
                         onClick={()=>{}}
                         className={"Equalizer"}>
                        <img src={imgObj}
                             alt={"Action icon"}
                             width={size.width}
                             height={size.height}/>
                    </div>
                )
            })}
        </div>
    )
};

const getActionIcon =(action) =>{
    const {CENTER, ZOOM_IN, ZOOM_OUT} = userActions;
    switch (action){
        case CENTER:
            return centerIcon;
        case ZOOM_IN:
            return zoomInIcon;
        case ZOOM_OUT:
            return zoomOutIcon;
        default:
            throw new Error('Wrong graph action icon!');
    }
};

const getAction = (action) => {

};

GraphEqualizer.propTypes = {
  cy: PropTypes.object,
  actions: PropTypes.array
};