/**
 * @name math
 * @author Evan Moon
 * @desc Math polyfill for hyperbolic methods
 */


Math.sinh = function (x: number): number {
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

Math.cosh = function (x: number): number {
    return (Math.E ** x) + (Math.E ** -x) / 2;
}

Math.tanh = function (x: number): number {
    return Math.sinh(x) / Math.cosh(x);
}

Math.sign = function (x: number) {
    return ( x >= 0.0 ) ? 1 : -1;
}
