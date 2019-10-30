import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from "../../../common/Checkbox";


export const DataField = (props)=>{
    return(
        <div className={"Field"}>
            {props.isHeader ? <Checkbox action={props.action}/> : <></>}
            <span>{props.fieldName}</span>
        </div>
    )
};

DataField.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    isHeader: PropTypes.bool,
    action: PropTypes.func
};