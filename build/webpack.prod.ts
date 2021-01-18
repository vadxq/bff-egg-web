import * as VConsolePlugin from 'vconsole-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.base';

export default merge(baseConfig, {
  mode: "production",
  plugins: [
    new VConsolePlugin({
      enable: process.env.NODE_CONFIG_ENV !== 'prod'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer:[
      new OptimizeCSSAssetsPlugin({}),
    ]
  }
});
