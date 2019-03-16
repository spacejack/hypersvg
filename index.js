"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Standalone SVG functions. Hyperscript must be provided for each function call.
/**
 * Renders an SVG element using the provided Hyperscript function.
 * Note that you must pass an attributes object if you wish to
 * pass child nodes.
 */
function svg(h, attrs) {
    if (attrs === void 0) { attrs = {}; }
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var a = __assign({ viewBox: '0 0 1 1', width: '1em', height: '1em' }, attrs);
    return h('svg', a, children);
}
exports.svg = svg;
/** Rectangle */
function rect(h, attrs) {
    return h('rect', attrs);
}
exports.rect = rect;
/** Equilateral triangle with any rotation */
function triangle(h, attrs) {
    if (attrs === void 0) { attrs = {}; }
    var _a = attrs.angle, angle = _a === void 0 ? 0 : _a, polyAttrs = __rest(attrs, ["angle"]);
    var r = Math.PI * angle / 180;
    return h('polygon', {
        points: [0, 1, 2].map(function (i) { return Math.PI * 2 * i / 3 + r; }).map(function (r) {
            return Math.cos(r) * 0.5 + 0.5 + "," + (Math.sin(r) * 0.5 + 0.5);
        }).join(', '),
        polyAttrs: polyAttrs
    });
}
exports.triangle = triangle;
/** Arc centered at x, y, with given radius, sweeps from startAngle to endAngle */
function arc(h, attrs) {
    if (attrs === void 0) { attrs = {}; }
    var _a = attrs.x, x = _a === void 0 ? 0.5 : _a, _b = attrs.y, y = _b === void 0 ? 0.5 : _b, _c = attrs.radius, radius = _c === void 0 ? 0.5 : _c, _d = attrs.startAngle, startAngle = _d === void 0 ? 0 : _d, _e = attrs.endAngle, endAngle = _e === void 0 ? 360 : _e, _f = attrs.strokeWidth, strokeWidth = _f === void 0 ? 0 : _f, arcAttrs = __rest(attrs, ["x", "y", "radius", "startAngle", "endAngle", "strokeWidth"]);
    return h('path', __assign({ 
        //d: svgArcPath(x, y, radius, startAngle, endAngle)
        d: svgArcPath(radius, radius, radius - strokeWidth / 2, startAngle, endAngle), style: "stroke-width: " + strokeWidth }, arcAttrs));
}
exports.arc = arc;
// Icons
/** Download Icon */
function downloadIcon(h, attrs) {
    if (attrs === void 0) { attrs = {}; }
    return h('g', h('path', {
        d: 'M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z'
    }));
}
exports.downloadIcon = downloadIcon;
/** Share Icon */
function shareIcon(h, attrs) {
    if (attrs === void 0) { attrs = {}; }
    return h('g', __assign({ d: 'M67.5,18c-5.1,0-9.3,4.2-9.3,9.3c0,0.5,0.1,1.1,0.2,1.6l-23,12.9c-1.7-1.8-4.1-3-6.8-3c-5.1,0-9.3,4.1-9.3,9.3c0,5.1,4.1,9.3,9.3,9.3c2.7,0,5.2-1.2,6.9-3.1l22.8,13.4c0,0.4-0.1,0.7-0.1,1.1c0,5.1,4.1,9.3,9.3,9.3c5.1,0,9.3-4.1,9.3-9.3c0-5.1-4.1-9.3-9.3-9.3c-2.8,0-5.4,1.3-7.1,3.3L37.7,49.4c0.1-0.4,0.1-0.9,0.1-1.3c0-0.5,0-1-0.1-1.5l23.1-13c1.7,1.8,4.1,3,6.8,3c5.1,0,9.3-4.1,9.3-9.3C76.8,22.2,72.6,18,67.5,18L67.5,18z' }, attrs));
}
exports.shareIcon = shareIcon;
/* Checkmark symbol */
function checkmark(h, attrs) {
    if (attrs === void 0) { attrs = {}; }
    return h('path', __assign({ d: 'M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' }, attrs));
}
exports.checkmark = checkmark;
/**
 * Inject Hyperscript dependency once then use the returned interface
 */
function HyperSVG(h, config) {
    if (config === void 0) { config = {}; }
    config = __assign({ width: config.width || '1em', height: config.height || '1em', viewBox: config.viewBox || '0 0 1 1' }, config);
    return {
        /** Render a SVG element with attributes and children */
        svg: function (attrs) {
            var children = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                children[_i - 1] = arguments[_i];
            }
            return svg.apply(void 0, [h, __assign({}, config, attrs)].concat(children));
        },
        /** Rectangle path */
        rect: function (attrs) {
            return rect(h, __assign({ x: 0, y: 0, width: config.width, height: config.height }, attrs));
        },
        /** Rectangle SVG */
        svgRect: function (attrs, rcAttrs) {
            return svg(h, __assign({}, config, attrs), rect(h, rcAttrs));
        },
        /** Equilateral triangle path */
        triangle: function (attrs) {
            return triangle(h, attrs);
        },
        /** Equilateral triangle SVG */
        svgTriangle: function (attrs, triAttrs) {
            return svg(h, __assign({}, config, attrs), triangle(h, triAttrs));
        },
        /** Arc path centered at x, y, with given radius, sweeps from startAngle to endAngle */
        arc: function (attrs) {
            return arc(h, attrs);
        },
        /** Arc SVG centered at x, y, with given radius, sweeps from startAngle to endAngle */
        svgArc: function (attrs, arcAttrs) {
            return svg(h, __assign({}, config, attrs), arc(h, arcAttrs));
        },
        /** Renders the path for a download icon */
        downloadIcon: function () { return downloadIcon(h); },
        /** Renders a download icon with SVG container */
        svgDownloadIcon: function (attrs) { return svg(h, __assign({}, config, { viewBox: '0 0 433.5 433.5' }, attrs), downloadIcon(h)); },
        /** Renders the path for a share icon */
        shareIcon: function () { return shareIcon(h); },
        /* Renders a share icon with SVG container */
        svgShareIcon: function (attrs) { return svg(h, __assign({}, config, { viewBox: '0 0 96 96' }, attrs), shareIcon(h)); },
        /** Renders the path for a checkmark symbol */
        checkmark: function (attrs) { return checkmark(h, attrs); },
        /** Renders a checkmark symbol with SVG container */
        svgCheckmark: function (attrs) {
            if (attrs === void 0) { attrs = {}; }
            return h('svg', __assign({ viewBox: '0 0 24 24' }, attrs), checkmark(h));
        }
    };
}
exports.default = HyperSVG;
/**
 * Convert radius & degrees to cartesian coords
 */
function polarToCartesian(out, radius, degrees) {
    var r = (degrees - 90) * Math.PI / 180.0;
    out.x = radius * Math.cos(r);
    out.y = radius * Math.sin(r);
    return out;
}
var _p0 = { x: 0, y: 0 };
var _p1 = { x: 0, y: 0 };
/**
 * Create an SVG arc path definition centred at x,y with radius,
 * start and end angles (clockwise, in degrees).
 * The returned string can be used for a `d` attribute of a `<path>` element
 */
function svgArcPath(x, y, radius, startAngle, endAngle) {
    var p0 = polarToCartesian(_p0, radius, endAngle);
    var p1 = polarToCartesian(_p1, radius, startAngle);
    p0.x += x;
    p0.y += y;
    p1.x += x;
    p1.y += y;
    var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return "M " + p0.x + " " + p0.y + " A " + radius + " " + radius + " 0 " + arcSweep + " 0 " + p1.x + " " + p1.y;
}
