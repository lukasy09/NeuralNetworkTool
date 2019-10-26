import React from 'react';
import PropTypes from "prop-types";
import codeIcon from '../../../assets/images/png/code-negative.png';
import blockIcon from '../../../assets/images/jpg/network-negative.png';
import {modelRepresentationTypes} from "../ModelToolBox";

const size = {
  width: '35',
  height: '35'
};

export const RepresentationGroup = (props) => {

    return (
        <div className={"RepGroup"}>
            {props.options.map((option, index)=>{
                const attributes = getAttributes(option);
                return(
                    <div key={index}
                         onClick={()=>{props.action(option)}}
                         className={"RepOption"}
                         title={`${option} scene`}>
                        <img src={attributes.icon}
                             alt={"Action icon"}
                             width={size.width}
                             height={size.height}/>
                    </div>
                )
            })
            }
        </div>
    )
};

const getAttributes = (option) => {
    switch (option) {
        case modelRepresentationTypes.BLOCK:
            return {
                icon: blockIcon,
            };
        case modelRepresentationTypes.CODE:
            return {
                icon: codeIcon,
            };
        default:
            throw new Error('Wrong option!');
    }
};

RepresentationGroup.propTypes = {
    options: PropTypes.array,
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};