import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from "../../../../Chart/Chart";
import {DataGeneratorUtil} from "../../../../../logic/utils/DataGeneratorUtil";


/**
 * Configuration for generating custom data to display activation function.
 * @type {{from: number, to: number, threshold: number}}
 */
const OPTIONS = {
    from: -10,
    to: 10,
    threshold: 0.1
};

const SIZE = {
    width: 120,
    height: 80
};

export const Layer = (props) => {
    let data;
    let gen;
    if(props.activation){
        gen = DataGeneratorUtil.getGeneratorByActivation(props.activation);
        data = gen.generate(OPTIONS);
    }
    return (
        <div className={`LayerRepresentation ${props.type}`}>
            <div className={`Type ${props.type}`}>
                {props.type}
            </div>
            <div className={"Parameters"}>

            </div>
            <div className={"Name"}>
                Name: {props.name}
            </div>
            <div className={"ClassType"}>
                Class type: {props.classType}
            </div>
            <div className={"UseBias"}>
                Use Bias: {props.useBias.toString()}
            </div>

            <div className={"ActivationGroup"}>
                <span>{props.activation}</span>
                {props.activation ?
                    <Chart size={SIZE}
                       data={data}/> : <></>}
            </div>
        </div>
    )
};

Layer.propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    classType: PropTypes.string,
    activation: PropTypes.string,
    nodesNumber: PropTypes.number
};