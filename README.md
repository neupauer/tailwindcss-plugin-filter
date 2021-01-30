# Tailwind CSS Plugin – Filter & Backdrop Filter

## Install

1. Install the plugin:

```bash
# Using npm
npm install @neupauer/tailwindcss-plugin-filter --save-dev

# Using Yarn
yarn add @neupauer/tailwindcss-plugin-filter -D
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
    filter: {
      blur: {},
      brightness: {},
      contrast: {},
      "drop-shadow": {},
      grayscale: {},
      "hue-rotate": {},
      invert: {},
      opacity: {},
      saturate: {},
      sepia: {},
    },
  },
  variants: {
    // default
    filter: ["responsive", "hover"],
  },
};
```

## Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    filter: {
      blur: {
        2: "2px",
      },
      saturate: {
        40: "40%",
      },
      opacity: {
        20: "20%",
      },
    },
  },
};
```

> All filters have equivalent class name except `opacity`.
> `.opacity-{x}` => `.filter-opacity-{x}`

```html
<!-- backdrop-filter: blur(2px) saturate(40%); -->
<div class="backdrop blur-2 saturate-40"></div>

<!-- filter: blur(2px) saturate(40%); -->
<div class="filter blur-2 saturate-40"></div>

<!--
  filter: blur(2px) saturate(40%);
  backdrop-filter: blur(2px) saturate(40%);
-->
<div class="filter backdrop blur-2 saturate-40"></div>

<!-- backdrop-filter: none; -->
<div class="no-backdrop"></div>

<!-- filter: none; -->
<div class="no-filter"></div>

<!-- backdrop-filter: opacity(20%); -->
<div class="backdrop filter-opacity-20"></div>
```
