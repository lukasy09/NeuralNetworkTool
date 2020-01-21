import React from 'react';
import PropTypes from "prop-types";
import {PopupBlur} from "./PopupBlur";

export const LoadingScreen = (props) => {

    return (
        <div className={"LoadingScreen"}
             style={props.style}>
            <PopupBlur/>
            <div className={"Spinner"}> </div>
            {/*<div className={"LabelText"}>*/}
                {/*<div>{props.text}</div>*/}
            {/*</div>*/}
        </div>
    )
};
LoadingScreen.propTypes = {

    style: PropTypes.object,
    text: PropTypes.string
};