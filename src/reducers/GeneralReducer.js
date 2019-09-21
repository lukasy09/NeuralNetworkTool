import {SET_PROJECT_NAME} from "../actions/generalActions";
import {SETTINGS} from "../settings/ApplicationSettings";

/**
 * @TODO remove "general" field from GeneralReducer. Makes no sense
 */
const defaultGeneralState = {
    general:{
        projectName: 'my-project'
    }
};

export function generalReducer(state = defaultGeneralState, action) {

    switch(action.type){
        case SET_PROJECT_NAME:
            return{
                ...state,
                general:{
                    projectName: action.payload
                }
            };
        default:
            return state;
    }
}