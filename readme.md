# HyperSVG

SVG is very powerful when used inline, however using the DOM API is verbose. Even if you're using JSX or Hyperscript, there are a lot of properties and magic strings to remember.

This library provides a thin, library-agnostic helper API for rendering SVG elements - regular DOM elements or virtual DOM elements.

(Currently this is more of an idea or pattern than a library. It's also a place to collect SVG snippets I've found useful.)

The idea is that you provide a hyperscript-like render function with the following signature:

```typescript
type HyperScript = (
    selector: string,
    attributes?: {[id: string]: any},
    ...children: any[]
) => any
```

For example: React's `createElement` or Mithril's `m` or Hyperscript's `h` function.

HyperSVG functions will return a rendered SVG structure (whatever your function outputs.)

## Usage

Can be used two ways:

### 1. Plain functions

You can call the exported functions and provide the hyperscript function every time:

```typescript
// Substitude Hyperscript for Mithril (m)
// or React (createElement) etc.
import h from 'hyperscript'
import {svg, triangle} from 'hypersvg'
svg(h,
    triangle(h, {
        angle: 90,
        className: 'green-triangle'
    })
)
```

This has the advantage of being easily tree-shaken. Or being bound or composed by your application.

### 2. API Instance

Otherwise you can create an instance of the API and inject the hyperscript function once on initialization, along with some default attribute values:

```typescript
import h from 'hyperscript'
import HyperSVG from 'hypersvg'
const {svg, triangle} = HyperSVG(h, {
    width: '2em',
    height: '32px',
    viewBox: '0 0 32 32',
    className: 'my-svg'
})
// Then use it like this:
svg(
    triangle({
        angle: 90,
        className: 'green-triangle'
    })
)
```

The default attributes that you provide will be applied to every `HyperSVG.svg` call made from the returned API instance. Any defaults can be overridden in the attributes provided to any `HyperSVG.svg` call. If you do not provide any default attributes or when using `HyperSVG.svg`, the following values will be used:

```typescript
{
    width: '1em',
    height: '1em',
    viewBox: '0 0 1 1'
}
```

Which makes them convenient for use inline with text content and as a 'normalized' size.

Keep in mind that it's also easy to create your own application-specific wrapper to inject the hyperscript dependency, set defaults or whatever else you find useful.
