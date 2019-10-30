import {readCSV} from "./CSVReader";

export const uploadFormatType = {
  JSON : '.json',
  CSV: '.csv'
};
export const separators = {
  COMMA: ',',
  SEMICOLON: ';'
};

export const getFileData = (evt, formatType, handler) => {
    let files = evt.target.files;
    let f = files[0];
    let reader = new FileReader();
    reader.onload = (function () {
        return function (e) {
            try {
                let data;
                switch (formatType){
                    case uploadFormatType.JSON:
                        data = JSON.parse(e.target.result);
                        break;
                    case uploadFormatType.CSV:
                        data = readCSV(e.target.result, separators.COMMA);
                        break;

                    default:
                        console.log("Wrong format!")
                }
                handler(data);
            } catch (ex) {
                console.log(ex);
            }
        }
    })(f);
    if (f) {
        reader.readAsText(f);
    }
};
