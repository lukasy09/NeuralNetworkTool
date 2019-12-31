import {SET_MODEL, SET_MODEL_LAYERS, SET_MODEL_WEIGHTS} from "../actions/modelActions";


/**
 * @TODO Don't assign the following data directly to attributes of the object. Place them into some configs(ApplicationSettings)
 * @type {{name: string, optimizer: string, loss: string, metrics: string[], layers: Array}}
 */
const defaultModelState = {
    name: 'my-project',
    compilationParameters:{
        optimizer: 'rmsprop',
        loss: 'categorical_crossentropy',
        metrics: ['accuracy'],
    },
    layers:[],
    fit: {
        epochs: 100
    },
    weights: []
};

export function modelReducer(state = defaultModelState, action) {

    switch(action.type){
        case SET_MODEL:
            return{
                ...state,
                layers: action.payload.layers,
                compilationParameters: action.payload.compilationParameters,
                fit: action.payload.fit
            };
        case SET_MODEL_LAYERS:
            return {
                ...state,
                layers: action.payload
            };

        case SET_MODEL_WEIGHTS:
            return{
                ...state,
                weights: action.payload
            };
        default:
            return state;
    }
}