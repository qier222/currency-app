const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // pwa: {
  //   name: "My App",
  //   appleMobileWebAppCapable: "yes",
  //   appleMobileWebAppStatusBarStyle: "black",
  //   workboxOptions: {
  //     swSrc: "dev/sw.js",
  //   },
  // },
  chainWebpack(config) {
    config.module.rules.delete("svg");
    config.module.rule("svg").exclude.add(resolve("src/assets/imgs")).end();
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
