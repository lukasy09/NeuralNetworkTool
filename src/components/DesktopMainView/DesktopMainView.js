import React from 'react';
import StartInfoInput from "./StartInfoInput/StartInfoInput";

export default class DesktopMainView extends React.Component {

    render(){
        return(
            <div className = "MainViewContainer">
                <StartInfoInput activateBackground={this.props.activateBackground}/>
            </div>
        )
    }
}
