export const SET_ALERTS= "alerts:set";

export function setAlerts(alerts){
    return {
        type: SET_ALERTS,
        payload: alerts
    }
}