> Due to official support in the Tailwind's core, this package is no longer maintained.

# Tailwind CSS Plugin – Filter & Backdrop Filter

Utilities for controlling filter & backdrop-filter behaviour.

## Install

1. Install the plugin:

```bash
# Using npm
npm install @neupauer/tailwindcss-plugin-filter

# Using Yarn
yarn add @neupauer/tailwindcss-plugin-filter
```

2. Add it to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [require("@neupauer/tailwindcss-plugin-filter")],
};
```

## Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    // default
    filterFunctions: {
      blur: {},
      brightness: {},
      contrast: {},
      dropShadow: {},
      grayscale: {},
      hueRotate: {},
      invert: {},
      saturate: {},
      sepia: {},
    },
  },
  variants: {
    // default
    filterFunctions: ["responsive", "hover"],
  },
};
```

## Usage

### Filter & Backdrop Filter

To enable filters you have to add the `.filter` or `.backdrop` utility. _(Similar to the native Tailwind `transform` utility)_

### None

If you want to disable filters, then you can use the `.filter-none` or `.backdrop-none` utility.

### Responsive

To enable or disable filters at a specific breakpoint, add a `{screen}:` prefix to any of the filter utilities. For example, use `md:filter` or `md:backdrop` to apply the `filter` or `backdrop` utility at only medium screen sizes and above.

### Available Filter Functions

> By default, no values are provided for any filter

- `.blur-{value}`
- `.brightness-{value}`
- `.contrast-{value}`
- `.drop-shadow-{value}`
- `.grayscale-{value}`
- `.hue-rotate-{value}`
- `.invert-{value}`
- `.saturate-{value}`
- `.sepia-{value}`

> Utility for **filter: opacity()** or **backdrop-filter: opacity()** is not provided because [according to MDN](<https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity()>) this function is similar to the more established **opacity** property. The difference is that with filters, some browsers provide hardware acceleration for better performance.
>
> So, you can use [Tailwind's native `opacity` utility](https://tailwindcss.com/docs/opacity).

### Example Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    filterFunctions: {
      blur: {
        1: "1px",
        2: "2px",
        3: "3px",
      },
      saturate: {
        40: "40%",
      },
    },
  },
};
```

```html
<!-- filter: blur(2px) saturate(40%); -->
<div class="filter blur-2 saturate-40"></div>

<!-- backdrop-filter: blur(2px) saturate(40%); -->
<div class="backdrop blur-2 saturate-40"></div>

<!--
  filter: blur(2px) saturate(40%);
  backdrop-filter: blur(2px) saturate(40%);
-->
<div class="filter backdrop blur-2 saturate-40"></div>

<!-- filter: none; -->
<div class="filter-none"></div>

<!-- backdrop-filter: none; -->
<div class="backdrop-none"></div>
```
