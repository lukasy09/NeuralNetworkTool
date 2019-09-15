import React from 'react';
import {TextButton} from "../../common/TextButton";

export const StartInfoInput = () =>{

    return(
        <div className="StartWrapper">
            <TextButton
                text={"Let's start!"}
                action={startProject}/>
        </div>
    )
};

const startProject = () =>{
    console.log("Im starting the project!")
};