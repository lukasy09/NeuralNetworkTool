/**
 * Function represents the sigmoid(logistic) function commonly used in projecting Artificial Neural Networks
 * @param x
 * @returns {number}
 */
export function sigmoid(x) {
    return (1/(1+Math.exp(-x)));
}