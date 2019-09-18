import React from 'react';

export default class ExpandingCanvas extends React.Component {

    canvasId = "ExpandingCanvas";

    constructor(props){
        super(props);
    }
    render(){

        const {x, y} = this.props.sizeFactors;
        return(
            <div className = {"ExpandingCanvasContainer"}>
                <canvas id={this.canvasId}
                        className={"ExpandingCanvas"}
                        width={Math.round(x * window.innerWidth)}
                        height={Math.round(y * window.innerHeight)}
                        ref={(canvas) =>this.expandingCanvas = canvas}> </canvas>
            </div>
        )
    }
}