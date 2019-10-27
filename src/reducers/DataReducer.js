import {SET_DATA} from "../actions/dataActions";

const defaultDataState = [];

export function dataReducer(state = defaultDataState, action) {

    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}