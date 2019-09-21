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
    }

};