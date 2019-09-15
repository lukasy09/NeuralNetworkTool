import React from 'react';
import {TextButton} from "../../common/TextButton";
import {UserInput} from "../../common/UserInput";
import {connect} from 'react-redux';
import {setProjectName} from "../../../actions/generalActions";

class StartInfoInput extends React.Component{

    state = {
      styles: {
          textButtonStyle: {
              opacity: 1
          },
          inputStyle: {
              opacity: 0
          }
      },

       userInputData:{
          projectName: null
       }
    };

    /**
     * Enabling input for
     */
    startProject = () =>{
        this.setState({
            styles:{
                textButtonStyle:{
                  opacity: 0
                },
                inputStyle: {
                    opacity: 1
                }
            }
        });
    };


    changeProjectName = (e) => {
        this.props.setProjectName(e.target.value);
    };


    render(){
        return(
            <div className="StartWrapper">
                <TextButton
                    text={"Let's start!"}
                    style = {this.state.styles.textButtonStyle}
                    className = {"TextButton"}
                    action={this.startProject}/>

                <UserInput
                    type={"text"}
                    placeholder={"Enter a project name"}
                    action = {this.changeProjectName}
                    style = {this.state.styles.inputStyle}
                />

                <TextButton
                    text={"Submit"}
                    className={"TextButton Submit"}
                    style = {this.state.styles.inputStyle}
                    //action = {this.submitProjectName}
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
    setProjectName : setProjectName
};

export default connect(mapStateToProps, mapActionsToProps)(StartInfoInput);