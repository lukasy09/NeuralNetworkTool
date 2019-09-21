import React from 'react';
import cytoscape from 'cytoscape';

export default class TestCytoscapeCanvas extends React.Component{

    componentDidMount(){
        let cy = cytoscape({

            container: document.getElementById('cy'), // container to render in

            elements: [ // list of graph elements to start with
                { // node a
                    data: { id: 'a' }
                },
                { // node b
                    data: { id: 'b' }
                },
                { // edge ab
                    data: { id: 'ab', source: 'a', target: 'b' }
                }
            ],

            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],

            layout: {
                name: 'grid',
                rows: 1
            }

        });

        cy.add({
            group: 'nodes',
            data: { weight: 75 },
            position: { x: 200, y: 200 }
        });
    }

    render(){
        return(
            <div className={"GraphContainer"} id="cy" />
        )
    }
}