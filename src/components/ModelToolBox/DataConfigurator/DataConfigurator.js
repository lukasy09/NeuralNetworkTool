import React from 'react';
import connect from "react-redux/es/connect/connect";
import {DataField} from "./Field/Field";

class DataConfigurator extends React.Component {


    setTrainableColumns = (colIndex) => {
        console.log(colIndex);
    };

    render(){
        const header = this.props.csvData.header.length === 1 ? this.props.csvData.header[0] : [];
        const data = this.props.csvData.data;
        return(
            <div className = "DataConfiguratorContainer">
                <div className={"DataRowHeader"}>
                    {header.map((field, index)=>{
                        return(
                           <DataField key={index}
                                      action={() => {this.setTrainableColumns(index)}}
                                      fieldName = {field}
                                      isHeader={true}/>
                        )
                    })}
                </div>

                <div className={"DataRowContent"}>
                    {data.map((dataRow, rowIndex)=>{
                        return(
                            <div key={rowIndex}
                                 className={"ContentRow"}>
                                {dataRow.map((field, colIndex)=>{
                                    return(
                                        <DataField key={colIndex}
                                                   fieldName = {field} />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        csvData: state.dataReducer
    }
};

export default connect(mapStateToProps)(DataConfigurator);