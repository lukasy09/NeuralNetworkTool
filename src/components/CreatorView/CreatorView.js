import React from 'react';
import NetworkGraph from "../NetworkGraph/NetworkGraph";
import ModelToolBox from "../ModelToolBox/ModelToolBox";
import connect from "react-redux/es/connect/connect";


class CreatorView extends React.Component {

    render(){

        return(
            <div className = "CreatorContainer">
                <NetworkGraph/>
                <ModelToolBox/>
            </div>
        )
    }
    componentDidMount(){
    }


}


const mapStateToProps = state => {
    return {
        isProjectSet: state.generalReducer.isProjectSet,
    };
};

export default connect(mapStateToProps)(CreatorView)