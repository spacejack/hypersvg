export type HyperScript = (s: string, ...params: any[]) => any

export interface HyperScriptAttrs {
	[id: string]: any
}

export interface HyperSVGAttrs extends HyperScriptAttrs {
	width?: number | string
	height?: number | string
	viewBox?: string
}

// Standalone SVG functions. Hyperscript must be provided for each function call.

/**
 * Renders an SVG element using the provided Hyperscript function.
 * Note that you must pass an attributes object if you wish to
 * pass child nodes.
 */
export function svg (h: HyperScript, attrs: HyperSVGAttrs = {}, ...children: any[]) {
	const a = {
		viewBox: '0 0 1 1',
		width: '1em',
		height: '1em',
		...attrs
	}
	return h('svg', a, children)
}

// Rectangle

export interface RectAttrs extends HyperScriptAttrs {
	x: number | string
	y: number | string
	width: number | string
	height: number | string
}

/** Rectangle */
export function rect (h: HyperScript, attrs: RectAttrs) {
	return h('rect', attrs)
}

// Triangle

export interface TriangleAttrs extends HyperScriptAttrs {
	x?: number
	y?: number
	scale?: number
	angle?: number
}

/** Equilateral triangle with any rotation */
export function triangle (h: HyperScript, attrs: TriangleAttrs = {}) {
	const {angle = 0, scale = 1, x = 0.5, y = 0.5, ...polyAttrs} = attrs
	const r = Math.PI * angle / 180
	return h('polygon', {
		points: [0, 1, 2]
			.map(i => Math.PI * 2 * i / 3 + r)
			.map(r => `${Math.cos(r) * 0.5 * scale + x},${Math.sin(r) * 0.5 * scale + y}`)
			.join(', '),
		...polyAttrs
	})
}

// Arc

export interface ArcAttrs extends HyperScriptAttrs {
	x?: number
	y?: number
	radius?: number
	startAngle?: number
	endAngle?: number
	strokeWidth?: number
}

/** Arc centered at x, y, with given radius, sweeps from startAngle to endAngle */
export function arc (h: HyperScript, attrs: ArcAttrs = {}) {
	const {
		x = 0.5, y = 0.5, radius = 0.5,
		startAngle = 0, endAngle = 360, strokeWidth = 0,
		...arcAttrs
	} = attrs
	return h('path', {
		//d: svgArcPath(x, y, radius, startAngle, endAngle)
		d: svgArcPath(
			radius, radius, radius - strokeWidth / 2, startAngle, endAngle
		),
		style: `stroke-width: ${strokeWidth}`,
		...arcAttrs
	})
}

// Icons

/** Download Icon */
export function downloadIcon (h: HyperScript, attrs: HyperScriptAttrs = {}) {
	return h('g',
		h('path', {
			d: 'M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z'
		})
	)
}

/** Share Icon */
export function shareIcon (h: HyperScript, attrs: HyperScriptAttrs = {}) {
	return h('g', {
		d: 'M67.5,18c-5.1,0-9.3,4.2-9.3,9.3c0,0.5,0.1,1.1,0.2,1.6l-23,12.9c-1.7-1.8-4.1-3-6.8-3c-5.1,0-9.3,4.1-9.3,9.3c0,5.1,4.1,9.3,9.3,9.3c2.7,0,5.2-1.2,6.9-3.1l22.8,13.4c0,0.4-0.1,0.7-0.1,1.1c0,5.1,4.1,9.3,9.3,9.3c5.1,0,9.3-4.1,9.3-9.3c0-5.1-4.1-9.3-9.3-9.3c-2.8,0-5.4,1.3-7.1,3.3L37.7,49.4c0.1-0.4,0.1-0.9,0.1-1.3c0-0.5,0-1-0.1-1.5l23.1-13c1.7,1.8,4.1,3,6.8,3c5.1,0,9.3-4.1,9.3-9.3C76.8,22.2,72.6,18,67.5,18L67.5,18z',
		...attrs
	})
}

/* Checkmark symbol */
export function checkmark (h: HyperScript, attrs: HyperScriptAttrs = {}) {
	return h('path', {
		d: 'M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z',
		...attrs
	})
}

/**
 * Inject Hyperscript dependency once then use the returned interface
 */
export default function HyperSVG (h: HyperScript, config: HyperSVGAttrs = {}) {
	config = {
		width: config.width || '1em',
		height: config.height || '1em',
		viewBox: config.viewBox || '0 0 1 1',
		...config
	}
	return {
		/** Render a SVG element with attributes and children */
		svg: (attrs?: HyperSVGAttrs, ...children: any[]) => {
			return svg(h, {...config, ...attrs}, ...children)
		},
		/** Rectangle path */
		rect: (attrs?: RectAttrs) => {
			return rect(h, {
				x: 0, y: 0, width: config.width!, height: config.height!,
				...attrs
			})
		},
		/** Rectangle SVG */
		svgRect: (attrs: HyperSVGAttrs, rcAttrs: RectAttrs) => {
			return svg(h, {...config, ...attrs},
				rect(h, rcAttrs)
			)
		},
		/** Equilateral triangle path */
		triangle: (attrs?: TriangleAttrs) => {
			return triangle(h, attrs)
		},
		/** Equilateral triangle SVG */
		svgTriangle: (attrs?: HyperSVGAttrs, triAttrs?: TriangleAttrs) => {
			return svg(h, {...config, ...attrs},
				triangle(h, triAttrs)
			)
		},
		/** Arc path centered at x, y, with given radius, sweeps from startAngle to endAngle */
		arc: (attrs?: ArcAttrs) => {
			return arc(h, attrs)
		},
		/** Arc SVG centered at x, y, with given radius, sweeps from startAngle to endAngle */
		svgArc: (attrs?: HyperSVGAttrs, arcAttrs?: ArcAttrs) => {
			return svg(h, {...config, ...attrs},
				arc(h, arcAttrs)
			)
		},
		/** Renders the path for a download icon */
		downloadIcon: () => downloadIcon(h),
		/** Renders a download icon with SVG container */
		svgDownloadIcon: (attrs?: HyperSVGAttrs) => svg(h,
			{...config, viewBox: '0 0 433.5 433.5', ...attrs},
			downloadIcon(h)
		),
		/** Renders the path for a share icon */
		shareIcon: () => shareIcon(h),
		/* Renders a share icon with SVG container */
		svgShareIcon: (attrs?: HyperSVGAttrs) => svg(h,
			{...config, viewBox: '0 0 96 96', ...attrs},
			shareIcon(h)
		),
		/** Renders the path for a checkmark symbol */
		checkmark: (attrs?: HyperScriptAttrs) => checkmark(h, attrs),
		/** Renders a checkmark symbol with SVG container */
		svgCheckmark: (attrs: HyperSVGAttrs = {}) => {
			return h('svg',
				{viewBox: '0 0 24 24', ...attrs},
				checkmark(h)
			)
		}
	}
}

// Helper functions

/** 2D vector type */
interface V2 {
	x: number
	y: number
}

/**
 * Convert radius & degrees to cartesian coords
 */
function polarToCartesian (
	out: V2, radius: number, degrees: number
) {
	const r = (degrees - 90) * Math.PI / 180.0
	out.x = radius * Math.cos(r)
	out.y = radius * Math.sin(r)
	return out
}

const _p0 = {x: 0, y: 0}
const _p1 = {x: 0, y: 0}

/**
 * Create an SVG arc path definition centred at x,y with radius,
 * start and end angles (clockwise, in degrees).
 * The returned string can be used for a `d` attribute of a `<path>` element
 */
function svgArcPath (
	x: number, y: number, radius: number, startAngle: number, endAngle: number
) {
	const p0 = polarToCartesian(_p0, radius, endAngle)
	const p1 = polarToCartesian(_p1, radius, startAngle)
	p0.x += x
	p0.y += y
	p1.x += x
	p1.y += y
	const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'
	return `M ${p0.x} ${p0.y} A ${radius} ${radius} 0 ${arcSweep} 0 ${p1.x} ${p1.y}`
}
