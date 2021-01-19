const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pwa: {
    name: "CurrencyApp",
    themeColor: "#ffffff",
    manifestOptions: {
      background_color: "#335eea",
    },
    // workboxOptions: {
    //   swSrc: "dev/sw.js",
    // },
  },

  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "CurrencyApp",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  chainWebpack(config) {
    config.module.rules.delete("svg");
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/imgs"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/imgs"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
