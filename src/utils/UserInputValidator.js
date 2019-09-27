import {SETTINGS} from "../settings/ApplicationSettings";


/*
   Settings for the following class. It sets up all possible behaviour of the class.
 */
//const MATCHING = true;
const NON_MATCHING = false;
const POSITIVE_INFO = "Correct project name!";
const NEGATIVE_INFO = "The project name must start from a letter or a number and not contain any special characters!";
/**
 * The class is responsible for validating all user INPUT data.
 */
export default class UserInputValidator {

    static projectNameRegex = SETTINGS.regex.projectName;

    static validateProjectName = (name) => {

        /**
         * @TODO Create the class and place REGEX in settings
         */

        if (name.length >= 1) {
            return {
                isMatching: UserInputValidator.projectNameRegex.test(name),
                info: POSITIVE_INFO
            }
        }
        return {
            isMatching: NON_MATCHING,
            info: NEGATIVE_INFO
        }
    }
};