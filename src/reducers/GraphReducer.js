import {SET_GRAPH} from "../actions/graphActions";

const defaultGraphState = {
    nodes:[],
    layers:[]
};

export function graphReducer(state = defaultGraphState, action) {

    switch(action.type){
        case SET_GRAPH:
            console.log("setting graph");
            return{
                ...state,
                model: action.payload
            };
        default:
            return state;
    }
}