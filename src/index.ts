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
	const a = {...attrs,
		viewBox: attrs.viewBox || '0 0 1 1',
		width: attrs.width || '1em',
		height: attrs.height || '1em'
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

export function rect (h: HyperScript, attrs: RectAttrs) {
	return h('rect', attrs)
}

// Triangle

export interface TriangleAttrs extends HyperScriptAttrs {
	angle?: number
}

/** Equilateral triangle with any rotation */
export function triangle (h: HyperScript, attrs: TriangleAttrs = {}) {
	const {angle = 0, ...polyAttrs} = attrs
	const r = Math.PI * angle / 180
	return h('polygon', {
		points: [0, 1, 2].map(i => Math.PI * 2 * i / 3 + r).map(r =>
			`${Math.cos(r) * 0.5 + 0.5},${Math.sin(r) * 0.5 + 0.5}`
		).join(', '),
		polyAttrs
	})
}

// Icons

export function downloadIcon (h: HyperScript) {
	return h('g',
		h('path', {
			d: 'M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z'
		})
	)
}

export function shareIcon (h: HyperScript) {
	return h('g', {
		d: 'M67.5,18c-5.1,0-9.3,4.2-9.3,9.3c0,0.5,0.1,1.1,0.2,1.6l-23,12.9c-1.7-1.8-4.1-3-6.8-3c-5.1,0-9.3,4.1-9.3,9.3c0,5.1,4.1,9.3,9.3,9.3c2.7,0,5.2-1.2,6.9-3.1l22.8,13.4c0,0.4-0.1,0.7-0.1,1.1c0,5.1,4.1,9.3,9.3,9.3c5.1,0,9.3-4.1,9.3-9.3c0-5.1-4.1-9.3-9.3-9.3c-2.8,0-5.4,1.3-7.1,3.3L37.7,49.4c0.1-0.4,0.1-0.9,0.1-1.3c0-0.5,0-1-0.1-1.5l23.1-13c1.7,1.8,4.1,3,6.8,3c5.1,0,9.3-4.1,9.3-9.3C76.8,22.2,72.6,18,67.5,18L67.5,18z'
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
		svg: (attrs?: HyperSVGAttrs, ...children: any[]) => {
			return svg(h, {...config, ...attrs}, ...children)
		},
		rect: (attrs?: RectAttrs) => {
			return rect(h, {
				x: 0, y: 0, width: config.width!, height: config.height!,
				...attrs
			})
		},
		svgRect: (attrs: HyperSVGAttrs, rcAttrs: RectAttrs) => {
			return svg(h, {...config, ...attrs},
				rect(h, rcAttrs)
			)
		},
		triangle: (attrs?: TriangleAttrs) => {
			return triangle(h, attrs)
		},
		svgTriangle: (attrs?: HyperSVGAttrs, triAttrs?: TriangleAttrs) => {
			return svg(h, {...config, ...attrs},
				triangle(h, triAttrs)
			)
		},
		downloadIcon: () => downloadIcon(h),
		svgDownloadIcon: (attrs?: HyperSVGAttrs) => svg(h,
			{...config, viewBox: '0 0 433.5 433.5', ...attrs},
			downloadIcon(h)
		),
		shareIcon: () => shareIcon(h),
		svgShareIcon: (attrs?: HyperSVGAttrs) => svg(h,
			{...config, viewBox: '0 0 96 96', ...attrs},
			shareIcon(h)
		)
	}
}
