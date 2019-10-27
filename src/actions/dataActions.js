export const SET_DATA= "data:set";

export function setData(data){
    return {
        type: SET_DATA,
        payload: data
    }
}