import React from 'react';
import {TextButton} from "../../common/TextButton";
import {LinkButton} from "../../common/LinkButton";
import {Input} from "../../common/Input";
import {connect} from 'react-redux';
import {setProjectName} from "../../../actions/generalActions";
import UserInputValidator from "../../../utils/UserInputValidator";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {LabelInfo} from "../../common/LabelInfo";
import {StartInfoInputStyle} from "./StartInfoInputStyle";

class StartInfoInput extends React.Component {

    state = {
        styles: StartInfoInputStyle.defaultStyle,

        userInputData: {
            projectName: null
        },

        info: {
            projectName: ""
        },

    };

    constructor(props){
        super(props);
        this.styleManager = new StartInfoInputStyle(this);
    }

    /**
     * Enabling INPUT(displaying)
     */
    startProject = () => {
        this.styleManager.showInput();
    };


    /**
     * Event handler for submitting a project name
     * @param e
     */
    changeProjectName = (e) => {
        const resultObj = UserInputValidator.validateProjectName(e.target.value);
        this.handleSubmit(resultObj);
        if (resultObj.isMatching) {
            this.props.setProjectName(e.target.value);
        }
    };

    /**
     *Enabling(or disabling) submit link button
     * @param obj
     */
    handleSubmit = (obj) => {
       this.styleManager.handleDisplaySubmit(obj);
    };


    /**
     * Submit button onClick. The application transitions to creator.
     */
    submitProjectName = () => {
        this.props.activateBackground();
        this.styleManager.submitProjectName();
    };

    render() {
        return (
            <div className={"StartWrapper"}
                 style={this.state.styles.startInfoWrapper}>
                <TextButton
                    text={"Let's start!"}
                    style={this.state.styles.textButtonStyle}
                    className={"TextButton"}
                    action={this.startProject}/>

                <Input
                    type={"text"}
                    placeholder={"Enter a project name"}
                    action={this.changeProjectName}
                    style={this.state.styles.inputStyle}
                />

                <LabelInfo
                    text={this.state.info.projectName}
                    className={"ProjectNameLabel"}
                />

                <LinkButton
                    text={"Submit"}
                    className={"TextButton Submit"}
                    style={this.state.styles.linkButtonStyle}
                    path={SETTINGS.routes.creator}
                    action = {this.submitProjectName}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        general: state.general
    }
};

const mapActionsToProps = {
    setProjectName: setProjectName
};

export default connect(mapStateToProps, mapActionsToProps)(StartInfoInput);