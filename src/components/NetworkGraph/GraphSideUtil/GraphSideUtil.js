import React from 'react';
import {LabelInfo} from "../../common/LabelInfo";
import PropTypes from "prop-types";

export const GraphSideUtil = (props) => {
    return (
        <div className={"GraphSideUtilContainer"}>
            {/*{props.exportsTypes.map((type, index) => {*/}
            {/*return (*/}
            {/*<div key={index}*/}
            {/*className={`ExportType ${type.toUpperCase()}`}>*/}
            {/*{type.toUpperCase()}*/}
            {/*</div>*/}
            {/*)*/}
            {/*})}*/}

            <LabelInfo
                text={props.text}
            />
        </div>
    )
};

GraphSideUtil.propTypes = {
    text: PropTypes.string
};

