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
/** Rectangle */
export declare function rect(h: HyperScript, attrs: RectAttrs): any;
export interface TriangleAttrs extends HyperScriptAttrs {
    x?: number;
    y?: number;
    scale?: number;
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
    strokeWidth?: number;
}
/** Arc centered at x, y, with given radius, sweeps from startAngle to endAngle */
export declare function arc(h: HyperScript, attrs?: ArcAttrs): any;
export interface PolyLineAttrs extends HyperScriptAttrs {
    points: {
        x: number;
        y: number;
    }[];
    pathLength?: number;
}
/** Polyline - array of points */
export declare function polyLine(h: HyperScript, attrs: PolyLineAttrs): any;
/** Download Icon */
export declare function downloadIcon(h: HyperScript, attrs?: HyperScriptAttrs): any;
/** Share Icon */
export declare function shareIcon(h: HyperScript, attrs?: HyperScriptAttrs): any;
export declare function checkmark(h: HyperScript, attrs?: HyperScriptAttrs): any;
/**
 * Inject Hyperscript dependency once then use the returned interface
 */
export default function HyperSVG(h: HyperScript, config?: HyperSVGAttrs): {
    /** Render a SVG element with attributes and children */
    svg: (attrs?: HyperSVGAttrs | undefined, ...children: any[]) => any;
    /** Rectangle path */
    rect: (attrs?: RectAttrs | undefined) => any;
    /** Rectangle SVG */
    svgRect: (attrs: HyperSVGAttrs, rcAttrs: RectAttrs) => any;
    /** Equilateral triangle path */
    triangle: (attrs?: TriangleAttrs | undefined) => any;
    /** Equilateral triangle SVG */
    svgTriangle: (attrs?: HyperSVGAttrs | undefined, triAttrs?: TriangleAttrs | undefined) => any;
    /** Arc path centered at x, y, with given radius, sweeps from startAngle to endAngle */
    arc: (attrs?: ArcAttrs | undefined) => any;
    /** Arc SVG centered at x, y, with given radius, sweeps from startAngle to endAngle */
    svgArc: (attrs?: HyperSVGAttrs | undefined, arcAttrs?: ArcAttrs | undefined) => any;
    /** PolyLine - draws an array of {x,y} points */
    polyLine: (attrs: PolyLineAttrs) => any;
    /** PolyLine - draws an array of {x,y} points */
    svgPolyLine: (attrs: HyperSVGAttrs | undefined, plAttrs: PolyLineAttrs) => any;
    /** Renders the path for a download icon */
    downloadIcon: () => any;
    /** Renders a download icon with SVG container */
    svgDownloadIcon: (attrs?: HyperSVGAttrs | undefined) => any;
    /** Renders the path for a share icon */
    shareIcon: () => any;
    svgShareIcon: (attrs?: HyperSVGAttrs | undefined) => any;
    /** Renders the path for a checkmark symbol */
    checkmark: (attrs?: HyperScriptAttrs | undefined) => any;
    /** Renders a checkmark symbol with SVG container */
    svgCheckmark: (attrs?: HyperSVGAttrs) => any;
};
