const path = require("path");
const webpack = require("webpack");
const dlls = ["react", "react-dom"];

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function filterTypes() {
  var tpsReg = /^@types/i;
  return dlls.filter(item => {
    return !tpsReg.test(item) && item.indexOf("antd") === -1;
  });
}

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    vendor: filterTypes()
  },
  mode: "production",
  output: {
    path: resolve("dist"),
    filename: "[name].dll.js",
    library: "_dll_[name]" // 全局变量名，其他模块会从此变量上获取里面模块
  },
  //optimization: {
  //	minimize: false
  //},
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: resolve("dist/manifest.json"),
      context: path.resolve(__dirname, "../")
    })
  ]
};
