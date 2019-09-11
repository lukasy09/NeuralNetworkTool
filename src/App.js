import React from 'react';
import './App.scss';

import DeviceDetector from './utils/DeviceDetector';
import {SETTINGS} from './settings/ApplicationSettings';

class App extends React.Component{

  state = {
    runningView: SETTINGS.loadingView,

  };

  /**
   * Setting up a correct view each time when resizing(and after the component had mounted)
   */
  setRunningView = () => {
    let actualView;
    if(DeviceDetector.isMobileDevice()){
      actualView = SETTINGS.mobileView;
    }else{
      actualView = SETTINGS.desktopView;
    }
    this.setState({
        runningView: actualView
    })
  };


  render(){
      if(this.state.runningView === SETTINGS.desktopView){
          return (
              <div className="App">
                  Regular App
              </div>
          );
      }else if(this.state.runningView === SETTINGS.mobileView){
          return(
              <div>MOBILE</div>
          )
      }else{
          return(
              <div>LOADING</div>
          )
      }
  }
  componentDidMount(){
    window.addEventListener('resize', this.setRunningView);
    this.setRunningView();
  }

}

export default App;
