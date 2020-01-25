import github from '../assets/images/png/github-logo.png';
import linkedin from '../assets/images/png/in-logo.png';
/**
 * Settings
 * @type {{}}
 */
export const SETTINGS = {

    runtimeEnv: {
        development: 'development',
        staging: 'staging',
        production: 'production'
    },

    views: {
        loadingView: 'LOADING',
        mobileView: 'MOBILE',
        desktopView: 'DESKTOP'
    },

    routes: {
        root: '/',
        creator: '/creator'
    },

    socials: [
        {
            icon: github,
            name: 'github',
            href: 'https://www.linkedin.com/in/%C5%82ukasz-bednarski-33163a162/'
        },
        {
            icon: linkedin,
            name: 'linkedin',
            href: 'https://github.com/lukasy09'
        }
    ],
    // A project's name must match the following regex
    regex: {
        projectName: /^[a-zA-Z0-9].*$/
    },

    // api configuration segment
    api: {
        paths: {
            dev: {
                train: {
                    host: '127.0.0.1',
                    port: '8080',
                    uri: 'train',
                    params: null
                }
            },

            // production will be serviced in the future
            prod: {
                train: {
                    host: '127.0.0.1',
                    port: '8000',
                    uri: 'train',
                    params: null
                }
            }
        }
    },

    // mapping features
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
            NONE: 'linear'
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
                MSE: 'mse',
                SPARSE_CATEGORICAL_CROSSENTROPY: 'sparse_categorical_crossentropy',
                LOGCOSH: 'logcosh'
            },
            optimizer: {
                ADAM: 'adam',
                RMSPROP: 'rmsprop',
                SGD: 'sgd'
            },
            metrics: {
                ACCURACY: 'accuracy'
            }
        },

        fit: {
            epochs: 10,
            batch_size: 10
        }

    },

    data: {
        types: {
            NUMERICAL: 'numerical',
            CATEGORICAL: 'categorical'
        }
    }
};