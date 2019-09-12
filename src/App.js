import React from 'react';
import './App.scss';
import DeviceDetector from './utils/DeviceDetector';
import {SETTINGS} from './settings/ApplicationSettings';
import {Switch, Route} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import DesktopMainView from './components/DesktopMainView/DesktopMainView';
import CreatorView from "./components/CreatorView/CreatorView";

class App extends React.Component {

    state = {
        runningView: SETTINGS.views.loadingView,

    };

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


    render() {
        if (this.state.runningView === SETTINGS.views.desktopView) {
            return (
                <div className="DesktopApp">
                    <Route render={(location)=>(
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout = {3000}
                                classNames = "fade">
                                <Switch key={location.key}
                                        >
                                    <Route exact path={SETTINGS.routes.root}
                                           component={DesktopMainView}/>
                                    <Route path={SETTINGS.routes.creator}
                                           component={CreatorView}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
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

}

export default App;
