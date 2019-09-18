import React from 'react';

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
        console.log("XD shit");
    }

    testTranslate = () =>{
        let ctx = this.expandingCanvas.getContext("2d");
        let prev = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.translate(100, 0);
        ctx.putImageData(prev, 10, 0);
        console.log("no eksde")
    };
    render(){
        const {x, y} = this.props.sizeFactors;
        return(
            <div className = {"ExpandingCanvasContainer"}>
                <div onClick={this.testTranslate}>
                    TEST translate
                </div>
                <canvas id={this.canvasId}
                        className={"ExpandingCanvas"}
                        width={Math.round(x * window.innerWidth)}
                        height={Math.round(y * window.innerHeight)}
                        ref={(canvas) =>this.expandingCanvas = canvas}> </canvas>
            </div>
        )
    }

}