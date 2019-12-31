import React from 'react'

const size = {
    width: 45,
    height: 45
};

export const SocialGroupElement = (props) => {
    const data = props.data;
    return (
        <div className={"SocialElement"}
             title={data.name}>
            <a href={data.href}
               target={"_blank"}>
            <img src={data.icon}
                 width={size.width}
                 height={size.height}/>
            </a>
        </div>
    )
};