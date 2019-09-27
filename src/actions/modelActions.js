export const SET_MODEL= "model:set";

export function setModel(model){
    return {
        type: SET_MODEL,
        payload: model
    }
}