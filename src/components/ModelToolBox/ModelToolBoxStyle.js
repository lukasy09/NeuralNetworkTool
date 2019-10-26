import {editorScene} from "./ModelToolBox";

export class ModelToolBoxStyle {

    static defaultStyle = {
        popup: {
            transform: 'translateY(-100vh)'
        },
        modelToolBoxContainer: {
            transform: "translateY(60vw)"
        }

    };

    constructor(component) {
        this.component = component;
    }

    /**
     * Styling the component(e.g moving scene) at the beginning.
     */

    setupInitStyles = () => {
        this.component.setState({
            styles: {
                ...this.component.state.styles,
                modelToolBoxContainer: {
                    transform: 'none'
                }
            }
        })
    };

    controlPopup = () => {
        let popupStyle;
        if (this.component.state.styles.popup) {
            popupStyle = null;
        } else {
            popupStyle = {
                transform: "translateY(-100vh)",
            }
        }
        this.component.setState({
            ...this.component.state,
            activePopup: !this.component.state.activePopup,
            styles: {
                popup: popupStyle,
            }
        })
    };

    switchScene = () => {
        let newScene;

        switch (this.component.state.scene) {
            case editorScene.LAYER:
                newScene = editorScene.PARAMETER;
                break;
            case editorScene.PARAMETER:
                newScene = editorScene.LAYER;
                break;
            default:
                newScene = editorScene.LAYER;
                console.log("Wrong scene!");
        }
        this.component.setState({
            ...this.component.state,
            scene: newScene
        })
    }



}