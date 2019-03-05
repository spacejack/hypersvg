export declare type HyperScript = (s: string, ...params: any[]) => any;
export interface HyperScriptAttrs {
    [id: string]: any;
}
export interface HyperSVGAttrs extends HyperScriptAttrs {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
}
/**
 * Renders an SVG element using the provided Hyperscript function.
 * Note that you must pass an attributes object if you wish to
 * pass child nodes.
 */
export declare function svg(h: HyperScript, attrs?: HyperSVGAttrs, ...children: any[]): any;
export interface RectAttrs extends HyperScriptAttrs {
    x: number | string;
    y: number | string;
    width: number | string;
    height: number | string;
}
export declare function rect(h: HyperScript, attrs: RectAttrs): any;
export interface TriangleAttrs extends HyperScriptAttrs {
    angle?: number;
}
/** Equilateral triangle with any rotation */
export declare function triangle(h: HyperScript, attrs?: TriangleAttrs): any;
export interface ArcAttrs extends HyperScriptAttrs {
    x?: number;
    y?: number;
    radius?: number;
    startAngle?: number;
    endAngle?: number;
}
/** Arc drawn from start to end angle */
export declare function arc(h: HyperScript, attrs?: ArcAttrs): any;
export declare function downloadIcon(h: HyperScript): any;
export declare function shareIcon(h: HyperScript): any;
/**
 * Inject Hyperscript dependency once then use the returned interface
 */
export default function HyperSVG(h: HyperScript, config?: HyperSVGAttrs): {
    svg: (attrs?: HyperSVGAttrs | undefined, ...children: any[]) => any;
    rect: (attrs?: RectAttrs | undefined) => any;
    svgRect: (attrs: HyperSVGAttrs, rcAttrs: RectAttrs) => any;
    triangle: (attrs?: TriangleAttrs | undefined) => any;
    svgTriangle: (attrs?: HyperSVGAttrs | undefined, triAttrs?: TriangleAttrs | undefined) => any;
    arc: (attrs?: ArcAttrs | undefined) => any;
    svgArc: (attrs?: HyperSVGAttrs | undefined, arcAttrs?: ArcAttrs | undefined) => any;
    downloadIcon: () => any;
    svgDownloadIcon: (attrs?: HyperSVGAttrs | undefined) => any;
    shareIcon: () => any;
    svgShareIcon: (attrs?: HyperSVGAttrs | undefined) => any;
};
