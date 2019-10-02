import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from "../../Chart/Chart";
import {DataGenerator} from "../../../logic/DataGenerator/DataGenerator";
import {sigmoid} from "../../../logic/Activations/sigmoid";
import {relu} from "../../../logic/Activations/relu";

let gen = new DataGenerator(relu);
const data = gen.generate({
    from: -100,
    to: 100,
    threshold: 30
});

export const Layer = (props) => {
    const SIZE = {
      width: 140,
      height: 60
    };
    return (
        <div className={`LayerRepresentation ${props.type}`}>
            <div className={`Type ${props.type}`}>
                {props.type}
            </div>
            <div className={"Name"}>
                {props.name}
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
    name: PropTypes.string,
    type: PropTypes.string,
    classType: PropTypes.string,
    activation: PropTypes.string
};