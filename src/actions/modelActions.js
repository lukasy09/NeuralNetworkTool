export const SET_MODEL = "model:set";
export const SET_MODEL_LAYERS = "model-layers:set";

export function setModel(model){
    return {
        type: SET_MODEL,
        payload: model
    }
}

export function setModelLayers(layers) {
    return {
        type: SET_MODEL_LAYERS,
        payload: layers
    }
}