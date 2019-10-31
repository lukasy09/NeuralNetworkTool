import React from 'react';
import connect from "react-redux/es/connect/connect";
import {DataField} from "./Field/Field";
import {setColumns} from "../../../actions/dataActions";

class DataConfigurator extends React.Component {


    trainingIndexes = [];

    constructor(props){
        super(props);}
    /**
     * Adding and colIndex to an array if not exists(if it does it removes the colIndex). Setting the index array to the store.
     * @param colIndex
     */
    setTrainableColumns = (colIndex) => {
        let index = this.trainingIndexes.indexOf(colIndex);
        index === -1 ? this.trainingIndexes.push(colIndex) : this.trainingIndexes.splice(index, 1);
        this.props.setColumns(this.trainingIndexes);
    };


    render() {
        const header = this.props.csvData.header.length === 1 ? this.props.csvData.header[0] : [];
        const data = this.props.csvData.data;
        return (
            <>
                <div style={this.props.style}
                     className="DataConfiguratorContainer">
                  {/*  <TextButton text={"Esc"}
                                action={() => {}}
                                className={"ExitBtn DataEsc"}/>*/}
                    <div className={"DataRowHeader"}>
                        {header.map((field, index) => {
                            return (
                                <DataField key={index}
                                           className={"Header"}
                                           action={() => {
                                               this.setTrainableColumns(index)
                                           }}
                                           fieldName={field}
                                           isHeader={true}/>
                            )
                        })}
                    </div>

                    <div className={"DataRowContent"}>
                        {data.map((dataRow, rowIndex) => {
                            return (
                                <div key={rowIndex}
                                     className={"ContentRow"}>
                                    {dataRow.map((field, colIndex) => {
                                        return (
                                            <DataField key={colIndex}
                                                       className={"Content"}
                                                       fieldName={field}/>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>


                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        csvData: state.dataReducer
    }
};

const mapActionsToProps = {
    setColumns: setColumns
};

export default connect(mapStateToProps, mapActionsToProps)(DataConfigurator);