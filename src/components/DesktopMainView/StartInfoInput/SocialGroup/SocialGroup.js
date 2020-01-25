import React from 'react';
import {SocialGroupElement} from "./GroupElement";
import {SETTINGS} from "../../../../settings/ApplicationSettings";

let socials = SETTINGS.socials;

export const SocialGroup = () => {

    return (
        <div className={"SocialGroup"}>
            {socials.map((social, i) => {
                return <SocialGroupElement key={i}
                                           data={social}/>
            })}
        </div>)
};

