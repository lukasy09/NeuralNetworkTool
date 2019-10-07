/**
 * Function represents the softmax function commonly used in projecting Artificial Neural Networks
 * @param x
 * @param inputs
 * @returns {number}
 */
export function softmax(x, inputs) {
    let sum = inputs.reduce((a, b) => a + b);
    return (Math.exp(x)/Math.exp(sum));
}