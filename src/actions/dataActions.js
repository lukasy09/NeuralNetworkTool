export const SET_DATA= "data:set";
export const SET_COLUMNS = "data-cols: set";
export const SET_CATEGORICAL = "data-cols-cat: set";

export function setData(data){
    return {
        type: SET_DATA,
        payload: data
    }
}
export function setColumns(cols){
    return {
        type: SET_COLUMNS,
        payload: cols
    }
}

export function setCategorical(catCols){
    return {
        type: SET_CATEGORICAL,
        payload: catCols
    }
}