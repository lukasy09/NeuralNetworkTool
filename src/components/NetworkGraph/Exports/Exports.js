import React from 'react';
import PropTypes from "prop-types";
import {LabelInfo} from "../../common/LabelInfo";
import {PopupBlur} from "../../common/PopupBlur";
import {Checkbox} from "../../common/Checkbox";
import {TextButton} from "../../common/TextButton";
import {EXPORTS_TYPES, GraphExporter} from "../../../NetworkGraphBuilder/utils/Exports";

const DEFAULT_CHECKBOX = "FormatCheckbox";

export class  Exports extends React.Component{
    exportTypes=[];

    /**
     * Adding a format to list || removing the format if already exists in the list.
     * @param e
     */
    selectFormat = (e)=>{
        const selectedFormat = e.target.name;
        this.exportTypes.indexOf(selectedFormat) === -1 ? this.exportTypes.push(selectedFormat):
            this.exportTypes.splice(this.exportTypes.indexOf(selectedFormat), 1);
    };

    exportFormat = () =>{
        let graphExporter = new GraphExporter();
        for(let type of this.exportTypes){
            /* Turning off the export to image format due to some errors in existing Cytoscape API.
               In the future take a look at this. In 3.12.0 cytoscape's version it should work properly.
            */

            if(type === EXPORTS_TYPES.PNG || type === EXPORTS_TYPES.JPEG){
                continue;
            }
            graphExporter.setExporter(type);
            graphExporter.export(this.props.cy);
        }
    };

    render(){
        const props = this.props;
        return (
            <>
                <div className={"ExportsContainer"}
                     style={props.style}>
                    <PopupBlur/>
                    <LabelInfo className={"ExportsHeader"}
                               text={"Export your graph"}/>

                    <div className={"ExportFormats"}>
                        {props.formats.map((format, index) => {
                            return (
                                <div className={"Format"}
                                     key={index}>
                                    <Checkbox action={this.selectFormat}
                                                    name={format}
                                                    className={DEFAULT_CHECKBOX}
                                                    label={{text: format}}/>
                                </div>
                            )
                        })}
                    </div>

                    <div className={"ExportsFooter"}>
                        <TextButton text={"Export"}
                                    className={"ExportBtn"}
                                    action={this.exportFormat}/>
                    </div>

                    <TextButton text={"Esc"}
                                action={props.action}
                                className={"ExitBtn"}/>
                </div>
            </>
        )
    }
}

Exports.propTypes = {
    action: PropTypes.func,
    formats: PropTypes.array,
    style: PropTypes.object,
    label: PropTypes.object
};