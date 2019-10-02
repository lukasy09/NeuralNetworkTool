/**
 * Function represents the Recifier function commonly used in projecting Artificial Neural Networks
 * @param x
 * @returns {number}
 */
export function relu(x) {
    return Math.max(0, x);
}