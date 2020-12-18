const webpack = require('webpack');
module.exports = {
  css: {
    extract: { ignoreOrder: true },
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/nwe/'
  : '/',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },
}