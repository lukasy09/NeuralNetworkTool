import React from 'react'

export default class VisualisationNetwork extends React.Component {

    render(){
        return(
            <div className = "VisualisationNetworkContainer"
                 title={"Logo"}>
                <canvas id={"c"}> </canvas>
            </div>
        )
    }
}
