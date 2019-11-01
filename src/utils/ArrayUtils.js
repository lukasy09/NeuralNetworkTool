/**
 * Adding an element to an array if not exists. If it does - removes the element
 * @param arr
 * @param el
 * @returns {*}
 */
export const addIfNotExistsOrRemove = (arr, el) =>{
    let index = arr.indexOf(el);
    index === -1 ? arr.push(el) : arr.splice(index, 1);
    return arr;
};
