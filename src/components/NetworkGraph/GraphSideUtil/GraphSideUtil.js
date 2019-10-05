import React from 'react';
import {LabelInfo} from "../../common/LabelInfo";
import {Exports} from "../Exports/Exports";
import PropTypes from "prop-types";
import {EXPORTS_TYPES} from "../../../NetworkGraphBuilder/utils/Exports";


const EXPORTS = [EXPORTS_TYPES.PNG, EXPORTS_TYPES.JPEG, EXPORTS_TYPES.JSON];


export const GraphSideUtil = (props) => {
    return (
        <>
            <Exports style={props.style}
                     formats={EXPORTS}/>
            <div onClick={props.action}
                 className={"GraphSideUtilContainer"}>
                <LabelInfo
                    text={props.exportText}
                    action={props.action}
                />
            </div>
        </>
    )
};

GraphSideUtil.propTypes = {
    exportText: PropTypes.string,
    action: PropTypes.func,
    style: PropTypes.object
};

