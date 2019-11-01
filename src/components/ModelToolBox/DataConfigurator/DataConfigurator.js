import React from 'react';
import connect from "react-redux/es/connect/connect";
import {DataField} from "./Field/Field";
import {setCategorical, setColumns} from "../../../actions/dataActions";
import {SETTINGS} from "../../../settings/ApplicationSettings";
import {addIfNotExistsOrRemove} from "../../../utils/ArrayUtils";


export const dataTypes = [SETTINGS.data.types.NUMERICAL, SETTINGS.data.types.CATEGORICAL];

class DataConfigurator extends React.Component {


    trainingIndexes = [];
    categoricalIndexes = [];

    constructor(props) {
        super(props);
    }

    /**
     * Adding and colIndex to an array if not exists(if it does it removes the colIndex). Setting the index array to the store.
     * @param colIndex
     */
    setTrainableColumns = (colIndex) => {
        this.trainingIndexes = addIfNotExistsOrRemove(this.trainingIndexes, colIndex);
        this.props.setColumns(this.trainingIndexes);
    };


    /**
     *Marking a columns as "categorical". Used to encode the values as labels in preprocessing
     */

    setColumnDataType = (colIndex) => {
        this.categoricalIndexes = addIfNotExistsOrRemove(this.categoricalIndexes, colIndex);
        this.props.setCategorical(this.categoricalIndexes);
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
                                           includeAction={() => {
                                               this.setTrainableColumns(index)
                                           }}
                                           selectTypeAction={() => {
                                               this.setColumnDataType(index)
                                           }}
                                           dataTypes={dataTypes}
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
    setColumns: setColumns,
    setCategorical: setCategorical
};

export default connect(mapStateToProps, mapActionsToProps)(DataConfigurator);