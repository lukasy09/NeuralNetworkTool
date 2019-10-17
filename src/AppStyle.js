export class AppStyle {

    static defaultStyle = {
        activeBackground: true
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