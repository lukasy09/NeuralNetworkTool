import {SET_GRAPH} from "../actions/graphActions";

const defaultGraphState = {
    layers:[]
};

export function graphReducer(state = defaultGraphState, action) {

    switch(action.type){
        case SET_GRAPH:
            return{
                ...state,
                layers: action.payload
            };
        default:
            return state;
    }
}