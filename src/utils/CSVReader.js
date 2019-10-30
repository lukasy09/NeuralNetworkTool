/**
 * Reading raw CSV file input & returns an array(1st the array's index represents metadata)
 * @param raw
 * @param separator
 * @return {Array}
 */
export const readCSV = (raw, separator) => {
    let data =[];
    let lines = raw.split('\n');
    for(let line of lines){
        let el = line.split(separator);
        data.push(el);
    }
    return data
};