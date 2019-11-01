import {SET_CATEGORICAL, SET_COLUMNS, SET_DATA} from "../actions/dataActions";

const defaultDataState = {
  header: [],
  data: [],
  trainableColumns: [],
  categoricalColumns: []
};

export function dataReducer(state = defaultDataState, action) {

    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                ...action.payload
            };
        case SET_COLUMNS:
            return{
                ...state,
                ...action.payload
            };

        case SET_CATEGORICAL:
            return{
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}