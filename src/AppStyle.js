export class AppStyle {

    static defaultStyle = {
        activeBackground: false
    };

    constructor(component) {
        this.component = component;
    }

    activateBackground(){
        this.component.setState({
            styles:{
                activeBackground: true
            }
        })
    }

}