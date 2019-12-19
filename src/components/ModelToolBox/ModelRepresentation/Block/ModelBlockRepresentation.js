import React from 'react';
import PropTypes from "prop-types";
import{Layer} from "./Layer/Layer";

export const ModelBlockRepresentation = (props) => {
   const modelLayers = props.data;
    return (
        <div className={"LayersContainer"}>
            {
                modelLayers.map((layer, index) => {
                    return (
                        <Layer key={index}
                               index={layer.index}
                               name={layer.name}
                               type={layer.type}
                               classType={layer.classType}
                               activation={layer.activation}
                               nodesNumber={layer.nodesNumber}
                               useBias = {layer.useBias}
                        />
                    )
                })
            }
        </div>
    )
};

ModelBlockRepresentation.propTypes = {
    layers: PropTypes.array
};