import React from 'react';
import {TextButton} from "../../common/TextButton";
import {LinkButton} from "../../common/LinkButton";
import {UserInput} from "../../common/UserInput";
import {connect} from 'react-redux';
import {setProjectName} from "../../../actions/generalActions";
import UserInputValidator from "../../../utils/UserInputValidator";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {LabelInfo} from "../../common/LabelInfo";

class StartInfoInput extends React.Component {

    state = {
        styles: {
            textButtonStyle: {
                opacity: 1
            },
            inputStyle: {
                opacity: 0
            },
            linkButtonStyle: {
                opacity: 0
            }
        },

        userInputData: {
            projectName: null
        },

        info: {
            projectName: ""
        },

    };

    /**
     * Enabling INPUT for
     */
    startProject = () => {
        this.setState({
            styles: {
                textButtonStyle: {
                    opacity: 0
                },
                inputStyle: {
                    opacity: 1
                },
                linkButtonStyle: {
                    opacity: 0
                }
            }
        });
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
     * @TODO Check why textButton is enabling when the project name is valid
     * @param obj
     */
    handleSubmit = (obj) => {
        let opacity = 0;
        if (obj.isMatching) {
            opacity = 1;
        }
        this.setState({
            styles: {
                textButtonStyle:{
                    opacity: 0
                },
                linkButtonStyle: {
                    opacity: opacity
                },
                info: {
                    projectName: obj.info
                }
            }
        });
    };


    /**
     * Submit button onClick. The application transitions to creator.
     */
    submitProjectName = () => {
        this.props.activateBackground();
    };

    render() {
        return (
            <div className={"StartWrapper"}>
                <TextButton
                    text={"Let's start!"}
                    style={this.state.styles.textButtonStyle}
                    className={"TextButton"}
                    action={this.startProject}/>

                <UserInput
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