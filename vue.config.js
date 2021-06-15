module.exports = {
  runtimeCompiler: true,

  devServer: {
    disableHostCheck: true
  },

  pwa: {
    name: 'Debian!',
    workboxPluginMode: 'InjectManifest',
    workboxOptions:{
      swSrc: "src/registerServiceWorker.js"
    }
  },

  css: {
    sourceMap: true
  }
}