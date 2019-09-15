import React from 'react';
import {TextButton} from "../../common/TextButton";
import {UserInput} from "../../common/UserInput";

export default class StartInfoInput extends React.Component{

    state = {
      styles: {
          textButtonStyle: {
              opacity: 1
          },
          inputStyle: {
              opacity: 0
          }
      }
    };
    startProject = () =>{
        this.setState({
            styles:{
                // textButtonStyle:{
                //     opacity: 0
                // },
                inputStyle: {
                    opacity: 1
                }
            }


        });
        console.log("Im starting the project!")
    };

    render(){
        return(
            <div className="StartWrapper">
                <TextButton
                    text={"Let's start!"}
                    style = {this.state.styles.textButtonStyle}
                    action={this.startProject}/>

                <UserInput
                    type={"text"}
                    placeholder={"Enter a project name"}
                    style = {this.state.styles.inputStyle}
                />
            </div>
        )
    }
}
