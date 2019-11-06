export class DataPreprocessor{

    static filterColumns(data, columns){
        const length = data.length;
        const preprocessed = [];
        for(let i = 0; i<length; i++){
            const row = data[i];
            const rowLength = row.length;
            for(let j = 0; j < rowLength; j++){

                if(!columns.includes(j)){

                    row.splice(j, 1);
                }
            }
            preprocessed.push(row);
        }
        console.log(preprocessed);
        return preprocessed;
    }
}