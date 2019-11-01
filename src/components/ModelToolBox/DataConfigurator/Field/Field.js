import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from "../../../common/Checkbox";
import {Select} from "../../../common/Select";


export const DataField = (props)=>{
    return(
        <div className={`Field ${props.className}`}>
            {props.isHeader ? <Checkbox action={props.includeAction}/> : <></>}
            {props.isHeader ? <Select options={props.dataTypes}
                                      action={props.selectTypeAction}/> : <></>}

            <span>{props.fieldName}</span>
        </div>
    )
};

DataField.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    isHeader: PropTypes.bool,
    includeAction: PropTypes.func,
    selectTypeAction: PropTypes.func,
    dataTypes: PropTypes.array
};