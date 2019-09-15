export const SET_PROJECT_NAME= "toolbox:set";

export function setProjectName(projectName){
    return {
        type:SET_PROJECT_NAME,
        payload: projectName
    }
}