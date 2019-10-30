import React from 'react';
import connect from "react-redux/es/connect/connect";

class DataConfigurator extends React.Component {

    render(){
        const header = this.props.csvData.header;
        const data = this.props.csvData.data;
        return(
            <div className = "DataConfiguratorContainer">

                <div className={"DataRowHeader"}>
                    {header.map((field, index)=>{

                        return(
                            <div key={index}
                                 className={"Field"}>
                                {field}
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