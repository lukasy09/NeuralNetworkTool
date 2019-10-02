import React from 'react';
import PropTypes from 'prop-types';
import {LineChart,Line} from 'recharts';

export const Chart = (props)=>{
    return(
        <div className={"LinearChartContainer"}>
            <LineChart width={props.size.width}
                       height={props.size.height}
                       data={props.data}>
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <Line type="monotone"
                      dataKey="pv"
                      stroke="#8884d8" />
                <Line type="monotone"
                      dataKey="uv"
                      stroke="#82ca9d" />
            </LineChart>
            <span>{props.text}</span>
        </div>
    )
};

Chart.propTypes = {
    size: PropTypes.object,
    data: PropTypes.array,
};