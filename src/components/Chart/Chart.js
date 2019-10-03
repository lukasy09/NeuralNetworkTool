import React from 'react';
import PropTypes from 'prop-types';
import {LineChart,Line} from 'recharts';

export const Chart = (props)=>{

    return(
        <div className={"LinearChartContainer"}>
            <LineChart width={props.size.width}
                       height={props.size.height}
                       data={props.data}>
                <Line type="monotone"
                      dataKey="y"
                      dot={false}
                      stroke="#8884d8" />
            </LineChart>
            <span>{props.text}</span>
        </div>
    )
};

Chart.propTypes = {
    size: PropTypes.object,
    data: PropTypes.array,
};