
export class DataPreprocessor {

    /**
     * Picking the given columns from a data matrix.
     * @param data
     * @param columns
     * @return {Array}
     */
    static filterColumns(data, columns) {
        const preprocessed = [];
        for (let row of data) {
            let newRow = [];
            for (let colIndex of columns) {
                newRow.push(row[colIndex]);
            }
            preprocessed.push(newRow);
        }
        return preprocessed;
    }
}