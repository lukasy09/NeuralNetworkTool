import React from 'react';
import PropTypes from "prop-types";
import {LabelInfo} from "../../common/LabelInfo";
import {PopupBlur} from "../../common/PopupBlur";
import {Checkbox} from "../../common/Checkbox";
import {TextButton} from "../../common/TextButton";

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
                                    action={()=>{console.log("test")}}/>
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