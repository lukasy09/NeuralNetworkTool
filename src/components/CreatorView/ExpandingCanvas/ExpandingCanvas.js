import React from 'react';
import {CanvasNavigator} from "../CanvasNavigator/CanvasNavigator";

export const NAVIGATION_DIRECTIONS = {
    left: 'LEFT',
    up: 'UP',
    down: 'DOWN',
    right: 'RIGHT'
};

export default class ExpandingCanvas extends React.Component {

    canvasId = "ExpandingCanvas";

    constructor(props){
        super(props);
    }

    componentDidMount(){
        let c = this.expandingCanvas;
        let ctx = c.getContext("2d");
        ctx.fillRect(10, 10, 100, 50);
        ctx.fillRect(700, 70, 100, 50);
    }


    translateExpandingCanvas = (e, direction) => {
        let ctx = this.expandingCanvas.getContext("2d");
        let prev = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);

        switch(direction){
            case NAVIGATION_DIRECTIONS.left:
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.putImageData(prev, -100, 0);
                break;

            default:
                console.log("Wrong direction! There must be some bugs in the software.")
        }
    };
    render(){
        const {x, y} = this.props.sizeFactors;
        return(
            <div className = {"ExpandingCanvasContainer"}>
                <canvas id={this.canvasId}
                        className={"ExpandingCanvas"}
                        width={Math.round(x * window.innerWidth)}
                        height={Math.round(y * window.innerHeight)}
                        ref={(canvas) =>this.expandingCanvas = canvas}> </canvas>

                <CanvasNavigator action={this.translateExpandingCanvas}/>

            </div>
        )
    }
}