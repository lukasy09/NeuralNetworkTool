export class StartInfoInputStyle {

    static defaultStyle = {
        startInfoWrapper: {
            transform: 'none'
        },

        textButtonStyle: {
            opacity: 1
        },
        inputStyle: {
            opacity: 0
        },
        linkButtonStyle: {
            opacity: 0
        }
    };

    constructor(component) {
        this.component = component;
    }


    showInput = () => {
        this.component.setState({
            styles: {
                textButtonStyle: {
                    opacity: 0
                },
                inputStyle: {
                    opacity: 1
                },
                linkButtonStyle: {
                    opacity: 0
                }
            }
        });
    };

    handleDisplaySubmit = (obj) => {
        let opacity = 0;
        if (obj.isMatching) {
            opacity = 1;
        }
        this.component.setState({
            styles: {
                textButtonStyle:{
                    opacity: 0
                },
                linkButtonStyle: {
                    opacity: opacity
                },
                info: {
                    projectName: obj.info
                }
            }
        });
    };

    submitProjectName = () => {
        this.component.setState({
            styles:{
                ...this.component.state.styles,
                startInfoWrapper:{
                    transform:'translateX(50vw)'
                }
            }
        })
    }
}