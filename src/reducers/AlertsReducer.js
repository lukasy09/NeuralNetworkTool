import {SET_ALERTS} from "../actions/alertsActions";

const defaultAlertsState = {
    alerts:[]
};

export function alertsReducer(state = defaultAlertsState, action) {

    switch (action.type) {
        case SET_ALERTS:
            return {
                ...state,
                alerts: action.payload
            };
        default:
            return state;
    }
}