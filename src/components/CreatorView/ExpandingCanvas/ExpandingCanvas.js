import React from 'react';
import cytoscape from 'cytoscape';

export default class ExpandingCanvas extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){


    }

    render(){
        return(
            <div className = {"ExpandingCanvasContainer"}>
                <canvas id={"cy"}> </canvas>
            </div>
        )
    }
}