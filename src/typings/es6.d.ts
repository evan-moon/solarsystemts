declare interface Math {
    log10(x: number): number;
    sinh(x: number): number;
    cosh(x: number): number;
    sign(x: number): number;
}

declare interface ObjectConstructor {
    assign(...objects: Object[]): Object;
}
