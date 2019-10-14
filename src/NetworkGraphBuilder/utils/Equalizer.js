export const userActions = {
  CENTER: 'center',
  ZOOM_IN: 'zoom_in',
  ZOOM_OUT: 'zoom_out'
};

/**
 * The class is to provide logic for some user's actions affecting the graph.
 * e.g Centering the graph, zooming in/out etc.
 */
export class GraphEqualizerAdapter{
    constructor(cy){
        this.cy = cy;
    }

    /**
     * Centering the graph
     */
    static centerGraph(){
        return this.cy.center();
    }
}