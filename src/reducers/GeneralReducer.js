import {SET_PROJECT_NAME} from "../actions/generalActions";

const defaultGeneralState = {
    projectName: 'my-project'
};

export function generalReducer(state = defaultGeneralState, action) {

    switch (action.type) {
        case SET_PROJECT_NAME:
            return {
                ...state,
                projectName: action.payload
            };
        default:
            return state;
    }
}