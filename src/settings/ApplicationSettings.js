/**
 * Settings
 * @type {{}}
 */
export const SETTINGS = {
    views:{
        loadingView: 'LOADING',
        mobileView: 'MOBILE',
        desktopView: 'DESKTOP'
    },

    /*
       @TODO In the future probably section "routes" will be removed from the global settings. And consider changing the name "creator" into "editor"
     */
    routes:{
        root: '/',
        creator: '/creator'
    },

    // A project's name must match the following regex
    regex:{
        projectName: /^[a-zA-Z0-9].*$/
    },

    model:{
        layerTypes:{
            INPUT: 'input',
            HIDDEN: 'hidden',
            OUTPUT: 'output'
        },
        layerClassTypes:{
            DENSE: 'dense',
            CONV2D: 'conv2d',
            NONE : 'none'
        },
        layerActivations:{
            SIGMOID: 'sigmoid',
            RELU: 'relu',
            SOFTMAX: 'softmax',
            NONE: 'none'
        },

        compilation:{
            loss:{
              BINARY_CROSSENTROPY: 'binary_crossentropy',
              CATEGORICAL_CROSSENTROPY: 'categorical_crossentropy',
              MSE: 'mse'
            },
            optimizer:{
                ADAM: 'adam',
                RMSPROP: 'rmsprop',
                SGD: 'sgd'
            },
            metrics:{
               ACCURACY: 'accuracy'
            }
        }

    }

};