const fs = require("fs");
const postcss = require("postcss");
const tailwind = require("tailwindcss");
const CleanCSS = require("clean-css");

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

function buildDistFile(filename) {
  return postcss([
    tailwind({
      corePlugins: false,
      plugins: [require("../src/index.js")],
      theme: {
        filter: {
          ...interpolationFunctions.reduce((acc, interpolationFunction) => {
            acc[interpolationFunction] = {
              1: "1",
              2: "2",
              3: "3",
            };
            return acc;
          }, {}),
        },
      },
    }),
    require("autoprefixer"),
  ])
    .process("@tailwind utilities", {
      from: null,
      to: `./dist/${filename}.css`,
      map: false,
    })
    .then((result) => {
      fs.writeFileSync(`./dist/${filename}.css`, result.css);
      return result;
    })
    .then((result) => {
      const minified = new CleanCSS().minify(result.css);
      fs.writeFileSync(`./dist/${filename}.min.css`, minified.styles);
    })
    .catch((error) => {
      console.log(error);
    });
}

console.info("Building CSS...");

Promise.all([buildDistFile("filter")]).then(() => {
  console.log("Finished building CSS.");
});
