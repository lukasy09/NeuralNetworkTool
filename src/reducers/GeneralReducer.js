import {SET_PROJECT} from "../actions/generalActions";

const defaultGeneralState = {
    projectName: 'my-project',
    isProjectSet: false
};

export function generalReducer(state = defaultGeneralState, action) {

    switch (action.type) {
        case SET_PROJECT:
            return {
                ...state,
                isProjectSet: action.payload.status,
                projectName: action.payload.name
            };
        default:
            return state;
    }
}