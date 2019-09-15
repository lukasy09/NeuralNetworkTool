import {SET_PROJECT_NAME} from "../actions/generalActions";

export function generalReducer(state = {}, action) {

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