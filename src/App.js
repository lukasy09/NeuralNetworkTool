import React from 'react';
import './App.scss';
import DeviceDetector from './utils/DeviceDetector';
import {SETTINGS} from './settings/ApplicationSettings';
import {Switch, Route} from 'react-router-dom'
import DesktopMainView from './components/DesktopMainView/DesktopMainView';
import CreatorView from "./components/CreatorView/CreatorView";
import {AppStyle} from "./AppStyle";
import VisualisationNetwrok from './components/VisulisationNetwork/VisualisationNetwork'

class App extends React.Component {

    state = {
        runningView: SETTINGS.views.loadingView,
        styles: AppStyle.defaultStyle
    };

    constructor(props) {
        super(props);
        this.styleManager = new AppStyle(this);
    }


    /**
     * Setting up a correct view each time when resizing(and after the component had mounted)
     */
    setRunningView = () => {
        let actualView;
        if (DeviceDetector.isMobileDevice()) {
            actualView = SETTINGS.views.mobileView;
        } else {
            actualView = SETTINGS.views.desktopView;
        }
        this.setState({
            runningView: actualView
        })
    };

    /**
     * Moving the skewed background scene to the right after project name's submission
     */
    activateBackground = () => {
        this.styleManager.activateBackground();
    };


    render() {
        if (this.state.runningView === SETTINGS.views.desktopView) {
            return (
                <div className="DesktopApp">
                    <VisualisationNetwrok/>
                    <Route render={({location}) => (
                        <Switch location={location}>
                            <Route exact path={"/"}
                                   component={() => <DesktopMainView activateBackground={this.activateBackground}/>}
                            />
                            <Route path={"/creator"}
                                   component={() => <CreatorView activateBackground={this.activateBackground}/>}/>
                        </Switch>
                    )}
                    />

                </div>
            );
        } else if (this.state.runningView === SETTINGS.views.mobileView) {
            return (
                <div className='MobileApp'>MOBILE</div>
            )
        } else {
            return (
                <div className="ViewLoader">LOADING</div>
            )
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.setRunningView);
        this.setRunningView();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setRunningView);
    }

}

export default App;
