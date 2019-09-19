import React from 'react';
import {NAVIGATION_DIRECTIONS} from "../ExpandingCanvas/ExpandingCanvas";


export const CanvasNavigator = (props) => {

    let directionList = [
      NAVIGATION_DIRECTIONS.left,
      NAVIGATION_DIRECTIONS.up,
      NAVIGATION_DIRECTIONS.right,
      NAVIGATION_DIRECTIONS.down
    ];

    return(
        <div className={"CanvasNavigatorContainer"}>
            {
                directionList.map((direction, index) =>{
                    return(
                        <div key={index}
                             onClick={(e) => {props.action(e, direction)}}
                             className ={"Navigator" + " " + direction}>
                            <span className={direction}> </span>
                        </div>
                    )
                })
            }
        </div>
    )
};
