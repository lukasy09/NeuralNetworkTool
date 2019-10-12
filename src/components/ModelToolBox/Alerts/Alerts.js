import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Alerts = (props)=>{
    return(
        <div className={"AlertsContainer"}>
            <div onClick={props.triggerAlerts}
                 className={"ShowAlertsBtn"} />
            <div className={"Alerts"}>
            {props.activeAlerts ?
                props.alertsObject.alerts.map((alert, index)=>{
                    return(
                        <div key={index}
                             className={`Alert ${alert.type}`}>
                            {alert.content}
                        </div>
                    )
                }) : <></>}
            </div>
        </div>

    )
};

Alerts.propTypes = {
    triggerAlerts: PropTypes.func,
    alerts: PropTypes.array,
    activeAlerts: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        alertsObject: state.alertsReducer
    }
};

export default connect(mapStateToProps)(Alerts);