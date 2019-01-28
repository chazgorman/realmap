const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;

module.exports = {
  webpack: function (config) {
    // const originalEntry = config.entry
    // config.entry = async () => {
    //   const entries = await originalEntry()

    //   if (
    //     entries['main.js'] &&
    //     !entries['main.js'].includes('./client/polyfills.js')
    //   ) {
    //     entries['main.js'].unshift('./client/polyfills.js')
    // }
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }

    return config;
  },
};