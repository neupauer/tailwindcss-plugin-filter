const plugin = require("tailwindcss/plugin");

const camelize = (s) => s.replace(/-./g, (x) => x.toUpperCase()[1]);

const interpolationFunctions = [
  "blur",
  "brightness",
  "contrast",
  "drop-shadow",
  "grayscale",
  "hue-rotate",
  "invert",
  "saturate",
  "sepia",
];

const filterPlugin = plugin(
  function ({ addUtilities, theme, variants, e }) {
    addUtilities(
      [
        {
          ".filter,.backdrop": {
            "--tw-filter-functions": [
              "blur(var(--tw-filter-blur, 0))",
              "brightness(var(--tw-filter-brightness, 1))",
              "contrast(var(--tw-filter-contrast, 1))",
              "drop-shadow(var(--tw-filter-drop-shadow, 0 0))",
              "grayscale(var(--tw-filter-grayscale, 0))",
              "hue-rotate(var(--tw-filter-hue-rotate, 0))",
              "invert(var(--tw-filter-invert, 0))",
              "saturate(var(--tw-filter-saturate, 1))",
              "sepia(var(--tw-filter-sepia, 0))",
            ].join(" "),
          },
          ".filter": {
            filter: "var(--tw-filter-functions)",
          },
          ".backdrop": {
            backdropFilter: "var(--tw-filter-functions)",
          },
          ".filter-none": {
            filter: "none",
          },
          ".backdrop-none": {
            backdropFilter: "none",
          },
        },
        ...interpolationFunctions.map((interpolationFunction) => {
          const themeFunctionConfig = theme("filterFunctions")
            ? theme("filterFunctions")[camelize(interpolationFunction)] || {}
            : {};

          return Object.entries(themeFunctionConfig).map(([key, value]) => {
            return {
              [`.${e(`${interpolationFunction}-${key}`)}`]: {
                [`--tw-filter-${interpolationFunction}`]: `${value}`,
              },
            };
          });
        }),
      ],
      variants("filterFunctions")
    );
  },
  {
    theme: {
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
      filterFunctions: ["responsive", "hover"],
    },
  }
);

module.exports = filterPlugin;
