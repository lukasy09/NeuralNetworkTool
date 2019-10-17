/**
 * Settings
 * @type {{}}
 */
export const SETTINGS = {

    runTimeEnv: {
      development: 'dev',
      staging: 'stage',
      production: 'prod'
    },

    views: {
        loadingView: 'LOADING',
        mobileView: 'MOBILE',
        desktopView: 'DESKTOP'
    },

    /*
       @TODO In the future probably section "routes" will be removed from the global settings. And consider changing the name "creator" into "editor"
     */
    routes: {
        root: '/',
        creator: '/creator'
    },

    // A project's name must match the following regex
    regex: {
        projectName: /^[a-zA-Z0-9].*$/
    },

    model: {
        layerDefaults: {
            units: 10,
            useBias: false,
            kernelConstraint: {},

            biasConstraint: {}
        },

        layerTypes: {
            INPUT: 'input',
            HIDDEN: 'hidden',
            OUTPUT: 'output'
        },
        layerClassTypes: {
            DENSE: 'dense',
            CONV2D: 'conv2d',
            NONE: 'none'
        },
        layerActivations: {
            SIGMOID: 'sigmoid',
            RELU: 'relu',
            SOFTMAX: 'softmax',
            NONE: 'none'
        },

        // bias & kernel
        initializers: {
            ZEROS: 'zeros',
            ONES: 'ones',
            CONSTANT: {
                name: 'constant',
                value: 0
            },
            RANDOM_UNIFORM: 'random_uniform'
        },

        /*
            The following parameters won't be serviced in the first release version
         */

        // kernelRegularizers: {},
        //
        // biasRegularizers: {},
        //
        // activityRegularizers: {},
        //
        // kernelConstraint: {},
        //
        // biasConstraint: {},

        compilation: {
            loss: {
                BINARY_CROSSENTROPY: 'binary_crossentropy',
                CATEGORICAL_CROSSENTROPY: 'categorical_crossentropy',
                MSE: 'mse'
            },
            optimizer: {
                ADAM: 'adam',
                RMSPROP: 'rmsprop',
                SGD: 'sgd'
            },
            metrics: {
                ACCURACY: 'accuracy'
            }
        }

    }
};