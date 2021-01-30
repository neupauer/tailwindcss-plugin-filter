const plugin = require("tailwindcss/plugin");

const interpolationFunctions = [
  "blur",
  "brightness",
  "contrast",
  "drop-shadow",
  "grayscale",
  "hue-rotate",
  "invert",
  "opacity",
  "saturate",
  "sepia",
];

const interpolationFunctionsPublicApiNames = {
  opacity: "filter-opacity",
};

const getPublicApiName = (key) => interpolationFunctionsPublicApiNames[key] || key;

const filterPlugin = plugin(
  function ({ addUtilities, theme, variants, e }) {
    addUtilities(
      [
        {
          ".filter, .backdrop": {
            ...interpolationFunctions.reduce((acc, interpolationFunction) => {
              acc[`--tw-filter-${interpolationFunction}`] = "var(--tw-empty, /*!*/ /*!*/)";
              return acc;
            }, {}),
          },
          ".filter": {
            filter: interpolationFunctions
              .map((interpolationFunction) => `var(--tw-filter-${interpolationFunction})`)
              .join(" "),
          },
          ".backdrop": {
            backdropFilter: interpolationFunctions
              .map((interpolationFunction) => `var(--tw-filter-${interpolationFunction})`)
              .join(" "),
          },
          ".no-filter": {
            filter: "none",
          },
          ".no-backdrop": {
            backdropFilter: "none",
          },
        },
        ...interpolationFunctions.map((interpolationFunction) => {
          const themeConfig = theme("filter") ? theme("filter")[interpolationFunction] || {} : {};
          return Object.entries(themeConfig).map(([key, value]) => {
            return {
              [`.${e(`${getPublicApiName(interpolationFunction)}-${key}`)}`]: {
                [`--tw-filter-${interpolationFunction}`]: `${interpolationFunction}(${value})`,
              },
            };
          });
        }),
      ],
      variants("filter")
    );
  },
  {
    theme: {
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
      filter: ["responsive", "hover"],
    },
  }
);

module.exports = filterPlugin;
