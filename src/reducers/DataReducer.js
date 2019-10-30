import {SET_DATA} from "../actions/dataActions";

const defaultDataState = {
  header: [],
  data: []
};

export function dataReducer(state = defaultDataState, action) {

    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                header: action.payload.header,
                data: action.payload.data
            };
        default:
            return state;
    }
}