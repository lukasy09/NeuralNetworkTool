/**
 * Reading raw CSV file input & returns an array(1st the array's index represents metadata)
 * @param raw
 * @param separator
 * @return {Array}
 */
export const readCSV = (raw, separator) => {
    let data =[];
    let lines = raw.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let el = line.split(separator);
        data.push(el);
    }
    return data
};