import React from 'react';
import StartInfoInput from "./StartInfoInput/StartInfoInput";
import {SocialGroup} from "./SocialGroup/SocialGroup";

export default class DesktopMainView extends React.Component {

    render(){
        return(
            <div className = "MainViewContainer">
                <SocialGroup/>
                <StartInfoInput activateBackground={this.props.activateBackground}/>
            </div>
        )
    }
}
