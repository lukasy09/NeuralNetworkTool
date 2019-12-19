export const SET_PROJECT= "toolbox:set";

export function setProject(projectMetaInfo){
    return {
        type:SET_PROJECT,
        payload: projectMetaInfo
    }
}