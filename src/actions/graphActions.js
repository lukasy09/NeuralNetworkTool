export const SET_GRAPH= "graph:set";

export function setGraph(graph){
    return {
        type: SET_GRAPH,
        payload: graph
    }
}