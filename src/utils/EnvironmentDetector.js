import {SETTINGS} from "../settings/ApplicationSettings";

export const getApplicationEnv = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return SETTINGS.runtimeEnv.development;
    } else {
        return SETTINGS.runtimeEnv.production;
    }
};