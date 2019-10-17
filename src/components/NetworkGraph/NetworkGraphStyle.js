
export class NetworkGraphStyle {

    static defaultStyle = {
        networkGraphContainer: {
            transform: "translateX(-60vw)"
        },
        exportsPopup: {
            display: 'none'
        }
    };

    constructor(component) {
        this.component = component;
    }

    setupInitStyles = () => {
        this.component.setState({
            styles: {
                ...this.component.state.styles,
                networkGraphContainer: {
                    transform: 'none'
                }
            }
        })
    };

    controlPopup(){
        let style;
        if (this.component.state.styles.exportsPopup) {
            style = null;
        } else {
            style = {display: 'none'};
        }
        this.component.setState({
            ...this.state,
            exportsPopupActive: !this.component.state.exportsPopupActive,
            styles: {
                ...this.component.state.styles,
                exportsPopup: style
            }
        });
    }
}