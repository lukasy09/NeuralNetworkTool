import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Alerts = (props)=>{
    return(
        <div className={"AlertsContainer"}>
            {props.activeAlerts?
                props.alertsObject.alerts.map((alert, index)=>{
                    return(
                        <div key={index}
                             className={"Alert"}>
                            {alert.content}
                        </div>
                    )
                }) : <></>}
                <div onClick={props.triggerAlerts}
                     className={"ShowAlertsBtn"} />

        </div>

    )
};

Alerts.propTypes = {
    //triggerAlerts: PropTypes.func,
    alerts: PropTypes.array
};

const mapStateToProps = state => {
    return {
        alertsObject: state.alertsReducer
    }
};

export default connect(mapStateToProps)(Alerts);