import {SET_MODEL} from "../actions/modelActions";

const defaultModelState = {
    layers:[]
};

export function modelReducer(state = defaultModelState, action) {

    switch(action.type){
        case SET_MODEL:
            return{
                ...state,
                model: action.payload
            };
        default:
            return state;
    }
}