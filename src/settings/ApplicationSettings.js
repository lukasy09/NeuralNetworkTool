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
       @TODO In the future probably section "routes" will be removed from the global settings
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
            CONV2D: 'conv2d'
        },
        layerActivations:{
            SIGMOID: 'sigmoid',
            RELU: 'relu',
            SOFTMAX: 'softmax'
        }
    }

};