const webpack = require('webpack');

const withTypescript = require('@zeit/next-typescript');
const withPreact = require('@zeit/next-preact');
const withOffline = require('next-offline')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = withTypescript({
  // withPreact({
    webpack(config) {
      if (process.env.ANALYZE) {
        config.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}));
      }
      config.plugins.push(new ProgressBarPlugin());
      config.plugins.push(new webpack.IgnorePlugin(/__test__/));
      return config;
    },
  // })
});

if (process.env.NODE_ENV === 'production') {
  module.exports = withOffline(config);
} else {
  module.exports = config;
}
